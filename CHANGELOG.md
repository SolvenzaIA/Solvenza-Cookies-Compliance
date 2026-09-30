# Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.5.0] - 2026-09-30

### Añadido
- **Motor de Purga Automática de Web Storage (`localStorage` & `sessionStorage`)**:
  - **Soporte de `localStorage` y `sessionStorage`**: Purga de identificadores, tokens y estados almacenados por scripts de terceros en el almacenamiento web del navegador cuando el usuario revoca una categoría o ejecuta `withdraw()`.
  - **Coincidencia por comodines y glob patterns**: Soporte para patrones con comodín `*` (ej: `_ga*`, `_ga_*`, `ph_*_posthog`, `*session*`, `mp_*`) y nombres exactos.
  - **Limpieza de Cookies con comodines**: Detección y borrado de cookies dinámicas generadas en tiempo de ejecución (ej: `_ga_XXXXXXXXXX` de GA4) mediante escaneo de `document.cookie` con patrones glob.
  - **Configuración declarativa**:
    - En `categories`: soporte para `storageKeys`, `localStorage` y `sessionStorage`.
    - En `services`: soporte para `storageKeys`, `localStorage` y `sessionStorage`.
  - **Clase utilitaria exportada `StorageCleaner`**: Métodos estáticos `purgeLocalStorage(patterns)`, `purgeSessionStorage(patterns)`, `purgeCookies(declarations)`, y `purgeCategory(config, category)`.
  - **Métodos programáticos y eventos**:
    - `Consent.purgeCategory(category)`: ejecuta la purga de una categoría específica y devuelve un `StoragePurgeReport`.
    - `Consent.purgeStorage(categoryOrService?)`: purga todas las categorías revocadas o una categoría/servicio dado.
    - Evento de bus `storage:purged`: emite `{ category, report: StoragePurgeReport }`.
    - Evento DOM nativo `solvenza:storage:purged`: despachado en `document` para telemetría y diagnósticos.
  - **Wrappers actualizados**: Métodos `purgeCategory` y `purgeStorage` añadidos a `ConsentService` en `@solvenza/cookies-compliance/angular`.
- **Wrapper Oficial para Vue 3 (`@solvenza/cookies-compliance/vue`)**:
  - **Composables Reactivos**: `useConsent(category)`, `useConsentService(serviceId)`, `useConsentLocale()`.
  - **Sincronización sin Boilerplate**: `useSyncConsentLocale(locale)` compatible con `vue-i18n` (`watch` reactivo).
- **Componente Declarativo `<ConsentGate>` Multimarco (React, Next.js, Vue 3, Nuxt 3 y Angular)**:
  - **React 18+ & 19 (`@solvenza/cookies-compliance/react`)**: Componente `<ConsentGate category="..." service="..." fallback={...}>{children}</ConsentGate>` con soporte de fallback estático o función render-prop `({ openPreferences }) => ...`.
  - **Next.js (App Router / Pages) (`@solvenza/cookies-compliance/next`)**: Re-exportación completa y soporte universal/SSR de `<ConsentGate>`, `useConsent`, `useConsentService`, `useConsentLocale` y `useSyncConsentLocale`.
  - **Vue 3 (`@solvenza/cookies-compliance/vue`)**: Componente `<ConsentGate :category="..." :service="...">` con slots reactivos `#default` y `#fallback`.
  - **Nuxt 3 (`@solvenza/cookies-compliance/nuxt`)**: Compatibilidad SSR-safe y registro automático.
  - **Angular 17+ & 20 (`@solvenza/cookies-compliance/angular`)**: Directiva estructural `*consentGate="'marketing'; else videoBlocked"` y servicio inyectable `@Injectable() ConsentService`.
- **Catálogo de Presets de Servicios Comunes (`@solvenza/cookies-compliance/presets`)**:
  - **Más de 20 servicios preconfigurados según directrices LSSI/AEPD/RGPD**:
    - **Analítica**: Google Analytics 4 (`ga4`), PostHog (`posthog`), Hotjar (`hotjar`), Microsoft Clarity (`clarity`), Matomo (`matomo`), Plausible (`plausible`).
    - **Marketing & Publicidad**: Meta Pixel (`meta_pixel` / `facebook_pixel`), Google Ads & Remarketing (`google_ads`), TikTok Pixel (`tiktok_pixel`), LinkedIn Insight (`linkedin_insight`), X/Twitter Pixel (`twitter_pixel`), HubSpot (`hubspot`).
    - **Media & Reproductores Embebidos**: YouTube Player (`youtube`), Vimeo Player (`vimeo`), Spotify Player (`spotify`).
    - **Soporte & Chat en Vivo**: Intercom Messenger (`intercom`), Crisp Chat (`crisp`).
    - **Técnicas / Seguridad / Pagos**: Google Tag Manager (`gtm`), Google reCAPTCHA (`google_recaptcha`), Cloudflare Turnstile & CDN (`cloudflare`), Stripe Payments (`stripe`), PayPal Checkout (`paypal`).
  - **Metadatos completos incluidos**: Categoría por defecto, proveedor legal, descripción estándar, nombres y patrones de cookies (con duración y propósito), claves de `localStorage` y `sessionStorage`, y enlaces a políticas oficiales de privacidad.
  - **Sintaxis declarativa en `consent.json`**:
    ```json
    "services": {
      "ga4": { "preset": "ga4" },
      "meta": { "preset": "meta_pixel" },
      "hotjar": { "preset": "hotjar", "category": "analytics" }
    }
    ```
  - **Funciones y utilidades exportadas**:
    - `getPreset(id, overrides)`: Obtiene la configuración de un servicio con personalizaciones opcionales.
    - `defineServices(definitions)`: Helper tipado para declarar servicios en TypeScript/JavaScript.
    - `resolveConfigPresets(config)`: Hidrata automáticamente todas las referencias a presets en la configuración.
    - `SERVICE_PRESETS`: Catálogo completo exportado para consulta e inspección.
    - `hasPreset(id)`: Verificación booleana de existencia de preset.
  - **Punto de entrada dedicado**: `./presets` en `package.json` (`@solvenza/cookies-compliance/presets`).

