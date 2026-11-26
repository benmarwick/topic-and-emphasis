# Data

Third-party word lists and word norms. **These files are not covered by the MIT licence
of the rest of the repository.** Each keeps the licence its authors gave it, listed below.
If you reuse them, cite the publication and follow that licence.

## `lists/` — the lists built into the page (the two optional lists in this folder are described further down)

| File | What it is | Source | Licence |
|---|---|---|---|
| `dale-chall.txt` | The list of about 3,000 familiar words used by the New Dale–Chall readability formula (Chall & Dale 1995). | Copied from the open-source package [words/dale-chall](https://github.com/words/dale-chall) by Titus Wormer. `src/dalechall.txt` is the same list with apostrophes and full stops removed. | MIT (the package). The formula and list were published in Chall, J. S., & Dale, E. (1995). *Readability Revisited: The New Dale-Chall Readability Formula*. Brookline Books. |
| `excess_words.csv` | The 900 words that became unexpectedly common in biomedical abstracts between 2013 and 2024, each marked as a content or a style word. Unchanged. | [berenslab/llm-excess-vocab](https://github.com/berenslab/llm-excess-vocab), `results/excess_words.csv`. `src/excess.txt` is the 407 words marked `style`. | MIT. Cite Kobak, D., González-Márquez, R., Horvát, E.-Á., & Lause, J. (2025). Delving into LLM-assisted writing in biomedical publications through excess vocabulary. *Science Advances*, 11(27), eadt3813. <https://doi.org/10.1126/sciadv.adt3813> |

| `science_common_words_Plaven-Sigray_et_al_2017.csv` | The 2,949 words most common in scientific abstracts that are not on the Dale–Chall list, with the 2,138 the authors classed as general science jargon marked `1`. Unchanged. | [wiheto/readabilityinscience](https://github.com/wiheto/readabilityinscience), `jargon/jargonListFinal.csv`. `src/jargon.txt` is the 2,138 marked words. | MIT. Cite Plavén-Sigray, P., Matheson, G. J., Schiffler, B. C., & Thompson, W. H. (2017). The readability of scientific texts is decreasing over time. *eLife*, 6, e27725. <https://doi.org/10.7554/eLife.27725> |

`src/syllables.txt` holds syllable counts for 1,961 common words that the engine's spelling
rule gets wrong. The counts come from the [CMU Pronouncing Dictionary](https://github.com/cmusphinx/cmudict)
(Copyright 1993–2015 Carnegie Mellon University, BSD 2-clause; the licence text is in
`lists/CMUdict-LICENSE.txt`). The dictionary itself is not in this repository.
`tools/make_syllables.js` rebuilds the file. It chooses which words to keep using the
page's own lists and the yearly word counts published with Kobak et al. (2025), MIT.

The promotional adjectives used in the Claim strength lens are the ones reported in
Millar, N., Batalo, B., & Budgell, B. (2022), *JAMA Network Open*, 5(8), e2228676,
<https://doi.org/10.1001/jamanetworkopen.2022.28676>, an open-access article under CC BY.
They are written into `src/engine.js`. They were taken from the article page and have not
been checked against the supplement's table.

## `norms/` — optional, fetched only when a reader presses “Load word norms”

All four are for **non-commercial use**. The first three may be shared only **unchanged**,
so they are stored whole and the page reads them as they are.

| File | What it is | Obtained from | Licence |
|---|---|---|---|
| `Concreteness_ratings_Brysbaert_et_al_BRM.txt` | Concreteness ratings, 1 (abstract) to 5 (concrete), for 37,058 words and 2,896 two-word expressions. The authors' file, unchanged. | [crr.ugent.be/archives/1330](http://crr.ugent.be/archives/1330), via the copy at [ArtsEngine/concreteness](https://github.com/ArtsEngine/concreteness). | CC BY-NC-ND 3.0. Cite Brysbaert, M., Warriner, A. B., & Kuperman, V. (2014). *Behavior Research Methods*, 46(3), 904–911. <https://doi.org/10.3758/s13428-013-0403-5> |
| `AoA_ratings_Kuperman_et_al_BRM.csv` | Age-of-acquisition ratings for about 30,000 words. The authors' spreadsheet saved as CSV, otherwise unchanged. | [crr.ugent.be/archives/806](http://crr.ugent.be/archives/806), via the CSV copy in [brucewlee/lftk](https://github.com/brucewlee/lftk). | CC BY-NC-ND 3.0. Cite Kuperman, V., Stadthagen-Gonzalez, H., & Brysbaert, M. (2012). *Behavior Research Methods*, 44(4), 978–990. <https://doi.org/10.3758/s13428-012-0210-4> |
| `SUBTLEX-US_frequency_list_with_PoS_and_Zipf.csv` | Word frequencies from film and television subtitles for 74,286 word forms, with the Zipf value. The authors' spreadsheet saved as CSV, otherwise unchanged. | [crr.ugent.be/archives/740](http://crr.ugent.be/archives/740), via the CSV copy in [brucewlee/lftk](https://github.com/brucewlee/lftk). | CC BY-NC-ND 3.0. Cite Brysbaert, M., & New, B. (2009). *Behavior Research Methods*, 41(4), 977–990. <https://doi.org/10.3758/BRM.41.4.977>. The Zipf scale: van Heuven, W. J. B., Mandera, P., Keuleers, E., & Brysbaert, M. (2014). *Quarterly Journal of Experimental Psychology*, 67(6), 1176–1190. <https://doi.org/10.1080/17470218.2013.850521> |
| `word_prevalence_Brysbaert_et_al_2019.txt` | Word prevalence (a z-score for the share of people who know the word) for 49,350 words. Two tab-separated columns. **Adapted**: the column `PREV.Brysbaert` was taken from the `lexops` table, which holds the norms for the words it could match (the published file has about 62,000). | [crr.ugent.be/archives/2045](http://crr.ugent.be/archives/2045), via [JackEdTaylor/lexopsdata](https://github.com/JackEdTaylor/lexopsdata). | CC BY-NC-SA 4.0, and this adapted file is shared under the same licence. Cite Brysbaert, M., Mandera, P., McCormick, S. F., & Keuleers, E. (2019). *Behavior Research Methods*, 51(2), 467–479. <https://doi.org/10.3758/s13428-018-1077-9> |

The licence terms above are as stated by the authors on the linked pages and as recorded in
the `lexopsdata` package. If you plan any commercial use of this application, remove
`data/norms/`. The page works without it.

## `phrases/` — optional, fetched only when a reader presses “Load the phrase bank”

`academic-phrases.json`: about 590 sentence frames for research papers, converted from the Emacs package
[nashamri/academic-phrases](https://github.com/nashamri/academic-phrases) (GPL-3.0-or-later), which was made from
Adrian Wallwork's "Useful Phrases" with the permission of Springer Nature and the author. See `phrases/README.md`.

## `lists/awl.json`, `lists/afl.json` and `taxonomy/` — optional, fetched only when a reader asks

These three files hold **word strings and numbers only**. Nothing else from the publications is in
them: no definitions, no example sentences, no explanatory text and no page markup.

| File | What it holds | Credit | Read from |
|---|---|---|---|
| `lists/awl.json` | The Academic Word List: 570 headwords in ten sublists, with the members of each word family. | Coxhead, A. (2000). A new academic word list. *TESOL Quarterly*, 34(2), 213–238. | [lpmi-13/machine_readable_wordlists](https://github.com/lpmi-13/machine_readable_wordlists) (CC0 1.0), which names the Victoria University of Wellington pages as its source. |
| `lists/afl.json` | The Academic Formulas List: 607 formulas, the list each is on (core, written, spoken), its rank there, its frequency per million words in academic speech and writing, and its formula teaching worth. | Simpson-Vlach, R., & Ellis, N. C. (2010). An Academic Formulas List: New methods in phraseology research. *Applied Linguistics*, 31(4), 487–512. | The table in [egumasa/Multi-Word-Units-Profiler](https://github.com/egumasa/Multi-Word-Units-Profiler), checked row by row against the one in [bouxin/Vocabs](https://github.com/bouxin/Vocabs). The two agree on all 607 rows. |
| `taxonomy/uefap-functions.json` | The names of 35 rhetorical functions and the groups they are listed in, the address of the UEFAP page for 12 of them, and this project's own tagging of the phrase bank's groups with those names. | Gillett, A. *Using English for Academic Purposes*. https://www.uefap.org/ | The names are from the UEFAP introduction to rhetorical functions. The tagging was done for this project. |

`tools/make_lists.py` rebuilds the two lists from those sources.

**Rights.** The words, formulas and figures are the work of the authors credited above and are
reproduced so that the page can count them in a draft. The position taken here is that single words,
short phrases and measured statistics are not themselves protected by copyright, and that is why only
those are stored. That position is strongest under United States law. Elsewhere, a compilation or a
database can carry rights of its own, and nobody has given this project permission for either list.
This project claims no copyright in the contents of these files. To the extent it holds any rights in
how they are arranged, it waives them under CC0 1.0. If a rights holder objects, or you would rather
not distribute them, delete the files: the panels then offer a box to paste a copy into, and
everything else works as before.

## `lists/akl.json` and `lists/words-*.txt` — built into the page

| File | What it is | Source | Licence |
|---|---|---|---|
| `akl.json` | The Academic Keyword List: 928 entries in five classes (353 nouns, 233 verbs, 180 adjectives, 87 adverbs, 75 others), multi-word entries included. Entries unchanged; British spelling as published. `src/akl.txt` is the same list in one line. | The table on the [UCLouvain page](https://uclouvain.be/en/research-institutes/ilc/cecl/the-academic-keyword-list-akl). Nouns, verbs and adjectives were read from [lpmi-13/machine_readable_wordlists](https://github.com/lpmi-13/machine_readable_wordlists) (CC0), which splits multi-word entries; adverbs and others were read from the page and checked word for word against that copy. | **CC BY 4.0**, as the page states. Cite Paquot, M. (2010). *Academic Vocabulary in Learner Writing: From Extraction to Analysis*. London & New York: Continuum, 56–58. |
| `words-hedges.txt`, `words-weasels.txt`, `words-fillers.txt`, `words-buzzwords.txt` | 162 hedges, 116 weasel words, 83 fillers and 322 buzzwords. The first three are the packages' `data.txt` unchanged, with their own notes on sources; the fourth is the package's list written one to a line. `src/wordlists.txt` holds all four in one line. | [words/hedges](https://github.com/words/hedges), [words/weasels](https://github.com/words/weasels), [words/fillers](https://github.com/words/fillers), [words/buzzwords](https://github.com/words/buzzwords), as of November 2022. | MIT, Copyright (c) 2014 Titus Wormer (`words-LICENSE.txt`). |

The UCLouvain page says the list has 930 words (355 nouns). Its table, read in November 2026, has 353 nouns
and 928 entries, and that is what is stored. The four `words` lists are compiled from style guides, blogs and
Wikipedia. They are not research instruments, and the page only counts them: the function words and particles
on the weasel and filler lists ("that", "so", "up") are skipped when counting, and the files are left whole.

`tools/make_wordlists.py` rebuilds all of these.

## Pasting a copy of your own

The Vocabulary level lens and the Signal phrases lens also accept a pasted list, kept in that browser.

| List | Format |
|---|---|
| Word list | One headword to a line. A family is `headword: member, member`. A line `Sublist 3`, or a number from 1 to 10 on a word's line, gives the sublist. |
| Formulas | One formula to a line, then its numbers, separated by commas, tabs or two or more spaces. The last number is read as the formula teaching worth, and the two before it as frequency per million in speech and in writing. A line `Core`, `Written` or `Spoken`, or that word in a column, gives the list. A word in brackets is optional. |
