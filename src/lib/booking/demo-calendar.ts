import "server-only";
import { doctors } from "@/content/doctors";
import type { CalendarClient, CalendarEvent } from "@/lib/google/calendar";
import { addDays, clinicDate, clinicTimeToUtc, isoWeekday } from "./time";

/**
 * In-memory stand-in for Google Calendar, used in development (and previews with BOOKING_DEMO_MODE)
 * so the booking flow can be tried end-to-end before the real calendar is connected.
 * It mimics the parts of the API we rely on, including 409 on duplicate event IDs.
 */
type Store = { events: Map<string, CalendarEvent>; seeded: boolean };
const globalStore = globalThis as unknown as { __tcoDemoCalendar?: Store };
const store: Store = (globalStore.__tcoDemoCalendar ??= { events: new Map(), seeded: false });

function seed() {
  if (store.seeded) return;
  store.seeded = true;
  const today = clinicDate();
  let absenceSeeded = false;
  // Deterministic pseudo-random "busy" hours so some slots look taken, plus one doctor absence.
  for (let i = 0; i < 70; i++) {
    const date = addDays(today, i);
    if (isoWeekday(date) > 5) continue;
    for (let hour = 9; hour < 18; hour++) {
      const n = (Number(date.replaceAll("-", "")) * 31 + hour * 17) % 100;
      if (n < 22) {
        const start = clinicTimeToUtc(date, `${String(hour).padStart(2, "0")}:00`);
        const id = `demo${date.replaceAll("-", "")}h${hour}`;
        store.events.set(id, {
          id,
          status: "confirmed",
          summary: "Демо: зает час",
          start: { dateTime: start.toISOString() },
          end: { dateTime: new Date(start.getTime() + 3_600_000).toISOString() },
        });
      }
    }
    if (i >= 7 && !absenceSeeded) {
      absenceSeeded = true;
      store.events.set(`demooff${i}`, {
        id: `demooff${i}`,
        status: "confirmed",
        summary: "Демо: отпуск",
        colorId: doctors[0].calendarColorId,
        start: { date },
        end: { date: addDays(date, 1) },
      });
    }
  }
}

function eventRange(ev: CalendarEvent) {
  const start = ev.start.dateTime ? new Date(ev.start.dateTime) : clinicTimeToUtc(ev.start.date!);
  const end = ev.end.dateTime ? new Date(ev.end.dateTime) : clinicTimeToUtc(ev.end.date!);
  return { start, end };
}

export const demoCalendar: CalendarClient = {
  async list({ timeMin, timeMax, privateProps }) {
    seed();
    return [...store.events.values()]
      .filter((ev) => ev.status !== "cancelled")
      .filter((ev) => {
        const { start, end } = eventRange(ev);
        return start < timeMax && end > timeMin;
      })
      .filter((ev) =>
        Object.entries(privateProps ?? {}).every(([k, v]) => ev.extendedProperties?.private?.[k] === v),
      )
      .sort((a, b) => eventRange(a).start.getTime() - eventRange(b).start.getTime());
  },
  async get(id) {
    seed();
    return store.events.get(id) ?? null;
  },
  async insert(event) {
    seed();
    if (store.events.has(event.id)) return { ok: false, reason: "duplicate-id" };
    const saved = { ...event, status: "confirmed" as const };
    store.events.set(event.id, saved);
    console.info(`[demo-calendar] booked "${event.summary}" at ${event.start.dateTime}`);
    return { ok: true, event: saved };
  },
  async patch(id, patch) {
    const current = store.events.get(id);
    if (current) store.events.set(id, { ...current, ...patch });
  },
};
