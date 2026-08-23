import type { ConsentConfig } from "../core/types.js";
import { sanitizeHtml } from "../core/security.js";

export class PolicyGenerator {
  static renderTable(config: ConsentConfig): string {
    let html = `
      <div class="consent-policy-table-wrapper" style="margin: 1.5rem 0; font-family: system-ui, sans-serif;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; border: 1px solid #e2e8f0;">
          <thead>
            <tr style="background: #f8fafc; border-bottom: 2px solid #cbd5e1;">
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Categoría / Servicio</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Proveedor</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Finalidad</th>
              <th style="padding: 0.75rem; border: 1px solid #e2e8f0;">Requerida</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const [catId, cat] of Object.entries(config.categories)) {
      const isReq = cat.required ? "Sí (Técnica)" : "No (Opcional)";
      html += `
        <tr style="background: #ffffff; font-weight: 600;">
          <td style="padding: 0.75rem; border: 1px solid #e2e8f0;" colspan="3">${sanitizeHtml(cat.label)}</td>
          <td style="padding: 0.75rem; border: 1px solid #e2e8f0;">${isReq}</td>
        </tr>
      `;

      if (config.services) {
        for (const [srvId, srv] of Object.entries(config.services)) {
          if (srv.category === catId) {
            html += `
              <tr style="background: #f8fafc; font-size: 0.9rem;">
                <td style="padding: 0.5rem 0.75rem 0.5rem 1.5rem; border: 1px solid #e2e8f0;">↳ ${sanitizeHtml(srv.label || srvId)}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${sanitizeHtml(srv.provider || "-")}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${sanitizeHtml(cat.description || "-")}</td>
                <td style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0;">${isReq}</td>
              </tr>
            `;
          }
        }
      }
    }

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  }
}
