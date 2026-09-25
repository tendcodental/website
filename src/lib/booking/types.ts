import type { DoctorId } from "@/content/doctors";

/** Types shared between the booking API and the booking widget (safe to import in the browser). */
export type DoctorChoice = DoctorId | "any";

export interface AvailabilityResponse {
  ok: true;
  demo: boolean;
  today: string;
  lastDate: string;
  days: Record<string, string[]>;
  holidays: Record<string, string>;
}

export interface BookingSuccess {
  ok: true;
  booking: {
    doctorId: DoctorId;
    date: string;
    time: string;
    start: string;
    end: string;
    reasonId: string;
    emailSent: boolean;
  } | null;
}

export type BookingErrorCode =
  | "SLOT_TAKEN"
  | "DUPLICATE"
  | "RATE_LIMITED"
  | "TOO_FAST"
  | "CAPTCHA"
  | "UNAVAILABLE"
  | "OUT_OF_RANGE"
  | "INVALID"
  | "BAD_REQUEST";
