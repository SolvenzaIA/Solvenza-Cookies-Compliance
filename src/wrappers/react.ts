import { useEffect, useState } from "react";
import { Consent } from "../core/consent-engine.js";

export function useConsent(category: string): boolean {
  const [allowed, setAllowed] = useState<boolean>(() => Consent.has(category));

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

export function useConsentService(serviceId: string): boolean {
  const [allowed, setAllowed] = useState<boolean>(() => Consent.hasService(serviceId));

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