---

## [1.4.0] - 2026-09-30

### Añadido
- **Mecanismo de Sincronización Multilingüe con la Aplicación Padre (`i18n` Zero Boilerplate)**:
  - **Sin selectores intrusivos**: El banner y el modal de preferencias no añaden desplegables ni selectores de idioma propios, garantizando que la aplicación padre sea la única fuente de verdad sobre el idioma del usuario.
  - **Observador reactivo del documento**: Integración nativa de `MutationObserver` en `document.documentElement` para detectar cambios dinámicos en `<html lang="...">` y sincronizar banner, modal y badge al instante sin recarga ni código adicional.
  - **Detección por URL y Query Params**: Detección de rutas prefijadas (`/en/`, `/ca/`) y parámetros de búsqueda (`?lang=en`, `?locale=en`).
  - **Método programático `syncLocale(locale)`**: Incorporado en `ConsentEngine` e interfaz `ConsentSDKInterface` para sincronizar con cualquier almacén de estado.
  - **React Hooks**: Nuevos hooks `useSyncConsentLocale(locale)` (sincronización de 1 línea con el estado de React) y `useConsentLocale()` (suscripción reactiva al locale activo).
  - **Angular Helper**: Nuevos métodos `consentService.syncLocale(locale)` y `consentService.getLocale()` en `ConsentService`.
  - **Next.js Wrapper**: Soporte para `initialLocale` en `initNextConsent(configUrl, initialLocale)`.
  - **Diccionarios integrados oficiales** (`BUILTIN_TRANSLATIONS`) para Español (`es`), Inglés (`en`), Catalán (`ca`), Euskera (`eu`) y Gallego (`gl`).
  - **Resolución con herencia y fallbacks**: Soporte de traducciones personalizadas mediante `translations` en `consent.json` y `schema.json`.
  - Evento de bus `locale:changed` (`{ locale, previousLocale }`) y CustomEvent del DOM `solvenza:locale:changed`.
  - Métodos encadenables en `ConsentConfigBuilder`: `setTranslations(...)` y `addTranslation(locale, ...)`.
- **Restauración y Ciclo de Vida del Elemento Flotante (`FloatingBadge`) al Cerrar Modal**:
  - Ocultación temporal y limpia del botón flotante mientras el modal de preferencias esté abierto para evitar superposiciones.
  - Reaparición automática del botón flotante tan pronto como el modal de preferencias se cierra (ya sea por clic en botón cerrar 'X', clic en backdrop, tecla Escape, guardar selección, permitir todas, rechazar opcionales o vía `Consent.closePreferences()`).
  - Soporte de cierre intuitivo al hacer clic en el backdrop del diálogo.
  - Nueva opción de texto `tooltip` configurable en `ui.floatingBadge` y traducible por idioma.

---

## [1.3.0] - 2026-09-29

### Añadido
- **Botón Flotante de Revocación Permanente (`FloatingBadge`)**:
  - Elemento flotante configurable mediante `ui.floatingBadge` en `consent.json` o programmatic API.
  - Permite a los usuarios volver a abrir el modal de preferencias en cualquier momento para reconfigurar o declinar consentimientos (requisito estricto de la AEPD y RGPD).
  - Soporte de múltiples posiciones (`bottom-left`, `bottom-right`, `top-left`, `top-right`), iconos vectoriales SVG (`cookie`, `shield`, `settings`), etiquetas en formato píldora (`showLabel`), y tooltips accesibles.
  - Ciclo de vida integrado: se oculta automáticamente mientras se muestra el banner de 1ª capa y reaparece tras la decisión del usuario.
- **Métodos y Eventos Programáticos**:
  - Métodos `Consent.showFloatingBadge()` y `Consent.hideFloatingBadge()`.
  - Eventos de bus `floating-badge:shown` y `floating-badge:hidden`.
  - Eventos DOM nativos `solvenza:badge:show` y `solvenza:badge:hide`.
  - Método en constructor de configuración `ConsentConfigBuilder.setFloatingBadge(...)`.
- **Reglas del Repositorio (`AGENTS.md`)**:
  - Directrices claras para agentes: no realizar `git push` sin confirmación del usuario, documentar siempre en `README.md`, actualizar `CHANGELOG.md` y versionar con SemVer.

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
