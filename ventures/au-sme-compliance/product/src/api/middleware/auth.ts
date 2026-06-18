/**
 * Authentication Middleware — Stub
 *
 * In production, this validates JWT tokens issued by Supabase Auth.
 * The JWT is signed with SUPABASE_JWT_SECRET (from environment variables).
 *
 * This stub:
 *  - Returns a fake accountId for any token starting with "valid_"
 *  - Returns UNAUTHENTICATED for all other tokens
 *  - NEVER accepts requests without an Authorization header
 *
 * No secrets are hardcoded here. The real JWT secret must be injected
 * via environment variable SUPABASE_JWT_SECRET (see .env.example).
 */

import { makeErrorResponse, generateRequestId } from "../../lib/errors.ts";

export interface AuthResult {
  authenticated: boolean;
  accountId: string | null;
  userId: string | null;
  /** If false, return this response immediately */
  errorResponse?: { status: number; body: unknown };
}

/**
 * Validate the Authorization: Bearer <token> header.
 * Returns an AuthResult; if not authenticated, includes the errorResponse to send.
 */
export function validateAuth(authorizationHeader: string | undefined): AuthResult {
  const requestId = generateRequestId();

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return {
      authenticated: false,
      accountId: null,
      userId: null,
      errorResponse: {
        status: 401,
        body: makeErrorResponse(
          "UNAUTHENTICATED",
          "Missing or invalid Authorization header.",
          requestId
        ),
      },
    };
  }

  const token = authorizationHeader.slice("Bearer ".length).trim();

  // Stub: accept tokens starting with "valid_"
  if (token.startsWith("valid_")) {
    const parts = token.split("_");
    const accountId = parts[1] ?? "stub_account_01";
    const userId = parts[2] ?? "stub_user_01";
    return { authenticated: true, accountId, userId: userId };
  }

  return {
    authenticated: false,
    accountId: null,
    userId: null,
    errorResponse: {
      status: 401,
      body: makeErrorResponse(
        "UNAUTHENTICATED",
        "Token is invalid or expired.",
        requestId
      ),
    },
  };
}
