# Venture-factory — agent / skill / I-O flow

How each agent uses its skills and what artifacts flow in and out, across the gated lifecycle
`G0 → G1 → **G2 (human)** → G3 → G4 → G5 → **G6 (human)** → Retro`.

- **Agents** (purple) own a gate and delegate-receive from the orchestrator. Each lists the skills it runs.
- **Artifacts** (blue parallelograms) are files under `ventures/<slug>/`. The orchestrator is the **single writer** of `manifest.json`, `brief.md`, and `gates/`.
- **Sources** (green) are external inputs. **Human gates** (orange hexagons) and deterministic **gate checks** (dashed diamonds) are where the factory stops or enforces.

```mermaid
flowchart TB
  classDef human fill:#ffe0b2,stroke:#e65100,color:#000;
  classDef art fill:#e3f2fd,stroke:#1565c0,color:#000;
  classDef agent fill:#ede7f6,stroke:#4527a0,color:#000;
  classDef src fill:#e8f5e9,stroke:#2e7d32,color:#000;
  classDef gate fill:#fff,stroke:#555,stroke-dasharray:4 3,color:#000;

  GOAL(["human goal: theme or broad domain"]):::src

  subgraph STATE["per-venture state — single writer: orchestrator"]
    MAN[/"manifest.json"/]:::art
    BRIEF[/"brief.md"/]:::art
    GATEFILES[/"gates/Gn-*.json"/]:::art
  end

  ORCH["venture-orchestrator · sonnet<br/>tools: Skill, Agent, Bash, Edit, TodoWrite<br/>runs .claude/hooks/gate.py"]:::agent
  GOAL --> ORCH
  ORCH --- STATE

  %% ================= G0 · Scout =================
  SEED(["VF_HARVEST_SEED<br/>(discovery seed, pre-venture)"]):::src
  WEB[("live sources<br/>HN · GitHub · Google · StackExchange (keyless)<br/>+ WebSearch: reviews · Upwork · jobs · Canny")]:::src
  SCOUT["opportunity-scout · sonnet<br/>signal-harvest (discovery + validation)<br/>conviction-scoring · market-sizing<br/>competitor-teardown · opportunity-scoring"]:::agent
  ORCH ==>|"delegate G0"| SCOUT
  SEED --> SCOUT
  WEB --> SCOUT
  BRIEF -.->|"venture theme (validation)"| SCOUT
  SCOUT --> CONV[/"research/conviction-signal.md<br/>PASS · WEAK · FAIL"/]:::art
  SCOUT --> OSC[/"research/opportunity-score.md<br/>0-100 + PURSUE/PARK/KILL"/]:::art
  SCOUT --> SHORT[/"research/shortlist.md"/]:::art
  CONV -.->|"WEAK / FAIL = PARK"| STOP0(["stop · escalate"]):::gate
  G0CHK{"gate.py check G0<br/>required artifacts present?"}:::gate
  CONV --> G0CHK
  OSC --> G0CHK

  %% ================= G1 · Validate =================
  ADV["domain-advisor · opus<br/>regulatory-scan · risk-register<br/>moat-assessment · go-no-go-memo"]:::agent
  FIN["financial-analyst · opus<br/>unit-economics · pricing-model<br/>saas-metrics · sensitivity-analysis"]:::agent
  G0CHK ==>|"green"| ORCH
  ORCH ==>|"delegate G1"| ADV
  ORCH ==>|"delegate G1"| FIN
  OSC --> ADV
  CONV --> FIN
  ADV --> VER[/"advisory/verification.md"/]:::art
  ADV --> RISK[/"advisory/risk-register.md"/]:::art
  FIN --> UE[/"financials/unit-economics.md"/]:::art
  VER --> MEMO[/"advisory/go-no-go-memo.md"/]:::art
  RISK --> MEMO
  UE --> MEMO
  ADV --> MEMO

  %% ================= G2 · human =================
  G2{{"G2 · DECIDE (human)<br/>money is spent here<br/>approves gates/G2-*.json"}}:::human
  MEMO --> G2

  %% ================= G3 · Design =================
  ARCH["product-architect · opus<br/>prd-authoring · c4-model · api-contract<br/>nfr-checklist · build-vs-buy"]:::agent
  GM["growth-marketer · sonnet<br/>positioning-canvas · icp-definition<br/>seo-keyword-research<br/>launch-playbook · pricing-page-copy"]:::agent
  G2 ==>|"approved"| ORCH
  ORCH ==>|"delegate G3"| ARCH
  ORCH ==>|"delegate G3"| GM
  MEMO --> ARCH
  FIN -.->|"G3 pricing"| PRICE[/"financials/pricing.md"/]:::art
  ARCH --> PRD[/"product/design/prd.md"/]:::art
  ARCH --> C4[/"product/design/c4.md"/]:::art
  ARCH --> API[/"product/design/api-contract.md"/]:::art
  ARCH --> NFR[/"product/design/nfr.md"/]:::art
  GM --> MKT[/"marketing/* (positioning, ICP, launch, copy)"/]:::art

  %% ================= G4 · Build =================
  BLD["builder · sonnet<br/>scaffold-stack · iac-baseline<br/>secure-defaults · commit-discipline"]:::agent
  ORCH ==>|"delegate G4"| BLD
  PRD --> BLD
  API --> BLD
  NFR --> BLD
  BLD --> SRC[/"product/src (+ IaC, declared not applied)"/]:::art

  %% ================= G5 · Test =================
  QA["qa-engineer · sonnet<br/>test-plan · e2e-suite<br/>security-checklist · perf-smoke"]:::agent
  ORCH ==>|"delegate G5"| QA
  SRC --> QA
  NFR --> QA
  QA --> TESTS[/"product/tests"/]:::art
  G5CHK{"gate.py test G5<br/>REAL exit code + source fingerprint<br/>cannot be self-asserted"}:::gate
  SRC --> G5CHK
  TESTS --> G5CHK

  %% ================= G6 · human =================
  G6{{"G6 · OPERATE/DEPLOY (human)<br/>something goes public<br/>approves gates/G6-*.json"}}:::human
  G5CHK ==>|"green & fresh"| G6

  OPS["operator · sonnet<br/>deploy-runbook · observability-baseline<br/>cost-optimisation · incident-response"]:::agent
  G6 ==>|"approved"| OPS
  SRC --> OPS
  OPS --> RUN[/"runbook.md"/]:::art

  %% ================= Retro =================
  RETRO["/retro · skill-curator skill"]:::agent
  RUN --> RETRO
  MEMO --> RETRO
  RETRO --> LEDG[/"each skill's knowledge/ledger.md<br/>+ examples/ (append-only)"/]:::art
  RETRO --> PROP[/"ventures/&lt;slug&gt;/retro/curator-proposals.md"/]:::art

  %% ================= enforcement (deterministic) =================
  G2 -.->|"guard blocks spend / resource-create until approved"| ORCH
  G6 -.->|"deploy guard: needs G5 green+fresh AND G6 approved"| OPS
```

## Legend
| shape | meaning |
|---|---|
| purple rounded | agent (with model + the skills it runs) |
| blue parallelogram | artifact written under `ventures/<slug>/` |
| green stadium / cylinder | external input (human goal, seed, live sources) |
| orange hexagon | **human gate** — orchestrator stops, never self-approves |
| dashed diamond | deterministic check in `.claude/hooks/gate.py` |
| thick arrow `==>` | orchestrator delegate / gate-pass control flow |
| solid arrow `-->` | artifact/data flows in or out |
| dotted arrow `-.->` | conditional / mode-specific / guard relationship |

> The orchestrator is the only writer of `manifest.json`, `brief.md`, and `gates/`; specialists write only inside their own folder (`research/`, `advisory/`, `financials/`, `product/`, `marketing/`, `runbook.md`). The model can never write `gates/*.json` — only `gate.py` or a human can.
