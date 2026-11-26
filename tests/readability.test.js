// Readability figures on a fixed set of passages. Run:  node tests/readability.test.js
// It fails if the engine's own figures drift from tests/readability/ours.json, or if the
// formulas that need no syllable count stop matching an independent count.
// Reference figures from other calculators, when present, are printed beside ours.
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') +
  ';const DALE_RAW=' + j('src/dalechall.txt') + ';const EXCESS_RAW=' + j('src/excess.txt') + ';' +
  read('src/engine.js') + ';return E;')();

const DIR = path.join(__dirname, 'readability');
const files = fs.readdirSync(path.join(DIR, 'texts')).filter(f => f.endsWith('.txt')).sort();
const KEYS = ['fre', 'fk', 'ari', 'smog', 'cl', 'fog', 'lix', 'dale'];
const r2 = v => Math.round(v * 100) / 100;

const ours = {};
files.forEach(f => {
  const text = fs.readFileSync(path.join(DIR, 'texts', f), 'utf8');
  const X = E.analyze(text, {}).research.read;
  ours[f] = { fre: r2(X.fre), fk: r2(X.fk), ari: r2(X.ari), smog: r2(X.smog), cl: r2(X.cl), fog: r2(X.fog), lix: r2(X.lix), dale: r2(X.dale.score) };

  // an independent count for the formulas that need no syllables
  const words = text.match(/[\p{L}\p{N}]+(?:[-'’][\p{L}\p{N}]+)*/gu) || [];
  const sents = (text.match(/[.!?]+(?=\s|$)/g) || []).length;
  const letters = words.reduce((a, w) => a + (w.match(/\p{L}/gu) || []).length, 0);
  const chars = words.reduce((a, w) => a + (w.match(/[\p{L}\p{N}]/gu) || []).length, 0);
  const long = words.filter(w => (w.match(/\p{L}/gu) || []).length > 6).length;
  const n = words.length, asl = n / sents;
  const cl = 0.0588 * (100 * letters / n) - 0.296 * (100 * sents / n) - 15.8;
  const ari = 4.71 * (chars / n) + 0.5 * asl - 21.43;
  const lix = asl + 100 * long / n;
  assert.ok(Math.abs(cl - X.cl) < 0.01, f + ': Coleman-Liau ' + X.cl + ' vs ' + cl);
  assert.ok(Math.abs(ari - X.ari) < 0.01, f + ': ARI ' + X.ari + ' vs ' + ari);
  assert.ok(Math.abs(lix - X.lix) < 0.01, f + ': LIX ' + X.lix + ' vs ' + lix);
});

const snap = path.join(DIR, 'ours.json');
if (process.argv.includes('--update') || !fs.existsSync(snap)) {
  fs.writeFileSync(snap, JSON.stringify(ours, null, 1) + '\n');
  console.log('wrote tests/readability/ours.json');
} else {
  const was = JSON.parse(fs.readFileSync(snap, 'utf8'));
  files.forEach(f => KEYS.forEach(k => assert.ok(was[f] && Math.abs(was[f][k] - ours[f][k]) < 0.011,
    f + ' ' + k + ': was ' + (was[f] && was[f][k]) + ', now ' + ours[f][k] + ' (run with --update if the change is intended)')));
}

const refs = ['reference-textstat.json', 'reference-quanteda.json'].filter(f => fs.existsSync(path.join(DIR, f))).map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')));
const EXACT = new Set(['cl', 'ari', 'lix']);
let far = 0;
files.forEach(f => {
  console.log('\n' + f);
  console.log('  ' + ['', ...KEYS].map(k => k.padStart(8)).join(''));
  console.log('  ' + ['ours', ...KEYS.map(k => ours[f][k].toFixed(1))].map(s => String(s).padStart(8)).join(''));
  refs.forEach(R => {
    const t = R.texts[f]; if (!t) return;
    console.log('  ' + [R.tool.slice(0, 8), ...KEYS.map(k => {
      if (t[k] == null) return '–';
      const d = Math.abs(t[k] - ours[f][k]), lim = k === 'fre' || k === 'lix' ? 5 : EXACT.has(k) ? 0.5 : 1;
      if (d > lim) far++;
      return Number(t[k]).toFixed(1) + (d > lim ? '*' : '');
    })].map(s => String(s).padStart(8)).join(''));
  });
});
console.log('\n' + files.length + ' passages. ' + (refs.length ? refs.length + ' reference set(s); ' + far + ' figure(s) marked * differ from ours by more than the margin in tests/readability/README.md.' : 'No reference files yet: see tests/readability/README.md.'));
console.log('readability checks passed');
