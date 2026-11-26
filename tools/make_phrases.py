#!/usr/bin/env python3
"""Convert the phrase table of nashamri/academic-phrases (an Emacs package, GPL-3.0) to JSON.

    python3 tools/make_phrases.py path/to/academic-phrases.el > data/phrases/academic-phrases.json

Nothing is reworded: each category title, template and list of choices is copied as it stands.
The output is a derived work of the package and carries its licence (see data/phrases/README.md).
"""
import json, re, sys

def parse(src):
    """A small reader for the Lisp forms the table uses: lists, strings, symbols, quote marks."""
    i, n, stack, cur = 0, len(src), [], []
    while i < n:
        c = src[i]
        if c == ';':
            while i < n and src[i] != '\n': i += 1
        elif c in ' \t\r\n\'`,': i += 1
        elif c == '(':
            stack.append(cur); cur = []; i += 1
        elif c == ')':
            done = cur; cur = stack.pop(); cur.append(done); i += 1
        elif c == '"':
            j, out = i + 1, []
            while src[j] != '"':
                if src[j] == '\\': j += 1
                out.append(src[j]); j += 1
            cur.append(('s', ''.join(out))); i = j + 1
        else:
            j = i
            while j < n and src[j] not in ' \t\r\n()"': j += 1
            cur.append(src[i:j]); i = j
    return cur

def field(ht, key):
    for x in ht[1:]:
        if isinstance(x, list) and x and x[0] == key: return x[1:]
    return None

src = open(sys.argv[1], encoding='utf-8').read()
table = next(f for f in parse(src) if isinstance(f, list) and f[:2] == ['defvar', 'academic-phrases--all-phrases'])[2]
cats = []
for entry in table[1:]:
    num = int(entry[0][4:]); ht = entry[1]
    title = field(ht, ':title')[0][1].strip()
    items = []
    for it in field(ht, ':items')[0][1:]:
        tpl = field(it, ':template')[0][1]
        ch = field(it, ':choices')
        choices = [g for g in ([c[1] for c in group] for group in ch[0]) if g] if ch and isinstance(ch[0], list) else []
        slots = len(re.findall(r'\[\{\d\}\]', tpl))
        assert slots == len(choices), (num, tpl, choices)
        items.append({'t': tpl, 'c': choices} if choices else {'t': tpl})
    cats.append({'n': num, 'title': title, 'items': items})
cats.sort(key=lambda c: c['n'])
rng = lambda a, b: list(range(a, b + 1))
out = {
    'name': 'academic-phrases',
    'source': 'https://github.com/nashamri/academic-phrases',
    'copyright': 'Copyright (C) 2017-2018 Nasser Alshammari',
    'licence': 'GPL-3.0-or-later',
    'basis': 'Based on "English for Writing Research Papers: Useful Phrases" (Adrian Wallwork, Springer), '
             'done with the permission of Springer Nature and Adrian Wallwork, as stated in the package README.',
    'changes': 'Converted from Emacs Lisp to JSON for Topic & Emphasis. No wording changed.',
    # the sections the package offers, with the categories it lists under each
    'sections': [['Abstract', [1, 2, 4, 5]], ['Introduction', rng(1, 16)], ['Literature review', [4] + rng(9, 16)],
                 ['Methods', rng(17, 30)], ['Results', rng(29, 40)], ['Discussion', rng(35, 45)],
                 ['Conclusions', rng(45, 51)], ['Acknowledgements', [52]], ['Throughout the paper', rng(53, 57)]],
    'cats': cats,
}
json.dump(out, sys.stdout, ensure_ascii=False, separators=(',', ':'))
