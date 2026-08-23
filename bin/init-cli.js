#!/usr/bin/env node

/**
 * Solvenza Cookies Compliance Interactive Initializer CLI
 * Usage: npx @solvenza/cookies-compliance consent-init
 */

import readline from "node:readline";
import fs from "node:fs";
import path from "node:path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question, defaultValue) {
  return new Promise((resolve) => {
    const promptText = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
    rl.question(promptText, (answer) => {
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

function askYesNo(question, defaultYes = true) {
  return new Promise((resolve) => {
    const suffix = defaultYes ? " [Y/n]: " : " [y/N]: ";
    rl.question(question + suffix, (answer) => {
      const trimmed = answer.trim().toLowerCase();
      if (!trimmed) return resolve(defaultYes);
      resolve(trimmed === "y" || trimmed === "yes" || trimmed === "s" || trimmed === "si");
    });
  });
}

async function main() {
  console.log(`
┌──────────────────────────────────────────────────────────┐
│ 🛡️ Solvenza Cookies Compliance - Config Generator        │
│ Asistente de configuración interactivo consent.json      │
└──────────────────────────────────────────────────────────┘
`);

  const cookiesUrl = await ask("URL de tu Política de Cookies", "/politica-cookies");
  const privacyUrl = await ask("URL de tu Política de Privacidad", "/politica-privacidad");
  const includeAnalytics = await askYesNo("¿Incluir categoría de Analítica de uso (Google Analytics 4)?", true);
  const includeMarketing = await askYesNo("¿Incluir categoría de Marketing (YouTube / Píxeles)?", true);
  const enableSecurity = await askYesNo("¿Habilitar firma anti-manipulación SHA-256?", true);

  let secretKey;
  if (enableSecurity) {
    secretKey = await ask("Clave secreta para firmas SHA-256", "solvenza_secret_" + Math.random().toString(36).substring(2, 10));
  }

  const config = {
    schemaVersion: 1,
    policyVersion: new Date().toISOString().split("T")[0],
    locale: {
      default: "es",
      autoDetect: true,
    },
    policy: {
      privacyUrl,
      cookiesUrl,
    },
    categories: {
      necessary: {
        required: true,
        label: "Necesarias",
        description: "Cookies y almacenamiento técnico imprescindible para el funcionamiento de la web.",
      },
    },
    services: {},
  };

  if (secretKey) {
    config.security = { secretKey };
  }

  if (includeAnalytics) {
    config.categories.analytics = {
      required: false,
      default: false,
      label: "Analítica de uso",
      description: "Nos permite medir el uso del sitio web de forma agregada.",
    };
    config.services.ga4 = {
      category: "analytics",
      label: "Google Analytics 4",
      provider: "Google",
    };
  }

  if (includeMarketing) {
    config.categories.marketing = {
      required: false,
      default: false,
      label: "Marketing y Vídeo",
      description: "Permite la reproducción de vídeos incrustados y personalización de contenido.",
    };
    config.services.youtube = {
      category: "marketing",
      label: "YouTube Embed",
      provider: "Google",
    };
  }

  const targetPath = path.join(process.cwd(), "consent.json");
  fs.writeFileSync(targetPath, JSON.stringify(config, null, 2), "utf-8");

  console.log(`
✔ Configuración generada con éxito en: ${targetPath}

🚀 Para usar este archivo en tu web:
   <script src="./consent.min.js" data-config="./consent.json"></script>
`);

  rl.close();
}

main().catch((err) => {
  console.error("Error al generar la configuración:", err);
  rl.close();
  process.exit(1);
});
