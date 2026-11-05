// GENERATED from Code.src.gs by build.py. Edit the source, not this file.
/**
 * ZA-CPA + Orit Group — form notification endpoint (readable source).
 *
 * DO NOT paste this file into Apps Script. Run `py apps-script/build.py`, which
 * writes Code.gs with every Hebrew string encoded as \uXXXX escapes. The escaped
 * file survives any copy/paste or editor encoding, so the Hebrew can never come
 * out reversed or garbled again (the previous deployment stored it reversed).
 *
 * Deploy: paste the whole of Code.gs into the Apps Script editor, then
 * Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.
 * The web-app URL stays the same.
 */

var RLM = '\u200F'; // right-to-left mark: forces RTL base direction in plain text

var BRAND = {
  wine: '#6e1a2d',
  deep: '#3a0f1c',
  gold: '#8a6a2f',
  champagne: '#d9c08f',
  ivory: '#fbf7f4',
  line: '#eadcdb',
  text: '#2b1a20',
  muted: '#7a6a6e'
};

var ROUTES = {
  office: { to: 'office@za-cpa.com', title: '\u05E4\u05E0\u05D9\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05DE\u05D4\u05D0\u05EA\u05E8', subject: '\u05E4\u05E0\u05D9\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4' },
  orit:   { to: 'orit@za-cpa.com',   title: '\u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05DC\u05E7\u05D1\u05D5\u05E6\u05EA "\u05DC\u05D7\u05D6\u05D5\u05E8 \u05DC\u05E2\u05E6\u05DE\u05DA"', subject: '\u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05DC\u05E7\u05D1\u05D5\u05E6\u05D4' }
};

// ── Spam filter ─────────────────────────────────────────────────────────────
// Returns true for submissions that look automated; doPost then answers "ok"
// without sending mail, so bots learn nothing.
function looksLikeSpam(data) {
  if (data.company_website) return true; // honeypot field on the landing pages
  var name = String(data.name || '').trim();
  var inner = name.slice(1);
  if (name.length >= 8 && /^[A-Za-z]+$/.test(name) && /[a-z]/.test(name) &&
      (inner.match(/[A-Z]/g) || []).length >= 2) return true; // e.g. "ZzSJUTEzqilpXpwPN"
  if (data.phone && !normalizePhone(data.phone)) return true; // not an Israeli number
  return false;
}

// ── Phone helpers ───────────────────────────────────────────────────────────
// Returns the local form (e.g. 0523975659) or '' when not an Israeli number.
function normalizePhone(raw) {
  var d = String(raw || '').replace(/[\s\-().]/g, '');
  if (d.indexOf('+972') === 0) d = '0' + d.slice(4);
  else if (d.indexOf('972') === 0 && d.length >= 11) d = '0' + d.slice(3);
  return /^0(?:[23489]\d{7}|[57]\d{8})$/.test(d) ? d : '';
}

function displayPhone(local) {
  // 05x / 07x → 3-7, landlines (02, 03, 04, 08, 09) → 2-7
  return /^0[57]/.test(local) ? local.slice(0, 3) + '-' + local.slice(3) : local.slice(0, 2) + '-' + local.slice(2);
}

function intlPhone(local) {
  return '972' + local.slice(1);
}

// ── HTML building blocks (inline styles + tables: renders in Gmail/Outlook) ──
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ltr(s) {
  return '<span dir="ltr" style="unicode-bidi:isolate;direction:ltr">' + s + '</span>';
}

function button(href, label, bg) {
  return '<td style="padding:4px">' +
    '<a href="' + esc(href) + '" style="display:inline-block;padding:12px 18px;border-radius:999px;' +
    'background:' + bg + ';color:#ffffff;font-weight:bold;font-size:15px;text-decoration:none;white-space:nowrap">' +
    label + '</a></td>';
}

function detailRow(label, valueHtml) {
  return '<tr>' +
    '<td style="padding:11px 0;border-bottom:1px solid ' + BRAND.line + ';color:' + BRAND.muted + ';font-size:14px;width:110px;vertical-align:top">' + label + '</td>' +
    '<td style="padding:11px 0;border-bottom:1px solid ' + BRAND.line + ';color:' + BRAND.text + ';font-size:16px;font-weight:bold">' + valueHtml + '</td>' +
    '</tr>';
}

function israelTime() {
  return Utilities.formatDate(new Date(), 'Asia/Jerusalem', 'dd/MM/yyyy HH:mm');
}

