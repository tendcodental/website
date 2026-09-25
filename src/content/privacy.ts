import type { Localized } from "./clinic";

/**
 * Privacy policy text. TEMPLATE, the clinic must fill in the bracketed legal details and have the
 * final wording reviewed (e.g. by their DPO or lawyer) before launch.
 */
export const PRIVACY_UPDATED = "2026-09-24";

export const privacySections: Localized<Array<{ title: string; body: string[] }>> = {
  bg: [
    {
      title: "Администратор на лични данни",
      body: [
        "Администратор на личните данни е [НАИМЕНОВАНИЕ НА ДРУЖЕСТВОТО], ЕИК [ЕИК], със седалище и адрес на управление [АДРЕС], оперираща под търговското наименование T&Co Dental, с адрес на практиката ул. „Даме Груев“ 34, Пловдив.",
        "За въпроси, свързани с личните ви данни, пишете ни на contact@tandcodental.com.",
      ],
    },
    {
      title: "Какви данни събираме",
      body: [
        "При онлайн записване на час: име, телефон, имейл (по желание), избран лекар, дата и час, причина за посещението, бележка (по желание) и дали желаете посещението да е по НЗОК.",
        "Причината за посещението и бележката може да съдържат информация за здравословното ви състояние, която е специална категория лични данни. Обработваме я само с вашето изрично съгласие, дадено във формата за записване.",
        "При изпращане на съобщение през контактната форма: име, имейл, телефон (по желание) и текста на съобщението.",
        "Технически данни: сървърите, на които работи сайтът, могат да съхраняват за кратко IP адрес и информация за браузъра с цел сигурност и защита от злоупотреби.",
      ],
    },
    {
      title: "За какво използваме данните",
      body: [
        "За да запазим, потвърдим и организираме вашия час, да ви изпратим потвърждение и напомняне (ако сте посочили имейл) и да се свържем с вас при нужда от промяна.",
        "За да отговорим на ваше запитване.",
        "За да защитим сайта от спам и злоупотреби.",
        "Правни основания: предприемане на стъпки по ваше искане преди сключване на договор за медицинска услуга (чл. 6, ал. 1, б. „б“ от ОРЗД), изрично съгласие за здравните данни (чл. 9, ал. 2, б. „а“), законни интереси за сигурност на сайта (чл. 6, ал. 1, б. „е“).",
      ],
    },
    {
      title: "Колко дълго съхраняваме данните",
      body: [
        "Данните от онлайн записването се съхраняват в календара на практиката до провеждане на посещението и за срок до 12 месеца след това, освен ако закон не изисква по-дълъг срок (например за медицинска документация).",
        "Съобщенията от контактната форма се съхраняват до 12 месеца след последната кореспонденция.",
      ],
    },
    {
      title: "С кого споделяме данните",
      body: [
        "Не продаваме и не предоставяме данните ви за рекламни цели. Използваме доверени доставчици, които ги обработват от наше име: Google (календар и електронни таблици), Vercel (хостинг на сайта), Resend (изпращане на имейли), Cloudflare (защита от ботове, ако е включена).",
        "Картата на сайта се зарежда от OpenFreeMap, а отзивите, от Google; при зареждането им вашият браузър изпраща IP адреса си до тези услуги.",
        "Някои доставчици може да обработват данни извън ЕС. В тези случаи трансферът се извършва въз основа на решение за адекватност (напр. Рамката за защита на данните ЕС-САЩ) или стандартни договорни клаузи.",
      ],
    },
    {
      title: "Бисквитки",
      body: [
        "Сайтът не използва бисквитки за проследяване или реклама. Ако в бъдеще добавим аналитични инструменти, които изискват съгласие, ще ви поискаме такова предварително.",
      ],
    },
    {
      title: "Вашите права",
      body: [
        "Имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост и възражение, както и право да оттеглите съгласието си по всяко време, без това да засяга законосъобразността на обработването преди оттеглянето.",
        "За да упражните правата си, пишете ни на contact@tandcodental.com.",
        "Имате право да подадете жалба до Комисията за защита на личните данни (www.cpdp.bg).",
      ],
    },
  ],
  en: [
    {
      title: "Data controller",
      body: [
        "The data controller is [COMPANY NAME], UIC [UIC], registered at [ADDRESS], trading as T&Co Dental, with its practice at 34 Dame Gruev St., Plovdiv, Bulgaria.",
        "For any questions about your personal data, email us at contact@tandcodental.com.",
      ],
    },
    {
      title: "What data we collect",
      body: [
        "When you book online: name, phone number, email (optional), chosen dentist, date and time, reason for the visit, an optional note, and whether you'd like the visit covered by the NHIF.",
        "The reason for the visit and the note may contain information about your health, which is a special category of personal data. We only process it with the explicit consent you give in the booking form.",
        "When you use the contact form: name, email, phone (optional) and your message.",
        "Technical data: the servers running this website may briefly store your IP address and browser information for security and abuse prevention.",
      ],
    },
    {
      title: "How we use it",
      body: [
        "To book, confirm and organise your appointment, send you a confirmation and a reminder (if you gave an email address), and contact you if something needs to change.",
        "To reply to your enquiry.",
        "To protect the website from spam and abuse.",
        "Legal bases: steps taken at your request before entering into a contract for a medical service (Art. 6(1)(b) GDPR), explicit consent for health data (Art. 9(2)(a)), and legitimate interests in website security (Art. 6(1)(f)).",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "Online booking data is kept in the practice calendar until the visit and for up to 12 months afterwards, unless the law requires a longer period (for example for medical records).",
        "Contact-form messages are kept for up to 12 months after the last correspondence.",
      ],
    },
    {
      title: "Who we share it with",
      body: [
        "We never sell your data or use it for advertising. We use trusted providers that process it on our behalf: Google (calendar and spreadsheets), Vercel (website hosting), Resend (email delivery) and Cloudflare (bot protection, if enabled).",
        "The map is loaded from OpenFreeMap and reviews from Google; when they load, your browser sends its IP address to those services.",
        "Some providers may process data outside the EU. In those cases transfers rely on an adequacy decision (such as the EU-US Data Privacy Framework) or standard contractual clauses.",
      ],
    },
    {
      title: "Cookies",
      body: [
        "This website does not use tracking or advertising cookies. If we ever add analytics that require consent, we'll ask for it first.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You have the right to access, rectify, erase, restrict, port and object to the processing of your data, and to withdraw your consent at any time without affecting the lawfulness of processing before withdrawal.",
        "To exercise your rights, email us at contact@tandcodental.com.",
        "You also have the right to lodge a complaint with the Bulgarian Commission for Personal Data Protection (www.cpdp.bg).",
      ],
    },
  ],
};
