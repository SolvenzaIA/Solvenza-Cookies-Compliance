import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { LssiAuditor } from "../../src/audit/auditor.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("LSSI & AEPD Compliance Auditor", () => {
  const validConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-09-30",
    policy: {
      privacyUrl: "/politica-privacidad",
      cookiesUrl: "/politica-cookies",
    },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Técnicas" },
      analytics: { required: false, default: false, label: "Analítica", description: "Métricas" },
      marketing: { required: false, default: false, label: "Marketing", description: "Publicidad" },
    },
    services: {
      ga4: { category: "analytics", label: "GA4" },
    },
  };

  describe("Configuration Auditing", () => {
    it("should pass on fully compliant configuration", async () => {
      const report = await LssiAuditor.audit({ config: validConfig });
      expect(report.compliant).toBe(true);
      expect(report.score).toBe(100);
      expect(report.summary.critical).toBe(0);
    });

    it("should fail and flag critical finding if optional category is pre-selected (default: true)", async () => {
      const invalidConfig: ConsentConfig = {
        ...validConfig,
        categories: {
          ...validConfig.categories,
          marketing: { required: false, default: true, label: "Marketing", description: "Violación AEPD" },
        },
      };

      const report = await LssiAuditor.audit({ config: invalidConfig });
      expect(report.compliant).toBe(false);
      expect(report.summary.critical).toBeGreaterThan(0);
      expect(report.findings.some((f) => f.rule === "AEPD-PRECHECK-001")).toBe(true);
    });

    it("should flag critical finding if necessary category is missing or not required", async () => {
      const missingNecessary: any = {
        schemaVersion: 1,
        policyVersion: "2026-09-30",
        categories: {
          analytics: { required: false, label: "Analítica", description: "Métricas" },
        },
      };

      const report = await LssiAuditor.audit({ config: missingNecessary });
      expect(report.compliant).toBe(false);
      expect(report.findings.some((f) => f.rule === "LSSI-NECESSARY-001")).toBe(true);
    });
  });

  describe("Source Code Static Tracker Scan", () => {
    const tempDir = path.resolve("./temp-audit-test");

    beforeEach(() => {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
      fs.mkdirSync(tempDir, { recursive: true });
    });

    afterEach(() => {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    it("should detect unblocked tracking scripts in HTML / JSX files", async () => {
      const unblockedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://www.googletagmanager.com/gtm.js?id=GTM-XYZ"></script>
            <script src="https://connect.facebook.net/en_US/fbevents.js"></script>
          </head>
        </html>
      `;

      fs.writeFileSync(path.join(tempDir, "index.html"), unblockedHtml);

      const report = await LssiAuditor.audit({
        config: validConfig,
        srcDir: tempDir,
      });

      expect(report.compliant).toBe(false);
      expect(report.summary.critical).toBe(2);
      expect(report.findings.some((f) => f.message.includes("Google Tag Manager"))).toBe(true);
      expect(report.findings.some((f) => f.message.includes("Meta / Facebook Pixel"))).toBe(true);
    });

    it("should pass when scripts are properly isolated with type='text/plain' or ConsentGate", async () => {
      const isolatedHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <script type="text/plain" data-consent="necessary" data-src="https://www.googletagmanager.com/gtm.js?id=GTM-XYZ"></script>
            <script type="text/plain" data-consent="marketing" data-src="https://connect.facebook.net/en_US/fbevents.js"></script>
          </head>
        </html>
      `;

      fs.writeFileSync(path.join(tempDir, "index.html"), isolatedHtml);

      const report = await LssiAuditor.audit({
        config: validConfig,
        srcDir: tempDir,
      });

      expect(report.compliant).toBe(true);
      expect(report.summary.critical).toBe(0);
    });
  });

  describe("GitHub Markdown Step Summary Formatting", () => {
    it("should generate a clean markdown summary table", () => {
      const report = {
        timestamp: new Date().toISOString(),
        compliant: true,
        score: 100,
        summary: { critical: 0, warnings: 0, info: 0, totalPassed: 10 },
        findings: [],
        scannedFilesCount: 15,
      };

      const md = LssiAuditor.formatGitHubSummary(report);
      expect(md).toContain("Auditoría de Cumplimiento LSSI & AEPD");
      expect(md).toContain("APROBADO");
      expect(md).toContain("100 / 100");
    });
  });
});
