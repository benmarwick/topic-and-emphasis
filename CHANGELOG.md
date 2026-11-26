# Changelog

## 0.34.0 (2026-11-26)

- Simple view: a switch in the top row, kept in the browser, and opened by a link ending in `#simple`. Eight lenses (Claim tracer, Reverse outline, Topic position, Stress position, Subject → verb, Action in verbs, Clutter, Length & rhythm) in three steps. Every other lens, the research panels, the pictures, the fingerprints, the optional data and the Guide and Practise buttons are hidden. Notes are listed three at a time, in step order, with the chosen goal's step first. A note carries an invented before-and-after example where one fits its kind of problem. "Try the example" loads a paragraph from a school essay. The tutorial sets simple view aside while it runs. Opening a lens that simple view hides turns simple view off. The rule engine is unchanged and does not know about the view.
- Engine: a citation in parentheses with authors and a year, a year in parentheses, and a numbered citation in square brackets are each read as one token that is not a word, as `\cite{}` and `@key` already were. Sentence lengths, words before the main verb and density no longer count the names and years, and a long citation no longer hides the main verb.
- Subject → verb: "A second reading". compromise 14.21.0, a rule-based parser, is fetched from `lib/` the first time the lens opens. The panel lists the sentences where it and the rules disagree about the main verb and those where the rules found none. No note is made or removed.
- Toulmin layout: with the meaning model on, the offered sentences are ordered by closeness to the claim, and a warrant, backing or rebuttal written in your own words shows the nearest sentence of the draft with its closeness. Each rebuttal takes the sentence that answers it. The layout is drawn as a diagram, and "Copy the layout as text" gives it as plain text.
- The card beside the introduction: hand-drawn brackets, circle and underline (Rough Notation 0.5.1, carried in the page).
- The "About this project" button sits on one line with the three badges.
- Tests: `tests/simple.test.js`. The smoke test reads the page's own script, which is now the last of two.

## 0.33.0 (2026-11-26)

- Dense phrases: runs of exactly three nouns are underlined with dots in the text and make no note; a note still starts at four. The measure reports how many there are. Hohmann et al. (2025) count a "noun chunk" from three nouns up.
- Action in verbs: "What your sentences do" lists the sentences whose main verb is a form of "be" or "have" or a light verb, each opening its sentence. No note.
- Statistics reporting: "Where the numbers are" counts the figures written in digits in each sentence and lists the sentences holding three or more (a working threshold). The years and reference numbers of citations, the numbers of tables, figures and sections, and numbers written as words are not counted. The Load map gains a Numbers row under Argument.
- Comparison values from Hohmann et al. (2025), for abstracts in health and medicine: under 15 words per sentence now (about 29 in the 1960s), in the two sentence-length tooltips; about 31 nouns and 11 verbs per 100 words, in the part-of-speech panel. Given as averages for one kind of text, not as ranges or targets.
- About box: the button is now a text button in the style of the badges beside it. "Corrections and suggestions" opens by saying that fixed rules about language are sometimes wrong and that some misjudgements cannot be fixed. Every item in the Licence list links to the work it names.
- Sources: Hohmann, Barnett, King & Connell (2025) added.

## 0.32.0 (2026-11-26)

- Claim tracer: "Toulmin layout". Six parts round the claim (grounds, warrant, backing, qualifier, rebuttal). For each, the writer picks sentences from the draft or writes the part in their own words. Candidates are offered by cue: sentences naming a source or a figure for grounds and backing, sentences with a word of contrast or limitation for the rebuttal, hedging words found in the claim for the qualifier. The warrant has no candidates, because it cannot be found by rule. A table sets out how the paragraphs feed the claim. Stored in this browser, kept with a set-aside draft, reset by a new draft. No notes.
- Boxes: in every lens that shows the text, every captioned box above the text starts folded, with a triangle that glows twice when the lens opens (not under reduced motion). An opened box stays open for the visit. Lenses with no text of their own (Load map, Before & after, Practice, Guide) are not folded, nor is the Meaning views panel.
- Text box: "Quiet drafting" hides the live counts and stops the Analyse button pulsing while a draft is being written.
- Sources: Reed & Rowe (2005) and Silvia (2019) added.

## 0.31.1 (2026-11-26)

- Focus timer: while it runs or is paused, the button in the top row shows the time ("Focus timer on · 24:59").
- Research measure boxes and the Research profile have a triangle that points right when folded and down when open.
- Load map: the two rows from the meaning model are on the scale from 0 to 1 that the other lenses use, as 1 minus the closeness they report. They were on a scale of 0 to 100.

