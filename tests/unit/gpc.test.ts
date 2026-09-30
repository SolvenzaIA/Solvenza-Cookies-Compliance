import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  detectGpcSignal,
  resolveGpcConfig,
  applyGpcChoices,
} from "../../src/core/gpc.js";
import { Consent } from "../../src/core/consent-engine.js";
import { useGpc as useReactGpc } from "../../src/wrappers/react.js";
import { useGpc as useVueGpc } from "../../src/wrappers/vue.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("Global Privacy Control (GPC) & Do Not Track (DNT) Support", () => {
  const originalWindow = (globalThis as any).window;
  const originalDocument = (globalThis as any).document;

  const testConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-09-30",
    storage: { type: "memory" },
    locale: { default: "es" },
    gpc: {
      enabled: true,
      respectSignal: true,
      mode: "auto-reject",
    },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Técnicas" },
      analytics: { required: false, label: "Analítica", description: "Métricas" },
      marketing: { required: false, label: "Marketing", description: "Publicidad" },
    },
    services: {
      ga4: { category: "analytics", label: "GA4" },
      meta: { category: "marketing", label: "Meta" },
    },
  };

  const setNavigatorGpc = (gpcValue: boolean | undefined, dntValue?: string | undefined) => {
    if (!(globalThis as any).navigator) {
      try {
        Object.defineProperty(globalThis, "navigator", {
          value: {},
          configurable: true,
          writable: true,
        });
      } catch {
        (globalThis as any).navigator = {};
      }
    }

    const nav = (globalThis as any).navigator;
    try {
      Object.defineProperty(nav, "globalPrivacyControl", {
        value: gpcValue,
        configurable: true,
        writable: true,
      });
    } catch {
      nav.globalPrivacyControl = gpcValue;
    }

    try {
      Object.defineProperty(nav, "doNotTrack", {
        value: dntValue,
        configurable: true,
        writable: true,
      });
    } catch {
      nav.doNotTrack = dntValue;
    }

    const win = (globalThis as any).window;
    if (win) {
      win.globalPrivacyControl = gpcValue;
      win.doNotTrack = dntValue;
      if (!win.navigator) {
        win.navigator = nav;
      } else {
        try {
          Object.defineProperty(win.navigator, "globalPrivacyControl", {
            value: gpcValue,
            configurable: true,
            writable: true,
          });
        } catch {
          win.navigator.globalPrivacyControl = gpcValue;
        }
        try {
          Object.defineProperty(win.navigator, "doNotTrack", {
            value: dntValue,
            configurable: true,
            writable: true,
          });
        } catch {
          win.navigator.doNotTrack = dntValue;
        }
      }
    }
  };

  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    (globalThis as any).window = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    setNavigatorGpc(true, undefined);

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
    vi.restoreAllMocks();
    setNavigatorGpc(undefined, undefined);
    (globalThis as any).window = originalWindow;
    (globalThis as any).document = originalDocument;
  });

  describe("Signal Detection", () => {
    it("should detect navigator.globalPrivacyControl === true", () => {
      setNavigatorGpc(true, undefined);
      expect(detectGpcSignal()).toBe(true);
    });

    it("should detect window.globalPrivacyControl === true", () => {
      setNavigatorGpc(undefined, undefined);
      (globalThis as any).window = { globalPrivacyControl: true };
      expect(detectGpcSignal()).toBe(true);
    });

    it("should detect navigator.doNotTrack === '1' as fallback", () => {
      setNavigatorGpc(undefined, "1");
      expect(detectGpcSignal()).toBe(true);
    });

    it("should return false when no signal is present", () => {
      setNavigatorGpc(false, "0");
      (globalThis as any).window = { globalPrivacyControl: false, doNotTrack: "0" };
      expect(detectGpcSignal()).toBe(false);
    });
  });

  describe("Configuration & Helper Functions", () => {
    it("should resolve default GPC config values", () => {
      const gpc = resolveGpcConfig(testConfig);
      expect(gpc.enabled).toBe(true);
      expect(gpc.respectSignal).toBe(true);
      expect(gpc.mode).toBe("auto-reject");
    });

    it("should apply GPC choices setting optional categories to false", () => {
      const choices = applyGpcChoices(testConfig);
      expect(choices.necessary).toBe(true);
      expect(choices.analytics).toBe(false);
      expect(choices.marketing).toBe(false);
    });
  });

  describe("ConsentEngine Lifecycle with GPC Signal", () => {
    it("should auto-apply restrictive choices and create GPC receipt when signal is active", async () => {
      setNavigatorGpc(true, undefined);

      const gpcEventSpy = vi.fn();
      Consent.on("gpc:detected", gpcEventSpy);

      await Consent.init(testConfig);

      expect(Consent.isGpcActive()).toBe(true);
      expect(Consent.has("necessary")).toBe(true);
      expect(Consent.has("analytics")).toBe(false);
      expect(Consent.has("marketing")).toBe(false);

      const receipt = Consent.getReceipt();
      expect(receipt).not.toBeNull();
      expect(receipt?.source).toBe("gpc");
      expect(receipt?.gpc).toBe(true);
      expect(receipt?.choices.analytics).toBe(false);
      expect(gpcEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({ signal: true, autoApplied: true }),
      );
    });

    it("should allow user to subsequently override GPC choices via preferences", async () => {
      setNavigatorGpc(true, undefined);

      await Consent.init(testConfig);
      expect(Consent.has("analytics")).toBe(false);

      // User manually accepts analytics
      Consent.setPreferences({ analytics: true, marketing: false });

      expect(Consent.has("analytics")).toBe(true);
      const receipt = Consent.getReceipt();
      expect(receipt?.source).toBe("preferences");
      expect(receipt?.gpc).toBe(true); // GPC flag preserved as signal indicator
    });
  });

  describe("Framework Wrappers (React & Vue)", () => {
    it("should return GPC status in useGpc hook (React)", () => {
      setNavigatorGpc(true, undefined);
      expect(useReactGpc()).toBe(true);
    });

    it("should return GPC status in useGpc composable (Vue)", () => {
      setNavigatorGpc(true, undefined);
      const isGpc = useVueGpc();
      expect(isGpc.value).toBe(true);
    });
  });
});
