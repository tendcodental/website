import type { ServiceCategory } from "./types";

export const cleaning: ServiceCategory = {
  id: "cleaning",
  art: "cleaning",
  children: [],
  text: {
    bg: {
      slug: "pochistvane-na-zaben-kamak",
      title: "Почистване на зъбен камък",
      metaTitle: "Почистване на зъбен камък в Пловдив",
      metaDescription:
        "Професионално почистване на зъбен камък и плака, полиране и съвети за хигиена, за здрави венци и свеж дъх. T&Co Dental, Пловдив.",
      excerpt: "Професионално почистване на зъбен камък и плака, за здрави венци, по-светли зъби и свеж дъх.",
      intro: [
        "Зъбният камък е втвърдена плака, която не може да бъде премахната с четка и конец. Той дразни венците, причинява кървене и лош дъх, а с времето може да доведе до пародонтит и разклащане на зъбите.",
        "Професионалното почистване премахва камъка над и под венеца, след което зъбите се полират, за да станат гладки и плаката да полепва по-трудно. Процедурата е ключова част от профилактиката и обикновено се препоръчва на всеки 6 до 12 месеца.",
      ],
      signs: [
        "Кървене на венците при миене",
        "Жълтеникави или кафяви отлагания, особено от вътрешната страна на долните предни зъби",
        "Лош дъх, който не минава",
        "Зачервени, подути венци",
      ],
      steps: [
        { title: "Преглед на венците", text: "Проверяваме за възпаление и пародонтални джобове." },
        { title: "Почистване", text: "Премахваме камъка над и под венеца." },
        { title: "Полиране", text: "Отстраняваме оцветяванията и загладяваме повърхностите." },
        { title: "Съвети", text: "Показваме ви как да миете и почиствате между зъбите у дома." },
      ],
      faq: [
        {
          q: "Боли ли почистването?",
          a: "Обикновено не. При чувствителни зъби или силно възпалени венци процедурата може да е неприятна, тогава можем да използваме местна упойка.",
        },
        {
          q: "Избелва ли почистването зъбите?",
          a: "Почистването премахва камъка и оцветяванията от кафе, чай и тютюн, затова зъбите изглеждат по-светли. То обаче не променя естествения им цвят така, както избелването.",
        },
      ],
    },
    en: {
      slug: "tartar-removal",
      title: "Scaling & Tartar Removal",
      metaTitle: "Scaling & Tartar Removal in Plovdiv",
      metaDescription:
        "Professional removal of tartar and plaque, polishing and hygiene advice, for healthy gums and fresh breath. T&Co Dental, Plovdiv.",
      excerpt: "Professional removal of tartar and plaque, for healthy gums, brighter teeth and fresh breath.",
      intro: [
        "Tartar is hardened plaque that brushing and flossing can't remove. It irritates the gums and causes bleeding and bad breath, and over time it can lead to gum disease and loose teeth.",
        "A professional cleaning removes tartar above and below the gum line, then the teeth are polished so they're smooth and plaque sticks less easily. It's a key part of prevention and is usually recommended every 6 to 12 months.",
      ],
      signs: [
        "Gums that bleed when you brush",
        "Yellowish or brown deposits, especially behind the lower front teeth",
        "Bad breath that doesn't go away",
        "Red, swollen gums",
      ],
      steps: [
        { title: "Gum check", text: "We look for inflammation and gum pockets." },
        { title: "Cleaning", text: "We remove tartar above and below the gum line." },
        { title: "Polishing", text: "We remove stains and smooth the surfaces." },
        { title: "Advice", text: "We show you how to brush and clean between your teeth at home." },
      ],
      faq: [
        {
          q: "Does scaling hurt?",
          a: "Usually not. With sensitive teeth or very inflamed gums it can be uncomfortable, in that case we can use a local anaesthetic.",
        },
        {
          q: "Does cleaning whiten teeth?",
          a: "Cleaning removes tartar and stains from coffee, tea and tobacco, so teeth look brighter. It doesn't change their natural colour the way whitening does.",
        },
      ],
    },
  },
};

