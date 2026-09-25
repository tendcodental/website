/**
 * T&Co Dental — push emergency-number changes to the website instantly.
 *
 * Without this script the website still picks up changes on its own within about a minute.
 * With it, ticking/unticking a number updates the site within seconds.
 *
 * Setup (once): see docs/SETUP.md → "Instant updates (optional)".
 *   1. In the Google Sheet: Extensions → Apps Script, paste this file, Save.
 *   2. Project Settings (gear icon) → Script properties → add:
 *        SITE_URL           https://tandcodental.com
 *        REVALIDATE_SECRET  (the same value as the REVALIDATE_SECRET env variable in Vercel)
 *   3. Triggers (clock icon) → Add Trigger → function "onPhonesEdited",
 *      event source "From spreadsheet", event type "On edit" → Save and allow access.
 *      (It must be an installable trigger: simple onEdit() triggers can't call external URLs.)
 */
function onPhonesEdited(e) {
  // Only react to edits in columns A–C (label, phone, active).
  if (e && e.range && e.range.getColumn() > 3) return;

  var props = PropertiesService.getScriptProperties();
  var site = props.getProperty('SITE_URL');
  var secret = props.getProperty('REVALIDATE_SECRET');
  if (!site || !secret) {
    console.warn('SITE_URL or REVALIDATE_SECRET script property is missing.');
    return;
  }

  var response = UrlFetchApp.fetch(site.replace(/\/$/, '') + '/api/revalidate?target=emergency', {
    method: 'post',
    headers: { Authorization: 'Bearer ' + secret },
    muteHttpExceptions: true,
  });
  console.log('Website refresh: HTTP ' + response.getResponseCode() + ' ' + response.getContentText());
}

/** Run this once from the editor to check the connection (View → Logs / Execution log). */
function testConnection() {
  onPhonesEdited(null);
}
