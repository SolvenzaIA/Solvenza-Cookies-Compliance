export interface ConsentChoices {
  [categoryOrService: string]: boolean;
}

export interface ServiceConfig {
  preset?: string;
  category?: string;
  label?: string;
  provider?: string;
  policyUrl?: string;
  description?: string;
  cookies?: Array<{
    name: string;
    domain?: string;
    duration?: string;
    purpose?: string;
  }>;
  storageKeys?: string[];
  localStorage?: string[];
  sessionStorage?: string[];
}

export interface ServicePreset {
  id: string;
  category: string;
  label: string;
  provider: string;
  description?: string;
  policyUrl?: string;
  cookies?: Array<{
    name: string;
    domain?: string;
    duration?: string;
    purpose?: string;
  }>;
  storageKeys?: string[];
  localStorage?: string[];
  sessionStorage?: string[];
}

export interface CategoryConfig {
  required?: boolean;
  default?: boolean;
  label: string;
  description: string;
  storageKeys?: string[];
  localStorage?: string[];
  sessionStorage?: string[];
}

export interface StoragePurgeReport {
  category: string;
  purgedCookies: string[];
  purgedLocalStorage: string[];
  purgedSessionStorage: string[];
}

export interface FloatingBadgeConfig {
  enabled?: boolean;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  label?: string;
  ariaLabel?: string;
  tooltip?: string;
  showLabel?: boolean;
  icon?: "cookie" | "shield" | "settings";
  visibility?: "always" | "after-consent";
}

export interface BannerUIConfig {
  title?: string;
  description?: string;
  accept?: string;
  reject?: string;
  configure?: string;
  cookiesPolicy?: string;
  privacyPolicy?: string;
  ariaLabel?: string;
}

export interface PreferencesUIConfig {
  title?: string;
  subtitle?: string;
  save?: string;
  acceptAll?: string;
  rejectAll?: string;
  closeLabel?: string;
  requiredBadge?: string;
  optionalBadge?: string;
  servicesLabel?: string;
  viewServices?: string;
  hideServices?: string;
  thirdParty?: string;
}

export interface TranslationConfig {
  policy?: {
    privacyUrl?: string;
    cookiesUrl?: string;
  };
  ui?: {
    banner?: BannerUIConfig;
    preferences?: PreferencesUIConfig;
    floatingBadge?: {
      label?: string;
      ariaLabel?: string;
      tooltip?: string;
    };
  };
  categories?: Record<string, { label?: string; description?: string }>;
  services?: Record<string, { label?: string; provider?: string }>;
}

export interface LocaleConfig {
  default?: string;
  autoDetect?: boolean;
  syncHtmlLang?: boolean;
  syncUrl?: boolean;
  supported?: string[];
}

export interface GpcConfig {
  enabled?: boolean;
  respectSignal?: boolean;
  mode?: "auto-reject" | "notice-only";
  categories?: string[];
  noticeText?: string;
}

export interface ConsentConfig {
  schemaVersion: number;
  policyVersion: string;
  locale?: LocaleConfig;
  translations?: Record<string, TranslationConfig>;
  security?: {
    secretKey?: string;
  };
  csp?: {
    nonce?: string;
  };
  gpc?: GpcConfig;
  storage?: {
    name?: string;
    type?: "cookie" | "memory";
    sameSite?: "Strict" | "Lax" | "None";
    secure?: boolean;
    path?: string;
    domain?: string;
  };
  consent?: {
    maxAgeDays?: number;
  };
  policy?: {
    privacyUrl?: string;
    cookiesUrl?: string;
  };
  categories: Record<string, CategoryConfig>;
  services?: Record<string, ServiceConfig>;
  logging?: {
    enabled?: boolean;
    endpoint?: string;
  };
  ui?: {
    theme?: "auto" | "light" | "dark";
    position?: "bottom" | "top" | "modal";
    banner?: BannerUIConfig;
    preferences?: PreferencesUIConfig;
    floatingBadge?: boolean | FloatingBadgeConfig;
  };
}

export interface ConsentReceipt {
  schema?: number;
  receiptId: string;
  policyVersion: string;
  decidedAt: string;
  updatedAt: string;
  source: "banner" | "preferences" | "withdraw" | "programmatic" | "gpc";
  choices: ConsentChoices;
  signature?: string;
  gpc?: boolean;
}

export interface ConsentState {
  initialized: boolean;
  policyVersion: string;
  locale: string;
  receipt: ConsentReceipt | null;
  choices: ConsentChoices;
  gpc?: boolean;
}

export type ConsentEvent =
  | "ready"
  | "banner:shown"
  | "preferences:opened"
  | "preferences:closed"
  | "floating-badge:shown"
  | "floating-badge:hidden"
  | "locale:changed"
  | "gpc:detected"
  | "consent:changed"
  | "consent:accepted"
  | "consent:rejected"
  | "consent:withdrawn"
  | "service:blocked"
  | "service:loaded"
  | "service:revoked"
  | "storage:purged"
  | "diagnostic:warning"
  | "error";

export interface ConsentEventDetailMap {
  ready: { state: ConsentState };
  "banner:shown": void;
  "preferences:opened": void;
  "preferences:closed": void;
  "floating-badge:shown": void;
  "floating-badge:hidden": void;
  "locale:changed": { locale: string; previousLocale: string };
  "gpc:detected": { signal: boolean; autoApplied: boolean; choices: ConsentChoices };
  "consent:changed": { choices: ConsentChoices; receipt: ConsentReceipt };
  "consent:accepted": { choices: ConsentChoices; receipt: ConsentReceipt };
  "consent:rejected": { choices: ConsentChoices; receipt: ConsentReceipt };
  "consent:withdrawn": { previousChoices: ConsentChoices };
  "service:blocked": {
    serviceId: string;
    category: string;
    element?: HTMLElement;
  };
  "service:loaded": { serviceId: string; category: string };
  "service:revoked": { serviceId: string; category: string };
  "storage:purged": { category: string; report: StoragePurgeReport };
  "diagnostic:warning": { code: string; message: string; details?: unknown };
  error: { code: string; message: string; error?: unknown };
}

export type ConsentEventHandler<E extends ConsentEvent> = (
  detail: ConsentEventDetailMap[E],
) => void;

export interface DiagnosticReport {
  timestamp: string;
  unblockedThirdPartyScripts: string[];
  compliant: boolean;
}

export interface ConsentSDKInterface {
  init(config: ConsentConfig | string): Promise<void>;
  ready(): Promise<void>;
  getConsent(): ConsentState;
  getLocale(): string;
  setLocale(locale: string): void;
  syncLocale(locale: string): void;
  isGpcActive(): boolean;
  has(category: string): boolean;
  hasService(service: string): boolean;
  acceptAll(): void;
  rejectAll(): void;
  setPreferences(choices: Record<string, boolean>): void;
  openPreferences(): void;
  closePreferences(): void;
  withdraw(): void;
  purgeCategory(category: string): StoragePurgeReport;
  purgeStorage(categoryOrService?: string): StoragePurgeReport[];
  showFloatingBadge(): void;
  hideFloatingBadge(): void;
  when(categoryOrService: string, callback: () => void): () => void;
  on<E extends ConsentEvent>(
    event: E,
    handler: ConsentEventHandler<E>,
  ): () => void;
  getReceipt(): ConsentReceipt | null;
  rescan(): DiagnosticReport;
  mountPolicy(targetContainer: HTMLElement | string): void;
}
