<script setup lang="ts">
import { ref } from "vue";
import { CookiePolicy, LegalNotice } from "@solvenza/cookies-compliance/vue";

const selectedView = ref<"policy" | "table" | "notice">("policy");
</script>

<template>
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; margin-bottom: 2rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <!-- View Switcher -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; flex-wrap: wrap;">
      <button
        @click="selectedView = 'policy'"
        :style="{
          padding: '0.45rem 0.9rem',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '0.85rem',
          cursor: 'pointer',
          border: 'none',
          background: selectedView === 'policy' ? '#0f172a' : '#f1f5f9',
          color: selectedView === 'policy' ? '#ffffff' : '#475569'
        }"
      >
        📄 Política de Cookies Completa (&lt;CookiePolicy view="full"&gt;)
      </button>
      <button
        @click="selectedView = 'table'"
        :style="{
          padding: '0.45rem 0.9rem',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '0.85rem',
          cursor: 'pointer',
          border: 'none',
          background: selectedView === 'table' ? '#0f172a' : '#f1f5f9',
          color: selectedView === 'table' ? '#ffffff' : '#475569'
        }"
      >
        📊 Solo Tabla de Cookies (&lt;CookiePolicy view="table-only"&gt;)
      </button>
      <button
        @click="selectedView = 'notice'"
        :style="{
          padding: '0.45rem 0.9rem',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '0.85rem',
          cursor: 'pointer',
          border: 'none',
          background: selectedView === 'notice' ? '#0f172a' : '#f1f5f9',
          color: selectedView === 'notice' ? '#ffffff' : '#475569'
        }"
      >
        ⚖️ Aviso Legal LSSI-CE Art. 10 (&lt;LegalNotice&gt;)
      </button>
    </div>

    <!-- Component Views -->
    <div v-if="selectedView === 'policy'">
      <CookiePolicy view="full" />
    </div>
    <div v-else-if="selectedView === 'table'">
      <h3 style="margin-top: 0; color: #1e293b;">Inventario de Cookies Registradas</h3>
      <p style="color: #64748b; font-size: 0.9rem;">
        Tabla modular autogenerada a partir de los servicios y categorías configurados.
      </p>
      <CookiePolicy view="table-only" />
    </div>
    <div v-else>
      <LegalNotice />
    </div>
  </div>
</template>
