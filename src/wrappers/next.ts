import { Consent } from "../core/consent-engine.js";

/**
 * Initialize consent engine in Next.js applications (Pages or App Router).
 * If initialLocale is provided, it synchronizes immediately.
 * Otherwise, it automatically detects the parent locale from <html lang> or route params.
 */
export function initNextConsent(configUrl = "/consent.json", initialLocale?: string) {
  if (typeof window !== "undefined") {
    void Consent.init(configUrl).then(() => {
      if (initialLocale) {
        Consent.syncLocale(initialLocale);
      }
    });
  }
}

