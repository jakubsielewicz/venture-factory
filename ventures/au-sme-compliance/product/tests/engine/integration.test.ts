/**
 * Integration Tests — Full pipeline
 * Tests the full runComplianceCheck pipeline end-to-end.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { runComplianceCheck } from "../../src/engine/index.ts";
import type { ColumnMapping } from "../../src/engine/csvParser.ts";

const DEFAULT_MAPPING: ColumnMapping = {
  employee_ref: "Employee Name",
  role_title: "Position",
  weekly_hours: "Ordinary Hours",
  current_pay_rate_hourly: "Pay Rate",
  employment_type: "Employment Type",
};

// ---------------------------------------------------------------------------
// Happy path tests
// ---------------------------------------------------------------------------

describe("runComplianceCheck — Full pipeline", () => {
  it("processes a hospitality CSV and returns a valid report", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice Smith,Kitchen Hand,38,22.00,full_time",
      "Bob Jones,Waiter,25,23.00,part_time",
      "Carol Chen,Chef,38,27.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test Hospitality Pty Ltd",
      checkDate: "2026-06-18T00:00:00.000Z",
    });

    assert.equal(result.success, true);
    assert.ok(result.report !== null);
    assert.equal(result.report!.summary.employeeCountChecked, 3);
    assert.equal(result.report!.awardCode, "MA000009");
    assert.equal(result.report!.businessName, "Test Hospitality Pty Ltd");
    assert.equal(result.report!.rateTableEffectiveDate, "2025-07-01");
  });

  it("correctly identifies underpaid employees", () => {
    // Kitchen Hand FWC rate = $23.23/hr; paying $20.00 = underpaid
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice Smith,Kitchen Hand,38,20.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });

    assert.equal(result.success, true);
    const alice = result.report!.employees[0];
    assert.equal(alice.gapDirection, "UNDERPAID");
    assert.equal(alice.gapHourly, -3.23); // 20.00 - 23.23
    assert.equal(alice.gapWeekly, -122.74); // -3.23 × 38
  });

  it("correctly identifies employees paid above FWC rate", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Bob Jones,Kitchen Hand,38,30.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });

    assert.equal(result.success, true);
    const bob = result.report!.employees[0];
    assert.equal(bob.gapDirection, "OVERPAID");
  });

  it("processes a retail CSV with multiple grades correctly", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice,Sales Assistant,38,23.00,full_time",
      "Bob,Store Manager,38,30.00,full_time",
      "Carol,Visual Merchandiser,38,24.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000004",
      mapping: DEFAULT_MAPPING,
      businessName: "Test Retail",
    });

    assert.equal(result.success, true);
    assert.equal(result.report!.summary.employeeCountChecked, 3);
  });

  it("processes a clerks CSV correctly", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice,Bookkeeper,38,24.00,full_time",
      "Bob,Payroll Officer,38,22.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000002",
      mapping: DEFAULT_MAPPING,
      businessName: "Test Office",
    });

    assert.equal(result.success, true);
    // Both bookkeeper and payroll officer are Level 3 (24.52/hr)
    const bob = result.report!.employees.find((e) => e.employeeRef === "Bob");
    assert.ok(bob);
    assert.equal(bob.gapDirection, "UNDERPAID"); // 22.00 < 24.52
  });

  it("handles mixed confidence scores in report summary", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice,Kitchen Hand,38,22.00,full_time",
      "Bob,Quantum Engineer,38,50.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });

    assert.equal(result.success, true);
    assert.equal(result.report!.summary.employeeCountLowConfidence, 1); // Bob
  });

  it("triggers majorityLowConfidence banner when > 50% are LOW", () => {
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice,Unknown Role A,38,22.00,full_time",
      "Bob,Unknown Role B,38,22.00,full_time",
      "Carol,Kitchen Hand,38,22.00,full_time",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });

    assert.equal(result.success, true);
    assert.equal(result.report!.summary.majorityLowConfidence, true);
  });

  it("accepts a 500-row CSV without performance failure", () => {
    const header = "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type\n";
    const rows = Array.from({ length: 500 }, (_, i) =>
      `Employee${i},Kitchen Hand,38,22.00,full_time`
    ).join("\n");
    const csv = header + rows;

    const start = Date.now();
    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Large Hospitality Co",
    });
    const elapsed = Date.now() - start;

    assert.equal(result.success, true);
    assert.equal(result.report!.summary.employeeCountChecked, 500);
    // Must complete well under 60s for deterministic engine (no network)
    assert.ok(elapsed < 5000, `Expected < 5000ms for 500 rows; got ${elapsed}ms`);
  });
});

// ---------------------------------------------------------------------------
// Validation failure tests
// ---------------------------------------------------------------------------

describe("runComplianceCheck — Validation failures", () => {
  it("rejects a file exceeding 5 MB", () => {
    const csv = "Employee Name,Position,Ordinary Hours,Pay Rate\nAlice,Cook,38,25.00";
    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: 6 * 1024 * 1024,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });
    assert.equal(result.success, false);
    assert.ok(result.errors.some((e) => e.message.includes("5 MB")));
  });

  it("rejects an unsupported award code", () => {
    const csv = "Employee Name,Position,Ordinary Hours,Pay Rate\nAlice,Cook,38,25.00";
    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA999999",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });
    assert.equal(result.success, false);
    assert.ok(result.errors.some((e) => e.message.includes("not supported")));
  });

  it("returns errors but still succeeds when some rows are skipped", () => {
    // One valid row, one with bad pay rate
    const csv = [
      "Employee Name,Position,Ordinary Hours,Pay Rate",
      "Alice,Kitchen Hand,38,22.00",
      "Bob,Kitchen Hand,38,bad_rate",
    ].join("\n");

    const result = runComplianceCheck({
      csvContent: csv,
      fileSizeBytes: csv.length,
      awardCode: "MA000009",
      mapping: DEFAULT_MAPPING,
      businessName: "Test",
    });

    assert.equal(result.success, true);
    assert.equal(result.report!.employees.length, 1);
    assert.ok(result.errors.length > 0); // Bob's row error recorded
  });

  it("returns all 3 supported award codes in AWARDS fixture", async () => {
    const { AWARDS } = await import("../../src/fixtures/awards.ts");
    const codes = AWARDS.filter((a) => a.isActive).map((a) => a.code);
    assert.ok(codes.includes("MA000009"), "Hospitality award must be present");
    assert.ok(codes.includes("MA000004"), "Retail award must be present");
    assert.ok(codes.includes("MA000002"), "Clerks award must be present");
  });
});
