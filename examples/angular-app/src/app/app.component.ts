import { Component, OnInit, OnDestroy, signal, inject } from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";
import { CookiePolicyComponent } from "./pages/cookie-policy.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CookiePolicyComponent],
  template: `
    <div style="min-height: 100vh; background: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
      <header style="border-bottom: 1px solid #e2e8f0; background: #ffffff; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center; gap: 0.8rem;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, #dd0031, #c3002f); display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700;">
            A
          </div>
          <span style="font-weight: 700; font-size: 1.05rem;">Solvenza Cookies Compliance (Angular 20)</span>
        </div>

        <nav style="display: flex; gap: 0.4rem;">
          <button (click)="activeTab.set('demo')" [style.background]="activeTab() === 'demo' ? '#f1f5f9' : 'transparent'" style="border: none; padding: 0.5rem 0.9rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
            Demostración
          </button>
          <button (click)="activeTab.set('policy')" [style.background]="activeTab() === 'policy' ? '#f1f5f9' : 'transparent'" style="border: none; padding: 0.5rem 0.9rem; border-radius: 8px; font-weight: 600; cursor: pointer;">
            Política de Cookies
          </button>
        </nav>
      </header>

      <main style="max-width: 760px; margin: 2.5rem auto; padding: 0 1.5rem;">
        @if (activeTab() === 'demo') {
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
              <div>
                <h1 style="font-size: 1.5rem; font-weight: 700; margin: 0;">Integración Angular 20 Standalone</h1>
                <p style="margin: 0.2rem 0 0 0; color: #64748b; font-size: 0.92rem;">Servicio inyectable reactivo con Angular Signals &amp; &#64;if control flow</p>
              </div>
              <div [style.background]="isAnalyticsAllowed() ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'"
                   [style.color]="isAnalyticsAllowed() ? '#059669' : '#dc2626'"
                   style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.9rem; border-radius: 9999px; font-size: 0.82rem; font-weight: 600;">
                <span [style.background]="isAnalyticsAllowed() ? '#10b981' : '#ef4444'" style="width: 7px; height: 7px; border-radius: 50%;"></span>
                Analítica: {{ isAnalyticsAllowed() ? 'Activa' : 'Bloqueada' }}
              </div>
            </div>

            <div style="position: relative; border-radius: 16px; overflow: hidden; background: #090d16; aspect-ratio: 16/9; width: 100%; border: 1px solid #e2e8f0;">
              @if (isMarketingAllowed()) {
                <iframe width="100%" height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
                        title="Vídeo de YouTube" style="border: 0;">
                </iframe>
              } @else {
                <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; text-align: center; padding: 2rem;">
                  <h4 style="margin: 0 0 0.4rem 0;">Vídeo Bloqueado por Privacidad</h4>
                  <p style="margin: 0; color: #94a3b8; font-size: 0.88rem; max-width: 360px;">Autoriza la categoría de Marketing para reproducciones externas.</p>
                </div>
              }
            </div>

            <div style="margin-top: 2rem; display: flex; gap: 0.8rem; justify-content: flex-end;">
              <button (click)="openPreferences()" style="padding: 0.65rem 1.3rem; border-radius: 10px; border: none; background: #0f172a; color: #ffffff; font-weight: 600; cursor: pointer;">
                Ajustes de Privacidad
              </button>
              <button (click)="withdrawConsent()" style="padding: 0.65rem 1.1rem; border-radius: 10px; border: 1px solid #cbd5e1; background: #ffffff; color: #ef4444; font-weight: 600; cursor: pointer;">
                Revocar
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

  private consentService = inject(ConsentService);
  private unsubscribe: (() => void) | null = null;

  ngOnInit() {
    this.updateStates();

    this.unsubscribe = this.consentService.on("consent:changed", () => {
      this.updateStates();
    });
  }

  ngOnDestroy() {
    this.unsubscribe?.();
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
