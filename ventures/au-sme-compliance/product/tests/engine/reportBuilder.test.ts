/**
 * Report Builder Tests
 * Tests for: buildAuditReport, checkProhibitedLanguage
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildAuditReport,
  checkProhibitedLanguage,
  DISCLAIMER_TEXT,
  DISCLAIMER_SHORT,
  DISCLAIMER_VERSION,
} from "../../src/engine/reportBuilder.ts";
import type { ClassificationResult } from "../../src/engine/classifier.ts";

function makeResult(overrides: Partial<ClassificationResult> = {}): ClassificationResult {
  return {
    employeeRef: "Alice Smith",
    roleTitle: "Kitchen Hand",
    employmentType: "full_time",
    weeklyHours: 38,
    currentPayRateHourly: 22.00,
    classificationId: "cls-hosp-grade1",
    classificationLevel: "Grade 1",
    classificationLabel: "Hospitality — Grade 1",
    confidenceScore: "HIGH",
    fwcRateHourly: 23.23,
    gapHourly: -1.23,
    gapWeekly: -46.74,
    gapDirection: "UNDERPAID",
    exclusionReason: null,
    matchScore: 10,
    ...overrides,
  };
}

describe("buildAuditReport", () => {
  it("builds a report with correct summary counts", () => {
    const results: ClassificationResult[] = [
      makeResult({ employeeRef: "Alice", gapDirection: "UNDERPAID", gapWeekly: -46.74 }),
      makeResult({ employeeRef: "Bob", gapDirection: "OVERPAID", gapWeekly: 20.00, gapHourly: 0.53 }),
      makeResult({ employeeRef: "Carol", gapDirection: "AT_RATE", gapHourly: 0, gapWeekly: 0 }),
      makeResult({ employeeRef: "Dave", confidenceScore: "LOW", gapDirection: "EXCLUDED", gapHourly: null, gapWeekly: null }),
    ];

    const report = buildAuditReport({
      results,
      awardName: "Hospitality Industry (General) Award 2020",
      awardCode: "MA000009",
      businessName: "Test Cafe Pty Ltd",
    });

    // All rows except EXCLUDED count as "checked"
    assert.equal(report.summary.employeeCountChecked, 3);
    // UNDERPAID and OVERPAID = 2 gaps
    assert.equal(report.summary.employeeCountGaps, 2);
    // 1 LOW confidence employee
    assert.equal(report.summary.employeeCountLowConfidence, 1);
    // Total underpayment only (positive AUD weekly gap amount)
    assert.equal(report.summary.totalGapWeeklyAud, 46.74);
  });

  it("sets majorityLowConfidence to true when > 50% are LOW", () => {
    const results: ClassificationResult[] = [
      makeResult({ confidenceScore: "LOW", gapDirection: "EXCLUDED" }),
      makeResult({ confidenceScore: "LOW", gapDirection: "EXCLUDED" }),
      makeResult({ confidenceScore: "HIGH", gapDirection: "AT_RATE", gapHourly: 0, gapWeekly: 0 }),
    ];

    const report = buildAuditReport({
      results,
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });

    assert.equal(report.summary.majorityLowConfidence, true);
  });

  it("sets majorityLowConfidence to false when <= 50% are LOW", () => {
    const results: ClassificationResult[] = [
      makeResult({ confidenceScore: "HIGH", gapDirection: "AT_RATE", gapHourly: 0, gapWeekly: 0 }),
      makeResult({ confidenceScore: "HIGH", gapDirection: "AT_RATE", gapHourly: 0, gapWeekly: 0 }),
      makeResult({ confidenceScore: "LOW", gapDirection: "EXCLUDED" }),
    ];

    const report = buildAuditReport({
      results,
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });

    assert.equal(report.summary.majorityLowConfidence, false);
  });

  it("includes the rate table effective date", () => {
    const report = buildAuditReport({
      results: [makeResult()],
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });

    assert.equal(report.rateTableEffectiveDate, "2025-07-01");
  });

  it("includes the disclaimer text and version", () => {
    const report = buildAuditReport({
      results: [makeResult()],
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });

    assert.equal(report.disclaimerVersion, DISCLAIMER_VERSION);
    assert.equal(report.disclaimerText, DISCLAIMER_TEXT);
    assert.equal(report.disclaimerShort, DISCLAIMER_SHORT);
  });

  it("accepts a custom check date", () => {
    const customDate = "2025-07-01T00:00:00.000Z";
    const report = buildAuditReport({
      results: [makeResult()],
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
      checkDate: customDate,
    });

    assert.equal(report.generatedAt, customDate);
  });

  it("includes all employees in the report", () => {
    const results = [makeResult(), makeResult({ employeeRef: "Bob" })];
    const report = buildAuditReport({
      results,
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });

    assert.equal(report.employees.length, 2);
  });

  it("rounds total_gap_weekly_aud to 2 decimal places", () => {
    const results: ClassificationResult[] = [
      makeResult({ gapDirection: "UNDERPAID", gapWeekly: -33.333 }),
      makeResult({ gapDirection: "UNDERPAID", gapWeekly: -20.007 }),
    ];
    const report = buildAuditReport({
      results,
      awardName: "Test Award",
      awardCode: "MA000009",
      businessName: "Test Co",
    });
    // 33.333 + 20.007 = 53.34 (rounded)
    assert.equal(report.summary.totalGapWeeklyAud, 53.34);
  });
});

describe("checkProhibitedLanguage (NFR-L2)", () => {
  it("flags 'safe harbour' in text", () => {
    const violations = checkProhibitedLanguage("This product achieves safe harbour status.");
    assert.ok(violations.includes("safe harbour"));
  });

  it("flags 'achieves compliance' in text", () => {
    const violations = checkProhibitedLanguage("Your payroll achieves compliance.");
    assert.ok(violations.includes("achieves compliance"));
  });

  it("flags 'is compliant' in text", () => {
    const violations = checkProhibitedLanguage("Your business IS COMPLIANT with FWC requirements.");
    assert.ok(violations.includes("is compliant"));
  });

  it("flags 'no action required' in text", () => {
    const violations = checkProhibitedLanguage("No action required for these employees.");
    assert.ok(violations.includes("no action required"));
  });

  it("returns empty array for clean text", () => {
    const violations = checkProhibitedLanguage(
      "This report generates evidence of a structured pay-rate compliance check. " +
      "Results are indicative only. The employer retains sole responsibility."
    );
    assert.equal(violations.length, 0);
  });

  it("the main DISCLAIMER_TEXT contains no prohibited language (NFR-L2)", () => {
    const violations = checkProhibitedLanguage(DISCLAIMER_TEXT);
    assert.equal(violations.length, 0,
      `DISCLAIMER_TEXT contains prohibited phrases: ${violations.join(", ")}`);
  });

  it("the DISCLAIMER_SHORT contains no prohibited language", () => {
    const violations = checkProhibitedLanguage(DISCLAIMER_SHORT);
    assert.equal(violations.length, 0);
  });

  it("detects 'safe harbor' (US spelling)", () => {
    const violations = checkProhibitedLanguage("achieves safe harbor protection");
    assert.ok(violations.includes("safe harbor"));
  });

  it("is case-insensitive", () => {
    const violations = checkProhibitedLanguage("SAFE HARBOUR ACHIEVED");
    assert.ok(violations.includes("safe harbour"));
  });
});

describe("Disclaimer requirements (NFR-L1)", () => {
  it("DISCLAIMER_TEXT contains 'does not constitute legal advice'", () => {
    assert.ok(DISCLAIMER_TEXT.toLowerCase().includes("does not constitute legal advice"));
  });

  it("DISCLAIMER_TEXT contains 'does not constitute payroll advice'", () => {
    assert.ok(DISCLAIMER_TEXT.toLowerCase().includes("does not constitute payroll advice"));
  });

  it("DISCLAIMER_TEXT contains 'employer retains sole responsibility'", () => {
    assert.ok(DISCLAIMER_TEXT.toLowerCase().includes("employer retains sole responsibility"));
  });

  it("DISCLAIMER_TEXT contains 'verify before each pay run'", () => {
    assert.ok(DISCLAIMER_TEXT.toLowerCase().includes("verify before each pay run"));
  });

  it("DISCLAIMER_VERSION is set and non-empty", () => {
    assert.ok(DISCLAIMER_VERSION.length > 0);
  });
});
