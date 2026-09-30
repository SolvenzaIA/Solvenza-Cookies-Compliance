# Solvenza Cookies Compliance

Librería de consentimiento de cookies local-first, sin dependencias y de < 12 KB, adaptada a la normativa española y europea (LSSI art. 22.2, AEPD mayo 2024, RGPD y LOPDGDD).

[![npm version](https://img.shields.io/npm/v/@solvenza/cookies-compliance.svg)](https://www.npmjs.com/package/@solvenza/cookies-compliance)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@solvenza/cookies-compliance)](https://bundlephobia.com/package/@solvenza/cookies-compliance)
[![license](https://img.shields.io/npm/l/@solvenza/cookies-compliance)](LICENSE)

---

## Características

- **0 dependencias de runtime**: Desarrollado en Vanilla TypeScript y compilado a ES2017.
- **Local-first**: Procesa y guarda el consentimiento en el cliente sin llamadas a servidores de terceros.
- **Firma anti-manipulación**: Firmas SHA-256 en los recibos para evitar alteraciones en `document.cookie`.
- **Soporte CSP & XSS**: Inyección de estilos con `nonce` y sanitización estricta de textos y URLs.
- **AEPD 2024 Ready**: Misma prominencia visual para Aceptar/Rechazar en la primera capa y bloqueo previo estricto de scripts e iframes.
- **Multi-framework**: Soporte nativo para HTML5, React, Next.js, Angular (Signals) y WordPress.

---

## Instalación

### npm

```bash
npm install @solvenza/cookies-compliance
```

### CDN (1 sola línea)

```html
<script
  src="https://cdn.jsdelivr.net/npm/@solvenza/cookies-compliance@1/dist/consent.min.js"
  data-config="/consent.json"
></script>
```

---

## Generador rápido de configuración (CLI)

Puedes crear el archivo `consent.json` ejecutando en terminal:

```bash
npx @solvenza/cookies-compliance consent-init
```

Ejemplo de `consent.json`:

```json
{
  "schemaVersion": 1,
  "policyVersion": "2026-08-23",
  "security": {
    "secretKey": "tu_clave_secreta_sha256"
  },
  "policy": {
    "privacyUrl": "/politica-privacidad",
    "cookiesUrl": "/politica-cookies"
  },
  "ui": {
    "floatingBadge": {
      "enabled": true,
      "position": "bottom-left",
      "icon": "cookie",
      "label": "Cookies"
    }
  },
  "categories": {
    "necessary": {
      "required": true,
      "label": "Necesarias",
      "description": "Cookies imprescindibles para el funcionamiento del sitio."
    },
    "analytics": {
      "required": false,
      "label": "Analítica de uso",
      "description": "Permiten medir el uso de la web de forma agregada."
    },
    "marketing": {
      "required": false,
      "label": "Marketing y Vídeo",
      "description": "Permiten reproducir contenido de vídeo externo (YouTube)."
    }
  },
  "services": {
    "ga4": {
      "category": "analytics",
      "label": "Google Analytics 4",
      "provider": "Google"
    },
    "youtube": {
      "category": "marketing",
      "label": "YouTube Embed",
      "provider": "Google"
    }
  }
}
```

---

## Botón Flotante de Revocación Permanente (AEPD / RGPD)

De acuerdo con la **Guía de la AEPD sobre el uso de cookies**, el usuario debe tener a su disposición un mecanismo permanente y fácilmente accesible para modificar sus preferencias o **declinar/revocar el consentimiento en cualquier momento**.

Puedes activarlo directamente en `consent.json`:

```json
{
  "ui": {
    "floatingBadge": {
      "enabled": true,
      "position": "bottom-left",
      "icon": "cookie",
      "label": "Cookies",
      "showLabel": false,
      "visibility": "after-consent"
    }
  }
}
```

O de forma abreviada:

```json
{
  "ui": {
    "floatingBadge": true
  }
}
```

### Opciones de configuración:

| Parámetro    | Tipo                                                                 | Por defecto                       | Descripción                                                     |
| ------------ | -------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------- |
| `enabled`    | `boolean`                                                            | `true` (si se declara objeto)     | Activa o desactiva el widget flotante                           |
| `position`   | `"bottom-left"` \| `"bottom-right"` \| `"top-left"` \| `"top-right"` | `"bottom-left"`                   | Esquina de anclaje en pantalla                                  |
| `icon`       | `"cookie"` \| `"shield"` \| `"settings"`                             | `"cookie"`                        | Icono SVG estilizado                                            |
| `label`      | `string`                                                             | `"Cookies"`                       | Texto accesible y etiqueta en píldora                           |
| `tooltip`    | `string`                                                             | `"Configurar o declinar cookies"` | Texto descriptivo emergente al pasar el cursor (hover)          |
| `showLabel`  | `boolean`                                                            | `false`                           | Muestra la etiqueta de texto junto al icono en forma de píldora |
| `visibility` | `"after-consent"` \| `"always"`                                      | `"after-consent"`                 | Muestra el botón tras cerrar el banner o en todo momento        |

> **Ciclo de vida automático con el modal**: Para garantizar una experiencia de usuario impecable y sin elementos superpuestos, el botón flotante se oculta mientras el modal de preferencias está abierto. **En cuanto el modal se cierra** (mediante el botón 'X', clic en el backdrop, tecla Escape o al guardar la selección), **el botón flotante reaparece de inmediato**.

### API Programática:

```ts
// Mostrar u ocultar manualmente
Consent.showFloatingBadge();
Consent.hideFloatingBadge();

// Eventos
Consent.on("floating-badge:shown", () => console.log("Badge visible"));
Consent.on("floating-badge:hidden", () => console.log("Badge oculto"));

// Eventos nativos DOM (Zero-code)
document.dispatchEvent(new Event("solvenza:badge:show"));
document.dispatchEvent(new Event("solvenza:badge:hide"));
```

---

## Internacionalización y Sincronización Multilingüe (i18n)

El sistema de internacionalización (`I18nEngine`) está diseñado bajo el principio de **cero boilerplate** y **sincronización transparente con la aplicación padre**:

> [!NOTE]
> **Sin selectores invasivos en el banner**: La librería **no** incluye selectores ni desplegables de idioma dentro del banner ni del modal de preferencias. El idioma de navegación es responsabilidad exclusiva de la aplicación anfitriona (padre). El banner y el modal se adaptan y sincronizan automáticamente al idioma de la web en tiempo real.

### Mecanismos de Sincronización Automática (Zero Boilerplate)

1. **Observador Reactivo del HTML (`<html lang="...">`)**:
   - La librería observa dinámicamente mediante `MutationObserver` el atributo `lang` en `document.documentElement`.
   - Cuando tu aplicación padre cambia de idioma (ej. `document.documentElement.lang = "en"`), el banner, modal y botón flotante se traducen y renderizan de inmediato **sin requerir reinicialización ni código de pegamento**.
2. **Detección Automática por Ruta y Query Params**:
   - Detecta prefijos en la URL (como `/en/...` o `/ca/...`) o parámetros de consulta (`?lang=en`, `?locale=en`).
3. **Sincronización Directa de Estado (`Consent.syncLocale`)**:
   - Función declarativa para enlazar el estado de traducción de tu aplicación (`react-i18next`, `next-intl`, `@ngx-translate`, etc.).

### Idiomas Integrados por Defecto

El SDK incluye diccionarios oficiales para la normativa española y europea sin necesidad de configurar textos:

- **Español (`es`)** [Por defecto]
- **Inglés (`en`)**
- **Catalán (`ca`)**
- **Euskera (`eu`)**
- **Gallego (`gl`)**

### Configuración Declarativa en `consent.json`:

```json
{
  "locale": {
    "default": "es",
    "syncHtmlLang": true,
    "syncUrl": true,
    "autoDetect": true,
    "supported": ["es", "en", "ca", "eu", "gl"]
  },
  "translations": {
    "en": {
      "policy": {
        "privacyUrl": "/en/privacy-policy",
        "cookiesUrl": "/en/cookie-policy"
      },
      "ui": {
        "banner": {
          "title": "Your privacy, your choice",
          "accept": "Accept all",
          "reject": "Reject all",
          "configure": "Configure"
        },
        "preferences": {
          "title": "Privacy Preferences",
          "save": "Save preferences"
        },
        "floatingBadge": {
          "label": "Cookies",
          "tooltip": "Configure or decline cookies"
        }
      },
      "categories": {
        "analytics": {
          "label": "Usage Analytics",
          "description": "Allows aggregated performance measurement."
        }
      }
    }
  }
}
```

### Sincronización Programática:

```ts
// 1. Sincronizar el idioma desde la app padre
Consent.syncLocale("en");

// 2. Obtener idioma activo
console.log(Consent.getLocale()); // "en"

// 3. Escuchar cambios de idioma
Consent.on("locale:changed", ({ locale, previousLocale }) => {
  console.log(`Idioma cambiado de ${previousLocale} a ${locale}`);
});

// 4. Conmutación mediante CustomEvent del DOM (Zero-code / Microfrontends)
document.dispatchEvent(
  new CustomEvent("solvenza:locale", { detail: { locale: "en" } }),
);
```

### Configuración con `ConsentConfigBuilder` (TypeScript):

```ts
const config = new ConsentConfigBuilder("1.0.0")
  .setLocale("es", true, ["es", "en", "ca"])
  .addTranslation("en", {
    ui: {
      banner: { title: "Your privacy, your choice" },
      floatingBadge: { tooltip: "Cookie Settings" },
    },
    categories: {
      analytics: { label: "Analytics", description: "Aggregated telemetry." },
    },
  })
  .build();
```

---

## Purga Automática de Web Storage (localStorage, sessionStorage y Cookies)

A partir de la versión **1.5.3**, cuando el usuario desmarca una categoría en el panel de preferencias o revoca su elección (`Consent.withdraw()`), el SDK no solo elimina las cookies en `document.cookie`, sino que también **purga de forma reactiva las claves guardadas en `localStorage` y `sessionStorage`** por bibliotecas de analítica o marketing (Google Analytics 4, PostHog, Mixpanel, Hotjar, etc.).

### Soporte de Comodines (Glob Wildcards)

Puedes declarar patrones exactos o con comodín `*`:

- `_ga*`: coincide con `_ga`, `_gid`, `_ga_G123456`, etc.
- `ph_*_posthog`: coincide con identificadores dinámicos de PostHog.
- `*session*`: coincide con cualquier clave que contenga `session`.

### Configuración en `consent.json`:

```json
{
  "categories": {
    "analytics": {
      "label": "Analítica",
      "description": "Medición agregada del tráfico.",
      "storageKeys": ["_ga*", "_gid*"]
    }
  },
  "services": {
    "ga4": {
      "category": "analytics",
      "label": "Google Analytics 4",
      "cookies": [{ "name": "_ga" }, { "name": "_ga_*" }, { "name": "_gid" }],
      "storageKeys": ["_ga*", "_gid*"]
    },
    "posthog": {
      "category": "analytics",
      "label": "PostHog",
      "localStorage": ["ph_*_posthog"],
      "sessionStorage": ["ph_*_posthog"]
    }
  }
}
```

### Opciones de purga disponibles:

| Campo            | Nivel                | Descripción                                                                 |
| ---------------- | -------------------- | --------------------------------------------------------------------------- |
| `storageKeys`    | Categoría o Servicio | Claves o patrones a purgar tanto de `localStorage` como de `sessionStorage` |
| `localStorage`   | Categoría o Servicio | Claves o patrones a purgar exclusivamente de `localStorage`                 |
| `sessionStorage` | Categoría o Servicio | Claves o patrones a purgar exclusivamente de `sessionStorage`               |
| `cookies[].name` | Servicio             | Nombres de cookies (soporta comodines como `_ga_*`)                         |

### API Programática:

```ts
import { Consent, StorageCleaner } from "@solvenza/cookies-compliance";

// 1. Purgar manualmente el almacenamiento de una categoría
const report = Consent.purgeCategory("analytics");
console.log(report.purgedCookies); // ["_ga", "_ga_G123456"]
console.log(report.purgedLocalStorage); // ["_ga", "ph_client_posthog"]
console.log(report.purgedSessionStorage); // ["temp_analytics_session"]

// 2. Escuchar eventos de purga
Consent.on("storage:purged", ({ category, report }) => {
  console.log(`Almacenamiento purgado para la categoría ${category}:`, report);
});

// 3. Utilidad independiente
StorageCleaner.purgeLocalStorage(["_ga*", "temp_*"]);
```

---

## Presets de Servicios Comunes (GA4, Meta, Hotjar, etc.)

El SDK incluye un catálogo oficial de más de 20 presets predefinidos con todos los metadatos necesarios (proveedor legal, categorías por defecto, patrones de cookies con duración y propósito, claves de Web Storage y políticas oficiales):

### Catálogo de Servicios Soportados:

| Categoría                        | Presets Disponibles                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Analítica**                    | `ga4`, `google_analytics`, `posthog`, `hotjar`, `clarity`, `matomo`, `plausible`                             |
| **Marketing & Ads**              | `meta_pixel`, `facebook_pixel`, `google_ads`, `tiktok_pixel`, `linkedin_insight`, `twitter_pixel`, `hubspot` |
| **Media Embebida**               | `youtube`, `vimeo`, `spotify`                                                                                |
| **Chat & Soporte**               | `intercom`, `crisp`                                                                                          |
| **Técnicas / Seguridad / Pagos** | `gtm`, `google_recaptcha`, `cloudflare`, `stripe`, `paypal`                                                  |

### Uso Declarativo en `consent.json`:

Basta con especificar `"preset": "<nombre>"` para que el SDK hidrate automáticamente cookies, almacenamiento y proveedor:

```json
{
  "schemaVersion": 1,
  "policyVersion": "2026-09-30",
  "categories": {
    "necessary": {
      "required": true,
      "label": "Necesarias",
      "description": "Cookies técnicas de seguridad y pago."
    },
    "analytics": {
      "required": false,
      "label": "Analítica",
      "description": "Medición del tráfico y uso."
    },
    "marketing": {
      "required": false,
      "label": "Marketing",
      "description": "Publicidad y contenido embebido."
    }
  },
  "services": {
    "ga4": { "preset": "ga4" },
    "facebook": { "preset": "meta_pixel" },
    "hotjar": { "preset": "hotjar" },
    "youtube": { "preset": "youtube" },
    "stripe": { "preset": "stripe" }
  }
}
```

### Uso Programático en TypeScript / JavaScript:

```ts
import {
  Consent,
  getPreset,
  defineServices,
  SERVICE_PRESETS,
} from "@solvenza/cookies-compliance";
// o importación directa:
// import { getPreset, defineServices } from "@solvenza/cookies-compliance/presets";

// 1. Obtener preset individual con personalizaciones
const customGA4 = getPreset("ga4", {
  label: "Google Analytics (Región UE)",
  provider: "Google Ireland Ltd.",
});

// 2. Definir múltiples servicios de forma concisa y tipada
const services = defineServices({
  ga4: "ga4",
  meta: "meta_pixel",
  hotjar: { preset: "hotjar", label: "Mapas de Calor UX" },
  customApi: { category: "necessary", label: "API Interna de Autenticación" },
});
```

---

## Soporte Global Privacy Control (GPC) & Do Not Track (DNT)

El SDK detecta automáticamente la señal del estándar W3C **Global Privacy Control (`navigator.globalPrivacyControl === true`)** y **Do Not Track (`navigator.doNotTrack === "1"`)** enviada por navegadores como Firefox, Brave, DuckDuckGo o extensiones de privacidad.

### Comportamiento y Cumplimiento:

1. **Aplicación automática**: Si el usuario no ha expresado un consentimiento explícito previo y tiene GPC activado, el motor desactiva automáticamente las cookies y almacenamiento no esenciales.
2. **Generación de Comprobante Legal**: Se emite un recibo firmado con `source: "gpc"` y `gpc: true`.
3. **Purga Automática**: Se limpian de inmediato las cookies y Web Storage (`localStorage` / `sessionStorage`) de terceros.
4. **Sincronización con Google Consent Mode**: Se actualiza el modo de consentimiento de Google como `denied` para analítica y publicidad.

### Configuración en `consent.json`:

```json
{
  "schemaVersion": 1,
  "policyVersion": "2026-09-30",
  "gpc": {
    "enabled": true,
    "respectSignal": true,
    "mode": "auto-reject",
    "categories": ["analytics", "marketing"]
  },
  "categories": {
    "necessary": {
      "required": true,
      "label": "Necesarias",
      "description": "Técnicas"
    },
    "analytics": {
      "required": false,
      "label": "Analítica",
      "description": "Métricas"
    },
    "marketing": {
      "required": false,
      "label": "Marketing",
      "description": "Publicidad"
    }
  }
}
```

### API Programática:

```ts
import { Consent } from "@solvenza/cookies-compliance";

// Consultar si la señal GPC está activa en el navegador
if (Consent.isGpcActive()) {
  console.log("Navegador con señal GPC / DNT activa.");
}

// Escuchar evento de detección de señal
Consent.on("gpc:detected", ({ signal, autoApplied, choices }) => {
  console.log("Señal de privacidad procesada:", {
    signal,
    autoApplied,
    choices,
  });
});
```

En React / Next:

```tsx
import { useGpc } from "@solvenza/cookies-compliance/react";

export function PrivacyNotice() {
  const isGpc = useGpc();
  return isGpc ? (
    <p>Señal de privacidad Global Privacy Control detectada.</p>
  ) : null;
}
```

En Vue 3 / Nuxt 3:

```vue
<script setup>
import { useGpc } from "@solvenza/cookies-compliance/vue";
const isGpc = useGpc();
</script>
```

---

### Vanilla HTML5

Incrusta el script compilado y tu configuración. El botón flotante de revocación se activará automáticamente según lo definido en `consent.json`:

```html
<!-- 1. Carga automática con script compilado y configuración JSON -->
<script src="./consent.min.js" data-config="./consent.json"></script>

<!-- 2. Scripts y recursos bloqueados previamente -->
<script
  type="text/plain"
  data-consent="analytics"
  data-service="ga4"
  data-src="https://www.googletagmanager.com/gtag/js?id=G-DEMO123"
></script>

<iframe
  data-consent="marketing"
  data-service="youtube"
  data-src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  width="560"
  height="315"
>
</iframe>

<!-- 3. Botón de revocación opcional en footer (adicional al badge flotante permanente) -->
<button type="button" data-consent-open>Gestionar cookies</button>
```

### React 18+ / Vite

Puedes sincronizar el idioma de la aplicación (ej. procedente de `react-i18next` o de tu estado) sin boilerplate utilizando el hook `useSyncConsentLocale`:

```tsx
import { useState, useEffect } from "react";
import { Consent, ConsentConfigBuilder } from "@solvenza/cookies-compliance";
import {
  useConsent,
  useSyncConsentLocale,
  ConsentGate,
} from "@solvenza/cookies-compliance/react";

export function App() {
  const [appLang, setAppLang] = useState("es");
  const isAnalyticsAllowed = useConsent("analytics");

  // Sincronización automática de 1 línea con el estado de tu app
  useSyncConsentLocale(appLang);

  useEffect(() => {
    // Inicialización declarativa con FloatingBadge activado
    const config = new ConsentConfigBuilder("2026-08-23")
      .setPolicyUrls("/politica-privacidad", "/politica-cookies")
      .setLocale("es", true, ["es", "en", "ca"])
      .setFloatingBadge({
        enabled: true,
        position: "bottom-left",
        icon: "cookie",
        label: "Cookies",
      })
      .addCategory("analytics", {
        required: false,
        label: "Analítica de uso",
        description: "Permite medir de forma agregada el uso de la web.",
      })
      .addCategory("marketing", {
        required: false,
        label: "Marketing y Vídeo",
        description: "Permite reproducir vídeos y contenido interactivo.",
      })
      .build();

    void Consent.init(config);
  }, []);

  return (
    <div>
      <header>
        <button onClick={() => setAppLang("es")}>ES</button>
        <button onClick={() => setAppLang("en")}>EN</button>
      </header>
      <p>Analítica: {isAnalyticsAllowed ? "Activa" : "Bloqueada"}</p>

      {/* Componente Declarativo ConsentGate */}
      <ConsentGate
        category="marketing"
        fallback={
          <div className="cookie-blocked-placeholder">
            <p>
              El reproductor de vídeo requiere permiso de cookies de marketing.
            </p>
            <button onClick={() => Consent.openPreferences()}>
              Ajustes de Cookies
            </button>
          </div>
        }
      >
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          width="560"
          height="315"
        />
      </ConsentGate>
    </div>
  );
}
```

### Next.js (App Router & Pages)

Importa hooks y el componente `<ConsentGate>` directamente desde `@solvenza/cookies-compliance/next`:

```tsx
// app/components/VideoPlayer.tsx
"use client";
import { ConsentGate, useConsent } from "@solvenza/cookies-compliance/next";

export function VideoPlayer() {
  return (
    <ConsentGate
      category="marketing"
      fallback={({ openPreferences }) => (
        <div className="banner-blocked">
          <p>Vídeo bloqueado por privacidad.</p>
          <button onClick={openPreferences}>
            Aceptar cookies de marketing
          </button>
        </div>
      )}
    >
      <iframe src="https://www.youtube.com/embed/..." />
    </ConsentGate>
  );
}
```

Configura el SDK en el `RootLayout` con `strategy="beforeInteractive"`:

```tsx
// app/[locale]/layout.tsx
import Script from "next/script";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <head>
        {/* Sincronización automática con el atributo lang sin necesidad de boilerplate */}
        <Script
          src="/vendor/consent.min.js"
          data-config="/consent.json"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Angular 20 Standalone

Carga la configuración con `provideAppInitializer` inyectando `ConsentService`. Puedes sincronizar el idioma en cualquier momento con `consentService.syncLocale(locale)` (ej. conectado a `@ngx-translate` o `Transloco`):

```typescript
// app.config.ts
import {
  ApplicationConfig,
  provideAppInitializer,
  inject,
} from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    ConsentService,
    provideAppInitializer(async () => {
      const consentService = inject(ConsentService);
      await consentService.init({
        schemaVersion: 1,
        policyVersion: "2026-08-23",
        locale: { default: "es", autoDetect: true },
        policy: {
          privacyUrl: "/politica-privacidad",
          cookiesUrl: "/politica-cookies",
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
            description: "Imprescindibles.",
          },
          analytics: {
            required: false,
            label: "Analítica",
            description: "Medición agregada.",
          },
          marketing: {
            required: false,
            label: "Marketing",
            description: "Vídeo y contenido interactivo.",
          },
        },
      });
    }),
  ],
};
```

Uso de la directiva estructural `*consentGate` en componentes standalone de Angular:

```typescript
// video-player.component.ts
import { Component } from "@angular/core";
import {
  ConsentGateDirective,
  ConsentService,
} from "@solvenza/cookies-compliance/angular";

@Component({
  selector: "app-video-player",
  standalone: true,
  imports: [ConsentGateDirective],
  template: `
    <!-- Renderizado condicional reactivo -->
    <div *consentGate="'marketing'; else videoBlocked">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        width="560"
        height="315"
      ></iframe>
    </div>

    <ng-template #videoBlocked>
      <div class="video-placeholder">
        <p>Vídeo bloqueado. Requiere consentimiento de marketing.</p>
        <button (click)="openCookies()">Configurar cookies</button>
      </div>
    </ng-template>
  `,
})
export class VideoPlayerComponent {
  constructor(private consentService: ConsentService) {}

  openCookies() {
    this.consentService.openPreferences();
  }
}
```

### Vue 3 (Composition API & Componente ConsentGate)

Usa los composables reactivos y el componente declarativo `<ConsentGate>`:

```vue
<script setup lang="ts">
import {
  useConsent,
  useSyncConsentLocale,
  ConsentGate,
} from "@solvenza/cookies-compliance/vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
// Sincronización automática de idioma con vue-i18n
useSyncConsentLocale(locale);

const isAnalyticsAllowed = useConsent("analytics");
</script>

<template>
  <div>
    <p>
      Estado de analítica: {{ isAnalyticsAllowed ? "Permitida" : "Bloqueada" }}
    </p>

    <!-- Renderizado declarativo condicional -->
    <ConsentGate category="marketing">
      <template #default>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
      </template>
      <template #fallback>
        <div class="blocked-card">
          <p>
            Vídeo bloqueado por privacidad. Acepta cookies de Marketing para
            reproducirlo.
          </p>
        </div>
      </template>
    </ConsentGate>
  </div>
</template>
```

Plugin global en `main.ts`:

```ts
import { createApp } from "vue";
import { createConsentPlugin } from "@solvenza/cookies-compliance/vue";
import App from "./App.vue";

const app = createApp(App);
app.use(createConsentPlugin("/consent.json"));
app.mount("#app");
```

### Nuxt 3 (SSR & Universal)

Crea un plugin cliente en `plugins/consent.client.ts`:

```ts
// plugins/consent.client.ts
import { defineNuxtConsentPlugin } from "@solvenza/cookies-compliance/nuxt";

export default defineNuxtPlugin(defineNuxtConsentPlugin("/consent.json"));
```

Y usa los composables y `<ConsentGate>` directamente en cualquier página o componente:

```vue
<!-- pages/index.vue -->
<script setup lang="ts">
import { useConsent, ConsentGate } from "@solvenza/cookies-compliance/nuxt";

const isAnalyticsAllowed = useConsent("analytics");
</script>

<template>
  <main>
    <h1>Mi aplicación Nuxt 3</h1>
    <ConsentGate category="marketing">
      <template #default>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
      </template>
      <template #fallback>
        <p>Vídeo bloqueado. Por favor, autoriza la categoría de marketing.</p>
      </template>
    </ConsentGate>
  </main>
</template>
```

### WordPress

```php
// functions.php o plugin personalizado
function enqueue_solvenza_cookies() {
    wp_enqueue_script(
        "solvenza-cookies",
        get_template_directory_uri() . "/vendor/consent.min.js",
        array(),
        "1.5.3",
        false // En <head> para cumplir LSSI antes de scripts de analítica
    );
    // Asocia la configuración JSON con el badge flotante habilitado
    wp_script_add_data("solvenza-cookies", "data-config", get_template_directory_uri() . "/consent.json");
}
add_action("wp_enqueue_scripts", "enqueue_solvenza_cookies");
```

---

## API JavaScript

```typescript
import { Consent } from "@solvenza/cookies-compliance";

// Inicialización
await Consent.init(configOrUrl);

// Consultar consentimiento
const isAllowed = Consent.has("analytics");
const isServiceAllowed = Consent.hasService("youtube");

// Abrir modal de preferencias (2ª capa)
Consent.openPreferences();

// Aceptar / Rechazar todas
Consent.acceptAll();
Consent.rejectAll();

// Revocar elección
Consent.withdraw();

// Suscribirse a cambios de consentimiento
const unsubscribe = Consent.on("consent:changed", ({ choices, receipt }) => {
  console.log("Nuevo consentimiento:", choices);
});

// Generar documentos legales y tablas dinámicamente en Vanilla JS
Consent.mountPolicy("#contenedor-politica", { view: "full" });
Consent.mountLegalNotice("#contenedor-aviso-legal");
Consent.mountPrivacyPolicy("#contenedor-privacidad");

// O renderizar como string HTML para SSR
const htmlPolitica = Consent.renderPolicyHtml({ view: "full" });
```

---

## Componentes de Textos Legales y Tablas de Cookies

La librería incluye componentes declarativos y utilidades para generar automáticamente la **Política de Cookies**, el **Aviso Legal (LSSI-CE art. 10)** y la **Política de Privacidad (RGPD)** totalmente adaptados a la configuración y servicios declarados.

### 1. Configuración de datos del Titular (`legalEntity` y `legalNotice`)

En `consent.json`:

```json
{
  "schemaVersion": 1,
  "policyVersion": "2026-08-23",
  "legalEntity": {
    "name": "Mi Empresa S.L.",
    "tradeName": "Mi Marca",
    "taxId": "B-12345678",
    "address": "Calle Principal 123, 28001 Madrid, España",
    "email": "privacidad@mi-sitio.com",
    "phone": "+34 910 000 000",
    "registryData": "Registro Mercantil de Madrid, Tomo 123, Folio 45",
    "dpoEmail": "dpo@mi-sitio.com"
  },
  "legalNotice": {
    "applicableLaw": "Legislación española (LSSI-CE, LOPDGDD) y RGPD",
    "jurisdiction": "Juzgados y Tribunales de Madrid"
  }
}
```

O con `ConsentConfigBuilder`:

```typescript
const config = new ConsentConfigBuilder("2026-08-23")
  .setLegalEntity({
    name: "Mi Empresa S.L.",
    tradeName: "Mi Marca",
    taxId: "B-12345678",
    address: "Calle Principal 123, Madrid",
    email: "privacidad@mi-sitio.com",
  })
  .setLegalNotice({
    jurisdiction: "Juzgados y Tribunales de Madrid",
  })
  .build();
```

---

### 2. Uso en React & Next.js

```tsx
import {
  CookiePolicy,
  LegalNotice,
  PrivacyPolicy,
} from "@solvenza/cookies-compliance/react";
// O desde "@solvenza/cookies-compliance/next"

export function CookiePolicyPage() {
  return (
    <div>
      {/* 1. Documento completo de Política de Cookies (con botones AEPD y guías de navegador) */}
      <CookiePolicy view="full" />

      {/* 2. O solo la tabla interactiva de cookies registradas */}
      <CookiePolicy view="table-only" />

      {/* 3. Aviso Legal LSSI-CE */}
      <LegalNotice />

      {/* 4. Política de Privacidad RGPD */}
      <PrivacyPolicy />
    </div>
  );
}
```

---

### 3. Uso en Vue 3 & Nuxt 3

```vue
<script setup lang="ts">
import {
  CookiePolicy,
  LegalNotice,
  PrivacyPolicy,
} from "@solvenza/cookies-compliance/vue";
// O desde "@solvenza/cookies-compliance/nuxt"
</script>

<template>
  <main>
    <!-- Documento completo con revocación AEPD interactiva -->
    <CookiePolicy view="full" />

    <!-- Solo inventario de cookies -->
    <CookiePolicy view="table-only" />

    <!-- Aviso Legal LSSI-CE -->
    <LegalNotice />
  </main>
</template>
```

---

### 4. Uso en Angular 17+ / 20

```html
<!-- app.component.html -->
<solvenza-cookie-policy [view]="'full'"></solvenza-cookie-policy>
<solvenza-cookie-policy [view]="'table-only'"></solvenza-cookie-policy>
<solvenza-legal-notice></solvenza-legal-notice>
<solvenza-privacy-policy></solvenza-privacy-policy>
```

---

---

## GitHub Action de Auditoría LSSI & AEPD

Automatiza la validación continua de cumplimiento legal (LSSI art. 22.2, directrices AEPD 2024 y RGPD) en tus flujos de CI/CD de GitHub Actions antes de desplegar a producción.

### Uso rápido en `.github/workflows/lssi-audit.yml`:

```yaml
name: "Auditoría LSSI & AEPD"

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lssi-compliance:
    name: "Verificación de Cumplimiento LSSI"
    runs-on: ubuntu-latest
    steps:
      - name: Checkout del código
        uses: actions/checkout@v4

      - name: Ejecutar Auditoría LSSI & AEPD
        uses: solvenza/cookies-compliance@v1
        with:
          config-path: "./consent.json"
          src-dir: "./src"
          fail-on-error: "true"
```

### Entradas (Inputs) de la GitHub Action:

| Input           | Descripción                                                                           | Valor por defecto |
| --------------- | ------------------------------------------------------------------------------------- | ----------------- |
| `config-path`   | Ruta relativa al archivo `consent.json`                                               | `./consent.json`  |
| `src-dir`       | Directorio con archivos fuente a escanear (`.html`, `.jsx`, `.tsx`, `.vue`, etc.)     | `./`              |
| `url`           | URL en vivo a auditar (ej: `https://staging.mi-sitio.com`)                            | _(Opcional)_      |
| `fail-on-error` | Bloquear el pipeline con código de salida no nulo si se detectan violaciones críticas | `true`            |

### Resumen automático en el Step Summary de GitHub:

La GitHub Action genera anotaciones directas en las líneas de código (`::error::` / `::warning::`) y añade una tabla resumen visual en el **Job Step Summary** con la puntuación de 0 a 100, estado de cumplimiento y recomendaciones de subsanación.

---

## Herramienta CLI de auditoría LSSI

Puedes ejecutar el motor de auditoría de forma manual o en tus scripts de `package.json`:

```bash
# Auditar configuración y código fuente local
npx @solvenza/cookies-compliance consent-audit --config ./consent.json --src ./src --fail-on-error

# Auditar una URL remota en vivo
npx @solvenza/cookies-compliance consent-audit --url https://mi-sitio.com

# Generar reporte estructurado en formato JSON
npx @solvenza/cookies-compliance consent-audit --config ./consent.json --src ./src --json
```

### Uso programático en Node.js / TypeScript:

```typescript
import { LssiAuditor } from "@solvenza/cookies-compliance/audit";

const report = await LssiAuditor.run({
  configPath: "./consent.json",
  srcDir: "./src",
  url: "https://staging.mi-sitio.com",
});

console.log(`Puntuación: ${report.score}/100 - Cumple: ${report.compliant}`);
```

---

## Ejemplos de integración por framework

El repositorio incluye ejemplos interactivos listos para ejecutar:

| Directorio                                          | Framework / Stack      | Características clave                                                                   |
| --------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| [`examples/vanilla-html/`](./examples/vanilla-html) | Vanilla HTML5 / JS     | Inclusión vía `<script data-config="...">`, iframe gate nativo y CSS personalizado      |
| [`examples/react-app/`](./examples/react-app)       | React 18+ & Vite       | `useConsent`, `useSyncConsentLocale`, `<ConsentGate>` y tabla de política dinámica      |
| [`examples/next-app/`](./examples/next-app)         | Next.js (App Router)   | Script con `strategy="beforeInteractive"`, componentes de cliente y SSR                 |
| [`examples/vue-app/`](./examples/vue-app)           | Vue 3 & Vite           | Composables reactivos `useConsent`, `useGpc`, `useSyncConsentLocale` y `<ConsentGate>`  |
| [`examples/nuxt-app/`](./examples/nuxt-app)         | Nuxt 3                 | Módulo / plugin SSR universal `@solvenza/cookies-compliance/nuxt`                       |
| [`examples/angular-app/`](./examples/angular-app)   | Angular 17+ Standalone | `ConsentService`, directiva estructural `*consentGate` y `provideAppInitializer`        |
| [`playground/`](./playground)                       | Sandbox Interactivo    | Panel de pruebas con simulador de presets, purga de Web Storage e inspección de recibos |

---

## Entorno de desarrollo local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/solvenza/cookies-compliance.git
   cd cookies-compliance
   ```
2. Instala dependencias y compila:
   ```bash
   npm install
   npm run build
   ```
3. Ejecuta los tests:
   ```bash
   npm test
   ```
4. Inicia el playground interactivo:
   ```bash
   npm run playground
   ```
5. Inicia el ejemplo de Vue 3:
   ```bash
   cd examples/vue-app && npm install && npm run dev
   ```

---

## Licencia

[MIT](LICENSE) © Solvenza Team.
