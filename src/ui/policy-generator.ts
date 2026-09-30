import type { ConsentConfig, LegalPolicyOptions } from "../core/types.js";
import { sanitizeHtml } from "../core/security.js";

interface CookieDetailRow {
  name: string;
  type: "Cookie" | "localStorage" | "sessionStorage";
  provider: string;
  purpose: string;
  duration: string;
  categoryLabel: string;
  policyUrl?: string;
}

export class PolicyGenerator {
  /**
   * Extract all cookie and storage key details across categories and services (including presets).
   */
  static extractCookieRows(config: ConsentConfig): CookieDetailRow[] {
    const rows: CookieDetailRow[] = [];

    // 1. Process services
    if (config.services) {
      for (const [srvId, srv] of Object.entries(config.services)) {
        const cat = config.categories[srv.category || "necessary"] || { label: srv.category || "General" };
        const providerName = srv.provider || srv.label || srvId;

        if (srv.cookies && srv.cookies.length > 0) {
          for (const c of srv.cookies) {
            rows.push({
              name: c.name,
              type: "Cookie",
              provider: providerName,
              purpose: c.purpose || srv.description || cat.description || "Funcionalidad del servicio",
              duration: c.duration || "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl,
            });
          }
        }

        if (srv.storageKeys && srv.storageKeys.length > 0) {
          for (const k of srv.storageKeys) {
            rows.push({
              name: k,
              type: "localStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento de estado y preferencias",
              duration: "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl,
            });
          }
        }

        if (srv.localStorage && srv.localStorage.length > 0) {
          for (const k of srv.localStorage) {
            rows.push({
              name: k,
              type: "localStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento web local",
              duration: "Persistente",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl,
            });
          }
        }

        if (srv.sessionStorage && srv.sessionStorage.length > 0) {
          for (const k of srv.sessionStorage) {
            rows.push({
              name: k,
              type: "sessionStorage",
              provider: providerName,
              purpose: srv.description || cat.description || "Almacenamiento temporal de sesión",
              duration: "Sesión",
              categoryLabel: cat.label,
              policyUrl: srv.policyUrl,
            });
          }
        }

        // If no explicit cookies/keys declared, add service row summary
        if (!srv.cookies?.length && !srv.storageKeys?.length && !srv.localStorage?.length && !srv.sessionStorage?.length) {
          rows.push({
            name: srvId,
            type: "Cookie",
            provider: providerName,
            purpose: srv.description || cat.description || "Servicio integrado",
            duration: "Variable",
            categoryLabel: cat.label,
            policyUrl: srv.policyUrl,
          });
        }
      }
    }

    // 2. Process category level storage keys
    if (config.categories) {
      for (const [, cat] of Object.entries(config.categories)) {
        if (cat.storageKeys) {
          for (const k of cat.storageKeys) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "localStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Persistente",
                categoryLabel: cat.label,
              });
            }
          }
        }
        if (cat.localStorage) {
          for (const k of cat.localStorage) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "localStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Persistente",
                categoryLabel: cat.label,
              });
            }
          }
        }
        if (cat.sessionStorage) {
          for (const k of cat.sessionStorage) {
            if (!rows.some((r) => r.name === k)) {
              rows.push({
                name: k,
                type: "sessionStorage",
                provider: "Propia / Sitio Web",
                purpose: cat.description,
                duration: "Sesión",
                categoryLabel: cat.label,
              });
            }
          }
        }
      }
    }

    // 3. Include default consent SDK storage cookie
    const consentCookieName = config.storage?.name || "site_consent";
    if (!rows.some((r) => r.name === consentCookieName)) {
      rows.unshift({
        name: consentCookieName,
        type: config.storage?.type === "memory" ? "localStorage" : "Cookie",
        provider: "Propia (Solvenza Cookies Compliance)",
        purpose: "Guarda las preferencias y recibo firmado de consentimiento del usuario.",
        duration: `${config.consent?.maxAgeDays ?? 365} días`,
        categoryLabel: config.categories?.necessary?.label || "Necesarias",
      });
    }

    return rows;
  }

  /**
   * Render stylized table of cookies and storage keys.
   */
  static renderTable(config: ConsentConfig, options: LegalPolicyOptions = {}): string {
    const isDark = options.theme === "dark";
    const bgHeader = isDark ? "#1e293b" : "#f8fafc";
    const borderCol = isDark ? "#334155" : "#e2e8f0";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#64748b";
    const rowAltBg = isDark ? "#0f172a" : "#ffffff";
    const rowBg = isDark ? "#1e293b" : "#f8fafc";

    let html = `
      <div class="solvenza-policy-table-wrapper" style="overflow-x: auto; margin: 1.5rem 0; border: 1px solid ${borderCol}; border-radius: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); font-family: system-ui, -apple-system, sans-serif;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem; color: ${textCol};">
          <thead>
            <tr style="background: ${bgHeader}; border-bottom: 2px solid ${borderCol};">
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Nombre / Clave</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Tipo</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Categoría</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Proveedor</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Finalidad</th>
              <th style="padding: 0.85rem 1rem; font-weight: 700;">Duración</th>
            </tr>
          </thead>
          <tbody>
    `;

    const rows = this.extractCookieRows(config);

    if (rows.length === 0) {
      html += `
        <tr>
          <td colspan="6" style="padding: 1.5rem; text-align: center; color: ${mutedCol};">
            No se han registrado cookies ni elementos de almacenamiento en la configuración.
          </td>
        </tr>
      `;
    } else {
      rows.forEach((r, idx) => {
        const bg = idx % 2 === 0 ? rowAltBg : rowBg;
        const providerHtml = r.policyUrl
          ? `<a href="${sanitizeHtml(r.policyUrl)}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${sanitizeHtml(r.provider)} ↗</a>`
          : sanitizeHtml(r.provider);

        html += `
          <tr style="background: ${bg}; border-bottom: 1px solid ${borderCol};">
            <td style="padding: 0.75rem 1rem; font-family: monospace; font-weight: 600; color: #2563eb;">${sanitizeHtml(r.name)}</td>
            <td style="padding: 0.75rem 1rem;">
              <span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; background: ${r.type === "Cookie" ? "#e0e7ff" : "#fef3c7"}; color: ${r.type === "Cookie" ? "#3730a3" : "#92400e"};">
                ${r.type}
              </span>
            </td>
            <td style="padding: 0.75rem 1rem; font-weight: 500;">${sanitizeHtml(r.categoryLabel)}</td>
            <td style="padding: 0.75rem 1rem;">${providerHtml}</td>
            <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(r.purpose)}</td>
            <td style="padding: 0.75rem 1rem; white-space: nowrap;">${sanitizeHtml(r.duration)}</td>
          </tr>
        `;
      });
    }

    html += `
          </tbody>
        </table>
      </div>
    `;

    return html;
  }

  /**
   * Render complete legal Cookie Policy document adapted to LSSI art. 22.2 and AEPD 2024.
   */
  static renderCookiePolicy(config: ConsentConfig, options: LegalPolicyOptions = {}): string {
    if (options.view === "table-only") {
      return this.renderTable(config, options);
    }

    const companyName = config.legalEntity?.tradeName || config.legalEntity?.name || "el Titular del Sitio Web";
    const lastUpdated = config.legalNotice?.lastUpdated || config.policyVersion || new Date().toISOString().split("T")[0];
    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const cardBg = isDark ? "#1e293b" : "#ffffff";
    const borderCol = isDark ? "#334155" : "#e2e8f0";

    const tableHtml = this.renderTable(config, options);

    let html = `
      <article class="solvenza-cookie-policy-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Política de Cookies</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            Conforme al artículo 22.2 de la Ley 34/2002 (LSSI-CE), el RGPD (UE 2016/679) y la Guía sobre el uso de cookies de la AEPD.
            <br><em>Última actualización: ${sanitizeHtml(lastUpdated)}</em>
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. ¿Qué son las cookies y tecnologías de almacenamiento local?</h2>
          <p style="color: ${mutedCol};">
            Este sitio web, titularidad de <strong>${sanitizeHtml(companyName)}</strong>, utiliza cookies y tecnologías de almacenamiento similares (tales como <code>localStorage</code>, <code>sessionStorage</code>, píxeles de seguimiento y etiquetas) para garantizar el funcionamiento técnico del sitio, optimizar la experiencia de navegación, medir el uso de la web y, en su caso, mostrar contenidos personalizados o multimedia.
          </p>
          <p style="color: ${mutedCol};">
            Una <strong>cookie</strong> es un pequeño fichero de texto que se descarga y almacena en el navegador del usuario al acceder a determinadas páginas web. Permite a una página web, entre otras cosas, recordar las preferencias de navegación, almacenar y recuperar información sobre los hábitos de visita y reconocer al usuario en visitas posteriores.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Tipos de cookies y finalidades utilizadas</h2>
          <p style="color: ${mutedCol};">
            En función de su finalidad, titularidad y plazo de permanencia, en este sitio web se utilizan las siguientes categorías:
          </p>
          <ul style="color: ${mutedCol}; padding-left: 1.5rem; margin-bottom: 1.5rem;">
    `;

    for (const [, cat] of Object.entries(config.categories)) {
      const isReq = cat.required === true;
      html += `
        <li style="margin-bottom: 0.6rem;">
          <strong>${sanitizeHtml(cat.label)}</strong> (${isReq ? "Técnicas / Exentas de consentimiento" : "Opcionales / Sujetas a consentimiento"}):
          ${sanitizeHtml(cat.description)}
        </li>
      `;
    }

    html += `
          </ul>

          <h3 style="font-size: 1.1rem; font-weight: 700; color: ${textCol}; margin-top: 1.5rem;">Inventario detallado de cookies y almacenamiento web</h3>
          <p style="color: ${mutedCol}; font-size: 0.9rem;">
            A continuación se detallan de forma transparente todas las cookies y claves de almacenamiento registradas en la aplicación:
          </p>
          ${tableHtml}
        </section>

        <section style="margin-bottom: 2rem; background: ${cardBg}; border: 1px solid ${borderCol}; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol}; margin-top: 0;">3. Gestión, configuración y revocación del consentimiento</h2>
          <p style="color: ${mutedCol};">
            De acuerdo con las directrices de la Agencia Española de Protección de Datos (AEPD), retirar o modificar el consentimiento debe ser tan fácil como otorgarlo. Puedes modificar tus preferencias o revocar el consentimiento en cualquier momento:
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.25rem;">
            <button
              type="button"
              data-consent-open
              onclick="if(window.Consent) window.Consent.openPreferences()"
              style="background: #0f172a; color: #ffffff; border: none; padding: 0.65rem 1.3rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;"
            >
              ⚙️ Abrir panel de preferencias de cookies
            </button>
            <button
              type="button"
              onclick="if(window.Consent) window.Consent.withdraw()"
              style="background: #ffffff; color: #dc2626; border: 1px solid #fca5a5; padding: 0.65rem 1.3rem; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; display: inline-flex; align-items: center; gap: 0.5rem;"
            >
              🔄 Revocar consentimiento y purgar datos
            </button>
          </div>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">4. Cómo deshabilitar o eliminar las cookies en los navegadores</h2>
          <p style="color: ${mutedCol};">
            El usuario puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador web:
          </p>
          <ul style="color: #2563eb; padding-left: 1.5rem;">
            <li style="margin-bottom: 0.4rem;"><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Google Chrome</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Mozilla Firefox</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Apple Safari</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Microsoft Edge</a></li>
            <li style="margin-bottom: 0.4rem;"><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: underline;">Opera Browser</a></li>
          </ul>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">5. Reconocimiento de Global Privacy Control (GPC)</h2>
          <p style="color: ${mutedCol};">
            Este sitio web está adaptado al estándar <strong>Global Privacy Control (GPC)</strong> y a la cabecera <code>Do Not Track (DNT)</code>. Si tu navegador emite una señal universal de no seguimiento, nuestro sistema desactivará automáticamente todas las cookies no necesarias sin requerir interacción manual.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">6. Transferencias internacionales de datos</h2>
          <p style="color: ${mutedCol};">
            Determinadas cookies de terceros (tales como Google Analytics o Meta) pueden implicar la transferencia internacional de datos a servidores ubicados en Estados Unidos u otros países fuera del Espacio Económico Europeo (EEE). Dichas transferencias se encuentran amparadas bajo el Marco de Privacidad de Datos UE-EE.UU. (Data Privacy Framework) o Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.
          </p>
        </section>
      </article>
    `;

    return html;
  }

  /**
   * Render complete legal notice (Aviso Legal) conforming to LSSI-CE Art. 10.
   */
  static renderLegalNotice(config: ConsentConfig, options: LegalPolicyOptions = {}): string {
    const entity = config.legalEntity || {
      name: "[Razón Social del Titular]",
      taxId: "[NIF / CIF]",
      address: "[Domicilio Social]",
      email: "[Email de Contacto]",
    };

    const law = config.legalNotice?.applicableLaw || "Legislación española (LSSI-CE, LOPDGDD) y Reglamento General de Protección de Datos (RGPD UE 2016/679)";
    const jurisdiction = config.legalNotice?.jurisdiction || "Juzgados y Tribunales competentes conforme a la normativa de consumidores y usuarios";
    const lastUpdated = config.legalNotice?.lastUpdated || config.policyVersion || new Date().toISOString().split("T")[0];

    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const borderCol = isDark ? "#334155" : "#e2e8f0";

    return `
      <article class="solvenza-legal-notice-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Aviso Legal</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
            <br><em>Última actualización: ${sanitizeHtml(lastUpdated)}</em>
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. Datos identificativos del titular</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; border: 1px solid ${borderCol};">
            <tbody>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600; width: 30%;">Razón Social:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.name)}</td>
              </tr>
              ${entity.tradeName ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Nombre Comercial:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.tradeName)}</td></tr>` : ""}
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">NIF / CIF:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.taxId || "-")}</td>
              </tr>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">Domicilio Social:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.address || "-")}</td>
              </tr>
              <tr style="border-bottom: 1px solid ${borderCol};">
                <td style="padding: 0.75rem 1rem; font-weight: 600;">Correo Electrónico:</td>
                <td style="padding: 0.75rem 1rem; color: ${mutedCol};"><a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "-")}</a></td>
              </tr>
              ${entity.phone ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Teléfono:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.phone)}</td></tr>` : ""}
              ${entity.registryData ? `<tr style="border-bottom: 1px solid ${borderCol};"><td style="padding: 0.75rem 1rem; font-weight: 600;">Datos Registrales:</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};">${sanitizeHtml(entity.registryData)}</td></tr>` : ""}
              ${entity.dpoEmail ? `<tr><td style="padding: 0.75rem 1rem; font-weight: 600;">Delegado de Protección de Datos (DPO):</td><td style="padding: 0.75rem 1rem; color: ${mutedCol};"><a href="mailto:${sanitizeHtml(entity.dpoEmail)}" style="color: #2563eb;">${sanitizeHtml(entity.dpoEmail)}</a></td></tr>` : ""}
            </tbody>
          </table>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Condiciones generales de uso</h2>
          <p style="color: ${mutedCol};">
            El acceso y/o uso de este sitio web atribuye la condición de usuario, que acepta, desde dicho acceso y/o uso, las presentes condiciones generales. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que el titular ofrece a través de su sitio web y a no emplearlos para incurrir en actividades ilícitas o contrarias a la buena fe y al orden público.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">3. Propiedad intelectual e industrial</h2>
          <p style="color: ${mutedCol};">
            Todos los derechos de propiedad intelectual e industrial sobre el diseño, marcas, logotipos, textos, código fuente e ilustraciones de este sitio web corresponden al titular o a sus legítimos licenciantes. Queda expresamente prohibida la reproducción, distribución o comunicación pública de la totalidad o parte de los contenidos sin autorización previa y por escrito.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">4. Exclusión de garantías y responsabilidad</h2>
          <p style="color: ${mutedCol};">
            El titular no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">5. Legislación aplicable y jurisdicción</h2>
          <p style="color: ${mutedCol};">
            Las relaciones entre el titular y el usuario se regirán por la <strong>${sanitizeHtml(law)}</strong>. Para la resolución de cualquier controversia, las partes se someten a los <strong>${sanitizeHtml(jurisdiction)}</strong>, sin perjuicio de los fueros imperativos legales aplicables.
          </p>
        </section>
      </article>
    `;
  }

  /**
   * Render Privacy Policy document (Política de Privacidad RGPD).
   */
  static renderPrivacyPolicy(config: ConsentConfig, options: LegalPolicyOptions = {}): string {
    const entity = config.legalEntity || {
      name: "[Razón Social del Responsable]",
      taxId: "[NIF / CIF]",
      address: "[Domicilio]",
      email: "privacidad@solvenza.es",
    };

    const isDark = options.theme === "dark";
    const textCol = isDark ? "#f8fafc" : "#0f172a";
    const mutedCol = isDark ? "#94a3b8" : "#475569";
    const borderCol = isDark ? "#334155" : "#e2e8f0";

    return `
      <article class="solvenza-privacy-policy-document ${options.className || ""}" style="font-family: system-ui, -apple-system, sans-serif; color: ${textCol}; line-height: 1.7; max-width: 900px; margin: 0 auto; padding: 1rem 0;">
        <header style="margin-bottom: 2rem; border-bottom: 1px solid ${borderCol}; padding-bottom: 1.5rem;">
          <h1 style="font-size: 1.85rem; font-weight: 800; margin: 0 0 0.5rem 0; color: ${textCol};">Política de Privacidad y Protección de Datos</h1>
          <p style="margin: 0; font-size: 0.9rem; color: ${mutedCol};">
            Conforme al Reglamento General de Protección de Datos (RGPD UE 2016/679) y la Ley Orgánica 3/2018 (LOPDGDD).
          </p>
        </header>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">1. Responsable del tratamiento</h2>
          <p style="color: ${mutedCol};">
            <strong>Identidad:</strong> ${sanitizeHtml(entity.name)}<br>
            <strong>NIF / CIF:</strong> ${sanitizeHtml(entity.taxId || "-")}<br>
            <strong>Dirección:</strong> ${sanitizeHtml(entity.address || "-")}<br>
            <strong>Correo electrónico:</strong> <a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "-")}</a><br>
            ${entity.dpoEmail ? `<strong>Contacto DPO:</strong> <a href="mailto:${sanitizeHtml(entity.dpoEmail)}" style="color: #2563eb;">${sanitizeHtml(entity.dpoEmail)}</a>` : ""}
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">2. Finalidad del tratamiento y base jurídica</h2>
          <p style="color: ${mutedCol};">
            Tratamos los datos facilitados por los usuarios con las finalidades de gestionar sus solicitudes, prestar los servicios contratados y, en su caso, analizar el rendimiento de la web y remitir comunicaciones comerciales sobre la base de su <strong>consentimiento explícito</strong> (art. 6.1.a RGPD) o en la <strong>ejecución contractual</strong> (art. 6.1.b RGPD).
          </p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.3rem; font-weight: 700; color: ${textCol};">3. Derechos del interesado</h2>
          <p style="color: ${mutedCol};">
            Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando datos personales que le conciernen. Los interesados tienen derecho a acceder a sus datos personales, solicitar la rectificación de los datos inexactos o, en su caso, solicitar su supresión cuando los datos ya no sean necesarios para los fines que fueron recogidos.
          </p>
          <p style="color: ${mutedCol};">
            Puedes ejercer tus derechos de Acceso, Rectificación, Supresión, Limitación, Portabilidad y Oposición enviando un correo a <a href="mailto:${sanitizeHtml(entity.email || "")}" style="color: #2563eb;">${sanitizeHtml(entity.email || "")}</a>. Asimismo, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style="color: #2563eb;">www.aepd.es</a>).
          </p>
        </section>
      </article>
    `;
  }
}
