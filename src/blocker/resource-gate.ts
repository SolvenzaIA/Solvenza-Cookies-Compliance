import type { IResourceBlocker } from "../core/contracts/blocker.interface.js";

export class ImageResourceBlocker implements IResourceBlocker {
  type: "image" = "image";

  process(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean
  ): void {
    ResourceGate.processImages(isCategoryAllowed, isServiceAllowed);
  }
}

export class ResourceGate {
  static processImages(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean,
  ): void {
    if (typeof document === "undefined") return;

    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        "img[data-consent], img[data-service]",
      ),
    );

    for (const img of images) {
      const category = img.getAttribute("data-consent");
      const serviceId = img.getAttribute("data-service");

      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }

      const originalSrc =
        img.getAttribute("data-src") || img.getAttribute("src");

      if (!originalSrc) continue;

      if (!img.getAttribute("data-src")) {
        img.setAttribute("data-src", originalSrc);
      }

      if (isAllowed) {
        if (img.getAttribute("src") !== originalSrc) {
          img.setAttribute("src", originalSrc);
        }
      } else {
        if (img.hasAttribute("src")) {
          img.removeAttribute("src");
        }
      }
    }
  }
}
