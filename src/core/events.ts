import type {
  ConsentEvent,
  ConsentEventDetailMap,
  ConsentEventHandler,
} from "./types.js";

export class EventBus {
  private handlers = new Map<ConsentEvent, Set<ConsentEventHandler<any>>>();

  on<E extends ConsentEvent>(
    event: E,
    handler: ConsentEventHandler<E>
  ): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    const set = this.handlers.get(event)!;
    set.add(handler);

    return () => {
      set.delete(handler);
    };
  }

  emit<E extends ConsentEvent>(event: E, detail: ConsentEventDetailMap[E]): void {
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

  clear(): void {
    this.handlers.clear();
  }
}
