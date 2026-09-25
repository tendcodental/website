import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { CategoryCard } from "@/components/services/service-card";
import { BookButton } from "@/components/shared/book-button";
import { DoctorCallLinks } from "@/components/shared/doctor-call-links";
import { SectionHeading } from "@/components/shared/primitives";
import { serviceCategories } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function ServicesSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <section aria-labelledby="services-title" className="section">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" title={t("title")} lead={t("lead")} />
          <Link
            href="/services"
            className="reveal inline-flex items-center gap-2 self-start rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold lg:self-auto"
          >
            {tn("allServices")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {serviceCategories.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              locale={locale}
              featured={i === 0}
              readMore={tc("readMore")}
              className={i === 0 ? "md:col-span-2" : undefined}
            />
          ))}
          <div className="reveal flex flex-col justify-between rounded-3xl bg-emerald-deep p-7 text-ivory">
            <div>
              <h3 className="text-[1.6rem] leading-tight text-ivory">{t("ctaTitle")}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-emerald-50/75">{t("ctaText")}</p>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <BookButton size="xl" className="w-full">
                {tn("bookLong")}
              </BookButton>
              <DoctorCallLinks
                locale={locale}
                linkClassName="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
