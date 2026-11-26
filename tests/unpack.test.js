// The template that turns a noun back into a verb ("Unpack the noun").  Run:  node tests/unpack.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();

const LEAD = 'Cities change in many ways.\n\n';
// what the page would write, with ___ where the writer has to say who acted
function unpacked(sentence) {
  const raw = LEAD + sentence, A = E.analyze(raw, {}), f = A.findings.find(x => x.lens === 'action' && x.unpack);
  if (!f) return null;
  const u = f.unpack, st = A.sents[f.s];
  let c = [u.kind === 'obj' ? null : (u.actor || '___'), u.verb, u.obj].filter(Boolean).join(' ');
  if (u.cap) c = c.charAt(0).toUpperCase() + c.slice(1);
  return raw.slice(st.s, u.s) + c + raw.slice(u.e, st.e);
}
const CASES = [
  // the actor is missing: the page leaves the blank
  ['The implementation of the policy was conducted in 2019.', '___ implemented the policy in 2019.'],
  ['The collection of the survey data took place in spring.', '___ collected the survey data in spring.'],
  ['An evaluation of the programme has been undertaken.', '___ has evaluated the programme.'],
  ['The measurement of income should be performed annually.', '___ should measure income annually.'],
  ['An assessment of the risks was not made.', '___ did not assess the risks.'],
  ['A decision was made to close the school.', '___ decided to close the school.'],
  // the actor is in the sentence: after "by", or as a possessive
  ['The implementation of the policy in rural areas was carried out by the regional council over two years.', 'The regional council implemented the policy in rural areas over two years.'],
  ['Recruitment of participants was conducted by us through local schools.', 'We recruited participants through local schools.'],
  ['Their analysis of the data was performed in 2019.', 'They analyzed the data in 2019.'],
  // what changed can be the subject itself
  ['An increase in housing costs was observed across the city.', 'Housing costs increased across the city.'],
  // the sentence already has its actor as the subject
  ['The committee made a detailed assessment of the proposal before voting.', 'The committee assessed the proposal before voting.'],
  ['He, however, made no distinct change in his mode of life.', 'He, however, did not change his mode of life.'],
  // no template: "by" gives a means, a real verb follows the noun, or the noun is not the start of its clause
  ['The analysis showed a decrease in trust.', null],
  ['The distribution of the land among the toilers is taken care of by local bodies.', null],
  ['For this visit great preparations are made.', null],
];
for (const [s, want] of CASES) assert.strictEqual(unpacked(s), want, s);

// the page never invents an actor: it is empty unless the sentence names one
{
  const A = E.analyze(LEAD + 'Careful analysis of the interview data was performed.', {}), u = A.findings.find(x => x.unpack).unpack;
  assert.strictEqual(u.actor, '');
  assert.deepStrictEqual(u.left, ['Careful'], 'a dropped modifier is reported, not silently lost');
}
// a list inside the opening does not hide the subject
{
  const st = E.analyze(LEAD + 'After two years of consultation with tenants, landlords and three advisory panels, the council approved the cap.', {}).sents[1];
  assert.strictEqual(st.T[st.head].t, 'council');
  assert.strictEqual(st.gap, 0);
}
console.log('unpack checks passed');
