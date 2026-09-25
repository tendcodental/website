import "server-only";
import { reasonById } from "@/content/booking";
import { clinic, fullAddress, mapLinks, SITE_URL } from "@/content/clinic";
import { doctorById } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import type { ConfirmedBooking } from "@/lib/booking/create";
import { buildIcs, googleCalendarLink } from "@/lib/booking/ics";
import { CLINIC_TZ } from "@/lib/booking/time";
import { formatPhone } from "@/lib/phone";
import type { EmailMessage } from "./send";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function longDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", {
    timeZone: CLINIC_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function layout(locale: Locale, preheader: string, inner: string) {
  const footer =
    locale === "bg"
      ? `${clinic.name} · ${fullAddress("bg")}<br/>Спешен денонощен зъболекарски кабинет 24/7`
      : `${clinic.name} · ${fullAddress("en")}<br/>24/7 emergency dental clinic`;
  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${clinic.name}</title></head>
<body style="margin:0;padding:0;background:#f3eee4;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#13231d;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eee4;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e6dfd2;">
<tr><td style="background:#0f3328;padding:28px 32px;">
  <img src="${SITE_URL}/brand/mark.png" width="58" height="40" alt="" style="vertical-align:middle;margin-right:10px;">
  <span style="font-family:Georgia,serif;font-size:24px;color:#e6c67e;vertical-align:middle;">T&amp;Co</span>
  <span style="font-size:11px;letter-spacing:4px;color:#cfe3d8;vertical-align:middle;margin-left:6px;">DENTAL</span>
</td></tr>
<tr><td style="padding:32px;">${inner}</td></tr>
<tr><td style="padding:20px 32px;background:#fbf9f5;border-top:1px solid #e6dfd2;font-size:12px;line-height:1.6;color:#5a6863;">${footer}</td></tr>
</table></td></tr></table></body></html>`;
}

function detailsTable(rows: Array<[string, string]>) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border:1px solid #e6dfd2;border-radius:12px;">
${rows
  .map(
    ([k, v], i) =>
      `<tr><td style="padding:12px 16px;font-size:13px;color:#5a6863;width:38%;${i ? "border-top:1px solid #efe9de;" : ""}">${k}</td><td style="padding:12px 16px;font-size:15px;font-weight:600;${i ? "border-top:1px solid #efe9de;" : ""}">${v}</td></tr>`,
  )
  .join("")}
</table>`;
}

const button = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:#1e5a45;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px;margin:4px 8px 4px 0;">${label}</a>`;

function bookingParts(b: ConfirmedBooking) {
  const locale = b.locale;
  const doctor = doctorById(b.doctorId)!;
  const reason = reasonById(b.reasonId)?.label[locale] ?? b.reasonId;
  const title = locale === "bg" ? `Час в ${clinic.name} (${doctor.shortName.bg})` : `${clinic.name} appointment (${doctor.shortName.en})`;
  const location = fullAddress(locale);
  const when = `${longDate(b.start, locale)}, ${b.time}`;
  return { locale, doctor, reason, title, location, when };
}

export function patientConfirmationEmail(b: ConfirmedBooking): EmailMessage {
  const { locale, doctor, reason, title, location, when } = bookingParts(b);
  const bg = locale === "bg";
  const calDescription = bg
    ? `${reason}\nЗа промяна или отказ: ${doctor.phone.display}`
    : `${reason}\nTo change or cancel: ${doctor.phone.display}`;
  const ics = buildIcs({ uid: b.eventId, start: b.start, end: b.end, title, description: calDescription, location });
  const gcal = googleCalendarLink({ start: b.start, end: b.end, title, description: calDescription, location });

  const inner = `
<h1 style="font-family:Georgia,serif;font-weight:600;font-size:26px;margin:0 0 8px;">${bg ? "Часът ви е запазен" : "Your appointment is booked"}</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#33443d;">${bg ? `Здравейте, ${esc(b.name)}! Очакваме ви.` : `Hello ${esc(b.name)}, we look forward to seeing you.`}</p>
${detailsTable([
  [bg ? "Дата и час" : "Date & time", esc(when)],
  [bg ? "Лекар" : "Dentist", esc(doctor.name[locale])],
  [bg ? "Причина" : "Reason", esc(reason)],
  [bg ? "Адрес" : "Address", esc(location)],
])}
<p style="margin:0 0 16px;">${button(gcal, bg ? "Добави в Google Календар" : "Add to Google Calendar")}${button(mapLinks.googleDirections, bg ? "Упътване" : "Directions")}</p>
<p style="font-size:14px;line-height:1.6;color:#33443d;">${
    bg
      ? `За промяна или отказ, моля, обадете се на <a href="tel:${doctor.phone.tel}" style="color:#1e5a45;font-weight:600;">${doctor.phone.display}</a>. Ако нещо се случи извън работно време, ние сме спешен денонощен зъболекарски кабинет и отговаряме 24/7.`
      : `To change or cancel, please call <a href="tel:${doctor.phone.tel}" style="color:#1e5a45;font-weight:600;">${doctor.phone.display}</a>. If something comes up outside regular hours, we're a 24/7 emergency dental clinic and always answer.`
  }</p>
