import type { Localized } from "./clinic";

export interface BookingReason {
  id: string;
  label: Localized;
  /** Suggest calling the emergency line instead of waiting for a slot. */
  urgent?: boolean;
}

export const bookingReasons: BookingReason[] = [
  { id: "checkup", label: { bg: "Профилактичен преглед / консултация", en: "Check-up / consultation" } },
  { id: "toothache", label: { bg: "Зъбобол или чувствителност", en: "Toothache or sensitivity" }, urgent: true },
  { id: "filling", label: { bg: "Пломба (обтурация)", en: "Filling" } },
  { id: "root-canal", label: { bg: "Кореново лечение", en: "Root canal treatment" } },
  { id: "extraction", label: { bg: "Вадене на зъб", en: "Tooth extraction" } },
  { id: "wisdom", label: { bg: "Мъдрец", en: "Wisdom tooth" } },
  { id: "broken", label: { bg: "Счупен или травмиран зъб", en: "Broken or injured tooth" }, urgent: true },
  {
    id: "swelling",
    label: { bg: "Подуване / възпаление на венеца", en: "Swelling / gum inflammation" },
    urgent: true,
  },
  { id: "cleaning", label: { bg: "Почистване на зъбен камък", en: "Scaling & cleaning" } },
  { id: "crown", label: { bg: "Коронка (временна или постоянна)", en: "Crown (temporary or permanent)" } },
  { id: "xray", label: { bg: "Зъбна снимка / рентген", en: "Dental X-ray" } },
  { id: "child", label: { bg: "Детски преглед или лечение", en: "Child's check-up or treatment" } },
  { id: "other", label: { bg: "Друго", en: "Other" } },
];

export const reasonById = (id: string) => bookingReasons.find((r) => r.id === id);
