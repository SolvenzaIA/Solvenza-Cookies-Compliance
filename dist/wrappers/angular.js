import {
  Consent
} from "../chunk-YARV6W6E.js";
import "../chunk-DDAAVRWG.js";

// src/wrappers/angular.ts
var ConsentService = class {
  async init(config) {
    return Consent.init(config);
  }
  getConsent() {
    return Consent.getConsent();
  }
  getLocale() {
    return Consent.getLocale();
  }
  setLocale(locale) {
    Consent.setLocale(locale);
  }
  /**
   * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
   * with the cookie compliance engine without boilerplate.
   */
  syncLocale(locale) {
    Consent.syncLocale(locale);
  }
  has(category) {
    return Consent.has(category);
  }
  hasService(serviceId) {
    return Consent.hasService(serviceId);
  }
  acceptAll() {
    Consent.acceptAll();
  }
  rejectAll() {
    Consent.rejectAll();
  }
  setPreferences(choices) {
    Consent.setPreferences(choices);
  }
  openPreferences() {
    Consent.openPreferences();
  }
  withdraw() {
    Consent.withdraw();
  }
  on(event, handler) {
    return Consent.on(event, handler);
  }
};
export {
  ConsentService
};
//# sourceMappingURL=angular.js.map