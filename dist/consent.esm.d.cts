import { C as CategoryConfig, S as ServiceConfig, a as ConsentConfig, b as ConsentChoices, c as ConsentReceipt, D as DiagnosticReport } from './consent-engine-DOMyEKfk.cjs';
export { d as Consent, e as ConsentEngine, f as ConsentEvent, g as ConsentEventDetailMap, h as ConsentEventHandler, i as ConsentSDKInterface, j as ConsentState } from './consent-engine-DOMyEKfk.cjs';

declare class ConsentConfigBuilder {
    private config;
    constructor(policyVersion?: string);
    setSchemaVersion(version: number): this;
    setPolicyVersion(version: string): this;
    setPolicyUrls(privacyUrl: string, cookiesUrl: string): this;
    setLocale(defaultLocale: string, autoDetect?: boolean): this;
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

declare class I18nEngine {
    private locale;
    setLocale(locale: string): void;
    getLocale(): string;
    detectBrowserLocale(): string;
}

declare class PolicyGenerator {
    static renderTable(config: ConsentConfig): string;
}

export { CategoryConfig, ConfigValidationError, ConsentChoices, ConsentConfig, ConsentConfigBuilder, ConsentReceipt, CookieStorageProvider, CookieStore, DiagnosticReport, GoogleConsentAdapter, I18nEngine, IframeGate, IframeResourceBlocker, ImageResourceBlocker, MemoryStorageProvider, MemoryStore, PolicyGenerator, ResourceGate, ResourceScanner, ScriptGate, ScriptResourceBlocker, ServiceConfig, StorageFactory, computeReceiptSignature, createReceipt, isReceiptExpired, parseReceipt, sanitizeHtml, validateConfig, verifyReceiptIntegrity };
