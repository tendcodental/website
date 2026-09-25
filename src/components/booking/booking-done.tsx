"use client";

import { CalendarPlus, Download, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { reasonById } from "@/content/booking";
import { fullAddress } from "@/content/clinic";
import { doctorById } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { buildIcs, googleCalendarLink } from "@/lib/booking/ics";
import { addMinutesToTime } from "@/lib/booking/time";
import type { BookingSuccess } from "@/lib/booking/types";
import { DoctorAvatar } from "./doctor-avatar";

export function BookingDone({
  result,
  emailGiven,
  onReset,
}: {
  result: BookingSuccess["booking"];
  emailGiven: boolean;
  onReset: () => void;
}) {
  const t = useTranslations("booking");
  const locale = useLocale() as Locale;
  const doctor = result ? doctorById(result.doctorId) : undefined;

  const longDate = useMemo(() => {
    if (!result) return "";
    const [y, m, d] = result.date.split("-").map(Number);
    const s = new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d)));
    return s.charAt(0).toUpperCase() + s.slice(1);
  }, [result, locale]);

  const calendar = useMemo(() => {
    if (!result || !doctor) return null;
    const title = t("calendarTitle", { doctor: doctor.shortName[locale] });
    const description = `${reasonById(result.reasonId)?.label[locale] ?? ""}\n${t("doneCall", { phone: doctor.phone.display })}`;
    const location = fullAddress(locale);
    return {
      google: googleCalendarLink({ start: result.start, end: result.end, title, description, location }),
      ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(buildIcs({ uid: `${result.start}-${doctor.id}`, start: result.start, end: result.end, title, description, location }))}`,
    };
  }, [result, doctor, locale, t]);


  return (
    <div className="grid place-items-center py-4 text-center sm:py-8">
      <svg viewBox="0 0 52 52" className="size-20" aria-hidden="true">
        <circle cx="26" cy="26" r="24" fill="none" stroke="#e6dfd2" strokeWidth="2" />
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="#1e5a45"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="151"
          strokeDashoffset="151"
          transform="rotate(-90 26 26)"
          style={{ animation: "draw 0.9s var(--ease-out-expo) forwards" }}
        />
        <path
          d="M16 27l7 7 13-15"
          fill="none"
          stroke="#c29b4a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40"
          strokeDashoffset="40"
          style={{ animation: "draw 0.5s 0.6s var(--ease-out-expo) forwards" }}
        />
        <style>{"@keyframes draw{to{stroke-dashoffset:0}}"}</style>
      </svg>

      <h3 className="mt-5 text-3xl text-ink sm:text-4xl" role="status">
        {t("doneTitle")}
      </h3>
      <p className="mt-2 max-w-md text-muted-foreground">{t("doneText")}</p>

      {result && doctor && (
        <div className="mt-6 flex w-full max-w-md items-center gap-4 rounded-2xl border border-border bg-ivory/70 p-4 text-left">
          <DoctorAvatar doctor={doctor} size={52} />
          <div className="min-w-0">
            <p className="font-semibold text-ink">{doctor.name[locale]}</p>
            <p className="text-[0.92rem] text-muted-foreground">
              {longDate} · <span className="font-semibold text-emerald tabular-nums">{result.time} - {addMinutesToTime(result.time, 60)}</span>
            </p>
            <p className="text-[0.85rem] text-muted-foreground">{fullAddress(locale)}</p>
          </div>
        </div>
      )}

      {emailGiven && result?.emailSent && <p className="mt-4 text-sm text-emerald">{t("doneEmail")}</p>}

      {calendar && (
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={calendar.google}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald px-5 text-sm font-semibold text-white hover:bg-emerald-deep"
          >
            <CalendarPlus className="size-4" aria-hidden="true" /> {t("addGoogle")}
          </a>
          {calendar.ics && (
            <a
              href={calendar.ics}
              download="tandco-dental.ics"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-ink hover:border-gold"
            >
              <Download className="size-4" aria-hidden="true" /> {t("addIcs")}
            </a>
          )}
        </div>
      )}

      {doctor && (
        <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="size-4 text-gold-dark" aria-hidden="true" />
          <span>
            {t("changeLabel")}{" "}
            <a href={`tel:${doctor.phone.tel}`} className="font-semibold text-emerald">
              {doctor.phone.display}
            </a>
          </span>
        </p>
      )}

      <button type="button" onClick={onReset} className="mt-6 text-sm font-semibold text-gold-dark underline underline-offset-4 hover:text-emerald">
        {t("bookAnother")}
      </button>
    </div>
  );
}
