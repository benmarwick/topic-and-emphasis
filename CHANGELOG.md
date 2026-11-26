# Changelog

## 0.12.0 (2026-11-26)

- Unpack the noun: in the workbench, the "action is in a noun" note carries a template with three blanks (who or what, did what, to what). The verb takes the tense of the verb it replaces, the object comes from the words after the noun, and the actor is left for the writer unless the sentence names one after "by" or as a possessive. Words that are not carried over are listed. A preview shows which notes the change would clear.
- Rearrange: pieces that bring in a word the draft has not used before are marked "new"; "move to start" joins "move to end"; an interruption stays in one piece even when it holds a list; and a table sets the sentence before your moves against the sentence now (opening, subject-to-verb distance, close).
- Notes about a subject far from its verb, a weak close, new before old, and a late backward link have a button that opens Rearrange, with the interruption already picked where there is one.
- Subject and verb: a list inside an opening phrase ("with tenants, landlords and officials, the council …") no longer hides the subject.
- "undertake" is now a known verb.
- `tests/unpack.test.js`.

## 0.11.0 (2026-11-26)

- Four stages of revising: Claim strength and Hedging move from stage 1 to a new stage 4, Calibration.
- Each stage button shows its open notes; "I have reviewed this stage" ticks it and outlines the next; a "Next" button leads on. Nothing is locked.
- One line of advice when a stage 3 or 4 lens is opened while stage 1 is unreviewed and has open notes. It can be dismissed.
- The portfolio records which stages were reviewed and in what order.

## 0.10.0 (2026-11-26)

- Open a file or drag one onto the page: .docx (unpacked in the browser, no library), .md, .qmd, .Rmd, .tex, .txt.
- Blocks that are not prose are set aside and labelled: YAML settings, code, displayed equations, layout markup, block quotations and the reference list. Inline code, inline maths, web addresses and LaTeX references are not words. Markdown and LaTeX headings are section boundaries. Quarto cross-references (@fig-x) are not citations.
- Mechanical checks: the reference list against the author-and-year citations in the text.
- Three stages of revising (Argument, Flow, Polish) above the lens list.
- Before & after: a revision portfolio, copied as Markdown or JSON, with a reflection box.
- Stress position: a short bracketed aside at the end is set aside; more weak endings.
- `tests/blocks.test.js`.

## 0.9.3 (2026-11-26)

- Old → new: a noun that points back after "this", "these" or "such" ("this decline", "these findings") now counts as old, and a new research box counts sentences that point back with a noun and those that use a bare "this" (Wulff, Römer & Swales 2012; Crossley et al. 2017).
- Topic grid: the strip above each paragraph has a label of its own for "this + noun", apart from a pronoun alone.
- The "This what?" note offers nouns drawn from the sentence before, starting with its action as a noun ("trust declined" gives "this decline").

## 0.9.2 (2026-11-26)

- Subject → verb: about 170 more verbs for writing about people and institutions; rules for words that can be a noun or a verb ("results show", "levels support", "changes in policy design influence"); a base-form verb is matched to a plural subject across "of" and "in" phrases; a sentence left with no verb gets a second look; a relative clause with no "that" ("the sensation he felt was ...") and a what-clause subject no longer take the main verb.
- Passive voice: adjectives that look like participles are set aside ("were interested in", "is related to", "is based on", "is very limited", "was unaffected").
- `tests/probe.test.js`: 82 hard sentences for these rules, with a floor the scores may not fall below.
- No tagger was added. On the probe, two JavaScript taggers did no better on the main verb than the rules now do.

## 0.9.1 (2026-11-26)

- Load map: pointing at a bar shows its whole sentence with the words behind that bar marked (the words before the verb, the content words, the long words, the new words, the nouns made from verbs). Tapping a bar pins the same view under the map.
- Load map: the tooltip on each dot of the scatter gives the whole sentence.

## 0.9.0 (2026-11-26)

- New lens, Load map: small-multiple strips of six measures by sentence, a structure-and-vocabulary scatter with range-frame axes, and a paragraph table with sparklines.
- Lexical density for the draft, each paragraph and each sentence, in Phrase load, the Research profile and the MCP profile.
- Research profile grouped under Structure, Vocabulary and density, Cohesion, and Stance and care, with a sparkline beside eight of its figures. Before-and-after figures are now matched by name.

## 0.8.1 (2026-11-26)

- Citation keys in the style of pandoc, Quarto and R Markdown (`@Marwick2026`, `[@a; @b, p. 4]`, `-@a`) and LaTeX `\cite` commands are read as citations. A bracketed key is not counted as words, and a key is never taken for a term.
- Fix: a page or chapter reference inside a citation ("p. 4", "pp. 12-15", "ch. 2") no longer ends the sentence.

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
