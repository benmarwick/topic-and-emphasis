// Section context: headings to sections, and the promise that the lens only annotates.  Run:  node tests/sections.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ui = read('src/ui.js'), eng = read('src/engine.js');
const i = ui.indexOf('const SECS='), k = ui.indexOf(',SECN=', i);
const SECS = new Function('return ' + ui.slice(i + 'const SECS='.length, k))();
const sec = name => { const h = SECS.find(x => x[2].test(name)); return h ? h[0] : ''; };

// 1 the usual names of the parts of a research article are recognised, and other headings are left alone
const want = { 'Abstract': 'abs', 'Summary': 'abs', 'Introduction': 'intro', 'Background': 'intro', 'Literature review': 'lit', 'Related work': 'lit', 'Previous research': 'lit',
  'Methods': 'meth', 'Method': 'meth', 'Methodology': 'meth', 'Materials and methods': 'meth', 'Data and methods': 'meth', 'Participants': 'meth', 'Results': 'res', 'Findings': 'res',
  'Results and discussion': 'res', 'Discussion': 'disc', 'General discussion': 'disc', 'Conclusion': 'disc', 'Conclusions': 'disc', 'Limitations': 'disc',
  'Acknowledgements': '', 'References': '', 'Appendix': '', 'Rent caps in three cities': '', 'Methodical doubts': '' };
for (const [name, key] of Object.entries(want)) assert.strictEqual(sec(name), key, 'heading “' + name + '” was taken for ' + (sec(name) || 'no section'));
assert.deepStrictEqual(SECS.map(x => x[0]), ['abs', 'intro', 'lit', 'meth', 'res', 'disc']);

// 2 annotate only: the rule engine knows nothing of sections, so the same text gives the same notes and the same receipt
assert.ok(!/imrad|secMap|secLine/.test(eng), 'the rule engine refers to sections');
assert.ok(!/lens:'imrad'/.test(ui), 'a note is raised in the Section context lens');
const line = ui.slice(ui.indexOf('function secLine(f)'), ui.indexOf('function imradHTML'));
assert.ok(!/\.dis\s*=|\.ok\s*=|dismissed\[|findings\.(push|splice|filter)/.test(line), 'the section line changes a note');
assert.ok(line.includes("'<p class=\"secn\"'"), 'the section line is not a labelled line in the note');
assert.ok(!/imrad:[123]/.test(ui.slice(ui.indexOf('const SIMPLE='), ui.indexOf('const SIMPLE=') + 200)), 'Section context is in the simple view');

// 3 links that open a step
assert.ok(ui.includes("/^#step([123])$/.exec(location.hash)") && ui.includes("location.hash==='#tutorial'"), 'the step links are gone');
for (const h of ['#tutorial', '#step1', '#step2', '#step3', '#simple']) assert.ok(ui.includes("lk('" + h + "'"), 'the instructor page does not list ' + h);
console.log('sections: ' + Object.keys(want).length + ' headings sorted, the engine knows no sections, and five links are listed for instructors');
