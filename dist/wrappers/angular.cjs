"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/wrappers/angular.ts
var angular_exports = {};
__export(angular_exports, {
  ConsentService: () => ConsentService
});
module.exports = __toCommonJS(angular_exports);

// src/core/config-validator.ts
var ConfigValidationError = class extends Error {
  constructor(message) {
    super(`[ConsentSDK Config Error] ${message}`);
    this.name = "ConfigValidationError";
  }
};
function validateConfig(config) {
  if (!config) {
    throw new ConfigValidationError("Configuration object is null or undefined.");
  }
  if (typeof config.schemaVersion !== "number" || config.schemaVersion < 1) {
    throw new ConfigValidationError("Invalid or missing 'schemaVersion'. Expected integer >= 1.");
  }
  if (!config.policyVersion || typeof config.policyVersion !== "string") {
    throw new ConfigValidationError("Invalid or missing 'policyVersion'. String required.");
  }
  if (!config.categories || typeof config.categories !== "object") {
    throw new ConfigValidationError("Missing 'categories' map in configuration.");
  }
  const categoryKeys = Object.keys(config.categories);
  if (categoryKeys.length === 0) {
    throw new ConfigValidationError("At least one category must be defined in 'categories'.");
  }
  const necessaryCategory = config.categories["necessary"];
  if (!necessaryCategory) {
    throw new ConfigValidationError("Category 'necessary' must be defined.");
  }
  if (necessaryCategory.required !== true) {
    throw new ConfigValidationError("Category 'necessary' must have 'required: true'.");
  }
  for (const [catId, catConfig] of Object.entries(config.categories)) {
    if (catId !== "necessary" && !catConfig.required) {
      if (catConfig.default === true) {
        throw new ConfigValidationError(
          `Legal violation (AEPD): Optional category '${catId}' cannot have default: true. All optional categories must be opt-in (default: false).`
        );
      }
    }
  }
  if (config.services && typeof config.services === "object") {
    for (const [serviceId, serviceConfig] of Object.entries(config.services)) {
      if (!serviceConfig.category) {
        throw new ConfigValidationError(
          `Service '${serviceId}' missing 'category' reference.`
        );
      }
      if (!config.categories[serviceConfig.category]) {
        throw new ConfigValidationError(
          `Service '${serviceId}' references non-existent category '${serviceConfig.category}'.`
        );
      }
    }
  }
}

// src/core/state.ts
var StateManager = class {
  constructor() {
    this.state = {
      initialized: false,
      policyVersion: "",
      locale: "es",
      receipt: null,
      choices: {}
    };
    this.config = null;
  }
  init(config, choices, receipt) {
    var _a;
    this.config = config;
    this.state = {
      initialized: true,
      policyVersion: config.policyVersion,
      locale: ((_a = config.locale) == null ? void 0 : _a.default) || "es",
      receipt,
      choices
    };
  }
  getConfig() {
    return this.config;
  }
  getState() {
    return __spreadValues({}, this.state);
  }
  getChoices() {
    return __spreadValues({}, this.state.choices);
  }
  getReceipt() {
    return this.state.receipt;
  }
  hasCategory(category) {
    return this.state.choices[category] === true;
  }
  hasService(serviceId) {
    if (!this.config || !this.config.services) return false;
    const service = this.config.services[serviceId];
    if (!service) return false;
    return this.hasCategory(service.category);
  }
  updateChoices(receipt) {
    this.state.receipt = receipt;
    this.state.choices = __spreadValues({}, receipt.choices);
  }
  clearChoices() {
    if (!this.config) return;
    const resetChoices = {};
    for (const [catId, catConfig] of Object.entries(this.config.categories)) {
      resetChoices[catId] = catConfig.required === true;
    }
    this.state.choices = resetChoices;
    this.state.receipt = null;
  }
};

// src/core/events.ts
var EventBus = class {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map();
  }
  on(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, /* @__PURE__ */ new Set());
    }
    const set = this.handlers.get(event);
    set.add(handler);
    return () => {
      set.delete(handler);
    };
  }
  emit(event, detail) {
    const set = this.handlers.get(event);
    if (!set) return;
    for (const handler of set) {
      try {
        handler(detail);
      } catch (err) {
        console.error(`[ConsentSDK Event Error] Handler for '${event}' failed:`, err);
      }
    }
  }
  clear() {
    this.handlers.clear();
  }
};

// src/core/security.ts
function sha256Sync(ascii) {
  let i, j;
  let result = "";
  const asciiLength = ascii.length * 8;
  let hash = [
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ];
  const k = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  const blocks = [];
  for (i = 0; i < ascii.length; i++) {
    blocks[i >> 2] |= ascii.charCodeAt(i) << 24 - i % 4 * 8;
  }
  blocks[asciiLength >> 5] |= 128 << 24 - asciiLength % 32;
  blocks[(asciiLength + 64 >> 9 << 4) + 15] = asciiLength;
  for (i = 0; i < blocks.length; i += 16) {
    const w = blocks.slice(i, i + 16);
    const oldHash = [...hash];
    for (j = 0; j < 64; j++) {
      const w15 = w[j - 15], w2 = w[j - 2];
      const s0 = (w15 >>> 7 | w15 << 25) ^ (w15 >>> 18 | w15 << 14) ^ w15 >>> 3;
      const s1 = (w2 >>> 17 | w2 << 15) ^ (w2 >>> 19 | w2 << 13) ^ w2 >>> 10;
      w[j] = j < 16 ? w[j] || 0 : w[j - 16] + s0 + w[j - 7] + s1 | 0;
      const ch = hash[4] & hash[5] ^ ~hash[4] & hash[6];
      const maj = hash[0] & hash[1] ^ hash[0] & hash[2] ^ hash[1] & hash[2];
      const sig0 = (hash[0] >>> 2 | hash[0] << 30) ^ (hash[0] >>> 13 | hash[0] << 19) ^ (hash[0] >>> 22 | hash[0] << 10);
      const sig1 = (hash[4] >>> 6 | hash[4] << 26) ^ (hash[4] >>> 11 | hash[4] << 21) ^ (hash[4] >>> 25 | hash[4] << 7);
      const t1 = hash[7] + sig1 + ch + k[j] + (w[j] | 0);
      const t2 = sig0 + maj;
      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = hash[3] + t1 | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = t1 + t2 | 0;
    }
    for (j = 0; j < 8; j++) {
      hash[j] = hash[j] + oldHash[j] | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = hash[i] >> j * 8 & 255;
      result += (b < 16 ? "0" : "") + b.toString(16);
    }
  }
  return result;
}
function computeReceiptSignature(payload, secretKey) {
  if (secretKey) {
    return sha256Sync(`${secretKey}:${payload}:${secretKey}`);
  }
  let hash = 2166136261;
  for (let i = 0; i < payload.length; i++) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}
function sanitizeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function sanitizeUrl(url) {
  if (!url) return "#";
  const trimmed = url.trim().toLowerCase();
  if (trimmed.startsWith("javascript:") || trimmed.startsWith("data:") || trimmed.startsWith("vbscript:")) {
    return "#";
  }
  return url;
}

// src/core/receipt.ts
function generateUUID() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}
function createReceipt(policyVersion, choices, source, existingReceipt, secretKey) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const receiptId = (existingReceipt == null ? void 0 : existingReceipt.receiptId) || generateUUID();
  const decidedAt = (existingReceipt == null ? void 0 : existingReceipt.decidedAt) || now;
  const payloadToSign = `${receiptId}:${policyVersion}:${JSON.stringify(choices)}`;
  const signature = computeReceiptSignature(payloadToSign, secretKey);
  return {
    schema: 1,
    receiptId,
    policyVersion,
    decidedAt,
    updatedAt: now,
    source,
    choices,
    signature
  };
}
function parseReceipt(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    if (typeof data === "object" && data !== null && typeof data.receiptId === "string" && typeof data.policyVersion === "string" && typeof data.choices === "object") {
      return data;
    }
    return null;
  } catch (e) {
    return null;
  }
}
function isReceiptExpired(receipt, maxAgeDays = 365) {
  if (!receipt.updatedAt) return true;
  const updated = new Date(receipt.updatedAt).getTime();
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 86400 * 1e3;
  return now - updated > maxAgeMs;
}

// src/core/policy-engine.ts
function evaluatePolicy(config, receipt) {
  var _a, _b, _c;
  const defaultChoices = {};
  for (const [catId, catConfig] of Object.entries(config.categories)) {
    defaultChoices[catId] = catConfig.required === true;
  }
  if (!receipt) {
    return {
      isValid: false,
      reason: "missing",
      choices: defaultChoices
    };
  }
  if (receipt.policyVersion !== config.policyVersion) {
    return {
      isValid: false,
      reason: "policy_version_changed",
      choices: defaultChoices
    };
  }
  const maxAgeDays = (_b = (_a = config.consent) == null ? void 0 : _a.maxAgeDays) != null ? _b : 365;
  if (isReceiptExpired(receipt, maxAgeDays)) {
    return {
      isValid: false,
      reason: "expired",
      choices: defaultChoices
    };
  }
  if (receipt.signature) {
    const payloadToSign = `${receipt.receiptId}:${receipt.policyVersion}:${JSON.stringify(receipt.choices)}`;
    const expectedSignature = computeReceiptSignature(payloadToSign, (_c = config.security) == null ? void 0 : _c.secretKey);
    if (receipt.signature !== expectedSignature) {
      return {
        isValid: false,
        reason: "tampered",
        choices: defaultChoices
      };
    }
  }
  const activeChoices = __spreadValues({}, defaultChoices);
  for (const catId of Object.keys(config.categories)) {
    if (catId === "necessary") {
      activeChoices[catId] = true;
    } else if (typeof receipt.choices[catId] === "boolean") {
      activeChoices[catId] = receipt.choices[catId];
    }
  }
  return {
    isValid: true,
    reason: "valid",
    choices: activeChoices
  };
}

// src/storage/cookie-store.ts
var CookieStore = class {
  static get(name) {
    if (typeof document === "undefined") return null;
    const nameEQ = encodeURIComponent(name) + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    return null;
  }
  static set(name, value, options = {}) {
    var _a, _b;
    if (typeof document === "undefined") return;
    const path = options.path || "/";
    const maxAgeDays = (_a = options.maxAgeDays) != null ? _a : 365;
    const maxAgeSeconds = Math.floor(maxAgeDays * 86400);
    const sameSite = options.sameSite || "Lax";
    const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
    const secure = (_b = options.secure) != null ? _b : isHttps;
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAgeSeconds}; SameSite=${sameSite}`;
    if (secure) {
      cookieStr += "; Secure";
    }
    document.cookie = cookieStr;
  }
  static remove(name, path = "/") {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Max-Age=0; SameSite=Lax`;
  }
};

// src/storage/memory-store.ts
var _MemoryStorageProvider = class _MemoryStorageProvider {
  get(key) {
    var _a;
    return (_a = _MemoryStorageProvider.store.get(key)) != null ? _a : null;
  }
  set(key, value) {
    _MemoryStorageProvider.store.set(key, value);
  }
  remove(key) {
    _MemoryStorageProvider.store.delete(key);
  }
  clear() {
    _MemoryStorageProvider.store.clear();
  }
};
_MemoryStorageProvider.store = /* @__PURE__ */ new Map();
var MemoryStorageProvider = _MemoryStorageProvider;
var MemoryStore = {
  get: (name) => new MemoryStorageProvider().get(name),
  set: (name, val) => new MemoryStorageProvider().set(name, val),
  remove: (name) => new MemoryStorageProvider().remove(name),
  clear: () => new MemoryStorageProvider().clear()
};