## 0.31.0 (2026-11-26)

- Tutorial: while it runs, the header, the lens list, the notes column, the panels and the buttons are faded to about a seventh, and so are the sentences and the parts of the rewrite box that the step does not use. Nothing is switched off, and the fade lifts at the last step.
- Meaning model, reviewed lens by lens. Added: two rows in the Load map ("Jump in meaning", "Far from your claim"), two typographic mappings ("Closeness to your claim", "Jumps in meaning"), and in Clutter the pairs of sentences standing apart that score 0.72 or more, as candidates for a point made twice. All are counts and pictures; none makes a note. Tried and left out: the closest pair of paragraphs as a candidate for merging (an introduction and a discussion score high for good reason).
- Guide: 17 screenshots of pictures the example cannot draw by itself, each labelled with what it needs (a revised draft, optional data, the meaning model). `tools/make_guide_shots.py` makes them from the real page and writes `data/guide/shots.json`, which `build.py` reads.
- Load map: "In the text" is now the last panel, with its explanation above its controls, so that the mapping buttons sit directly above the text. "Flip to plain text" is a link in the row of buttons above the text.
- Stage panels: the text no longer touches the coloured rule on the left.
- Header cards: ten more quotations, all by women and all checked against the source text: Wollstonecraft (two), George Eliot (three), Austen, Mary Shelley, Alcott, Dickinson and Woolf. Nine works added to the sources.

## 0.30.0 (2026-11-26)

- Guide: a section "Where the pictures are" lists the 16 lenses that draw the draft and counts their 29 pictures; each lens entry shows its pictures as half-size examples. The examples are drawn by the lens code itself from a fixed example draft (`guidePics`), so they cannot drift from the real thing. Overview and Load map now have Guide entries. Pictures that need a revised draft, loaded data or the meaning model are not shown as examples.
- Old → new: the Link ladder is one full-width picture a paragraph, with dots and rings more than twice the size, a halo round each, and a tooltip on each dot and ring naming the word and where it was last used. Under it: what to aim for, the sentences whose link comes late, and the sentences into which no word carries over, each as a chip that opens the sentence.
- Subject → verb: the subject has a single underline and the main verb a double one, with separate entries in the key. Each tooltip names the word and its partner and says how far apart they are.
- Research measure boxes start folded, showing the title, the sources and the headline figure. An opened box stays open for the visit.
- Focus timer: patterns of 12 + 3, 25 + 5 and 50 + 10 minutes, and "Until I stop", which counts up and sizes the break to the time worked (5, 8 or 10 minutes). After four rounds in a row it offers twenty minutes. The panel summarises Biwer et al. (2023), Smits et al. (2025), Albulescu et al. (2022), Sword (2016) and Cirillo (2018), all added to the sources.
- Header cards: sixteen quotations from public-domain works, each checked word for word against the Project Gutenberg text and linked to it, beside the twelve paraphrases of later sources. Nine works added to the sources. The labels under the three places now describe what readers do there, so that they hold for a quoted sentence that breaks the rule.
- Tooltips: the five that showed one of the writer's sentences without quotation marks (the Overview strip, the Link ladder, the move strip, the meaning map, and the chips under “Wording against evidence”) now quote it on its own line.
- Header: the article title in the subtitle links to the article; "Nothing uploaded" reads "Nothing leaves your device"; the paragraph beginning "You do not need to settle every note" is set like the paragraphs round it.
- Overview: the second "The draft at a glance" panel is renamed "Four portraits of the draft".

## 0.29.0 (2026-11-26)

