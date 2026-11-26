// Simple view hides lenses and changes no rule; citations in parentheses are not words.  Run:  node tests/simple.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const ui = read('src/ui.js'), engine = read('src/engine.js');

// 1 simple view names eight lenses, in three steps, and every one is a lens of the page
const SIMPLE = new Function('return ' + ui.match(/const SIMPLE=(\{[^}]*\})/)[1])();
const lenses = [...ui.matchAll(/\{k:'([a-z]+)',n:'/g)].map(m => m[1]);
assert.strictEqual(Object.keys(SIMPLE).length, 8);
Object.keys(SIMPLE).forEach(k => assert.ok(lenses.includes(k), k + ' is not a lens'));
assert.deepStrictEqual([...new Set(Object.values(SIMPLE))].sort(), [1, 2, 3]);
// every example is chosen by the kind of note, so that a note never shows an example of some other problem
assert.ok(/simEx=f=>\(\(SIMEX\[f\.lens\]\|\|\[\]\)\.find\(r=>r\[0\]\.test\(f\.title\)\)/.test(ui));
['SIMQ'].forEach(n => { const o = ui.match(new RegExp(n + '=\\{([\\s\\S]*?)\\},\\n'))[1]; Object.keys(SIMPLE).forEach(k => assert.ok(new RegExp('(?:^|[,{\\s])' + k + ':').test(o), n + ' has no entry for ' + k)); });

// 2 it only hides: the rule engine has no notion of it, and the page filters by lens when it shows a note
assert.ok(!/simpleOK|state\.simple|SIMPLE\[/.test(engine), 'the rule engine knows about simple view');
assert.ok(/const active=f=>!f\.dis&&!f\.ok&&simpleOK\(f\.lens\);/.test(ui), 'open notes are not filtered by lens in simple view');
assert.ok(/simpleOK=k=>!state\.simple\|\|!!SIMPLE\[k\]/.test(ui));

// 3 the school example raises notes in steps 2 and 3, and none that needs a claim
const SAMPLE_S = ui.match(/const SAMPLE_S=`([^`]*)`/)[1];
const notes = E.analyze(SAMPLE_S, {}).findings.filter(f => SIMPLE[f.lens]).map(f => f.lens + ':' + (f.s + 1));
assert.deepStrictEqual(notes, ['rhythm:2', 'topic:2', 'sv:2', 'clutter:3', 'topic:5', 'action:6', 'stress:6', 'clutter:7'], notes.join(' '));

// 4 a citation in parentheses, a year after a name and a numbered citation are each one token that is not a word
const sent = t => E.analyze(t, {}).sents[0], words = st => st.T.filter(t => t.w).map(t => t.t).join(' ');
const cite = t => sent('Tenants moved ' + t + ' and rents rose.').T.some(x => x.cite);
['(Smith, 2019)', '(Smith, 2019; Lee & Park, 2020; Okafor et al., 2021)', '(see Smith, 2019, p. 4; cf. Lee & Park, 2020a, 2020b)', '(World Health Organization, 2021)', '(van der Berg et al., 2019)', '(Smith and Jones 2019)', '(e.g., Okafor, Lee, & Park, 2021, pp. 12–14)', '(2019)', '(Diamond, in press)', '[3, 4, 12]', '[7–9]'].forEach(c => assert.ok(cite(c), c + ' was not read as a citation'));
['(the cap was introduced in 2015)', '(In 2019, 40% of tenants moved)', '(n = 2000)', '(Table 2)', '(the van was sold in 2019)', '[sic]'].forEach(c => assert.ok(!cite(c), c + ' was read as a citation'));
assert.strictEqual(words(sent('Several studies [3, 4, 12] and one review (Lee & Park, 2020, pp. 14–19) found that tenants moved less.')), 'Several studies and one review found that tenants moved less');
// the names and years no longer stand between a subject and its verb
const s6 = sent('Several studies [3, 4, 12] and one review (Lee & Park, 2020, pp. 14–19) found that tenants moved less.');
assert.strictEqual(s6.preV, 5);
const s4 = sent('Tenants in capped flats (Smith, 2019; Lee & Park, 2020; Okafor et al., 2021; Diamond, 2019) moved far less often than tenants in uncapped flats.');
assert.ok(s4.vTok >= 0 && s4.T[s4.vTok].t === 'moved', 'the main verb after a long citation was not found');
// and a long run of names cannot stall the page
const t0 = Date.now(); E.analyze('Tenants (' + 'Smith and Jones and Lee and Park and Kim and Cho '.repeat(6) + 'whatever) moved.', {}); assert.ok(Date.now() - t0 < 500);
console.log('simple.test.js: ok');
