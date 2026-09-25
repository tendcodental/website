/** Minimal iCalendar (.ics) generator for "add to calendar". Works in the browser and on the server. */
const toIcsDate = (iso: string) => iso.replace(/[-:]/g, "").replace(/\.\d{3}/, "");

const escape = (text: string) =>
  text.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

export function buildIcs({
  uid,
  start,
  end,
  title,
  description,
  location,
}: {
  uid: string;
  start: string;
  end: string;
  title: string;
  description: string;
  location: string;
}) {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//T&Co Dental//Booking//BG",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@tandcodental.com`,
    `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(location)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT2H",
    `DESCRIPTION:${escape(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Google Calendar "add event" link. */
export function googleCalendarLink({
  start,
  end,
  title,
  description,
  location,
}: {
  start: string;
  end: string;
  title: string;
  description: string;
  location: string;
}) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toIcsDate(start)}/${toIcsDate(end)}`,
    details: description,
    location,
    ctz: "Europe/Sofia",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