// src/blocker/script-gate.ts
var ScriptGate = class {
  static scanAndActivate(isCategoryAllowed, isServiceAllowed, onServiceLoaded) {
    var _a;
    if (typeof document === "undefined") return;
    const blockedScripts = Array.from(
      document.querySelectorAll(
        'script[type="text/plain"][data-consent], script[type="text/plain"][data-service]'
      )
    );
    for (const oldScript of blockedScripts) {
      if (this.executedScripts.has(oldScript)) continue;
      const category = oldScript.getAttribute("data-consent");
      const serviceId = oldScript.getAttribute("data-service");
      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }
      if (!isAllowed) continue;
      this.executedScripts.add(oldScript);
      const newScript = document.createElement("script");
      for (let i = 0; i < oldScript.attributes.length; i++) {
        const attr = oldScript.attributes[i];
        if (attr.name === "type") continue;
        if (attr.name === "data-src") {
          newScript.src = attr.value;
          continue;
        }
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.type = "text/javascript";
      if (!newScript.src && oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      (_a = oldScript.parentNode) == null ? void 0 : _a.replaceChild(newScript, oldScript);
      if (serviceId || category) {
        onServiceLoaded == null ? void 0 : onServiceLoaded(serviceId || category, category || "custom");
      }
    }
  }
};
ScriptGate.executedScripts = /* @__PURE__ */ new Set();

// src/blocker/iframe-gate.ts
var IframeGate = class {
  static processIframes(isCategoryAllowed, isServiceAllowed, options = {}) {
    if (typeof document === "undefined") return;
    const iframes = Array.from(
      document.querySelectorAll(
        "iframe[data-consent], iframe[data-service]"
      )
    );
    for (const iframe of iframes) {
      const category = iframe.getAttribute("data-consent");
      const serviceId = iframe.getAttribute("data-service");
      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }
      const originalSrc = iframe.getAttribute("data-src") || iframe.getAttribute("src");
      if (!originalSrc) continue;
      if (!iframe.getAttribute("data-src")) {
        iframe.setAttribute("data-src", originalSrc);
      }
      if (isAllowed) {
        this.unlockIframe(iframe, originalSrc);
      } else {
        this.lockIframe(
          iframe,
          category || "marketing",
          serviceId || void 0,
          options
        );
      }
    }
  }
  static lockIframe(iframe, category, serviceId, options) {
    var _a;
    if (iframe.hasAttribute("src")) {
      iframe.removeAttribute("src");
    }
    if (this.placeholders.has(iframe)) return;
    const container = document.createElement("div");
    container.className = "consent-iframe-placeholder";
    container.style.cssText = `
      width: ${iframe.width ? iframe.width.endsWith("%") || iframe.width.endsWith("px") ? iframe.width : iframe.width + "px" : "100%"};
      height: ${iframe.height ? iframe.height.endsWith("%") || iframe.height.endsWith("px") ? iframe.height : iframe.height + "px" : "315px"};
      min-height: 200px;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1.5rem;
      border-radius: 8px;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, sans-serif;
    `;
    const titleText = serviceId ? `Contenido de ${serviceId} bloqueado` : "Contenido externo bloqueado";
    const bodyText = "Este contenido est\xE1 bloqueado hasta que autorices esta finalidad de privacidad.";
    container.innerHTML = `
      <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem; color: #f8fafc;">
        ${titleText}
      </div>
      <p style="font-size: 0.9rem; color: #94a3b8; margin: 0 0 1rem 0; max-width: 400px;">
        ${bodyText}
      </p>
      <button type="button" class="consent-placeholder-allow-btn" style="
        background: #2563eb;
        color: #ffffff;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.2s ease;
      ">
        Permitir y mostrar contenido
      </button>
    `;
    const button = container.querySelector(
      ".consent-placeholder-allow-btn"
    );
    button == null ? void 0 : button.addEventListener("click", () => {
      var _a2;
      (_a2 = options.onAllowClick) == null ? void 0 : _a2.call(options, category, serviceId);
    });
    iframe.style.display = "none";
    (_a = iframe.parentNode) == null ? void 0 : _a.insertBefore(container, iframe);
    this.placeholders.set(iframe, container);
  }
  static unlockIframe(iframe, src) {
    var _a;
    if (iframe.getAttribute("src") !== src) {
      iframe.setAttribute("src", src);
    }
    iframe.style.display = "";
    const placeholder = this.placeholders.get(iframe);
    if (placeholder) {
      (_a = placeholder.parentNode) == null ? void 0 : _a.removeChild(placeholder);
      this.placeholders.delete(iframe);
    }
  }
};
IframeGate.placeholders = /* @__PURE__ */ new Map();

// src/blocker/resource-gate.ts
var ResourceGate = class {
  static processImages(isCategoryAllowed, isServiceAllowed) {
    if (typeof document === "undefined") return;
    const images = Array.from(
      document.querySelectorAll(
        "img[data-consent], img[data-service]"
      )
    );
    for (const img of images) {
      const category = img.getAttribute("data-consent");
      const serviceId = img.getAttribute("data-service");
      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }
      const originalSrc = img.getAttribute("data-src") || img.getAttribute("src");
      if (!originalSrc) continue;
      if (!img.getAttribute("data-src")) {
        img.setAttribute("data-src", originalSrc);
      }
      if (isAllowed) {
        if (img.getAttribute("src") !== originalSrc) {
          img.setAttribute("src", originalSrc);
        }
      } else {
        if (img.hasAttribute("src")) {
          img.removeAttribute("src");
        }
      }
    }
  }
};

// src/blocker/registry.ts
var BlockerRegistry = class {
  constructor() {
    this.observer = null;
  }
  init(isCategoryAllowed, isServiceAllowed, iframeOptions, onServiceLoaded) {
    const runBlockers = () => {
      ScriptGate.scanAndActivate(
        isCategoryAllowed,
        isServiceAllowed,
        onServiceLoaded
      );
      IframeGate.processIframes(
        isCategoryAllowed,
        isServiceAllowed,
        iframeOptions
      );
      ResourceGate.processImages(isCategoryAllowed, isServiceAllowed);
    };
    runBlockers();
    if (typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
      this.observer = new MutationObserver(() => {
        runBlockers();
      });
      this.observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
      });
    }
  }
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
};

