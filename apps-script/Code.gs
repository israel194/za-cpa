/**
 * ZA-CPA + Orit Group - form notification endpoint.
 *
 * WHY THE HEBREW IS WRITTEN AS NUMBER CODES
 * -----------------------------------------
 * Every Hebrew string below is built from numeric character codes, so this
 * file is pure ASCII. That is deliberate and must stay that way.
 *
 * Plain Hebrew string literals were used here once before. Pasting them into
 * the Apps Script editor stored them in VISUAL order instead of LOGICAL order,
 * and every label in every notification mail came out reversed letter by
 * letter: "shem" arrived as "msh", "hodaa" as "eadoh", and the subject line
 * "pniya hadasha me-ha-atar" as "rta-ah-em ahsdah ayinp". No RTL attribute can
 * repair that, because the Unicode bidi algorithm never reorders letters
 * inside a word - the stored characters themselves were backwards.
 *
 * ASCII digits cannot be reordered by any editor or clipboard, so encoding the
 * labels this way makes that failure impossible to reintroduce.
 *
 * To change a label, edit the generator in the repo and regenerate this file.
 * Never type or paste raw Hebrew into the Apps Script editor.
 *
 * After editing: paste this whole file into the Apps Script editor, then
 * Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy.
 */

function h(codes) { return String.fromCharCode.apply(null, codes); }

var RLM = h([8207]); // right-to-left mark: forces RTL base direction on a line

var SUBJ_OFFICE = h([1508,1504,1497,1497,1492,32,1495,1491,1513,1492,32,1502,1492,1488,1514,1512]); // pniya hadasha me-ha-atar  (new enquiry from the site)
var SUBJ_ORIT   = h([1492,1512,1513,1502,1492,32,1495,1491,1513,1492,32,1500,1511,1489,1493,1510,1514,32,1500,1495,1494,1493,1512,32,1500,1506,1510,1502,1498]); // hairshama hadasha  (new Orit Group signup)
var L_NAME      = h([1513,1501]); // shem  (name)
var L_EMAIL     = h([1488,1497,1502,1497,1497,1500]); // email
var L_PHONE     = h([1496,1500,1508,1493,1503]); // telefon  (phone)
var L_SERVICE   = h([1513,1497,1512,1493,1514,32,1502,1489,1493,1511,1513]); // sherut mevukash  (requested service)
var L_DATE      = h([1502,1493,1506,1491,32,1502,1489,1493,1511,1513]); // moed mevukash  (requested date)
var L_MSG       = h([1492,1493,1491,1506,1492]); // hodaa  (message)
var L_FOOT      = h([1504,1513,1500,1495,32,1488,1493,1496,1493,1502,1496,1497,1514,32,1502,1492,1488,1514,1512]); // nishlah otomatit  (sent automatically)
var L_NONAME    = h([1500,1500,1488,32,1513,1501]); // lelo shem  (no name given)
var L_RAW       = h([1513,1490,1497,1488,1492,32,1489,1506,1497,1489,1493,1491,32,1492,1508,1504,1497,1497,1492,46,32,1492,1504,1514,1493,1504,1497,1501,32,1492,1490,1493,1500,1502,1497,1497,1501,32,1502,1510,1493,1512,1508,1497,1501,32,1489,1502,1500,1493,1488,1501]); // shgiaa be-ibud  (processing error, raw payload attached)

var ROUTES = {
  office: { to: 'office@za-cpa.com', subject: SUBJ_OFFICE },
  orit:   { to: 'orit@za-cpa.com',   subject: SUBJ_ORIT }
};

// Fields that get their own Hebrew label, in display order.
var KNOWN = ['name', 'email', 'phone', 'service', 'sessionDate', 'message'];

var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * One label/value row.
 *
 * `ltr` marks values that are inherently left-to-right, such as a phone
 * number. They go inside <bdi> with unicode-bidi:isolate so the surrounding
 * RTL layout cannot reorder them. Unlike wrapping a value in invisible
 * direction marks, <bdi> adds no characters, so the value still copies out of
 * the mail exactly as the visitor typed it.
 */
function row(label, value, ltr) {
  var v = esc(value);
  if (ltr) v = '<bdi dir="ltr" style="direction:ltr;unicode-bidi:isolate">' + v + '</bdi>';
  return '<tr>' +
    '<td style="padding:5px 0;font-weight:bold;color:#0a1c3a;white-space:nowrap;vertical-align:top">' + esc(label) + ':</td>' +
    '<td style="padding:5px 14px;color:#222">' + v + '</td>' +
    '</tr>';
}

