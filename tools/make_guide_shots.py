#!/usr/bin/env python3
"""Screenshots for the Guide of the pictures that the built-in example cannot draw by itself:
those that need entries of the writer's own, a revised draft, optional data, or the meaning model.

The Guide draws most pictures live from an example draft (guidePics in src/ui.js). These few
depend on something the Guide does not have when it opens, so they are captured here from the
real page, with the same example draft, and saved to data/guide/ with a manifest that build.py
reads.

    python3 build.py
    python3 -m http.server 8767 &            # the page must be served, for the data and the model
    CHROME=/usr/bin/google-chrome python3 tools/make_guide_shots.py http://localhost:8767/index.html
    python3 build.py                          # picks up data/guide/shots.json

Needs Playwright and Pillow.
"""
import io, json, os, pathlib, sys
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'data' / 'guide'
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8767/index.html'
SCALE, MAXH = 1.5, 640

REV = """()=>{let t=GEX;[['Supporters argue that caps keep tenants in their homes, and several studies agree','Supporters say that caps keep tenants at home, and several studies agree'],
 ['Each tenant was asked about every move since 2015.','We asked each tenant about every move since 2015, and why they had made it.'],
 ['The transcripts were coded twice by separate coders.','Two coders coded each transcript.'],
 ['One limitation is that the sample is small and drawn from three cities.','The sample is small and comes from three cities, which limits what we can claim.'],
 ['Glaciers in the region have retreated since 1990. Meltwater feeds the reservoirs that glaciers once filled. Glaciers and meltwater shape the reservoirs each spring.','Landlords were not interviewed. Some may have sold their flats when the cap ended.']
 ].forEach(([a,b])=>{t=t.replace(a,b);});state.raw=t;state.isSample=false;run();}"""
PANEL = "(cap)=>[...document.querySelectorAll('#extra > .panel')].find(e=>e.querySelector('.cap')&&e.querySelector('.cap').textContent.trim().startsWith(cap))"
# [condition, lens, how to find the element, name in the Guide, what to do first]
SHOTS = [
 ['entries', 'tracer', 'sel:#extra svg.td', 'Toulmin layout, drawn from what you put in the boxes', "(()=>{const s=p=>state.A.sents.find(x=>x.text.trim().startsWith(p)).text.trim();state.toul={g:[s('We found that forced moves doubled'),s('Tenants in capped flats moved far less')],w:[],b:[],r:[s('Critics reply that caps shrink')],wt:'Fewer forced moves mean a more stable tenancy.',bt:'',rt:'',qt:'in the three cities studied'};renderDynamic();document.querySelectorAll('#extra details').forEach(d=>{d.open=true;});})()"],
 ['revised', 'compare', 'cap:Open notes by stage', 'Open notes by stage, start to now', ''],
 ['revised', 'overview', 'cap:Four portraits', 'Four portraits: the start and now', ''],
 ['revised', 'load', 'cap:Structure and vocabulary', 'Structure and vocabulary, with where each rewritten sentence started', ''],
 ['revised', 'rhythm', 'cap:The draft as a line', 'The draft as a line, over the starting draft', ''],
 ['data', 'load', 'cap:Structure and vocabulary', 'Sentence length against the age at which words are learned', "document.querySelector('[data-loady=\"aoa\"]').click()"],
 ['data', 'load', 'sel:.panel.abs .abfig', 'Abstraction heatmap', ''],
 ['data', 'load', 'sel:.panel.abs .abplot', 'Abstract or concrete, calm or charged', "vadLoad()"],
 ['data', 'load', 'sel:#ms', 'Typographic view: parts of speech', "document.querySelector('[data-typo=\"pos\"]').click()"],
 ['data', 'load', 'sel:#ms', 'Typographic view: abstract and concrete words', "document.querySelector('[data-typo=\"conc\"]').click()"],
 ['model', 'flow', 'mean', 'Old → new by meaning: the ribbon', ''],
 ['model', 'outline', 'mean', 'Sentences that sit far from their paragraph', ''],
 ['model', 'grid', 'mean', 'Steps in meaning, sentence by sentence', ''],
 ['model', 'mviews', 'mean', 'Meaning views: Thread', "document.querySelector('[data-mvt=\"thread\"]').click()"],
 ['model', 'mviews', 'mean', 'Meaning views: Quilt', "document.querySelector('[data-mvt=\"quilt\"]').click()"],
 ['model', 'mviews', 'mean', 'Meaning views: Topics', "document.querySelector('[data-mvt=\"stripe\"]').click()"],
 ['model', 'mviews', 'mean', 'Meaning views: Map', "document.querySelector('[data-mvt=\"map\"]').click()"],
 ['model', 'mviews', 'mean', 'Meaning views: Abstract and ending', "document.querySelector('[data-mvt=\"checks\"]').click()"],
 ['model', 'load', 'cap:Where the load falls', 'Where the load falls, with two rows from the meaning model', ''],
 ['model', 'load', 'sel:#ms', 'Typographic view: closeness to your claim', "document.querySelector('[data-typo=\"mclaim\"]').click()"],
 ['model', 'sv', 'sel:#ms', 'Trunk view: what the sentence can lose', "document.querySelector('[data-trunk]').click()"],
]
NEED = {'entries': 'what you put in the boxes', 'revised': 'a draft you have revised', 'data': 'optional data, loaded from the lens', 'model': 'the meaning model'}
# a box that starts folded is opened first; its text is hidden so that the picture fills the shot
HIDE = """(el)=>{if(el.tagName==='DETAILS')el.open=true;const s=el.querySelector(':scope > summary');if(s)s.style.display='none';const b=el.querySelector(':scope > .rp-in')||el;
 b.querySelectorAll(':scope > p:not([class]), :scope > .lm-key, :scope > .hint, :scope > .tilebar, :scope > details, :scope > .cap, :scope > ul.obs, .mvask').forEach(e=>{if(!e.querySelector('svg,canvas'))e.style.display='none';});}"""

