import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { EMERGENCY_TAG } from "@/lib/emergency";
import { env } from "@/lib/env";
import { REVIEWS_TAG } from "@/lib/reviews";
import { bearerToken, safeEqual } from "@/lib/security";

export const dynamic = "force-dynamic";

const TAGS: Record<string, string> = { emergency: EMERGENCY_TAG, reviews: REVIEWS_TAG };

/**
 * Webhook for instant updates. The Google Apps Script in docs/apps-script calls this when the
 * emergency-phone sheet is edited:  POST /api/revalidate?target=emergency  (Authorization: Bearer <secret>)
 */
export async function POST(request: Request) {
  if (!env.revalidateSecret || !safeEqual(bearerToken(request), env.revalidateSecret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const target = new URL(request.url).searchParams.get("target") ?? "emergency";
  const tag = TAGS[target];
  if (!tag) return NextResponse.json({ ok: false, code: "UNKNOWN_TARGET" }, { status: 400 });

  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: tag, at: new Date().toISOString() });
}
