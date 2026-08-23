import { ApplicationConfig, provideAppInitializer, inject } from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ConsentService, useClass: ConsentService },
    provideAppInitializer(async () => {
      const consentService = inject(ConsentService);
      await consentService.init({
        schemaVersion: 1,
        policyVersion: "2026-08-23",
        policy: {
          privacyUrl: "/politica-privacidad",
          cookiesUrl: "/politica-cookies",
        },
        categories: {
          necessary: {
            required: true,
            label: "Necesarias",
            description: "Imprescindibles para el correcto funcionamiento del sitio.",
          },
          analytics: {
            required: false,
            label: "Analítica de uso",
            description: "Nos permite entender cómo interactúan los usuarios con la web.",
          },
          marketing: {
            required: false,
            label: "Marketing y Contenido Externo",
            description: "Permite la reproducción de vídeos y personalización.",
          },
        },
        services: {
          ga4: {
            category: "analytics",
            label: "Google Analytics 4",
            provider: "Google",
          },
          youtube: {
            category: "marketing",
            label: "YouTube Embed",
            provider: "Google",
          },
        },
      });
    }),
  ],
};
