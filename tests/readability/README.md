# Readability test set

Readability calculators disagree. Mac et al. (2022) ran the same health texts through
several of them and found that one formula could give results up to 12.9 grades apart,
and 2.1 grades apart once every text was prepared in the same way
(<https://pmc.ncbi.nlm.nih.gov/articles/PMC9856555/>). The differences come from how each
tool counts sentences, words and syllables.

This folder pins down what this page computes, and records what two widely used
calculators give for the same text.

- `texts/` holds five fixed passages, from a plain story to a dense abstract. They were
  written for this test and are part of the repository (MIT).
- `ours.json` is this page's own output for those passages. `node tests/readability.test.js`
  fails if the engine's figures move away from it, so a change to the formulas or the
  syllable rule cannot slip in unnoticed. After an intended change, run
  `node tests/readability.test.js --update`.
- `reference.py` records the figures from [textstat](https://github.com/textstat/textstat)
  (Python). `reference.R` records those from
  [quanteda.textstats](https://quanteda.io) (R; Benoit et al. 2018,
  <https://doi.org/10.21105/joss.00774>). Run each once and commit the JSON it writes.
  The test then prints the three sets side by side and marks any figure that is more than
  one grade from a reference (half a grade for Coleman-Liau and ARI, which need no
  syllable count, and five points for Flesch reading ease and LIX, which are not grades).
  Those marks are information. They do not fail the test.

The test also recomputes Coleman-Liau, ARI and LIX from its own count of letters, words
and sentences, and requires the engine to match to within 0.01.
