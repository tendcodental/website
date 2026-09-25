"use client";

import { AlertCircle, ArrowRight, CalendarClock, Phone, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useSite } from "@/components/providers/site-provider";
import { doctorById, doctors } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { CLINIC_TZ, clinicDate } from "@/lib/booking/time";
import type { AvailabilityResponse, BookingSuccess, DoctorChoice } from "@/lib/booking/types";
import { formatPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { BookingDetails, type DetailsForm, emptyDetails } from "./booking-details";
import { BookingDone } from "./booking-done";
import { DoctorAvatar } from "./doctor-avatar";
import { MonthCalendar, shiftMonth } from "./month-calendar";

type Step = "pick" | "details" | "done";
type Availability =
  | { status: "loading"; data?: AvailabilityResponse }
  | { status: "ready"; data: AvailabilityResponse }
  | { status: "error"; code: string };
type Entry = { status: "ready"; data: AvailabilityResponse } | { status: "error"; code: string };

export interface BookingWidgetProps {
  variant?: "section" | "dialog";
  initialDoctor?: DoctorChoice;
  /** Changes whenever another part of the page asks to preselect a doctor. */
  doctorRequest?: { doctor?: DoctorChoice; nonce: number };
}

const noopSubscribe = () => () => {};
// "Today" and the visitor's timezone only exist in the browser; on the server (and in cached HTML)
// these return null/false, so the static page stays identical for everyone and hydrates cleanly.
const readClinicMonth = () => clinicDate().slice(0, 7);
const readForeignTz = () => Intl.DateTimeFormat().resolvedOptions().timeZone !== CLINIC_TZ;

export function BookingWidget({ variant = "section", initialDoctor, doctorRequest }: BookingWidgetProps) {
  const t = useTranslations("booking");
  const locale = useLocale() as Locale;
  const { phones } = useSite();
  const root = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);
  const autoAdvanced = useRef(false);

  const clientMonth = useSyncExternalStore(noopSubscribe, readClinicMonth, () => null);
  const foreignTz = useSyncExternalStore(noopSubscribe, readForeignTz, () => false);

  const [doctor, setDoctor] = useState<DoctorChoice>(initialDoctor ?? "any");
  const [monthChoice, setMonthChoice] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [entries, setEntries] = useState<Record<string, Entry>>({});
  const [lastData, setLastData] = useState<AvailabilityResponse>();
  const [picked, setPicked] = useState<{ date: string | null; time: string | null }>({ date: null, time: null });
  const [chosen, setChosen] = useState<{ date: string; time: string } | null>(null);
  const [step, setStep] = useState<Step>("pick");
  const [direction, setDirection] = useState<"fwd" | "back">("fwd");
  const [form, setForm] = useState<DetailsForm>(emptyDetails);
  const [banner, setBanner] = useState<string | null>(null);
  const [result, setResult] = useState<BookingSuccess["booking"]>(null);
  const [seenRequest, setSeenRequest] = useState(0);

  // Another part of the page asked to book with a specific doctor: reset to the first step.
  if (doctorRequest && doctorRequest.nonce !== seenRequest) {
    setSeenRequest(doctorRequest.nonce);
    if (doctorRequest.doctor) setDoctor(doctorRequest.doctor);
    setStep("pick");
    setBanner(null);
  }

  const month = monthChoice ?? clientMonth;
  const key = month ? `${doctor}|${month}|${refresh}` : null;
  const entry = key ? entries[key] : undefined;
  const availability: Availability =
    entry ?? { status: "loading", data: lastData };

  useEffect(() => {
    mountedAt.current = Date.now();
    // Coming back to the tab after a while: fetch fresh availability.
    const onVisible = () => document.visibilityState === "visible" && setRefresh((n) => n + 1);
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  // Load availability for the visible month (results are kept per doctor/month/refresh).
  useEffect(() => {
    if (!key || !month || entries[key]) return;
    const controller = new AbortController();
    fetch(`/api/booking/availability?${new URLSearchParams({ month, doctor, locale })}`, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.ok) throw new Error(json.code ?? "UNAVAILABLE");
        return json as AvailabilityResponse;
      })
      .then((data) => {
        setEntries((all) => ({ ...all, [key]: { status: "ready", data } }));
        setLastData(data);
        // Nothing free this month (e.g. the last days of the month)? Jump to the next one once.
        const hasSlots = Object.keys(data.days).some((d) => d.startsWith(month));
        if (!hasSlots && !autoAdvanced.current && month < data.lastDate.slice(0, 7)) {
          autoAdvanced.current = true;
          setMonthChoice(shiftMonth(month, 1));
        }
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setEntries((all) => ({ ...all, [key]: { status: "error", code: error.message } }));
      });
    return () => controller.abort();
  }, [key, month, doctor, locale, entries]);

  const scrollToTop = useCallback(() => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.6) {
      if (variant === "section") el.scrollIntoView({ behavior: "smooth", block: "start" });
      else el.closest("[data-booking-scroll]")?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [variant]);

  const go = useCallback(
    (next: Step, dir: "fwd" | "back" = "fwd") => {
      setDirection(dir);
      setStep(next);
      requestAnimationFrame(scrollToTop);
    },
    [scrollToTop],
  );

  const data = availability.status === "ready" || availability.status === "loading" ? availability.data : undefined;
  const ready = availability.status === "ready";

  // The selected day is derived: the visitor's pick if it still has free times, otherwise the first
  // free day of the visible month, so times are visible immediately, and never stale.
  const date = useMemo(() => {
    if (!month || !data) return null;
    if (picked.date?.startsWith(month) && data.days[picked.date]?.length) return picked.date;
    if (!ready) return picked.date?.startsWith(month) ? picked.date : null;
    return Object.keys(data.days).filter((d) => d.startsWith(month)).sort()[0] ?? null;
  }, [month, data, picked.date, ready]);
  const slots = (date && data?.days[date]) || [];
  const time = picked.time && picked.date === date && slots.includes(picked.time) ? picked.time : null;

  const intlLocale = locale === "bg" ? "bg-BG" : "en-GB";
  const formatLong = useCallback(
    (d: string | null) => {
      if (!d) return "";
      const [y, m, day] = d.split("-").map(Number);
      const s = new Intl.DateTimeFormat(intlLocale, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(
        new Date(Date.UTC(y, m - 1, day)),
      );
      return s.charAt(0).toUpperCase() + s.slice(1);
    },
    [intlLocale],
  );

  function chooseDoctor(next: DoctorChoice) {
    if (next === doctor) return;
    setDoctor(next);
    setPicked((p) => ({ date: p.date, time: null }));
    setBanner(null);
    autoAdvanced.current = false;
  }

  function handleBookingError(code: string) {
    if (code === "SLOT_TAKEN") {
      setPicked((p) => ({ date: p.date, time: null }));
      setRefresh((n) => n + 1);
      setBanner(t("errors.SLOT_TAKEN"));
      go("pick", "back");
      return;
    }
    const known = ["DUPLICATE", "RATE_LIMITED", "TOO_FAST", "CAPTCHA", "UNAVAILABLE", "OUT_OF_RANGE"];
    setBanner(known.includes(code) ? t(`errors.${code}`) : t("errors.generic"));
  }

  const selectedDoctor = doctor === "any" ? null : doctorById(doctor);
  const doctorOptions: Array<{ id: DoctorChoice; title: string; subtitle: string }> = [
    ...doctors.map((d) => ({ id: d.id as DoctorChoice, title: d.shortName[locale], subtitle: d.role[locale] })),
    { id: "any", title: t("anyDoctor"), subtitle: t("anyDoctorHint") },
  ];
  const stepIndex = { pick: 0, details: 1, done: 2 }[step];

  return (
    <div
      ref={root}
      className={cn(
        "scroll-mt-28 overflow-hidden bg-white text-ink",
        variant === "section" && "rounded-[1.75rem] border border-border shadow-[0_40px_80px_-40px_rgb(15_51_40/0.35)] sm:rounded-[2rem]",
      )}
    >
      <div className="grid lg:grid-cols-[17.5rem_1fr]">
        {/* Sidebar: doctor + appointment facts */}
        <aside className="border-b border-border bg-ivory/70 p-4 sm:p-6 lg:border-r lg:border-b-0">
          <p id="doctor-label" className="mb-3 text-[0.72rem] font-semibold tracking-[0.18em] text-gold-dark uppercase">
            {t("doctorLabel")}
          </p>
          <div role="radiogroup" aria-labelledby="doctor-label" className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            {doctorOptions.map((opt) => {
              const active = doctor === opt.id;
              const doc = opt.id === "any" ? null : doctorById(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  disabled={step !== "pick"}
                  onClick={() => chooseDoctor(opt.id)}
                  className={cn(
                    "group flex flex-col items-center gap-2 rounded-2xl border p-2.5 text-center transition-all duration-300 lg:flex-row lg:gap-3 lg:text-left",
                    active
                      ? "border-emerald bg-white shadow-[0_10px_30px_-18px_rgb(30_90_69/0.7)] ring-1 ring-emerald"
                      : "border-border bg-white/60 hover:border-gold/60 hover:bg-white",
                    step !== "pick" && !active && "opacity-50",
                  )}
                >
                  {doc ? (
                    <DoctorAvatar doctor={doc} size={44} />
                  ) : (
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold-gradient text-emerald-night ring-2 ring-white">
                      <Sparkles className="size-5" aria-hidden="true" />
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block text-[0.8rem] leading-tight font-semibold sm:text-[0.9rem]">{opt.title}</span>
                    <span className="mt-0.5 hidden text-[0.75rem] leading-tight text-muted-foreground lg:block">
                      {opt.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 hidden rounded-2xl border border-alert/15 bg-alert/[0.04] p-3.5 lg:block">
            <p className="text-[0.82rem] leading-snug text-ink/80">{t("urgentHint")}</p>
            {phones.map((tel) => (
              <a key={tel} href={`tel:${tel}`} className="mt-2 flex items-center gap-2 font-semibold text-alert">
                <Phone className="size-4" aria-hidden="true" /> {formatPhone(tel, locale)}
              </a>
            ))}
          </div>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 p-4 sm:p-6" data-booking-panel>
          <ol className="mb-5 flex items-center gap-2 text-[0.75rem] font-semibold sm:text-[0.8rem]" aria-label="Progress">
            {[t("stepPick"), t("stepDetails"), t("stepDone")].map((label, i) => (
              <li key={label} className="flex items-center gap-2" aria-current={i === stepIndex ? "step" : undefined}>
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-[0.7rem] transition-colors duration-500",
                    i < stepIndex && "bg-emerald text-white",
                    i === stepIndex && "bg-gold-gradient text-emerald-night",
                    i > stepIndex && "bg-sand text-muted-foreground",
                  )}
                >
                  {i < stepIndex ? "✓" : i + 1}
                </span>
                <span className={cn(i === stepIndex ? "text-ink" : "text-muted-foreground", i !== stepIndex && "hidden sm:inline")}>
                  {label}
                </span>
                {i < 2 && <span className="mx-1 h-px w-5 bg-border sm:w-8" aria-hidden="true" />}
              </li>
            ))}
          </ol>

          {banner && (
            <div role="alert" className="animate-fade-up mb-5 flex gap-3 rounded-2xl border border-alert/20 bg-alert/[0.06] p-4 text-[0.92rem] text-ink">
              <AlertCircle className="mt-0.5 size-5 shrink-0 text-alert" aria-hidden="true" />
              <p>{banner}</p>
            </div>
          )}

          <div key={step} className={direction === "fwd" ? "animate-step-in" : "animate-step-back"}>
            {step === "pick" && (
              <PickStep
                month={month}
                availability={availability}
                data={data}
                date={date}
                time={time}
                slots={slots}
                longDate={formatLong(date)}
                locale={locale}
                foreignTz={foreignTz}
                onRetry={() => setRefresh((n) => n + 1)}
                onSelectDate={(d) => setPicked({ date: d, time: null })}
                onMonthChange={(m) => setMonthChoice(m)}
                onSelectTime={(s) => setPicked({ date, time: s })}
                onContinue={() => {
                  if (!date || !time) return;
                  setChosen({ date, time });
                  setBanner(null);
                  go("details");
                }}
              />
            )}

            {step === "details" && chosen && (
              <BookingDetails
                doctor={doctor}
                selectedDoctor={selectedDoctor ?? null}
                date={chosen.date}
                time={chosen.time}
                longDate={formatLong(chosen.date)}
                form={form}
                setForm={setForm}
                elapsed={() => Date.now() - mountedAt.current}
                onBack={() => go("pick", "back")}
                onSuccess={(booking) => {
                  setRefresh((n) => n + 1);
                  setResult(booking);
                  setBanner(null);
                  go("done");
                }}
                onError={handleBookingError}
              />
            )}

            {step === "done" && (
              <BookingDone
                result={result}
                emailGiven={Boolean(form.email)}
                onReset={() => {
                  setForm(emptyDetails);
                  setPicked({ date: null, time: null });
                  setResult(null);
                  go("pick", "back");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PickStep({
  month,
  availability,
  data,
  date,
  time,
  slots,
  longDate,
  locale,
  foreignTz,
  onRetry,
  onSelectDate,
  onMonthChange,
  onSelectTime,
  onContinue,
}: {
  month: string | null;
  availability: Availability;
  data?: AvailabilityResponse;
  date: string | null;
  time: string | null;
  slots: string[];
  longDate: string;
  locale: Locale;
  foreignTz: boolean;
  onRetry: () => void;
  onSelectDate: (date: string) => void;
  onMonthChange: (month: string) => void;
  onSelectTime: (time: string) => void;
  onContinue: () => void;
}) {
  const t = useTranslations("booking");
  const { phones } = useSite();
  const continueRef = useRef<HTMLButtonElement>(null);

  if (availability.status === "error") {
    return (
      <div className="grid place-items-center gap-4 rounded-2xl border border-dashed border-border p-8 text-center">
        <CalendarClock className="size-8 text-gold-dark" aria-hidden="true" />
        <p className="max-w-sm text-[0.95rem] text-muted-foreground">
          {availability.code === "RATE_LIMITED" ? t("errors.RATE_LIMITED") : t("errors.UNAVAILABLE")}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {phones.map((tel) => (
            <a
              key={tel}
              href={`tel:${tel}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-emerald px-5 text-sm font-semibold text-white hover:bg-emerald-deep"
            >
              <Phone className="size-4" aria-hidden="true" /> {formatPhone(tel, locale)}
            </a>
          ))}
        </div>
        <button type="button" onClick={onRetry} className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-gold">
          {t("retry")}
        </button>
      </div>
    );
  }

  if (!month || !data) {
    return (
      <div className="grid gap-8 md:grid-cols-[1fr_13rem]" aria-busy="true" aria-label={t("selectDate")}>
        <div>
          <div className="mb-4 h-8 w-44 animate-pulse rounded-lg bg-sand" />
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => (
              <div key={i} className="mx-auto size-10 animate-pulse rounded-full bg-sand/70 min-[380px]:size-11 sm:size-12" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 content-start gap-2 md:grid-cols-1">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-xl bg-sand/70" />
          ))}
        </div>
      </div>
    );
  }

  const monthHasSlots = Object.keys(data.days).some((d) => d.startsWith(month));

  return (
    <div className="grid gap-7 md:grid-cols-[minmax(18rem,30rem)_minmax(10rem,14rem)] md:justify-center md:gap-6">
      <div>
        {data.demo && (
          <p className="mb-3 inline-flex rounded-full bg-gold/15 px-3 py-1 text-[0.72rem] font-semibold text-gold-dark">
            {t("demo")}
          </p>
        )}
        <MonthCalendar
          month={month}
          locale={locale}
          today={data.today}
          lastDate={data.lastDate}
          days={data.days}
          holidays={data.holidays}
          selected={date}
          loading={availability.status === "loading"}
          onSelect={onSelectDate}
          onMonthChange={onMonthChange}
        />
        {!monthHasSlots && availability.status === "ready" && (
          <p className="mt-4 text-center text-sm text-muted-foreground">{t("noSlotsMonth")}</p>
        )}
        {foreignTz && <p className="mt-4 text-[0.78rem] text-muted-foreground">{t("timezoneNote")}</p>}
      </div>

      <div className="min-w-0">
        <p className="mb-3 min-h-6 text-[0.95rem] font-semibold text-ink" aria-live="polite">
          {date ? longDate : t("selectTime")}
        </p>
        {!date ? (
          <p className="text-sm text-muted-foreground">{t("pickDayFirst")}</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noSlotsDay")}</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 md:max-h-[22rem] md:grid-cols-1 md:overflow-y-auto md:pr-1" role="group" aria-label={t("selectTime")}>
            {slots.map((s, i) => {
              const active = s === time;
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    onSelectTime(s);
                    requestAnimationFrame(() => continueRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
                  }}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className={cn(
                    "animate-fade-up h-12 rounded-xl border text-[0.98rem] font-semibold tabular-nums transition-all duration-300",
                    active
                      ? "border-emerald bg-emerald text-white shadow-[0_10px_24px_-12px_rgb(30_90_69/0.9)]"
                      : "border-emerald/25 text-emerald hover:border-emerald hover:bg-accent",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        )}
        <button
          ref={continueRef}
          type="button"
          disabled={!time}
          onClick={onContinue}
          className={cn(
            "mt-4 flex h-12 w-full scroll-mb-6 items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold transition-all duration-500",
            time
              ? "bg-gold-gradient text-emerald-night shadow-[0_12px_30px_-14px_rgb(168_124_46/0.9)]"
              : "pointer-events-none bg-sand text-muted-foreground opacity-0",
          )}
        >
          {time ? t("continueWith", { time }) : t("continue")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
