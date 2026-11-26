# Data

Third-party word lists and word norms. **These files are not covered by the MIT licence
of the rest of the repository.** Each keeps the licence its authors gave it, listed below.
If you reuse them, cite the publication and follow that licence.

## `lists/` — built into the page

| File | What it is | Source | Licence |
|---|---|---|---|
| `dale-chall.txt` | The list of about 3,000 familiar words used by the New Dale–Chall readability formula (Chall & Dale 1995). | Copied from the open-source package [words/dale-chall](https://github.com/words/dale-chall) by Titus Wormer. `src/dalechall.txt` is the same list with apostrophes and full stops removed. | MIT (the package). The formula and list were published in Chall, J. S., & Dale, E. (1995). *Readability Revisited: The New Dale-Chall Readability Formula*. Brookline Books. |
| `excess_words.csv` | The 900 words that became unexpectedly common in biomedical abstracts between 2013 and 2024, each marked as a content or a style word. Unchanged. | [berenslab/llm-excess-vocab](https://github.com/berenslab/llm-excess-vocab), `results/excess_words.csv`. `src/excess.txt` is the 407 words marked `style`. | MIT. Cite Kobak, D., González-Márquez, R., Horvát, E.-Á., & Lause, J. (2025). Delving into LLM-assisted writing in biomedical publications through excess vocabulary. *Science Advances*, 11(27), eadt3813. <https://doi.org/10.1126/sciadv.adt3813> |

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

## Not included

The **Academic Formulas List** (Simpson-Vlach & Ellis 2010, *Applied Linguistics*, 31(4),
487–512) is published in a journal and carries no open licence, so it is not here. The
Signal phrases lens counts a short inventory of common academic word sequences written for
this application instead.
