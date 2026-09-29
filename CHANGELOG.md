# Registro de Cambios (Changelog)

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/) y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

---

## [1.4.0] - 2026-09-30

### Añadido
- **Sistema de Internacionalización y Multilingüe (`i18n`)**:
  - Configuración declarativa mediante `translations` en `ConsentConfig` y `schema.json` para personalizar traducciones por locale (`es`, `en`, `ca`, `eu`, `gl` u otros códigos ISO).
  - Diccionarios integrados oficiales (`BUILTIN_TRANSLATIONS`) para Español (`es`), Inglés (`en`), Catalán (`ca`), Euskera (`eu`) y Gallego (`gl`).
  - Resolución inteligente con herencia y fallbacks: traduce banners, modal de preferencias, insignias requeridas/opcionales, enlaces a políticas y botón flotante, manteniendo los valores base para campos no especificados.
  - Métodos programáticos `Consent.setLocale(locale: string)` y `Consent.getLocale(): string`.
  - Evento de bus `locale:changed` (`{ locale, previousLocale }`) y CustomEvent del DOM `solvenza:locale:changed`.
  - Capacidad de conmutar idiomas sin código mediante el evento DOM `solvenza:locale` con `detail: { locale: 'en' }`.
  - Métodos encadenables `ConsentConfigBuilder.setTranslations(...)` y `ConsentConfigBuilder.addTranslation(locale, ...)`.
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
