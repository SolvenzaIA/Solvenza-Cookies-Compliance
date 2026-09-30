import { L as LegalPolicyOptions } from '../types--kyI7OOR.js';
import { ReactNode } from 'react';

/**
 * React hook to reactively subscribe to a consent category.
 *
 * @param category - Category ID (e.g. 'analytics', 'marketing')
 * @returns boolean indicating if the category is allowed
 */
declare function useConsent(category: string): boolean;
/**
 * React hook to reactively subscribe to a specific service.
 *
 * @param serviceId - Service ID (e.g. 'ga4', 'youtube')
 * @returns boolean indicating if the service is allowed
 */
declare function useConsentService(serviceId: string): boolean;
/**
 * React hook to reactively subscribe to the cookie consent library's active locale.
 */
declare function useConsentLocale(): string;
/**
 * Zero-boilerplate React hook to synchronize parent application i18n state
 * (such as react-i18next i18n.language or next-intl locale) with the consent library.
 */
declare function useSyncConsentLocale(locale?: string): void;
/**
 * React hook to check if Global Privacy Control (GPC) or Do Not Track (DNT) signal is active.
 */
declare function useGpc(): boolean;
interface ConsentGateFallbackContext {
    category?: string;
    service?: string;
    openPreferences: () => void;
}
interface ConsentGateProps {
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
declare function ConsentGate({ category, service, fallback, children, }: ConsentGateProps): any;
interface CookiePolicyProps {
    view?: "full" | "table-only" | "summary";
    options?: LegalPolicyOptions;
    className?: string;
    style?: any;
}
/**
 * Declarative React component that renders the full Cookie Policy document or cookie inventory table.
 */
declare function CookiePolicy({ view, options, className, style, }: CookiePolicyProps): any;
interface LegalNoticeProps {
    options?: LegalPolicyOptions;
    className?: string;
    style?: any;
}
/**
 * Declarative React component that renders the Legal Notice (Aviso Legal LSSI-CE art. 10).
 */
declare function LegalNotice({ options, className, style }: LegalNoticeProps): any;
interface PrivacyPolicyProps {
    options?: LegalPolicyOptions;
    className?: string;
    style?: any;
}
/**
 * Declarative React component that renders the GDPR Privacy Policy document.
 */
declare function PrivacyPolicy({ options, className, style }: PrivacyPolicyProps): any;

export { ConsentGate, type ConsentGateFallbackContext, type ConsentGateProps, CookiePolicy, type CookiePolicyProps, LegalNotice, type LegalNoticeProps, PrivacyPolicy, type PrivacyPolicyProps, useConsent, useConsentLocale, useConsentService, useGpc, useSyncConsentLocale };
