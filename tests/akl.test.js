// The Academic Keyword List and the four lists from github.com/words.  Run:  node tests/akl.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' ')), one = f => JSON.stringify(read(f).trim());
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';const AKL_RAW=' + one('src/akl.txt') + ';const WLISTS_RAW=' + one('src/wordlists.txt') + ';' + read('src/engine.js') + ';return E;')();

// the stored list: five classes, the counts recorded, multi-word entries whole, and the same words in src/
const akl = JSON.parse(read('data/lists/akl.json')), C = akl.classes;
assert.deepStrictEqual(Object.keys(C).map(k => C[k].length), [353, 233, 180, 87, 75]);
assert.ok(/CC BY 4\.0/.test(akl.licence) && /Paquot, M\. \(2010\)/.test(akl.reference));
['according to', 'in terms of', 'whether or not', 'as well as'].forEach(w => assert.ok(C.others.includes(w), w));
assert.ok(C.verbs.includes('account (for)') && C.adverbs.includes('for example') && C.nouns.includes('behaviour'));
assert.strictEqual(read('src/akl.txt').trim().split('|').map(g => g.slice(g.indexOf(':') + 1)).join(';'), Object.values(C).map(v => v.join(';')).join(';'));

// counting: content classes are counted, function words are not, multi-word entries are found once
let R = E.analyze('The results suggest that the policy increased costs. In terms of scale, the effects were significant. However, the organization of the survey differed between groups.', {}).research;
const K = R.akl, has = w => K.words.some(x => x.w === w);
assert.strictEqual(K.size, 928);
assert.ok(has('result') && has('suggest') && has('increase') && has('significant') && has('however'), JSON.stringify(K.words));
assert.ok(has('organisation'), 'American spelling matched to the British entry');
assert.ok(!has('the') && !has('of') && !has('between') && K.fn >= 5, 'function words left out');
assert.deepStrictEqual(K.multi, [{ w: 'in terms of', c: 1 }]);
assert.ok(!has('term'), 'a word inside a multi-word entry is not counted again');
assert.strictEqual(K.n, K.by.noun + K.by.verb + K.by.adjective + K.by.adverb);

// the four lists: counted, with the hedges this page does not mark, and no function words from the weasel list
R = E.analyze('We believe that the effect is really quite large, and in my view it would matter. That is so. This agile synergy is basically useful.', {}).research;
const W = R.wl;
assert.ok(W.hedges.extra.some(x => x.w === 'believe') && W.hedges.extra.some(x => x.w === 'in my view') && W.hedges.extra.some(x => x.w === 'would'), JSON.stringify(W.hedges.extra));
assert.ok(!W.weasels.words.some(x => x.w === 'that' || x.w === 'so') && W.weasels.skipped > 0);
assert.ok(W.weasels.words.some(x => x.w === 'useful') && W.fillers.words.some(x => x.w === 'basically') && W.buzzwords.words.some(x => x.w === 'agile'));

// none of it raises a note: the notes are the same with and without the lists
const E0 = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const T = 'We believe that the effect is really quite large, and in my view it would matter. The results suggest that costs rose in terms of scale.';
assert.deepStrictEqual(E.analyze(T, {}).findings.map(f => f.key), E0.analyze(T, {}).findings.map(f => f.key));
assert.strictEqual(E0.analyze(T, {}).research.akl, null);
console.log('akl: ok');

// wordTier: how common a word is, from the built-in lists (used by the typographic view)
{
  const one2 = f => JSON.stringify(read(f).split(/\s+/).join(' '));
  const E2 = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';const DALE_RAW=' + one2('src/dalechall.txt') + ';const JARGON_RAW=' + one2('src/jargon.txt') + ';' + read('src/engine.js') + ';return E;')();
  assert.strictEqual(E2.wordTier('the'), 0); assert.strictEqual(E2.wordTier('Results'), 1); assert.strictEqual(E2.wordTier('heteroskedasticity'), 4);
  assert.ok([1, 2, 3].includes(E2.wordTier('hypothesis')));
  console.log('wordTier: ok');
}
