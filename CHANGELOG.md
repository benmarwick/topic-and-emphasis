# Changelog

## 0.8.0 (2026-11-26)

- Readability formulas now run on cleaned text (citations, numbers and abbreviations dropped, hyphenated words split); the figures for the text as typed are shown beside them.
- Syllable counts: a better spelling rule plus 1,961 exceptions from the CMU Pronouncing Dictionary (`src/syllables.txt`, rebuilt by `tools/make_syllables.js`).
- Vocabulary level: general science jargon (Plavén-Sigray et al. 2017).
- Word norms: sentences with the hardest vocabulary; age of acquisition leads the panel.
- Guide: "What the counts track", from `tests/validation/clear.js` run on the CLEAR corpus.

## 0.7.1 (2026-11-26)

- Mechanical checks: a note on a view given to nobody in particular ("some argue", "it is widely believed", "is said to") when the sentence cites no source.
- Vague & worn words: notes on vague degree words (largely, quite, mostly, substantially) and comment words (interestingly, surprisingly, importantly).
- "Weasel words" now finds the five lenses that cover them, in the lens search and in the Guide.
- Readability reference values recorded from textstat and quanteda.textstats.

## 0.7.0 (2026-11-26)

- Length & rhythm: Coleman-Liau, Gunning Fog, LIX and Dale-Chall beside the existing formulas.
- Vocabulary level: running-word coverage by the two word lists, and optional word norms (concreteness, age of acquisition, prevalence, frequency) loaded on request from `data/norms/`.
- Topic grid: thematic progression above each paragraph, and referential distance and persistence for each term.
- Signal phrases: transition profile, common academic word sequences by function, repeated four-word runs.
- Hedging: boosters and reader-engagement markers. Claims & evidence: promotional adjectives. Worn & vague: excess-vocabulary words.
- Numbers & tense: the GRIM test, as a question.
- Before & after: each rewrite labelled as wording only, content added, content removed or both; the receipt counts each kind.
- All of the above in the MCP `research_profile`.
- `tests/readability/`: fixed passages, a regression test, and scripts to record reference values from textstat and quanteda.textstats.
- `data/`: third-party lists and norms with their sources and licences.

## 0.6.0 (2026-11-25)

- MCP server (`mcp/server.js`) with six tools, so an agent can use the rule engine as a tutor, a grader's aid, or for batch analysis. No dependencies.
- `mcp/guide.json`, the lens descriptions as data, and a script to regenerate it.

## 0.5.0 (2026-11-25)

- Guide: every lens on one searchable page, with its marks, research measure, meaning-model additions, limits and sources in full.
- A search box above the list of lenses.
- Choosing a lens moves the page to the top of the working space.
- The three badges (rules or model, offline, nothing uploaded) sit at the top right of the page.

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