// src/services/google.ts
var GoogleConsentAdapter = class {
  static initDefault(_configMap) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function() {
        var _a;
        (_a = window.dataLayer) == null ? void 0 : _a.push(arguments);
      };
    }
    if (!this.initialized) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500
      });
      this.initialized = true;
    }
  }
  static update(choices, configMap) {
    if (typeof window === "undefined") return;
    this.initDefault(configMap);
    const analyticsCategory = (configMap == null ? void 0 : configMap.analytics_storage) || "analytics";
    const marketingCategory = (configMap == null ? void 0 : configMap.ad_storage) || "marketing";
    const isAnalyticsAllowed = choices[analyticsCategory] === true;
    const isMarketingAllowed = choices[marketingCategory] === true;
    window.gtag("consent", "update", {
      analytics_storage: isAnalyticsAllowed ? "granted" : "denied",
      ad_storage: isMarketingAllowed ? "granted" : "denied",
      ad_user_data: isMarketingAllowed ? "granted" : "denied",
      ad_personalization: isMarketingAllowed ? "granted" : "denied"
    });
  }
};
GoogleConsentAdapter.initialized = false;

// src/services/custom.ts
var CustomServiceAdapter = class {
  static createWhen(eventBus, isCategoryAllowed, isServiceAllowed) {
    return function when(categoryOrService, callback) {
      if (isCategoryAllowed(categoryOrService) || isServiceAllowed(categoryOrService)) {
        try {
          callback();
        } catch (err) {
          console.error(`[ConsentSDK when()] Callback execution failed:`, err);
        }
      }
      return eventBus.on("consent:changed", ({ choices }) => {
        if (choices[categoryOrService] === true || isServiceAllowed(categoryOrService)) {
          try {
            callback();
          } catch (err) {
            console.error(`[ConsentSDK when()] Callback execution failed:`, err);
          }
        }
      });
    };
  }
};

// src/ui/styles.ts
function injectStyles(nonce) {
  if (typeof document === "undefined") return;
  const existing = document.getElementById("consent-sdk-styles");
  if (existing) {
    existing.remove();
  }
  const styleEl = document.createElement("style");
  styleEl.id = "consent-sdk-styles";
  if (nonce) {
    styleEl.setAttribute("nonce", nonce);
  }
  styleEl.textContent = `
    :root {
      --consent-bg: #ffffff;
      --consent-fg: #0f172a;
      --consent-muted: #64748b;
      --consent-divider: #f1f5f9;
      --consent-border: #e2e8f0;
      --consent-hover-bg: #f8fafc;
      --consent-primary: #0f172a;
      --consent-primary-hover: #1e293b;
      --consent-primary-fg: #ffffff;
      --consent-secondary: #f8fafc;
      --consent-secondary-hover: #f1f5f9;
      --consent-secondary-fg: #0f172a;
      --consent-accent: #2563eb;
      --consent-focus-ring: rgba(37, 99, 235, 0.3);
      --consent-font: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif;
      --consent-modal-shadow: 0 32px 64px -16px rgba(15, 23, 42, 0.2), 0 0 1px rgba(15, 23, 42, 0.12);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --consent-bg: #0f172a;
        --consent-fg: #f8fafc;
        --consent-muted: #94a3b8;
        --consent-divider: #1e293b;
        --consent-border: #334155;
        --consent-hover-bg: #1e293b;
        --consent-primary: #f8fafc;
        --consent-primary-hover: #ffffff;
        --consent-primary-fg: #0f172a;
        --consent-secondary: #1e293b;
        --consent-secondary-hover: #334155;
        --consent-secondary-fg: #f8fafc;
        --consent-modal-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.12);
      }
    }

    @keyframes consentSlideUp {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.985);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes consentFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 1st Layer Banner - Clean & Seamless */
    .consent-banner-wrapper {
      position: fixed;
      bottom: 1.25rem;
      left: 1.25rem;
      right: 1.25rem;
      max-width: 1060px;
      margin: 0 auto;
      z-index: 2147483645;
      background: var(--consent-bg);
      color: var(--consent-fg);
      border: 1px solid var(--consent-border);
      border-radius: 20px;
      box-shadow: var(--consent-modal-shadow);
      padding: 1.5rem 1.75rem;
      font-family: var(--consent-font);
      font-size: 0.92rem;
      line-height: 1.5;
      animation: consentSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-sizing: border-box;
    }

    .consent-banner-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    @media (min-width: 860px) {
      .consent-banner-container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .consent-banner-text {
      flex: 1;
    }

    .consent-banner-title {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      margin: 0 0 0.35rem 0;
      color: var(--consent-fg);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .consent-banner-title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: rgba(37, 99, 235, 0.1);
      color: var(--consent-accent);
    }

    .consent-banner-desc {
      margin: 0;
      color: var(--consent-muted);
      font-size: 0.88rem;
      max-width: 720px;
    }

    .consent-banner-links {
      margin-top: 0.4rem;
    }

    .consent-banner-links a {
      color: var(--consent-muted);
      font-size: 0.83rem;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-weight: 500;
      margin-right: 1.2rem;
      transition: color 0.15s ease;
    }

    .consent-banner-links a:hover {
      color: var(--consent-fg);
    }

    /* Equal Visual Prominence CTAs */
    .consent-banner-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    @media (min-width: 640px) {
      .consent-banner-actions {
        flex-direction: row;
        width: auto;
        align-items: center;
      }
    }

    .consent-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      font-size: 0.88rem;
      font-weight: 600;
      border-radius: 10px;
      border: 1px solid var(--consent-border);
      cursor: pointer;
      font-family: inherit;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 42px;
      min-width: 110px;
      box-sizing: border-box;
      user-select: none;
    }

    .consent-btn:hover {
      transform: translateY(-1px);
    }

    .consent-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .consent-btn:focus-visible {
      outline: 3px solid var(--consent-focus-ring);
      outline-offset: 2px;
    }

    .consent-btn-reject {
      background: var(--consent-secondary);
      color: var(--consent-secondary-fg);
      border-color: var(--consent-border);
    }

    .consent-btn-reject:hover {
      background: var(--consent-secondary-hover);
    }

    .consent-btn-configure {
      background: transparent;
      color: var(--consent-muted);
      border-color: transparent;
    }

    .consent-btn-configure:hover {
      color: var(--consent-fg);
      background: var(--consent-secondary);
    }

    .consent-btn-accept {
      background: var(--consent-primary);
      color: var(--consent-primary-fg);
      border-color: var(--consent-primary);
    }

    .consent-btn-accept:hover {
      background: var(--consent-primary-hover);
    }

    /* 2nd Layer Preference Modal - Ultra Clean Linear List Style */
    .consent-dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 2147483646;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      box-sizing: border-box;
      animation: consentFadeIn 0.2s ease forwards;
    }

    .consent-dialog {
      background: var(--consent-bg);
      color: var(--consent-fg);
      border: 1px solid var(--consent-border);
      border-radius: 20px;
      width: 100%;
      max-width: 600px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--consent-modal-shadow);
      font-family: var(--consent-font);
      overflow: hidden;
      animation: consentSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .consent-dialog-header {
      padding: 1.5rem 1.75rem 1.25rem 1.75rem;
      border-bottom: 1px solid var(--consent-divider);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .consent-dialog-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      margin: 0;
    }

    .consent-dialog-close {
      background: transparent;
      border: none;
      color: var(--consent-muted);
      cursor: pointer;
      padding: 0.35rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
      margin: -0.35rem -0.35rem 0 0;
    }

    .consent-dialog-close:hover {
      background: var(--consent-secondary);
      color: var(--consent-fg);
    }

    /* Seamless Category List Body (NO individual boxed divs) */
    .consent-dialog-body {
      padding: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .consent-category-row {
      padding: 1.25rem 1.75rem;
      border-bottom: 1px solid var(--consent-divider);
      transition: background 0.15s ease;
    }

    .consent-category-row:last-child {
      border-bottom: none;
    }

    .consent-category-row:hover {
      background: var(--consent-hover-bg);
    }

    .consent-category-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .consent-category-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--consent-fg);
    }

    .consent-category-desc {
      margin: 0.3rem 0 0 0;
      font-size: 0.85rem;
      color: var(--consent-muted);
      line-height: 1.45;
    }

    /* Minimalist Badges */
    .consent-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .consent-badge-required {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
    }

    .consent-badge-optional {
      background: rgba(100, 116, 139, 0.08);
      color: var(--consent-muted);
    }

    /* Inline Service Disclosure Button */
    .consent-toggle-services-btn {
      border: none;
      background: transparent;
      color: var(--consent-accent);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0.35rem 0 0 0;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-family: inherit;
    }

    .consent-toggle-services-btn:hover {
      opacity: 0.85;
    }

    /* Minimalist Toggle Switch */
    .consent-toggle {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
      flex-shrink: 0;
      margin-top: 0.15rem;
    }

    .consent-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .consent-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #cbd5e1;
      transition: background-color 0.2s ease;
      border-radius: 22px;
    }

    .consent-toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }

    .consent-toggle input:checked + .consent-toggle-slider {
      background-color: var(--consent-accent);
    }

    .consent-toggle input:checked + .consent-toggle-slider:before {
      transform: translateX(18px);
    }

    .consent-toggle input:disabled + .consent-toggle-slider {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Footer */
    .consent-dialog-footer {
      padding: 1.25rem 1.75rem;
      border-top: 1px solid var(--consent-divider);
      background: var(--consent-bg);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      justify-content: space-between;
      align-items: center;
    }

    @media (min-width: 520px) {
      .consent-dialog-footer {
        flex-direction: row;
      }
    }
  `;
  document.head.appendChild(styleEl);
}

