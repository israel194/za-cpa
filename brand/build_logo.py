"""Build the עשור רואות חשבון logo family as font-independent SVGs.

The Hebrew wordmark and tagline are shaped with HarfBuzz and converted to
outlines, so the files render identically everywhere (img tags, favicons,
print, design tools). Run: py brand/build_logo.py
"""

from pathlib import Path

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'brand' / 'fonts'
OUT = ROOT / 'public' / 'brand'

WINE = '#6e1a2d'
DEEP = '#3a0f1c'
GOLD = '#a8894f'
GOLD_DARK = '#8a6a2f'
CHAMPAGNE = '#d9c08f'
IVORY = '#fbf7f4'

WORD = 'עשור'
TAGLINE = 'רואות חשבון'


class Face:
    """A static instance of a variable font, ready for shaping and drawing."""

    def __init__(self, filename: str, weight: int):
        path = FONTS / filename
        self.ttf = instancer.instantiateVariableFont(TTFont(path), {'wght': weight})
        self.glyphs = self.ttf.getGlyphSet()
        self.order = self.ttf.getGlyphOrder()
        self.upem = self.ttf['head'].unitsPerEm
        blob = hb.Blob.from_file_path(str(path))
        self.hb_font = hb.Font(hb.Face(blob))
        self.hb_font.set_variations({'wght': weight})

    def outline(self, text: str, size: float, tracking: float = 0.0):
        """Return (path_d, width) for text drawn with its baseline at y=0, starting at x=0."""
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hb_font, buf, {'kern': True, 'liga': True})
        scale = size / self.upem
        pen = SVGPathPen(self.glyphs, ntos=lambda v: f'{v:.2f}'.rstrip('0').rstrip('.'))
        x = 0.0
        count = len(buf.glyph_infos)
        for i, (info, pos) in enumerate(zip(buf.glyph_infos, buf.glyph_positions)):
            name = self.order[info.codepoint]
            gx = x + pos.x_offset * scale
            gy = pos.y_offset * scale
            self.glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, gx, -gy)))
            x += pos.x_advance * scale
            if i < count - 1:
                x += tracking
        return pen.getCommands(), x


# ── The mark: a Jerusalem-stone arch framing a drawn ע ─────────────────────
# Geometry lives in a 512 box; translate(0 -14) recentres it optically.

def mark_group(arch: str, letter: str, frame: str, with_frame: bool = True) -> str:
    frame_svg = (
        f'<path d="M 90 470 V 214 A 166 166 0 0 1 422 214 V 470" fill="none" stroke="{frame}" stroke-width="16"/>'
        if with_frame
        else ''
    )
    return f'''<g transform="translate(0 -14)">
    {frame_svg}
    <rect x="74" y="484" width="364" height="16" fill="{frame}"/>
    <path d="M 120 470 V 214 A 136 136 0 0 1 392 214 V 470 Z" fill="{arch}"/>
    <g fill="{letter}">
      <path d="M 290 176 H 354 V 214 L 290 206 Z"/>
      <path d="M 160 176 H 222 V 214 L 160 206 Z"/>
    </g>
    <g fill="none" stroke="{letter}" stroke-linejoin="round">
      <path d="M 336 200 V 318 C 336 364 312 384 266 384 H 156" stroke-width="38"/>
      <path d="M 196 200 L 328 365" stroke-width="28"/>
    </g>
  </g>'''


PALETTES = {
    'light': {'arch': WINE, 'letter': IVORY, 'frame': GOLD, 'word': WINE, 'rule': GOLD, 'tag': GOLD_DARK, 'bg': None},
    'inverse': {'arch': IVORY, 'letter': WINE, 'frame': CHAMPAGNE, 'word': IVORY, 'rule': CHAMPAGNE, 'tag': CHAMPAGNE, 'bg': DEEP},
    # Same colours as inverse but transparent, for placing on existing dark artwork.
    'on-dark': {'arch': IVORY, 'letter': WINE, 'frame': CHAMPAGNE, 'word': IVORY, 'rule': CHAMPAGNE, 'tag': CHAMPAGNE, 'bg': None},
}


