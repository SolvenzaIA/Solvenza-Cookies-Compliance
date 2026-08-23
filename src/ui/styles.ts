export function injectStyles(nonce?: string): void {
  if (typeof document === "undefined") return;

  const existing = document.getElementById("consent-sdk-styles");
  if (existing) {
    existing.remove(); // Re-inject updated styles
  }

  const styleEl = document.createElement("style");
  styleEl.id = "consent-sdk-styles";
  if (nonce) {
    styleEl.setAttribute("nonce", nonce);
  }

  styleEl.textContent = `
    :root {
      --consent-bg: #ffffff;
      --consent-fg: #0f172a;
      --consent-muted: #64748b;
      --consent-divider: #f1f5f9;
      --consent-border: #e2e8f0;
      --consent-hover-bg: #f8fafc;
      --consent-primary: #0f172a;
      --consent-primary-hover: #1e293b;
      --consent-primary-fg: #ffffff;
      --consent-secondary: #f8fafc;
      --consent-secondary-hover: #f1f5f9;
      --consent-secondary-fg: #0f172a;
      --consent-accent: #2563eb;
      --consent-focus-ring: rgba(37, 99, 235, 0.3);
      --consent-font: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif;
      --consent-modal-shadow: 0 32px 64px -16px rgba(15, 23, 42, 0.2), 0 0 1px rgba(15, 23, 42, 0.12);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --consent-bg: #0f172a;
        --consent-fg: #f8fafc;
        --consent-muted: #94a3b8;
        --consent-divider: #1e293b;
        --consent-border: #334155;
        --consent-hover-bg: #1e293b;
        --consent-primary: #f8fafc;
        --consent-primary-hover: #ffffff;
        --consent-primary-fg: #0f172a;
        --consent-secondary: #1e293b;
        --consent-secondary-hover: #334155;
        --consent-secondary-fg: #f8fafc;
        --consent-modal-shadow: 0 32px 64px -16px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.12);
      }
    }

    @keyframes consentSlideUp {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.985);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes consentFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* 1st Layer Banner - Clean & Seamless */
    .consent-banner-wrapper {
      position: fixed;
      bottom: 1.25rem;
      left: 1.25rem;
      right: 1.25rem;
      max-width: 1060px;
      margin: 0 auto;
      z-index: 2147483645;
      background: var(--consent-bg);
      color: var(--consent-fg);
      border: 1px solid var(--consent-border);
      border-radius: 20px;
      box-shadow: var(--consent-modal-shadow);
      padding: 1.5rem 1.75rem;
      font-family: var(--consent-font);
      font-size: 0.92rem;
      line-height: 1.5;
      animation: consentSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      box-sizing: border-box;
    }

    .consent-banner-container {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    @media (min-width: 860px) {
      .consent-banner-container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    .consent-banner-text {
      flex: 1;
    }

    .consent-banner-title {
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      margin: 0 0 0.35rem 0;
      color: var(--consent-fg);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .consent-banner-title-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: rgba(37, 99, 235, 0.1);
      color: var(--consent-accent);
    }

    .consent-banner-desc {
      margin: 0;
      color: var(--consent-muted);
      font-size: 0.88rem;
      max-width: 720px;
    }

    .consent-banner-links {
      margin-top: 0.4rem;
    }

    .consent-banner-links a {
      color: var(--consent-muted);
      font-size: 0.83rem;
      text-decoration: underline;
      text-underline-offset: 3px;
      font-weight: 500;
      margin-right: 1.2rem;
      transition: color 0.15s ease;
    }

    .consent-banner-links a:hover {
      color: var(--consent-fg);
    }

    /* Equal Visual Prominence CTAs */
    .consent-banner-actions {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    @media (min-width: 640px) {
      .consent-banner-actions {
        flex-direction: row;
        width: auto;
        align-items: center;
      }
    }

    .consent-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem 1.2rem;
      font-size: 0.88rem;
      font-weight: 600;
      border-radius: 10px;
      border: 1px solid var(--consent-border);
      cursor: pointer;
      font-family: inherit;
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 42px;
      min-width: 110px;
      box-sizing: border-box;
      user-select: none;
    }

    .consent-btn:hover {
      transform: translateY(-1px);
    }

    .consent-btn:active {
      transform: translateY(0) scale(0.98);
    }

    .consent-btn:focus-visible {
      outline: 3px solid var(--consent-focus-ring);
      outline-offset: 2px;
    }

    .consent-btn-reject {
      background: var(--consent-secondary);
      color: var(--consent-secondary-fg);
      border-color: var(--consent-border);
    }

    .consent-btn-reject:hover {
      background: var(--consent-secondary-hover);
    }

    .consent-btn-configure {
      background: transparent;
      color: var(--consent-muted);
      border-color: transparent;
    }

    .consent-btn-configure:hover {
      color: var(--consent-fg);
      background: var(--consent-secondary);
    }

    .consent-btn-accept {
      background: var(--consent-primary);
      color: var(--consent-primary-fg);
      border-color: var(--consent-primary);
    }

    .consent-btn-accept:hover {
      background: var(--consent-primary-hover);
    }

    /* 2nd Layer Preference Modal - Ultra Clean Linear List Style */
    .consent-dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 2147483646;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.25rem;
      box-sizing: border-box;
      animation: consentFadeIn 0.2s ease forwards;
    }

    .consent-dialog {
      background: var(--consent-bg);
      color: var(--consent-fg);
      border: 1px solid var(--consent-border);
      border-radius: 20px;
      width: 100%;
      max-width: 600px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--consent-modal-shadow);
      font-family: var(--consent-font);
      overflow: hidden;
      animation: consentSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .consent-dialog-header {
      padding: 1.5rem 1.75rem 1.25rem 1.75rem;
      border-bottom: 1px solid var(--consent-divider);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .consent-dialog-title {
      font-size: 1.15rem;
      font-weight: 700;
      letter-spacing: -0.015em;
      margin: 0;
    }

    .consent-dialog-close {
      background: transparent;
      border: none;
      color: var(--consent-muted);
      cursor: pointer;
      padding: 0.35rem;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, color 0.15s ease;
      margin: -0.35rem -0.35rem 0 0;
    }

    .consent-dialog-close:hover {
      background: var(--consent-secondary);
      color: var(--consent-fg);
    }

    /* Seamless Category List Body (NO individual boxed divs) */
    .consent-dialog-body {
      padding: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .consent-category-row {
      padding: 1.25rem 1.75rem;
      border-bottom: 1px solid var(--consent-divider);
      transition: background 0.15s ease;
    }

    .consent-category-row:last-child {
      border-bottom: none;
    }

    .consent-category-row:hover {
      background: var(--consent-hover-bg);
    }

    .consent-category-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
    }

    .consent-category-name {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--consent-fg);
    }

    .consent-category-desc {
      margin: 0.3rem 0 0 0;
      font-size: 0.85rem;
      color: var(--consent-muted);
      line-height: 1.45;
    }

    /* Minimalist Badges */
    .consent-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    .consent-badge-required {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
    }

    .consent-badge-optional {
      background: rgba(100, 116, 139, 0.08);
      color: var(--consent-muted);
    }

    /* Inline Service Disclosure Button */
    .consent-toggle-services-btn {
      border: none;
      background: transparent;
      color: var(--consent-accent);
      font-size: 0.78rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0.35rem 0 0 0;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-family: inherit;
    }

    .consent-toggle-services-btn:hover {
      opacity: 0.85;
    }

    /* Minimalist Toggle Switch */
    .consent-toggle {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 22px;
      flex-shrink: 0;
      margin-top: 0.15rem;
    }

    .consent-toggle input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .consent-toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #cbd5e1;
      transition: background-color 0.2s ease;
      border-radius: 22px;
    }

    .consent-toggle-slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    }

    .consent-toggle input:checked + .consent-toggle-slider {
      background-color: var(--consent-accent);
    }

    .consent-toggle input:checked + .consent-toggle-slider:before {
      transform: translateX(18px);
    }

    .consent-toggle input:disabled + .consent-toggle-slider {
      opacity: 0.45;
      cursor: not-allowed;
    }

    /* Footer */
    .consent-dialog-footer {
      padding: 1.25rem 1.75rem;
      border-top: 1px solid var(--consent-divider);
      background: var(--consent-bg);
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      justify-content: space-between;
      align-items: center;
    }

    @media (min-width: 520px) {
      .consent-dialog-footer {
        flex-direction: row;
      }
    }
  `;
  document.head.appendChild(styleEl);
}
