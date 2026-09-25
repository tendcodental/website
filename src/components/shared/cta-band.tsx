import { Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { BookButton } from "./book-button";

export async function CtaBand({ locale, phones }: { locale: Locale; phones: string[] }) {
  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  return (
    <section className="section-sm">
      <div className="container-page">
        <div className="bg-emerald-glow reveal-scale relative overflow-hidden rounded-[2rem] px-6 py-10 text-center text-ivory sm:px-12 sm:py-12">
          <div className="hairline absolute inset-x-10 top-0" />
          <h2 className="display-lg mx-auto max-w-2xl text-ivory">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50/75 sm:text-[1.06rem]">{t("ctaText")}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <BookButton>{tn("bookLong")}</BookButton>
            <a
              href={`tel:${phones[0]}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 font-semibold text-white transition-colors hover:bg-white/10 sm:h-13"
            >
              <Phone className="size-4" aria-hidden="true" /> {formatPhone(phones[0], locale)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