- Tutorial: a button in the top row starts it at any time. It now walks through five notes on the built-in example (spare words, subject and verb, a passive to keep, an action in a noun, the close of a sentence) and reads the state of the draft, so it keeps its place if the writer goes off the path. Each step has "Show me". A draft of the writer's own is set aside before an example replaces it, and "Back to my draft" restores it.
- Built-in example: a seventh sentence, a passive that keeps its topic first, so that one of the five notes is settled by "I checked this" and not by rewriting. `tests/tutorial.test.js` checks that the example raises exactly the five notes and that the tutorial's rewrites clear them.
- Focus timer: 10, 15, 25 or 45 minutes, pause and stop, an optional chime, a five-minute break, a count of rounds done today. The countdown is a small panel in the corner; at the end it reports open notes, sentences changed and words, before and after. It survives a reload.
- Text box: live counts as a draft is typed or pasted (words, sentences, paragraphs, words per sentence, longest sentence, sentences of 30 words or more, longest wait for a verb, notes waiting).
- "Analyse" is green while the text box is open, and pulses once there is text to analyse. No pulse under reduced motion.
- "Clean view" moved from the line of counts to the row of buttons above the text. "Fingerprints" has a switch there too, and fingerprints now show in every lens that shows the text, not only the Overview.
- Overview: the Research profile starts folded.
- Load map: the sentence under the scatter now counts the sentences in the top right of the picture (above the middle on both scales), then says how many of those are in the highest quarter on both. Before, it reported only the second figure, which read as wrong when dots sat in the top right.
- Load map, Typographic view: links to load the part-of-speech lexicon and the word norms from inside the lens. "Words free to move" is now the starting state; "Words held in place" is the option.
- Header: the twelve sentences beside the title each state an idea from a cited source in the page's own words, with a link to the reference. None is a quotation. The test checks that none raises a note.

## 0.28.0 (2026-11-26)

- Topic grid: "Cohesion map" after Lachner, Backfisch & Nückles (2018). Up to 22 repeated terms on a ring, joined where a sentence uses both; groups joined to nothing else are drawn in amber and named. Cited authors are left out.
- Claim tracer: "Argument board". The writer labels each paragraph (supports, qualifies, answers an objection, background); the page draws the claim with a line from each paragraph and asks up to five questions about the shape. Stored in this browser; reset by a new draft.
- Signal phrases: "The reader's skim" after Fok et al. (2023): the sentences with a signalled move only, the count of unsignalled sentences between them, and the share of sentences and words a skimming reader meets.
- Term tracker: "Words that mark out each part" after Collins, Viégas & Wattenberg (2009): up to 11 words a column by log-likelihood, alphabetical, weight by score, a line where neighbouring columns share a word. Columns are sections under headings (two to six), or thirds of the draft; a second mode sets the starting draft against the draft now.
- Mechanical checks: "Where each source is cited": sources by paragraphs, matched by first author and year, by number or by citation key; the 40 most cited are drawn.
- All five are counts and pictures. None makes a note or changes the revision receipt.
- Information button at the upper right, opening a box with author, citation (with a copy button), where to send corrections, licences and details of how the page works. The version and date are read from CITATION.cff at build time.
- Stage buttons: the marks in the Overview text now follow the stage, as the notes and the lens list already did. Their tooltips say what a click does and which lenses the stage holds.
- Tooltips: every button, select, switch and summary now has one. Controls without a written tooltip get one from a table of rules when first pointed at.
- Rule fix: "this paper aims to", "this study seeks to", "we aim" and similar are now read as stating an aim.

## 0.27.0 (2026-11-26)

- Length & rhythm: "The draft as a line", a sentence drawing after Posavec. Segment length is the word count, a right turn at each full stop, colour by length band, a dot at each new paragraph, the starting draft behind.
- Term tracker: "Word tree" for any of the twelve most used terms or a selected term, in either direction, up to six words a branch and sixty uses, with single-child runs merged.
- Dense phrases: "Phrase net" for "X of Y", "X and Y" and "X is Y", found by pattern over the word stream, drawn as rows and arcs in a fixed order; up to 28 words.
- Rule-based counts; no notes.

## 0.26.0 (2026-11-26)

After Brath & Banissi (2016). Rule-based; no notes.

- Action in verbs: "What your sentences do", a mosaic of main verbs in four groups, weight by count, italic when mostly passive.
- Topic position: "Whose story the draft tells", a mosaic of grammatical subjects in five groups. Subjects are merged by stem; a head word that cannot be a subject is left out and counted.
- Term tracker: "Term index, in type": repeated terms in alphabetical order, weight by use, small capitals for claim words, italics for terms confined to one paragraph.
- Load map, typographic view: two more mappings (the parts of each sentence; load by sentence), a button to flip to plain text, and for weight mappings an option to hold every word in place by drawing weight as stroke.
- `E.isNom` and `E.verbBase` are exported.

## 0.25.0 (2026-11-26)

Five pictures made of the text itself, after Brath (2020) and Brath & Banissi (2016). Rule-based counts; no notes.

