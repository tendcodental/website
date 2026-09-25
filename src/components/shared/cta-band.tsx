import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { BookButton } from "./book-button";
import { DoctorCallLinks } from "./doctor-call-links";

export async function CtaBand({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  return (
    <section className="section-sm">
      <div className="container-page">
        <div className="bg-emerald-glow reveal-scale relative overflow-hidden rounded-[2rem] px-6 py-10 text-center text-ivory sm:px-12 sm:py-12">
          <div className="hairline absolute inset-x-10 top-0" />
          <h2 className="display-lg mx-auto max-w-2xl text-ivory">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50/75 sm:text-[1.06rem]">{t("ctaText")}</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton>{tn("bookLong")}</BookButton>
            <DoctorCallLinks
              locale={locale}
              className="sm:flex-row sm:gap-3"
              linkClassName="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-[0.92rem] font-semibold text-white transition-colors hover:bg-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
