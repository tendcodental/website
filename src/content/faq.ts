import type { Localized } from "./clinic";

/** General questions shown on the home page (and marked up as FAQPage there). */
export const generalFaq: Localized<{ q: string; a: string }[]> = {
  bg: [
    {
      q: "Как да запазя час?",
      a: "Изберете лекар, ден и свободен час в онлайн календара на сайта, часът се потвърждава веднага. Можете да се обадите и по телефона.",
    },
    {
      q: "Какво да направя при силна болка през нощта или в почивен ден?",
      a: "Обадете се на спешния ни номер. T&Co Dental е спешен денонощен зъболекарски кабинет 24/7: дежурен лекар ще ви каже какво да направите и ще ви приеме възможно най-бързо, включително през нощта.",
    },
    {
      q: "Работите ли с НЗОК?",
      a: "Да, в работно време работим с НЗОК. При записване посочете, че желаете посещение по НЗОК, и ще ви обясним кои дейности се покриват във вашия случай.",
    },
    {
      q: "Правите ли зъбни снимки на място?",
      a: "Да. Имаме рентген в кабинета, така че снимката се прави по време на прегледа и диагнозата се поставя веднага, без да ходите до друг кабинет.",
    },
    {
      q: "Какво е кофердам и защо го използвате?",
      a: "Кофердамът е тънка гумена преграда, която изолира зъба по време на лечение. Така той остава сух и чист, лечението е по-трайно, а в устата ви не попадат вода, разтвори или малки инструменти.",
    },
    {
      q: "Как да отменя или преместя час?",
      a: "Обадете ни се по телефона, ще отменим или преместим часа ви веднага. Молим да ни предупредите навреме, за да можем да предложим часа на друг пациент.",
    },
    {
      q: "Приемате ли деца?",
      a: "Да. Приемаме деца за прегледи, профилактика и лечение, като работим спокойно и с много търпение. Родителят може да бъде до детето.",
    },
  ],
  en: [
    {
      q: "How do I book an appointment?",
      a: "Choose a dentist, a day and a free time in the online calendar on this website, your appointment is confirmed instantly. You can also call us.",
    },
    {
      q: "What should I do if I'm in severe pain at night or on a weekend?",
      a: "Call our emergency number. T&Co Dental is a 24/7 emergency dental clinic: the dentist on duty will tell you what to do and see you as soon as possible, including at night.",
    },
    {
      q: "Do you work with the NHIF (НЗОК)?",
      a: "Yes, during regular hours we work with the National Health Insurance Fund. Mention it when booking and we'll explain which treatments are covered in your case.",
    },
    {
      q: "Can you take dental X-rays on site?",
      a: "Yes. We have an X-ray unit in the clinic, so images are taken during your examination and the diagnosis is made straight away, no trips to another clinic.",
    },
    {
      q: "What is a rubber dam and why do you use it?",
      a: "A rubber dam is a thin sheet that isolates the tooth during treatment. It keeps the tooth dry and clean, makes the work last longer and stops water, solutions or small instruments from getting into your mouth.",
    },
    {
      q: "How do I cancel or reschedule?",
      a: "Just give us a call, we'll cancel or move your appointment right away. Please let us know in good time so we can offer the slot to another patient.",
    },
    {
      q: "Do you see children?",
      a: "Yes. We see children for check-ups, prevention and treatment, and we take our time and stay patient. A parent can stay with the child.",
    },
  ],
};
