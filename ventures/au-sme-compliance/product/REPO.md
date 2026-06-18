# Product repository

The deployable product for this venture lives in its own repo — the single source of
truth for the code; ongoing changes happen there under normal git + CI:

**https://github.com/jakubsielewicz/au-sme-compliance**

This factory directory keeps the **decision dossier** only: `brief.md`, `manifest.json`,
`gates/`, `research/`, `advisory/`, `financials/`, `marketing/`, and `runbook.md`.

The release discipline continues in the product repo: every release stays gated on
green tests + human deploy approval, and the 7 launch blockers (solicitor sign-off,
10–15 awards, brute-force lock, staging load tests, secrets scan, legal pages, PI
insurance) must be cleared before G6 deploy.
