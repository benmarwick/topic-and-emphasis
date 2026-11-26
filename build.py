#!/usr/bin/env python3
"""Build Topic & Stress from the pieces in src/.

    python3 build.py                 writes index.html, a complete page that runs on its own
    python3 build.py --fragment F    also writes F, the same page without the outer
                                     <html>, <head> and <body> tags, for hosts that add their own
"""
import argparse, io, os

ROOT = os.path.dirname(os.path.abspath(__file__))


def read(name):
    with io.open(os.path.join(ROOT, 'src', name), encoding='utf-8') as f:
        return f.read()


def fragment():
    head, body, engine, ui = read('head.html'), read('body.html'), read('engine.js'), read('ui.js')
    ngsl = ' '.join(read('ngsl.txt').split())
    nawl = ' '.join(read('nawl.txt').split())
    lists = ('\n/* Word lists: New General Service List 1.2 and New Academic Word List 1.2, '
             'by C. Browne, B. Culligan and J. Phillips, newgeneralservicelist.com. '
             'Licensed CC BY-SA 4.0. */\n'
             'const NGSL_RAW="' + ngsl + '";\nconst NAWL_RAW="' + nawl + '";'
             '\n/* Familiar words of the New Dale-Chall formula (Chall & Dale 1995), as listed in '
             'github.com/words/dale-chall (MIT). Style words from the excess-vocabulary list of '
             'Kobak et al. (2025), github.com/berenslab/llm-excess-vocab (MIT). */\n'
             'const DALE_RAW="' + ' '.join(read('dalechall.txt').split()) + '";\n'
             'const EXCESS_RAW="' + ' '.join(read('excess.txt').split()) + '";')
    return (head + body + '\n<script>\n/*ENGINE-START*/' + lists + engine +
            '/*ENGINE-END*/\n' + ui + '</script>\n')


# What a bare page needs that an embedding host would otherwise supply.
SHELL_HEAD = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
              '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
              '<style>:root{color-scheme:light;padding:env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px)}'
              'body{margin:0;font:14px system-ui,-apple-system,"Segoe UI",sans-serif}'
              'img{max-width:100%}[hidden]{display:none!important}</style>\n')


def standalone(frag):
    cut = frag.index('</style>') + len('</style>')
    return SHELL_HEAD + frag[:cut] + '\n</head>\n<body>\n' + frag[cut:].lstrip('\n') + '</body>\n</html>\n'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--fragment', metavar='FILE', help='also write the page without its outer tags')
    args = ap.parse_args()
    frag = fragment()
    with io.open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(standalone(frag))
    print('built index.html')
    if args.fragment:
        with io.open(args.fragment, 'w', encoding='utf-8') as f:
            f.write(frag)
        print('built', args.fragment)


if __name__ == '__main__':
    main()
