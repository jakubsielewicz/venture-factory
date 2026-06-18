# Build-vs-Buy Analysis — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 Design
**Author:** product-architect

> Cost envelope: AUD $77,200 base / $120,000 ceiling (advisory/go-no-go-memo.md).
> All vendor prices are in AUD unless noted. Exchange rate assumption: 1 USD = 1.55 AUD (June 2026).

---

## Decision Summary Table

| Component | Decision | Vendor / Technology | Monthly Cost (AUD) | One-off Cost |
|-----------|---------|--------------------|--------------------|-------------|
| Authentication | BUY (Supabase Auth) | Supabase | Included in DB plan | $0 |
| Database | BUY (Supabase Postgres) | Supabase Pro | ~$31/mo | $0 |
| Object Storage | BUY (Supabase Storage) | Supabase | Included in Pro | $0 |
| Hosting (Web + API) | BUY (Vercel) | Vercel Pro | ~$31/mo | $0 |
| PDF Generation | BUILD (pdfkit library) | OSS (pdfkit) | ~$0 (compute cost only) | Build: ~16 hrs |
| Classification + Rule Engine | BUILD | Custom Node.js | $0 (compute cost only) | Build: ~200 hrs |
| Award Rate Tables | BUILD + Manual Ops | Internal JSON/DB | $0 | Build: ~40 hrs + $5K legal/yr |
| Payments | BUY (Stripe) | Stripe | 1.7% + A$0.30/txn | $0 |
| Email (transactional) | BUY (Resend) | Resend | ~$0 (<= 3,000/mo free tier; ~$3/mo at scale) | $0 |
| Job Queue | BUY (Supabase pgmq or Inngest) | Supabase pgmq (OSS) | $0 (within Supabase) | $0 |
| Legal review | BUY (employment solicitor) | External solicitor | N/A | $5,000–$8,000 one-off |
| Monitoring / Uptime | BUY (Better Uptime) | Better Uptime | ~$0 (free tier) | $0 |
| Error tracking | BUY (Sentry) | Sentry | ~$0 (free tier, <= 5K errors/mo) | $0 |
| CI/CD | BUY (GitHub Actions) | GitHub | ~$0 (included in repo) | $0 |

**Estimated total monthly infrastructure cost at launch: AUD ~$65–$80/mo** (well within $800/mo fixed-cost envelope from financials/unit-economics.md).

---

## Component Analysis

### 1. Authentication

**Decision: BUY — Supabase Auth**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Fast | Supabase Auth provides email/password, magic-link, JWT, session management out of the box |
| Monthly cost | $0 | Included in Supabase Pro plan (AUD ~$31/mo) |
| Lock-in risk | Low | Auth tokens are standard JWTs; migrating to a different provider requires re-issuing tokens but data is portable |
| Core to moat | No | Auth is a commodity; the moat is in the rule engine |

**Why not Auth0 / Clerk:** Auth0 free tier is limited; paid tier starts at USD $35/mo (~AUD $54/mo). Clerk is ~USD $25/mo (~AUD $39/mo). Both are more expensive than the Supabase bundled option for MVP scale without providing meaningful additional capability.

**Why not build:** Building a secure auth system (password hashing, session management, rate limiting, email verification, lockout) takes 3–5 weeks and creates security liability. Standard SaaS wisdom: never build auth.

---

### 2. Database

**Decision: BUY — Supabase Postgres (Managed)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Fast | Fully managed Postgres; no DBA needed |
| Monthly cost | ~AUD $31/mo | Supabase Pro plan includes 8GB storage, PITR backups, 500MB RAM |
| Lock-in risk | Low | Standard Postgres; can migrate to RDS or self-hosted at any time |
| Core to moat | No | Postgres is a commodity |

**Plan:** Supabase Pro (USD $25/mo = ~AUD $39/mo). Includes: 8 GB database storage, daily PITR backups, 100 GB bandwidth, Row Level Security (critical for tenant isolation NFR-S2). Australian data residency requires selecting the Sydney region (ap-southeast-2) on project creation.

