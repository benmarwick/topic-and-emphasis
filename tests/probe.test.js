// Hard cases for three rules: passive or adjective, noun stack or not, and the main verb.
// Run:  node tests/probe.test.js
// The sentences were written to stress the rules, so the scores overstate everyday error.
// The test fails if a score falls below the floor recorded at the foot of this file.
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const sent = s => E.analyze(s, {}).sents[0];

// A. After a form of "be": a passive (P), or an adjective that names a state (A). Third item: the participle.
const A = [['Participants were interested in the task.', 'A', 'interested'], ['The respondents were concerned about privacy.', 'A', 'concerned'], ['The data were collected in 2019.', 'P', 'collected'], ['The sample was drawn from four countries.', 'P', 'drawn'],
  ['The teachers were tired after the session.', 'A', 'tired'], ['The model was estimated with fixed effects.', 'P', 'estimated'], ['Interviews were recorded and transcribed.', 'P', 'recorded'], ['The students were excited about the results.', 'A', 'excited'],
  ['The authors are convinced that trust matters.', 'A', 'convinced'], ['The survey was administered online.', 'P', 'administered'], ['Residents were worried about crime.', 'A', 'worried'], ['The variables were coded by two raters.', 'P', 'coded'],
  ['We were surprised by the size of the effect.', 'A', 'surprised'], ['The committee was divided on the question.', 'A', 'divided'], ['Trust was measured on a five-point scale.', 'P', 'measured'], ['The children were scared.', 'A', 'scared'],
  ['The policy was introduced in 2010.', 'P', 'introduced'], ['Many voters are disappointed with the outcome.', 'A', 'disappointed'], ['The effect was pronounced among renters.', 'A', 'pronounced'], ['The questionnaire was translated into Spanish.', 'P', 'translated'],
  ['Older respondents were more satisfied with the courts.', 'A', 'satisfied'], ['The authors were unaware that the sample was biased.', 'A', 'biased'], ['Two schools were excluded from the analysis.', 'P', 'excluded'], ['The theory is widely accepted.', 'P', 'accepted'],
  // added with the rules, to guard both directions
  ['Trust is related to income.', 'A', 'related'], ['The sample was divided into three groups.', 'P', 'divided'], ['Turnout was determined by the weather.', 'P', 'determined'], ['The analysis is based on four surveys.', 'A', 'based'],
  ['The estimates were unaffected by the change.', 'A', 'unaffected'], ['The claim is very limited.', 'A', 'limited'], ['Access was limited by the regulator.', 'P', 'limited'], ['The scale was used in three studies.', 'P', 'used'],
  ['Respondents were asked about their income.', 'P', 'asked'], ['Income is associated with trust.', 'A', 'associated']];
// B. Is the phrase a stack of three or more nouns?
const B = [['household income survey data', 1], ['panel data analysis methods', 1], ['teacher training programme evaluation', 1], ['trust measurement scale items', 1], ['city council budget committee', 1], ['court compliance rate estimates', 1], ['social science research methods', 1], ['student achievement test scores', 1],
  ['recent empirical social research', 0], ['important new theoretical insight', 0], ['large national longitudinal survey', 0], ['significant positive linear relationship', 0], ['local public officials', 0], ['strong institutional trust', 0], ['public health policy', 0], ['high school students', 0], ['several early quantitative studies', 0], ['detailed historical account', 0]];
// C. The main verb. "word#2" means the second time the word appears.
const C = [['The results model the process well.', 'model'], ['Increases in trust result from competent administration.', 'result'], ['The survey results show a decline.', 'show'], ['Studies of court reform report mixed outcomes.', 'report'], ['The increase in trust measures only part of the change.', 'measures'],
  ['Changes in policy design influence compliance.', 'influence'], ['The research team estimates suggest a decline.', 'suggest'], ['Higher income levels support higher trust.', 'support'], ['The courts that lose public trust lose compliance.', 'lose#2'], ['Respondents who reported low trust also reported low compliance.', 'reported#2'],
  ['The experiment controls for age and income.', 'controls'], ['Our estimates control for age and income.', 'control'], ['The panel data set limits what we can claim.', 'limits'], ['Trust in institutions that people encounter daily matters most.', 'matters'], ['The need for reform increases with each scandal.', 'increases'],
  ['Public trust in the courts remains low.', 'remains'], ['The decline in turnout among young voters accelerated after 2010.', 'accelerated'], ['Citizens who feel financially vulnerable withdraw their confidence.', 'withdraw'], ['The time respondents spent on each item varied widely.', 'varied'], ['These findings challenge the standard account.', 'challenge'],
  // the main verb sits just before a clause opened by "what", "how" or "why", whose own verb must not be taken for it
  ['Rent caps limit what landlords may charge sitting tenants.', 'limit'], ['The results show how tenants respond once a cap is lifted.', 'show'], ['Our interviews explain why tenants moved.', 'explain'],
  ['The focus groups confirm what has become a common view.', 'confirm'], ['These findings help explain why tenants moved.', 'help'], ['The tendency towards uniformity helps explain why many academics keep a page of their own.', 'helps'],
  ['We asked tenants what they paid.', 'asked'], ['Studies of what landlords charge are rare.', 'are'],
  // controls: a word that could be a verb is a noun here
  ['The survey results were consistent.', 'were'], ['Income tax rates rose sharply.', 'rose'], ['Levels of public support for reform have fallen.', 'have'], ['The court reports that compliance fell.', 'reports'], ['This model fits the data well.', 'fits'],
  ['Voter surveys indicate that trust is low.', 'indicate'], ['The test measures trust in courts.', 'measures'], ['Trust scores were higher among renters.', 'were'], ['The interview questions focus on income.', 'focus'], ['Public support for the reform plan grew.', 'grew']];

const out = { A: [], B: [], C: [] };
A.forEach(([s, g, w]) => { const st = sent(s), got = st.passives.some(p => st.T.slice(p.a, p.b + 1).some(t => t.l === w)) ? 'P' : 'A'; if (got !== g) out.A.push(w + ' (' + g + ')'); });
B.forEach(([ph, g]) => { const got = E.analyze('We analysed the ' + ph + ' in detail.', {}).findings.some(f => f.title === 'Noun stack') ? 1 : 0; if (got !== g) out.B.push(ph); });
C.forEach(([s, g]) => { const [gw, gn] = g.split('#'), st = sent(s); let k = 0, idx = -1; st.T.forEach((t, i) => { if (t.l === gw) { k++; if (k === (+gn || 1)) idx = i; } }); if (st.v !== idx) out.C.push(gw + ' (found ' + (st.v >= 0 ? st.T[st.v].t : 'no verb') + ')'); });
const score = { A: A.length - out.A.length, B: B.length - out.B.length, C: C.length - out.C.length };
console.log('A passive or adjective: ' + score.A + ' of ' + A.length + (out.A.length ? '   missed: ' + out.A.join(', ') : ''));
console.log('B noun stack or not:    ' + score.B + ' of ' + B.length + (out.B.length ? '   missed: ' + out.B.join(', ') : ''));
console.log('C main verb:            ' + score.C + ' of ' + C.length + (out.C.length ? '   missed: ' + out.C.join(', ') : ''));
const FLOOR = { A: 33, B: 17, C: 37 };
Object.keys(FLOOR).forEach(k => assert.ok(score[k] >= FLOOR[k], k + ' fell to ' + score[k] + ', below the floor of ' + FLOOR[k]));
console.log('probe checks passed');
