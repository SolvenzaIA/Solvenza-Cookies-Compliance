# Guía de Contribución

¡Gracias por tu interés en contribuir a **Solvenza Cookies Compliance**!

Este documento detalla las normas de desarrollo y el flujo de trabajo para enviar cambios, corregir errores o proponer nuevas funcionalidades.

---

## Principios del Proyecto

1. **0 dependencias en runtime**: No agregues librerías externas para funcionalidad cliente a menos que sea estrictamente necesario y discutido previamente.
2. **Local-first & Privacidad**: Ningún cambio debe forzar llamadas a servidores externos sin el permiso explícito del usuario.
3. **Mantenibilidad de tipos**: Todo el código debe estar escrito en TypeScript estricto sin uso de `any`.

---

## Flujo de Trabajo Local

### 1. Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/solvenza/cookies-compliance.git
cd cookies-compliance
npm install
```

### 2. Comandos principales

- **Compilación de paquetes**:
  ```bash
  npm run build
  ```
- **Ejecutar tests unitarios**:
  ```bash
  npm test
  ```
- **Verificación de tipos TypeScript**:
  ```bash
  npm run typecheck
  ```
- **Probar el Playground interactivo**:
  ```bash
  npm run playground
  ```

---

## Convención de Commits

Seguimos el estándar **Conventional Commits**:

- `feat:` Nuevas funcionalidades (ej. `feat: agregar wrapper para Svelte`).
- `fix:` Corrección de errores (ej. `fix: corregir evento de cierre en modal`).
- `docs:` Cambios en documentación o README.
- `test:` Adición o modificación de pruebas unitarias.
- `refactor:` Cambios en la estructura interna sin alterar el comportamiento.
- `security:` Mejoras en seguridad o sanitización.

---

## Envío de Pull Requests (PR)

1. Crea una rama descriptiva a partir de `main`:
   ```bash
   git checkout -b feat/mi-funcionalidad
   ```
2. Asegúrate de que los tests y la verificación de tipos pasen correctamente:
   ```bash
   npm run typecheck && npm test && npm run build
   ```
3. Abre un Pull Request en GitHub explicando el motivo del cambio y cómo probarlo.

---

## Licencia

Al contribuir a este repositorio, aceptas que tus contribuciones se licencien bajo la misma licencia [MIT](LICENSE) del proyecto.
