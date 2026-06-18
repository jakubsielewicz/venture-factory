# Launch Playbook — Modern Award Pay Compliance Checker
**Venture:** au-sme-compliance
**Date:** 2026-06-18
**Gate:** G3 (lead role)
**Author:** growth-marketer

> DRAFT — nothing in this document may be published or sent until ALL items on the Publish Checklist (section 7) are cleared and a human owner has given explicit approval.

---

## 1. Channels Selected (2 primary + 1 supporting)

Based on where the ICP looks (icp.md section 4) and the CAC estimates in financials/unit-economics.md, three channels are selected. Paid Google Ads is held as a secondary lever to activate only after organic proof exists.

| Channel | Rationale | Estimated CAC | Owner |
|---------|-----------|---------------|-------|
| **Content/SEO + landing page** | Captures high-intent search traffic (award-specific keywords, FWC wage review seasonality); lowest CAC; builds compounding authority; directly reachable before a single dollar of ad spend | AUD $120 (estimate — unit-economics.md) | Founder |
| **Accountant / bookkeeper referral program** | Accountants and BAS agents are the trusted advisers who recommend tools to the exact ICP; referral has the highest conversion rate and lowest acquisition cost; the bookkeeper is often the user for their own practice | AUD $60 (estimate — unit-economics.md) | Founder |
| **Industry association newsletters** (HIA, Restaurant & Catering Australia, state hospitality/retail associations) | Reaches the ICP in a context of trust (members open trade newsletters); the criminal wage theft law change is editorial news these associations are already covering | AUD $180 (estimate — unit-economics.md) | Founder |

Google Ads (Cluster A keywords) is held as Phase 2 (post-launch, after 200 paying customers). CAC estimate AUD $350 — only justified once organic funnel efficiency is established. Hard ceiling: if blended CAC exceeds AUD $280 at 90 days of paid testing, pause ads.

---

## 2. Pre-Launch Phase (Weeks 1–6 of build)

