// The four pictures made from the word lists: they exist, they are labelled and reachable by keyboard, and the rule engine knows nothing of them.  Run:  node tests/pictures.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const ui = read('src/ui.js'), eng = read('src/engine.js'), css = read('src/head.html');
const fn = name => { const i = ui.indexOf('function ' + name + '('), k = ui.indexOf('\nfunction ', i + 10); assert.ok(i >= 0, 'missing: ' + name); return ui.slice(i, k < 0 ? i + 6000 : k); };
for (const [name, cls] of [['abHeat', 'abc'], ['abPlot', 'abd'], ['stanceHTML', 'sth'], ['plainSlopeHTML', 'slg']]) {
  const s = fn(name);
  assert.ok(/role="img"/.test(s) && /aria-label="/.test(s), name + ' has no text alternative');
  assert.ok(s.includes('class="' + cls) && /tabindex="0"/.test(s) && /tipA\(/.test(s), name + ': a mark has no tooltip or cannot be reached by keyboard');
  assert.ok(/class="lm-key"/.test(s), name + ' does not say how to read it');
}
// every text in the pictures is at least 9.5px, and no mark relies on colour alone: values are written beside the bars and in the blocks
for (const m of css.slice(css.indexOf('/* 0.46.0: pictures')).matchAll(/font:\d+ ([\d.]+)px/g)) assert.ok(+m[1] >= 9.5, 'a label is smaller than 9.5px: ' + m[0]);
assert.ok(fn('abHeat').includes('class="abv"') && fn('stanceHTML').includes('class="stv"') && fn('plainSlopeHTML').includes('class="slv"'), 'a picture has no direct labels');
// counts only
assert.ok(!/abHeat|abPlot|stanceHTML|plainSlopeHTML|concScan|MWEC/.test(eng), 'the rule engine refers to the pictures');
// the Map of the meaning views: a halo on every dot, and a first drawing in the order of the sentences that stops for anyone who asks for less motion
{
  const i = ui.indexOf("else if(st.tab==='map')"), map = ui.slice(i, ui.indexOf("\n  else if(", i + 10));
  assert.ok(i > 0 && /MVMAP\.t0/.test(map) && /motionOK\(\)/.test(map) && /i\*step-el/.test(map), 'the Map does not time its dots by the order of the sentences');
  assert.ok(/class="mvwalk">'\+pts\.slice\(1\)\.map/.test(map) && /pathLength="1"/.test(map), 'the reading-order line is not drawn one join at a time');
  assert.ok(/\[data-mvt\]'\)\)\)\{[^}]*MVMAP\.t0=performance\.now\(\)/.test(ui), 'choosing the Map does not start its drawing');
  assert.ok(/\.mvpt circle\{[^}]*stroke:var\(--halo,#fff\);stroke-width:1\.6/.test(css), 'the dots of the Map have no halo');
  const k = css.indexOf('.mvin .mvpt'), before = css.slice(0, k);
  assert.ok(k > 0 && before.lastIndexOf('@media (prefers-reduced-motion:no-preference){') > before.lastIndexOf('\n}\n') && /:root:not\(\.still\) \.mvin \.mvpt/.test(css), 'the drawing of the Map is not held back for reduced motion or still pictures');
  assert.ok(!/mvin|MVMAP/.test(eng), 'the rule engine knows about the Map');
}
// the expressions file: two words or more, a rating from 1 to 5
const rows = read('data/norms/mwe_concreteness_Muraki_et_al_2022.tsv').split('\n').filter(l => l && l[0] !== '#').slice(1).map(l => l.split('\t'));
assert.ok(rows.length > 60000 && rows.every(r => r.length === 2 && r[0].includes(' ') && +r[1] >= 1 && +r[1] <= 5), 'the expressions file is not as described');
console.log('pictures: four, each with a text alternative, tooltips, keyboard reach and direct labels; the Map draws in sentence order with a halo; ' + rows.length + ' rated expressions');
