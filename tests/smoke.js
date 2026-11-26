// Smoke test for the rule engine. Run after building:  node tests/smoke.js
// It checks that the page's script parses, that the engine runs on the built-in samples,
// and that the same text always produces the same notes.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];
new Function(script); // throws on a syntax error

const engineSrc = script.match(/\/\*ENGINE-START\*\/([\s\S]*)\/\*ENGINE-END\*\//)[1];
const E = new Function(engineSrc + ';return E;')();
const sample = name => script.match(new RegExp('const ' + name + '=`([\\s\\S]*?)`;'))[1];
const notes = A => A.findings.map(f => f.lens + '|' + f.s + '|' + f.title);

for (const name of ['SAMPLE', 'SAMPLE2']) {
  const text = sample(name);
  const a = E.analyze(text, {}), b = E.analyze(text, {});
  assert(a.sents.length > 0, name + ': no sentences found');
  assert(a.findings.length > 0, name + ': no notes produced');
  assert.deepStrictEqual(notes(a), notes(b), name + ': two runs disagree');
  assert(a.research && a.research.over, name + ': no research measures');
  console.log(name + ': ' + a.sents.length + ' sentences, ' + a.findings.length + ' notes');
}

// A few rules, each on a sentence written to trip it.
const has = (text, lens, re, opts) => E.analyze(text, opts || {}).findings.some(f => f.lens === lens && re.test(f.title));
assert(has('The the survey ran for two years.', 'slips', /Repeated word/), 'doubled word');
assert(has('We found a casual effect on wellbeing in the second wave.', 'slips', /casual effect/), 'look-alike word');
assert(has('There are many reasons for this decline in contact.', 'clutter', /Empty opener/), 'empty opener');
assert(has('This result is not uncommon in studies of retirement.', 'clutter', /Two negatives/), 'stacked negative');
assert(has('It is very clear that groups matter.', 'terms', /avoid list/, { list: '-very' }), 'own word list');
assert(has('Retirement removes the daily contact that work provides for most people.', 'source', /match your source/,
  { source: 'Retirement removes the daily contact that work provides.' }), 'source overlap');
console.log('all checks passed');
