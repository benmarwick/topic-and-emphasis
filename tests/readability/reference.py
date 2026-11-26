"""Record what textstat gives for the fixed test passages.

Run once, from the repository root:
    pip install textstat
    python tests/readability/reference.py
It writes tests/readability/reference-textstat.json. Commit that file.
`node tests/readability.test.js` then prints this page's figures beside it.
"""
import glob, json, os
import textstat

here = os.path.dirname(os.path.abspath(__file__))
out = {"tool": "textstat", "version": getattr(textstat, "__version__", "unknown"), "texts": {}}
for path in sorted(glob.glob(os.path.join(here, "texts", "*.txt"))):
    with open(path, encoding="utf-8") as f:
        t = f.read()
    out["texts"][os.path.basename(path)] = {
        "fre": textstat.flesch_reading_ease(t),
        "fk": textstat.flesch_kincaid_grade(t),
        "ari": textstat.automated_readability_index(t),
        "smog": textstat.smog_index(t),
        "cl": textstat.coleman_liau_index(t),
        "fog": textstat.gunning_fog(t),
        "lix": textstat.lix(t),
        "dale": textstat.dale_chall_readability_score(t),
    }
with open(os.path.join(here, "reference-textstat.json"), "w", encoding="utf-8") as f:
    json.dump(out, f, indent=1)
print("wrote reference-textstat.json for", len(out["texts"]), "texts")
