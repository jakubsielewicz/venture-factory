/**
 * CSV Parser and Validator
 *
 * Pure module — no network, no DB, no credentials needed.
 * Parses raw CSV text into validated EmployeeRow records.
 */

export interface ColumnMapping {
  /** The CSV header (or column index as string) that maps to each required field */
  employee_ref: string;
  role_title: string;
  weekly_hours: string;
  current_pay_rate_hourly: string;
  /** Optional fields */
  employment_type?: string;
  date_of_birth?: string;
}

export interface EmployeeRow {
  employeeRef: string;
  roleTitle: string;
  weeklyHours: number | null;
  currentPayRateHourly: number | null;
  employmentType: "full_time" | "part_time" | "casual" | "unknown";
  dateOfBirth: string | null;
  /** Row index (1-based, after header) for error reporting */
  rowIndex: number;
}

export interface ParseResult {
  rows: EmployeeRow[];
  errors: ParseError[];
  /** Rows skipped due to validation errors */
  skippedCount: number;
}

export interface ParseError {
  rowIndex: number | null;
  field: string | null;
  message: string;
}

export interface CsvValidationResult {
  valid: boolean;
  errors: ParseError[];
  /** Estimated row count (not including header) */
  rowCount: number;
}

const MAX_ROWS = 500;
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates raw CSV bytes/string before parsing.
 * Returns early with errors if file is too large or has too many rows.
 */
export function validateCsvFile(
  content: string,
  fileSizeBytes: number
): CsvValidationResult {
  const errors: ParseError[] = [];

  if (fileSizeBytes > MAX_BYTES) {
    errors.push({
      rowIndex: null,
      field: "file",
      message: `File size ${fileSizeBytes} bytes exceeds the 5 MB limit.`,
    });
    return { valid: false, errors, rowCount: 0 };
  }

  const lines = splitLines(content);
  // Subtract 1 for header
  const rowCount = Math.max(0, lines.length - 1);

  if (rowCount > MAX_ROWS) {
    errors.push({
      rowIndex: null,
      field: "file",
      message: `CSV has ${rowCount} rows but the maximum is ${MAX_ROWS}.`,
    });
    return { valid: false, errors, rowCount };
  }

  if (lines.length < 2) {
    errors.push({
      rowIndex: null,
      field: "file",
      message: "CSV must have a header row and at least one data row.",
    });
    return { valid: false, errors, rowCount: 0 };
  }

  return { valid: true, errors, rowCount };
}

/**
 * Parses CSV content using a column mapping.
 * Validates each row and returns parsed EmployeeRow objects.
 * Rows with missing required fields are skipped and recorded as errors.
 */
export function parseCsv(
  content: string,
  mapping: ColumnMapping
): ParseResult {
  const lines = splitLines(content);
  if (lines.length < 1) {
    return {
      rows: [],
      errors: [{ rowIndex: null, field: null, message: "Empty file." }],
      skippedCount: 0,
    };
  }

  const headers = parseCsvLine(lines[0]).map((h) => h.trim());
  const colIndex = buildColumnIndex(headers, mapping);
  const missingErrors = validateRequiredColumns(colIndex);
  if (missingErrors.length > 0) {
    return { rows: [], errors: missingErrors, skippedCount: 0 };
  }

  const rows: EmployeeRow[] = [];
  const errors: ParseError[] = [];
  let skippedCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue; // skip blank lines

    const cells = parseCsvLine(line);
    const rowIndex = i; // 1-based

    const employeeRef = getCell(cells, colIndex.employee_ref)?.trim() ?? "";
    const roleTitle = getCell(cells, colIndex.role_title)?.trim() ?? "";
    const weeklyHoursRaw = getCell(cells, colIndex.weekly_hours)?.trim() ?? "";
    const payRateRaw = getCell(cells, colIndex.current_pay_rate_hourly)?.trim() ?? "";
    const employmentTypeRaw = colIndex.employment_type !== undefined
      ? getCell(cells, colIndex.employment_type)?.trim() ?? ""
      : "";
    const dateOfBirthRaw = colIndex.date_of_birth !== undefined
      ? getCell(cells, colIndex.date_of_birth)?.trim() ?? ""
      : "";

    const rowErrors: ParseError[] = [];

    if (!employeeRef) {
      rowErrors.push({ rowIndex, field: "employee_ref", message: "Employee reference is empty." });
    }
    if (!roleTitle) {
      rowErrors.push({ rowIndex, field: "role_title", message: "Role title is empty." });
    }

    const weeklyHours = parsePositiveNumber(weeklyHoursRaw);
    if (weeklyHoursRaw && weeklyHours === null) {
      rowErrors.push({ rowIndex, field: "weekly_hours", message: `Invalid weekly hours: "${weeklyHoursRaw}".` });
    }

    const currentPayRateHourly = parsePositiveNumber(payRateRaw);
    if (payRateRaw && currentPayRateHourly === null) {
      rowErrors.push({ rowIndex, field: "current_pay_rate_hourly", message: `Invalid pay rate: "${payRateRaw}".` });
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors);
      skippedCount++;
      continue;
    }

    const employmentType = normaliseEmploymentType(employmentTypeRaw);

    rows.push({
      employeeRef,
      roleTitle,
      weeklyHours: weeklyHoursRaw ? weeklyHours : null,
      currentPayRateHourly: payRateRaw ? currentPayRateHourly : null,
      employmentType,
      dateOfBirth: dateOfBirthRaw || null,
      rowIndex,
    });
  }

  return { rows, errors, skippedCount };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function splitLines(content: string): string[] {
  return content.split(/\r?\n/).filter((l, i) => i === 0 || l.trim() !== "" || true);
  // Keep blank lines for row counting; strip later during parse
}

