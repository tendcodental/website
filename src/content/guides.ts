import type { Locale } from "@/i18n/routing";
import type { Localized } from "./clinic";
import type { DoctorId } from "./doctors";
import type { ArtKey } from "./services";

/**
 * Patient guides („Съвети“): answer-first articles for the questions patients call about most.
 * They build topical authority for search and are the pages LLMs quote, so keep answers factual and
 * self-contained. Have a dentist review any medical change, and set `reviewer` only with their consent.
 */

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Render `list` as numbered steps. */
  ordered?: boolean;
}

export interface GuideText {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Card text on the guides index. */
  excerpt: string;
  /** The direct answer, shown first (and quoted by search engines and LLMs). */
  answer: string;
  sections: GuideSection[];
  /** Red flags: call the emergency line straight away. */
  urgent: string[];
  faq: { q: string; a: string }[];
}

export interface Guide {
  id: string;
  art: ArtKey;
  thumbnail?: string;
  /** ISO dates. */
  published: string;
  updated: string;
  /** Dentist who reviewed the article (shown as a byline and in structured data). */
  reviewer?: DoctorId;
  /** Related service or category ids, linked at the end of the article. */
  services: string[];
  text: Localized<GuideText>;
}

export const guides: Guide[] = [
  {
    id: "toothache-at-night",
    art: "toothache",
    thumbnail: "/images/services/toothache.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["emergency", "toothache", "pulpitis"],
    text: {
      bg: {
        slug: "zabobol-prez-noshtta",
        title: "Силен зъбобол през нощта: какво да направите",
        metaTitle: "Силен зъбобол през нощта: какво да правя? Денонощен зъболекар",
        metaDescription:
          "Какво да направите при силен зъбобол през нощта, какво облекчава болката до прегледа и кога е спешно. Денонощен зъболекар в Пловдив, спешен телефон 24/7.",
        excerpt:
          "Как да облекчите болката до сутринта, какво да не правите и кога е време да се обадите на денонощен зъболекар.",
        answer:
          "При силен зъбобол през нощта приемете обезболяващото, което обикновено понасяте, според листовката, спете с повдигната глава и избягвайте много студени, горещи и сладки храни. Ако болката е пулсираща, не минава с обезболяващо, има подуване или температура, обадете се на денонощен зъболекар още същата нощ. В Пловдив T&Co Dental има дежурен лекар 24/7.",
        sections: [
          {
            heading: "Защо зъбът боли повече през нощта?",
            paragraphs: [
              "Когато лежим, към главата се оттича повече кръв и налягането във възпалената пулпа (нерва на зъба) се увеличава. Затова болката от пулпит или абсцес често се засилва точно вечер и през нощта. Нощната пулсираща болка обикновено е знак, че възпалението е стигнало до нерва и няма да отшуми само.",
            ],
          },
          {
            heading: "Какво да направите веднага",
            ordered: true,
            list: [
              "Приемете обезболяващо, което сте понасяли и преди, точно според листовката. Не превишавайте дозата.",
              "Изплакнете внимателно с хладка вода, за да махнете остатъци от храна около зъба.",
              "Спете с повдигната глава (две възглавници), за да намалите налягането.",
              "При подуване сложете студен компрес отвън на бузата за 10-15 минути, с почивки.",
              "Избягвайте много студено, горещо, сладко и дъвчене от болната страна.",
              "Обадете се на спешния номер, ако болката не отшумява до час след обезболяващото.",
            ],
          },
          {
            heading: "Какво да не правите",
            list: [
              "Не поставяйте таблетка (например аспирин) директно върху венеца, тя изгаря лигавицата.",
              "Не затопляйте бузата. Топлината може да разпространи инфекцията.",
              "Не слагайте алкохол, чесън или други „домашни средства“ в зъба.",
              "Не пийте антибиотик „на своя глава“. Той не лекува възпаления нерв и може да скрие проблема.",
            ],
          },
          {
            heading: "Какво ще направи дежурният зъболекар",
            paragraphs: [
              "При спешно посещение първо откриваме причината: преглед и при нужда зъбна снимка на място. След това спираме болката. Най-често това е обезболяване и отваряне на зъба, за да се освободи налягането, дренаж при абсцес или временна пломба. Целта е да запазим зъба, а довършването на лечението планираме в удобен за вас час.",
            ],
          },
        ],
        urgent: [
          "Болката е силна, пулсираща и не минава с обезболяващо",
          "Бузата, венецът или лицето са подути",
          "Имате температура или общо неразположение",
          "Трудно отваряте устата или преглъщате",
        ],
        faq: [
          {
            q: "Може ли зъбобол да изчака до сутринта?",
            a: "Ако болката отшумява с обезболяващо и няма подуване или температура, обикновено може да изчака до сутринта, тогава се обадете за час. Ако болката е силна, пулсираща или има подуване, не чакайте, обадете се на спешния номер още през нощта.",
          },
          {
            q: "Има ли зъболекар, който работи през нощта в Пловдив?",
            a: "Да. T&Co Dental на ул. „Даме Груев“ 34 е денонощен зъболекарски кабинет. Спешният телефон отговаря 24/7 и дежурен лекар приема пациенти през нощта, в почивните дни и по празниците.",
          },
          {
            q: "Ще трябва ли да ми извадят зъба?",
            a: "Не непременно. В повечето случаи зъбът може да се запази с кореново лечение. Вадене предлагаме само когато зъбът не може да бъде спасен, и винаги след като обясним възможностите.",
          },
        ],
      },
      en: {
        slug: "toothache-at-night",
        title: "Severe toothache at night: what to do",
        metaTitle: "Severe Toothache at Night: What to Do | 24/7 Dentist",
        metaDescription:
          "What to do about severe toothache at night, what eases the pain until you see a dentist and when it's an emergency. 24/7 emergency dentist in Plovdiv.",
        excerpt: "How to ease the pain until morning, what to avoid and when it's time to call a 24/7 dentist.",
        answer:
          "For severe toothache at night, take a painkiller you normally tolerate according to the leaflet, sleep with your head raised and avoid very cold, hot or sweet food. If the pain is throbbing, doesn't ease with painkillers, or comes with swelling or a fever, call a 24/7 dentist that same night. In Plovdiv, T&Co Dental has a dentist on duty around the clock.",
        sections: [
          {
            heading: "Why does toothache get worse at night?",
            paragraphs: [
              "When you lie down, more blood flows to your head and the pressure inside an inflamed pulp (the tooth's nerve) rises. That's why pain from pulpitis or an abscess often peaks in the evening and at night. Throbbing night-time pain usually means the inflammation has reached the nerve and won't settle on its own.",
            ],
          },
          {
            heading: "What to do right away",
            ordered: true,
            list: [
              "Take a painkiller you've tolerated before, exactly as the leaflet says. Don't exceed the dose.",
              "Rinse gently with lukewarm water to remove food around the tooth.",
              "Sleep with your head raised on two pillows to reduce the pressure.",
              "For swelling, hold a cold compress on the outside of the cheek for 10-15 minutes, with breaks.",
              "Avoid very cold, hot or sweet food and chewing on that side.",
              "Call the emergency number if the pain hasn't eased within an hour of the painkiller.",
            ],
          },
          {
            heading: "What not to do",
            list: [
              "Don't put a tablet (such as aspirin) directly on the gum, it burns the tissue.",
              "Don't warm the cheek. Heat can spread an infection.",
              "Don't put alcohol, garlic or other home remedies in the tooth.",
              "Don't start antibiotics on your own. They don't treat an inflamed nerve and can mask the problem.",
            ],
          },
          {
            heading: "What the dentist on duty will do",
            paragraphs: [
              "At an emergency visit we first find the cause: an examination and, if needed, an on-site dental X-ray. Then we stop the pain, most often with anaesthesia and opening the tooth to release the pressure, draining an abscess or placing a temporary filling. The aim is to save the tooth, and we schedule the rest of the treatment at a time that suits you.",
            ],
          },
        ],
        urgent: [
          "The pain is severe, throbbing and not relieved by painkillers",
          "Your cheek, gum or face is swollen",
          "You have a fever or feel unwell",
          "It's hard to open your mouth or swallow",
        ],
        faq: [
          {
            q: "Can toothache wait until morning?",
            a: "If the pain eases with a painkiller and there's no swelling or fever, it can usually wait until morning, then call for an appointment. If the pain is severe, throbbing or there's swelling, don't wait, call the emergency number during the night.",
          },
          {
            q: "Is there a dentist open at night in Plovdiv?",
            a: "Yes. T&Co Dental at 34 Dame Gruev St. is a 24/7 dental clinic. The emergency line answers around the clock and the dentist on duty sees patients at night, on weekends and on public holidays.",
          },
          {
            q: "Will the tooth have to come out?",
            a: "Not necessarily. In most cases the tooth can be saved with root canal treatment. We only suggest an extraction when the tooth can't be saved, and always after explaining the options.",
          },
        ],
      },
    },
  },
  {
    id: "swollen-cheek-abscess",
    art: "abscess",
    thumbnail: "/images/services/abscess.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["abscess", "emergency", "emergency-oral-surgery"],
    text: {
      bg: {
        slug: "podut-buza-zaben-abstses",
        title: "Подута буза и зъбен абсцес: кога е спешно",
        metaTitle: "Подута буза от зъб (абсцес): кога е спешно и какво да правя",
        metaDescription:
          "Подута буза от зъб може да е абсцес. Кога е спешно, какво да правите до прегледа и защо да не затопляте. Спешен зъболекар в Пловдив 24/7.",
        excerpt: "Как да разпознаете зъбен абсцес, какво да правите до прегледа и кога подуването е опасно.",
        answer:
          "Подута буза около болен зъб най-често означава зъбен абсцес, гнойна инфекция, която не преминава сама и трябва да се лекува от зъболекар до 24 часа. Сложете студен компрес отвън и се обадете на спешен зъболекар. Ако подуването се разпространява към окото или шията, или ви е трудно да преглъщате или дишате, обадете се незабавно на 112.",
        sections: [
          {
            heading: "Как да разпознаете зъбен абсцес",
            list: [
              "Подуване на бузата, венеца или под челюстта, често от едната страна",
              "Пулсираща болка, която се засилва при допир или хапане",
              "Червена, болезнена подутина или „пъпка“ на венеца, понякога с гной",
              "Неприятен вкус или мирис в устата",
              "Температура, отпадналост, увеличени лимфни възли под челюстта",
            ],
          },
          {
            heading: "Какво да направите до прегледа",
            ordered: true,
            list: [
              "Сложете студен компрес отвън на бузата за 10-15 минути, с почивки.",
              "Приемете обезболяващо, което понасяте, според листовката.",
              "Изплаквайте внимателно с хладка солена вода (половин чаена лъжичка сол в чаша вода).",
              "Обадете се на спешния номер. Абсцес не трябва да чака „да мине“.",
            ],
          },
          {
            heading: "Защо не бива да затопляте и да чакате",
            paragraphs: [
              "Топлината разширява съдовете и може да помогне на инфекцията да се разпространи. Антибиотик без лечение на зъба само временно потиска инфекцията: причината остава в зъба и абсцесът се връща. Лечението е дренаж на гнойта и почистване на източника, чрез кореново лечение или, ако зъбът не може да се запази, чрез вадене.",
            ],
          },
          {
            heading: "Какво правим при спешно посещение",
            paragraphs: [
              "Правим зъбна снимка на място, за да видим откъде тръгва инфекцията, обезболяваме и дренираме абсцеса. Когато е нужно, лекарят преценява дали да назначи антибиотик. Повечето пациенти усещат облекчение още в първите часове след дренажа.",
            ],
          },
        ],
        urgent: [
          "Подуването се разпространява към окото, шията или под езика (тогава се обадете на 112)",
          "Трудно преглъщате, дишате или отваряте устата (тогава се обадете на 112)",
          "Имате висока температура",
          "Подуването расте бързо в рамките на часове",
        ],
        faq: [
          {
            q: "Минава ли абсцес от само себе си?",
            a: "Не. Дори ако гнойта се отвори сама и болката намалее, източникът на инфекцията остава в зъба и абсцесът се връща. Нужно е лечение при зъболекар.",
          },
          {
            q: "Трябва ли ми антибиотик?",
            a: "Понякога да, но само по преценка на лекаря и заедно с лечение на зъба. Антибиотикът сам по себе си не премахва причината.",
          },
          {
            q: "Приемате ли пациенти с абсцес през нощта?",
            a: "Да. T&Co Dental е спешен денонощен зъболекарски кабинет в Пловдив. Обадете се на спешния номер по всяко време и дежурният лекар ще ви каже кога да дойдете.",
          },
        ],
      },
      en: {
        slug: "swollen-cheek-dental-abscess",
        title: "Swollen cheek and dental abscess: when it's urgent",
        metaTitle: "Swollen Cheek from a Tooth (Abscess): When It's Urgent",
        metaDescription:
          "A swollen cheek from a tooth may be an abscess. When it's urgent, what to do until you see a dentist and why you shouldn't apply heat. 24/7 emergency dentist in Plovdiv.",
        excerpt: "How to recognise a dental abscess, what to do until your visit and when swelling becomes dangerous.",
        answer:
          "A swollen cheek around a painful tooth usually means a dental abscess, a pus-filled infection that won't clear up on its own and should be treated by a dentist within 24 hours. Put a cold compress on the outside and call an emergency dentist. If the swelling spreads towards the eye or neck, or it's hard to swallow or breathe, call 112 immediately.",
        sections: [
          {
            heading: "How to recognise a dental abscess",
            list: [
              "Swelling of the cheek, gum or under the jaw, often on one side",
              "Throbbing pain that gets worse when you touch or bite on the tooth",
              "A red, tender swelling or pimple on the gum, sometimes with pus",
              "A bad taste or smell in the mouth",
              "Fever, tiredness, swollen lymph nodes under the jaw",
            ],
          },
          {
            heading: "What to do until your visit",
            ordered: true,
            list: [
              "Hold a cold compress on the outside of the cheek for 10-15 minutes, with breaks.",
              "Take a painkiller you tolerate, according to the leaflet.",
              "Rinse gently with lukewarm salt water (half a teaspoon of salt in a glass of water).",
              "Call the emergency number. An abscess shouldn't be left to clear up on its own.",
            ],
          },
          {
            heading: "Why you shouldn't apply heat or wait",
            paragraphs: [
              "Heat widens the blood vessels and can help an infection spread. Antibiotics without treating the tooth only suppress the infection for a while: the cause stays in the tooth and the abscess comes back. Treatment means draining the pus and removing the source, with a root canal or, if the tooth can't be saved, an extraction.",
            ],
          },
          {
            heading: "What we do at an emergency visit",
            paragraphs: [
              "We take an on-site dental X-ray to see where the infection starts, numb the area and drain the abscess. When needed, the dentist decides whether to prescribe antibiotics. Most patients feel relief within hours of drainage.",
            ],
          },
        ],
        urgent: [
          "The swelling spreads towards the eye, the neck or under the tongue (call 112)",
          "It's hard to swallow, breathe or open your mouth (call 112)",
          "You have a high fever",
          "The swelling grows quickly over a few hours",
        ],
        faq: [
          {
            q: "Does an abscess go away on its own?",
            a: "No. Even if the pus drains by itself and the pain eases, the source of the infection stays in the tooth and the abscess returns. It needs treatment by a dentist.",
          },
          {
            q: "Do I need antibiotics?",
            a: "Sometimes, but only if the dentist decides so and together with treating the tooth. Antibiotics alone don't remove the cause.",
          },
          {
            q: "Do you see abscess patients at night?",
            a: "Yes. T&Co Dental is a 24/7 emergency dental clinic in Plovdiv. Call the emergency number at any time and the dentist on duty will tell you when to come in.",
          },
        ],
      },
    },
  },
  {
    id: "knocked-out-tooth",
    art: "broken",
    thumbnail: "/images/services/broken-tooth.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["broken-tooth", "emergency", "pediatric"],
    text: {
      bg: {
        slug: "izbit-ili-schupen-zab",
        title: "Избит или счупен зъб: първа помощ в първите 30 минути",
        metaTitle: "Избит или счупен зъб: първа помощ и спешен зъболекар",
        metaDescription:
          "Какво да направите веднага при избит или счупен зъб: как да хванете зъба, в какво да го съхраните и защо времето е решаващо. Спешен зъболекар в Пловдив 24/7.",
        excerpt: "Как да спасите избит зъб, какво да правите със счупено парче и кога да дойдете в кабинета.",
        answer:
          "При избит постоянен зъб хванете го за короната (не за корена), изплакнете го за секунди с мляко или физиологичен разтвор, ако е замърсен, и ако можете, го върнете в гнездото и захапете чиста марля. Ако не можете, сложете го в чаша мляко и се обадете веднага на спешен зъболекар: шансът зъбът да се запази е най-голям в първите 30-60 минути. Млечни зъби не се връщат обратно.",
        sections: [
          {
            heading: "Избит постоянен зъб: стъпка по стъпка",
            ordered: true,
            list: [
              "Намерете зъба и го хванете само за короната, бялата част. Не докосвайте корена.",
              "Ако е замърсен, изплакнете го за няколко секунди с мляко, физиологичен разтвор или вода. Не го търкайте и не го бършете.",
              "Ако можете, внимателно го върнете в гнездото и захапете чиста марля или кърпичка.",
              "Ако не можете, сложете го в чаша прясно мляко или физиологичен разтвор. Не го увивайте в сухи салфетки.",
              "Обадете се на спешния номер и тръгнете към кабинета веднага.",
            ],
          },
          {
            heading: "Счупен или отчупен зъб",
            paragraphs: [
              "Запазете отчупеното парче в мляко или вода, понякога то може да бъде залепено обратно. Изплакнете устата с хладка вода и сложете студен компрес при подуване. Ако се вижда розова или червена точка в счупения зъб или болката е силна, нервът е засегнат и е нужна спешна помощ. Малко отчупване без болка може да изчака до следващия работен ден.",
            ],
          },
          {
            heading: "Ако е засегнато дете",
            paragraphs: [
              "Избит млечен зъб не се връща обратно, защото може да увреди постоянния зъб под него. Спрете кървенето с марля и доведете детето на преглед, за да проверим за други наранявания. Избит постоянен зъб при дете (обикновено след 6-7 години) се връща обратно по същия начин като при възрастен.",
            ],
          },
        ],
        urgent: [
          "Зъбът е избит изцяло",
          "Зъбът е разклатен или изместен след удар",
          "В счупения зъб се вижда розова или червена точка",
          "Има силна болка или кървене, което не спира",
          "Имало е удар в главата, загуба на съзнание или повръщане (тогава се обадете на 112)",
        ],
        faq: [
          {
            q: "Колко време имам, за да спасят избит зъб?",
            a: "Най-добрите резултати са, когато зъбът е върнат в гнездото до 30-60 минути. Съхранен в мляко, зъбът има шанс и след това, затова не се отказвайте, а се обадете веднага.",
          },
          {
            q: "Мога ли да държа зъба в устата?",
            a: "Възрастен може да държи зъба в устата, между бузата и зъбите, ако няма мляко. При деца не го правете заради риск от поглъщане.",
          },
          {
            q: "Може ли счупен зъб да се възстанови?",
            a: "В повечето случаи да, с пломба, залепване на парчето или коронка. Ако нервът е засегнат, може да е нужно кореново лечение.",
          },
        ],
      },
      en: {
        slug: "knocked-out-or-broken-tooth",
        title: "Knocked-out or broken tooth: first aid in the first 30 minutes",
        metaTitle: "Knocked-Out or Broken Tooth: First Aid & Emergency Dentist",
        metaDescription:
          "What to do right away if a tooth is knocked out or broken: how to hold it, what to store it in and why time matters. 24/7 emergency dentist in Plovdiv.",
        excerpt: "How to save a knocked-out tooth, what to do with a broken piece and when to come in.",
        answer:
          "If an adult tooth is knocked out, hold it by the crown (not the root), rinse it for a few seconds with milk or saline if it's dirty and, if you can, put it back in its socket and bite on clean gauze. If you can't, put it in a glass of milk and call an emergency dentist immediately: the chances of saving the tooth are best within 30-60 minutes. Baby teeth should not be put back.",
        sections: [
          {
            heading: "Knocked-out adult tooth: step by step",
            ordered: true,
            list: [
              "Find the tooth and hold it only by the crown, the white part. Don't touch the root.",
              "If it's dirty, rinse it for a few seconds with milk, saline or water. Don't scrub or wipe it.",
              "If you can, gently put it back in its socket and bite on clean gauze or a tissue.",
              "If you can't, put it in a glass of fresh milk or saline. Don't wrap it in a dry tissue.",
              "Call the emergency number and head to the clinic straight away.",
            ],
          },
          {
            heading: "Broken or chipped tooth",
            paragraphs: [
              "Keep the broken piece in milk or water, sometimes it can be bonded back. Rinse your mouth with lukewarm water and use a cold compress for swelling. If you can see a pink or red dot in the broken tooth or the pain is severe, the nerve is exposed and you need emergency care. A small chip without pain can wait until the next working day.",
            ],
          },
          {
            heading: "If it's a child",
            paragraphs: [
              "A knocked-out baby tooth is not put back, because this can damage the adult tooth underneath. Stop the bleeding with gauze and bring the child in so we can check for other injuries. A knocked-out adult tooth in a child (usually after age 6-7) is put back in the same way as for an adult.",
            ],
          },
        ],
        urgent: [
          "The tooth has been knocked out completely",
          "The tooth is loose or pushed out of place after an impact",
          "You can see a pink or red dot in the broken tooth",
          "There is severe pain or bleeding that won't stop",
          "There was a blow to the head, loss of consciousness or vomiting (call 112)",
        ],
        faq: [
          {
            q: "How much time do I have to save a knocked-out tooth?",
            a: "Results are best when the tooth is back in its socket within 30-60 minutes. Stored in milk, a tooth still has a chance after that, so don't give up, call immediately.",
          },
          {
            q: "Can I keep the tooth in my mouth?",
            a: "An adult can keep the tooth in the mouth, between the cheek and teeth, if there's no milk. Don't do this with children because of the risk of swallowing it.",
          },
          {
            q: "Can a broken tooth be repaired?",
            a: "In most cases yes, with a filling, by bonding the piece back or with a crown. If the nerve is affected, a root canal may be needed.",
          },
        ],
      },
    },
  },
  {
    id: "bleeding-after-extraction",
    art: "extraction",
    thumbnail: "/images/services/emergency-extraction.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["extraction", "emergency-extraction", "emergency"],
    text: {
      bg: {
        slug: "karvene-sled-vadene-na-zab",
        title: "Кървене след вадене на зъб: какво е нормално",
        metaTitle: "Кървене след вадене на зъб: какво е нормално и кога е спешно",
        metaDescription:
          "Колко време е нормално да кърви след вадене на зъб, как да спрете кървенето и кога да се обадите на зъболекар. Спешен зъболекар в Пловдив 24/7.",
        excerpt: "Колко кървене е нормално, как да го спрете у дома и кога е нужна спешна помощ.",
        answer:
          "Леко кървене и розова слюнка са нормални до 24 часа след вадене на зъб. За да спрете кървенето, захапете плътно сгъната чиста марля върху раната за 30-45 минути без да я махате. Ако кървенето е силно и не спира след два такива опита, обадете се на спешен зъболекар.",
        sections: [
          {
            heading: "Как да спрете кървенето",
            ordered: true,
            list: [
              "Махнете старата марля и изплюйте внимателно съсиреците, без да изплаквате силно.",
              "Сгънете чиста марля на плътно тампонче и я поставете точно върху раната.",
              "Захапете здраво и дръжте 30-45 минути, без да проверявате.",
              "Седнете или легнете с повдигната глава. Не се навеждайте и не се напрягайте.",
              "Ако няма марля, може да захапете навлажнено пакетче черен чай: веществата в него помагат за съсирването.",
            ],
          },
          {
            heading: "Първите 24 часа след вадене",
            list: [
              "Не изплаквайте силно, не плюйте и не пийте със сламка, за да не се отдели съсирекът.",
              "Не пушете и не пийте алкохол.",
              "Хранете се с хладка, мека храна от другата страна.",
              "Не пипайте раната с език или пръсти.",
              "При подуване сложете студен компрес отвън за 10-15 минути, с почивки.",
            ],
          },
          {
            heading: "Кога болката след вадене не е нормална",
            paragraphs: [
              "Болката обикновено намалява всеки ден. Ако на 2-4-ия ден тя се засили, стига до ухото и в гнездото не се вижда съсирек, възможно е да имате „сух алвеолит“ (сухо гнездо). Не е опасно, но боли силно и се лекува бързо в кабинета, затова се обадете.",
            ],
          },
        ],
        urgent: [
          "Кървенето е силно и не спира след два опита с марля по 45 минути",
          "Устата се пълни с кръв за минути",
          "Появява се нарастващо подуване или температура",
          "Болката се засилва на 2-4-ия ден",
          "Приемате лекарства за разреждане на кръвта и кървенето не спира",
        ],
        faq: [
          {
            q: "Колко време е нормално да кърви след вадене на зъб?",
            a: "Активното кървене обикновено спира до час, а леко оцветяване на слюнката може да има до 24 часа. Силно кървене след това е повод да се обадите.",
          },
          {
            q: "Мога ли да се храня след вадене?",
            a: "Да, след като упойката отшуми (за да не се нахапете). През първия ден предпочитайте хладка и мека храна и дъвчете от другата страна.",
          },
          {
            q: "Приемате ли спешно при кървене през нощта?",
            a: "Да. При кървене, което не спира, се обадете на спешния ни номер по всяко време. T&Co Dental е денонощен зъболекарски кабинет в Пловдив.",
          },
        ],
      },
      en: {
        slug: "bleeding-after-tooth-extraction",
        title: "Bleeding after a tooth extraction: what's normal",
        metaTitle: "Bleeding After Tooth Extraction: What's Normal, When It's Urgent",
        metaDescription:
          "How long it's normal to bleed after a tooth extraction, how to stop the bleeding and when to call a dentist. 24/7 emergency dentist in Plovdiv.",
        excerpt: "How much bleeding is normal, how to stop it at home and when you need emergency care.",
        answer:
          "Light bleeding and pink saliva are normal for up to 24 hours after a tooth extraction. To stop the bleeding, bite firmly on a folded piece of clean gauze over the socket for 30-45 minutes without removing it. If the bleeding is heavy and doesn't stop after two attempts, call an emergency dentist.",
        sections: [
          {
            heading: "How to stop the bleeding",
            ordered: true,
            list: [
              "Remove the old gauze and gently spit out any clots, without rinsing hard.",
              "Fold clean gauze into a firm pad and place it right over the socket.",
              "Bite down firmly and hold for 30-45 minutes without checking.",
              "Sit or lie with your head raised. Don't bend over or strain.",
              "If you have no gauze, bite on a moistened black tea bag: substances in the tea help the blood clot.",
            ],
          },
          {
            heading: "The first 24 hours after an extraction",
            list: [
              "Don't rinse hard, spit or drink through a straw, so the clot isn't dislodged.",
              "Don't smoke or drink alcohol.",
              "Eat lukewarm, soft food on the other side.",
              "Don't touch the socket with your tongue or fingers.",
              "For swelling, hold a cold compress on the outside for 10-15 minutes, with breaks.",
            ],
          },
          {
            heading: "When pain after an extraction isn't normal",
            paragraphs: [
              "Pain usually eases a little every day. If on day 2-4 it gets worse, spreads to the ear and there's no clot in the socket, you may have a dry socket (alveolar osteitis). It isn't dangerous, but it hurts a lot and is quickly treated in the clinic, so give us a call.",
            ],
          },
        ],
        urgent: [
          "Heavy bleeding that doesn't stop after two 45-minute attempts with gauze",
          "Your mouth fills with blood within minutes",
          "Growing swelling or a fever",
          "Pain that gets worse on day 2-4",
          "You take blood thinners and the bleeding won't stop",
        ],
        faq: [
          {
            q: "How long is it normal to bleed after a tooth extraction?",
            a: "Active bleeding usually stops within an hour, and slightly pink saliva can last up to 24 hours. Heavy bleeding after that is a reason to call.",
          },
          {
            q: "Can I eat after an extraction?",
            a: "Yes, once the anaesthetic has worn off (so you don't bite yourself). On the first day choose lukewarm, soft food and chew on the other side.",
          },
          {
            q: "Can I come in at night for bleeding?",
            a: "Yes. If bleeding won't stop, call our emergency number at any time. T&Co Dental is a 24/7 dental clinic in Plovdiv.",
          },
        ],
      },
    },
  },
  {
    id: "weekend-holiday-dentist",
    art: "emergency",
    thumbnail: "/images/services/emergency.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["emergency", "x-ray", "toothache"],
    text: {
      bg: {
        slug: "speshen-zabolekar-v-pochivni-dni",
        title: "Спешен зъболекар в почивни дни и по празниците в Пловдив",
        metaTitle: "Спешен зъболекар в събота, неделя и празници в Пловдив",
        metaDescription:
          "Как работи спешният зъболекар в почивни дни и по празниците в Пловдив: кога да се обадите, какво да носите и какво се случва при посещението. Отворено 24/7.",
        excerpt: "Как да получите зъболекарска помощ в събота, неделя или на празник и какво да очаквате.",
        answer:
          "В Пловдив T&Co Dental приема спешни пациенти и в събота, неделя и по официалните празници. Не е нужно да търсите свободен час онлайн: обадете се на спешния номер, опишете какво се случва и дежурният лекар ще уговори с вас кога да дойдете в кабинета на ул. „Даме Груев“ 34.",
        sections: [
          {
            heading: "Кога си струва да не чакате до понеделник",
            list: [
              "Силна болка, която не минава с обезболяващо",
              "Подуване на бузата, венеца или лицето",
              "Избит, счупен или разклатен зъб след удар",
              "Кървене след вадене, което не спира",
              "Паднала коронка или пломба, ако има остра болка",
            ],
            paragraphs: [
              "Ако болката е лека и отшумява с обезболяващо, обикновено е спокойно да изчака до работен ден. Когато се колебаете, обадете се: ще ви кажем честно дали е нужно да дойдете сега.",
            ],
          },
          {
            heading: "Как протича спешното посещение",
            ordered: true,
            list: [
              "Обаждате се на спешния номер и описвате оплакванията.",
              "Дежурният лекар ви съветва какво да направите веднага и уговаря час за идване.",
              "В кабинета правим преглед и при нужда зъбна снимка на място.",
              "Спираме болката и инфекцията, а довършването на лечението планираме в удобен за вас ден.",
            ],
          },
          {
            heading: "Какво да вземете със себе си",
            list: [
              "Лична карта",
              "Списък на лекарствата, които приемате, особено за разреждане на кръвта",
              "Информация за алергии и хронични заболявания",
              "Стари зъбни снимки, ако имате",
            ],
          },
        ],
        urgent: [
          "Болката не ви позволява да спите или да се храните",
          "Има подуване или температура",
          "Зъб е избит или счупен",
          "Кървенето не спира",
        ],
        faq: [
          {
            q: "Работи ли зъболекар в неделя в Пловдив?",
            a: "Да, за спешни случаи. T&Co Dental има дежурен лекар 24/7, включително в неделя и по празниците. Планови прегледи и лечение правим в работните дни от 9:00 до 20:00.",
          },
          {
            q: "Трябва ли да си запазя час онлайн за спешен случай?",
            a: "Не. Онлайн календарът е за планови посещения. При спешен случай се обадете на спешния номер.",
          },
          {
            q: "Работите ли с НЗОК в почивните дни?",
            a: "С НЗОК работим в работно време. За спешно посещение извън него дежурният лекар ще ви каже цената предварително.",
          },
        ],
      },
      en: {
        slug: "emergency-dentist-weekends-holidays",
        title: "Emergency dentist on weekends and public holidays in Plovdiv",
        metaTitle: "Emergency Dentist on Weekends & Holidays in Plovdiv",
        metaDescription:
          "How emergency dental care works on weekends and public holidays in Plovdiv: when to call, what to bring and what happens at the visit. Open 24/7.",
        excerpt: "How to get dental help on a Saturday, Sunday or public holiday, and what to expect.",
        answer:
          "In Plovdiv, T&Co Dental sees emergency patients on Saturdays, Sundays and public holidays. There's no need to look for a free slot online: call the emergency number, describe what's happening and the dentist on duty will arrange when to come to the clinic at 34 Dame Gruev St.",
        sections: [
          {
            heading: "When it's worth not waiting until Monday",
            list: [
              "Severe pain that painkillers don't relieve",
              "Swelling of the cheek, gum or face",
              "A knocked-out, broken or loose tooth after an impact",
              "Bleeding after an extraction that won't stop",
              "A lost crown or filling with sharp pain",
            ],
            paragraphs: [
              "If the pain is mild and eases with a painkiller, it can usually wait until a working day. If you're unsure, call: we'll tell you honestly whether you need to come in now.",
            ],
          },
          {
            heading: "How an emergency visit works",
            ordered: true,
            list: [
              "You call the emergency number and describe the problem.",
              "The dentist on duty tells you what to do straight away and arranges a time to come in.",
              "At the clinic we examine you and, if needed, take an on-site dental X-ray.",
              "We stop the pain and infection, and schedule the rest of the treatment on a day that suits you.",
            ],
          },
          {
            heading: "What to bring",
            list: [
              "An ID document",
              "A list of the medicines you take, especially blood thinners",
              "Information about allergies and chronic conditions",
              "Previous dental X-rays, if you have them",
            ],
          },
        ],
        urgent: [
          "The pain keeps you from sleeping or eating",
          "There's swelling or a fever",
          "A tooth has been knocked out or broken",
          "Bleeding won't stop",
        ],
        faq: [
          {
            q: "Is there a dentist open on Sunday in Plovdiv?",
            a: "Yes, for emergencies. T&Co Dental has a dentist on duty 24/7, including Sundays and public holidays. Routine check-ups and treatment are on weekdays from 9:00 to 20:00.",
          },
          {
            q: "Do I need to book online for an emergency?",
            a: "No. The online calendar is for planned visits. In an emergency, call the emergency number.",
          },
          {
            q: "Do you accept the NHIF on weekends?",
            a: "We work with the NHIF during regular hours. For an emergency visit outside them, the dentist on duty will tell you the price in advance.",
          },
        ],
      },
    },
  },
  {
    id: "choosing-a-dentist",
    art: "exam",
    thumbnail: "/images/services/diagnostics.jpg",
    published: "2026-09-29",
    updated: "2026-09-29",
    services: ["exam", "dental-images", "cleaning"],
    text: {
      bg: {
        slug: "kak-da-izberem-zabolekar-v-plovdiv",
        title: "Как да изберем зъболекар в Пловдив",
        metaTitle: "Как да изберем добър зъболекар в Пловдив: 7 неща, които да проверите",
        metaDescription:
          "На какво да обърнете внимание, когато избирате зъболекар в Пловдив: рентген на място, кофердам, НЗОК, спешна помощ 24/7, ясни цени и онлайн записване.",
        excerpt: "Седем практични критерия, които ще ви помогнат да изберете зъболекар, на когото да се доверите.",
        answer:
          "Добрият зъболекар в Пловдив поставя диагноза със зъбна снимка на място, работи с кофердам, обяснява лечението и цената предварително, работи с НЗОК и не ви оставя без помощ, когато ви боли, включително през нощта. Проверете и отзивите в Google, местоположението и дали можете да запазите час онлайн.",
        sections: [
          {
            heading: "7 неща, които да проверите",
            ordered: true,
            list: [
              "Рентген в кабинета. Снимката на място позволява точна диагноза още при първото посещение, без да ходите другаде.",
              "Работа с кофердам. Гумената преграда пази зъба сух и чист по време на лечение и прави пломбите и кореновото лечение по-трайни.",
              "Ясен план и цена предварително. Лекарят трябва да обясни възможностите и цената, преди да започне.",
              "Договор с НЗОК. Част от прегледите и лечението могат да бъдат покрити от здравната каса.",
              "Спешна помощ. Зъбната болка не спазва работно време. Проверете дали кабинетът приема спешни случаи и извън него.",
              "Отзиви на реални пациенти. Прочетете какво пишат другите в Google за отношението и резултата.",
              "Удобство. Местоположение, работно време и възможност да запазите час онлайн при избран от вас лекар.",
            ],
          },
          {
            heading: "Как да разберете, че лекарят е подходящ за вас",
            paragraphs: [
              "Още на първия преглед трябва да се чувствате спокойни: лекарят ви изслушва, показва ви снимката, обяснява какво вижда и не ви притиска да решите веднага. Добрият зъболекар предлага варианти и ви оставя да изберете заедно.",
            ],
          },
          {
            heading: "T&Co Dental накратко",
            paragraphs: [
              "T&Co Dental е зъболекарски кабинет в Пловдив, на ул. „Даме Груев“ 34 (район Южен). Имаме рентген на място, работим с кофердам и с НЗОК, а спешният ни телефон отговаря 24/7. Може да запазите час онлайн при избрания от вас лекар за по-малко от минута.",
            ],
          },
        ],
        urgent: [
          "Имате силна болка, подуване или травма, не отлагайте избора, обадете се на спешния номер",
        ],
        faq: [
          {
            q: "Колко често трябва да ходя на зъболекар?",
            a: "За профилактичен преглед поне веднъж годишно, а при повече проблеми или пародонтоза, на всеки 6 месеца. Почистването на зъбен камък също е добре да е поне веднъж годишно.",
          },
          {
            q: "Мога ли да избера лекаря, при когото да отида?",
            a: "Да. В T&Co Dental при онлайн записване избирате лекаря, деня и свободния час.",
          },
          {
            q: "Приемате ли нови пациенти?",
            a: "Да, приемаме нови пациенти, възрастни и деца. Запазете час онлайн или се обадете.",
          },
        ],
      },
      en: {
        slug: "how-to-choose-a-dentist-in-plovdiv",
        title: "How to choose a dentist in Plovdiv",
        metaTitle: "How to Choose a Good Dentist in Plovdiv: 7 Things to Check",
        metaDescription:
          "What to look for when choosing a dentist in Plovdiv: on-site X-rays, rubber dam, NHIF, 24/7 emergency care, clear prices and online booking.",
        excerpt: "Seven practical criteria to help you choose a dentist you can trust.",
        answer:
          "A good dentist in Plovdiv makes the diagnosis with an on-site dental X-ray, works with a rubber dam, explains the treatment and the price upfront, works with the NHIF and doesn't leave you without help when you're in pain, including at night. Also check the Google reviews, the location and whether you can book online.",
        sections: [
          {
            heading: "7 things to check",
            ordered: true,
            list: [
              "An X-ray unit in the clinic. On-site X-rays allow an accurate diagnosis at the first visit, with no trips elsewhere.",
              "Rubber dam isolation. The rubber sheet keeps the tooth dry and clean during treatment and makes fillings and root canals last longer.",
              "A clear plan and price upfront. The dentist should explain the options and the cost before starting.",
              "An NHIF contract. Some check-ups and treatments can be covered by the National Health Insurance Fund.",
              "Emergency care. Toothache doesn't keep office hours. Check whether the clinic sees emergencies outside regular hours.",
              "Reviews from real patients. Read what others say on Google about the care and the results.",
              "Convenience. Location, opening hours and the option to book online with the dentist you choose.",
            ],
          },
          {
            heading: "How to tell a dentist is right for you",
            paragraphs: [
              "At the very first visit you should feel at ease: the dentist listens, shows you the X-ray, explains what they see and doesn't pressure you to decide straight away. A good dentist offers options and lets you choose together.",
            ],
          },
          {
            heading: "T&Co Dental in brief",
            paragraphs: [
              "T&Co Dental is a dental clinic in Plovdiv at 34 Dame Gruev St. (Yuzhen district). We have on-site X-rays, work with a rubber dam and with the NHIF, and our emergency line answers 24/7. You can book online with the dentist of your choice in under a minute.",
            ],
          },
        ],
        urgent: ["You have severe pain, swelling or an injury: don't put it off, call the emergency number"],
        faq: [
          {
            q: "How often should I see a dentist?",
            a: "At least once a year for a check-up, and every 6 months if you have more problems or gum disease. Scaling is also best done at least once a year.",
          },
          {
            q: "Can I choose which dentist I see?",
            a: "Yes. When booking online at T&Co Dental you choose the dentist, the day and a free time.",
          },
          {
            q: "Are you accepting new patients?",
            a: "Yes, we accept new patients, adults and children. Book online or give us a call.",
          },
        ],
      },
    },
  },
];

export const findGuide = (locale: Locale, slug: string) => guides.find((g) => g.text[locale].slug === slug);

/** Guides that point to a given service or category, for "useful guides" links on service pages. */
export const guidesForService = (serviceId: string) => guides.filter((g) => g.services.includes(serviceId));
