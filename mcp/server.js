#!/usr/bin/env node
/* Topic & Emphasis MCP server.

   Lets an agent use the same fixed rules as the browser page: analyse a draft, read the notes
   (each one starts with a question), get the research profile, compare two versions, and run
   a batch of drafts. It runs locally over stdio, has no dependencies, opens no network
   connection, and writes nothing to disk. The optional meaning model is not part of it.

   Run:  node mcp/server.js
*/
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const VERSION = (read('CITATION.cff').match(/^version:\s*(\S+)/m) || [, '0'])[1];

/* The rule engine is the same file the page uses. It needs the two word lists in front of it. */
const lists = 'const NGSL_RAW=' + JSON.stringify(read('src/ngsl.txt').split(/\s+/).join(' ')) +
  ';const NAWL_RAW=' + JSON.stringify(read('src/nawl.txt').split(/\s+/).join(' ')) +
  ';const DALE_RAW=' + JSON.stringify(read('src/dalechall.txt').split(/\s+/).join(' ')) +
  ';const EXCESS_RAW=' + JSON.stringify(read('src/excess.txt').split(/\s+/).join(' ')) +
  ';const SYL_RAW=' + JSON.stringify(read('src/syllables.txt').trim()) +
  ';const JARGON_RAW=' + JSON.stringify(read('src/jargon.txt').split(/\s+/).join(' ')) + ';';
const E = new Function(lists + read('src/engine.js') + ';return E;')();
const GUIDE = JSON.parse(read('mcp/guide.json')).lenses;
const LENS = Object.fromEntries(GUIDE.map(l => [l.key, l]));
const NOTE_LENSES = GUIDE.filter(l => !['overview', 'compare', 'practice', 'skeleton', 'mviews'].includes(l.key)).map(l => l.key);

const r1 = v => v == null ? null : Math.round(v * 10) / 10;
const pct = (a, b) => b ? Math.round(1000 * a / b) / 10 : null;
const MAX_CHARS = 400000;

function analyse(args) {
  const text = String(args.text == null ? '' : args.text);
  if (!text.trim()) throw new Error('The text is empty.');
  if (text.length > MAX_CHARS) throw new Error('The text is longer than ' + MAX_CHARS + ' characters. Send it in parts.');
  return { text, A: E.analyze(text, { claim: args.claim || '', title: args.title || '', kind: args.kind || '', list: args.word_list || '', source: args.source || '' }) };
}
const counts = A => { const c = {}; A.findings.forEach(f => { c[f.lens] = (c[f.lens] || 0) + 1; }); return c; };
const stats = A => ({ paragraphs: A.paras.filter(p => p.ord != null).length, sentences: A.stats.nS, words: A.sents.reduce((a, s) => a + s.nW, 0), words_per_sentence: r1(A.stats.avg), longest_sentence_words: A.stats.max });

function note(A, text, f, reveal) {
  const st = A.sents[f.s], o = {
    id: f.id, lens: f.lens, lens_name: (LENS[f.lens] || {}).name || f.lens,
    paragraph: st && A.paras[st.p] && A.paras[st.p].ord != null ? A.paras[st.p].ord + 1 : null,
    sentence: f.s + 1, about_the_whole_paragraph: !!f.para,
    sentence_text: st ? st.text.trim() : '', marked_words: f.a != null && st ? st.text.slice(f.a, f.b) : null,
    question: f.q || null,
  };
  if (reveal !== 'questions') {
    o.finding = f.title; o.explanation = f.detail || null; o.advice = f.tip || null;
    if (f.fix) o.suggested_change = { replace: text.slice(f.fix.s, f.fix.e), with: f.fix.text };
  }
  return o;
}

