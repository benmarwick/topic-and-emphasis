// The built-in example and the tutorial that walks through it, and the header cards.  Run:  node tests/tutorial.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const ui = read('src/ui.js');
const SAMPLE = ui.match(/const SAMPLE=`([^`]*)`/)[1];
const notes = t => E.analyze(t, {}).findings.map(f => f.lens + ':' + (f.s + 1));

// 1 the example raises exactly the five notes the tutorial names, in the order it takes them
assert.deepStrictEqual(notes(SAMPLE), ['clutter:2', 'sv:3', 'voice:5', 'action:6', 'stress:7'], notes(SAMPLE).join(' '));
const order = [...ui.matchAll(/\{lens:'([a-z]+)',act:/g)].map(m => m[1]);
assert.deepStrictEqual(order, ['clutter', 'sv', 'voice', 'action', 'stress'], 'the tutorial takes the notes in another order: ' + order);

// 2 the two one-tap fixes exist
const A = E.analyze(SAMPLE, {}), by = l => A.findings.find(f => f.lens === l);
assert.ok(by('clutter').fix && by('clutter').fix.text === 'to', 'clutter has no one-tap fix');
assert.ok(by('action').fix && by('action').fix.text === 'compared', 'action has no one-tap fix');

// 3 the rewrites the tutorial gives clear every note but the passive, which is the one to weigh and keep
let t = SAMPLE;
const sub = (a, b) => { assert.ok(typeof a === 'string' ? t.includes(a) : a.test(t), 'the example no longer contains: ' + a); t = t.replace(a, b); };
sub(' in order to', ' to');
sub(', which ran for two years,', '');
sub('We carried out a comparison of', 'We compared');
sub('Those who joined a group recovered most of their lost contact within a year, however.', 'Within a year, however, those who joined a group recovered most of their lost contact.');
assert.deepStrictEqual(notes(t), ['voice:5'], 'after the tutorial\'s rewrites: ' + notes(t).join(' '));
// the two rewrites done by hand are the ones the tutorial performs for "Show me"
assert.ok(ui.includes("tourEdit(f,/, which ran for two years,/,'')"), 'the subject-verb step has changed');
assert.ok(ui.includes('Within a year, however, those who joined a group recovered most of their lost contact.'), 'the stress step has changed');

// 4 the header cards: twelve, each with a source that is in the reference list, none raising a note
const cards = [...ui.slice(ui.indexOf('const DGS=['), ui.indexOf('function dgShow')).matchAll(/\['((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)','([a-z0-9]+)','((?:[^'\\]|\\.)*)'\]/g)];
assert.strictEqual(cards.length, 12, 'header cards: ' + cards.length);
const strip = s => s.replace(/[{}\[\]]/g, '');
for (const c of cards) {
  const text = strip(c[1]) + ' ' + strip(c[2]) + ' ' + c[3] + ' ' + strip(c[4]);
  assert.deepStrictEqual(notes(text), [], 'a header card raises a note: ' + text + ' → ' + notes(text).join(' '));
  assert.ok(/\{[^}]+\}/.test(c[1]) && /\[[^\]]+\]/.test(c[2]), 'a header card lacks its marks: ' + text);
  assert.ok(ui.includes("['" + c[5] + "','"), 'no reference with the key ' + c[5]);
}
// the subtitle
assert.deepStrictEqual(notes('A revision workbench for research writing, built on Gopen and Swan’s “The Science of Scientific Writing” (1990).'), []);
console.log('tutorial: the example has its five notes, the tutorial clears them, and ' + cards.length + ' header cards raise none');
