# Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.1.0] - 2026-08-24

### Añadido
- **Soporte para Subdominios Wildcard (`*.dominio.com`)**:
  - Añadida la opción `storage.domain` en `ConsentConfig` y `CookieOptions` (`src/storage/cookie-store.ts`).
  - Sincronización automática de preferencias y revocaciones de cookies a través de todos los subdominios de primer y segundo nivel (`.dominio.com`).
  - Pruebas unitarias para almacenamiento de cookies en subdominios (`tests/unit/cookie-store.test.ts`).

---

## [1.0.0] - 2026-08-23

### Añadido
- **Motor Core**: Singleton `ConsentEngine`, bus de eventos pub/sub `EventBus`, gestor de estado `StateManager` y registro de bloqueo previo de recursos `BlockerRegistry`.
- **Firma Anti-Manipulación SHA-256 HMAC**: Verificación de integridad de recibos en cookies local-first con la opción `security.secretKey`.
- **Seguridad CSP & XSS**: Inyección de estilos con soporte para `nonce` (`csp.nonce`), sanitización HTML estricta de textos y saneamiento de URLs con esquemas `javascript:`.
- **UI Glassmorphic**: Banner de 1ª capa con prominencia visual idéntica para Aceptar/Rechazar (LSSI art. 22.2 & AEPD 2024) y modal de 2ª capa estilo lista continua Apple/Linear.
- **Soporte para Frameworks**:
  - React 18+ (`@solvenza/cookies-compliance/react` con hook `useConsent`).
  - Next.js 14 App Router (`@solvenza/cookies-compliance/next`).
  - Angular 20 Standalone (`@solvenza/cookies-compliance/angular` con `provideAppInitializer()` y **Signals**).
  - WordPress (`@solvenza/cookies-compliance/wordpress`).
- **Google Consent Mode v2**: Adaptador integrado con soporte nativo para `ad_storage`, `analytics_storage`, `ad_user_data` y `ad_personalization`.
- **Herramientas CLI**:
  - `npx @solvenza/cookies-compliance consent-init`: Asistente interactivo en terminal para la generación guiada de `consent.json`.
  - `npx @solvenza/cookies-compliance consent-audit`: Herramienta de auditoría de fugas de red previas al consentimiento.
- **Entorno de Pruebas**: Playground interactivo en `npm run playground` a través del puerto 4000 con inspector de recibos JSON en tiempo real.
