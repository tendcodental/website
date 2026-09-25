import { after, NextResponse } from "next/server";
import { z } from "zod";
import { reasonById } from "@/content/booking";
import { type DoctorId, doctors } from "@/content/doctors";
import { getCalendarClient } from "@/lib/booking/availability";
import { createBooking } from "@/lib/booking/create";
import { isDateString, isTimeString } from "@/lib/booking/time";
import { clinicNotificationEmail, patientConfirmationEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/lib/env";
import { normalizePhone } from "@/lib/phone";
import { clientIp, rateLimit, verifyTurnstile } from "@/lib/security";

export const dynamic = "force-dynamic";

const schema = z.object({
  doctor: z.enum(["any", ...(doctors.map((d) => d.id) as [DoctorId, ...DoctorId[]])]),
  date: z.string().refine(isDateString),
  time: z.string().refine(isTimeString),
  reason: z.string().refine((v) => Boolean(reasonById(v))),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.union([z.literal(""), z.email().max(200)]).optional(),
  note: z.string().trim().max(600).optional(),
  nzok: z.boolean().optional(),
  consent: z.literal(true),
  locale: z.enum(["bg", "en"]),
  // Anti-spam: hidden field that must stay empty + time spent on the form.
  website: z.string().max(500).optional(),
  elapsedMs: z.number().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`book:${ip}`, 6, 10 * 60_000)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED" }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "INVALID", issues: parsed.error.issues.map((i) => i.path[0]) }, { status: 422 });
  }
  const data = parsed.data;

  // Bots that fill the honeypot get a silent "success" so they don't adapt.
  if (data.website) return NextResponse.json({ ok: true, booking: null });
  if ((data.elapsedMs ?? 0) < 2500) {
    return NextResponse.json({ ok: false, code: "TOO_FAST" }, { status: 422 });
  }
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, code: "CAPTCHA" }, { status: 422 });
  }

  const phone = normalizePhone(data.phone);
  if (!phone) return NextResponse.json({ ok: false, code: "INVALID", issues: ["phone"] }, { status: 422 });

  const calendar = getCalendarClient();
  if (!calendar) return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });

  try {
    const result = await createBooking(calendar, {
      doctor: data.doctor,
      date: data.date,
      time: data.time,
      reason: data.reason,
      name: data.name.replace(/\s+/g, " "),
      phone,
      email: data.email || undefined,
      note: data.note || undefined,
      nzok: Boolean(data.nzok),
      locale: data.locale,
    });

    if (!result.ok) {
      const status = result.code === "OUT_OF_RANGE" ? 422 : 409;
      return NextResponse.json({ ok: false, code: result.code }, { status });
    }

    const booking = result.booking;
    after(async () => {
      const jobs = [sendEmail({ ...clinicNotificationEmail(booking), to: env.clinicInbox })];
      if (booking.email) jobs.push(sendEmail(patientConfirmationEmail(booking)));
      await Promise.allSettled(jobs);
    });

    return NextResponse.json({
      ok: true,
      booking: {
        doctorId: booking.doctorId,
        date: booking.date,
        time: booking.time,
        start: booking.start,
        end: booking.end,
        reasonId: booking.reasonId,
        emailSent: Boolean(booking.email && env.resendKey),
      },
    });
  } catch (error) {
    console.error("[booking]", error);
    return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });
  }
}
