interface ConsentChoices {
    [categoryOrService: string]: boolean;
}
interface ServiceConfig {
    category: string;
    label?: string;
    provider?: string;
    cookies?: Array<{
        name: string;
        domain?: string;
        duration?: string;
        purpose?: string;
    }>;
}
interface CategoryConfig {
    required?: boolean;
    default?: boolean;
    label: string;
    description: string;
}
interface ConsentConfig {
    schemaVersion: number;
    policyVersion: string;
    locale?: {
        default?: string;
        autoDetect?: boolean;
    };
    security?: {
        secretKey?: string;
    };
    csp?: {
        nonce?: string;
    };
    storage?: {
        name?: string;
        type?: "cookie" | "memory";
        sameSite?: "Strict" | "Lax" | "None";
        secure?: boolean;
        path?: string;
    };
    consent?: {
        maxAgeDays?: number;
    };
    policy?: {
        privacyUrl?: string;
        cookiesUrl?: string;
    };
    categories: Record<string, CategoryConfig>;
    services?: Record<string, ServiceConfig>;
    logging?: {
        enabled?: boolean;
        endpoint?: string;
    };
    ui?: {
        theme?: "auto" | "light" | "dark";
        banner?: {
            title?: string;
            description?: string;
            accept?: string;
            reject?: string;
            configure?: string;
        };
        preferences?: {
            title?: string;
            save?: string;
            acceptAll?: string;
            rejectAll?: string;
        };
    };
}
interface ConsentReceipt {
    schema?: number;
    receiptId: string;
    policyVersion: string;
    decidedAt: string;
    updatedAt: string;
    source: "banner" | "preferences" | "withdraw" | "programmatic";
    choices: ConsentChoices;
    signature?: string;
}
interface ConsentState {
    initialized: boolean;
    policyVersion: string;
    locale: string;
    receipt: ConsentReceipt | null;
    choices: ConsentChoices;
}
type ConsentEvent = "ready" | "banner:shown" | "preferences:opened" | "preferences:closed" | "consent:changed" | "consent:accepted" | "consent:rejected" | "consent:withdrawn" | "service:blocked" | "service:loaded" | "service:revoked" | "diagnostic:warning" | "error";
interface ConsentEventDetailMap {
    ready: {
        state: ConsentState;
    };
    "banner:shown": void;
    "preferences:opened": void;
    "preferences:closed": void;
    "consent:changed": {
        choices: ConsentChoices;
        receipt: ConsentReceipt;
    };
    "consent:accepted": {
        choices: ConsentChoices;
        receipt: ConsentReceipt;
    };
    "consent:rejected": {
        choices: ConsentChoices;
        receipt: ConsentReceipt;
    };
    "consent:withdrawn": {
        previousChoices: ConsentChoices;
    };
    "service:blocked": {
        serviceId: string;
        category: string;
        element?: HTMLElement;
    };
    "service:loaded": {
        serviceId: string;
        category: string;
    };
    "service:revoked": {
        serviceId: string;
        category: string;
    };
    "diagnostic:warning": {
        code: string;
        message: string;
        details?: unknown;
    };
    error: {
        code: string;
        message: string;
        error?: unknown;
    };
}
type ConsentEventHandler<E extends ConsentEvent> = (detail: ConsentEventDetailMap[E]) => void;
interface DiagnosticReport {
    timestamp: string;
    unblockedThirdPartyScripts: string[];
    compliant: boolean;
}
interface ConsentSDKInterface {
    init(config: ConsentConfig | string): Promise<void>;
    ready(): Promise<void>;
    getConsent(): ConsentState;
    has(category: string): boolean;
    hasService(service: string): boolean;
    acceptAll(): void;
    rejectAll(): void;
    setPreferences(choices: Record<string, boolean>): void;
    openPreferences(): void;
    closePreferences(): void;
    withdraw(): void;
    when(categoryOrService: string, callback: () => void): () => void;
    on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void;
    getReceipt(): ConsentReceipt | null;
    rescan(): DiagnosticReport;
    mountPolicy(targetContainer: HTMLElement | string): void;
}

declare class ConsentEngine implements ConsentSDKInterface {
    private stateManager;
    private eventBus;
    private blockerRegistry;
    private banner;
    private preferencesModal;
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
    withdraw(): void;
    when(categoryOrService: string, callback: () => void): () => void;
    on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void;
    getReceipt(): ConsentReceipt | null;
    rescan(): DiagnosticReport;
    mountPolicy(targetContainer: HTMLElement | string): void;
    private saveChoices;
    private showBanner;
    private setupGlobalRevocationTrigger;
}
declare const Consent: ConsentEngine;

export { type CategoryConfig as C, type DiagnosticReport as D, type ServiceConfig as S, type ConsentConfig as a, type ConsentChoices as b, type ConsentReceipt as c, Consent as d, ConsentEngine as e, type ConsentEvent as f, type ConsentEventDetailMap as g, type ConsentEventHandler as h, type ConsentSDKInterface as i, type ConsentState as j };