// Older landing-page builds pack the file type and discounts into `message`;
// split them out so they get the highlighted box too.
function splitLegacyMessage(message) {
  var out = { entity: '', discounts: [], source: '', rest: [] };
  String(message || '').split('\n').forEach(function (line) {
    var t = line.trim();
    if (!t) return;
    var m = t.match(/^\u05D1\u05E7\u05E9\u05D4 \u05DC\u05E4\u05EA\u05D9\u05D7\u05EA \u05EA\u05D9\u05E7\s*[\u2014\u2013-]\s*(.+)$/);
    if (m) { out.entity = m[1]; return; }
    if (/^\*.*\*$/.test(t)) { out.discounts.push(t.replace(/^\*|\*$/g, '')); return; }
    var s = t.match(/^\(\u05E0\u05E9\u05DC\u05D7 \u05DE\u05D3\u05E3 \u05D4\u05E0\u05D7\u05D9\u05EA\u05D4:\s*(.+)\)$/);
    if (s) { out.source = '\u05D3\u05E3 \u05E0\u05D7\u05D9\u05EA\u05D4: ' + s[1]; return; }
    out.rest.push(t);
  });
  return out;
}

// ── Entry points ────────────────────────────────────────────────────────────
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (looksLikeSpam(data)) {
    return ContentService.createTextOutput('{"ok":true}');
  }
  var route = ROUTES[data.target] || ROUTES.office;

  var legacy = splitLegacyMessage(data.message);
  var entity = data.entity || legacy.entity;
  var discounts = (data.discounts && data.discounts.length) ? data.discounts : legacy.discounts;
  var source = data.source || legacy.source || (data.target === 'orit' ? '\u05D3\u05E3 "\u05DC\u05D7\u05D6\u05D5\u05E8 \u05DC\u05E2\u05E6\u05DE\u05DA"' : '\u05D4\u05D0\u05EA\u05E8 \u05D4\u05E8\u05D0\u05E9\u05D9');
  var note = legacy.rest.join('\n');

  var name = String(data.name || '').trim() || '\u05DC\u05DC\u05D0 \u05E9\u05DD';
  var email = String(data.email || '').trim();
  var phone = normalizePhone(data.phone);

  // Action buttons
  var buttons = '';
  if (phone) {
    buttons += button('tel:+' + intlPhone(phone), '\u05D4\u05EA\u05E7\u05E9\u05E8\u05D5\u05EA', BRAND.wine);
    buttons += button('https://wa.me/' + intlPhone(phone), '\u05D5\u05D5\u05D0\u05D8\u05E1\u05D0\u05E4', '#1f8f4e');
  }
  if (email) buttons += button('mailto:' + email, '\u05DE\u05E2\u05E0\u05D4 \u05D1\u05DE\u05D9\u05D9\u05DC', BRAND.gold);

  // Details
  var rows = '';
  if (phone) rows += detailRow('\u05D8\u05DC\u05E4\u05D5\u05DF', '<a href="tel:+' + intlPhone(phone) + '" style="color:' + BRAND.wine + ';text-decoration:none">' + ltr(displayPhone(phone)) + '</a>');
  else if (data.phone) rows += detailRow('\u05D8\u05DC\u05E4\u05D5\u05DF', ltr(esc(data.phone)));
  if (email) rows += detailRow('\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC', '<a href="mailto:' + esc(email) + '" style="color:' + BRAND.wine + ';text-decoration:none">' + ltr(esc(email)) + '</a>');
  if (entity) rows += detailRow('\u05E1\u05D5\u05D2 \u05EA\u05D9\u05E7', esc(entity));
  if (data.sessionDate) rows += detailRow('\u05DE\u05D5\u05E2\u05D3 \u05DE\u05D1\u05D5\u05E7\u05E9', esc(data.sessionDate));
  rows += detailRow('\u05DE\u05E7\u05D5\u05E8', esc(source));

  var highlights = '';
  if (discounts.length) {
    highlights = '<tr><td style="padding:0 28px 8px">' +
      '<div style="background:#f6efe0;border:1px solid ' + BRAND.champagne + ';border-radius:12px;padding:14px 16px">' +
      '<div style="font-weight:bold;color:' + BRAND.gold + ';margin-bottom:6px;font-size:14px">\u05D6\u05DB\u05D0\u05D5\u05EA \u05DC\u05D4\u05E0\u05D7\u05D4</div>' +
      discounts.map(function (d) { return '<div style="color:' + BRAND.text + ';font-size:15px;line-height:1.6">\u2713 ' + esc(d) + '</div>'; }).join('') +
      '</div></td></tr>';
  }

  var msgBlock = '';
  if (note) {
    msgBlock = '<tr><td style="padding:8px 28px 4px">' +
      '<div style="font-weight:bold;color:' + BRAND.muted + ';font-size:14px;margin-bottom:6px">\u05D4\u05D5\u05D3\u05E2\u05D4</div>' +
      '<div style="background:' + BRAND.ivory + ';border-right:4px solid ' + BRAND.champagne + ';border-radius:8px;padding:14px 16px;color:' + BRAND.text + ';font-size:15px;line-height:1.7">' +
      esc(note).replace(/\n/g, '<br>') + '</div></td></tr>';
  }

  var html =
    '<div dir="rtl" lang="he" style="direction:rtl;text-align:right;background:#f4ece9;padding:24px 10px;font-family:Arial,Helvetica,sans-serif">' +
    '<table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border-collapse:separate">' +
      '<tr><td style="background:' + BRAND.wine + ';padding:22px 28px">' +
        '<div style="color:' + BRAND.champagne + ';font-size:13px;letter-spacing:1px">\u05E2\u05E9\u05D5\u05E8 \u00B7 \u05E8\u05D5\u05D0\u05D9 \u05D7\u05E9\u05D1\u05D5\u05DF</div>' +
        '<div style="color:#ffffff;font-size:21px;font-weight:bold;margin-top:4px">' + esc(route.title) + '</div>' +
      '</td></tr>' +
      '<tr><td style="padding:24px 28px 6px">' +
        '<div style="color:' + BRAND.muted + ';font-size:13px">\u05E9\u05DD \u05D4\u05E4\u05D5\u05E0\u05D4</div>' +
        '<div style="color:' + BRAND.wine + ';font-size:26px;font-weight:bold;margin-top:2px">' + esc(name) + '</div>' +
      '</td></tr>' +
      (buttons ? '<tr><td style="padding:10px 24px 6px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>' + buttons + '</tr></table></td></tr>' : '') +
      '<tr><td style="padding:10px 28px 14px"><table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' + rows + '</table></td></tr>' +
      highlights +
      msgBlock +
      '<tr><td style="padding:18px 28px 22px;color:' + BRAND.muted + ';font-size:12px">\u05D4\u05EA\u05E7\u05D1\u05DC \u05D1\u05BE' + ltr(israelTime()) + ' \u00B7 \u05E0\u05E9\u05DC\u05D7 \u05D0\u05D5\u05D8\u05D5\u05DE\u05D8\u05D9\u05EA \u05DE\u05D0\u05EA\u05E8 za-cpa.com</td></tr>' +
    '</table></div>';

  // Plain-text fallback: every line starts with RLM so it reads right-to-left.
  var lines = [route.title, '', '\u05E9\u05DD: ' + name];
  if (phone) lines.push('\u05D8\u05DC\u05E4\u05D5\u05DF: \u200E' + displayPhone(phone) + '\u200F');
  else if (data.phone) lines.push('\u05D8\u05DC\u05E4\u05D5\u05DF: \u200E' + data.phone + '\u200F');
  if (email) lines.push('\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC: \u200E' + email + '\u200F');
  if (entity) lines.push('\u05E1\u05D5\u05D2 \u05EA\u05D9\u05E7: ' + entity);
  if (data.sessionDate) lines.push('\u05DE\u05D5\u05E2\u05D3 \u05DE\u05D1\u05D5\u05E7\u05E9: ' + data.sessionDate);
  discounts.forEach(function (d) { lines.push('\u05D4\u05E0\u05D7\u05D4: ' + d); });
  lines.push('\u05DE\u05E7\u05D5\u05E8: ' + source);
  if (note) lines.push('', '\u05D4\u05D5\u05D3\u05E2\u05D4:', note);
  lines.push('', '\u05D4\u05EA\u05E7\u05D1\u05DC \u05D1\u05BE' + israelTime());
  var plain = lines.map(function (l) { return l ? RLM + l : l; }).join('\n');

  var mail = {
    to: route.to,
    subject: RLM + route.subject + ': ' + name + ' \u00B7 ' + source,
    body: plain,
    htmlBody: html,
    name: '\u05D0\u05EA\u05E8 \u05E2\u05E9\u05D5\u05E8 \u05E8\u05D5\u05D0\u05D9 \u05D7\u05E9\u05D1\u05D5\u05DF'
  };
  if (email) mail.replyTo = email; // "Reply" goes straight to the lead
  MailApp.sendEmail(mail);

  return ContentService.createTextOutput('{"ok":true}');
}

