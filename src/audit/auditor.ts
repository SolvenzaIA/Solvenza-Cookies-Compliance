import * as fs from "node:fs";
import * as path from "node:path";
import type { ConsentConfig } from "../core/types.js";
import { resolveConfigPresets } from "../presets/index.js";
import type { AuditFinding, AuditOptions, AuditReport } from "./types.js";

/**
 * Common third-party tracking script domains that require explicit prior consent under LSSI art. 22.2.
 */
const KNOWN_TRACKER_PATTERNS = [
  { domain: "googletagmanager.com/gtm.js", name: "Google Tag Manager", category: "necessary_or_analytics" },
  { domain: "googletagmanager.com/gtag", name: "Google Analytics / Ads Gtag", category: "analytics" },
  { domain: "google-analytics.com/analytics.js", name: "Google Universal Analytics", category: "analytics" },
  { domain: "connect.facebook.net", name: "Meta / Facebook Pixel", category: "marketing" },
  { domain: "static.hotjar.com", name: "Hotjar Heatmaps & Feedback", category: "analytics" },
  { domain: "clarity.ms/tag", name: "Microsoft Clarity", category: "analytics" },
  { domain: "analytics.tiktok.com", name: "TikTok Pixel", category: "marketing" },
  { domain: "snap.licdn.com/insight", name: "LinkedIn Insight Tag", category: "marketing" },
  { domain: "cdn.segment.com/analytics", name: "Segment Analytics", category: "analytics" },
  { domain: "app.posthog.com/static", name: "PostHog Analytics", category: "analytics" },
  { domain: "mc.yandex.ru/metrika", name: "Yandex Metrika", category: "analytics" },
];

export class LssiAuditor {
  /**
   * Run complete compliance audit on configuration, source code, and/or live URL.
   */
  static async audit(options: AuditOptions): Promise<AuditReport> {
    const findings: AuditFinding[] = [];
    let scannedFilesCount = 0;

    // 1. Audit Configuration
    let resolvedConfig: ConsentConfig | null = null;
    if (options.config) {
      if (typeof options.config === "string") {
        try {
          const raw = fs.readFileSync(path.resolve(options.config), "utf8");
          resolvedConfig = resolveConfigPresets(JSON.parse(raw));
        } catch (err: any) {
          findings.push({
            id: "CONFIG_FILE_ERROR",
            rule: "LSSI-CONFIG-001",
            severity: "CRITICAL",
            category: "CONFIG",
            message: `No se pudo leer el archivo de configuración: ${err.message}`,
            remediation: "Verifica que la ruta al archivo consent.json sea válida y contenga JSON bien formado.",
          });
        }
      } else {
        resolvedConfig = resolveConfigPresets(options.config);
      }
    } else if (options.configPath) {
      try {
        const raw = fs.readFileSync(path.resolve(options.configPath), "utf8");
        resolvedConfig = resolveConfigPresets(JSON.parse(raw));
      } catch (err: any) {
        findings.push({
          id: "CONFIG_FILE_ERROR",
          rule: "LSSI-CONFIG-001",
          severity: "CRITICAL",
          category: "CONFIG",
          message: `No se pudo leer el archivo de configuración en '${options.configPath}': ${err.message}`,
          remediation: "Especifica una ruta válida con --config <ruta>.",
        });
      }
    }

    if (resolvedConfig) {
      this.auditConfig(resolvedConfig, findings);
    }

    // 2. Audit Source Code Directory
    if (options.srcDir && fs.existsSync(path.resolve(options.srcDir))) {
      scannedFilesCount = this.auditSourceDirectory(path.resolve(options.srcDir), findings);
    }

    // 3. Audit Live URL if provided
    if (options.url) {
      await this.auditLiveUrl(options.url, findings);
    }

    // Calculate score and summary
    const criticalCount = findings.filter((f) => f.severity === "CRITICAL").length;
    const warningCount = findings.filter((f) => f.severity === "WARNING").length;
    const infoCount = findings.filter((f) => f.severity === "INFO").length;

    const penalty = criticalCount * 25 + warningCount * 10 + infoCount * 2;
    const score = Math.max(0, 100 - penalty);
    const compliant = criticalCount === 0;

    return {
      timestamp: new Date().toISOString(),
      compliant,
      score,
      summary: {
        critical: criticalCount,
        warnings: warningCount,
        info: infoCount,
        totalPassed: Math.max(0, 10 - criticalCount - warningCount),
      },
      findings,
      scannedFilesCount,
    };
  }

