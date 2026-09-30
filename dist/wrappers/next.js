import {
  ConsentGate,
  CookiePolicy,
  LegalNotice,
  PrivacyPolicy,
  useConsent,
  useConsentLocale,
  useConsentService,
  useGpc,
  useSyncConsentLocale
} from "../chunk-ZJMLSEX5.js";
import {
  Consent
} from "../chunk-FCLZMGSN.js";
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
  CookiePolicy,
  LegalNotice,
  PrivacyPolicy,
  initNextConsent,
  useConsent,
  useConsentLocale,
  useConsentService,
  useGpc,
  useSyncConsentLocale
};
//# sourceMappingURL=next.js.map