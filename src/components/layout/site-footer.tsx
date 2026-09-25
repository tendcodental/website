import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/logo";
import { PulseDot } from "@/components/shared/primitives";
import { FacebookIcon, InstagramIcon } from "@/components/shared/social-links";
import { clinic, fullAddress, mapLinks } from "@/content/clinic";
import { serviceCategories } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";

export async function SiteFooter({ locale, phones }: { locale: Locale; phones: string[] }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const te = await getTranslations({ locale, namespace: "emergency" });

  return (
    <footer className="bg-emerald-glow relative overflow-hidden text-emerald-50/80">
      <div className="hairline absolute inset-x-0 top-0" />
      <div className="container-page section-sm grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Link href="/" aria-label="T&Co Dental" className="inline-block">
            <Logo size="md" tone="light" />
          </Link>
          <p className="mt-5 text-[0.93rem] leading-relaxed">{t("tagline")}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={clinic.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full bg-[#1877f2] text-white transition-[filter] hover:brightness-110"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-4" />
            </a>
            <a
              href={clinic.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-10 place-items-center rounded-full bg-[linear-gradient(60deg,#f9ce34,#ee2a7b_45%,#6228d7)] text-white transition-[filter] hover:brightness-110"
              aria-label="Instagram"
            >
              <InstagramIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={t("services")}>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">{t("services")}</h2>
          <ul className="mt-5 space-y-2.5 text-[0.93rem]">
            {serviceCategories.map((c) => (
              <li key={c.id}>
                <Link
                  href={{ pathname: "/services/[category]", params: { category: c.text[locale].slug } }}
                  className="transition-colors hover:text-white"
                >
                  {c.text[locale].navTitle ?? c.text[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("clinic")}>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">{t("clinic")}</h2>
          <ul className="mt-5 space-y-2.5 text-[0.93rem]">
            <li><Link href="/about" className="transition-colors hover:text-white">{tn("about")}</Link></li>
            <li><Link href="/team" className="transition-colors hover:text-white">{tn("team")}</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-white">{tn("contact")}</Link></li>
            <li><Link href="/book" className="transition-colors hover:text-white">{tn("bookLong")}</Link></li>
            <li><Link href="/privacy" className="transition-colors hover:text-white">{t("privacy")}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">{t("contacts")}</h2>
          <ul className="mt-5 space-y-4 text-[0.93rem]">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-50">
                  <PulseDot className="size-1.5" /> {te("label")}
                </p>
                {phones.map((tel) => (
                  <a key={tel} href={`tel:${tel}`} className="block text-lg font-semibold text-white hover:text-gold-light">
                    {formatPhone(tel, locale)}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
              <a href={mapLinks.googleSearch} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {fullAddress(locale)}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
              <a href={`mailto:${clinic.email}`} className="hover:text-white">
                {clinic.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold-light" aria-hidden="true" />
              <p>
                {tc("weekdays")}: 9:00 - 18:00
                <br />
                <span className="text-emerald-50/60">{tc("emergencyOnly")}: 24/7</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-emerald-50/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}. {t("rights")}
          </p>
          <p>{te("badge")} · {clinic.address.city[locale]}</p>
        </div>
      </div>
    </footer>
  );
}
