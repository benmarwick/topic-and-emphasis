// How well do this page's counts track how hard readers find a text?
//
// The CLEAR corpus (Crossley et al. 2023, https://doi.org/10.3758/s13428-022-01802-x) holds
// 4,724 reading passages for school pupils, each with an ease score built from teachers'
// judgements (the column BT_easiness; higher is easier). This script runs the rule engine
// over every passage and reports how each count correlates with that score.
//
// The corpus is not part of this repository. Get its CSV file from the authors' release,
// then:   node tests/validation/clear.js path/to/CLEAR.csv
// It writes tests/validation/results.json and tests/validation/RESULTS.md.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..', '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';const DALE_RAW=' + j('src/dalechall.txt') +
  ';const EXCESS_RAW=' + j('src/excess.txt') + ';const SYL_RAW=' + JSON.stringify(read('src/syllables.txt').trim()) + ';const JARGON_RAW=' + j('src/jargon.txt') + ';' +
  read('src/engine.js') + ';return E;')();
const file = process.argv[2];
if (!file) { console.error('usage: node tests/validation/clear.js path/to/CLEAR.csv'); process.exit(1); }

function parseCSV(t) { const rows = []; let row = [], f = '', q = false; t = t.replace(/^﻿/, '');
  for (let i = 0; i < t.length; i++) { const c = t[i];
    if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true; else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; } else if (c !== '\r') f += c; }
  if (f || row.length) { row.push(f); rows.push(row); } return rows; }
const rows = parseCSV(fs.readFileSync(file, 'utf8')), head = rows[0], iT = head.indexOf('Excerpt'), iB = head.indexOf('BT_easiness');
if (iT < 0 || iB < 0) { console.error('The file needs the columns Excerpt and BT_easiness.'); process.exit(1); }

let N = null;
try { const d = 'data/norms/'; N = E.parseNorms({ conc: read(d + 'Concreteness_ratings_Brysbaert_et_al_BRM.txt'), aoa: read(d + 'AoA_ratings_Kuperman_et_al_BRM.csv'), freq: read(d + 'SUBTLEX-US_frequency_list_with_PoS_and_Zipf.csv'), prev: read(d + 'word_prevalence_Brysbaert_et_al_2019.txt') }); } catch (e) { N = null; }

