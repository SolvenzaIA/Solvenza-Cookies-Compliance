import {
  Consent
} from "../chunk-FCLZMGSN.js";
import "../chunk-6BS5OK6D.js";
import {
  __decorateElement,
  __decoratorStart,
  __runInitializers,
  __spreadProps,
  __spreadValues
} from "../chunk-63YYRFC3.js";

// src/wrappers/angular.ts
import {
  Directive,
  Component,
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
  /**
   * Check if Global Privacy Control (GPC) signal is active.
   */
  isGpcActive() {
    return Consent.isGpcActive();
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
  renderPolicyHtml(options) {
    return Consent.renderPolicyHtml(options);
  }
  renderLegalNoticeHtml(options) {
    return Consent.renderLegalNoticeHtml(options);
  }
  renderPrivacyPolicyHtml(options) {
    return Consent.renderPrivacyPolicyHtml(options);
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
var _options_dec, _view_dec, _CookiePolicyComponent_decorators, _init3;
_CookiePolicyComponent_decorators = [Component({
  selector: "solvenza-cookie-policy",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _view_dec = [Input()], _options_dec = [Input()];
var CookiePolicyComponent = class {
  constructor() {
    this.view = __runInitializers(_init3, 8, this, "full"), __runInitializers(_init3, 11, this);
    this.options = __runInitializers(_init3, 12, this), __runInitializers(_init3, 15, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderPolicyHtml(__spreadProps(__spreadValues({}, this.options), {
        view: this.view,
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init3 = __decoratorStart(null);
__decorateElement(_init3, 5, "view", _view_dec, CookiePolicyComponent);
__decorateElement(_init3, 5, "options", _options_dec, CookiePolicyComponent);
CookiePolicyComponent = __decorateElement(_init3, 0, "CookiePolicyComponent", _CookiePolicyComponent_decorators, CookiePolicyComponent);
__runInitializers(_init3, 1, CookiePolicyComponent);
var _options_dec2, _LegalNoticeComponent_decorators, _init4;
_LegalNoticeComponent_decorators = [Component({
  selector: "solvenza-legal-notice",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _options_dec2 = [Input()];
var LegalNoticeComponent = class {
  constructor() {
    this.options = __runInitializers(_init4, 8, this), __runInitializers(_init4, 11, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderLegalNoticeHtml(__spreadProps(__spreadValues({}, this.options), {
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init4 = __decoratorStart(null);
__decorateElement(_init4, 5, "options", _options_dec2, LegalNoticeComponent);
LegalNoticeComponent = __decorateElement(_init4, 0, "LegalNoticeComponent", _LegalNoticeComponent_decorators, LegalNoticeComponent);
__runInitializers(_init4, 1, LegalNoticeComponent);
var _options_dec3, _PrivacyPolicyComponent_decorators, _init5;
_PrivacyPolicyComponent_decorators = [Component({
  selector: "solvenza-privacy-policy",
  standalone: true,
  template: `<div [innerHTML]="renderedHtml"></div>`
})], _options_dec3 = [Input()];
var PrivacyPolicyComponent = class {
  constructor() {
    this.options = __runInitializers(_init5, 8, this), __runInitializers(_init5, 11, this);
    this.renderedHtml = "";
  }
  ngOnInit() {
    this.render();
    Consent.on("ready", () => this.render());
    Consent.on("locale:changed", () => this.render());
  }
  ngOnChanges(_changes) {
    this.render();
  }
  render() {
    var _a;
    try {
      this.renderedHtml = Consent.renderPrivacyPolicyHtml(__spreadProps(__spreadValues({}, this.options), {
        locale: ((_a = this.options) == null ? void 0 : _a.locale) || Consent.getLocale()
      }));
    } catch (e) {
      this.renderedHtml = "";
    }
  }
};
_init5 = __decoratorStart(null);
__decorateElement(_init5, 5, "options", _options_dec3, PrivacyPolicyComponent);
PrivacyPolicyComponent = __decorateElement(_init5, 0, "PrivacyPolicyComponent", _PrivacyPolicyComponent_decorators, PrivacyPolicyComponent);
__runInitializers(_init5, 1, PrivacyPolicyComponent);
export {
  ConsentGateDirective,
  ConsentService,
  CookiePolicyComponent,
  LegalNoticeComponent,
  PrivacyPolicyComponent
};
//# sourceMappingURL=angular.js.map