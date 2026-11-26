# lib

Third-party code that the page fetches only when a view needs it.

| File | What it is | Version | Licence |
|---|---|---|---|
| `compromise.min.js` | [compromise](https://github.com/spencermountain/compromise) by Spencer Kelly, a rule-based parser of English. The file `builds/compromise.js` from the repository, unchanged apart from the first comment line. Fetched the first time the Subject → verb lens opens, for the "A second reading" panel. | 14.21.0 | MIT |

One more library is carried inside `index.html` itself, from `src/vendor/`:

| File | What it is | Version | Licence |
|---|---|---|---|
| `src/vendor/rough-notation.min.js` | [Rough Notation](https://github.com/rough-stuff/rough-notation) by Preet Shihn, bundled with the parts of [Rough.js](https://github.com/rough-stuff/rough) it uses (esbuild, minified). Draws the hand-drawn marks on the card beside the introduction. | 0.5.1, with Rough.js 4.6.6 | MIT |
