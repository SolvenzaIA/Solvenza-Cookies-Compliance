import { Component, OnInit, OnDestroy, signal, inject } from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";
import { CookiePolicyComponent } from "./pages/cookie-policy.component";

interface AppTexts {
  title: string;
  subtitle: string;
  demo: string;
  policy: string;
  analyticsActive: string;
  analyticsBlocked: string;
  videoBlocked: string;
  videoDesc: string;
  privacySettings: string;
  withdraw: string;
}

const APP_TRANSLATIONS: Record<string, AppTexts> = {
  es: {
    title: "Integración Angular 20 Standalone",
    subtitle: "Servicio inyectable reactivo con Angular Signals & @if control flow",
    demo: "Demostración",
    policy: "Política de Cookies",
    analyticsActive: "Analítica: Activa",
    analyticsBlocked: "Analítica: Bloqueada",
    videoBlocked: "Vídeo Bloqueado por Privacidad",
    videoDesc: "Autoriza la categoría de Marketing para reproducciones externas.",
    privacySettings: "Ajustes de Privacidad",
    withdraw: "Revocar",
  },
  en: {
    title: "Angular 20 Standalone Integration",
    subtitle: "Reactive injectable service with Angular Signals & @if control flow",
    demo: "Demo",
    policy: "Cookie Policy",
    analyticsActive: "Analytics: Active",
    analyticsBlocked: "Analytics: Blocked",
    videoBlocked: "Video Blocked by Privacy",
    videoDesc: "Authorize Marketing category for external video playback.",
    privacySettings: "Privacy Settings",
    withdraw: "Withdraw",
  },
  ca: {
    title: "Integració Angular 20 Standalone",
    subtitle: "Servei injectable reactiu amb Angular Signals & @if control flow",
    demo: "Demostració",
    policy: "Política de Galetes",
    analyticsActive: "Analítica: Activa",
    analyticsBlocked: "Analítica: Bloquejada",
    videoBlocked: "Vídeo Bloquejat per Privacitat",
    videoDesc: "Autoritza la categoria de Màrqueting per a reproduccions externes.",
    privacySettings: "Ajustos de Privacitat",
    withdraw: "Revocar",
  },
  eu: {
    title: "Angular 20 Standalone Integrazioa",
    subtitle: "Zerbitzu injektagarri erreaktiboa Angular Signals & @if fluxuarekin",
    demo: "Erakustaldia",
    policy: "Cookie Politika",
    analyticsActive: "Analitika: Aktiboa",
    analyticsBlocked: "Analitika: Blokeatuta",
    videoBlocked: "Bideoa Pribatutasunagatik Blokeatuta",
    videoDesc: "Baimendu Marketin kategoria kanpoko bideoetarako.",
    privacySettings: "Pribatutasun Ezarpenak",
    withdraw: "Baliogabetu",
  },
  gl: {
    title: "Integración Angular 20 Standalone",
    subtitle: "Servizo inxectable reactivo con Angular Signals & @if control flow",
    demo: "Demostración",
    policy: "Política de Cookies",
    analyticsActive: "Analítica: Activa",
    analyticsBlocked: "Analítica: Bloqueada",
    videoBlocked: "Vídeo Bloqueado por Privacidade",
    videoDesc: "Autoriza a categoría de Marketing para reproducións externas.",
    privacySettings: "Axustes de Privacidade",
    withdraw: "Revogar",
  },
};

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CookiePolicyComponent],
  template: `
    <div style="min-height: 100vh; background: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <header style="border-bottom: 1px solid #e2e8f0; background: #ffffff; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #dd0031, #c3002f); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700;">
            A
          </div>
          <span style="font-weight: 700; font-size: 1.05rem;">Solvenza Cookies Compliance (Angular 20)</span>
        </div>

        <div style="display: flex; align-items: center; gap: 1.25rem;">
          <!-- Selector de Idioma de la Aplicación Padre -->
          <div style="display: flex; align-items: center; gap: 0.35rem; background: #f1f5f9; padding: 4px 6px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; padding-left: 4px; padding-right: 2px;">🌐 i18n:</span>
            @for (lang of supportedLangs; track lang) {
              <button
                type="button"
                (click)="switchLanguage(lang)"
                [style.background]="currentLang() === lang ? '#0f172a' : 'transparent'"
                [style.color]="currentLang() === lang ? '#ffffff' : '#475569'"
                style="border: none; padding: 0.3rem 0.65rem; border-radius: 6px; font-weight: 700; font-size: 0.78rem; cursor: pointer; transition: all 0.15s ease;">
                {{ lang.toUpperCase() }}
              </button>
            }
          </div>

          <nav style="display: flex; gap: 0.4rem;">
            <button (click)="activeTab.set('demo')" [style.background]="activeTab() === 'demo' ? '#f1f5f9' : 'transparent'" style="border: none; padding: 0.5rem 0.9rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
              {{ texts().demo }}
            </button>
            <button (click)="activeTab.set('policy')" [style.background]="activeTab() === 'policy' ? '#f1f5f9' : 'transparent'" style="border: none; padding: 0.5rem 0.9rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
              {{ texts().policy }}
            </button>
          </nav>
        </div>
      </header>

      <main style="max-width: 760px; margin: 2.5rem auto; padding: 0 1.5rem;">
        @if (activeTab() === 'demo') {
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <div>
                <h1 style="font-size: 1.5rem; font-weight: 700; margin: 0;">{{ texts().title }}</h1>
                <p style="margin: 0.2rem 0 0 0; color: #64748b; font-size: 0.92rem;">{{ texts().subtitle }}</p>
              </div>
              <div [style.background]="isAnalyticsAllowed() ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'"
                   [style.color]="isAnalyticsAllowed() ? '#059669' : '#dc2626'"
                   style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.9rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 600;">
                <span [style.background]="isAnalyticsAllowed() ? '#10b981' : '#ef4444'" style="width: 7px; height: 7px; border-radius: 50%;"></span>
                {{ isAnalyticsAllowed() ? texts().analyticsActive : texts().analyticsBlocked }}
              </div>
            </div>

            <div style="position: relative; border-radius: 16px; overflow: hidden; background: #090d16; aspect-ratio: 16/9; width: 100%; border: 1px solid #e2e8f0;">
              @if (isMarketingAllowed()) {
                <iframe width="100%" height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                        title="YouTube Video" style="border: 0;">
                </iframe>
              } @else {
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; text-align: center; padding: 2rem;">
                  <h4 style="margin: 0 0 0.4rem 0;">{{ texts().videoBlocked }}</h4>
                  <p style="margin: 0; color: #94a3b8; font-size: 0.88rem; max-width: 360px;">{{ texts().videoDesc }}</p>
                </div>
              }
            </div>

            <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end;">
              <button (click)="openPreferences()" style="padding: 0.65rem 1.3rem; border-radius: 10px; border: none; background: #0f172a; color: #ffffff; font-weight: 600; cursor: pointer;">
                {{ texts().privacySettings }}
              </button>
              <button (click)="withdrawConsent()" style="padding: 0.65rem 1.1rem; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #ef4444; font-weight: 600; cursor: pointer;">
                {{ texts().withdraw }}
              </button>
            </div>
          </div>
        } @else {
          <app-cookie-policy></app-cookie-policy>
        }
      </main>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  activeTab = signal<"demo" | "policy">("demo");
  isAnalyticsAllowed = signal<boolean>(false);
  isMarketingAllowed = signal<boolean>(false);
  currentLang = signal<string>("es");
  supportedLangs = ["es", "en", "ca", "eu", "gl"];

  private consentService = inject(ConsentService);
  private unsubscribeConsent: (() => void) | null = null;
  private unsubscribeLocale: (() => void) | null = null;

  texts() {
    return APP_TRANSLATIONS[this.currentLang()] || APP_TRANSLATIONS["es"];
  }

  ngOnInit() {
    this.currentLang.set(this.consentService.getLocale() || "es");
    this.updateStates();

    this.unsubscribeConsent = this.consentService.on("consent:changed", () => {
      this.updateStates();
    });

    this.unsubscribeLocale = this.consentService.on("locale:changed", ({ locale }) => {
      this.currentLang.set(locale);
    });
  }

  ngOnDestroy() {
    this.unsubscribeConsent?.();
    this.unsubscribeLocale?.();
  }

  switchLanguage(lang: string) {
    this.currentLang.set(lang);
    document.documentElement.lang = lang;
    this.consentService.syncLocale(lang);
  }

  private updateStates() {
    this.isAnalyticsAllowed.set(this.consentService.has("analytics"));
    this.isMarketingAllowed.set(this.consentService.has("marketing"));
  }

  openPreferences() {
    this.consentService.openPreferences();
  }

  withdrawConsent() {
    this.consentService.withdraw();
  }
}
