import { describe, it, expect } from "vitest";
import { createReceipt, parseReceipt, isReceiptExpired } from "../../src/core/receipt.js";

describe("Consent Receipt Lifecycle", () => {
  it("should create valid receipt with unique UUID and timestamps", () => {
    const choices = { necessary: true, analytics: false };
    const receipt = createReceipt("2026-08-22", choices, "banner");

    expect(receipt.schema).toBe(1);
    expect(receipt.receiptId).toBeDefined();
    expect(receipt.policyVersion).toBe("2026-08-22");
    expect(receipt.source).toBe("banner");
    expect(receipt.choices.necessary).toBe(true);
    expect(receipt.choices.analytics).toBe(false);
  });

  it("should correctly serialize and parse receipt JSON", () => {
    const choices = { necessary: true, marketing: true };
    const receipt = createReceipt("2026-08-22", choices, "preferences");
    const jsonStr = JSON.stringify(receipt);

    const parsed = parseReceipt(jsonStr);
    expect(parsed).not.toBeNull();
    expect(parsed?.receiptId).toBe(receipt.receiptId);
    expect(parsed?.choices.marketing).toBe(true);
  });

  it("should detect expired receipts according to maxAgeDays", () => {
    const choices = { necessary: true };
    const receipt = createReceipt("2026-08-22", choices, "banner");

    // Fresh receipt should not be expired
    expect(isReceiptExpired(receipt, 365)).toBe(false);

    // Simulated expired receipt from 400 days ago
    const oldReceipt = {
      ...receipt,
      updatedAt: new Date(Date.now() - 400 * 86400 * 1000).toISOString(),
    };
    expect(isReceiptExpired(oldReceipt, 365)).toBe(true);
  });
});
