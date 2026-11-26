// The optional phrase bank (data/phrases/academic-phrases.json).  Run:  node tests/phrases.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..');
const D = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/phrases/academic-phrases.json'), 'utf8'));

assert.strictEqual(D.licence, 'GPL-3.0-or-later');
assert.ok(/Springer Nature and Adrian Wallwork/.test(D.basis), 'the permission the package states is carried with the data');
assert.strictEqual(D.cats.length, 57);
assert.deepStrictEqual(D.cats.map(c => c.n), Array.from({ length: 57 }, (_, i) => i + 1));
let n = 0;
for (const c of D.cats) {
  assert.ok(c.title && c.items.length, 'category ' + c.n + ' has a title and frames');
  for (const it of c.items) {
    n++;
    const slots = (it.t.match(/\[\{\d\}\]/g) || []).length, groups = (it.c || []).length;
    assert.strictEqual(slots, groups, 'every blank has its choices: ' + it.t);
    (it.c || []).forEach(g => assert.ok(g.length >= 1 && g.every(x => typeof x === 'string') && g.some(x => x), 'choices are words; an empty one means the word may be left out'));
  }
}
assert.ok(n > 550 && n < 650, n + ' frames');
const known = new Set(D.cats.map(c => c.n));
for (const [name, list] of D.sections) assert.ok(name && list.length && list.every(x => known.has(x)), 'section ' + name);

// the categories the page maps jobs and notes onto all exist
const ui = fs.readFileSync(path.join(ROOT, 'src/ui.js'), 'utf8');
for (const name of ['JOBCAT', 'PBCAT']) {
  const m = ui.match(new RegExp('const ' + name + '=(\\{[^;]*\\});'));
  assert.ok(m, name + ' is defined');
  const map = new Function('return ' + m[1])();
  for (const k of Object.keys(map)) assert.ok(map[k].length && map[k].every(x => known.has(x)), name + '.' + k);
}
// the phrase bank is optional data: it is not compiled into the page
assert.ok(!fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8').includes('Few researchers have addressed'), 'no frame is built into index.html');
console.log('phrase bank checks passed: ' + n + ' frames in ' + D.cats.length + ' groups');
