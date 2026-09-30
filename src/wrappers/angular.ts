import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  Injectable,
} from "@angular/core";
import { Consent } from "../core/consent-engine.js";
import type {
  ConsentChoices,
  ConsentConfig,
  ConsentEvent,
  ConsentEventHandler,
  ConsentState,
  StoragePurgeReport,
} from "../core/types.js";

/**
 * Angular Consent Service injectable helper.
 * Compatible with standalone, NgModule, AOT, and SSR Angular applications.
 */
@Injectable({
  providedIn: "root",
})
export class ConsentService {
  async init(config: ConsentConfig | string): Promise<void> {
    return Consent.init(config);
  }

  getConsent(): ConsentState {
    return Consent.getConsent();
  }

  getLocale(): string {
    return Consent.getLocale();
  }

  setLocale(locale: string): void {
    Consent.setLocale(locale);
  }

  /**
   * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
   * with the cookie compliance engine without boilerplate.
   */
  syncLocale(locale: string): void {
    Consent.syncLocale(locale);
  }

  has(category: string): boolean {
    return Consent.has(category);
  }

  hasService(serviceId: string): boolean {
    return Consent.hasService(serviceId);
  }

  acceptAll(): void {
    Consent.acceptAll();
  }

  rejectAll(): void {
    Consent.rejectAll();
  }

  setPreferences(choices: ConsentChoices): void {
    Consent.setPreferences(choices);
  }

  openPreferences(): void {
    Consent.openPreferences();
  }

  withdraw(): void {
    Consent.withdraw();
  }

  purgeCategory(category: string): StoragePurgeReport {
    return Consent.purgeCategory(category);
  }

  purgeStorage(categoryOrService?: string): StoragePurgeReport[] {
    return Consent.purgeStorage(categoryOrService);
  }

  on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void {
    return Consent.on(event, handler);
  }
}

/**
 * Angular Structural Directive to conditionally render elements based on consent.
 *
 * @example
 * ```html
 * <!-- Render video only if marketing consent is granted -->
 * <div *consentGate="'marketing'; else videoBlocked">
 *   <iframe src="https://www.youtube.com/embed/..." />
 * </div>
 *
 * <ng-template #videoBlocked>
 *   <div class="blocked-alert">
 *     <p>Este vídeo requiere cookies de marketing.</p>
 *     <button (click)="openPreferences()">Configurar cookies</button>
 *   </div>
 * </ng-template>
 * ```
 */
@Directive({
  selector: "[consentGate]",
  standalone: true,
})
export class ConsentGateDirective implements OnInit, OnDestroy {
  @Input("consentGate") category?: string;
  @Input("consentGateService") service?: string;
  @Input("consentGateElse") elseTemplate?: TemplateRef<any>;

  private hasView = false;
  private hasElseView = false;
  private unsubs: Array<() => void> = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    const update = () => this.updateView();
    update();

    this.unsubs = [
      Consent.on("consent:changed", update),
      Consent.on("consent:accepted", update),
      Consent.on("consent:rejected", update),
      Consent.on("consent:withdrawn", update),
      Consent.on("ready", update),
    ];
  }

  ngOnDestroy(): void {
    this.unsubs.forEach((u) => u());
  }

  private updateView(): void {
    const isAllowed = this.category
      ? Consent.has(this.category)
      : this.service
      ? Consent.hasService(this.service)
      : true;

    if (isAllowed) {
      if (!this.hasView) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
        this.hasElseView = false;
      }
    } else {
      if (this.hasView || (!this.hasElseView && this.elseTemplate)) {
        this.viewContainer.clear();
        this.hasView = false;
        if (this.elseTemplate) {
          this.viewContainer.createEmbeddedView(this.elseTemplate);
          this.hasElseView = true;
        }
      }
    }
  }
}
