import type { ServiceCategory } from "./types";

export const diagnostics: ServiceCategory = {
  id: "diagnostics",
  art: "diagnostics",
  text: {
    bg: {
      slug: "diagnostika-i-obrazna-diagnostika",
      title: "Диагностика и образна диагностика",
      navTitle: "Диагностика и снимки",
      metaTitle: "Дентална диагностика и зъбни снимки в Пловдив",
      metaDescription:
        "Преглед, консултация и зъбни снимки на място, без да ходите в друг кабинет. Точна диагноза още при първото посещение. T&Co Dental, Пловдив.",
      excerpt: "Преглед, консултация и зъбни снимки в кабинета, за точна диагноза още при първото посещение.",
      intro: [
        "Доброто лечение започва с точна диагноза. Много проблеми, кариес между зъбите, инфекции в корена, пукнатини, не се виждат с просто око и могат да бъдат открити само със зъбна снимка.",
        "В T&Co Dental разполагаме със собствен рентген, така че снимката се прави на място, в рамките на прегледа. Не се налага да ходите до друг кабинет и да се връщате, планът за лечение е готов веднага.",
      ],
      steps: [
        { title: "Разговор", text: "Вашите оплаквания, общо здравословно състояние и приемани медикаменти." },
        { title: "Клиничен преглед", text: "Зъби, венци, захапка и меки тъкани." },
        { title: "Снимка при нужда", text: "Прави се в кабинета, за минути." },
        { title: "План за лечение", text: "Обясняваме възможностите, сроковете и цената." },
      ],
      faq: [
        {
          q: "Безопасни ли са зъбните снимки?",
          a: "Дозата при една дентална снимка е много ниска. Правим снимки само когато са необходими и използваме защитна престилка.",
        },
        {
          q: "Трябва ли да нося стари снимки?",
          a: "Ако имате скорошни снимки, донесете ги, те помагат за сравнение и понякога спестяват нова снимка.",
        },
      ],
    },
    en: {
      slug: "diagnostics-and-imaging",
      title: "Diagnostics & Dental Imaging",
      navTitle: "Diagnostics & X-rays",
      metaTitle: "Dental Diagnostics & X-rays in Plovdiv",
      metaDescription:
        "Examination, consultation and dental X-rays on site, no need to go elsewhere. An accurate diagnosis at your first visit. T&Co Dental, Plovdiv.",
      excerpt: "Examination, consultation and dental X-rays in the clinic, for an accurate diagnosis at the first visit.",
      intro: [
        "Good treatment starts with an accurate diagnosis. Many problems, decay between teeth, infections at the root, cracks, can't be seen with the naked eye and only show up on a dental X-ray.",
        "At T&Co Dental we have our own X-ray unit, so images are taken on site as part of your examination. No trips to another clinic and back, your treatment plan is ready straight away.",
      ],
      steps: [
        { title: "Conversation", text: "Your concerns, general health and any medication you take." },
        { title: "Clinical examination", text: "Teeth, gums, bite and soft tissues." },
        { title: "X-ray if needed", text: "Taken in the clinic, in minutes." },
        { title: "Treatment plan", text: "We explain the options, timing and cost." },
      ],
      faq: [
        {
          q: "Are dental X-rays safe?",
          a: "The dose from a dental X-ray is very low. We only take X-rays when they're needed, and we use a protective apron.",
        },
        {
          q: "Should I bring old X-rays?",
          a: "If you have recent X-rays, bring them. They help with comparison and can sometimes save a new one.",
        },
      ],
    },
  },
  children: [
    {
      id: "dental-images",
      art: "images",
      text: {
        bg: {
          slug: "zabni-snimki",
          title: "Зъбни снимки",
          metaTitle: "Зъбни снимки на място в Пловдив",
          metaDescription:
            "Правим зъбни снимки направо в кабинета, бързо, с минимално облъчване и без да ходите другаде. T&Co Dental, ул. „Даме Груев“ 34, Пловдив.",
          excerpt: "Снимки направо в кабинета: бързо, с минимално облъчване и без да се налага да ходите другаде.",
          intro: [
            "Зъбната снимка показва онова, което не се вижда при прегледа: кариес между зъбите и под стари пломби, състоянието на корените и каналите, възпаления около върха на корена, загуба на кост, непробили зъби.",
            "Тъй като рентгенът е в кабинета, снимката се прави по време на посещението ви. Лекарят я разглежда с вас веднага и ви обяснява какво показва.",
          ],
          signsTitle: "Кога е нужна снимка",
          signs: [
            "При зъбобол или подуване с неясна причина",
            "Преди и по време на кореново лечение",
            "Преди изваждане на зъб или мъдрец",
            "За откриване на скрит кариес и за контрол след лечение",
          ],
          steps: [
            { title: "Подготовка", text: "Поставяме защитна престилка." },
            { title: "Заснемане", text: "Отнема секунди." },
            { title: "Разчитане", text: "Лекарят разглежда снимката заедно с вас." },
          ],
          faq: [
            {
              q: "Може ли снимка по време на бременност?",
              a: "По време на бременност правим снимки само при реална необходимост и със защитна престилка. Задължително ни кажете, ако сте бременна или има вероятност да сте.",
            },
          ],
        },
        en: {
          slug: "dental-x-rays",
          title: "Dental X-rays",
          metaTitle: "Dental X-rays On Site in Plovdiv",
          metaDescription:
            "We take dental X-rays right in the clinic, quickly, with minimal radiation and no trips elsewhere. T&Co Dental, 34 Dame Gruev St., Plovdiv.",
          excerpt: "X-rays right in the clinic: fast, with minimal radiation and no need to go anywhere else.",
          intro: [
            "A dental X-ray shows what an examination can't: decay between teeth and under old fillings, the condition of the roots and canals, inflammation at the root tip, bone loss and unerupted teeth.",
            "Because the X-ray unit is in the clinic, the image is taken during your visit. The dentist goes through it with you straight away and explains what it shows.",
          ],
          signsTitle: "When an X-ray is needed",
          signs: [
            "Toothache or swelling with an unclear cause",
            "Before and during root canal treatment",
            "Before removing a tooth or wisdom tooth",
            "To find hidden decay and check treatment results",
          ],
          steps: [
            { title: "Preparation", text: "We place a protective apron." },
            { title: "Taking the image", text: "It takes seconds." },
            { title: "Reading it together", text: "The dentist reviews the image with you." },
          ],
          faq: [
            {
              q: "Can I have an X-ray while pregnant?",
              a: "During pregnancy we only take X-rays when truly necessary, and with a protective apron. Please tell us if you are or might be pregnant.",
            },
          ],
        },
      },
    },
    {
      id: "periapical",
      art: "periapical",
      text: {
        bg: {
          slug: "sektorna-zabna-snimka",
          title: "Секторна зъбна снимка",
          metaTitle: "Секторна зъбна снимка в Пловдив: какво показва",
          metaDescription:
            "Секторната снимка показва 1-3 зъба в цял ръст, от коронката до върха на корена. Правим я на място при преглед, лечение и спешни случаи.",
          excerpt: "Детайлна снимка на един до три зъба, от коронката до върха на корена.",
          intro: [
            "Секторната (периапикална) снимка обхваща малък участък, обикновено един до три съседни зъба, и ги показва в цял ръст: коронката, корена и костта около върха му. Това е най-често използваната снимка в ежедневната практика.",
            "Благодарение на високата детайлност тя е незаменима при кореново лечение, при съмнение за инфекция в корена, при травма и преди изваждане на зъб. Тъй като обхваща малка зона, облъчването е минимално.",
          ],
          signsTitle: "Какво показва",
          signs: [
            "Кариес между зъбите и под пломби",
            "Възпаление около върха на корена",
            "Качеството на кореново лечение",
            "Фрактури на корена след травма",
            "Състоянието на костта около зъба",
          ],
          steps: [
            { title: "Позициониране", text: "Малък сензор или филм се поставя зад зъба." },
            { title: "Заснемане", text: "Отнема секунда." },
            { title: "Резултат", text: "Лекарят обсъжда снимката с вас веднага." },
          ],
        },
        en: {
          slug: "periapical-x-ray",
          title: "Periapical X-ray",
          metaTitle: "Periapical Dental X-ray in Plovdiv",
          metaDescription:
            "A periapical X-ray shows 1-3 teeth in full, from the crown to the root tip. We take it on site during check-ups, treatment and emergencies.",
          excerpt: "A detailed image of one to three teeth, from the crown to the tip of the root.",
          intro: [
            "A periapical X-ray covers a small area, usually one to three neighbouring teeth, and shows them in full: the crown, the root and the bone around its tip. It's the most commonly used X-ray in everyday practice.",
            "Thanks to its fine detail, it's essential for root canal treatment, suspected root infections, injuries and before an extraction. Because it covers a small area, the radiation dose is minimal.",
          ],
          signsTitle: "What it shows",
          signs: [
            "Decay between teeth and under fillings",
            "Inflammation around the root tip",
            "The quality of a root canal filling",
            "Root fractures after an injury",
            "The condition of the bone around the tooth",
          ],
          steps: [
            { title: "Positioning", text: "A small sensor or film is placed behind the tooth." },
            { title: "Taking the image", text: "It takes a second." },
            { title: "Result", text: "The dentist discusses the image with you straight away." },
          ],
        },
      },
    },
    {
      id: "x-ray",
      art: "xray",
      text: {
        bg: {
          slug: "zaben-rentgen",
          title: "Зъбен рентген",
          metaTitle: "Зъбен рентген в кабинета, включително при спешност",
          metaDescription:
            "Собствен дентален рентген в кабинета: снимка още при първото посещение, включително при спешни случаи извън работно време. Минимална доза облъчване.",
          excerpt: "Собствен рентген в кабинета: снимка веднага, включително при спешни посещения извън работно време.",
          intro: [
            "Рентгенът в самия кабинет променя много: диагнозата се поставя още при първото посещение, лечението може да започне веднага, а контролът по време на кореново лечение става в реално време, без да ви пращаме другаде.",
            "Това е особено важно при спешните случаи. Когато ви приемаме през нощта или в почивен ден, можем да направим снимка на място и да разберем точно откъде идва болката.",
          ],
          signsTitle: "Предимства",
          signs: [
            "Диагноза и лечение в едно посещение",
            "Снимки и при спешни случаи извън работно време",
            "Контролни снимки по време на кореново лечение",
            "Ниска доза облъчване и защитна престилка",
          ],
          steps: [
            { title: "Само при нужда", text: "Снимка правим, когато тя ще промени диагнозата или лечението." },
            { title: "Защита", text: "Използваме защитна престилка." },
            { title: "Обяснение", text: "Показваме ви снимката и обясняваме какво виждаме." },
          ],
          faq: [
            {
              q: "Колко облъчване получавам?",
              a: "Дозата при една вътреустна дентална снимка е много малка, сравнима с естествения радиационен фон, на който сме изложени за около ден.",
            },
          ],
        },
        en: {
          slug: "dental-x-ray",
          title: "Dental X-ray Unit",
          metaTitle: "In-Clinic Dental X-ray, Including Emergencies",
          metaDescription:
            "Our own dental X-ray unit in the clinic: images at your first visit, including emergencies outside regular hours. Minimal radiation dose.",
          excerpt: "Our own X-ray unit in the clinic: images straight away, including emergency visits outside regular hours.",
          intro: [
            "Having an X-ray unit in the clinic makes a big difference: the diagnosis is made at the first visit, treatment can start right away, and checks during root canal treatment happen in real time, without sending you elsewhere.",
            "This matters most in emergencies. When we see you at night or on a weekend, we can take an X-ray on the spot and find out exactly where the pain is coming from.",
          ],
          signsTitle: "Benefits",
          signs: [
            "Diagnosis and treatment in a single visit",
            "X-rays even for emergencies outside regular hours",
            "Control images during root canal treatment",
            "A low radiation dose and a protective apron",
          ],
          steps: [
            { title: "Only when needed", text: "We take an X-ray when it will change the diagnosis or the treatment." },
            { title: "Protection", text: "We use a protective apron." },
            { title: "Explanation", text: "We show you the image and explain what we see." },
          ],
          faq: [
            {
              q: "How much radiation will I receive?",
              a: "The dose from a single intraoral dental X-ray is very small, comparable to the natural background radiation we're exposed to in about a day.",
            },
          ],
        },
      },
    },
    {
      id: "exam",
      art: "exam",
      text: {
        bg: {
          slug: "dentalen-pregled-i-konsultatsiya",
          title: "Дентален преглед и консултация",
          metaTitle: "Дентален преглед и консултация в Пловдив",
          metaDescription:
            "Подробен преглед на зъбите и венците, снимка при нужда и ясен план за лечение с цени. Профилактичен преглед и по НЗОК. T&Co Dental, Пловдив.",
          excerpt: "Подробен преглед, ясно обяснение и план за лечение с цени, без изненади.",
          intro: [
            "Прегледът е основата на всяко лечение. Проверяваме всички зъби, пломбите, венците, захапката и меките тъкани в устата, а при нужда правим снимка на място.",
            "След прегледа получавате ясен план: какво е спешно, какво може да почака, какви са възможностите и колко ще струват. Решенията взимаме заедно с вас.",
          ],
          signsTitle: "Кога да дойдете",
          signs: [
            "На всеки 6 месеца за профилактичен преглед",
            "Ако не сте ходили на зъболекар повече от година",
            "При кървене на венците или лош дъх",
            "Преди бременност или планирана операция",
            "За второ мнение за предложено лечение",
          ],
          steps: [
            { title: "Разговор", text: "Вашите оплаквания, въпроси и медицинска история." },
            { title: "Преглед", text: "Зъби, венци, захапка, лигавица." },
            { title: "Снимка при нужда", text: "На място, в рамките на прегледа." },
            { title: "План и цени", text: "Ясен план с приоритети и ориентировъчни цени." },
          ],
          faq: [
            {
              q: "Работите ли по НЗОК?",
              a: "Да, в работно време работим с НЗОК. Здравноосигурените пациенти имат право на профилактичен преглед веднъж годишно, кажете ни при записване.",
            },
          ],
        },
        en: {
          slug: "dental-exam-and-consultation",
          title: "Dental Examination & Consultation",
          metaTitle: "Dental Check-up & Consultation in Plovdiv",
          metaDescription:
            "A thorough check of your teeth and gums, an X-ray if needed and a clear treatment plan with prices. NHIF check-ups available. T&Co Dental.",
          excerpt: "A thorough examination, a clear explanation and a treatment plan with prices, no surprises.",
          intro: [
            "The examination is the foundation of all treatment. We check every tooth, your fillings, gums, bite and the soft tissues of the mouth, and take an X-ray on site if needed.",
            "Afterwards you get a clear plan: what's urgent, what can wait, what the options are and what they cost. We make the decisions together with you.",
          ],
          signsTitle: "When to come in",
          signs: [
            "Every 6 months for a routine check-up",
            "If it's been more than a year since your last visit",
            "If your gums bleed or you have bad breath",
            "Before pregnancy or planned surgery",
            "For a second opinion on proposed treatment",
          ],
          steps: [
            { title: "Conversation", text: "Your concerns, questions and medical history." },
            { title: "Examination", text: "Teeth, gums, bite and soft tissues." },
            { title: "X-ray if needed", text: "On site, as part of the examination." },
            { title: "Plan & prices", text: "A clear plan with priorities and estimated prices." },
          ],
          faq: [
            {
              q: "Do you accept NHIF (НЗОК)?",
              a: "Yes, during regular hours we work with the National Health Insurance Fund. Insured patients are entitled to one preventive check-up per year; just mention it when booking.",
            },
          ],
        },
      },
    },
  ],
};
