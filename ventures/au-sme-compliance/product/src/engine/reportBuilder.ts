/**
 * Audit Report Data Structure Builder
 *
 * Pure module — no network, no DB, no credentials needed.
 * Assembles classification results into an AuditReport data structure.
 * PDF rendering is handled separately by the pdfGenerator module.
 */

import { RATE_TABLE_EFFECTIVE_DATE } from "../fixtures/awards.ts";
import type { ClassificationResult } from "./classifier.ts";

export const DISCLAIMER_VERSION = "v1.0-pending-solicitor-approval";

/**
 * Solicitor-approved disclaimer text (placeholder — must be replaced with
 * actual solicitor-reviewed text before beta launch per NFR-L1).
 */
export const DISCLAIMER_TEXT =
  "This report does not constitute legal advice or payroll advice. " +
  "The employer retains sole responsibility for all pay decisions. " +
  "Results are as at the date shown. Award rates are updated annually each July. " +
  "Verify before each pay run. " +
  "This tool generates evidence of a structured pay-rate compliance check. " +
  "It does not constitute legal advice, does not constitute payroll advice, " +
  "and does not achieve safe-harbour status under the Voluntary Small Business " +
  "Wage Compliance Code.";

export const DISCLAIMER_SHORT =
  "This is a compliance check tool, not legal or payroll advice. " +
  "Results are indicative only. The employer retains sole responsibility " +
  "for all pay decisions.";

export interface AuditReportSummary {
  employeeCountChecked: number;
  employeeCountGaps: number;
  employeeCountLowConfidence: number;
  totalGapWeeklyAud: number;
  /** True when > 50% employees have LOW confidence (NFR-L3 banner trigger) */
  majorityLowConfidence: boolean;
}

export interface AuditReport {
  /** Generated at timestamp */
  generatedAt: string;
  /** The FWC rate table effective date used for all comparisons */
  rateTableEffectiveDate: string;
  /** Award name checked */
  awardName: string;
  /** Award code e.g. "MA000009" */
  awardCode: string;
  /** Business name from account (provided by caller) */
  businessName: string;
  /** Disclaimer version for audit trail */
  disclaimerVersion: string;
  /** Full disclaimer text */
  disclaimerText: string;
  /** Short form disclaimer for UI */
  disclaimerShort: string;
  summary: AuditReportSummary;
  employees: ClassificationResult[];
}

/**
 * Build an AuditReport from classification results.
 */
export function buildAuditReport(options: {
  results: ClassificationResult[];
  awardName: string;
  awardCode: string;
  businessName: string;
  checkDate?: string;
}): AuditReport {
  const { results, awardName, awardCode, businessName } = options;
  const generatedAt = options.checkDate ?? new Date().toISOString();

  const checked = results.filter((r) => r.gapDirection !== "EXCLUDED");
  const gaps = results.filter(
    (r) => r.gapDirection === "UNDERPAID" || r.gapDirection === "OVERPAID"
  );
  const lowConfidence = results.filter((r) => r.confidenceScore === "LOW");

  const totalGapWeeklyAud = results
    .filter((r) => r.gapDirection === "UNDERPAID")
    .reduce((sum, r) => sum + Math.abs(r.gapWeekly ?? 0), 0);

  const majorityLowConfidence =
    results.length > 0 && lowConfidence.length / results.length > 0.5;

  return {
    generatedAt,
    rateTableEffectiveDate: RATE_TABLE_EFFECTIVE_DATE,
    awardName,
    awardCode,
    businessName,
    disclaimerVersion: DISCLAIMER_VERSION,
    disclaimerText: DISCLAIMER_TEXT,
    disclaimerShort: DISCLAIMER_SHORT,
    summary: {
      employeeCountChecked: checked.length,
      employeeCountGaps: gaps.length,
      employeeCountLowConfidence: lowConfidence.length,
      totalGapWeeklyAud: round2(totalGapWeeklyAud),
      majorityLowConfidence,
    },
    employees: results,
  };
}

/**
 * Check that the report contains no prohibited language (NFR-L2).
 * Returns a list of violations found.
 */
export function checkProhibitedLanguage(text: string): string[] {
  const prohibited = [
    "safe harbour",
    "safe harbor",
    "achieves compliance",
    "is compliant",
    "achieves code compliance",
    "meets the code",
    "no action required",
  ];
  const lower = text.toLowerCase();
  return prohibited.filter((phrase) => lower.includes(phrase));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
