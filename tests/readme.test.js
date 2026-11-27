// The README's pictures: the gallery is a grid of twelve, every picture it names exists and is as large as it says,
// each has an alternative text long enough to stand in for it, and the animation of the tutorial is there.  Run:  node tests/readme.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), md = fs.readFileSync(path.join(ROOT, 'README.md'), 'utf8');
const a = md.indexOf('## 🖼️ Gallery'), b = md.indexOf('\n## ', a + 5);
assert.ok(a >= 0 && b > a, 'the README has no Gallery section');
const sec = md.slice(a, b), rows = sec.match(/<tr>\s*(?:<td[\s\S]*?<\/td>\s*){3}<\/tr>/g) || [];
assert.strictEqual(rows.length, 4, 'the gallery is not four rows of three');
const imgs = [...sec.matchAll(/<a href="([^"]+)"><img src="([^"]+)" width="100%" alt="([^"]*)"><\/a>/g)];
assert.strictEqual(imgs.length, 12, 'the gallery does not have twelve pictures');
const alts = new Set();
for (const [, href, src, alt] of imgs) {
  assert.strictEqual(href, src, 'a picture does not open itself at full size: ' + src);
  assert.ok(/^docs\/gallery\/[a-z-]+\.png$/.test(src) && fs.existsSync(path.join(ROOT, src)), 'missing picture: ' + src);
  const png = fs.readFileSync(path.join(ROOT, src));
  assert.ok(png.slice(1, 4).toString() === 'PNG' && png.readUInt32BE(16) === 1600 && png.readUInt32BE(20) === 1200, src + ' is not a 1600 x 1200 PNG');
  assert.ok(alt.length >= 300 && /\d/.test(alt) && !/^(image|picture|screenshot) of/i.test(alt), 'the alternative text of ' + src + ' is too thin to stand in for the picture');
  alts.add(alt);
}
assert.strictEqual(alts.size, 12, 'two pictures share one alternative text');
const used = new Set(imgs.map(m => path.basename(m[2])));
for (const f of fs.readdirSync(path.join(ROOT, 'docs', 'gallery'))) assert.ok(used.has(f), 'docs/gallery/' + f + ' is not in the README');
// the animation: present, a GIF, and described
const gif = md.match(/!\[([^\]]+)\]\(docs\/tutorial\.gif\)/);
assert.ok(gif && gif[1].length > 40, 'the tutorial animation has no description');
const g = fs.readFileSync(path.join(ROOT, 'docs', 'tutorial.gif'));
assert.ok(g.slice(0, 3).toString() === 'GIF' && g.readUInt16LE(6) === 1280 && g.readUInt16LE(8) === 800, 'docs/tutorial.gif is not a 1280 x 800 GIF');
// every step of the tutorial stays up for three seconds or more: frames come in pairs, one pair for each step
const delays = [];
for (let i = 0; i < g.length - 8; i++) if (g[i] === 0x21 && g[i + 1] === 0xF9 && g[i + 2] === 4 && g[i + 7] === 0) delays.push(g.readUInt16LE(i + 4) / 100);
const real = delays.filter(d => d > 0.1), steps = [];
for (let i = 0; i + 1 < real.length; i += 2) steps.push(real[i] + real[i + 1]);
assert.ok(steps.length >= 20 && Math.min(...steps) >= 3, 'a step of the tutorial animation is on screen for less than three seconds: ' + Math.min(...steps));
console.log('readme: gallery of 12 pictures at 1600 x 1200, alternative texts of ' + Math.min(...[...alts].map(s => s.length)) + ' characters or more; tutorial animation of ' + steps.length + ' steps, shortest ' + Math.min(...steps).toFixed(1) + ' s');
