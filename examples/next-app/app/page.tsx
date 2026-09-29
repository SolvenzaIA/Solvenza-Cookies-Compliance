"use client";

import React from "react";
import Link from "next/link";
import { Consent } from "@solvenza/cookies-compliance";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "3rem auto",
        padding: "0 1.5rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: 1.6,
        color: "#0f172a",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "1rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>
          Next.js 14+ App Router &bull; Solvenza Cookies Compliance
        </h1>
      </header>

      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "1.75rem",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>
          Demostración con Botón Flotante Permanente
        </h2>
        <p style={{ color: "#64748b" }}>
          El SDK se inicializa antes de la hidratación mediante{" "}
          <code>strategy=&quot;beforeInteractive&quot;</code> en <code>layout.tsx</code>{" "}
          y carga automáticamente <code>/consent.json</code> con el botón flotante activado.
        </p>

        <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
          <button
            type="button"
            onClick={() => Consent.openPreferences()}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#0f172a",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Abrir Preferencias
          </button>
          <button
            type="button"
            onClick={() => Consent.withdraw()}
            style={{
              padding: "0.6rem 1.2rem",
              background: "#ffffff",
              color: "#ef4444",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Revocar Consentimiento
          </button>
        </div>
      </div>

      <footer style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#64748b" }}>
        <Link href="/politica-cookies" style={{ color: "#2563eb", textDecoration: "underline" }}>
          Ver Política de Cookies
        </Link>
      </footer>
    </main>
  );
}
