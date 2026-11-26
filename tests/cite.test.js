// Citation keys in the style of pandoc, Quarto and R Markdown.  Run:  node tests/cite.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const notes = (t, re) => E.analyze(t, {}).findings.filter(f => re.test(f.title));

// a bracketed key counts as a citation, exactly as an author-date citation does
const base = 'Previous studies have shown that trust in courts is declining';
assert.strictEqual(notes(base + '.', /^Earlier work with no citation/).length, 1);
[' (Marwick 2026).', ' [@Marwick2026].', ' [@Marwick2026; @smith_trust_2019, p. 4].', ' [-@Marwick2026].', ' \\citep{Marwick2026}.', ' \\parencite[p. 4]{Marwick2026}.'].forEach(c =>
  assert.strictEqual(notes(base + c, /^Earlier work with no citation/).length, 0, 'not read as a citation: ' + c));
assert.strictEqual(notes('Some researchers argue that courts matter [@Marwick2026].', /^A view with no one named/).length, 0);
assert.strictEqual(notes('As @Marwick2026 showed, earlier work has been reported on this question.', /^Earlier work with no citation/).length, 0);

// the key and its page reference are not words, and the key is never a term
const A = E.analyze('Trust in courts is declining [@Marwick2026, p. 4]. Trust in courts fell again [@Marwick2026; @Lee2021].', {});
assert.strictEqual(A.sents[0].nW, 5, 'words in sentence 1: ' + A.sents[0].nW);
assert.ok(!A.grid.terms.some(t => /marwick|lee2021/.test(t.w)), 'a citation key became a term');
assert.ok(A.sents[0].cite, 'the closing citation was not set aside from the stress position');

// a key outside brackets stands for the author: one word, not a term
const B = E.analyze('@Marwick2026 argues that trust matters. @Marwick2026 also measures it.', {});
assert.strictEqual(B.sents[0].nW, 5);
assert.ok(!B.grid.terms.some(t => /marwick/.test(t.w)));

// an e-mail address is not a citation
assert.strictEqual(notes('Previous studies have shown this, so write to ben@example.org for details.', /^Earlier work with no citation/).length, 1);
console.log('citation-key checks passed');
