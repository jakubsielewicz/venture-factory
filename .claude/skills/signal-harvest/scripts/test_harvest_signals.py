"""Dependency-free tests for harvest_signals (pytest is not installed).
Run: python .claude/skills/signal-harvest/scripts/test_harvest_signals.py
"""
import io, gzip, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harvest_signals as h


def test_active_theme_none_when_no_venture(tmp_env):
    # No VF_ACTIVE_VENTURE/VF_HARVEST_SEED and a project root with no ventures/ -> None
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ.pop("VF_HARVEST_SEED", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    assert h.active_theme() is None


def test_main_exits_zero_with_no_theme(tmp_env, capsys_buffer):
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ.pop("VF_HARVEST_SEED", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    rc = h.main([])
    out = capsys_buffer.getvalue()
    assert rc == 0
    assert "DATA UNAVAILABLE" in out


def test_http_get_json_decompresses_gzip():
    payload = {"items": [{"score": 3}]}
    raw = gzip.compress(json.dumps(payload).encode("utf-8"))

    class FakeResp(io.BytesIO):
        headers = {"Content-Encoding": "gzip"}
        def __enter__(self): return self
        def __exit__(self, *a): return False

    def fake_urlopen(req, timeout=0):
        return FakeResp(raw)

    got = h.http_get_json("https://x", _urlopen=fake_urlopen)
    assert got == payload


def test_load_tells_has_three_categories():
    tells = h.load_tells()
    assert set(tells) == {"unmet-need", "solution-seeking", "competitor-weakness"}
    assert all(isinstance(v, list) and v for v in tells.values())


def test_tag_tells_matches_unmet_need():
    tells = {"unmet-need": ["i wish", "built a spreadsheet"], "solution-seeking": ["alternative to"]}
    assert h.tag_tells("Honestly I wish there was a tool for this", tells) == ["unmet-need"]


def test_tag_tells_matches_multiple_categories_in_lexicon_order():
    tells = {"unmet-need": ["built a spreadsheet"], "solution-seeking": ["alternative to"]}
    got = h.tag_tells("I built a spreadsheet as an alternative to Foo", tells)
    assert got == ["unmet-need", "solution-seeking"]


def test_tag_tells_empty_on_no_match_or_blank():
    tells = {"unmet-need": ["i wish"]}
    assert h.tag_tells("", tells) == []
    assert h.tag_tells("just a neutral sentence", tells) == []


def test_load_tells_returns_empty_on_bad_path():
    assert h.load_tells(h.pathlib.Path("does-not-exist.json")) == {}


def test_make_record_shape_and_tells():
    tells = {"unmet-need": ["i wish"]}
    r = h.make_record("hackernews", "https://hn/1", "2026-01-02", "I wish X existed", "5", tells)
    assert r == {"source": "hackernews", "url": "https://hn/1", "date": "2026-01-02",
                 "text": "I wish X existed", "engagement": 5, "tells": ["unmet-need"]}


def test_make_record_engagement_coerces_bad_values():
    assert h.make_record("s", "u", "", "t", None, {})["engagement"] == 0
    assert h.make_record("s", "u", "", "t", "notanumber", {})["engagement"] == 0


def test_dedupe_drops_repeat_urls_keeps_order():
    recs = [
        {"url": "u1", "text": "a"}, {"url": "u2", "text": "b"}, {"url": "u1", "text": "c"},
    ]
    out = h.dedupe(recs)
    assert [r["url"] for r in out] == ["u1", "u2"]


def test_dedupe_falls_back_to_text_when_no_url():
    recs = [{"url": "", "text": "same"}, {"url": "", "text": "same"}, {"url": "", "text": "diff"}]
    assert [r["text"] for r in h.dedupe(recs)] == ["same", "diff"]


def test_parse_hn_maps_fields_and_engagement():
    data = {"hits": [
        {"objectID": "42", "title": "I wish there was X", "points": 10,
         "num_comments": 5, "created_at": "2026-01-01T00:00:00Z", "url": None},
    ]}
    recs = h.parse_hn(data, {"unmet-need": ["i wish"]})
    assert len(recs) == 1
    r = recs[0]
    assert r["url"] == "https://news.ycombinator.com/item?id=42"
    assert r["engagement"] == 15
    assert r["tells"] == ["unmet-need"]
    assert r["source"] == "hackernews"


def test_parse_github_uses_reactions_total():
    data = {"items": [
        {"html_url": "https://gh/i/1", "title": "alternative to Foo",
         "created_at": "2026-02-02T00:00:00Z", "reactions": {"total_count": 7}},
    ]}
    recs = h.parse_github(data, {"solution-seeking": ["alternative to"]})
    assert recs[0]["engagement"] == 7
    assert recs[0]["tells"] == ["solution-seeking"]
    assert recs[0]["source"] == "github"


def test_parse_github_missing_reactions_is_zero():
    data = {"items": [{"html_url": "u", "title": "t", "created_at": "d"}]}
    assert h.parse_github(data, {})[0]["engagement"] == 0


def test_parse_google_makes_suggestion_records():
    data = ["best crm", ["best crm for plumbers", "best crm alternative"]]
    recs = h.parse_google(data, {"solution-seeking": ["alternative"]})
    assert [r["text"] for r in recs] == ["best crm for plumbers", "best crm alternative"]
    assert recs[1]["tells"] == ["solution-seeking"]
    assert recs[0]["source"] == "google-autocomplete"
    assert "best%20crm%20for%20plumbers" in recs[0]["url"].replace("+", "%20")


def test_parse_stackexchange_engagement_is_score_plus_answers():
    data = {"items": [
        {"link": "https://so/q/1", "title": "how do you all deal with X",
         "score": 4, "answer_count": 3},
    ]}
    recs = h.parse_stackexchange(data, {})
    assert recs[0]["engagement"] == 7
    assert recs[0]["source"] == "stackexchange"


def test_collector_returns_records_via_injected_fetch():
    captured = {}
    def fake_fetch(url, headers=None, timeout=8):
        captured["url"] = url
        return {"hits": [{"objectID": "1", "title": "I wish", "points": 1,
                          "num_comments": 0, "created_at": "d"}]}
    recs, note = h.collect_hn("payroll reconciliation", {"unmet-need": ["i wish"]}, fetch=fake_fetch)
    assert len(recs) == 1
    assert "payroll" in captured["url"].lower() or "payroll" in captured["url"].replace("+", " ").lower()
    assert note == ""


def test_run_collectors_isolates_failures():
    def good(theme, tells, fetch=None):
        return [{"url": "u1", "text": "t", "engagement": 1, "tells": [], "source": "good"}], ""
    def bad(theme, tells, fetch=None):
        raise ValueError("boom")
    recs, notes = h.run_collectors("x", {}, collectors=[("good", good), ("bad", bad)])
    assert len(recs) == 1
    assert any("bad: skipped (ValueError)" in n for n in notes)


def test_format_digest_groups_and_ranks():
    recs = [
        {"source": "hackernews", "url": "u1", "date": "d", "text": "low", "engagement": 1, "tells": ["unmet-need"]},
        {"source": "hackernews", "url": "u2", "date": "d", "text": "high", "engagement": 99, "tells": ["unmet-need"]},
    ]
    out = h.format_digest("my theme", recs, ["github: skipped (HTTPError)"])
    assert "my theme" in out
    # higher-engagement signal listed before the lower one
    assert out.index("high") < out.index("low")
    assert "github: skipped (HTTPError)" in out


def test_main_json_mode_with_injected_collectors(monkeypatch_collectors, tmp_env, capsys_buffer):
    # a venture with a manifest so active_theme() resolves
    import json as _json, os as _os
    vdir = _os.path.join(tmp_env, "ventures", "demo")
    _os.makedirs(vdir)
    with open(_os.path.join(vdir, "manifest.json"), "w", encoding="utf-8") as f:
        _json.dump({"one_liner": "demo theme"}, f)
    _os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    _os.environ["VF_ACTIVE_VENTURE"] = "demo"
    rc = h.main(["--json"])
    payload = _json.loads(capsys_buffer.getvalue())
    assert rc == 0
    assert payload["theme"] == "demo theme"
    assert payload["records"][0]["source"] == "fake"


def test_active_theme_uses_harvest_seed_when_no_venture(tmp_env):
    # Discovery mode: no venture, but a seed is set -> seed becomes the theme.
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env  # empty tmp: no ventures/ dir
    os.environ["VF_HARVEST_SEED"] = "real-estate back-office"
    try:
        assert h.active_theme() == "real-estate back-office"
    finally:
        os.environ.pop("VF_HARVEST_SEED", None)


def test_active_venture_beats_harvest_seed(tmp_env):
    # An explicit active venture takes precedence over a discovery seed.
    vdir = os.path.join(tmp_env, "ventures", "demo")
    os.makedirs(vdir)
    with open(os.path.join(vdir, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"one_liner": "demo theme"}, f)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    os.environ["VF_ACTIVE_VENTURE"] = "demo"
    os.environ["VF_HARVEST_SEED"] = "should not win"
    try:
        assert h.active_theme() == "demo theme"
    finally:
        os.environ.pop("VF_ACTIVE_VENTURE", None)
        os.environ.pop("VF_HARVEST_SEED", None)


def test_harvest_seed_beats_ambient_venture(tmp_env):
    # A seed (explicit discovery) wins over an ambient, non-active venture.
    vdir = os.path.join(tmp_env, "ventures", "ambient")
    os.makedirs(vdir)
    with open(os.path.join(vdir, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"one_liner": "ambient theme"}, f)
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    os.environ["VF_HARVEST_SEED"] = "seed wins"
    try:
        assert h.active_theme() == "seed wins"
    finally:
        os.environ.pop("VF_HARVEST_SEED", None)


# --- tiny harness (no pytest) ---------------------------------------------
def _run():
    import tempfile, contextlib, shutil
    failures = 0
    for name, fn in sorted(globals().items()):
        if not (name.startswith("test_") and callable(fn)):
            continue
        kwargs = {}
        td = None
        argnames = fn.__code__.co_varnames[: fn.__code__.co_argcount]
        if "tmp_env" in argnames:
            td = tempfile.mkdtemp(); kwargs["tmp_env"] = td
        buf = io.StringIO()
        if "capsys_buffer" in argnames:
            kwargs["capsys_buffer"] = buf
        saved = None
        if "monkeypatch_collectors" in argnames:
            def fake(theme, tells, fetch=None):
                return [{"source": "fake", "url": "u", "date": "", "text": "I wish",
                         "engagement": 3, "tells": ["unmet-need"]}], ""
            saved = h.COLLECTORS
            h.COLLECTORS = [("fake", fake)]
            kwargs["monkeypatch_collectors"] = True
        try:
            with contextlib.redirect_stdout(buf):
                fn(**kwargs)
            print(f"PASS {name}")
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAIL {name}: {type(e).__name__}: {e}")
        finally:
            if saved is not None:
                h.COLLECTORS = saved
            if td:
                shutil.rmtree(td, ignore_errors=True)
    print(f"\n{'OK' if not failures else 'FAILED'} ({failures} failure(s))")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(_run())
