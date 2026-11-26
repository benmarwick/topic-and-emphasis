// Blocks that are not prose, and the reference list against the citations.  Run:  node tests/blocks.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const DOC = ['---', 'title: "Trust"', 'format: html', '---', '', '# Introduction', '',
  'Trust in courts has declined [@Dalton2004]. Smith (2019) found a fall of $\\beta = 0.4$ in `trust_score`. See <https://example.org/data> and @fig-trust for details. Earlier work reached the same view (Jones & Lee, 2018; Brown et al., 2020).', '',
  '```{r}', 'library(lme4)', 'm <- lmer(trust ~ income + (1 | id), data = d)', '```', '',
  '$$', 'y_{it} = \\alpha_i + \\beta x_{it} + \\epsilon_{it}', '$$', '',
  '> Courts that lose trust lose compliance.', '',
  '## Methods', '', 'We surveyed 400 people in four cities (Garcia, 2017).', '',
  '## References', '',
  'Brown, A., Green, B., & White, C. (2020). Trust and courts. Journal of Law, 12(3), 1–20.',
  'Jones, D., & Lee, E. (2018). Compliance. Law Review, 4, 5–9.',
  'Smith, J. (2018). Declining trust. Courts Quarterly, 9, 1–12.',
  'Taylor, K. (2015). An unused source. Press.'].join('\n');
const A = E.analyze(DOC, {}), kinds = {};
A.paras.forEach(p => { if (p.head) kinds[p.kind || 'heading'] = (kinds[p.kind || 'heading'] || 0) + 1; });
assert.deepStrictEqual({ yaml: kinds.yaml, code: kinds.code, math: kinds.math, quote: kinds.quote, heading: kinds.heading }, { yaml: 1, code: 1, math: 1, quote: 1, heading: 3 });
assert.ok(kinds.refs >= 1, 'the reference list should be set aside');
assert.strictEqual(A.sents.length, 5, 'only the prose is read: ' + A.sents.map(s => s.text.slice(0, 30)).join(' | '));
// every block keeps its place in the text
A.paras.forEach(p => assert.ok(p.s >= 0 && p.e <= DOC.length && p.e > p.s));
assert.ok(/^library/.test(DOC.slice(A.paras.find(p => p.kind === 'code').s).split('\n')[1]));
// inline maths and code are not words; a web address is one token; a cross-reference is not a citation
const s2 = A.sents[1];
// since 0.34.0 the year of a citation, as in "Smith (2019)", is not a word either
assert.strictEqual(s2.nW, 6, 'words in sentence 2: ' + s2.T.filter(t => t.w).map(t => t.t).join(' '));
assert.ok(A.sents[2].T.some(t => t.mask && /^https/.test(t.t)));
assert.ok(!A.grid.terms.some(t => /beta|trust_score|lme4|lmer|alpha/.test(t.w)));
// the reference list against the citations
const titles = A.findings.map(f => f.title);
assert.ok(titles.includes('The year differs from the reference list: Smith 2019'), titles.join(' | '));
assert.ok(titles.includes('Not in the reference list: Garcia 2017'), titles.join(' | '));
assert.ok(titles.some(t => /^1 entry in the reference list is never cited/.test(t)), titles.join(' | '));
assert.ok(!titles.some(t => /Jones|Brown/.test(t)));
assert.deepStrictEqual(A.research.refs, { entries: 4, cited: 4, missing: 2, uncited: 1, checked: true });
// a plain draft is untouched: no blocks, no reference notes
const B = E.analyze('Trust fell sharply. This decline was widest among renters.\n\nIt cost $5 and then $10 more.', {});
assert.ok(!B.research.refs && !Object.keys(B.research.blocks).length);
assert.ok(B.sents[2].T.some(t => t.t === '5') && B.sents[2].T.some(t => t.t === '10'), 'prices are not maths');
console.log('block and reference checks passed');
