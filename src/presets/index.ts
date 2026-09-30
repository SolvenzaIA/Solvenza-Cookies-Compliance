import type { ConsentConfig, ServiceConfig, ServicePreset } from "../core/types.js";
import { SERVICE_PRESETS, type KnownPresetId } from "./presets-catalog.js";

export { SERVICE_PRESETS, type KnownPresetId, type ServicePreset };

/**
 * Check if a preset exists in the catalog.
 */
export function hasPreset(presetId: string): boolean {
  return Object.prototype.hasOwnProperty.call(SERVICE_PRESETS, presetId);
}

/**
 * Retrieve a service preset by identifier, optionally applying custom overrides.
 *
 * @param presetId - Identifier of the preset (e.g. 'ga4', 'meta_pixel', 'hotjar')
 * @param overrides - Optional overrides to customize category, label, cookies, etc.
 * @returns Complete ServiceConfig ready for ConsentConfig.services
 *
 * @example
 * ```ts
 * const ga4Service = getPreset('ga4');
 * const customPosthog = getPreset('posthog', { label: 'Internal Product Metrics' });
 * ```
 */
export function getPreset(
  presetId: KnownPresetId,
  overrides?: Partial<ServiceConfig>,
): ServiceConfig {
  const preset = SERVICE_PRESETS[presetId];
  if (!preset) {
    throw new Error(
      `[ConsentSDK] Unknown service preset: '${presetId}'. Available presets: ${Object.keys(
        SERVICE_PRESETS,
      ).join(", ")}`,
    );
  }

  const base: ServiceConfig = {
    category: preset.category,
    label: preset.label,
    provider: preset.provider,
    policyUrl: preset.policyUrl,
    description: preset.description,
    cookies: preset.cookies ? [...preset.cookies] : undefined,
    storageKeys: preset.storageKeys ? [...preset.storageKeys] : undefined,
    localStorage: preset.localStorage ? [...preset.localStorage] : undefined,
    sessionStorage: preset.sessionStorage ? [...preset.sessionStorage] : undefined,
  };

  if (!overrides) {
    return base;
  }

  return {
    ...base,
    ...overrides,
    cookies: overrides.cookies || base.cookies,
    storageKeys: overrides.storageKeys || base.storageKeys,
    localStorage: overrides.localStorage || base.localStorage,
    sessionStorage: overrides.sessionStorage || base.sessionStorage,
  };
}

/**
 * Define multiple services using preset shorthand, preset IDs, or full custom configurations.
 *
 * @example
 * ```ts
 * const services = defineServices({
 *   ga4: 'ga4',
 *   facebook: 'meta_pixel',
 *   hotjar: { preset: 'hotjar', category: 'analytics' },
 *   customApi: { category: 'necessary', label: 'Custom Auth API' }
 * });
 * ```
 */
export function defineServices(
  definitions: Record<string, KnownPresetId | (Partial<ServiceConfig> & { preset?: string })>,
): Record<string, ServiceConfig> {
  const result: Record<string, ServiceConfig> = {};

  for (const [key, def] of Object.entries(definitions)) {
    if (typeof def === "string") {
      result[key] = getPreset(def);
    } else if (def && typeof def === "object") {
      if (def.preset) {
        const { preset, ...overrides } = def;
        result[key] = getPreset(preset, overrides);
      } else if (hasPreset(key)) {
        result[key] = getPreset(key, def);
      } else {
        result[key] = def as ServiceConfig;
      }
    }
  }

  return result;
}

/**
 * Resolve any preset references in a ConsentConfig object in-place or return a new hydrated config.
 * Hydrates services configured with `"preset": "ga4"` or matching known preset keys.
 */
export function resolveConfigPresets(config: ConsentConfig): ConsentConfig {
  if (!config || !config.services || typeof config.services !== "object") {
    return config;
  }

  const hydratedServices: Record<string, ServiceConfig> = {};

  for (const [serviceKey, serviceDef] of Object.entries(config.services)) {
    if (!serviceDef || typeof serviceDef !== "object") {
      hydratedServices[serviceKey] = serviceDef;
      continue;
    }

    const presetName = serviceDef.preset || (hasPreset(serviceKey) && !serviceDef.category ? serviceKey : undefined);

    if (presetName && hasPreset(presetName)) {
      const preset = SERVICE_PRESETS[presetName];
      hydratedServices[serviceKey] = {
        category: serviceDef.category || preset.category,
        label: serviceDef.label || preset.label,
        provider: serviceDef.provider || preset.provider,
        policyUrl: serviceDef.policyUrl || preset.policyUrl,
        description: serviceDef.description || preset.description,
        cookies: serviceDef.cookies || (preset.cookies ? [...preset.cookies] : undefined),
        storageKeys: serviceDef.storageKeys || (preset.storageKeys ? [...preset.storageKeys] : undefined),
        localStorage: serviceDef.localStorage || (preset.localStorage ? [...preset.localStorage] : undefined),
        sessionStorage: serviceDef.sessionStorage || (preset.sessionStorage ? [...preset.sessionStorage] : undefined),
        ...serviceDef,
      };
    } else {
      hydratedServices[serviceKey] = serviceDef;
    }
  }

  return {
    ...config,
    services: hydratedServices,
  };
}
