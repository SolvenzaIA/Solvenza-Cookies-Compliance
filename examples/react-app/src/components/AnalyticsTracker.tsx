import { useEffect } from "react";
import { useConsent } from "@solvenza/cookies-compliance/react";

export function AnalyticsTracker() {
  const isAnalyticsAllowed = useConsent("analytics");

  useEffect(() => {
    if (isAnalyticsAllowed) {
      console.log("[Solvenza React] Analytics telemetry initialized.");
    }
  }, [isAnalyticsAllowed]);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.9rem",
        borderRadius: "9999px",
        background: isAnalyticsAllowed ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
        border: `1px solid ${isAnalyticsAllowed ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
        color: isAnalyticsAllowed ? "#059669" : "#dc2626",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          background: isAnalyticsAllowed ? "#10b981" : "#ef4444",
          boxShadow: isAnalyticsAllowed ? "0 0 8px #10b981" : "none",
        }}
      />
      Analítica: {isAnalyticsAllowed ? "Activa" : "Bloqueada"}
    </div>
  );
}
