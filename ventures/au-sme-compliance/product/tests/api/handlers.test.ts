/**
 * API Handler Tests
 * Tests for: uploads, awards, billing handlers
 * Validates API contract shape and error model.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  handleCreateUpload,
  handlePatchMapping,
  handleGetUploadStatus,
  type ApiRequest,
} from "../../src/api/routes/uploads.ts";
import {
  handleListAwards,
  handleGetAwardClassifications,
} from "../../src/api/routes/awards.ts";
import {
  handleCreateCheckout,
  handleStripeWebhook,
} from "../../src/api/routes/billing.ts";
import { validateAuth } from "../../src/api/middleware/auth.ts";

function makeReq(overrides: Partial<ApiRequest> = {}): ApiRequest {
  return {
    accountId: "test_account_01",
    body: {},
    params: {},
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Auth middleware tests
// ---------------------------------------------------------------------------

describe("validateAuth middleware", () => {
  it("rejects requests with no Authorization header", () => {
    const result = validateAuth(undefined);
    assert.equal(result.authenticated, false);
    assert.ok(result.errorResponse);
    assert.equal(result.errorResponse!.status, 401);
  });

  it("rejects requests with malformed Authorization header", () => {
    const result = validateAuth("Basic abc123");
    assert.equal(result.authenticated, false);
    assert.equal(result.errorResponse!.status, 401);
  });

  it("accepts valid stub token", () => {
    const result = validateAuth("Bearer valid_acc01_usr01");
    assert.equal(result.authenticated, true);
    assert.equal(result.accountId, "acc01");
    assert.equal(result.userId, "usr01");
  });

  it("rejects invalid token", () => {
    const result = validateAuth("Bearer invalid_token_xyz");
    assert.equal(result.authenticated, false);
    assert.equal(result.errorResponse!.status, 401);
  });
});

// ---------------------------------------------------------------------------
// Upload handlers
// ---------------------------------------------------------------------------

describe("handleCreateUpload", () => {
  it("returns 400 when no file is provided", async () => {
    const req = makeReq({ body: { award_code: "MA000009" } });
    const response = await handleCreateUpload(req);
    assert.equal(response.status, 400);
    const body = response.body as Record<string, unknown>;
    assert.ok(body["error"]);
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "VALIDATION_ERROR");
  });

  it("returns 400 when award_code is missing", async () => {
    const csvBuffer = Buffer.from("Employee Name,Position,Ordinary Hours,Pay Rate\nAlice,Cook,38,25.00");
    const req = makeReq({
      body: {},
      file: {
        buffer: csvBuffer,
        originalname: "payroll.csv",
        size: csvBuffer.length,
        mimetype: "text/csv",
      },
    });
    const response = await handleCreateUpload(req);
    assert.equal(response.status, 400);
  });

  it("returns 400 for non-CSV file type", async () => {
    const req = makeReq({
      body: { award_code: "MA000009" },
      file: {
        buffer: Buffer.from("<xml>not csv</xml>"),
        originalname: "data.xml",
        size: 20,
        mimetype: "application/xml",
      },
    });
    const response = await handleCreateUpload(req);
    assert.equal(response.status, 400);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "INVALID_FILE_FORMAT");
  });

  it("returns 400 for file exceeding 5 MB", async () => {
    const req = makeReq({
      body: { award_code: "MA000009" },
      file: {
        buffer: Buffer.alloc(100),
        originalname: "large.csv",
        size: 6 * 1024 * 1024,
        mimetype: "text/csv",
      },
    });
    const response = await handleCreateUpload(req);
    assert.equal(response.status, 400);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "FILE_TOO_LARGE");
  });

  it("returns 202 for a valid CSV upload", async () => {
    const csvContent = "Employee Name,Position,Ordinary Hours,Pay Rate\nAlice,Cook,38,25.00";
    const csvBuffer = Buffer.from(csvContent);
    const req = makeReq({
      body: { award_code: "MA000009" },
      file: {
        buffer: csvBuffer,
        originalname: "payroll.csv",
        size: csvBuffer.length,
        mimetype: "text/csv",
      },
    });
    const response = await handleCreateUpload(req);
    assert.equal(response.status, 202);
    const body = response.body as Record<string, unknown>;
    assert.ok(body["data"]);
    const data = body["data"] as Record<string, unknown>;
    assert.ok(data["upload_id"]);
    assert.equal(data["status"], "pending");
    assert.equal(data["filename"], "payroll.csv");
    assert.ok(body["request_id"]);
  });

  it("response includes request_id on every response", async () => {
    const req = makeReq({ body: {} });
    const response = await handleCreateUpload(req);
    const body = response.body as Record<string, unknown>;
    const errorBody = body["error"] as Record<string, unknown>;
    assert.ok(errorBody?.["request_id"] || body["request_id"],
      "Every response must include a request_id");
  });
});

describe("handlePatchMapping", () => {
  it("returns 404 for unknown upload_id", async () => {
    const req = makeReq({
      params: { uploadId: "nonexistent_upload" },
      body: {
        mapping: {
          employee_ref: "Employee Name",
          role_title: "Position",
          weekly_hours: "Ordinary Hours",
          current_pay_rate_hourly: "Pay Rate",
        },
      },
    });
    const response = await handlePatchMapping(req);
    assert.equal(response.status, 404);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "NOT_FOUND");
  });

  it("returns 400 when mapping is incomplete", async () => {
    const req = makeReq({
      params: { uploadId: "any_upload" },
      body: {
        mapping: {
          // missing role_title, weekly_hours, current_pay_rate_hourly
          employee_ref: "Employee Name",
        },
      },
    });
    const response = await handlePatchMapping(req);
    assert.equal(response.status, 400);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "MAPPING_INCOMPLETE");
  });

  it("returns 400 when uploadId param is missing", async () => {
    const req = makeReq({ params: {}, body: {} });
    const response = await handlePatchMapping(req);
    assert.equal(response.status, 400);
  });
});

describe("handleGetUploadStatus", () => {
  it("returns 404 for unknown upload_id", async () => {
    const req = makeReq({ params: { uploadId: "nonexistent" } });
    const response = await handleGetUploadStatus(req);
    assert.equal(response.status, 404);
  });

  it("returns 400 when uploadId param is missing", async () => {
    const req = makeReq({ params: {} });
    const response = await handleGetUploadStatus(req);
    assert.equal(response.status, 400);
  });
});

// ---------------------------------------------------------------------------
// Awards handlers
// ---------------------------------------------------------------------------

describe("handleListAwards", () => {
  it("returns 200 with a list of active awards", () => {
    const req = makeReq();
    const response = handleListAwards(req);
    assert.equal(response.status, 200);
    const body = response.body as Record<string, unknown>;
    const data = body["data"] as unknown[];
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 3); // at least 3 awards (Hospitality, Retail, Clerks)
  });

  it("includes classification_count for each award", () => {
    const req = makeReq();
    const response = handleListAwards(req);
    const body = response.body as Record<string, unknown>;
    const data = body["data"] as Array<Record<string, unknown>>;
    for (const award of data) {
      assert.ok(typeof award["classification_count"] === "number");
      assert.ok((award["classification_count"] as number) > 0);
    }
  });

  it("includes rate_table_last_updated in meta", () => {
    const req = makeReq();
    const response = handleListAwards(req);
    const body = response.body as Record<string, unknown>;
    const meta = body["meta"] as Record<string, unknown>;
    assert.equal(meta["rate_table_last_updated"], "2025-07-01");
  });

  it("response shape matches api-contract.md", () => {
    const req = makeReq();
    const response = handleListAwards(req);
    const body = response.body as Record<string, unknown>;
    assert.ok(body["data"]);
    assert.ok(body["meta"]);
    assert.ok(body["request_id"]);
    const first = (body["data"] as Array<Record<string, unknown>>)[0];
    assert.ok(first["award_id"]);
    assert.ok(first["code"]);
    assert.ok(first["name"]);
    assert.ok(first["current_rate_effective_date"]);
  });
});

describe("handleGetAwardClassifications", () => {
  it("returns 200 with classifications for Hospitality award", () => {
    const req = makeReq({ params: { awardId: "awd-hospitality" } });
    const response = handleGetAwardClassifications(req);
    assert.equal(response.status, 200);
    const body = response.body as Record<string, unknown>;
    const data = body["data"] as Array<Record<string, unknown>>;
    assert.ok(data.length >= 7); // Hospitality has 7 grades
  });

  it("returns 404 for unknown award_id", () => {
    const req = makeReq({ params: { awardId: "nonexistent_award" } });
    const response = handleGetAwardClassifications(req);
    assert.equal(response.status, 404);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "NOT_FOUND");
  });

  it("includes rates for each employment type", () => {
    const req = makeReq({ params: { awardId: "awd-hospitality" } });
    const response = handleGetAwardClassifications(req);
    const body = response.body as Record<string, unknown>;
    const data = body["data"] as Array<Record<string, unknown>>;
    const grade1 = data.find((c) => c["level"] === "Grade 1");
    assert.ok(grade1);
    assert.equal(grade1["current_rate_full_time_hourly"], 23.23);
    assert.equal(grade1["current_rate_casual_hourly"], 29.04);
    assert.equal(grade1["current_rate_part_time_hourly"], 23.23);
  });
});

// ---------------------------------------------------------------------------
// Billing handlers
// ---------------------------------------------------------------------------

describe("handleCreateCheckout", () => {
  it("returns 400 for invalid tier", async () => {
    const req = makeReq({
      body: {
        tier: "enterprise", // not valid
        billing_period: "monthly",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
      },
    });
    const response = await handleCreateCheckout(req);
    assert.equal(response.status, 400);
  });

  it("returns 200 with checkout_url for valid starter tier", async () => {
    const req = makeReq({
      body: {
        tier: "starter",
        billing_period: "monthly",
        success_url: "https://app.paycheck.com.au/dashboard?checkout=success",
        cancel_url: "https://app.paycheck.com.au/pricing",
      },
    });
    const response = await handleCreateCheckout(req);
    assert.equal(response.status, 200);
    const body = response.body as Record<string, unknown>;
    const data = body["data"] as Record<string, unknown>;
    assert.ok(data["checkout_url"]);
    assert.ok(data["session_id"]);
  });

  it("returns 200 for pro annual tier", async () => {
    const req = makeReq({
      body: {
        tier: "pro",
        billing_period: "annual",
        success_url: "https://app.paycheck.com.au/dashboard",
        cancel_url: "https://app.paycheck.com.au/pricing",
      },
    });
    const response = await handleCreateCheckout(req);
    assert.equal(response.status, 200);
  });
});

describe("handleStripeWebhook", () => {
  it("returns 400 for missing/invalid signature", async () => {
    const response = await handleStripeWebhook({
      rawBody: '{"type":"checkout.session.completed"}',
      signature: "invalid_signature",
      webhookSecret: "whsec_test",
    });
    assert.equal(response.status, 400);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.equal(error["code"], "VALIDATION_ERROR");
  });

  it("returns 200 for valid stub signature", async () => {
    const response = await handleStripeWebhook({
      rawBody: '{"type":"checkout.session.completed"}',
      signature: "stub_valid",
      webhookSecret: "whsec_test",
    });
    assert.equal(response.status, 200);
    const body = response.body as Record<string, unknown>;
    assert.equal(body["received"], true);
  });
});

// ---------------------------------------------------------------------------
// Error model shape tests
// ---------------------------------------------------------------------------

describe("Error model (api-contract.md)", () => {
  it("error envelope includes code, message, and request_id", async () => {
    const req = makeReq({ body: {} });
    const response = await handleCreateUpload(req);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    assert.ok(typeof error["code"] === "string");
    assert.ok(typeof error["message"] === "string");
    assert.ok(typeof error["request_id"] === "string");
    assert.ok((error["request_id"] as string).startsWith("req_"));
  });

  it("request_id is 24 chars (req_ prefix + 20 alphanumeric)", async () => {
    const req = makeReq({ body: {} });
    const response = await handleCreateUpload(req);
    const body = response.body as Record<string, unknown>;
    const error = body["error"] as Record<string, unknown>;
    const reqId = error["request_id"] as string;
    assert.equal(reqId.length, 24); // "req_" (4) + 20 chars
    assert.ok(/^req_[A-Za-z0-9]{20}$/.test(reqId));
  });
});
