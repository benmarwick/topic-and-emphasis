#!/usr/bin/env python3
"""The pictures for the gallery in the README: sixteen of the page's visualisations, each captured from the
real page at three times the screen's resolution, trimmed to what is drawn, and set on a canvas of one
size (1600 x 1200), so that the grid in the README is regular. A picture is only ever made smaller. Nothing is drawn here: every picture is what the page itself draws.

    python3 build.py
    python3 -m http.server 8767 &            # the page must be served, for the data and the model
    CHROME=/usr/bin/google-chrome python3 tools/make_gallery.py http://localhost:8767/index.html

Needs Playwright and Pillow, and the page's own typefaces installed on the machine if it cannot reach
Google Fonts (Newsreader, IBM Plex Sans, IBM Plex Mono: all under the Open Font License), because the
typographic view sets weight by a measure and a fallback face has too few weights. Writes docs/gallery/*.png. The draft is the Guide's own example (GEX in
src/ui.js). Four pictures use it after a change, which the README says: three use the revised copy
that tools/make_guide_shots.py also uses, and one a copy with four confident words added so that the
picture of hedges against boosters has boosters to show.

    python3 tools/make_gallery.py URL --all OUTDIR     # every candidate, to choose from
"""
import io, os, pathlib, sys
from playwright.sync_api import sync_playwright
from PIL import Image, ImageChops

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8767/index.html'
ALL = '--all' in sys.argv
OUT = pathlib.Path(sys.argv[sys.argv.index('--all') + 1]) if ALL else ROOT / 'docs' / 'gallery'
SCALE, CW, CH, PAD = 3, 1600, 1200, 64

REV = """()=>{let t=GEX;[['Supporters argue that caps keep tenants in their homes, and several studies agree','Supporters say that caps keep tenants at home, and several studies agree'],
 ['Each tenant was asked about every move since 2015.','We asked each tenant about every move since 2015, and why they had made it.'],
 ['The transcripts were coded twice by separate coders.','Two coders coded each transcript.'],
 ['One limitation is that the sample is small and drawn from three cities.','The sample is small and comes from three cities, which limits what we can claim.'],
 ['Glaciers in the region have retreated since 1990. Meltwater feeds the reservoirs that glaciers once filled. Glaciers and meltwater shape the reservoirs each spring.','Landlords were not interviewed. Some may have sold their flats when the cap ended.']
 ].forEach(([a,b])=>{t=t.replace(a,b);});state.raw=t;state.isSample=false;run();}"""
SURE = """()=>{let t=GEX;[['Tenants in capped flats moved far less often','Tenants in capped flats clearly moved far less often'],
 ['older tenants were the most likely to move','older tenants were certainly the most likely to move'],
 ['Rents rose by a fifth in the same year','In fact, rents rose by a fifth in the same year'],
 ['This is consistent with Smith','This is clearly consistent with Smith']].forEach(([a,b])=>{t=t.replace(a,b);});state.raw=t;state.isSample=false;run();}"""
