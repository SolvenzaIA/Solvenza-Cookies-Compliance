# Ejemplo Vanilla HTML5 - Acme Consent SDK

Ejemplo de integración nativa con HTML5 y JavaScript sin frameworks.

> ⚠️ **Nota de Seguridad de Navegadores (`file:///` vs `http://`)**:
> Los navegadores modernos (Chrome, Safari, Edge) bloquean por seguridad las peticiones de red y scripts entre carpetas locales cuando se abre un archivo directamente haciendo doble clic (`file:///.../index.html`), devolviendo el error `net::ERR_ACCESS_DENIED`.
> 
> **Debes ejecutar el ejemplo mediante un servidor local (`http://localhost`)** como se indica a continuación.

---

## 🚀 Cómo ejecutar este ejemplo

### Servidor Local (Recomendado)

```bash
# 1. Navegar a la carpeta del ejemplo
cd examples/vanilla-html

# 2. Instalar el servidor local
npm install

# 3. Iniciar el servidor
npm start
```

Navega a **`http://localhost:3000`** en tu navegador. Verás el banner de privacidad y el vídeo bloqueado funcionando sin errores de seguridad.
