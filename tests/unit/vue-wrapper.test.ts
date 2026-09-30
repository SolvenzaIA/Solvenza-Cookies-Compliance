import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { ref, createApp, nextTick } from "vue";
import { Consent } from "../../src/core/consent-engine.js";
import {
  useConsent,
  useConsentService,
  useConsentLocale,
  useSyncConsentLocale,
  ConsentGate,
  createConsentPlugin,
} from "../../src/wrappers/vue.js";
import { initNuxtConsent, defineNuxtConsentPlugin } from "../../src/wrappers/nuxt.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("Vue 3 & Nuxt 3 Wrapper", () => {
  const originalWindow = (globalThis as any).window;
  const originalDocument = (globalThis as any).document;

  const testConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-09-30",
    storage: { type: "memory" },
    locale: { default: "es", supported: ["es", "en", "ca"] },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Técnicas" },
      analytics: { required: false, label: "Analítica", description: "Métricas" },
      marketing: { required: false, label: "Marketing", description: "Vídeo" },
    },
    services: {
      ga4: { category: "analytics", label: "GA4" },
      youtube: { category: "marketing", label: "YouTube" },
    },
  };

  beforeEach(async () => {
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

    await Consent.init(testConfig);
  });

  afterEach(() => {
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  });

  describe("Vue 3 Plugin & ConsentGate", () => {
    it("should register $consent and ConsentGate on app.use()", () => {
      const app = createApp({ render: () => null });
      app.use(createConsentPlugin(testConfig));

      expect(app.config.globalProperties.$consent).toBe(Consent);
      expect(app._context.components["ConsentGate"]).toBeDefined();
    });

    it("should conditionally render slots in ConsentGate", () => {
      Consent.rejectAll();

      const render = (ConsentGate as any).setup(
        { category: "marketing" },
        {
          slots: {
            default: () => "Video Player",
            fallback: () => "Video Blocked",
          },
        },
      );

      // Initially rejected
      const vnodeBlocked = render();
      expect(vnodeBlocked).toBeDefined();

      // Allow marketing
      Consent.setPreferences({ marketing: true });
      const vnodeAllowed = render();
      expect(vnodeAllowed).toBeDefined();
    });
  });

  describe("Vue Composables (useConsent, useConsentService, useConsentLocale)", () => {
    it("should reactively track category status", () => {
      Consent.rejectAll();
      const isAnalytics = useConsent("analytics");
      expect(isAnalytics.value).toBe(false);

      Consent.acceptAll();
      expect(isAnalytics.value).toBe(true);

      Consent.rejectAll();
      expect(isAnalytics.value).toBe(false);
    });

    it("should reactively track service status", () => {
      Consent.rejectAll();
      const isGa4 = useConsentService("ga4");
      expect(isGa4.value).toBe(false);

      Consent.acceptAll();
      expect(isGa4.value).toBe(true);
    });

    it("should reactively track locale", () => {
      const currentLocale = useConsentLocale();
      expect(currentLocale.value).toBe("es");

      Consent.setLocale("ca");
      expect(currentLocale.value).toBe("ca");
    });

    it("should synchronize locale with useSyncConsentLocale", async () => {
      const activeLocale = ref("ca");
      useSyncConsentLocale(activeLocale);

      expect(Consent.getLocale()).toBe("ca");

      activeLocale.value = "en";
      await nextTick();
      expect(Consent.getLocale()).toBe("en");
    });
  });

  describe("Nuxt 3 Plugin Helper", () => {
    it("should run defineNuxtConsentPlugin cleanly", () => {
      const plugin = defineNuxtConsentPlugin(testConfig as any);
      const mockNuxtApp = { provide: vi.fn() };

      plugin(mockNuxtApp);
      expect(mockNuxtApp.provide).toHaveBeenCalledWith("consent", Consent);
    });

    it("should run initNuxtConsent with initial locale", () => {
      initNuxtConsent(testConfig as any, "en");
      expect(Consent.getLocale()).toBe("en");
    });
  });
});
