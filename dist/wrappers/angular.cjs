"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __decoratorStart = (base) => {
  var _a;
  return [, , , __create((_a = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a : null)];
};
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/wrappers/angular.ts
var angular_exports = {};
__export(angular_exports, {
  ConsentGateDirective: () => ConsentGateDirective,
  ConsentService: () => ConsentService,
  CookiePolicyComponent: () => CookiePolicyComponent,
  LegalNoticeComponent: () => LegalNoticeComponent,
  PrivacyPolicyComponent: () => PrivacyPolicyComponent
});
module.exports = __toCommonJS(angular_exports);
var import_core = require("@angular/core");

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
      const category = serviceConfig.category;
      if (!category) {
        throw new ConfigValidationError(
          `Service '${serviceId}' missing 'category' reference.`
        );
      }
      if (!config.categories[category]) {
        throw new ConfigValidationError(
          `Service '${serviceId}' references non-existent category '${category}'.`
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
  init(config, choices, receipt, gpc) {
    var _a, _b;
    this.config = config;
    this.state = {
      initialized: true,
      policyVersion: config.policyVersion,
      locale: ((_a = config.locale) == null ? void 0 : _a.default) || "es",
      receipt,
      choices,
      gpc: (_b = gpc != null ? gpc : receipt == null ? void 0 : receipt.gpc) != null ? _b : false
    };
  }
  setLocale(locale) {
    this.state.locale = locale;
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
    if (!service || !service.category) return false;
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
    if (options.domain) {
      cookieStr += `; Domain=${options.domain}`;
    }
    if (secure) {
      cookieStr += "; Secure";
    }
    document.cookie = cookieStr;
  }
  static remove(name, path = "/", domain) {
    if (typeof document === "undefined") return;
    let cookieStr = `${encodeURIComponent(name)}=; Path=${path}; Max-Age=0; SameSite=Lax`;
    if (domain) {
      cookieStr += `; Domain=${domain}`;
    }
    document.cookie = cookieStr;
  }
  static clearServiceCookies(config, revokedCategory) {
    var _a, _b;
    if (typeof document === "undefined" || !config.services) return;
    const path = ((_a = config.storage) == null ? void 0 : _a.path) || "/";
    const domain = (_b = config.storage) == null ? void 0 : _b.domain;
    for (const service of Object.values(config.services)) {
      if (service.category === revokedCategory && service.cookies) {
        for (const cookieItem of service.cookies) {
          this.remove(cookieItem.name, path, domain || cookieItem.domain);
        }
      }
    }
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

// src/storage/storage-cleaner.ts
var StorageCleaner = class {
  /**
   * Evaluates if a given storage key or cookie name matches a pattern.
   * Supports:
   * - Wildcard glob: "*", "_ga*", "ph_*_posthog", "*session*"
   * - Exact string match (case-insensitive)
   */
  static matchesPattern(key, pattern) {
    if (!key || !pattern) return false;
    if (pattern === "*" || key === pattern) return true;
    if (pattern.includes("*")) {
      const escaped = pattern.split("*").map((segment) => segment.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&")).join(".*");
      try {
        const regex = new RegExp(`^${escaped}$`, "i");
        return regex.test(key);
      } catch (e) {
        return false;
      }
    }
    return key.toLowerCase() === pattern.toLowerCase();
  }
  /**
   * Purges keys from window.localStorage that match any of the provided patterns.
   * Safe in SSR, sandboxed iframes, and private browsing modes.
   */
  static purgeLocalStorage(patterns) {
    if (typeof window === "undefined" || !patterns || patterns.length === 0) return [];
    try {
      if (typeof window.localStorage === "undefined") return [];
      const keysToRemove = [];
      const len = window.localStorage.length;
      for (let i = 0; i < len; i++) {
        const key = window.localStorage.key(i);
        if (key && patterns.some((p) => this.matchesPattern(key, p))) {
          keysToRemove.push(key);
        }
      }
      for (const key of keysToRemove) {
        window.localStorage.removeItem(key);
      }
      return keysToRemove;
    } catch (e) {
      return [];
    }
  }
  /**
   * Purges keys from window.sessionStorage that match any of the provided patterns.
   * Safe in SSR, sandboxed iframes, and private browsing modes.
   */
  static purgeSessionStorage(patterns) {
    if (typeof window === "undefined" || !patterns || patterns.length === 0) return [];
    try {
      if (typeof window.sessionStorage === "undefined") return [];
      const keysToRemove = [];
      const len = window.sessionStorage.length;
      for (let i = 0; i < len; i++) {
        const key = window.sessionStorage.key(i);
        if (key && patterns.some((p) => this.matchesPattern(key, p))) {
          keysToRemove.push(key);
        }
      }
      for (const key of keysToRemove) {
        window.sessionStorage.removeItem(key);
      }
      return keysToRemove;
    } catch (e) {
      return [];
    }
  }
  /**
   * Purges cookies declared for services, supporting wildcard glob names (e.g. "_ga_*").
   */
  static purgeCookies(cookieDeclarations, defaultPath = "/", defaultDomain) {
    if (typeof document === "undefined" || !cookieDeclarations || cookieDeclarations.length === 0) {
      return [];
    }
    const removedCookies = [];
    const allExistingCookies = this.getAllCookieNames();
    for (const cookieItem of cookieDeclarations) {
      const targetDomain = cookieItem.domain || defaultDomain;
      if (cookieItem.name.includes("*")) {
        for (const existingName of allExistingCookies) {
          if (this.matchesPattern(existingName, cookieItem.name)) {
            CookieStore.remove(existingName, defaultPath, targetDomain);
            if (!removedCookies.includes(existingName)) {
              removedCookies.push(existingName);
            }
          }
        }
      } else {
        CookieStore.remove(cookieItem.name, defaultPath, targetDomain);
        if (!removedCookies.includes(cookieItem.name)) {
          removedCookies.push(cookieItem.name);
        }
      }
    }
    return removedCookies;
  }
  static getAllCookieNames() {
    if (typeof document === "undefined") return [];
    try {
      return document.cookie.split(";").map((c) => c.trim().split("=")[0]).filter((n) => !!n);
    } catch (e) {
      return [];
    }
  }
  /**
   * Purges all cookies, localStorage, and sessionStorage keys associated with a category.
   */
  static purgeCategory(config, category) {
    var _a, _b, _c;
    const report = {
      category,
      purgedCookies: [],
      purgedLocalStorage: [],
      purgedSessionStorage: []
    };
    if (!config) return report;
    const path = ((_a = config.storage) == null ? void 0 : _a.path) || "/";
    const defaultDomain = (_b = config.storage) == null ? void 0 : _b.domain;
    const cookiesToPurge = [];
    const localStoragePatterns = /* @__PURE__ */ new Set();
    const sessionStoragePatterns = /* @__PURE__ */ new Set();
    const catConfig = (_c = config.categories) == null ? void 0 : _c[category];
    if (catConfig) {
      if (catConfig.storageKeys) {
        catConfig.storageKeys.forEach((k) => {
          localStoragePatterns.add(k);
          sessionStoragePatterns.add(k);
        });
      }
      if (catConfig.localStorage) {
        catConfig.localStorage.forEach((k) => localStoragePatterns.add(k));
      }
      if (catConfig.sessionStorage) {
        catConfig.sessionStorage.forEach((k) => sessionStoragePatterns.add(k));
      }
    }
    if (config.services) {
      for (const service of Object.values(config.services)) {
        if (service.category === category) {
          if (service.cookies) {
            for (const cookieItem of service.cookies) {
              cookiesToPurge.push({
                name: cookieItem.name,
                domain: cookieItem.domain || defaultDomain
              });
            }
          }
          if (service.storageKeys) {
            service.storageKeys.forEach((k) => {
              localStoragePatterns.add(k);
              sessionStoragePatterns.add(k);
            });
          }
          if (service.localStorage) {
            service.localStorage.forEach((k) => localStoragePatterns.add(k));
          }
          if (service.sessionStorage) {
            service.sessionStorage.forEach((k) => sessionStoragePatterns.add(k));
          }
        }
      }
    }
    report.purgedCookies = this.purgeCookies(cookiesToPurge, path, defaultDomain);
    report.purgedLocalStorage = this.purgeLocalStorage(Array.from(localStoragePatterns));
    report.purgedSessionStorage = this.purgeSessionStorage(Array.from(sessionStoragePatterns));
    return report;
  }
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

    /* Floating Revocation & Preference Badge */
    .consent-floating-badge {
      position: fixed;
      z-index: 2147483640;
      font-family: var(--consent-font);
      opacity: 0;
      transform: scale(0.85);
      pointer-events: none;
      transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .consent-floating-badge.is-visible {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    .consent-floating-badge--bottom-left {
      bottom: 1.25rem;
      left: 1.25rem;
    }

    .consent-floating-badge--bottom-right {
      bottom: 1.25rem;
      right: 1.25rem;
    }

    .consent-floating-badge--top-left {
      top: 1.25rem;
      left: 1.25rem;
    }

    .consent-floating-badge--top-right {
      top: 1.25rem;
      right: 1.25rem;
    }

    .consent-floating-badge-inner {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .consent-floating-badge-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 46px;
      height: 46px;
      min-width: 46px;
      border-radius: 9999px;
      background: var(--consent-bg);
      color: var(--consent-fg);
      border: 1px solid var(--consent-border);
      box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.15), 0 4px 6px -2px rgba(15, 23, 42, 0.05);
      cursor: pointer;
      padding: 0;
      margin: 0;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease, color 0.2s ease;
      outline: none;
    }

    .consent-floating-badge-btn.has-label {
      width: auto;
      padding: 0 1rem;
    }

    .consent-floating-badge-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 28px -6px rgba(15, 23, 42, 0.2), 0 6px 10px -3px rgba(15, 23, 42, 0.08);
      border-color: var(--consent-accent);
      color: var(--consent-accent);
    }

    .consent-floating-badge-btn:active {
      transform: translateY(0) scale(0.96);
    }

    .consent-floating-badge-btn:focus-visible {
      box-shadow: 0 0 0 3px var(--consent-focus-ring), 0 10px 25px -5px rgba(15, 23, 42, 0.15);
      border-color: var(--consent-accent);
    }

    .consent-floating-badge-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
    }

    .consent-floating-badge-text {
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .consent-floating-badge-tooltip {
      position: absolute;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      background: var(--consent-primary);
      color: var(--consent-primary-fg);
      font-size: 0.76rem;
      font-weight: 500;
      padding: 0.4rem 0.75rem;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
      transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
      z-index: 2147483641;
    }

    .consent-floating-badge--bottom-left .consent-floating-badge-tooltip {
      bottom: calc(100% + 8px);
      left: 0;
      transform: translateY(4px);
    }

    .consent-floating-badge--bottom-right .consent-floating-badge-tooltip {
      bottom: calc(100% + 8px);
      right: 0;
      transform: translateY(4px);
    }

    .consent-floating-badge--top-left .consent-floating-badge-tooltip {
      top: calc(100% + 8px);
      left: 0;
      transform: translateY(-4px);
    }

    .consent-floating-badge--top-right .consent-floating-badge-tooltip {
      top: calc(100% + 8px);
      right: 0;
      transform: translateY(-4px);
    }

    .consent-floating-badge-inner:hover .consent-floating-badge-tooltip,
    .consent-floating-badge-btn:focus-visible + .consent-floating-badge-tooltip {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
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
    const cookiesPolicyText = sanitizeHtml(bannerConfig.cookiesPolicy || "Pol\xEDtica de cookies");
    const privacyPolicyText = sanitizeHtml(bannerConfig.privacyPolicy || "Pol\xEDtica de privacidad");
    const bannerAriaLabel = sanitizeHtml(bannerConfig.ariaLabel || "Gesti\xF3n de consentimiento de privacidad");
    const privacyUrl = sanitizeUrl(((_c = config.policy) == null ? void 0 : _c.privacyUrl) || "/politica-privacidad");
    const cookiesUrl = sanitizeUrl(((_d = config.policy) == null ? void 0 : _d.cookiesUrl) || "/politica-cookies");
    const wrapper = document.createElement("div");
    wrapper.className = "consent-banner-wrapper";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute(
      "aria-label",
      bannerAriaLabel
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
            <a href="${cookiesUrl}" target="_blank" rel="noopener">${cookiesPolicyText}</a>
            <a href="${privacyUrl}" target="_blank" rel="noopener">${privacyPolicyText}</a>
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
  getIsVisible() {
    return this.element !== null;
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
    const modalSubtitle = sanitizeHtml(
      prefConfig.subtitle || "Gestiona tus permisos de almacenamiento por finalidad (LSSI art. 22.2 & RGPD)."
    );
    const saveText = sanitizeHtml(prefConfig.save || "Guardar selecci\xF3n");
    const acceptAllText = sanitizeHtml(prefConfig.acceptAll || "Permitir todas");
    const rejectAllText = sanitizeHtml(prefConfig.rejectAll || "Rechazar opcionales");
    const closeLabel = sanitizeHtml(prefConfig.closeLabel || "Cerrar ventana");
    const requiredBadge = sanitizeHtml(prefConfig.requiredBadge || "Requerida");
    const optionalBadge = sanitizeHtml(prefConfig.optionalBadge || "Opcional");
    const servicesLabel = sanitizeHtml(prefConfig.servicesLabel || "Servicios incluidos");
    const viewServices = sanitizeHtml(prefConfig.viewServices || "Ver servicios");
    const hideServices = sanitizeHtml(prefConfig.hideServices || "Ocultar servicios");
    const thirdParty = sanitizeHtml(prefConfig.thirdParty || "Terceros");
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
          ${modalSubtitle}
        </p>
      </div>
      <button type="button" class="consent-dialog-close" aria-label="${closeLabel}">
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
              ${servicesLabel} (${associatedServices.length})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem;">
              ${associatedServices.map(
          ([srvId, srv]) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0;">
                  <span style="font-weight: 500;">${sanitizeHtml(srv.label || srvId)}</span>
                  <span style="color: var(--consent-muted); font-size: 0.78rem;">${sanitizeHtml(srv.provider || thirdParty)}</span>
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
              ${isRequired ? `<span class="consent-badge consent-badge-required">${requiredBadge}</span>` : `<span class="consent-badge consent-badge-optional">${optionalBadge}</span>`}
            </div>
            <p class="consent-category-desc">${sanitizeHtml(catConfig.description)}</p>
            ${associatedServices.length > 0 ? `<button type="button" class="consent-toggle-services-btn" data-target="cat-services-${catId}">
                    ${viewServices} (${associatedServices.length}) \u25BE
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
              toggleServicesBtn.textContent = isHidden ? `${hideServices} (${associatedServices.length}) \u25B4` : `${viewServices} (${associatedServices.length}) \u25BE`;
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
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        handlers.onClose();
        this.close();
      }
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
  getIsOpen() {
    return this.backdrop !== null;
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

// src/ui/floating-badge.ts
var FloatingBadge = class {
  constructor() {
    this.element = null;
    this.isVisible = false;
  }
  getIconSvg(icon) {
    switch (icon) {
      case "shield":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>`;
      case "settings":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>`;
      case "cookie":
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
          <path d="M8.5 8.5v.01"/>
          <path d="M16 15.5v.01"/>
          <path d="M12 12v.01"/>
          <path d="M11 17v.01"/>
          <path d="M7 13v.01"/>
        </svg>`;
    }
  }
  render(config, handlers) {
    var _a, _b, _c;
    if (typeof document === "undefined") return;
    this.remove();
    injectStyles((_a = config.csp) == null ? void 0 : _a.nonce);
    const badgeConfig = typeof ((_b = config.ui) == null ? void 0 : _b.floatingBadge) === "object" && ((_c = config.ui) == null ? void 0 : _c.floatingBadge) !== null ? config.ui.floatingBadge : {};
    const position = badgeConfig.position || "bottom-left";
    const labelText = badgeConfig.label ? sanitizeHtml(badgeConfig.label) : "";
    const ariaLabel = badgeConfig.ariaLabel ? sanitizeHtml(badgeConfig.ariaLabel) : labelText || "Configuraci\xF3n y revocaci\xF3n de cookies";
    const tooltipText = badgeConfig.tooltip ? sanitizeHtml(badgeConfig.tooltip) : labelText || "Configurar o declinar cookies";
    const showLabel = badgeConfig.showLabel === true && !!labelText;
    const iconSvg = this.getIconSvg(badgeConfig.icon);
    const container = document.createElement("div");
    container.className = `consent-floating-badge consent-floating-badge--${position}`;
    container.setAttribute("role", "complementary");
    container.setAttribute("aria-label", ariaLabel);
    container.innerHTML = `
      <div class="consent-floating-badge-inner">
        <button
          type="button"
          class="consent-floating-badge-btn ${showLabel ? "has-label" : ""}"
          id="consent-floating-trigger"
          data-consent-open
          aria-label="${ariaLabel}"
        >
          <span class="consent-floating-badge-icon" aria-hidden="true">
            ${iconSvg}
          </span>
          ${showLabel ? `<span class="consent-floating-badge-text">${labelText}</span>` : ""}
        </button>
        <div class="consent-floating-badge-tooltip" role="tooltip" aria-hidden="true">
          ${tooltipText}
        </div>
      </div>
    `;
    const button = container.querySelector("#consent-floating-trigger");
    button == null ? void 0 : button.addEventListener("click", (e) => {
      e.preventDefault();
      handlers.onClick();
    });
    document.body.appendChild(container);
    this.element = container;
  }
  show() {
    if (this.element) {
      this.element.classList.add("is-visible");
      this.isVisible = true;
    }
  }
  hide() {
    if (this.element) {
      this.element.classList.remove("is-visible");
      this.isVisible = false;
    }
  }
  getIsVisible() {
    return this.isVisible;
  }
  hasElement() {
    return this.element !== null;
  }
  getElement() {
    return this.element;
  }
  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
      this.isVisible = false;
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
  /**
   * Extract all cookie and storage key details across categories and services (including presets).
   */
  static extractCookieRows(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const rows = [];
    if (config.services) {
      for (const [srvId, srv] of Object.entries(config.services)) {
        const cat = config.categories[srv.category || "necessary"] || { label: srv.category || "General" };
        const providerName = srv.provider || srv.label || srvId;
        if (srv.cookies && srv.cookies.length > 0) {
          for (const c of srv.cookies) {
            rows.push({
              name: c.name,
              type: "Cookie",
              provider: providerName,
              purpose: c.purpose || srv.description || cat.description || "Funcionalidad del servicio",
              duration: c.duration || "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl
            });
          }
        }
        if (srv.storageKeys && srv.storageKeys.length > 0) {
          for (const k of srv.storageKeys) {
            rows.push({
              name: k,
              type: "localStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento de estado y preferencias",
              duration: "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl
            });
          }
        }
        if (srv.localStorage && srv.localStorage.length > 0) {
          for (const k of srv.localStorage) {
            rows.push({
              name: k,
              type: "localStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento web local",
              duration: "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl
            });
          }
        }
        if (srv.sessionStorage && srv.sessionStorage.length > 0) {
          for (const k of srv.sessionStorage) {
            rows.push({
              name: k,
              type: "sessionStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento temporal de sesi\xF3n",
              duration: "Sesi\xF3n",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl
            });
          }
        }
        if (!((_a = srv.cookies) == null ? void 0 : _a.length) && !((_b = srv.storageKeys) == null ? void 0 : _b.length) && !((_c = srv.localStorage) == null ? void 0 : _c.length) && !((_d = srv.sessionStorage) == null ? void 0 : _d.length)) {
          rows.push({
            name: srvId,
            type: "Cookie",
            provider: providerName,
            purpose: srv.description || cat.description || "Servicio integrado",
            duration: "Variable",
            categoryLabel: cat.label,
            policyUrl: srv.policyUrl
          });
        }
      }
    }
    if (config.categories) {
      for (const [, cat] of Object.entries(config.categories)) {
        if (cat.storageKeys) {
          for (const k of cat.storageKeys) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "localStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Persistente",
                categoryLabel: cat.label
              });
            }
          }
        }
        if (cat.localStorage) {
          for (const k of cat.localStorage) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "localStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Persistente",
                categoryLabel: cat.label
              });
            }
          }
        }
        if (cat.sessionStorage) {
          for (const k of cat.sessionStorage) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "sessionStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Sesi\xF3n",
                categoryLabel: cat.label
              });
            }
          }
        }
      }
    }
    const consentCookieName = ((_e = config.storage) == null ? void 0 : _e.name) || "site_consent";
    if (!rows.some((r) => r.name === consentCookieName)) {
      rows.unshift({
        name: consentCookieName,
        type: ((_f = config.storage) == null ? void 0 : _f.type) === "memory" ? "localStorage" : "Cookie",
        provider: "Propia (Solvenza Cookies Compliance)",
        purpose: "Guarda las preferencias y recibo firmado de consentimiento del usuario.",
        duration: `${(_h = (_g = config.consent) == null ? void 0 : _g.maxAgeDays) != null ? _h : 365} d\xEDas`,
        categoryLabel: ((_j = (_i = config.categories) == null ? void 0 : _i.necessary) == null ? void 0 : _j.label) || "Necesarias"
      });
    }
    return rows;
  }
  /**
   * Render stylized table of cookies and storage keys.
   */
  static renderTable(config, options = {}) {
    const isDark = options.theme === "dark";
    const bgHeader = isDark ? "#1e293b" : "#f8fafc";
    const borderCol = isDark ? "#334155" : "#e2e8f0";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#64748b";
    const rowAltBg = isDark ? "#0f172a" : "#ffffff";
    const rowBg = isDark ? "#1e293b" : "#f8fafc";
    let html = `
      <div class="solvenza-policy-table-wrapper" style="overflow-x: auto; margin: 1.5rem 0; border: 1px solid ${borderCol}; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); font-family: system-ui, -apple-system, sans-serif;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem; color: ${textCol};">
          <thead>
            <tr style="background: ${bgHeader}; border-bottom: 2px solid ${borderCol};">
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Nombre / Clave</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Tipo</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Categor\xEDa</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Proveedor</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Finalidad</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Duraci\xF3n</th>
            </tr>
          </thead>
          <tbody>
    `;
    const rows = this.extractCookieRows(config);
    if (rows.length === 0) {
      html += `
        <tr>
          <td colspan="6" style="padding: 1.5rem; text-align: center; color: ${mutedCol};">
            No se han registrado cookies ni elementos de almacenamiento en la configuraci\xF3n.
          </td>
        </tr>
      `;
    } else {
      rows.forEach((r, idx) => {
        const bg = idx % 2 === 0 ? rowAltBg : rowBg;
        const providerHtml = r.policyUrl ? `<a href="${sanitizeHtml(r.policyUrl)}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${sanitizeHtml(r.provider)} \u2197</a>` : sanitizeHtml(r.provider);
        html += `
          <tr style="background: ${bg}; border-bottom: 1px solid ${borderCol};">
            <td style="padding: 0.75rem 1rem; font-family: monospace; font-weight: 600; color: #2563eb;">${sanitizeHtml(r.name)}</td>
            <td style="padding: 0.75rem 1rem;">
              <span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; background: ${r.type === "Cookie" ? "#e0e7ff" : "#fef3c7"}; color: ${r.type === "Cookie" ? "#3730a3" : "#92400e"};">
                ${r.type}
              </span>
            </td>
            <td style="padding: 0.75rem 1rem; font-weight: 500;">${sanitizeHtml(r.categoryLabel)}</td>
            <td style="padding: 0.75rem 1rem;">${providerHtml}</td>
            <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(r.purpose)}</td>
            <td style="padding: 0.75rem 1rem; white-space: nowrap;">${sanitizeHtml(r.duration)}</td>
          </tr>
        `;
      });
    }
    html += `
          </tbody>
        </table>
      </div>
    `;
    return html;
  }
  /**
   * Render complete legal Cookie Policy document adapted to LSSI art. 22.2 and AEPD 2024.
   */
  static renderCookiePolicy(config, options = {}) {
    var _a, _b, _c;
    if (options.view === "table-only") {
      return this.renderTable(config, options);
    }
    const companyName = ((_a = config.legalEntity) == null ? void 0 : _a.tradeName) || ((_b = config.legalEntity) == null ? void 0 : _b.name) || "el Titular del Sitio Web";
    const lastUpdated = ((_c = config.legalNotice) == null ? void 0 : _c.lastUpdated) || config.policyVersion || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const cardBg = isDark ? "#1e293b" : "#ffffff";
    const borderCol = isDark ? "#334155" : "#e2e8f0";
    const tableHtml = this.renderTable(config, options);
    let html = `
      <article class="solvenza-cookie-policy-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Pol\xEDtica de Cookies</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            Conforme al art\xEDculo 22.2 de la Ley 34/2002 (LSSI-CE), el RGPD (UE 2016/679) y la Gu\xEDa sobre el uso de cookies de la AEPD.
            <br><em>\xDAltima actualizaci\xF3n: ${sanitizeHtml(lastUpdated)}</em>
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. \xBFQu\xE9 son las cookies y tecnolog\xEDas de almacenamiento local?</h2>
          <p style="color: ${mutedCol};">
            Este sitio web, titularidad de <strong>${sanitizeHtml(companyName)}</strong>, utiliza cookies y tecnolog\xEDas de almacenamiento similares (tales como <code>localStorage</code>, <code>sessionStorage</code>, p\xEDxeles de seguimiento y etiquetas) para garantizar el funcionamiento t\xE9cnico del sitio, optimizar la experiencia de navegaci\xF3n, medir el uso de la web y, en su caso, mostrar contenidos personalizados o multimedia.
          </p>
          <p style="color: ${mutedCol};">
            Una <strong>cookie</strong> es un peque\xF1o fichero de texto que se descarga y almacena en el navegador del usuario al acceder a determinadas p\xE1ginas web. Permite a una p\xE1gina web, entre otras cosas, recordar las preferencias de navegaci\xF3n, almacenar y recuperar informaci\xF3n sobre los h\xE1bitos de visita y reconocer al usuario en visitas posteriores.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Tipos de cookies y finalidades utilizadas</h2>
          <p style="color: ${mutedCol};">
            En funci\xF3n de su finalidad, titularidad y plazo de permanencia, en este sitio web se utilizan las siguientes categor\xEDas:
          </p>
          <ul style="color: ${mutedCol}; padding-left: 1.5rem; margin-bottom: 1.5rem;">
    `;
    for (const [, cat] of Object.entries(config.categories)) {
      const isReq = cat.required === true;
      html += `
        <li style="margin-bottom: 0.6rem;">
          <strong>${sanitizeHtml(cat.label)}</strong> (${isReq ? "T\xE9cnicas / Exentas de consentimiento" : "Opcionales / Sujetas a consentimiento"}):
          ${sanitizeHtml(cat.description)}
        </li>
      `;
    }
    html += `
          </ul>

          <h3 style="font-size: 1.1rem; font-weight: 700; color: ${textCol}; margin-top: 1.5rem;">Inventario detallado de cookies y almacenamiento web</h3>
          <p style="color: ${mutedCol}; font-size: 0.9rem;">
            A continuaci\xF3n se detallan de forma transparente todas las cookies y claves de almacenamiento registradas en la aplicaci\xF3n:
          </p>
          ${tableHtml}
        </section>

        <section style="margin-bottom: 2rem; background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol}; margin-top: 0;">3. Gesti\xF3n, configuraci\xF3n y revocaci\xF3n del consentimiento</h2>
          <p style="color: ${mutedCol};">
            De acuerdo con las directrices de la Agencia Espa\xF1ola de Protecci\xF3n de Datos (AEPD), retirar o modificar el consentimiento debe ser tan f\xE1cil como otorgarlo. Puedes modificar tus preferencias o revocar el consentimiento en cualquier momento:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.25rem;">
            <button
              type="button"
              data-consent-open
              onclick="if(window.Consent) window.Consent.openPreferences()"
              style="background: #0f172a; color: #ffffff; border: none; padding: 0.65rem 1.3rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;"
            >
              \u2699\uFE0F Abrir panel de preferencias de cookies
            </button>
            <button
              type="button"
              onclick="if(window.Consent) window.Consent.withdraw()"
              style="background: #ffffff; color: #dc2626; border: 1px solid #fca5a5; padding: 0.65rem 1.3rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;"
            >
              \u{1F504} Revocar consentimiento y purgar datos
            </button>
          </div>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">4. C\xF3mo deshabilitar o eliminar las cookies en los navegadores</h2>
          <p style="color: ${mutedCol};">
            El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuraci\xF3n de las opciones de su navegador web:
          </p>
          <ul style="color: #2563eb; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.4rem;"><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Google Chrome</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Mozilla Firefox</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Apple Safari</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Microsoft Edge</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Opera Browser</a></li>
          </ul>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">5. Reconocimiento de Global Privacy Control (GPC)</h2>
          <p style="color: ${mutedCol};">
            Este sitio web est\xE1 adaptado al est\xE1ndar <strong>Global Privacy Control (GPC)</strong> y a la cabecera <code>Do Not Track (DNT)</code>. Si tu navegador emite una se\xF1al universal de no seguimiento, nuestro sistema desactivar\xE1 autom\xE1ticamente todas las cookies no necesarias sin requerir interacci\xF3n manual.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">6. Transferencias internacionales de datos</h2>
          <p style="color: ${mutedCol};">
            Determinadas cookies de terceros (tales como Google Analytics o Meta) pueden implicar la transferencia internacional de datos a servidores ubicados en Estados Unidos u otros pa\xEDses fuera del Espacio Econ\xF3mico Europeo (EEE). Dichas transferencias se encuentran amparadas bajo el Marco de Privacidad de Datos UE-EE.UU. (Data Privacy Framework) o Cl\xE1usulas Contractuales Tipo aprobadas por la Comisi\xF3n Europea.
          </p>
        </section>
      </article>
    `;
    return html;
  }
  /**
   * Render complete legal notice (Aviso Legal) conforming to LSSI-CE Art. 10.
   */
  static renderLegalNotice(config, options = {}) {
    var _a, _b, _c;
    const entity = config.legalEntity || {
      name: "[Raz\xF3n Social del Titular]",
      taxId: "[NIF / CIF]",
      address: "[Domicilio Social]",
      email: "[Email de Contacto]"
    };
    const law = ((_a = config.legalNotice) == null ? void 0 : _a.applicableLaw) || "Legislaci\xF3n espa\xF1ola (LSSI-CE, LOPDGDD) y Reglamento General de Protecci\xF3n de Datos (RGPD UE 2016/679)";
    const jurisdiction = ((_b = config.legalNotice) == null ? void 0 : _b.jurisdiction) || "Juzgados y Tribunales competentes conforme a la normativa de consumidores y usuarios";
    const lastUpdated = ((_c = config.legalNotice) == null ? void 0 : _c.lastUpdated) || config.policyVersion || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const borderCol = isDark ? "#334155" : "#e2e8f0";
    return `
      <article class="solvenza-legal-notice-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Aviso Legal</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            En cumplimiento del art\xEDculo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Informaci\xF3n y de Comercio Electr\xF3nico (LSSI-CE).
            <br><em>\xDAltima actualizaci\xF3n: ${sanitizeHtml(lastUpdated)}</em>
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. Datos identificativos del titular</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid ${borderCol};">
            <tbody>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600; width: 30%;">Raz\xF3n Social:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.name)}</td>
              </tr>
              ${entity.tradeName ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Nombre Comercial:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.tradeName)}</td></tr>` : ""}
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">NIF / CIF:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.taxId || "-")}</td>
              </tr>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">Domicilio Social:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.address || "-")}</td>
              </tr>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">Correo Electr\xF3nico:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};"><a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "-")}</a></td>
              </tr>
              ${entity.phone ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Tel\xE9fono:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.phone)}</td></tr>` : ""}
              ${entity.registryData ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Datos Registrales:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.registryData)}</td></tr>` : ""}
              ${entity.dpoEmail ? `<tr><td style="padding: 0.75rem 1rem; font-weight: 600;">Delegado de Protecci\xF3n de Datos (DPO):</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};"><a href="mailto:${sanitizeHtml(entity.dpoEmail)}" style="color: #2563eb;">${sanitizeHtml(entity.dpoEmail)}</a></td></tr>` : ""}
            </tbody>
          </table>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Condiciones generales de uso</h2>
          <p style="color: ${mutedCol};">
            El acceso y/o uso de este sitio web atribuye la condici\xF3n de usuario, que acepta, desde dicho acceso y/o uso, las presentes condiciones generales. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que el titular ofrece a trav\xE9s de su sitio web y a no emplearlos para incurrir en actividades il\xEDcitas o contrarias a la buena fe y al orden p\xFAblico.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">3. Propiedad intelectual e industrial</h2>
          <p style="color: ${mutedCol};">
            Todos los derechos de propiedad intelectual e industrial sobre el dise\xF1o, marcas, logotipos, textos, c\xF3digo fuente e ilustraciones de este sitio web corresponden al titular o a sus leg\xEDtimos licenciantes. Queda expresamente prohibida la reproducci\xF3n, distribuci\xF3n o comunicaci\xF3n p\xFAblica de la totalidad o parte de los contenidos sin autorizaci\xF3n previa y por escrito.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">4. Exclusi\xF3n de garant\xEDas y responsabilidad</h2>
          <p style="color: ${mutedCol};">
            El titular no se hace responsable, en ning\xFAn caso, de los da\xF1os y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisi\xF3n de virus o programas maliciosos, a pesar de haber adoptado todas las medidas tecnol\xF3gicas necesarias para evitarlo.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">5. Legislaci\xF3n aplicable y jurisdicci\xF3n</h2>
          <p style="color: ${mutedCol};">
            Las relaciones entre el titular y el usuario se regir\xE1n por la <strong>${sanitizeHtml(law)}</strong>. Para la resoluci\xF3n de cualquier controversia, las partes se someten a los <strong>${sanitizeHtml(jurisdiction)}</strong>, sin perjuicio de los fueros imperativos legales aplicables.
          </p>
        </section>
      </article>
    `;
  }
  /**
   * Render Privacy Policy document (Política de Privacidad RGPD).
   */
  static renderPrivacyPolicy(config, options = {}) {
    const entity = config.legalEntity || {
      name: "[Raz\xF3n Social del Responsable]",
      taxId: "[NIF / CIF]",
      address: "[Domicilio]",
      email: "privacidad@solvenza.es"
    };
    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const borderCol = isDark ? "#334155" : "#e2e8f0";
    return `
      <article class="solvenza-privacy-policy-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Pol\xEDtica de Privacidad y Protecci\xF3n de Datos</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            Conforme al Reglamento General de Protecci\xF3n de Datos (RGPD UE 2016/679) y la Ley Org\xE1nica 3/2018 (LOPDGDD).
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. Responsable del tratamiento</h2>
          <p style="color: ${mutedCol};">
            <strong>Identidad:</strong> ${sanitizeHtml(entity.name)}<br>
            <strong>NIF / CIF:</strong> ${sanitizeHtml(entity.taxId || "-")}<br>
            <strong>Direcci\xF3n:</strong> ${sanitizeHtml(entity.address || "-")}<br>
            <strong>Correo electr\xF3nico:</strong> <a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "-")}</a><br>
            ${entity.dpoEmail ? `<strong>Contacto DPO:</strong> <a href="mailto:${sanitizeHtml(entity.dpoEmail)}" style="color: #2563eb;">${sanitizeHtml(entity.dpoEmail)}</a>` : ""}
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Finalidad del tratamiento y base jur\xEDdica</h2>
          <p style="color: ${mutedCol};">
            Tratamos los datos facilitados por los usuarios con las finalidades de gestionar sus solicitudes, prestar los servicios contratados y, en su caso, analizar el rendimiento de la web y remitir comunicaciones comerciales sobre la base de su <strong>consentimiento expl\xEDcito</strong> (art. 6.1.a RGPD) o en la <strong>ejecuci\xF3n contractual</strong> (art. 6.1.b RGPD).
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">3. Derechos del interesado</h2>
          <p style="color: ${mutedCol};">
            Cualquier persona tiene derecho a obtener confirmaci\xF3n sobre si estamos tratando datos personales que le conciernen. Los interesados tienen derecho a acceder a sus datos personales, solicitar la rectificaci\xF3n de los datos inexactos o, en su caso, solicitar su supresi\xF3n cuando los datos ya no sean necesarios para los fines que fueron recogidos.
          </p>
          <p style="color: ${mutedCol};">
            Puedes ejercer tus derechos de Acceso, Rectificaci\xF3n, Supresi\xF3n, Limitaci\xF3n, Portabilidad y Oposici\xF3n enviando un correo a <a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "")}</a>. Asimismo, puedes presentar una reclamaci\xF3n ante la Agencia Espa\xF1ola de Protecci\xF3n de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">www.aepd.es</a>).
          </p>
        </section>
      </article>
    `;
  }
};

// src/i18n/engine.ts
var BUILTIN_TRANSLATIONS = {
  es: {
    ui: {
      banner: {
        title: "Tu privacidad, bajo tu control",
        description: "Usamos tecnolog\xEDas necesarias para el funcionamiento del sitio. Con tu permiso, tambi\xE9n podemos utilizar anal\xEDtica y marketing.",
        accept: "Aceptar todas",
        reject: "Rechazar todas",
        configure: "Configurar",
        cookiesPolicy: "Pol\xEDtica de cookies",
        privacyPolicy: "Pol\xEDtica de privacidad",
        ariaLabel: "Gesti\xF3n de consentimiento de privacidad"
      },
      preferences: {
        title: "Preferencias de privacidad",
        subtitle: "Gestiona tus permisos de almacenamiento por finalidad (LSSI art. 22.2 & RGPD).",
        save: "Guardar selecci\xF3n",
        acceptAll: "Permitir todas",
        rejectAll: "Rechazar opcionales",
        closeLabel: "Cerrar ventana",
        requiredBadge: "Requerida",
        optionalBadge: "Opcional",
        servicesLabel: "Servicios incluidos",
        viewServices: "Ver servicios",
        hideServices: "Ocultar servicios",
        thirdParty: "Terceros"
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuraci\xF3n y revocaci\xF3n de cookies",
        tooltip: "Configurar o declinar cookies"
      }
    },
    categories: {
      necessary: {
        label: "Cookies T\xE9cnicas y Necesarias",
        description: "Imprescindibles para que el sitio web funcione y no pueden ser desactivadas."
      },
      analytics: {
        label: "Medici\xF3n y Rendimiento",
        description: "Nos permiten analizar las visitas y fuentes de tr\xE1fico para optimizar el sitio."
      },
      marketing: {
        label: "Publicidad Personalizada",
        description: "Utilizadas para mostrar anuncios relevantes seg\xFAn tus intereses y navegaci\xF3n."
      },
      preferences: {
        label: "Preferencias y Personalizaci\xF3n",
        description: "Permiten recordar informaci\xF3n que cambia el aspecto o comportamiento del sitio."
      }
    }
  },
  en: {
    ui: {
      banner: {
        title: "Your privacy, under your control",
        description: "We use essential technologies for our website to function. With your consent, we may also use analytics and marketing technologies.",
        accept: "Accept all",
        reject: "Reject all",
        configure: "Customize",
        cookiesPolicy: "Cookie policy",
        privacyPolicy: "Privacy policy",
        ariaLabel: "Privacy consent management"
      },
      preferences: {
        title: "Privacy Preferences",
        subtitle: "Manage your storage permissions by purpose (GDPR & ePrivacy compliant).",
        save: "Save preferences",
        acceptAll: "Allow all",
        rejectAll: "Reject optional",
        closeLabel: "Close dialog",
        requiredBadge: "Required",
        optionalBadge: "Optional",
        servicesLabel: "Included services",
        viewServices: "View services",
        hideServices: "Hide services",
        thirdParty: "Third-party"
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Cookie preferences and revocation",
        tooltip: "Customize or decline cookies"
      }
    },
    categories: {
      necessary: {
        label: "Strictly Necessary Cookies",
        description: "Essential for the website to function properly and cannot be deactivated."
      },
      analytics: {
        label: "Performance & Analytics",
        description: "Help us understand visitor behavior and traffic sources to optimize performance."
      },
      marketing: {
        label: "Targeted Advertising",
        description: "Used to deliver relevant ads and track campaign effectiveness across websites."
      },
      preferences: {
        label: "Preferences & Personalization",
        description: "Enable the website to remember user choices like language and layout settings."
      }
    }
  },
  ca: {
    ui: {
      banner: {
        title: "La teva privacitat, sota el teu control",
        description: "Utilitzem tecnologies necess\xE0ries per al funcionament del lloc. Amb el teu perm\xEDs, tamb\xE9 podem utilitzar anal\xEDtica i m\xE0rqueting.",
        accept: "Acceptar-les totes",
        reject: "Rebutjar-les totes",
        configure: "Configurar",
        cookiesPolicy: "Pol\xEDtica de cookies",
        privacyPolicy: "Pol\xEDtica de privacitat",
        ariaLabel: "Gesti\xF3 de consentiment de privacitat"
      },
      preferences: {
        title: "Prefer\xE8ncies de privacitat",
        subtitle: "Gestiona els teus permisos d'emmagatzematge per finalitat (LSSI art. 22.2 & RGPD).",
        save: "Desar selecci\xF3",
        acceptAll: "Permetre-les totes",
        rejectAll: "Rebutjar opcionals",
        closeLabel: "Tancar finestra",
        requiredBadge: "Requerida",
        optionalBadge: "Opcional",
        servicesLabel: "Serveis inclosos",
        viewServices: "Veure serveis",
        hideServices: "Amagar serveis",
        thirdParty: "Tercers"
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuraci\xF3 i revocaci\xF3 de cookies",
        tooltip: "Configurar o declinar cookies"
      }
    },
    categories: {
      necessary: {
        label: "Cookies T\xE8cniques i Necess\xE0ries",
        description: "Imprescindibles perqu\xE8 el lloc web funcioni correctament i no es poden desactivar."
      },
      analytics: {
        label: "Mesurament i Rendiment",
        description: "Ens permeten analitzar les visites i fonts de tr\xE0nsit per optimitzar el lloc."
      },
      marketing: {
        label: "Publicidad Personalitzada",
        description: "Utilitzades per mostrar anuncis rellevants segons els teus interessos i navegaci\xF3."
      },
      preferences: {
        label: "Prefer\xE8ncies i Personalitzaci\xF3",
        description: "Permeten recordar informaci\xF3 que canvia l'aspecte o comportament del lloc."
      }
    }
  },
  eu: {
    ui: {
      banner: {
        title: "Zure pribatutasuna, zure kontrolpean",
        description: "Webguneak funtzionatzeko beharrezkoak diren teknologiak erabiltzen ditugu. Zure baimenarekin, analitika eta marketina ere erabil ditzakegu.",
        accept: "Onartu guztiak",
        reject: "Baztertu guztiak",
        configure: "Konfiguratu",
        cookiesPolicy: "Cookie politika",
        privacyPolicy: "Pribatutasun politika",
        ariaLabel: "Pribatutasun-baimenen kudeaketa"
      },
      preferences: {
        title: "Pribatutasun-hobespenak",
        subtitle: "Kudeatu zure biltegiratze-baimenak helburuaren arabera (RGPD).",
        save: "Gorde hautapena",
        acceptAll: "Onartu guztiak",
        rejectAll: "Baztertu aukerakoak",
        closeLabel: "Itxi leihoa",
        requiredBadge: "Beharrezkoa",
        optionalBadge: "Aukerakoa",
        servicesLabel: "Barne dauden zerbitzuak",
        viewServices: "Ikusi zerbitzuak",
        hideServices: "Ezkutatu zerbitzuak",
        thirdParty: "Hirugarrenak"
      },
      floatingBadge: {
        label: "Cookieak",
        ariaLabel: "Cookien ezarpenak eta ezeztapena",
        tooltip: "Konfiguratu edo baztertu cookieak"
      }
    }
  },
  gl: {
    ui: {
      banner: {
        title: "A t\xFAa privacidade, baixo o teu control",
        description: "Empregamos tecnolox\xEDas necesarias para o funcionamento do sitio. Co teu permiso, tam\xE9n podemos utilizar anal\xEDtica e m\xE1rketing.",
        accept: "Aceptar todas",
        reject: "Rexeitar todas",
        configure: "Configurar",
        cookiesPolicy: "Pol\xEDtica de cookies",
        privacyPolicy: "Pol\xEDtica de privacidade",
        ariaLabel: "Xesti\xF3n de consentimento de privacidade"
      },
      preferences: {
        title: "Preferencias de privacidade",
        subtitle: "Xestiona os teus permisos de almacenamento por finalidade (LSSI art. 22.2 & RGPD).",
        save: "Gardar selecci\xF3n",
        acceptAll: "Permitir todas",
        rejectAll: "Rexeitar opcionais",
        closeLabel: "Pechar xanela",
        requiredBadge: "Requirida",
        optionalBadge: "Opcional",
        servicesLabel: "Servizos inclu\xEDdos",
        viewServices: "Ver servizos",
        hideServices: "Ocultar servizos",
        thirdParty: "Terceiros"
      },
      floatingBadge: {
        label: "Cookies",
        ariaLabel: "Configuraci\xF3n e revocaci\xF3n de cookies",
        tooltip: "Configurar ou declinar cookies"
      }
    }
  }
};
var I18nEngine = class {
  constructor(defaultLocale = "es") {
    this.locale = "es";
    this.locale = defaultLocale;
  }
  setLocale(locale) {
    this.locale = locale.toLowerCase();
  }
  getLocale() {
    return this.locale;
  }
  detectBrowserLocale(supportedLocales) {
    if (typeof navigator !== "undefined" && navigator.language) {
      const detected = navigator.language.split("-")[0].toLowerCase();
      if (supportedLocales && supportedLocales.length > 0) {
        const normalized = supportedLocales.map((l) => l.toLowerCase());
        if (normalized.includes(detected)) {
          return detected;
        }
        return normalized[0];
      }
      return detected;
    }
    return "es";
  }
  isLocaleSupported(locale, config) {
    var _a, _b;
    const clean = locale.toLowerCase();
    if (((_a = config == null ? void 0 : config.locale) == null ? void 0 : _a.supported) && config.locale.supported.length > 0) {
      return config.locale.supported.map((s) => s.toLowerCase()).includes(clean);
    }
    if ((config == null ? void 0 : config.translations) && config.translations[clean]) {
      return true;
    }
    if (BUILTIN_TRANSLATIONS[clean]) {
      return true;
    }
    return clean === (((_b = config == null ? void 0 : config.locale) == null ? void 0 : _b.default) || "es").toLowerCase();
  }
  detectParentLocale(config) {
    var _a, _b, _c, _d, _e, _f;
    const supported = (_a = config == null ? void 0 : config.locale) == null ? void 0 : _a.supported;
    const defaultLocale = (((_b = config == null ? void 0 : config.locale) == null ? void 0 : _b.default) || "es").toLowerCase();
    if (((_c = config == null ? void 0 : config.locale) == null ? void 0 : _c.syncHtmlLang) !== false && typeof document !== "undefined" && document.documentElement) {
      const htmlLang = document.documentElement.lang;
      if (htmlLang && htmlLang.trim().length > 0) {
        const clean = htmlLang.split("-")[0].toLowerCase().trim();
        if (this.isLocaleSupported(clean, config)) {
          return clean;
        }
      }
    }
    if (((_d = config == null ? void 0 : config.locale) == null ? void 0 : _d.syncUrl) !== false && typeof window !== "undefined" && window.location) {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        const potentialLang = pathSegments[0].toLowerCase();
        if (this.isLocaleSupported(potentialLang, config)) {
          return potentialLang;
        }
      }
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const queryLang = (_e = urlParams.get("lang") || urlParams.get("locale")) == null ? void 0 : _e.toLowerCase();
        if (queryLang && this.isLocaleSupported(queryLang, config)) {
          return queryLang;
        }
      } catch (e) {
      }
    }
    if ((_f = config == null ? void 0 : config.locale) == null ? void 0 : _f.autoDetect) {
      return this.detectBrowserLocale(supported);
    }
    return defaultLocale;
  }
  startParentSync(config, onLocaleChange) {
    var _a, _b;
    const cleanups = [];
    if (((_a = config.locale) == null ? void 0 : _a.syncHtmlLang) !== false && typeof document !== "undefined" && typeof MutationObserver !== "undefined" && document.documentElement) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes" && mutation.attributeName === "lang") {
            const rawLang = document.documentElement.lang;
            if (rawLang && rawLang.trim().length > 0) {
              const clean = rawLang.split("-")[0].toLowerCase().trim();
              if (this.isLocaleSupported(clean, config) && clean !== this.locale) {
                onLocaleChange(clean);
              }
            }
          }
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"]
      });
      cleanups.push(() => observer.disconnect());
    }
    if (((_b = config.locale) == null ? void 0 : _b.autoDetect) && typeof window !== "undefined") {
      const handleLangChange = () => {
        var _a2;
        const detected = this.detectBrowserLocale((_a2 = config.locale) == null ? void 0 : _a2.supported);
        if (detected !== this.locale) {
          onLocaleChange(detected);
        }
      };
      window.addEventListener("languagechange", handleLangChange);
      cleanups.push(() => window.removeEventListener("languagechange", handleLangChange));
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }
  resolveConfig(config, targetLocale) {
    var _a, _b;
    const baseLocale = (((_a = config.locale) == null ? void 0 : _a.default) || "es").toLowerCase();
    const locale = (targetLocale || this.locale || baseLocale).toLowerCase();
    const resolved = JSON.parse(JSON.stringify(config));
    const builtin = BUILTIN_TRANSLATIONS[locale];
    if (builtin) {
      const isBaseLocale = locale === baseLocale;
      this.applyTranslation(resolved, builtin, !isBaseLocale);
    }
    const custom = (_b = config.translations) == null ? void 0 : _b[locale];
    if (custom) {
      this.applyTranslation(resolved, custom, true);
    }
    return resolved;
  }
  applyTranslation(target, translation, overwriteExisting) {
    if (translation.policy) {
      if (!target.policy) target.policy = {};
      if (translation.policy.privacyUrl && (overwriteExisting || !target.policy.privacyUrl)) {
        target.policy.privacyUrl = translation.policy.privacyUrl;
      }
      if (translation.policy.cookiesUrl && (overwriteExisting || !target.policy.cookiesUrl)) {
        target.policy.cookiesUrl = translation.policy.cookiesUrl;
      }
    }
    if (translation.ui) {
      if (!target.ui) target.ui = {};
      if (translation.ui.banner) {
        if (!target.ui.banner) target.ui.banner = {};
        for (const [key, value] of Object.entries(this.filterDefined(translation.ui.banner))) {
          if (overwriteExisting || !target.ui.banner[key]) {
            target.ui.banner[key] = value;
          }
        }
      }
      if (translation.ui.preferences) {
        if (!target.ui.preferences) target.ui.preferences = {};
        for (const [key, value] of Object.entries(this.filterDefined(translation.ui.preferences))) {
          if (overwriteExisting || !target.ui.preferences[key]) {
            target.ui.preferences[key] = value;
          }
        }
      }
      if (translation.ui.floatingBadge) {
        if (typeof target.ui.floatingBadge === "object" && target.ui.floatingBadge !== null) {
          for (const [key, value] of Object.entries(this.filterDefined(translation.ui.floatingBadge))) {
            if (overwriteExisting || !target.ui.floatingBadge[key]) {
              target.ui.floatingBadge[key] = value;
            }
          }
        } else if (target.ui.floatingBadge === true) {
          target.ui.floatingBadge = __spreadValues({
            enabled: true,
            position: "bottom-left",
            icon: "cookie"
          }, this.filterDefined(translation.ui.floatingBadge));
        }
      }
    }
    if (translation.categories && target.categories) {
      for (const [catId, catTrans] of Object.entries(translation.categories)) {
        if (target.categories[catId]) {
          if (catTrans.label && (overwriteExisting || !target.categories[catId].label)) {
            target.categories[catId].label = catTrans.label;
          }
          if (catTrans.description && (overwriteExisting || !target.categories[catId].description)) {
            target.categories[catId].description = catTrans.description;
          }
        }
      }
    }
    if (translation.services && target.services) {
      for (const [srvId, srvTrans] of Object.entries(translation.services)) {
        if (target.services[srvId]) {
          if (srvTrans.label && (overwriteExisting || !target.services[srvId].label)) {
            target.services[srvId].label = srvTrans.label;
          }
          if (srvTrans.provider && (overwriteExisting || !target.services[srvId].provider)) {
            target.services[srvId].provider = srvTrans.provider;
          }
        }
      }
    }
  }
  filterDefined(obj) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== void 0 && value !== null) {
        result[key] = value;
      }
    }
    return result;
  }
};

// src/presets/presets-catalog.ts
var SERVICE_PRESETS = {
  // --- ANALYTICS ---
  ga4: {
    id: "ga4",
    category: "analytics",
    label: "Google Analytics 4",
    provider: "Google LLC",
    description: "Medici\xF3n de visitas, p\xE1ginas vistas, eventos y comportamiento de navegaci\xF3n del usuario.",
    policyUrl: "https://policies.google.com/privacy",
    cookies: [
      { name: "_ga", duration: "2 a\xF1os", purpose: "Distinguir a los usuarios \xFAnicos en el sitio web." },
      { name: "_ga_*", duration: "2 a\xF1os", purpose: "Mantener el estado de la sesi\xF3n de Google Analytics 4." },
      { name: "_gid", duration: "24 horas", purpose: "Distinguir a los usuarios durante un \xFAnico d\xEDa." },
      { name: "_gat*", duration: "1 minuto", purpose: "Limitar el porcentaje de solicitudes a Google Analytics." }
    ],
    storageKeys: ["_ga_*", "google_analytics_*"],
    localStorage: ["_ga_*", "google_analytics_*"]
  },
  google_analytics: {
    id: "google_analytics",
    category: "analytics",
    label: "Google Analytics (Universal / GA4)",
    provider: "Google LLC",
    description: "Medici\xF3n de visitas y estad\xEDsticas an\xF3nimas de tr\xE1fico web.",
    policyUrl: "https://policies.google.com/privacy",
    cookies: [
      { name: "_ga", duration: "2 a\xF1os", purpose: "Distinguir usuarios." },
      { name: "_ga_*", duration: "2 a\xF1os", purpose: "Estado de la sesi\xF3n GA4." },
      { name: "_gid", duration: "24 horas", purpose: "Identificador diario." }
    ],
    storageKeys: ["_ga_*"]
  },
  posthog: {
    id: "posthog",
    category: "analytics",
    label: "PostHog Analytics",
    provider: "PostHog, Inc.",
    description: "Anal\xEDtica de producto, registro de sesiones, mapas de ruta y embudos de interacci\xF3n.",
    policyUrl: "https://posthog.com/privacy",
    cookies: [
      { name: "ph_*_posthog", duration: "1 a\xF1o", purpose: "Persistencia de usuario e identificaci\xF3n de sesiones en PostHog." }
    ],
    storageKeys: ["ph_*_posthog"],
    localStorage: ["ph_*_posthog"],
    sessionStorage: ["ph_*_posthog"]
  },
  hotjar: {
    id: "hotjar",
    category: "analytics",
    label: "Hotjar Heatmaps & Feedback",
    provider: "Hotjar Ltd.",
    description: "Mapas de calor de clics, desplazamientos, grabaciones de comportamiento y encuestas.",
    policyUrl: "https://www.hotjar.com/legal/policies/privacy/",
    cookies: [
      { name: "_hjSession*", duration: "30 minutos", purpose: "Mantener los datos de la sesi\xF3n actual del usuario en Hotjar." },
      { name: "_hjSessionUser*", duration: "1 a\xF1o", purpose: "Mantener el ID de usuario an\xF3nimo en el navegador." },
      { name: "_hjIncludedIn*", duration: "Sesi\xF3n", purpose: "Determinar si el usuario est\xE1 incluido en el muestreo de datos." },
      { name: "_hjAbsoluteCanvasUrl", duration: "Sesi\xF3n", purpose: "Almacenar la URL can\xF3nica de visualizaci\xF3n." },
      { name: "_hjTLDTest", duration: "Sesi\xF3n", purpose: "Verificar el nivel de dominio para cookies." }
    ],
    storageKeys: ["_hj*", "hj*"],
    localStorage: ["_hj*"],
    sessionStorage: ["_hj*"]
  },
  clarity: {
    id: "clarity",
    category: "analytics",
    label: "Microsoft Clarity",
    provider: "Microsoft Corporation",
    description: "Grabaci\xF3n de navegaci\xF3n y mapas t\xE9rmicos de interacci\xF3n sin datos personales.",
    policyUrl: "https://privacy.microsoft.com/privacystatement",
    cookies: [
      { name: "_clck", duration: "1 a\xF1o", purpose: "Persistir el ID de usuario Clarity y sus preferencias de p\xE1gina." },
      { name: "_clsk", duration: "24 horas", purpose: "Conectar m\xFAltiples visitas de p\xE1gina en una \xFAnica sesi\xF3n." },
      { name: "CLID", duration: "1 a\xF1o", purpose: "Identificador de navegador para Clarity." },
      { name: "MUID", duration: "1 a\xF1o", purpose: "Identificador de usuario \xFAnico de Microsoft." }
    ],
    storageKeys: ["_cl*"],
    localStorage: ["_cl*"]
  },
  matomo: {
    id: "matomo",
    category: "analytics",
    label: "Matomo Analytics",
    provider: "InnoCraft Ltd.",
    description: "Plataforma de anal\xEDtica web local-first y centrada en la privacidad.",
    policyUrl: "https://matomo.org/privacy-policy/",
    cookies: [
      { name: "_pk_id*", duration: "13 meses", purpose: "Almacenar datos de usuario \xFAnicos como el ID de visitante." },
      { name: "_pk_ses*", duration: "30 minutos", purpose: "Almacenar datos temporales de la sesi\xF3n de navegaci\xF3n." },
      { name: "_pk_ref*", duration: "6 meses", purpose: "Almacenar la informaci\xF3n de atribuci\xF3n de procedencia." }
    ],
    storageKeys: ["_pk_*"],
    localStorage: ["_pk_*"]
  },
  plausible: {
    id: "plausible",
    category: "analytics",
    label: "Plausible Analytics",
    provider: "Plausible Insights O\xDC",
    description: "Anal\xEDtica web ligera y respetuosa con la privacidad, 100% libre de cookies.",
    policyUrl: "https://plausible.io/data-policy",
    cookies: [],
    storageKeys: []
  },
  // --- MARKETING & ADVERTISING ---
  meta_pixel: {
    id: "meta_pixel",
    category: "marketing",
    label: "Meta Pixel (Facebook)",
    provider: "Meta Platforms Ireland Ltd.",
    description: "Medici\xF3n de conversiones, personalizaci\xF3n y optimizaci\xF3n de campa\xF1as publicitarias en Facebook e Instagram.",
    policyUrl: "https://www.facebook.com/privacy/policy",
    cookies: [
      { name: "_fbp", duration: "90 d\xEDas", purpose: "Almacenar y rastrear visitas en los sitios web para segmentaci\xF3n publicitaria." },
      { name: "_fbc", duration: "90 d\xEDas", purpose: "Guardar el \xFAltimo clic en un anuncio de Facebook (par\xE1metro fbclid)." },
      { name: "fr", duration: "90 d\xEDas", purpose: "Cookie de publicidad comportamental de Facebook." },
      { name: "tr", duration: "Sesi\xF3n", purpose: "P\xEDxel de seguimiento de eventos en tiempo real." },
      { name: "datr", duration: "2 a\xF1os", purpose: "Identificaci\xF3n del navegador web para seguridad y anal\xEDtica publicitaria." }
    ],
    storageKeys: ["_fbp*"],
    localStorage: ["_fbp*"]
  },
  facebook_pixel: {
    id: "facebook_pixel",
    category: "marketing",
    label: "Meta Pixel (Facebook)",
    provider: "Meta Platforms Ireland Ltd.",
    description: "Medici\xF3n de conversiones y retargeting en Meta/Facebook.",
    policyUrl: "https://www.facebook.com/privacy/policy",
    cookies: [
      { name: "_fbp", duration: "90 d\xEDas", purpose: "Rastreo de conversiones y atribuci\xF3n de campa\xF1as." },
      { name: "_fbc", duration: "90 d\xEDas", purpose: "Identificador de clic de anuncio." }
    ],
    storageKeys: ["_fbp*"]
  },
  google_ads: {
    id: "google_ads",
    category: "marketing",
    label: "Google Ads & Remarketing",
    provider: "Google LLC",
    description: "Medici\xF3n de conversiones publicitarias y campa\xF1as de retargeting de Google Ads.",
    policyUrl: "https://policies.google.com/technologies/ads",
    cookies: [
      { name: "_gcl_au", duration: "90 d\xEDas", purpose: "Medici\xF3n de conversiones publicitarias de Google AdSense y Ads." },
      { name: "_gcl_aw", duration: "90 d\xEDas", purpose: "Conversiones procedentes de clics en anuncios de Google Ads." },
      { name: "IDE", duration: "1 a\xF1o", purpose: "Publicidad dirigida y medici\xF3n de rendimiento de DoubleClick." },
      { name: "DSID", duration: "2 semanas", purpose: "Identificar usuario conectado en sitios web ajenos a Google." },
      { name: "RUL", duration: "1 a\xF1o", purpose: "Audiencias de remarketing de Google Ads." }
    ],
    storageKeys: ["_gcl_*"]
  },
  tiktok_pixel: {
    id: "tiktok_pixel",
    category: "marketing",
    label: "TikTok Pixel",
    provider: "TikTok Technology Limited",
    description: "Medici\xF3n de rendimiento y segmentaci\xF3n de campa\xF1as publicitarias en TikTok.",
    policyUrl: "https://www.tiktok.com/legal/privacy-policy-eea",
    cookies: [
      { name: "_tt_enable_cookie", duration: "13 meses", purpose: "Habilitar la medici\xF3n de conversiones del p\xEDxel de TikTok." },
      { name: "_ttp", duration: "13 meses", purpose: "Medir y mejorar el rendimiento de las campa\xF1as publicitarias en TikTok." }
    ],
    storageKeys: ["tt_*", "_ttp*"]
  },
  linkedin_insight: {
    id: "linkedin_insight",
    category: "marketing",
    label: "LinkedIn Insight Tag",
    provider: "LinkedIn Ireland Unlimited Company",
    description: "Informes de conversiones y atribuci\xF3n de campa\xF1as profesionales B2B en LinkedIn.",
    policyUrl: "https://www.linkedin.com/legal/privacy-policy",
    cookies: [
      { name: "li_sugr", duration: "90 d\xEDas", purpose: "Identificador probabil\xEDstico de navegador en LinkedIn." },
      { name: "bcookie", duration: "1 a\xF1o", purpose: "Identificador de sesi\xF3n de navegador para servicios de LinkedIn." },
      { name: "lidc", duration: "24 horas", purpose: "Enrutamiento de centros de datos para LinkedIn." },
      { name: "UserMatchHistory", duration: "30 d\xEDas", purpose: "Sincronizaci\xF3n de identificadores de publicidad de LinkedIn." }
    ]
  },
  twitter_pixel: {
    id: "twitter_pixel",
    category: "marketing",
    label: "X / Twitter Ads Pixel",
    provider: "X Corp.",
    description: "Medici\xF3n de conversiones e interacci\xF3n con campa\xF1as publicitarias en X (Twitter).",
    policyUrl: "https://twitter.com/privacy",
    cookies: [
      { name: "personalization_id", duration: "2 a\xF1os", purpose: "Personalizaci\xF3n de publicidad y medici\xF3n de eventos en X." },
      { name: "muc_ads", duration: "2 a\xF1os", purpose: "Seguimiento de conversiones publicitarias en X." }
    ]
  },
  hubspot: {
    id: "hubspot",
    category: "marketing",
    label: "HubSpot CRM & Tracking",
    provider: "HubSpot, Inc.",
    description: "Anal\xEDtica de leads, formularios inteligentes y seguimiento de clientes potenciales.",
    policyUrl: "https://legal.hubspot.com/privacy-policy",
    cookies: [
      { name: "__hstc", duration: "6 meses", purpose: "Rastreo de visitantes \xFAnicos, sesiones y marcas de tiempo." },
      { name: "hubspotutk", duration: "6 meses", purpose: "Rastreo de identidad de visitante pasado a formularios." },
      { name: "__hssc", duration: "30 minutos", purpose: "Rastreo de sesiones activas en HubSpot." },
      { name: "__hssrc", duration: "Sesi\xF3n", purpose: "Determinar si el usuario ha reiniciado su navegador." }
    ],
    storageKeys: ["__hs*", "hubspot*"]
  },
  // --- EMBEDDED MEDIA ---
  youtube: {
    id: "youtube",
    category: "marketing",
    label: "YouTube Video Player",
    provider: "Google LLC",
    description: "Reproducci\xF3n de contenidos de v\xEDdeo integrados y almacenamiento de preferencias del reproductor.",
    policyUrl: "https://policies.google.com/privacy",
    cookies: [
      { name: "VISITOR_INFO1_LIVE", duration: "6 meses", purpose: "Estimar el ancho de banda del usuario en p\xE1ginas con v\xEDdeos de YouTube." },
      { name: "YSC", duration: "Sesi\xF3n", purpose: "Registrar estad\xEDsticas de visualizaciones de v\xEDdeo de YouTube." },
      { name: "PREF", duration: "8 meses", purpose: "Almacenar preferencias de configuraci\xF3n del reproductor." },
      { name: "GPS", duration: "30 minutos", purpose: "Rastrear ubicaci\xF3n en dispositivos m\xF3viles." }
    ],
    storageKeys: ["yt-*", "yt-remote-*"],
    localStorage: ["yt-*", "yt-remote-*"]
  },
  vimeo: {
    id: "vimeo",
    category: "marketing",
    label: "Vimeo Video Player",
    provider: "Vimeo, Inc.",
    description: "Reproducci\xF3n de v\xEDdeos interactivos alojados en Vimeo y estad\xEDsticas de visualizaci\xF3n.",
    policyUrl: "https://vimeo.com/privacy",
    cookies: [
      { name: "vuid", duration: "2 a\xF1os", purpose: "Almacenar el historial de reproducciones de v\xEDdeo del usuario en Vimeo." },
      { name: "player", duration: "1 a\xF1o", purpose: "Guardar las preferencias de volumen y resoluci\xF3n del reproductor." }
    ],
    storageKeys: ["vimeo*"]
  },
  spotify: {
    id: "spotify",
    category: "marketing",
    label: "Spotify Player",
    provider: "Spotify AB",
    description: "Reproducci\xF3n embebida de canciones, podcasts y listas de reproducci\xF3n de Spotify.",
    policyUrl: "https://www.spotify.com/legal/privacy-policy/",
    cookies: [
      { name: "sp_t", duration: "1 a\xF1o", purpose: "Identificador de usuario \xFAnico de Spotify para contenido embebido." },
      { name: "sp_m", duration: "1 a\xF1o", purpose: "Preferencias de reproducci\xF3n y cookies de sesi\xF3n." }
    ]
  },
  // --- CHAT & CUSTOMER SUPPORT ---
  intercom: {
    id: "intercom",
    category: "marketing",
    label: "Intercom Messenger",
    provider: "Intercom R&D Unlimited Company",
    description: "Widget de mensajer\xEDa, soporte al cliente en tiempo real y asistencia guiada.",
    policyUrl: "https://www.intercom.com/legal/privacy",
    cookies: [
      { name: "intercom-id-*", duration: "9 meses", purpose: "Identificador an\xF3nimo de visitante para conversaciones en Intercom." },
      { name: "intercom-session-*", duration: "7 d\xEDas", purpose: "Persistir la sesi\xF3n de chat activa." },
      { name: "intercom-device-id-*", duration: "9 meses", purpose: "Identificador del dispositivo del visitante." }
    ],
    storageKeys: ["intercom*"]
  },
  crisp: {
    id: "crisp",
    category: "marketing",
    label: "Crisp Live Chat",
    provider: "Crisp IM SARL",
    description: "Chat en vivo de soporte y mensajer\xEDa multicanal para visitantes.",
    policyUrl: "https://crisp.chat/privacy",
    cookies: [
      { name: "crisp-client/*", duration: "6 meses", purpose: "Identificador de sesi\xF3n de chat en Crisp." }
    ],
    storageKeys: ["crisp-client*"]
  },
  // --- NECESSARY / TECHNICAL / SECURITY ---
  gtm: {
    id: "gtm",
    category: "necessary",
    label: "Google Tag Manager",
    provider: "Google LLC",
    description: "Contenedor t\xE9cnico para la inyecci\xF3n y gesti\xF3n centralizada de scripts del sitio web.",
    policyUrl: "https://policies.google.com/privacy",
    cookies: [
      { name: "_gtm_*", duration: "Sesi\xF3n", purpose: "Depuraci\xF3n t\xE9cnica de contenedores de Google Tag Manager." }
    ]
  },
  google_recaptcha: {
    id: "google_recaptcha",
    category: "necessary",
    label: "Google reCAPTCHA",
    provider: "Google LLC",
    description: "Protecci\xF3n contra bots automatizados, ataques de fuerza bruta y spam en formularios.",
    policyUrl: "https://policies.google.com/privacy",
    cookies: [
      { name: "_GRECAPTCHA", duration: "6 meses", purpose: "Evaluaci\xF3n de riesgo de bots para protecci\xF3n de formularios." },
      { name: "rc::a", duration: "Persistente", purpose: "Distinguir entre humanos y bots automatizados." },
      { name: "rc::b", duration: "Sesi\xF3n", purpose: "Distinguir entre humanos y bots automatizados." },
      { name: "rc::c", duration: "Sesi\xF3n", purpose: "Distinguir entre humanos y bots automatizados." }
    ]
  },
  cloudflare: {
    id: "cloudflare",
    category: "necessary",
    label: "Cloudflare Security & Turnstile",
    provider: "Cloudflare, Inc.",
    description: "Mitigaci\xF3n de ataques DDoS, balanceo de carga CDN y validaci\xF3n de seguridad Turnstile.",
    policyUrl: "https://www.cloudflare.com/privacypolicy/",
    cookies: [
      { name: "__cf_bm", duration: "30 minutos", purpose: "Gesti\xF3n de bots y mitigaci\xF3n de tr\xE1fico malicioso en Cloudflare." },
      { name: "cf_clearance", duration: "1 a\xF1o", purpose: "Autorizaci\xF3n de paso tras superar desaf\xEDo de seguridad Turnstile/Cloudflare." }
    ]
  },
  stripe: {
    id: "stripe",
    category: "necessary",
    label: "Stripe Payments & Fraud Prevention",
    provider: "Stripe, Inc.",
    description: "Procesamiento seguro de transacciones bancarias, tarjetas y prevenci\xF3n de fraude financiero.",
    policyUrl: "https://stripe.com/privacy",
    cookies: [
      { name: "__stripe_mid", duration: "1 a\xF1o", purpose: "Prevenci\xF3n de fraude y autenticaci\xF3n de pagos en Stripe." },
      { name: "__stripe_sid", duration: "30 minutos", purpose: "Identificador de sesi\xF3n de transacci\xF3n en Stripe." },
      { name: "m", duration: "2 a\xF1os", purpose: "Detecci\xF3n de fraude financiero en la pasarela de pagos Stripe." }
    ],
    storageKeys: ["__stripe_*"],
    localStorage: ["__stripe_*"]
  },
  paypal: {
    id: "paypal",
    category: "necessary",
    label: "PayPal Checkout",
    provider: "PayPal (Europe) S.\xE0 r.l. et Cie, S.C.A.",
    description: "Procesamiento de pagos y pasarela de cobro segura de PayPal.",
    policyUrl: "https://www.paypal.com/webapps/mpp/ua/privacy-full",
    cookies: [
      { name: "ts", duration: "3 a\xF1os", purpose: "Gesti\xF3n segura de pagos y prevenci\xF3n de fraude en PayPal." },
      { name: "ts_c", duration: "3 a\xF1os", purpose: "Autenticaci\xF3n segura de usuario en la pasarela PayPal." }
    ]
  }
};

// src/presets/index.ts
function hasPreset(presetId) {
  return Object.prototype.hasOwnProperty.call(SERVICE_PRESETS, presetId);
}
function resolveConfigPresets(config) {
  if (!config || !config.services || typeof config.services !== "object") {
    return config;
  }
  const hydratedServices = {};
  for (const [serviceKey, serviceDef] of Object.entries(config.services)) {
    if (!serviceDef || typeof serviceDef !== "object") {
      hydratedServices[serviceKey] = serviceDef;
      continue;
    }
    const presetName = serviceDef.preset || (hasPreset(serviceKey) && !serviceDef.category ? serviceKey : void 0);
    if (presetName && hasPreset(presetName)) {
      const preset = SERVICE_PRESETS[presetName];
      hydratedServices[serviceKey] = __spreadValues({
        category: serviceDef.category || preset.category,
        label: serviceDef.label || preset.label,
        provider: serviceDef.provider || preset.provider,
        policyUrl: serviceDef.policyUrl || preset.policyUrl,
        description: serviceDef.description || preset.description,
        cookies: serviceDef.cookies || (preset.cookies ? [...preset.cookies] : void 0),
        storageKeys: serviceDef.storageKeys || (preset.storageKeys ? [...preset.storageKeys] : void 0),
        localStorage: serviceDef.localStorage || (preset.localStorage ? [...preset.localStorage] : void 0),
        sessionStorage: serviceDef.sessionStorage || (preset.sessionStorage ? [...preset.sessionStorage] : void 0)
      }, serviceDef);
    } else {
      hydratedServices[serviceKey] = serviceDef;
    }
  }
  return __spreadProps(__spreadValues({}, config), {
    services: hydratedServices
  });
}

// src/core/gpc.ts
function detectGpcSignal() {
  var _a, _b, _c, _d;
  if (typeof window === "undefined" && typeof navigator === "undefined" && typeof globalThis === "undefined") {
    return false;
  }
  const nav = typeof navigator !== "undefined" ? navigator : null;
  const win = typeof window !== "undefined" ? window : null;
  const glob = typeof globalThis !== "undefined" ? globalThis : null;
  if ((nav == null ? void 0 : nav.globalPrivacyControl) === true || (win == null ? void 0 : win.globalPrivacyControl) === true || ((_a = win == null ? void 0 : win.navigator) == null ? void 0 : _a.globalPrivacyControl) === true || ((_b = glob == null ? void 0 : glob.navigator) == null ? void 0 : _b.globalPrivacyControl) === true || (glob == null ? void 0 : glob.globalPrivacyControl) === true) {
    return true;
  }
  if ((nav == null ? void 0 : nav.doNotTrack) === "1" || (win == null ? void 0 : win.doNotTrack) === "1" || ((_c = win == null ? void 0 : win.navigator) == null ? void 0 : _c.doNotTrack) === "1" || ((_d = glob == null ? void 0 : glob.navigator) == null ? void 0 : _d.doNotTrack) === "1" || (glob == null ? void 0 : glob.doNotTrack) === "1" || (nav == null ? void 0 : nav.msDoNotTrack) === "1" || (win == null ? void 0 : win.external) && typeof win.external.msTrackingProtectionEnabled === "function" && win.external.msTrackingProtectionEnabled()) {
    return true;
  }
  return false;
}
function resolveGpcConfig(config) {
  const gpc = config == null ? void 0 : config.gpc;
  return {
    enabled: (gpc == null ? void 0 : gpc.enabled) !== false,
    respectSignal: (gpc == null ? void 0 : gpc.respectSignal) !== false,
    mode: (gpc == null ? void 0 : gpc.mode) || "auto-reject",
    categories: (gpc == null ? void 0 : gpc.categories) || [],
    noticeText: (gpc == null ? void 0 : gpc.noticeText) || "Se\xF1al de Privacidad Global (GPC) detectada: cookies no esenciales desactivadas."
  };
}
function applyGpcChoices(config, baseChoices) {
  const result = __spreadValues({}, baseChoices || {});
  const gpcOptions = resolveGpcConfig(config);
  for (const [catId, catConfig] of Object.entries(config.categories)) {
    if (catConfig.required || catId === "necessary") {
      result[catId] = true;
    } else {
      if (gpcOptions.categories.length === 0 || gpcOptions.categories.includes(catId)) {
        result[catId] = false;
      }
    }
  }
  return result;
}

// src/core/consent-engine.ts
var ConsentEngine = class {
  constructor() {
    this.stateManager = new StateManager();
    this.eventBus = new EventBus();
    this.blockerRegistry = new BlockerRegistry();
    this.banner = new ConsentBanner();
    this.preferencesModal = new PreferencesModal();
    this.floatingBadge = new FloatingBadge();
    this.i18n = new I18nEngine();
    this.stopLocaleSync = null;
    this.initPromise = null;
    this.resolveReady = null;
    this.readyPromise = new Promise((resolve) => {
      this.resolveReady = resolve;
    });
  }
  async init(configInput) {
    if (this.initPromise) return this.initPromise;
    this.initPromise = (async () => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
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
      config = resolveConfigPresets(config);
      validateConfig(config);
      const initialLocale = this.i18n.detectParentLocale(config);
      this.i18n.setLocale(initialLocale);
      (_a = this.stopLocaleSync) == null ? void 0 : _a.call(this);
      this.stopLocaleSync = this.i18n.startParentSync(config, (newLocale) => {
        this.setLocale(newLocale);
      });
      const cookieName = ((_b = config.storage) == null ? void 0 : _b.name) || "site_consent";
      const rawReceipt = ((_c = config.storage) == null ? void 0 : _c.type) === "memory" ? MemoryStore.get(cookieName) : CookieStore.get(cookieName);
      const savedReceipt = rawReceipt ? parseReceipt(rawReceipt) : null;
      const evalResult = evaluatePolicy(config, savedReceipt);
      const isGpcDetected = detectGpcSignal();
      const gpcConfig = resolveGpcConfig(config);
      const isGpcActive = isGpcDetected && gpcConfig.enabled && gpcConfig.respectSignal;
      let activeReceipt = evalResult.isValid ? savedReceipt : null;
      let activeChoices = evalResult.choices;
      let autoAppliedGpc = false;
      if (!evalResult.isValid && isGpcActive) {
        if (gpcConfig.mode !== "notice-only") {
          activeChoices = applyGpcChoices(config);
          activeReceipt = createReceipt(
            config.policyVersion,
            activeChoices,
            "gpc",
            null,
            (_d = config.security) == null ? void 0 : _d.secretKey
          );
          activeReceipt.gpc = true;
          autoAppliedGpc = true;
          const receiptJson = JSON.stringify(activeReceipt);
          if (((_e = config.storage) == null ? void 0 : _e.type) === "memory") {
            MemoryStore.set(cookieName, receiptJson);
          } else {
            CookieStore.set(cookieName, receiptJson, {
              path: ((_f = config.storage) == null ? void 0 : _f.path) || "/",
              maxAgeDays: (_h = (_g = config.consent) == null ? void 0 : _g.maxAgeDays) != null ? _h : 365,
              sameSite: ((_i = config.storage) == null ? void 0 : _i.sameSite) || "Lax",
              secure: (_j = config.storage) == null ? void 0 : _j.secure,
              domain: (_k = config.storage) == null ? void 0 : _k.domain
            });
          }
          for (const [catId, allowed] of Object.entries(activeChoices)) {
            if (!allowed && catId !== "necessary") {
              StorageCleaner.purgeCategory(config, catId);
            }
          }
        }
      }
      this.stateManager.init(config, activeChoices, activeReceipt, isGpcDetected);
      this.stateManager.setLocale(initialLocale);
      if (isGpcDetected) {
        this.eventBus.emit("gpc:detected", {
          signal: true,
          autoApplied: autoAppliedGpc,
          choices: activeChoices
        });
        this.dispatchDomEvent("solvenza:gpc", {
          signal: true,
          autoApplied: autoAppliedGpc,
          choices: activeChoices
        });
      }
      GoogleConsentAdapter.initDefault();
      if (evalResult.isValid || autoAppliedGpc) {
        GoogleConsentAdapter.update(activeChoices);
        this.dispatchDomEvent("solvenza:restored", { state: this.getConsent() });
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
      const resolvedConfig = this.getResolvedConfig() || config;
      const badgeConfig = this.resolveFloatingBadgeConfig(resolvedConfig);
      if (badgeConfig.enabled) {
        this.floatingBadge.render(resolvedConfig, {
          onClick: () => this.openPreferences()
        });
        if (evalResult.isValid || autoAppliedGpc || badgeConfig.visibility === "always") {
          this.showFloatingBadge();
        }
      }
      (_l = this.resolveReady) == null ? void 0 : _l.call(this);
      this.eventBus.emit("ready", { state: this.getConsent() });
      if (!evalResult.isValid && !autoAppliedGpc) {
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
    const config = this.getResolvedConfig();
    if (!config) return;
    this.hideFloatingBadge();
    this.preferencesModal.render(config, this.stateManager.getChoices(), {
      onSave: (choices) => {
        this.setPreferences(choices);
        this.restoreFloatingBadgeIfNeeded();
      },
      onAcceptAll: () => {
        this.acceptAll();
        this.restoreFloatingBadgeIfNeeded();
      },
      onRejectAll: () => {
        this.rejectAll();
        this.restoreFloatingBadgeIfNeeded();
      },
      onClose: () => {
        this.restoreFloatingBadgeIfNeeded();
        this.eventBus.emit("preferences:closed", void 0);
      }
    });
    this.eventBus.emit("preferences:opened", void 0);
  }
  closePreferences() {
    this.preferencesModal.close();
    this.restoreFloatingBadgeIfNeeded();
    this.eventBus.emit("preferences:closed", void 0);
  }
  getLocale() {
    return this.i18n.getLocale();
  }
  setLocale(locale) {
    const previousLocale = this.i18n.getLocale();
    if (locale.toLowerCase() === previousLocale.toLowerCase()) return;
    this.i18n.setLocale(locale);
    this.stateManager.setLocale(locale);
    const config = this.getResolvedConfig();
    if (!config) return;
    if (this.banner.getIsVisible()) {
      this.banner.render(config, {
        onAcceptAll: () => this.acceptAll(),
        onRejectAll: () => this.rejectAll(),
        onConfigure: () => this.openPreferences()
      });
    }
    if (this.preferencesModal.getIsOpen()) {
      this.preferencesModal.render(config, this.stateManager.getChoices(), {
        onSave: (choices) => {
          this.setPreferences(choices);
          this.restoreFloatingBadgeIfNeeded();
        },
        onAcceptAll: () => {
          this.acceptAll();
          this.restoreFloatingBadgeIfNeeded();
        },
        onRejectAll: () => {
          this.rejectAll();
          this.restoreFloatingBadgeIfNeeded();
        },
        onClose: () => {
          this.restoreFloatingBadgeIfNeeded();
          this.eventBus.emit("preferences:closed", void 0);
        }
      });
    }
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (badgeConfig.enabled) {
      const wasVisible = this.floatingBadge.getIsVisible();
      this.floatingBadge.render(config, {
        onClick: () => this.openPreferences()
      });
      if (wasVisible) {
        this.floatingBadge.show();
      }
    }
    this.eventBus.emit("locale:changed", { locale, previousLocale });
    this.dispatchDomEvent("solvenza:locale:changed", { locale, previousLocale });
  }
  /**
   * Synchronize active locale with parent application i18n state.
   */
  syncLocale(locale) {
    this.setLocale(locale);
  }
  /**
   * Check if Global Privacy Control (GPC) or Do Not Track (DNT) signal is active.
   */
  isGpcActive() {
    return detectGpcSignal();
  }
  restoreFloatingBadgeIfNeeded() {
    const config = this.getResolvedConfig();
    if (!config) return;
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (!badgeConfig.enabled) return;
    this.showFloatingBadge();
  }
  getResolvedConfig() {
    const rawConfig = this.stateManager.getConfig();
    if (!rawConfig) return null;
    return this.i18n.resolveConfig(rawConfig, this.getLocale());
  }
  withdraw() {
    var _a, _b, _c, _d;
    const previousChoices = this.stateManager.getChoices();
    const config = this.stateManager.getConfig();
    if (!config) return;
    const cookieName = ((_a = config.storage) == null ? void 0 : _a.name) || "site_consent";
    if (((_b = config.storage) == null ? void 0 : _b.type) === "memory") {
      MemoryStore.remove(cookieName);
    } else {
      CookieStore.remove(cookieName, ((_c = config.storage) == null ? void 0 : _c.path) || "/", (_d = config.storage) == null ? void 0 : _d.domain);
    }
    for (const catId of Object.keys(config.categories)) {
      if (catId !== "necessary") {
        this.purgeCategory(catId);
      }
    }
    this.stateManager.clearChoices();
    GoogleConsentAdapter.update(this.stateManager.getChoices());
    this.eventBus.emit("consent:withdrawn", { previousChoices });
    this.dispatchDomEvent("solvenza:updated", { choices: this.stateManager.getChoices() });
    const badgeConfig = this.resolveFloatingBadgeConfig(this.getResolvedConfig() || config);
    if (badgeConfig.enabled && badgeConfig.visibility !== "always") {
      this.hideFloatingBadge();
    }
    this.showBanner();
  }
  purgeCategory(category) {
    const config = this.stateManager.getConfig();
    if (!config) {
      return {
        category,
        purgedCookies: [],
        purgedLocalStorage: [],
        purgedSessionStorage: []
      };
    }
    const report = StorageCleaner.purgeCategory(config, category);
    this.eventBus.emit("storage:purged", { category, report });
    this.dispatchDomEvent("solvenza:storage:purged", { category, report });
    return report;
  }
  purgeStorage(categoryOrService) {
    var _a, _b;
    const config = this.stateManager.getConfig();
    if (!config) return [];
    if (categoryOrService) {
      if ((_a = config.categories) == null ? void 0 : _a[categoryOrService]) {
        return [this.purgeCategory(categoryOrService)];
      }
      const service = (_b = config.services) == null ? void 0 : _b[categoryOrService];
      if (service == null ? void 0 : service.category) {
        return [this.purgeCategory(service.category)];
      }
    }
    const reports = [];
    const currentChoices = this.stateManager.getChoices();
    for (const [catId, allowed] of Object.entries(currentChoices)) {
      if (!allowed && catId !== "necessary") {
        reports.push(this.purgeCategory(catId));
      }
    }
    return reports;
  }
  showFloatingBadge() {
    const config = this.getResolvedConfig();
    if (!config) return;
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (!badgeConfig.enabled) return;
    const el = this.floatingBadge.getElement();
    if (!el || !el.parentNode) {
      this.floatingBadge.render(config, {
        onClick: () => this.openPreferences()
      });
    }
    this.floatingBadge.show();
    this.eventBus.emit("floating-badge:shown", void 0);
    this.dispatchDomEvent("solvenza:badge:shown", void 0);
  }
  hideFloatingBadge() {
    this.floatingBadge.hide();
    this.eventBus.emit("floating-badge:hidden", void 0);
    this.dispatchDomEvent("solvenza:badge:hidden", void 0);
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
  mountPolicy(targetContainer, options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container = typeof targetContainer === "string" ? document.querySelector(targetContainer) : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderCookiePolicy(config, options);
    }
  }
  renderPolicyHtml(options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderCookiePolicy(config, options);
  }
  mountLegalNotice(targetContainer, options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container = typeof targetContainer === "string" ? document.querySelector(targetContainer) : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderLegalNotice(config, options);
    }
  }
  renderLegalNoticeHtml(options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderLegalNotice(config, options);
  }
  mountPrivacyPolicy(targetContainer, options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    const container = typeof targetContainer === "string" ? document.querySelector(targetContainer) : targetContainer;
    if (container) {
      container.innerHTML = PolicyGenerator.renderPrivacyPolicy(config, options);
    }
  }
  renderPrivacyPolicyHtml(options) {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) {
      throw new Error("[ConsentSDK] SDK not initialized.");
    }
    return PolicyGenerator.renderPrivacyPolicy(config, options);
  }
  saveChoices(choices, source) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const config = this.stateManager.getConfig();
    if (!config) return;
    const receipt = createReceipt(
      config.policyVersion,
      choices,
      source,
      this.stateManager.getReceipt(),
      (_a = config.security) == null ? void 0 : _a.secretKey
    );
    if (this.isGpcActive()) {
      receipt.gpc = true;
    }
    this.stateManager.updateChoices(receipt);
    for (const [catId, isAllowed] of Object.entries(choices)) {
      if (!isAllowed) {
        this.purgeCategory(catId);
      }
    }
    const cookieName = ((_b = config.storage) == null ? void 0 : _b.name) || "site_consent";
    const receiptJson = JSON.stringify(receipt);
    if (((_c = config.storage) == null ? void 0 : _c.type) === "memory") {
      MemoryStore.set(cookieName, receiptJson);
    } else {
      CookieStore.set(cookieName, receiptJson, {
        path: ((_d = config.storage) == null ? void 0 : _d.path) || "/",
        maxAgeDays: (_f = (_e = config.consent) == null ? void 0 : _e.maxAgeDays) != null ? _f : 365,
        sameSite: ((_g = config.storage) == null ? void 0 : _g.sameSite) || "Lax",
        secure: (_h = config.storage) == null ? void 0 : _h.secure,
        domain: (_i = config.storage) == null ? void 0 : _i.domain
      });
    }
    GoogleConsentAdapter.update(choices);
    this.blockerRegistry.init(
      (cat) => this.has(cat),
      (srv) => this.hasService(srv)
    );
    if (((_j = config.logging) == null ? void 0 : _j.enabled) && config.logging.endpoint) {
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
    const resolvedConfig = this.getResolvedConfig() || config;
    const badgeConfig = this.resolveFloatingBadgeConfig(resolvedConfig);
    if (badgeConfig.enabled) {
      this.showFloatingBadge();
    }
    this.eventBus.emit("consent:changed", { choices, receipt });
    this.dispatchDomEvent("solvenza:updated", { choices, receipt });
  }
  showBanner() {
    const config = this.getResolvedConfig() || this.stateManager.getConfig();
    if (!config) return;
    const badgeConfig = this.resolveFloatingBadgeConfig(config);
    if (badgeConfig.enabled && badgeConfig.visibility !== "always") {
      this.hideFloatingBadge();
    }
    this.banner.render(config, {
      onAcceptAll: () => this.acceptAll(),
      onRejectAll: () => this.rejectAll(),
      onConfigure: () => this.openPreferences()
    });
    this.eventBus.emit("banner:shown", void 0);
    this.dispatchDomEvent("solvenza:show", void 0);
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
    document.addEventListener("solvenza:show", () => {
      this.showBanner();
    });
    document.addEventListener("solvenza:preferences", () => {
      this.openPreferences();
    });
    document.addEventListener("solvenza:badge:show", () => {
      this.showFloatingBadge();
    });
    document.addEventListener("solvenza:badge:hide", () => {
      this.hideFloatingBadge();
    });
    document.addEventListener("solvenza:locale", (e) => {
      var _a;
      if ((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.locale) {
        this.setLocale(e.detail.locale);
      }
    });
  }
  resolveFloatingBadgeConfig(config) {
    var _a;
    const raw = (_a = config == null ? void 0 : config.ui) == null ? void 0 : _a.floatingBadge;
    if (raw === false) {
      return { enabled: false };
    }
    if (raw === true || raw === void 0) {
      return {
        enabled: true,
        position: "bottom-left",
        icon: "cookie",
        visibility: "after-consent"
      };
    }
    if (typeof raw === "object" && raw !== null) {
      return {
        enabled: raw.enabled !== false,
        position: raw.position || "bottom-left",
        label: raw.label,
        ariaLabel: raw.ariaLabel,
        showLabel: raw.showLabel,
        icon: raw.icon || "cookie",
        visibility: raw.visibility || "after-consent"
      };
    }
    return { enabled: true, position: "bottom-left", icon: "cookie", visibility: "after-consent" };
  }
  dispatchDomEvent(name, detail) {
    if (typeof document === "undefined") return;
    try {
      const customEvent = new CustomEvent(name, { detail, bubbles: true });
      document.dispatchEvent(customEvent);
    } catch (e) {
    }
  }
};
var globalScope = typeof window !== "undefined" ? window : globalThis;
if (!globalScope.__ConsentSDK_Instance__) {
  globalScope.__ConsentSDK_Instance__ = new ConsentEngine();
}
var Consent = globalScope.__ConsentSDK_Instance__;

// src/wrappers/angular.ts
var _ConsentService_decorators, _init;
_ConsentService_decorators = [(0, import_core.Injectable)({
  providedIn: "root"
})];
var ConsentService = class {
  async init(config) {
    return Consent.init(config);
  }
  getConsent() {
    return Consent.getConsent();
  }
  getLocale() {
    return Consent.getLocale();
  }
  setLocale(locale) {
    Consent.setLocale(locale);
  }
  /**
   * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
   * with the cookie compliance engine without boilerplate.
   */
  syncLocale(locale) {
    Consent.syncLocale(locale);
  }
  /**
   * Check if Global Privacy Control (GPC) signal is active.
   */
  isGpcActive() {
    return Consent.isGpcActive();
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
  purgeCategory(category) {
    return Consent.purgeCategory(category);
  }
  purgeStorage(categoryOrService) {
    return Consent.purgeStorage(categoryOrService);
  }
  on(event, handler) {
    return Consent.on(event, handler);
  }
  renderPolicyHtml(options) {
    return Consent.renderPolicyHtml(options);
  }
  renderLegalNoticeHtml(options) {
    return Consent.renderLegalNoticeHtml(options);
  }
  renderPrivacyPolicyHtml(options) {
    return Consent.renderPrivacyPolicyHtml(options);
  }
};
_init = __decoratorStart(null);
ConsentService = __decorateElement(_init, 0, "ConsentService", _ConsentService_decorators, ConsentService);
__runInitializers(_init, 1, ConsentService);
var _elseTemplate_dec, _service_dec, _category_dec, _ConsentGateDirective_decorators, _init2;
_ConsentGateDirective_decorators = [(0, import_core.Directive)({
  selector: "[consentGate]",
  standalone: true
})], _category_dec = [(0, import_core.Input)("consentGate")], _service_dec = [(0, import_core.Input)("consentGateService")], _elseTemplate_dec = [(0, import_core.Input)("consentGateElse")];
var ConsentGateDirective = class {
  constructor(templateRef, viewContainer) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.category = __runInitializers(_init2, 8, this), __runInitializers(_init2, 11, this);
    this.service = __runInitializers(_init2, 12, this), __runInitializers(_init2, 15, this);
    this.elseTemplate = __runInitializers(_init2, 16, this), __runInitializers(_init2, 19, this);
    this.hasView = false;
    this.hasElseView = false;
    this.unsubs = [];
  }
  ngOnInit() {
    const update = () => this.updateView();
    update();
    this.unsubs = [
      Consent.on("consent:changed", update),
      Consent.on("consent:accepted", update),
      Consent.on("consent:rejected", update),
      Consent.on("consent:withdrawn", update),
      Consent.on("ready", update)
    ];
  }
  ngOnDestroy() {
    this.unsubs.forEach((u) => u());
  }
  updateView() {
    const isAllowed = this.category ? Consent.has(this.category) : this.service ? Consent.hasService(this.service) : true;
    if (isAllowed) {
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
        this.hasElseView = false;
      }
    } else {
      if (this.hasView || !this.hasElseView && this.elseTemplate) {
        this.viewContainer.clear();
        this.hasView = false;
        if (this.elseTemplate) {
          this.viewContainer.createEmbeddedView(this.elseTemplate);
          this.hasElseView = true;
        }
      }
    }
  }
};
_init2 = __decoratorStart(null);
__decorateElement(_init2, 5, "category", _category_dec, ConsentGateDirective);
__decorateElement(_init2, 5, "service", _service_dec, ConsentGateDirective);
__decorateElement(_init2, 5, "elseTemplate", _elseTemplate_dec, ConsentGateDirective);
ConsentGateDirective = __decorateElement(_init2, 0, "ConsentGateDirective", _ConsentGateDirective_decorators, ConsentGateDirective);
__runInitializers(_init2, 1, ConsentGateDirective);
var _options_dec, _view_dec, _CookiePolicyComponent_decorators, _init3;
_CookiePolicyComponent_decorators = [(0, import_core.Component)({
  selector: "solvenza-cookie-policy",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _view_dec = [(0, import_core.Input)()], _options_dec = [(0, import_core.Input)()];
var CookiePolicyComponent = class {
  constructor() {
    this.view = __runInitializers(_init3, 8, this, "full"), __runInitializers(_init3, 11, this);
    this.options = __runInitializers(_init3, 12, this), __runInitializers(_init3, 15, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderPolicyHtml(__spreadProps(__spreadValues({}, this.options), {
        view: this.view,
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init3 = __decoratorStart(null);
__decorateElement(_init3, 5, "view", _view_dec, CookiePolicyComponent);
__decorateElement(_init3, 5, "options", _options_dec, CookiePolicyComponent);
CookiePolicyComponent = __decorateElement(_init3, 0, "CookiePolicyComponent", _CookiePolicyComponent_decorators, CookiePolicyComponent);
__runInitializers(_init3, 1, CookiePolicyComponent);
var _options_dec2, _LegalNoticeComponent_decorators, _init4;
_LegalNoticeComponent_decorators = [(0, import_core.Component)({
  selector: "solvenza-legal-notice",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _options_dec2 = [(0, import_core.Input)()];
var LegalNoticeComponent = class {
  constructor() {
    this.options = __runInitializers(_init4, 8, this), __runInitializers(_init4, 11, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderLegalNoticeHtml(__spreadProps(__spreadValues({}, this.options), {
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init4 = __decoratorStart(null);
__decorateElement(_init4, 5, "options", _options_dec2, LegalNoticeComponent);
LegalNoticeComponent = __decorateElement(_init4, 0, "LegalNoticeComponent", _LegalNoticeComponent_decorators, LegalNoticeComponent);
__runInitializers(_init4, 1, LegalNoticeComponent);
var _options_dec3, _PrivacyPolicyComponent_decorators, _init5;
_PrivacyPolicyComponent_decorators = [(0, import_core.Component)({
  selector: "solvenza-privacy-policy",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _options_dec3 = [(0, import_core.Input)()];
var PrivacyPolicyComponent = class {
  constructor() {
    this.options = __runInitializers(_init5, 8, this), __runInitializers(_init5, 11, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderPrivacyPolicyHtml(__spreadProps(__spreadValues({}, this.options), {
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init5 = __decoratorStart(null);
__decorateElement(_init5, 5, "options", _options_dec3, PrivacyPolicyComponent);
PrivacyPolicyComponent = __decorateElement(_init5, 0, "PrivacyPolicyComponent", _PrivacyPolicyComponent_decorators, PrivacyPolicyComponent);
__runInitializers(_init5, 1, PrivacyPolicyComponent);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConsentGateDirective,
  ConsentService,
  CookiePolicyComponent,
  LegalNoticeComponent,
  PrivacyPolicyComponent
});
//# sourceMappingURL=angular.cjs.map