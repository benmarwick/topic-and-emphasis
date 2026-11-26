// Nine checks after Thomson's revision strategies.  Run:  node tests/patter.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const ROOT = path.join(__dirname, '..'), read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const j = f => JSON.stringify(read(f).split(/\s+/).join(' '));
const E = new Function('const NGSL_RAW=' + j('src/ngsl.txt') + ';const NAWL_RAW=' + j('src/nawl.txt') + ';' + read('src/engine.js') + ';return E;')();
const run = t => E.analyze(t, {}), titles = (A, lens) => A.findings.filter(f => f.lens === lens).map(f => f.title);
const some = (list, re) => list.some(t => re.test(t));

// 1 a paragraph of "X said, Y said"
let A = run('Smith (2019) argues that rents rose after the cap. Jones and Lee (2020) found that tenants moved less. Garcia et al. (2021) suggest that landlords sold. According to Patel (2018), supply fell in three cities.');
assert.ok(some(titles(A, 'jobs'), /^Source after source: 4 of 4/), titles(A, 'jobs').join(' | '));
assert.strictEqual(A.research.patter.cite.lead, 4);
// the same content, steered by the writer, raises nothing
A = run('Rent caps change what landlords and tenants do. Rents rose after the cap (Smith, 2019), and tenants moved less (Jones & Lee, 2020). Some landlords sold (Garcia et al., 2021). Supply then fell in three cities (Patel, 2018).');
assert.ok(!some(titles(A, 'jobs'), /Source after source/), titles(A, 'jobs').join(' | '));
assert.strictEqual(A.research.patter.cite.brack, 3);

// 1b the writer turns up only at the end
A = run('Rent caps have been studied in many cities (Smith, 2019). Tenants moved less in Berlin (Jones & Lee, 2020). Landlords sold in Stockholm (Garcia et al., 2021). Supply fell in three cities (Patel, 2018). This study draws on these accounts.');
assert.ok(some(titles(A, 'jobs'), /^Your own work appears only in the last sentence/), titles(A, 'jobs').join(' | '));

// 4 many sources in one bracket, by name and year, by number, and by key
A = run('Rent caps are widely studied (Smith, 2019; Jones, 2020; Lee, 2021; Patel, 2018; Garcia, 2017). They are debated [1-6]. They are costly [@a; @b; @c; @d; @e]. They are old (Smith, 2019; Jones, 2020).');
assert.strictEqual(titles(A, 'checks').filter(t => /sources in one bracket/.test(t)).length, 3, titles(A, 'checks').join(' | '));

// 9 the last word goes to a quotation
A = run('Tenants spoke about the cap in mixed terms. Many were relieved by it. One said that “the cap gave us two years to breathe and plan” (Interview 4).');
assert.ok(some(titles(A, 'jobs'), /ends on someone else/), titles(A, 'jobs').join(' | '));

// 2 hedge and reach together
A = run('The cap may possibly have lowered rents in some cases.');
assert.ok(some(titles(A, 'hedge'), /hedge/i));
A = run('The cap may have lowered rents, and this could matter, at least in large cities.');
assert.ok(some(titles(A, 'hedge'), /^Hedges on the claim and a limit on its reach/), titles(A, 'hedge').join(' | '));

// 3 a code word, and the same word explained
const CW = 'Housing policy shows growing financialisation. Scholars link financialisation to rising rents. The cap slowed financialisation in Berlin.';
A = run(CW);
assert.ok(some(titles(A, 'terms'), /financialisation.*used 3 times and never explained/i), titles(A, 'terms').join(' | '));
A = run('Financialisation is the growing role of financial motives in housing. ' + CW);
assert.ok(!some(titles(A, 'terms'), /never explained/), titles(A, 'terms').join(' | '));

// 5 a paragraph joined by "Furthermore" alone; with an echoed word it passes
A = run('Rents rose after the cap. Tenants stayed longer in their flats.\n\nFurthermore, builders delayed new projects. Supply fell.');
assert.ok(some(titles(A, 'flow'), /joined only by “Furthermore”/), titles(A, 'flow').join(' | '));
A = run('Rents rose after the cap. Tenants stayed longer in their flats.\n\nFurthermore, tenants spent less on moving. Supply fell.');
assert.ok(!some(titles(A, 'flow'), /joined only by/), titles(A, 'flow').join(' | '));

// 6 signposting is counted and raises no note
A = run('This section will outline the method. As noted above, rents rose. Rents fell later.');
assert.strictEqual(A.research.patter.sign.n, 2);

// 7 reporting verbs and repeated openers
A = run('Smith argues that rents rose. However, Jones argues the opposite. However, Lee argued for caution. Patel suggests a third view.');
assert.deepStrictEqual(A.research.patter.verbs[0], { w: 'argue', n: 3 });
assert.deepStrictEqual(A.research.patter.openers[0], { w: 'However', n: 2 });

// 8 a paragraph in the passive
A = run('Interviews were conducted in three cities. The transcripts were coded twice. Disagreements were resolved in discussion. The codes were then grouped into themes.');
assert.ok(some(titles(A, 'voice'), /4 of the 4 sentences in this paragraph are passive/), titles(A, 'voice').join(' | '));

// every new note carries a question
['Smith (2019) argues that rents rose after the cap. Jones and Lee (2020) found that tenants moved less. Garcia et al. (2021) suggest that landlords sold. According to Patel (2018), supply fell in three cities.'].forEach(t => run(t).findings.forEach(f => assert.ok(f.q && /\?$/.test(f.q), f.title)));
console.log('patter: ok');