- Topic position: "How your sentences open", a stem-and-leaf plot of words (the first word of a sentence as the stem, the next three words as a leaf), for stems that open two or more sentences.
- Term tracker: "Repetition, drawn", arcs joining successive uses of a content word within a paragraph, the three most repeated coloured and named, up to nine words a paragraph.
- Length & rhythm: "Cadence without the words": one square a sentence shaded by length, and the punctuation of each sentence alone (marks inside brackets left out), with counts of commas, semicolons, colons, dashes, brackets and questions.
- Reverse outline: "Outline with proportions": one line a paragraph, with a chosen quantity set into the line as a length of heavy type on a common scale.

## 0.24.0 (2026-11-26)

Measures in and beside the text. None makes a note or changes the receipt.

- Overview: a fingerprint of six cells beside each sentence (length, wait for the verb, lexical density, long words, new words, nouns from verbs), shaded by rank within the draft, the top fifth in red. A link in "The draft at a glance" hides it.
- Workbench: a Profile tab. Each measure for the open sentence on the draft's range, with the draft's middle, the sentence's rank, where it started if rewritten, and the lens to open.
- Subject → verb: a trunk view. Openers, interruptions and comma-set asides are drawn lighter (above reading contrast); a count of sentences with more than half their words outside the trunk. With the meaning model on, each part is graded by the closeness of the sentence without it to the whole (0.95 or more lightest, 0.88 or more lighter, otherwise left dark and dotted), and sentences whose trunk alone is under 0.85 are listed. Skipped above 250 sentences.
- Load map: facets by paragraph (words, syntax, cohesion, stance), grouped under headings; the scatter gains wait for the verb and part-of-speech density as upright scales and a line from where each rewritten sentence started.
- Load map: a typographic view. Words set by one measure at a time: how common (word lists, or Zipf frequency when norms are loaded), new or repeated, syllables (letter-spacing), part of speech (with the lexicon), age learned and concreteness (with the norms). The text shows in the Load map only while this view is on.
- `E.wordTier`. Newsreader is now requested as a variable font, weights 300 to 800.

## 0.23.0 (2026-11-26)

Three additions to the optional meaning model. All are labelled as coming from the model, and none makes a note or changes the receipt.

- Old → new: a given-new ribbon. The opening of each sentence (up to the main verb) and its close are embedded as spans of their own, and each opening is compared with the close and the opening of the sentence before. Kinds: picks up the last close, keeps the last opening, near both, reaches further back, a fresh start, a pointing word, not measured. A fresh start is an opening no closer to the sentence before than three in four unrelated pairs of spans in the same draft.
- Reverse outline: a strip of dots, one row a paragraph, and a table of up to five sentences that sit furthest below the middle of their own paragraph.
- Meaning views, Abstract & ending: the claim and the early sentences that signal a gap or an aim, joined to the sentences of the last paragraph that score 0.50 or more against them.
- Embedding work rises to about three texts a sentence; the spans are skipped above 400 sentences.
- Tried and not built, with the test results recorded in the reply that proposed them: a paragraph-split detector, a citation-to-claim check, and a synthesis-versus-summary measure.

## 0.22.0 (2026-11-26)

- Optional part-of-speech lexicon: `data/pos/brill-lexicon.txt`, 53,883 lower-case words from github.com/words/brill (MIT; the lexicon of the Brill tagger, Brill 1992), each with the classes it can take, most likely first. `tools/make_pos.js`.
- Subject → verb: a panel listing sentences where the rules' main verb has no verb reading in the lexicon, and sentences where the rules found no main verb and the lexicon has a likely finite verb.
- Dense phrases: lexical density by part of speech, the share of nouns, lexical verbs, adjectives and adverbs, and nouns per lexical verb.
- Read after the analysis by `E.pos`; no note, mark or receipt changes. `tests/pos.test.js`.

## 0.21.0 (2026-11-26)

