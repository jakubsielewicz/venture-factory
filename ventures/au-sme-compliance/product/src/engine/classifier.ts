/**
 * Award Classification Engine
 *
 * Pure module — no network, no DB, no credentials needed.
 *
 * Algorithm (per build-vs-buy.md spec):
 *  1. Filter classifications for the given award.
 *  2. For each classification, compute a keyword-match score against the
 *     employee's role_title (lower-cased).
 *  3. If exactly one classification scores > 0 AND the top score is >= the
 *     HIGH_CONFIDENCE_THRESHOLD: HIGH confidence.
 *  4. If top score is between MED and HIGH thresholds, or multiple
 *     classifications score > 0: MEDIUM confidence, pick highest scorer.
 *  5. If no classification scores above the LOW_THRESHOLD: LOW confidence,
 *     no classification assigned.
 */

import {
  AWARD_CLASSIFICATIONS,
  AWARD_RATES,
  type AwardClassification,
  type EmploymentType,
} from "../fixtures/awards.ts";
import type { EmployeeRow } from "./csvParser.ts";

export type ConfidenceScore = "HIGH" | "MEDIUM" | "LOW";
export type GapDirection = "UNDERPAID" | "OVERPAID" | "AT_RATE" | "EXCLUDED";

export interface ClassificationResult {
  employeeRef: string;
  roleTitle: string;
  employmentType: "full_time" | "part_time" | "casual" | "unknown";
  weeklyHours: number | null;
  currentPayRateHourly: number | null;
  /** null if classification failed */
  classificationId: string | null;
  /** e.g. "Grade 1" */
  classificationLevel: string | null;
  /** e.g. "Hospitality Industry (General) Award 2020 — Grade 1" */
  classificationLabel: string | null;
  confidenceScore: ConfidenceScore;
  fwcRateHourly: number | null;
  /** Positive = overpaid, Negative = underpaid, null if excluded */
  gapHourly: number | null;
  /** gapHourly × weeklyHours */
  gapWeekly: number | null;
  gapDirection: GapDirection;
  exclusionReason: string | null;
  /** The keyword score that led to this classification (for debugging) */
  matchScore: number;
}

// Thresholds (tuned against keyword weights in fixtures)
const HIGH_CONFIDENCE_THRESHOLD = 8;
const MEDIUM_CONFIDENCE_THRESHOLD = 3;

export interface ClassifyOptions {
  awardCode: string;
}

/**
 * Classify a single employee row against a specific award.
 */
