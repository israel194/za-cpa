"""Build the staff email signatures page: public/signatures/index.html.

Email clients only render table layouts with inline styles and hosted PNGs,
so every signature is a self-contained table; images live on za-cpa.com.
Run: py brand/build_signatures.py
"""

from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'signatures' / 'index.html'
IMG = 'https://za-cpa.com/brand/email'

WINE = '#6e1a2d'
GOLD = '#8a6a2f'
CHAMPAGNE = '#d9c08f'
MUTED = '#7a6a6e'
TEXT = '#2b1a20'

OFFICE_PHONE = ('02-5000275', 'tel:+97225000275')
ADDRESS = 'נחום חפצדי 17, גבעת שאול, ירושלים · מגדל רם, קומה 11'
SITE = ('za-cpa.com', 'https://za-cpa.com')

STAFF = [
    {'name': 'אורית עשור', 'title': 'רו"ח', 'email': 'orit@za-cpa.com'},
    {'name': 'לאה פרידמן', 'title': 'מתמחה', 'email': 'office@za-cpa.com'},
    {'name': 'תמר בן דוד', 'title': 'יועצת מס', 'email': 'office@za-cpa.com'},
    {'name': 'שרה בר שלום', 'title': 'מנהלת תיקים', 'email': 'office@za-cpa.com'},
]

FONT = "font-family:Arial,Helvetica,sans-serif"


def ltr(s: str) -> str:
    return f'<span dir="ltr" style="unicode-bidi:isolate">{s}</span>'


def contact(icon: str, html: str) -> str:
    return (
        f'<tr><td style="padding:2px 0 2px 8px;vertical-align:middle;width:16px">'
        f'<img src="{IMG}/sig-{icon}.png" width="14" height="14" alt="" style="display:block;border:0"></td>'
        f'<td style="padding:2px 0;{FONT};font-size:13px;color:{TEXT};vertical-align:middle">{html}</td></tr>'
    )


def link(text: str, href: str) -> str:
    return f'<a href="{escape(href)}" style="color:{TEXT};text-decoration:none">{text}</a>'


def signature(p: dict) -> str:
    rows = ''.join([
        contact('phone', link(ltr(OFFICE_PHONE[0]), OFFICE_PHONE[1])),
        contact('mail', link(ltr(escape(p['email'])), 'mailto:' + p['email'])),
        contact('globe', link(ltr(SITE[0]), SITE[1])),
        contact('pin', escape(ADDRESS)),
    ])
    return f'''<table dir="rtl" cellpadding="0" cellspacing="0" border="0" style="direction:rtl;text-align:right;border-collapse:collapse;{FONT}">
<tr>
<td style="padding:0 0 0 18px;vertical-align:top">
<div style="{FONT};font-size:20px;font-weight:bold;color:{WINE};line-height:1.25">{escape(p['name'])}</div>
<div style="{FONT};font-size:14px;font-weight:bold;color:{GOLD};margin-top:2px">{escape(p['title'])} · עשור רואי חשבון</div>
<div style="height:2px;width:56px;background:{CHAMPAGNE};margin:9px 0 8px;line-height:2px;font-size:0">&nbsp;</div>
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">{rows}</table>
</td>
<td style="width:2px;background:{CHAMPAGNE};font-size:0;line-height:0">&nbsp;</td>
<td style="padding:0 18px 0 0;vertical-align:middle">
<a href="{SITE[1]}"><img src="{IMG}/sig-logo.png" width="66" height="106" alt="עשור רואי חשבון" style="display:block;border:0"></a>
</td>
</tr>
<tr><td colspan="3" style="padding-top:12px;{FONT};font-size:10px;line-height:1.5;color:{MUTED};max-width:520px">
הודעה זו והמצורף אליה מיועדים לנמען בלבד ועשויים להכיל מידע חסוי. אם קיבלת אותה בטעות, נא להודיע לשולח ולמחוק אותה.
</td></tr>
</table>'''


