# Changelog

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
