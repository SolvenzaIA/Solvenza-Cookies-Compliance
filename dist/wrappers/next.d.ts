import { C as ConsentConfig } from '../types--kyI7OOR.js';
export { ConsentGate, ConsentGateFallbackContext, ConsentGateProps, CookiePolicy, CookiePolicyProps, LegalNotice, LegalNoticeProps, PrivacyPolicy, PrivacyPolicyProps, useConsent, useConsentLocale, useConsentService, useGpc, useSyncConsentLocale } from './react.js';
import 'react';

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
declare function initNextConsent(configUrl?: string | ConsentConfig, initialLocale?: string): Promise<void> | void;

export { initNextConsent };
