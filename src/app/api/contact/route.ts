import { NextResponse } from "next/server";
import { z } from "zod";
import { contactMessageEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/lib/env";
import { clientIp, rateLimit, verifyTurnstile } from "@/lib/security";

export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(3000),
  consent: z.literal(true),
  locale: z.enum(["bg", "en"]),
  website: z.string().max(500).optional(),
  elapsedMs: z.number().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED" }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, code: "INVALID", issues: parsed.error.issues.map((i) => i.path[0]) }, { status: 422 });
  }
  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });
  if ((data.elapsedMs ?? 0) < 2500) return NextResponse.json({ ok: false, code: "TOO_FAST" }, { status: 422 });
  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, code: "CAPTCHA" }, { status: 422 });
  }

  if (!env.resendKey && env.isProd) {
    return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });
  }

  const sent = await sendEmail({ ...contactMessageEmail(data), to: env.clinicInbox });
  if (!sent && env.isProd) return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