  /**
   * Validate consent configuration against LSSI art. 22.2 and AEPD guidelines.
   */
  static auditConfig(config: ConsentConfig, findings: AuditFinding[]): void {
    if (!config.categories || typeof config.categories !== "object") {
      findings.push({
        id: "CONFIG_NO_CATEGORIES",
        rule: "AEPD-CATEGORIES-001",
        severity: "CRITICAL",
        category: "CONFIG",
        message: "No se encontraron categorías de consentimiento definidas.",
        remediation: "Declara al menos la categoría 'necessary' y las categorías opcionales ('analytics', 'marketing').",
      });
      return;
    }

    // Necessary category check
    const nec = config.categories["necessary"];
    if (!nec) {
      findings.push({
        id: "CONFIG_MISSING_NECESSARY",
        rule: "LSSI-NECESSARY-001",
        severity: "CRITICAL",
        category: "CONFIG",
        message: "Falta la categoría obligatoria 'necessary' (cookies técnicas y de seguridad).",
        remediation: "Añade 'necessary: { required: true, label: \"Necesarias\", description: \"...\" }'.",
      });
    } else if (nec.required !== true) {
      findings.push({
        id: "CONFIG_NECESSARY_NOT_REQUIRED",
        rule: "LSSI-NECESSARY-002",
        severity: "CRITICAL",
        category: "CONFIG",
        message: "La categoría 'necessary' debe tener siempre 'required: true'.",
        remediation: "Establece required: true en la categoría necessary.",
      });
    }

    // AEPD Legal Guardrail: NO pre-checked optional boxes allowed
    for (const [catId, cat] of Object.entries(config.categories)) {
      if (catId !== "necessary" && !cat.required) {
        if (cat.default === true) {
          findings.push({
            id: "CONFIG_PRECHECKED_OPTIONAL",
            rule: "AEPD-PRECHECK-001",
            severity: "CRITICAL",
            category: "LEGAL",
            message: `Violación AEPD: La categoría opcional '${catId}' tiene default: true (casilla pre-marcada).`,
            details: "Las directrices de la AEPD y el RGPD prohíben taxativamente las casillas preactivadas por defecto.",
            remediation: "Establece default: false en todas las categorías opcionales.",
          });
        }
      }
    }

    // Policy links check
    const hasPrivacy = !!(config.policy?.privacyUrl || (config.translations && Object.values(config.translations).some((t) => t.policy?.privacyUrl)));
    const hasCookies = !!(config.policy?.cookiesUrl || (config.translations && Object.values(config.translations).some((t) => t.policy?.cookiesUrl)));

    if (!hasPrivacy) {
      findings.push({
        id: "CONFIG_MISSING_PRIVACY_URL",
        rule: "RGPD-POLICY-001",
        severity: "WARNING",
        category: "LEGAL",
        message: "No se ha configurado un enlace a la Política de Privacidad ('policy.privacyUrl').",
        remediation: "Añade policy.privacyUrl: '/politica-privacidad' en consent.json.",
      });
    }

    if (!hasCookies) {
      findings.push({
        id: "CONFIG_MISSING_COOKIES_URL",
        rule: "LSSI-POLICY-001",
        severity: "WARNING",
        category: "LEGAL",
        message: "No se ha configurado un enlace a la Política de Cookies ('policy.cookiesUrl').",
        remediation: "Añade policy.cookiesUrl: '/politica-cookies' en consent.json.",
      });
    }

    // Floating badge revocation check
    const badge = config.ui?.floatingBadge;
    if (badge === false) {
      findings.push({
        id: "CONFIG_FLOATING_BADGE_DISABLED",
        rule: "AEPD-REVOCATION-001",
        severity: "WARNING",
        category: "LEGAL",
        message: "El botón flotante de revocación ('ui.floatingBadge') está desactivado.",
        details: "La AEPD exige que retirar el consentimiento sea tan fácil como otorgarlo.",
        remediation: "Mantén el floatingBadge activado o asegúrate de incluir un botón persistente [data-consent-open] en el footer.",
      });
    }
  }

