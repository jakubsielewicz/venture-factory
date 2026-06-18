# API Contract — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 Design
**Author:** product-architect

---

## Overview

All endpoints are REST over HTTPS. Base URL: `https://app.paycheck.com.au/api/v1` (domain TBC).

Authentication: JWT Bearer tokens issued by the auth endpoints. All endpoints except `/auth/*` and `/public/*` require a valid Bearer token. Tokens expire after 30 minutes of inactivity (sliding expiry); refresh via `POST /auth/refresh`.

Tenant isolation: every authenticated request is scoped to the `account_id` extracted from the JWT. The server never exposes data from a different account_id regardless of query parameters.

Rate limits: 60 requests/minute per account. 10 requests/minute for upload-related endpoints. Exceeded limits return `429 Too Many Requests`.

Idempotency: `POST /uploads`, `POST /billing/checkout` accept an `Idempotency-Key: <uuid>` header. Duplicate requests with the same key within 24 hours return the original response without side effects.

Content type: `application/json` unless otherwise noted (multipart/form-data for file uploads).

API versioning: URL-path versioned (`/v1/`). Breaking changes increment the version; `/v1/` is maintained for 12 months after a new version is released.

---

## Error Model

All error responses share a single envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description of the error.",
    "details": [
      {
        "field": "file",
        "issue": "File size exceeds 5 MB limit."
      }
    ],
    "request_id": "req_01J3K..."
  }
}
```

| HTTP Status | Error Code | When Returned |
|------------|-----------|---------------|
| 400 | `VALIDATION_ERROR` | Request body or parameters fail validation (missing required fields, wrong type, constraint violated) |
| 400 | `INVALID_FILE_FORMAT` | Uploaded file is not a valid CSV |
| 400 | `FILE_TOO_LARGE` | Uploaded file exceeds 5 MB |
| 400 | `ROW_LIMIT_EXCEEDED` | CSV has more than 500 rows (trial: max 5 rows) |
| 400 | `MAPPING_INCOMPLETE` | Required column mappings not provided |
| 401 | `UNAUTHENTICATED` | Missing or expired Bearer token |
| 403 | `FORBIDDEN` | Authenticated but insufficient tier/permission for this resource |
| 403 | `TRIAL_LIMIT_REACHED` | Trial account has exhausted its allowed employees or reports |
| 404 | `NOT_FOUND` | Resource does not exist or belongs to a different account |
| 409 | `CONFLICT` | Duplicate request with same Idempotency-Key but different payload |
| 422 | `PROCESSING_ERROR` | File parsed but could not be classified (e.g., no rows could be mapped to any supported award) |
| 429 | `RATE_LIMIT_EXCEEDED` | Too many requests; `Retry-After` header included |
| 500 | `INTERNAL_ERROR` | Unexpected server error; includes `request_id` for support |
| 503 | `SERVICE_UNAVAILABLE` | Scheduled maintenance; `Retry-After` header included |

`request_id`: A unique trace identifier included in all responses (success and error) for debugging. Format: `req_` + 20-character alphanumeric.

---

## Auth Endpoints

### POST /auth/register

**Purpose:** Create a new user account and tenant.

**Auth:** None required.

**Request:**
```json
{
  "email": "owner@example.com.au",       // required; valid email; max 255 chars
  "password": "securepassword123",       // required; min 12 chars
  "business_name": "Example Cafe Pty Ltd" // required; max 255 chars
}
```

**Response 201:**
```json
{
  "data": {
    "user_id": "usr_01J3K...",
    "account_id": "acc_01J3K...",
    "email": "owner@example.com.au",
    "email_verified": false,
    "subscription_tier": "trial",
    "trial_ends_at": "2026-07-02T00:00:00Z"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- Verification email sent automatically. Account is functional (trial) immediately; full access requires email verification.
- Duplicate email returns `400 VALIDATION_ERROR` with `field: "email"`.

---

### POST /auth/login

**Purpose:** Authenticate and receive a JWT access token.

**Auth:** None required.

**Request:**
```json
{
  "email": "owner@example.com.au",  // required
  "password": "securepassword123"   // required
}
```

**Response 200:**
```json
{
  "data": {
    "access_token": "eyJ...",
    "token_type": "Bearer",
    "expires_in": 1800,
    "account_id": "acc_01J3K...",
    "subscription_tier": "pro"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- Lockout: 5 failed attempts within 15 minutes locks the account for 15 minutes. Response on locked account: `401 UNAUTHENTICATED` with message "Account temporarily locked. Try again after [timestamp]."
- Token expiry is 1800 seconds (30 minutes sliding); use `POST /auth/refresh` to extend.

---

### POST /auth/refresh

**Purpose:** Extend session with a fresh access token.

**Auth:** Bearer token (may be within 5 minutes of expiry; refresh window).

**Request:** No body.

**Response 200:**
```json
{
  "data": {
    "access_token": "eyJ...",
    "expires_in": 1800
  },
  "request_id": "req_01J3K..."
}
```

---

### POST /auth/verify-email

**Purpose:** Confirm email address from verification link.

**Auth:** None (verification token in body replaces auth).

**Request:**
```json
{
  "token": "vt_01J3K..."  // required; from verification email link
}
```

**Response 200:**
```json
{
  "data": {
    "email_verified": true
  },
  "request_id": "req_01J3K..."
}
```

---

### POST /auth/password-reset/request

**Purpose:** Trigger a password reset email.

**Auth:** None required.

**Request:**
```json
{
  "email": "owner@example.com.au"  // required
}
```

**Response 200:** (Always returns 200 to prevent email enumeration.)
```json
{
  "data": {
    "message": "If that email address exists, a reset link has been sent."
  },
  "request_id": "req_01J3K..."
}
```

---

### POST /auth/password-reset/confirm

**Purpose:** Set a new password using a reset token.

**Auth:** None (reset token in body).

**Request:**
```json
{
  "token": "rt_01J3K...",         // required; from reset email link
  "new_password": "newsecure456"  // required; min 12 chars
}
```

**Response 200:**
```json
{
  "data": {
    "message": "Password updated successfully."
  },
  "request_id": "req_01J3K..."
}
```

---

## Upload Endpoints

### POST /uploads

**Purpose:** Upload a payroll CSV file. Initiates the async processing pipeline.

**Auth:** Bearer token required. `Content-Type: multipart/form-data`.

**Idempotency:** `Idempotency-Key` header supported.

**Request (multipart/form-data):**
```
file:      <CSV file binary>      // required; max 5 MB; .csv extension
award_id:  "awd_01J3K..."        // required; UUID of the award from GET /awards
```

**Validation:**
- `file`: Must be `text/csv` or `application/vnd.ms-excel` MIME type; max 5 MB; max 500 rows (trial accounts: max 5 rows and max 1 award check total)
- `award_id`: Must reference an active award in GET /awards

**Response 202:**
```json
{
  "data": {
    "upload_id": "upl_01J3K...",
    "status": "pending",
    "filename": "payroll-june-2026.csv",
    "row_count": 47,
    "award_id": "awd_01J3K...",
    "award_name": "Hospitality Industry (General) Award 2020"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- File is encrypted and stored; processing begins asynchronously.
- Poll `GET /uploads/{upload_id}/status` for progress.
- Row count is derived from the raw file; may differ slightly from employee_records count after parsing.

---

### GET /uploads

**Purpose:** List all uploads for the current account.

**Auth:** Bearer token required.

**Query parameters:**
- `status` (optional): Filter by status. Values: `pending`, `processing`, `complete`, `error`.
- `limit` (optional): Integer 1–50. Default: 20.
- `cursor` (optional): Pagination cursor from previous response.

**Response 200:**
```json
{
  "data": [
    {
      "upload_id": "upl_01J3K...",
      "filename": "payroll-june-2026.csv",
      "award_name": "Hospitality Industry (General) Award 2020",
      "status": "complete",
      "row_count": 47,
      "uploaded_at": "2026-06-18T09:23:00Z",
      "report_id": "rpt_01J3K..."
    }
  ],
  "pagination": {
    "next_cursor": "cur_01J3K...",
    "has_more": false
  },
  "request_id": "req_01J3K..."
}
```

---

### GET /uploads/{upload_id}/status

**Purpose:** Poll for async processing status.

**Auth:** Bearer token required.

**Path parameter:** `upload_id` — UUID of the upload.

**Response 200:**
```json
{
  "data": {
    "upload_id": "upl_01J3K...",
    "status": "complete",
    "progress_message": "Report generated.",
    "employee_count_checked": 47,
    "employee_count_gaps": 3,
    "report_id": "rpt_01J3K..."
  },
  "request_id": "req_01J3K..."
}
```

**Status values:**
- `pending`: Queued, not yet started.
- `processing`: Engine running.
- `complete`: Report generated; `report_id` is present.
- `error`: Processing failed; `error_message` is present with a user-facing description.

---

### PATCH /uploads/{upload_id}/mapping

**Purpose:** Submit or update the column mapping for an upload before (or to re-trigger) processing.

**Auth:** Bearer token required.

**Request:**
```json
{
  "mapping": {
    "employee_ref": "Employee Name",        // required; CSV column header or index
    "role_title": "Position",               // required
    "weekly_hours": "Ordinary Hours",       // required (or "annual_salary" must be provided)
    "current_pay_rate_hourly": "Pay Rate",  // required (or "annual_salary")
    "employment_type": "Employment Type",   // optional; values: "full_time", "part_time", "casual"
    "date_of_birth": "DOB"                  // optional; used for junior rate detection
  }
}
```

**Response 200:**
```json
{
  "data": {
    "upload_id": "upl_01J3K...",
    "mapping_confirmed": true,
    "status": "pending"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- If the upload status is `error` and the error was mapping-related, patching a corrected mapping re-queues the job.
- Cannot patch a mapping for a `complete` upload; create a new upload instead.

---

## Report Endpoints

### GET /reports

**Purpose:** List all generated reports for the current account.

**Auth:** Bearer token required.

**Query parameters:**
- `limit` (optional): Integer 1–50. Default: 20.
- `cursor` (optional): Pagination cursor.

**Response 200:**
```json
{
  "data": [
    {
      "report_id": "rpt_01J3K...",
      "upload_id": "upl_01J3K...",
      "award_name": "Hospitality Industry (General) Award 2020",
      "generated_at": "2026-06-18T09:28:00Z",
      "rate_table_effective_date": "2025-07-01",
      "employee_count_checked": 47,
      "employee_count_gaps": 3,
      "total_gap_weekly_aud": 145.62
    }
  ],
  "pagination": {
    "next_cursor": null,
    "has_more": false
  },
  "request_id": "req_01J3K..."
}
```

---

### GET /reports/{report_id}

**Purpose:** Get full detail of a single report, including per-employee results.

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": {
    "report_id": "rpt_01J3K...",
    "upload_id": "upl_01J3K...",
    "award_name": "Hospitality Industry (General) Award 2020",
    "generated_at": "2026-06-18T09:28:00Z",
    "rate_table_effective_date": "2025-07-01",
    "disclaimer": "This report does not constitute legal advice or payroll advice. The employer retains sole responsibility for all pay decisions. Results are as at the date shown. Verify before each pay run.",
    "disclaimer_version": "v1.0-solicitor-approved",
    "summary": {
      "employee_count_checked": 47,
      "employee_count_gaps": 3,
      "employee_count_low_confidence": 5,
      "total_gap_weekly_aud": 145.62
    },
    "employees": [
      {
        "employee_ref": "Jane Smith",
        "role_title": "Kitchen Hand",
        "employment_type": "casual",
        "weekly_hours": 25.0,
        "current_pay_rate_hourly": 23.50,
        "mapped_classification": "Hospitality — Grade 1",
        "confidence_score": "HIGH",
        "fwc_rate_hourly": 25.74,
        "gap_hourly": -2.24,
        "gap_weekly": -56.00,
        "gap_direction": "UNDERPAID"
      },
      {
        "employee_ref": "Tom Jones",
        "role_title": "Manager",
        "employment_type": "full_time",
        "weekly_hours": 38.0,
        "current_pay_rate_hourly": 35.00,
        "mapped_classification": "Hospitality — Grade 5",
        "confidence_score": "MEDIUM",
        "fwc_rate_hourly": 32.10,
        "gap_hourly": 2.90,
        "gap_weekly": 110.20,
        "gap_direction": "OVERPAID"
      },
      {
        "employee_ref": "Alex Lee",
        "role_title": "Floor Staff",
        "employment_type": "unknown",
        "weekly_hours": null,
        "current_pay_rate_hourly": null,
        "mapped_classification": null,
        "confidence_score": "LOW",
        "fwc_rate_hourly": null,
        "gap_hourly": null,
        "gap_weekly": null,
        "gap_direction": "EXCLUDED",
        "exclusion_reason": "Could not determine employment type or pay rate from provided data."
      }
    ]
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- `gap_direction` values: `UNDERPAID` (negative gap = pay below FWC rate), `OVERPAID` (above FWC rate), `AT_RATE` (within $0.01), `EXCLUDED` (could not be classified).
- `OVERPAID` records are included for completeness; they represent no compliance risk.
- Employees with `confidence_score: "LOW"` are always shown with a warning message in the UI.

---

### GET /reports/{report_id}/download

**Purpose:** Get a signed URL to download the PDF report.

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": {
    "download_url": "https://storage.supabase.co/signed/...",
    "expires_at": "2026-06-18T09:43:00Z",
    "filename": "paycheck-acc_01J3K-2026-06-18.pdf"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- Signed URL expires after 15 minutes. Request a new URL if expired.
- URL is HTTPS only. Client must not cache the URL beyond its `expires_at`.

---

## Award Endpoints

### GET /awards

**Purpose:** List all supported awards available for selection.

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": [
    {
      "award_id": "awd_01J3K...",
      "code": "MA000009",
      "name": "Hospitality Industry (General) Award 2020",
      "classification_count": 18,
      "current_rate_effective_date": "2025-07-01"
    },
    {
      "award_id": "awd_01J3L...",
      "code": "MA000004",
      "name": "General Retail Industry Award 2020",
      "classification_count": 9,
      "current_rate_effective_date": "2025-07-01"
    }
  ],
  "meta": {
    "total_awards": 12,
    "rate_table_last_updated": "2025-07-01"
  },
  "request_id": "req_01J3K..."
}
```

---

### GET /awards/{award_id}/classifications

**Purpose:** List all classifications under an award (for onboarding questionnaire and column-mapping help).

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": [
    {
      "classification_id": "cls_01J3K...",
      "level": "Grade 1",
      "description": "An employee at this level performs routine duties under direct supervision...",
      "current_rate_casual_hourly": 25.74,
      "current_rate_full_time_hourly": 22.38,
      "current_rate_part_time_hourly": 22.38
    }
  ],
  "award_id": "awd_01J3K...",
  "award_name": "Hospitality Industry (General) Award 2020",
  "rate_effective_date": "2025-07-01",
  "request_id": "req_01J3K..."
}
```

---

## Billing Endpoints

### POST /billing/checkout

**Purpose:** Create a Stripe Checkout session for a new or upgraded subscription.

**Auth:** Bearer token required.

**Idempotency:** `Idempotency-Key` header supported.

**Request:**
```json
{
  "tier": "pro",           // required; values: "starter", "pro"
  "billing_period": "monthly", // required; values: "monthly", "annual"
  "success_url": "https://app.paycheck.com.au/dashboard?checkout=success",
  "cancel_url": "https://app.paycheck.com.au/pricing"
}
```

**Response 200:**
```json
{
  "data": {
    "checkout_url": "https://checkout.stripe.com/pay/cs_live_...",
    "session_id": "cs_live_..."
  },
  "request_id": "req_01J3K..."
}
```

---

### GET /billing/subscription

**Purpose:** Get current subscription status.

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": {
    "tier": "pro",
    "status": "active",
    "billing_period": "monthly",
    "current_period_end": "2026-07-18T00:00:00Z",
    "cancel_at_period_end": false,
    "trial_ends_at": null
  },
  "request_id": "req_01J3K..."
}
```

---

### POST /billing/cancel

**Purpose:** Cancel subscription at end of current billing period.

**Auth:** Bearer token required.

**Request:** No body.

**Response 200:**
```json
{
  "data": {
    "status": "active",
    "cancel_at_period_end": true,
    "access_until": "2026-07-18T00:00:00Z"
  },
  "request_id": "req_01J3K..."
}
```

---

### POST /billing/webhook

**Purpose:** Receive Stripe events (internal; not called by clients).

**Auth:** Stripe-Signature header validation (HMAC-SHA256 webhook secret).

**Events handled:**
- `checkout.session.completed` → activate subscription
- `invoice.payment_succeeded` → extend subscription
- `invoice.payment_failed` → set status to `past_due`; trigger email
- `customer.subscription.deleted` → set status to `cancelled`

**Response 200:** `{ "received": true }`

---

## Account Endpoints

### GET /account

**Purpose:** Get current account details.

**Auth:** Bearer token required.

**Response 200:**
```json
{
  "data": {
    "account_id": "acc_01J3K...",
    "business_name": "Example Cafe Pty Ltd",
    "email": "owner@example.com.au",
    "email_verified": true,
    "subscription_tier": "pro",
    "subscription_status": "active",
    "report_count": 3,
    "upload_count": 3
  },
  "request_id": "req_01J3K..."
}
```

---

### PATCH /account

**Purpose:** Update account details (business name only at MVP).

**Auth:** Bearer token required.

**Request:**
```json
{
  "business_name": "Updated Business Name Pty Ltd"  // optional; max 255 chars
}
```

**Response 200:**
```json
{
  "data": {
    "account_id": "acc_01J3K...",
    "business_name": "Updated Business Name Pty Ltd"
  },
  "request_id": "req_01J3K..."
}
```

---

### DELETE /account

**Purpose:** Delete account and all associated data (GDPR/APP-compliant deletion).

**Auth:** Bearer token required.

**Request:**
```json
{
  "confirmation": "DELETE MY ACCOUNT"  // required; exact string
}
```

**Response 200:**
```json
{
  "data": {
    "message": "Account and all associated data have been scheduled for deletion within 30 days.",
    "deletion_scheduled_at": "2026-07-18T00:00:00Z"
  },
  "request_id": "req_01J3K..."
}
```

**Notes:**
- Stripe subscription is cancelled immediately.
- Data purge runs asynchronously within 30 days.

---

## Admin Endpoints (Operator Only)

All admin endpoints require a separate admin JWT issued via a separate admin login flow. Admin access is not available to regular users.

### POST /admin/rates/import

**Purpose:** Import a new FWC rate table (annual update).

**Auth:** Admin Bearer token.

**Request (multipart/form-data):**
```
file:             <JSON or CSV rate file>
effective_date:   "2026-07-01"   // required; ISO date
award_code:       "MA000009"     // required; or "ALL" for bulk import
```

**Response 200:**
```json
{
  "data": {
    "classifications_updated": 18,
    "rates_inserted": 54,
    "effective_date": "2026-07-01",
    "award_code": "MA000009"
  },
  "request_id": "req_01J3K..."
}
```

---

### GET /admin/metrics

**Purpose:** Basic operational metrics for the operator dashboard.

**Auth:** Admin Bearer token.

**Response 200:**
```json
{
  "data": {
    "active_accounts": 47,
    "trial_accounts": 12,
    "mrr_aud": 3713.00,
    "reports_generated_last_30_days": 89,
    "uploads_last_30_days": 91,
    "avg_processing_time_seconds": 18.4,
    "error_rate_last_30_days_pct": 0.9
  },
  "request_id": "req_01J3K..."
}
```

---

## Public Endpoints

### POST /public/waitlist

**Purpose:** Capture pre-launch waitlist sign-ups (no auth required).

**Auth:** None.

**Request:**
```json
{
  "email": "interested@business.com.au",  // required; valid email
  "business_size": "6-20"                 // optional; "1-5", "6-20", "21-99"
}
```

**Response 201:**
```json
{
  "data": {
    "message": "You're on the list. We'll email you when we launch."
  },
  "request_id": "req_01J3K..."
}
```

---

## Pagination

Cursor-based pagination is used for all list endpoints. The cursor is an opaque string (base64-encoded timestamp + ID). Clients must not construct cursors manually.

```json
"pagination": {
  "next_cursor": "cur_eyJpZCI6Ij...",  // null if no more pages
  "has_more": true,
  "limit": 20
}
```

To retrieve the next page, pass `cursor=cur_eyJ...` as a query parameter.

---

## Field Validation Summary

| Field | Rule |
|-------|------|
| email | Valid RFC 5322 format; max 255 chars; unique per `POST /auth/register` |
| password | Min 12 characters |
| business_name | Non-empty string; max 255 chars |
| file (CSV) | MIME: text/csv or application/vnd.ms-excel; max 5 MB; max 500 rows |
| tier | Enum: `starter`, `pro` |
| billing_period | Enum: `monthly`, `annual` |
| award_id | Valid UUID referencing an active award |
| effective_date (admin) | ISO 8601 date; must be in the future or today |
| confidence_score | Enum: `HIGH`, `MEDIUM`, `LOW` (output only; not a request field) |
