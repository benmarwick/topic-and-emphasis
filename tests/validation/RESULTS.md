# How the counts track judged reading ease

Produced by `node tests/validation/clear.js` on the 4721 passages of the CLEAR corpus (Crossley et al. 2023, <https://doi.org/10.3758/s13428-022-01802-x>). Each passage has an ease score built from teachers' judgements. The figure is the Pearson correlation between a count and that score: a negative value means the count rises as texts get harder.

The passages are reading texts for school pupils, not research writing, so read the table as a rough guide to which counts track difficulty at all.

| Count | Correlation with judged ease |
|---|---|
| Mean age of acquisition (word norms) | −0.63 |
| SMOG | −0.57 |
| Dale-Chall score | −0.56 |
| Flesch reading ease | +0.55 |
| LIX | −0.55 |
| Gunning Fog | −0.54 |
| Flesch-Kincaid grade | −0.53 |
| Words off the Dale-Chall list (%) | −0.50 |
| ARI | −0.49 |
| Coleman-Liau | −0.48 |
| Rare words, Zipf under 3 (%) (word norms) | −0.47 |
| Letters per word | −0.40 |
| Mean Zipf frequency (word norms) | +0.40 |
| Personal pronouns per 100 words | +0.39 |
| Words per sentence | −0.38 |
| Mean concreteness (word norms) | +0.36 |
| General science jargon (%) | −0.35 |
| Passives per sentence | −0.35 |
| Nominalisations per 100 words | −0.34 |
| Mean prevalence (word norms) | +0.33 |
| Content words already given (%) | +0.29 |
| Median words before the main verb | −0.24 |
| Running words on NGSL or NAWL (%) | +0.21 |
| Connectives per 1,000 words | +0.16 |
| Word variety, MTLD | −0.12 |
| Negatives per 1,000 words | +0.10 |
| Word variety, MATTR | −0.09 |
| Neighbouring sentences sharing a content word (%) | −0.06 |
| Lexical density (%) | −0.02 |

Combined in a linear model and checked on passages held out five times over:

| Counts used | Correlation of predicted with judged ease |
|---|---|
| Flesch reading ease alone | 0.55 |
| Every count above except the word norms | 0.69 |
| Every count above | 0.73 |
