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

export { ConsentGate, type ConsentGateFallbackContext, type ConsentGateProps, useConsent, useConsentLocale, useConsentService, useGpc, useSyncConsentLocale };
