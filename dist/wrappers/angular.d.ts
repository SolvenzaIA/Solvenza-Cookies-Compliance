import { a as ConsentConfig, b as ConsentState, c as ConsentChoices, S as StoragePurgeReport, d as ConsentEvent, e as ConsentEventHandler } from '../types-HxCOfAve.js';

/**
 * Angular Consent Service helper.
 * Compatible with AOT and JIT Angular applications.
 */
declare class ConsentService {
    init(config: ConsentConfig | string): Promise<void>;
    getConsent(): ConsentState;
    getLocale(): string;
    setLocale(locale: string): void;
    /**
     * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
     * with the cookie compliance engine without boilerplate.
     */
    syncLocale(locale: string): void;
    has(category: string): boolean;
    hasService(serviceId: string): boolean;
    acceptAll(): void;
    rejectAll(): void;
    setPreferences(choices: ConsentChoices): void;
    openPreferences(): void;
    withdraw(): void;
    purgeCategory(category: string): StoragePurgeReport;
    purgeStorage(categoryOrService?: string): StoragePurgeReport[];
    on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void;
}

export { ConsentService };