function doGet() {
  return ContentService.createTextOutput('ZA-CPA notify endpoint is live');
}

// Run once from the Apps Script editor (Run → testEmail) to receive a sample.
function testEmail() {
  doPost({ postData: { contents: JSON.stringify({
    target: 'office',
    name: '\u05D9\u05E9\u05E8\u05D0\u05DC \u05D9\u05E9\u05E8\u05D0\u05DC\u05D9',
    phone: '052-3975659',
    email: 'office@za-cpa.com',
    entity: '\u05E2\u05D5\u05E1\u05E7 \u05E4\u05D8\u05D5\u05E8',
    discounts: ['\u05D4\u05D2\u05D9\u05E2/\u05D4 \u05D3\u05E8\u05DA \u05EA\u05D4\u05DC \u05D0\u05D6\u05D5\u05DC\u05D0\u05D9'],
    source: '\u05D3\u05E3 \u05E0\u05D7\u05D9\u05EA\u05D4: \u05E4\u05EA\u05D9\u05D7\u05EA \u05E2\u05E1\u05E7',
    message: '\u05D1\u05D3\u05D9\u05E7\u05EA \u05EA\u05D1\u05E0\u05D9\u05EA \u05D4\u05DE\u05D9\u05D9\u05DC.'
  }) } });
}
