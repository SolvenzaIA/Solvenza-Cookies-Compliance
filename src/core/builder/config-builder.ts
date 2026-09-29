import type {
  CategoryConfig,
  ConsentConfig,
  FloatingBadgeConfig,
  ServiceConfig,
  TranslationConfig,
} from "../types.js";
import { validateConfig } from "../config-validator.js";

export class ConsentConfigBuilder {
  private config: Partial<ConsentConfig> = {
    schemaVersion: 1,
    policyVersion: "1.0.0",
    categories: {},
    services: {},
  };

  constructor(policyVersion?: string) {
    if (policyVersion) {
      this.config.policyVersion = policyVersion;
    }
  }

  setSchemaVersion(version: number): this {
    this.config.schemaVersion = version;
    return this;
  }

  setPolicyVersion(version: string): this {
    this.config.policyVersion = version;
    return this;
  }

  setPolicyUrls(privacyUrl: string, cookiesUrl: string): this {
    this.config.policy = { privacyUrl, cookiesUrl };
    return this;
  }

  setLocale(defaultLocale: string, autoDetect = true, supported?: string[]): this {
    this.config.locale = {
      default: defaultLocale,
      autoDetect,
      supported,
    };
    return this;
  }

  setTranslations(translations: Record<string, TranslationConfig>): this {
    this.config.translations = translations;
    return this;
  }

  addTranslation(locale: string, translation: TranslationConfig): this {
    if (!this.config.translations) {
      this.config.translations = {};
    }
    this.config.translations[locale.toLowerCase()] = translation;
    return this;
  }

  setFloatingBadge(badgeConfig: boolean | FloatingBadgeConfig): this {
    if (!this.config.ui) {
      this.config.ui = {};
    }
    this.config.ui.floatingBadge = badgeConfig;
    return this;
  }

  addCategory(id: string, category: CategoryConfig): this {
    if (!this.config.categories) {
      this.config.categories = {};
    }
    this.config.categories[id] = category;
    return this;
  }

  addService(id: string, service: ServiceConfig): this {
    if (!this.config.services) {
      this.config.services = {};
    }
    this.config.services[id] = service;
    return this;
  }

  build(): ConsentConfig {
    if (!this.config.categories?.necessary) {
      this.config.categories = {
        ...this.config.categories,
        necessary: {
          required: true,
          default: true,
          label: "Necesarias",
          description: "Cookies y almacenamiento imprescindible para el funcionamiento del sitio.",
        },
      };
    }

    const finalConfig = this.config as ConsentConfig;
    validateConfig(finalConfig);
    return finalConfig;
  }
}
