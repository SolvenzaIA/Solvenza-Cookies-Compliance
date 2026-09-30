import {
  Consent
} from "../chunk-TUQTDQ5E.js";
import "../chunk-DDAAVRWG.js";

// src/wrappers/react.ts
import { useEffect, useState } from "react";
function useConsent(category) {
  const [allowed, setAllowed] = useState(() => Consent.has(category));
  useEffect(() => {
    const update = () => {
      setAllowed(Consent.has(category));
    };
    update();
    const unsub1 = Consent.on("consent:changed", update);
    const unsub2 = Consent.on("consent:accepted", update);
    const unsub3 = Consent.on("consent:rejected", update);
    const unsub4 = Consent.on("consent:withdrawn", update);
    const unsub5 = Consent.on("ready", update);
    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
    };
  }, [category]);
  return allowed;
}
function useConsentService(serviceId) {
  const [allowed, setAllowed] = useState(() => Consent.hasService(serviceId));
  useEffect(() => {
    const update = () => {
      setAllowed(Consent.hasService(serviceId));
    };
    update();
    const unsub1 = Consent.on("consent:changed", update);
    const unsub2 = Consent.on("consent:accepted", update);
    const unsub3 = Consent.on("consent:rejected", update);
    const unsub4 = Consent.on("consent:withdrawn", update);
    const unsub5 = Consent.on("ready", update);
    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
    };
  }, [serviceId]);
  return allowed;
}
function useConsentLocale() {
  const [locale, setLocale] = useState(() => Consent.getLocale());
  useEffect(() => {
    const update = () => setLocale(Consent.getLocale());
    update();
    const unsub = Consent.on("locale:changed", (detail) => {
      setLocale(detail.locale);
    });
    return () => unsub();
  }, []);
  return locale;
}
function useSyncConsentLocale(locale) {
  useEffect(() => {
    if (locale) {
      Consent.syncLocale(locale);
    }
  }, [locale]);
}
export {
  useConsent,
  useConsentLocale,
  useConsentService,
  useSyncConsentLocale
};
//# sourceMappingURL=react.js.map