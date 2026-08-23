import type { CookieOptions, IStorageProvider } from "../core/contracts/storage.interface.js";

export type { CookieOptions };

export class CookieStorageProvider implements IStorageProvider {
  get(key: string): string | null {
    return CookieStore.get(key);
  }

  set(key: string, value: string, options?: CookieOptions): void {
    CookieStore.set(key, value, options);
  }

  remove(key: string, path = "/"): void {
    CookieStore.remove(key, path);
  }
}

export class CookieStore {
  static get(name: string): string | null {
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

  static set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof document === "undefined") return;

    const path = options.path || "/";
    const maxAgeDays = options.maxAgeDays ?? 365;
    const maxAgeSeconds = Math.floor(maxAgeDays * 86400);
    const sameSite = options.sameSite || "Lax";

    const isHttps =
      typeof window !== "undefined" && window.location.protocol === "https:";
    const secure = options.secure ?? isHttps;

    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}; Max-Age=${maxAgeSeconds}; SameSite=${sameSite}`;

    if (secure) {
      cookieStr += "; Secure";
    }

    document.cookie = cookieStr;
  }

  static remove(name: string, path = "/"): void {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Max-Age=0; SameSite=Lax`;
  }
}
