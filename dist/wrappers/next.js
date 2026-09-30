import {
  ConsentGate,
  useConsent,
  useConsentLocale,
  useConsentService,
  useSyncConsentLocale
} from "../chunk-3OEDFPHR.js";
import {
  Consent
} from "../chunk-UQJNVEOL.js";
import "../chunk-6BS5OK6D.js";
import "../chunk-63YYRFC3.js";

// src/wrappers/next.ts
function initNextConsent(configUrl = "/consent.json", initialLocale) {
  if (typeof window !== "undefined") {
    return Consent.init(configUrl).then(() => {
      if (initialLocale) {
        Consent.syncLocale(initialLocale);
      }
    });
  }
}
export {
  ConsentGate,
  initNextConsent,
  useConsent,
  useConsentLocale,
  useConsentService,
  useSyncConsentLocale
};
//# sourceMappingURL=next.js.map