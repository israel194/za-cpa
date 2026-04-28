/**
 * ZA-CPA + Orit Group — form notification endpoint
 *
 * Deployment:
 *   1. Open https://script.google.com  →  New project
 *   2. Paste this file's contents into Code.gs
 *   3. Deploy  →  New deployment  →  type: Web app
 *      - Execute as:    Me  (the Google Workspace account that owns the inboxes)
 *      - Who has access: Anyone
 *   4. Authorize the script when prompted (it needs MailApp permission)
 *   5. Copy the deployment URL (looks like https://script.google.com/macros/s/AKfy.../exec)
 *   6. Paste it into NOTIFY_ENDPOINT in src/lib/notify.ts
 *
 * The site posts a JSON body with `Content-Type: text/plain` so that no CORS
 * preflight is required. Apps Script does not support custom CORS response
 * headers — text/plain is the standard workaround.
 */

const ROUTES = {
  office: {
    to: 'office@za-cpa.com',
    subjectPrefix: 'פנייה חדשה מהאתר',
  },
  orit: {
    to: 'orit@za-cpa.com',
    subjectPrefix: 'הרשמה חדשה — קבוצת לחזור לעצמך',
  },
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const route = ROUTES[data.target] || ROUTES.office;

    const lines = [];
    if (data.name) lines.push('שם: ' + data.name);
    if (data.email) lines.push('דוא"ל: ' + data.email);
    if (data.phone) lines.push('טלפון: ' + data.phone);
    if (data.sessionDate) lines.push('מועד מבוקש: ' + data.sessionDate);
    if (data.message) lines.push('', 'הודעה:', data.message);
    lines.push('', '— נשלח אוטומטית מהאתר');

    MailApp.sendEmail({
      to: route.to,
      subject: route.subjectPrefix + ' — ' + (data.name || 'ללא שם'),
      body: lines.join('\n'),
      replyTo: data.email || undefined,
      name: 'ZA-CPA Website',
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('ZA-CPA notify endpoint is live')
    .setMimeType(ContentService.MimeType.TEXT);
}
