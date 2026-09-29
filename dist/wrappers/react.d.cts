declare function useConsent(category: string): boolean;
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

export { useConsent, useConsentLocale, useConsentService, useSyncConsentLocale };
