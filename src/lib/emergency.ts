import "server-only";
import { unstable_cache } from "next/cache";
import { env, hasGoogleAuth } from "@/lib/env";
import { getGoogleAccessToken } from "@/lib/google/auth";
import { normalizePhone } from "@/lib/phone";

export const EMERGENCY_TAG = "emergency-phones";

export interface EmergencyPhones {
  /** E.164 numbers, in sheet order. Never empty. */
  phones: string[];
  source: "sheet" | "fallback";
}

const isChecked = (v: unknown) =>
  v === true || v === 1 || (typeof v === "string" && ["true", "да", "yes", "1", "✓", "x"].includes(v.trim().toLowerCase()));

/**
 * Reads the admin sheet: column A = label (optional, for staff only), B = phone, C = active checkbox.
 * Runs on the server with the service account; the browser never sees any credentials.
 */
async function readSheet(): Promise<string[] | null> {
  if (!hasGoogleAuth() || !env.sheetId) return null;
  const token = await getGoogleAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.sheetId)}/values/${encodeURIComponent(
    env.sheetRange,
  )}?valueRenderOption=UNFORMATTED_VALUE`;
  const res = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Sheets API ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { values?: unknown[][] };
  const phones = (data.values ?? [])
    .filter((row) => isChecked(row[2]))
    .map((row) => normalizePhone(row[1] as string | number))
    .filter((p): p is string => Boolean(p));
  return [...new Set(phones)];
}

/**
 * Active emergency number(s). Cached for 60 s and tagged, so a sheet edit shows up within a minute -
 * or instantly when the optional Apps Script webhook calls /api/revalidate. If the sheet is
 * unreachable or nothing is ticked, the fallback number keeps the site working.
 */
export const getEmergencyPhones = unstable_cache(
  async (): Promise<EmergencyPhones> => {
    try {
      const phones = await readSheet();
      if (phones?.length) return { phones, source: "sheet" };
    } catch (error) {
      console.error("[emergency] could not read Google Sheet:", error);
    }
    return { phones: [normalizePhone(env.emergencyFallback) ?? "+359888000247"], source: "fallback" };
  },
  ["emergency-phones-v1"],
  { revalidate: 60, tags: [EMERGENCY_TAG] },
);
