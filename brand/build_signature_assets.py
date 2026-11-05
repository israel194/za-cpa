"""Graphic assets for the staff email signatures (public/brand/email/sig2-*).

Email clients ignore CSS gradients and SVG, so every gradient/monogram is baked
into a PNG at 2x. Hebrew initials are outlined with HarfBuzz (see build_logo.py)
so the PNGs don't depend on installed fonts. Run: py brand/build_signature_assets.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_logo import Face  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'brand' / 'email'
ICONS = ROOT / 'brand' / 'email-icons'

PEACH = '#f7b9a0'
ROSE = '#d16d8a'
WINE = '#6e1a2d'

GRADIENT = f'''<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="{PEACH}"/><stop offset="0.5" stop-color="{ROSE}"/><stop offset="1" stop-color="{WINE}"/>
</linearGradient>'''

INITIALS = {'orit': 'אע', 'lea': 'לפ', 'tamar': 'תב', 'sara': 'שב'}


CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'


def render(svg: str, out: Path, scale: float = 1.0) -> None:
    """Rasterise with headless Chrome (MuPDF ignores SVG gradients), then crop
    the transparent screenshot to the SVG's own size."""
    import re
    import subprocess
    import tempfile

    from PIL import Image

    w = int(re.search(r'width="(\d+)"', svg).group(1))
    h = int(re.search(r'height="(\d+)"', svg).group(1))
    with tempfile.TemporaryDirectory() as tmp:
        page = Path(tmp) / 'a.html'
        shot = Path(tmp) / 'a.png'
        page.write_text(
            '<html><body style="margin:0;background:transparent">' + svg + '</body></html>', encoding='utf-8'
        )
        subprocess.run(
            [CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
             f'--window-size={max(w, 500)},{max(h, 200)}', f'--screenshot={shot}', page.as_uri()],
            check=True, capture_output=True,
        )
        Image.open(shot).convert('RGBA').crop((0, 0, w, h)).save(out)
    print(out.name, w, 'x', h)


def monogram(key: str, face: Face) -> None:
    d, w = face.outline(INITIALS[key], 56)
    # Optical centring: cap height of Frank Ruhl at 56px ≈ 40px.
    x, y = 64 - w / 2, 64 + 20
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
<defs>{GRADIENT}</defs>
<circle cx="64" cy="64" r="62" fill="url(#g)"/>
<circle cx="64" cy="64" r="55" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="2"/>
<path transform="translate({x:.2f} {y:.2f})" fill="#ffffff" d="{d}"/>
</svg>'''
    render(svg, OUT / f'sig2-mono-{key}.png')


def chip(name: str) -> None:
    glyph = (ICONS / f'{name}.svg').read_text(encoding='utf-8')
    inner = glyph[glyph.index('>') + 1: glyph.rindex('</svg>')]
    attrs = 'fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'
    if name == 'whatsapp':
        attrs = 'fill="#ffffff"'
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
<circle cx="22" cy="22" r="22" fill="{ROSE}"/>
<g transform="translate(11 11) scale(0.9167)" {attrs}>{inner}</g>
</svg>'''
    render(svg, OUT / f'sig2-{name}.png')


def bar() -> None:
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="8" viewBox="0 0 1040 8">
<defs><linearGradient id="b" x1="1" y1="0" x2="0" y2="0">
<stop offset="0" stop-color="{PEACH}"/><stop offset="0.45" stop-color="{ROSE}"/><stop offset="1" stop-color="{WINE}"/>
</linearGradient></defs>
<rect width="1040" height="8" rx="4" fill="url(#b)"/>
</svg>'''
    render(svg, OUT / 'sig2-bar.png')


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    face = Face('FrankRuhlLibre.ttf', 700)
    for k in INITIALS:
        monogram(k, face)
    for n in ('phone', 'mail', 'globe', 'pin', 'whatsapp'):
        chip(n)
    bar()
