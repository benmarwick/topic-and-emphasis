#!/usr/bin/env python3
"""Build data/lists/akl.json, the four lists from github.com/words, and the compact copies in src/.

    python3 tools/make_wordlists.py AKL.json akl_adverbs.txt akl_others.txt WORDS_DIR

AKL.json         the Academic Keyword List as in lpmi-13/machine_readable_wordlists (CC0 1.0). That copy
                 splits multi-word entries into single words, so:
akl_adverbs.txt  the adverbs as shown on the UCLouvain page, separated by semicolons
akl_others.txt   the 'others' as shown on the UCLouvain page, separated by semicolons
WORDS_DIR        a folder holding clones of github.com/words/{hedges,weasels,fillers,buzzwords}

The script checks that the two page lists hold exactly the same words as the split copies before using them.
"""
import json, os, re, subprocess, sys
akl_src, adv_src, oth_src, words = sys.argv[1:5]
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
raw = json.load(open(akl_src, encoding='utf-8'))
page = lambda f: [x.strip() for x in open(f, encoding='utf-8').read().split(';') if x.strip()]
adv, oth = page(adv_src), page(oth_src)
for name, got in (('Adverbs', adv), ('Others', oth)):
    assert sorted(' '.join(got).split()) == sorted(raw[name]), name + ' differs from the split copy'
verbs, i = [], 0
while i < len(raw['Verbs']):
    w = raw['Verbs'][i]
    if i + 1 < len(raw['Verbs']) and raw['Verbs'][i + 1].startswith('('):
        w += ' ' + raw['Verbs'][i + 1]; i += 1
    verbs.append(w); i += 1
classes = {'nouns': raw['Nouns'], 'verbs': verbs, 'adjectives': raw['Adjectives'], 'adverbs': adv, 'others': oth}
total = sum(len(v) for v in classes.values())
akl = {
    'name': 'Academic Keyword List (AKL)',
    'reference': 'Paquot, M. (2010). Academic Vocabulary in Learner Writing: From Extraction to Analysis. London & New York: Continuum, 56-58.',
    'licence': 'Creative Commons Attribution 4.0 International (CC BY 4.0), as stated on the source page.',
    'source': 'https://uclouvain.be/en/research-institutes/ilc/cecl/the-academic-keyword-list-akl',
    'read_from': 'github.com/lpmi-13/machine_readable_wordlists (CC0 1.0) for nouns, verbs and adjectives; the source page for adverbs and others, whose multi-word entries that copy splits.',
    'note': 'The source page states 930 words (355 nouns, 233 verbs, 180 adjectives, 87 adverbs, 75 others). Its table, as read in November 2026, holds %d entries: %s.' % (total, ', '.join('%d %s' % (len(v), k) for k, v in classes.items())),
    'changes': 'None to the entries. Spelling is British, as published.',
    'classes': classes,
}
out = os.path.join(ROOT, 'data', 'lists')
json.dump(akl, open(os.path.join(out, 'akl.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(os.path.join(ROOT, 'src', 'akl.txt'), 'w', encoding='utf-8').write('|'.join(k[0:3] + ':' + ';'.join(v) for k, v in classes.items()) + '\n')

lists = {}
for name in ('hedges', 'weasels', 'fillers'):
    src = open(os.path.join(words, name, 'data.txt'), encoding='utf-8').read()
    open(os.path.join(out, 'words-' + name + '.txt'), 'w', encoding='utf-8').write(src)
    lists[name] = [l.strip().lower() for l in src.split('\n') if l.strip() and not l.strip().startswith('%')]
bz = json.loads(subprocess.run(['node', '--input-type=module', '-e', "import {buzzwords} from '%s';console.log(JSON.stringify(buzzwords))" % os.path.join(os.path.abspath(words), 'buzzwords', 'index.js')], capture_output=True, text=True, check=True).stdout)
open(os.path.join(out, 'words-buzzwords.txt'), 'w', encoding='utf-8').write('% buzzwords, from github.com/words/buzzwords (MIT), which takes them from Wikipedia\n' + '\n'.join(bz) + '\n')
lists['buzzwords'] = [w.lower() for w in bz]
for k, v in lists.items():
    assert not any(';' in w or '|' in w or '"' in w for w in v), k
open(os.path.join(ROOT, 'src', 'wordlists.txt'), 'w', encoding='utf-8').write('|'.join(k + ':' + ';'.join(v) for k, v in lists.items()) + '\n')
lic = open(os.path.join(words, 'hedges', 'license'), encoding='utf-8').read()
open(os.path.join(out, 'words-LICENSE.txt'), 'w', encoding='utf-8').write(lic)
print('akl', total, {k: len(v) for k, v in classes.items()}, '| words', {k: len(v) for k, v in lists.items()})
