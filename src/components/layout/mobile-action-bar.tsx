"use client";

import { MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSite } from "@/components/providers/site-provider";
import { PulseDot } from "@/components/shared/primitives";
import { clinic, mapLinks } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

/**
 * Thumb-reachable bar on phones: the 24/7 emergency number(s) and the address, always in view.
 * Booking lives in the sticky header, so it isn't repeated here.
 */
export function MobileActionBar() {
  const t = useTranslations("emergency");
  const locale = useLocale() as Locale;
  const { phones, bookingOpen } = useSite();
  const two = phones.length > 1;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-emerald-50/10 bg-emerald-night/95 text-ivory backdrop-blur-lg transition-transform duration-500 lg:hidden",
        bookingOpen && "translate-y-full",
      )}
    >
      <div className="safe-bottom px-3 pt-2 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex shrink-0 items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.12em] text-gold-light uppercase">
            <PulseDot className="size-1.5" /> {t("bar")}
          </span>
          <span className="flex min-w-0 flex-1 justify-end gap-2">
            {phones.slice(0, 2).map((tel) => (
              <a
                key={tel}
                href={`tel:${tel}`}
                className="flex h-9 min-w-0 items-center gap-2 rounded-full bg-white/10 pr-3 pl-1.5 transition-colors active:bg-white/20"
                aria-label={t("callNumber", { number: formatPhone(tel, locale) })}
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-alert/90">
                  <Phone className="size-3" aria-hidden="true" />
                </span>
                <span className={cn("truncate font-semibold tracking-wide", two ? "text-[0.78rem]" : "text-[0.92rem]")}>
                  {formatPhone(tel, locale)}
                </span>
              </a>
            ))}
          </span>
        </div>
        <a
          href={mapLinks.googleSearch}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 flex items-center gap-1.5 text-[0.76rem] text-emerald-50/75"
        >
          <MapPin className="size-3.5 shrink-0 text-gold-light" aria-hidden="true" />
          <span className="truncate">
            {clinic.address.street[locale]}, {clinic.address.city[locale]}
          </span>
        </a>
      </div>
    </div>
  );
}
