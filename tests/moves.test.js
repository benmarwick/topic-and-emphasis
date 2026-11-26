// The order of the moves and where they fall (Signal phrases lens).  Run:  node tests/moves.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

const CONTEXT = 'Housing costs have received growing attention in recent years.', GAP = 'However, few studies have examined how renters respond.',
  AIM = 'In this study, we examine how renters responded to the 2019 cap.', FILL = 'Rents are a large share of household spending in most cities. Many households move when rents rise.';
const titles = (text, kind) => E.analyze(text, { kind }).findings.filter(f => f.lens === 'signals').map(f => f.title);
const has = (list, t) => list.includes(t);

// an introduction in the usual order raises no note about order or position
let t = titles([CONTEXT, FILL, GAP, FILL, AIM].join(' '), 'intro');
assert.deepStrictEqual(t, [], 'context, gap, aim, ending on the aim: ' + t.join(' | '));

// order: the gap before the context, the aim before the gap
t = titles([GAP, CONTEXT, FILL, AIM].join(' '), 'intro');
assert.ok(has(t, 'A gap is signalled before the context'), t.join(' | '));
t = titles([CONTEXT, AIM, FILL, GAP].join(' '), 'intro');
assert.ok(has(t, 'The aim is signalled before the gap'), t.join(' | '));

// position: an introduction that carries on long after its aim
t = titles([CONTEXT, GAP, AIM, FILL, FILL, FILL].join(' '), 'intro');
assert.ok(has(t, 'The introduction does not end on the aim'), t.join(' | '));

// an abstract: method before aim, result before method, and an ending with no finding
const RESULT = 'We found that renters moved less after the cap.', METHOD = 'We surveyed 412 renters in three cities.', IMPL = 'These findings have implications for housing policy.';
t = titles([RESULT, METHOD, AIM, IMPL, 'Rents are high.', 'Rents are still high.'].join(' '), 'abstract');
assert.ok(has(t, 'A result is signalled before a method') && has(t, 'A method is signalled before your aim'), t.join(' | '));
assert.ok(has(t, 'The abstract does not close on a finding or what it means'), t.join(' | '));
t = titles([CONTEXT, AIM, METHOD, RESULT, IMPL].join(' '), 'abstract');
assert.deepStrictEqual(t, [], 'an abstract in the usual order: ' + t.join(' | '));

// a paper: the aim first signalled late, and closing moves that stop well before the end
const body = Array.from({ length: 18 }, (_, i) => 'Households in district ' + (i + 1) + ' paid more rent than before.').join(' ');
const tail = 'Rents rose again. Rents rose once more. Many tenants moved. Some tenants stayed. Others left the city. A few bought homes. The city grew.';
t = titles([CONTEXT, GAP, 'This suggests that caps slow moves.', body, AIM, tail].join(' '), 'paper');
assert.ok(has(t, 'The aim is first signalled late'), t.join(' | '));
assert.ok(has(t, 'No closing move is signalled near the end'), t.join(' | '));
// with no closing move anywhere, the missing-move notes speak and this one stays silent
t = titles([CONTEXT, GAP, body, AIM, tail].join(' '), 'paper');
assert.ok(!has(t, 'No closing move is signalled near the end') && has(t, 'No sentence signals a limitation'), t.join(' | '));

// with no kind chosen, none of the new notes is raised
t = titles([GAP, CONTEXT, AIM, FILL, FILL, FILL].join(' '), '');
assert.ok(!t.some(x => /before the context|does not end|first signalled late|closing move/.test(x)), t.join(' | '));
console.log('move order and position checks passed');
