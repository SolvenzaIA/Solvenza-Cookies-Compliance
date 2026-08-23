"use client";

import React, { useEffect, useRef } from "react";
import { Consent } from "@solvenza/cookies-compliance";

export default function CookiePolicyPage() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      Consent.ready().then(() => {
        Consent.mountPolicy(tableRef.current!);
      });
    }
  }, []);

  return (
    <main style={{ maxWidth: "800px", margin: "3rem auto", fontFamily: "sans-serif" }}>
      <h1>Política de Cookies de Solvenza Cookies Compliance</h1>
      <div ref={tableRef} />
    </main>
  );
}
