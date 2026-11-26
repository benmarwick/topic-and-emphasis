# Topic & Emphasis

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Browsers](https://img.shields.io/badge/browsers-Chrome%20%7C%20Edge%20%7C%20Safari%20%7C%20Firefox-brightgreen)
![Rule-based](https://img.shields.io/badge/feedback-rule--based-informational)

**Topic & Emphasis** is a browser workbench for revising **research writing**. Paste a draft and it marks where the structure of each sentence and paragraph meets, or misses, what readers expect, following Gopen and Swan's ["The Science of Scientific Writing"](https://www.americanscientist.org/node/924) (1990). You then rewrite each sentence in place and watch the notes clear. It is written for **students working on their own**, in the social sciences in particular.

Every mark and note comes from a **fixed rule**. The same text always gets the same marks, and **nothing you paste leaves your browser**. The application is a **single HTML file** that works offline once it has loaded. An **optional meaning model**, off by default, adds comparisons of sentences by meaning; it is a small language model that also runs entirely in the browser (see below).

**Use it online:** <https://benmarwick.github.io/topic-and-emphasis/>

![The Stress position lens open on the built-in sample text](docs/screenshot.png)

---

## 📝 Citation

If you use Topic & Emphasis in teaching or research, please cite it:

> Marwick, B. (2026). *Topic & Emphasis: A revision workbench for research writing* (Version 0.14.0) [Computer software]. https://github.com/benmarwick/topic-and-emphasis

In text: (Marwick 2026).

```bibtex
@software{marwick_topic_emphasis_2026,
  author  = {Marwick, Ben},
  title   = {Topic \& Emphasis: A revision workbench for research writing},
  year    = {2026},
  version = {0.14.0},
  url     = {https://github.com/benmarwick/topic-and-emphasis}
}
```

Please also cite the article the workbench is built on:

> Gopen, G. D., & Swan, J. A. (1990). The science of scientific writing. *American Scientist*, 78(6), 550–558. [Full text](https://www.americanscientist.org/node/924)

---

## 📦 Installation

**Option A: use it online.** Open <https://benmarwick.github.io/topic-and-emphasis/>. Nothing to install.

**Option B: download one file.** Save [`index.html`](index.html) from this repository and open it in a browser. It runs from your own disk. It loads its typefaces from Google Fonts when a connection is available and falls back to system fonts when not. The optional meaning model is not available in a copy saved this way, because it needs the files in `model/`.

**Option C: build from source.** The page is assembled from the pieces in `src/` by a short Python script with no dependencies.

```sh
git clone https://github.com/benmarwick/topic-and-emphasis.git
cd topic-and-emphasis
python3 build.py        # writes index.html
node tests/smoke.js     # optional: checks the rule engine
node tests/mcp.test.js  # optional: checks the MCP server
```

Requires Python 3. The test needs Node.js 18 or later.

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
| Vocabulary level | Content words against two open word lists, and word variety | [Browne, Culligan & Phillips (2013)](https://www.newgeneralservicelist.com/); [McCarthy & Jarvis (2010)](https://doi.org/10.3758/BRM.42.2.381) |
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

The Overview carries a **Research profile**: 23 counts, grouped under Structure, Vocabulary and density, Cohesion, and Stance and care. Beside eight of them is a sparkline, a line the size of a word that draws the measure for every sentence, so a figure also shows where it peaks. The profile holds that writing researchers use to describe a text, each recomputed here by a fixed rule and each shown with the publication it comes from and a line on how to read it. They describe a draft. None is a score and none has a target. The same counts appear in a "Research measure" box inside the lens they belong to, with what the research found and how the rule-based count differs from the published one.

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

None of these raises a note except GRIM, which asks a question. The word norms keep their authors' non-commercial licences; see [`data/README.md`](data/README.md). The Academic Formulas List is not included, because it carries no open licence. References with no link above are books, or articles whose DOI could not be confirmed; their full details are in the page's reference list.

`tests/readability/` holds five fixed passages, this page's figures for them, and two scripts (Python with textstat, R with quanteda.textstats; [Benoit et al. 2018](https://doi.org/10.21105/joss.00774)) that record what those calculators give for the same passages, because readability calculators are known to disagree.

### Added in 0.10.0: files, document structure, stages and a portfolio

- **Open a file.** "Open a file", or drag a file onto the page: Word (.docx), Markdown, Quarto (.qmd), R Markdown, LaTeX and plain text. A .docx file is unpacked in the browser by about forty lines of code in the page, so there is no upload and no added library; headings are kept, and footnotes, comments and tracked deletions are left out.
- **Parts that are not prose are set aside.** The settings block of a Quarto file, code blocks, displayed equations, layout markup, block quotations and the reference list stay in the text, greyed and labelled, and no lens reads them. Inline code, inline maths, web addresses and LaTeX references are not counted as words. Nothing is removed, so the text you copy back out is the text you put in.
- **Reference list check** (Mechanical checks). The list under a References or Bibliography heading is compared with the author-and-year citations in the text: cited but not listed, a year that differs, and listed but never cited.
- **Pictures of the draft** (0.14.0). Each is drawn from the draft's own counts, on one scale, in inline SVG or plain HTML, with no library and no decoration (after Tufte 1983, 2006). *The draft at a glance* (Overview): one column a sentence, its length above the line and its open notes below; tap a column to open the sentence. *Load map*: five new rows for where the open notes, claim words, named evidence, strong wording and hedges sit. *Link ladder* (Old → new): a small picture for each paragraph, every sentence drawn to length with its opening and close marked and a line from each repeated word back to where it stood in the sentence before; links that land in the opening are blue. *Openings and closes, side by side* (Skeleton read): a two-column ledger with a rule as long as the words left out. *Paragraph map* (Paragraph jobs): job, length, a square for each word of the claim, and the point. *Wording against evidence* (Claim strength, Hedging): a table of sentences by strong or hedged wording and by whether a citation or figure is in the sentence. *Open notes by stage* (Before & after): a slopegraph from the start to now. In the workbench, an arc joins the subject to its verb, taller the further apart they are.
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
- **Lexical density** (Phrase load, Research profile, MCP): the share of words that carry content, for the draft, each paragraph and each sentence ([Johansson 2008](https://journals.lub.lu.se/LWPL/article/view/2273), after Ure 1971 and Halliday 1985). It is counted without a part-of-speech tagger, and on the CLEAR passages it had no relation to judged ease (−0.02), so the page presents it as packing and not as difficulty.
- **Citation keys** (0.8.1): `@Marwick2026`, `[@a; @b, p. 4]` and LaTeX `\cite` commands are read as citations.

### Added in 0.8.0: cleaner readability figures, science jargon, and a check on the counts

- **Readability on cleaned text.** Before the formulas run, bracketed citations, numbers, abbreviations and stray single letters are dropped and hyphenated words are split, as [Plavén-Sigray et al. (2017)](https://doi.org/10.7554/eLife.27725) did for 709,577 abstracts. The box also gives the figures for the text as typed.
- **Syllables.** A better spelling rule, backed by counts from the [CMU Pronouncing Dictionary](https://github.com/cmusphinx/cmudict) for 1,961 common words the rule gets wrong. On the test passages the figures now sit within about half a grade of quanteda.textstats.
- **General science jargon** (Vocabulary level): the share of words on the 2,138-word list of [Plavén-Sigray et al. (2017)](https://doi.org/10.7554/eLife.27725), with the words used most.
- **Sentences with the hardest vocabulary** (word norms): the three sentences whose content words are learned latest, following the per-sentence averages of [Lee & Lee (2023)](https://aclanthology.org/2023.bea-1.1).
- **What the counts track** (Guide, and [`tests/validation/RESULTS.md`](tests/validation/RESULTS.md)): the correlation of each count with teachers' judgements of reading ease on the 4,724 passages of the CLEAR corpus ([Crossley et al. 2023](https://doi.org/10.3758/s13428-022-01802-x)). The best single count reaches about 0.6, word variety and sentence overlap are near zero, and all counts together reach 0.73. The corpus is not in the repository; `tests/validation/clear.js` reproduces the table from its CSV file.
- **Weasel words** (0.7.1): notes on views attributed to nobody, vague degree words and comment words; the lens search and the Guide find all five lenses that cover them.

### Meaning model (optional)

Switched off unless the student turns it on. It loads a small sentence-embedding model, all-MiniLM-L6-v2 ([Reimers & Gurevych 2019](https://doi.org/10.18653/v1/D19-1410); [Wang et al. 2020](https://papers.nips.cc/paper/2020/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html)), from the `model/` folder and compares sentences by meaning, following the methods set out by [Kjell, Giorgi & Schwartz (2023)](https://doi.org/10.1037/met0000542). It is a trained language model and therefore a form of AI. It runs in the browser, generates no text, and gives the same result for the same text. The first use downloads about 45 MB.

| Lens | What the model adds |
|---|---|
| Topic grid | Sentences that are close in meaning to the one before but repeat none of its words; how close each paragraph is to the one before, and the weakest join in the draft |
| Reverse outline | The sentence closest in meaning to the rest of its paragraph, and whether it sits at an edge; the sentence that best carries the point you stated |
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
| Unpack the noun | A fill-in template that turns a noun such as "implementation" back into a verb and leaves the actor for the writer to supply |
| Guided and timed passes | Walk through the notes one at a time, or work for 5, 10 or 20 minutes |
| Before & after | A revision receipt, counts by lens, and the starting text against the current one |
| Export | The text as a Word file with each open note as a margin comment, as a Word file with no comments, or as a plain file; the revision portfolio as a web page, Markdown, JSON or print |
| Practice | Short drills on the principles, some built from your own draft |
| Reading comfort | Text size, spacing and colour settings |

Each citation above links to its DOI or to the full text. Four have neither: three are books, which link to a library catalogue record, and the 2016 conference paper by Crossley, Kyle, Davenport and McNamara links to its publication record. All 67 sources are listed at the foot of the application.

---

## 🔌 MCP Server

The repository includes a small [Model Context Protocol](https://modelcontextprotocol.io/) server, so that an AI agent can use the same fixed rules as the page. It is meant for three jobs: a **tutor** that asks a writer each note's question and lets them revise, a **grader's aid**, and **batch analysis** of a set of drafts for research. It runs on your own machine over stdio, needs only Node.js 18 or later, has no dependencies, opens no network connection and writes nothing to disk. The optional meaning model is not part of it.

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
| `analyse_draft` | Returns the notes on a draft. By default it returns only each note's **question**, for a tutor to ask. With `reveal: "full"` it adds the finding, explanation, advice and any suggested change. Can be limited to chosen lenses or one sentence |
| `research_profile` | Returns the descriptive counts for a draft |
| `compare_drafts` | Compares two versions: notes in each lens before and after, and both profiles |
| `analyse_batch` | One row per draft for up to 200 drafts, with a CSV copy. No draft text is returned |

The server tells the agent how it is meant to be used: ask the question, do not rewrite for the writer, check notes against the text, and treat no count as a score. Those are instructions to the agent and not a guarantee of how it will behave.

The lens descriptions the server gives come from `mcp/guide.json`, which is exported from the page. After changing the lenses, regenerate it with `python3 build.py && python3 mcp/export_guide.py` (this step needs the Python package `playwright` and Chrome). Test the server with `node tests/mcp.test.js`.

---

## ⚠️ Limits

The rules read structure and have no idea what your sentences mean. There is no parser, no part-of-speech tagger and no dictionary, so some sentences will be misjudged, synonyms are not recognised (unless the meaning model is on), and misspellings are not found. The working thresholds (for example, twelve words before the main verb, or five matching words in a row) are this tool's own values and are labelled as such in the application. They are not published norms.

---

## 💬 Getting Help and Contributing

- Report a problem or suggest a rule in the [issue tracker](https://github.com/benmarwick/topic-and-emphasis/issues). A sentence the rules misread is especially useful: paste the sentence and say which lens marked it.
- Changes are recorded in the [changelog](CHANGELOG.md).
- The source is four files in `src/`: `head.html` (styles), `body.html` (page structure), `engine.js` (the rules) and `ui.js` (the interface). Run `python3 build.py` and `node tests/smoke.js` before opening a pull request.

---

## 🤖 Generative AI Disclosure

The code of this application was written with the assistance of an AI coding tool (Claude, by Anthropic), under the direction of the developer, who chose the sources, set the design and the constraints, and is responsible for the result. Every mark and note the application makes comes from a fixed rule in `src/engine.js`. The one exception is the optional meaning model described above, which is off by default and labelled as AI wherever its results appear.

---

## ⚖️ License

[MIT](LICENSE) © 2026 Ben Marwick.

The application includes the **New General Service List** and the **New Academic Word List** (version 1.2 of each) by Charles Browne, Brent Culligan and Joseph Phillips, under a [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence. The typefaces (IBM Plex and Newsreader, SIL Open Font License) are loaded from Google Fonts when the page opens and are not included in this repository.

The `data/` folder holds third-party word lists and word norms under their own licences, set out in [`data/README.md`](data/README.md). The Dale-Chall list and the excess-vocabulary list are MIT-licensed. The four word-norm files in `data/norms/` are for **non-commercial use only** (CC BY-NC-ND 3.0 and CC BY-NC-SA 4.0) and are loaded only on request; delete that folder if you need a copy for commercial use.

The `model/` folder holds third-party files used only by the optional meaning model: the **all-MiniLM-L6-v2** sentence-embedding model in its ONNX conversion (Apache-2.0), the **Transformers.js** library (Apache-2.0), and the **ONNX Runtime Web** engine it includes (MIT).
