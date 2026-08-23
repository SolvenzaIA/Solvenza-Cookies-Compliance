export type StorageType = "cookie" | "memory";

export interface CookieOptions {
  path?: string;
  maxAgeDays?: number;
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
}

export interface IStorageProvider {
  get(key: string): string | null;
  set(key: string, value: string, options?: CookieOptions): void;
  remove(key: string, path?: string): void;
  clear?(): void;
}
