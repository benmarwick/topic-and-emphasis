#!/usr/bin/env python3
"""An animated GIF of the tutorial, for the README: every step of the first-visit tutorial, walked by pressing
the page's own buttons, at laptop proportions (1280 x 800). Two frames a step, so that the pulse shows.

    python3 build.py
    python3 -m http.server 8767 &
    CHROME=/usr/bin/google-chrome python3 tools/make_tutorial_gif.py http://localhost:8767/index.html

Needs Playwright and ffmpeg. Writes docs/tutorial.gif.
"""
import os, pathlib, subprocess, sys, tempfile
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8767/index.html'
W, H, HOLD = 1280, 800, 0.75
tmp = pathlib.Path(tempfile.mkdtemp())
frames = []

def shot(pg, secs=HOLD):
    f = tmp / ('f%03d.png' % len(frames))
    pg.screenshot(path=str(f))
    frames.append((f, secs))

with sync_playwright() as p:
    kw = {'args': ['--no-sandbox']}
    if os.environ.get('CHROME'):
        kw['executable_path'] = os.environ['CHROME']
    b = p.chromium.launch(**kw)
    pg = b.new_context(viewport={'width': W, 'height': H}, device_scale_factor=1, color_scheme='light').new_page()
    pg.goto(URL)
    pg.wait_for_timeout(1800)
    n = 0
    while pg.evaluate("!!state.tour") and n < 60:
        n += 1
        pg.wait_for_timeout(1050)
        st = pg.evaluate("(()=>{const S=state.tour.step||{},q=s=>!!document.querySelector(s);return {kind:S.kind,pulse:S.pulse||'',pv:q('#pNotes [data-pvgo]'),fix:q('#pNotes [data-fix]'),next:!document.querySelector('#tourNext').hidden}})()")
        pg.mouse.move(W - 4, H - 4)
        shot(pg); pg.wait_for_timeout(620); shot(pg, HOLD + (0.9 if st['kind'] in ('task', 'beat', 'fin') else 0.25))
        if st['next']:
            pg.wait_for_timeout(300); pg.click('#tourNext')
        elif st['kind'] == 'tap':
            pg.click(st['pulse'] + ' .sn')
        elif st['kind'] == 'task' and st['pv']:
            pg.click('#pNotes [data-pvgo]')
        elif st['kind'] == 'task' and st['fix'] and 'data-fix' in st['pulse']:
            pg.click('#pNotes [data-fix]')
        else:
            pg.click('#tourShow')
    pg.wait_for_timeout(900); pg.mouse.move(W - 4, H - 4); shot(pg, 2.5)
    b.close()

lst = tmp / 'list.txt'
lst.write_text(''.join("file '%s'\nduration %.2f\n" % (f, d) for f, d in frames) + "file '%s'\n" % frames[-1][0])
out = ROOT / 'docs' / 'tutorial.gif'
pal = tmp / 'pal.png'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-vf', 'palettegen=max_colors=128:stats_mode=diff', str(pal)], check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(lst), '-i', str(pal), '-lavfi', 'paletteuse=dither=none:diff_mode=rectangle', '-fps_mode', 'vfr', '-loop', '0', str(out)], check=True)
print('wrote', out, len(frames), 'frames', round(out.stat().st_size / 1e6, 2), 'MB', round(sum(d for _, d in frames)), 's')
