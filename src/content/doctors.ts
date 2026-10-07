import type { Localized } from "./clinic";

export type DoctorId = "chifligarova" | "boyadzhiev" | "tairyumer";

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
  /** Show the doctor's own phone number and email on the website (calls otherwise go to the clinic). */
  showPhone?: boolean;
  bio: Localized<string[]>;
  focus: Localized<string[]>;
  /**
   * Google Calendar event colour (1-11). Website bookings for this doctor get this colour, and an
   * absence event in this colour blocks only this doctor. 7 = Peacock (blue), 6 = Tangerine (orange).
   */
  calendarColorId: string;
  calendarColorHex: string;
}

// Online-booking hours for each doctor live in ./working-hours.ts.

export const doctors: Doctor[] = [
  {
    id: "boyadzhiev",
    name: { bg: "д-р Константин Бояджиев", en: "Dr. Konstantin Boyadzhiev" },
    shortName: { bg: "д-р Бояджиев", en: "Dr. Boyadzhiev" },
    surname: { bg: "Бояджиев", en: "Boyadzhiev" },
    initials: "КБ",
    role: { bg: "Кариесология и ендодонтия", en: "Cariology and endodontics" },
    phone: { display: "+359 878 931 480", tel: "+359878931480" },
    email: "boyadzhiev@tandcodental.com",
    photo: "/images/dr-boyadzhiev.jpg",
    bio: {
      bg: [
        "Основните му професионални интереси са в областта на кариесологията и ендодонтията, с основен фокус върху диагностиката и лечението на кариозни процеси и кореновото лечение на зъбите.",
        "Работи с кофердам и винаги започва с точна диагноза, включително със зъбна снимка на място, когато е необходимо.",
      ],
      en: [
        "His main professional interests are cariology and endodontics, with a focus on diagnosing and treating carious lesions and on root canal treatment.",
        "Every treatment is carried out under rubber-dam isolation and starts from an accurate diagnosis, including an on-site dental X-ray when needed.",
      ],
    },
    focus: {
      bg: ["Кариесология", "Ендодонтско лечение", "Обтурации", "Спешна стоматологична помощ"],
      en: ["Cariology", "Root canal treatment", "Fillings", "Emergency dental care"],
    },
    calendarColorId: "7",
    calendarColorHex: "#039be5",
  },
  {
    id: "tairyumer",
    name: { bg: "д-р Таирюмер Таирюмер", en: "Dr. Tayrumer Tayrumer" },
    shortName: { bg: "д-р Таирюмер", en: "Dr. Tayrumer" },
    surname: { bg: "Таирюмер", en: "Tayrumer" },
    initials: "ТТ",
    role: { bg: "Орална хирургия, детска дентална медицина и ендодонтия", en: "Oral surgery, children's dentistry and endodontics" },
    phone: { display: "+359 879 181 852", tel: "+359879181852" },
    email: "tairyumer@tandcodental.com",
    photo: "/images/dr-tairyumer-2.jpg",
    bio: {
      bg: [
        "Основните му професионални интереси са насочени към оралната хирургия, детската дентална медицина и ендодонтията, като работи с интерес към комплексното лечение както на деца, така и на пациенти, нуждаещи се от хирургично или ендодонтско лечение.",
        "Приема възрастни и деца за прегледи, лечение, вадене на зъби и спешни състояния, като обяснява ясно възможностите и цената преди всяка процедура.",
      ],
      en: [
        "Main professional interests are oral surgery, children's dentistry and endodontics, with a focus on comprehensive care for children as well as patients who need surgical or endodontic treatment.",
        "Dr. Tayrumer treats adults and children, check-ups, treatment, extractions and emergencies, and clearly explains the options and cost before every procedure.",
      ],
    },
    focus: {
      bg: ["Орална хирургия", "Детска дентална медицина", "Ендодонтия", "Спешна помощ"],
      en: ["Oral surgery", "Children's dentistry", "Endodontics", "Emergency care"],
    },
    calendarColorId: "6",
    calendarColorHex: "#f4511e",
  },
  {
    id: "chifligarova",
    name: { bg: "д-р Натали Чифлигарова", en: "Dr. Natali Chifligarova" },
    shortName: { bg: "д-р Чифлигарова", en: "Dr. Chifligarova" },
    surname: { bg: "Чифлигарова", en: "Chifligarova" },
    initials: "Ч",
    role: { bg: "Естетична и пародонтална дентална медицина", en: "Aesthetic and periodontal dentistry" },
    // Placeholder, never shown: with showPhone false, the site uses the emergency number instead.
    phone: { display: "+359 878 931 480", tel: "+359878931480" },
    email: "contact@tandcodental.com",
    photo: "/images/dr-chifligarova.jpg",
    showPhone: false,
    bio: {
      bg: [
        "Професионалните интереси на д-р Чифлигарова са насочени към ортодонтията, пародонтологията и поддържането на здрави венци и пародонт.",
        "Особен интерес представляват естетичната дентална медицина и избелването на зъби, с фокус върху хармоничната и естествена усмивка.",
      ],
      en: [
        "Dr. Chifligarova's professional interests are orthodontics, periodontology and keeping gums and the periodontium healthy.",
        "A particular interest is aesthetic dentistry and teeth whitening, with a focus on a harmonious, natural smile.",
      ],
    },
    focus: {
      bg: ["Естетична дентална медицина", "Пародонтология", "Избелване на зъби", "Ортодонтия"],
      en: ["Aesthetic dentistry", "Periodontology", "Teeth whitening", "Orthodontics"],
    },
    calendarColorId: "2",
    calendarColorHex: "#33b679",
  },
];

export const doctorById = (id: string) => doctors.find((d) => d.id === id);
export const isDoctorId = (id: unknown): id is DoctorId => doctors.some((d) => d.id === id);
