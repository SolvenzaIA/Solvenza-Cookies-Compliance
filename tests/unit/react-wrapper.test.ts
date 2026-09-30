import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import React from "react";
import { Consent } from "../../src/core/consent-engine.js";
import {
  ConsentGate,
  useConsent,
  useConsentService,
  useConsentLocale,
  useSyncConsentLocale,
} from "../../src/wrappers/react.js";
import { initNextConsent } from "../../src/wrappers/next.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("React & Next.js <ConsentGate> & Hooks", () => {
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

    vi.spyOn(console, "error").mockImplementation(() => {});
    await Consent.init(testConfig);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  });

  describe("ConsentGate Component", () => {
    it("should render fallback when consent is not granted for category", () => {
      Consent.rejectAll();

      const element = ConsentGate({
        category: "marketing",
        fallback: "Fallback Video Blocked",
        children: "Active Video Player",
      });

      expect(element).toBe("Fallback Video Blocked");
    });

    it("should render children when consent is granted", () => {
      Consent.setPreferences({ marketing: true });

      const element = ConsentGate({
        category: "marketing",
        fallback: "Fallback Video Blocked",
        children: "Active Video Player",
      });

      expect(element).toBe("Active Video Player");
    });

    it("should support render-prop function fallback with context", () => {
      Consent.rejectAll();

      const fallbackFn = vi.fn(({ category }) => `Blocked for ${category}`);

      const element = ConsentGate({
        category: "marketing",
        fallback: fallbackFn,
        children: "Active Video Player",
      });

      expect(element).toBe("Blocked for marketing");
      expect(fallbackFn).toHaveBeenCalled();
    });

    it("should gate by specific service identifier", () => {
      Consent.rejectAll();

      const elementBlocked = ConsentGate({
        service: "ga4",
        fallback: "GA4 Blocked",
        children: "GA4 Active",
      });
      expect(elementBlocked).toBe("GA4 Blocked");

      Consent.acceptAll();

      const elementAllowed = ConsentGate({
        service: "ga4",
        fallback: "GA4 Blocked",
        children: "GA4 Active",
      });
      expect(elementAllowed).toBe("GA4 Active");
    });
  });

  describe("Next.js Helper", () => {
    it("should initialize Next consent with initial locale", async () => {
      await initNextConsent(testConfig as any, "ca");
      expect(Consent.getLocale()).toBe("ca");
    });
  });
});