TOUL = "(()=>{const s=p=>state.A.sents.find(x=>x.text.trim().startsWith(p)).text.trim();state.toul={g:[s('We found that forced moves doubled'),s('Tenants in capped flats moved far less')],w:[],b:[],r:[s('Critics reply that caps shrink')],wt:'Fewer forced moves mean a more stable tenancy.',bt:'',rt:'',qt:'in the three cities studied'};renderDynamic();const d=[...document.querySelectorAll('#extra > details')].find(e=>/Toulmin layout/.test(e.textContent));if(d)d.open=true;})()"
PANEL = "(cap)=>[...document.querySelectorAll('#extra > .panel')].find(e=>e.querySelector('.cap')&&e.querySelector('.cap').textContent.trim().startsWith(cap))"
# [file, condition, lens, how to find the element, 'fig' (the picture alone) or 'card' (with its heading and as much of its text as fits), what to do first, in the README]
SHOTS = [
 ['meaning-quilt', 'model', 'mviews', 'mean', 'fig', "document.querySelector('[data-mvt=\"quilt\"]').click()", 0],
 ['meaning-map', 'model', 'mviews', 'mean', 'fig', "document.querySelector('[data-mvt=\"map\"]').click()", 1],
 ['meaning-topics', 'model', 'mviews', 'mean', 'fig', "document.querySelector('[data-mvt=\"stripe\"]').click()", 1],
 ['meaning-thread', 'model', 'mviews', 'mean', 'fig', "document.querySelector('[data-mvt=\"thread\"]').click()", 0],
 ['meaning-abstract-ending', 'model', 'mviews', 'mean', 'fig', "document.querySelector('[data-mvt=\"checks\"]').click()", 0],
 ['old-new-ribbon', 'model', 'flow', 'mean', 'fig', '', 0],
 ['steps-in-meaning', 'model', 'grid', 'mean', 'fig', '', 0],
 ['load-strips', 'model', 'load', 'cap:Where the load falls', 'fig', '', 1],
 ['abstraction-heatmap', 'data', 'load', 'cap:Abstraction heatmap', 'card', "document.querySelectorAll('.panel.abs [data-loadalt]').forEach(e=>{e.closest('p').style.display='none';})", 1],
 ['concrete-charged', 'data', 'load', 'cap:Structure and vocabulary', 'fig', "(()=>{state.loadAlt=true;vadLoad();})()", 1],
 ['word-age', 'data', 'load', 'cap:Structure and vocabulary', 'fig', "document.querySelector('[data-loady=\"aoa\"]').click()", 0],
 ['facets', 'data', 'load', 'cap:Facets by paragraph', 'fig', '', 0],
 ['typographic-pos', 'data', 'load', 'sel:#ms', 'fig', "document.querySelector('[data-typo=\"pos\"]').click()", 0],
 ['typographic-concrete', 'data', 'load', 'sel:#ms', 'fig', "document.querySelector('[data-typo=\"conc\"]').click()", 0],
 ['typographic-rare', 'data', 'load', 'sel:#ms', 'fig', "document.querySelector('[data-typo=\"rare\"]').click()", 0],
 ['typographic-role', 'data', 'load', 'sel:#ms', 'fig', "document.querySelector('[data-typo=\"role\"]').click()", 1],
 ['typographic-load', 'data', 'load', 'sel:#ms', 'fig', "(()=>{state.fp=true;document.querySelector('[data-typo=\"load\"]').click();})()", 0],
 ['typographic-fresh', 'data', 'load', 'sel:#ms', 'fig', "document.querySelector('[data-typo=\"fresh\"]').click()", 0],
 ['stage-slope', 'revised', 'compare', 'cap:Open notes by stage', 'card', '', 1],
 ['cadence', 'plain', 'rhythm', 'cap:Cadence without the words', 'card', '', 0],
 ['profile-sparklines', 'plain', 'overview', 'cap:Research profile', 'fig', "(()=>{const d=document.querySelector('#extra > .rprof');d.open=true;d.querySelectorAll('.rguide').forEach(e=>{e.style.display='none';});[...d.querySelector('.prows').children].forEach((e,i)=>{if(i>4)e.style.display='none';});})()", 1],
 ['hedges-boosters', 'sure', 'hedge', 'cap:Hedges against boosters', 'card', '', 1],
 ['toulmin', 'plain', 'tracer', 'sel:#extra svg.td', 'fig', TOUL, 1],
 ['argument-board', 'plain', 'tracer', 'cap:Argument board', 'fig', '', 0],
 ['draft-as-line', 'revised', 'rhythm', 'cap:The draft as a line', 'fig', '', 1],
 ['revision-arrows', 'revised', 'load', 'cap:Structure and vocabulary', 'fig', '', 1],
 ['portraits', 'revised', 'overview', 'cap:Four portraits', 'card', '', 0],
 ['glance', 'plain', 'overview', 'cap:The draft at a glance', 'fig', '', 0],
 ['profile', 'plain', 'overview', 'cap:Research profile', 'fig', '', 0],
 ['topic-grid', 'plain', 'grid', 'cap:Terms the draft keeps using', 'fig', '', 1],
 ['cohesion-map', 'plain', 'grid', 'cap:Cohesion map', 'fig', '', 0],
 ['paragraph-ladder', 'plain', 'grid', 'cap:Paragraph ladder', 'fig', '', 0],
 ['skim', 'plain', 'signals', 'cap:The reader', 'fig', '', 0],
 ['trunk', 'plain', 'sv', 'sel:#ms', 'fig', "document.querySelector('[data-trunk]').click()", 1],
 ['skeleton', 'plain', 'skeleton', 'sel:#ms', 'fig', '', 0],
 ['link-ladder', 'plain', 'flow', 'cap:Link ladder', 'fig', "(()=>{const d=[...document.querySelectorAll('#extra > .panel')].find(e=>/^Link ladder/.test(e.querySelector('.cap').textContent.trim()));[...d.querySelectorAll('.ldxs > *')].forEach((e,i)=>{if(i>1)e.style.display='none';});})()", 1],
 ['sentence-openings', 'plain', 'topic', 'cap:How your sentences open', 'fig', '', 0],
 ['whose-story', 'plain', 'topic', 'cap:Whose story the draft tells', 'fig', '', 0],
 ['outline-proportions', 'plain', 'outline', 'cap:Outline with proportions', 'card', '', 1],
 ['fixed-scale', 'plain', 'rhythm', 'cap:Sentence lengths on a fixed scale', 'fig', '', 0],
 ['rhythm-text', 'plain', 'rhythm', 'sel:#ms', 'fig', '', 0],
 ['argument-shape', 'plain', 'jobs', 'cap:The shape of your argument', 'fig', '', 0],
 ['paragraph-map', 'plain', 'jobs', 'cap:Paragraph map', 'fig', '', 0],
]
# 'fig': a box that starts folded is opened, and its heading and prose are hidden so that the picture fills the shot
FIG = """(el)=>{if(el.tagName==='DETAILS')el.open=true;const s=el.querySelector(':scope > summary');if(s)s.style.display='none';const b=el.querySelector(':scope > .rp-in')||el;
 b.querySelectorAll(':scope > p:not([class]), :scope > .lm-key, :scope > .hint, :scope > .tilebar, :scope > .chips, :scope > details, :scope > .cap, :scope > ul.obs, .mvask, [role="tablist"], .lm-pick').forEach(e=>{if(!e.querySelector('svg,canvas'))e.style.display='none';});}"""
