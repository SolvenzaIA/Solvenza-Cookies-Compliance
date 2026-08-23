import { useEffect, useRef } from "react";
import { Consent } from "@solvenza/cookies-compliance";

export function CookiePolicyPage() {
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current) {
      Consent.ready().then(() => {
        Consent.mountPolicy(tableRef.current!);
      });
    }
  }, []);

  return (
    <div style={{ paddingTop: "1rem" }}>
      <h2 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Declaración de Cookies</h2>
      <div ref={tableRef} />
    </div>
  );
}
