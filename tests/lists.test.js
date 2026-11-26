// The optional lists in data/lists/ and the taxonomy in data/taxonomy/.  Run:  node tests/lists.test.js
// These files hold word strings and numbers only. The test checks their shape, and that nothing else has crept in.
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const ui = read('src/ui.js'), ownText = new Function(ui.match(/function ownText\(k,t\)\{[\s\S]*?\n  return'';\}/)[0] + ';return ownText;')();

// --- Academic Word List: 570 headwords, nine sublists of 60 and one of 30, each with its family
const awl = JSON.parse(read('data/lists/awl.json'));
assert.deepStrictEqual(Object.keys(awl).sort(), ['holds', 'name', 'read_from', 'reference', 'sublists']);
const sizes = Object.keys(awl.sublists).sort((a, b) => a - b).map(n => Object.keys(awl.sublists[n]).length);
assert.deepStrictEqual(sizes, [60, 60, 60, 60, 60, 60, 60, 60, 60, 30]);
for (const n in awl.sublists) for (const h in awl.sublists[n]) {
  assert.ok(/^[a-z][a-z-]*$/.test(h), 'a headword is one word: ' + h);
  awl.sublists[n][h].forEach(w => assert.ok(/^[a-z][a-z'-]*$/.test(w), 'a family member is one word: ' + w));
}

// --- Academic Formulas List: 607 formulas on three lists, each with numbers and nothing more
const afl = JSON.parse(read('data/lists/afl.json'));
assert.deepStrictEqual(Object.keys(afl).sort(), ['formulas', 'ftw', 'holds', 'name', 'read_from', 'reference']);
assert.strictEqual(afl.formulas.length, 607);
const by = {}; afl.formulas.forEach(r => { by[r.list] = (by[r.list] || 0) + 1; });
assert.deepStrictEqual(by, { core: 207, written: 200, spoken: 200 });
afl.formulas.forEach(r => {
  assert.deepStrictEqual(Object.keys(r).sort(), ['f', 'ftw', 'list', 'rank', 'spoken_pm', 'written_pm']);
  assert.ok(/^[a-z0-9' ]+$/.test(r.f) && r.f.split(' ').length >= 3 && r.f.split(' ').length <= 5, 'a formula is three to five words: ' + r.f);
  assert.ok(typeof r.ftw === 'number' && typeof r.spoken_pm === 'number' && typeof r.written_pm === 'number' && Number.isInteger(r.rank));
});
assert.strictEqual(new Set(afl.formulas.map(r => r.f)).size, 607, 'no formula is listed twice');
['core', 'written', 'spoken'].forEach(l => { const v = afl.formulas.filter(r => r.list === l).map(r => r.ftw); assert.ok(v.every((x, i) => i === 0 || x <= v[i - 1] + 1e-9), l + ' is in order of teaching worth'); });

// --- the page reads both, and the engine finds their words and formulas in a draft
const text = 'We analyzed the data in terms of labor costs. On the other hand, the approach was new, and it should be noted that the evidence is thin.';
const A = E.analyze(text, { awl: ownText('awl', read('data/lists/awl.json')), afl: ownText('afl', read('data/lists/afl.json')) });
assert.ok(A.research.awl.size > 3000);
for (const w of ['analyse', 'data', 'labour', 'approach', 'evident']) assert.ok(A.research.awl.words.some(e => e.w === w), w + ' is found');
assert.strictEqual(A.research.awl.words.find(e => e.w === 'analyse').s, 1);
assert.strictEqual(A.research.afl.size, 607);
const hit = f => A.research.afl.hits.find(h => h.f === f);
assert.strictEqual(hit('in terms of').ftw, 3.53);
assert.strictEqual(hit('in terms of').list, 'core');
assert.strictEqual(hit('in terms of').sp, 337);
assert.ok(hit('on the other hand the') && hit('it should be noted'), 'the longest formula that fits is the one counted');
assert.strictEqual(E.analyze(text, {}).findings.length, A.findings.length, 'the lists add no note');

// --- the taxonomy: names, groups, checked page addresses, and tags for the phrase bank
const tax = JSON.parse(read('data/taxonomy/uefap-functions.json')), names = new Set(tax.groups.flatMap(g => g.functions.map(f => f.name)));
assert.strictEqual(names.size, 35);
const cats = new Set(JSON.parse(read('data/phrases/academic-phrases.json')).cats.map(c => String(c.n)));
for (const k in tax.phrase_bank_tags) { assert.ok(cats.has(k), 'group ' + k + ' exists'); assert.ok(names.has(tax.phrase_bank_tags[k]), tax.phrase_bank_tags[k]); }
tax.groups.forEach(g => g.functions.forEach(f => assert.deepStrictEqual(Object.keys(f).filter(k => k !== 'name' && k !== 'page'), [], 'a function has a name and at most a page')));

// --- none of this is compiled into the page
const page = read('index.html');
assert.ok(!page.includes('from the point of view') && !page.includes('"unapproachable"'), 'the lists are data beside the page, not part of it');
console.log('list checks passed: ' + sizes.reduce((a, b) => a + b, 0) + ' headwords, ' + afl.formulas.length + ' formulas, ' + names.size + ' functions');