// src/ui/banner.ts
var ConsentBanner = class {
  constructor() {
    this.element = null;
  }
  render(config, handlers) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (typeof document === "undefined") return;
    this.remove();
    injectStyles((_a = config.csp) == null ? void 0 : _a.nonce);
    const bannerConfig = ((_b = config.ui) == null ? void 0 : _b.banner) || {};
    const titleText = sanitizeHtml(bannerConfig.title || "Tu privacidad, bajo tu control");
    const descText = sanitizeHtml(
      bannerConfig.description || "Usamos tecnolog\xEDas necesarias para el funcionamiento del sitio. Con tu permiso, tambi\xE9n podemos utilizar anal\xEDtica y marketing."
    );
    const acceptText = sanitizeHtml(bannerConfig.accept || "Aceptar todas");
    const rejectText = sanitizeHtml(bannerConfig.reject || "Rechazar todas");
    const configureText = sanitizeHtml(bannerConfig.configure || "Configurar");
    const privacyUrl = sanitizeUrl(((_c = config.policy) == null ? void 0 : _c.privacyUrl) || "/politica-privacidad");
    const cookiesUrl = sanitizeUrl(((_d = config.policy) == null ? void 0 : _d.cookiesUrl) || "/politica-cookies");
    const wrapper = document.createElement("div");
    wrapper.className = "consent-banner-wrapper";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute(
      "aria-label",
      "Gesti\xF3n de consentimiento de privacidad"
    );
    wrapper.innerHTML = `
      <div class="consent-banner-container">
        <div class="consent-banner-text">
          <h2 class="consent-banner-title">
            <span class="consent-banner-title-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            ${titleText}
          </h2>
          <p class="consent-banner-desc">${descText}</p>
          <div class="consent-banner-links">
            <a href="${cookiesUrl}" target="_blank" rel="noopener">Pol\xEDtica de cookies</a>
            <a href="${privacyUrl}" target="_blank" rel="noopener">Pol\xEDtica de privacidad</a>
          </div>
        </div>
        <div class="consent-banner-actions">
          <button type="button" class="consent-btn consent-btn-reject" id="consent-btn-reject">
            ${rejectText}
          </button>
          <button type="button" class="consent-btn consent-btn-configure" id="consent-btn-configure">
            ${configureText}
          </button>
          <button type="button" class="consent-btn consent-btn-accept" id="consent-btn-accept">
            ${acceptText}
          </button>
        </div>
      </div>
    `;
    (_e = wrapper.querySelector("#consent-btn-reject")) == null ? void 0 : _e.addEventListener("click", () => {
      handlers.onRejectAll();
      this.remove();
    });
    (_f = wrapper.querySelector("#consent-btn-configure")) == null ? void 0 : _f.addEventListener("click", () => {
      handlers.onConfigure();
    });
    (_g = wrapper.querySelector("#consent-btn-accept")) == null ? void 0 : _g.addEventListener("click", () => {
      handlers.onAcceptAll();
      this.remove();
    });
    document.body.appendChild(wrapper);
    this.element = wrapper;
  }
  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
};

