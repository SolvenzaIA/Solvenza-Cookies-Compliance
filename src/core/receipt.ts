import type { ConsentChoices, ConsentReceipt } from "./types.js";
import { computeReceiptSignature } from "./security.js";

function generateUUID(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback for environments lacking crypto.randomUUID
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function createReceipt(
  policyVersion: string,
  choices: ConsentChoices,
  source: ConsentReceipt["source"],
  existingReceipt?: ConsentReceipt | null,
  secretKey?: string,
): ConsentReceipt {
  const now = new Date().toISOString();
  const receiptId = existingReceipt?.receiptId || generateUUID();
  const decidedAt = existingReceipt?.decidedAt || now;

  const payloadToSign = `${receiptId}:${policyVersion}:${JSON.stringify(choices)}`;
  const signature = computeReceiptSignature(payloadToSign, secretKey);

  return {
    schema: 1,
    receiptId,
    policyVersion,
    decidedAt,
    updatedAt: now,
    source,
    choices,
    signature,
  };
}

export function parseReceipt(jsonStr: string): ConsentReceipt | null {
  try {
    const data = JSON.parse(jsonStr);
    if (
      typeof data === "object" &&
      data !== null &&
      typeof data.receiptId === "string" &&
      typeof data.policyVersion === "string" &&
      typeof data.choices === "object"
    ) {
      return data as ConsentReceipt;
    }
    return null;
  } catch {
    return null;
  }
}

export function isReceiptExpired(
  receipt: ConsentReceipt,
  maxAgeDays = 365,
): boolean {
  if (!receipt.updatedAt) return true;
  const updated = new Date(receipt.updatedAt).getTime();
  const now = Date.now();
  const maxAgeMs = maxAgeDays * 86400 * 1000;
  return now - updated > maxAgeMs;
}
