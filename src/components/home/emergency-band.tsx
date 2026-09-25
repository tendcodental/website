import { Activity, ArrowRight, Droplet, HeartPulse, Phone, Siren, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PulseDot } from "@/components/shared/primitives";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";

export async function EmergencyBand({ locale, phones }: { locale: Locale; phones: string[] }) {
  const t = await getTranslations({ locale, namespace: "emergencyBand" });
  const te = await getTranslations({ locale, namespace: "emergency" });
  const items = [
    { icon: Zap, text: t("items.pain") },
    { icon: HeartPulse, text: t("items.swelling") },
    { icon: Activity, text: t("items.broken") },
    { icon: Droplet, text: t("items.bleeding") },
    { icon: Siren, text: t("items.trauma") },
  ];
  const slug = locale === "bg" ? "speshna-stomatologichna-pomosht" : "emergency-dental-care";

  return (
    <section aria-labelledby="emergency-title" className="bg-emerald-glow section relative overflow-hidden text-ivory">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -bottom-10 font-display text-[clamp(10rem,30vh,19rem)] leading-none font-bold text-transparent select-none"
        style={{ WebkitTextStroke: "1px rgb(194 155 74 / 0.22)" }}
      >
        24/7
      </span>
      <div className="container-page relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="reveal">
          <p className="eyebrow text-gold-light">{t("eyebrow")}</p>
          <h2 id="emergency-title" className="display-lg mt-3 text-ivory">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-emerald-50/80 sm:text-[1.06rem]">{t("text")}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {phones.map((tel) => (
              <a
                key={tel}
                href={`tel:${tel}`}
                className="group inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.07] py-3 pr-6 pl-3 backdrop-blur transition-colors hover:bg-white/[0.12]"
              >
                <span className="relative grid size-12 place-items-center rounded-xl bg-alert text-white">
                  <Phone className="size-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1">
                    <PulseDot />
                  </span>
                </span>
                <span>
                  <span className="block text-[0.7rem] font-semibold tracking-[0.16em] text-gold-light uppercase">
                    {te("label")}
                  </span>
                  <span className="block text-xl font-semibold tracking-wide text-white sm:text-2xl">
                    {formatPhone(tel, locale)}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-emerald-50/60">{t("noBooking")}</p>
        </div>

        <div className="reveal rounded-3xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm sm:p-7">
          <h3 className="font-sans text-[0.78rem] font-semibold tracking-[0.18em] text-gold-light uppercase">
            {t("listTitle")}
          </h3>
          <ul className="mt-5 space-y-3">
            {items.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3.5 text-[1.02rem] text-ivory">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-gold-light">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
          <Link
            href={{ pathname: "/services/[category]", params: { category: slug } }}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold-light transition-colors hover:text-white"
          >
            {t("more")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
