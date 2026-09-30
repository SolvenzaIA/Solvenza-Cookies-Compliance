import { Consent } from "../core/consent-engine.js";
export {
  useConsent,
  useConsentService,
  useConsentLocale,
  useSyncConsentLocale,
  useGpc,
  ConsentGate,
  CookiePolicy,
  LegalNotice,
  PrivacyPolicy,
} from "./vue.js";

/**
 * Initialize consent engine in Nuxt 3 applications (SSR / Universal / SSG).
 * Safely runs on client side only and synchronizes initial locale if provided.
 *
 * @example
 * ```ts
 * // plugins/consent.client.ts
 * import { initNuxtConsent } from '@solvenza/cookies-compliance/nuxt';
 *
 * export default defineNuxtPlugin(() => {
 *   initNuxtConsent('/consent.json');
 * });
 * ```
 */
export function initNuxtConsent(
  configUrl = "/consent.json",
  initialLocale?: string,
): void {
  if (typeof window !== "undefined") {
    void Consent.init(configUrl).then(() => {
      if (initialLocale) {
        Consent.syncLocale(initialLocale);
      }
    });
  }
}

/**
 * Nuxt 3 plugin definition helper.
 *
 * @example
 * ```ts
 * // plugins/consent.client.ts
 * import { defineNuxtConsentPlugin } from '@solvenza/cookies-compliance/nuxt';
 *
 * export default defineNuxtConsentPlugin('/consent.json');
 * ```
 */
export function defineNuxtConsentPlugin(configUrl = "/consent.json") {
  return (nuxtApp: any) => {
    if (typeof window !== "undefined") {
      initNuxtConsent(configUrl);
    }
    if (nuxtApp?.provide) {
      nuxtApp.provide("consent", Consent);
    }
  };
}