def svg(view_w: float, view_h: float, body: str, title: str = 'עשור רואות חשבון') -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {view_w:.0f} {view_h:.0f}" '
        f'width="{view_w:.0f}" height="{view_h:.0f}" role="img" aria-label="{title}">\n'
        f'  <title>{title}</title>\n{body}\n</svg>\n'
    )


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    word_face = Face('FrankRuhlLibre.ttf', 700)
    tag_face = Face('Heebo.ttf', 500)

    word_size = 150
    word_d, word_w = word_face.outline(WORD, word_size)
    tag_size = 44
    tag_d, tag_w = tag_face.outline(TAGLINE, tag_size, tracking=6)

    # Wordmark block: the word on top, a gold rule, the tagline beneath. Right-aligned (RTL).
    block_w = max(word_w, tag_w)
    word_base = 120          # baseline of עשור inside the block
    rule_y = 150
    tag_base = 212
    block_h = 228

    def wordmark(p, x_right: float, y_top: float, align: str = 'right') -> str:
        if align == 'right':
            wx, tx, rx = x_right - word_w, x_right - tag_w, x_right - block_w
        else:  # centred on x_right
            wx, tx, rx = x_right - word_w / 2, x_right - tag_w / 2, x_right - block_w / 2
        return f'''  <path transform="translate({wx:.2f} {y_top + word_base:.2f})" fill="{p['word']}" d="{word_d}"/>
  <rect x="{rx:.2f}" y="{y_top + rule_y:.2f}" width="{block_w:.2f}" height="3" fill="{p['rule']}"/>
  <path transform="translate({tx:.2f} {y_top + tag_base:.2f})" fill="{p['tag']}" d="{tag_d}"/>'''

    for variant, p in PALETTES.items():
        suffix = {'light': '', 'inverse': '-inverse', 'on-dark': '-on-dark'}[variant]
        pad = 24 if p['bg'] else 0
        bg = lambda w, h: f'  <rect width="{w:.0f}" height="{h:.0f}" rx="28" fill="{p["bg"]}"/>\n' if p['bg'] else ''

        # Horizontal lockup: mark on the right, wordmark to its left.
        mark_size = 260
        gap = 34
        w = pad * 2 + block_w + gap + mark_size
        h = pad * 2 + mark_size
        mark_x = w - pad - mark_size
        body = bg(w, h) + (
            f'  <svg x="{mark_x:.2f}" y="{pad}" width="{mark_size}" height="{mark_size}" viewBox="0 0 512 512">\n'
            f'  {mark_group(p["arch"], p["letter"], p["frame"])}\n  </svg>\n'
            + wordmark(p, mark_x - gap, pad + (mark_size - block_h) / 2 + 6)
        )
        (OUT / f'logo-horizontal{suffix}.svg').write_text(svg(w, h, body), encoding='utf-8')

        # Stacked lockup: mark above, wordmark centred below.
        mark_size = 300
        w = pad * 2 + max(block_w, mark_size) + 40
        h = pad * 2 + mark_size + 16 + block_h
        cx = w / 2
        body = bg(w, h) + (
            f'  <svg x="{cx - mark_size / 2:.2f}" y="{pad}" width="{mark_size}" height="{mark_size}" viewBox="0 0 512 512">\n'
            f'  {mark_group(p["arch"], p["letter"], p["frame"])}\n  </svg>\n'
            + wordmark(p, cx, pad + mark_size + 16, align='center')
        )
        (OUT / f'logo-stacked{suffix}.svg').write_text(svg(w, h, body), encoding='utf-8')

        # Mark alone.
        body = (f'  <rect width="512" height="512" rx="96" fill="{p["bg"]}"/>\n' if p['bg'] else '') + '  ' + mark_group(
            p['arch'], p['letter'], p['frame']
        )
        (OUT / f'mark{suffix}.svg').write_text(svg(512, 512, body, 'עשור'), encoding='utf-8')

    # Favicon: no outer frame (it merges at 16px); tight square crop around arch + sill.
    fav = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="46 52 420 420" width="64" height="64">\n'
        '  <title>עשור רואות חשבון</title>\n  '
        + mark_group(WINE, IVORY, GOLD, with_frame=False)
        + '\n</svg>\n'
    )
    (ROOT / 'public' / 'favicon.svg').write_text(fav, encoding='utf-8')

    # Wordmark paths for the React <Logo> component.
    (ROOT / 'src' / 'components' / 'logoPaths.ts').write_text(
        '// Generated by brand/build_logo.py: outlined Hebrew wordmark (Frank Ruhl Libre 700)\n'
        '// and tagline (Heebo 500). Do not edit by hand; re-run the script instead.\n'
        f'export const WORD_PATH = {word_d!r}\n'
        f'export const WORD_WIDTH = {word_w:.2f}\n'
        f'export const TAG_PATH = {tag_d!r}\n'
        f'export const TAG_WIDTH = {tag_w:.2f}\n',
        encoding='utf-8',
    )
    print(f'word {word_w:.1f}px, tagline {tag_w:.1f}px -> {OUT}')


if __name__ == '__main__':
    build()