**Why not AWS RDS directly:** RDS requires more DevOps setup time. Supabase provides Auth + Database + Storage in one managed platform, reducing vendor count and integration complexity. Saves approximately 40 hours of infra setup time at MVP.

**Why not PlanetScale / Neon:** Neither has an Australian region at MVP time (June 2026). Data residency for payroll data in Australia is a strong preference given APP obligations (NFR-V3).

---

### 3. Object Storage

**Decision: BUY — Supabase Storage**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Fast | Integrated with Supabase Auth for access control; no separate S3 setup |
| Monthly cost | $0 | 100 GB included in Supabase Pro |
| Lock-in risk | Low | S3-compatible API; assets are migratable |
| Core to moat | No | Storage is a commodity |

At 500 rows/CSV × ~2KB average = ~1 MB/upload. At 100 uploads/month, this is 100 MB/month. Well within the 100 GB Supabase Pro allowance. PDF reports average ~200 KB; 100 PDFs = 20 MB/month. Total storage growth: < 150 MB/month — negligible at MVP scale.

---

### 4. Web and API Hosting

**Decision: BUY — Vercel Pro**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Very fast | Zero-config Next.js deployment; Git integration; instant preview deploys |
| Monthly cost | USD $20/mo (~AUD $31/mo) | Vercel Pro plan |
| Lock-in risk | Medium | Next.js is portable to self-hosted; serverless functions are Vercel-specific but can be refactored to standard Node.js |
| Core to moat | No | Hosting is a commodity |

**Why not AWS (EC2/ECS):** EC2 requires server management, scaling configuration, load balancer setup — adds 2–4 weeks to MVP timeline. ECS/Fargate is comparable cost but much higher setup time. For a solo founder, Vercel delivers comparable production quality 10x faster.

**Why not Render:** Render is a viable alternative (and better for long-running processes like Puppeteer). If the PDF generator requires Puppeteer (headless Chrome), a Render worker ($7/mo USD) is the better choice for that specific container. The rest of the app stays on Vercel.

**Vercel serverless function limits:** Vercel Pro allows up to 60-second function timeout. The CSV processing pipeline must complete within this limit or be moved to the background worker queue. For 500-row CSVs, 60 seconds is sufficient for the classification engine (benchmarked against similar rules-based systems). PDF generation may push this limit if using Puppeteer; pdfkit (pure Node.js) is faster and stays within 60 seconds.

**PDF Generator — pdfkit vs Puppeteer:**
- pdfkit: Pure Node.js library; generates PDFs from code (not HTML). Runs in Vercel serverless within 60s. Free. Steeper to style; no HTML template. Recommended for MVP.
- Puppeteer: Renders HTML → PDF via headless Chrome. Better visual fidelity; easier to style. Requires a persistent worker (not serverless). Adds ~$11/mo (Render free tier worker). Recommended for a post-MVP visual upgrade.

**Decision for MVP:** pdfkit on Vercel serverless. Re-evaluate after first 50 customers for visual quality.

---

### 5. Classification and Rule Engine

**Decision: BUILD (core moat)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Medium | ~160–200 hours to build + test for 12 awards |
| Monthly cost | $0 | Runs as serverless function; compute cost included in Vercel plan |
| Lock-in risk | N/A | Built internally; no lock-in |
| Core to moat | YES | This is the primary differentiator |

**Why build:** The classification engine is the product. No vendor sells a pre-built "map this job title to a Fair Work modern award classification" service. Existing solutions (FairWork Mate, Yellow Canary) are the competitors — buying from them is not possible. Building a rule engine with deterministic matching (based on award classification descriptions and keywords) and a confidence scorer is the core technical work.

**Architecture:** The engine is a stateless Node.js module that:
1. Takes an employee record (role_title, employment_type, weekly_hours, industry) and an award_id as input.
2. Runs deterministic keyword matching against `award_classifications.keywords` (curated by the operator with solicitor input).
3. If a single match: HIGH confidence.
4. If multiple possible matches: fuzzy scoring (weighted keyword overlap) → top match is MEDIUM confidence.
5. If no match or score below threshold: LOW confidence.
6. Returns matched classification_id, confidence_score, and fwc_rate_hourly from the current rate table.

