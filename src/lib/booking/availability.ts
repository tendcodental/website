import "server-only";
import { type DoctorId, doctors, isDoctorId } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { calendarMode, env } from "@/lib/env";
import { type CalendarClient, type CalendarEvent, createGoogleCalendar } from "@/lib/google/calendar";
import { ABSENCE_PATTERN, bookingConfig } from "./config";
import { demoCalendar } from "./demo-calendar";
import { bulgarianHolidays, holidayOn } from "./holidays";
import { addDays, clinicDate, clinicTimeToUtc, isoWeekday, monthBounds, toMinutes } from "./time";
import type { DoctorChoice } from "./types";

export type { DoctorChoice };

export function getCalendarClient(): CalendarClient | null {
  const mode = calendarMode();
  if (mode === "google") return createGoogleCalendar(env.calendarId!);
  if (mode === "demo") return demoCalendar;
  return null;
}

type Blocker =
  | { kind: "allDay"; dates: string[]; doctor: DoctorId | "all" }
  | { kind: "timed"; start: number; end: number; doctor: DoctorId | "all" };

const doctorForColor = (colorId?: string) => doctors.find((d) => d.calendarColorId === colorId)?.id;

/**
 * Turns a calendar event into a blocking rule:
 *  - "Free" (transparent) and cancelled events never block.
 *  - All-day event in a doctor's colour → that doctor is off that day; any other all-day event → clinic
 *    closed for online booking.
 *  - Timed absence ("Отсъства", "Отпуск"…) in a doctor's colour → blocks only that doctor.
 *  - Any other timed event → the chair is busy, so the hour is blocked for everyone (shared chair).
 */
export function toBlocker(ev: CalendarEvent): Blocker | null {
  if (ev.status === "cancelled" || ev.transparency === "transparent") return null;
  const priv = ev.extendedProperties?.private;
  const isWebsiteBooking = priv?.source === bookingConfig.source;
  const colorDoctor = doctorForColor(ev.colorId);

  if (ev.start.date && ev.end.date) {
    const dates: string[] = [];
    for (let d = ev.start.date; d < ev.end.date; d = addDays(d, 1)) dates.push(d);
    return { kind: "allDay", dates, doctor: colorDoctor ?? "all" };
  }
  if (!ev.start.dateTime || !ev.end.dateTime) return null;
  const start = Date.parse(ev.start.dateTime);
  const end = Date.parse(ev.end.dateTime);

  if (!isWebsiteBooking && colorDoctor && ABSENCE_PATTERN.test(ev.summary ?? "")) {
    return { kind: "timed", start, end, doctor: colorDoctor };
  }
  if (bookingConfig.sharedChair) return { kind: "timed", start, end, doctor: "all" };

  const bookedDoctor = isWebsiteBooking && isDoctorId(priv?.doctor) ? priv.doctor : colorDoctor;
  return { kind: "timed", start, end, doctor: bookedDoctor ?? "all" };
}

export interface Slot {
  time: string;
  start: Date;
  end: Date;
  doctors: DoctorId[];
}

const hhmm = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** Free slots on one date for one doctor (or any doctor), given the blockers overlapping that date. */
export function computeDaySlots(date: string, blockers: Blocker[], choice: DoctorChoice, now = new Date()): Slot[] {
  if (bookingConfig.blockPublicHolidays && holidayOn(date)) return [];

  const weekday = isoWeekday(date);
  const earliest = now.getTime() + bookingConfig.minLeadMinutes * 60_000;
  const candidates = choice === "any" ? doctors : doctors.filter((d) => d.id === choice);
  const allDay = blockers.filter((b) => b.kind === "allDay" && b.dates.includes(date));
  const timed = blockers.filter((b): b is Extract<Blocker, { kind: "timed" }> => b.kind === "timed");
  const slots = new Map<string, Slot>();

  for (const doctor of candidates) {
    if (allDay.some((b) => b.doctor === "all" || b.doctor === doctor.id)) continue;
    for (const [from, to] of doctor.schedule[weekday] ?? []) {
      for (let t = toMinutes(from); t + bookingConfig.slotMinutes <= toMinutes(to); t += bookingConfig.slotMinutes) {
        const time = hhmm(t);
        const start = clinicTimeToUtc(date, time);
        const end = new Date(start.getTime() + bookingConfig.slotMinutes * 60_000);
        if (start.getTime() < earliest) continue;
        const busy = timed.some(
          (b) => (b.doctor === "all" || b.doctor === doctor.id) && b.start < end.getTime() && b.end > start.getTime(),
        );
        if (busy) continue;
        const slot = slots.get(time) ?? { time, start, end, doctors: [] };
        slot.doctors.push(doctor.id);
        slots.set(time, slot);
      }
    }
  }
  return [...slots.values()].sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function bookingWindow(now = new Date()) {
  const today = clinicDate(now);
  return { today, lastDate: addDays(today, bookingConfig.maxDaysAhead) };
}

export async function getMonthAvailability(
  calendar: CalendarClient,
  month: string,
  choice: DoctorChoice,
  locale: Locale,
  now = new Date(),
) {
  const { today, lastDate } = bookingWindow(now);
  const { first, last } = monthBounds(month);
  const from = first > today ? first : today;
  const to = last < lastDate ? last : lastDate;

  const holidays: Record<string, string> = {};
  for (const [date, name] of bulgarianHolidays(Number(month.slice(0, 4)))) {
    if (date.startsWith(month)) holidays[date] = name[locale];
  }

  const days: Record<string, string[]> = {};
  if (from <= to) {
    const events = await calendar.list({ timeMin: clinicTimeToUtc(from), timeMax: clinicTimeToUtc(addDays(to, 1)) });
    const blockers = events.map(toBlocker).filter((b): b is Blocker => b !== null);
    for (let date = from; date <= to; date = addDays(date, 1)) {
      const slots = computeDaySlots(date, blockers, choice, now);
      if (slots.length) days[date] = slots.map((s) => s.time);
    }
  }

  return { today, lastDate, days, holidays };
}

export async function getDaySlots(calendar: CalendarClient, date: string, choice: DoctorChoice, now = new Date()) {
  const events = await calendar.list({ timeMin: clinicTimeToUtc(date), timeMax: clinicTimeToUtc(addDays(date, 1)) });
  const blockers = events.map(toBlocker).filter((b): b is Blocker => b !== null);
  return { slots: computeDaySlots(date, blockers, choice, now), events };
}
