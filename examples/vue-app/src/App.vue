<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Consent, ConsentConfigBuilder } from "@solvenza/cookies-compliance";
import { useSyncConsentLocale } from "@solvenza/cookies-compliance/vue";
import AnalyticsTracker from "./components/AnalyticsTracker.vue";
import YouTubeWidget from "./components/YouTubeWidget.vue";
import GpcStatus from "./components/GpcStatus.vue";
import CookiePolicyPage from "./components/CookiePolicyPage.vue";

const initialized = ref(false);
const activeTab = ref<"demo" | "policy">("demo");
const parentAppLocale = ref("es");

// Zero-boilerplate hook: when the Vue app switches language, the consent engine updates automatically
useSyncConsentLocale(parentAppLocale);

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
      label: "Analítica de uso",
      description: "Permite medir de forma agregada cómo se utiliza la aplicación.",
      storageKeys: ["_ga*", "mp_*"]
    })
    .addCategory("marketing", {
      required: false,
      label: "Marketing y Vídeo",
      description: "Permite la reproducción de vídeos incrustados y personalización.",
      storageKeys: ["yt-*", "vuid"]
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

function setLocale(lang: string) {
  parentAppLocale.value = lang;
}

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
  <div v-if="initialized" style="min-height: 100vh; background: #f8fafc; font-family: system-ui, -apple-system, sans-serif; color: #0f172a;">
    <!-- Top Navigation -->
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
            background: linear-gradient(135deg, #42b883, #35495e);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 700;
            font-size: 1.1rem;
          "
        >
          V
        </div>
        <div>
          <h1 style="margin: 0; font-size: 1.15rem; font-weight: 700;">Vue 3 & Nuxt 3 — Cookies Compliance</h1>
          <p style="margin: 0; font-size: 0.78rem; color: #64748b;">@solvenza/cookies-compliance/vue</p>
        </div>
      </div>

      <!-- Center Tabs & Language Selector -->
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <div style="display: flex; gap: 0.3rem; background: #f1f5f9; padding: 0.25rem; border-radius: 8px;">
          <button
            @click="activeTab = 'demo'"
            :style="{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'demo' ? '#ffffff' : 'transparent',
              color: activeTab === 'demo' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'demo' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }"
          >
            Demo de Componentes
          </button>
          <button
            @click="activeTab = 'policy'"
            :style="{
              padding: '0.4rem 0.8rem',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              border: 'none',
              background: activeTab === 'policy' ? '#ffffff' : 'transparent',
              color: activeTab === 'policy' ? '#0f172a' : '#64748b',
              boxShadow: activeTab === 'policy' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }"
          >
            Declaración de Cookies
          </button>
        </div>

        <div style="display: flex; align-items: center; gap: 0.4rem; background: #f1f5f9; padding: 0.25rem; border-radius: 8px;">
          <button
            v-for="lang in ['es', 'en', 'ca']"
            :key="lang"
            @click="setLocale(lang)"
            :style="{
              padding: '0.35rem 0.7rem',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '0.8rem',
              cursor: 'pointer',
              border: 'none',
              background: parentAppLocale === lang ? '#0f172a' : 'transparent',
              color: parentAppLocale === lang ? '#ffffff' : '#475569'
            }"
          >
            {{ lang.toUpperCase() }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main style="max-width: 900px; margin: 2rem auto; padding: 0 1.5rem;">
      <template v-if="activeTab === 'demo'">
        <!-- Hero Card -->
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
          <h2 style="margin-top: 0; color: #0f172a; font-size: 1.35rem;">Integración Reactiva en Vue 3 y Nuxt 3</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 1.25rem;">
            Este ejemplo demuestra la utilización de los composables reactivos oficiales (<code>useConsent</code>, <code>useConsentService</code>, <code>useGpc</code>, <code>useSyncConsentLocale</code>) y el componente declarativo <code>&lt;ConsentGate&gt;</code> en aplicaciones Vue 3 y Nuxt 3.
          </p>

          <!-- Action Buttons -->
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
              ⚙️ Abrir Preferencias (2ª Capa)
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
              🔄 Revocar / Reiniciar
            </button>
          </div>
        </div>

        <!-- Feature Demos -->
        <YouTubeWidget />
        <AnalyticsTracker />
        <GpcStatus />
      </template>

      <template v-else>
        <CookiePolicyPage />
      </template>
    </main>

    <!-- Footer -->
    <footer style="text-align: center; padding: 2rem; color: #64748b; font-size: 0.85rem; border-top: 1px solid #e2e8f0;">
      Solvenza Cookies Compliance — Adaptado a LSSI art. 22.2, AEPD mayo 2024 y RGPD.
    </footer>
  </div>
</template>
