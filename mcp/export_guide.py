#!/usr/bin/env python3
"""Regenerate mcp/guide.json from the built page.

The lens descriptions, marks, limits and sources live in src/ui.js, which needs a
browser to run. This script opens index.html in headless Chrome and writes the
same content the in-page Guide shows, as plain text, for the MCP server to serve.

    python3 build.py && python3 mcp/export_guide.py

Requires the Python package playwright and a Chrome or Chromium it can launch.
Set CHROME to the browser's path if it is not found automatically.
"""
import json, os, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
JS = r"""(() => {
  const txt = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent.replace(/\s+/g, ' ').trim(); };
  const A = state.A, R = A.research;
  const ref = k => { const r = REFS.find(x => x[0] === k); return r ? { citation: txt(r[1]), doi: r[2] || null, url: r[2] ? 'https://doi.org/' + r[2] : (r[3] || null) } : null; };
  return LENSES.filter(l => l.k !== 'guide').map(l => {
    let rb = null; try { rb = RESB[l.k] ? RESB[l.k](A, R) : null; } catch (e) {}
    return { key: l.k, name: l.n, group: l.g === 0 ? 'Overview' : GNAME[l.g][0], reads: l.why, to_revise: l.fix || null,
      marks: l.legend.map(([c, t]) => ({ label: t, meaning: markTip(l.k, c) || null })),
      research_measure: rb ? { what_the_research_found: txt(rb.found), how_this_count_differs: txt(rb.here) } : null,
      with_meaning_model: MDOC[l.k] || null, limits: LIMITS[l.k] || null,
      sources: [...new Set((SRC[l.k] || []).filter(Array.isArray).map(p => p[0]))].map(ref).filter(Boolean) };
  });
})()"""

with sync_playwright() as p:
    kw = {'args': ['--no-sandbox']}
    if os.environ.get('CHROME'):
        kw['executable_path'] = os.environ['CHROME']
    b = p.chromium.launch(**kw)
    pg = b.new_page()
    pg.goto((ROOT / 'index.html').as_uri())
    pg.wait_for_timeout(600)
    pg.evaluate("loadEx(SAMPLE2)")
    pg.wait_for_timeout(300)
    lenses = pg.evaluate(JS)
    b.close()

out = ROOT / 'mcp' / 'guide.json'
out.write_text(json.dumps({'lenses': lenses}, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('wrote', out, 'with', len(lenses), 'lenses')