// src/ui/preferences.ts
var PreferencesModal = class {
  constructor() {
    this.backdrop = null;
    this.lastFocusedElement = null;
  }
  render(config, currentChoices, handlers) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (typeof document === "undefined") return;
    this.close();
    injectStyles((_a = config.csp) == null ? void 0 : _a.nonce);
    this.lastFocusedElement = document.activeElement;
    const prefConfig = ((_b = config.ui) == null ? void 0 : _b.preferences) || {};
    const modalTitle = sanitizeHtml(prefConfig.title || "Preferencias de privacidad");
    const saveText = sanitizeHtml(prefConfig.save || "Guardar selecci\xF3n");
    const acceptAllText = sanitizeHtml(prefConfig.acceptAll || "Permitir todas");
    const rejectAllText = sanitizeHtml(prefConfig.rejectAll || "Rechazar opcionales");
    const backdrop = document.createElement("div");
    backdrop.className = "consent-dialog-backdrop";
    const dialog = document.createElement("div");
    dialog.className = "consent-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "consent-dialog-title-id");
    const header = document.createElement("div");
    header.className = "consent-dialog-header";
    header.innerHTML = `
      <div>
        <h2 class="consent-dialog-title" id="consent-dialog-title-id">${modalTitle}</h2>
        <p style="margin: 0.2rem 0 0 0; font-size: 0.84rem; color: var(--consent-muted); font-weight: 400;">
          Gestiona tus permisos de almacenamiento por finalidad (LSSI art. 22.2 &amp; RGPD).
        </p>
      </div>
      <button type="button" class="consent-dialog-close" aria-label="Cerrar ventana">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;
    const body = document.createElement("div");
    body.className = "consent-dialog-body";
    const categoryChoices = __spreadValues({}, currentChoices);
    for (const [catId, catConfig] of Object.entries(config.categories)) {
      const catRow = document.createElement("div");
      catRow.className = "consent-category-row";
      const isRequired = catConfig.required === true;
      const isChecked = isRequired ? true : (_c = categoryChoices[catId]) != null ? _c : false;
      const associatedServices = config.services ? Object.entries(config.services).filter(([_, srv]) => srv.category === catId) : [];
      let servicesHtml = "";
      if (associatedServices.length > 0) {
        servicesHtml = `
          <div class="consent-category-services" id="cat-services-${catId}" style="display: none; margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed var(--consent-divider); font-size: 0.82rem;">
            <div style="font-weight: 600; color: var(--consent-muted); margin-bottom: 0.4rem; font-size: 0.75rem; letter-spacing: 0.02em;">
              Servicios incluidos (${associatedServices.length})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem;">
              ${associatedServices.map(
          ([srvId, srv]) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0;">
                  <span style="font-weight: 500;">${sanitizeHtml(srv.label || srvId)}</span>
                  <span style="color: var(--consent-muted); font-size: 0.78rem;">${sanitizeHtml(srv.provider || "Terceros")}</span>
                </div>
              `
        ).join("")}
            </div>
          </div>
        `;
      }
      catRow.innerHTML = `
        <div class="consent-category-header">
          <div style="flex: 1; padding-right: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="consent-category-name">${sanitizeHtml(catConfig.label)}</span>
              ${isRequired ? '<span class="consent-badge consent-badge-required">Requerida</span>' : '<span class="consent-badge consent-badge-optional">Opcional</span>'}
            </div>
            <p class="consent-category-desc">${sanitizeHtml(catConfig.description)}</p>
            ${associatedServices.length > 0 ? `<button type="button" class="consent-toggle-services-btn" data-target="cat-services-${catId}">
                    Ver servicios (${associatedServices.length}) \u25BE
                   </button>` : ""}
          </div>
          <label class="consent-toggle">
            <input type="checkbox" id="cat-toggle-${catId}" ${isChecked ? "checked" : ""} ${isRequired ? "disabled" : ""}>
            <span class="consent-toggle-slider"></span>
          </label>
        </div>
        ${servicesHtml}
      `;
      if (!isRequired) {
        const checkbox = catRow.querySelector(
          `#cat-toggle-${catId}`
        );
        checkbox == null ? void 0 : checkbox.addEventListener("change", (e) => {
          categoryChoices[catId] = e.target.checked;
        });
      }
      const toggleServicesBtn = catRow.querySelector(
        ".consent-toggle-services-btn"
      );
      if (toggleServicesBtn) {
        toggleServicesBtn.addEventListener("click", () => {
          const targetId = toggleServicesBtn.getAttribute("data-target");
          if (targetId) {
            const targetEl = catRow.querySelector(`#${targetId}`);
            if (targetEl) {
              const isHidden = targetEl.style.display === "none";
              targetEl.style.display = isHidden ? "block" : "none";
              toggleServicesBtn.textContent = isHidden ? `Ocultar servicios (${associatedServices.length}) \u25B4` : `Ver servicios (${associatedServices.length}) \u25BE`;
            }
          }
        });
      }
      body.appendChild(catRow);
    }
    const footer = document.createElement("div");
    footer.className = "consent-dialog-footer";
    footer.innerHTML = `
      <button type="button" class="consent-btn consent-btn-reject" id="consent-pref-reject">
        ${rejectAllText}
      </button>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="consent-btn consent-btn-configure" id="consent-pref-accept">
          ${acceptAllText}
        </button>
        <button type="button" class="consent-btn consent-btn-accept" id="consent-pref-save">
          ${saveText}
        </button>
      </div>
    `;
    dialog.appendChild(header);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    backdrop.appendChild(dialog);
    (_d = header.querySelector(".consent-dialog-close")) == null ? void 0 : _d.addEventListener("click", () => {
      handlers.onClose();
      this.close();
    });
    (_e = footer.querySelector("#consent-pref-reject")) == null ? void 0 : _e.addEventListener("click", () => {
      handlers.onRejectAll();
      this.close();
    });
    (_f = footer.querySelector("#consent-pref-accept")) == null ? void 0 : _f.addEventListener("click", () => {
      handlers.onAcceptAll();
      this.close();
    });
    (_g = footer.querySelector("#consent-pref-save")) == null ? void 0 : _g.addEventListener("click", () => {
      handlers.onSave(categoryChoices);
      this.close();
    });
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handlers.onClose();
        this.close();
        return;
      }
      if (e.key === "Tab") {
        const focusableElements = dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement == null ? void 0 : lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement == null ? void 0 : firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    this._keyListener = handleKeyDown;
    document.body.appendChild(backdrop);
    this.backdrop = backdrop;
    const firstFocusable = dialog.querySelector("button");
    firstFocusable == null ? void 0 : firstFocusable.focus();
  }
  close() {
    if (this._keyListener) {
      document.removeEventListener("keydown", this._keyListener);
      delete this._keyListener;
    }
    if (this.backdrop && this.backdrop.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
    }
    if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === "function") {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }
};

