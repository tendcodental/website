import type { Localized } from "./clinic";

export type DoctorId = "boyadzhiev" | "tairyumer";

export interface Doctor {
  id: DoctorId;
  name: Localized;
  shortName: Localized;
  surname: Localized;
  initials: string;
  role: Localized;
  /** Placeholder contact details, replace with the real ones. */
  phone: { display: string; tel: string };
  email: string;
  photo: string | null;
  bio: Localized<string[]>;
  focus: Localized<string[]>;
  /**
   * Google Calendar event colour (1-11). Website bookings for this doctor get this colour, and an
   * absence event in this colour blocks only this doctor. 7 = Peacock (blue), 6 = Tangerine (orange).
   */
  calendarColorId: string;
  calendarColorHex: string;
  /** Weekly schedule for online booking, per ISO weekday (1 = Monday … 7 = Sunday). */
  schedule: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7, Array<[string, string]>>>;
}

const weekdays9to18: Doctor["schedule"] = {
  1: [["09:00", "18:00"]],
  2: [["09:00", "18:00"]],
  3: [["09:00", "18:00"]],
  4: [["09:00", "18:00"]],
  5: [["09:00", "18:00"]],
};

export const doctors: Doctor[] = [
  {
    id: "boyadzhiev",
    name: { bg: "д-р Константин Бояджиев", en: "Dr. Konstantin Boyadzhiev" },
    shortName: { bg: "д-р Бояджиев", en: "Dr. Boyadzhiev" },
    surname: { bg: "Бояджиев", en: "Boyadzhiev" },
    initials: "КБ",
    role: { bg: "Лекар по дентална медицина", en: "Dentist" },
    phone: { display: "+359 888 000 101", tel: "+359888000101" },
    email: "boyadzhiev@tandcodental.com",
    photo: null,
    bio: {
      bg: [
        "Д-р Бояджиев приема пациенти за профилактични прегледи, лечение и спешни случаи. Държи всеки пациент да разбира какво се случва и защо, преди да започне каквото и да е лечение.",
        "Работи с кофердам и винаги започва с точна диагноза, включително със зъбна снимка на място, когато е необходимо.",
      ],
      en: [
        "Dr. Boyadzhiev sees patients for check-ups, treatment and emergencies, making sure every patient understands what is happening and why, before any treatment begins.",
        "Every treatment is carried out under rubber-dam isolation and starts from an accurate diagnosis, including an on-site dental X-ray when needed.",
      ],
    },
    focus: {
      bg: ["Спешна стоматологична помощ", "Ендодонтско лечение", "Обтурации", "Профилактика"],
      en: ["Emergency dental care", "Root canal treatment", "Fillings", "Prevention"],
    },
    calendarColorId: "7",
    calendarColorHex: "#039be5",
    schedule: weekdays9to18,
  },
  {
    id: "tairyumer",
    name: { bg: "д-р Таирюмер Таирюмер", en: "Dr. Tairyumer Tairyumer" },
    shortName: { bg: "д-р Таирюмер", en: "Dr. Tairyumer" },
    surname: { bg: "Таирюмер", en: "Tairyumer" },
    initials: "ТТ",
    role: { bg: "Лекар по дентална медицина", en: "Dentist" },
    phone: { display: "+359 888 000 102", tel: "+359888000102" },
    email: "tairyumer@tandcodental.com",
    photo: "/images/dr-tairyumer.jpg",
    bio: {
      bg: [
        "Д-р Таирюмер съчетава спокоен подход с прецизна работа, особено ценно, когато пациентът идва с болка или притеснение.",
        "Приема възрастни и деца за прегледи, лечение, вадене на зъби и спешни състояния, като обяснява ясно възможностите и цената преди всяка процедура.",
      ],
      en: [
        "Dr. Tairyumer combines a calm approach with precise work, especially valuable when a patient arrives in pain or feeling anxious.",
        "Dr. Tairyumer treats adults and children, check-ups, treatment, extractions and emergencies, and clearly explains the options and cost before every procedure.",
      ],
    },
    focus: {
      bg: ["Орална хирургия", "Детска стоматология", "Спешна помощ", "Коронки"],
      en: ["Oral surgery", "Children's dentistry", "Emergency care", "Crowns"],
    },
    calendarColorId: "6",
    calendarColorHex: "#f4511e",
    schedule: weekdays9to18,
  },
];

export const doctorById = (id: string) => doctors.find((d) => d.id === id);
export const isDoctorId = (id: unknown): id is DoctorId => doctors.some((d) => d.id === id);
