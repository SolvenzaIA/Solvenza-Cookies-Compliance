import { Consent, ConsentEngine } from "./core/consent-engine.js";
import { ConsentConfigBuilder } from "./core/builder/config-builder.js";
import { validateConfig, ConfigValidationError } from "./core/config-validator.js";
import { createReceipt, parseReceipt, isReceiptExpired } from "./core/receipt.js";
import { StorageFactory } from "./storage/storage-factory.js";
import { CookieStorageProvider, CookieStore } from "./storage/cookie-store.js";
import { MemoryStorageProvider, MemoryStore } from "./storage/memory-store.js";
import { GoogleConsentAdapter } from "./services/google.js";
import { ScriptResourceBlocker, ScriptGate } from "./blocker/script-gate.js";
import { IframeResourceBlocker, IframeGate } from "./blocker/iframe-gate.js";
import { ImageResourceBlocker, ResourceGate } from "./blocker/resource-gate.js";
import { ResourceScanner } from "./diagnostics/resource-scanner.js";
import { computeReceiptSignature, verifyReceiptIntegrity, sanitizeHtml } from "./core/security.js";
import { I18nEngine } from "./i18n/engine.js";
import { PolicyGenerator } from "./ui/policy-generator.js";

export {
  Consent,
  ConsentEngine,
  ConsentConfigBuilder,
  validateConfig,
  ConfigValidationError,
  createReceipt,
  parseReceipt,
  isReceiptExpired,
  StorageFactory,
  CookieStorageProvider,
  CookieStore,
  MemoryStorageProvider,
  MemoryStore,
  GoogleConsentAdapter,
  ScriptResourceBlocker,
  ScriptGate,
  IframeResourceBlocker,
  IframeGate,
  ImageResourceBlocker,
  ResourceGate,
  ResourceScanner,
  computeReceiptSignature,
  verifyReceiptIntegrity,
  sanitizeHtml,
  I18nEngine,
  PolicyGenerator,
};

export type * from "./core/types.js";

if (typeof window !== "undefined") {
  (window as any).Consent = Consent;
  (window as any).ConsentSDK = {
    Consent,
    ConsentEngine,
    ConsentConfigBuilder,
    validateConfig,
    PolicyGenerator,
    ResourceScanner,
  };
}

if (typeof document !== "undefined") {
  const currentScript = document.currentScript as HTMLScriptElement | null;
  const configUrl = currentScript?.getAttribute("data-config");
  if (configUrl) {
    const autoInit = () => {
      void Consent.init(configUrl).catch((err: unknown) => {
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
