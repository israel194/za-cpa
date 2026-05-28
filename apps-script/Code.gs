function h(codes) { return String.fromCharCode.apply(null, codes); }

var SUBJ_OFFICE = h([1508,1504,1497,1497,1492,32,1495,1491,1513,1492,32,1502,1492,1488,1514,1512]);
var SUBJ_ORIT   = h([1492,1512,1513,1502,1492,32,1495,1491,1513,1492,32,45,32,1511,1489,1493,1510,1514,32,1500,1495,1494,1493,1512,32,1500,1506,1510,1502,1498]);
var L_NAME   = h([1513,1501]);
var L_EMAIL  = h([1488,1497,1502,1497,1497,1500]);
var L_PHONE  = h([1496,1500,1508,1493,1503]);
var L_DATE   = h([1502,1493,1506,1491,32,1502,1489,1493,1511,1513]);
var L_MSG    = h([1492,1493,1491,1506,1492]);
var L_FOOT   = h([45,32,1504,1513,1500,1495,32,1488,1493,1496,1493,1502,1496,1497,1514,32,1502,1492,1488,1514,1512]);
var L_NONAME = h([1500,1500,1488,32,1513,1501]);

var ROUTES = {
  office: { to: 'office@za-cpa.com', subjectPrefix: SUBJ_OFFICE },
  orit:   { to: 'orit@za-cpa.com',   subjectPrefix: SUBJ_ORIT }
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

  // Plain-text fallback part.
  var lines = [];
  if (data.name)        lines.push(L_NAME  + ': ' + data.name);
  if (data.email)       lines.push(L_EMAIL + ': ' + data.email);
  if (data.phone)       lines.push(L_PHONE + ': ' + data.phone);
  if (data.sessionDate) lines.push(L_DATE  + ': ' + data.sessionDate);
  if (data.message)     lines.push('', L_MSG + ':', data.message);
  lines.push('', L_FOOT);
  var plain = lines.join('\n');

  // HTML part — explicit RTL so Hebrew renders correctly in every client.
  var rows = '';
  if (data.name)        rows += row(L_NAME,  data.name,  false);
  if (data.email)       rows += row(L_EMAIL, data.email, true);
  if (data.phone)       rows += row(L_PHONE, data.phone, true);
  if (data.sessionDate) rows += row(L_DATE,  data.sessionDate, false);

  var msg = '';
  if (data.message) {
    msg = '<div style="margin-top:16px">' +
      '<div style="font-weight:bold;color:#0a1c3a;margin-bottom:4px">' + L_MSG + ':</div>' +
      '<div style="color:#222">' + esc(data.message).replace(/\n/g, '<br>') + '</div>' +
      '</div>';
  }

  var html =
    '<div dir="rtl" lang="he" style="direction:rtl;text-align:right;' +
    'font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222">' +
    '<table dir="rtl" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' + rows + '</table>' +
    msg +
    '<div style="margin-top:20px;color:#999;font-size:13px">' + L_FOOT + '</div>' +
    '</div>';

  MailApp.sendEmail({
    to: route.to,
    subject: route.subjectPrefix + ' - ' + (data.name || L_NONAME),
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