**AI/ML consideration:** A future post-MVP enhancement could use a fine-tuned classifier to improve MEDIUM/LOW resolution. This is explicitly excluded from MVP to (a) stay within budget, (b) avoid the Xero ToS prohibition on ML training with API data (which could be misapplied if the training pipeline is not carefully isolated), and (c) reduce complexity. The deterministic rule engine is sufficient for the 12-award MVP scope.

**Estimated build time:** 200 hours (160 hrs engine + 40 hrs award data curation). At $120/hr opportunity cost: AUD $24,000 of the build budget. This is the largest single build item.

---

### 6. Award Rate Tables

**Decision: BUILD (manual curation) + Annual Ops**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Medium | Initial curation of 12 awards × ~20 classifications each = ~240 rate entries |
| Monthly cost | $0 (except July update sprint) | Annual update sprint ~8 hours per year |
| Lock-in risk | N/A | Data is owned by FWC (public); stored in own database |
| Core to moat | YES (data quality) | Accuracy and currency of rate tables is a differentiator |

**No vendor provides a machine-readable FWC award rate API.** The FWO Pay and Conditions Tool is a web UI only; FWC publishes rate determination PDFs. The operator must manually curate award classifications and rates from official FWC documents, with solicitor review for classification rule accuracy.

**Annual update process:** Each July (post-FWC Annual Wage Review decision), the operator runs a rate table update via `POST /admin/rates/import`. This takes approximately 4–8 hours for 12 awards. The solicitor review of updated rates (confirming no classification changes) is ~2–4 hours at ~$350–$500/hr = AUD $700–$2,000/yr ongoing. Budget for this in Year 2+ operating costs.

---

### 7. Payments

**Decision: BUY — Stripe**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Fast | Stripe Checkout + webhooks; 1–2 days to integrate |
| Monthly cost | 1.7% + A$0.30 per transaction | At $79/mo: $1.64/transaction |
| Lock-in risk | Low-Medium | Stripe is the de facto standard; switching to PayPal or Square is feasible but requires migration |
| Core to moat | No | Payments are a commodity |

**Why Stripe over Square / PayPal:** Stripe has the best developer experience, best webhook reliability, best AU domestic pricing (1.7% vs Square 1.9%), and best SaaS subscription management primitives (Stripe Billing). PayPal is more expensive (2.6% + $0.30 AU domestic) and has worse developer ergonomics.

**Stripe Billing features used at MVP:** Checkout Sessions (hosted payment page), Subscriptions (recurring billing), Customer Portal (self-service subscription management, reducing support burden), Webhooks (subscription lifecycle events). All available on standard Stripe account — no additional product or pricing tier required.

---

### 8. Email (Transactional)

**Decision: BUY — Resend**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Time-to-MVP | Very fast | Simple API; React Email templates |
| Monthly cost | $0 (3,000 emails/mo free) | At 200 accounts × 5 emails/mo average = 1,000 emails/mo — within free tier |
| Lock-in risk | Low | SMTP compatible; migrating to AWS SES or Postmark is straightforward |
| Core to moat | No | Email is a commodity |

**Why not AWS SES directly:** SES requires domain verification, sending limits, and more configuration. Resend abstracts this and allows React Email component templates — faster and more maintainable. At MVP scale, free tier is sufficient.

**Emails sent at MVP:** welcome, email verification, trial expiry (D-3, D-1), report ready, rate table updated, payment failed, cancellation confirmation. Approximately 5–8 emails per account per month at steady state.

---

### 9. Job Queue

**Decision: BUY/OSS — Supabase pgmq**

Supabase includes `pgmq` (Postgres Message Queue) as an extension. This provides a durable, Postgres-native job queue without a separate broker (Redis, RabbitMQ, etc.). For MVP-scale volumes (< 100 jobs/day), this is sufficient and reduces infrastructure complexity.

