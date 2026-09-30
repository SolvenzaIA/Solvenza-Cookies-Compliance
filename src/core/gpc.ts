import type { ConsentChoices, ConsentConfig, GpcConfig } from "./types.js";

/**
 * Detect Global Privacy Control (GPC) or Do Not Track (DNT) signal from the browser environment.
 * Compliant with W3C Global Privacy Control specification and privacy standards.
 *
 * @returns boolean indicating if a privacy signal is active
 */
export function detectGpcSignal(): boolean {
  if (typeof window === "undefined" && typeof navigator === "undefined" && typeof globalThis === "undefined") {
    return false;
  }

  const nav = typeof navigator !== "undefined" ? (navigator as any) : null;
  const win = typeof window !== "undefined" ? (window as any) : null;
  const glob = typeof globalThis !== "undefined" ? (globalThis as any) : null;

  // 1. Check official Global Privacy Control (GPC) property
  if (
    nav?.globalPrivacyControl === true ||
    win?.globalPrivacyControl === true ||
    win?.navigator?.globalPrivacyControl === true ||
    glob?.navigator?.globalPrivacyControl === true ||
    glob?.globalPrivacyControl === true
  ) {
    return true;
  }

  // 2. Check Do Not Track (DNT) standard headers / browser flags as fallback
  if (
    nav?.doNotTrack === "1" ||
    win?.doNotTrack === "1" ||
    win?.navigator?.doNotTrack === "1" ||
    glob?.navigator?.doNotTrack === "1" ||
    glob?.doNotTrack === "1" ||
    nav?.msDoNotTrack === "1" ||
    (win?.external && typeof win.external.msTrackingProtectionEnabled === "function" && win.external.msTrackingProtectionEnabled())
  ) {
    return true;
  }

  return false;
}

/**
 * Resolve GPC configuration options with defaults.
 */
export function resolveGpcConfig(config?: ConsentConfig): Required<GpcConfig> {
  const gpc = config?.gpc;
  return {
    enabled: gpc?.enabled !== false,
    respectSignal: gpc?.respectSignal !== false,
    mode: gpc?.mode || "auto-reject",
    categories: gpc?.categories || [],
    noticeText: gpc?.noticeText || "Señal de Privacidad Global (GPC) detectada: cookies no esenciales desactivadas.",
  };
}

/**
 * Calculate the resulting consent choices when applying a GPC signal.
 */
export function applyGpcChoices(
  config: ConsentConfig,
  baseChoices?: ConsentChoices,
): ConsentChoices {
  const result: ConsentChoices = { ...(baseChoices || {}) };
  const gpcOptions = resolveGpcConfig(config);

  for (const [catId, catConfig] of Object.entries(config.categories)) {
    if (catConfig.required || catId === "necessary") {
      result[catId] = true;
    } else {
      if (
        gpcOptions.categories.length === 0 ||
        gpcOptions.categories.includes(catId)
      ) {
        result[catId] = false;
      }
    }
  }

  return result;
}
