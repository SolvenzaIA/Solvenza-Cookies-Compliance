import type {
  ConsentChoices,
  ConsentConfig,
  ConsentEvent,
  ConsentEventHandler,
  ConsentReceipt,
  ConsentSDKInterface,
  ConsentState,
  DiagnosticReport,
} from "./types.js";
import { validateConfig } from "./config-validator.js";
import { StateManager } from "./state.js";
import { EventBus } from "./events.js";
import { createReceipt, parseReceipt } from "./receipt.js";
import { evaluatePolicy } from "./policy-engine.js";
import { CookieStore } from "../storage/cookie-store.js";
import { MemoryStore } from "../storage/memory-store.js";
import { BlockerRegistry } from "../blocker/registry.js";
import { GoogleConsentAdapter } from "../services/google.js";
import { CustomServiceAdapter } from "../services/custom.js";
import { ConsentBanner } from "../ui/banner.js";
import { PreferencesModal } from "../ui/preferences.js";
import { ResourceScanner } from "../diagnostics/resource-scanner.js";
import { PolicyGenerator } from "../ui/policy-generator.js";

export class ConsentEngine implements ConsentSDKInterface {
  private stateManager = new StateManager();
  private eventBus = new EventBus();
  private blockerRegistry = new BlockerRegistry();
  private banner = new ConsentBanner();
  private preferencesModal = new PreferencesModal();

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

      validateConfig(config);

      // Load saved receipt from cookie or memory
      const cookieName = config.storage?.name || "site_consent";
      const rawReceipt =
        config.storage?.type === "memory"
          ? MemoryStore.get(cookieName)
          : CookieStore.get(cookieName);

      const savedReceipt = rawReceipt ? parseReceipt(rawReceipt) : null;
      const evalResult = evaluatePolicy(config, savedReceipt);

      const activeReceipt = evalResult.isValid ? savedReceipt : null;
      this.stateManager.init(config, evalResult.choices, activeReceipt);

      // Initialize Google Consent Mode defaults
      GoogleConsentAdapter.initDefault();
      if (evalResult.isValid) {
        GoogleConsentAdapter.update(evalResult.choices);
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

      // Attach global listeners for permanent revocation trigger [data-consent-open]
      this.setupGlobalRevocationTrigger();

      this.resolveReady?.();
      this.eventBus.emit("ready", { state: this.getConsent() });

      // If missing receipt or policy version changed, display 1st layer banner
      if (!evalResult.isValid) {
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
    const config = this.stateManager.getConfig();
    if (!config) return;

    this.preferencesModal.render(config, this.stateManager.getChoices(), {
      onSave: (choices) => this.setPreferences(choices),
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onClose: () => {
        this.eventBus.emit("preferences:closed", undefined);
      },
    });

    this.eventBus.emit("preferences:opened", undefined);
  }

  closePreferences(): void {
    this.preferencesModal.close();
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

    this.stateManager.clearChoices();
    GoogleConsentAdapter.update(this.stateManager.getChoices());
    this.eventBus.emit("consent:withdrawn", { previousChoices });

    this.showBanner();
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

  mountPolicy(targetContainer: HTMLElement | string): void {
    const config = this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container =
      typeof targetContainer === "string"
        ? document.querySelector<HTMLElement>(targetContainer)
        : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderTable(config);
    }
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

    this.stateManager.updateChoices(receipt);

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
    this.eventBus.emit("consent:changed", { choices, receipt });
  }

  private showBanner(): void {
    const config = this.stateManager.getConfig();
    if (!config) return;

    this.banner.render(config, {
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onConfigure: () => this.openPreferences(),
    });
    this.eventBus.emit("banner:shown", undefined);
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
  }
}

// Ensure global singleton instance across bundler chunks, wrappers, and HMR
const globalScope = typeof window !== "undefined" ? (window as any) : globalThis;
if (!globalScope.__ConsentSDK_Instance__) {
  globalScope.__ConsentSDK_Instance__ = new ConsentEngine();
}

export const Consent: ConsentEngine = globalScope.__ConsentSDK_Instance__;
