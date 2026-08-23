import { Consent } from "../core/consent-engine.js";

export function initNextConsent(configUrl = "/consent.json") {
  if (typeof window !== "undefined") {
    void Consent.init(configUrl);
  }
}
