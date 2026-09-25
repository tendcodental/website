import { addDays, isoWeekday } from "./time";

type HolidayName = { bg: string; en: string };

/** Orthodox Easter Sunday (Gregorian date), valid for 1900-2099. Meeus' Julian algorithm + 13 days. */
export function orthodoxEaster(year: number) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  const julian = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return addDays(julian, 13);
}

const FIXED: Array<[string, HolidayName]> = [
  ["01-01", { bg: "Нова година", en: "New Year's Day" }],
  ["03-03", { bg: "Ден на Освобождението", en: "Liberation Day" }],
  ["05-01", { bg: "Ден на труда", en: "Labour Day" }],
  ["05-06", { bg: "Гергьовден", en: "St George's Day" }],
  ["05-24", { bg: "Ден на светите Кирил и Методий", en: "Saints Cyril and Methodius Day" }],
  ["09-06", { bg: "Ден на Съединението", en: "Unification Day" }],
  ["09-22", { bg: "Ден на Независимостта", en: "Independence Day" }],
  ["12-24", { bg: "Бъдни вечер", en: "Christmas Eve" }],
  ["12-25", { bg: "Коледа", en: "Christmas Day" }],
  ["12-26", { bg: "Коледа", en: "Christmas (2nd day)" }],
];

const cache = new Map<number, Map<string, HolidayName>>();

/**
 * Official non-working days in Bulgaria for a year, including the Labour Code rule that a holiday
 * falling on a weekend moves to the next working day (Easter holidays excluded). Extra "bridge" days
 * announced by the government can simply be blocked with an all-day event in Google Calendar.
 */
export function bulgarianHolidays(year: number): Map<string, HolidayName> {
  const hit = cache.get(year);
  if (hit) return hit;

  const result = new Map<string, HolidayName>();
  for (const y of [year - 1, year]) {
    const fixed = FIXED.map(([md, name]) => [`${y}-${md}`, name] as const);
    for (const [date, name] of fixed) result.set(date, name);

    const easter = orthodoxEaster(y);
    result.set(addDays(easter, -2), { bg: "Разпети петък", en: "Good Friday" });
    result.set(addDays(easter, -1), { bg: "Велика събота", en: "Holy Saturday" });
    result.set(easter, { bg: "Великден", en: "Easter Sunday" });
    result.set(addDays(easter, 1), { bg: "Великден", en: "Easter Monday" });

    for (const [date, name] of fixed) {
      if (isoWeekday(date) < 6) continue;
      let next = addDays(date, 1);
      while (isoWeekday(next) >= 6 || result.has(next)) next = addDays(next, 1);
      result.set(next, { bg: `Почивен ден (${name.bg})`, en: `Day off (${name.en})` });
    }
  }

  const forYear = new Map([...result].filter(([d]) => d.startsWith(`${year}-`)));
  cache.set(year, forYear);
  return forYear;
}

export function holidayOn(date: string) {
  return bulgarianHolidays(Number(date.slice(0, 4))).get(date) ?? null;
}
