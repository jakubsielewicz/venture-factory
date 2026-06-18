# Runbook — au-sme-compliance (Modern Award Pay Compliance Checker)
**Version:** 1.0  
**Date:** 2026-06-18  
**Gate:** G6 Operations Prep  
**Owner:** Operator (founder)

---

## DEFINITION OF READY TO DEPLOY

**Deploy is BLOCKED until every item below is ticked by a human. No exceptions.**

These are the G5 launch blockers that automated tests cannot clear — each requires human judgement, legal sign-off, or external action.

- [ ] **BLOCKER 1 — Solicitor disclaimer approval (NFR-L1/L2/L5)**  
  `DISCLAIMER_VERSION = "v1.0-pending-solicitor-approval"` in `product/src/engine/reportBuilder.ts`.  
  An Australian employment solicitor must review and approve the disclaimer text, Terms of Service, and all marketing copy. Once approved, bump `DISCLAIMER_VERSION` to a value that does not contain "pending" (e.g. `"v1.0"`). Record written sign-off in `advisory/legal-review.md`.

- [ ] **BLOCKER 2 — Award count and per-award solicitor sign-off (NFR-L7)**  
  Currently 3 of 12 declared awards are implemented in the classifier. At least 10 must be active (`is_active = true` in the awards table / fixtures) before deploy. Each active award must have a corresponding sign-off record in `advisory/legal-review.md` (award code, classification count, solicitor name, sign-off date).

- [ ] **BLOCKER 3 — Brute-force lockout implemented (NFR-S7)**  
  The schema declares `failed_login_attempts` and `locked_until` columns. The auth middleware stub (`product/src/api/middleware/auth.ts`) does not enforce the 5-attempt / 15-minute lockout. A real Supabase Auth integration or application-layer enforcement must be wired and verified before deploy.

- [ ] **BLOCKER 4a — CSP header verified live (NFR-S9)**  
  `vercel.json` declares the `Content-Security-Policy` header. Verify it is returned by Vercel on a real deployment (staging) using `curl -I https://staging.app.paycheck.com.au` before promoting to production. Assert header is present and does not include `unsafe-eval` or `unsafe-inline` for scripts.

- [ ] **BLOCKER 4b — Data-minimisation assertion (NFR-V1)**  
  An integration test must confirm that unmapped CSV columns are discarded before storage and that `employee_records` rows contain null for all non-mapped optional fields. This test must pass in the staging environment with Supabase wired (not the in-memory stub).

- [ ] **BLOCKER 5 — Full staging load tests (NFR-P1/P3/P6)**  
  Once Supabase and the job queue (pgmq) are wired: run k6 load tests at 50 concurrent users (NFR-P1), 500-row end-to-end under 90 seconds (NFR-P3), and 20 concurrent CSV jobs (NFR-P6). All must pass on the staging environment. See `product/ops/load-test.js`.

- [ ] **BLOCKER 6 — Security pre-launch checklist (SECURITY.md)**  
  All four items in `product/SECURITY.md` "Pre-Launch Security Gates" must be checked:  
  - `gitleaks` or `truffleHog` scan: zero secret findings in repo history  
  - SSL Labs A or A+ grade on production domain (run after first deploy to staging)  
  - Supabase RLS policies reviewed and enabled on all tenant-scoped tables (verified against `product/iac/supabase-config.sql`)  
  - Stripe webhook secret rotated from test key to production key in Vercel environment variables

- [ ] **BLOCKER 7 — Legal pages live and PI insurance on file (NFR-L10)**  
  - `/privacy` page accessible without login (HTTP 200)  
  - `/terms` page accessible without login (HTTP 200)  
  - DPA template available at `/privacy#dpa` or via support email  
  - Professional indemnity insurance certificate of currency stored in `advisory/insurance.md` (minimum AUD $1,000,000 per claim, covering software errors and omissions)

**Current status: 0 of 7 blockers cleared. Deploy must not proceed.**

---

## 1. PREREQUISITES

### 1.1 Accounts Required

Before starting the deploy procedure, ensure access to the following accounts. Credentials must come from a secrets manager — never hardcoded.

| Service | Purpose | Account type |
|---------|---------|-------------|
| Vercel | Next.js hosting (region: syd1) | Pro plan (required for custom domains and environment variable encryption) |
| Supabase | Postgres database, Auth, Storage, pgmq queue | Pro plan (required for daily automated backups with PITR) |
| Stripe | Subscription billing | Live mode enabled; AU merchant account |
| Domain registrar | `paycheck.com.au` and `app.paycheck.com.au` | Owner access |
| GitHub | Source repository | Write access to main branch |
| UptimeRobot or Better Uptime | Uptime monitoring | Free tier sufficient at launch |

