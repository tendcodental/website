/**
 * Timezone helpers. All booking logic runs in clinic time (Europe/Sofia), independent of the
 * server's or the visitor's timezone. Dates are "YYYY-MM-DD" strings, times are "HH:MM".
 */
export const CLINIC_TZ = "Europe/Sofia";

const partsFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: CLINIC_TZ,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const pad = (n: number) => String(n).padStart(2, "0");

function partsInClinicTz(date: Date) {
  const p: Record<string, string> = {};
  for (const part of partsFormatter.formatToParts(date)) p[part.type] = part.value;
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, s: +p.second };
}

/** Offset of clinic time from UTC at the given instant, in minutes (e.g. 180 in summer). */
export function clinicOffsetMinutes(date: Date) {
  const p = partsInClinicTz(date);
  return Math.round((Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - date.getTime()) / 60_000);
}

/** Converts a clinic-local date + time to the absolute instant. DST-safe. */
export function clinicTimeToUtc(date: string, time = "00:00"): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, h, mi);
  const first = clinicOffsetMinutes(new Date(guess));
  let result = guess - first * 60_000;
  const second = clinicOffsetMinutes(new Date(result));
  if (second !== first) result = guess - second * 60_000;
  return new Date(result);
}

export function clinicDate(date: Date = new Date()) {
  const p = partsInClinicTz(date);
  return `${p.y}-${pad(p.m)}-${pad(p.d)}`;
}

export function clinicTime(date: Date) {
  const p = partsInClinicTz(date);
  return `${pad(p.h)}:${pad(p.mi)}`;
}

/** ISO weekday for a calendar date: 1 = Monday … 7 = Sunday. */
export function isoWeekday(date: string): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const [y, m, d] = date.split("-").map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return (wd === 0 ? 7 : wd) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

export function addDays(date: string, days: number) {
  const [y, m, d] = date.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}`;
}

export function monthBounds(month: string) {
  const [y, m] = month.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return { first: `${y}-${pad(m)}-01`, last: `${y}-${pad(m)}-${pad(last)}` };
}

export function addMinutesToTime(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number);
  const total = h * 60 + m + minutes;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const isDateString = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
export const isTimeString = (v: string) => /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
export const isMonthString = (v: string) => /^\d{4}-(0[1-9]|1[0-2])$/.test(v);
