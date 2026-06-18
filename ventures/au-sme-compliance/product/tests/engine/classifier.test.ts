/**
 * Classifier Tests
 * Tests for: classifyEmployee, classifyAll
 * Covers all 3 awards and confidence scoring logic.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { classifyEmployee, classifyAll } from "../../src/engine/classifier.ts";
import type { EmployeeRow } from "../../src/engine/csvParser.ts";

function makeRow(overrides: Partial<EmployeeRow> = {}): EmployeeRow {
  return {
    employeeRef: "Test Employee",
    roleTitle: "Kitchen Hand",
    weeklyHours: 38,
    currentPayRateHourly: 22.00,
    employmentType: "full_time",
    dateOfBirth: null,
    rowIndex: 1,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Hospitality Award (MA000009)
// ---------------------------------------------------------------------------

describe("classifyEmployee — Hospitality Award (MA000009)", () => {
  it("classifies 'Kitchen Hand' as Grade 1 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Kitchen Hand" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.classificationId, "cls-hosp-grade1");
    assert.equal(result.classificationLevel, "Grade 1");
    assert.equal(result.confidenceScore, "HIGH");
    assert.ok(result.fwcRateHourly !== null);
  });

  it("classifies 'Waitress' as Grade 2 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Waitress" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.classificationId, "cls-hosp-grade2");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Chef' as Grade 7 (senior role keyword match)", () => {
    // "Chef" (unqualified) matches Grade 7 via the "chef" keyword (weight 5).
    // No other grade has a plain "chef" keyword after fixture update.
    const row = makeRow({ roleTitle: "Chef" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.classificationId, "cls-hosp-grade7");
  });

  it("classifies 'Head Chef' as Grade 7 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Head Chef" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.classificationId, "cls-hosp-grade7");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Cook' as Grade 3 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Cook" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.classificationId, "cls-hosp-grade3");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'General Manager' as MEDIUM or HIGH (ambiguous across grades)", () => {
    const row = makeRow({ roleTitle: "General Manager" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    // "General Manager" matches Grade 7 strongly; but "Manager" also matches Grade 5/7
    assert.ok(["MEDIUM", "HIGH"].includes(result.confidenceScore));
    assert.ok(result.classificationId !== null);
  });

  it("returns LOW confidence for an unrecognised role title", () => {
    const row = makeRow({ roleTitle: "Quantum Engineer" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.confidenceScore, "LOW");
    assert.equal(result.classificationId, null);
    assert.equal(result.gapDirection, "EXCLUDED");
    assert.ok(result.exclusionReason !== null);
  });

  it("calculates correct FWC rate for Grade 1 full_time", () => {
    const row = makeRow({ roleTitle: "Kitchen Hand", employmentType: "full_time" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.fwcRateHourly, 23.23);
  });

  it("calculates correct FWC rate for Grade 1 casual (25% loading)", () => {
    const row = makeRow({ roleTitle: "Kitchen Hand", employmentType: "casual" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.fwcRateHourly, 29.04);
  });

  it("detects UNDERPAID when current rate is below FWC rate", () => {
    const row = makeRow({
      roleTitle: "Kitchen Hand",
      currentPayRateHourly: 20.00, // below 23.23
      weeklyHours: 38,
      employmentType: "full_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapDirection, "UNDERPAID");
    assert.ok(result.gapHourly !== null && result.gapHourly < 0);
    assert.ok(result.gapWeekly !== null && result.gapWeekly < 0);
  });

  it("detects OVERPAID when current rate is above FWC rate", () => {
    const row = makeRow({
      roleTitle: "Kitchen Hand",
      currentPayRateHourly: 30.00, // above 23.23
      weeklyHours: 38,
      employmentType: "full_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapDirection, "OVERPAID");
    assert.ok(result.gapHourly !== null && result.gapHourly > 0);
  });

  it("detects AT_RATE when current rate matches FWC rate exactly", () => {
    const row = makeRow({
      roleTitle: "Kitchen Hand",
      currentPayRateHourly: 23.23,
      weeklyHours: 38,
      employmentType: "full_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapDirection, "AT_RATE");
    assert.equal(result.gapHourly, 0);
  });

  it("calculates gap_weekly correctly", () => {
    const row = makeRow({
      roleTitle: "Kitchen Hand",
      currentPayRateHourly: 22.00, // 23.23 - 22.00 = -1.23/hr
      weeklyHours: 38,
      employmentType: "full_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapHourly, -1.23);
    // -1.23 × 38 = -46.74
    assert.equal(result.gapWeekly, -46.74);
  });

  it("returns EXCLUDED when weekly_hours is null", () => {
    const row = makeRow({ weeklyHours: null });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapDirection, "EXCLUDED");
    assert.ok(result.exclusionReason !== null);
  });

  it("returns EXCLUDED when currentPayRateHourly is null", () => {
    const row = makeRow({ currentPayRateHourly: null });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    assert.equal(result.gapDirection, "EXCLUDED");
  });

  it("uses full_time rate when employment_type is 'unknown'", () => {
    const row = makeRow({ roleTitle: "Kitchen Hand", employmentType: "unknown" });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    // Should not be EXCLUDED just because of unknown employment type
    assert.equal(result.classificationId, "cls-hosp-grade1");
    assert.equal(result.fwcRateHourly, 23.23); // full_time rate
  });

  it("never returns a null confidence_score (NFR-L3)", () => {
    const rows = [
      makeRow({ roleTitle: "Kitchen Hand" }),
      makeRow({ roleTitle: "Quantum Engineer" }),
      makeRow({ weeklyHours: null }),
      makeRow({ currentPayRateHourly: null }),
    ];
    for (const row of rows) {
      const result = classifyEmployee(row, { awardCode: "MA000009" });
      assert.ok(result.confidenceScore !== null && result.confidenceScore !== undefined,
        `confidenceScore should never be null; got ${result.confidenceScore} for ${row.roleTitle}`);
    }
  });
});

// ---------------------------------------------------------------------------
// Retail Award (MA000004)
// ---------------------------------------------------------------------------

describe("classifyEmployee — Retail Award (MA000004)", () => {
  it("classifies 'Sales Assistant' as Grade 2 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Sales Assistant" });
    const result = classifyEmployee(row, { awardCode: "MA000004" });
    assert.equal(result.classificationId, "cls-retail-grade2");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Store Manager' as Grade 7 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Store Manager" });
    const result = classifyEmployee(row, { awardCode: "MA000004" });
    assert.equal(result.classificationId, "cls-retail-grade7");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Visual Merchandiser' as Grade 4", () => {
    const row = makeRow({ roleTitle: "Visual Merchandiser" });
    const result = classifyEmployee(row, { awardCode: "MA000004" });
    assert.equal(result.classificationId, "cls-retail-grade4");
  });

  it("calculates correct FWC rate for Grade 2 full_time", () => {
    const row = makeRow({ roleTitle: "Sales Assistant", employmentType: "full_time" });
    const result = classifyEmployee(row, { awardCode: "MA000004" });
    assert.equal(result.fwcRateHourly, 23.23);
  });

  it("detects underpayment for retail sales assistant paid below minimum", () => {
    const row = makeRow({
      roleTitle: "Sales Assistant",
      currentPayRateHourly: 20.00,
      weeklyHours: 25,
      employmentType: "part_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000004" });
    assert.equal(result.gapDirection, "UNDERPAID");
    // FWC: 23.23, current: 20.00, gap: -3.23/hr, weekly: -3.23 × 25 = -80.75
    assert.equal(result.gapHourly, -3.23);
    assert.equal(result.gapWeekly, -80.75);
  });
});

// ---------------------------------------------------------------------------
// Clerks Award (MA000002)
// ---------------------------------------------------------------------------

describe("classifyEmployee — Clerks Award (MA000002)", () => {
  it("classifies 'Bookkeeper' as Level 3 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Bookkeeper" });
    const result = classifyEmployee(row, { awardCode: "MA000002" });
    assert.equal(result.classificationId, "cls-clerks-level3");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Payroll Officer' as Level 3 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Payroll Officer" });
    const result = classifyEmployee(row, { awardCode: "MA000002" });
    assert.equal(result.classificationId, "cls-clerks-level3");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Office Manager' as Level 5 with HIGH confidence", () => {
    const row = makeRow({ roleTitle: "Office Manager" });
    const result = classifyEmployee(row, { awardCode: "MA000002" });
    assert.equal(result.classificationId, "cls-clerks-level5");
    assert.equal(result.confidenceScore, "HIGH");
  });

  it("classifies 'Data Entry' as Level 1", () => {
    const row = makeRow({ roleTitle: "Data Entry Clerk" });
    const result = classifyEmployee(row, { awardCode: "MA000002" });
    assert.equal(result.classificationId, "cls-clerks-level1");
  });

  it("classifies 'Receptionist' as Level 2", () => {
    const row = makeRow({ roleTitle: "Receptionist" });
    const result = classifyEmployee(row, { awardCode: "MA000002" });
    assert.equal(result.classificationId, "cls-clerks-level2");
  });
});

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

describe("classifyEmployee — Edge cases", () => {
  it("returns LOW confidence for an unsupported award code", () => {
    const row = makeRow({ roleTitle: "Kitchen Hand" });
    const result = classifyEmployee(row, { awardCode: "MA999999" });
    assert.equal(result.confidenceScore, "LOW");
    assert.equal(result.gapDirection, "EXCLUDED");
    assert.ok(result.exclusionReason?.includes("not supported"));
  });

  it("classifyAll processes multiple rows correctly", () => {
    const rows: EmployeeRow[] = [
      makeRow({ employeeRef: "Alice", roleTitle: "Kitchen Hand", currentPayRateHourly: 22.00, weeklyHours: 38 }),
      makeRow({ employeeRef: "Bob", roleTitle: "Chef", currentPayRateHourly: 28.00, weeklyHours: 38 }),
      makeRow({ employeeRef: "Carol", roleTitle: "Unknown Role XYZ", currentPayRateHourly: 20.00, weeklyHours: 20 }),
    ];

    const results = classifyAll(rows, "MA000009");
    assert.equal(results.length, 3);
    assert.equal(results[0].employeeRef, "Alice");
    assert.equal(results[1].employeeRef, "Bob");
    assert.equal(results[2].confidenceScore, "LOW");
  });

  it("gap is rounded to 2 decimal places", () => {
    // 23.23 - 22.11 = 1.12 exactly — check rounding
    const row = makeRow({
      roleTitle: "Kitchen Hand",
      currentPayRateHourly: 22.11,
      weeklyHours: 38,
      employmentType: "full_time",
    });
    const result = classifyEmployee(row, { awardCode: "MA000009" });
    // 22.11 - 23.23 = -1.12
    assert.equal(result.gapHourly, -1.12);
    // -1.12 × 38 = -42.56
    assert.equal(result.gapWeekly, -42.56);
  });
});
