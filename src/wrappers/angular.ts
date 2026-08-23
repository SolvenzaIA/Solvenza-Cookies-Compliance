import { Consent } from "../core/consent-engine.js";
import type { ConsentChoices, ConsentConfig, ConsentState } from "../core/types.js";

/**
 * Angular Consent Service helper.
 * Compatible with AOT and JIT Angular applications.
 */
export class ConsentService {
  async init(config: ConsentConfig | string): Promise<void> {
    return Consent.init(config);
  }

  getConsent(): ConsentState {
    return Consent.getConsent();
  }

  has(category: string): boolean {
    return Consent.has(category);
  }

  hasService(serviceId: string): boolean {
    return Consent.hasService(serviceId);
  }

  acceptAll(): void {
    Consent.acceptAll();
  }

  rejectAll(): void {
    Consent.rejectAll();
  }

  setPreferences(choices: ConsentChoices): void {
    Consent.setPreferences(choices);
  }

  openPreferences(): void {
    Consent.openPreferences();
  }

  withdraw(): void {
    Consent.withdraw();
  }

  on(event: Parameters<typeof Consent.on>[0], handler: Parameters<typeof Consent.on>[1]) {
    return Consent.on(event, handler);
  }
}
