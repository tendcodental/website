import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { PulseDot, SectionHeading } from "@/components/shared/primitives";
import { SocialLinks } from "@/components/shared/social-links";
import { clinic, fullAddress, mapLinks } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { ClinicMap } from "./clinic-map";
import { ContactForm } from "./contact-form";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3.5 p-4 sm:p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-emerald">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">{label}</p>
        <div className="mt-0.5 text-[0.98rem] text-ink">{children}</div>
      </div>
    </li>
  );
}

export async function ContactDetails({ locale, phones }: { locale: Locale; phones: string[] }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const te = await getTranslations({ locale, namespace: "emergency" });

  return (
    <div className="space-y-4">
      <div className="bg-emerald-glow rounded-3xl p-5 text-ivory sm:p-6">
        <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.16em] text-gold-light uppercase">
          <PulseDot /> {te("label")}
        </p>
        <div className="mt-2.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {phones.map((tel) => (
            <a
              key={tel}
              href={`tel:${tel}`}
              className="inline-flex items-center gap-2.5 text-[1.45rem] font-semibold tracking-wide text-white hover:text-gold-light"
            >
              <Phone className="size-5 text-gold-light" aria-hidden="true" />
              {formatPhone(tel, locale)}
            </a>
          ))}
        </div>
        <p className="mt-1.5 text-sm text-emerald-50/70">{te("badge")}</p>
      </div>

      <ul className="divide-y divide-border rounded-3xl border border-border bg-white">
        <Row icon={<MapPin className="size-[1.1rem]" aria-hidden="true" />} label={t("address")}>
          <address className="font-semibold not-italic">
            {clinic.address.street[locale]}, {clinic.address.city[locale]}
          </address>
          <span className="text-sm text-muted-foreground">{clinic.address.district[locale]}</span>
        </Row>
        <Row icon={<Mail className="size-[1.1rem]" aria-hidden="true" />} label={t("email")}>
          <a href={`mailto:${clinic.email}`} className="font-semibold hover:text-emerald">
            {clinic.email}
          </a>
        </Row>
        <Row icon={<Clock className="size-[1.1rem]" aria-hidden="true" />} label={t("hours")}>
          <dl className="space-y-0.5 text-[0.93rem]">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t("weekdays")}</dt>
              <dd className="font-semibold">9:00 - 18:00</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{t("weekend")}</dt>
              <dd className="font-semibold">{t("emergencyOnly")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">{te("short")}</dt>
              <dd className="font-semibold text-alert">{t("allDay")}</dd>
            </div>
          </dl>
        </Row>
      </ul>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pl-1">
        <span className="text-sm text-muted-foreground">{t("followUs")}:</span>
        <SocialLinks />
      </div>
    </div>
  );
}

/** Full-width live map with the address and "open in Google Maps / Waze" buttons. */
export async function MapBand({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "common" });
  return (
    <div className="relative">
      <ClinicMap className="h-[clamp(20rem,55vh,30rem)] w-full" />
      <div className="container-page relative z-10 -mt-8 pb-8 lg:pointer-events-none lg:pb-0 lg:absolute lg:inset-x-0 lg:bottom-6 lg:mt-0">
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/95 p-4 shadow-[0_20px_40px_-24px_rgb(15_51_40/0.45)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between lg:pointer-events-auto lg:max-w-xl">
          <p className="flex items-start gap-2.5 text-[0.95rem] font-semibold text-ink">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-dark" aria-hidden="true" />
            {fullAddress(locale)}
          </p>
          <div className="flex shrink-0 gap-2">
            <a
              href={mapLinks.googleDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-semibold text-white hover:bg-emerald-deep sm:flex-none"
            >
              <Navigation className="size-4" aria-hidden="true" /> {t("openInMaps")}
            </a>
            <a
              href={mapLinks.waze}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink hover:border-gold"
            >
              {t("waze")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function ContactSection({
  locale,
  phones,
  headingAs = "h2",
}: {
  locale: Locale;
  phones: string[];
  headingAs?: "h1" | "h2";
}) {
  const t = await getTranslations({ locale, namespace: "contact" });
  return (
    <section aria-labelledby="contact-title" className="pt-[clamp(3rem,8vh,6rem)]">
      <div className="container-page">
        <SectionHeading id="contact-title" as={headingAs} title={t("title")} lead={t("lead")} />
        {/* Contact details and the form share one row; the map spans the full width underneath. */}
        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="reveal">
            <ContactDetails locale={locale} phones={phones} />
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="mt-[clamp(2.5rem,7vh,4.5rem)]">
        <MapBand locale={locale} />
      </div>
    </section>
  );
}
