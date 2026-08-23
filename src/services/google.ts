import type { ConsentChoices } from "../core/types.js";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export interface GoogleConsentModeConfig {
  analytics_storage?: string; // category id e.g. "analytics"
  ad_storage?: string; // category id e.g. "marketing"
  ad_user_data?: string; // category id e.g. "marketing"
  ad_personalization?: string; // category id e.g. "marketing"
}

export class GoogleConsentAdapter {
  private static initialized = false;

  static initDefault(_configMap?: GoogleConsentModeConfig): void {
    if (typeof window === "undefined") return;

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer?.push(arguments);
      };
    }

    if (!this.initialized) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500,
      });
      this.initialized = true;
    }
  }

  static update(choices: ConsentChoices, configMap?: GoogleConsentModeConfig): void {
    if (typeof window === "undefined") return;

    this.initDefault(configMap);

    const analyticsCategory = configMap?.analytics_storage || "analytics";
    const marketingCategory = configMap?.ad_storage || "marketing";

    const isAnalyticsAllowed = choices[analyticsCategory] === true;
    const isMarketingAllowed = choices[marketingCategory] === true;

    window.gtag!("consent", "update", {
      analytics_storage: isAnalyticsAllowed ? "granted" : "denied",
      ad_storage: isMarketingAllowed ? "granted" : "denied",
      ad_user_data: isMarketingAllowed ? "granted" : "denied",
      ad_personalization: isMarketingAllowed ? "granted" : "denied",
    });
  }
}
