import React from "react";
import Script from "next/script";

export const metadata = {
  title: "Solvenza Cookies Compliance - Next.js App Router",
  description: "Next.js 14+ example with GDPR/AEPD cookie compliance and floating revocation badge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Automatic pre-hydration script with floatingBadge configured in consent.json */}
        <Script
          src="/vendor/consent.min.js"
          data-config="/consent.json"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
