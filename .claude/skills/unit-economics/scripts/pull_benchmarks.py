#!/usr/bin/env python3
"""Print current SaaS benchmark ranges to ground unit-economics reasoning.

Fails gracefully (plan rule): if no live benchmark source is configured, prints
the static ranges below (clearly dated) plus a DATA UNAVAILABLE note, so the
skill still works. Keep output short — this is injected into context on every
load; depth lives in references/saas-benchmarks.md (read on demand).
"""
from __future__ import annotations

import os
import sys

STATIC = """SaaS benchmark ranges (static fallback - verify freshness):
- LTV:CAC >= 3:1 healthy (1.5-3 watch; <1.5 unhealthy)
- CAC payback <= 6 mo strong (6-18 watch; >18 concerning)
- Gross margin 75-85% software (lower if infra/usage-heavy; payment fees ~3%)
- Monthly logo churn <1% mid-market, 1-2% SMB (>5% unhealthy); NRR >110% strong
- Rule of 40 (growth% + profit%) >= 40 venture-grade; less critical bootstrapped
- Bootstrapped bias: fast payback beats big LTV:CAC when there's no capital to float CAC"""


def main() -> int:
    if os.environ.get("BENCHMARKS_API_KEY"):
        # TODO (Phase 1+): wire a real comparables/benchmarks source here.
        print("DATA UNAVAILABLE: live benchmark source not yet wired; using static ranges below.")
    else:
        print("DATA UNAVAILABLE: no BENCHMARKS_API_KEY set; using static ranges below.")
    print(STATIC)
    return 0


if __name__ == "__main__":
    sys.exit(main())
