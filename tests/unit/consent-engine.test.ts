import { describe, it, expect, beforeEach } from "vitest";
import { ConsentEngine } from "../../src/core/consent-engine.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("ConsentEngine Core", () => {
  let engine: ConsentEngine;

  const testConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-08-22",
    storage: { type: "memory" },
    categories: {
      necessary: { required: true, label: "Necesarias", description: "Imprescindibles" },
      analytics: { required: false, label: "Analítica", description: "Medición" },
      marketing: { required: false, label: "Marketing", description: "Publicidad" },
    },
    services: {
      ga4: {
        category: "analytics",
        label: "Google Analytics 4",
      },
    },
  };

  beforeEach(() => {
    engine = new ConsentEngine();
  });

  it("should initialize with deny by default for optional categories", async () => {
    await engine.init(testConfig);
    expect(engine.has("necessary")).toBe(true);
    expect(engine.has("analytics")).toBe(false);
    expect(engine.has("marketing")).toBe(false);
    expect(engine.hasService("ga4")).toBe(false);
  });

  it("should update choices on acceptAll()", async () => {
    await engine.init(testConfig);
    engine.acceptAll();

    expect(engine.has("necessary")).toBe(true);
    expect(engine.has("analytics")).toBe(true);
    expect(engine.has("marketing")).toBe(true);
    expect(engine.hasService("ga4")).toBe(true);
    expect(engine.getReceipt()?.choices.analytics).toBe(true);
  });

  it("should set optional categories to false on rejectAll()", async () => {
    await engine.init(testConfig);
    engine.acceptAll();
    expect(engine.has("analytics")).toBe(true);

    engine.rejectAll();
    expect(engine.has("necessary")).toBe(true);
    expect(engine.has("analytics")).toBe(false);
    expect(engine.has("marketing")).toBe(false);
  });

  it("should enforce necessary=true when setPreferences is called", async () => {
    await engine.init(testConfig);
    engine.setPreferences({ necessary: false, analytics: true, marketing: false });

    expect(engine.has("necessary")).toBe(true);
    expect(engine.has("analytics")).toBe(true);
    expect(engine.has("marketing")).toBe(false);
  });

  it("should clear choices and trigger event on withdraw()", async () => {
    await engine.init(testConfig);
    engine.acceptAll();

    let withdrawn = false;
    engine.on("consent:withdrawn", () => {
      withdrawn = true;
    });

    engine.withdraw();
    expect(withdrawn).toBe(true);
    expect(engine.has("analytics")).toBe(false);
    expect(engine.getReceipt()).toBeNull();
  });
});
