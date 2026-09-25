"use client";

import { CalendarClock, ChevronDown, Clock, Loader2, MapPin, Phone, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type Dispatch, type FormEvent, type SetStateAction, useCallback, useState } from "react";
import { useSite } from "@/components/providers/site-provider";
import { Field, inputClass } from "@/components/shared/form";
import { Turnstile, TURNSTILE_SITE_KEY } from "@/components/shared/turnstile";
import { bookingReasons, reasonById } from "@/content/booking";
import { clinic } from "@/content/clinic";
import type { Doctor } from "@/content/doctors";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { addMinutesToTime } from "@/lib/booking/time";
import type { BookingSuccess, DoctorChoice } from "@/lib/booking/types";
import { formatPhone, normalizePhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { DoctorAvatar } from "./doctor-avatar";

export interface DetailsForm {
  reason: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  nzok: boolean;
  consent: boolean;
  website: string;
}

export const emptyDetails: DetailsForm = {
  reason: "",
  name: "",
  phone: "",
  email: "",
  note: "",
  nzok: false,
  consent: false,
  website: "",
};

type FieldErrors = Partial<Record<"reason" | "name" | "phone" | "email" | "consent", string>>;

export function BookingDetails({
  doctor,
  selectedDoctor,
  date,
  time,
  longDate,
  form,
  setForm,
  elapsed,
  onBack,
  onSuccess,
  onError,
}: {
  doctor: DoctorChoice;
  selectedDoctor: Doctor | null;
  date: string;
  time: string;
  longDate: string;
  form: DetailsForm;
  setForm: Dispatch<SetStateAction<DetailsForm>>;
  /** Milliseconds since the widget appeared (anti-bot timing check). */
  elapsed: () => number;
  onBack: () => void;
  onSuccess: (booking: BookingSuccess["booking"]) => void;
  onError: (code: string) => void;
}) {
  const t = useTranslations("booking");
  const locale = useLocale() as Locale;
  const { phones } = useSite();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | undefined>();
  const onToken = useCallback((v: string | undefined) => setToken(v), []);

  const set = <K extends keyof DetailsForm>(key: K, value: DetailsForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function validate(): FieldErrors {
    const e: FieldErrors = {};
    if (!form.reason) e.reason = t("errors.reason");
    if (form.name.trim().length < 2) e.name = t("errors.name");
    if (!normalizePhone(form.phone)) e.phone = t("errors.phone");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = t("errors.email");
    if (!form.consent) e.consent = t("errors.consent");
    return e;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`bk-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          doctor,
          date,
          time,
          reason: form.reason,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          note: form.note.trim() || undefined,
          nzok: form.nzok,
          consent: form.consent,
          locale,
          website: form.website,
          elapsedMs: elapsed(),
          turnstileToken: token,
        }),
      });
      const json = await res.json().catch(() => ({ ok: false, code: "UNAVAILABLE" }));
      if (json.ok) {
        onSuccess(json.booking);
      } else if (json.code === "INVALID" && Array.isArray(json.issues)) {
        const mapped: FieldErrors = {};
        for (const key of json.issues as string[]) {
          if (key in emptyDetails && key !== "website") mapped[key as keyof FieldErrors] = t(`errors.${key}` as "errors.name");
        }
        setErrors(mapped);
        if (!Object.keys(mapped).length) onError("generic");
      } else {
        onError(json.code ?? "generic");
      }
    } catch {
      onError("UNAVAILABLE");
    } finally {
      setSubmitting(false);
    }
  }

  const reason = reasonById(form.reason);

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      {/* Summary */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-ivory/70 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3.5">
          {selectedDoctor ? (
            <DoctorAvatar doctor={selectedDoctor} size={52} />
          ) : (
            <span className="grid size-[52px] shrink-0 place-items-center rounded-full bg-gold-gradient text-emerald-night">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-gold-dark uppercase">{t("summaryTitle")}</p>
            <p className="font-semibold text-ink">{selectedDoctor ? selectedDoctor.name[locale] : t("anyDoctor")}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarClock className="size-3.5" aria-hidden="true" />
                {longDate}
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-emerald tabular-nums">
                <Clock className="size-3.5" aria-hidden="true" />
                {time} - {addMinutesToTime(time, 60)}
              </span>
              <span className="hidden items-center gap-1.5 sm:inline-flex">
                <MapPin className="size-3.5" aria-hidden="true" />
                {clinic.address.street[locale]}
              </span>
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="self-start rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-gold sm:self-center"
        >
          {t("change")}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="bk-reason" label={t("reason")} error={errors.reason}>
          <div className="relative">
            <select
              id="bk-reason"
              value={form.reason}
              onChange={(e) => set("reason", e.target.value)}
              aria-invalid={Boolean(errors.reason)}
              aria-describedby={errors.reason ? "bk-reason-error" : undefined}
              className={cn(inputClass, "appearance-none pr-10", !form.reason && "text-ink/45")}
            >
              <option value="" disabled>
                {t("reasonPlaceholder")}
              </option>
              {bookingReasons.map((r) => (
                <option key={r.id} value={r.id} className="text-ink">
                  {r.label[locale]}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </Field>
        <Field id="bk-name" label={t("name")} error={errors.name}>
          <input
            id="bk-name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder={t("namePlaceholder")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "bk-name-error" : undefined}
            className={inputClass}
            maxLength={120}
          />
        </Field>
        <Field id="bk-phone" label={t("phone")} error={errors.phone}>
          <input
            id="bk-phone"
            name="tel"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder={t("phonePlaceholder")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "bk-phone-error" : undefined}
            className={inputClass}
            maxLength={30}
          />
        </Field>
        <Field id="bk-email" label={t("email")} optional={t("emailOptional")} hint={t("emailHint")} error={errors.email}>
          <input
            id="bk-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="name@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "bk-email-error" : undefined}
            className={inputClass}
            maxLength={200}
          />
        </Field>
      </div>

      {reason?.urgent && (
        <div className="animate-fade-up rounded-2xl border border-alert/20 bg-alert/[0.05] p-4 text-[0.9rem]">
          <p className="text-ink/85">{t("urgentHint")}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            {phones.map((tel) => (
              <a key={tel} href={`tel:${tel}`} className="inline-flex items-center gap-1.5 font-semibold text-alert">
                <Phone className="size-4" aria-hidden="true" /> {formatPhone(tel, locale)}
              </a>
            ))}
          </div>
        </div>
      )}

      <Field id="bk-note" label={t("note")}>
        <textarea
          id="bk-note"
          value={form.note}
          onChange={(e) => set("note", e.target.value)}
          placeholder={t("notePlaceholder")}
          rows={2}
          maxLength={600}
          className={cn(inputClass, "h-auto min-h-20 resize-y py-3")}
        />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="space-y-3">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink/85">
          <input
            type="checkbox"
            checked={form.nzok}
            onChange={(e) => set("nzok", e.target.checked)}
            className="mt-0.5 size-5 shrink-0 accent-emerald"
          />
          {t("nzok")}
        </label>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink/85">
            <input
              id="bk-consent"
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set("consent", e.target.checked)}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "bk-consent-error" : undefined}
              className="mt-0.5 size-5 shrink-0 accent-emerald"
            />
            <span>
              {t.rich("consent", {
                link: (chunks) => (
                  <Link href="/privacy" target="_blank" className="font-semibold text-emerald underline underline-offset-2">
                    {chunks}
                  </Link>
                ),
              })}
            </span>
          </label>
          {errors.consent && (
            <p id="bk-consent-error" className="mt-1.5 pl-8 text-[0.8rem] font-medium text-alert">
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      {TURNSTILE_SITE_KEY && <Turnstile onToken={onToken} locale={locale} />}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="h-12 rounded-full px-5 text-sm font-semibold text-muted-foreground transition-colors hover:text-ink"
        >
          ← {t("back")}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold-gradient flex h-13 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold text-emerald-night shadow-[0_14px_34px_-14px_rgb(168_124_46/0.9)] transition-[filter,transform] hover:brightness-105 active:scale-[0.99] disabled:opacity-70 sm:min-w-64"
        >
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {submitting ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
