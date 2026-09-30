#!/usr/bin/env node

/**
 * Solvenza Cookies Compliance Audit CLI & GitHub Action Runner
 * Automated LSSI art. 22.2, RGPD & AEPD Compliance Auditor.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { LssiAuditor } from "../dist/audit.js";

async function run() {
  const args = process.argv.slice(2);

  let configPath = "consent.json";
  let srcDir = "src";
  let url = undefined;
  let failOnError = true;
  let outputJson = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--config" && args[i + 1]) {
      configPath = args[++i];
    } else if (arg === "--src" && args[i + 1]) {
      srcDir = args[++i];
    } else if (arg === "--url" && args[i + 1]) {
      url = args[++i];
    } else if (arg === "--no-fail" || arg === "--fail-on-error=false") {
      failOnError = false;
    } else if (arg === "--fail-on-error=true") {
      failOnError = true;
    } else if (arg === "--json") {
      outputJson = true;
    } else if (arg.startsWith("http://") || arg.startsWith("https://")) {
      url = arg;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
  }

  // Also support GitHub Actions input environment variables
  if (process.env.INPUT_CONFIG_PATH) configPath = process.env.INPUT_CONFIG_PATH;
  if (process.env.INPUT_SRC_DIR) srcDir = process.env.INPUT_SRC_DIR;
  if (process.env.INPUT_URL) url = process.env.INPUT_URL;
  if (process.env.INPUT_FAIL_ON_ERROR !== undefined) {
    failOnError = process.env.INPUT_FAIL_ON_ERROR !== "false";
  }

  const report = await LssiAuditor.audit({
    configPath: fs.existsSync(path.resolve(configPath)) ? configPath : undefined,
    srcDir: fs.existsSync(path.resolve(srcDir)) ? srcDir : undefined,
    url,
    failOnError,
  });

  if (outputJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printConsoleReport(report);
  }

  // If running inside GitHub Actions:
  if (process.env.GITHUB_STEP_SUMMARY) {
    try {
      const summaryMd = LssiAuditor.formatGitHubSummary(report);
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryMd + "\n");
    } catch {}
  }

  // Emit GitHub Actions annotations
  for (const f of report.findings) {
    if (f.severity === "CRITICAL") {
      console.log(`::error file=${f.file || ""},line=${f.line || 1},title=[${f.rule}]::${f.message}`);
    } else if (f.severity === "WARNING") {
      console.log(`::warning file=${f.file || ""},line=${f.line || 1},title=[${f.rule}]::${f.message}`);
    }
  }

  // Set GitHub Actions outputs
  if (process.env.GITHUB_OUTPUT) {
    try {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `compliant=${report.compliant}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `score=${report.score}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `violations-count=${report.summary.critical}\n`);
    } catch {}
  }

  if (failOnError && !report.compliant) {
    process.exit(1);
  }
}

function printConsoleReport(report) {
  console.log(`\n================================================================`);
  console.log(`🛡️  SOLVENZA COOKIES COMPLIANCE - AUDITORÍA LSSI & AEPD`);
  console.log(`================================================================\n`);
  console.log(`Puntuación de Cumplimiento: ${report.score} / 100`);
  console.log(`Estado: ${report.compliant ? "✅ CUMPLIMIENTO VÁLIDO" : "❌ VIOLACIONES DETECTADAS"}`);
  console.log(`Archivos escaneados: ${report.scannedFilesCount}\n`);
  console.log(`Resumen de hallazgos:`);
  console.log(`  🔴 Críticos (Riesgo sanción):  ${report.summary.critical}`);
  console.log(`  🟡 Advertencias (Técnicas):    ${report.summary.warnings}`);
  console.log(`  🔵 Información:                ${report.summary.info}\n`);

  if (report.findings.length > 0) {
    console.log(`Detalle de incidencias:`);
    report.findings.forEach((f, idx) => {
      const icon = f.severity === "CRITICAL" ? "🔴 [CRÍTICO]" : f.severity === "WARNING" ? "🟡 [ADVERTENCIA]" : "🔵 [INFO]";
      console.log(`\n${idx + 1}. ${icon} ${f.rule}: ${f.message}`);
      if (f.file) console.log(`   Ubicación: ${f.file}${f.line ? `:${f.line}` : ""}`);
      if (f.details) console.log(`   Detalle:   ${f.details}`);
      if (f.remediation) console.log(`   Solución:  ${f.remediation}`);
    });
    console.log(`\n----------------------------------------------------------------\n`);
  } else {
    console.log(`🎉 ¡Excelente! Todos los recursos cumplen con el aislamiento previo al consentimiento.\n`);
  }
}

function printHelp() {
  console.log(`
🛡️ Solvenza Cookies Compliance Audit CLI

Uso:
  consent-audit [opciones] [URL]

Opciones:
  --config <ruta>      Ruta al archivo consent.json (por defecto: ./consent.json)
  --src <directorio>   Directorio con código fuente a escanear (por defecto: ./src)
  --url <url>          URL viva o entorno de preview para auditar fugas
  --no-fail            No salir con código de error (exit 1) aunque existan violaciones
  --json               Imprimir reporte en formato JSON
  --help, -h           Mostrar esta ayuda

Ejemplos:
  consent-audit --config ./consent.json --src ./src
  consent-audit --url https://mi-sitio-web.com
`);
}

run().catch((err) => {
  console.error("Error fatal durante la auditoría:", err);
  process.exit(1);
});