// src/diagnostics/resource-scanner.ts
var ResourceScanner = class _ResourceScanner {
  static runDiagnostic(_config, isConsentGiven) {
    const thirdPartyScripts = [];
    if (typeof document !== "undefined") {
      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        const src = script.getAttribute("src");
        if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
          thirdPartyScripts.push(src);
        }
      });
    }
    return {
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      unblockedThirdPartyScripts: isConsentGiven ? [] : thirdPartyScripts,
      compliant: isConsentGiven || thirdPartyScripts.length === 0
    };
  }
  scanThirdPartyResources() {
    return _ResourceScanner.runDiagnostic({}, true).unblockedThirdPartyScripts;
  }
};

// src/ui/policy-generator.ts
var PolicyGenerator = class {
  static renderTable(config) {
    let html = `
      <div class="consent-policy-table-wrapper" style="margin: 1.5rem 0; font-family: system-ui, sans-serif;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; border: 1px solid #e2e8f0;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Categor\xEDa / Servicio</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Proveedor</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Finalidad</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Requerida</th>
            </tr>
          </thead>
          <tbody>
    `;
    for (const [catId, cat] of Object.entries(config.categories)) {
      const isReq = cat.required ? "S\xED (T\xE9cnica)" : "No (Opcional)";
      html += `
        <tr style="background: #ffffff; font-weight: 600;">
          <td style="padding: 0.75rem; border: 1px solid #e2e8f0;" colspan="3">${sanitizeHtml(cat.label)}</td>
          <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">${isReq}</td>
        </tr>
      `;
      if (config.services) {
        for (const [srvId, srv] of Object.entries(config.services)) {
          if (srv.category === catId) {
            html += `
              <tr style="background: #f8fafc; font-size: 0.9rem;">
                <td style="padding: 0.5rem 0.75rem 0.5rem 1.5rem; border: 1px solid #e2e8f0;">\u21B3 ${sanitizeHtml(srv.label || srvId)}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${sanitizeHtml(srv.provider || "-")}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${sanitizeHtml(cat.description || "-")}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${isReq}</td>
              </tr>
            `;
          }
        }
      }
    }
    html += `
          </tbody>
        </table>
      </div>
    `;
    return html;
  }
};

