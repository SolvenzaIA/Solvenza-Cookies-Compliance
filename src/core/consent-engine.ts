import type {
  ConsentChoices,
  ConsentConfig,
  ConsentEvent,
  ConsentEventHandler,
  ConsentReceipt,
  ConsentSDKInterface,
  ConsentState,
  DiagnosticReport,
  FloatingBadgeConfig,
  LegalPolicyOptions,
  StoragePurgeReport,
} from "./types.js";
import { validateConfig } from "./config-validator.js";
import { StateManager } from "./state.js";
import { EventBus } from "./events.js";
import { createReceipt, parseReceipt } from "./receipt.js";
import { evaluatePolicy } from "./policy-engine.js";
import { CookieStore } from "../storage/cookie-store.js";
import { MemoryStore } from "../storage/memory-store.js";
import { StorageCleaner } from "../storage/storage-cleaner.js";
import { BlockerRegistry } from "../blocker/registry.js";
import { GoogleConsentAdapter } from "../services/google.js";
import { CustomServiceAdapter } from "../services/custom.js";
import { ConsentBanner } from "../ui/banner.js";
import { PreferencesModal } from "../ui/preferences.js";
import { FloatingBadge } from "../ui/floating-badge.js";
import { ResourceScanner } from "../diagnostics/resource-scanner.js";
import { PolicyGenerator } from "../ui/policy-generator.js";
import { I18nEngine } from "../i18n/engine.js";
import { resolveConfigPresets } from "../presets/index.js";
import { detectGpcSignal, resolveGpcConfig, applyGpcChoices } from "./gpc.js";

export class ConsentEngine implements ConsentSDKInterface {
  private stateManager = new StateManager();
  private eventBus = new EventBus();
  private blockerRegistry = new BlockerRegistry();
  private banner = new ConsentBanner();
  private preferencesModal = new PreferencesModal();
  private floatingBadge = new FloatingBadge();
  private i18n = new I18nEngine();
  private stopLocaleSync: (() => void) | null = null;

  private initPromise: Promise<void> | null = null;
  private resolveReady: (() => void) | null = null;
  private readyPromise = new Promise<void>((resolve) => {
    this.resolveReady = resolve;
  });

  async init(configInput: ConsentConfig | string): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      let config: ConsentConfig;

      if (typeof configInput === "string") {
        const response = await fetch(configInput);
        if (!response.ok) {
          throw new Error(
            `[ConsentSDK] Failed to fetch consent configuration from '${configInput}' (HTTP ${response.status})`,
          );
        }
        config = await response.json();
      } else {
        config = configInput;
      }

      config = resolveConfigPresets(config);
      validateConfig(config);

      // Determine initial locale from parent application (<html lang>, URL, navigator, or default)
      const initialLocale = this.i18n.detectParentLocale(config);
      this.i18n.setLocale(initialLocale);

      // Start zero-boilerplate automatic synchronization with parent application i18n
      this.stopLocaleSync?.();
      this.stopLocaleSync = this.i18n.startParentSync(config, (newLocale) => {
        this.setLocale(newLocale);
      });

      // Load saved receipt from cookie or memory
      const cookieName = config.storage?.name || "site_consent";
      const rawReceipt =
        config.storage?.type === "memory"
          ? MemoryStore.get(cookieName)
          : CookieStore.get(cookieName);

      const savedReceipt = rawReceipt ? parseReceipt(rawReceipt) : null;
      const evalResult = evaluatePolicy(config, savedReceipt);

      // Global Privacy Control (GPC) evaluation
      const isGpcDetected = detectGpcSignal();
      const gpcConfig = resolveGpcConfig(config);
      const isGpcActive = isGpcDetected && gpcConfig.enabled && gpcConfig.respectSignal;

      let activeReceipt = evalResult.isValid ? savedReceipt : null;
      let activeChoices = evalResult.choices;
      let autoAppliedGpc = false;