/* Optional word norms: used when the four files are in data/norms/. They keep their authors' licences. */
let NORMS = null;
try {
  const d = 'data/norms/';
  NORMS = E.parseNorms({ conc: read(d + 'Concreteness_ratings_Brysbaert_et_al_BRM.txt'), aoa: read(d + 'AoA_ratings_Kuperman_et_al_BRM.csv'), freq: read(d + 'SUBTLEX-US_frequency_list_with_PoS_and_Zipf.csv'), prev: read(d + 'word_prevalence_Brysbaert_et_al_2019.txt') });
} catch (e) { NORMS = null; if (process.env.TE_DEBUG) console.error(String(e)); }
function wordNorms(A) {
  if (!NORMS) return null;
  const M = E.norms(A, NORMS), r2 = v => v == null ? null : Math.round(v * 100) / 100;
  return { mean_concreteness_of_content_words_1_to_5: r2(M.conc.mean), mean_age_of_acquisition_of_content_words: r2(M.aoa.mean), mean_share_of_people_who_know_each_content_word_pct: M.prev.mean == null ? null : r1(100 * M.prev.mean), content_words_known_to_fewer_than_nine_in_ten: M.prev.under90, mean_zipf_frequency_of_all_words: r2(M.zipf.mean), rare_words_zipf_under_3_or_unlisted: M.zipf.rare, sentences_with_the_hardest_vocabulary: M.hardest.map(x => ({ sentence: x.i + 1, mean_age_of_acquisition: r2(x.v) })), content_words_with_a_concreteness_rating: M.conc.n, content_words_without_one: M.conc.miss };
}
function profile(A) {
  const R = A.research, O = R.over, X = R.read;
  return {
    paragraph_links: { joins: O.pp, joins_carrying_a_content_word: O.ph },
    sentence_links: { neighbours_sharing_a_content_word_pct: pct(O.lh, O.lp), all_pairs_sharing_a_content_word_pct: O.gp ? pct(O.gh, O.gp) : null },
    connectives: { per_1000_words: r1(R.conn.per), additive: R.conn.by.add, contrastive: R.conn.by.con, causal: R.conn.by.cau, temporal: R.conn.by.tem },
    given_words: { content_words_used_in_an_earlier_sentence_pct: pct(R.given.old, R.given.cw), personal_pronouns_per_100_words: r1(R.given.per100) },
    words_used_once: { content_words_used_once: R.once.once, different_content_words: R.once.types },
    word_variety: { mtld: R.lex.mtld == null ? null : r1(R.lex.mtld), mattr_50: R.lex.mattr == null ? null : Math.round(R.lex.mattr * 100) / 100, words_counted: R.lex.n },
    wait_for_the_verb: { median_words_before_main_verb: R.pre.median, longest: R.pre.max, longest_is_sentence: R.pre.maxI >= 0 ? R.pre.maxI + 1 : null },
    readability_formulas: X ? { flesch_reading_ease: r1(X.fre), flesch_kincaid_grade: r1(X.fk), ari_grade: r1(X.ari), smog_grade: r1(X.smog), coleman_liau_grade: r1(X.cl), gunning_fog_grade: r1(X.fog), lix: r1(X.lix), words_longer_than_six_letters_pct: r1(X.long), dale_chall_1948_score: X.dale ? r1(X.dale.score) : null, words_off_the_dale_chall_list_pct: X.dale ? r1(X.dale.pdw) : null, counted_on: 'the cleaned text: bracketed citations, numbers and abbreviations dropped, hyphenated words split', tokens_set_aside: X.cut == null ? null : X.cut, on_the_text_as_typed: X.raw ? { flesch_reading_ease: r1(X.raw.fre), flesch_kincaid_grade: r1(X.raw.fk), ari_grade: r1(X.raw.ari), smog_grade: r1(X.raw.smog), coleman_liau_grade: r1(X.raw.cl), gunning_fog_grade: r1(X.raw.fog), lix: r1(X.raw.lix) } : null } : null,
    general_science_jargon: R.jargon ? { share_of_words_pct: r1(100 * R.jargon.share), uses: R.jargon.n, different_words: R.jargon.types } : null,
    word_list_coverage: R.cover ? { running_words: R.cover.n, on_ngsl_or_nawl_pct: pct(R.cover.ngsl + R.cover.nawl, R.cover.n), with_proper_nouns_counted_as_known_pct: pct(R.cover.ngsl + R.cover.nawl + R.cover.proper, R.cover.n), on_neither_list: R.cover.off, proper_nouns: R.cover.proper } : null,
    thematic_progression: R.prog ? { sentences_after_the_first_in_their_paragraph: R.prog.n, same_topic_as_sentence_before: R.prog.constant, opens_from_close_of_sentence_before: R.prog.linear, returns_to_an_earlier_sentence: R.prog.ret, opens_with_a_pronoun_alone: R.prog.ref, opens_on_words_new_to_the_paragraph: R.prog.fresh } : null,
    topic_continuity: A.grid.terms.filter(g => g.rd != null).slice(0, 8).map(g => ({ term: g.w, sentences: g.n, mean_gap_in_sentences: r1(g.rd), longest_gap: g.rdMax, persistence: r1(g.pers) })),
    transition_profile: R.trans ? { connective_before_main_verb: R.trans.before, connective_only_after_main_verb: R.trans.after, no_connective: R.trans.none } : null,
    word_sequences: R.bundles ? { common_academic_sequences_per_1000_words: r1(R.bundles.per), referential: R.bundles.form.ref, stance: R.bundles.form.stance, discourse_organising: R.bundles.form.org, repeated_four_word_runs: R.bundles.rep } : null,
    stance_and_engagement: R.stance ? { hedges: R.stance.hedge, boosters: R.stance.boost, hedges_per_1000_words: r1(R.stance.hper), boosters_per_1000_words: r1(R.stance.bper), reader_pronouns: R.stance.eng.you, directives: R.stance.eng.dir, questions: R.stance.eng.q, appeals_to_shared_knowledge: R.stance.eng.shared } : null,
    promotional_adjectives: R.hype ? Object.assign({ per_1000_words: r1(R.hype.per), total: R.hype.n }, R.hype.by) : null,
    excess_vocabulary: R.excess ? { per_1000_words: r1(R.excess.per), uses: R.excess.n, different_words: R.excess.types } : null,
    grim: R.grim ? { means_that_could_be_tested: R.grim.tested, means_that_fail: R.grim.flagged } : null,
    word_norms: wordNorms(A),
    passives: { total: R.pas.n, with_no_agent: R.pas.agentless },
    negatives: { per_1000_words: r1(R.neg.per), stacked: R.neg.stack },
    tense: { neighbouring_sentences_keeping_the_same_tense_pct: pct(R.tense.same, R.tense.pairs) },
    typing_slips: R.slips,
    phrase_load: { noun_stacks: R.phrase.stacks, preposition_chains: R.phrase.chains, per_100_words: r1(R.phrase.per) },
    nominalisations: { count: R.phrase.noms, per_100_words: r1(R.phrase.nomPer), holding_the_action_of_their_sentence: R.phrase.nomNotes },
    plain_counts: { letters_per_word: r1(R.simple.lpw), sentences_per_paragraph: r1(R.simple.spp), words_per_paragraph: Math.round(R.simple.wpp) },
    pronouns: { first_person: R.simple.p1, second_person: R.simple.p2, third_person: R.simple.p3 },
    source_overlap: R.source ? { runs_of_five_or_more_matching_words: R.source.runs, more_inside_quotation_marks: R.source.quoted, share_of_words_pct: r1(100 * R.source.share) } : null,
    how_to_read: 'These are descriptive counts made by fixed rules. None is a score and none has a target. The studies behind them looked at student essays, not research articles. Use describe_lens for what each one means, its limits and its sources.',
  };
}
const flat = (o, pre, out) => { Object.keys(o).forEach(k => { const v = o[k]; if (k === 'how_to_read') return; if (v && typeof v === 'object') flat(v, pre + k + '.', out); else out[pre + k] = v; }); return out; };

