// The sentence-by-sentence counts behind the pictures of the draft.  Run:  node tests/series.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

const A = E.analyze('Rent caps clearly cause displacement. This may possibly suggest a link (Smith 2019). Costs rose by 12% and this proves the cap failed. Tenants perhaps moved. The council met in 2019.',
  { claim: 'Rent caps changed who stayed.' });
const S = A.research.series, n = A.sents.length;
for (const k of ['len', 'hedge', 'force', 'evid', 'claim']) assert.strictEqual(S[k].length, n, k + ' has one value for each sentence');
assert.ok(S.force[0] >= 2 && S.hedge[0] === 0, 'sentence 1: a booster and a causal verb, no hedge');
assert.ok(S.hedge[1] >= 2 && S.force[1] === 0, 'sentence 2: hedges only');
assert.deepStrictEqual(S.evid, [0, 1, 1, 0, 0], 'a citation or a figure counts as evidence; a bare year does not');
assert.ok(S.claim[0] >= 2 && S.claim[3] === 0, 'claim words are counted where they are used');
assert.ok(S.hedge[3] >= 1);
console.log('series checks passed');
