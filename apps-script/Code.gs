/**
 * ZA-CPA + Orit Group — form notification endpoint.
 *
 * Hebrew is written as normal UTF-8 string literals (the Apps Script editor
 * stores UTF-8 correctly) so the labels render the same correct way the
 * visitor's own submitted Hebrew does. Every subject/line is prefixed with a
 * Right-to-Left Mark (U+200F) to force RTL base direction, which keeps Hebrew
 * from rendering reversed in mail clients that default a line to LTR.
 *
 * After editing: paste this whole file into the Apps Script editor, then
 * Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy.
 */

var RLM = '‏'; // Right-to-left mark — forces RTL base direction

var ROUTES = {
  office: { to: 'office@za-cpa.com', subject: 'פנייה חדשה מהאתר' },
  orit:   { to: 'orit@za-cpa.com',   subject: 'הרשמה חדשה - קבוצת לחזור לעצמך' }
};

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// One label/value row. `ltr` wraps LTR data (phone, email) so digits and @
// keep their natural order inside the RTL layout.
function row(label, value, ltr) {
  var v = esc(value);
  if (ltr) v = '<span dir="ltr" style="unicode-bidi:embed">' + v + '</span>';
  return '<tr>' +
    '<td style="padding:5px 0;font-weight:bold;color:#0a1c3a;white-space:nowrap;vertical-align:top">' + label + ':</td>' +
    '<td style="padding:5px 14px;color:#222">' + v + '</td>' +
    '</tr>';
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var route = ROUTES[data.target] || ROUTES.office;

  // Plain-text fallback — each line forced RTL with a leading RLM.
  var lines = [];
  if (data.name)        lines.push(RLM + 'שם: ' + data.name);
  if (data.email)       lines.push(RLM + 'אימייל: ' + data.email);
  if (data.phone)       lines.push(RLM + 'טלפון: ' + data.phone);
  if (data.sessionDate) lines.push(RLM + 'מועד מבוקש: ' + data.sessionDate);
  if (data.message)     lines.push('', RLM + 'הודעה:', RLM + data.message);
  lines.push('', RLM + '- נשלח אוטומטית מהאתר');
  var plain = lines.join('\n');

  // HTML part — explicit RTL so Hebrew renders correctly in every client.
  var rows = '';
  if (data.name)        rows += row('שם', data.name, false);
  if (data.email)       rows += row('אימייל', data.email, true);
  if (data.phone)       rows += row('טלפון', data.phone, true);
  if (data.sessionDate) rows += row('מועד מבוקש', data.sessionDate, false);

  var msg = '';
  if (data.message) {
    msg = '<div style="margin-top:16px">' +
      '<div style="font-weight:bold;color:#0a1c3a;margin-bottom:4px">הודעה:</div>' +
      '<div style="color:#222">' + esc(data.message).replace(/\n/g, '<br>') + '</div>' +
      '</div>';
  }

  var html =
    '<div dir="rtl" lang="he" style="direction:rtl;text-align:right;' +
    'font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222">' +
    '<table dir="rtl" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' + rows + '</table>' +
    msg +
    '<div style="margin-top:20px;color:#999;font-size:13px">- נשלח אוטומטית מהאתר</div>' +
    '</div>';

  MailApp.sendEmail({
    to: route.to,
    subject: RLM + route.subject + ' - ' + (data.name || 'ללא שם'),
    body: plain,
    htmlBody: html,
    replyTo: data.email || undefined,
    name: 'ZA-CPA Website'
  });

  return ContentService.createTextOutput('{"ok":true}');
}

function doGet() {
  return ContentService.createTextOutput('ZA-CPA notify endpoint is live');
}
