import type { ConsentConfig } from "../core/types.js";

export type AuditSeverity = "CRITICAL" | "WARNING" | "INFO";

export interface AuditFinding {
  id: string;
  rule: string;
  severity: AuditSeverity;
  category: "CONFIG" | "SOURCE_CODE" | "LIVE_URL" | "LEGAL";
  message: string;
  details?: string;
  file?: string;
  line?: number;
  remediation?: string;
}

export interface AuditReport {
  timestamp: string;
  compliant: boolean;
  score: number; // 0 to 100
  summary: {
    critical: number;
    warnings: number;
    info: number;
    totalPassed: number;
  };
  findings: AuditFinding[];
  scannedFilesCount: number;
}

export interface AuditOptions {
  config?: ConsentConfig | string;
  configPath?: string;
  srcDir?: string;
  url?: string;
  failOnError?: boolean;
}
