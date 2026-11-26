# Changelog

## 0.4.0 (2026-11-25)

- New lens, Meaning views, drawn from the optional meaning model: Thread, Quilt, Topics, Map, Reorder, Ask, Abstract & ending, and Drills.
- Two live gauges under the rewrite box: closeness to the sentence before, and to the claim.

## 0.3.0 (2026-11-25)

The optional meaning model now also works in four more lenses.

- Claim tracer: the sentence that states the claim most directly, and how close each paragraph is to the claim.
- Source overlap: the sentences closest in meaning to a source sentence, and the parts of the source the draft says least about.
- Term tracker: the closest pairs in meaning among the draft's terms.
- Before & after: how far each rewritten sentence has moved from the one it replaced.

## 0.2.0 (2026-11-25)

- Optional meaning model, off by default: a small sentence-embedding model (all-MiniLM-L6-v2) that runs in the browser from the files in `model/`.
- Topic grid: sentences linked in meaning only, closeness between neighbouring paragraphs, and the weakest join.
- Reverse outline: the central sentence of each paragraph, and the sentence that best carries a stated point.
- The header says "no AI" only while the model is off.

## 0.1.0 (2026-11-25)

First version in this repository.

- 26 lenses in six groups, from the argument down to typing slips, plus an overview, a before-and-after view and practice drills.
- A workbench for rewriting each sentence in place, with previews of suggested changes, undo, and a revision receipt.
- A research profile of 17 counts drawn from published work on cohesion, vocabulary, syntax, readability and mechanical errors.
- Your own word list, and overlap with a pasted source.
- A standalone `index.html` built from the pieces in `src/` by `build.py`, and a smoke test for the rule engine.
