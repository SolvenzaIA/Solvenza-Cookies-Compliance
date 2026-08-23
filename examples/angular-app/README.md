# Ejemplo Angular 20+ Standalone - Solvenza Cookies Compliance

Este proyecto demuestra la integración del SDK **Solvenza Cookies Compliance** (`@solvenza/cookies-compliance/angular`) en una aplicación **Angular 20+ Standalone** utilizando **Angular Signals**, **`provideAppInitializer()`** y el control de flujo nativo `@if`.

## Características

- Integración nativa con `ConsentService` inyectable vía `inject()`.
- Inicialización asíncrona mediante `provideAppInitializer()` en `app.config.ts`.
- Estado reactivo con **Angular Signals** (`signal()`).
- Montaje dinámico de la tabla de políticas de cookies con `Consent.mountPolicy()`.

## Instrucciones

```bash
npm install
npm start
```
