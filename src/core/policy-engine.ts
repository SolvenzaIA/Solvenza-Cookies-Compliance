import type { ConsentChoices, ConsentConfig, ConsentReceipt } from "./types.js";
import { isReceiptExpired } from "./receipt.js";
import { computeReceiptSignature } from "./security.js";

export interface PolicyEvaluationResult {
  isValid: boolean;
  reason?: "missing" | "policy_version_changed" | "expired" | "tampered" | "valid";
  choices: ConsentChoices;
}

export function evaluatePolicy(
  config: ConsentConfig,
  receipt: ConsentReceipt | null
): PolicyEvaluationResult {
  // Build default deny choices (necessary = true, all optionals = false)
  const defaultChoices: ConsentChoices = {};
  for (const [catId, catConfig] of Object.entries(config.categories)) {
    defaultChoices[catId] = catConfig.required === true;
  }

  if (!receipt) {
    return {
      isValid: false,
      reason: "missing",
      choices: defaultChoices,
    };
  }

  if (receipt.policyVersion !== config.policyVersion) {
    return {
      isValid: false,
      reason: "policy_version_changed",
      choices: defaultChoices,
    };
  }

  const maxAgeDays = config.consent?.maxAgeDays ?? 365;
  if (isReceiptExpired(receipt, maxAgeDays)) {
    return {
      isValid: false,
      reason: "expired",
      choices: defaultChoices,
    };
  }

  // Anti-tampering signature verification
  if (receipt.signature) {
    const payloadToSign = `${receipt.receiptId}:${receipt.policyVersion}:${JSON.stringify(receipt.choices)}`;
    const expectedSignature = computeReceiptSignature(payloadToSign, config.security?.secretKey);
    if (receipt.signature !== expectedSignature) {
      return {
        isValid: false,
        reason: "tampered",
        choices: defaultChoices,
      };
    }
  }

  // Merge receipt choices ensuring necessary remains true and any missing category defaults to false
  const activeChoices: ConsentChoices = { ...defaultChoices };
  for (const catId of Object.keys(config.categories)) {
    if (catId === "necessary") {
      activeChoices[catId] = true;
    } else if (typeof receipt.choices[catId] === "boolean") {
      activeChoices[catId] = receipt.choices[catId];
    }
  }

  return {
    isValid: true,
    reason: "valid",
    choices: activeChoices,
  };
}
