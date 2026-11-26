# Topic & Emphasis

[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
![Browsers](https://img.shields.io/badge/browsers-Chrome%20%7C%20Edge%20%7C%20Safari%20%7C%20Firefox-brightgreen)
![No AI](https://img.shields.io/badge/feedback-rule--based%2C%20no%20AI-informational)

**Topic & Emphasis** is a browser workbench for revising **research writing**. Paste a draft and it marks where the structure of each sentence and paragraph meets, or misses, what readers expect, following Gopen and Swan's ["The Science of Scientific Writing"](https://www.americanscientist.org/node/924) (1990). You then rewrite each sentence in place and watch the notes clear. It is written for **students working on their own**, in the social sciences in particular.

Every mark comes from a **fixed rule**. The same text always gets the same marks, **no AI model is involved**, and **nothing you paste leaves your browser**. The whole application is a **single HTML file** that works offline once it has loaded.

**Use it online:** <https://benmarwick.github.io/topic-and-emphasis/>

![The Stress position lens open on the built-in sample text](docs/screenshot.png)

---

## 📝 Citation

If you use Topic & Emphasis in teaching or research, please cite it:

> Marwick, B. (2026). *Topic & Emphasis: A revision workbench for research writing* (Version 0.1.0) [Computer software]. https://github.com/benmarwick/topic-and-emphasis

In text: (Marwick 2026).

```bibtex
@software{marwick_topic_emphasis_2026,
  author  = {Marwick, Ben},
  title   = {Topic \& Emphasis: A revision workbench for research writing},
  year    = {2026},
  version = {0.1.0},
  url     = {https://github.com/benmarwick/topic-and-emphasis}
}
```

Please also cite the article the workbench is built on:

> Gopen, G. D., & Swan, J. A. (1990). The science of scientific writing. *American Scientist*, 78(6), 550–558.

---

## 📦 Installation

**Option A: use it online.** Open <https://benmarwick.github.io/topic-and-emphasis/>. Nothing to install.

**Option B: download one file.** Save [`index.html`](index.html) from this repository and open it in a browser. It runs from your own disk. It loads its typefaces from Google Fonts when a connection is available and falls back to system fonts when not.

**Option C: build from source.** The page is assembled from the pieces in `src/` by a short Python script with no dependencies.

```sh
git clone https://github.com/benmarwick/topic-and-emphasis.git
cd topic-and-emphasis
python3 build.py        # writes index.html
node tests/smoke.js     # optional: checks the rule engine
```

Requires Python 3. The test needs Node.js 18 or later.

---

## 🚀 Quick Start

1. **Paste your text**, or choose **Try the example** for six sentences with four quick things to fix.
2. **Pick a lens** from the list. Each lens reads the draft for one thing and marks it in the text. The Overview shows every open note at once and suggests where to start.
3. **Tap a sentence** to open the workbench under its paragraph. Read the note, rewrite the sentence in the box, and the marks update as you type. Where a note offers a change, preview it before you accept it.
4. **Check your progress** in Before & after, which shows what your revising has changed, and copy the revised text when you are done.

You do not need to clear every note. A note is a question about the sentence, and "I checked this" is a valid answer.

---

## 🔧 Feature Reference

### Gopen & Swan's principles

| Lens | What it reads | Drawn from |
|---|---|---|
| Subject → verb | Words that stand between a subject and its verb | Gopen & Swan, principle 1; Gibson (1998) |
| Topic position | What opens each sentence, and whether it names the topic | Gopen & Swan, principles 3, 4; Williams (1990) |
| Stress position | What closes each sentence, where readers place the emphasis | Gopen & Swan, principles 2, 7 |
| Old → new | Whether each sentence starts from what the reader already holds | Gopen & Swan, principles 4, 6; Haviland & Clark (1974) |
| Action in verbs | Actions hidden in nouns while the verb says little | Gopen & Swan, principle 5; Biber & Gray (2010) |

### Is the argument clear?

| Lens | What it reads | Drawn from |
|---|---|---|
| Reverse outline | The first and last sentence of each paragraph, and the point you say it makes | Mensh & Kording (2017); Morris et al. (2025) |
| Paragraph jobs | The job you give each paragraph, and the moves that job usually needs | Swales (1990); Academic Phrasebank |
| Claim tracer | Where the words of your central claim and your title appear | Toulmin (2003); Mihalcea & Tarau (2004) |
| Claim strength | Causal, certain and absolute wording, against the evidence you name | Toulmin (2003); Haber et al. (2018) |
| Hedging | Hedges, and several in a row | Hyland (1996) |

### Does it flow?

| Lens | What it reads | Drawn from |
|---|---|---|
| Topic grid | Recurring terms across sentences, and how each sentence links back | Kinnunen et al. (2012); Crossley, Kyle & McNamara (2016) |
| Signal phrases | Phrases that announce a move, and connectives by type | Swales (1990); Knight et al. (2020); McNamara et al. (2014) |
| Skeleton read | Only the opening and close of each sentence | Gopen & Swan, principles 2, 3 |

### Is each sentence easy to read?

| Lens | What it reads | Drawn from |
|---|---|---|
| Length & rhythm | Sentence length on a fixed scale, runs of equal length, readability formulas | Flesch (1948); Choi & Crossley (2021) |
| Dense phrases | Noun stacks and chains of prepositions | Williams (1990); Kyle & Crossley (2018) |
| Voice | Passives, and whether each names who acted | Gopen & Swan; McNamara et al. (2014) |
| Clutter | Stock phrases, empty openers and stacked negatives | Zinsser (2006); Williams (1990) |

### Are the words well chosen?

| Lens | What it reads | Drawn from |
|---|---|---|
| Vague & worn words | Intensifiers, vague quantities and worn phrases | Zinsser (2006) |
| Vocabulary level | Content words against two open word lists, and word variety | Browne, Culligan & Phillips (2013); McCarthy & Jarvis (2010) |
| Term tracker | Recurring terms, second names for one thing, and your own word list | Williams (1990); Kyle, Crossley & Kim (2015) |
| Acronyms | Abbreviations that are never defined, or used only once or twice | Barnett & Doubleday (2020) |
| Describing people | Labels for people that carry a judgment | APA bias-free language guidelines |

### Is it polished?

| Lens | What it reads | Drawn from |
|---|---|---|
| Statistics reporting | Reported test results, rechecked by arithmetic | Nuijten et al. (2016); Appelbaum et al. (2018) |
| Mechanical checks | Figure and table order, missing citations, tense | McNamara et al. (2014) |
| Typing slips | Doubled words, stray spaces, "a" for "an", look-alike words | Crossley, Bradfield & Bustamante (2019) |
| Source overlap | Runs of words shared with a source you paste | Crossley, Kyle, Davenport & McNamara (2016) |

### Research profile

The Overview carries a **Research profile**: 17 counts that writing researchers use to describe a text, each recomputed here by a fixed rule and each shown with the publication it comes from and a line on how to read it. They describe a draft. None is a score and none has a target. The same counts appear in a "Research measure" box inside the lens they belong to, with what the research found and how the rule-based count differs from the published one.

### Working on a draft

| Feature | What it does |
|---|---|
| Workbench | Rewrite a sentence in place; marks from every open note show inside the box |
| Previews | See which notes a suggested change would clear, and any it would bring in, before accepting it |
| Rearrange | Drag the parts of a sentence into a new order |
| Guided and timed passes | Walk through the notes one at a time, or work for 5, 10 or 20 minutes |
| Before & after | A revision receipt, counts by lens, and the starting text against the current one |
| Practice | Short drills on the principles, some built from your own draft |
| Reading comfort | Text size, spacing and colour settings |

All 67 sources are listed, with DOIs where they could be confirmed, at the foot of the application.

---

## ⚠️ Limits

The rules read structure and have no idea what your sentences mean. There is no parser, no part-of-speech tagger and no dictionary, so some sentences will be misjudged, synonyms are not recognised, and misspellings are not found. The working thresholds (for example, twelve words before the main verb, or five matching words in a row) are this tool's own values and are labelled as such in the application. They are not published norms.

---

## 💬 Getting Help and Contributing

- Report a problem or suggest a rule in the [issue tracker](https://github.com/benmarwick/topic-and-emphasis/issues). A sentence the rules misread is especially useful: paste the sentence and say which lens marked it.
- Changes are recorded in the [changelog](CHANGELOG.md).
- The source is four files in `src/`: `head.html` (styles), `body.html` (page structure), `engine.js` (the rules) and `ui.js` (the interface). Run `python3 build.py` and `node tests/smoke.js` before opening a pull request.

---

## 🤖 Generative AI Disclosure

The code of this application was written with the assistance of an AI coding tool (Claude, by Anthropic), under the direction of the developer, who chose the sources, set the design and the constraints, and is responsible for the result. The application itself contains no AI: every annotation it makes comes from a fixed rule in `src/engine.js`.

---

## ⚖️ License

[MIT](LICENSE) © 2026 Ben Marwick.

The application includes the **New General Service List** and the **New Academic Word List** (version 1.2 of each) by Charles Browne, Brent Culligan and Joseph Phillips, under a [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence. The typefaces (IBM Plex and Newsreader, SIL Open Font License) are loaded from Google Fonts when the page opens and are not included in this repository.
