// Hints in steps, what a sentence does well, and paragraphs in another order.  Run:  node tests/hints.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const ui = read('src/ui.js');
const grab = (a, b) => { const i = ui.indexOf(a), k = ui.indexOf(b, i); assert.ok(i >= 0 && k > i, 'not found: ' + a); return ui.slice(i, k); };

// 1 every hint is written for a lens that exists, and the two tables cover the eight lenses of the simple view that raise notes on a sentence
const obj = name => new Function('return ' + grab('const ' + name + '=', ';\n').slice(('const ' + name + '=').length))();
const HQ = obj('HINTQ'), HM = obj('HINTM');
for (const k of [...Object.keys(HQ), ...Object.keys(HM)]) assert.ok(ui.includes("{k:'" + k + "'"), 'a hint is written for a lens that does not exist: ' + k);
for (const k of ['sv', 'topic', 'stress', 'action', 'clutter', 'rhythm']) assert.ok(HQ[k] && HM[k], 'no hint for ' + k);
for (const t of [...Object.values(HQ), ...Object.values(HM)]) assert.ok(t.length < 140 && /[.?]$/.test(t), 'a hint is long or unfinished: ' + t);
// the advice is held back only while hints are given one at a time, and the second hint waits
assert.ok(ui.includes("const step=!state.hintAll&&!f.dis&&!f.ok;"), 'the note no longer holds its advice back');
assert.ok(/const HINTWAIT=20000,HINTTRIES=2;/.test(ui), 'the working values for hints have changed: update the Guide and the changelog');

// 2 what a sentence does well is the reverse of a note: never claimed where that note is open
const goodOf = new Function('return ' + grab('function goodOf(st,A)', '\nconst goodAll'))();
const SAMPLE = ui.match(/const SAMPLE=`([^`]*)`/)[1], A = E.analyze(SAMPLE, {});
const G = A.sents.map(st => goodOf(st, A).map(x => x[0]));
assert.ok(G[1].includes('sv'), 'sentence 2 of the example has its verb beside its subject');
assert.ok(!G[2].includes('sv'), 'sentence 3 has an open subject-verb note and must not be praised for it');
assert.ok(!G[6].includes('stress'), 'sentence 7 has an open stress note and must not be praised for its close');
assert.deepStrictEqual(goodOf(A.sents[0], Object.assign({}, A, { findings: [] })).filter(x => x[0] === 'flow'), [], 'a first sentence links back to nothing');
for (const st of A.sents) for (const [k, t] of goodOf(st, A)) assert.ok(['sv', 'flow', 'stress'].includes(k) && /“[^”]+”/.test(t), 'a strength names no words: ' + t);

// 3 paragraphs in another order: only the paragraphs move, and everything between them stays where it was
const reorderText = new Function('return ' + grab('function reorderText(raw,spans,ord)', '\nfunction pordNow'))();
const raw = '# One\n\nAlpha a.\n\n# Two\n\nBeta b. Beta c.\n\nGamma.\n', spans = [[7, 15], [24, 39], [41, 47]];
assert.deepStrictEqual(spans.map(s => raw.slice(s[0], s[1])), ['Alpha a.', 'Beta b. Beta c.', 'Gamma.']);
assert.strictEqual(reorderText(raw, spans, [0, 1, 2]), raw, 'the same order changes the text');
const moved = reorderText(raw, spans, [2, 0, 1]);
assert.strictEqual(moved, '# One\n\nGamma.\n\n# Two\n\nAlpha a.\n\nBeta b. Beta c.\n');
assert.strictEqual(moved.length, raw.length);
console.log('hints: ' + Object.keys(HQ).length + ' lenses have a first hint and ' + Object.keys(HM).length + ' a second; strengths never contradict an open note; paragraphs move and headings stay');
