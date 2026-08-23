import type { CategoryConfig, ConsentConfig, ServiceConfig } from "../types.js";
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

  setLocale(defaultLocale: string, autoDetect = true): this {
    this.config.locale = {
      default: defaultLocale,
      autoDetect,
    };
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
