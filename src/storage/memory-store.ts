import type { IStorageProvider } from "../core/contracts/storage.interface.js";

export class MemoryStorageProvider implements IStorageProvider {
  private static store = new Map<string, string>();

  get(key: string): string | null {
    return MemoryStorageProvider.store.get(key) ?? null;
  }

  set(key: string, value: string): void {
    MemoryStorageProvider.store.set(key, value);
  }

  remove(key: string): void {
    MemoryStorageProvider.store.delete(key);
  }

  clear(): void {
    MemoryStorageProvider.store.clear();
  }
}

export const MemoryStore = {
  get: (name: string) => new MemoryStorageProvider().get(name),
  set: (name: string, val: string) => new MemoryStorageProvider().set(name, val),
  remove: (name: string) => new MemoryStorageProvider().remove(name),
  clear: () => new MemoryStorageProvider().clear(),
};
