<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useConsent, useConsentService } from "@solvenza/cookies-compliance/vue";

const hasAnalytics = useConsent("analytics");
const hasGa4 = useConsentService("ga4");
const eventLog = ref<string[]>([]);

watchEffect(() => {
  if (hasAnalytics.value) {
    eventLog.value.push(`[${new Date().toLocaleTimeString()}] ✅ Analítica activada: Inicializando GA4`);
  } else {
    eventLog.value.push(`[${new Date().toLocaleTimeString()}] ⛔ Analítica bloqueada: Tracking inactivo`);
  }
});

function simulateEvent() {
  if (hasGa4.value) {
    eventLog.value.push(`[${new Date().toLocaleTimeString()}] 📊 Evento enviado a GA4: 'user_action_click'`);
  } else {
    eventLog.value.push(`[${new Date().toLocaleTimeString()}] 🚫 Evento descartado (Consentimiento no otorgado)`);
  }
}
</script>

<template>
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;">
      <span>📈</span> Tracker Reactivo con Composables Vue 3 (`useConsent`)
    </h3>
    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">
      Estado reactivo de la categoría:
      <span
        :style="{
          display: 'inline-block',
          padding: '0.2rem 0.6rem',
          borderRadius: '9999px',
          fontWeight: '600',
          fontSize: '0.82rem',
          marginLeft: '0.4rem',
          background: hasAnalytics ? '#dcfce7' : '#fee2e2',
          color: hasAnalytics ? '#166534' : '#991b1b'
        }"
      >
        {{ hasAnalytics ? 'Autorizado (analytics = true)' : 'Bloqueado (analytics = false)' }}
      </span>
    </p>

    <button
      @click="simulateEvent"
      style="
        background: #0f172a;
        color: #ffffff;
        border: none;
        padding: 0.55rem 1.1rem;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        margin-bottom: 1rem;
      "
    >
      Simular Evento de Analítica
    </button>

    <div style="background: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 0.82rem; padding: 0.85rem; border-radius: 8px; max-height: 120px; overflow-y: auto;">
      <div v-for="(log, idx) in eventLog" :key="idx">{{ log }}</div>
    </div>
  </div>
</template>
