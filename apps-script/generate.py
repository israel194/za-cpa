#!/usr/bin/env python3
"""
Regenerates apps-script/Code.gs.

Code.gs must stay pure ASCII. Hebrew labels are emitted as numeric character
codes, because plain Hebrew literals pasted into the Google Apps Script editor
were once stored in visual order and every label in every notification mail
arrived reversed letter by letter. ASCII digits cannot be reordered by an
editor or a clipboard, so this keeps that failure from returning.

Edit LABELS below, run `python3 apps-script/generate.py`, then paste the
regenerated Code.gs into the Apps Script editor and deploy a new version.
"""
import io
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TARGET = os.path.join(HERE, 'Code.gs')

# name -> (Hebrew text, ASCII note shown beside the generated line)
LABELS = [
    ('SUBJ_OFFICE', '\u05e4\u05e0\u05d9\u05d9\u05d4 \u05d7\u05d3\u05e9\u05d4 \u05de\u05d4\u05d0\u05ea\u05e8',
     'pniya hadasha me-ha-atar  (new enquiry from the site)'),
    ('SUBJ_ORIT', '\u05d4\u05e8\u05e9\u05de\u05d4 \u05d7\u05d3\u05e9\u05d4 \u05dc\u05e7\u05d1\u05d5\u05e6\u05ea \u05dc\u05d7\u05d6\u05d5\u05e8 \u05dc\u05e2\u05e6\u05de\u05da',
     'hairshama hadasha  (new Orit Group signup)'),
    ('L_NAME', '\u05e9\u05dd', 'shem  (name)'),
    ('L_EMAIL', '\u05d0\u05d9\u05de\u05d9\u05d9\u05dc', 'email'),
    ('L_PHONE', '\u05d8\u05dc\u05e4\u05d5\u05df', 'telefon  (phone)'),
    ('L_SERVICE', '\u05e9\u05d9\u05e8\u05d5\u05ea \u05de\u05d1\u05d5\u05e7\u05e9', 'sherut mevukash  (requested service)'),
    ('L_DATE', '\u05de\u05d5\u05e2\u05d3 \u05de\u05d1\u05d5\u05e7\u05e9', 'moed mevukash  (requested date)'),
    ('L_MSG', '\u05d4\u05d5\u05d3\u05e2\u05d4', 'hodaa  (message)'),
    ('L_FOOT', '\u05e0\u05e9\u05dc\u05d7 \u05d0\u05d5\u05d8\u05d5\u05de\u05d8\u05d9\u05ea \u05de\u05d4\u05d0\u05ea\u05e8',
     'nishlah otomatit  (sent automatically)'),
    ('L_NONAME', '\u05dc\u05dc\u05d0 \u05e9\u05dd', 'lelo shem  (no name given)'),
    ('L_RAW', '\u05e9\u05d2\u05d9\u05d0\u05d4 \u05d1\u05e2\u05d9\u05d1\u05d5\u05d3 \u05d4\u05e4\u05e0\u05d9\u05d9\u05d4. '
              '\u05d4\u05e0\u05ea\u05d5\u05e0\u05d9\u05dd \u05d4\u05d2\u05d5\u05dc\u05de\u05d9\u05d9\u05dd '
              '\u05de\u05e6\u05d5\u05e8\u05e4\u05d9\u05dd \u05d1\u05de\u05dc\u05d5\u05d0\u05dd',
     'shgiaa be-ibud  (processing error, raw payload attached)'),
]


def build_consts():
    width = max(len(name) for name, _, _ in LABELS)
    return '\n'.join(
        'var %s = h([%s]); // %s' % (
            name.ljust(width), ','.join(str(ord(c)) for c in text), note)
        for name, text, note in LABELS
    )


def main():
    src = io.open(TARGET, encoding='utf-8').read()
    start = src.index('var RLM = ')
    start = src.index('\n\n', start) + 2
    end = src.index('var ROUTES = {')
    updated = src[:start] + build_consts() + '\n\n' + src[end:]
    io.open(TARGET, 'w', encoding='utf-8').write(updated)

    non_ascii = [i + 1 for i, line in enumerate(updated.split('\n'))
                 if any(ord(c) > 127 for c in line)]
    if non_ascii:
        raise SystemExit('Code.gs is not pure ASCII; offending lines: %s' % non_ascii)
    print('Code.gs regenerated, pure ASCII, %d labels.' % len(LABELS))


if __name__ == '__main__':
    main()
