#!/usr/bin/env python3
"""Build data/lists/awl.json and data/lists/afl.json from machine-readable copies of the published lists.

    python3 tools/make_lists.py AWL.json AFL_all.txt [afl-list.ts]

AWL.json      the Academic Word List as in lpmi-13/machine_readable_wordlists (CC0 1.0)
AFL_all.txt   the Academic Formulas List as a tab-separated table: phrase, sub-list, rank, spoken raw,
              spoken per million, written raw, written per million, FTW
afl-list.ts   optional second transcription (formula|sublist|speech/M|writing/M|FTW) used only as a check

Only word strings and numbers are kept: headwords, family members, sublist numbers, formulas, the list each
formula is on, its rank, its frequency per million words in speech and in writing, and its formula teaching
worth. No definitions, example sentences or page markup are read or written.
"""
import json, re, sys

awl_src, afl_src = sys.argv[1], sys.argv[2]
check = sys.argv[3] if len(sys.argv) > 3 else None

raw = json.load(open(awl_src, encoding='utf-8'))
subs = {}
for key in sorted(raw, key=lambda k: int(k.split('_')[1])):
    n = int(key.split('_')[1])
    clean = lambda w: re.sub(r'[\u2010\u2011\u2012\u2013]', '-', w).strip().lower()
    subs[n] = {clean(h): sorted({clean(w) for w in (v.get('subwords') or []) if w and clean(w) != clean(h)}) for h, v in sorted(raw[key].items())}
heads = sum(len(v) for v in subs.values())
awl = {
    'name': 'Academic Word List',
    'reference': 'Coxhead, A. (2000). A new academic word list. TESOL Quarterly, 34(2), 213-238.',
    'holds': 'Word strings and sublist numbers only: %d headwords in 10 sublists, with the members of each word family.' % heads,
    'read_from': 'https://github.com/lpmi-13/machine_readable_wordlists (CC0 1.0), which gives its source as the Victoria University of Wellington pages.',
    'sublists': {str(n): subs[n] for n in sorted(subs)},
}
json.dump(awl, open('data/lists/awl.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

rows = []
# the source file has lost its apostrophes to the replacement character; they are put back
for line in open(afl_src, encoding='utf-8', errors='replace').read().replace('\r', '').replace('\ufffd', "'").replace('\u2019', "'").split('\n'):
    c = line.split('\t')
    if len(c) < 8 or c[0].startswith('#'): continue
    num = lambda x: (int(float(x)) if float(x) == int(float(x)) else float(x))
    rows.append({'f': re.sub(r'\s+', ' ', c[0].strip().lower()), 'list': c[1].strip().lower(), 'rank': int(c[2]), 'spoken_pm': num(c[4]), 'written_pm': num(c[6]), 'ftw': float(c[7])})
if check:
    body = open(check, encoding='utf-8').read().split('String.raw`')[1].split('`')[0]
    other = {}
    for ln in body.strip().split('\n'):
        p = ln.split('|')
        if len(p) == 5: other[(p[0].strip().lower().replace('\u2019', "'"), p[1].strip().lower())] = (float(p[2]), float(p[3]), float(p[4]))
    diff = [(r['f'], r['list'], (r['spoken_pm'], r['written_pm'], r['ftw']), other.get((r['f'], r['list']))) for r in rows
            if other.get((r['f'], r['list'])) != (float(r['spoken_pm']), float(r['written_pm']), r['ftw'])]
    sys.stderr.write('second transcription: %d rows; %d of %d differ or are missing\n' % (len(other), len(diff), len(rows)))
    for d in diff[:12]: sys.stderr.write('  %r\n' % (d,))
afl = {
    'name': 'Academic Formulas List',
    'reference': 'Simpson-Vlach, R., & Ellis, N. C. (2010). An Academic Formulas List: New methods in phraseology research. Applied Linguistics, 31(4), 487-512.',
    'holds': 'Word strings and numbers only: %d formulas, the list each is on, its rank there, its frequency per million words in speech and in writing, and its formula teaching worth (FTW).' % len(rows),
    'ftw': 'Formula teaching worth = 0.56 x mutual information + 0.31 x frequency, in standard units, fitted by the authors to instructors\' ratings.',
    'read_from': 'https://github.com/egumasa/Multi-Word-Units-Profiler (unit_lists/AFL_all.txt), checked against https://github.com/bouxin/Vocabs (src/data/afl-list.ts).',
    'formulas': rows,
}
json.dump(afl, open('data/lists/afl.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
sys.stderr.write('AWL: %d headwords, sublist sizes %s, %d word forms\n' % (heads, [len(subs[n]) for n in sorted(subs)], heads + sum(len(m) for v in subs.values() for m in v.values())))
from collections import Counter
sys.stderr.write('AFL: %d formulas, %s\n' % (len(rows), dict(Counter(r['list'] for r in rows))))
