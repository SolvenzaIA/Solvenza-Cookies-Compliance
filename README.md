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
<script src="https://cdn.jsdelivr.net/npm/@solvenza/cookies-compliance@1/dist/consent.min.js" data-config="/consent.json"></script>
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
    "ga4": { "category": "analytics", "label": "Google Analytics 4", "provider": "Google" },
    "youtube": { "category": "marketing", "label": "YouTube Embed", "provider": "Google" }
  }
}
```

---

## Uso por Frameworks

### Vanilla HTML5

Para bloquear scripts o elementos dinámicos, usa los atributos `data-consent` y `data-src`:

```html
<!-- Script analítico bloqueado previamente -->
<script 
  type="text/plain" 
  data-consent="analytics" 
  data-service="ga4" 
  data-src="https://www.googletagmanager.com/gtag/js?id=G-DEMO123">
</script>

<!-- IFrame de YouTube bloqueado previamente -->
<iframe 
  data-consent="marketing" 
  data-service="youtube" 
  data-src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  width="560" height="315">
</iframe>

<!-- Botón de revocación de consentimiento en footer -->
<button type="button" data-consent-open>Configurar cookies</button>
```

### React 18+ / Vite

```tsx
import { useEffect } from "react";
import { Consent } from "@solvenza/cookies-compliance";
import { useConsent } from "@solvenza/cookies-compliance/react";

export function App() {
  const isAnalyticsAllowed = useConsent("analytics");

  useEffect(() => {
    void Consent.init("/consent.json");
  }, []);

  return (
    <div>
      <p>Analítica: {isAnalyticsAllowed ? "Activa" : "Bloqueada"}</p>
      <button onClick={() => Consent.openPreferences()}>Ajustes de Cookies</button>
    </div>
  );
}
```

### Next.js (App Router)

```tsx
// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
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

```typescript
// app.config.ts
import { ApplicationConfig, provideAppInitializer, inject } from "@angular/core";
import { ConsentService } from "@solvenza/cookies-compliance/angular";

export const appConfig: ApplicationConfig = {
  providers: [
    ConsentService,
    provideAppInitializer(async () => {
      const consentService = inject(ConsentService);
      await consentService.init("/assets/consent.json");
    }),
  ],
};
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

// Generar tabla de política de cookies dinámicamente
Consent.mountPolicy("#contenedor-politica");
```

---

## Herramienta CLI de auditoría

Puedes auditar el aislamiento previo de recursos en cualquier dominio con:

```bash
npx @solvenza/cookies-compliance consent-audit https://mi-sitio.com
```

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

---

## Licencia

[MIT](LICENSE) © Solvenza Team.
