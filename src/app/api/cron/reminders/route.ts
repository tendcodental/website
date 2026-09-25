import { NextResponse } from "next/server";
import { type DoctorId, isDoctorId } from "@/content/doctors";
import { getCalendarClient } from "@/lib/booking/availability";
import { bookingConfig } from "@/lib/booking/config";
import type { ConfirmedBooking } from "@/lib/booking/create";
import { addDays, clinicDate, clinicTime, clinicTimeToUtc } from "@/lib/booking/time";
import { patientReminderEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/lib/env";
import { bearerToken, safeEqual } from "@/lib/security";

export const dynamic = "force-dynamic";

/**
 * Daily job (see vercel.json): emails a reminder to every patient with a website booking tomorrow who
 * left an email address. Each event is marked `reminderSent=1` so a re-run never sends twice.
 */
export async function GET(request: Request) {
  if (!env.cronSecret || !safeEqual(bearerToken(request), env.cronSecret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const calendar = getCalendarClient();
  if (!calendar) return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });

  const tomorrow = addDays(clinicDate(), 1);
  const events = await calendar.list({
    timeMin: clinicTimeToUtc(tomorrow),
    timeMax: clinicTimeToUtc(addDays(tomorrow, 1)),
    privateProps: { source: bookingConfig.source },
  });

  let sent = 0;
  for (const ev of events) {
    const p = ev.extendedProperties?.private ?? {};
    if (ev.status === "cancelled" || !p.email || p.reminderSent === "1" || !ev.start.dateTime || !ev.end.dateTime) {
      continue;
    }
    if (!isDoctorId(p.doctor)) continue;

    const start = new Date(ev.start.dateTime);
    const booking: ConfirmedBooking = {
      eventId: ev.id,
      doctorId: p.doctor as DoctorId,
      date: clinicDate(start),
      time: clinicTime(start),
      start: start.toISOString(),
      end: new Date(ev.end.dateTime).toISOString(),
      reasonId: p.reason ?? "other",
      name: p.name ?? "",
      phone: p.phone ?? "",
      email: p.email,
      nzok: p.nzok === "1",
      locale: p.locale === "en" ? "en" : "bg",
    };
    if (await sendEmail(patientReminderEmail(booking))) {
      await calendar.patch(ev.id, { extendedProperties: { private: { ...p, reminderSent: "1" } } });
      sent++;
    }
  }
  return NextResponse.json({ ok: true, date: tomorrow, sent });
}
