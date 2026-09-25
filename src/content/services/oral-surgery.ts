import type { ServiceCategory } from "./types";

export const oralSurgery: ServiceCategory = {
  id: "oral-surgery",
  art: "surgery",
  thumbnail: "/images/services/oral-surgery.jpg",
  text: {
    bg: {
      slug: "oralna-hirurgiya",
      title: "Орална хирургия",
      metaTitle: "Орална хирургия в Пловдив: вадене на зъби и мъдреци",
      metaDescription:
        "Изваждане на зъби и ретинирани мъдреци, млечни зъби и спешни хирургични интервенции, под локална анестезия и с рентген на място в T&Co Dental.",
      excerpt:
        "Щадящо изваждане на зъби и мъдреци, малки хирургични интервенции и спешни състояния, с внимание към всеки детайл.",
      intro: [
        "Оралната хирургия обхваща интервенциите в устната кухина, от обикновено изваждане на зъб до изваждане на ретиниран мъдрец. Всяка процедура при нас започва с преглед и зъбна снимка на място, за да знаем точно с какво работим.",
        "Работим под локална анестезия, щадящо към костта и меките тъкани, и ви даваме ясни указания за възстановяването. При по-сложни случаи, които изискват болнични условия, ви насочваме към подходящ специалист.",
      ],
      steps: [
        { title: "Консултация и снимка", text: "Преглед и рентгенова снимка на място, за да планираме интервенцията." },
        { title: "Ясен план", text: "Обясняваме какво ще се случи, колко време отнема и какво да очаквате след това." },
        { title: "Интервенция", text: "Под локална анестезия, спокойно и без бързане." },
        { title: "Проследяване", text: "Контрол на заздравяването и сваляне на конците, ако има такива." },
      ],
      faq: [
        {
          q: "Боли ли изваждането на зъб?",
          a: "По време на процедурата не би трябвало да усещате болка, само натиск. След като упойката премине, е нормално да има лек дискомфорт, който се овладява с обичайните обезболяващи.",
        },
        {
          q: "Колко време отнема възстановяването?",
          a: "При обикновено изваждане повечето хора се връщат към нормалния си ден още на следващия ден. След хирургично изваждане на мъдрец подуването може да продължи няколко дни.",
        },
      ],
    },
    en: {
      slug: "oral-surgery",
      title: "Oral Surgery",
      metaTitle: "Oral Surgery in Plovdiv: Extractions & Wisdom Teeth",
      metaDescription:
        "Tooth and impacted wisdom tooth removal, baby tooth extraction and emergency surgical care, under local anaesthesia with on-site X-rays at T&Co Dental.",
      excerpt:
        "Gentle removal of teeth and wisdom teeth, minor surgical procedures and emergencies, with care for every detail.",
      intro: [
        "Oral surgery covers procedures inside the mouth, from a simple extraction to removing an impacted wisdom tooth. Every procedure starts with an examination and an on-site dental X-ray, so we know exactly what we're working with.",
        "We work under local anaesthesia, gently towards the bone and soft tissue, and give you clear recovery instructions. More complex cases that require a hospital setting are referred to the right specialist.",
      ],
      steps: [
        { title: "Consultation & X-ray", text: "An examination and on-site X-ray to plan the procedure." },
        { title: "A clear plan", text: "We explain what will happen, how long it takes and what to expect afterwards." },
        { title: "The procedure", text: "Under local anaesthesia, calmly and without rushing." },
        { title: "Follow-up", text: "We check the healing and remove any stitches." },
      ],
      faq: [
        {
          q: "Does having a tooth out hurt?",
          a: "You shouldn't feel pain during the procedure, only pressure. Once the anaesthetic wears off, mild discomfort is normal and is managed with regular painkillers.",
        },
        {
          q: "How long is the recovery?",
          a: "After a simple extraction most people are back to their normal day the next day. After surgical wisdom tooth removal, swelling can last a few days.",
        },
      ],
    },
  },
  children: [
    {
      id: "extraction",
      art: "extraction",
      thumbnail: "/images/services/extraction.jpg",
      text: {
        bg: {
          slug: "izvazhdane-na-zabi",
          title: "Изваждане на зъби",
          metaTitle: "Изваждане на зъби в Пловдив",
          metaDescription:
            "Щадящо изваждане на зъби под локална анестезия, със зъбна снимка на място и ясни указания за грижа след това. T&Co Dental, Пловдив.",
          excerpt:
            "Когато зъбът не може да бъде спасен, изваждаме го внимателно, под локална анестезия и с минимална травма.",
          intro: [
            "Изваждането на зъб е решение, което взимаме след внимателна преценка, когато зъбът е силно разрушен, счупен под венеца, силно разклатен или е източник на инфекция, която не може да бъде лекувана. Понякога се налага и по препоръка на ортодонт.",
            "Преди процедурата правим зъбна снимка в кабинета, за да видим корените и костта около тях. Изваждането протича под локална анестезия, а вие си тръгвате с ясни указания за следващите дни.",
          ],
          signs: [
            "Силно разрушен зъб, който не може да бъде възстановен",
            "Зъб с напреднал пародонтит и голяма подвижност",
            "Счупен корен или надлъжна фрактура на зъба",
            "Препоръка от ортодонт",
          ],
          steps: [
            {
              title: "Преценка",
              text: "Обсъждаме дали има начин зъбът да бъде запазен и какви са възможностите след изваждането.",
            },
            { title: "Снимка на място", text: "Секторната снимка показва формата и дължината на корените." },
            { title: "Изваждане", text: "Под локална анестезия, внимателно и с грижа за костта." },
            { title: "Възстановяване", text: "Указания за първите дни и контролен преглед при нужда." },
          ],
          notesTitle: "Грижа след изваждане",
          notes: [
            "Първите 2 часа не се хранете и не пийте горещи напитки.",
            "Студен компрес отвън на бузата намалява подуването през първия ден.",
            "Мийте зъбите внимателно, като заобикаляте раната.",
            "Съобщете ни при температура, засилваща се болка след третия ден или кървене, което не спира.",
          ],
          faq: [
            {
              q: "Какво следва след изваждането?",
              a: "След заздравяване можем да обсъдим как да бъде възстановен липсващият зъб, за да не се наклонят съседните зъби.",
            },
          ],
        },
        en: {
          slug: "tooth-extraction",
          title: "Tooth Extraction",
          metaTitle: "Tooth Extraction in Plovdiv",
          metaDescription:
            "Gentle tooth extraction under local anaesthesia, with an on-site dental X-ray and clear aftercare instructions. T&Co Dental, Plovdiv.",
          excerpt:
            "When a tooth can't be saved, we remove it carefully, under local anaesthesia and with minimal trauma.",
          intro: [
            "Removing a tooth is a decision we make after careful assessment, when the tooth is badly decayed, broken below the gum, very loose, or the source of an infection that can't be treated. Sometimes it is also recommended by an orthodontist.",
            "Before the procedure we take a dental X-ray in the clinic to see the roots and the surrounding bone. The extraction is done under local anaesthesia, and you leave with clear instructions for the following days.",
          ],
          signs: [
            "A badly decayed tooth that can't be restored",
            "A very loose tooth due to advanced gum disease",
            "A fractured root or a vertical crack in the tooth",
            "A recommendation from an orthodontist",
          ],
          steps: [
            { title: "Assessment", text: "We discuss whether the tooth can be saved and what the options are after removal." },
            { title: "On-site X-ray", text: "A periapical X-ray shows the shape and length of the roots." },
            { title: "Extraction", text: "Under local anaesthesia, carefully and with respect for the bone." },
            { title: "Recovery", text: "Instructions for the first few days and a follow-up visit if needed." },
          ],
          notesTitle: "Aftercare",
          notes: [
            "Don't eat or have hot drinks for the first 2 hours.",
            "A cold compress on the cheek reduces swelling on the first day.",
            "Brush gently, avoiding the wound.",
            "Let us know if you develop a fever, pain that increases after day three, or bleeding that won't stop.",
          ],
          faq: [
            {
              q: "What happens after the extraction?",
              a: "Once it has healed, we can discuss how to replace the missing tooth so the neighbouring teeth don't tilt.",
            },
          ],
        },
      },
    },
    {
      id: "maxillofacial",
      art: "jaw",
      thumbnail: "/images/services/maxillofacial.jpg",
      text: {
        bg: {
          slug: "litsevo-chelyustna-hirurgiya",
          title: "Лицево-челюстна хирургия",
          metaTitle: "Консултация по лицево-челюстна хирургия в Пловдив",
          metaDescription:
            "Консултация и амбулаторно лечение на травми, възпаления и образувания в областта на челюстите и устната кухина. При нужда, насочване към специалист.",
          excerpt:
            "Оценка и амбулаторно лечение на състояния в областта на челюстите, травми, възпаления, образувания, и насочване, когато е необходимо.",
          intro: [
            "Лицево-челюстната хирургия се занимава със заболявания, травми и аномалии на челюстите, устната кухина и лицето. Голяма част от състоянията в тази област могат да бъдат диагностицирани и лекувани амбулаторно, в кабинета.",
            "При нас ще получите точна оценка на проблема, зъбна снимка на място и лечение на състоянията, които могат да бъдат овладени амбулаторно. Когато случаят изисква болнично лечение или допълнителни изследвания, ви насочваме към подходящ специалист и ви обясняваме следващите стъпки.",
          ],
          signs: [
            "Травма на челюстта, зъбите или устните",
            "Подуване или бучка в устата или около челюстта",
            "Раничка в устата, която не заздравява повече от две седмици",
            "Болка или щракане в челюстната става",
            "Възпаление около зъб или мъдрец, което се повтаря",
          ],
          steps: [
            { title: "Преглед", text: "Подробен преглед на устната кухина, челюстите и меките тъкани." },
            {
              title: "Образна диагностика",
              text: "Зъбна снимка на място, а при нужда и насочване за допълнително изследване.",
            },
            {
              title: "Лечение или насочване",
              text: "Амбулаторни интервенции в кабинета или насочване към лицево-челюстен хирург в болнично заведение.",
            },
          ],
          faq: [
            {
              q: "Трябва ли ми направление?",
              a: "За консултация в нашия кабинет не е нужно направление. Ако случаят изисква лечение в болница, ще ви обясним как да продължите.",
            },
          ],
        },
        en: {
          slug: "maxillofacial-surgery",
          title: "Maxillofacial Surgery",
          metaTitle: "Maxillofacial Surgery Consultation in Plovdiv",
          metaDescription:
            "Consultation and outpatient treatment of injuries, inflammation and lesions of the jaws and mouth, with referral to a specialist when needed.",
          excerpt:
            "Assessment and outpatient care for conditions of the jaws, injuries, inflammation, lesions, with referral when needed.",
          intro: [
            "Maxillofacial surgery deals with diseases, injuries and abnormalities of the jaws, mouth and face. Many conditions in this area can be diagnosed and treated as an outpatient, right in the clinic.",
            "With us you get an accurate assessment, an on-site dental X-ray and treatment for conditions that can be managed as an outpatient. When a case needs hospital treatment or further tests, we refer you to the right specialist and explain the next steps.",
          ],
          signs: [
            "An injury to the jaw, teeth or lips",
            "Swelling or a lump in the mouth or around the jaw",
            "A mouth sore that hasn't healed in more than two weeks",
            "Pain or clicking in the jaw joint",
            "Recurring inflammation around a tooth or wisdom tooth",
          ],
          steps: [
            { title: "Examination", text: "A thorough examination of the mouth, jaws and soft tissues." },
            { title: "Imaging", text: "An on-site dental X-ray and, if needed, a referral for further imaging." },
            {
              title: "Treatment or referral",
              text: "Outpatient procedures in the clinic, or referral to a maxillofacial surgeon at a hospital.",
            },
          ],
          faq: [
            {
              q: "Do I need a referral?",
              a: "You don't need a referral for a consultation at our clinic. If your case requires hospital treatment, we'll explain how to proceed.",
            },
          ],
        },
      },
    },
    {
      id: "wisdom-teeth",
      art: "wisdom",
      thumbnail: "/images/services/wisdom-teeth.jpg",
      text: {
        bg: {
          slug: "retinirani-madretsi",
          title: "Ретинирани мъдреци",
          metaTitle: "Изваждане на ретинирани мъдреци в Пловдив",
          metaDescription:
            "Болезнен, частично пробил или ретиниран мъдрец? Оценяваме положението му със снимка и го изваждаме щадящо, когато е необходимо. T&Co Dental.",
          excerpt:
            "Мъдрец, който няма място да пробие, може да причинява болка и възпаления. Оценяваме положението му и го изваждаме, когато е нужно.",
          intro: [
            "Мъдреците са последните кътници и често нямат достатъчно място в челюстта. Когато останат изцяло или частично под венеца или в костта, ги наричаме ретинирани. Те могат години наред да не създават проблеми, или да причиняват повтарящи се възпаления, болка и увреждане на съседния зъб.",
            "Не всеки мъдрец трябва да бъде изваден. Решението взимаме след преглед и зъбна снимка, като преценяваме положението му, близостта до съседните структури и вашите оплаквания.",
          ],
          signs: [
            "Болка и подуване на венеца зад последния кътник",
            "Затруднено отваряне на устата или болка при преглъщане",
            "Неприятен вкус или мирис от задната част на устата",
            "Натиск или болка в съседния зъб",
          ],
          steps: [
            { title: "Снимка и оценка", text: "Определяме положението на мъдреца и дали изваждането е необходимо." },
            { title: "Овладяване на възпалението", text: "При остро възпаление първо се справяме с инфекцията." },
            {
              title: "Хирургично изваждане",
              text: "Под локална анестезия, при нужда с разрез на венеца и шев.",
            },
            { title: "Контрол", text: "Проследяваме заздравяването и сваляме конците, обикновено след 7-10 дни." },
          ],
          faq: [
            {
              q: "Трябва ли да изваждам мъдрец, който не ме боли?",
              a: "Не винаги. Ако мъдрецът е здрав, правилно разположен и може да се почиства, често е достатъчно да го наблюдаваме. Ако обаче уврежда съседния зъб или се възпалява повторно, препоръчваме изваждане.",
            },
            {
              q: "Колко време продължава подуването?",
              a: "Обикновено е най-силно на втория-третия ден и постепенно отшумява в рамките на седмица. Студените компреси и спазването на указанията помагат много.",
            },
          ],
        },
        en: {
          slug: "impacted-wisdom-teeth",
          title: "Impacted Wisdom Teeth",
          metaTitle: "Impacted Wisdom Tooth Removal in Plovdiv",
          metaDescription:
            "A painful, partly erupted or impacted wisdom tooth? We assess its position with an X-ray and remove it gently when needed. T&Co Dental.",
          excerpt:
            "A wisdom tooth without room to come through can cause pain and inflammation. We assess its position and remove it when needed.",
          intro: [
            "Wisdom teeth are the last molars and often don't have enough room in the jaw. When they stay fully or partly under the gum or in the bone, they're called impacted. They may cause no trouble for years, or lead to recurring inflammation, pain and damage to the neighbouring tooth.",
            "Not every wisdom tooth needs to come out. We decide after an examination and X-ray, taking into account its position, how close it is to nearby structures, and your symptoms.",
          ],
          signs: [
            "Pain and swelling of the gum behind the last molar",
            "Difficulty opening your mouth or pain when swallowing",
            "A bad taste or smell from the back of the mouth",
            "Pressure or pain in the neighbouring tooth",
          ],
          steps: [
            { title: "X-ray & assessment", text: "We determine the tooth's position and whether removal is needed." },
            { title: "Calming the inflammation", text: "If there's acute inflammation, we deal with the infection first." },
            { title: "Surgical removal", text: "Under local anaesthesia, with a small incision and stitches if needed." },
            { title: "Follow-up", text: "We check the healing and remove the stitches, usually after 7-10 days." },
          ],
          faq: [
            {
              q: "Should I remove a wisdom tooth that doesn't hurt?",
              a: "Not always. If it's healthy, well positioned and easy to clean, monitoring is often enough. If it damages the neighbouring tooth or keeps getting inflamed, we recommend removal.",
            },
            {
              q: "How long does the swelling last?",
              a: "It usually peaks on day two or three and settles within about a week. Cold compresses and following the instructions help a lot.",
            },
          ],
        },
      },
    },
    {
      id: "baby-teeth",
      art: "baby-tooth",
      thumbnail: "/images/services/baby-teeth.jpg",
      text: {
        bg: {
          slug: "izvazhdane-na-mlechni-zabi",
          title: "Изваждане на млечни зъби",
          metaTitle: "Изваждане на млечни зъби при деца в Пловдив",
          metaDescription:
            "Спокойно и внимателно изваждане на млечни зъби, когато зъбът е разрушен, инфектиран или пречи на постоянния. Родителят може да е до детето.",
          excerpt: "Спокойно, внимателно и с много търпение, когато млечното зъбче трябва да бъде извадено.",
          intro: [
            "Млечните зъби пазят място за постоянните и е важно да останат, докато дойде моментът да паднат естествено. Понякога обаче се налага да бъдат извадени по-рано, при силно разрушаване, инфекция, травма или когато постоянният зъб вече пробива, а млечният не пада.",
            "При децата отделяме специално внимание на доверието: обясняваме с прости думи какво ще се случи, работим спокойно и без бързане. Родителят може да бъде до детето по време на процедурата.",
          ],
          signs: [
            "Постоянният зъб пробива зад млечния, а той не пада",
            "Силно разрушено млечно зъбче с болка или подуване",
            "Абсцес или фистула на венеца над млечен зъб",
            "Травма със счупване на млечен зъб",
          ],
          steps: [
            {
              title: "Запознаване",
              text: "Детето разглежда кабинета и инструментите, а ние обясняваме всичко на неговия език.",
            },
            {
              title: "Обезболяване",
              text: "Работим с локална анестезия, а преди нея, с повърхностен анестетичен гел.",
            },
            { title: "Бързо и внимателно", text: "Млечните зъби обикновено се изваждат за минути." },
            { title: "Указания за родителите", text: "Какво да яде детето и как да се грижите за раничката." },
          ],
          faq: [
            {
              q: "Защо да не изчакаме зъбът да падне сам?",
              a: "Ако млечният зъб е инфектиран, инфекцията може да засегне и зародиша на постоянния. А когато пречи на постоянния зъб, той може да израсне накриво.",
            },
          ],
        },
        en: {
          slug: "baby-tooth-extraction",
          title: "Baby Tooth Extraction",
          metaTitle: "Baby Tooth Extraction for Children in Plovdiv",
          metaDescription:
            "Calm, gentle removal of baby teeth, when a tooth is decayed, infected or blocking the permanent one. Parents can stay with their child.",
          excerpt: "Calm, gentle and patient, for when a baby tooth has to come out.",
          intro: [
            "Baby teeth hold space for the permanent ones, so it's important they stay until they fall out naturally. Sometimes, though, they need to be removed earlier, because of heavy decay, infection, injury, or when the permanent tooth is already coming through and the baby tooth won't budge.",
            "With children we focus on building trust: we explain in simple words what will happen and work calmly, without rushing. A parent can stay with the child during the procedure.",
          ],
          signs: [
            "The permanent tooth is coming in behind a baby tooth that won't fall out",
            "A badly decayed baby tooth with pain or swelling",
            "An abscess or gum boil above a baby tooth",
            "An injury that broke a baby tooth",
          ],
          steps: [
            { title: "Getting to know us", text: "Your child explores the room and the instruments while we explain everything in their language." },
            { title: "Numbing", text: "We use local anaesthesia, preceded by a numbing gel." },
            { title: "Quick and gentle", text: "Baby teeth usually come out in minutes." },
            { title: "Tips for parents", text: "What your child can eat and how to care for the spot afterwards." },
          ],
          faq: [
            {
              q: "Why not wait for the tooth to fall out on its own?",
              a: "If the baby tooth is infected, the infection can affect the developing permanent tooth. And if it's in the way, the permanent tooth may grow in crooked.",
            },
          ],
        },
      },
    },
    {
      id: "emergency-oral-surgery",
      art: "surgery-urgent",
      thumbnail: "/images/services/emergency-oral-surgery.jpg",
      urgent: true,
      text: {
        bg: {
          slug: "speshna-oralna-hirurgiya",
          title: "Спешна орална хирургия",
          metaTitle: "Денонощна спешна орална хирургия в Пловдив",
          metaDescription:
            "Кървене след вадене, остро възпаление около мъдрец или травма на устата? Спешни хирургични интервенции денонощно в T&Co Dental, Пловдив.",
          excerpt:
            "Кървене след вадене, остро възпаление около мъдрец, травма на устата, спешна хирургична помощ по всяко време.",
          intro: [
            "Някои състояния в устата не могат да чакат до сутринта: кървене след изваждане на зъб, което не спира, остро възпаление около мъдрец, травма с разкъсване на венеца или устната, силна болка след екстракция (т.нар. сух алвеол).",
            "Тъй като при спешни случаи работим денонощно, можем да ви приемем и извън работно време. Разполагаме с рентген на място и с всичко необходимо за спешни хирургични интервенции в кабинета.",
          ],
          signs: [
            "Кървене след изваждане на зъб, което не спира въпреки натиска с марля",
            "Силна болка няколко дни след изваждане на зъб",
            "Остро възпаление и подуване около мъдрец",
            "Разкъсване на венеца или устната при травма",
          ],
          steps: [
            {
              title: "Обадете се",
              text: "Ще ви кажем какво да направите веднага, например как правилно да притиснете раната.",
            },
            { title: "Овладяване", text: "Спиране на кървенето, почистване, дренаж или шев, според случая." },
            { title: "Обезболяване и грижа", text: "Облекчаваме болката и ви даваме указания за следващите дни." },
          ],
          notesTitle: "Важно",
          notes: [
            "При обилно кървене след травма, затруднено дишане или преглъщане или бързо разрастващо се подуване се обадете на 112.",
          ],
        },
        en: {
          slug: "emergency-oral-surgery",
          title: "Emergency Oral Surgery",
          metaTitle: "Emergency Oral Surgery in Plovdiv, Day & Night",
          metaDescription:
            "Bleeding after an extraction, acute wisdom tooth inflammation or a mouth injury? Emergency surgical care day and night at T&Co Dental, Plovdiv.",
          excerpt:
            "Bleeding after an extraction, acute wisdom tooth inflammation, a mouth injury, urgent surgical care at any hour.",
          intro: [
            "Some problems in the mouth can't wait until morning: bleeding after an extraction that won't stop, acute inflammation around a wisdom tooth, an injury that tears the gum or lip, or severe pain after an extraction (so-called dry socket).",
            "Because we handle emergencies around the clock, we can see you outside regular hours. We have on-site X-ray and everything needed for emergency surgical procedures in the clinic.",
          ],
          signs: [
            "Bleeding after an extraction that won't stop despite pressing on gauze",
            "Severe pain a few days after a tooth extraction",
            "Acute inflammation and swelling around a wisdom tooth",
            "A torn gum or lip after an injury",
          ],
          steps: [
            { title: "Call us", text: "We'll tell you what to do right away, for example, how to apply pressure correctly." },
            { title: "Getting it under control", text: "Stopping the bleeding, cleaning, drainage or stitches, depending on the case." },
            { title: "Pain relief & aftercare", text: "We relieve the pain and give you instructions for the following days." },
          ],
          notesTitle: "Important",
          notes: [
            "For heavy bleeding after an injury, difficulty breathing or swallowing, or rapidly growing swelling, call 112.",
          ],
        },
      },
    },
  ],
};
