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
        locale: {
          default: "es",
          autoDetect: true,
          supported: ["es", "en", "ca", "eu", "gl"],
        },
        translations: {
          en: {
            policy: {
              privacyUrl: "/en/privacy-policy",
              cookiesUrl: "/en/cookie-policy",
            },
            ui: {
              banner: {
                title: "Your privacy, your choice",
                accept: "Accept all",
              },
              floatingBadge: {
                label: "Cookies",
                tooltip: "Cookie settings",
              },
            },
            categories: {
              analytics: {
                label: "Usage Analytics",
                description: "Allows us to understand how users interact with our site.",
              },
            },
          },
        },
        ui: {
          floatingBadge: {
            enabled: true,
            position: "bottom-left",
            icon: "cookie",
            label: "Cookies",
          },
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
            cookies: [
              { name: "_ga" },
              { name: "_ga_*" },
              { name: "_gid" },
            ],
            storageKeys: ["_ga*", "_gid*"],
          },
          youtube: {
            category: "marketing",
            label: "YouTube Embed",
            provider: "Google",
            storageKeys: ["yt-*", "YSC*"],
          },
        },
      });
    }),
  ],
};
