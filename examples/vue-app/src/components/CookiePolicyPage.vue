<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Consent } from "@solvenza/cookies-compliance";

const tableContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  await Consent.ready();
  if (tableContainer.value) {
    Consent.mountPolicy(tableContainer.value);
  }
});
</script>

<template>
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <h2 style="margin-top: 0; color: #0f172a; font-size: 1.35rem;">Tabla Dinámica de Política de Cookies</h2>
    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem;">
      Generada automáticamente a partir de la configuración declarativa mediante <code>Consent.mountPolicy()</code>.
    </p>
    <div ref="tableContainer"></div>
  </div>
</template>
