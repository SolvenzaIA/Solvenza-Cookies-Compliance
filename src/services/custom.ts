import type { EventBus } from "../core/events.js";

export class CustomServiceAdapter {
  static createWhen(
    eventBus: EventBus,
    isCategoryAllowed: (cat: string) => boolean,
    isServiceAllowed: (srv: string) => boolean
  ) {
    return function when(
      categoryOrService: string,
      callback: () => void
    ): () => void {
      // Execute immediately if already granted
      if (isCategoryAllowed(categoryOrService) || isServiceAllowed(categoryOrService)) {
        try {
          callback();
        } catch (err) {
          console.error(`[ConsentSDK when()] Callback execution failed:`, err);
        }
      }

      // Listen for future consent changes
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
}