/**
 * The submitted address is never normalised, trimmed, lower-cased or rewritten.
 * It is rendered exactly as received, and the same string is placed in the
 * mailto: href so the mail client links it as a whole instead of guessing where
 * the address ends inside an RTL line.
 */
function emailRow(label, value) {
  var addr = String(value);
  return '<tr>' +
    '<td style="padding:5px 0;font-weight:bold;color:#0a1c3a;white-space:nowrap;vertical-align:top">' + esc(label) + ':</td>' +
    '<td style="padding:5px 14px">' +
    '<a href="mailto:' + encodeURI(addr) + '" style="direction:ltr;unicode-bidi:isolate;color:#0a1c3a">' +
    '<bdi dir="ltr">' + esc(addr) + '</bdi></a>' +
    '</td></tr>';
}

function doPost(e) {
  var raw = (e && e.postData && e.postData.contents) || '';
  try {
    return handle(JSON.parse(raw));
  } catch (err) {
    // Never drop a lead: if anything above fails, forward the payload verbatim.
    try {
      MailApp.sendEmail({
        to: ROUTES.office.to,
        subject: RLM + SUBJ_OFFICE,
        body: RLM + L_RAW + '\n\n' + raw + '\n\n' + String(err)
      });
    } catch (ignored) {}
    return ContentService.createTextOutput('{"ok":false}');
  }
}

function handle(data) {
  var route = ROUTES[data.target] || ROUTES.office;
  var labels = {
    name: L_NAME, email: L_EMAIL, phone: L_PHONE,
    service: L_SERVICE, sessionDate: L_DATE
  };
  var order = ['name', 'email', 'phone', 'service', 'sessionDate'];

  // Any field the site starts sending that is not in KNOWN still reaches the
  // inbox under its own key, instead of being silently discarded.
  var extras = [];
  for (var key in data) {
    if (!data.hasOwnProperty(key) || key === 'target') continue;
    if (KNOWN.indexOf(key) !== -1) continue;
    if (data[key] === '' || data[key] == null) continue;
    extras.push({ key: key, value: data[key] });
  }

  // ---- plain-text part -------------------------------------------------
  // Each line opens with an RLM so its label sets RTL base direction. Values
  // are inserted verbatim, with no added direction marks, so an address copied
  // out of this part is byte for byte what was submitted.
  var lines = [];
  for (var i = 0; i < order.length; i++) {
    if (data[order[i]]) lines.push(RLM + labels[order[i]] + ': ' + data[order[i]]);
  }
  for (var j = 0; j < extras.length; j++) {
    lines.push(RLM + extras[j].key + ': ' + extras[j].value);
  }
  if (data.message) lines.push('', RLM + L_MSG + ':', RLM + data.message);
  lines.push('', RLM + L_FOOT);

  // ---- HTML part -------------------------------------------------------
  var rows = '';
  if (data.name)        rows += row(L_NAME, data.name, false);
  if (data.email)       rows += emailRow(L_EMAIL, data.email);
  if (data.phone)       rows += row(L_PHONE, data.phone, true);
  if (data.service)     rows += row(L_SERVICE, data.service, false);
  if (data.sessionDate) rows += row(L_DATE, data.sessionDate, false);
  for (var k = 0; k < extras.length; k++) {
    rows += row(extras[k].key, extras[k].value, false);
  }

  var msg = '';
  if (data.message) {
    msg = '<div style="margin-top:16px">' +
      '<div style="font-weight:bold;color:#0a1c3a;margin-bottom:4px">' + esc(L_MSG) + ':</div>' +
      '<div style="color:#222">' + esc(data.message).replace(/\n/g, '<br>') + '</div>' +
      '</div>';
  }

  var html =
    '<div dir="rtl" lang="he" style="direction:rtl;text-align:right;' +
    'font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#222">' +
    '<table dir="rtl" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' + rows + '</table>' +
    msg +
    '<div style="margin-top:20px;color:#999;font-size:13px">' + esc(L_FOOT) + '</div>' +
    '</div>';

  var options = {
    to: route.to,
    subject: RLM + route.subject + ' | ' + (data.name || L_NONAME),
    body: lines.join('\n'),
    htmlBody: html,
    name: 'ZA-CPA Website'
  };

  // An unparseable Reply-To makes MailApp throw, which would lose the lead
  // entirely, so it is set only when the address parses. Either way the address
  // itself is shown in the body.
  if (data.email && EMAIL_RE.test(String(data.email))) options.replyTo = String(data.email);

  MailApp.sendEmail(options);
  return ContentService.createTextOutput('{"ok":true}');
}

function doGet() {
  return ContentService.createTextOutput('ZA-CPA notify endpoint is live');
}
