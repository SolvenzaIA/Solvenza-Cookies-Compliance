<script setup lang="ts">
import { useGpc } from "@solvenza/cookies-compliance/vue";

const isGpcActive = useGpc();
</script>

<template>
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;">
      <span>🛡️</span> Global Privacy Control (GPC) (`useGpc`)
    </h3>
    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 0.5rem;">
      Detección de la señal universal de privacidad W3C (<code>navigator.globalPrivacyControl</code>):
    </p>
    <div
      :style="{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.8rem',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '0.88rem',
        background: isGpcActive ? '#eff6ff' : '#f1f5f9',
        color: isGpcActive ? '#1d4ed8' : '#475569',
        border: isGpcActive ? '1px solid #bfdbfe' : '1px solid #e2e8f0'
      }"
    >
      <span>{{ isGpcActive ? '🟢 Señal GPC Detectada y Respetada' : '⚪ Sin señal GPC activa en el navegador' }}</span>
    </div>
  </div>
</template>
