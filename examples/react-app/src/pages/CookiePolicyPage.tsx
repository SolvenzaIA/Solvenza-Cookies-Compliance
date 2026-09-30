import { useState } from "react";
import { CookiePolicy, LegalNotice } from "@solvenza/cookies-compliance/react";

export function CookiePolicyPage() {
  const [selectedView, setSelectedView] = useState<"policy" | "table" | "notice">("policy");

  return (
    <div style={{ paddingTop: "1rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedView("policy")}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            border: "none",
            background: selectedView === "policy" ? "#0f172a" : "#f1f5f9",
            color: selectedView === "policy" ? "#ffffff" : "#475569",
          }}
        >
          📄 Política de Cookies Completa (&lt;CookiePolicy view="full" /&gt;)
        </button>
        <button
          onClick={() => setSelectedView("table")}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            border: "none",
            background: selectedView === "table" ? "#0f172a" : "#f1f5f9",
            color: selectedView === "table" ? "#ffffff" : "#475569",
          }}
        >
          📊 Solo Tabla de Cookies (&lt;CookiePolicy view="table-only" /&gt;)
        </button>
        <button
          onClick={() => setSelectedView("notice")}
          style={{
            padding: "0.45rem 0.9rem",
            borderRadius: "8px",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            border: "none",
            background: selectedView === "notice" ? "#0f172a" : "#f1f5f9",
            color: selectedView === "notice" ? "#ffffff" : "#475569",
          }}
        >
          ⚖️ Aviso Legal LSSI-CE Art. 10 (&lt;LegalNotice /&gt;)
        </button>
      </div>

      {selectedView === "policy" && <CookiePolicy view="full" />}
      {selectedView === "table" && (
        <div>
          <h3 style={{ marginTop: 0, color: "#1e293b" }}>Inventario de Cookies Registradas</h3>
          <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
            Tabla modular autogenerada a partir de los servicios y categorías configurados.
          </p>
          <CookiePolicy view="table-only" />
        </div>
      )}
      {selectedView === "notice" && <LegalNotice />}
    </div>
  );
}
