import type { ConsentConfig } from "./types.js";

export class ConfigValidationError extends Error {
  constructor(message: string) {
    super(`[ConsentSDK Config Error] ${message}`);
    this.name = "ConfigValidationError";
  }
}

export function validateConfig(config: ConsentConfig): void {
  if (!config) {
    throw new ConfigValidationError("Configuration object is null or undefined.");
  }

  if (typeof config.schemaVersion !== "number" || config.schemaVersion < 1) {
    throw new ConfigValidationError("Invalid or missing 'schemaVersion'. Expected integer >= 1.");
  }

  if (!config.policyVersion || typeof config.policyVersion !== "string") {
    throw new ConfigValidationError("Invalid or missing 'policyVersion'. String required.");
  }

  if (!config.categories || typeof config.categories !== "object") {
    throw new ConfigValidationError("Missing 'categories' map in configuration.");
  }

  const categoryKeys = Object.keys(config.categories);
  if (categoryKeys.length === 0) {
    throw new ConfigValidationError("At least one category must be defined in 'categories'.");
  }

  // Ensure necessary category exists and is required
  const necessaryCategory = config.categories["necessary"];
  if (!necessaryCategory) {
    throw new ConfigValidationError("Category 'necessary' must be defined.");
  }
  if (necessaryCategory.required !== true) {
    throw new ConfigValidationError("Category 'necessary' must have 'required: true'.");
  }

  // Legal guardrail (AEPD): Optional categories MUST NOT be pre-selected (default = true)
  for (const [catId, catConfig] of Object.entries(config.categories)) {
    if (catId !== "necessary" && !catConfig.required) {
      if (catConfig.default === true) {
        throw new ConfigValidationError(
          `Legal violation (AEPD): Optional category '${catId}' cannot have default: true. All optional categories must be opt-in (default: false).`
        );
      }
    }
  }

  // Validate services if present
  if (config.services && typeof config.services === "object") {
    for (const [serviceId, serviceConfig] of Object.entries(config.services)) {
      if (!serviceConfig.category) {
        throw new ConfigValidationError(
          `Service '${serviceId}' missing 'category' reference.`
        );
      }
      if (!config.categories[serviceConfig.category]) {
        throw new ConfigValidationError(
          `Service '${serviceId}' references non-existent category '${serviceConfig.category}'.`
        );
      }
    }
  }
}