**Goal:** Reach the 200 waitlist sign-up gate before full build commences (prd.md section 7, go-no-go-memo.md open unknown #1). This is a validation gate, not a marketing exercise.

### Assets needed

| Asset | Purpose | Who produces it | Status |
|-------|---------|----------------|--------|
| Landing page (static, no app) | Waitlist capture; explains the problem and product in plain language; shows pricing | Founder + designer | Needs build |
| Landing page copy | Headline, problem statement, how it works, pricing, CTA, disclaimer | Growth marketer (drafted in pricing-page.md) | DRAFT — needs solicitor review |
| Waitlist confirmation email | Confirms sign-up; sets expectations; asks one qualifying question (industry, employee count) | Growth marketer | Needs drafting |
| 10–15 buyer interviews | Direct conversations with SME owners to validate willingness-to-pay at $49–$79/mo; not marketing, but informs messaging | Founder | Not started |

### Actions

1. Publish landing page with waitlist form (Typeform or native Vercel form is sufficient at this stage)
2. Share URL with personal network — accountants, bookkeepers, hospitality contacts — for early signal
3. Post one factual explainer article on the criminal wage theft law change (Cluster C keyword content) to seed organic traffic to the landing page
4. Reach out to 3–5 bookkeeper/accountant contacts for informal validation; ask if they would recommend this tool to clients at $49/mo

**Gate:** Do not commence full application build until 200 waitlist sign-ups are confirmed. If 200 sign-ups are not reached within 6 weeks, re-evaluate channel mix and messaging before proceeding.

---

## 3. Launch Phase (Weeks 14–16, post-MVP build)

**Goal:** Convert waitlist to paid trial users; reach 20 paying accounts within 90 days of launch (MRR AUD $1,600 — operational break-even from unit-economics.md).

### Sequence

**Week 14 (soft beta launch)**
- Email all waitlist sign-ups: "You're in — start your free 14-day trial"
- Activate 10–15 accounts of buyer interview participants for beta (first-hand validation; catch classification errors before broad release)
- Internal QA on disclaimer text in PDF reports — confirm solicitor-approved language is present

**Week 15 (referral channel activation)**
- Email 20–30 accountant/BAS agent contacts with a referral proposition: "For each client you refer who starts a paid subscription, we'll give you [referral credit or cash equivalent — TBD; confirm legal structure for referral payments with solicitor]"
- No public announcement yet

**Week 16 (public launch)**
- Publish product on Product Hunt (Australian B2B SaaS audience; early adopter segment)
- Publish on Indie Hackers (founder community; credibility for later press)
- Send announcement to hospitality and retail industry association contacts with a proposal for a member-exclusive newsletter mention
- Publish the FWC Annual Wage Review 2026 SEO content piece (timing: this content is highest-value when published before or immediately after the June FWC decision)

### Assets for launch phase

| Asset | Channel | Notes |
|-------|---------|-------|
| Email sequence (waitlist conversion: 3 emails over 14 days) | Email | Drafts required; use positioning one-liner as subject line test |
| Product Hunt listing copy | Product Hunt | 60-word tagline + 3 key feature callouts + screenshots |
| Accountant referral one-pager (PDF or web page) | Direct referral | Explains what the tool does; why it helps their clients; how referral program works |
| Association newsletter ad copy (50–100 words) | Industry associations | Factual, no safe-harbour language; must pass publish checklist |
| 3 award hub pages (Hospitality, Retail, Childcare) | SEO | Pillar content pages; highest-volume keywords; must be live before launch |

---

## 4. Post-Launch Phase (Months 2–6)

**Goal:** Sustain 20 new accounts/month acquisition pace; reduce churn below 2.5%/mo; establish referral loop.

### Actions

- **Month 2:** Publish 2 more award hub pages (Building and Construction; Restaurant Industry); target seasonal keyword content for 2026–27 FWC wage review cycle
- **Month 3:** Formal accountant referral program launch (if legal structure for referral payments confirmed); aim for 10 active referring bookkeepers
- **Month 4:** First NPS survey to all paid subscribers (30+ accounts); use verbatim quotes (with permission) for social proof on landing page
- **Month 5:** Analyse support tickets — if >5% of checks produce classification-related questions, this signals a need for clearer onboarding or a "confirm your award" step
- **Month 6:** Review: blended CAC, MRR, churn, conversion rate. If churn > 4%/mo at Month 6, pause acquisition spend and prioritise retention product work before scaling

---

## 5. Kill/Iterate Triggers

| Metric | Kill/pivot trigger | Iterate trigger |
|--------|-------------------|----------------|
| Waitlist sign-ups at 6 weeks | < 100 sign-ups — re-evaluate pricing or niche; do not start build | 100–199 — extend validation; revise landing page messaging |
| Trial-to-paid conversion at 60 days | < 5% — pricing or product-market fit problem; halt paid acquisition; do buyers object to price or product? | 5–9% — marginal; improve onboarding; trial limit may be too restrictive |
| Month 3 churn | > 5%/mo — churn is existential; address retention before scaling acquisition | 3–5% — watch closely; annual billing conversion is the lever |
| Blended CAC at 90 days of paid ads | > AUD $280 — pause Google Ads; redirect budget to content/referral (risk-register.md R8) | — |
| Support tickets: wrong classification | > 5% of checks — award engine accuracy problem; halt new accounts; legal review | 2–5% — add "verify with FWO tool" prompts; improve LOW-confidence UX |

---

## 6. Launch Metrics (what "success" means)

| Metric | Target | Timeframe |
|--------|--------|-----------|
| Waitlist sign-ups | >= 200 | Pre-build (6 weeks) |
| Trial-to-paid conversion | >= 10% | 60 days post-launch |
| MRR | >= AUD $1,600 (~20 Pro accounts) | 90 days post-launch |
| Month 1 churn | <= 5% | 30 days post-first-payment |
| NPS (post-report survey) | >= 30 | 90 days post-launch |
| Blended CAC | <= AUD $250 | Month 3 |

Source: prd.md section 3 success metrics; financials/unit-economics.md break-even table.

---

## 7. PUBLISH CHECKLIST

Every external post, email, ad, social update, or listing must pass this checklist before a human owner authorises publication. No content goes live without explicit human approval.

### Legal / compliance gates (ALL must be checked)

- [ ] Employment solicitor has reviewed and approved this specific piece of copy (GO-IF condition 1 from go-no-go-memo.md)
- [ ] The copy does NOT contain any of the off-limits messages listed in positioning.md section 4
- [ ] The copy does NOT use the words "safe harbour", "achieves compliance", "compliant", "protected from prosecution", or "legally protected" in relation to the product's output
- [ ] If the copy references the Voluntary Small Business Wage Compliance Code, it does NOT imply the product satisfies more than one of the Code's seven requirements
- [ ] The copy includes or links to the advisory-mandated disclaimer: "This tool generates evidence of a pay-rate compliance check. It does not constitute legal advice or payroll advice, and does not achieve safe-harbour status under the Voluntary Small Business Wage Compliance Code."
- [ ] Any factual claim about penalty amounts, legislation, or FWC wage rates is cited to a named, dated source (no unattributed statistics)
- [ ] The copy does NOT claim Xero or MYOB integration (deferred post-MVP)
- [ ] The copy does NOT claim coverage of more than 12 modern awards (the MVP launch set)

### Product accuracy gates

- [ ] All pricing figures match the current approved tier table: Starter AUD $49/mo, Pro AUD $79/mo
- [ ] Free trial terms are accurately described: 14 days, no credit card required, limited to 5 employees and 1 award
- [ ] Product capabilities described match what the product actually does at the time of publication (no forward-looking features presented as current)

### Human approval gate

- [ ] Named human owner has reviewed this checklist and the copy, and has given written (email or Slack) confirmation to publish
- [ ] Date of approval recorded: ___________
- [ ] Approving human: ___________

---

*Nothing in this playbook constitutes a commitment to publish. All sequences, copy, and timings are drafts pending human approval and solicitor sign-off.*
