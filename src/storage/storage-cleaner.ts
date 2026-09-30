import type { ConsentConfig, StoragePurgeReport } from "../core/types.js";
import { CookieStore } from "./cookie-store.js";

/**
 * Service responsible for purging cookies, localStorage, and sessionStorage
 * keys associated with revoked consent categories or services.
 */
export class StorageCleaner {
  /**
   * Evaluates if a given storage key or cookie name matches a pattern.
   * Supports:
   * - Wildcard glob: "*", "_ga*", "ph_*_posthog", "*session*"
   * - Exact string match (case-insensitive)
   */
  static matchesPattern(key: string, pattern: string): boolean {
    if (!key || !pattern) return false;
    if (pattern === "*" || key === pattern) return true;
    if (pattern.includes("*")) {
      const escaped = pattern
        .split("*")
        .map((segment) => segment.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&"))
        .join(".*");
      try {
        const regex = new RegExp(`^${escaped}$`, "i");
        return regex.test(key);
      } catch {
        return false;
      }
    }
    return key.toLowerCase() === pattern.toLowerCase();
  }

  /**
   * Purges keys from window.localStorage that match any of the provided patterns.
   * Safe in SSR, sandboxed iframes, and private browsing modes.
   */
  static purgeLocalStorage(patterns: string[]): string[] {
    if (typeof window === "undefined" || !patterns || patterns.length === 0) return [];
    try {
      if (typeof window.localStorage === "undefined") return [];
      const keysToRemove: string[] = [];
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
    } catch {
      return [];
    }
  }

  /**
   * Purges keys from window.sessionStorage that match any of the provided patterns.
   * Safe in SSR, sandboxed iframes, and private browsing modes.
   */
  static purgeSessionStorage(patterns: string[]): string[] {
    if (typeof window === "undefined" || !patterns || patterns.length === 0) return [];
    try {
      if (typeof window.sessionStorage === "undefined") return [];
      const keysToRemove: string[] = [];
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
    } catch {
      return [];
    }
  }

  /**
   * Purges cookies declared for services, supporting wildcard glob names (e.g. "_ga_*").
   */
  static purgeCookies(
    cookieDeclarations: Array<{ name: string; domain?: string }>,
    defaultPath = "/",
    defaultDomain?: string,
  ): string[] {
    if (typeof document === "undefined" || !cookieDeclarations || cookieDeclarations.length === 0) {
      return [];
    }

    const removedCookies: string[] = [];
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

  private static getAllCookieNames(): string[] {
    if (typeof document === "undefined") return [];
    try {
      return document.cookie
        .split(";")
        .map((c) => c.trim().split("=")[0])
        .filter((n) => !!n);
    } catch {
      return [];
    }
  }

  /**
   * Purges all cookies, localStorage, and sessionStorage keys associated with a category.
   */
  static purgeCategory(config: ConsentConfig, category: string): StoragePurgeReport {
    const report: StoragePurgeReport = {
      category,
      purgedCookies: [],
      purgedLocalStorage: [],
      purgedSessionStorage: [],
    };

    if (!config) return report;

    const path = config.storage?.path || "/";
    const defaultDomain = config.storage?.domain;

    const cookiesToPurge: Array<{ name: string; domain?: string }> = [];
    const localStoragePatterns: Set<string> = new Set();
    const sessionStoragePatterns: Set<string> = new Set();

    // 1. Collect from Category definition
    const catConfig = config.categories?.[category];
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

    // 2. Collect from Services belonging to this category
    if (config.services) {
      for (const service of Object.values(config.services)) {
        if (service.category === category) {
          if (service.cookies) {
            for (const cookieItem of service.cookies) {
              cookiesToPurge.push({
                name: cookieItem.name,
                domain: cookieItem.domain || defaultDomain,
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

    // 3. Execute purges
    report.purgedCookies = this.purgeCookies(cookiesToPurge, path, defaultDomain);
    report.purgedLocalStorage = this.purgeLocalStorage(Array.from(localStoragePatterns));
    report.purgedSessionStorage = this.purgeSessionStorage(Array.from(sessionStoragePatterns));

    return report;
  }
}
