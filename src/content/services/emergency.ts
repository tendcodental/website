import type { ServiceCategory } from "./types";

export const emergency: ServiceCategory = {
  id: "emergency",
  art: "emergency",
  thumbnail: "/images/services/emergency.jpg",
  urgent: true,
  selfListing: { bg: "Спешна стоматологична помощ", en: "Emergency dental care" },
  text: {
    bg: {
      slug: "speshna-stomatologichna-pomosht",
      title: "Спешна стоматологична помощ",
      metaTitle: "Спешна стоматологична помощ 24/7 в Пловдив",
      metaDescription:
        "Силна болка, подуване или счупен зъб? T&Co Dental е спешен денонощен зъболекарски кабинет в Пловдив. Обадете се по всяко време и дежурен лекар ще ви приеме.",
      excerpt:
        "Денонощна помощ при силна болка, подуване, травма или счупен зъб, включително през нощта, в почивните дни и по празниците.",
      intro: [
        "Зъбната болка рядко идва в удобен момент. Затова T&Co Dental работи като спешен денонощен зъболекарски кабинет 24/7: обадете се на спешния номер и дежурният лекар ще ви каже какво да направите веднага и кога да дойдете. При нужда идваме в кабинета и през нощта.",
        "Разполагаме с рентген, така че можем да направим зъбна снимка на място и да поставим точна диагноза още при първото посещение. Целта на спешното посещение е да спрем болката и инфекцията и да запазим зъба, когато това е възможно.",
      ],
      signsTitle: "Кога да се обадите веднага",
      signs: [
        "Силен, пулсиращ зъбобол, който не минава с обезболяващо",
        "Подуване на бузата, венеца или лицето, температура",
        "Счупен, отчупен или избит зъб след удар",
        "Кървене, което не спира след вадене на зъб",
        "Паднала коронка или пломба с остра болка",
        "Заседнало чуждо тяло във венеца",
      ],
      steps: [
        {
          title: "Обадете се",
          text: "Опишете накратко какво се случва. Ще ви посъветваме какво да направите в първите минути и ще уговорим кога да дойдете.",
        },
        {
          title: "Диагноза на място",
          text: "Преглед и при нужда зъбна снимка в кабинета, за да открием причината за болката.",
        },
        {
          title: "Облекчаване на болката",
          text: "Обезболяване, дренаж на инфекция, временно възстановяване или вадене, според случая.",
        },
        {
          title: "План за довършване",
          text: "Ако е нужно допълнително лечение, го планираме спокойно, в удобен за вас час.",
        },
      ],
      notesTitle: "Важно",
      notes: [
        "Ако подуването се разпространява към окото или шията или ви е трудно да преглъщате или дишате, обадете се незабавно на 112.",
      ],
      faq: [
        {
          q: "Трябва ли да си запазя час за спешен случай?",
          a: "Не. При спешен случай не е нужно да търсите свободен час онлайн, просто се обадете на спешния номер по всяко време на денонощието.",
        },
        {
          q: "Какво да направя, ако ми е избит зъб?",
          a: "Хванете зъба за короната, не за корена. Ако можете, внимателно го върнете в гнездото и захапете чиста марля. Ако не, сложете го в чаша мляко или физиологичен разтвор и се обадете веднага: времето е решаващо. Млечни зъби не се връщат обратно.",
        },
        {
          q: "Мога ли да взема обезболяващо, докато чакам?",
          a: "Обикновено да, приемете обичайното обезболяващо, което понасяте, според листовката. Не поставяйте таблетки директно върху венеца и не затопляйте бузата; при подуване е по-добре студен компрес отвън.",
        },
      ],
    },
    en: {
      slug: "emergency-dental-care",
      title: "Emergency Dental Care",
      metaTitle: "24/7 Emergency Dentist in Plovdiv",
      metaDescription:
        "Severe toothache, swelling or a broken tooth? T&Co Dental is a 24/7 emergency dental clinic in Plovdiv. Call any time and the dentist on duty will see you.",
      excerpt:
        "Round-the-clock help for severe pain, swelling, injuries or a broken tooth, including nights, weekends and public holidays.",
      intro: [
        "Toothache rarely strikes at a convenient time. That's why T&Co Dental operates as a 24/7 emergency dental clinic: call the emergency number and the dentist on duty will tell you what to do right away and when to come in, at night too, if needed.",
        "We have an X-ray unit in the clinic, so we can take a dental X-ray on the spot and make an accurate diagnosis during the first visit. The goal of an emergency visit is to stop the pain and the infection, and to save the tooth whenever possible.",
      ],
      signsTitle: "Call us straight away if you have",
      signs: [
        "Severe, throbbing toothache that painkillers don't relieve",
        "Swelling of the cheek, gum or face, or a fever",
        "A broken, chipped or knocked-out tooth after an impact",
        "Bleeding that won't stop after a tooth extraction",
        "A lost crown or filling with sharp pain",
        "Something stuck in your gum",
      ],
      steps: [
        {
          title: "Call us",
          text: "Briefly describe what's happening. We'll advise you on the first few minutes and agree when you should come in.",
        },
        {
          title: "On-site diagnosis",
          text: "An examination and, if needed, a dental X-ray in the clinic to find the cause of the pain.",
        },
        {
          title: "Pain relief",
          text: "Anaesthesia, draining an infection, a temporary repair or an extraction, depending on the case.",
        },
        {
          title: "A plan to finish",
          text: "If further treatment is needed, we schedule it calmly at a time that suits you.",
        },
      ],
      notesTitle: "Important",
      notes: [
        "If swelling spreads towards the eye or neck, or you have difficulty swallowing or breathing, call 112 immediately.",
      ],
      faq: [
        {
          q: "Do I need an appointment for an emergency?",
          a: "No. In an emergency there's no need to look for a free slot online, just call the emergency number at any time of the day or night.",
        },
        {
          q: "What should I do if a tooth has been knocked out?",
          a: "Hold the tooth by the crown, not the root. If you can, gently put it back in its socket and bite on clean gauze. If not, place it in a glass of milk or saline and call us immediately: time is critical. Baby teeth should not be put back.",
        },
        {
          q: "Can I take a painkiller while I wait?",
          a: "Usually yes, take your usual painkiller according to the leaflet. Don't put tablets directly on the gum and don't warm the cheek; for swelling, a cold compress on the outside is better.",
        },
      ],
    },
  },
  children: [
    {
      id: "pulpitis",
      art: "pulp",
      thumbnail: "/images/services/pulpitis.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "lechenie-na-pulpit-i-periodontit",
          title: "Лечение на пулпит и периодонтит",
          metaTitle: "Лечение на пулпит и периодонтит в Пловдив",
          metaDescription:
            "Пулсираща болка, която се засилва нощем или от топло? Лекуваме пулпит и периодонтит с кофердам и зъбна снимка на място, и спешно, денонощно.",
          excerpt:
            "Когато нервът на зъба е възпален или инфекцията е достигнала корена, спираме болката и лекуваме причината.",
          intro: [
            "Пулпитът е възпаление на пулпата, меката тъкан с нерви и кръвоносни съдове във вътрешността на зъба. Най-често е следствие от дълбок кариес, пукнатина или стара, неплътна пломба. Проявява се с остра, често пулсираща болка, която се засилва от топло, студено или вечер.",
            "Ако възпалението не бъде лекувано, инфекцията преминава през върха на корена към костта: това е периодонтит. Тогава зъбът боли при захапване, може да се появи подуване, а понякога и абсцес.",
          ],
          signs: [
            "Спонтанна, пулсираща болка, която ви буди нощем",
            "Болка от топло или студено, която продължава дълго след дразнителя",
            "Болка при захапване или усещане, че зъбът е „по-висок“",
            "Подуване на венеца или лицето около болния зъб",
          ],
          steps: [
            {
              title: "Точна диагноза",
              text: "Преглед, тестове и секторна зъбна снимка на място, за да видим състоянието на нерва и костта около корена.",
            },
            {
              title: "Спешно облекчаване",
              text: "Под локална анестезия отваряме зъба и почистваме възпалената тъкан и болката обикновено отшумява още след първото посещение.",
            },
            {
              title: "Кореново лечение",
              text: "Каналите се почистват, дезинфекцират и запълват херметично, като зъбът е изолиран с кофердам.",
            },
            {
              title: "Възстановяване",
              text: "Зъбът се възстановява с обтурация или коронка, за да служи дълги години.",
            },
          ],
          faq: [
            {
              q: "Може ли пулпитът да мине от само себе си?",
              a: "Болката понякога временно затихва, но това често означава, че нервът загива, а не че проблемът е решен. Инфекцията продължава и може да доведе до абсцес, затова зъбът трябва да бъде лекуван.",
            },
            {
              q: "Трябва ли зъбът да се вади?",
              a: "В повечето случаи, не. Целта на лечението е да запазим собствения ви зъб. Изваждане препоръчваме само когато зъбът не може да бъде възстановен.",
            },
          ],
        },
        en: {
          slug: "pulpitis-and-periodontitis-treatment",
          title: "Pulpitis & Periodontitis Treatment",
          metaTitle: "Pulpitis & Periodontitis Treatment in Plovdiv",
          metaDescription:
            "Throbbing pain that gets worse at night or with heat? We treat pulpitis and periodontitis with a rubber dam and on-site X-rays, urgently, 24/7.",
          excerpt:
            "When the tooth's nerve is inflamed or the infection has reached the root, we stop the pain and treat the cause.",
          intro: [
            "Pulpitis is inflammation of the pulp, the soft tissue with nerves and blood vessels inside the tooth. It is most often caused by deep decay, a crack or an old, leaking filling, and shows up as sharp, often throbbing pain that gets worse with heat, cold or in the evening.",
            "Left untreated, the infection spreads through the tip of the root into the bone: this is periodontitis. The tooth then hurts when you bite, swelling may appear and sometimes an abscess forms.",
          ],
          signs: [
            "Spontaneous, throbbing pain that wakes you at night",
            "Pain from hot or cold that lingers long after the trigger",
            "Pain on biting, or a feeling that the tooth is 'too high'",
            "Swelling of the gum or face around the painful tooth",
          ],
          steps: [
            {
              title: "Accurate diagnosis",
              text: "An examination, tests and an on-site periapical X-ray to assess the nerve and the bone around the root.",
            },
            {
              title: "Urgent relief",
              text: "Under local anaesthesia we open the tooth and remove the inflamed tissue, the pain usually settles after the first visit.",
            },
            {
              title: "Root canal treatment",
              text: "The canals are cleaned, disinfected and sealed, with the tooth isolated by a rubber dam.",
            },
            {
              title: "Restoration",
              text: "The tooth is rebuilt with a filling or a crown so it can serve you for many years.",
            },
          ],
          faq: [
            {
              q: "Can pulpitis go away on its own?",
              a: "The pain sometimes eases for a while, but that often means the nerve is dying, not that the problem is solved. The infection continues and can lead to an abscess, so the tooth needs treatment.",
            },
            {
              q: "Does the tooth need to be removed?",
              a: "In most cases, no. The aim of treatment is to keep your own tooth. We only recommend extraction when the tooth can't be restored.",
            },
          ],
        },
      },
    },
    {
      id: "abscess",
      art: "abscess",
      thumbnail: "/images/services/abscess.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "lechenie-na-abstsesi-i-gnoyni-infektsii",
          title: "Лечение на абсцеси и гнойни инфекции",
          metaTitle: "Лечение на зъбен абсцес и гнойни инфекции",
          metaDescription:
            "Подуване, гной, температура или силна болка? Зъбният абсцес изисква бърза помощ. В T&Co Dental в Пловдив ви приемаме спешно, денонощно.",
          excerpt:
            "Подуване, гной и силна болка са сигнал за инфекция, която не бива да чака. Дренираме, почистваме и лекуваме причината.",
          intro: [
            "Зъбният абсцес е натрупване на гной, причинено от бактериална инфекция, най-често от нелекуван кариес, загинал нерв или дълбок пародонтален джоб. Проявява се с подуване и силна болка, а понякога и с температура и неприятен вкус в устата.",
            "Абсцесът не изчезва от само себе си. Антибиотикът може временно да ограничи инфекцията, но без лечение на причината тя се връща. Затова при нас лечението започва с отстраняване на източника, на място и възможно най-бързо.",
          ],
          signs: [
            "Подуване на венеца, бузата или под челюстта",
            "Мехурче (фистула) на венеца, от което изтича гной",
            "Силна, пулсираща болка и болка при допир",
            "Температура, отпадналост, увеличени лимфни възли",
          ],
          steps: [
            {
              title: "Оценка на инфекцията",
              text: "Преглед и зъбна снимка, за да определим източника и разпространението на инфекцията.",
            },
            {
              title: "Дренаж",
              text: "Под анестезия създаваме път за изтичане на гнойта, което бързо намалява налягането и болката.",
            },
            {
              title: "Лечение на причината",
              text: "Кореново лечение, почистване на пародонтален джоб или изваждане на зъба, според случая.",
            },
            {
              title: "Проследяване",
              text: "При нужда назначаваме медикаменти и контролен преглед, докато инфекцията отшуми напълно.",
            },
          ],
          notesTitle: "Важно",
          notes: [
            "Ако подуването бързо се разраства или ви е трудно да преглъщате или дишате, обадете се незабавно на 112.",
          ],
          faq: [
            {
              q: "Мога ли просто да пия антибиотик?",
              a: "Антибиотикът не лекува източника на инфекцията. Той се назначава от лекар в определени случаи, но без стоматологично лечение абсцесът най-често се връща.",
            },
            {
              q: "Опасен ли е зъбният абсцес?",
              a: "Да, ако бъде пренебрегнат, инфекцията може да се разпространи към съседните тъкани. Затова потърсете помощ веднага щом забележите подуване.",
            },
          ],
        },
        en: {
          slug: "abscess-and-infection-treatment",
          title: "Dental Abscess & Infection Treatment",
          metaTitle: "Dental Abscess Treatment in Plovdiv",
          metaDescription:
            "Swelling, pus, fever or severe pain? A dental abscess needs prompt care. At T&Co Dental in Plovdiv we see you urgently, day and night.",
          excerpt:
            "Swelling, pus and severe pain signal an infection that shouldn't wait. We drain it, clean it and treat the cause.",
          intro: [
            "A dental abscess is a collection of pus caused by a bacterial infection, usually from untreated decay, a dead nerve or a deep gum pocket. It shows up as swelling and severe pain, sometimes with a fever and a bad taste in the mouth.",
            "An abscess doesn't go away on its own. Antibiotics may hold the infection back for a while, but without treating the cause it comes back. That's why our treatment starts by removing the source, on site and as quickly as possible.",
          ],
          signs: [
            "Swelling of the gum, cheek or under the jaw",
            "A small bump (fistula) on the gum that leaks pus",
            "Severe, throbbing pain and tenderness to touch",
            "Fever, fatigue, swollen lymph nodes",
          ],
          steps: [
            {
              title: "Assessing the infection",
              text: "An examination and dental X-ray to find the source and how far the infection has spread.",
            },
            {
              title: "Drainage",
              text: "Under anaesthesia we let the pus drain, which quickly relieves the pressure and the pain.",
            },
            {
              title: "Treating the cause",
              text: "Root canal treatment, cleaning a gum pocket or removing the tooth, depending on the case.",
            },
            {
              title: "Follow-up",
              text: "If needed, we prescribe medication and schedule a check-up until the infection has fully cleared.",
            },
          ],
          notesTitle: "Important",
          notes: [
            "If the swelling grows quickly or you have difficulty swallowing or breathing, call 112 immediately.",
          ],
          faq: [
            {
              q: "Can I just take antibiotics?",
              a: "Antibiotics don't treat the source of the infection. A doctor prescribes them in certain cases, but without dental treatment the abscess usually returns.",
            },
            {
              q: "Is a dental abscess dangerous?",
              a: "Yes, if ignored, the infection can spread to nearby tissues. Seek help as soon as you notice swelling.",
            },
          ],
        },
      },
    },
    {
      id: "broken-tooth",
      art: "broken",
      thumbnail: "/images/services/broken-tooth.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "speshno-vazstanovyavane-na-schupen-zab",
          title: "Спешно възстановяване на счупен зъб",
          metaTitle: "Спешно възстановяване на счупен зъб в Пловдив",
          metaDescription:
            "Отчупен или счупен зъб след удар или захапване? Възстановяваме го спешно, с обтурация в цвета на зъба, а при нужда с временна коронка. 24/7.",
          excerpt:
            "Отчупен ъгъл, счупен преден зъб или пукнатина, възстановяваме формата и защитаваме нерва, често още същия ден.",
          intro: [
            "Зъбите се чупят при удар, падане, спорт или просто при захапване на нещо твърдо. Понякога се отчупва само малко парче емайл, друг път счупването достига до нерва и зъбът става силно чувствителен.",
            "Колкото по-рано дойдете, толкова по-добри са шансовете да запазим нерва и да възстановим зъба с естествен вид. Ако намерите отчупеното парче, запазете го във вода или мляко и го донесете.",
          ],
          signs: [
            "Отчупено парче от зъба или остър ръб, който наранява езика",
            "Болка или чувствителност при хранене и пиене",
            "Видима пукнатина или зъб, който се движи",
            "Травма на устата след удар или падане",
          ],
          steps: [
            {
              title: "Оценка и снимка",
              text: "Проверяваме колко дълбоко е счупването и дали са засегнати коренът или нервът.",
            },
            {
              title: "Защита на нерва",
              text: "Ако пулпата е оголена, я покриваме с лечебна подложка, за да намалим болката и риска от инфекция.",
            },
            {
              title: "Възстановяване",
              text: "Изграждаме зъба с материал в цвета на зъбите, а при голяма загуба на тъкан с временна, а по-късно и с постоянна коронка.",
            },
          ],
          faq: [
            {
              q: "Какво да направя с отчупеното парче?",
              a: "Запазете го във вода или мляко и го донесете. В някои случаи може да бъде залепено обратно.",
            },
            {
              q: "Ще се вижда ли възстановяването?",
              a: "Използваме материали в цвета на естествените зъби, така че при правилно изграждане възстановяването е почти незабележимо.",
            },
          ],
        },
        en: {
          slug: "emergency-broken-tooth-repair",
          title: "Emergency Broken Tooth Repair",
          metaTitle: "Emergency Broken Tooth Repair in Plovdiv",
          metaDescription:
            "Chipped or broken tooth after a fall or biting something hard? We repair it urgently with a tooth-coloured filling or a temporary crown. 24/7.",
          excerpt:
            "A chipped corner, a broken front tooth or a crack: we restore the shape and protect the nerve, often the same day.",
          intro: [
            "Teeth break from knocks, falls, sport or simply biting on something hard. Sometimes only a small piece of enamel chips off; other times the fracture reaches the nerve and the tooth becomes very sensitive.",
            "The sooner you come in, the better the chance of saving the nerve and restoring a natural look. If you find the broken piece, keep it in water or milk and bring it with you.",
          ],
          signs: [
            "A chipped piece or a sharp edge that cuts your tongue",
            "Pain or sensitivity when eating or drinking",
            "A visible crack or a tooth that moves",
            "An injury to the mouth after a knock or fall",
          ],
          steps: [
            {
              title: "Assessment & X-ray",
              text: "We check how deep the fracture goes and whether the root or nerve is affected.",
            },
            {
              title: "Protecting the nerve",
              text: "If the pulp is exposed, we cover it with a medicated lining to reduce pain and the risk of infection.",
            },
            {
              title: "Restoration",
              text: "We rebuild the tooth with tooth-coloured material, or, if a lot of tooth is lost, with a temporary and later a permanent crown.",
            },
          ],
          faq: [
            {
              q: "What should I do with the broken piece?",
              a: "Keep it in water or milk and bring it along. In some cases it can be bonded back on.",
            },
            {
              q: "Will the repair be visible?",
              a: "We use materials that match your natural teeth, so a well-built restoration is barely noticeable.",
            },
          ],
        },
      },
    },
    {
      id: "emergency-extraction",
      art: "extraction-urgent",
      thumbnail: "/images/services/emergency-extraction.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "speshno-vadene-na-zab",
          title: "Спешно вадене на зъб",
          metaTitle: "Спешно вадене на зъб в Пловдив, денонощно",
          metaDescription:
            "Когато зъбът не може да бъде спасен и болката е силна, го изваждаме спешно и щадящо, под локална анестезия и с рентген на място. 24/7.",
          excerpt: "Когато зъбът не може да бъде запазен, го изваждаме спешно, щадящо и под локална анестезия.",
          intro: [
            "Винаги се стремим да запазим зъба. Понякога обаче той е толкова разрушен, счупен под венеца или инфектиран, че изваждането е най-доброто решение, особено когато болката е силна и не търпи отлагане.",
            "Преди процедурата правим зъбна снимка на място, за да видим формата на корените. Изваждането се извършва под локална анестезия, а след това получавате ясни указания за първите дни.",
          ],
          signs: [
            "Силно разрушен или счупен под венеца зъб",
            "Зъб с тежка инфекция, който не може да бъде лекуван",
            "Силно разклатен зъб след травма или пародонтит",
            "Болезнен, частично пробил мъдрец",
          ],
          steps: [
            { title: "Преглед и снимка", text: "Преценяваме дали зъбът може да бъде спасен и как са разположени корените." },
            { title: "Анестезия", text: "Започваме едва когато зоната е напълно обезболена." },
            { title: "Щадящо изваждане", text: "Работим внимателно, за да запазим костта и меките тъкани около зъба." },
            { title: "Грижа след това", text: "Получавате указания за първите дни, а при нужда и контролен преглед." },
          ],
          notesTitle: "След изваждането",
          notes: [
            "Захапете марлята за 20-30 минути.",
            "Не се хранете, докато упойката не премине, и избягвайте горещи храни и напитки през първия ден.",
            "Не плюйте, не изплаквайте енергично и не пушете през първите 24 часа.",
            "При кървене, което не спира, се обадете, отговаряме денонощно.",
          ],
        },
        en: {
          slug: "emergency-tooth-extraction",
          title: "Emergency Tooth Extraction",
          metaTitle: "Emergency Tooth Extraction in Plovdiv, 24/7",
          metaDescription:
            "When a tooth can't be saved and the pain is severe, we remove it urgently and gently, under local anaesthesia and with on-site X-rays. 24/7.",
          excerpt: "When a tooth can't be saved, we remove it urgently, gently and under local anaesthesia.",
          intro: [
            "We always try to save the tooth. Sometimes, though, it is so decayed, broken below the gum or infected that removing it is the best option, especially when the pain is severe and can't wait.",
            "Before the procedure we take a dental X-ray on site to see the shape of the roots. The extraction is done under local anaesthesia, and afterwards you get clear instructions for the first few days.",
          ],
          signs: [
            "A badly decayed tooth or one broken below the gum",
            "A severely infected tooth that can't be treated",
            "A very loose tooth after injury or gum disease",
            "A painful, partly erupted wisdom tooth",
          ],
          steps: [
            { title: "Examination & X-ray", text: "We assess whether the tooth can be saved and how the roots are positioned." },
            { title: "Anaesthesia", text: "We only start once the area is completely numb." },
            { title: "Gentle extraction", text: "We work carefully to preserve the bone and soft tissue around the tooth." },
            { title: "Aftercare", text: "You get instructions for the first few days and, if needed, a follow-up visit." },
          ],
          notesTitle: "After the extraction",
          notes: [
            "Bite on the gauze for 20-30 minutes.",
            "Don't eat until the numbness wears off, and avoid hot food and drinks on the first day.",
            "Don't spit, rinse vigorously or smoke for the first 24 hours.",
            "If bleeding won't stop, call us. We answer day and night.",
          ],
        },
      },
    },
    {
      id: "foreign-body",
      art: "gums",
      thumbnail: "/images/services/foreign-body.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "otstranyavane-na-chuzhdi-tela-ot-ventsite",
          title: "Отстраняване на чужди тела от венците",
          metaTitle: "Отстраняване на чуждо тяло от венеца",
          metaDescription:
            "Люспа от семка, костица или парченце, заседнало във венеца? Отстраняваме го бързо и безопасно, преди да предизвика възпаление. Денонощно в Пловдив.",
          excerpt:
            "Люспа, костица или парченце храна, заседнало под венеца, може да предизвика болка и възпаление. Отстраняваме го бързо и щадящо.",
          intro: [
            "Люспи от семки или пуканки, рибни костици, парченца от клечка за зъби, малки предмети често се заклинват между зъба и венеца. Те причиняват натиск и болка, а ако останат по-дълго, и възпаление или абсцес.",
            "Опитите да ги извадите сами с игла или остър предмет често нараняват венеца и избутват тялото още по-навътре. Със специални инструменти и добра видимост ние го отстраняваме за минути.",
          ],
          signs: [
            "Усещане, че нещо е заседнало между зъбите или под венеца",
            "Болка и подуване на венеца на едно място",
            "Кървене при миене или при почистване с конец в тази зона",
            "Неприятен вкус или гной около зъба",
          ],
          steps: [
            { title: "Оглед", text: "Откриваме точното място и преценяваме дали вече има възпаление." },
            { title: "Отстраняване", text: "При нужда с локална анестезия внимателно изваждаме чуждото тяло." },
            { title: "Почистване", text: "Промиваме зоната и ви казваме как да се грижите за венеца у дома." },
          ],
          faq: [
            {
              q: "Опасно ли е да изчакам?",
              a: "Ако тялото остане под венеца няколко дни, рискът от възпаление и абсцес расте. По-добре елате веднага щом конецът за зъби не помага.",
            },
          ],
        },
        en: {
          slug: "foreign-object-removal-from-gums",
          title: "Removing Foreign Objects from the Gums",
          metaTitle: "Foreign Object Stuck in the Gum? Help in Plovdiv",
          metaDescription:
            "A seed husk, fish bone or splinter stuck in your gum? We remove it quickly and safely before it causes inflammation. Day and night in Plovdiv.",
          excerpt:
            "A husk, bone or bit of food stuck under the gum can cause pain and inflammation. We remove it quickly and gently.",
          intro: [
            "Sunflower seed or popcorn husks, fish bones, bits of toothpick, small objects often get wedged between the tooth and the gum. They cause pressure and pain, and if left for longer, inflammation or even an abscess.",
            "Trying to dig them out with a needle or a sharp object often injures the gum and pushes the object deeper. With proper instruments and good visibility we remove it in minutes.",
          ],
          signs: [
            "A feeling that something is stuck between your teeth or under the gum",
            "Pain and swelling of the gum in one spot",
            "Bleeding when brushing or flossing that area",
            "A bad taste or pus around the tooth",
          ],
          steps: [
            { title: "Inspection", text: "We find the exact spot and check whether inflammation has started." },
            { title: "Removal", text: "If needed under local anaesthesia, we carefully remove the object." },
            { title: "Cleaning", text: "We rinse the area and explain how to care for the gum at home." },
          ],
          faq: [
            {
              q: "Is it risky to wait?",
              a: "If the object stays under the gum for several days, the risk of inflammation and an abscess grows. Come in as soon as flossing doesn't help.",
            },
          ],
        },
      },
    },
  ],
};
