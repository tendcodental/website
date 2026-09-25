import type { ServiceCategory } from "./types";

export const endodontics: ServiceCategory = {
  id: "endodontics",
  art: "endo",
  text: {
    bg: {
      slug: "endodontsko-i-terapevtichno-lechenie",
      title: "Ендодонтско и терапевтично лечение",
      navTitle: "Ендодонтия и терапия",
      metaTitle: "Лечение на зъби, пломби и кореново лечение в Пловдив",
      metaDescription:
        "Лечение на кариес и зъбобол, пломби в цвета на зъбите и кореново лечение с кофердам и рентген на място. Работим и с НЗОК. T&Co Dental, Пловдив.",
      excerpt:
        "Лечение на кариес и зъбобол, естествено изглеждащи пломби и прецизно кореново лечение с кофердам.",
      intro: [
        "Терапевтичната стоматология лекува кариеса и последствията от него, от малка кухина до дълбоко увреждане, достигнало нерва. Ендодонтията е частта от нея, която лекува вътрешността на зъба: пулпата и кореновите канали.",
        "При лечение изолираме зъба с кофердам, тънка гумена преграда, която държи зъба сух и чист, предпазва от слюнка и бактерии и не позволява инструменти или разтвори да попаднат в устата. Това е утвърден стандарт за качествено лечение и при нас е правило, а не изключение.",
      ],
      steps: [
        { title: "Диагноза", text: "Преглед и зъбна снимка на място." },
        { title: "Изолация с кофердам", text: "Чисто и сухо работно поле за по-трайно лечение." },
        { title: "Лечение", text: "Почистване на кариеса, лечение на каналите или изграждане на зъба." },
        { title: "Контрол", text: "Проверяваме захапката и ви казваме как да поддържате резултата." },
      ],
      faq: [
        {
          q: "Какво е кофердам и боли ли?",
          a: "Кофердамът е тънка еластична мембрана, която се поставя около зъба. Не боли, повечето пациенти го намират за по-комфортен, защото в устата не попада вода и слюнката не пречи.",
        },
        {
          q: "Лекувате ли по НЗОК?",
          a: "В работно време работим с НЗОК. При записване ни кажете, че желаете посещение по НЗОК, и ще ви обясним кои дейности се покриват във вашия случай.",
        },
      ],
    },
    en: {
      slug: "endodontic-and-restorative-treatment",
      title: "Endodontic & Restorative Treatment",
      navTitle: "Endodontics & Fillings",
      metaTitle: "Fillings & Root Canal Treatment in Plovdiv",
      metaDescription:
        "Treatment of decay and toothache, tooth-coloured fillings and root canal treatment with a rubber dam and on-site X-rays. NHIF accepted. T&Co Dental.",
      excerpt:
        "Treating decay and toothache, natural-looking fillings and precise root canal treatment under rubber dam isolation.",
      intro: [
        "Restorative dentistry treats tooth decay and its consequences, from a small cavity to deep damage that has reached the nerve. Endodontics is the part that treats the inside of the tooth: the pulp and root canals.",
        "During treatment we isolate the tooth with a rubber dam, a thin sheet that keeps the tooth dry and clean, protects it from saliva and bacteria, and stops instruments or solutions from getting into the mouth. It's an established standard of quality care, and with us it's the rule, not the exception.",
      ],
      steps: [
        { title: "Diagnosis", text: "An examination and on-site dental X-ray." },
        { title: "Rubber dam isolation", text: "A clean, dry working field for longer-lasting results." },
        { title: "Treatment", text: "Removing decay, treating the canals or rebuilding the tooth." },
        { title: "Check", text: "We check your bite and explain how to keep the result." },
      ],
      faq: [
        {
          q: "What is a rubber dam, and does it hurt?",
          a: "A rubber dam is a thin elastic sheet placed around the tooth. It doesn't hurt, most patients find it more comfortable, because no water gets into the mouth and saliva isn't in the way.",
        },
        {
          q: "Do you accept NHIF (НЗОК)?",
          a: "During regular hours we work with the National Health Insurance Fund. Tell us when booking and we'll explain which treatments are covered in your case.",
        },
      ],
    },
  },
  children: [
    {
      id: "toothache",
      art: "toothache",
      urgent: true,
      text: {
        bg: {
          slug: "lechenie-na-zabobol",
          title: "Лечение на зъбобол",
          metaTitle: "Лечение на зъбобол в Пловдив, спешно 24/7",
          metaDescription:
            "Зъбобол от топло и студено, при захапване или нощем? Откриваме причината със снимка на място и спираме болката. Спешни случаи, денонощно.",
          excerpt: "Откриваме истинската причина за болката и я лекуваме, не само я заглушаваме.",
          intro: [
            "Зъбоболът е симптом, а не диагноза. Зад него може да стои кариес, пукнатина, възпален нерв, инфекция в корена, оголени шийки, проблем с венците или дори синузит. Затова лечението винаги започва с откриване на причината.",
            "Правим преглед и при нужда зъбна снимка още при първото посещение. Ако болката е силна, първо я овладяваме, а след това планираме окончателното лечение.",
          ],
          signsTitle: "Какво може да означава болката",
          signs: [
            "Кратка болка от студено или сладко: често кариес или оголени шийки",
            "Продължителна болка от топло и нощна болка: често възпален нерв",
            "Болка при захапване: възможна пукнатина или инфекция в корена",
            "Болка в няколко горни зъба при навеждане: понякога причината е синузит",
          ],
          steps: [
            {
              title: "Разговор и преглед",
              text: "Кога започна болката, какво я провокира и колко продължава: всичко това ни насочва.",
            },
            { title: "Тестове и снимка", text: "Проверяваме реакцията на зъба и правим снимка на място." },
            { title: "Облекчаване", text: "Когато е възможно, овладяваме болката още при първото посещение." },
            {
              title: "Окончателно лечение",
              text: "Обтурация, кореново лечение или друга процедура, според диагнозата.",
            },
          ],
          faq: [
            {
              q: "Какво да направя, докато чакам прегледа?",
              a: "Можете да приемете обичайното обезболяващо, което понасяте, според листовката. Избягвайте много топли и много студени храни и не дъвчете от болната страна. Ако болката е силна, обадете се на спешния номер.",
            },
          ],
        },
        en: {
          slug: "toothache-treatment",
          title: "Toothache Treatment",
          metaTitle: "Toothache Treatment in Plovdiv, Urgent Care 24/7",
          metaDescription:
            "Toothache from hot or cold, when biting or at night? We find the cause with an on-site X-ray and stop the pain. Emergencies seen day and night.",
          excerpt: "We find the real cause of the pain and treat it, not just mask it.",
          intro: [
            "Toothache is a symptom, not a diagnosis. Behind it there may be decay, a crack, an inflamed nerve, an infection at the root, exposed tooth necks, a gum problem or even sinusitis. That's why treatment always begins with finding the cause.",
            "We examine you and, if needed, take an X-ray at the very first visit. If the pain is severe, we relieve it first and then plan the definitive treatment.",
          ],
          signsTitle: "What the pain may mean",
          signs: [
            "Brief pain from cold or sweets: often decay or exposed tooth necks",
            "Lingering pain from heat and pain at night: often an inflamed nerve",
            "Pain when biting: possibly a crack or an infection at the root",
            "Pain in several upper teeth when bending over: sometimes sinusitis",
          ],
          steps: [
            {
              title: "Conversation & examination",
              text: "When the pain started, what triggers it and how long it lasts all point us in the right direction.",
            },
            { title: "Tests & X-ray", text: "We check how the tooth responds and take an X-ray on site." },
            { title: "Relief", text: "Whenever possible, we relieve the pain at the first visit." },
            { title: "Definitive treatment", text: "A filling, root canal treatment or another procedure, depending on the diagnosis." },
          ],
          faq: [
            {
              q: "What can I do while I wait for my appointment?",
              a: "You can take your usual painkiller according to the leaflet. Avoid very hot and very cold foods and don't chew on the painful side. If the pain is severe, call the emergency number.",
            },
          ],
        },
      },
    },
    {
      id: "fillings",
      art: "filling",
      text: {
        bg: {
          slug: "obturirane-plombirane-na-zabi",
          title: "Обтуриране (пломбиране) на зъби",
          navTitle: "Обтурации (пломби)",
          metaTitle: "Пломби (обтурации) в цвета на зъбите в Пловдив",
          metaDescription:
            "Лечение на кариес с естествено изглеждащи пломби, поставени с кофердам за по-дълъг живот. Работим и с НЗОК. T&Co Dental, Пловдив.",
          excerpt: "Лечение на кариес с пломби в цвета на зъбите, поставени в сухо и чисто поле с кофердам.",
          intro: [
            "Обтурацията (пломбата) възстановява зъба след отстраняване на кариеса. Съвременните композитни материали се свързват със зъбната тъкан и се подбират в нюанса на естествените зъби, така че пломбата да е здрава и почти незабележима.",
            "Трайността на пломбата зависи до голяма степен от това дали зъбът е бил сух по време на работа. Затова поставяме обтурациите с кофердам, така материалът се свързва най-добре със зъба.",
          ],
          signs: [
            "Тъмно петно или дупка в зъба",
            "Храна, която засяда на едно и също място",
            "Кратка болка от студено, сладко или кисело",
            "Стара, потъмняла или счупена пломба",
          ],
          steps: [
            { title: "Обезболяване", text: "Локална анестезия, когато е необходимо." },
            { title: "Почистване на кариеса", text: "Отстраняваме само засегнатата тъкан и запазваме здравата." },
            { title: "Изолация с кофердам", text: "Сухо поле за възможно най-добра връзка на материала." },
            { title: "Изграждане и полиране", text: "Моделираме зъба, проверяваме захапката и полираме." },
          ],
          faq: [
            {
              q: "Колко издържа една пломба?",
              a: "При добра хигиена и редовни прегледи съвременните пломби служат много години. Важно е да не пропускате контролните прегледи, за да открием навреме нов кариес около тях.",
            },
            {
              q: "Мога ли да се храня веднага след пломба?",
              a: "Композитната пломба се втвърдява още в кабинета. Изчакайте само упойката да премине, за да не нараните бузата или езика си.",
            },
          ],
        },
        en: {
          slug: "dental-fillings",
          title: "Dental Fillings",
          metaTitle: "Tooth-Coloured Fillings in Plovdiv",
          metaDescription:
            "Treating decay with natural-looking fillings placed under rubber dam isolation for a longer life. NHIF accepted. T&Co Dental, Plovdiv.",
          excerpt: "Treating decay with tooth-coloured fillings, placed in a clean, dry field under a rubber dam.",
          intro: [
            "A filling restores the tooth after the decay has been removed. Modern composite materials bond to the tooth and are matched to the shade of your natural teeth, so the filling is strong and barely noticeable.",
            "How long a filling lasts depends largely on whether the tooth was kept dry during the work. That's why we place fillings under a rubber dam: it gives the material the best possible bond.",
          ],
          signs: [
            "A dark spot or a hole in the tooth",
            "Food getting stuck in the same place",
            "Brief pain from cold, sweet or sour",
            "An old, discoloured or broken filling",
          ],
          steps: [
            { title: "Numbing", text: "Local anaesthesia when needed." },
            { title: "Removing decay", text: "We remove only the affected tissue and preserve the healthy tooth." },
            { title: "Rubber dam isolation", text: "A dry field for the best possible bond." },
            { title: "Shaping & polishing", text: "We shape the tooth, check your bite and polish." },
          ],
          faq: [
            {
              q: "How long does a filling last?",
              a: "With good hygiene and regular check-ups, modern fillings last many years. Don't skip check-ups, so we can catch any new decay around them early.",
            },
            {
              q: "Can I eat right after a filling?",
              a: "Composite fillings are fully hardened in the clinic. Just wait for the numbness to wear off so you don't bite your cheek or tongue.",
            },
          ],
        },
      },
    },
    {
      id: "root-canal",
      art: "root-canal",
      text: {
        bg: {
          slug: "endodontsko-lechenie",
          title: "Ендодонтско лечение (кореново лечение)",
          navTitle: "Кореново лечение",
          metaTitle: "Кореново лечение с кофердам в Пловдив",
          metaDescription:
            "Ендодонтско (кореново) лечение с кофердам и контролни снимки на място, за да запазим зъба и да спрем инфекцията. T&Co Dental, Пловдив.",
          excerpt:
            "Кореновото лечение спасява зъба, когато нервът е възпален или инфектиран. Работим прецизно, с кофердам и контролни снимки.",
          intro: [
            "Когато кариесът или травмата достигнат нерва, пулпата се възпалява или загива и инфекцията може да премине към костта. Кореновото лечение отстранява засегнатата тъкан, почиства и дезинфекцира каналите и ги запълва херметично, така зъбът остава в устата ви.",
            "Успехът на лечението зависи най-вече от два фактора: колко добре са почистени каналите и дали в тях не попадат отново бактерии. Затова работим винаги с кофердам и правим снимки на място преди, по време и след лечението.",
          ],
          signs: [
            "Продължителна болка от топло или нощна болка",
            "Болка при захапване или почукване на зъба",
            "Потъмняване на зъба след травма",
            "Фистула или подуване на венеца",
          ],
          steps: [
            {
              title: "Снимка и диагноза",
              text: "Оценяваме броя и формата на каналите и състоянието на костта.",
            },
            { title: "Анестезия и кофердам", text: "Работим в чисто и сухо поле." },
            {
              title: "Почистване и дезинфекция",
              text: "Каналите се оформят и промиват с дезинфектиращи разтвори.",
            },
            {
              title: "Запълване и възстановяване",
              text: "Херметично запълване на каналите, контролна снимка и възстановяване на коронката на зъба.",
            },
          ],
          faq: [
            {
              q: "Колко посещения са нужни?",
              a: "Зависи от зъба и от степента на инфекцията. Често лечението приключва в едно до две посещения; при по-сложни случаи може да са нужни повече.",
            },
            {
              q: "Боли ли кореновото лечение?",
              a: "Лечението се провежда под локална анестезия. Всъщност то премахва болката, а не я причинява. След него е възможна лека чувствителност за няколко дни.",
            },
            {
              q: "Трябва ли коронка след кореново лечение?",
              a: "При кътниците и силно разрушените зъби често я препоръчваме, защото ги предпазва от счупване. Ще обсъдим това с вас след лечението.",
            },
          ],
        },
        en: {
          slug: "root-canal-treatment",
          title: "Root Canal Treatment",
          metaTitle: "Root Canal Treatment with Rubber Dam in Plovdiv",
          metaDescription:
            "Endodontic (root canal) treatment with rubber dam isolation and on-site control X-rays, to save the tooth and stop the infection. T&Co Dental.",
          excerpt:
            "Root canal treatment saves a tooth when the nerve is inflamed or infected. We work precisely, with a rubber dam and control X-rays.",
          intro: [
            "When decay or injury reaches the nerve, the pulp becomes inflamed or dies and the infection can spread to the bone. Root canal treatment removes the affected tissue, cleans and disinfects the canals and seals them, so the tooth stays in your mouth.",
            "Success depends mainly on two things: how thoroughly the canals are cleaned, and keeping bacteria from getting back in. That's why we always use a rubber dam and take X-rays on site before, during and after treatment.",
          ],
          signs: [
            "Lingering pain from heat, or pain at night",
            "Pain when biting or tapping the tooth",
            "A tooth that darkens after an injury",
            "A gum boil or swelling of the gum",
          ],
          steps: [
            { title: "X-ray & diagnosis", text: "We assess the number and shape of the canals and the state of the bone." },
            { title: "Anaesthesia & rubber dam", text: "We work in a clean, dry field." },
            { title: "Cleaning & disinfection", text: "The canals are shaped and rinsed with disinfecting solutions." },
            { title: "Sealing & restoring", text: "The canals are sealed, checked with an X-ray and the crown of the tooth is rebuilt." },
          ],
          faq: [
            {
              q: "How many visits does it take?",
              a: "It depends on the tooth and how severe the infection is. Treatment is often completed in one or two visits; complex cases may need more.",
            },
            {
              q: "Does root canal treatment hurt?",
              a: "It's done under local anaesthesia. In fact, it relieves pain rather than causing it. Mild sensitivity for a few days afterwards is possible.",
            },
            {
              q: "Do I need a crown afterwards?",
              a: "For molars and heavily damaged teeth we often recommend one, as it protects the tooth from breaking. We'll discuss it with you after treatment.",
            },
          ],
        },
      },
    },
  ],
};
