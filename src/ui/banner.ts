import type { ConsentConfig } from "../core/types.js";
import { injectStyles } from "./styles.js";
import { sanitizeHtml, sanitizeUrl } from "../core/security.js";

export interface BannerHandlers {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onConfigure: () => void;
}

export class ConsentBanner {
  private element: HTMLElement | null = null;

  render(config: ConsentConfig, handlers: BannerHandlers): void {
    if (typeof document === "undefined") return;
    this.remove();
    injectStyles(config.csp?.nonce);

    const bannerConfig = config.ui?.banner || {};
    const titleText = sanitizeHtml(bannerConfig.title || "Tu privacidad, bajo tu control");
    const descText = sanitizeHtml(
      bannerConfig.description ||
      "Usamos tecnologías necesarias para el funcionamiento del sitio. Con tu permiso, también podemos utilizar analítica y marketing."
    );
    const acceptText = sanitizeHtml(bannerConfig.accept || "Aceptar todas");
    const rejectText = sanitizeHtml(bannerConfig.reject || "Rechazar todas");
    const configureText = sanitizeHtml(bannerConfig.configure || "Configurar");

    const privacyUrl = sanitizeUrl(config.policy?.privacyUrl || "/politica-privacidad");
    const cookiesUrl = sanitizeUrl(config.policy?.cookiesUrl || "/politica-cookies");

    const wrapper = document.createElement("div");
    wrapper.className = "consent-banner-wrapper";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute(
      "aria-label",
      "Gestión de consentimiento de privacidad",
    );

    wrapper.innerHTML = `
      <div class="consent-banner-container">
        <div class="consent-banner-text">
          <h2 class="consent-banner-title">
            <span class="consent-banner-title-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            ${titleText}
          </h2>
          <p class="consent-banner-desc">${descText}</p>
          <div class="consent-banner-links">
            <a href="${cookiesUrl}" target="_blank" rel="noopener">Política de cookies</a>
            <a href="${privacyUrl}" target="_blank" rel="noopener">Política de privacidad</a>
          </div>
        </div>
        <div class="consent-banner-actions">
          <button type="button" class="consent-btn consent-btn-reject" id="consent-btn-reject">
            ${rejectText}
          </button>
          <button type="button" class="consent-btn consent-btn-configure" id="consent-btn-configure">
            ${configureText}
          </button>
          <button type="button" class="consent-btn consent-btn-accept" id="consent-btn-accept">
            ${acceptText}
          </button>
        </div>
      </div>
    `;

    wrapper
      .querySelector("#consent-btn-reject")
      ?.addEventListener("click", () => {
        handlers.onRejectAll();
        this.remove();
      });

    wrapper
      .querySelector("#consent-btn-configure")
      ?.addEventListener("click", () => {
        handlers.onConfigure();
      });

    wrapper
      .querySelector("#consent-btn-accept")
      ?.addEventListener("click", () => {
        handlers.onAcceptAll();
        this.remove();
      });

    document.body.appendChild(wrapper);
    this.element = wrapper;
  }

  remove(): void {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
      this.element = null;
    }
  }
}