      if (!evalResult.isValid && isGpcActive) {
        if (gpcConfig.mode !== "notice-only") {
          activeChoices = applyGpcChoices(config);
          activeReceipt = createReceipt(
            config.policyVersion,
            activeChoices,
            "gpc",
            null,
            config.security?.secretKey,
          );
          activeReceipt.gpc = true;
          autoAppliedGpc = true;

          // Save GPC receipt
          const receiptJson = JSON.stringify(activeReceipt);
          if (config.storage?.type === "memory") {
            MemoryStore.set(cookieName, receiptJson);
          } else {
            CookieStore.set(cookieName, receiptJson, {
              path: config.storage?.path || "/",
              maxAgeDays: config.consent?.maxAgeDays ?? 365,
              sameSite: config.storage?.sameSite || "Lax",
              secure: config.storage?.secure,
              domain: config.storage?.domain,
            });
          }

          // Purge optional storage on GPC auto-rejection
          for (const [catId, allowed] of Object.entries(activeChoices)) {
            if (!allowed && catId !== "necessary") {
              StorageCleaner.purgeCategory(config, catId);
            }
          }
        }
      }

      this.stateManager.init(config, activeChoices, activeReceipt, isGpcDetected);
      this.stateManager.setLocale(initialLocale);

      if (isGpcDetected) {
        this.eventBus.emit("gpc:detected", {
          signal: true,
          autoApplied: autoAppliedGpc,
          choices: activeChoices,
        });
        this.dispatchDomEvent("solvenza:gpc", {
          signal: true,
          autoApplied: autoAppliedGpc,
          choices: activeChoices,
        });
      }

      // Initialize Google Consent Mode defaults
      GoogleConsentAdapter.initDefault();
      if (evalResult.isValid || autoAppliedGpc) {
        GoogleConsentAdapter.update(activeChoices);
        this.dispatchDomEvent("solvenza:restored", { state: this.getConsent() });
      }

      // Initialize Blocker System
      this.blockerRegistry.init(
        (cat) => this.has(cat),
        (srv) => this.hasService(srv),
        {
          onAllowClick: (category) => {
            const current = this.stateManager.getChoices();
            current[category] = true;
            this.setPreferences(current);
          },
        },
        (serviceId, category) => {
          this.eventBus.emit("service:loaded", { serviceId, category });
        },
      );

      // Attach global listeners for permanent revocation trigger [data-consent-open] and CustomEvents
      this.setupGlobalRevocationTrigger();

      // Initialize Floating Badge if configured
      const resolvedConfig = this.getResolvedConfig() || config;
      const badgeConfig = this.resolveFloatingBadgeConfig(resolvedConfig);
      if (badgeConfig.enabled) {
        this.floatingBadge.render(resolvedConfig, {
          onClick: () => this.openPreferences(),
        });
        if (evalResult.isValid || autoAppliedGpc || badgeConfig.visibility === "always") {
          this.showFloatingBadge();
        }
      }

      this.resolveReady?.();
      this.eventBus.emit("ready", { state: this.getConsent() });

