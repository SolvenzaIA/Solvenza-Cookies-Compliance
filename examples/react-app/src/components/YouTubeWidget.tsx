import { useConsent } from "@solvenza/cookies-compliance/react";

export function YouTubeWidget() {
  const isMarketingAllowed = useConsent("marketing");

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 40px -15px rgba(0,0,0,0.07)",
        border: "1px solid #e2e8f0",
        background: "#090d16",
        aspectRatio: "16 / 9",
        width: "100%",
      }}
    >
      {isMarketingAllowed ? (
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
          title="Vídeo de YouTube"
          style={{ border: 0, width: "100%", height: "100%" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            background: "radial-gradient(circle at center, #1e293b 0%, #090d16 100%)",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1.1rem", fontWeight: 600 }}>
            Vídeo Bloqueado por Privacidad
          </h4>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8", maxWidth: "360px", lineHeight: 1.5 }}>
            Autoriza la categoría de <strong>Marketing</strong> para reproducir contenido multimedia externo de YouTube.
          </p>
        </div>
      )}
    </div>
  );
}