# 'card': the heading stays, and the children below the picture are kept only while the card is no taller than the canvas allows
CARD = """([el,maxh])=>{if(el.tagName==='DETAILS')el.open=true;const b=el.querySelector(':scope > .rp-in')||el;b.querySelectorAll(':scope > .tilebar, :scope > details').forEach(e=>e.style.display='none');
 const kids=[...b.children].filter(e=>e.tagName!=='SUMMARY'&&getComputedStyle(e).display!=='none');for(let i=kids.length-1;i>0&&el.getBoundingClientRect().height>maxh;i--)kids[i].style.display='none';}"""

def compose(im):
    """Trim a capture to what is drawn on it and set that in the middle of the canvas, on the capture's own ground."""
    bg = im.getpixel((6, 6))
    box = ImageChops.difference(im, Image.new('RGB', im.size, bg)).convert('L').point(lambda v: 255 if v > 6 else 0).getbbox()
    if box:
        im = im.crop(box)
    r = min((CW - 2 * PAD) / im.width, (CH - 2 * PAD) / im.height, 1)
    if r < 1:
        im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    can = Image.new('RGB', (CW, CH), bg)
    can.paste(im, ((CW - im.width) // 2, (CH - im.height) // 2))
    return can

with sync_playwright() as p:
    kw = {'args': ['--no-sandbox']}
    if os.environ.get('CHROME'):
        kw['executable_path'] = os.environ['CHROME']
    b = p.chromium.launch(**kw)
    pg = b.new_context(viewport={'width': 1320, 'height': 1000}, device_scale_factor=SCALE, color_scheme='light').new_page()
    pg.on('pageerror', lambda e: print('page error:', e))
    pg.goto(URL)
    pg.wait_for_timeout(1200)
    pg.evaluate("()=>{endTour();setSimple(false);document.documentElement.classList.add('still');newDoc(GEX,false);state.claim=GEX_CLAIM;state.args={0:'bg',1:'sup',2:'sup',3:'sup',4:'qual'};state.fp=false;run();}")
    pg.evaluate("()=>{posLoad();normsLoad();vadLoad();if(!MEAN.on)meanToggle();}")
    for _ in range(300):
        pg.wait_for_timeout(500)
        if pg.evaluate("POS.st==='ready'&&NORMS.st==='ready'&&VAD.st==='ready'&&MEAN.st==='ready'&&!!MEAN.M"):
            break
    else:
        sys.exit('the optional data or the meaning model did not load')
    OUT.mkdir(parents=True, exist_ok=True)
    n = 0
    for fn, c, lens, how, mode, pre, keep in SHOTS:
        if not (keep or ALL):
            continue
        pg.evaluate("()=>{state.typo='';state.trunk=false;state.toul=null;state.loadAlt=false;state.fp=false;state.raw=GEX;state.isSample=false;run();}")
        if c == 'revised':
            pg.evaluate(REV)
        elif c == 'sure':
            pg.evaluate(SURE)
        if True:
            for _ in range(120):
                pg.wait_for_timeout(400)
                if pg.evaluate("MEAN.st==='ready'&&!!MEAN.M&&!meanTexts(state.A).some(t=>t&&!MEAN.vec.has(t))"):
                    break
        pg.evaluate("l=>setLens(l)", lens)
        pg.wait_for_timeout(800)
        if pre:
            try:
                pg.evaluate(pre)
            except Exception as e:
                print('skipped (control not found):', fn, '·', str(e)[:90]); continue
            pg.wait_for_timeout(1000)
        if how.startswith('cap:'):
            h = pg.evaluate_handle(PANEL, how[4:])
        elif how == 'mean':
            h = pg.evaluate_handle("()=>document.querySelector('#extra > .panel.mean')")
        else:
            h = pg.evaluate_handle("s=>document.querySelector(s)", how[4:])
        el = h.as_element()
        if not el:
            print('skipped (not found):', fn); continue
        if how.startswith('sel:'):
            pass
        elif mode == 'fig':
            pg.evaluate(FIG, el)
        else:
            w = pg.evaluate("e=>e.getBoundingClientRect().width", el)
            pg.evaluate(CARD, [el, w * (CH - 2 * PAD) / (CW - 2 * PAD)])
        pg.evaluate("e=>e.scrollIntoView({block:'start'})", el)
        pg.wait_for_timeout(350)
        # the box inside the card's rule, so that the rule is not stranded in the middle of the canvas
        x, y, w, hh = pg.evaluate("e=>{const r=e.getBoundingClientRect(),bl=parseFloat(getComputedStyle(e).borderLeftWidth)||0,bt=parseFloat(getComputedStyle(e).borderTopWidth)||0;return [r.left+scrollX+bl,r.top+scrollY+bt,r.width-bl,r.height-bt]}", el)
        if hh < 30:
            print('skipped (empty):', fn); continue
        if how == 'sel:#ms':
            # the text itself: whole paragraphs only, as many as the shape of the canvas allows
            lim = w * (1.0 if fn.startswith('typographic') or fn == 'trunk' else 0.75)
            hh = pg.evaluate("([e,lim])=>{const t=e.getBoundingClientRect().top;let b=0;[...e.querySelectorAll(':scope > .pblock')].forEach(p=>{const q=p.getBoundingClientRect().bottom-t;if(q<=lim&&p.getBoundingClientRect().height>40)b=Math.max(b,q);});return b+14}", [el, lim])
        hh = min(hh, w * 1.5)
        d = 6 if how == 'sel:#ms' else 2      # inside the edge, so that no rule or rounded corner is caught
        x, y, w, hh = x + d, y + d, w - 2 * d, hh - 2 * d
        im = compose(Image.open(io.BytesIO(pg.screenshot(full_page=True, clip={'x': x, 'y': y, 'width': w, 'height': hh}))).convert('RGB'))
        im.save(OUT / (fn + '.png'), 'PNG', optimize=True)
        n += 1
        print('%-24s %-8s %-8s %4d x %-4d css  %6.1f KB' % (fn, c, lens, w, hh, (OUT / (fn + '.png')).stat().st_size / 1024))
    b.close()
print('wrote', n, 'pictures to', OUT)