### 1.2 Secret Names (sourced from secrets manager — values never stored here)

All secrets are injected as Vercel Environment Variables (encrypted at rest). Request these values from the designated secrets manager before deploy.

| Variable name | Description |
|--------------|-------------|
| `SUPABASE_URL` | Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `SUPABASE_ANON_KEY` | Supabase anon/public key for client-side auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key for server-side admin operations |
| `SUPABASE_JWT_SECRET` | JWT signing secret (from Supabase project settings > API) |
| `SUPABASE_DB_URL` | Full Postgres connection string (for `supabase db push`) |
| `STRIPE_SECRET_KEY` | Stripe live secret key (`sk_live_...`) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe live publishable key (`pk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) — production endpoint |
| `STRIPE_PRICE_ID_STARTER_MONTHLY` | Stripe Price ID for Starter $49/mo |
| `STRIPE_PRICE_ID_STARTER_ANNUAL` | Stripe Price ID for Starter $588/yr |
| `STRIPE_PRICE_ID_PRO_MONTHLY` | Stripe Price ID for Pro $79/mo |
| `STRIPE_PRICE_ID_PRO_ANNUAL` | Stripe Price ID for Pro $948/yr |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as `SUPABASE_URL` (exposed to browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as `SUPABASE_ANON_KEY` (exposed to browser) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same as `STRIPE_PUBLISHABLE_KEY` (exposed to browser) |
| `EMAIL_FROM_ADDRESS` | Transactional email sender address |
| `RESEND_API_KEY` | Resend (or equivalent) transactional email API key |

`NODE_ENV=production` and `NEXT_PUBLIC_APP_URL=https://app.paycheck.com.au` are declared in `product/iac/vercel.json` and do not need to be set manually.

### 1.3 Local Tooling Required

```
node >= 20.0.0
npm >= 10.0.0
vercel CLI >= 35.0.0   (npm install -g vercel)
supabase CLI >= 1.200  (brew install supabase/tap/supabase  OR  npm install -g supabase)
git
curl
```

---

## 2. IaC APPLY — SUPABASE SCHEMA

**Run once per environment (staging, then production). Do not apply until BLOCKER 1–7 are cleared for production.**

```bash
# Set the target database URL from your secrets manager
export SUPABASE_DB_URL="<value from secrets manager>"

# Dry run — review the SQL diff first
supabase db push --dry-run --db-url "$SUPABASE_DB_URL"

# Apply if the diff looks correct
supabase db push --db-url "$SUPABASE_DB_URL"
```

The schema file is `product/iac/supabase-config.sql`. It is idempotent (`CREATE TABLE IF NOT EXISTS`, `CREATE INDEX IF NOT EXISTS`). Safe to re-run on a live database without data loss.

After applying:
1. Verify in the Supabase dashboard that RLS is enabled on: `uploads`, `employee_records`, `reports`, `accounts`, `audit_log`.
2. Verify the four RLS policies are listed under each table.
3. Enable "Encryption at rest" in Supabase project settings > Infrastructure if not already enabled (Pro plan feature).

---

## 3. DEPLOY STEPS (EXACT COPY-PASTE SEQUENCE)

**Gate check before starting:** Confirm G5 is green and `gates/G6-operate.json` has `"status": "approved"` (set by a human outside this session). The deploy hook enforces this; the command below will fail if either condition is not met.

```bash
# Step 1 — Clone / pull latest
git clone https://github.com/<org>/au-sme-compliance.git
cd au-sme-compliance/product

# Step 2 — Install dependencies
npm ci

# Step 3 — Run tests locally (must be 171/171 pass, 0 fail)
npm test

# Step 4 — Link to the Vercel project (first time only)
vercel link --project au-sme-compliance

# Step 5 — Set all environment variables in Vercel (first time only)
# For each variable in section 1.2, run:
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add SUPABASE_JWT_SECRET production
vercel env add SUPABASE_DB_URL production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add STRIPE_PRICE_ID_STARTER_MONTHLY production
vercel env add STRIPE_PRICE_ID_STARTER_ANNUAL production
vercel env add STRIPE_PRICE_ID_PRO_MONTHLY production
vercel env add STRIPE_PRICE_ID_PRO_ANNUAL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production
vercel env add EMAIL_FROM_ADDRESS production
vercel env add RESEND_API_KEY production

# Step 6 — Deploy to production
vercel --prod

# Step 7 — Apply Supabase schema (if not already applied to production)
export SUPABASE_DB_URL="<production value>"
supabase db push --db-url "$SUPABASE_DB_URL"

# Step 8 — Register Stripe webhook endpoint
# In Stripe Dashboard > Developers > Webhooks > Add endpoint:
#   URL: https://app.paycheck.com.au/api/billing/webhook
#   Events: checkout.session.completed, customer.subscription.updated,
#            customer.subscription.deleted, invoice.payment_failed
# Copy the signing secret and update STRIPE_WEBHOOK_SECRET in Vercel.

# Step 9 — Configure custom domain in Vercel
# Vercel Dashboard > Project > Settings > Domains
# Add: app.paycheck.com.au
# Point DNS CNAME to Vercel's provided target

# Step 10 — Configure uptime monitor
# UptimeRobot or Better Uptime — add monitors for:
#   https://app.paycheck.com.au/api/health  (HTTP 200 check, 1-min interval)
#   https://app.paycheck.com.au/api/uploads (POST endpoint availability)
# Alert routing: operator email + ops Slack channel (see section 5)
```

**The human-approved deploy command:**

```bash
vercel --prod
```

This command must only be run after `gates/G6-operate.json` has been set to `"status": "approved"` by a human.

---

## 4. POST-DEPLOY SMOKE CHECK

Run these checks immediately after deploy. If any fail, trigger rollback (section 6).

```bash
BASE="https://app.paycheck.com.au"

# 1. Health endpoint returns 200
curl -sf "$BASE/api/health" | grep '"status":"ok"'

# 2. Landing page loads (HTTP 200)
curl -sf -o /dev/null -w "%{http_code}" "$BASE/" | grep 200

# 3. Privacy page accessible without login
curl -sf -o /dev/null -w "%{http_code}" "$BASE/privacy" | grep 200

# 4. Terms page accessible without login
curl -sf -o /dev/null -w "%{http_code}" "$BASE/terms" | grep 200

# 5. Unauthenticated API request returns 401
curl -sf -o /dev/null -w "%{http_code}" "$BASE/api/uploads" | grep 401

# 6. CSP header present
curl -sI "$BASE/" | grep -i "content-security-policy"

# 7. HSTS header present
curl -sI "$BASE/" | grep -i "strict-transport-security"

# 8. Awards endpoint returns active awards (authenticated)
# Requires a valid test JWT — replace TOKEN with a test account token
curl -sf -H "Authorization: Bearer $TOKEN" "$BASE/api/awards" | python3 -m json.tool | grep '"total_awards"'

# 9. Stripe webhook endpoint returns 400 for unsigned request
curl -sf -o /dev/null -w "%{http_code}" -X POST "$BASE/api/billing/webhook" | grep 400
```

All 9 checks must pass before declaring the deploy successful. Record the results.

---

## 5. OBSERVABILITY BASELINE

### 5.1 The Four Signals That Page You

| Signal | Threshold | Alert destination |
|--------|-----------|------------------|
| Uptime / health | Endpoint down > 2 minutes | Operator email + Slack `#ops-alerts` |
| API error rate | HTTP 5xx rate > 1% over 5-minute window | Operator email + Slack `#ops-alerts` |
| p95 API latency | p95 > 500 ms over 5-minute window (NFR-P1 target is 300 ms; 500 ms is the page threshold) | Slack `#ops-alerts` |
| Business metric: checks run | Zero new uploads processed in any 4-hour window during business hours (09:00–18:00 AEST) | Operator email |

### 5.2 Health Endpoint

`GET /api/health` — must return HTTP 200 and body `{"status":"ok","version":"<deploy_sha>"}` with no authentication required.

Implementation requirement: the route must check Supabase connectivity (a trivial `SELECT 1` query) and return `{"status":"degraded"}` with HTTP 503 if the database is unreachable.

### 5.3 Structured Logging Rules

- Log fields: `request_id`, `method`, `path`, `status_code`, `duration_ms`, `account_id` (hashed, not raw UUID), `error_code` (if applicable).
- Never log: JWT tokens, CSV content, employee names, pay rates, IP addresses in application logs (IP is retained in `audit_log` table only, scoped by RLS).
- Log destination: Vercel built-in log drain (free tier); forward to Datadog or Logtail when MRR > AUD $1,600.
- Log retention: 30 days in Vercel; 12 months in `audit_log` table per NFR-V2.

### 5.4 The One Business Metric

**Checks run per day** (count of `uploads` rows with `status = 'complete'` created in the last 24 hours).

Query (run daily, alert if zero on a business day):
```sql
SELECT COUNT(*) FROM uploads
WHERE status = 'complete'
  AND uploaded_at >= NOW() - INTERVAL '24 hours';
```

Secondary metric at 90 days post-launch: trial-to-paid conversion rate (target >= 10%).

### 5.5 Alert Routing

| Severity | Channel |
|----------|---------|
| SEV1 (site down) | Operator mobile (call/SMS) + email + Slack `#ops-alerts` |
| SEV2 (degraded) | Operator email + Slack `#ops-alerts` |
| SEV3 (minor/informational) | Slack `#ops-alerts` only |
| Cost alert (>75% of ceiling) | Operator email |

Alert routing config is declared in `product/ops/alerts.json`.

---

## 6. COST ESTIMATE AND CEILING

### 6.1 Cost Ceiling

**AUD $800/month** (NFR-C1). At 200 active accounts, infra cost per account must not exceed AUD $2.50/month.

### 6.2 Current Projected Infra Cost (0–200 accounts)

| Service | Tier | Cost (AUD/mo) | Notes |
|---------|------|--------------|-------|
| Vercel | Pro | ~$28 | ~USD $20; required for custom domains, edge functions, encrypted env vars |
| Supabase | Pro | ~$35 | ~USD $25; required for daily automated backups with PITR (NFR-A2) |
| Transactional email (Resend) | Free / Starter | $0–$14 | Free up to 3,000 emails/mo; Starter $14/mo for 50,000 |
| UptimeRobot | Free | $0 | 50 monitors free |
| Total | | **~$63–$77/mo** | Well within $800 ceiling |

**The $800/mo ceiling will not be breached until approximately 300+ accounts** at current tier mix, at which point Supabase compute may need upgrading. The cost envelope is safe for the first 12 months.

### 6.3 Top Cost Drivers

1. **Supabase Pro ($35/mo)** — non-negotiable for backup/PITR compliance (NFR-A2). Do not downgrade to Free.
2. **Vercel Pro ($28/mo)** — required for encrypted environment variables and custom domain SSL. Do not downgrade to Hobby (no team features, limited bandwidth).
3. **Email volume** — Resend or equivalent scales with active users. Monitor monthly email sends; upgrade tier at ~2,500 emails/month to avoid overage.

### 6.4 Cheapest Viable Setup

The above configuration (~$70/mo) is already the cheapest viable setup that meets the NFRs. No further optimisation is available without degrading backup compliance (NFR-A2) or security posture. Do not use free tiers of Supabase or Vercel in production.

### 6.5 Cost Alert Trigger

Alert the operator when projected monthly spend exceeds AUD $600 (75% of $800 ceiling per NFR-C1). Configured in `product/ops/alerts.json`.

---

## 7. INCIDENT RESPONSE

### 7.1 Severity Definitions

| Severity | Description | Example symptoms |
|----------|-------------|-----------------|
| SEV1 | Site completely down; no user can log in or upload | Health endpoint returning non-200; Vercel deployment failed; Supabase unreachable |
| SEV2 | Core feature degraded; users impacted but site is up | CSV processing stuck in `pending` > 15 min; PDF generation failing; Stripe webhooks not processing; >5% 5xx rate |
| SEV3 | Minor issue; no user impact or cosmetic only | Single endpoint slow; email notification delayed; log noise |

### 7.2 First Response Steps

**SEV1 — Site Down**

1. Acknowledge in Slack `#ops-alerts` within 5 minutes.
2. Check Vercel deployment status: https://vercel.com/dashboard (look for failed deploy or unhealthy functions).
3. Check Supabase project status: https://status.supabase.com and the project dashboard.
4. Assess blast radius: how many accounts are affected? Check `audit_log` for last successful requests.
5. If a recent deploy caused the outage: **execute rollback immediately** (see section 7.4).
6. If infrastructure (Vercel/Supabase) is the cause: post customer-facing status update on the status page or via email; wait for provider resolution.
7. Communicate to users within 30 minutes of confirmed outage.

**SEV2 — Degraded**

1. Acknowledge in Slack `#ops-alerts` within 15 minutes.
2. Identify affected feature from logs (Vercel log drain).
3. Check pgmq queue depth: a backlog > 100 jobs suggests the queue consumer is stalled.
4. If processing is stuck: restart the queue consumer (Supabase Edge Function trigger or manual re-queue).
5. If Stripe webhooks are failing: verify `STRIPE_WEBHOOK_SECRET` is correct in Vercel env vars; check Stripe Dashboard > Webhooks for delivery failures.
6. Set rollback trigger if degradation persists > 30 minutes without a clear fix path.

**SEV3 — Minor**

1. Log in Slack `#ops-alerts`.
2. Create a GitHub issue for fix in next deploy cycle.
3. No immediate rollback required.

### 7.3 Rollback Trigger

**Trigger rollback immediately if any of the following occur:**

- SEV1 persisting > 10 minutes with no clear infrastructure cause
- Any confirmed data exposure (cross-tenant data leak, RLS policy failure)
- Any confirmed loss of customer data
- Error rate > 5% sustained over 10 minutes following a deploy
- Stripe double-charge or subscription corruption confirmed

### 7.4 Rollback Steps

```bash
# Option A — Vercel instant rollback to previous deployment (preferred)
# Vercel Dashboard > Project > Deployments > previous deployment > "Promote to Production"
# This takes ~30 seconds and requires no code changes.

# Option B — CLI rollback
vercel rollback <previous-deployment-url> --scope <team-slug>

# Option C — Code rollback (if the previous deployment is also broken)
git revert HEAD
git push origin main
# Vercel auto-deploys on push to main
```

Database rollback (only if schema migration caused the issue):

```bash
# Supabase PITR restore — use Supabase Dashboard > Database > Backups
# Select a point-in-time before the migration
# This will restore to a new Supabase project; update SUPABASE_URL and SUPABASE_DB_URL in Vercel
# RTO target: 4 hours (NFR-A2)
```

### 7.5 Post-Incident (SEV1/SEV2)

Within 48 hours of resolution, write a blameless post-mortem covering:
1. What happened (timeline)
2. Why it happened (root cause — no blame)
3. The one fix to prevent recurrence

Store in `advisory/incident-log.md`. Share with the skill-curator for pattern capture.

### 7.6 Notifiable Data Breach Response

If a data breach is suspected (e.g. misconfigured RLS, storage bucket exposure):

1. Identify affected `account_id`s from `audit_log` within 4 hours (NFR-V4 target).
2. Revoke affected sessions via Supabase Auth admin.
3. Notify affected customers within 3 business days.
4. Assess OAIC NDB scheme notification requirement (mandatory if likely to result in serious harm; notify within 30 days of becoming aware — Privacy Act 1988 Part IIIC).
5. OAIC notification template is at `advisory/breach-notification-template.md` (operator must create this before launch).

---

## 8. OPERATIONAL PROCEDURES

### 8.1 FWC Annual Rate Table Update (July each year)

Each July, the FWC publishes updated minimum award rates. This must be applied without a code deployment (per US-08/F16).

1. Obtain new rate table data from FWC (fairwork.gov.au/pay-and-wages/minimum-wages/award-pay-rates).
2. Update `product/src/fixtures/awards.ts` — `RATE_TABLE_EFFECTIVE_DATE` and all `AWARD_RATES` entries.
3. Run `npm test` — all 171 tests must pass.
4. Deploy via normal process (requires new G6 approval).
5. After deploy: send email notification to all active subscribers ("FWC annual wage rates have been updated...").

### 8.2 Data Retention / Purge Job (Daily)

The purge job deletes records past their `purge_at` date (90 days for uploads/reports, 12 months for audit_log).

Run via Supabase Edge Function on a daily cron (configure in Supabase Dashboard > Edge Functions):

```sql
DELETE FROM uploads WHERE purge_at < NOW();
DELETE FROM employee_records WHERE purge_at < NOW();
DELETE FROM reports WHERE purge_at < NOW();
DELETE FROM audit_log WHERE purge_at < NOW();
```

Verify the purge job ran by checking for records with `purge_at < NOW()` returning zero rows.

### 8.3 Quarterly Backup Restore Drill (NFR-A2)

1. Trigger a Supabase backup restore to a staging project.
2. Verify row counts and referential integrity.
3. Assert restore completed within 4 hours.
4. Record date and result in `advisory/ops-log.md`.

### 8.4 Annual PI Insurance Renewal

Set a calendar reminder for the PI insurance renewal date. Updated certificate of currency must be stored in `advisory/insurance.md` before expiry.

---

## 9. HUMAN G6 APPROVAL COMMAND

The deploy is prepared but must NOT be executed without human approval.

To approve G6 and unblock the deploy:

1. Verify all 7 items in the "Definition of Ready to Deploy" checklist above are ticked.
2. Edit `ventures/au-sme-compliance/gates/G6-operate.json` — set `"status": "approved"` and record your name and timestamp in `"set_by"` and `"set_at"`.
3. Run the deploy command:

```bash
cd ventures/au-sme-compliance/product
vercel --prod
```

The deploy hook will verify G5 is green and G6 is approved before allowing the deploy to proceed.
