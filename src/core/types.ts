export interface ConsentChoices {
  [categoryOrService: string]: boolean;
}

export interface ServiceConfig {
  category: string;
  label?: string;
  provider?: string;
  cookies?: Array<{
    name: string;
    domain?: string;
    duration?: string;
    purpose?: string;
  }>;
}

export interface CategoryConfig {
  required?: boolean;
  default?: boolean;
  label: string;
  description: string;
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

export interface ConsentConfig {
  schemaVersion: number;
  policyVersion: string;
  locale?: {
    default?: string;
    autoDetect?: boolean;
    supported?: string[];
  };
  translations?: Record<string, TranslationConfig>;
  security?: {
    secretKey?: string;
  };
  csp?: {
    nonce?: string;
  };
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
  source: "banner" | "preferences" | "withdraw" | "programmatic";
  choices: ConsentChoices;
  signature?: string;
}

export interface ConsentState {
  initialized: boolean;
  policyVersion: string;
  locale: string;
  receipt: ConsentReceipt | null;
  choices: ConsentChoices;
}

export type ConsentEvent =
  | "ready"
  | "banner:shown"
  | "preferences:opened"
  | "preferences:closed"
  | "floating-badge:shown"
  | "floating-badge:hidden"
  | "locale:changed"
  | "consent:changed"
  | "consent:accepted"
  | "consent:rejected"
  | "consent:withdrawn"
  | "service:blocked"
  | "service:loaded"
  | "service:revoked"
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
  has(category: string): boolean;
  hasService(service: string): boolean;
  acceptAll(): void;
  rejectAll(): void;
  setPreferences(choices: Record<string, boolean>): void;
  openPreferences(): void;
  closePreferences(): void;
  withdraw(): void;
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