export const crowns: ServiceCategory = {
  id: "crowns",
  art: "crown",
  children: [],
  text: {
    bg: {
      slug: "vremenni-i-postoyanni-koronki",
      title: "Поставяне на временни и постоянни коронки",
      navTitle: "Временни и постоянни коронки",
      metaTitle: "Временни и постоянни зъбни коронки в Пловдив",
      metaDescription:
        "Коронки за силно разрушени зъби и след кореново лечение, временна защита веднага и постоянна коронка по мярка. T&Co Dental, Пловдив.",
      excerpt: "Защита и възстановяване на силно разрушени зъби: временна коронка веднага, постоянна по мярка.",
      intro: [
        "Коронката е „шапка“, която покрива изцяло видимата част на зъба. Тя възстановява формата, функцията и вида му, когато зъбът е твърде разрушен за пломба, след кореново лечение или след счупване.",
        "Постоянната коронка се изработва по мярка в зъботехническа лаборатория, което отнема известно време. Междувременно поставяме временна коронка, която пази изпиления зъб, позволява ви да се храните нормално и запазва естествения ви вид.",
      ],
      signsTitle: "Кога е нужна коронка",
      signs: [
        "Силно разрушен зъб с голяма пломба",
        "Зъб след кореново лечение, особено кътник",
        "Счупен или напукан зъб",
        "Паднала или стара, неплътна коронка",
      ],
      steps: [
        { title: "Преглед и снимка", text: "Оценяваме зъба и корена му." },
        { title: "Подготовка", text: "Под анестезия зъбът се изпилява и се взема отпечатък." },
        { title: "Временна коронка", text: "Поставя се още в същото посещение." },
        {
          title: "Постоянна коронка",
          text: "Циментира се, когато е готова и сме проверили цвета, формата и захапката.",
        },
      ],
      faq: [
        {
          q: "Колко време се носи временната коронка?",
          a: "Обикновено от няколко дни до няколко седмици, докато лабораторията изработи постоянната. Ако падне, обадете се и ще я поставим отново.",
        },
        {
          q: "Падна ми коронката, какво да правя?",
          a: "Запазете я и ни се обадете. Не се опитвайте да я залепите сами с лепило. Ако зъбът под нея боли, използвайте спешния номер.",
        },
        {
          q: "От какъв материал са коронките?",
          a: "Изборът на материал зависи от зъба, захапката и естетическите изисквания. Ще обсъдим подходящите варианти и цените им по време на консултацията.",
        },
      ],
    },
    en: {
      slug: "temporary-and-permanent-crowns",
      title: "Temporary & Permanent Crowns",
      metaTitle: "Temporary & Permanent Dental Crowns in Plovdiv",
      metaDescription:
        "Crowns for badly damaged teeth and after root canal treatment, temporary protection straight away and a custom permanent crown. T&Co Dental.",
      excerpt: "Protecting and restoring badly damaged teeth: a temporary crown straight away, a permanent one made to measure.",
      intro: [
        "A crown is a cap that covers the entire visible part of a tooth. It restores the tooth's shape, function and appearance when it's too damaged for a filling, after root canal treatment, or after a fracture.",
        "A permanent crown is custom-made in a dental laboratory, which takes some time. In the meantime we fit a temporary crown that protects the prepared tooth, lets you eat normally and keeps your natural look.",
      ],
      signsTitle: "When you need a crown",
      signs: [
        "A badly damaged tooth with a large filling",
        "A tooth after root canal treatment, especially a molar",
        "A broken or cracked tooth",
        "A lost, old or leaking crown",
      ],
      steps: [
        { title: "Examination & X-ray", text: "We assess the tooth and its root." },
        { title: "Preparation", text: "Under anaesthesia the tooth is shaped and an impression is taken." },
        { title: "Temporary crown", text: "Fitted during the same visit." },
        { title: "Permanent crown", text: "Cemented once it's ready and we've checked the shade, shape and bite." },
      ],
      faq: [
        {
          q: "How long will I wear the temporary crown?",
          a: "Usually from a few days to a few weeks, until the lab finishes the permanent one. If it comes off, call us and we'll refit it.",
        },
        {
          q: "My crown fell off, what should I do?",
          a: "Keep it and call us. Don't try to glue it back yourself. If the tooth underneath hurts, use the emergency number.",
        },
        {
          q: "What are the crowns made of?",
          a: "The choice of material depends on the tooth, your bite and aesthetic needs. We'll discuss suitable options and their prices during the consultation.",
        },
      ],
    },
  },
};