def slug(s):
    return ''.join(c if c.isalnum() else '-' for c in s.lower()).strip('-').replace('--', '-')[:60]

with sync_playwright() as p:
    kw = {'args': ['--no-sandbox']}
    if os.environ.get('CHROME'):
        kw['executable_path'] = os.environ['CHROME']
    b = p.chromium.launch(**kw)
    ctx = b.new_context(viewport={'width': 1320, 'height': 1000}, device_scale_factor=SCALE, color_scheme='light')
    pg = ctx.new_page()
    pg.on('pageerror', lambda e: print('page error:', e))
    pg.goto(URL)
    pg.wait_for_timeout(1200)
    pg.evaluate("()=>{endTour();document.documentElement.classList.add('still');newDoc(GEX,false);state.claim=GEX_CLAIM;state.args={0:'bg',1:'sup',2:'sup',3:'sup',4:'qual'};state.fp=false;run();}")
    OUT.mkdir(parents=True, exist_ok=True)
    for f in OUT.glob('*.webp'):
        f.unlink()
    manifest, cond = [], None
    for c, lens, how, name, pre in SHOTS:
        if c != cond:
            cond = c
            pg.evaluate("()=>{state.typo='';state.trunk=false;state.toul=null;state.raw=GEX;run();}")
            if c == 'revised':
                pg.evaluate(REV)
            elif c == 'data':
                pg.evaluate("()=>{posLoad();normsLoad();}")
                for _ in range(60):
                    pg.wait_for_timeout(500)
                    if pg.evaluate("POS.st==='ready'&&NORMS.st==='ready'"):
                        break
            elif c == 'model':
                pg.evaluate("()=>{if(!MEAN.on)meanToggle();}")
                for _ in range(240):
                    pg.wait_for_timeout(500)
                    if pg.evaluate("MEAN.st==='ready'&&!!MEAN.M"):
                        break
            pg.wait_for_timeout(400)
        pg.evaluate("l=>{state.typo='';state.trunk=false;setLens(l);}", lens)
        pg.wait_for_timeout(700)
        if pre:
            try:
                pg.evaluate(pre)
            except Exception as e:
                print('skipped (control not found):', name, '·', str(e)[:80]); continue
            pg.wait_for_timeout(900)
        if how.startswith('cap:'):
            h = pg.evaluate_handle(PANEL, how[4:])
        elif how == 'mean':
            h = pg.evaluate_handle("()=>document.querySelector('#extra > .panel.mean')")
        else:
            h = pg.evaluate_handle("s=>document.querySelector(s)", how[4:])
        el = h.as_element()
        if not el:
            print('skipped (not found):', name); continue
        if not how.startswith('sel:'):
            pg.evaluate(HIDE, el)
        pg.evaluate("e=>e.scrollIntoView({block:'start'})", el)
        pg.wait_for_timeout(250)
        bb = pg.evaluate("e=>{const r=e.getBoundingClientRect();return [r.left+scrollX,r.top+scrollY,r.width,r.height]}", el)
        if bb[3] < 30:
            print('skipped (empty):', name); pg.evaluate("renderDynamic()"); continue
        shot = Image.open(io.BytesIO(pg.screenshot(full_page=True)))
        x, y, w, hh = bb
        box = (int(max(0, x - 6) * SCALE), int(max(0, y - 6) * SCALE), int((x + w + 6) * SCALE), int((y + min(hh, 400 if how.startswith('sel:') else MAXH) + 6) * SCALE))
        im = shot.crop(box).convert('RGB')
        fn = lens + '-' + slug(name) + '.webp'
        im.save(OUT / fn, 'WEBP', quality=80, method=6)
        manifest.append({'lens': lens, 'name': name, 'need': NEED[c], 'file': 'data/guide/' + fn, 'w': im.size[0], 'h': im.size[1]})
        print('%-9s %-9s %4d x %-4d %5.1f KB  %s' % (c, lens, im.size[0], im.size[1], (OUT / fn).stat().st_size / 1024, name))
        pg.evaluate("renderDynamic()")
    b.close()
(OUT / 'shots.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
print('wrote', len(manifest), 'screenshots and data/guide/shots.json')