/**
 * Parses a single CSV line respecting double-quoted fields.
 */
export function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

interface ColumnIndexMap {
  employee_ref: number;
  role_title: number;
  weekly_hours: number;
  current_pay_rate_hourly: number;
  employment_type?: number;
  date_of_birth?: number;
}

function buildColumnIndex(
  headers: string[],
  mapping: ColumnMapping
): ColumnIndexMap {
  const lower = headers.map((h) => h.toLowerCase());

  function findIndex(mappingValue: string): number {
    // First try exact header match (case-insensitive)
    const exactIdx = lower.findIndex((h) => h === mappingValue.toLowerCase());
    if (exactIdx !== -1) return exactIdx;
    // Then try numeric index
    const numericIdx = parseInt(mappingValue, 10);
    if (!isNaN(numericIdx) && numericIdx >= 0 && numericIdx < headers.length) {
      return numericIdx;
    }
    return -1;
  }

  const result: ColumnIndexMap = {
    employee_ref: findIndex(mapping.employee_ref),
    role_title: findIndex(mapping.role_title),
    weekly_hours: findIndex(mapping.weekly_hours),
    current_pay_rate_hourly: findIndex(mapping.current_pay_rate_hourly),
  };

  if (mapping.employment_type) {
    const idx = findIndex(mapping.employment_type);
    if (idx !== -1) result.employment_type = idx;
  }
  if (mapping.date_of_birth) {
    const idx = findIndex(mapping.date_of_birth);
    if (idx !== -1) result.date_of_birth = idx;
  }

  return result;
}

function validateRequiredColumns(colIndex: ColumnIndexMap): ParseError[] {
  const errors: ParseError[] = [];
  const required: Array<keyof Pick<ColumnIndexMap, "employee_ref" | "role_title" | "weekly_hours" | "current_pay_rate_hourly">> = [
    "employee_ref",
    "role_title",
    "weekly_hours",
    "current_pay_rate_hourly",
  ];
  for (const field of required) {
    if (colIndex[field] === -1) {
      errors.push({
        rowIndex: null,
        field,
        message: `Could not find column for required field "${field}" in CSV headers.`,
      });
    }
  }
  return errors;
}

function getCell(cells: string[], index: number): string | undefined {
  if (index < 0 || index >= cells.length) return undefined;
  return cells[index];
}

function parsePositiveNumber(value: string): number | null {
  if (!value) return null;
  // Strip currency symbols and commas
  const cleaned = value.replace(/[$,]/g, "").trim();
  const n = Number(cleaned);
  if (isNaN(n) || n < 0) return null;
  return n;
}

function normaliseEmploymentType(
  raw: string
): "full_time" | "part_time" | "casual" | "unknown" {
  const lower = raw.toLowerCase().trim();
  if (lower === "full_time" || lower === "full time" || lower === "ft" || lower === "fulltime") {
    return "full_time";
  }
  if (lower === "part_time" || lower === "part time" || lower === "pt" || lower === "parttime") {
    return "part_time";
  }
  if (lower === "casual" || lower === "cas") {
    return "casual";
  }
  return "unknown";
}
