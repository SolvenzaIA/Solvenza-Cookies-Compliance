import {
  Consent
} from "../chunk-TUQTDQ5E.js";
import "../chunk-DDAAVRWG.js";

// src/wrappers/next.ts
function initNextConsent(configUrl = "/consent.json", initialLocale) {
  if (typeof window !== "undefined") {
    void Consent.init(configUrl).then(() => {
      if (initialLocale) {
        Consent.syncLocale(initialLocale);
      }
    });
  }
}
export {
  initNextConsent
};
//# sourceMappingURL=next.js.map