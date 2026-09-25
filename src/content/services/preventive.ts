import type { ServiceCategory } from "./types";

export const preventive: ServiceCategory = {
  id: "preventive",
  art: "preventive",
  thumbnail: "/images/services/preventive.jpg",
  text: {
    bg: {
      slug: "preventivna-i-detska-stomatologiya",
      title: "Превантивна и детска стоматология",
      navTitle: "Профилактика и детска стоматология",
      metaTitle: "Профилактика и детска стоматология в Пловдив",
      metaDescription:
        "Детски прегледи, флуоризация и запечатване на фисури, щадяща профилактика, която пази зъбите от кариес. T&Co Dental, Пловдив.",
      excerpt: "Профилактика за здрави зъби от детството, флуоризация, силанти и спокойни детски прегледи.",
      intro: [
        "Най-доброто лечение е това, което не се налага. Редовните прегледи, професионалната профилактика и навиците, изградени от ранна детска възраст, пазят зъбите от кариес и спестяват болка, време и средства.",
        "При децата се стремим първото посещение при зъболекар да бъде приятно преживяване, без болка и без страх. Така детето свиква с кабинета и идва спокойно и в бъдеще.",
      ],
      steps: [
        { title: "Преглед", text: "Проверяваме зъбите, венците и навиците, които влияят на здравето им." },
        { title: "Профилактика", text: "Флуоризация, силанти или почистване, според нуждите." },
        { title: "Съвети за у дома", text: "Как да миете зъбите, колко паста да използвате и кои навици да избягвате." },
        { title: "Редовен контрол", text: "Напомняме ви кога е време за следващия преглед." },
      ],
      faq: [
        {
          q: "Кога да доведа детето на първи преглед?",
          a: "Препоръчително е около първия рожден ден или скоро след пробиването на първите зъбки. Ранният преглед помага проблемите да бъдат открити навреме, а родителите получават съвети за грижата у дома.",
        },
        {
          q: "Колко често да идваме на профилактичен преглед?",
          a: "За повечето деца и възрастни, на всеки 6 месеца, освен ако лекарят не препоръча друг интервал.",
        },
      ],
    },
    en: {
      slug: "preventive-and-pediatric-dentistry",
      title: "Preventive & Children's Dentistry",
      navTitle: "Prevention & Children",
      metaTitle: "Preventive & Children's Dentistry in Plovdiv",
      metaDescription:
        "Children's check-ups, fluoride treatment and fissure sealants, gentle prevention that protects teeth from decay. T&Co Dental, Plovdiv.",
      excerpt: "Prevention for healthy teeth from childhood, fluoride, sealants and relaxed children's check-ups.",
      intro: [
        "The best treatment is the one you never need. Regular check-ups, professional prevention and habits built in early childhood protect teeth from decay and save pain, time and money.",
        "With children, we want the first visit to the dentist to be a pleasant experience, no pain and no fear. That way they get used to the clinic and come back calmly in the future.",
      ],
      steps: [
        { title: "Check-up", text: "We check the teeth, gums and the habits that affect them." },
        { title: "Prevention", text: "Fluoride, sealants or cleaning, as needed." },
        { title: "Tips for home", text: "How to brush, how much toothpaste to use and which habits to avoid." },
        { title: "Regular reviews", text: "We remind you when it's time for the next check-up." },
      ],
      faq: [
        {
          q: "When should my child have their first check-up?",
          a: "Around the first birthday, or soon after the first teeth appear. An early visit helps catch problems in time, and parents get advice on caring for teeth at home.",
        },
        {
          q: "How often should we come for a check-up?",
          a: "For most children and adults, every 6 months, unless the dentist recommends a different interval.",
        },
      ],
    },
  },
  children: [
    {
      id: "pediatric",
      art: "kids",
      thumbnail: "/images/services/pediatric.jpg",
      text: {
        bg: {
          slug: "detska-stomatologiya",
          title: "Детска стоматология",
          metaTitle: "Детски зъболекар в Пловдив",
          metaDescription:
            "Детска стоматология с търпение и усмивка, прегледи, лечение на млечни и постоянни зъби, профилактика. Родителят може да е до детето. Пловдив.",
          excerpt: "Прегледи и лечение на млечни и постоянни зъби, с търпение, игра и много обяснения.",
          intro: [
            "Детските зъби имат нужда от специално внимание: емайлът на млечните зъби е по-тънък и кариесът напредва по-бързо. В същото време от първите преживявания в кабинета зависи дали детето ще се страхува от зъболекар и като възрастен.",
            "Затова работим бавно и спокойно, обясняваме всичко с думи, които детето разбира, и никога не го насилваме. Започваме с преглед и запознаване, а лечението планираме така, че да бъде възможно най-комфортно.",
          ],
          signsTitle: "Кога да ни посетите",
          signs: [
            "Бели или кафяви петна по зъбките",
            "Детето избягва да дъвче от едната страна",
            "Болка, подуване или „пъпка“ на венеца",
            "Постоянен зъб, който пробива накриво",
          ],
          steps: [
            {
              title: "Първо запознаване",
              text: "Детето разглежда стола, лампата и инструментите, преди да започнем.",
            },
            { title: "Преглед", text: "Проверяваме зъбите, захапката и хигиената." },
            { title: "Лечение или профилактика", text: "Според нуждите, обтурации, флуоризация, силанти." },
            {
              title: "Съвети за родителите",
              text: "Как да миете зъбите на детето, колко паста да използвате и кои навици да избягвате.",
            },
          ],
          faq: [
            {
              q: "Трябва ли да се лекуват млечните зъби, щом ще паднат?",
              a: "Да. Кариесът по млечните зъби причинява болка и инфекции, а ранната им загуба може да доведе до криво израстване на постоянните зъби.",
            },
            {
              q: "Мога ли да бъда до детето?",
              a: "Разбира се. Присъствието на родителя често помага на детето да се чувства спокойно.",
            },
          ],
        },
        en: {
          slug: "pediatric-dentistry",
          title: "Children's Dentistry",
          metaTitle: "Children's Dentist in Plovdiv",
          metaDescription:
            "Children's dentistry with patience and a smile, check-ups, treatment of baby and permanent teeth, prevention. Parents can stay close. Plovdiv.",
          excerpt: "Check-ups and treatment for baby and permanent teeth, with patience, play and plenty of explanation.",
          intro: [
            "Children's teeth need special attention: baby tooth enamel is thinner and decay progresses faster. At the same time, early experiences at the dentist shape whether a child grows up afraid of dental visits.",
            "So we work slowly and calmly, explain everything in words your child understands, and never force anything. We start with a check-up and getting to know each other, and plan treatment to be as comfortable as possible.",
          ],
          signsTitle: "When to visit",
          signs: [
            "White or brown spots on the teeth",
            "Your child avoids chewing on one side",
            "Pain, swelling or a 'pimple' on the gum",
            "A permanent tooth coming in crooked",
          ],
          steps: [
            { title: "Getting to know us", text: "Your child explores the chair, the light and the instruments before we begin." },
            { title: "Check-up", text: "We check the teeth, bite and hygiene." },
            { title: "Treatment or prevention", text: "As needed, fillings, fluoride, sealants." },
            { title: "Tips for parents", text: "How to brush your child's teeth, how much toothpaste to use and which habits to avoid." },
          ],
          faq: [
            {
              q: "Do baby teeth need treatment if they'll fall out anyway?",
              a: "Yes. Decay in baby teeth causes pain and infections, and losing them early can make permanent teeth grow in crooked.",
            },
            {
              q: "Can I stay with my child?",
              a: "Of course. Having a parent nearby often helps a child feel calm.",
            },
          ],
        },
      },
    },
    {
      id: "fluoride",
      art: "fluoride",
      thumbnail: "/images/services/fluoride.jpg",
      text: {
        bg: {
          slug: "fluorizatsiya-na-zabi",
          title: "Флуоризация на зъби",
          metaTitle: "Флуоризация на зъби за деца и възрастни",
          metaDescription:
            "Професионална флуоризация, бърза и безболезнена процедура, която укрепва емайла и намалява риска от кариес. За деца и възрастни. T&Co Dental.",
          excerpt: "Бърза и безболезнена процедура, която укрепва емайла и намалява риска от кариес.",
          intro: [
            "Флуоридът укрепва емайла и го прави по-устойчив на киселините, които бактериите произвеждат. При професионалната флуоризация върху зъбите се нанася лак или гел с по-висока концентрация на флуорид от тази в пастата за зъби.",
            "Процедурата отнема няколко минути, не боли и е подходяща както за деца, така и за възрастни с повишен риск от кариес или с чувствителни зъби.",
          ],
          signsTitle: "За кого е подходяща",
          signs: [
            "Деца със склонност към кариес",
            "Начални бели петна по емайла",
            "Чувствителни зъби и оголени шийки",
            "Пациенти с брекети или със сухота в устата",
          ],
          steps: [
            { title: "Почистване", text: "Зъбите се почистват и подсушават." },
            { title: "Нанасяне", text: "Флуоридният препарат се нанася с четчица, бързо и безболезнено." },
            {
              title: "Указания",
              text: "Няколко часа след процедурата се избягват твърди храни, горещи напитки и миене на зъбите.",
            },
          ],
          faq: [
            {
              q: "Колко често се прави флуоризация?",
              a: "Обикновено на всеки 3 до 6 месеца, в зависимост от риска от кариес. Лекарят ще препоръча подходящ интервал за вас или детето ви.",
            },
          ],
        },
        en: {
          slug: "fluoride-treatment",
          title: "Fluoride Treatment",
          metaTitle: "Fluoride Treatment for Children & Adults",
          metaDescription:
            "Professional fluoride treatment, a quick, painless procedure that strengthens enamel and lowers the risk of decay. For children and adults.",
          excerpt: "A quick, painless procedure that strengthens enamel and lowers the risk of decay.",
          intro: [
            "Fluoride strengthens enamel and makes it more resistant to the acids produced by bacteria. In a professional fluoride treatment, a varnish or gel with a higher fluoride concentration than toothpaste is applied to the teeth.",
            "It takes just a few minutes, doesn't hurt and suits both children and adults with a higher risk of decay or sensitive teeth.",
          ],
          signsTitle: "Who it's for",
          signs: [
            "Children prone to decay",
            "Early white spots on the enamel",
            "Sensitive teeth and exposed tooth necks",
            "Patients with braces or a dry mouth",
          ],
          steps: [
            { title: "Cleaning", text: "The teeth are cleaned and dried." },
            { title: "Application", text: "The fluoride product is brushed on, quick and painless." },
            { title: "Instructions", text: "For a few hours afterwards, avoid hard foods, hot drinks and brushing." },
          ],
          faq: [
            {
              q: "How often is fluoride treatment done?",
              a: "Usually every 3 to 6 months, depending on the risk of decay. The dentist will recommend the right interval for you or your child.",
            },
          ],
        },
      },
    },
    {
      id: "sealants",
      art: "sealant",
      thumbnail: "/images/services/sealants.jpg",
      text: {
        bg: {
          slug: "zapechatvane-na-fisuri",
          title: "Запечатване на фисури",
          metaTitle: "Запечатване на фисури (силанти) в Пловдив",
          metaDescription:
            "Силантите запечатват дълбоките бразди на кътниците и ги пазят от кариес. Безболезнена процедура без пробиване и упойка. T&Co Dental, Пловдив.",
          excerpt: "Безболезнена защита на дъвкателните повърхности на кътниците, без пробиване и без упойка.",
          intro: [
            "Дъвкателните повърхности на кътниците имат дълбоки бразди, фисури, в които се задържат храна и бактерии, а четката трудно достига. Именно там кариесът при децата започва най-често.",
            "При запечатването фисурите се покриват с тънък защитен слой, силант. Процедурата е безболезнена, не изисква пробиване и упойка и е особено ефективна скоро след пробиването на постоянните кътници, обикновено около 6- и 12-годишна възраст.",
          ],
          signsTitle: "Кога се препоръчва",
          signs: [
            "Наскоро пробили постоянни кътници",
            "Дълбоки и тесни фисури",
            "Повишен риск от кариес",
            "Възрастни с дълбоки фисури без кариес",
          ],
          steps: [
            { title: "Почистване", text: "Фисурите се почистват щателно." },
            { title: "Подготовка", text: "Повърхността се подготвя, за да задържи силанта." },
            { title: "Запечатване", text: "Силантът се нанася и се втвърдява със светлина за секунди." },
          ],
          faq: [
            {
              q: "Колко издържа силантът?",
              a: "Силантите могат да издържат години. На всеки профилактичен преглед проверяваме дали са цели и при нужда ги допълваме.",
            },
          ],
        },
        en: {
          slug: "fissure-sealants",
          title: "Fissure Sealants",
          metaTitle: "Fissure Sealants for Children in Plovdiv",
          metaDescription:
            "Sealants close off the deep grooves of molars and protect them from decay. A painless procedure with no drilling or injections. T&Co Dental.",
          excerpt: "Painless protection for the chewing surfaces of molars, no drilling, no injections.",
          intro: [
            "The chewing surfaces of molars have deep grooves, fissures, where food and bacteria collect and a toothbrush struggles to reach. This is where decay most often starts in children.",
            "Sealing covers these grooves with a thin protective coating called a sealant. It's painless, needs no drilling or anaesthesia, and is most effective soon after the permanent molars come through, usually around ages 6 and 12.",
          ],
          signsTitle: "When it's recommended",
          signs: [
            "Newly erupted permanent molars",
            "Deep, narrow fissures",
            "A higher risk of decay",
            "Adults with deep fissures and no decay",
          ],
          steps: [
            { title: "Cleaning", text: "The fissures are cleaned thoroughly." },
            { title: "Preparation", text: "The surface is prepared so it can hold the sealant." },
            { title: "Sealing", text: "The sealant is applied and hardened with a light in seconds." },
          ],
          faq: [
            {
              q: "How long do sealants last?",
              a: "Sealants can last for years. At every check-up we make sure they're intact and top them up if needed.",
            },
          ],
        },
      },
    },
  ],
};
