"""Dependency-free tests for harvest_signals (pytest is not installed).
Run: python .claude/skills/signal-harvest/scripts/test_harvest_signals.py
"""
import io, gzip, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harvest_signals as h


def test_active_theme_none_when_no_venture(tmp_env):
    # No VF_ACTIVE_VENTURE and a project root with no ventures/ -> None
    os.environ.pop("VF_ACTIVE_VENTURE", None)
    os.environ["CLAUDE_PROJECT_DIR"] = tmp_env
    assert h.active_theme() is None


def test_main_exits_zero_with_no_theme(tmp_env, capsys_buffer):
    os.environ.pop("VF_ACTIVE_VENTURE", None)
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


# --- tiny harness (no pytest) ---------------------------------------------
def _run():
    import tempfile, contextlib
    failures = 0
    for name, fn in sorted(globals().items()):
        if not (name.startswith("test_") and callable(fn)):
            continue
        kwargs = {}
        td = None
        if "tmp_env" in fn.__code__.co_varnames:
            td = tempfile.mkdtemp(); kwargs["tmp_env"] = td
        buf = io.StringIO()
        if "capsys_buffer" in fn.__code__.co_varnames:
            kwargs["capsys_buffer"] = buf
        try:
            with contextlib.redirect_stdout(buf):
                fn(**kwargs)
            print(f"PASS {name}")
        except Exception as e:  # noqa: BLE001
            failures += 1
            print(f"FAIL {name}: {type(e).__name__}: {e}")
    print(f"\n{'OK' if not failures else 'FAILED'} ({failures} failure(s))")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(_run())