export function classifyEmployee(
  row: EmployeeRow,
  options: ClassifyOptions
): ClassificationResult {
  const { awardCode } = options;

  const base: Omit<ClassificationResult, "classificationId" | "classificationLevel" | "classificationLabel" | "confidenceScore" | "fwcRateHourly" | "gapHourly" | "gapWeekly" | "gapDirection" | "exclusionReason" | "matchScore"> = {
    employeeRef: row.employeeRef,
    roleTitle: row.roleTitle,
    employmentType: row.employmentType,
    weeklyHours: row.weeklyHours,
    currentPayRateHourly: row.currentPayRateHourly,
  };

  // Handle missing required data
  if (!row.currentPayRateHourly || !row.weeklyHours) {
    return {
      ...base,
      classificationId: null,
      classificationLevel: null,
      classificationLabel: null,
      confidenceScore: "LOW",
      fwcRateHourly: null,
      gapHourly: null,
      gapWeekly: null,
      gapDirection: "EXCLUDED",
      exclusionReason: "Could not determine pay rate or hours from provided data.",
      matchScore: 0,
    };
  }

  // Get all classifications for the award
  const candidates = AWARD_CLASSIFICATIONS.filter(
    (c) => c.awardCode === awardCode
  );

  if (candidates.length === 0) {
    return {
      ...base,
      classificationId: null,
      classificationLevel: null,
      classificationLabel: null,
      confidenceScore: "LOW",
      fwcRateHourly: null,
      gapHourly: null,
      gapWeekly: null,
      gapDirection: "EXCLUDED",
      exclusionReason: `Award "${awardCode}" is not supported or has no classifications.`,
      matchScore: 0,
    };
  }

  // Score each candidate
  const scored = candidates
    .map((c) => ({ classification: c, score: scoreClassification(c, row.roleTitle) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      ...base,
      classificationId: null,
      classificationLevel: null,
      classificationLabel: null,
      confidenceScore: "LOW",
      fwcRateHourly: null,
      gapHourly: null,
      gapWeekly: null,
      gapDirection: "EXCLUDED",
      exclusionReason:
        "We could not map this employee to a supported award classification. Verify with the FWO Find My Award tool.",
      matchScore: 0,
    };
  }

  const topScore = scored[0].score;
  const topClassification = scored[0].classification;
  const hasMultipleMatches = scored.length > 1;

  let confidence: ConfidenceScore;
  if (topScore >= HIGH_CONFIDENCE_THRESHOLD && !hasMultipleMatches) {
    confidence = "HIGH";
  } else if (topScore >= HIGH_CONFIDENCE_THRESHOLD && hasMultipleMatches) {
    // High score but competing matches — still MEDIUM
    confidence = "MEDIUM";
  } else if (topScore >= MEDIUM_CONFIDENCE_THRESHOLD) {
    confidence = "MEDIUM";
  } else {
    confidence = "LOW";
  }

  // Look up the FWC rate
  const effectiveEmploymentType: EmploymentType =
    row.employmentType === "unknown" ? "full_time" : row.employmentType;

  const rateRecord = AWARD_RATES.find(
    (r) =>
      r.classificationId === topClassification.id &&
      r.employmentType === effectiveEmploymentType
  );

  if (!rateRecord) {
    return {
      ...base,
      classificationId: topClassification.id,
      classificationLevel: topClassification.level,
      classificationLabel: buildLabel(awardCode, topClassification),
      confidenceScore: "LOW",
      fwcRateHourly: null,
      gapHourly: null,
      gapWeekly: null,
      gapDirection: "EXCLUDED",
      exclusionReason: `No rate table entry found for classification ${topClassification.id} and employment type ${effectiveEmploymentType}.`,
      matchScore: topScore,
    };
  }

  const fwcRateHourly = rateRecord.rateHourly;
  const gapHourly = round2(row.currentPayRateHourly - fwcRateHourly);
  const gapWeekly = round2(gapHourly * row.weeklyHours);

  let gapDirection: GapDirection;
  if (Math.abs(gapHourly) < 0.01) {
    gapDirection = "AT_RATE";
  } else if (gapHourly < 0) {
    gapDirection = "UNDERPAID";
  } else {
    gapDirection = "OVERPAID";
  }

  return {
    ...base,
    classificationId: topClassification.id,
    classificationLevel: topClassification.level,
    classificationLabel: buildLabel(awardCode, topClassification),
    confidenceScore: confidence,
    fwcRateHourly,
    gapHourly,
    gapWeekly,
    gapDirection,
    exclusionReason: null,
    matchScore: topScore,
  };
}

/**
 * Classify all employees in a CSV result against a single award.
 */
export function classifyAll(
  rows: EmployeeRow[],
  awardCode: string
): ClassificationResult[] {
  return rows.map((row) => classifyEmployee(row, { awardCode }));
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

/**
 * Compute a weighted keyword-match score for a classification against a role title.
 * Returns 0 if no keywords match.
 */
function scoreClassification(
  classification: AwardClassification,
  roleTitle: string
): number {
  const lower = roleTitle.toLowerCase();
  let score = 0;

  for (const keyword of classification.keywords) {
    if (lower.includes(keyword.toLowerCase())) {
      const weight = classification.keywordWeights[keyword] ?? 5;
      score += weight;
    }
  }

  return score;
}

function buildLabel(awardCode: string, cls: AwardClassification): string {
  // Use a short form of the award name for the label
  const awardShortNames: Record<string, string> = {
    MA000009: "Hospitality",
    MA000004: "Retail",
    MA000002: "Clerks",
  };
  const short = awardShortNames[awardCode] ?? awardCode;
  return `${short} — ${cls.level}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
