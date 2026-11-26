// The optional part-of-speech lexicon.  Run:  node tests/pos.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const M = E.parsePos(read('data/pos/brill-lexicon.txt'));

// the file: comment lines skipped, lower-case words only, codes from the ten letters
assert.strictEqual(M.size, 53883);
for (const [w, e] of M) { assert.ok(/^[a-z][a-z'-]*$/.test(w), w); assert.ok(/^[NvzdngMJRF]+$/.test(e), w + ' ' + e); }
assert.strictEqual(M.get('significant'), 'J'); assert.strictEqual(M.get('study')[0], 'N'); assert.strictEqual(M.get('may')[0], 'M');

// counts: every word is placed, auxiliaries are grammatical, density is the share of the four lexical classes
const T = 'The survey was administered online. Trust declined sharply in large cities. We believe that the results are robust.';
let A = E.analyze(T, {}), P = E.pos(A, M);
assert.strictEqual(P.all, A.sents.reduce((a, s) => a + s.T.filter(t => t.w && !t.cite && /^\p{L}/u.test(t.t)).length, 0));
assert.strictEqual(Object.values(P.by).reduce((a, b) => a + b, 0), P.all);
assert.strictEqual(P.aux, 2);
assert.ok(Math.abs(P.ld - 100 * P.lex / P.all) < 1e-9 && P.ld > 40 && P.ld < 80, String(P.ld));
assert.strictEqual(P.off.length, 0, JSON.stringify(P.off));

// a second opinion: a finite verb the rules pass over is listed; a noun-first word used as a verb is not objected to
A = E.analyze('He wore turn-down collars with a carelessly-knotted necktie, and a velvet jacket.', {});
if (A.sents[0].vTok < 0) assert.strictEqual(E.pos(A, M).none[0].w, 'wore');
A = E.analyze('Our estimates control for age and income.', {});
assert.strictEqual(E.pos(A, M).off.length, 0);

// reading the lexicon changes nothing in the analysis
const before = JSON.stringify(E.analyze(T, {}).findings.map(f => f.key));
E.pos(E.analyze(T, {}), M);
assert.strictEqual(JSON.stringify(E.analyze(T, {}).findings.map(f => f.key)), before);
console.log('pos: ok');
