import { describe, it, expect, beforeEach } from "vitest";
import { PolicyGenerator } from "../../src/ui/policy-generator.js";
import { Consent } from "../../src/core/consent-engine.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("Legal & Cookie Policy Generator (LSSI, AEPD & RGPD)", () => {
  const sampleConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-08-23",
    legalEntity: {
      name: "Solvenza Inteligencia Artificial S.L.",
      tradeName: "Solvenza",
      taxId: "B-12345678",
      address: "Paseo de la Castellana 100, Madrid, España",
      email: "privacidad@solvenza.es",
      phone: "+34 910 000 000",
      registryData: "Registro Mercantil de Madrid, Tomo 1234, Folio 56, Sección 8",
      dpoEmail: "dpo@solvenza.es",
    },
    legalNotice: {
      applicableLaw: "Legislación española y europea (LSSI-CE, RGPD, LOPDGDD)",
      jurisdiction: "Juzgados y Tribunales de Madrid",
      lastUpdated: "2026-09-30",
    },
    gpc: {
      enabled: true,
      respectSignal: true,
    },
    categories: {
      necessary: {
        required: true,
        label: "Cookies Técnicas",
        description: "Cookies esenciales para la seguridad y navegación.",
        storageKeys: ["auth_token"],
      },
      analytics: {
        required: false,
        label: "Analítica Web",
        description: "Miden la interacción agregada de los usuarios.",
      },
      marketing: {
        required: false,
        label: "Publicidad y Medios",
        description: "Permiten reproducir contenido multimedia.",
      },
    },
    services: {
      ga4: {
        category: "analytics",
        label: "Google Analytics 4",
        provider: "Google Ireland Limited",
        policyUrl: "https://policies.google.com/privacy",
        cookies: [
          { name: "_ga", duration: "2 años", purpose: "Identificador de sesión analítica" },
          { name: "_ga_*", duration: "2 años", purpose: "Mantiene el estado de la sesión" },
        ],
        storageKeys: ["_ga_cid"],
      },
      youtube: {
        category: "marketing",
        label: "YouTube Video Embed",
        provider: "Google LLC",
        policyUrl: "https://policies.google.com/privacy",
        cookies: [
          { name: "VISITOR_INFO1_LIVE", duration: "6 meses", purpose: "Medición de ancho de banda" },
        ],
      },
    },
  };

  beforeEach(async () => {
    await Consent.init(sampleConfig);
  });

  it("should extract all cookie details, storage keys, and SDK default cookie", () => {
    const rows = PolicyGenerator.extractCookieRows(sampleConfig);
    expect(rows.length).toBeGreaterThanOrEqual(5);

    const gaCookie = rows.find((r) => r.name === "_ga");
    expect(gaCookie).toBeDefined();
    expect(gaCookie?.type).toBe("Cookie");
    expect(gaCookie?.provider).toBe("Google Ireland Limited");
    expect(gaCookie?.duration).toBe("2 años");

    const gaStorage = rows.find((r) => r.name === "_ga_cid");
    expect(gaStorage).toBeDefined();
    expect(gaStorage?.type).toBe("localStorage");

    const necStorage = rows.find((r) => r.name === "auth_token");
    expect(necStorage).toBeDefined();
    expect(necStorage?.categoryLabel).toBe("Cookies Técnicas");

    const sdkCookie = rows.find((r) => r.name === "site_consent");
    expect(sdkCookie).toBeDefined();
    expect(sdkCookie?.provider).toContain("Solvenza");
  });

  it("should render a structured HTML table of cookies and storage keys", () => {
    const tableHtml = PolicyGenerator.renderTable(sampleConfig);
    expect(tableHtml).toContain("<table");
    expect(tableHtml).toContain("_ga");
    expect(tableHtml).toContain("Google Ireland Limited");
    expect(tableHtml).toContain("localStorage");
    expect(tableHtml).toContain("Cookies Técnicas");
    expect(tableHtml).toContain("https://policies.google.com/privacy");
  });

  it("should render full Cookie Policy legal document with AEPD revocation buttons and browser guides", () => {
    const policyHtml = PolicyGenerator.renderCookiePolicy(sampleConfig);
    expect(policyHtml).toContain("Política de Cookies");
    expect(policyHtml).toContain("Solvenza");
    expect(policyHtml).toContain("artículo 22.2 de la Ley 34/2002");
    expect(policyHtml).toContain("data-consent-open");
    expect(policyHtml).toContain("Abrir panel de preferencias de cookies");
    expect(policyHtml).toContain("Google Chrome");
    expect(policyHtml).toContain("Mozilla Firefox");
    expect(policyHtml).toContain("Global Privacy Control (GPC)");
    expect(policyHtml).toContain("Transferencias internacionales de datos");
  });

  it("should render Legal Notice (Aviso Legal LSSI art. 10) with complete entity data", () => {
    const noticeHtml = PolicyGenerator.renderLegalNotice(sampleConfig);
    expect(noticeHtml).toContain("Aviso Legal");
    expect(noticeHtml).toContain("Solvenza Inteligencia Artificial S.L.");
    expect(noticeHtml).toContain("B-12345678");
    expect(noticeHtml).toContain("privacidad@solvenza.es");
    expect(noticeHtml).toContain("dpo@solvenza.es");
    expect(noticeHtml).toContain("Paseo de la Castellana 100");
    expect(noticeHtml).toContain("Registro Mercantil de Madrid");
    expect(noticeHtml).toContain("Propiedad intelectual e industrial");
    expect(noticeHtml).toContain("Juzgados y Tribunales de Madrid");
  });

  it("should render Privacy Policy RGPD document", () => {
    const privacyHtml = PolicyGenerator.renderPrivacyPolicy(sampleConfig);
    expect(privacyHtml).toContain("Política de Privacidad");
    expect(privacyHtml).toContain("Solvenza Inteligencia Artificial S.L.");
    expect(privacyHtml).toContain("Responsable del tratamiento");
    expect(privacyHtml).toContain("Derechos del interesado");
    expect(privacyHtml).toContain("www.aepd.es");
  });

  it("should provide programmatic methods on Consent SDK instance", () => {
    const renderedPolicy = Consent.renderPolicyHtml();
    expect(renderedPolicy).toContain("Política de Cookies");

    const renderedNotice = Consent.renderLegalNoticeHtml();
    expect(renderedNotice).toContain("Aviso Legal");

    const renderedPrivacy = Consent.renderPrivacyPolicyHtml();
    expect(renderedPrivacy).toContain("Política de Privacidad");

    const tableOnly = Consent.renderPolicyHtml({ view: "table-only" });
    expect(tableOnly).toContain("solvenza-policy-table-wrapper");
    expect(tableOnly).not.toContain("<h1>Política de Cookies</h1>");
  });
});
