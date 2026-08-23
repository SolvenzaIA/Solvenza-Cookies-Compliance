import { describe, it, expect } from "vitest";
import { validateConfig, ConfigValidationError } from "../../src/core/config-validator.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("ConfigValidator - Legal Guardrails AEPD", () => {
  const validConfig: ConsentConfig = {
    schemaVersion: 1,
    policyVersion: "2026-08-22",
    categories: {
      necessary: {
        required: true,
        label: "Necesarias",
        description: "Imprescindibles para el funcionamiento",
      },
      analytics: {
        required: false,
        default: false,
        label: "Analítica",
        description: "Medición de uso",
      },
    },
  };

  it("should pass for valid AEPD-compliant config", () => {
    expect(() => validateConfig(validConfig)).not.toThrow();
  });

  it("should throw error if necessary category is missing", () => {
    const invalid: any = {
      schemaVersion: 1,
      policyVersion: "2026-08-22",
      categories: {
        analytics: { required: false, label: "A", description: "B" },
      },
    };
    expect(() => validateConfig(invalid)).toThrow(ConfigValidationError);
    expect(() => validateConfig(invalid)).toThrow("Category 'necessary' must be defined");
  });

  it("should throw error if necessary category is not required", () => {
    const invalid: any = {
      schemaVersion: 1,
      policyVersion: "2026-08-22",
      categories: {
        necessary: { required: false, label: "A", description: "B" },
      },
    };
    expect(() => validateConfig(invalid)).toThrow(ConfigValidationError);
    expect(() => validateConfig(invalid)).toThrow("Category 'necessary' must have 'required: true'");
  });

  it("should enforce AEPD legal guardrail: reject optional category pre-selection (default: true)", () => {
    const invalid: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-08-22",
      categories: {
        necessary: { required: true, label: "N", description: "N" },
        marketing: {
          required: false,
          default: true, // Legal violation!
          label: "Marketing",
          description: "M",
        },
      },
    };
    expect(() => validateConfig(invalid)).toThrow(ConfigValidationError);
    expect(() => validateConfig(invalid)).toThrow("Legal violation (AEPD)");
  });
});
