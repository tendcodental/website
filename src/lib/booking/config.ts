/** Booking rules. Change these values to adjust how online booking behaves. */
export const bookingConfig = {
  /** Length of one appointment slot. */
  slotMinutes: 60,
  /** Same-day slots must start at least this long from now (urgent cases → emergency phone). */
  minLeadMinutes: 120,
  /** How far ahead patients can book. */
  maxDaysAhead: 60,
  /** Block Bulgarian official holidays automatically. */
  blockPublicHolidays: true,
  /**
   * The clinic has one treatment chair, so any appointment (website or staff-created) blocks the hour
   * for both doctors. Set to false if both doctors can see patients in parallel.
   */
  sharedChair: true,
  /** Upcoming online bookings allowed per phone number, on the same day. */
  maxUpcomingPerPhone: 1,
  /** Marker stored on events created by the website. */
  source: "tandco-website",
} as const;

/**
 * Staff can mark a doctor as absent with an event in that doctor's colour whose title matches this
 * pattern (e.g. "Отсъства", "Отпуск", "Болничен"). Such events block only that doctor.
 * All-day events in a doctor's colour are always treated as that doctor's day off.
 */
export const ABSENCE_PATTERN = /отсъств|отпуск|почивк|болничен|absent|absence|day off|vacation|holiday|\boff\b/i;