const cols = {}, norm = new Set(), push = (k, v, isNorm) => { (cols[k] || (cols[k] = [])).push(v == null || !isFinite(v) ? NaN : v); if (isNorm) norm.add(k); };
rows.slice(1).forEach(r => { const text = r[iT], bt = parseFloat(r[iB]); if (!text || isNaN(bt)) return;
  const A = E.analyze(text, {}), R = A.research, X = R.read; if (!X) return; const nS = A.stats.nS;
  push('ease', bt);
  push('Flesch reading ease', X.fre); push('Flesch-Kincaid grade', X.fk); push('ARI', X.ari); push('SMOG', X.smog); push('Coleman-Liau', X.cl); push('Gunning Fog', X.fog); push('LIX', X.lix);
  push('Dale-Chall score', X.dale.score); push('Words off the Dale-Chall list (%)', X.dale.pdw);
  push('Words per sentence', A.stats.avg); push('Letters per word', R.simple.lpw);
  push('Running words on NGSL or NAWL (%)', 100 * R.cover.share); push('General science jargon (%)', 100 * R.jargon.share);
  push('Word variety, MTLD', R.lex.mtld); push('Word variety, MATTR', R.lex.mattr);
  push('Connectives per 1,000 words', R.conn.per); push('Content words already given (%)', R.given.cw ? 100 * R.given.old / R.given.cw : NaN);
  push('Neighbouring sentences sharing a content word (%)', R.over.lp ? 100 * R.over.lh / R.over.lp : NaN);
  push('Median words before the main verb', R.pre.median); push('Passives per sentence', R.pas.n / nS); push('Nominalisations per 100 words', R.phrase.nomPer);
  push('Personal pronouns per 100 words', R.given.per100); push('Negatives per 1,000 words', R.neg.per);
  if (N) { const M = E.norms(A, N);
    push('Mean age of acquisition (word norms)', M.aoa.mean, 1); push('Mean concreteness (word norms)', M.conc.mean, 1); push('Mean Zipf frequency (word norms)', M.zipf.mean, 1);
    push('Mean prevalence (word norms)', M.prev.mean, 1); push('Rare words, Zipf under 3 (%) (word norms)', 100 * M.zipf.rare / (M.zipf.n + M.zipf.miss), 1); }
});
const y = cols.ease, keys = Object.keys(cols).filter(k => k !== 'ease');
const corr = (a, b) => { let n = 0, sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0; for (let i = 0; i < a.length; i++) { const p = a[i], q = b[i]; if (isNaN(p) || isNaN(q)) continue; n++; sa += p; sb += q; saa += p * p; sbb += q * q; sab += p * q; } return (n * sab - sa * sb) / Math.sqrt((n * saa - sa * sa) * (n * sbb - sb * sb)); };
// least squares by the normal equations, and a five-fold cross-validated correlation
function ols(X, Y) { const p = X[0].length, A = Array.from({ length: p }, () => new Array(p + 1).fill(0));
  X.forEach((r, i) => { for (let a = 0; a < p; a++) { for (let b = 0; b < p; b++) A[a][b] += r[a] * r[b]; A[a][p] += r[a] * Y[i]; } });
  for (let c = 0; c < p; c++) { let m = c; for (let r = c + 1; r < p; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r; [A[c], A[m]] = [A[m], A[c]]; const d = A[c][c] || 1e-12;
    for (let k = c; k <= p; k++) A[c][k] /= d; for (let r = 0; r < p; r++) if (r !== c) { const f = A[r][c]; for (let k = c; k <= p; k++) A[r][k] -= f * A[c][k]; } }
  return A.map(r => r[p]); }
function cv(ks) { const idx = []; for (let i = 0; i < y.length; i++) if (ks.every(k => !isNaN(cols[k][i]))) idx.push(i);
  const mean = {}, sd = {}; ks.forEach(k => { const v = idx.map(i => cols[k][i]), m = v.reduce((a, b) => a + b, 0) / v.length; mean[k] = m; sd[k] = Math.sqrt(v.reduce((a, b) => a + (b - m) * (b - m), 0) / v.length) || 1; });
  const row = i => ks.map(k => (cols[k][i] - mean[k]) / sd[k]).concat(1), pred = new Array(y.length).fill(NaN);
  for (let f = 0; f < 5; f++) { const tr = idx.filter((_, q) => q % 5 !== f), te = idx.filter((_, q) => q % 5 === f), b = ols(tr.map(row), tr.map(i => y[i])); te.forEach(i => { pred[i] = row(i).reduce((a, v, q) => a + v * b[q], 0); }); }
  return corr(pred, y); }
const r2 = v => Math.round(v * 100) / 100;
const single = keys.map(k => ({ measure: k, r: r2(corr(cols[k], y)), norms: norm.has(k) })).sort((a, b) => Math.abs(b.r) - Math.abs(a.r));
const plain = keys.filter(k => !norm.has(k));
const combined = { flesch_reading_ease_alone: r2(cv(['Flesch reading ease'])), all_counts_without_word_norms: r2(cv(plain)), all_counts_with_word_norms: N ? r2(cv(keys)) : null };
const out = { corpus: 'CLEAR (Crossley et al. 2023)', passages: y.length, single, combined };
fs.writeFileSync(path.join(__dirname, 'results.json'), JSON.stringify(out, null, 1) + '\n');
const md = ['# How the counts track judged reading ease', '',
  'Produced by `node tests/validation/clear.js` on the ' + y.length + ' passages of the CLEAR corpus (Crossley et al. 2023, <https://doi.org/10.3758/s13428-022-01802-x>). Each passage has an ease score built from teachers\' judgements. The figure is the Pearson correlation between a count and that score: a negative value means the count rises as texts get harder.', '',
  'The passages are reading texts for school pupils, not research writing, so read the table as a rough guide to which counts track difficulty at all.', '',
  '| Count | Correlation with judged ease |', '|---|---|'].concat(single.map(s => '| ' + s.measure + ' | ' + (s.r > 0 ? '+' : s.r < 0 ? '−' : '') + Math.abs(s.r).toFixed(2) + ' |'), ['',
  'Combined in a linear model and checked on passages held out five times over:', '',
  '| Counts used | Correlation of predicted with judged ease |', '|---|---|',
  '| Flesch reading ease alone | ' + combined.flesch_reading_ease_alone.toFixed(2) + ' |',
  '| Every count above except the word norms | ' + combined.all_counts_without_word_norms.toFixed(2) + ' |'],
  N ? ['| Every count above | ' + combined.all_counts_with_word_norms.toFixed(2) + ' |'] : [], ['']);
fs.writeFileSync(path.join(__dirname, 'RESULTS.md'), md.join('\n'));
console.log(md.slice(6).join('\n'));
