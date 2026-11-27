// Charged words and metadiscourse by kind: the two data files, the parser, and what must not be in the repository.  Run:  node tests/vad.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ui = read('src/ui.js'), eng = read('src/engine.js');

// 1 the Warriner norms: 13,915 lemmas, three ratings each between 1 and 9
const rows = read('data/norms/vad_Warriner_et_al_2013.tsv').split('\n').filter(l => l && l[0] !== '#').slice(1).map(l => l.split('\t'));
assert.strictEqual(rows.length, 13915, 'rows: ' + rows.length);
for (const r of rows) assert.ok(r.length === 4 && r[0] === r[0].toLowerCase() && r.slice(1).every(v => +v >= 1 && +v <= 9), 'a bad row: ' + r.join(' '));
const get = w => rows.find(r => r[0] === w).slice(1).map(Number);
assert.ok(get('disaster')[0] < 3 && get('happy')[0] > 7, 'the valence scale is not the published one');

// 2 the metadiscourse list: Hyland's ten categories, strings only
const J = JSON.parse(read('data/lists/metadiscourse_hyland2005.json'));
const cats = [...Object.keys(J.interactive), ...Object.keys(J.interactional)];
assert.deepStrictEqual(cats, ['transitions', 'frame_markers', 'endophoric_markers', 'evidentials', 'code_glosses', 'hedges', 'boosters', 'attitude_markers', 'self_mentions', 'engagement_markers']);
const cues = cats.flatMap(c => (J.interactive[c] || J.interactional[c]));
assert.ok(cues.length >= 450 && cues.length <= 520, 'items: ' + cues.length);
assert.ok(cues.every(c => typeof c === 'string' && /^[a-z(][a-z .'’()-]*$/.test(c) && c.length < 45), 'an item is not a plain string');
assert.ok(/Hyland/.test(J.reference) && !fs.existsSync(path.join(ROOT, 'data/lists/metadiscourse_starter.json')), 'the starter set is still there');
for (const c of cats) assert.ok(ui.includes(c + ':['), 'no name for the category ' + c);
// no wildcard: an item is matched whole
assert.ok(!/metadiscourse[\s\S]{0,400}\\w\*/.test(ui.slice(ui.indexOf('async function mdLoad'), ui.indexOf('async function mdLoad') + 900)), 'a wildcard has crept into the matching of items');

// 2b the three other optional lists
const P = JSON.parse(read('data/lists/plain_words.json'));
assert.ok(P.simple.length >= 300 && P.hidden.length >= 140 && [...P.simple, ...P.hidden].every(x => x.length === 2 && x[0] && x[1]), 'the plain-language pairs are not pairs');
for (const [p] of [...P.simple, ...P.hidden]) new RegExp('(?:' + p + ')', 'i');
assert.ok(P.simple.some(x => /utilize/.test(x[0]) && x[1] === 'use') && P.hidden.some(x => /a decision/.test(x[0]) && x[1] === 'decide'));
const Cn = JSON.parse(read('data/lists/connectives_en_dimlex.json'));
assert.strictEqual(Cn.items.length, 142);
assert.ok(/BY-NC-SA/.test(Cn.licence) && Cn.items.every(x => x[1].length && x[1].every(s => ['Comparison', 'Contingency', 'Expansion', 'Temporal'].includes(s))), 'a connective has no sense');
assert.ok(Cn.items.find(x => x[0] === 'however')[1][0] === 'Comparison' && Cn.items.find(x => x[0] === 'with')[2] === 1 && Cn.items.find(x => x[0] === 'because')[2] === 0);
const Sh = JSON.parse(read('data/lists/shell_nouns.json'));
assert.strictEqual(Sh.items.length, 959);
assert.ok(Sh.items.every(x => /^[a-z-]+$/.test(x[0]) && x[1] >= 0 && x[1] <= 1), 'a shell noun has no share');
assert.ok(!/OPT\.|plain_words|en_dimlex|shell_nouns|hyland2005/.test(eng), 'the rule engine refers to the optional lists');

// 3 the NRC VAD Lexicon may not be passed on: it is nowhere in the repository, and the page credits it when a copy is supplied
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.name === '.git' || e.name === 'node_modules' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
assert.deepStrictEqual(walk(ROOT).filter(f => /nrc[-_ ]?vad/i.test(path.basename(f))), [], 'a file of the NRC VAD Lexicon is in the repository');
assert.ok(ui.includes('This page makes use of the NRC VAD Lexicon, created by Saif M. Mohammad at the National Research Council Canada'), 'the credit the lexicon asks for is missing');

// 4 the parser puts both lists on one scale and keeps expressions of more than one word apart
const VADP = +ui.match(/VADP=([0-9.]+)/)[1];
const vadParse = new Function('VADP', 'return ' + ui.slice(ui.indexOf('function vadParse(txt)'), ui.indexOf('\nfunction vadSet')))(VADP);
const W = vadParse('# note\nword\tvalence\tarousal\tdominance\ncalm\t7.00\t2.00\t6.00\nwar\t1.00\t9.00\t3.00\n');
assert.deepStrictEqual(W.M.get('calm'), [0.5, -0.75, 0.25]);
assert.deepStrictEqual(W.M.get('war'), [-1, 1, -0.5]);
const N = vadParse('term\tvalence\tarousal\tdominance\na bit\t-0.096\t-0.264\t-0.214\nwar\t-0.9\t0.8\t0.1\n');
assert.deepStrictEqual(N.M.get('war'), [-0.9, 0.8, 0.1]);
assert.deepStrictEqual(N.mwe.get('a')[0][0], ['a', 'bit']);
assert.ok(VADP > 0 && VADP <= 0.1);

// 5 counts only: the rule engine knows neither list
assert.ok(!/\bVAD\b|vadScan|metadiscourse_starter/.test(eng), 'the rule engine refers to the optional lists');
console.log('vad: ' + rows.length + ' rated lemmas, ' + cues.length + ' metadiscourse items, ' + (P.simple.length + P.hidden.length) + ' plain-language pairs, ' + Cn.items.length + ' connectives, ' + Sh.items.length + ' shell nouns, and no copy of the NRC lexicon in the repository');
