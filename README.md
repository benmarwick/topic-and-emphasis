# Topic & Emphasis

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Browsers](https://img.shields.io/badge/browsers-Chrome%20%7C%20Edge%20%7C%20Safari%20%7C%20Firefox-brightgreen)
![Rule-based](https://img.shields.io/badge/feedback-rule--based-informational)

**Topic & Emphasis** is a browser workbench for revising **research writing**. Paste a draft and it marks where the structure of each sentence and paragraph meets, or misses, what readers expect, following Gopen and Swan's ["The Science of Scientific Writing"](https://www.americanscientist.org/node/924) (1990). You then rewrite each sentence in place and watch the notes clear. It is written for **students working on their own**, in the social sciences in particular.

Every mark and note comes from a **fixed rule**. The same text always gets the same marks, and **your draft is never uploaded**. The application is a **single HTML file** whose rules work offline once it has loaded. Everything else is optional, off until you ask for it, and never makes a note: an **optional meaning model**, a small language model that runs entirely in the browser (see below), and **optional data** fetched from the same site (word norms, the Academic Word List, the Academic Formulas List and a phrase bank). The only text that can leave the page is a phrase you select and choose to look up in SkELL or Linggle.

**Use it online:** <https://benmarwick.github.io/topic-and-emphasis/>

![The Stress position lens open on the built-in sample text](docs/screenshot.png)

---

## 📝 Citation

If you use Topic & Emphasis in teaching or research, please cite it:

> Marwick, B. (2026). *Topic & Emphasis: A revision workbench for research writing* (Version 0.27.0) [Computer software]. https://github.com/benmarwick/topic-and-emphasis

In text: (Marwick 2026).

```bibtex
@software{marwick_topic_emphasis_2026,
  author  = {Marwick, Ben},
  title   = {Topic \& Emphasis: A revision workbench for research writing},
  year    = {2026},
  version = {0.27.0},
  url     = {https://github.com/benmarwick/topic-and-emphasis}
}
```

Please also cite the article the workbench is built on:

> Gopen, G. D., & Swan, J. A. (1990). The science of scientific writing. *American Scientist*, 78(6), 550–558. [Full text](https://www.americanscientist.org/node/924)

---

## 📦 Installation

**Option A: use it online.** Open <https://benmarwick.github.io/topic-and-emphasis/>. Nothing to install.

**Option B: download one file.** Save [`index.html`](index.html) from this repository and open it in a browser. It runs from your own disk. It loads its typefaces from Google Fonts when a connection is available and falls back to system fonts when not. The rules and the built-in word lists all work in a copy saved this way. The optional extras do not, because they are separate files: the meaning model needs `model/`, and the word norms, the Academic Word List, the Academic Formulas List, the part-of-speech lexicon and the phrase bank need `data/`. For those, use the online copy or serve a clone of the repository from a local web server (`python3 -m http.server`). The two lists can also be pasted into a saved copy by hand.

**Option C: build from source.** The page is assembled from the pieces in `src/` by a short Python script with no dependencies.

```sh
git clone https://github.com/benmarwick/topic-and-emphasis.git
cd topic-and-emphasis
python3 build.py        # writes index.html
for t in tests/*.js; do node "$t" || break; done   # optional: the 17 test files
```

Requires Python 3. The tests need Node.js 18 or later and no packages. `tests/smoke.js` checks the rule engine and `tests/mcp.test.js` the MCP server; the others each cover one feature (readability figures, citations, the main-verb probe, document blocks, the point of a paragraph, the noun unpacker, Word export, the pictures' data, the phrase bank, pasted lists, the two published lists, move order, the nine reviser's checks, the built-in keyword and style lists, and the part-of-speech lexicon).

---

## 🚀 Quick Start

1. **Paste your text**, or choose **Try the example** for six sentences with four quick things to fix.
2. **Pick a lens** from the list. Each lens reads the draft for one thing and marks it in the text. The Overview shows every open note at once and suggests where to start.
3. **Tap a sentence** to open the workbench under its paragraph. Read the note, rewrite the sentence in the box, and the marks update as you type. Where a note offers a change, preview it before you accept it.
4. **Check your progress** in Before & after, which shows what your revising has changed, and copy the revised text when you are done.

To find a lens, type part of its name in the box above the list. The **Guide** explains every lens on one searchable page: what it reads, what its marks mean, what the research says, where its limits are, and its sources in full.

You do not need to clear every note. A note is a question about the sentence, and "I checked this" is a valid answer.

---

## 🔧 Feature Reference

### Gopen & Swan's principles

| Lens | What it reads | Drawn from |
|---|---|---|
| Subject → verb | Words that stand between a subject and its verb | [Gopen & Swan](https://www.americanscientist.org/node/924), principle 1; [Gibson (1998)](https://doi.org/10.1016/S0010-0277%2898%2900034-1) |
| Topic position | What opens each sentence, and whether it names the topic | [Gopen & Swan](https://www.americanscientist.org/node/924), principles 3, 4; [Williams (1990)](https://catalog.hathitrust.org/Record/002224980) |
| Stress position | What closes each sentence, where readers place the emphasis | [Gopen & Swan](https://www.americanscientist.org/node/924), principles 2, 7 |
| Old → new | Whether each sentence starts from what the reader already holds | [Gopen & Swan](https://www.americanscientist.org/node/924), principles 4, 6; [Haviland & Clark (1974)](https://doi.org/10.1016/S0022-5371%2874%2980003-4) |
| Action in verbs | Actions hidden in nouns while the verb says little | [Gopen & Swan](https://www.americanscientist.org/node/924), principle 5; [Biber & Gray (2010)](https://doi.org/10.1016/j.jeap.2010.01.001) |

### Is the argument clear?

| Lens | What it reads | Drawn from |
|---|---|---|
| Reverse outline | The first and last sentence of each paragraph, and the point you say it makes | [Mensh & Kording (2017)](https://doi.org/10.1371/journal.pcbi.1005619); [Morris et al. (2025)](https://doi.org/10.1007/s40593-024-00395-0) |
| Paragraph jobs | The job you give each paragraph, and the moves that job usually needs | [Swales (1990)](https://search.worldcat.org/title/23079178); [Academic Phrasebank](https://www.phrasebank.manchester.ac.uk/) |
| Claim tracer | Where the words of your central claim and your title appear | [Toulmin (2003)](https://doi.org/10.1017/CBO9780511840005); [Mihalcea & Tarau (2004)](https://aclanthology.org/W04-3252/) |
| Claim strength | Causal, certain and absolute wording, against the evidence you name | [Toulmin (2003)](https://doi.org/10.1017/CBO9780511840005); [Haber et al. (2018)](https://doi.org/10.1371/journal.pone.0196346) |
| Hedging | Hedges, and several in a row | [Hyland (1996)](http://hdl.handle.net/10722/130132) |

### Does it flow?

| Lens | What it reads | Drawn from |
|---|---|---|
| Topic grid | Recurring terms across sentences, and how each sentence links back | [Kinnunen et al. (2012)](https://aclanthology.org/E12-2005/); [Crossley, Kyle & McNamara (2016)](https://doi.org/10.3758/s13428-015-0651-7) |
| Signal phrases | Phrases that announce a move, and connectives by type | [Swales (1990)](https://search.worldcat.org/title/23079178); [Knight et al. (2020)](https://doi.org/10.17239/jowr-2020.12.01.06); [McNamara et al. (2014)](https://doi.org/10.1017/CBO9780511894664) |
| Skeleton read | Only the opening and close of each sentence | [Gopen & Swan](https://www.americanscientist.org/node/924), principles 2, 3 |

### Is each sentence easy to read?

| Lens | What it reads | Drawn from |
|---|---|---|
| Length & rhythm | Sentence length on a fixed scale, runs of equal length, readability formulas | [Flesch (1948)](https://doi.org/10.1037/h0057532); [Choi & Crossley (2021)](https://easychair.org/publications/preprint/pgb8) |
| Dense phrases | Noun stacks and chains of prepositions | [Williams (1990)](https://catalog.hathitrust.org/Record/002224980); [Kyle & Crossley (2018)](https://doi.org/10.1111/modl.12468) |
| Voice | Passives, and whether each names who acted | [Gopen & Swan](https://www.americanscientist.org/node/924); [McNamara et al. (2014)](https://doi.org/10.1017/CBO9780511894664) |
| Clutter | Stock phrases, empty openers and stacked negatives | [Zinsser (2006)](https://search.worldcat.org/oclc/62421288); [Williams (1990)](https://catalog.hathitrust.org/Record/002224980) |

### Are the words well chosen?

| Lens | What it reads | Drawn from |
|---|---|---|
| Vague & worn words | Intensifiers, vague quantities and worn phrases | [Zinsser (2006)](https://search.worldcat.org/oclc/62421288) |
| Vocabulary level | Content words against two open word lists, and word variety; optionally, words on the Academic Word List by sublist | [Browne, Culligan & Phillips (2013)](https://www.newgeneralservicelist.com/); [McCarthy & Jarvis (2010)](https://doi.org/10.3758/BRM.42.2.381); [Coxhead (2000)](https://doi.org/10.2307/3587951) |
| Term tracker | Recurring terms, second names for one thing, and your own word list | [Williams (1990)](https://catalog.hathitrust.org/Record/002224980); [Kyle, Crossley & Kim (2015)](https://doi.org/10.1075/ijlcr.1.2.01kyl) |
| Acronyms | Abbreviations that are never defined, or used only once or twice | [Barnett & Doubleday (2020)](https://doi.org/10.7554/eLife.60080) |
| Describing people | Labels for people that carry a judgment | [APA bias-free language guidelines](https://apastyle.apa.org/style-grammar-guidelines/bias-free-language) |

### Is it polished?

| Lens | What it reads | Drawn from |
|---|---|---|
| Statistics reporting | Reported test results, rechecked by arithmetic | [Nuijten et al. (2016)](https://doi.org/10.3758/s13428-015-0664-2); [Appelbaum et al. (2018)](https://doi.org/10.1037/amp0000191) |
| Mechanical checks | Figure and table order, missing citations, tense | [McNamara et al. (2014)](https://doi.org/10.1017/CBO9780511894664) |
| Typing slips | Doubled words, stray spaces, "a" for "an", look-alike words | [Crossley, Bradfield & Bustamante (2019)](https://doi.org/10.17239/jowr-2019.11.02.01) |
| Source overlap | Runs of words shared with a source you paste | [Crossley, Kyle, Davenport & McNamara (2016)](https://asu.elsevierpure.com/en/publications/automatic-assessment-of-constructed-response-data-in-a-chemistry-) |

### Research profile

The Overview carries a **Research profile**: 23 counts, grouped under Structure, Vocabulary and density, Cohesion, and Stance and care. Beside eight of them is a sparkline, a line the size of a word that draws the measure for every sentence, so a figure also shows where it peaks. The profile holds counts that writing researchers use to describe a text, each recomputed here by a fixed rule and each shown with the publication it comes from and a line on how to read it. They describe a draft. None is a score and none has a target. The same counts appear in a "Research measure" box inside the lens they belong to, with what the research found and how the rule-based count differs from the published one.

### Added in 0.7.0: more measures, word lists and word norms

| Where | What | Source |
|---|---|---|
| Length & rhythm | Three more readability formulas beside Flesch-Kincaid, ARI and SMOG: **Coleman-Liau**, **Gunning Fog** and **LIX**, plus the **Dale-Chall** score with the share of words off its list of familiar words. Coleman-Liau, ARI and LIX need no syllable estimate, so they are exact for the text. | [Coleman & Liau 1975](https://doi.org/10.1037/h0076540) · Björnsson 1968 · [Anderson 1983](https://www.jstor.org/stable/40031755) · Gunning 1952 · [Dale & Chall 1948](https://www.jstor.org/stable/1473169) · Chall & Dale 1995 · [Mac et al. 2022](https://pmc.ncbi.nlm.nih.gov/articles/PMC9856555/) |
| Vocabulary level | **Running-word coverage**: the share of all words that are on the NGSL or NAWL, with proper nouns counted apart. | [Nation 2006](https://www.wgtn.ac.nz/__data/assets/pdf_file/0018/1626120/2006-How-large-a-vocab.pdf) |
| Vocabulary level | **Word norms** (optional data, loaded on request): concreteness, age of acquisition, prevalence and frequency of the draft's words, with the most abstract, latest-learned, least-known and rarest words and the most abstract sentences. | [Brysbaert et al. 2014](https://doi.org/10.3758/s13428-013-0403-5) · [Kuperman et al. 2012](https://doi.org/10.3758/s13428-012-0210-4) · [Brysbaert et al. 2019](https://doi.org/10.3758/s13428-018-1077-9) · [Brysbaert & New 2009](https://doi.org/10.3758/BRM.41.4.977) · [van Heuven et al. 2014](https://doi.org/10.1080/17470218.2013.850521) |
| Topic grid | **Thematic progression**: a strip above each paragraph showing whether each sentence keeps the topic of the one before, opens from where it closed, returns to an earlier sentence, or opens on new words. **Referential distance and persistence** for each recurring term. | [Daneš 1974](https://www.coli.uni-saarland.de/~korbay/Courses/esslli04/Scans/danes74.pdf) · [Givón 1983](https://doi.org/10.1075/tsl.3) · Witte 1983 · [Connor & Farmer 1990](https://doi.org/10.1017/CBO9781139524551.013) · [Barzilay & Lapata 2008](https://doi.org/10.1162/coli.2008.34.1.1) |
| Signal phrases | **Transition profile** (a connective before the main verb, only after it, or none), common academic word sequences by function, and four-word runs the draft repeats. | [Biber, Conrad & Cortes 2004](https://doi.org/10.1093/applin/25.3.371) · [Simpson-Vlach & Ellis 2010](https://public.websites.umich.edu/~ncellis/NickEllis/Publications_files/AFL_paper_AppLinxPrepub.pdf) |
| Hedging | **Boosters** and **reader engagement** (reader pronouns, directives, questions, appeals to shared knowledge) counted beside hedges, and underlined in the text. | [Hyland 2005](https://doi.org/10.1177/1461445605050365) |
| Claim strength | **Promotional adjectives** in eight groups, underlined in the text. | [Millar, Batalo & Budgell 2022](https://doi.org/10.1001/jamanetworkopen.2022.28676) |
| Vague & worn words | Words on the **excess-vocabulary** list: style words that became much more common in research abstracts in 2023 and 2024. | [Kobak et al. 2025](https://doi.org/10.1126/sciadv.adt3813) |
| Mechanical checks | **GRIM**: a question on any mean that cannot come from whole-number scores for the sample size in the same sentence. | [Brown & Heathers 2017](https://doi.org/10.1177/1948550616673876) |
| Before & after | Each rewritten sentence is labelled as **wording only**, **content added**, **content removed** or both, and the revision receipt counts each kind. | Faigley & Witte 1981 |

None of these raises a note except GRIM, which asks a question. The word norms keep their authors' non-commercial licences; see [`data/README.md`](data/README.md). The Academic Formulas List was not included at 0.7.0; since 0.18.0 it comes with the page as optional data (see below). References with no link above are books, or articles whose DOI could not be confirmed; their full details are in the page's reference list.

`tests/readability/` holds five fixed passages, this page's figures for them, and two scripts (Python with textstat, R with quanteda.textstats; [Benoit et al. 2018](https://doi.org/10.21105/joss.00774)) that record what those calculators give for the same passages, because readability calculators are known to disagree.

### Added in 0.10.0 to 0.19.0: files, stages, export, pictures, wording and moves

Newest first.

- **Three well-known pictures of text** (0.27.0). *The draft as a line* (Length & rhythm): one straight run a sentence, as long as its word count, turning right at every full stop, with the starting draft drawn faintly behind; after Stefanie Posavec's sentence drawings (*Writing Without Words*). *Word tree* (Term tracker): every use of a chosen term with what follows it, or what comes before it, merged into branches where the wording is shared (Wattenberg & Viégas 2008, *IEEE TVCG* 14(6)). *Phrase net* (Dense phrases): the content words the draft joins with "of", "and" or "is", as rows and arcs (van Ham, Wattenberg & Viégas 2009, *IEEE TVCG* 15(6)). The net is laid out as rows, not by a force simulation, so the same draft always gives the same picture. Rule-based; no notes.

- **Mosaics, a term index, and more typographic mappings** (0.26.0), after [Brath & Banissi (2016)](https://doi.org/10.1016/j.sheji.2016.05.003). *What your sentences do* (Action in verbs): every main verb as a word, grouped as be and have, reporting, light verbs and other actions, heavier the more sentences it leads and italic when mostly passive. *Whose story the draft tells* (Topic position): every grammatical subject as a word, grouped as I and we, pointing words, other pronouns, actions named as things, and people and things named. *Term index, in type* (Term tracker): the repeated terms in alphabetical order, heavier for more uses, small capitals for claim words, italics for a term that stays in one paragraph. *Typographic view* (Load map) gains *the parts of each sentence* (opening italic, subject in small capitals, verb heavy), which also prints in black and white, and *load, sentence by sentence*; for the weight mappings the words can be held in place by drawing weight as stroke, so that flipping to plain text moves nothing.

- **Five pictures made of text** (0.25.0), after Brath (2020, *Visualizing with Text*) and [Brath & Banissi (2016)](https://doi.org/10.1016/j.sheji.2016.05.003). *How your sentences open* (Topic position): a stem-and-leaf plot of words, each stem a word that opens more than one sentence and each leaf the words that follow. *Repetition, drawn* (Term tracker): each paragraph as a line of words with an arc from each use of a content word to its next. *Cadence without the words* (Length & rhythm): one square a sentence, darker the longer it is, and the punctuation alone. *Outline with proportions* (Reverse outline): each paragraph's first sentence or stated point, with a quantity (share of words, open notes, wait for the verb, claim words) set into the line as a length of heavy type. All are rule-based counts and none makes a note.

- **Measures in and beside the text** (0.24.0). *Fingerprints* (Overview): six small cells beside each sentence, shaded by its rank in the draft for length, wait for the verb, density, long words, new words and nouns from verbs, after the sentence-level views of [Oelke et al. (2012)](https://doi.org/10.1109/TVCG.2011.266) and [Keim & Oelke (2007)](https://doi.org/10.1109/VAST.2007.4389004). *Profile* (a new workbench tab): one sentence against the whole draft, measure by measure, with the draft's middle marked and a ring where the sentence started. *Trunk view* (Subject → verb): subject, verb and close in full ink; openers, interruptions and comma-set asides lighter; with the meaning model on, each lighter part is graded by how much meaning the sentence loses without it. It follows the idea of [Gu et al. (2024)](https://arxiv.org/abs/2401.10873) and is not their method, which needs a large language model. *Facets by paragraph* (Load map): words, syntax, cohesion and stance as rows, paragraphs under their headings as columns ([Graesser et al. 2011](https://doi.org/10.3102/0013189X11413260)). *Scatter*: wait for the verb and part-of-speech density as upright scales, and a line from where each rewritten sentence started. *Typographic view* (Load map): the words set by a measure, one at a time: how common each is, new or repeated, syllables, part of speech, age learned, concreteness (Brath 2020, *Visualizing with Text*; [Brath & Banissi 2016](https://doi.org/10.1016/j.sheji.2016.05.003)). None of these makes a note.

- **Three more pictures from the meaning model** (0.23.0; optional, labelled AI, no notes). *Old → new*: a given-new ribbon, described in the table below. *Reverse outline*: every sentence ranked by how far it sits below its own paragraph. *Meaning views, Abstract & ending*: the sentences that set the draft going (the claim, and sentences signalling a gap or an aim) joined to the sentences of the last paragraph closest to them, with open circles for what is not returned to and what appears only at the end. Each mark has a tooltip with the sentences and the scores behind it. Tested first on small sets: the given-new measure picked the chain in five joins of six and in one of six when shuffled; a planted sentence was ranked lowest in seven paragraphs of nine; the model scores an ending that reports the opposite finding almost as close as one that answers the aim, and the page says so.

- **A part-of-speech lexicon** (0.22.0, optional data). The lexicon of the Brill tagger ([Brill 1992](https://doi.org/10.3115/974499.974526)), as packaged in [words/brill](https://github.com/words/brill) (MIT): about 54,000 words with the parts of speech each can take, 670 KB, loaded on request. *Subject → verb* lists the sentences where the lexicon and the rules disagree about the main verb: a word the rules took as the verb that has no verb reading, and a likely finite verb in a sentence where the rules found none. *Dense phrases* counts lexical density the published way, by part of speech, with the ratio of nouns to lexical verbs. The page has the lexicon and none of the tagger's contextual rules, so each word takes its most likely class. It changes no note and no mark. `tests/pos.test.js`.

- **The Academic Keyword List, and four open lists** (0.21.0). The AKL ([Paquot 2010](https://uclouvain.be/en/research-institutes/ilc/cecl/the-academic-keyword-list-akl), *Academic Vocabulary in Learner Writing*, Continuum, 56–58) is published under CC BY 4.0, so it is built into the page whole: 928 entries in five classes, multi-word entries included. *Vocabulary level* reports the share of running words that are AKL nouns, verbs, adjectives or adverbs, by class, with the words used most. Four MIT-licensed lists from [github.com/words](https://github.com/words) are also built in and only counted: a wider list of hedges (*Hedging*, showing the words this page's own rule does not mark), weasel words and buzzwords (*Vague & worn words*), and fillers (*Clutter*). None raises a note. `tests/akl.test.js`.

- **Nine questions a reviser asks** (0.20.0). Checks drawn from Pat Thomson's revision strategies (Kamler & Thomson 2014, *Helping Doctoral Students Write*; Thomson 2023, *Refining Your Academic Writing*; and her blog [patter](https://patthomson.net/category/academic-writing/)), each read from a surface cue and each asking a question. *Paragraph jobs*: a paragraph in which sentence after sentence opens with a cited author, one where the writer's own work appears only in the last sentence, and one that ends on a quotation; a panel counts sentences led by a source against sources kept in brackets (the integral and non-integral citations of Swales 1990). *Mechanical checks*: a bracket holding five or more sources. *Hedging*: a sentence that hedges its claim and limits its reach at once. *Term tracker*: an abstract term used three times or more and never explained (the "code words" of Flower & Hayes 1977, *College English* 39(4)), with counts of reporting verbs and repeated sentence openers. *Old → new*: a paragraph joined to the last only by "Furthermore" or "In addition". *Signal phrases*: the share of sentences that talk about the text itself (Hyland 2005; Haag 2021, *Revise*), counted with no note. *Voice*: a paragraph told almost wholly in passives with no agent. The thresholds are working values. `tests/patter.test.js`.

- **Open a file.** "Open a file", or drag a file onto the page: Word (.docx), Markdown, Quarto (.qmd), R Markdown, LaTeX and plain text. A .docx file is unpacked in the browser by about forty lines of code in the page, so there is no upload and no added library; headings are kept, and footnotes, comments and tracked deletions are left out.
- **Parts that are not prose are set aside.** The settings block of a Quarto file, code blocks, displayed equations, layout markup, block quotations and the reference list stay in the text, greyed and labelled, and no lens reads them. Inline code, inline maths, web addresses and LaTeX references are not counted as words. Nothing is removed, so the text you copy back out is the text you put in.
- **Reference list check** (Mechanical checks). The list under a References or Bibliography heading is compared with the author-and-year citations in the text: cited but not listed, a year that differs, and listed but never cited.
- **Move order, move position, and the moves as rows** (0.19.0). Three things taken from how [AcaWriter](https://github.com/uts-cic/acawriter) ([Knight et al. 2020](https://doi.org/10.17239/jowr-2020.12.01.06)) turns move tags into feedback, read here from cue phrases by fixed rules. *Order*: a note when a gap is signalled before the context, or, in an abstract, a method before the aim, a result before the method, or an implication before the result. *Position*: a note when a paper first signals its aim late or signals no closing move near the end, when an introduction carries on well past its aim, or when an abstract does not close on a finding. *Picture*: Signal phrases draws one row for each move and one column for each sentence, so a text in the usual order steps down from left to right; for an introduction the rows are Swales's three moves. Each note is a question and can be marked as checked.
- **The Academic Word List and the Academic Formulas List, as data** (0.18.0). Both now come with the page as optional JSON in `data/lists/`, holding word strings and numbers only: 570 headwords with their families and sublists, and 607 formulas with their list, frequencies per million and formula teaching worth. One button in Vocabulary level and one in Signal phrases loads each. The names of UEFAP's 35 rhetorical functions are in `data/taxonomy/`, with this project's tagging of the phrase bank's groups, and the Phrases tab can be filtered by function. `data/README.md` sets out where each file was read from, how the formulas were cross-checked, and the position on rights.
- **Pasting a list of your own** (0.17.0). Paste a copy into the Vocabulary level lens (word list) or the Signal phrases lens (formulas) and the page counts and marks the words and formulas of the draft that are on it: by sublist for the word list ([Coxhead 2000](https://www.wgtn.ac.nz/__data/assets/pdf_file/0020/1626131/Coxhead-2000.pdf)), and by list and formula teaching worth for the formulas ([Simpson-Vlach & Ellis 2010](https://public.websites.umich.edu/~ncellis/NickEllis/Publications_files/AFL_paper_AppLinxPrepub.pdf)). British and American spellings are matched to each other. The copy stays in the browser, raises no notes and does not change the revision receipt. `data/README.md` gives the formats.
- **Phrase bank** (0.16.0, optional data). A *Phrases* tab in the workbench holds about 590 sentence frames in 57 groups ("indicating the gap in knowledge", "admitting limitations"), each with blanks to choose and dots to fill. It opens on the frames that fit the paragraph's job or the move the sentence signals, and notes that link to the Phrasebank open it too. The frames are from [Wallwork 2016](https://doi.org/10.1007/978-3-319-26094-5), as prepared in the open-source package [academic-phrases](https://github.com/nashamri/academic-phrases) with the permission of Springer Nature and the author. They are licensed GPL-3.0, kept in `data/phrases/` apart from the MIT-licensed page, fetched only on request, and can be deleted. This is the page's answer to the "see examples" step of the Research Writing Tutor ([Cotos, Huffman & Link 2020](https://doi.org/10.17239/jowr-2020.12.01.07)): a move leads to frames for that move. The page has no annotated corpus and cannot compare a draft with a discipline.
- **Where to find wording** (0.15.0). The page asks questions and leaves the words to the writer, so it now points to places where wording can be found, with a citation for each. *Phrases by purpose*: notes link to the matching page of the [Academic Phrasebank](https://www.phrasebank.manchester.ac.uk/) and of [UEFAP's rhetorical functions](https://www.uefap.org/writing-functions-introduction/). *A phrase in real use*: a line under the rewrite box sends the words you select (eight at most, and nothing else) to [SkELL](https://skell.sketchengine.eu/) ([Baisa & Suchomel 2014](https://nlp.fi.muni.cz/raslan/2014/12.pdf)) or [Linggle](https://linggle.com/) ([Boisson et al. 2013](https://aclanthology.org/P13-4024/)), or copies them for [Ludwig](https://ludwig.guru/). The Guide adds the student corpora MICUSP (University of Michigan 2009; described by Römer & O'Donnell 2011, *Corpora* 6(2)) and BAWE ([Alsop & Nesi 2009](https://doi.org/10.3366/E1749503209000227)); the books of [Swales & Feak 2012](https://doi.org/10.3998/mpub.2173936), [Glasman-Deal 2020](https://doi.org/10.1142/q0232) and Graff & Birkenstein 2024; what academics accept as reuse of a stock phrase (Davis & Morley 2015, *Journal of Second Language Writing* 28); and the move-reading tools of [Cotos, Huffman & Link 2015](https://doi.org/10.1016/j.jeap.2015.05.004) and [Knight et al. 2020](https://doi.org/10.17239/jowr-2020.12.01.06). No phrase list from any of these is copied into the page.
- **Pictures of the draft** (0.14.0). Each is drawn from the draft's own counts, on one scale, in inline SVG or plain HTML, with no library and no decoration (after Tufte 1983, 2006). *The draft at a glance* (Overview): one column a sentence, its length above the line and its open notes below; tap a column to open the sentence. *Load map*: five new rows for where the open notes, claim words, named evidence, strong wording and hedges sit. *Link ladder* (Old → new): a small picture for each paragraph, every sentence drawn to length with its opening and close marked and a line from each repeated word back to where it stood in the sentence before; links that land in the opening are blue. *Openings and closes, side by side* (Skeleton read): a two-column ledger with a rule as long as the words left out. *Paragraph map* (Paragraph jobs): job, length, a square for each word of the claim, and the point. *Wording against evidence* (Claim strength, Hedging): a table of sentences by strong or hedged wording and by whether a citation or figure is in the sentence. *Open notes by stage* (Before & after): a slopegraph from the start to now. In the workbench, an arc joins the subject to its verb, taller the further apart they are. Movement (0.14.1): each picture draws itself in once when you arrive at a lens or open a text, and holds still while you type; the arc moves to its new shape as you edit, glows amber from eight words apart, pulses slowly from twelve, and the subject and verb flash once when they meet. "Still pictures" under Reading comfort, or the device's reduce-motion setting, switches all of it off.
- **Export** (0.13.0). *Take the draft with you* saves the current text as a Word file in which every open note is a comment in the margin, attached to the words it points at, with its question first; as a Word file with no comments; or as a plain file in the format you opened. The .docx is written in the browser by about forty lines of code in the page (a ZIP of five small XML parts, stored uncompressed), so there is no upload and no added library. It is a plain file: headings, paragraphs, quotations and the reference list, without the fonts, footnotes, figures or tables of the original. The *revision portfolio* now also holds the reverse outline (main claim, each paragraph's job, your stated point and its opening words) and the notes still open, and it saves as a web page or Markdown, or prints, so it can go to a supervisor or a writing centre with the draft. Inside the Claude viewer, where ordinary downloads are blocked, the page asks the viewer to save the file; where nothing can be saved, copying still works.
- **Sentence tools in the workbench** (0.12.0). *Rearrange* cuts the sentence into labelled pieces (opening, subject, interruption, verb, middle, close), marks the pieces that bring in a word the draft has not used before, and after each move sets the sentence before against the sentence now: how it opens, how far the subject sits from its verb, and what it closes on. Notes about a subject far from its verb, a weak close, or new before old open it with one button. *Unpack the noun* appears in the "action is in a noun" note: three blanks (who or what, did what, to what), with the verb and its object filled from the writer's own words and the actor left empty unless the sentence names one after "by" or as a possessive. A preview shows which notes the new wording would clear. Neither tool writes a sentence for the student: both assemble the student's own words, and the result is a rough draft to read over.
- **Four stages of revising** (0.11.0). Buttons above the lens list narrow the page to Argument, Flow, Polish or Calibration, hiding the other lenses and their notes. Each button shows its open notes. Pressing "I have reviewed this stage" ticks it, outlines the next one and records the order in the portfolio. Nothing is locked: one line appears if you start polishing while the argument stage is unreviewed and still has open notes, and you can carry on.
- **Revision portfolio** (Before & after). The receipt, the research profile at the start and now, every rewritten sentence with its kind of change, the notes weighed and kept with the reasons given, and a written reflection, copied as Markdown or JSON.
- **Stress position.** A short bracketed aside at the end of a sentence is now set aside like a citation, and a few more weak endings are recognised ("in part", "to some degree", "on the whole").
- 0.9.2 and 0.9.3: better main-verb and passive rules with a probe test, and "this + noun" counted as pointing back.

### Added in 0.9.0: the Load map, lexical density, and sparklines

- **Load map** (a new lens beside the Overview). Three pictures of the whole draft, built on Tufte's small multiples, sparklines and range-frame (Tufte 1983, 2006):
  - *Where the load falls*: one column per sentence and one strip per measure (length, wait for the verb, lexical density, long words, new words, nouns made from verbs), on a shared axis. The tallest fifth of each strip is coloured, and a last strip counts how many loads each sentence carries at once.
  - *Structure and vocabulary*: every sentence as a dot, by its length and its density, with the middle of each scale marked, so the draft's long-but-plain sentences separate from its short-but-dense ones. The two-way view follows [Jenset (2026)](https://communities.springernature.com/posts/the-myth-of-the-unreadable-humanities-and-social-sciences).
  - *Paragraph by paragraph*: one table row per paragraph, with a sparkline of its sentence lengths and of its waits for the verb.
- **Lexical density** (Dense phrases, Research profile, MCP): the share of words that carry content, for the draft, each paragraph and each sentence ([Johansson 2008](https://journals.lub.lu.se/LWPL/article/view/2273), after Ure 1971 and Halliday 1985). It is counted without a part-of-speech tagger, and on the CLEAR passages it had no relation to judged ease (−0.02), so the page presents it as packing and not as difficulty.
- **Citation keys** (0.8.1): `@Marwick2026`, `[@a; @b, p. 4]` and LaTeX `\cite` commands are read as citations.

### Added in 0.8.0: cleaner readability figures, science jargon, and a check on the counts

- **Readability on cleaned text.** Before the formulas run, bracketed citations, numbers, abbreviations and stray single letters are dropped and hyphenated words are split, as [Plavén-Sigray et al. (2017)](https://doi.org/10.7554/eLife.27725) did for 709,577 abstracts. The box also gives the figures for the text as typed.
- **Syllables.** A better spelling rule, backed by counts from the [CMU Pronouncing Dictionary](https://github.com/cmusphinx/cmudict) for 1,961 common words the rule gets wrong. On the test passages the figures now sit within about half a grade of quanteda.textstats.
- **General science jargon** (Vocabulary level): the share of words on the 2,138-word list of [Plavén-Sigray et al. (2017)](https://doi.org/10.7554/eLife.27725), with the words used most.
- **Sentences with the hardest vocabulary** (word norms): the three sentences whose content words are learned latest, following the per-sentence averages of [Lee & Lee (2023)](https://aclanthology.org/2023.bea-1.1).
- **What the counts track** (Guide, and [`tests/validation/RESULTS.md`](tests/validation/RESULTS.md)): the correlation of each count with teachers' judgements of reading ease on 4,721 passages of the CLEAR corpus ([Crossley et al. 2023](https://doi.org/10.3758/s13428-022-01802-x)). The best single count reaches about 0.6, word variety and sentence overlap are near zero, and all counts together reach 0.73. The corpus is not in the repository; `tests/validation/clear.js` reproduces the table from its CSV file.
- **Weasel words** (0.7.1): notes on views attributed to nobody, vague degree words and comment words; the lens search and the Guide find all five lenses that cover them.

### Meaning model (optional)

Switched off unless the student turns it on. It loads a small sentence-embedding model, all-MiniLM-L6-v2 ([Reimers & Gurevych 2019](https://doi.org/10.18653/v1/D19-1410); [Wang et al. 2020](https://papers.nips.cc/paper/2020/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html)), from the `model/` folder and compares sentences by meaning, following the methods set out by [Kjell, Giorgi & Schwartz (2023)](https://doi.org/10.1037/met0000542). It is a trained language model and therefore a form of AI. It runs in the browser, generates no text, and gives the same result for the same text. The first use downloads about 45 MB.

| Lens | What the model adds |
|---|---|
| Subject → verb | In the trunk view, each opener, interruption and aside is graded by how close the sentence stays to the whole without it, and sentences whose trunk alone says least of the whole are listed |
| Topic grid | Sentences that are close in meaning to the one before but repeat none of its words; how close each paragraph is to the one before, and the weakest join in the draft |
| Old → new | A ribbon picture of each paragraph. Each sentence is divided at its main verb into an opening and a close, and the opening is compared with the close and the opening of the sentence before: a ribbon where it picks up the last close, a dashed line where it keeps the last opening, an amber line where it reaches further back, an open circle for a fresh start |
| Reverse outline | The sentence closest in meaning to the rest of its paragraph, and whether it sits at an edge; the sentence that best carries the point you stated; a strip of dots and a table ranking every sentence of the draft by how far it sits below its own paragraph |
| Claim tracer | The sentence that states your claim most directly, in your words or others; how close each paragraph is to the claim |
| Source overlap | Your sentences closest in meaning to a source sentence, including restatements that share no run of words; the parts of the source the draft says least about |
| Term tracker | The closest pairs in meaning among your terms, as candidates for two names for one thing |
| Before & after | How far each rewritten sentence has moved in meaning from the one it replaced |
| Rewrite box | Two live gauges: how close the sentence you are rewriting is to the one before it, and to your claim |

With the model on, the **Meaning views** lens draws the whole draft in eight ways:

| View | What it shows |
|---|---|
| Thread | Each sentence's closeness to the one before, across the draft, with a second line for closeness to the claim; jumps inside paragraphs, paragraph breaks with no jump, and distant sentences that say nearly the same thing |
| Quilt | Every sentence against every other, shaded by closeness; tap a square to read the two sentences |
| Topics | The model's grouping of sentences into topics, as a band of colour, with how often the topic changes |
| Map | Sentences as dots on a flat map joined in reading order, with the claim and the earlier positions of rewritten sentences. A two-dimensional map distorts, and the view says how much |
| Reorder | Move paragraphs and watch the joins between them; compare with the model's smoothest order; apply an order to the draft |
| Ask | Type a question or a reader's comment and jump to the sentences closest to it. Nothing is generated |
| Abstract & ending | Whether the last paragraph returns to the first, and which paragraphs a pasted abstract says least about |
| Drills | "Which sentence belongs least?" and "Put the paragraph back in order", built from the draft |

The model does not see negation or logic, and its scores only rank things within one draft, so nothing it reports is a pass or a fail. Its results appear as labelled lines, lists and tables. They never become notes, and they do not change the counts of open notes or the revision receipt, which stay rule-based.

### Working on a draft

| Feature | What it does |
|---|---|
| Workbench | Rewrite a sentence in place; marks from every open note show inside the box |
| Previews | See which notes a suggested change would clear, and any it would bring in, before accepting it |
| Rearrange | Drag the labelled parts of a sentence into a new order; a table shows what the move did to the opening, the subject-to-verb distance and the close |
| Profile | Why this sentence is heavy: each measure for the sentence on the draft's own range, with the draft's middle and the lens to open |
| Unpack the noun | A fill-in template that turns a noun such as "implementation" back into a verb and leaves the actor for the writer to supply |
| Phrases | About 590 sentence frames in 57 groups, opening on the group that fits the paragraph's job or the sentence's move (optional data) |
| Phrase look-up | Sends the words you select, eight at most, to SkELL or Linggle to see them in real use, or copies them for Ludwig |
| Four stages | Narrow the page to argument, flow, polish or calibration, and record each stage as reviewed |
| Guided and timed passes | Walk through the notes one at a time, or work for 5, 10 or 20 minutes |
| Before & after | A revision receipt, counts by lens, and the starting text against the current one |
| Export | The text as a Word file with each open note as a margin comment, as a Word file with no comments, or as a plain file; the revision portfolio as a web page, Markdown, JSON or print |
| Practice | Short drills on the principles, some built from your own draft |
| Reading comfort | Text size, spacing and colour settings |

Each citation above links to its DOI or to the full text where one could be confirmed. Books, and articles whose DOI could not be confirmed, are named without a link. All 143 sources are listed at the foot of the application, 69 of them with a DOI and 43 more with a link to the full text or the publisher's page.

---

## 🔌 MCP Server

The repository includes a small [Model Context Protocol](https://modelcontextprotocol.io/) server, so that an AI agent can use the same fixed rules as the page. It is meant for three jobs: a **tutor** that asks a writer each note's question and lets them revise, a **grader's aid**, and **batch analysis** of a set of drafts for research. It runs on your own machine over stdio, needs only Node.js 18 or later, has no dependencies, opens no network connection and writes nothing to disk. It uses the word norms when the four files are in `data/norms/`. The meaning model, the Academic Word List, the Academic Formulas List and the phrase bank are not part of it.

Add it to an MCP client with a configuration like this, using the full path to your copy:

```json
{
  "mcpServers": {
    "topic-and-emphasis": {
      "command": "node",
      "args": ["/full/path/to/topic-and-emphasis/mcp/server.js"]
    }
  }
}
```

| Tool | What it does |
|---|---|
| `list_lenses` | Lists the lenses with a line on what each reads |
| `describe_lens` | Explains one lens in full: what it reads, its marks, the research, its limits, and its sources with DOIs |
| `analyse_draft` | Returns the notes on a draft. By default it returns only each note's **question**, for a tutor to ask. With `reveal: "full"` it adds the finding, explanation, advice and any suggested change, and for a noun that hides an action the parts of the unpacking template (`unpack_the_noun`). Can be limited to chosen lenses or one sentence |
| `research_profile` | Returns the descriptive counts for a draft |
| `compare_drafts` | Compares two versions: notes in each lens before and after, and both profiles |
| `analyse_batch` | One row per draft for up to 200 drafts, with a CSV copy. No draft text is returned |

The server tells the agent how it is meant to be used: ask the question, do not rewrite for the writer, check notes against the text, and treat no count as a score. Those are instructions to the agent and not a guarantee of how it will behave.

The lens descriptions the server gives come from `mcp/guide.json`, which is exported from the page. After changing the lenses, regenerate it with `python3 build.py && python3 mcp/export_guide.py` (this step needs the Python package `playwright` and Chrome). Test the server with `node tests/mcp.test.js`.

---

## ⚠️ Limits

The rules read structure and have no idea what your sentences mean. There is no parser, no part-of-speech tagger (the optional lexicon lists what a word can be, and does not read it in context) and no spelling dictionary, so some sentences will be misjudged, synonyms are not recognised (unless the meaning model is on), and misspellings are not found. The word lists say how common a word is and nothing about what it means. Moves are read from cue phrases, so a move made without one is not seen. The working thresholds (for example, twelve words before the main verb, or five matching words in a row) are this tool's own values and are labelled as such in the application. They are not published norms.

---

## 💬 Getting Help and Contributing

- Report a problem or suggest a rule in the [issue tracker](https://github.com/benmarwick/topic-and-emphasis/issues). A sentence the rules misread is especially useful: paste the sentence and say which lens marked it.
- Changes are recorded in the [changelog](CHANGELOG.md).
- The source is four files in `src/`: `head.html` (styles), `body.html` (page structure), `engine.js` (the rules) and `ui.js` (the interface), with eight word-list files beside them as `.txt` files. Optional data is in `data/` and is rebuilt by the scripts in `tools/`. Run `python3 build.py` and every file in `tests/` before opening a pull request.

---

## 🤖 Generative AI Disclosure

The code of this application was written with the assistance of an AI coding tool (Claude, by Anthropic), under the direction of the developer, who chose the sources, set the design and the constraints, and is responsible for the result. Every mark and note the application makes comes from a fixed rule in `src/engine.js`. The one exception is the optional meaning model described above, which is off by default and labelled as AI wherever its results appear.

---

## ⚖️ License

[MIT](LICENSE) © 2026 Ben Marwick.

The application includes the **New General Service List** and the **New Academic Word List** (version 1.2 of each) by Charles Browne, Brent Culligan and Joseph Phillips, under a [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence. The typefaces (IBM Plex and Newsreader, SIL Open Font License) are loaded from Google Fonts when the page opens and are not included in this repository.

The `data/` folder holds third-party word lists and word norms under their own licences, set out in [`data/README.md`](data/README.md). The **Academic Keyword List** (Paquot 2010) is included under **CC BY 4.0**. The Dale-Chall list, the excess-vocabulary list, the science-jargon list and the four lists from github.com/words (hedges, weasels, fillers, buzzwords) are MIT-licensed, and the syllable counts come from the CMU Pronouncing Dictionary (BSD 2-clause). The phrase bank in `data/phrases/` is under the **GNU GPL 3 or later**; it is kept apart from the application and loaded only on request. `data/lists/awl.json` and `data/lists/afl.json` hold the words and figures of the Academic Word List (Coxhead 2000) and the Academic Formulas List (Simpson-Vlach & Ellis 2010) and nothing else from those publications; no permission was sought for either, and `data/README.md` sets out the position taken and how to remove them. The four word-norm files in `data/norms/` are for **non-commercial use only** (CC BY-NC-ND 3.0 and CC BY-NC-SA 4.0) and are loaded only on request; delete that folder if you need a copy for commercial use.

The `model/` folder holds third-party files used only by the optional meaning model: the **all-MiniLM-L6-v2** sentence-embedding model in its ONNX conversion (Apache-2.0), the **Transformers.js** library (Apache-2.0), and the **ONNX Runtime Web** engine it includes (MIT).
