import type { IResourceBlocker } from "../core/contracts/blocker.interface.js";

export class ScriptResourceBlocker implements IResourceBlocker {
  type: "script" = "script";

  process(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean
  ): void {
    ScriptGate.scanAndActivate(isCategoryAllowed, isServiceAllowed);
  }
}

export class ScriptGate {
  private static executedScripts = new Set<Element>();

  static scanAndActivate(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean,
    onServiceLoaded?: (serviceId: string, category: string) => void,
  ): void {
    if (typeof document === "undefined") return;

    const blockedScripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        'script[type="text/plain"][data-consent], script[type="text/plain"][data-service]',
      ),
    );

    for (const oldScript of blockedScripts) {
      if (this.executedScripts.has(oldScript)) continue;

      const category = oldScript.getAttribute("data-consent");
      const serviceId = oldScript.getAttribute("data-service");

      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }

      if (!isAllowed) continue;

      this.executedScripts.add(oldScript);
      const newScript = document.createElement("script");

      for (let i = 0; i < oldScript.attributes.length; i++) {
        const attr = oldScript.attributes[i];
        if (attr.name === "type") continue;
        if (attr.name === "data-src") {
          newScript.src = attr.value;
          continue;
        }
        newScript.setAttribute(attr.name, attr.value);
      }

      newScript.type = "text/javascript";
      if (!newScript.src && oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }

      oldScript.parentNode?.replaceChild(newScript, oldScript);

      if (serviceId || category) {
        onServiceLoaded?.(serviceId || category!, category || "custom");
      }
    }
  }
}
