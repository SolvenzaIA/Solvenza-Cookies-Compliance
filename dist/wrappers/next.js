import {
  Consent
} from "../chunk-2OBD2A3R.js";
import "../chunk-2IR66AV3.js";
import "../chunk-2NMEKWO5.js";

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