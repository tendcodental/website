import { ArrowUpRight, BadgeCheck, Check, Info, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ServiceArt } from "@/components/art/service-art";
import { BookButton } from "@/components/shared/book-button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { FaqList } from "@/components/shared/faq-list";
import { JsonLd, PulseDot } from "@/components/shared/primitives";
import { type Service, type ServiceCategory, serviceCategories } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths } from "@/lib/seo";
import { CategoryCard } from "./service-card";

const categoryHref = (slug: string) => ({ pathname: "/services/[category]" as const, params: { category: slug } });
const serviceHref = (category: string, service: string) => ({
  pathname: "/services/[category]/[service]" as const,
  params: { category, service },
});

/** One template for every service page, categories and individual services alike. */
export async function ServicePage({
  locale,
  category,
  service,
  phones,
}: {
  locale: Locale;
  category: ServiceCategory;
  service?: Service;
  phones: string[];
}) {
  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const te = await getTranslations({ locale, namespace: "emergency" });

  const entry = service ?? category;
  const text = entry.text[locale];
  const cat = category.text[locale];
  const urgent = Boolean(entry.urgent);

  const url = absoluteUrl(
    localizedPaths(
      service
        ? {
            bg: serviceHref(category.text.bg.slug, service.text.bg.slug),
            en: serviceHref(category.text.en.slug, service.text.en.slug),
          }
        : { bg: categoryHref(category.text.bg.slug), en: categoryHref(category.text.en.slug) },
    )[locale],
  );
  const home = absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]);
  const servicesUrl = absoluteUrl(localizedPaths({ bg: "/services", en: "/services" })[locale]);
  const categoryUrl = absoluteUrl(
    localizedPaths({ bg: categoryHref(category.text.bg.slug), en: categoryHref(category.text.en.slug) })[locale],
  );

  const crumbs = [
    { name: tn("home"), href: "/" as const, url: home },
    { name: tn("services"), href: "/services" as const, url: servicesUrl },
    ...(service ? [{ name: cat.navTitle ?? cat.title, href: categoryHref(cat.slug), url: categoryUrl }] : []),
    { name: text.navTitle ?? text.title, url },
  ];

  const siblings = service ? category.children.filter((s) => s.id !== service.id) : category.children;
  const related = serviceCategories.filter((c) => c.id !== category.id).slice(0, 3);

  const schemas: object[] = [
    serviceSchema({ name: text.title, description: text.metaDescription, url, urgent, locale }),
    breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.url }))),
  ];
  if (text.faq?.length) schemas.push(faqSchema(text.faq));

  return (
    <>
      <JsonLd data={schemas} />

      {/* Hero */}
      <section className="bg-marble relative overflow-hidden">
        <div className="container-page grid items-center gap-9 pt-6 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-8 lg:pb-14">
          <div>
            <Breadcrumbs label={tn("breadcrumb")} items={crumbs.map(({ name, href }) => ({ name, href }))} />
            {urgent && (
              <p className="animate-fade-up mt-6 inline-flex items-center gap-2 rounded-full border border-alert/20 bg-white/80 px-3 py-1.5 text-[0.78rem] font-semibold text-alert">
                <PulseDot /> {te("short")}
              </p>
            )}
            <h1 className="animate-fade-up mt-4 text-[2.2rem] leading-[1.06] text-ink [animation-delay:60ms] sm:text-[2.8rem] lg:text-[clamp(2.4rem,1.2vw+2.3vh,3.5rem)]">
              {text.title}
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground [animation-delay:120ms] sm:text-lg">
              {text.excerpt}
            </p>
            <div className="animate-fade-up mt-8 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row">
              {urgent ? (
                <>
                  <a
                    href={`tel:${phones[0]}`}
                    className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-alert px-6 font-semibold text-white shadow-[0_14px_30px_-14px_rgb(216_69_59/0.9)] transition-[filter] hover:brightness-110 sm:h-13"
                  >
                    <Phone className="size-4" aria-hidden="true" /> {formatPhone(phones[0], locale)}
                  </a>
                  <BookButton variant="soft">{tn("bookLong")}</BookButton>
                </>
              ) : (
                <BookButton>{tn("bookLong")}</BookButton>
              )}
            </div>
          </div>
          <div className="animate-rise relative aspect-[4/3] w-full lg:h-[clamp(15rem,calc(100svh-var(--header-total)-10rem),24rem)] lg:w-auto lg:justify-self-center">
            <div className="absolute -inset-3 rounded-[2.4rem] border border-gold/30" aria-hidden="true" />
            <div className="size-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_51_40/0.6)]">
              {entry.thumbnail ? (
                <Image src={entry.thumbnail} alt={text.title} width={768} height={576} className="size-full object-cover" />
              ) : (
                <ServiceArt art={entry.art} label={text.title} className="size-full" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <article className="min-w-0 space-y-14">
            <div className="prose-clinic reveal max-w-3xl space-y-4 text-[1.06rem] leading-[1.75] text-ink/85 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-[0.9] first-letter:text-gold-dark sm:text-[1.1rem]">
              {text.intro.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            {text.signs?.length ? (
              <div className="reveal">
                <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{text.signsTitle ?? t("signs")}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {text.signs.map((s) => (
                    <li key={s} className="flex gap-3 rounded-2xl border border-border bg-white p-4 text-[0.98rem] leading-snug text-ink/85">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-emerald">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {text.notes?.length ? (
              <aside className="reveal rounded-3xl border border-gold/30 bg-gold/[0.07] p-6 sm:p-7">
                <h2 className="flex items-center gap-2 font-sans text-[0.8rem] font-semibold tracking-[0.16em] text-gold-dark uppercase">
                  <Info className="size-4" aria-hidden="true" /> {text.notesTitle ?? t("notes")}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[0.98rem] leading-relaxed text-ink/85">
                  {text.notes.map((n) => (
                    <li key={n} className="flex gap-2.5">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                      {n}
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}

            {!service && category.children.length > 0 && (
              <div className="reveal">
                <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{t("inCategory")}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {category.children.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={serviceHref(cat.slug, s.text[locale].slug)}
                        className="card-lift group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white"
                      >
                        <span className="relative block overflow-hidden">
                          {s.thumbnail ? (
                            <Image
                              src={s.thumbnail}
                              alt={s.text[locale].title}
                              width={768}
                              height={432}
                              className="aspect-[16/9] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                            />
                          ) : (
                            <ServiceArt
                              art={s.art}
                              className="aspect-[16/9] transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                            />
                          )}
                        </span>
                        <span className="flex flex-1 flex-col p-5 sm:p-6">
                          <span className="flex items-start justify-between gap-2 font-display text-[1.3rem] leading-tight font-semibold text-ink group-hover:text-emerald">
                            {s.text[locale].title}
                            <ArrowUpRight className="mt-1 size-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                          </span>
                          <span className="mt-2 block text-[0.92rem] leading-relaxed text-muted-foreground">
                            {s.text[locale].excerpt}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="reveal flex gap-3 rounded-2xl bg-accent p-4 text-[0.95rem] text-emerald">
              <BadgeCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> {t("nzokNote")}
            </p>

            {text.faq?.length ? (
              <div className="reveal">
                <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{t("faq")}</h2>
                <FaqList items={text.faq} className="mt-6" />
              </div>
            ) : null}
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="bg-emerald-glow rounded-3xl p-6 text-ivory">
              <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-gold-light uppercase">
                <PulseDot /> {urgent ? t("urgentTitle") : te("label")}
              </p>
              {urgent && <p className="mt-2 text-[0.92rem] text-emerald-50/80">{t("urgentText")}</p>}
              <div className="mt-4 grid gap-2">
                {phones.map((tel) => (
                  <a key={tel} href={`tel:${tel}`} className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold text-white hover:bg-white/15">
                    {formatPhone(tel, locale)} <Phone className="size-4 text-gold-light" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6">
              <p className="font-display text-2xl font-semibold text-ink">{tn("bookLong")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("ctaText")}</p>
              <BookButton size="xl" className="mt-5 w-full">
                {tn("book")}
              </BookButton>
            </div>
            {service && siblings.length > 0 && (
              <nav aria-label={t("moreIn", { category: cat.navTitle ?? cat.title })} className="rounded-3xl border border-border bg-white p-6">
                <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-gold-dark uppercase">
                  {t("moreIn", { category: cat.navTitle ?? cat.title })}
                </p>
                <ul className="mt-3 space-y-1">
                  <li>
                    <Link href={categoryHref(cat.slug)} className="block rounded-lg py-1.5 text-[0.95rem] font-semibold text-emerald hover:underline">
                      {category.selfListing?.[locale] ?? cat.title}
                    </Link>
                  </li>
                  {siblings.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={serviceHref(cat.slug, s.text[locale].slug)}
                        className="block rounded-lg py-1.5 text-[0.95rem] text-ink/80 transition-colors hover:text-emerald"
                      >
                        {s.text[locale].navTitle ?? s.text[locale].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>
        </div>
      </section>

      {/* Related categories */}
      <section className="bg-sand/60 section-sm">
        <div className="container-page">
          <h2 className="reveal text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{t("related")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((c) => (
              <CategoryCard key={c.id} category={c} locale={locale} readMore={tc("readMore")} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}
