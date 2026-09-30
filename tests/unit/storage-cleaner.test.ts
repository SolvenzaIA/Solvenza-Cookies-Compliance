import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { StorageCleaner } from "../../src/storage/storage-cleaner.js";
import { ConsentEngine } from "../../src/core/consent-engine.js";
import type { ConsentConfig } from "../../src/core/types.js";

// Minimal mock Storage implementation
class MockStorage implements Storage {
  private store: Record<string, string> = {};

  get length(): number {
    return Object.keys(this.store).length;
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return key in this.store ? this.store[key] : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.store);
    return keys[index] || null;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }
}

describe("StorageCleaner (Web Storage & Cookie Purging)", () => {
  const originalWindow = (globalThis as any).window;
  const originalDocument = (globalThis as any).document;

  let mockLocalStorage: MockStorage;
  let mockSessionStorage: MockStorage;
  let currentCookies: string;

  beforeEach(() => {
    mockLocalStorage = new MockStorage();
    mockSessionStorage = new MockStorage();
    currentCookies = "";

    (globalThis as any).window = {
      localStorage: mockLocalStorage,
      sessionStorage: mockSessionStorage,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    (globalThis as any).document = {
      get cookie() {
        return currentCookies;
      },
      set cookie(val: string) {
        const parts = val.split(";")[0].trim();
        const [name, value] = parts.split("=");
        if (val.includes("Max-Age=0")) {
          const regex = new RegExp(`(?:^|; )${name}=[^;]*`);
          currentCookies = currentCookies.replace(regex, "").replace(/^; /, "");
        } else {
          currentCookies = currentCookies ? `${currentCookies}; ${name}=${value}` : `${name}=${value}`;
        }
      },
      querySelectorAll: () => [],
      querySelector: () => null,
      getElementById: () => null,
      createElement: () => ({
        setAttribute: vi.fn(),
        classList: { add: vi.fn(), remove: vi.fn(), contains: vi.fn() },
        appendChild: vi.fn(),
        removeChild: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        querySelector: vi.fn(() => ({ addEventListener: vi.fn() })),
        querySelectorAll: vi.fn(() => []),
      }),
      head: { appendChild: vi.fn() },
      body: { appendChild: vi.fn(), removeChild: vi.fn(), children: [] },
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
  });

  afterEach(() => {
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  });

  describe("Pattern Matching", () => {
    it("should match exact keys", () => {
      expect(StorageCleaner.matchesPattern("user_id", "user_id")).toBe(true);
      expect(StorageCleaner.matchesPattern("USER_ID", "user_id")).toBe(true);
      expect(StorageCleaner.matchesPattern("other_key", "user_id")).toBe(false);
    });

    it("should match prefix wildcards", () => {
      expect(StorageCleaner.matchesPattern("_ga", "_ga*")).toBe(true);
      expect(StorageCleaner.matchesPattern("_ga_G123456", "_ga*")).toBe(true);
      expect(StorageCleaner.matchesPattern("_gid", "_ga*")).toBe(false);
    });

    it("should match suffix and infix wildcards", () => {
      expect(StorageCleaner.matchesPattern("ph_abc123_posthog", "ph_*_posthog")).toBe(true);
      expect(StorageCleaner.matchesPattern("ph_prod_posthog", "ph_*_posthog")).toBe(true);
      expect(StorageCleaner.matchesPattern("ph_abc_other", "ph_*_posthog")).toBe(false);
      expect(StorageCleaner.matchesPattern("my_session_token", "*session*")).toBe(true);
    });
  });

  describe("LocalStorage & SessionStorage Purge", () => {
    it("should purge exact and wildcard keys from localStorage", () => {
      mockLocalStorage.setItem("_ga", "GA1.1.123");
      mockLocalStorage.setItem("_ga_MEASUREMENT", "GS1.1.456");
      mockLocalStorage.setItem("ph_token_posthog", "token123");
      mockLocalStorage.setItem("app_theme", "dark");

      const removed = StorageCleaner.purgeLocalStorage(["_ga*", "ph_*_posthog"]);

      expect(removed).toContain("_ga");
      expect(removed).toContain("_ga_MEASUREMENT");
      expect(removed).toContain("ph_token_posthog");
      expect(removed).not.toContain("app_theme");

      expect(mockLocalStorage.getItem("_ga")).toBeNull();
      expect(mockLocalStorage.getItem("_ga_MEASUREMENT")).toBeNull();
      expect(mockLocalStorage.getItem("ph_token_posthog")).toBeNull();
      expect(mockLocalStorage.getItem("app_theme")).toBe("dark");
    });

    it("should purge keys from sessionStorage", () => {
      mockSessionStorage.setItem("analytics_session", "session_99");
      mockSessionStorage.setItem("essential_auth", "auth_abc");

      const removed = StorageCleaner.purgeSessionStorage(["analytics*"]);

      expect(removed).toEqual(["analytics_session"]);
      expect(mockSessionStorage.getItem("analytics_session")).toBeNull();
      expect(mockSessionStorage.getItem("essential_auth")).toBe("auth_abc");
    });
  });

  describe("Cookie Purge with Wildcards", () => {
    it("should purge matching cookies from document.cookie", () => {
      (globalThis as any).document.cookie = "_ga=GA1.1.111";
      (globalThis as any).document.cookie = "_ga_ABCDEF=GS1.1.222";
      (globalThis as any).document.cookie = "_gid=GA1.1.333";
      (globalThis as any).document.cookie = "site_consent=ok";

      const removed = StorageCleaner.purgeCookies([
        { name: "_ga" },
        { name: "_ga_*" },
      ]);

      expect(removed).toContain("_ga");
      expect(removed).toContain("_ga_ABCDEF");
      expect(removed).not.toContain("site_consent");
    });
  });

  describe("Category-level and Service-level Purge", () => {
    const testConfig: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-09-30",
      categories: {
        necessary: {
          required: true,
          label: "Necesarias",
          description: "Técnicas",
        },
        analytics: {
          label: "Analítica",
          description: "Métricas",
          storageKeys: ["_ga*", "_gid*"],
          sessionStorage: ["temp_analytics_*"],
        },
      },
      services: {
        posthog: {
          category: "analytics",
          label: "PostHog",
          storageKeys: ["ph_*_posthog"],
          cookies: [{ name: "ph_sess_*" }],
        },
      },
    };

    it("should purge all declared storage keys across category and service definitions", () => {
      mockLocalStorage.setItem("_ga", "1");
      mockLocalStorage.setItem("_ga_123", "2");
      mockLocalStorage.setItem("ph_client_posthog", "3");
      mockLocalStorage.setItem("unrelated_key", "keep");

      mockSessionStorage.setItem("temp_analytics_session", "4");
      mockSessionStorage.setItem("user_state", "keep");

      (globalThis as any).document.cookie = "ph_sess_abc=active";

      const report = StorageCleaner.purgeCategory(testConfig, "analytics");

      expect(report.category).toBe("analytics");
      expect(report.purgedLocalStorage).toContain("_ga");
      expect(report.purgedLocalStorage).toContain("_ga_123");
      expect(report.purgedLocalStorage).toContain("ph_client_posthog");
      expect(report.purgedLocalStorage).not.toContain("unrelated_key");

      expect(report.purgedSessionStorage).toContain("temp_analytics_session");
      expect(report.purgedSessionStorage).not.toContain("user_state");

      expect(report.purgedCookies).toContain("ph_sess_abc");

      // Verify actual storage contents
      expect(mockLocalStorage.getItem("_ga")).toBeNull();
      expect(mockLocalStorage.getItem("unrelated_key")).toBe("keep");
      expect(mockSessionStorage.getItem("user_state")).toBe("keep");
    });
  });

  describe("ConsentEngine Lifecycle Integration", () => {
    const testConfig: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-09-30",
      storage: { type: "memory" },
      categories: {
        necessary: {
          required: true,
          label: "Necesarias",
          description: "Técnicas",
        },
        marketing: {
          label: "Marketing",
          description: "Anuncios",
          storageKeys: ["fbp_*", "_fbc*"],
        },
      },
    };

    it("should automatically purge storage when category is revoked on saveChoices and emit storage:purged", async () => {
      const engine = new ConsentEngine();
      await engine.init(testConfig);

      mockLocalStorage.setItem("fbp_user", "fbp_12345");

      let purgedEventFired = false;
      let reportedCategory = "";
      engine.on("storage:purged", ({ category, report }) => {
        purgedEventFired = true;
        reportedCategory = category;
        expect(report.purgedLocalStorage).toContain("fbp_user");
      });

      // User sets preferences without marketing
      engine.setPreferences({ marketing: false });

      expect(purgedEventFired).toBe(true);
      expect(reportedCategory).toBe("marketing");
      expect(mockLocalStorage.getItem("fbp_user")).toBeNull();
    });

    it("should purge all optional storage when withdraw() is called", async () => {
      const engine = new ConsentEngine();
      await engine.init(testConfig);

      mockLocalStorage.setItem("fbp_user", "fbp_54321");

      engine.withdraw();

      expect(mockLocalStorage.getItem("fbp_user")).toBeNull();
    });
  });
});
