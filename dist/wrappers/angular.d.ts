import { a as ConsentConfig, j as ConsentState, b as ConsentChoices, d as Consent } from '../consent-engine-DOMyEKfk.js';

/**
 * Angular Consent Service helper.
 * Compatible with AOT and JIT Angular applications.
 */
declare class ConsentService {
    init(config: ConsentConfig | string): Promise<void>;
    getConsent(): ConsentState;
    has(category: string): boolean;
    hasService(serviceId: string): boolean;
    acceptAll(): void;
    rejectAll(): void;
    setPreferences(choices: ConsentChoices): void;
    openPreferences(): void;
    withdraw(): void;
    on(event: Parameters<typeof Consent.on>[0], handler: Parameters<typeof Consent.on>[1]): () => void;
}

export { ConsentService };