const str = { type: 'string' };
const draftProps = {
  text: { type: 'string', description: 'The draft, as plain text. Leave a blank line between paragraphs.' },
  claim: { type: 'string', description: 'Optional. The writer’s central claim in one sentence. Switches on the Claim tracer notes.' },
  title: { type: 'string', description: 'Optional. The title of the piece.' },
  kind: { type: 'string', enum: ['', 'abstract', 'intro', 'paper'], description: 'Optional. The kind of text, so that missing moves can be noted.' },
};
const TOOLS = [
  { name: 'list_lenses', description: 'List the lenses (the kinds of feedback) with a one-line account of what each reads. Start here to see what analyse_draft can report.',
    inputSchema: { type: 'object', properties: {} },
    run: () => ({ lenses: GUIDE.map(l => ({ key: l.key, name: l.name, group: l.group, reads: l.reads.split(/(?<=\.)\s/)[0], makes_notes: NOTE_LENSES.includes(l.key) })) }) },
  { name: 'describe_lens', description: 'Explain one lens in full: what it reads, how to revise, what its marks mean, the research behind it, its limits, and its sources with DOIs. Use this before explaining a note to a writer, and to cite sources.',
    inputSchema: { type: 'object', properties: { lens: { type: 'string', description: 'A lens key from list_lenses, such as "stress" or "voice".' } }, required: ['lens'] },
    run: a => { const l = LENS[a.lens]; if (!l) throw new Error('No lens called "' + a.lens + '". Use list_lenses to see the keys.'); return l; } },
  { name: 'analyse_draft', description: 'Analyse a draft with the fixed rules and return its notes. Every note has a question for the writer. By default only the questions are returned, so that a tutor can ask them and let the writer find the answer. Set reveal to "full" to also get the finding, the explanation, the advice and any suggested change, as a grader would need. The same text always gives the same notes.',
    inputSchema: { type: 'object', properties: Object.assign({}, draftProps, {
      reveal: { type: 'string', enum: ['questions', 'full'], description: '"questions" (the default) returns each note’s question only. "full" adds the finding, explanation, advice and suggested change.' },
      lenses: { type: 'array', items: str, description: 'Optional. Only return notes from these lens keys.' },
      sentence: { type: 'integer', description: 'Optional. Only return notes on this sentence, counted from 1.' },
      limit: { type: 'integer', description: 'Optional. Return at most this many notes. The default is 60.' },
      word_list: { type: 'string', description: 'Optional. Words or phrases to track, one to a line; end with * for any ending; start a line with - for wording to avoid.' },
      source: { type: 'string', description: 'Optional. A source passage the draft draws on, to find runs of words shared with it.' },
    }), required: ['text'] },
    run: a => { const { text, A } = analyse(a), reveal = a.reveal === 'full' ? 'full' : 'questions', want = Array.isArray(a.lenses) && a.lenses.length ? new Set(a.lenses) : null;
      let fs2 = A.findings.filter(f => (!want || want.has(f.lens)) && (a.sentence == null || f.s === a.sentence - 1));
      const total = fs2.length, limit = Math.max(1, Math.min(500, a.limit || 60)); fs2 = fs2.slice(0, limit);
      return { summary: stats(A), notes_by_lens: counts(A), notes_returned: fs2.length, notes_matching: total, reveal, notes: fs2.map(f => note(A, text, f, reveal)),
        reminder: reveal === 'questions' ? 'Ask the writer the question and let them revise. A note is a question about the sentence, not an error: the writer may be right to leave it as it is.' : 'The rules read structure and not meaning, so some notes will be wrong for a given sentence. Check each against the text before relying on it.' }; } },
  { name: 'research_profile', description: 'Return descriptive counts for a draft: overlap between paragraphs and sentences, connectives by type, word variety, words before the main verb, readability formulas, passives, negatives, tense, typing slips, phrase load and plain counts. None is a score. Suited to describing a draft or a set of drafts for research.',
    inputSchema: { type: 'object', properties: Object.assign({}, draftProps, { source: { type: 'string', description: 'Optional. A source passage, to count runs of words shared with it.' } }), required: ['text'] },
    run: a => { const { A } = analyse(a); return { summary: stats(A), profile: profile(A) }; } },
  { name: 'compare_drafts', description: 'Compare an earlier and a later version of the same draft: the number of notes in each lens before and after, and the research profile of each. Suited to seeing what a revision changed.',
    inputSchema: { type: 'object', properties: { before: { type: 'string', description: 'The earlier version.' }, after: { type: 'string', description: 'The later version.' }, claim: draftProps.claim, title: draftProps.title, kind: draftProps.kind }, required: ['before', 'after'] },
    run: a => { const X = analyse(Object.assign({}, a, { text: a.before })).A, Y = analyse(Object.assign({}, a, { text: a.after })).A, cx = counts(X), cy = counts(Y), keys = [...new Set(Object.keys(cx).concat(Object.keys(cy)))].sort();
      return { before: stats(X), after: stats(Y), notes_by_lens: keys.map(k => ({ lens: k, lens_name: (LENS[k] || {}).name || k, before: cx[k] || 0, after: cy[k] || 0, change: (cy[k] || 0) - (cx[k] || 0) })),
        total_notes: { before: X.findings.length, after: Y.findings.length }, profile_before: profile(X), profile_after: profile(Y),
        caution: 'Fewer notes is not the same as better writing. A note can vanish because a sentence was cut, and a writer may rightly leave a note open.' }; } },
  { name: 'analyse_batch', description: 'Analyse many drafts at once and return one row per draft: summary counts, notes in each lens, and the research profile as flat columns, with a CSV copy. Suited to studying a class’s drafts. No draft text is kept or returned.',
    inputSchema: { type: 'object', properties: { drafts: { type: 'array', description: 'The drafts.', items: { type: 'object', properties: { id: { type: 'string', description: 'A label for the draft, such as an anonymous code.' }, text: str, claim: str }, required: ['id', 'text'] } } }, required: ['drafts'] },
    run: a => { if (!Array.isArray(a.drafts) || !a.drafts.length) throw new Error('Send at least one draft.'); if (a.drafts.length > 200) throw new Error('Send at most 200 drafts at a time.');
      const rows = a.drafts.map(d => { try { const { A } = analyse(d), c = counts(A), row = Object.assign({ id: String(d.id) }, stats(A), { notes_total: A.findings.length }); NOTE_LENSES.forEach(k => { row['notes.' + k] = c[k] || 0; }); return flat(profile(A), 'profile.', row); } catch (e) { return { id: String(d.id), error: e.message }; } });
      const cols = [...new Set(rows.flatMap(r => Object.keys(r)))], cell = v => v == null ? '' : /[",\n]/.test(String(v)) ? '"' + String(v).replace(/"/g, '""') + '"' : String(v);
      return { rows, csv: [cols.join(',')].concat(rows.map(r => cols.map(c => cell(r[c])).join(','))).join('\n'), how_to_read: 'Counts made by fixed rules. They describe drafts and do not grade them.' }; } },
];
const TOOL = Object.fromEntries(TOOLS.map(t => [t.name, t]));

const INSTRUCTIONS = 'Topic & Emphasis gives rule-based feedback on research writing, following Gopen and Swan’s "The Science of Scientific Writing" (1990). It is built so that writers revise their own text. As a tutor, call analyse_draft (it returns questions by default), ask the writer one question at a time, and let them rewrite; do not rewrite for them. As a grader’s aid, call analyse_draft with reveal "full" and check each note against the text, because the rules read structure and not meaning. For research on a set of drafts, use analyse_batch or research_profile. Use describe_lens for what a lens means, its limits and its sources. Nothing is scored, and no count has a target.';
const PROTOCOLS = ['2025-06-18', '2025-03-26', '2024-11-05'];

function handle(msg) {
  const { id, method, params } = msg;
  const ok = result => ({ jsonrpc: '2.0', id, result });
  const err = (code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });
  if (method === 'initialize') {
    const asked = params && params.protocolVersion;
    return ok({ protocolVersion: PROTOCOLS.includes(asked) ? asked : PROTOCOLS[0], capabilities: { tools: {} }, serverInfo: { name: 'topic-and-emphasis', title: 'Topic & Emphasis', version: VERSION }, instructions: INSTRUCTIONS });
  }
  if (method === 'ping') return ok({});
  if (method === 'tools/list') return ok({ tools: TOOLS.map(t => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })) });
  if (method === 'tools/call') {
    const t = TOOL[params && params.name];
    if (!t) return err(-32602, 'Unknown tool: ' + (params && params.name));
    try { const out = t.run((params && params.arguments) || {}); return ok({ content: [{ type: 'text', text: JSON.stringify(out, null, 1) }], structuredContent: out }); }
    catch (e) { return ok({ content: [{ type: 'text', text: e.message }], isError: true }); }
  }
  if (id === undefined || id === null) return null;            // a notification we do not act on
  return err(-32601, 'Method not found: ' + method);
}

const rl = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
rl.on('line', line => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch (e) { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }) + '\n'); return; }
  const batch = Array.isArray(msg), out = (batch ? msg : [msg]).map(m => { try { return handle(m); } catch (e) { return { jsonrpc: '2.0', id: m && m.id !== undefined ? m.id : null, error: { code: -32603, message: e.message } }; } }).filter(Boolean);
  if (out.length) process.stdout.write(JSON.stringify(batch ? out : out[0]) + '\n');
});
