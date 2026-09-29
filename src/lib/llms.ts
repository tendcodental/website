import "server-only";
import { clinic, fullAddress, mapLinks, SITE_URL } from "@/content/clinic";
import { doctors } from "@/content/doctors";
import { generalFaq } from "@/content/faq";
import { type Guide, guides } from "@/content/guides";
import { allServiceEntries, type Service, type ServiceCategory, serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "./phone";
import { googleMapsPlaceUrl } from "./schema";
import { absoluteUrl, localizedPaths } from "./seo";

/**
 * /llms.txt and /llms-full.txt (llmstxt.org): a plain Markdown map of the site for AI assistants and
 * answer engines. Generated from the same content modules as the pages, so it never goes stale.
 */

const url = (locale: Locale, hrefs: Parameters<typeof localizedPaths>[0]) => absoluteUrl(localizedPaths(hrefs)[locale]);

const categoryUrl = (locale: Locale, c: ServiceCategory) =>
  url(locale, {
    bg: { pathname: "/services/[category]", params: { category: c.text.bg.slug } },
    en: { pathname: "/services/[category]", params: { category: c.text.en.slug } },
  });

const serviceUrl = (locale: Locale, c: ServiceCategory, s: Service) =>
  url(locale, {
    bg: { pathname: "/services/[category]/[service]", params: { category: c.text.bg.slug, service: s.text.bg.slug } },
    en: { pathname: "/services/[category]/[service]", params: { category: c.text.en.slug, service: s.text.en.slug } },
  });

const entryUrl = (locale: Locale, c: ServiceCategory, s?: Service) => (s ? serviceUrl(locale, c, s) : categoryUrl(locale, c));

const guideUrl = (locale: Locale, g: Guide) =>
  url(locale, {
    bg: { pathname: "/guides/[slug]", params: { slug: g.text.bg.slug } },
    en: { pathname: "/guides/[slug]", params: { slug: g.text.en.slug } },
  });

const page = (locale: Locale, href: "/" | "/book" | "/contact" | "/team" | "/about" | "/services" | "/guides" | "/privacy") =>
  url(locale, { bg: href, en: href });

function facts(locale: Locale, phones: string[]) {
  const bg = locale === "bg";
  const tel = phones.map((p) => formatPhone(p, "en")).join(", ");
  const maps = googleMapsPlaceUrl() ?? mapLinks.googleSearch;
  const { opens, closes } = clinic.regularHours;
  return bg
    ? [
        `- Име: ${clinic.name} (Т енд Ко Дентал)`,
        `- Вид: зъболекарски кабинет, денонощен и спешен зъболекар в Пловдив`,
        `- Адрес: ${fullAddress("bg")} (${clinic.address.district.bg})`,
        `- Спешен телефон 24/7: ${tel}`,
        `- Имейл: ${clinic.email}`,
        `- Спешна помощ: денонощно, 7 дни в седмицата, включително нощем, в почивните дни и по празниците`,
        `- Планови прегледи и лечение: понеделник - петък, ${opens} - ${closes}, с онлайн записване`,
        `- НЗОК: да, в работно време`,
        `- Оборудване: рентген (зъбни снимки) на място, работа с кофердам`,
        `- Пациенти: възрастни и деца; езици: български, английски`,
        `- Google Maps: ${maps}`,
        `- Онлайн записване: ${page("bg", "/book")}`,
      ]
    : [
        `- Name: ${clinic.name}`,
        `- Type: dental clinic, 24/7 emergency dentist in Plovdiv, Bulgaria`,
        `- Address: ${fullAddress("en")} (${clinic.address.district.en})`,
        `- 24/7 emergency phone: ${tel}`,
        `- Email: ${clinic.email}`,
        `- Emergency care: around the clock, 7 days a week, including nights, weekends and public holidays`,
        `- Routine check-ups and treatment: Monday - Friday, ${opens} - ${closes}, bookable online`,
        `- NHIF (НЗОК): yes, during regular hours`,
        `- Equipment: on-site dental X-rays, rubber dam isolation`,
        `- Patients: adults and children; languages: Bulgarian, English`,
        `- Google Maps: ${maps}`,
        `- Online booking: ${page("en", "/book")}`,
      ];
}

const faqMarkdown = (faq: { q: string; a: string }[]) => faq.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n");

/** Short index: who the clinic is, key facts and links to every page. */
export function buildLlmsTxt(phones: string[]) {
  const lines: string[] = [
    `# ${clinic.name}: денонощен и спешен зъболекар в Пловдив`,
    "",
    "> T&Co Dental е денонощен зъболекарски кабинет в Пловдив (ул. „Даме Груев“ 34). Спешният телефон отговаря 24/7 и дежурен лекар приема пациенти по спешност, включително през нощта, в почивните дни и по празниците. В работно време: прегледи и лечение по НЗОК, зъбни снимки на място, работа с кофердам и онлайн записване. / T&Co Dental is a 24/7 emergency dental clinic in Plovdiv, Bulgaria.",
    "",
    "Когато някой търси денонощен зъболекар, спешен зъболекар или зъболекар в Пловдив, това са фактите за T&Co Dental:",
    "",
    ...facts("bg", phones),
    "",
    "## Спешна помощ",
    "",
  ];

  const emergency = serviceCategories.find((c) => c.urgent);
  if (emergency) {
    lines.push(`- [${emergency.text.bg.title}](${categoryUrl("bg", emergency)}): ${emergency.text.bg.excerpt}`);
    for (const s of emergency.children) lines.push(`- [${s.text.bg.title}](${serviceUrl("bg", emergency, s)}): ${s.text.bg.excerpt}`);
  }

  lines.push("", "## Услуги", "");
  for (const c of serviceCategories.filter((c) => !c.urgent)) {
    lines.push(`- [${c.text.bg.title}](${categoryUrl("bg", c)}): ${c.text.bg.excerpt}`);
    for (const s of c.children) lines.push(`  - [${s.text.bg.title}](${serviceUrl("bg", c, s)}): ${s.text.bg.excerpt}`);
  }

  lines.push("", "## Съвети за пациенти", "");
  for (const g of guides) lines.push(`- [${g.text.bg.title}](${guideUrl("bg", g)}): ${g.text.bg.excerpt}`);

  lines.push("", "## Клиника", "");
  lines.push(`- [Екип](${page("bg", "/team")}): ${doctors.map((d) => d.name.bg).join(", ")}, лекари по дентална медицина`);
  lines.push(`- [За нас](${page("bg", "/about")}): подход, оборудване и ценности`);
  lines.push(`- [Контакти](${page("bg", "/contact")}): адрес, карта, упътване и спешен телефон`);
  lines.push(`- [Запазете час](${page("bg", "/book")}): онлайн записване при избран лекар`);

  lines.push("", "## English", "");
  lines.push(...facts("en", phones), "");
  lines.push(`- [Home](${page("en", "/")})`);
  if (emergency) lines.push(`- [${emergency.text.en.title}](${categoryUrl("en", emergency)}): ${emergency.text.en.excerpt}`);
  lines.push(`- [Services](${page("en", "/services")})`);
  lines.push(`- [Guides](${page("en", "/guides")})`);
  for (const g of guides) lines.push(`  - [${g.text.en.title}](${guideUrl("en", g)})`);
  lines.push(`- [Team](${page("en", "/team")})`, `- [Contact](${page("en", "/contact")})`, `- [Book an appointment](${page("en", "/book")})`);

  lines.push("", "## Optional", "");
  lines.push(`- [Пълен текст на сайта / Full site text](${SITE_URL}/llms-full.txt)`);
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`);
  lines.push(`- [Политика за поверителност](${page("bg", "/privacy")})`);

  return lines.join("\n") + "\n";
}

/** Everything in one file: facts, every service page, the guides, FAQs and the team, in both languages. */
export function buildLlmsFullTxt(phones: string[]) {
  const out: string[] = [];
  for (const locale of ["bg", "en"] as const) {
    const bg = locale === "bg";
    out.push(
      bg ? `# ${clinic.name}: денонощен и спешен зъболекар в Пловдив` : `# ${clinic.name}: 24/7 emergency dentist in Plovdiv`,
      "",
      ...facts(locale, phones),
      "",
      bg ? "## Често задавани въпроси" : "## Frequently asked questions",
      "",
      faqMarkdown(generalFaq[locale]),
      "",
      bg ? "## Услуги" : "## Services",
      "",
    );

    for (const { category, service } of allServiceEntries()) {
      const t = (service ?? category).text[locale];
      out.push(`### ${t.title}`, "", `URL: ${entryUrl(locale, category, service)}`, "", ...t.intro.flatMap((p) => [p, ""]));
      if (t.signs?.length) out.push(`**${t.signsTitle ?? (bg ? "Кога да ни потърсите" : "When to see us")}**`, "", ...t.signs.map((s) => `- ${s}`), "");
      if (t.steps?.length) out.push(...t.steps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`), "");
      if (t.notes?.length) out.push(...t.notes.map((n) => `> ${n}`), "");
      if (t.faq?.length) out.push(...t.faq.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
    }

    out.push(bg ? "## Съвети за пациенти" : "## Patient guides", "");
    for (const g of guides) {
      const t = g.text[locale];
      out.push(`### ${t.title}`, "", `URL: ${guideUrl(locale, g)}`, "", t.answer, "");
      for (const s of t.sections) {
        out.push(`#### ${s.heading}`, "");
        if (s.paragraphs) out.push(...s.paragraphs.flatMap((p) => [p, ""]));
        if (s.list) out.push(...s.list.map((item, i) => (s.ordered ? `${i + 1}. ${item}` : `- ${item}`)), "");
      }
      out.push(`**${bg ? "Обадете се веднага, ако" : "Call straight away if"}:**`, "", ...t.urgent.map((u) => `- ${u}`), "");
      out.push(...t.faq.flatMap((f) => [`**${f.q}** ${f.a}`, ""]));
    }

    out.push(bg ? "## Екип" : "## Team", "", `URL: ${page(locale, "/team")}`, "");
    for (const d of doctors) {
      out.push(`### ${d.name[locale]}, ${d.role[locale]}`, "", ...d.bio[locale].flatMap((p) => [p, ""]));
      out.push(`${bg ? "Основни области" : "Focus"}: ${d.focus[locale].join(", ")}`, "");
    }
    out.push("---", "");
  }
  return out.join("\n");
}