<p style="font-size:13px;color:#5a6863;">${bg ? "Файлът за календар е прикачен към този имейл." : "A calendar file is attached to this email."}</p>`;

  const text = [
    bg ? "Часът ви е запазен" : "Your appointment is booked",
    `${bg ? "Дата и час" : "Date & time"}: ${when}`,
    `${bg ? "Лекар" : "Dentist"}: ${doctor.name[locale]}`,
    `${bg ? "Причина" : "Reason"}: ${reason}`,
    `${bg ? "Адрес" : "Address"}: ${location}`,
    bg ? `За промяна или отказ: ${doctor.phone.display}` : `To change or cancel: ${doctor.phone.display}`,
  ].join("\n");

  return {
    to: b.email!,
    subject: bg ? `Потвърждение: ${when} | ${clinic.name}` : `Confirmed: ${when} | ${clinic.name}`,
    html: layout(locale, bg ? `Очакваме ви на ${when}` : `See you on ${when}`, inner),
    text,
    replyTo: clinic.email,
    attachments: [{ filename: "tandco-dental.ics", content: ics, contentType: "text/calendar" }],
  };
}

export function patientReminderEmail(b: ConfirmedBooking): EmailMessage {
  const { locale, doctor, reason, location, when } = bookingParts(b);
  const bg = locale === "bg";
  const inner = `
<h1 style="font-family:Georgia,serif;font-weight:600;font-size:26px;margin:0 0 8px;">${bg ? "Напомняне за утрешния ви час" : "A reminder for tomorrow"}</h1>
<p style="margin:0;font-size:15px;line-height:1.6;color:#33443d;">${bg ? `Здравейте, ${esc(b.name)}! Напомняме ви, че утре ви очакваме.` : `Hello ${esc(b.name)}, just a reminder that we'll see you tomorrow.`}</p>
${detailsTable([
  [bg ? "Дата и час" : "Date & time", esc(when)],
  [bg ? "Лекар" : "Dentist", esc(doctor.name[locale])],
  [bg ? "Причина" : "Reason", esc(reason)],
  [bg ? "Адрес" : "Address", esc(location)],
])}
<p style="margin:0 0 16px;">${button(mapLinks.googleDirections, bg ? "Упътване" : "Directions")}</p>
<p style="font-size:14px;line-height:1.6;color:#33443d;">${
    bg
      ? `Ако не можете да дойдете, моля, обадете се на <a href="tel:${doctor.phone.tel}" style="color:#1e5a45;font-weight:600;">${doctor.phone.display}</a>, за да предложим часа на друг пациент.`
      : `If you can't make it, please call <a href="tel:${doctor.phone.tel}" style="color:#1e5a45;font-weight:600;">${doctor.phone.display}</a> so we can offer the slot to another patient.`
  }</p>`;
  return {
    to: b.email!,
    subject: bg ? `Напомняне: утре в ${b.time} | ${clinic.name}` : `Reminder: tomorrow at ${b.time} | ${clinic.name}`,
    html: layout(locale, bg ? `Утре в ${b.time}` : `Tomorrow at ${b.time}`, inner),
    text: `${bg ? "Напомняне" : "Reminder"}: ${when}, ${doctor.name[locale]}, ${location}. ${doctor.phone.display}`,
    replyTo: clinic.email,
  };
}

export function clinicNotificationEmail(b: ConfirmedBooking): EmailMessage {
  const doctor = doctorById(b.doctorId)!;
  const reason = reasonById(b.reasonId)?.label.bg ?? b.reasonId;
  const when = `${longDate(b.start, "bg")}, ${b.time}`;
  const inner = `
<h1 style="font-family:Georgia,serif;font-weight:600;font-size:24px;margin:0 0 8px;">Нов онлайн час</h1>
<p style="margin:0;font-size:14px;color:#5a6863;">Събитието вече е в Google Календара (${doctor.shortName.bg}).</p>
${detailsTable([
  ["Дата и час", esc(when)],
  ["Лекар", esc(doctor.name.bg)],
  ["Пациент", esc(b.name)],
  ["Телефон", `<a href="tel:${b.phone}" style="color:#1e5a45;">${formatPhone(b.phone, "bg")}</a>`],
  ["Имейл", b.email ? esc(b.email) : "-"],
  ["Причина", esc(reason)],
  ["По НЗОК", b.nzok ? "Да" : "Не"],
  ["Бележка", b.note ? esc(b.note) : "-"],
  ["Език", b.locale === "bg" ? "български" : "английски"],
])}`;
  return {
    to: "", // filled in by the caller (CLINIC_NOTIFY_EMAIL)
    subject: `Нов час: ${b.name} | ${when} (${doctor.shortName.bg})`,
    html: layout("bg", `${b.name}, ${when}`, inner),
    text: `Нов онлайн час\n${when}\n${doctor.name.bg}\n${b.name}, ${formatPhone(b.phone, "bg")}, ${b.email ?? "-"}\n${reason}\nНЗОК: ${b.nzok ? "Да" : "Не"}\n${b.note ?? ""}`,
    replyTo: b.email || undefined,
  };
}

export function contactMessageEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: Locale;
}): EmailMessage {
  const inner = `
<h1 style="font-family:Georgia,serif;font-weight:600;font-size:24px;margin:0 0 8px;">Ново съобщение от сайта</h1>
${detailsTable([
  ["Име", esc(data.name)],
  ["Имейл", esc(data.email)],
  ["Телефон", data.phone ? esc(data.phone) : "-"],
  ["Език", data.locale === "bg" ? "български" : "английски"],
])}
<div style="white-space:pre-wrap;font-size:15px;line-height:1.6;padding:16px;background:#fbf9f5;border-radius:12px;border:1px solid #efe9de;">${esc(data.message)}</div>
<p style="font-size:13px;color:#5a6863;">Отговорете директно на този имейл, за да пишете на ${esc(data.name)}.</p>`;
  return {
    to: "",
    subject: `Съобщение от сайта: ${data.name}`,
    html: layout("bg", data.message.slice(0, 90), inner),
    text: `${data.name} <${data.email}> ${data.phone ?? ""}\n\n${data.message}`,
    replyTo: data.email,
  };
}
