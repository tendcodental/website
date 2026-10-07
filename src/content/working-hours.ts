import type { DoctorId } from "./doctors";

/**
 * WORKING HOURS FOR ONLINE BOOKING
 *
 * Patients can only book a doctor inside these hours. To change them, edit the times below:
 *  - Format: "HH:MM-HH:MM", e.g. "09:00-12:00". The end time is when the last visit must finish
 *    (with 60-minute slots, "09:00-12:00" offers 09:00, 10:00 and 11:00).
 *  - Two blocks on one day: use a list, e.g. monday: ["09:00-12:00", "15:00-18:00"].
 *  - Day off: leave the day out (or delete the line).
 *
 * The clinic has one chair, so the doctors' hours must not overlap. The site refuses to start if they
 * do, or if a time is written incorrectly.
 * One-off changes (vacation, sick day, a single shifted day) don't go here: add an event in Google
 * Calendar instead (see ABSENCE_PATTERN in src/lib/booking/config.ts).
 */
export const workingHours: Record<DoctorId, WeeklyHours> = {
  // д-р Таирюмер
  tairyumer: {
    monday: "13:00-20:00",
    tuesday: "09:00-12:00",
    wednesday: "13:00-20:00",
    thursday: "09:00-11:00",
    friday: "15:00-20:00",
  },
  // д-р Константин Бояджиев
  boyadzhiev: {
    monday: "09:00-12:00",
    tuesday: "13:00-20:00",
    wednesday: "09:00-12:00",
    thursday: "15:00-20:00",
    friday: "09:00-11:00",
  },
  // д-р Натали Чифлигарова
  chifligarova: {
    thursday: "11:00-15:00",
    friday: "11:00-15:00",
  },
};

// ---------------------------------------------------------------------------------------------------
// Nothing below needs editing when the hours change.

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
type Weekday = (typeof WEEKDAYS)[number];
type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7;
type WeeklyHours = Partial<Record<Weekday, string | string[]>>;

const RANGE = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]|24):([0-5]\d)$/;
const minutes = (h: string, m: string) => Number(h) * 60 + Number(m);

/** Parses "09:00-12:00" into ["09:00", "12:00"], throwing on typos so a bad edit fails loudly. */
function parseRange(doctor: string, day: string, range: string): [string, string] {
  const m = RANGE.exec(range.replace(/\s/g, ""));
  if (!m || minutes(m[1], m[2]) >= minutes(m[3], m[4])) {
    throw new Error(`working-hours.ts: invalid hours "${range}" for ${doctor} on ${day}. Use "HH:MM-HH:MM".`);
  }
  return [`${m[1]}:${m[2]}`, `${m[3]}:${m[4]}`];
}

const parsed = Object.fromEntries(
  Object.entries(workingHours).map(([doctor, week]) => [
    doctor,
    Object.fromEntries(
      WEEKDAYS.map((day, i) => {
        const value = week[day] ?? [];
        const ranges = (Array.isArray(value) ? value : [value]).map((r) => parseRange(doctor, day, r));
        return [i + 1, ranges];
      }),
    ),
  ]),
) as Record<DoctorId, Record<IsoWeekday, Array<[string, string]>>>;

// One chair: two doctors working at the same time would make their hours meaningless.
for (const [i, day] of WEEKDAYS.entries()) {
  const blocks = Object.entries(parsed).flatMap(([doctor, week]) =>
    week[(i + 1) as IsoWeekday].map(([from, to]) => ({ doctor, from, to })),
  );
  for (const a of blocks) {
    for (const b of blocks) {
      if (a !== b && a.from < b.to && b.from < a.to && a.doctor <= b.doctor) {
        throw new Error(
          `working-hours.ts: on ${day} ${a.doctor} (${a.from}-${a.to}) overlaps ${b.doctor} (${b.from}-${b.to}).`,
        );
      }
    }
  }
}

/** Bookable time ranges for a doctor on an ISO weekday (1 = Monday … 7 = Sunday). */
export const workingHoursOn = (doctor: DoctorId, weekday: IsoWeekday) => parsed[doctor]?.[weekday] ?? [];
