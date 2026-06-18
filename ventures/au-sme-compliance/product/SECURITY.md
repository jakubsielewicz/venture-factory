# Security Posture — au-sme-compliance

## Secrets Management (NFR-S3)
- No secrets hardcoded in source. All credentials injected via environment variables.
- `.env.example` provides placeholders only; `.env.local` is gitignored.
- Production: secrets stored in Vercel Environment Variables (encrypted at rest).

## Authentication (NFR-S1)
- All non-public API endpoints require a valid JWT Bearer token.
- JWTs issued by Supabase Auth; signed with `SUPABASE_JWT_SECRET` (env var).
- Tokens expire after 30 minutes (sliding expiry).
- Brute-force protection: account locked for 15 minutes after 5 failed login attempts (NFR-S7).

## Tenant Isolation (NFR-S2)
- Every DB query is scoped to `account_id` extracted from the JWT.
- Supabase Row Level Security (RLS) policies enforce tenant isolation at the DB layer.
- Cross-tenant resource access returns 404 (not 403) to prevent resource enumeration.

## Input Validation
- All API inputs validated with Zod schemas before processing.
- CSV files validated for size (5 MB), row count (500), and MIME type before parsing.
- Parameterised queries via Supabase client — no string-built SQL.

## Data Encryption
- CSV files and PDF reports encrypted at rest: AES-256 via Supabase Storage.
- All traffic over TLS 1.3 (Vercel + Supabase enforce this).

## Stripe Webhooks (NFR-S8)
- Webhook events validated via HMAC-SHA256 signature before processing.
- Invalid signatures return 400 with no processing.

## Dependencies
- Pinned versions in package.json.
- `npm audit --audit-level=high` run in CI on every PR.
- No Xero/MYOB dependencies (NFR-L6).

## Compliance Language (NFR-L2)
- CI check scans all templates and copy for prohibited phrases:
  "safe harbour", "achieves compliance", "is compliant", etc.

## Pre-Launch Security Gates
- [ ] `gitleaks` / `truffleHog` scan: zero secret findings in repo.
- [ ] SSL Labs A or A+ grade on production domain.
- [ ] Supabase RLS policies reviewed and enabled on all tenant-scoped tables.
- [ ] Stripe webhook secret rotated from test to production.
