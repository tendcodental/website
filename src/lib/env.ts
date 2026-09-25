import "server-only";

function privateKey() {
  const raw = process.env.GOOGLE_PRIVATE_KEY;
  if (!raw) return undefined;
  // Vercel/.env files usually store the key with literal "\n" sequences and sometimes wrapping quotes.
  return raw.replace(/^"|"$/g, "").replace(/\\n/g, "\n");
}

export const env = {
  isProd: process.env.NODE_ENV === "production",

  googleEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  googleKey: privateKey(),
  calendarId: process.env.GOOGLE_CALENDAR_ID,
  sheetId: process.env.GOOGLE_SHEET_ID,
  sheetRange: process.env.GOOGLE_SHEET_RANGE || "A2:C20",

  placesKey: process.env.GOOGLE_PLACES_API_KEY,
  placeId: process.env.GOOGLE_PLACE_ID,

  resendKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM || "T&Co Dental <booking@tandcodental.com>",
  clinicInbox: process.env.CLINIC_NOTIFY_EMAIL || "contact@tandcodental.com",

  emergencyFallback: process.env.EMERGENCY_PHONE_FALLBACK || "+359888000247",

  revalidateSecret: process.env.REVALIDATE_SECRET,
  cronSecret: process.env.CRON_SECRET,
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY,

  /** Lets a deployed preview use the in-memory demo calendar before Google is connected. */
  bookingDemo: process.env.BOOKING_DEMO_MODE === "true",
};

export const hasGoogleAuth = () => Boolean(env.googleEmail && env.googleKey);

/** google = live calendar · demo = in-memory calendar (dev/preview) · off = booking unavailable. */
export function calendarMode(): "google" | "demo" | "off" {
  if (hasGoogleAuth() && env.calendarId) return "google";
  if (!env.isProd || env.bookingDemo) return "demo";
  return "off";
}
