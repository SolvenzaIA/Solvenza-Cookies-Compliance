import type { ConsentConfig, FloatingBadgeConfig } from "../core/types.js";
import { injectStyles } from "./styles.js";
import { sanitizeHtml } from "../core/security.js";

export interface FloatingBadgeHandlers {
  onClick: () => void;
}

export class FloatingBadge {
  private element: HTMLElement | null = null;
  private isVisible: boolean = false;

  private getIconSvg(icon: FloatingBadgeConfig["icon"]): string {
    switch (icon) {
      case "shield":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>`;
      case "settings":
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>`;
      case "cookie":
      default:
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
          <path d="M8.5 8.5v.01"/>
          <path d="M16 15.5v.01"/>
          <path d="M12 12v.01"/>
          <path d="M11 17v.01"/>
          <path d="M7 13v.01"/>
        </svg>`;
    }
  }

  render(config: ConsentConfig, handlers: FloatingBadgeHandlers): void {
    if (typeof document === "undefined") return;
    this.remove();
    injectStyles(config.csp?.nonce);

    const badgeConfig: FloatingBadgeConfig =
      typeof config.ui?.floatingBadge === "object" && config.ui?.floatingBadge !== null
        ? config.ui.floatingBadge
        : {};

    const position = badgeConfig.position || "bottom-left";
    const labelText = badgeConfig.label ? sanitizeHtml(badgeConfig.label) : "";
    const ariaLabel = badgeConfig.ariaLabel
      ? sanitizeHtml(badgeConfig.ariaLabel)
      : (labelText || "Configuración y revocación de cookies");
    const tooltipText = badgeConfig.tooltip
      ? sanitizeHtml(badgeConfig.tooltip)
      : (labelText || "Configurar o declinar cookies");
    const showLabel = badgeConfig.showLabel === true && !!labelText;
    const iconSvg = this.getIconSvg(badgeConfig.icon);

    const container = document.createElement("div");
    container.className = `consent-floating-badge consent-floating-badge--${position}`;
    container.setAttribute("role", "complementary");
    container.setAttribute("aria-label", ariaLabel);

    container.innerHTML = `
      <div class="consent-floating-badge-inner">
        <button
          type="button"
          class="consent-floating-badge-btn ${showLabel ? 'has-label' : ''}"
          id="consent-floating-trigger"
          data-consent-open
          aria-label="${ariaLabel}"
        >
          <span class="consent-floating-badge-icon" aria-hidden="true">
            ${iconSvg}
          </span>
          ${showLabel ? `<span class="consent-floating-badge-text">${labelText}</span>` : ""}
        </button>
        <div class="consent-floating-badge-tooltip" role="tooltip" aria-hidden="true">
          ${tooltipText}
        </div>
      </div>
    `;

    const button = container.querySelector<HTMLButtonElement>("#consent-floating-trigger");
    button?.addEventListener("click", (e) => {
      e.preventDefault();
      handlers.onClick();
    });

    document.body.appendChild(container);
    this.element = container;
  }

  show(): void {
    if (this.element) {
      this.element.classList.add("is-visible");
      this.isVisible = true;
    }
  }

  hide(): void {
    if (this.element) {
      this.element.classList.remove("is-visible");
      this.isVisible = false;
    }
  }

  getIsVisible(): boolean {
    return this.isVisible;
  }

  hasElement(): boolean {
    return this.element !== null;
  }

  remove(): void {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
      this.isVisible = false;
    }
  }
}
