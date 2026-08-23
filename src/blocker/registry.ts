import { ScriptGate } from "./script-gate.js";
import { IframeGate, type IframeGateOptions } from "./iframe-gate.js";
import { ResourceGate } from "./resource-gate.js";

export class BlockerRegistry {
  private observer: MutationObserver | null = null;

  init(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean,
    iframeOptions?: IframeGateOptions,
    onServiceLoaded?: (serviceId: string, category: string) => void,
  ): void {
    const runBlockers = () => {
      ScriptGate.scanAndActivate(
        isCategoryAllowed,
        isServiceAllowed,
        onServiceLoaded,
      );
      IframeGate.processIframes(
        isCategoryAllowed,
        isServiceAllowed,
        iframeOptions,
      );
      ResourceGate.processImages(isCategoryAllowed, isServiceAllowed);
    };

    // Initial pass
    runBlockers();

    // Set up MutationObserver Level B defense for dynamically injected scripts/iframes
    if (
      typeof MutationObserver !== "undefined" &&
      typeof document !== "undefined"
    ) {
      this.observer = new MutationObserver(() => {
        runBlockers();
      });

      this.observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true,
      });
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
