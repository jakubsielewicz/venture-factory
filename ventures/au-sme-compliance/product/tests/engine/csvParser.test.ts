/**
 * CSV Parser Tests
 * Tests for: validateCsvFile, parseCsv, parseCsvLine
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  validateCsvFile,
  parseCsv,
  parseCsvLine,
  type ColumnMapping,
} from "../../src/engine/csvParser.ts";

const DEFAULT_MAPPING: ColumnMapping = {
  employee_ref: "Employee Name",
  role_title: "Position",
  weekly_hours: "Ordinary Hours",
  current_pay_rate_hourly: "Pay Rate",
  employment_type: "Employment Type",
};

describe("parseCsvLine", () => {
  it("parses a simple comma-separated line", () => {
    const result = parseCsvLine("Alice,Kitchen Hand,38,22.00,full_time");
    assert.deepEqual(result, ["Alice", "Kitchen Hand", "38", "22.00", "full_time"]);
  });

  it("handles double-quoted fields with commas inside", () => {
    const result = parseCsvLine('"Smith, John",Kitchen Hand,38,22.00');
    assert.deepEqual(result, ["Smith, John", "Kitchen Hand", "38", "22.00"]);
  });

  it("handles escaped double-quotes inside quoted fields", () => {
    const result = parseCsvLine('"O""Brien",Cook,38,25.00');
    assert.deepEqual(result, ['O"Brien', "Cook", "38", "25.00"]);
  });

  it("handles empty fields", () => {
    const result = parseCsvLine("Alice,,38,");
    assert.deepEqual(result, ["Alice", "", "38", ""]);
  });
});

describe("validateCsvFile", () => {
  it("accepts a valid CSV within size and row limits", () => {
    const content = "Employee Name,Position,Ordinary Hours,Pay Rate\nAlice,Kitchen Hand,38,22.00";
    const result = validateCsvFile(content, 100);
    assert.equal(result.valid, true);
    assert.equal(result.errors.length, 0);
    assert.equal(result.rowCount, 1);
  });

  it("rejects a file exceeding 5 MB", () => {
    const content = "header\nrow";
    const result = validateCsvFile(content, 6 * 1024 * 1024);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.field === "file"));
    assert.ok(result.errors[0].message.includes("5 MB"));
  });

  it("rejects a CSV with more than 500 rows", () => {
    const header = "Employee Name,Position,Ordinary Hours,Pay Rate\n";
    const rows = Array.from({ length: 501 }, (_, i) => `Employee ${i},Kitchen Hand,38,22.00`).join("\n");
    const content = header + rows;
    const result = validateCsvFile(content, 1000);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.message.includes("501")));
  });

  it("rejects a CSV with only a header and no data rows", () => {
    const content = "Employee Name,Position,Ordinary Hours,Pay Rate";
    const result = validateCsvFile(content, 100);
    assert.equal(result.valid, false);
    assert.ok(result.errors.some((e) => e.message.includes("at least one data row")));
  });

  it("counts rows correctly for a 5-row CSV", () => {
    const header = "Employee Name,Position,Ordinary Hours,Pay Rate\n";
    const rows = Array.from({ length: 5 }, (_, i) => `E${i},Chef,38,25.00`).join("\n");
    const result = validateCsvFile(header + rows, 500);
    assert.equal(result.valid, true);
    assert.equal(result.rowCount, 5);
  });
});

describe("parseCsv", () => {
  it("parses a well-formed CSV into employee rows", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "Alice Smith,Kitchen Hand,38,22.00,full_time",
      "Bob Jones,Waiter,25,23.00,part_time",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 2);
    assert.equal(result.errors.length, 0);
    assert.equal(result.skippedCount, 0);

    const alice = result.rows[0];
    assert.equal(alice.employeeRef, "Alice Smith");
    assert.equal(alice.roleTitle, "Kitchen Hand");
    assert.equal(alice.weeklyHours, 38);
    assert.equal(alice.currentPayRateHourly, 22.00);
    assert.equal(alice.employmentType, "full_time");
  });

  it("normalises employment types correctly", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate,Employment Type",
      "A,Cook,38,25.00,FT",
      "B,Cook,25,25.00,Part Time",
      "C,Cook,30,25.00,casual",
      "D,Cook,38,25.00,unknown_type",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 4);
    assert.equal(result.rows[0].employmentType, "full_time");
    assert.equal(result.rows[1].employmentType, "part_time");
    assert.equal(result.rows[2].employmentType, "casual");
    assert.equal(result.rows[3].employmentType, "unknown");
  });

  it("skips rows with missing employee_ref", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate",
      ",Kitchen Hand,38,22.00",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 0);
    assert.equal(result.skippedCount, 1);
    assert.ok(result.errors.some((e) => e.field === "employee_ref"));
  });

  it("skips rows with invalid pay rate", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate",
      "Alice,Kitchen Hand,38,not_a_number",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 0);
    assert.equal(result.skippedCount, 1);
    assert.ok(result.errors.some((e) => e.field === "current_pay_rate_hourly"));
  });

  it("strips currency symbols from pay rates", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate",
      "Alice,Kitchen Hand,38,$22.50",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].currentPayRateHourly, 22.50);
  });

  it("returns an error when a required column cannot be found", () => {
    const content = [
      "Name,Position,Hours,Rate",
      "Alice,Kitchen Hand,38,22.00",
    ].join("\n");

    // mapping references headers that don't exist
    const badMapping: ColumnMapping = {
      employee_ref: "Employee Name",  // doesn't match "Name"
      role_title: "Position",
      weekly_hours: "Hours",
      current_pay_rate_hourly: "Rate",
    };

    const result = parseCsv(content, badMapping);
    // "Employee Name" not found → returns errors, no rows
    assert.equal(result.rows.length, 0);
    assert.ok(result.errors.some((e) => e.field === "employee_ref"));
  });

  it("handles numeric column index mapping", () => {
    const content = [
      "Col0,Col1,Col2,Col3",
      "Alice,Kitchen Hand,38,22.00",
    ].join("\n");

    const numericMapping: ColumnMapping = {
      employee_ref: "0",
      role_title: "1",
      weekly_hours: "2",
      current_pay_rate_hourly: "3",
    };

    const result = parseCsv(content, numericMapping);
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].employeeRef, "Alice");
  });

  it("allows null weekly_hours when column has no value", () => {
    const content = [
      "Employee Name,Position,Ordinary Hours,Pay Rate",
      "Alice,Kitchen Hand,,22.00",
    ].join("\n");

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 1);
    assert.equal(result.rows[0].weeklyHours, null);
  });

  it("handles a CSV with 500 rows without error", () => {
    const header = "Employee Name,Position,Ordinary Hours,Pay Rate\n";
    const rows = Array.from({ length: 500 }, (_, i) =>
      `Employee${i},Kitchen Hand,38,22.00`
    ).join("\n");
    const content = header + rows;

    const result = parseCsv(content, DEFAULT_MAPPING);
    assert.equal(result.rows.length, 500);
    assert.equal(result.skippedCount, 0);
  });
});
