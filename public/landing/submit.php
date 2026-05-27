<?php
/**
 * ZA-CPA Landing — lead form mailer.
 *
 * Sends leads from index.html to office@za-cpa.com using PHP mail().
 *
 * Hosting requirements:
 *   - PHP 7.4+ on a host with sendmail/postfix wired (cPanel/Hostinger/Liquid
 *     Web are fine; GitHub Pages CANNOT run this file — it serves it as text).
 *
 * To activate this backend instead of Apps Script:
 *   1. Deploy index.html + submit.php to a PHP-capable host.
 *   2. In index.html, change `const ENDPOINT = 'apps-script'` to `'php'`.
 *
 * For improved deliverability under SPF/DMARC, switch from mail() to PHPMailer
 * with SMTP credentials (e.g. Google Workspace SMTP relay). See bottom of file.
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ── Validate inputs ──────────────────────────────────────────────────────
$name    = trim((string)($_POST['name']    ?? ''));
$phone   = trim((string)($_POST['phone']   ?? ''));
$email   = trim((string)($_POST['email']   ?? ''));
$service = trim((string)($_POST['service'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

if ($name === '' || $phone === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_required_fields']);
    exit;
}
if (!preg_match('/^[\d\s\-\+\(\)]{7,}$/u', $phone)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_phone']);
    exit;
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_email']);
    exit;
}

// Anti-spam: trivially short submissions and known-bad UAs.
$ua = $_SERVER['HTTP_USER_AGENT'] ?? '';
if (strlen($name) < 2 || stripos($ua, 'curl') !== false && empty($_POST['service'])) {
    // Silently accept to not leak detection.
    echo json_encode(['ok' => true]);
    exit;
}

// ── Compose mail ─────────────────────────────────────────────────────────
$to = 'office@za-cpa.com';
$subject = "פנייה חדשה מדף הנחיתה — $name";
$subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$lines = [];
$lines[] = "שם: $name";
$lines[] = "טלפון: $phone";
if ($email !== '')   $lines[] = "דוא\"ל: $email";
if ($service !== '') $lines[] = "שירות מבוקש: $service";
if ($message !== '') { $lines[] = ''; $lines[] = 'הודעה:'; $lines[] = $message; }
$lines[] = '';
$lines[] = "— נשלח אוטומטית מ-{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}";
$lines[] = 'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$body = implode("\r\n", $lines);

$replyTo = $email !== '' ? $email : 'office@za-cpa.com';

$headers = implode("\r\n", [
    'From: ZA-CPA Landing <no-reply@za-cpa.com>',
    "Reply-To: $replyTo",
    'X-Mailer: ZA-CPA-Landing/1.0',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$ok = @mail($to, $subject, $body, $headers, '-f no-reply@za-cpa.com');

if (!$ok) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'mail_failed']);
    exit;
}

echo json_encode(['ok' => true]);

/* ──────────────────────────────────────────────────────────────────────────
 * Optional: replace mail() with PHPMailer + SMTP for better deliverability
 *
 *   require 'PHPMailer/PHPMailer.php';
 *   require 'PHPMailer/SMTP.php';
 *   require 'PHPMailer/Exception.php';
 *
 *   $mail = new PHPMailer\PHPMailer\PHPMailer(true);
 *   $mail->isSMTP();
 *   $mail->Host       = 'smtp-relay.gmail.com';   // or your provider
 *   $mail->SMTPAuth   = true;
 *   $mail->Username   = 'sender@za-cpa.com';
 *   $mail->Password   = getenv('SMTP_PASSWORD');
 *   $mail->SMTPSecure = 'tls';
 *   $mail->Port       = 587;
 *   $mail->CharSet    = 'UTF-8';
 *   $mail->setFrom('no-reply@za-cpa.com', 'ZA-CPA Landing');
 *   $mail->addAddress($to);
 *   $mail->addReplyTo($replyTo);
 *   $mail->Subject = $subject;
 *   $mail->Body    = $body;
 *   $mail->send();
 * ────────────────────────────────────────────────────────────────────────── */
