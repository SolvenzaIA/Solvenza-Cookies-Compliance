import { a as ConsentSDKInterface, C as ConsentConfig, b as ConsentState, c as ConsentChoices, S as StoragePurgeReport, d as ConsentEvent, e as ConsentEventHandler, f as ConsentReceipt, D as DiagnosticReport, L as LegalPolicyOptions, g as LegalEntityConfig, h as LegalNoticeConfig, T as TranslationConfig, F as FloatingBadgeConfig, i as CategoryConfig, j as ServiceConfig, G as GpcConfig } from './types--kyI7OOR.js';
export { B as BannerUIConfig, k as ConsentEventDetailMap, l as LocaleConfig, P as PreferencesUIConfig, m as ServicePreset } from './types--kyI7OOR.js';
export { SERVICE_PRESETS, defineServices, getPreset, hasPreset, resolveConfigPresets } from './presets.js';

declare class ConsentEngine implements ConsentSDKInterface {
    private stateManager;
    private eventBus;
    private blockerRegistry;
    private banner;
    private preferencesModal;
    private floatingBadge;
    private i18n;
    private stopLocaleSync;
    private initPromise;
    private resolveReady;
    private readyPromise;
    init(configInput: ConsentConfig | string): Promise<void>;
    ready(): Promise<void>;
    getConsent(): ConsentState;
    has(category: string): boolean;
    hasService(serviceId: string): boolean;
    acceptAll(): void;
    rejectAll(): void;
    setPreferences(choices: ConsentChoices): void;
    openPreferences(): void;
    closePreferences(): void;
    getLocale(): string;
    setLocale(locale: string): void;
    /**
     * Synchronize active locale with parent application i18n state.
     */
    syncLocale(locale: string): void;
    /**
     * Check if Global Privacy Control (GPC) or Do Not Track (DNT) signal is active.
     */
    isGpcActive(): boolean;
    private restoreFloatingBadgeIfNeeded;
    private getResolvedConfig;
    withdraw(): void;
    purgeCategory(category: string): StoragePurgeReport;
    purgeStorage(categoryOrService?: string): StoragePurgeReport[];
    showFloatingBadge(): void;
    hideFloatingBadge(): void;
    when(categoryOrService: string, callback: () => void): () => void;
    on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void;
    getReceipt(): ConsentReceipt | null;
    rescan(): DiagnosticReport;
    mountPolicy(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void;
    renderPolicyHtml(options?: LegalPolicyOptions): string;
    mountLegalNotice(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void;
    renderLegalNoticeHtml(options?: LegalPolicyOptions): string;
    mountPrivacyPolicy(targetContainer: HTMLElement | string, options?: LegalPolicyOptions): void;
    renderPrivacyPolicyHtml(options?: LegalPolicyOptions): string;
    private saveChoices;
    private showBanner;
    private setupGlobalRevocationTrigger;
    private resolveFloatingBadgeConfig;
    private dispatchDomEvent;
}
declare const Consent: ConsentEngine;

declare class ConsentConfigBuilder {
    private config;
    constructor(policyVersion?: string);
    setSchemaVersion(version: number): this;
    setPolicyVersion(version: string): this;
    setLegalEntity(entity: LegalEntityConfig): this;
    setLegalNotice(notice: LegalNoticeConfig): this;
    setPolicyUrls(privacyUrl: string, cookiesUrl: string): this;
    setLocale(defaultLocale: string, autoDetect?: boolean, supported?: string[]): this;
    setTranslations(translations: Record<string, TranslationConfig>): this;
    addTranslation(locale: string, translation: TranslationConfig): this;
    setFloatingBadge(badgeConfig: boolean | FloatingBadgeConfig): this;
    addCategory(id: string, category: CategoryConfig): this;
    addService(id: string, service: ServiceConfig): this;
    build(): ConsentConfig;
}

declare class ConfigValidationError extends Error {
    constructor(message: string);
}
declare function validateConfig(config: ConsentConfig): void;

declare function createReceipt(policyVersion: string, choices: ConsentChoices, source: ConsentReceipt["source"], existingReceipt?: ConsentReceipt | null, secretKey?: string): ConsentReceipt;
declare function parseReceipt(jsonStr: string): ConsentReceipt | null;
declare function isReceiptExpired(receipt: ConsentReceipt, maxAgeDays?: number): boolean;

type StorageType = "cookie" | "memory";
interface CookieOptions {
    path?: string;
    maxAgeDays?: number;
    sameSite?: "Lax" | "Strict" | "None";
    secure?: boolean;
    domain?: string;
}
interface IStorageProvider {
    get(key: string): string | null;
    set(key: string, value: string, options?: CookieOptions): void;
    remove(key: string, path?: string, domain?: string): void;
    clear?(): void;
}

declare class StorageFactory {
    static create(type: StorageType): IStorageProvider;
}

declare class CookieStorageProvider implements IStorageProvider {
    get(key: string): string | null;
    set(key: string, value: string, options?: CookieOptions): void;
    remove(key: string, path?: string, domain?: string): void;
}
declare class CookieStore {
    static get(name: string): string | null;
    static set(name: string, value: string, options?: CookieOptions): void;
    static remove(name: string, path?: string, domain?: string): void;
    static clearServiceCookies(config: ConsentConfig, revokedCategory: string): void;
}

declare class MemoryStorageProvider implements IStorageProvider {
    private static store;
    get(key: string): string | null;
    set(key: string, value: string): void;
    remove(key: string): void;
    clear(): void;
}
declare const MemoryStore: {
    get: (name: string) => string | null;
    set: (name: string, val: string) => void;
    remove: (name: string) => void;
    clear: () => void;
};

declare global {
    interface Window {
        dataLayer?: any[];
        gtag?: (...args: any[]) => void;
    }
}
interface GoogleConsentModeConfig {
    analytics_storage?: string;
    ad_storage?: string;
    ad_user_data?: string;
    ad_personalization?: string;
}
declare class GoogleConsentAdapter {
    private static initialized;
    static initDefault(_configMap?: GoogleConsentModeConfig): void;
    static update(choices: ConsentChoices, configMap?: GoogleConsentModeConfig): void;
}

interface IResourceBlocker {
    type: "script" | "iframe" | "image";
    process(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean): void;
}

declare class ScriptResourceBlocker implements IResourceBlocker {
    type: "script";
    process(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean): void;
}
declare class ScriptGate {
    private static executedScripts;
    static scanAndActivate(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean, onServiceLoaded?: (serviceId: string, category: string) => void): void;
}

interface IframeGateOptions {
    onAllowClick?: (category: string, serviceId?: string) => void;
}
declare class IframeResourceBlocker implements IResourceBlocker {
    type: "iframe";
    process(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean): void;
}
declare class IframeGate {
    private static placeholders;
    static processIframes(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean, options?: IframeGateOptions): void;
    private static lockIframe;
    private static unlockIframe;
}

declare class ImageResourceBlocker implements IResourceBlocker {
    type: "image";
    process(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean): void;
}
declare class ResourceGate {
    static processImages(isCategoryAllowed: (category: string) => boolean, isServiceAllowed: (serviceId: string) => boolean): void;
}

declare class ResourceScanner {
    static runDiagnostic(_config: ConsentConfig, isConsentGiven: boolean): DiagnosticReport;
    scanThirdPartyResources(): string[];
}

/**
 * Security & Anti-Tampering Utilities
 * Solvenza Cookies Compliance
 */
declare function computeReceiptSignature(payload: string, secretKey?: string): string;
declare function verifyReceiptIntegrity(payload: string, expectedSignature: string, secretKey?: string): boolean;
declare function sanitizeHtml(str: string): string;

declare const BUILTIN_TRANSLATIONS: Record<string, TranslationConfig>;
declare class I18nEngine {
    private locale;
    constructor(defaultLocale?: string);
    setLocale(locale: string): void;
    getLocale(): string;
    detectBrowserLocale(supportedLocales?: string[]): string;
    isLocaleSupported(locale: string, config?: ConsentConfig): boolean;
    detectParentLocale(config?: ConsentConfig): string;
    startParentSync(config: ConsentConfig, onLocaleChange: (newLocale: string) => void): () => void;
    resolveConfig(config: ConsentConfig, targetLocale?: string): ConsentConfig;
    private applyTranslation;
    private filterDefined;
}

interface CookieDetailRow {
    name: string;
    type: "Cookie" | "localStorage" | "sessionStorage";
    provider: string;
    purpose: string;
    duration: string;
    categoryLabel: string;
    policyUrl?: string;
}
declare class PolicyGenerator {
    /**
     * Extract all cookie and storage key details across categories and services (including presets).
     */
    static extractCookieRows(config: ConsentConfig): CookieDetailRow[];
    /**
     * Render stylized table of cookies and storage keys.
     */
    static renderTable(config: ConsentConfig, options?: LegalPolicyOptions): string;
    /**
     * Render complete legal Cookie Policy document adapted to LSSI art. 22.2 and AEPD 2024.
     */
    static renderCookiePolicy(config: ConsentConfig, options?: LegalPolicyOptions): string;
    /**
     * Render complete legal notice (Aviso Legal) conforming to LSSI-CE Art. 10.
     */
    static renderLegalNotice(config: ConsentConfig, options?: LegalPolicyOptions): string;
    /**
     * Render Privacy Policy document (Política de Privacidad RGPD).
     */
    static renderPrivacyPolicy(config: ConsentConfig, options?: LegalPolicyOptions): string;
}

interface FloatingBadgeHandlers {
    onClick: () => void;
}
declare class FloatingBadge {
    private element;
    private isVisible;
    private getIconSvg;
    render(config: ConsentConfig, handlers: FloatingBadgeHandlers): void;
    show(): void;
    hide(): void;
    getIsVisible(): boolean;
    hasElement(): boolean;
    getElement(): HTMLElement | null;
    remove(): void;
}

/**
 * Service responsible for purging cookies, localStorage, and sessionStorage
 * keys associated with revoked consent categories or services.
 */
declare class StorageCleaner {
    /**
     * Evaluates if a given storage key or cookie name matches a pattern.
     * Supports:
     * - Wildcard glob: "*", "_ga*", "ph_*_posthog", "*session*"
     * - Exact string match (case-insensitive)
     */
    static matchesPattern(key: string, pattern: string): boolean;
    /**
     * Purges keys from window.localStorage that match any of the provided patterns.
     * Safe in SSR, sandboxed iframes, and private browsing modes.
     */
    static purgeLocalStorage(patterns: string[]): string[];
    /**
     * Purges keys from window.sessionStorage that match any of the provided patterns.
     * Safe in SSR, sandboxed iframes, and private browsing modes.
     */
    static purgeSessionStorage(patterns: string[]): string[];
    /**
     * Purges cookies declared for services, supporting wildcard glob names (e.g. "_ga_*").
     */
    static purgeCookies(cookieDeclarations: Array<{
        name: string;
        domain?: string;
    }>, defaultPath?: string, defaultDomain?: string): string[];
    private static getAllCookieNames;
    /**
     * Purges all cookies, localStorage, and sessionStorage keys associated with a category.
     */
    static purgeCategory(config: ConsentConfig, category: string): StoragePurgeReport;
}

/**
 * Detect Global Privacy Control (GPC) or Do Not Track (DNT) signal from the browser environment.
 * Compliant with W3C Global Privacy Control specification and privacy standards.
 *
 * @returns boolean indicating if a privacy signal is active
 */
declare function detectGpcSignal(): boolean;
/**
 * Resolve GPC configuration options with defaults.
 */
declare function resolveGpcConfig(config?: ConsentConfig): Required<GpcConfig>;
/**
 * Calculate the resulting consent choices when applying a GPC signal.
 */
declare function applyGpcChoices(config: ConsentConfig, baseChoices?: ConsentChoices): ConsentChoices;

export { BUILTIN_TRANSLATIONS, CategoryConfig, ConfigValidationError, Consent, ConsentChoices, ConsentConfig, ConsentConfigBuilder, ConsentEngine, ConsentEvent, ConsentEventHandler, ConsentReceipt, ConsentSDKInterface, ConsentState, CookieStorageProvider, CookieStore, DiagnosticReport, FloatingBadge, FloatingBadgeConfig, GoogleConsentAdapter, GpcConfig, I18nEngine, IframeGate, IframeResourceBlocker, ImageResourceBlocker, LegalEntityConfig, LegalNoticeConfig, LegalPolicyOptions, MemoryStorageProvider, MemoryStore, PolicyGenerator, ResourceGate, ResourceScanner, ScriptGate, ScriptResourceBlocker, ServiceConfig, StorageCleaner, StorageFactory, StoragePurgeReport, TranslationConfig, applyGpcChoices, computeReceiptSignature, createReceipt, detectGpcSignal, isReceiptExpired, parseReceipt, resolveGpcConfig, sanitizeHtml, validateConfig, verifyReceiptIntegrity };
