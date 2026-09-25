import "server-only";
import { createHash } from "node:crypto";
import { reasonById } from "@/content/booking";
import { clinic } from "@/content/clinic";
import { type DoctorId, doctorById } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import type { CalendarClient, CalendarEvent } from "@/lib/google/calendar";
import { formatPhone } from "@/lib/phone";
import { type DoctorChoice, getDaySlots } from "./availability";
import { bookingConfig } from "./config";
import { addDays, CLINIC_TZ, clinicDate } from "./time";

export interface BookingInput {
  doctor: DoctorChoice;
  date: string;
  time: string;
  reason: string;
  name: string;
  phone: string; // E.164
  email?: string;
  note?: string;
  nzok: boolean;
  locale: Locale;
}

export interface ConfirmedBooking {
  eventId: string;
  doctorId: DoctorId;
  date: string;
  time: string;
  start: string;
  end: string;
  reasonId: string;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  nzok: boolean;
  locale: Locale;
}

export type BookingResult =
  | { ok: true; booking: ConfirmedBooking }
  | { ok: false; code: "SLOT_TAKEN" | "DUPLICATE" | "OUT_OF_RANGE" };

const HOUR_MS = 3_600_000;

function stamp(now: Date) {
  return new Intl.DateTimeFormat("bg-BG", {
    timeZone: CLINIC_TZ,
    dateStyle: "short",
    timeStyle: "short",
  }).format(now);
}

/** Staff-facing event. Always in Bulgarian, whatever language the patient used. */
function buildEvent(input: BookingInput, doctorId: DoctorId, start: Date, end: Date, now: Date): CalendarEvent {
  const doctor = doctorById(doctorId)!;
  const reason = reasonById(input.reason)?.label.bg ?? input.reason;
  const lines = [
    "ПАЦИЕНТ",
    `Име: ${input.name}`,
    `Телефон: ${formatPhone(input.phone, "en")}`,
    `Имейл: ${input.email || "-"}`,
    "",
    "ПОСЕЩЕНИЕ",
    `Лекар: ${doctor.name.bg}`,
    `Причина: ${reason}`,
    `По НЗОК: ${input.nzok ? "Да" : "Не"}`,
    ...(input.note ? [`Бележка от пациента: ${input.note}`] : []),
    "",
    "-",
    `Записан онлайн на ${new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tandcodental.com").host} · ${stamp(now)}`,
    `Език на пациента: ${input.locale === "bg" ? "български" : "английски"}`,
  ];

  return {
    id: "",
    summary: `${input.name} · ${reason} · ${doctor.shortName.bg}`,
    description: lines.join("\n"),
    location: `${clinic.name}, ${clinic.address.streetSchema}, ${clinic.address.city.bg}`,
    colorId: doctor.calendarColorId,
    start: { dateTime: start.toISOString(), timeZone: CLINIC_TZ },
    end: { dateTime: end.toISOString(), timeZone: CLINIC_TZ },
    extendedProperties: {
      private: {
        source: bookingConfig.source,
        doctor: doctorId,
        phone: input.phone,
        email: input.email ?? "",
        name: input.name.slice(0, 200),
        reason: input.reason,
        nzok: input.nzok ? "1" : "0",
        locale: input.locale,
        reminderSent: "0",
      },
    },
  };
}

/**
 * Inserts the event under a deterministic ID derived from the slot. Google Calendar rejects a second
 * insert with the same ID (HTTP 409), which makes "two people book the same slot at the same moment"
 * impossible: exactly one insert wins. If the ID belongs to an event that staff later cancelled or
 * moved, the next version of the ID is tried.
 */
async function insertWithSlotLock(calendar: CalendarClient, event: CalendarEvent, lockKey: string, start: Date) {
  const hash = createHash("sha256").update(lockKey).digest("hex").slice(0, 24);
  for (let version = 0; version < 10; version++) {
    const id = `tco${hash}v${version}`;
    const result = await calendar.insert({ ...event, id });
    if (result.ok) return result.event;

    const existing = await calendar.get(id);
    const holdsSlot =
      existing &&
      existing.status !== "cancelled" &&
      existing.start.dateTime &&
      Date.parse(existing.start.dateTime) === start.getTime();
    if (holdsSlot) return null;
  }
  return null;
}

export async function createBooking(
  calendar: CalendarClient,
  input: BookingInput,
  now = new Date(),
): Promise<BookingResult> {
  const today = clinicDate(now);
  if (input.date < today || input.date > addDays(today, bookingConfig.maxDaysAhead)) {
    return { ok: false, code: "OUT_OF_RANGE" };
  }

  const [{ slots, events }, upcoming] = await Promise.all([
    getDaySlots(calendar, input.date, input.doctor, now),
    calendar.list({
      timeMin: now,
      timeMax: new Date(now.getTime() + (bookingConfig.maxDaysAhead + 2) * 24 * HOUR_MS),
      privateProps: { source: bookingConfig.source, phone: input.phone },
    }),
  ]);

  if (upcoming.filter((e) => e.status !== "cancelled").length >= bookingConfig.maxUpcomingPerPhone) {
    return { ok: false, code: "DUPLICATE" };
  }

  const slot = slots.find((s) => s.time === input.time);
  if (!slot) return { ok: false, code: "SLOT_TAKEN" };

  // "Any doctor": prefer whoever has fewer website bookings that day, to spread the load.
  const load = (id: DoctorId) =>
    events.filter((e) => e.extendedProperties?.private?.doctor === id && e.status !== "cancelled").length;
  const order = input.doctor === "any" ? [...slot.doctors].sort((a, b) => load(a) - load(b)) : [input.doctor];

  for (const doctorId of order) {
    const event = buildEvent(input, doctorId, slot.start, slot.end, now);
    const lockKey = bookingConfig.sharedChair
      ? `chair|${slot.start.toISOString()}`
      : `${doctorId}|${slot.start.toISOString()}`;
    const saved = await insertWithSlotLock(calendar, event, lockKey, slot.start);
    if (saved) {
      return {
        ok: true,
        booking: {
          eventId: saved.id,
          doctorId,
          date: input.date,
          time: input.time,
          start: slot.start.toISOString(),
          end: slot.end.toISOString(),
          reasonId: input.reason,
          name: input.name,
          phone: input.phone,
          email: input.email,
          note: input.note,
          nzok: input.nzok,
          locale: input.locale,
        },
      };
    }
    if (bookingConfig.sharedChair) break;
  }
  return { ok: false, code: "SLOT_TAKEN" };
}