      // If missing receipt and GPC did not auto-apply choices, display 1st layer banner
      if (!evalResult.isValid && !autoAppliedGpc) {
        this.showBanner();
      }
    })();

    return this.initPromise;
  }

  async ready(): Promise<void> {
    return this.readyPromise;
  }

  getConsent(): ConsentState {
    return this.stateManager.getState();
  }

  has(category: string): boolean {
    return this.stateManager.hasCategory(category);
  }

  hasService(serviceId: string): boolean {
    return this.stateManager.hasService(serviceId);
  }

  acceptAll(): void {
    const config = this.stateManager.getConfig();
    if (!config) return;

    const choices: ConsentChoices = {};
    for (const catId of Object.keys(config.categories)) {
      choices[catId] = true;
    }

    this.saveChoices(choices, "banner");
    this.eventBus.emit("consent:accepted", {
      choices,
      receipt: this.getReceipt()!,
    });
  }

  rejectAll(): void {
    const config = this.stateManager.getConfig();
    if (!config) return;

    const choices: ConsentChoices = {};
    for (const [catId, catConfig] of Object.entries(config.categories)) {
      choices[catId] = catConfig.required === true;
    }

    this.saveChoices(choices, "banner");
    this.eventBus.emit("consent:rejected", {
      choices,
      receipt: this.getReceipt()!,
    });
  }

  setPreferences(choices: ConsentChoices): void {
    const config = this.stateManager.getConfig();
    if (!config) return;

    // Enforce necessary = true
    const sanitizedChoices: ConsentChoices = { ...choices };
    sanitizedChoices["necessary"] = true;

    this.saveChoices(sanitizedChoices, "preferences");
  }

  openPreferences(): void {
    const config = this.getResolvedConfig();
    if (!config) return;

    // Temporarily hide floating badge while modal is active
    this.hideFloatingBadge();

    this.preferencesModal.render(config, this.stateManager.getChoices(), {
      onSave: (choices) => {
        this.setPreferences(choices);
        this.restoreFloatingBadgeIfNeeded();
      },
      onAcceptAll: () => {
        this.acceptAll();
        this.restoreFloatingBadgeIfNeeded();
      },
      onRejectAll: () => {
        this.rejectAll();
        this.restoreFloatingBadgeIfNeeded();
      },
      onClose: () => {
        this.restoreFloatingBadgeIfNeeded();
        this.eventBus.emit("preferences:closed", undefined);
      },
    });

    this.eventBus.emit("preferences:opened", undefined);
  }

  closePreferences(): void {
    this.preferencesModal.close();
    this.restoreFloatingBadgeIfNeeded();
    this.eventBus.emit("preferences:closed", undefined);
  }

  getLocale(): string {
    return this.i18n.getLocale();
  }

  setLocale(locale: string): void {
    const previousLocale = this.i18n.getLocale();
    if (locale.toLowerCase() === previousLocale.toLowerCase()) return;

    this.i18n.setLocale(locale);
    this.stateManager.setLocale(locale);

    const config = this.getResolvedConfig();
    if (!config) return;

    // Re-render banner if visible
    if (this.banner.getIsVisible()) {
      this.banner.render(config, {
        onAcceptAll: () => this.acceptAll(),
        onRejectAll: () => this.rejectAll(),
        onConfigure: () => this.openPreferences(),
      });
    }

    // Re-render modal if open
    if (this.preferencesModal.getIsOpen()) {
      this.preferencesModal.render(config, this.stateManager.getChoices(), {
        onSave: (choices) => {
          this.setPreferences(choices);
          this.restoreFloatingBadgeIfNeeded();
        },
        onAcceptAll: () => {
          this.acceptAll();
          this.restoreFloatingBadgeIfNeeded();
        },
        onRejectAll: () => {
          this.rejectAll();
          this.restoreFloatingBadgeIfNeeded();
        },
        onClose: () => {
          this.restoreFloatingBadgeIfNeeded();
          this.eventBus.emit("preferences:closed", undefined);
        },
      });
    }

    // Re-render floating badge if enabled
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (badgeConfig.enabled) {
      const wasVisible = this.floatingBadge.getIsVisible();
      this.floatingBadge.render(config, {
        onClick: () => this.openPreferences(),
      });
      if (wasVisible) {
        this.floatingBadge.show();
      }
    }

    this.eventBus.emit("locale:changed", { locale, previousLocale });
    this.dispatchDomEvent("solvenza:locale:changed", { locale, previousLocale });
  }

  /**
   * Synchronize active locale with parent application i18n state.
   */
  syncLocale(locale: string): void {
    this.setLocale(locale);
  }

  /**
   * Check if Global Privacy Control (GPC) or Do Not Track (DNT) signal is active.
   */
  isGpcActive(): boolean {
    return detectGpcSignal();
  }

  private restoreFloatingBadgeIfNeeded(): void {
    const config = this.getResolvedConfig();
    if (!config) return;

    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (!badgeConfig.enabled) return;

    this.showFloatingBadge();
  }

  private getResolvedConfig(): ConsentConfig | null {
    const rawConfig = this.stateManager.getConfig();
    if (!rawConfig) return null;
    return this.i18n.resolveConfig(rawConfig, this.getLocale());
  }

  withdraw(): void {
    const previousChoices = this.stateManager.getChoices();
    const config = this.stateManager.getConfig();
    if (!config) return;

    const cookieName = config.storage?.name || "site_consent";
    if (config.storage?.type === "memory") {
      MemoryStore.remove(cookieName);
    } else {
      CookieStore.remove(cookieName, config.storage?.path || "/", config.storage?.domain);
    }

    // Auto-clear all storage (cookies, localStorage, sessionStorage) for optional categories
    for (const catId of Object.keys(config.categories)) {
      if (catId !== "necessary") {
        this.purgeCategory(catId);
      }
    }

    this.stateManager.clearChoices();
    GoogleConsentAdapter.update(this.stateManager.getChoices());
    this.eventBus.emit("consent:withdrawn", { previousChoices });
    this.dispatchDomEvent("solvenza:updated", { choices: this.stateManager.getChoices() });

    const badgeConfig = this.resolveFloatingBadgeConfig(this.getResolvedConfig() || config);
    if (badgeConfig.enabled && badgeConfig.visibility !== "always") {
      this.hideFloatingBadge();
    }

    this.showBanner();
  }

  purgeCategory(category: string): StoragePurgeReport {
    const config = this.stateManager.getConfig();
    if (!config) {
      return {
        category,
        purgedCookies: [],
        purgedLocalStorage: [],
        purgedSessionStorage: [],
      };
    }

    const report = StorageCleaner.purgeCategory(config, category);
    this.eventBus.emit("storage:purged", { category, report });
    this.dispatchDomEvent("solvenza:storage:purged", { category, report });
    return report;
  }

  purgeStorage(categoryOrService?: string): StoragePurgeReport[] {
    const config = this.stateManager.getConfig();
    if (!config) return [];

    if (categoryOrService) {
      if (config.categories?.[categoryOrService]) {
        return [this.purgeCategory(categoryOrService)];
      }
      const service = config.services?.[categoryOrService];
      if (service?.category) {
        return [this.purgeCategory(service.category)];
      }
    }

    const reports: StoragePurgeReport[] = [];
    const currentChoices = this.stateManager.getChoices();
    for (const [catId, allowed] of Object.entries(currentChoices)) {
      if (!allowed && catId !== "necessary") {
        reports.push(this.purgeCategory(catId));
      }
    }
    return reports;
  }

  showFloatingBadge(): void {
    const config = this.getResolvedConfig();
    if (!config) return;
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (!badgeConfig.enabled) return;

    const el = this.floatingBadge.getElement();
    if (!el || !el.parentNode) {
      this.floatingBadge.render(config, {
        onClick: () => this.openPreferences(),
      });
    }
    this.floatingBadge.show();
    this.eventBus.emit("floating-badge:shown", undefined);
    this.dispatchDomEvent("solvenza:badge:shown", undefined);
  }

  hideFloatingBadge(): void {
    this.floatingBadge.hide();
    this.eventBus.emit("floating-badge:hidden", undefined);
    this.dispatchDomEvent("solvenza:badge:hidden", undefined);
  }

  when(categoryOrService: string, callback: () => void): () => void {
    return CustomServiceAdapter.createWhen(
      this.eventBus,
      (cat) => this.has(cat),
      (srv) => this.hasService(srv),
    )(categoryOrService, callback);
  }

  on<E extends ConsentEvent>(
    event: E,
    handler: ConsentEventHandler<E>,
  ): () => void {
    return this.eventBus.on(event, handler);
  }

  getReceipt(): ConsentReceipt | null {
    return this.stateManager.getReceipt();
  }

  rescan(): DiagnosticReport {
    const config = this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const isGiven = !!this.getReceipt();
    return ResourceScanner.runDiagnostic(config, isGiven);
  }

  mountPolicy(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container =
      typeof targetContainer === "string"
        ? document.querySelector<HTMLElement>(targetContainer)
        : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderCookiePolicy(config, options);
    }
  }

  renderPolicyHtml(options?: LegalPolicyOptions): string {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderCookiePolicy(config, options);
  }

  mountLegalNotice(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container =
      typeof targetContainer === "string"
        ? document.querySelector<HTMLElement>(targetContainer)
        : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderLegalNotice(config, options);
    }
  }

  renderLegalNoticeHtml(options?: LegalPolicyOptions): string {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderLegalNotice(config, options);
  }

  mountPrivacyPolicy(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container =
      typeof targetContainer === "string"
        ? document.querySelector<HTMLElement>(targetContainer)
        : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderPrivacyPolicy(config, options);
    }
  }

  renderPrivacyPolicyHtml(options?: LegalPolicyOptions): string {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderPrivacyPolicy(config, options);
  }

  private saveChoices(
    choices: ConsentChoices,
    source: ConsentReceipt["source"],
  ): void {
    const config = this.stateManager.getConfig();
    if (!config) return;

    const receipt = createReceipt(
      config.policyVersion,
      choices,
      source,
      this.stateManager.getReceipt(),
      config.security?.secretKey,
    );
    if (this.isGpcActive()) {
      receipt.gpc = true;
    }

    this.stateManager.updateChoices(receipt);

    // Auto-clear cookies and web storage for revoked categories
    for (const [catId, isAllowed] of Object.entries(choices)) {
      if (!isAllowed) {
        this.purgeCategory(catId);
      }
    }

    // Persist receipt
    const cookieName = config.storage?.name || "site_consent";
    const receiptJson = JSON.stringify(receipt);

    if (config.storage?.type === "memory") {
      MemoryStore.set(cookieName, receiptJson);
    } else {
      CookieStore.set(cookieName, receiptJson, {
        path: config.storage?.path || "/",
        maxAgeDays: config.consent?.maxAgeDays ?? 365,
        sameSite: config.storage?.sameSite || "Lax",
        secure: config.storage?.secure,
        domain: config.storage?.domain,
      });
    }

    // Update Google Consent Mode
    GoogleConsentAdapter.update(choices);

    // Trigger blocker scan for newly permitted resources
    this.blockerRegistry.init(
      (cat) => this.has(cat),
      (srv) => this.hasService(srv),
    );

    // Optional receipt log endpoint
    if (config.logging?.enabled && config.logging.endpoint) {
      try {
        fetch(config.logging.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: receiptJson,
        }).catch(() => {});
      } catch {}
    }

    this.banner.remove();

    const resolvedConfig = this.getResolvedConfig() || config;
    const badgeConfig = this.resolveFloatingBadgeConfig(resolvedConfig);
    if (badgeConfig.enabled) {
      this.showFloatingBadge();
    }

    this.eventBus.emit("consent:changed", { choices, receipt });
    this.dispatchDomEvent("solvenza:updated", { choices, receipt });
  }

  private showBanner(): void {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) return;

    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (badgeConfig.enabled && badgeConfig.visibility !== "always") {
      this.hideFloatingBadge();
    }

    this.banner.render(config, {
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onConfigure: () => this.openPreferences(),
    });
    this.eventBus.emit("banner:shown", undefined);
    this.dispatchDomEvent("solvenza:show", undefined);
  }

  private setupGlobalRevocationTrigger(): void {
    if (typeof document === "undefined") return;

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-consent-open]")) {
        e.preventDefault();
        this.openPreferences();
      }
    });

    // Support zero-code DOM CustomEvents dispatching (e.g. document.dispatchEvent(new Event('solvenza:show')))
    document.addEventListener("solvenza:show", () => {
      this.showBanner();
    });

    document.addEventListener("solvenza:preferences", () => {
      this.openPreferences();
    });

    document.addEventListener("solvenza:badge:show", () => {
      this.showFloatingBadge();
    });

    document.addEventListener("solvenza:badge:hide", () => {
      this.hideFloatingBadge();
    });

    document.addEventListener("solvenza:locale", (e: any) => {
      if (e?.detail?.locale) {
        this.setLocale(e.detail.locale);
      }
    });
  }

  private resolveFloatingBadgeConfig(
    config?: ConsentConfig,
  ): FloatingBadgeConfig & { enabled: boolean } {
    const raw = config?.ui?.floatingBadge;
    if (raw === false) {
      return { enabled: false };
    }
    if (raw === true || raw === undefined) {
      return {
        enabled: true,
        position: "bottom-left",
        icon: "cookie",
        visibility: "after-consent",
      };
    }
    if (typeof raw === "object" && raw !== null) {
      return {
        enabled: raw.enabled !== false,
        position: raw.position || "bottom-left",
        label: raw.label,
        ariaLabel: raw.ariaLabel,
        showLabel: raw.showLabel,
        icon: raw.icon || "cookie",
        visibility: raw.visibility || "after-consent",
      };
    }
    return { enabled: true, position: "bottom-left", icon: "cookie", visibility: "after-consent" };
  }

  private dispatchDomEvent(name: string, detail: unknown): void {
    if (typeof document === "undefined") return;
    try {
      const customEvent = new CustomEvent(name, { detail, bubbles: true });
      document.dispatchEvent(customEvent);
    } catch {}
  }
}

// Ensure global singleton instance across bundler chunks, wrappers, and HMR
const globalScope = typeof window !== "undefined" ? (window as any) : globalThis;
if (!globalScope.__ConsentSDK_Instance__) {
  globalScope.__ConsentSDK_Instance__ = new ConsentEngine();
}

export const Consent: ConsentEngine = globalScope.__ConsentSDK_Instance__;
