"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Consent } from "@solvenza/cookies-compliance";

const NEXT_PAGE_TEXTS: Record<string, {
  title: string;
  cardTitle: string;
  cardDesc: string;
  openPref: string;
  withdraw: string;
  policyLink: string;
}> = {
  es: {
    title: "Next.js 14+ App Router • Solvenza Cookies Compliance",
    cardTitle: "Demostración con Botón Flotante Permanente",
    cardDesc: "El SDK se inicializa antes de la hidratación mediante strategy=\"beforeInteractive\" en layout.tsx y carga automáticamente /consent.json con el botón flotante activado.",
    openPref: "Abrir Preferencias",
    withdraw: "Revocar Consentimiento",
    policyLink: "Ver Política de Cookies"
  },
  en: {
    title: "Next.js 14+ App Router • Solvenza Cookies Compliance",
    cardTitle: "Demonstration with Persistent Floating Badge",
    cardDesc: "The SDK initializes before hydration via strategy=\"beforeInteractive\" in layout.tsx and automatically loads /consent.json with the floating badge enabled.",
    openPref: "Open Preferences",
    withdraw: "Withdraw Consent",
    policyLink: "View Cookie Policy"
  },
  ca: {
    title: "Next.js 14+ App Router • Solvenza Cookies Compliance",
    cardTitle: "Demostració amb Botó Flotant Permanent",
    cardDesc: "L'SDK s'inicialitza abans de la hidratació mitjançant strategy=\"beforeInteractive\" a layout.tsx i carrega automàticament /consent.json amb el botó flotant activat.",
    openPref: "Obrir Preferències",
    withdraw: "Revocar Consentiment",
    policyLink: "Veure Política de Galetes"
  },
  eu: {
    title: "Next.js 14+ App Router • Solvenza Cookies Compliance",
    cardTitle: "Botoi Mugikor Iraunkorrarekin Erakustaldia",
    cardDesc: "SDK-a hidratazioaren aurretik hasieratzen da layout.tsx fitxategian strategy=\"beforeInteractive\" erabiliz eta automatikoki /consent.json kargatzen du botoi mugikorrarekin.",
    openPref: "Ireki Hobespenak",
    withdraw: "Baliogabetu Baimena",
    policyLink: "Ikusi Cookie Politika"
  },
  gl: {
    title: "Next.js 14+ App Router • Solvenza Cookies Compliance",
    cardTitle: "Demostración con Botón Flotante Permanente",
    cardDesc: "O SDK inicialízase antes da hidratación mediante strategy=\"beforeInteractive\" en layout.tsx e carga automaticamente /consent.json co botón flotante activado.",
    openPref: "Abrir Preferencias",
    withdraw: "Revogar Consentimento",
    policyLink: "Ver Política de Cookies"
  }
};

export default function HomePage() {
  const [locale, setLocale] = useState("es");

  useEffect(() => {
    const unsub = Consent.on("locale:changed", ({ locale: newLocale }) => {
      setLocale(newLocale);
    });
    return () => unsub();
  }, []);

  const switchLocale = (lang: string) => {
    setLocale(lang);
    document.documentElement.lang = lang;
    Consent.syncLocale(lang);
  };

  const t = NEXT_PAGE_TEXTS[locale] || NEXT_PAGE_TEXTS.es;

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
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.35rem", margin: 0 }}>
          {t.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "#f1f5f9", padding: "4px 6px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", paddingRight: "4px" }}>🌐 i18n:</span>
          {(["es", "en", "ca", "eu", "gl"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => switchLocale(lang)}
              style={{
                border: "none",
                background: locale === lang ? "#0f172a" : "transparent",
                color: locale === lang ? "#ffffff" : "#475569",
                padding: "0.25rem 0.55rem",
                borderRadius: "6px",
                fontWeight: 700,
                fontSize: "0.75rem",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
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
          {t.cardTitle}
        </h2>
        <p style={{ color: "#64748b" }}>
          {t.cardDesc}
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
            {t.openPref}
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
            {t.withdraw}
          </button>
        </div>
      </div>

      <footer style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#64748b" }}>
        <Link href="/politica-cookies" style={{ color: "#2563eb", textDecoration: "underline" }}>
          {t.policyLink}
        </Link>
      </footer>
    </main>
  );
}
