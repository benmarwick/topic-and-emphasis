// The Word file the page writes without a library.  Run:  node tests/docx.test.js
const fs = require('fs'), path = require('path'), assert = require('assert'), zlib = require('zlib');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

const text = 'The implementation of the cap was conducted in 2019, & costs <rose> “sharply”.';
const bytes = E.docx(
  [{ style: 'Heading1', text: 'Méthodes 方法' },
   { style: 'Normal', text, marks: [{ a: 4, b: 18, id: 0 }, { a: 0, b: text.length, id: 1 }, { a: 9, b: 9, id: 2 }, { a: 3, b: 8, id: 99 }] },
   { style: 'Code', text: 'x <- mean(y)\u0007' }],
  [{ id: 0, lines: [{ t: 'Action in verbs · The action is in a noun', b: true }, { t: 'Who or what does it?', i: true }, null, { t: 'Try: make “implement” the verb.' }] },
   { id: 1, lines: [{ t: 'Old → new · New before old', b: true }] },
   { id: 2, lines: [{ t: 'never placed: its range is empty', b: true }] }],
  { date: '2026-11-26T09:00:00Z' });

// read the ZIP back: every part is stored, named in UTF-8, and its CRC is right
const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength), td = new TextDecoder(), eocd = bytes.length - 22;
assert.strictEqual(dv.getUint32(eocd, true), 0x06054b50, 'end record');
const n = dv.getUint16(eocd + 10, true), parts = {};
let p = dv.getUint32(eocd + 16, true);
for (let k = 0; k < n; k++) {
  assert.strictEqual(dv.getUint32(p, true), 0x02014b50, 'central record ' + k);
  assert.strictEqual(dv.getUint16(p + 10, true), 0, 'stored, not compressed');
  const crc = dv.getUint32(p + 16, true), size = dv.getUint32(p + 24, true), nl = dv.getUint16(p + 28, true), lho = dv.getUint32(p + 42, true);
  const name = td.decode(bytes.subarray(p + 46, p + 46 + nl));
  assert.strictEqual(dv.getUint32(lho, true), 0x04034b50, 'local header of ' + name);
  const start = lho + 30 + dv.getUint16(lho + 26, true) + dv.getUint16(lho + 28, true), data = bytes.subarray(start, start + size);
  if (zlib.crc32) assert.strictEqual(zlib.crc32(data) >>> 0, crc, 'CRC of ' + name);
  assert.strictEqual(E.crc32(data), crc);
  parts[name] = td.decode(data);
  p += 46 + nl;
}
assert.deepStrictEqual(Object.keys(parts), ['[Content_Types].xml', '_rels/.rels', 'word/document.xml', 'word/styles.xml', 'word/comments.xml', 'word/_rels/document.xml.rels']);
assert.strictEqual(E.crc32(new TextEncoder().encode('123456789')), 0xCBF43926, 'the standard CRC-32 check value');

// the document: text survives, escaped; comment ranges open and close once each and nest by position
const doc = parts['word/document.xml'], plain = doc.replace(/<w:p[ >]/g, '\n$&').replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
assert.ok(plain.includes(text), 'the paragraph text is intact');
assert.ok(plain.includes('Méthodes 方法') && /w:val="Heading1"/.test(doc));
assert.ok(!/\u0007/.test(doc), 'characters XML does not allow are dropped');
for (const id of [0, 1]) {
  assert.strictEqual(doc.split('<w:commentRangeStart w:id="' + id + '"/>').length, 2);
  assert.strictEqual(doc.split('<w:commentRangeEnd w:id="' + id + '"/>').length, 2);
  assert.strictEqual(doc.split('<w:commentReference w:id="' + id + '"/>').length, 2);
}
assert.ok(!/w:id="2"|w:id="99"/.test(doc), 'an empty range and an unknown comment are not anchored');
const inside = doc.split('<w:commentRangeStart w:id="0"/>')[1].split('<w:commentRangeEnd w:id="0"/>')[0].replace(/<[^>]+>/g, '');
assert.strictEqual(inside, 'implementation', 'comment 0 sits on the marked words');
assert.ok(doc.indexOf('<w:commentRangeStart w:id="1"/>') < doc.indexOf('<w:commentRangeStart w:id="0"/>'));

// the comments: question in italics, title in bold, no empty paragraphs
const cm = parts['word/comments.xml'];
assert.strictEqual((cm.match(/<w:comment /g) || []).length, 2, 'a comment with nowhere to sit is left out');
assert.ok(/<w:b\/><\/w:rPr><w:t xml:space="preserve">Action in verbs · The action is in a noun/.test(cm));
assert.ok(/<w:i\/><\/w:rPr><w:t xml:space="preserve">Who or what does it\?/.test(cm));
assert.ok(/w:author="Topic &amp; Emphasis"/.test(cm));
for (const x of Object.values(parts)) assert.ok(!/&(?!amp;|lt;|gt;|quot;)/.test(x), 'no bare ampersand');
console.log('Word file checks passed');
