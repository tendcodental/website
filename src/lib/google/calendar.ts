import "server-only";
import { getGoogleAccessToken } from "./auth";

export interface CalendarEvent {
  id: string;
  status?: "confirmed" | "tentative" | "cancelled";
  summary?: string;
  description?: string;
  location?: string;
  colorId?: string;
  transparency?: "opaque" | "transparent";
  start: { dateTime?: string; date?: string; timeZone?: string };
  end: { dateTime?: string; date?: string; timeZone?: string };
  extendedProperties?: { private?: Record<string, string> };
}

export type InsertResult = { ok: true; event: CalendarEvent } | { ok: false; reason: "duplicate-id" };

export interface CalendarClient {
  list(params: { timeMin: Date; timeMax: Date; privateProps?: Record<string, string> }): Promise<CalendarEvent[]>;
  get(id: string): Promise<CalendarEvent | null>;
  insert(event: CalendarEvent): Promise<InsertResult>;
  patch(id: string, patch: Partial<CalendarEvent>): Promise<void>;
}

const FIELDS =
  "items(id,status,summary,description,location,colorId,transparency,start,end,extendedProperties),nextPageToken";

class GoogleCalendarError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export function createGoogleCalendar(calendarId: string): CalendarClient {
  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`;

  async function request(url: string, init: RequestInit = {}) {
    const token = await getGoogleAccessToken();
    const res = await fetch(url, {
      ...init,
      cache: "no-store",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json", ...init.headers },
    });
    if (!res.ok && res.status !== 404 && res.status !== 409) {
      throw new GoogleCalendarError(`Google Calendar ${init.method ?? "GET"} failed: ${await res.text()}`, res.status);
    }
    return res;
  }

  return {
    async list({ timeMin, timeMax, privateProps }) {
      const events: CalendarEvent[] = [];
      let pageToken: string | undefined;
      do {
        const params = new URLSearchParams({
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          singleEvents: "true",
          orderBy: "startTime",
          maxResults: "2500",
          fields: FIELDS,
        });
        for (const [k, v] of Object.entries(privateProps ?? {})) params.append("privateExtendedProperty", `${k}=${v}`);
        if (pageToken) params.set("pageToken", pageToken);
        const res = await request(`${base}?${params}`);
        const data = (await res.json()) as { items?: CalendarEvent[]; nextPageToken?: string };
        events.push(...(data.items ?? []));
        pageToken = data.nextPageToken;
      } while (pageToken);
      return events;
    },

    async get(id) {
      const res = await request(`${base}/${encodeURIComponent(id)}`);
      if (res.status === 404) return null;
      return (await res.json()) as CalendarEvent;
    },

    async insert(event) {
      const res = await request(base, { method: "POST", body: JSON.stringify(event) });
      if (res.status === 409) return { ok: false, reason: "duplicate-id" };
      return { ok: true, event: (await res.json()) as CalendarEvent };
    },

    async patch(id, patch) {
      await request(`${base}/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(patch) });
    },
  };
}
