import type { IResourceBlocker } from "../core/contracts/blocker.interface.js";

export interface IframeGateOptions {
  onAllowClick?: (category: string, serviceId?: string) => void;
}

export class IframeResourceBlocker implements IResourceBlocker {
  type: "iframe" = "iframe";

  process(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean
  ): void {
    IframeGate.processIframes(isCategoryAllowed, isServiceAllowed);
  }
}

export class IframeGate {
  private static placeholders = new Map<HTMLIFrameElement, HTMLElement>();

  static processIframes(
    isCategoryAllowed: (category: string) => boolean,
    isServiceAllowed: (serviceId: string) => boolean,
    options: IframeGateOptions = {},
  ): void {
    if (typeof document === "undefined") return;

    const iframes = Array.from(
      document.querySelectorAll<HTMLIFrameElement>(
        "iframe[data-consent], iframe[data-service]",
      ),
    );

    for (const iframe of iframes) {
      const category = iframe.getAttribute("data-consent");
      const serviceId = iframe.getAttribute("data-service");

      let isAllowed = false;
      if (serviceId) {
        isAllowed = isServiceAllowed(serviceId);
      } else if (category) {
        isAllowed = isCategoryAllowed(category);
      }

      const originalSrc =
        iframe.getAttribute("data-src") || iframe.getAttribute("src");

      if (!originalSrc) continue;

      if (!iframe.getAttribute("data-src")) {
        iframe.setAttribute("data-src", originalSrc);
      }

      if (isAllowed) {
        this.unlockIframe(iframe, originalSrc);
      } else {
        this.lockIframe(
          iframe,
          category || "marketing",
          serviceId || undefined,
          options,
        );
      }
    }
  }

  private static lockIframe(
    iframe: HTMLIFrameElement,
    category: string,
    serviceId: string | undefined,
    options: IframeGateOptions,
  ): void {
    if (iframe.hasAttribute("src")) {
      iframe.removeAttribute("src");
    }

    if (this.placeholders.has(iframe)) return;

    const container = document.createElement("div");
    container.className = "consent-iframe-placeholder";
    container.style.cssText = `
      width: ${iframe.width ? (iframe.width.endsWith("%") || iframe.width.endsWith("px") ? iframe.width : iframe.width + "px") : "100%"};
      height: ${iframe.height ? (iframe.height.endsWith("%") || iframe.height.endsWith("px") ? iframe.height : iframe.height + "px") : "315px"};
      min-height: 200px;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1.5rem;
      border-radius: 8px;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    const titleText = serviceId
      ? `Contenido de ${serviceId} bloqueado`
      : "Contenido externo bloqueado";
    const bodyText =
      "Este contenido está bloqueado hasta que autorices esta finalidad de privacidad.";

    container.innerHTML = `
      <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 0.5rem; color: #f8fafc;">
        ${titleText}
      </div>
      <p style="font-size: 0.9rem; color: #94a3b8; margin: 0 0 1rem 0; max-width: 400px;">
        ${bodyText}
      </p>
      <button type="button" class="consent-placeholder-allow-btn" style="
        background: #2563eb;
        color: #ffffff;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        font-weight: 500;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background 0.2s ease;
      ">
        Permitir y mostrar contenido
      </button>
    `;

    const button = container.querySelector<HTMLButtonElement>(
      ".consent-placeholder-allow-btn",
    );
    button?.addEventListener("click", () => {
      options.onAllowClick?.(category, serviceId);
    });

    iframe.style.display = "none";
    iframe.parentNode?.insertBefore(container, iframe);
    this.placeholders.set(iframe, container);
  }

  private static unlockIframe(iframe: HTMLIFrameElement, src: string): void {
    if (iframe.getAttribute("src") !== src) {
      iframe.setAttribute("src", src);
    }
    iframe.style.display = "";

    const placeholder = this.placeholders.get(iframe);
    if (placeholder) {
      placeholder.parentNode?.removeChild(placeholder);
      this.placeholders.delete(iframe);
    }
  }
}
