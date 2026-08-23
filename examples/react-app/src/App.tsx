import { useEffect, useState } from "react";
import { Consent, ConsentConfigBuilder } from "@solvenza/cookies-compliance";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import { YouTubeWidget } from "./components/YouTubeWidget";
import { CookiePolicyPage } from "./pages/CookiePolicyPage";

export function App() {
  const [initialized, setInitialized] = useState(false);
  const [activeTab, setActiveTab] = useState<"demo" | "policy">("demo");

  useEffect(() => {
    const config = new ConsentConfigBuilder("2026-08-23")
      .setPolicyUrls("/politica-privacidad", "/politica-cookies")
      .addCategory("analytics", {
        required: false,
        label: "Analítica de uso",
        description: "Permite medir de forma agregada cómo se utiliza la aplicación.",
      })
      .addCategory("marketing", {
        required: false,
        label: "Marketing y Vídeo",
        description: "Permite la reproducción de vídeos incrustados y personalización.",
      })
      .addService("ga4", {
        category: "analytics",
        label: "Google Analytics 4",
        provider: "Google",
      })
      .addService("youtube", {
        category: "marketing",
        label: "YouTube Embed",
        provider: "Google",
      })
      .build();

    void Consent.init(config).then(() => setInitialized(true));
  }, []);

  if (!initialized) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif", color: "#0f172a" }}>
      {/* Sleek Top Navigation */}
      <header
        style={{
          borderBottom: "1px solid #e2e8f0",
          background: "#ffffff",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.9rem",
            }}
          >
            S
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>Solvenza Cookies Compliance</span>
        </div>

        <nav style={{ display: "flex", gap: "0.4rem" }}>
          <button
            onClick={() => setActiveTab("demo")}
            style={{
              border: "none",
              background: activeTab === "demo" ? "#f1f5f9" : "transparent",
              color: activeTab === "demo" ? "#0f172a" : "#64748b",
              padding: "0.5rem 0.9rem",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            Demostración
          </button>
          <button
            onClick={() => setActiveTab("policy")}
            style={{
              border: "none",
              background: activeTab === "policy" ? "#f1f5f9" : "transparent",
              color: activeTab === "policy" ? "#0f172a" : "#64748b",
              padding: "0.5rem 0.9rem",
              borderRadius: "8px",
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
            }}
          >
            Política de Cookies
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: "760px", margin: "2.5rem auto", padding: "0 1.5rem" }}>
        {activeTab === "demo" ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
                  Integración React 18+
                </h1>
                <p style={{ margin: "0.2rem 0 0 0", color: "#64748b", fontSize: "0.92rem" }}>
                  Comportamiento reactivo out-of-the-box con TypeScript
                </p>
              </div>
              <AnalyticsTracker />
            </div>

            <YouTubeWidget />

            {/* Minimal Action Bar */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "0.8rem",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => Consent.openPreferences()}
                style={{
                  padding: "0.65rem 1.3rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "#0f172a",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                }}
              >
                Ajustes de Privacidad
              </button>
              <button
                onClick={() => Consent.withdraw()}
                style={{
                  padding: "0.65rem 1.1rem",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#ef4444",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                }}
              >
                Revocar
              </button>
            </div>
          </div>
        ) : (
          <CookiePolicyPage />
        )}
      </main>

      {/* Sleek Footer */}
      <footer style={{ marginTop: "4rem", textAlign: "center", padding: "2rem 0", color: "#94a3b8", fontSize: "0.82rem" }}>
        <span>Solvenza Cookies Compliance &bull; LSSI art. 22.2 &amp; AEPD 2024 &bull; </span>
        <button
          type="button"
          data-consent-open
          style={{ border: "none", background: "none", color: "#64748b", cursor: "pointer", textDecoration: "underline", fontSize: "0.82rem" }}
        >
          Configurar preferencias
        </button>
      </footer>
    </div>
  );
}
