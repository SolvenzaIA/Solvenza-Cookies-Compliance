# Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.2.1] - 2026-08-24

### Añadido
- **Borrado Automático de Cookies de Servicios Revocados (`clearServiceCookies`)**:
  - Eliminación automática en `document.cookie` de cookies propias y de terceros declaradas cuando un usuario desautoriza una categoría o revoca consentimientos.
- **Eventos Nativos del DOM (`solvenza:show`, `solvenza:preferences`, `solvenza:updated`, `solvenza:restored`)**:
  - Activación sin código del banner o panel de preferencias mediante dispatch de CustomEvents nativos en `document`.
- **Archivo LICENSE Oficial**:
  - Declaración formal de licencia MIT con derechos de autor © 2026 Solvenza IA.

---

## [1.2.0] - 2026-08-24

### Añadido
- **Soporte para Subdominios Wildcard (`*.dominio.com`)**:
  - Añadida la opción `storage.domain` en `ConsentConfig` y `CookieOptions` (`src/storage/cookie-store.ts`).
  - Sincronización automática de preferencias y revocaciones de cookies a través de todos los subdominios de primer y segundo nivel (`.dominio.com`).

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
