import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  SERVICE_PRESETS,
  getPreset,
  defineServices,
  resolveConfigPresets,
  hasPreset,
} from "../../src/presets/index.js";
import { Consent } from "../../src/core/consent-engine.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("Presets de Servicios Comunes (GA4, Meta, Hotjar, etc.)", () => {
  const originalWindow = (globalThis as any).window;
  const originalDocument = (globalThis as any).document;

  beforeEach(() => {
    (globalThis as any).window = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    (globalThis as any).document = {
      querySelectorAll: () => [],
      querySelector: () => null,
      getElementById: () => null,
      createElement: () => ({
        setAttribute: vi.fn(),
        classList: { add: vi.fn(), remove: vi.fn(), contains: vi.fn() },
        appendChild: vi.fn(),
        removeChild: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        querySelector: vi.fn(() => ({ addEventListener: vi.fn() })),
        querySelectorAll: vi.fn(() => []),
      }),
      head: { appendChild: vi.fn() },
      body: { appendChild: vi.fn(), removeChild: vi.fn(), children: [] },
      dispatchEvent: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      documentElement: { lang: "es" },
    };
  });

  afterEach(() => {
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  });

  describe("Preset Catalog Verification", () => {
    it("should provide top industry service presets", () => {
      const requiredPresets = [
        "ga4",
        "google_ads",
        "meta_pixel",
        "posthog",
        "hotjar",
        "clarity",
        "matomo",
        "plausible",
        "youtube",
        "vimeo",
        "spotify",
        "stripe",
        "paypal",
        "cloudflare",
        "gtm",
        "google_recaptcha",
        "hubspot",
        "linkedin_insight",
        "tiktok_pixel",
        "twitter_pixel",
        "intercom",
        "crisp",
      ];

      for (const id of requiredPresets) {
        expect(hasPreset(id)).toBe(true);
        const preset = SERVICE_PRESETS[id];
        expect(preset.category).toBeDefined();
        expect(preset.label).toBeDefined();
        expect(preset.provider).toBeDefined();
      }
    });

    it("should retrieve GA4 preset with accurate GDPR/LSSI cookies and storage keys", () => {
      const ga4 = getPreset("ga4");
      expect(ga4.category).toBe("analytics");
      expect(ga4.label).toBe("Google Analytics 4");
      expect(ga4.provider).toBe("Google LLC");
      expect(ga4.cookies?.some((c) => c.name === "_ga")).toBe(true);
      expect(ga4.cookies?.some((c) => c.name === "_gid")).toBe(true);
      expect(ga4.storageKeys).toContain("_ga_*");
    });

    it("should retrieve Meta Pixel with cookies and storage keys", () => {
      const meta = getPreset("meta_pixel");
      expect(meta.category).toBe("marketing");
      expect(meta.label).toContain("Meta Pixel");
      expect(meta.cookies?.some((c) => c.name === "_fbp")).toBe(true);
      expect(meta.cookies?.some((c) => c.name === "_fbc")).toBe(true);
    });

    it("should throw a clear error for unknown presets", () => {
      expect(() => getPreset("non_existent_tool" as any)).toThrowError(
        /Unknown service preset: 'non_existent_tool'/,
      );
    });
  });

  describe("getPreset() with overrides", () => {
    it("should allow overriding category, label, and provider", () => {
      const customGa4 = getPreset("ga4", {
        label: "Métricas Internas",
        provider: "Google Cloud EU",
      });

      expect(customGa4.label).toBe("Métricas Internas");
      expect(customGa4.provider).toBe("Google Cloud EU");
      expect(customGa4.category).toBe("analytics");
      expect(customGa4.cookies?.some((c) => c.name === "_ga")).toBe(true);
    });
  });

  describe("defineServices() helper", () => {
    it("should define services using mixed strings and object overrides", () => {
      const services = defineServices({
        ga4: "ga4",
        facebook: "meta_pixel",
        hotjar: { preset: "hotjar", label: "Grabación UX" },
        customApi: { category: "necessary", label: "Custom API", provider: "Internal" },
      });

      expect(services.ga4.category).toBe("analytics");
      expect(services.ga4.label).toBe("Google Analytics 4");
      expect(services.facebook.category).toBe("marketing");
      expect(services.hotjar.label).toBe("Grabación UX");
      expect(services.hotjar.category).toBe("analytics");
      expect(services.customApi.label).toBe("Custom API");
    });
  });

  describe("resolveConfigPresets() integration in ConsentEngine", () => {
    it("should automatically hydrate presets in config object", async () => {
      const rawConfig: ConsentConfig = {
        schemaVersion: 1,
        policyVersion: "2026-09-30",
        storage: { type: "memory" },
        categories: {
          necessary: { required: true, label: "Necesarias", description: "Técnicas" },
          analytics: { required: false, label: "Analítica", description: "Métricas" },
          marketing: { required: false, label: "Marketing", description: "Publicidad" },
        },
        services: {
          analytics_tool: { preset: "ga4" },
          video: { preset: "youtube" },
          heatmaps: { preset: "hotjar" },
        },
      };

      const hydrated = resolveConfigPresets(rawConfig);
      expect(hydrated.services?.analytics_tool.category).toBe("analytics");
      expect(hydrated.services?.analytics_tool.label).toBe("Google Analytics 4");
      expect(hydrated.services?.video.category).toBe("marketing");
      expect(hydrated.services?.heatmaps.category).toBe("analytics");

      // Test engine initialization with preset-based config
      await Consent.init(rawConfig);
      expect(Consent.hasService("analytics_tool")).toBe(false);

      Consent.acceptAll();
      expect(Consent.hasService("analytics_tool")).toBe(true);
      expect(Consent.hasService("video")).toBe(true);
    });
  });
});