- The Academic Keyword List (Paquot 2010; CC BY 4.0) is built in: `data/lists/akl.json`, `src/akl.txt`. Vocabulary level reports the share of running words that are AKL nouns, verbs, adjectives or adverbs, by class, the words used most, and the list's multi-word entries found. Single function words on the list are not counted. The source page states 930 words; its table holds 928, which is what is stored.
- Four lists from github.com/words (MIT) are built in and only counted: hedges (Hedging, with the words this page's own rule does not mark), weasels and buzzwords (Vague & worn words), fillers (Clutter). Function words and particles on the weasel and filler lists are skipped when counting.
- None of these raises a note. MCP `research_profile` gains `academic_keyword_list` and `crowd_word_lists`. `tools/make_wordlists.py`, `tests/akl.test.js`.
- Looked at and not added, from the same organisation: `spache` (a children's reading list), `profanities` and `cuss`, the AFINN sentiment lists, `moby` (a 25 MB thesaurus), `wordnet`, `an-array-of-english-words` (a 3 MB spelling list), `brill` (a part-of-speech lexicon), and the code packages for readability formulas, stemming, phonetics and string distance, which the page already covers with its own rules.

## 0.20.0 (2026-11-26)

Nine checks after Pat Thomson's revision strategies (Kamler & Thomson 2014; Thomson 2023; the blog *patter*). Each reads a surface cue and asks a question; thresholds are working values.

- Paragraph jobs: "Source after source" (three or more sentences, and six in ten, open with a cited author); "Your own work appears only in the last sentence"; "The paragraph ends on someone else's words". A panel counts sentences led by a cited author against sources in brackets (Swales 1990).
- Mechanical checks: five or more sources in one bracket (author and year, numbered, or keyed).
- Hedging: two hedges and a limit on the claim's reach in one sentence; the stacked-hedge advice mentions reach.
- Term tracker: an abstract term (-isation, -ism, -ivity, -icity, -ality) used three times or more, off both word lists, and never explained (Flower & Hayes 1977); a panel of reporting verbs and repeated sentence openers.
- Old → new: a paragraph that opens with a general additive and repeats no content word from the end of the paragraph before.
- Signal phrases: the share of sentences that talk about the text itself, underlined, with no note (Hyland 2005; Haag 2021).
- Voice: a paragraph of four or more sentences in which three in four are passive with no agent.
- MCP `research_profile` gains `citations_by_form`, `signposting`, `reporting_words` and `repeated_sentence_openers`. `tests/patter.test.js`.

## 0.19.1 (2026-11-26)

A review of the documentation against the code. No rule changed.

- Corrected statements that had gone stale: that the Academic Formulas List is not included (it is optional data since 0.18.0), that the page fetches only its typefaces (optional data and the meaning model are fetched on request), that nothing leaves the page (the phrase look-up sends the words you select), that no wording resource is part of the page (the phrase bank is), and that there is "no dictionary" (there is no spelling dictionary; there are word lists).
- "About this tool" now lists every built-in list (adds the science-jargon list and the CMUdict syllable counts) and every optional file, with its licence position.
- Guide: the portfolio paragraph lists what the portfolio now holds and how it is saved; Unpack the noun mentions the possessive; the Load map description names its five argument strips.
- README: installation says what a saved copy lacks; the tests are listed; the 0.10 to 0.19 section is retitled; the source count is 124, not 67; the CLEAR run used 4,721 passages; lens name "Dense phrases"; MCP and licence sections cover the new data.
- Citations: Coxhead (2000) gains its DOI; Ure (1971) and Halliday (1985) are linked where they are cited; lens source lists gain Simpson-Vlach & Ellis (Signal phrases), Tufte (Overview, Before & after), Johansson (Dense phrases), the CMU Pronouncing Dictionary (Length & rhythm), and Plavén-Sigray et al. and the four word-norm papers (Vocabulary level).

## 0.19.0 (2026-11-26)

- Signal phrases, order of moves: notes for a gap signalled before the context (introduction, paper) and, in an abstract, for a method before the aim, a result before the method, and an implication before the result. The existing note for an aim before the gap is unchanged.
- Signal phrases, position of moves: notes for a paper whose aim is first signalled late or which signals no closing move near the end, an introduction that does not end on its aim, and an abstract that does not close on a finding.
- Signal phrases: the moves as rows, one column a sentence; for an introduction the rows are Swales's three moves.
- These apply only when the kind of text is chosen. `tests/moves.test.js`.

## 0.18.0 (2026-11-26)

- `data/lists/awl.json` and `data/lists/afl.json`: the Academic Word List (570 headwords, ten sublists, families) and the Academic Formulas List (607 formulas with list, rank, frequency per million in speech and writing, and formula teaching worth), as word strings and numbers only. Loaded by one button in Vocabulary level and in Signal phrases; a pasted copy still works.
- The formulas table shows frequency per million in speech and in writing beside the teaching worth.
- `data/taxonomy/uefap-functions.json`: the names and groups of UEFAP's rhetorical functions, with this project's tagging of the phrase bank's groups. The Phrases tab has a Function filter, and each group shows its function.
- The Section filter in the Phrases tab now responds when changed.
- `tools/make_lists.py` rebuilds the lists and cross-checks the formulas against a second transcription. `tests/lists.test.js`.

## 0.17.0 (2026-11-26)

- Vocabulary level: a panel that reads your own copy of the Academic Word List and reports the draft's running words on it, by sublist, with the words marked in the text.
- Signal phrases: a panel that reads your own copy of the Academic Formulas List and reports the formulas the draft uses, by list (core, written, spoken) and by formula teaching worth, with the mean worth of those used.
- Neither list is shipped: neither has an open licence. A copy is pasted in, or read from `data/lists/` on a self-hosted page, and is kept in the browser only.
- Engine: `E.parseWordList`, `E.parseFormulas`, `research.awl`, `research.afl`. These add marks and counts and never a note. `tests/ownlists.test.js`.
- Reference added: Coxhead 2000.

## 0.16.0 (2026-11-26)

- Phrases tab in the workbench: about 590 sentence frames in 57 groups, by paper section, by search, or by the paragraph's job and the move the sentence signals. Each blank is a choice; "Put in the box" adds the frame at the cursor.
- The frames are optional data in `data/phrases/` (GPL-3.0-or-later, from nashamri/academic-phrases, made from Wallwork's "Useful Phrases" with the permission of Springer Nature and the author). They are not compiled into the page. `tools/make_phrases.py` rebuilds the file.
- Notes that link to the Phrasebank and UEFAP also open the matching frames.
- References rechecked: MICUSP is now cited as the corpus itself (University of Michigan 2009); added Cotos, Huffman & Link 2020 on the Research Writing Tutor, Wallwork 2016, and the academic-phrases package.
- Guide: what the Research Writing Tutor and AcaWriter do, and what this page does and does not share with them.
- `tests/phrases.test.js`.

## 0.15.0 (2026-11-26)

- Notes that link to the Academic Phrasebank now also link to the matching rhetorical-function page of UEFAP.
- Workbench: "Check a phrase in other people's writing" sends up to eight selected words to SkELL or Linggle, or copies them for Ludwig. Nothing else leaves the page.
- Guide: "Where to find wording", covering phrase collections, books, corpora of published and student writing, how much of a stock phrase may be reused, and tools that read moves.
- Twelve new references, among them Swales & Feak 2012, Glasman-Deal 2020, Graff & Birkenstein 2024, Baisa & Suchomel 2014, Boisson et al. 2013, Römer & O'Donnell 2011, Alsop & Nesi 2009, Cotos et al. 2015 and Davis & Morley 2015.

## 0.14.1 (2026-11-26)

- The pictures draw themselves in once on arriving at a lens or a new text: bars rise, links are drawn, rows settle. Nothing replays while you type.
- The subject-to-verb arc moves from its old shape to its new one as you edit, glows amber from eight words apart and pulses slowly from twelve. When subject and verb meet, both flash once.
- A soft glow marks links that land in the opening, falling lines in the slopegraph, and the selected sentence in the skyline.
- "Still pictures (no animation)" under Reading comfort. The device's reduce-motion setting is also respected.

## 0.14.0 (2026-11-26)

- Overview: "The draft at a glance", a strip with one column a sentence, length above the line and open notes below.
- Load map: rows for open notes, claim words, evidence named in the sentence, strong wording and hedges.
- Old → new: the link ladder, a small picture for each paragraph that joins every repeated word to where it stood in the sentence before.
- Skeleton read: openings and closes in two aligned columns.
- Paragraph jobs: a paragraph map with length, claim words and point.
- Claim strength and Hedging: a table of wording against evidence named in the sentence.
- Before & after: a slopegraph of open notes by stage, start to now.
- Workbench: an arc from the subject to its verb, with a mark for each comma, bracket or dash inside the gap.
- Engine: per-sentence series for hedges, strong wording, evidence and claim words. `tests/series.test.js`.

## 0.13.0 (2026-11-26)

- Export, in Before & after and from a new "Export" button above the draft: the current text as a Word file with each open note as a margin comment on the words it points at, as a Word file with no comments, or as a plain file that keeps the format you opened.
- The .docx is written in the browser with no library (`E.docx`): a stored ZIP of document, styles and comments parts.
- Revision portfolio: adds the reverse outline (main claim, each paragraph's job, stated point and opening words) and the notes still open, by lens and for the sentences with the most; saves as a web page or Markdown, and prints (save as PDF from the print window).
- Saving inside the Claude viewer goes through its downloads capability; where no file can be saved the page offers copying.
- The name of an opened file is remembered and used for the files saved.
- `tests/docx.test.js`.

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
