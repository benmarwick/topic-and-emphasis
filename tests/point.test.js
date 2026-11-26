// Pointing back with "this" and a noun.  Run:  node tests/point.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

// "This decline": the noun counts as old, the link is a named pointer, the opening is labelled "named"
let A = E.analyze('Trust in courts fell sharply after 2010. This pattern was strongest among renters. However, these findings rest on one survey.', {});
assert.ok(A.sents[1].shell, 'sentence 2 should be read as "this" + noun');
assert.ok(A.sents[1].cw.find(c => A.sents[1].T[c.i].l === 'pattern').old, '"pattern" should count as old');
assert.strictEqual(A.sents[1].link.type, 'fluid');
assert.strictEqual(A.sents[1].link.weak, 'named');
assert.strictEqual(A.sents[1].prog, 'named');
assert.ok(A.sents[2].shell, 'a connective before "these findings" should not hide it');
assert.strictEqual(A.research.point.named, 2);
// not a pointer: no demonstrative, or a noun that is not on the list
A = E.analyze('Trust in courts fell sharply. The pattern was strongest among renters. This courthouse closed.', {});
assert.ok(!A.sents[1].shell && !A.sents[2].shell);

// a bare "this" gets the note, with nouns from the sentence before; the first is the action as a noun
A = E.analyze('Trust in the courts declined after the scandal. This was sharpest among renters.', {});
const f = A.findings.find(x => / what\?$/.test(x.title));
assert.ok(f, 'the bare "This" should have a note');
assert.strictEqual(f.nouns[0], 'decline', 'first suggestion: ' + f.nouns.join(', '));
assert.ok(/This decline/.test(f.tip), f.tip);
assert.strictEqual(A.research.point.bare, 1);
console.log('pointing-back checks passed');
