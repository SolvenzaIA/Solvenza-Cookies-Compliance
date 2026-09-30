import { useEffect, useState, type ReactNode } from "react";
import { Consent } from "../core/consent-engine.js";

/**
 * React hook to reactively subscribe to a consent category.
 *
 * @param category - Category ID (e.g. 'analytics', 'marketing')
 * @returns boolean indicating if the category is allowed
 */
export function useConsent(category: string): boolean {
  try {
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
  } catch {
    return Consent.has(category);
  }
}

/**
 * React hook to reactively subscribe to a specific service.
 *
 * @param serviceId - Service ID (e.g. 'ga4', 'youtube')
 * @returns boolean indicating if the service is allowed
 */
export function useConsentService(serviceId: string): boolean {
  try {
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
  } catch {
    return Consent.hasService(serviceId);
  }
}

/**
 * React hook to reactively subscribe to the cookie consent library's active locale.
 */
export function useConsentLocale(): string {
  try {
    const [locale, setLocale] = useState<string>(() => Consent.getLocale());

    useEffect(() => {
      const update = () => setLocale(Consent.getLocale());
      update();
      const unsub = Consent.on("locale:changed", (detail) => {
        setLocale(detail.locale);
      });
      return () => unsub();
    }, []);

    return locale;
  } catch {
    return Consent.getLocale();
  }
}

/**
 * Zero-boilerplate React hook to synchronize parent application i18n state
 * (such as react-i18next i18n.language or next-intl locale) with the consent library.
 */
export function useSyncConsentLocale(locale?: string): void {
  try {
    useEffect(() => {
      if (locale) {
        Consent.syncLocale(locale);
      }
    }, [locale]);
  } catch {
    if (locale) {
      Consent.syncLocale(locale);
    }
  }
}

export interface ConsentGateFallbackContext {
  category?: string;
  service?: string;
  openPreferences: () => void;
}

export interface ConsentGateProps {
  category?: string;
  service?: string;
  fallback?: ReactNode | ((context: ConsentGateFallbackContext) => ReactNode);
  children?: ReactNode;
}

/**
 * Declarative React Component to conditionally render content/media based on consent status.
 *
 * @example
 * ```tsx
 * <ConsentGate
 *   category="marketing"
 *   fallback={(
 *     <div className="consent-placeholder">
 *       <p>Este vídeo requiere cookies de marketing para reproducirse.</p>
 *       <button onClick={() => Consent.openPreferences()}>Configurar permisos</button>
 *     </div>
 *   )}
 * >
 *   <iframe src="https://www.youtube.com/embed/xyz" />
 * </ConsentGate>
 * ```
 */
export function ConsentGate({
  category,
  service,
  fallback = null,
  children,
}: ConsentGateProps): any {
  const isCategoryAllowed = category ? useConsent(category) : true;
  const isServiceAllowed = service ? useConsentService(service) : true;
  const isAllowed = category ? isCategoryAllowed : (service ? isServiceAllowed : true);

  if (isAllowed) {
    return children ?? null;
  }

  if (typeof fallback === "function") {
    return fallback({
      category,
      service,
      openPreferences: () => Consent.openPreferences(),
    });
  }

  return fallback;
}
