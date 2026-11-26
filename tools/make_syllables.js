// Build src/syllables.txt: the words whose syllable count the engine's spelling rule gets
// wrong, with the count from the CMU Pronouncing Dictionary (first pronunciation listed).
//
//   git clone --depth 1 https://github.com/cmusphinx/cmudict /tmp/cmudict
//   git clone --depth 1 https://github.com/berenslab/llm-excess-vocab /tmp/excess
//   node tools/make_syllables.js /tmp/cmudict/cmudict.dict /tmp/excess/results/yearly-counts.csv.gz
//
// A word is kept if the rule and the dictionary disagree and the word is either on one of
// the page's own word lists or is used in at least 300 abstracts in the yearly counts that
// Kobak et al. (2025) published (MIT). Neither source file is copied into the repository.
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const [dictPath, countsPath] = process.argv.slice(2);
if (!dictPath) { console.error('usage: node tools/make_syllables.js cmudict.dict [yearly-counts.csv.gz]'); process.exit(1); }

const dict = new Map();
fs.readFileSync(dictPath, 'utf8').split('\n').forEach(l => {
  const p = l.split('#')[0].trim().split(/\s+/);
  if (p.length < 2 || /\(\d\)$/.test(p[0]) || !/^[a-z]+$/.test(p[0])) return;
  dict.set(p[0], p.slice(1).filter(x => /\d$/.test(x)).length);
});
const keep = new Set();
['src/ngsl.txt', 'src/nawl.txt', 'src/dalechall.txt', 'src/excess.txt', 'src/jargon.txt'].forEach(f => read(f).split(/\s+/).forEach(w => { if (w) keep.add(w); }));
if (countsPath) zlib.gunzipSync(fs.readFileSync(countsPath)).toString('utf8').split('\n').slice(1).forEach(l => {
  const c = l.split(','); if (!/^[a-z]+$/.test(c[0])) return;
  let s = 0; for (let i = 1; i < c.length; i++) s += +c[i] || 0;
  if (s >= 300) keep.add(c[0]);
});
const by = {}; let n = 0, seen = 0;
keep.forEach(w => {
  const k = dict.get(w); if (k == null) return; seen++;
  if (!/[aeiouy]/.test(w) || (w.length <= 3 && !/[aeiouy].*[aeiouy]|[aeiouy]$/.test(w) && k > 1)) return; // spelled-out initialisms
  if (E.sylGuess(w) !== k) { (by[k] || (by[k] = [])).push(w); n++; }
});
const out = Object.keys(by).sort((a, b) => a - b).map(k => k + ':' + by[k].sort().join(' ')).join('|');
fs.writeFileSync(path.join(ROOT, 'src/syllables.txt'), out + '\n');
console.log(seen + ' words checked against the dictionary; ' + n + ' exceptions written to src/syllables.txt (' + out.length + ' bytes)');
