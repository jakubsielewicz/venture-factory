# _eval — frozen golden cases (regression harness for judgment)

Makes "the skills improve" **falsifiable**. A small set of frozen opportunities with
expected outcome *ranges*; re-run them after a `skill-curator` edit to catch drift —
e.g. if a new heuristic suddenly makes a clear PURSUE score as KILL, you'll see it.

- `cases/*.json` — one golden case each: `{ id, idea, expect: { verdict, score_min, score_max, must_flag } }`. Verdict is the primary signal; the score band is a soft secondary check.
- `automation/run_eval.py` — runs each idea through the `opportunity-scoring` skill via the Agent SDK and compares to `expect`. **Makes real LLM calls** (like `nightly_scout.py`) — run it deliberately, not in CI.
- `results/` — run output (git-ignored); the runner writes `results/latest.json` for diffing across runs.

```bash
pip install claude-agent-sdk
export ANTHROPIC_API_KEY=...
python automation/run_eval.py
```

Run it **before and after** promoting a curator proposal into a `SKILL.md`; a drop on a previously-passing case is your signal to reject the heuristic. Add a new golden case whenever a venture surfaces a judgment the crew should reliably reproduce.
