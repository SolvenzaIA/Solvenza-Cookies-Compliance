import { OnInit, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { C as ConsentConfig, b as ConsentState, c as ConsentChoices, S as StoragePurgeReport, d as ConsentEvent, e as ConsentEventHandler } from '../types-D0UymOJZ.cjs';

/**
 * Angular Consent Service injectable helper.
 * Compatible with standalone, NgModule, AOT, and SSR Angular applications.
 */
declare class ConsentService {
    init(config: ConsentConfig | string): Promise<void>;
    getConsent(): ConsentState;
    getLocale(): string;
    setLocale(locale: string): void;
    /**
     * Synchronize parent Angular application i18n state (@ngx-translate, Transloco, or custom)
     * with the cookie compliance engine without boilerplate.
     */
    syncLocale(locale: string): void;
    /**
     * Check if Global Privacy Control (GPC) signal is active.
     */
    isGpcActive(): boolean;
    has(category: string): boolean;
    hasService(serviceId: string): boolean;
    acceptAll(): void;
    rejectAll(): void;
    setPreferences(choices: ConsentChoices): void;
    openPreferences(): void;
    withdraw(): void;
    purgeCategory(category: string): StoragePurgeReport;
    purgeStorage(categoryOrService?: string): StoragePurgeReport[];
    on<E extends ConsentEvent>(event: E, handler: ConsentEventHandler<E>): () => void;
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
declare class ConsentGateDirective implements OnInit, OnDestroy {
    private templateRef;
    private viewContainer;
    category?: string;
    service?: string;
    elseTemplate?: TemplateRef<any>;
    private hasView;
    private hasElseView;
    private unsubs;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateView;
}

export { ConsentGateDirective, ConsentService };
