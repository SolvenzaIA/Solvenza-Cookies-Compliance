import {
  Consent
} from "../chunk-FBRP4MSA.js";
import "../chunk-DDAAVRWG.js";

// src/wrappers/next.ts
function initNextConsent(configUrl = "/consent.json") {
  if (typeof window !== "undefined") {
    void Consent.init(configUrl);
  }
}
export {
  initNextConsent
};
//# sourceMappingURL=next.js.map