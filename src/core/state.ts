import type {
  ConsentChoices,
  ConsentConfig,
  ConsentReceipt,
  ConsentState,
} from "./types.js";

export class StateManager {
  private state: ConsentState = {
    initialized: false,
    policyVersion: "",
    locale: "es",
    receipt: null,
    choices: {},
  };

  private config: ConsentConfig | null = null;

  init(
    config: ConsentConfig,
    choices: ConsentChoices,
    receipt: ConsentReceipt | null,
  ): void {
    this.config = config;
    this.state = {
      initialized: true,
      policyVersion: config.policyVersion,
      locale: config.locale?.default || "es",
      receipt,
      choices,
    };
  }

  getConfig(): ConsentConfig | null {
    return this.config;
  }

  getState(): ConsentState {
    return { ...this.state };
  }

  getChoices(): ConsentChoices {
    return { ...this.state.choices };
  }

  getReceipt(): ConsentReceipt | null {
    return this.state.receipt;
  }

  hasCategory(category: string): boolean {
    return this.state.choices[category] === true;
  }

  hasService(serviceId: string): boolean {
    if (!this.config || !this.config.services) return false;
    const service = this.config.services[serviceId];
    if (!service) return false;

    return this.hasCategory(service.category);
  }

  updateChoices(receipt: ConsentReceipt): void {
    this.state.receipt = receipt;
    this.state.choices = { ...receipt.choices };
  }

  clearChoices(): void {
    if (!this.config) return;
    const resetChoices: ConsentChoices = {};
    for (const [catId, catConfig] of Object.entries(this.config.categories)) {
      resetChoices[catId] = catConfig.required === true;
    }
    this.state.choices = resetChoices;
    this.state.receipt = null;
  }
}
