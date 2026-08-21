# Desk-sizing go/no-go (lite) — NDIS Provider Compliance & Audit-Readiness Intelligence

**Status: CONDITIONAL — desk-sizing not completed to the full spec this session; treat as a partial pass, not a PASS.**

## Why "lite," not the full 5-tab workbook
The `desk-sizing` skill requires ≥15 logged pain threads across ≥3 distinct communities with verbatim quotes, plus AU keyword volumes from a real (or triangulated) volume source. This session's toolset had no native WebSearch/WebFetch and Reddit (the primary community source for AU consumer/prosumer/SMB pain) was network-blocked in the orchestrator's own harvest run (`hot_threads.py` → SPARSE (DEGRADED), Reddit `HTTPError`). A DuckDuckGo HTML search proxy (via `curl`) substituted for WebSearch but began returning an anomaly/rate-limit page after roughly 10 queries in this session, before the two most decision-relevant follow-up queries (NDIS Worker Screening Database third-party access; a second source for "national worker-screening harmonisation") could run.

**What was actually gathered (see `keywords.csv`, `evidence-log.csv`, `competitors.csv`):**
- Genuine AU search-intent evidence via Google Autocomplete (no volume numbers — a keyless suggestion API only) for "ndis compliance software," "ndis compliance management system," "ndis worker screening check renewal," "ndis audit ready/preparation/cost."
- One live, funded, priced ($99–349/mo AUD) adjacent competitor (ClinicComply) running active content marketing directly against this budget measure — itself a strong proxy for real searchable demand (a company doesn't build SEO content and a 30-day trial funnel against zero search volume).
- Zero first-person community pain-thread quotes (the ≥15/≥3 bar was not attempted to be met by substitution — logged honestly as not-reached, not as a failed search).

## The three strongest "quotes" obtained (news/vendor, not community — landing-copy caution)
1. "...could wipe out many NDIS providers unable to afford stricter compliance, **the sector warns**." — ABC News, 24 Apr 2026.
2. "...could drive out many small businesses and sole traders who operate legitimately but cannot afford the process to become registered." — ABC News, 24 Apr 2026.
3. "...build a centralised tracking system with automated reminders rather than relying on **quarterly spreadsheet checks**." — ClinicComply blog, 10 Mar 2026 (a competitor's own framing of the current-state workaround).

**Caution:** #1 and #2 cut both ways — they evidence real pain *and* a real WTP-friction risk (the buyer segment most exposed to the new registration audit may be the segment least able to pay for a compliance SaaS on top of it). This is the single sharpest risk carried into `opportunity-score.md`.

## The sharpest risk
Not demand — the catalyst is real and well-corroborated. The sharpest risk is **addressability**: whether the product's differentiator (automated registry/worker-screening verification, not manual document tracking) is buildable at all, because third-party bulk/API access to the NDIS Worker Screening Database and Provider Register was **not confirmed** this session (two direct URL fetch attempts returned 404/403). Absent that access, this collapses toward ClinicComply's existing checklist-and-reminders model — a crowded-enough space to not clear the operator's "no generic wrapper on a crowded space" anti-pattern filter.

## Call
**Do not treat this as a desk-sizing PASS.** Route to the **direct-outreach kill test** specified in `conviction-signal.md` (10 named mid-size NDIS providers, $500-equivalent paid-pilot offer, ≥3/10 threshold) **combined with** the registry-access confirmation call to the NDIS Commission, before any G1 spend. If registry access is confirmed and ≥3/10 outreach converts, re-run a full desk-sizing pass with working search tooling before G2.
