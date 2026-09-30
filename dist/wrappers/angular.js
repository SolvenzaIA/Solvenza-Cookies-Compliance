import {
  Consent
} from "../chunk-UQJNVEOL.js";
import "../chunk-6BS5OK6D.js";
import {
  __decorateElement,
  __decoratorStart,
  __runInitializers
} from "../chunk-63YYRFC3.js";

// src/wrappers/angular.ts
import {
  Directive,
  Input,
  Injectable
} from "@angular/core";
var _ConsentService_decorators, _init;
_ConsentService_decorators = [Injectable({
  providedIn: "root"
})];
var ConsentService = class {
  async init(config) {
    return Consent.init(config);
  }
  getConsent() {
    return Consent.getConsent();
  }
  getLocale() {
    return Consent.getLocale();
  }
  setLocale(locale) {
    Consent.setLocale(locale);
  }
  /**
   * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
   * with the cookie compliance engine without boilerplate.
   */
  syncLocale(locale) {
    Consent.syncLocale(locale);
  }
  has(category) {
    return Consent.has(category);
  }
  hasService(serviceId) {
    return Consent.hasService(serviceId);
  }
  acceptAll() {
    Consent.acceptAll();
  }
  rejectAll() {
    Consent.rejectAll();
  }
  setPreferences(choices) {
    Consent.setPreferences(choices);
  }
  openPreferences() {
    Consent.openPreferences();
  }
  withdraw() {
    Consent.withdraw();
  }
  purgeCategory(category) {
    return Consent.purgeCategory(category);
  }
  purgeStorage(categoryOrService) {
    return Consent.purgeStorage(categoryOrService);
  }
  on(event, handler) {
    return Consent.on(event, handler);
  }
};
_init = __decoratorStart(null);
ConsentService = __decorateElement(_init, 0, "ConsentService", _ConsentService_decorators, ConsentService);
__runInitializers(_init, 1, ConsentService);
var _elseTemplate_dec, _service_dec, _category_dec, _ConsentGateDirective_decorators, _init2;
_ConsentGateDirective_decorators = [Directive({
  selector: "[consentGate]",
  standalone: true
})], _category_dec = [Input("consentGate")], _service_dec = [Input("consentGateService")], _elseTemplate_dec = [Input("consentGateElse")];
var ConsentGateDirective = class {
  constructor(templateRef, viewContainer) {
    this.templateRef = templateRef;
    this.viewContainer = viewContainer;
    this.category = __runInitializers(_init2, 8, this), __runInitializers(_init2, 11, this);
    this.service = __runInitializers(_init2, 12, this), __runInitializers(_init2, 15, this);
    this.elseTemplate = __runInitializers(_init2, 16, this), __runInitializers(_init2, 19, this);
    this.hasView = false;
    this.hasElseView = false;
    this.unsubs = [];
  }
  ngOnInit() {
    const update = () => this.updateView();
    update();
    this.unsubs = [
      Consent.on("consent:changed", update),
      Consent.on("consent:accepted", update),
      Consent.on("consent:rejected", update),
      Consent.on("consent:withdrawn", update),
      Consent.on("ready", update)
    ];
  }
  ngOnDestroy() {
    this.unsubs.forEach((u) => u());
  }
  updateView() {
    const isAllowed = this.category ? Consent.has(this.category) : this.service ? Consent.hasService(this.service) : true;
    if (isAllowed) {
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
        this.hasElseView = false;
      }
    } else {
      if (this.hasView || !this.hasElseView && this.elseTemplate) {
        this.viewContainer.clear();
        this.hasView = false;
        if (this.elseTemplate) {
          this.viewContainer.createEmbeddedView(this.elseTemplate);
          this.hasElseView = true;
        }
      }
    }
  }
};
_init2 = __decoratorStart(null);
__decorateElement(_init2, 5, "category", _category_dec, ConsentGateDirective);
__decorateElement(_init2, 5, "service", _service_dec, ConsentGateDirective);
__decorateElement(_init2, 5, "elseTemplate", _elseTemplate_dec, ConsentGateDirective);
ConsentGateDirective = __decorateElement(_init2, 0, "ConsentGateDirective", _ConsentGateDirective_decorators, ConsentGateDirective);
__runInitializers(_init2, 1, ConsentGateDirective);
export {
  ConsentGateDirective,
  ConsentService
};
//# sourceMappingURL=angular.js.map