"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Field, inputClass } from "@/components/shared/form";
import { Turnstile, TURNSTILE_SITE_KEY } from "@/components/shared/turnstile";
import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message" | "consent", boolean>>;

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [token, setToken] = useState<string | undefined>();
  const onToken = useCallback((v: string | undefined) => setToken(v), []);

  const set = <K extends keyof typeof values>(k: K, v: (typeof values)[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    setErrors((e) => ({ ...e, [k]: false }));
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    const e: Errors = {
      name: values.name.trim().length < 2,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()),
      message: values.message.trim().length < 10,
      consent: !values.consent,
    };
    setErrors(e);
    if (Object.values(e).some(Boolean)) {
      setStatus("idle");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          phone: values.phone.trim() || undefined,
          locale,
          elapsedMs: Date.now() - mountedAt.current,
          turnstileToken: token,
        }),
      });
      const json = await res.json().catch(() => ({}));
      setStatus(json.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="animate-fade-up grid place-items-center gap-4 rounded-3xl border border-border bg-white p-10 text-center">
        <CheckCircle2 className="size-12 text-emerald" aria-hidden="true" />
        <p className="text-lg font-semibold text-ink" role="status">
          {t("sent")}
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", phone: "", message: "", consent: false, website: "" });
            setStatus("idle");
          }}
          className="text-sm font-semibold text-gold-dark underline underline-offset-4"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const invalid = t("errorsInvalid");

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-border bg-white p-5 sm:p-7">
      <h3 className="text-[1.6rem] leading-tight text-ink sm:text-[1.8rem]">{t("formTitle")}</h3>
      <p className="-mt-3 text-sm text-muted-foreground">{t("noteEmergency")}</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Field id="ct-name" label={t("name")} error={errors.name ? invalid : undefined}>
          <input id="ct-name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={errors.name} className={inputClass} maxLength={120} />
        </Field>
        <Field id="ct-email" label={t("email")} error={errors.email ? invalid : undefined}>
          <input id="ct-email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email} className={inputClass} maxLength={200} />
        </Field>
        <Field id="ct-phone" label={t("phone")}>
          <input id="ct-phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} maxLength={30} />
        </Field>
      </div>
      <Field id="ct-message" label={t("message")} error={errors.message ? invalid : undefined}>
        <textarea
          id="ct-message"
          rows={3}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder={t("messagePlaceholder")}
          aria-invalid={errors.message}
          className={cn(inputClass, "h-auto min-h-24 resize-y py-3")}
          maxLength={3000}
        />
      </Field>
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] text-ink/85">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          aria-invalid={errors.consent}
          className="mt-0.5 size-5 shrink-0 accent-emerald"
        />
        <span className={cn(errors.consent && "text-alert")}>
          {t.rich("consent", {
            link: (chunks) => (
              <Link href="/privacy" target="_blank" className="font-semibold text-emerald underline underline-offset-2">
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>
      {TURNSTILE_SITE_KEY && <Turnstile onToken={onToken} locale={locale} />}
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-alert/[0.06] p-3 text-sm text-alert">
          {t("errorsGeneric", { email: clinic.email })}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald px-8 text-[0.95rem] font-semibold text-white transition-colors hover:bg-emerald-deep disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
