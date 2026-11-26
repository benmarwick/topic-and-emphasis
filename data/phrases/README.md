# Phrase bank (optional data)

`academic-phrases.json` holds about 590 sentence frames for research papers in 57 groups.
The page fetches it only when a reader presses "Load the phrase bank" in the Phrases tab
of the workbench. It is not compiled into `index.html`.

**This file is not under the MIT licence of the rest of the repository.**

| | |
|---|---|
| Source | [nashamri/academic-phrases](https://github.com/nashamri/academic-phrases), an Emacs package |
| Copyright | Copyright (C) 2017-2018 Nasser Alshammari |
| Licence | GNU General Public License, version 3 or later. The full text is in `LICENSE-GPL-3.0.txt`. |
| Basis | The package README says: "This work was based on the freely available PDF titled 'English for Writing Research Papers - Useful Phrases' [...]. This work was done with the kind permission of Springer Nature and Adrian Wallwork." |
| Book | Wallwork, A. (2016). *English for writing research papers* (2nd ed.). Springer. https://doi.org/10.1007/978-3-319-26094-5 |
| Changes | Converted from Emacs Lisp to JSON by `tools/make_phrases.py` on 2026-11-26. No wording was changed. The section-to-category table is the one in the package's `academic-phrases--insert-by-section`, with one added row ("Throughout the paper") for categories 53 to 57, which the package lists under no section. |

To rebuild: `python3 tools/make_phrases.py path/to/academic-phrases.el > data/phrases/academic-phrases.json`.

If you would rather not distribute a GPL-licensed file, delete this folder. The Phrases tab
then reports that the phrase bank could not be loaded, and everything else works as before.
