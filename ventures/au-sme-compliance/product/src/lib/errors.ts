/**
 * API Error Model
 *
 * Matches the error envelope defined in api-contract.md.
 */

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_FILE_FORMAT"
  | "FILE_TOO_LARGE"
  | "ROW_LIMIT_EXCEEDED"
  | "MAPPING_INCOMPLETE"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "TRIAL_LIMIT_REACHED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "PROCESSING_ERROR"
  | "RATE_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "SERVICE_UNAVAILABLE";

export interface ApiErrorDetail {
  field?: string;
  issue: string;
}

export interface ApiErrorEnvelope {
  error: {
    code: ApiErrorCode;
    message: string;
    details?: ApiErrorDetail[];
    request_id: string;
  };
}

export function makeErrorResponse(
  code: ApiErrorCode,
  message: string,
  requestId: string,
  details?: ApiErrorDetail[]
): ApiErrorEnvelope {
  return {
    error: {
      code,
      message,
      ...(details && details.length > 0 ? { details } : {}),
      request_id: requestId,
    },
  };
}

/**
 * Generate a request_id in the format "req_" + 20 alphanumeric chars.
 */
export function generateRequestId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "req_";
  for (let i = 0; i < 20; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

export class AppError extends Error {
  readonly code: ApiErrorCode;
  readonly statusCode: number;
  readonly details?: ApiErrorDetail[];

  constructor(
    code: ApiErrorCode,
    message: string,
    statusCode: number,
    details?: ApiErrorDetail[]
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}
