import type { ConsentChoices, ConsentConfig } from "../core/types.js";
import { injectStyles } from "./styles.js";
import { sanitizeHtml } from "../core/security.js";

export interface PreferencesHandlers {
  onSave: (choices: ConsentChoices) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onClose: () => void;
}

export class PreferencesModal {
  private backdrop: HTMLElement | null = null;
  private lastFocusedElement: HTMLElement | null = null;

  render(
    config: ConsentConfig,
    currentChoices: ConsentChoices,
    handlers: PreferencesHandlers,
  ): void {
    if (typeof document === "undefined") return;
    this.close();
    injectStyles(config.csp?.nonce);

    this.lastFocusedElement = document.activeElement as HTMLElement;

    const prefConfig = config.ui?.preferences || {};
    const modalTitle = sanitizeHtml(prefConfig.title || "Preferencias de privacidad");
    const saveText = sanitizeHtml(prefConfig.save || "Guardar selección");
    const acceptAllText = sanitizeHtml(prefConfig.acceptAll || "Permitir todas");
    const rejectAllText = sanitizeHtml(prefConfig.rejectAll || "Rechazar opcionales");

    const backdrop = document.createElement("div");
    backdrop.className = "consent-dialog-backdrop";

    const dialog = document.createElement("div");
    dialog.className = "consent-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "consent-dialog-title-id");

    // Header
    const header = document.createElement("div");
    header.className = "consent-dialog-header";
    header.innerHTML = `
      <div>
        <h2 class="consent-dialog-title" id="consent-dialog-title-id">${modalTitle}</h2>
        <p style="margin: 0.2rem 0 0 0; font-size: 0.84rem; color: var(--consent-muted); font-weight: 400;">
          Gestiona tus permisos de almacenamiento por finalidad (LSSI art. 22.2 &amp; RGPD).
        </p>
      </div>
      <button type="button" class="consent-dialog-close" aria-label="Cerrar ventana">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    `;

    // Body (Seamless List Rows)
    const body = document.createElement("div");
    body.className = "consent-dialog-body";

    const categoryChoices: ConsentChoices = { ...currentChoices };

    for (const [catId, catConfig] of Object.entries(config.categories)) {
      const catRow = document.createElement("div");
      catRow.className = "consent-category-row";

      const isRequired = catConfig.required === true;
      const isChecked = isRequired ? true : (categoryChoices[catId] ?? false);

      const associatedServices = config.services
        ? Object.entries(config.services).filter(([_, srv]) => srv.category === catId)
        : [];

      let servicesHtml = "";
      if (associatedServices.length > 0) {
        servicesHtml = `
          <div class="consent-category-services" id="cat-services-${catId}" style="display: none; margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px dashed var(--consent-divider); font-size: 0.82rem;">
            <div style="font-weight: 600; color: var(--consent-muted); margin-bottom: 0.4rem; font-size: 0.75rem; letter-spacing: 0.02em;">
              Servicios incluidos (${associatedServices.length})
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.3rem;">
              ${associatedServices
                .map(
                  ([srvId, srv]) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.2rem 0;">
                  <span style="font-weight: 500;">${sanitizeHtml(srv.label || srvId)}</span>
                  <span style="color: var(--consent-muted); font-size: 0.78rem;">${sanitizeHtml(srv.provider || "Terceros")}</span>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        `;
      }

      catRow.innerHTML = `
        <div class="consent-category-header">
          <div style="flex: 1; padding-right: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="consent-category-name">${sanitizeHtml(catConfig.label)}</span>
              ${
                isRequired
                  ? '<span class="consent-badge consent-badge-required">Requerida</span>'
                  : '<span class="consent-badge consent-badge-optional">Opcional</span>'
              }
            </div>
            <p class="consent-category-desc">${sanitizeHtml(catConfig.description)}</p>
            ${
              associatedServices.length > 0
                ? `<button type="button" class="consent-toggle-services-btn" data-target="cat-services-${catId}">
                    Ver servicios (${associatedServices.length}) ▾
                   </button>`
                : ""
            }
          </div>
          <label class="consent-toggle">
            <input type="checkbox" id="cat-toggle-${catId}" ${isChecked ? "checked" : ""} ${isRequired ? "disabled" : ""}>
            <span class="consent-toggle-slider"></span>
          </label>
        </div>
        ${servicesHtml}
      `;

      if (!isRequired) {
        const checkbox = catRow.querySelector<HTMLInputElement>(
          `#cat-toggle-${catId}`,
        );
        checkbox?.addEventListener("change", (e) => {
          categoryChoices[catId] = (e.target as HTMLInputElement).checked;
        });
      }

      const toggleServicesBtn = catRow.querySelector<HTMLButtonElement>(
        ".consent-toggle-services-btn",
      );
      if (toggleServicesBtn) {
        toggleServicesBtn.addEventListener("click", () => {
          const targetId = toggleServicesBtn.getAttribute("data-target");
          if (targetId) {
            const targetEl = catRow.querySelector<HTMLElement>(`#${targetId}`);
            if (targetEl) {
              const isHidden = targetEl.style.display === "none";
              targetEl.style.display = isHidden ? "block" : "none";
              toggleServicesBtn.textContent = isHidden
                ? `Ocultar servicios (${associatedServices.length}) ▴`
                : `Ver servicios (${associatedServices.length}) ▾`;
            }
          }
        });
      }

      body.appendChild(catRow);
    }

    // Footer
    const footer = document.createElement("div");
    footer.className = "consent-dialog-footer";
    footer.innerHTML = `
      <button type="button" class="consent-btn consent-btn-reject" id="consent-pref-reject">
        ${rejectAllText}
      </button>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="consent-btn consent-btn-configure" id="consent-pref-accept">
          ${acceptAllText}
        </button>
        <button type="button" class="consent-btn consent-btn-accept" id="consent-pref-save">
          ${saveText}
        </button>
      </div>
    `;

    dialog.appendChild(header);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    backdrop.appendChild(dialog);

    // Event listeners
    header
      .querySelector(".consent-dialog-close")
      ?.addEventListener("click", () => {
        handlers.onClose();
        this.close();
      });

    footer
      .querySelector("#consent-pref-reject")
      ?.addEventListener("click", () => {
        handlers.onRejectAll();
        this.close();
      });

    footer
      .querySelector("#consent-pref-accept")
      ?.addEventListener("click", () => {
        handlers.onAcceptAll();
        this.close();
      });

    footer
      .querySelector("#consent-pref-save")
      ?.addEventListener("click", () => {
        handlers.onSave(categoryChoices);
        this.close();
      });

    // Keyboard navigation (Escape & Focus Trap)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handlers.onClose();
        this.close();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    (this as any)._keyListener = handleKeyDown;

    document.body.appendChild(backdrop);
    this.backdrop = backdrop;

    // Focus first element
    const firstFocusable = dialog.querySelector<HTMLElement>("button");
    firstFocusable?.focus();
  }

  close(): void {
    if ((this as any)._keyListener) {
      document.removeEventListener("keydown", (this as any)._keyListener);
      delete (this as any)._keyListener;
    }

    if (this.backdrop && this.backdrop.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
    }

    if (
      this.lastFocusedElement &&
      typeof this.lastFocusedElement.focus === "function"
    ) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }
}
