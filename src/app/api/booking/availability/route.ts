import { NextResponse, type NextRequest } from "next/server";
import { isDoctorId } from "@/content/doctors";
import { getCalendarClient, getMonthAvailability } from "@/lib/booking/availability";
import { isMonthString } from "@/lib/booking/time";
import { calendarMode } from "@/lib/env";
import { clientIp, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const month = params.get("month") ?? "";
  const doctor = params.get("doctor") ?? "any";
  const locale = params.get("locale") === "en" ? "en" : "bg";

  if (!isMonthString(month) || !(doctor === "any" || isDoctorId(doctor))) {
    return NextResponse.json({ ok: false, code: "BAD_REQUEST" }, { status: 400 });
  }
  if (!rateLimit(`avail:${clientIp(request)}`, 60, 60_000)) {
    return NextResponse.json({ ok: false, code: "RATE_LIMITED" }, { status: 429 });
  }

  const calendar = getCalendarClient();
  if (!calendar) return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });

  try {
    const data = await getMonthAvailability(calendar, month, doctor, locale);
    return NextResponse.json(
      { ok: true, demo: calendarMode() === "demo", ...data },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (error) {
    console.error("[availability]", error);
    return NextResponse.json({ ok: false, code: "UNAVAILABLE" }, { status: 503 });
  }
}
