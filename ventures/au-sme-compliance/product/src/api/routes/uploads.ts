/**
 * Upload API Handlers — Thin wrappers calling the engine.
 *
 * These are framework-agnostic handler functions that accept a plain
 * request object and return a plain response object.
 * Wire into Next.js API routes or Express as needed.
 */

import { runComplianceCheck } from "../../engine/index.ts";
import { databaseClient, storageClient } from "../../integrations/supabase.stub.ts";
import { UploadMappingPatchSchema, formatZodError } from "../../lib/validation.ts";
import { makeErrorResponse, generateRequestId, AppError } from "../../lib/errors.ts";
import type { ColumnMapping } from "../../engine/index.ts";

export interface ApiRequest {
  accountId: string;
  body: Record<string, unknown>;
  params?: Record<string, string>;
  file?: { buffer: Buffer; originalname: string; size: number; mimetype: string };
}

export interface ApiResponse {
  status: number;
  body: unknown;
}

// ---------------------------------------------------------------------------
// POST /uploads
// ---------------------------------------------------------------------------

export async function handleCreateUpload(req: ApiRequest): Promise<ApiResponse> {
  const requestId = generateRequestId();

  if (!req.file) {
    return {
      status: 400,
      body: makeErrorResponse("VALIDATION_ERROR", "No file provided.", requestId, [
        { field: "file", issue: "A CSV file is required." },
      ]),
    };
  }

  const { buffer, originalname, size, mimetype } = req.file;

  // Validate MIME type
  if (!["text/csv", "application/vnd.ms-excel", "text/plain"].includes(mimetype)) {
    return {
      status: 400,
      body: makeErrorResponse(
        "INVALID_FILE_FORMAT",
        "File must be a CSV.",
        requestId,
        [{ field: "file", issue: `MIME type "${mimetype}" is not accepted. Expected text/csv.` }]
      ),
    };
  }

  // Validate file size
  if (size > 5 * 1024 * 1024) {
    return {
      status: 400,
      body: makeErrorResponse("FILE_TOO_LARGE", "File size exceeds 5 MB limit.", requestId, [
        { field: "file", issue: `File is ${size} bytes; limit is 5,242,880 bytes.` },
      ]),
    };
  }

  const awardCode = typeof req.body["award_code"] === "string" ? req.body["award_code"] : null;
  if (!awardCode) {
    return {
      status: 400,
      body: makeErrorResponse("VALIDATION_ERROR", "award_code is required.", requestId, [
        { field: "award_code", issue: "Provide the FWC award code (e.g. MA000009)." },
      ]),
    };
  }

  // Encrypt and store file (stub)
  const csvContent = buffer.toString("utf-8");
  const storagePath = await storageClient.storeFile(
    "uploads",
    `${req.accountId}/${Date.now()}_${originalname}`,
    buffer
  );

  // Count rows for response
  const rowCount = Math.max(0, csvContent.split(/\r?\n/).length - 1);

  const uploadId = await databaseClient.insertUpload({
    accountId: req.accountId,
    filename: originalname,
    storagePathEncrypted: storagePath,
    rowCount,
    status: "pending",
    awardCode,
    uploadedAt: new Date().toISOString(),
    purgeAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return {
    status: 202,
    body: {
      data: {
        upload_id: uploadId,
        status: "pending",
        filename: originalname,
        row_count: rowCount,
        award_code: awardCode,
      },
      request_id: requestId,
    },
  };
}

// ---------------------------------------------------------------------------
// PATCH /uploads/:uploadId/mapping
// ---------------------------------------------------------------------------

export async function handlePatchMapping(req: ApiRequest): Promise<ApiResponse> {
  const requestId = generateRequestId();
  const uploadId = req.params?.["uploadId"];

  if (!uploadId) {
    return {
      status: 400,
      body: makeErrorResponse("VALIDATION_ERROR", "uploadId is required.", requestId),
    };
  }

  // Validate mapping schema
  const parsed = UploadMappingPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return {
      status: 400,
      body: makeErrorResponse(
        "MAPPING_INCOMPLETE",
        "Column mapping is incomplete.",
        requestId,
        formatZodError(parsed.error).map((e) => ({ field: e.field, issue: e.message }))
      ),
    };
  }

  // Get upload (tenant-scoped)
  const upload = await databaseClient.getUpload(uploadId, req.accountId);
  if (!upload) {
    return {
      status: 404,
      body: makeErrorResponse("NOT_FOUND", "Upload not found.", requestId),
    };
  }

  if (upload.status === "complete") {
    return {
      status: 400,
      body: makeErrorResponse(
        "VALIDATION_ERROR",
        "Cannot modify mapping for a completed upload. Create a new upload.",
        requestId
      ),
    };
  }

  // Retrieve CSV and run the engine inline (sync for simplicity in this scaffold)
  const fileBuffer = await storageClient.getFile(upload.storagePathEncrypted);
  const csvContent = fileBuffer.toString("utf-8");

  const mapping: ColumnMapping = parsed.data.mapping;

  const result = runComplianceCheck({
    csvContent,
    fileSizeBytes: fileBuffer.length,
    awardCode: upload.awardCode,
    mapping,
    businessName: req.accountId, // real impl would fetch from account record
    checkDate: new Date().toISOString(),
  });

  if (!result.success || !result.report) {
    await databaseClient.updateUploadStatus(uploadId, "error");
    return {
      status: 422,
      body: makeErrorResponse(
        "PROCESSING_ERROR",
        "CSV could not be processed with the provided mapping.",
        requestId,
        result.errors.map((e) => ({ field: e.field ?? undefined, issue: e.message }))
      ),
    };
  }

  await databaseClient.updateUploadStatus(uploadId, "complete");

  // Store report
  const report = result.report;
  const reportId = await databaseClient.insertReport({
    accountId: req.accountId,
    uploadId,
    storagePathEncrypted: `encrypted://reports/${req.accountId}/${uploadId}.json`,
    generatedAt: report.generatedAt,
    rateTableEffectiveDate: report.rateTableEffectiveDate,
    employeeCountChecked: report.summary.employeeCountChecked,
    employeeCountGaps: report.summary.employeeCountGaps,
    totalGapWeeklyAud: report.summary.totalGapWeeklyAud,
    disclaimerVersion: report.disclaimerVersion,
    purgeAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return {
    status: 200,
    body: {
      data: {
        upload_id: uploadId,
        mapping_confirmed: true,
        status: "complete",
        report_id: reportId,
        summary: report.summary,
      },
      request_id: requestId,
    },
  };
}

// ---------------------------------------------------------------------------
// GET /uploads/:uploadId/status
// ---------------------------------------------------------------------------

export async function handleGetUploadStatus(req: ApiRequest): Promise<ApiResponse> {
  const requestId = generateRequestId();
  const uploadId = req.params?.["uploadId"];

  if (!uploadId) {
    return {
      status: 400,
      body: makeErrorResponse("VALIDATION_ERROR", "uploadId is required.", requestId),
    };
  }

  const upload = await databaseClient.getUpload(uploadId, req.accountId);
  if (!upload) {
    return {
      status: 404,
      body: makeErrorResponse("NOT_FOUND", "Upload not found.", requestId),
    };
  }

  return {
    status: 200,
    body: {
      data: {
        upload_id: uploadId,
        status: upload.status,
        progress_message:
          upload.status === "complete"
            ? "Report generated."
            : upload.status === "error"
            ? "Processing failed."
            : "Processing...",
      },
      request_id: requestId,
    },
  };
}
