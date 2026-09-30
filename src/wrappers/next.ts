import { Consent } from "../core/consent-engine.js";
import type { ConsentConfig } from "../core/types.js";

export {
  useConsent,
  useConsentService,
  useConsentLocale,
  useSyncConsentLocale,
  useGpc,
  ConsentGate,
  type ConsentGateProps,
  type ConsentGateFallbackContext,
  CookiePolicy,
  type CookiePolicyProps,
  LegalNotice,
  type LegalNoticeProps,
  PrivacyPolicy,
  type PrivacyPolicyProps,
} from "./react.js";

/**
 * Initialize consent engine in Next.js applications (Pages or App Router).
 * If initialLocale is provided, it synchronizes immediately.
 * Otherwise, it automatically detects the parent locale from <html lang> or route params.
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * "use client";
 * import { useEffect } from "react";
 * import { initNextConsent } from "@solvenza/cookies-compliance/next";
 *
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   useEffect(() => {
 *     void initNextConsent('/consent.json');
 *   }, []);
 *   return <html><body>{children}</body></html>;
 * }
 * ```
 */
export function initNextConsent(
  configUrl: string | ConsentConfig = "/consent.json",
  initialLocale?: string,
): Promise<void> | void {
  if (typeof window !== "undefined") {
    return Consent.init(configUrl).then(() => {
      if (initialLocale) {
        Consent.syncLocale(initialLocale);
      }
    });
  }
}
