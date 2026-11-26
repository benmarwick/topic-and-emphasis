// Lists the writer brings: an academic word list, and a formulas list with teaching worth.  Run:  node tests/ownlists.test.js
// The lists below are a few made-up lines in the accepted formats. The published lists are not in this repository.
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

const awl = 'Sublist 1\nanalyse: analysed, analysis, analyses, analytical\napproach\nSublist 2\nachieve\nstrategy 2\nlabour';
const afl = 'Core\nin terms of\t120\t95\t3.20\non the other hand, 80, 60, 2.75\nWritten\nit should be noted (that)  14  30  1.90\nSpoken\nyou know what i mean\t0.4';
const text = 'We analyzed the labor market in terms of strategies. On the other hand, the analyses achieved little, and it should be noted that the approach was new. It should be noted the data were thin.';

// with no list, nothing is reported and nothing is marked
let A = E.analyze(text, {});
assert.strictEqual(A.research.awl, null);
assert.strictEqual(A.research.afl, null);
const notes0 = A.findings.map(f => f.lens + '|' + f.s + '|' + f.title).join('\n');

A = E.analyze(text, { awl, afl });
// a list the writer brings never adds or removes a note
assert.strictEqual(A.findings.map(f => f.lens + '|' + f.s + '|' + f.title).join('\n'), notes0);

// the word list: families, sublists, endings, and British and American spellings
const W = A.research.awl;
assert.strictEqual(W.n, 6);
assert.deepStrictEqual(W.by, { 1: 3, 2: 3 });
assert.strictEqual(W.words[0].w, 'analyse');
assert.strictEqual(W.words[0].c, 2, '"analyzed" and "analyses" both count under "analyse"');
assert.ok(W.words.some(e => e.w === 'labour' && e.s === 2), '"labor" is matched to "labour", in the sublist of its heading');
assert.ok(W.words.some(e => e.w === 'strategy' && e.s === 2), 'a number on the line gives the sublist');
assert.ok(W.fam);
assert.ok(A.sents[0].marks.vocab.some(m => /academic word list, sublist 1, under “analyse”/.test(m.tip || '')));

// the formulas list: the last number is the teaching worth, headings give the list, a bracketed word is optional
const F = A.research.afl;
assert.strictEqual(F.size, 4);
assert.strictEqual(F.n, 4);
assert.deepStrictEqual(F.hits.map(h => [h.f, h.c, h.ftw, h.list]), [['in terms of', 1, 3.2, 'core'], ['on the other hand', 1, 2.75, 'core'], ['it should be noted (that)', 2, 1.9, 'written']]);
assert.strictEqual(F.by.spoken, 0);
assert.ok(Math.abs(F.ftwMean - (3.2 + 2.75 + 1.9 * 2) / 4) < 1e-9, 'the mean is weighted by use');

// formats: commas, tabs and runs of spaces; a list with no numbers still matches, with no teaching worth
const P = E.parseFormulas('as a result of\nthe extent to which;2.4;written');
assert.strictEqual(P.n, 2);
assert.strictEqual(P.map.get('as a result of').ftw, null);
assert.strictEqual(P.map.get('the extent to which').ftw, 2.4);
assert.strictEqual(P.map.get('the extent to which').list, 'written');
assert.strictEqual(E.parseWordList('approach\nbenefit').get('benefit').s, 0, 'no sublist given');
console.log('own-list checks passed');