def page() -> str:
    cards = []
    for i, p in enumerate(STAFF):
        cards.append(f'''<section class="card">
<header><h2>{escape(p['name'])}</h2><span>{escape(p['title'])}</span>
<button type="button" data-copy="sig-{i}">העתקת החתימה</button></header>
<div class="sig" id="sig-{i}">{signature(p)}</div>
</section>''')
    return f'''<!doctype html>
<html dir="rtl" lang="he">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>חתימות מייל · עשור רואי חשבון</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>
  body {{ margin:0; background:#fbf7f4; color:{TEXT}; font-family:Heebo,Arial,sans-serif; }}
  .wrap {{ max-width:860px; margin:0 auto; padding:32px 20px 60px; }}
  h1 {{ color:{WINE}; font-size:28px; margin:0 0 6px; }}
  .lead {{ color:{MUTED}; margin:0 0 26px; line-height:1.7; }}
  .card {{ background:#fff; border:1px solid #eadcdb; border-radius:18px; padding:20px 22px 24px; margin-bottom:18px; box-shadow:0 18px 40px -32px rgba(110,26,45,.45); }}
  .card header {{ display:flex; align-items:center; gap:10px; border-bottom:1px solid #f1e6e4; padding-bottom:12px; margin-bottom:18px; }}
  .card h2 {{ margin:0; font-size:18px; color:{WINE}; }}
  .card header span {{ color:{GOLD}; font-size:14px; }}
  .card button {{ margin-inline-start:auto; border:0; border-radius:999px; background:{WINE}; color:#fff; font:inherit; font-weight:700; font-size:14px; padding:9px 18px; cursor:pointer; }}
  .card button.done {{ background:#1f8f4e; }}
  .sig {{ overflow-x:auto; }}
  ol {{ line-height:1.9; padding-inline-start:20px; }}
  .howto {{ background:#fff; border:1px solid #eadcdb; border-radius:18px; padding:18px 22px; margin-top:26px; }}
  .howto h3 {{ color:{WINE}; margin:0 0 6px; }}
</style>
</head>
<body><div class="wrap">
<h1>חתימות מייל · עשור רואי חשבון</h1>
<p class="lead">לחצו "העתקת החתימה" ליד השם שלכם, ואז הדביקו אותה בהגדרות החתימה של Gmail. ההוראות המלאות מופיעות בתחתית העמוד.</p>
{''.join(cards)}
<div class="howto">
<h3>איך מגדירים ב־Gmail (מהמחשב)</h3>
<ol>
<li>לחצו "העתקת החתימה" ליד השם שלכם.</li>
<li>ב־Gmail: גלגל השיניים למעלה ← "הצגת כל ההגדרות" ← לשונית "כללי".</li>
<li>גללו ל"חתימה" ← "יצירת חתימה חדשה" ← תנו לה שם, למשל "עשור".</li>
<li>לחצו בתוך תיבת החתימה והדביקו (Ctrl+V).</li>
<li>תחת "ברירות מחדל לחתימה" בחרו את החתימה גם להודעות חדשות וגם לתשובות.</li>
<li>גללו לתחתית העמוד ולחצו "שמירת השינויים".</li>
</ol>
</div>
</div>
<script>
document.querySelectorAll('[data-copy]').forEach(function (btn) {{
  btn.addEventListener('click', async function () {{
    var el = document.getElementById(btn.dataset.copy)
    try {{
      await navigator.clipboard.write([new ClipboardItem({{
        'text/html': new Blob([el.innerHTML], {{ type: 'text/html' }}),
        'text/plain': new Blob([el.innerText], {{ type: 'text/plain' }}),
      }})])
    }} catch (e) {{
      var r = document.createRange(); r.selectNodeContents(el)
      var s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('copy'); s.removeAllRanges()
    }}
    btn.textContent = 'הועתק ✓'; btn.classList.add('done')
    setTimeout(function () {{ btn.textContent = 'העתקת החתימה'; btn.classList.remove('done') }}, 2500)
  }})
}})
</script>
</body></html>
'''


OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(page(), encoding='utf-8')
print('written', OUT)
