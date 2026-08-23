import { describe, it, expect } from "vitest";
import { computeReceiptSignature, verifyReceiptIntegrity, sanitizeHtml, sanitizeUrl } from "../../src/core/security.js";
import { createReceipt } from "../../src/core/receipt.js";
import { evaluatePolicy } from "../../src/core/policy-engine.js";
import type { ConsentConfig } from "../../src/core/types.js";

describe("Security Hardening Utilities", () => {
  it("should compute and verify SHA-256 HMAC receipt signatures with secretKey", () => {
    const payload = "rec_123:2026-08-23:{\"necessary\":true,\"analytics\":true}";
    const secretKey = "super_secret_local_key";

    const sig = computeReceiptSignature(payload, secretKey);
    expect(sig).toBeDefined();
    expect(sig.length).toBe(64); // SHA-256 hex output length

    expect(verifyReceiptIntegrity(payload, sig, secretKey)).toBe(true);
    expect(verifyReceiptIntegrity(payload, "invalid_sig", secretKey)).toBe(false);
  });

  it("should invalidate tampered receipts in evaluatePolicy when secretKey is configured", () => {
    const config: ConsentConfig = {
      schemaVersion: 1,
      policyVersion: "2026-08-23",
      security: { secretKey: "secret_123" },
      categories: { necessary: { required: true, label: "N", description: "D" } },
    };

    const receipt = createReceipt("2026-08-23", { necessary: true }, "banner", null, "secret_123");

    // Valid receipt should evaluate to valid
    const validResult = evaluatePolicy(config, receipt);
    expect(validResult.isValid).toBe(true);

    // Tampered receipt choices should evaluate to tampered / invalid
    const tamperedReceipt = { ...receipt, choices: { necessary: true, analytics: true } };
    const tamperedResult = evaluatePolicy(config, tamperedReceipt);
    expect(tamperedResult.isValid).toBe(false);
    expect(tamperedResult.reason).toBe("tampered");
  });

  it("should sanitize malicious HTML inputs", () => {
    const maliciousInput = '<script>alert("XSS")</script>';
    const sanitized = sanitizeHtml(maliciousInput);
    expect(sanitized).not.toContain("<script>");
    expect(sanitized).toBe("&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;");
  });

  it("should sanitize malicious javascript: URLs", () => {
    expect(sanitizeUrl("javascript:alert(1)")).toBe("#");
    expect(sanitizeUrl("DATA:text/html,<script>alert(1)</script>")).toBe("#");
    expect(sanitizeUrl("https://example.com/privacy")).toBe("https://example.com/privacy");
  });
});
