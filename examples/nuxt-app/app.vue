<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Consent, ConsentConfigBuilder } from "@solvenza/cookies-compliance";
import { ConsentGate, useConsent, useConsentService, useGpc, useSyncConsentLocale } from "@solvenza/cookies-compliance/nuxt";

const initialized = ref(false);
const currentLocale = ref("es");

// Zero-boilerplate hook: sync locale with cookies engine
useSyncConsentLocale(currentLocale);

const hasAnalytics = useConsent("analytics");
const hasGa4 = useConsentService("ga4");
const isGpcActive = useGpc();

onMounted(async () => {
  const config = new ConsentConfigBuilder("2026-08-23")
    .setPolicyUrls("/politica-privacidad", "/politica-cookies")
    .setLocale("es", true, ["es", "en", "ca"])
    .setFloatingBadge({
      enabled: true,
      position: "bottom-left",
      icon: "cookie",
      label: "Cookies"
    })
    .addCategory("analytics", {
      required: false,
      label: "Analítica Nuxt",
      description: "Permite métricas de navegación en SSR y SPA.",
      storageKeys: ["_ga*", "nuxt_*"]
    })
    .addCategory("marketing", {
      required: false,
      label: "Marketing y Vídeo",
      description: "Permite reproductores de vídeo incrustados.",
      storageKeys: ["yt-*"]
    })
    .addService("ga4", {
      category: "analytics",
      label: "Google Analytics 4",
      provider: "Google"
    })
    .addService("youtube", {
      category: "marketing",
      label: "YouTube Embed",
      provider: "Google"
    })
    .build();

  await Consent.init(config);
  initialized.value = true;
});

function openPreferences() {
  Consent.openPreferences();
}

function withdrawConsent() {
  Consent.withdraw();
}

function acceptAll() {
  Consent.acceptAll();
}

function rejectAll() {
  Consent.rejectAll();
}
</script>

<template>
  <div style="min-height: 100vh; background: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a; margin: 0;">
    <!-- Navigation -->
    <header
      style="
        border-bottom: 1px solid #e2e8f0;
        background: #ffffff;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      "
    >
      <div style="display: flex; align-items: center; gap: 0.8rem;">
        <div
          style="
            width: 34px;
            height: 34px;
            border-radius: 8px;
            background: linear-gradient(135deg, #00dc82, #002e3b);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.1rem;
          "
        >
          N
        </div>
        <div>
          <h1 style="margin: 0; font-size: 1.15rem; font-weight: 700;">Nuxt 3 — Cookies Compliance</h1>
          <p style="margin: 0; font-size: 0.78rem; color: #64748b;">@solvenza/cookies-compliance/nuxt</p>
        </div>
      </div>

      <!-- Language Selector -->
      <div style="display: flex; align-items: center; gap: 0.4rem; background: #f1f5f9; padding: 0.25rem; border-radius: 8px;">
        <button
          v-for="lang in ['es', 'en', 'ca']"
          :key="lang"
          @click="currentLocale = lang"
          :style="{
            padding: '0.35rem 0.7rem',
            borderRadius: '6px',
            fontWeight: '700',
            fontSize: '0.8rem',
            cursor: 'pointer',
            border: 'none',
            background: currentLocale === lang ? '#0f172a' : 'transparent',
            color: currentLocale === lang ? '#ffffff' : '#475569'
          }"
        >
          {{ lang.toUpperCase() }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main style="max-width: 900px; margin: 2rem auto; padding: 0 1.5rem;">
      <div
        style="
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.75rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        "
      >
        <h2 style="margin-top: 0; color: #0f172a; font-size: 1.35rem;">Integración Universal SSR con Nuxt 3</h2>
        <p style="color: #475569; line-height: 1.6; margin-bottom: 1.25rem;">
          Este ejemplo demuestra cómo utilizar el wrapper oficial de Nuxt 3 (<code>@solvenza/cookies-compliance/nuxt</code>) con protección de hidratación universal y componentes declarativos.
        </p>

        <!-- Actions -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
          <button
            @click="openPreferences"
            style="
              background: #0f172a;
              color: #ffffff;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.88rem;
              cursor: pointer;
            "
          >
            ⚙️ Preferencias (2ª Capa)
          </button>
          <button
            @click="acceptAll"
            style="
              background: #16a34a;
              color: #ffffff;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.88rem;
              cursor: pointer;
            "
          >
            ✅ Aceptar Todas
          </button>
          <button
            @click="rejectAll"
            style="
              background: #dc2626;
              color: #ffffff;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.88rem;
              cursor: pointer;
            "
          >
            ❌ Rechazar Opcionales
          </button>
          <button
            @click="withdrawConsent"
            style="
              background: #ffffff;
              color: #dc2626;
              border: 1px solid #fca5a5;
              padding: 0.6rem 1.2rem;
              border-radius: 8px;
              font-weight: 600;
              font-size: 0.88rem;
              cursor: pointer;
            "
          >
            🔄 Revocar
          </button>
        </div>
      </div>

      <!-- ConsentGate Demo -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem;">📺 Nuxt 3 &lt;ConsentGate&gt;</h3>
        <ConsentGate category="marketing">
          <template #default>
            <div style="aspect-ratio: 16/9; max-width: 640px; border-radius: 8px; overflow: hidden; background: #000;">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
                title="Nuxt 3 Video"
                style="width: 100%; height: 100%; border: none;"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </template>
          <template #fallback>
            <div style="border: 2px dashed #cbd5e1; border-radius: 8px; padding: 2rem 1rem; text-align: center; background: #f8fafc;">
              <p style="margin: 0 0 1rem 0; color: #64748b;">Vídeo bloqueado en Nuxt 3 hasta otorgar consentimiento de marketing.</p>
              <button
                @click="openPreferences"
                style="background: #00dc82; color: #002e3b; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 700; cursor: pointer;"
              >
                Permitir Vídeos
              </button>
            </div>
          </template>
        </ConsentGate>
      </div>

      <!-- State Inspector -->
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
        <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem;">🔍 Estado Reactivo Nuxt 3</h3>
        <ul style="padding-left: 1.2rem; color: #475569; font-size: 0.9rem; line-height: 1.8;">
          <li>Analytics permitido: <strong>{{ hasAnalytics ? 'Sí' : 'No' }}</strong></li>
          <li>GA4 permitido: <strong>{{ hasGa4 ? 'Sí' : 'No' }}</strong></li>
          <li>GPC detectado: <strong>{{ isGpcActive ? 'Sí' : 'No' }}</strong></li>
          <li>Idioma actual: <strong>{{ currentLocale.toUpperCase() }}</strong></li>
        </ul>
      </div>
    </main>
  </div>
</template>