// src/core/consent-engine.ts
var ConsentEngine = class {
  constructor() {
    this.stateManager = new StateManager();
    this.eventBus = new EventBus();
    this.blockerRegistry = new BlockerRegistry();
    this.banner = new ConsentBanner();
    this.preferencesModal = new PreferencesModal();
    this.initPromise = null;
    this.resolveReady = null;
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }
  async init(configInput) {
    if (this.initPromise) return this.initPromise;
    this.initPromise = (async () => {
      var _a, _b, _c;
      let config;
      if (typeof configInput === "string") {
        const response = await fetch(configInput);
        if (!response.ok) {
          throw new Error(
            `[ConsentSDK] Failed to fetch consent configuration from '${configInput}' (HTTP ${response.status})`
          );
        }
        config = await response.json();
      } else {
        config = configInput;
      }
      validateConfig(config);
      const cookieName = ((_a = config.storage) == null ? void 0 : _a.name) || "site_consent";
      const rawReceipt = ((_b = config.storage) == null ? void 0 : _b.type) === "memory" ? MemoryStore.get(cookieName) : CookieStore.get(cookieName);
      const savedReceipt = rawReceipt ? parseReceipt(rawReceipt) : null;
      const evalResult = evaluatePolicy(config, savedReceipt);
      const activeReceipt = evalResult.isValid ? savedReceipt : null;
      this.stateManager.init(config, evalResult.choices, activeReceipt);
      GoogleConsentAdapter.initDefault();
      if (evalResult.isValid) {
        GoogleConsentAdapter.update(evalResult.choices);
      }
      this.blockerRegistry.init(
        (cat) => this.has(cat),
        (srv) => this.hasService(srv),
        {
          onAllowClick: (category) => {
            const current = this.stateManager.getChoices();
            current[category] = true;
            this.setPreferences(current);
          }
        },
        (serviceId, category) => {
          this.eventBus.emit("service:loaded", { serviceId, category });
        }
      );
      this.setupGlobalRevocationTrigger();
      (_c = this.resolveReady) == null ? void 0 : _c.call(this);
      this.eventBus.emit("ready", { state: this.getConsent() });
      if (!evalResult.isValid) {
        this.showBanner();
      }
    })();
    return this.initPromise;
  }
  async ready() {
    return this.readyPromise;
  }
  getConsent() {
    return this.stateManager.getState();
  }
  has(category) {
    return this.stateManager.hasCategory(category);
  }
  hasService(serviceId) {
    return this.stateManager.hasService(serviceId);
  }
  acceptAll() {
    const config = this.stateManager.getConfig();
    if (!config) return;
    const choices = {};
    for (const catId of Object.keys(config.categories)) {
      choices[catId] = true;
    }
    this.saveChoices(choices, "banner");
    this.eventBus.emit("consent:accepted", {
      choices,
      receipt: this.getReceipt()
    });
  }
  rejectAll() {
    const config = this.stateManager.getConfig();
    if (!config) return;
    const choices = {};
    for (const [catId, catConfig] of Object.entries(config.categories)) {
      choices[catId] = catConfig.required === true;
    }
    this.saveChoices(choices, "banner");
    this.eventBus.emit("consent:rejected", {
      choices,
      receipt: this.getReceipt()
    });
  }
  setPreferences(choices) {
    const config = this.stateManager.getConfig();
    if (!config) return;
    const sanitizedChoices = __spreadValues({}, choices);
    sanitizedChoices["necessary"] = true;
    this.saveChoices(sanitizedChoices, "preferences");
  }
  openPreferences() {
    const config = this.stateManager.getConfig();
    if (!config) return;
    this.preferencesModal.render(config, this.stateManager.getChoices(), {
      onSave: (choices) => this.setPreferences(choices),
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onClose: () => {
        this.eventBus.emit("preferences:closed", void 0);
      }
    });
    this.eventBus.emit("preferences:opened", void 0);
  }
  closePreferences() {
    this.preferencesModal.close();
  }
  withdraw() {
    var _a, _b;
    const previousChoices = this.stateManager.getChoices();
    const config = this.stateManager.getConfig();
    if (!config) return;
    const cookieName = ((_a = config.storage) == null ? void 0 : _a.name) || "site_consent";
    if (((_b = config.storage) == null ? void 0 : _b.type) === "memory") {
      MemoryStore.remove(cookieName);
    } else {
      CookieStore.remove(cookieName);
    }
    this.stateManager.clearChoices();
    GoogleConsentAdapter.update(this.stateManager.getChoices());
    this.eventBus.emit("consent:withdrawn", { previousChoices });
    this.showBanner();
  }
  when(categoryOrService, callback) {
    return CustomServiceAdapter.createWhen(
      this.eventBus,
      (cat) => this.has(cat),
      (srv) => this.hasService(srv)
    )(categoryOrService, callback);
  }
  on(event, handler) {
    return this.eventBus.on(event, handler);
  }
  getReceipt() {
    return this.stateManager.getReceipt();
  }
  rescan() {
    const config = this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const isGiven = !!this.getReceipt();
    return ResourceScanner.runDiagnostic(config, isGiven);
  }
  mountPolicy(targetContainer) {
    const config = this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container = typeof targetContainer === "string" ? document.querySelector(targetContainer) : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderTable(config);
    }
  }
  saveChoices(choices, source) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const config = this.stateManager.getConfig();
    if (!config) return;
    const receipt = createReceipt(
      config.policyVersion,
      choices,
      source,
      this.stateManager.getReceipt(),
      (_a = config.security) == null ? void 0 : _a.secretKey
    );
    this.stateManager.updateChoices(receipt);
    const cookieName = ((_b = config.storage) == null ? void 0 : _b.name) || "site_consent";
    const receiptJson = JSON.stringify(receipt);
    if (((_c = config.storage) == null ? void 0 : _c.type) === "memory") {
      MemoryStore.set(cookieName, receiptJson);
    } else {
      CookieStore.set(cookieName, receiptJson, {
        path: ((_d = config.storage) == null ? void 0 : _d.path) || "/",
        maxAgeDays: (_f = (_e = config.consent) == null ? void 0 : _e.maxAgeDays) != null ? _f : 365,
        sameSite: ((_g = config.storage) == null ? void 0 : _g.sameSite) || "Lax",
        secure: (_h = config.storage) == null ? void 0 : _h.secure
      });
    }
    GoogleConsentAdapter.update(choices);
    this.blockerRegistry.init(
      (cat) => this.has(cat),
      (srv) => this.hasService(srv)
    );
    if (((_i = config.logging) == null ? void 0 : _i.enabled) && config.logging.endpoint) {
      try {
        fetch(config.logging.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: receiptJson
        }).catch(() => {
        });
      } catch (e) {
      }
    }
    this.banner.remove();
    this.eventBus.emit("consent:changed", { choices, receipt });
  }
  showBanner() {
    const config = this.stateManager.getConfig();
    if (!config) return;
    this.banner.render(config, {
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onConfigure: () => this.openPreferences()
    });
    this.eventBus.emit("banner:shown", void 0);
  }
  setupGlobalRevocationTrigger() {
    if (typeof document === "undefined") return;
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target == null ? void 0 : target.closest("[data-consent-open]")) {
        e.preventDefault();
        this.openPreferences();
      }
    });
  }
};
var globalScope = typeof window !== "undefined" ? window : globalThis;
if (!globalScope.__ConsentSDK_Instance__) {
  globalScope.__ConsentSDK_Instance__ = new ConsentEngine();
}
var Consent = globalScope.__ConsentSDK_Instance__;

// src/wrappers/angular.ts
var ConsentService = class {
  async init(config) {
    return Consent.init(config);
  }
  getConsent() {
    return Consent.getConsent();
  }
  has(category) {
    return Consent.has(category);
  }
  hasService(serviceId) {
    return Consent.hasService(serviceId);
  }
  acceptAll() {
    Consent.acceptAll();
  }
  rejectAll() {
    Consent.rejectAll();
  }
  setPreferences(choices) {
    Consent.setPreferences(choices);
  }
  openPreferences() {
    Consent.openPreferences();
  }
  withdraw() {
    Consent.withdraw();
  }
  on(event, handler) {
    return Consent.on(event, handler);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsentService
});
//# sourceMappingURL=angular.cjs.map