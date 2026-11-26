// Test for the MCP server. Run:  node tests/mcp.test.js
// It starts the server, speaks to it over stdio as a client would, and checks the answers.
const { spawn } = require('child_process');
const path = require('path');
const assert = require('assert');

const srv = spawn(process.execPath, [path.join(__dirname, '..', 'mcp', 'server.js')], { stdio: ['pipe', 'pipe', 'inherit'] });
let buf = '', next = 1; const waiting = new Map();
srv.stdout.on('data', d => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i); buf = buf.slice(i + 1); if (!line.trim()) continue; const m = JSON.parse(line); const w = waiting.get(m.id); if (w) { waiting.delete(m.id); w(m); } } });
const send = (method, params) => new Promise(res => { const id = next++; waiting.set(id, res); srv.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n'); });
const call = async (name, args) => { const r = await send('tools/call', { name, arguments: args }); assert(!r.error, JSON.stringify(r.error)); return r.result; };

const DRAFT = 'The association between daily social media use and loneliness among the elderly, which we assessed in three annual waves of a community panel, weakened sharply after retirement. It is well known that retirement has an effect on social contact. There are many studies of this.\n\nVolunteering was reduced by retirement as well. This result is not uncommon. We found a casual effect on wellbeing in the the second wave.';

(async () => {
  const init = await send('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '0' } });
  assert.strictEqual(init.result.protocolVersion, '2025-06-18');
  assert(init.result.capabilities.tools, 'no tools capability');
  srv.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');

  const tools = (await send('tools/list', {})).result.tools;
  assert.deepStrictEqual(tools.map(t => t.name).sort(), ['analyse_batch', 'analyse_draft', 'compare_drafts', 'describe_lens', 'list_lenses', 'research_profile']);
  tools.forEach(t => assert(t.description && t.inputSchema && t.inputSchema.type === 'object', t.name));

  const lenses = (await call('list_lenses', {})).structuredContent.lenses;
  assert(lenses.length >= 25 && lenses.some(l => l.key === 'stress'));
  const voice = (await call('describe_lens', { lens: 'voice' })).structuredContent;
  assert(voice.limits && voice.sources.length, 'lens description is missing parts');

  const q = (await call('analyse_draft', { text: DRAFT })).structuredContent;
  assert(q.notes.length > 5 && q.notes.every(n => n.question && n.finding === undefined), 'tutor mode should return questions only');
  const full = (await call('analyse_draft', { text: DRAFT, reveal: 'full', lenses: ['slips'] })).structuredContent;
  assert(full.notes.length >= 2 && full.notes.every(n => n.lens === 'slips' && n.finding), 'full mode should explain');
  assert(full.notes.some(n => n.suggested_change && /causal/.test(n.suggested_change.with)), 'no suggested change for the look-alike word');
  const again = (await call('analyse_draft', { text: DRAFT })).structuredContent;
  assert.deepStrictEqual(again.notes, q.notes, 'the same text should give the same notes');

  const prof = (await call('research_profile', { text: DRAFT })).structuredContent.profile;
  assert(prof.readability_formulas && prof.paragraph_links.joins === 1);
  const cmp = (await call('compare_drafts', { before: DRAFT, after: DRAFT.replace('the the', 'the').replace('casual', 'causal') })).structuredContent;
  assert(cmp.total_notes.after < cmp.total_notes.before, 'the revision should have fewer notes');
  const batch = (await call('analyse_batch', { drafts: [{ id: 'a', text: DRAFT }, { id: 'b', text: 'Short one. It has two sentences.' }, { id: 'c', text: '' }] })).structuredContent;
  assert(batch.rows.length === 3 && batch.rows[2].error && batch.csv.split('\n').length === 4);

  const bad = await send('tools/call', { name: 'describe_lens', arguments: { lens: 'nope' } });
  assert(bad.result.isError, 'an unknown lens should be a tool error');
  const none = await send('no/such', {});
  assert(none.error && none.error.code === -32601);

  console.log('MCP server: ' + tools.length + ' tools, ' + q.notes.length + ' questions on the test draft, all checks passed');
  srv.stdin.end();
})().catch(e => { console.error(e); srv.kill(); process.exit(1); });
