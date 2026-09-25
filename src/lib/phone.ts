/**
 * Phone helpers shared by the server and the browser. Numbers are stored as E.164 (+359888123456).
 */
export function normalizePhone(input: string | number | null | undefined): string | null {
  if (input === null || input === undefined) return null;
  let s = String(input).trim().replace(/[\s\-().\/]/g, "");
  if (!s) return null;
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (/^0\d{8,9}$/.test(s)) s = `+359${s.slice(1)}`;
  else if (/^359\d{8,9}$/.test(s)) s = `+${s}`;
  else if (/^[89]\d{8}$/.test(s)) s = `+359${s}`; // mobile number that lost its leading zero (e.g. in a spreadsheet)
  return /^\+[1-9]\d{7,14}$/.test(s) ? s : null;
}

/** Human-friendly formatting: "0888 123 456" for Bulgarian visitors, "+359 888 123 456" otherwise. */
export function formatPhone(e164: string, locale: "bg" | "en" = "bg") {
  if (e164.startsWith("+359")) {
    const n = e164.slice(4);
    const local = locale === "bg";
    if (/^[89]\d{8}$/.test(n)) {
      const body = `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
      return local ? `0${body}` : `+359 ${body}`;
    }
    if (/^32\d{6}$/.test(n)) {
      const body = `${n.slice(2, 5)} ${n.slice(5)}`;
      return local ? `032 ${body}` : `+359 32 ${body}`;
    }
    return local ? `0${n}` : `+359 ${n}`;
  }
  return e164.replace(/^(\+\d{1,3})(\d{3})(\d{3})(\d+)$/, "$1 $2 $3 $4");
}
