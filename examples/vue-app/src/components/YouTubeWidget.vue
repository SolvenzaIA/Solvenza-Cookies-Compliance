<script setup lang="ts">
import { ConsentGate } from "@solvenza/cookies-compliance/vue";
import { Consent } from "@solvenza/cookies-compliance";

function openPreferences() {
  Consent.openPreferences();
}
</script>

<template>
  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: #1e293b; font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem;">
      <span>📺</span> Vídeo Embebido con &lt;ConsentGate&gt; (Vue 3 / Nuxt 3)
    </h3>
    <p style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">
      El iframe externo de YouTube se mantiene completamente aislado y bloqueado hasta que el usuario autoriza la categoría de <strong>marketing</strong>.
    </p>

    <ConsentGate category="marketing">
      <template #default>
        <div style="aspect-ratio: 16/9; max-width: 640px; border-radius: 8px; overflow: hidden; background: #000;">
          <iframe
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
            title="Demostración de Vídeo Autorizado"
            style="width: 100%; height: 100%; border: none;"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </template>

      <template #fallback>
        <div
          style="
            border: 2px dashed #cbd5e1;
            border-radius: 8px;
            padding: 2.5rem 1.5rem;
            text-align: center;
            background: #f8fafc;
            max-width: 640px;
          "
        >
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔒</div>
          <h4 style="margin: 0 0 0.5rem 0; color: #334155;">Contenido multimedia bloqueado</h4>
          <p style="margin: 0 0 1.25rem 0; color: #64748b; font-size: 0.88rem; max-width: 420px; margin-left: auto; margin-right: auto;">
            Para visualizar este reproductor de vídeo externo, debes activar la categoría de cookies de <strong>Marketing y Vídeo</strong>.
          </p>
          <button
            @click="openPreferences"
            style="
              background: #2563eb;
              color: #ffffff;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 6px;
              font-weight: 600;
              font-size: 0.88rem;
              cursor: pointer;
            "
          >
            Ajustar preferencias de cookies
          </button>
        </div>
      </template>
    </ConsentGate>
  </div>
</template>
