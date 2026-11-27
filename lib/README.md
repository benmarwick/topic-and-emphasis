# lib

Third-party code that the page fetches only when a view needs it.

| File | What it is | Version | Licence |
|---|---|---|---|
| `compromise.min.js` | [compromise](https://github.com/spencermountain/compromise) by Spencer Kelly, a rule-based parser of English. The file `builds/compromise.js` from the repository, unchanged apart from the first comment line and two escape characters inside strings, which are written as `\x1b` so that the file is plain text. Fetched the first time the Subject → verb lens opens, for the "A second reading" panel. | 14.21.0 | MIT |

`harper/` holds the [Harper](https://github.com/Automattic/harper) grammar checker (harper.js 3.2.0, Apache-2.0): `dist/index.js`, `dist/binary.js`, the module they share and `dist/harper_wasm_bg.wasm`, unchanged. The inlined and slim builds that the package also ships were removed. Fetched when "Load Harper" is pressed in Typing slips.

One more library is carried inside `index.html` itself, from `src/vendor/`:

| File | What it is | Version | Licence |
|---|---|---|---|
| `src/vendor/confetti.min.js` | [canvas-confetti](https://github.com/catdad/canvas-confetti) by Kiril Vatev (esbuild, minified from `src/confetti.js`). In simple view, sends the words a rewrite cut flying when it clears a note. | 1.9.4 | ISC |
| `src/vendor/rough-notation.min.js` | [Rough Notation](https://github.com/rough-stuff/rough-notation) by Preet Shihn, bundled with the parts of [Rough.js](https://github.com/rough-stuff/rough) it uses (esbuild, minified). Draws the hand-drawn marks on the card beside the introduction. | 0.5.1, with Rough.js 4.6.6 | MIT |
