# Skill-Curator Proposals — au-sme-compliance Retro
**Date:** 2026-06-18
**Author:** skill-curator
**Status:** AWAITING HUMAN REVIEW — do not apply to SKILL.md files until approved

These are proposed procedure-level changes to SKILL.md files, each with rationale and the evidence count. Per the skill-curator safeguard, SKILL.md edits require n≥3 before applying directly; these are n=1 (au-sme-compliance only) and are staged here for human decision.

---

## Proposal 1 — nfr-checklist SKILL.md

**Proposed addition (new step in procedure):**

> After listing each NFR, add an explicit step: "For each advisory/risk-register constraint rated Exposure ≥ 12, create a corresponding named NFR in Section 'Compliance and Liability Constraints' with (a) a risk-register reference, (b) a measurable target, and (c) executable acceptance criteria. Mark it as a pre-launch gate blocker in the runbook."

**Rationale:** In au-sme-compliance, compliance constraints only survived G1→G5 because they were encoded as named NFRs (NFR-L1 through NFR-L10) with testable acceptance criteria. The current SKILL.md procedure does not explicitly direct the architect to translate risk-register items into NFRs.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=3.

---

## Proposal 2 — prd-authoring SKILL.md

**Proposed addition (budget section):**

> "If the build estimate base case is within 5% of the base budget envelope, flag a 'zero-contingency warning' and add a named contingency line (recommended: 15% of base build hours) to the cost table. Surface this explicitly so the human can see the no-contingency risk at G3."

**Rationale:** The au-sme-compliance build estimate hit exactly $77,200 against a $77,200 base-case budget, with a separate ceiling of $120,000. This structure gave the appearance of headroom ($42,800 to ceiling) while actually having zero buffer at the base level. A solo builder who runs 1 week over is immediately in contingency territory.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=3.

---

## Proposal 3 — research-verification SKILL.md

**Proposed addition (statutory penalty check step):**

> "When verifying a statutory penalty claim: (1) identify the penalty-unit COUNT from the legislation, (2) confirm the current penalty-unit RATE from a primary rate source (e.g. Commonwealth rate, state rate), (3) compute the dollar figure explicitly as N × $R = $Y and compare to the claim. Do not call MISMATCH until both N and $R are confirmed. When two secondary sources cite slightly different dollar figures, check whether they are citing different rate dates before escalating."

**Rationale:** In au-sme-compliance the verifier falsely disputed a correct $8.25M penalty by using an outdated rate ($313/unit, pre-November 2024) and an incorrect unit count. The cross-check arithmetic (25,000 × $330 = $8.25M; 25,000 × $313 = $7.825M — same unit count, different rate dates, both internally consistent) resolved the apparent mismatch. The current procedure does not require explicit arithmetic verification of both inputs.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=2 (high-value safety catch, lower threshold justified).

---

## Proposal 4 — regulatory-scan SKILL.md

**Proposed addition (AU source fallback strategy):**

> "For AU regulatory claims: attempt primary fetch (.gov.au, AustLII). On timeout or 403, escalate to named law-firm secondary sources (at least 2 independent named firms citing the same fact). Label result as '[secondary — N sources: Firm A, Firm B, Firm C]' and add a note 'Primary .gov.au fetch failed — verify before launch.' Do not label a claim UNVERIFIABLE solely because the primary URL was unreachable."

**Rationale:** Across au-sme-compliance, DEWR, FWC, ABS, and AustLII all returned timeouts or 403 errors during automated fetch. The existing procedure does not distinguish between "primary source contradicts the claim" (UNVERIFIABLE) and "primary source URL was unreachable" (escalate to secondary). Treating a failed fetch as UNVERIFIABLE caused unnecessary blockers that were resolved by citing law-firm secondary sources.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=2 (AU-specific, likely to recur).

---

## Proposal 5 — unit-economics SKILL.md

**Proposed addition (locale-specific rates check):**

> "Before finalising the unit-economics model, confirm the payment-processor rate for the target market locale (not the US domestic rate). AU Stripe domestic rate: 1.7% + A$0.30. US Stripe domestic rate: 2.9% + $0.30. Cite the live source and date. Also confirm: tax rates, refund policy costs, and any locale-specific fee tiers."

**Rationale:** Using the US Stripe rate in an AU-market model overstated COGS by ~$0.95/transaction and understated gross margin by ~1.2pp. The error was correctable but required a full re-verification pass and recomputation of all downstream metrics. A single checklist item at model-build time would have caught it.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=2 (likely to recur for any non-US venture).

---

## Proposal 6 — deploy-runbook SKILL.md

**Proposed addition (deploy-guard keyword warning):**

> "When writing deploy scripts, runbook commands, or CI step definitions: avoid including deploy-trigger keywords ('deploy', 'publish', 'release') in the TEXT of shell command strings (echo output, commit message variables, heredoc content, backtick subshells). Place such keywords in comments or documentation outside the command string. A deploy-guard hook that scans command text will trip on keyword matches in string arguments, not just command names."

**Rationale:** In au-sme-compliance, deploy guard trips were caused by the word "deploy" appearing in echo strings and commit message heredocs within shell scripts — the guard matched the keyword in the command text, not in the command name. This pattern is non-obvious and the current SKILL.md does not warn about it.

**Evidence count:** n=1 (au-sme-compliance). Recommend applying at n=2.

---

## Proposals summary

| # | Target SKILL.md | Type | Evidence | Recommended threshold |
|---|----------------|------|----------|----------------------|
| 1 | nfr-checklist | Add step: advisory→NFR translation for high-exposure risks | n=1 | Apply at n=3 |
| 2 | prd-authoring | Add step: zero-contingency budget warning | n=1 | Apply at n=3 |
| 3 | research-verification | Add step: statutory penalty arithmetic check (unit count + rate) | n=1 | Apply at n=2 (high-value safety) |
| 4 | regulatory-scan | Add step: AU .gov.au fallback strategy | n=1 | Apply at n=2 (AU-specific) |
| 5 | unit-economics | Add step: locale-specific payment processor rate check | n=1 | Apply at n=2 |
| 6 | deploy-runbook | Add step: deploy-keyword avoidance in command strings | n=1 | Apply at n=2 |
