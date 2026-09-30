import {
  BUILTIN_TRANSLATIONS,
  ConfigValidationError,
  Consent,
  ConsentEngine,
  CookieStorageProvider,
  CookieStore,
  FloatingBadge,
  GoogleConsentAdapter,
  I18nEngine,
  IframeGate,
  IframeResourceBlocker,
  ImageResourceBlocker,
  MemoryStorageProvider,
  MemoryStore,
  PolicyGenerator,
  ResourceGate,
  ResourceScanner,
  ScriptGate,
  ScriptResourceBlocker,
  StorageCleaner,
  computeReceiptSignature,
  createReceipt,
  isReceiptExpired,
  parseReceipt,
  sanitizeHtml,
  validateConfig,
  verifyReceiptIntegrity
} from "./chunk-CKNCOXDS.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-DDAAVRWG.js";

// src/core/builder/config-builder.ts
var ConsentConfigBuilder = class {
  constructor(policyVersion) {
    this.config = {
      schemaVersion: 1,
      policyVersion: "1.0.0",
      categories: {},
      services: {}
    };
    if (policyVersion) {
      this.config.policyVersion = policyVersion;
    }
  }
  setSchemaVersion(version) {
    this.config.schemaVersion = version;
    return this;
  }
  setPolicyVersion(version) {
    this.config.policyVersion = version;
    return this;
  }
  setPolicyUrls(privacyUrl, cookiesUrl) {
    this.config.policy = { privacyUrl, cookiesUrl };
    return this;
  }
  setLocale(defaultLocale, autoDetect = true, supported) {
    this.config.locale = {
      default: defaultLocale,
      autoDetect,
      supported
    };
    return this;
  }
  setTranslations(translations) {
    this.config.translations = translations;
    return this;
  }
  addTranslation(locale, translation) {
    if (!this.config.translations) {
      this.config.translations = {};
    }
    this.config.translations[locale.toLowerCase()] = translation;
    return this;
  }
  setFloatingBadge(badgeConfig) {
    if (!this.config.ui) {
      this.config.ui = {};
    }
    this.config.ui.floatingBadge = badgeConfig;
    return this;
  }
  addCategory(id, category) {
    if (!this.config.categories) {
      this.config.categories = {};
    }
    this.config.categories[id] = category;
    return this;
  }
  addService(id, service) {
    if (!this.config.services) {
      this.config.services = {};
    }
    this.config.services[id] = service;
    return this;
  }
  build() {
    var _a;
    if (!((_a = this.config.categories) == null ? void 0 : _a.necessary)) {
      this.config.categories = __spreadProps(__spreadValues({}, this.config.categories), {
        necessary: {
          required: true,
          default: true,
          label: "Necesarias",
          description: "Cookies y almacenamiento imprescindible para el funcionamiento del sitio."
        }
      });
    }
    const finalConfig = this.config;
    validateConfig(finalConfig);
    return finalConfig;
  }
};

// src/storage/storage-factory.ts
var StorageFactory = class {
  static create(type) {
    switch (type) {
      case "cookie":
        return new CookieStorageProvider();
      case "memory":
        return new MemoryStorageProvider();
      default:
        return new CookieStorageProvider();
    }
  }
};

// src/index.ts
if (typeof window !== "undefined") {
  window.Consent = Consent;
  window.ConsentSDK = {
    Consent,
    ConsentEngine,
    ConsentConfigBuilder,
    validateConfig,
    PolicyGenerator,
    FloatingBadge,
    ResourceScanner
  };
}
if (typeof document !== "undefined") {
  const currentScript = document.currentScript;
  const configUrl = currentScript == null ? void 0 : currentScript.getAttribute("data-config");
  if (configUrl) {
    const autoInit = () => {
      void Consent.init(configUrl).catch((err) => {
        console.warn("[ConsentSDK AutoInit Warning]", err);
      });
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", autoInit);
    } else {
      autoInit();
    }
  }
}
export {
  BUILTIN_TRANSLATIONS,
  ConfigValidationError,
  Consent,
  ConsentConfigBuilder,
  ConsentEngine,
  CookieStorageProvider,
  CookieStore,
  FloatingBadge,
  GoogleConsentAdapter,
  I18nEngine,
  IframeGate,
  IframeResourceBlocker,
  ImageResourceBlocker,
  MemoryStorageProvider,
  MemoryStore,
  PolicyGenerator,
  ResourceGate,
  ResourceScanner,
  ScriptGate,
  ScriptResourceBlocker,
  StorageCleaner,
  StorageFactory,
  computeReceiptSignature,
  createReceipt,
  isReceiptExpired,
  parseReceipt,
  sanitizeHtml,
  validateConfig,
  verifyReceiptIntegrity
};
//# sourceMappingURL=consent.esm.js.map