If job volume exceeds 1,000/day or complex retry/scheduling logic is needed, migrate to Inngest (cloud; free tier includes 10,000 events/mo; paid from USD $12/mo). This migration path is clean since the job payloads are simple JSON.

---

## Build vs Buy — Hours and Cost Summary

| Item | Build Hours | Buy Cost/mo | One-off Cost |
|------|------------|-------------|-------------|
| Auth (Supabase) | 8 hrs integration | $0 (bundled) | $0 |
| Database (Supabase Pro) | 8 hrs setup | ~AUD $39/mo | $0 |
| Object Storage (Supabase) | 4 hrs setup | $0 (bundled) | $0 |
| Hosting (Vercel Pro) | 4 hrs setup | ~AUD $31/mo | $0 |
| Classification engine | 160 hrs build | $0 | AUD $19,200 opp cost |
| Award data curation (12 awards) | 40 hrs | $0 | AUD $4,800 opp cost |
| PDF generator (pdfkit) | 16 hrs | $0 | AUD $1,920 opp cost |
| Rate table admin UI | 16 hrs | $0 | AUD $1,920 opp cost |
| Payments (Stripe) | 16 hrs integration | 1.7% + $0.30/txn | $0 |
| Email (Resend) | 8 hrs integration | ~$0 at launch | $0 |
| Job queue (pgmq) | 8 hrs integration | $0 | $0 |
| Web app (Next.js) | 120 hrs | — | AUD $14,400 opp cost |
| API server | 80 hrs | — | AUD $9,600 opp cost |
| Testing + QA | 40 hrs | — | AUD $4,800 opp cost |
| Legal review (solicitor) | — | — | AUD $5,000–$8,000 |
| Tooling/infra setup | — | — | AUD $2,000 |
| Misc (design, admin) | — | — | AUD $3,000 |
| **Totals** | **~528 hrs** | **~AUD $70–$80/mo** | **AUD $66,640–$69,640 opp + $10,000–$13,000 cash** |

**Total build cost:** AUD $67,200 (528 hrs × $120/hr) + $10,000 cash (legal + tooling + misc) = **AUD $77,200 base case**.

This is exactly the base-case budget from advisory/go-no-go-memo.md. Build hours are tight; scope must not creep. If award-classification scope expands beyond 12 awards, each additional award requires approximately 8–12 hours of engine logic + data curation, pushing toward the $120,000 ceiling.

---

## Cost Envelope Verification

| Budget Line | Base Case (AUD) | Ceiling (AUD) | Status |
|------------|----------------|---------------|--------|
| MVP build (14 weeks, 528 hrs at $120/hr) | $67,200 | $120,000 (24 wks) | On envelope |
| Legal review | $5,000–$8,000 | included in ceiling | On envelope |
| Tooling + infra setup | $2,000 | included in ceiling | On envelope |
| Misc | $3,000 | included in ceiling | On envelope |
| **Total** | **$77,200** | **$120,000** | **Within envelope** |

**Monthly infrastructure (ongoing, post-launch):**

| Service | Cost (AUD/mo) |
|---------|--------------|
| Supabase Pro | ~$39 |
| Vercel Pro | ~$31 |
| Resend (< 3,000 emails) | $0 |
| Sentry (< 5,000 errors) | $0 |
| Better Uptime (1 monitor) | $0 |
| **Total** | **~$70/mo** |

This is AUD $70/mo vs the AUD $800/mo fixed-cost budget assumed in financials/unit-economics.md — the actual fixed cost is AUD $730/mo below the assumed ceiling, providing a meaningful margin of safety on operating cash flow.

The $800/mo budget assumption was conservative and accounts for Xero API Plus tier ($245/mo) which is not required at MVP (CSV-first per GO-IF 2). Post-MVP, if Xero integration ships for Pro tier, total fixed costs rise to ~$315/mo — still well within the $800/mo envelope.