  /**
   * Scan source code directory for unblocked third-party scripts.
   */
  static auditSourceDirectory(dirPath: string, findings: AuditFinding[]): number {
    let count = 0;
    const files = this.walkDir(dirPath);

    const validExtensions = new Set([".html", ".htm", ".jsx", ".tsx", ".vue", ".php", ".js", ".ts", ".mjs"]);

    for (const filePath of files) {
      const ext = path.extname(filePath).toLowerCase();
      if (!validExtensions.has(ext)) continue;
      if (
        filePath.includes("node_modules") ||
        filePath.includes("dist") ||
        filePath.includes(".git") ||
        filePath.includes("/audit/") ||
        filePath.includes("\\audit\\") ||
        filePath.includes("/presets/") ||
        filePath.includes("\\presets\\") ||
        filePath.includes("tests/") ||
        filePath.includes("tests\\")
      ) {
        continue;
      }

      count++;
      try {
        const content = fs.readFileSync(filePath, "utf8");

        // 1. Scan for <script ...> tags (including multiline tags)
        const scriptTagRegex = /<\s*script\b([^>]*)>/gi;
        let match: RegExpExecArray | null;

        while ((match = scriptTagRegex.exec(content)) !== null) {
          const tagAttributes = match[1];
          const fullTag = match[0];
          const offset = match.index;
          const lineNumber = content.substring(0, offset).split("\n").length;

          for (const tracker of KNOWN_TRACKER_PATTERNS) {
            if (tagAttributes.includes(tracker.domain) || fullTag.includes(tracker.domain)) {
              const isBlocked =
                tagAttributes.includes('type="text/plain"') ||
                tagAttributes.includes("type='text/plain'") ||
                tagAttributes.includes("data-consent") ||
                tagAttributes.includes("data-src");

              if (!isBlocked) {
                findings.push({
                  id: "SRC_UNBLOCKED_TRACKER",
                  rule: "LSSI-SCRIPT-ISOLATION-001",
                  severity: "CRITICAL",
                  category: "SOURCE_CODE",
                  message: `Script de seguimiento no bloqueado detectado (${tracker.name}): '${tracker.domain}'`,
                  file: path.relative(process.cwd(), filePath),
                  line: lineNumber,
                  details: fullTag.replace(/\s+/g, " ").trim(),
                  remediation: `Modifica el script para usar type="text/plain" data-src="..." data-consent="${tracker.category}" o envuélvelo en un <ConsentGate>.`,
                });
              }
            }
          }
        }

        // 2. Scan for raw script imports or trackers in JS/TS/JSX/TSX/Vue files (excluding blocked script blocks)
        // Remove all <script type="text/plain" ...>...</script> blocks from raw inspection
        const sanitizedContent = content.replace(/<\s*script\b[^>]*type=["']text\/plain["'][^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "");
        const lines = sanitizedContent.split("\n");
        for (let i = 0; i < lines.length; i++) {
          const rawLine = lines[i];
          const line = rawLine.trim();

          // Skip comments, metadata, or already handled script tags
          if (
            line.startsWith("//") ||
            line.startsWith("*") ||
            line.startsWith("/*") ||
            line.includes("lssi-ignore") ||
            line.includes("<script") ||
            line.includes("data-src") ||
            line.includes("type=\"text/plain\"") ||
            line.includes("type='text/plain'")
          ) {
            continue;
          }

          for (const tracker of KNOWN_TRACKER_PATTERNS) {
            if (line.includes(tracker.domain)) {
              const isBlocked =
                line.includes("ConsentGate") ||
                line.includes("consentGate") ||
                line.includes("useConsent") ||
                line.includes("useConsentService") ||
                line.includes("data-consent") ||
                line.includes("text/plain");

              if (!isBlocked) {
                findings.push({
                  id: "SRC_UNBLOCKED_TRACKER",
                  rule: "LSSI-SCRIPT-ISOLATION-001",
                  severity: "CRITICAL",
                  category: "SOURCE_CODE",
                  message: `Referencia a rastreador sin control de consentimiento detectada (${tracker.name}): '${tracker.domain}'`,
                  file: path.relative(process.cwd(), filePath),
                  line: i + 1,
                  details: line.trim(),
                  remediation: `Envuelve la invocación en un bloque condicional 'useConsent("${tracker.category}")' o componente <ConsentGate>.`,
                });
              }
            }
          }
        }
      } catch {}
    }

    return count;
  }

  /**
   * Audit live URL by fetching HTML and verifying pre-consent isolation.
   */
  static async auditLiveUrl(url: string, findings: AuditFinding[]): Promise<void> {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Solvenza-LSSI-Auditor/1.5.0" } });
      if (!res.ok) {
        findings.push({
          id: "URL_FETCH_FAILED",
          rule: "LSSI-URL-001",
          severity: "WARNING",
          category: "LIVE_URL",
          message: `No se pudo conectar a la URL '${url}' (HTTP ${res.status}).`,
        });
        return;
      }

      const html = await res.text();

      // Check for raw unblocked tracker scripts in live HTML
      for (const tracker of KNOWN_TRACKER_PATTERNS) {
        const regex = new RegExp(`<script[^>]*src=["'][^"']*${tracker.domain.replace(".", "\\.")}[^"']*["'][^>]*>`, "gi");
        const matches = html.match(regex);
        if (matches) {
          for (const match of matches) {
            if (!match.includes('type="text/plain"') && !match.includes("data-consent")) {
              findings.push({
                id: "URL_RAW_TRACKER_LEAK",
                rule: "LSSI-LEAK-001",
                severity: "CRITICAL",
                category: "LIVE_URL",
                message: `Fuga de rastreador en tiempo de ejecución: script '${tracker.name}' cargado antes del consentimiento.`,
                details: match,
                remediation: `Asegúrate de que '${tracker.name}' se inyecte con type="text/plain" data-consent="...".`,
              });
            }
          }
        }
      }
    } catch (err: any) {
      findings.push({
        id: "URL_CONNECT_ERROR",
        rule: "LSSI-URL-002",
        severity: "WARNING",
        category: "LIVE_URL",
        message: `Error al escanear la URL '${url}': ${err.message}`,
      });
    }
  }

  /**
   * Generate GitHub Actions markdown step summary.
   */
  static formatGitHubSummary(report: AuditReport): string {
    const statusEmoji = report.compliant ? "✅" : "❌";
    const statusText = report.compliant
      ? "**APROBADO (Cumplimiento LSSI / AEPD / RGPD Correcto)**"
      : "**RECHAZADO (Violaciones Críticas de Privacidad Detectadas)**";

    let md = `## ${statusEmoji} Auditoría de Cumplimiento LSSI & AEPD - Solvenza Cookies Compliance\n\n`;
    md += `> **Resultado:** ${statusText}  \n`;
    md += `> **Puntuación de Cumplimiento:** **${report.score} / 100**  \n`;
    md += `> **Archivos Escaneados:** ${report.scannedFilesCount} | **Fecha:** ${new Date(report.timestamp).toUTCString()}\n\n`;

    md += `### 📊 Resumen de Hallazgos:\n\n`;
    md += `| Gravedad | Cantidad | Descripción |\n`;
    md += `|---|---|---|\n`;
    md += `| 🔴 **CRÍTICO** | **${report.summary.critical}** | Violaciones legales directas (riesgo de sanción AEPD) |\n`;
    md += `| 🟡 **ADVERTENCIA** | **${report.summary.warnings}** | Recomendaciones técnicas y mejores prácticas |\n`;
    md += `| 🔵 **INFO** | **${report.summary.info}** | Sugerencias de optimización |\n\n`;

    if (report.findings.length > 0) {
      md += `### 🔍 Detalle de Hallazgos:\n\n`;
      md += `| Regla | Gravedad | Categoría | Archivo/Línea | Mensaje | Solución |\n`;
      md += `|---|---|---|---|---|---|\n`;

      for (const f of report.findings) {
        const sevBadge = f.severity === "CRITICAL" ? "🔴 CRÍTICO" : f.severity === "WARNING" ? "🟡 ADVERTENCIA" : "🔵 INFO";
        const location = f.file ? `\`${f.file}${f.line ? `:${f.line}` : ""}\`` : "-";
        const remediation = f.remediation ? f.remediation.replace(/\|/g, "\\|") : "-";
        const message = f.message.replace(/\|/g, "\\|");
        md += `| \`${f.rule}\` | ${sevBadge} | ${f.category} | ${location} | ${message} | ${remediation} |\n`;
      }
      md += `\n`;
    } else {
      md += `🎉 **No se encontraron violaciones ni fugas de privacidad.** Todos los recursos de terceros cumplen con el aislamiento previo al consentimiento (LSSI art. 22.2).\n\n`;
    }

    return md;
  }

  private static walkDir(dir: string): string[] {
    let results: string[] = [];
    try {
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(this.walkDir(fullPath));
        } else {
          results.push(fullPath);
        }
      }
    } catch {}
    return results;
  }
}
