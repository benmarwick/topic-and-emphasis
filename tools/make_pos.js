#!/usr/bin/env node
// Build data/pos/brill-lexicon.txt from the package github.com/words/brill (MIT).
//   node tools/make_pos.js path/to/brill
// The package maps 89,539 words to the Penn Treebank tags each can take, most likely first.
// Kept here: words written in lower-case letters (with ' or -), and for each the classes it can take,
// most likely first, as one letter each:
//   N noun   v verb, base or present   z verb, -s form   d verb, past   n past participle   g -ing form
//   M modal  J adjective   R adverb    F anything else (determiners, prepositions, pronouns, conjunctions...)
// Capitalised entries (names) and entries with digits or symbols are left out. Nothing else is changed.
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');
const src = path.resolve(process.argv[2] || 'brill');
const CODE = { NN: 'N', NNS: 'N', NNP: 'N', NNPS: 'N', VB: 'v', VBP: 'v', VBZ: 'z', VBD: 'd', VBN: 'n', VBG: 'g', MD: 'M', JJ: 'J', JJR: 'J', JJS: 'J', RB: 'R', RBR: 'R', RBS: 'R' };
import(pathToFileURL(path.join(src, 'index.js')).href).then(({ brill }) => {
  const out = []; let all = 0;
  for (const w of Object.keys(brill).sort()) {
    all++; if (!/^[a-z][a-z'-]*$/.test(w)) continue;
    let s = ''; for (const t of brill[w]) for (const p of String(t).split('|')) { const c = CODE[p] || 'F'; if (!s.includes(c)) s += c; }
    out.push(w + ' ' + s);
  }
  const head = '% Part-of-speech lexicon from github.com/words/brill (MIT, Copyright (c) 2014 Titus Wormer), which holds the lexicon of the Brill tagger (Brill 1992).\n% word, then the classes it can take, most likely first: N noun, v verb base/present, z verb -s, d verb past, n past participle, g -ing, M modal, J adjective, R adverb, F other.\n';
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'pos', 'brill-lexicon.txt'), head + out.join('\n') + '\n');
  fs.copyFileSync(path.join(src, 'license'), path.join(__dirname, '..', 'data', 'pos', 'LICENSE-MIT.txt'));
  console.log('kept', out.length, 'of', all);
});
