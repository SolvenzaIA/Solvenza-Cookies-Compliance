import type { ConsentConfig, DiagnosticReport } from "../core/types.js";

export class ResourceScanner {
  static runDiagnostic(_config: ConsentConfig, isConsentGiven: boolean): DiagnosticReport {
    const thirdPartyScripts: string[] = [];
    if (typeof document !== "undefined") {
      const scripts = document.querySelectorAll("script[src]");
      scripts.forEach((script) => {
        const src = script.getAttribute("src");
        if (src && (src.startsWith("http://") || src.startsWith("https://"))) {
          thirdPartyScripts.push(src);
        }
      });
    }

    return {
      timestamp: new Date().toISOString(),
      unblockedThirdPartyScripts: isConsentGiven ? [] : thirdPartyScripts,
      compliant: isConsentGiven || thirdPartyScripts.length === 0,
    };
  }

  scanThirdPartyResources(): string[] {
    return ResourceScanner.runDiagnostic({} as any, true).unblockedThirdPartyScripts;
  }
}
