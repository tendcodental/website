import { ArrowRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { LogoMark } from "@/components/brand/logo";
import { BookButton } from "@/components/shared/book-button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { formatPhone } from "@/lib/phone";

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations({ locale, namespace: "notFound" });
  const te = await getTranslations({ locale, namespace: "emergency" });
  const { phones } = await getEmergencyPhones();

  return (
    <section className="bg-marble">
      <div className="container-page grid min-h-[70dvh] place-items-center py-20 text-center">
        <div className="max-w-xl">
          <LogoMark className="mx-auto w-20" />
          <p className="mt-8 font-display text-8xl leading-none font-semibold text-gold-gradient">404</p>
          <h1 className="mt-4 text-4xl text-ink sm:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-muted-foreground">{t("text")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald px-6 font-semibold text-white hover:bg-emerald-deep"
            >
              {t("home")}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 font-semibold text-ink hover:border-gold"
            >
              {t("services")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <BookButton size="xl">{t("book")}</BookButton>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            {te("label")}:{" "}
            {phones.map((tel) => (
              <a key={tel} href={`tel:${tel}`} className="ml-1 font-semibold text-alert">
                {formatPhone(tel, locale)}
              </a>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
