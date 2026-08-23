import type { IStorageProvider, StorageType } from "../core/contracts/storage.interface.js";
import { CookieStorageProvider } from "./cookie-store.js";
import { MemoryStorageProvider } from "./memory-store.js";

export class StorageFactory {
  static create(type: StorageType): IStorageProvider {
    switch (type) {
      case "cookie":
        return new CookieStorageProvider();
      case "memory":
        return new MemoryStorageProvider();
      default:
        return new CookieStorageProvider();
    }
  }
}
