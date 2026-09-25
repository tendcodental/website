"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

function shiftMonth(month: string, delta: number) {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`;
}

export { shiftMonth };

export function MonthCalendar({
  month,
  locale,
  today,
  lastDate,
  days,
  holidays,
  selected,
  loading,
  onSelect,
  onMonthChange,
}: {
  month: string;
  locale: "bg" | "en";
  today: string;
  lastDate: string;
  days: Record<string, string[]>;
  holidays: Record<string, string>;
  selected: string | null;
  loading: boolean;
  onSelect: (date: string) => void;
  onMonthChange: (month: string) => void;
}) {
  const t = useTranslations("booking");
  const grid = useRef<HTMLDivElement>(null);
  const intlLocale = locale === "bg" ? "bg-BG" : "en-GB";

  const { cells, label, weekdays } = useMemo(() => {
    const [y, m] = month.split("-").map(Number);
    const first = new Date(Date.UTC(y, m - 1, 1));
    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const lead = (first.getUTCDay() + 6) % 7; // Monday-first
    const cells: Array<string | null> = [
      ...Array.from({ length: lead }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => `${month}-${pad(i + 1)}`),
    ];
    const raw = new Intl.DateTimeFormat(intlLocale, { month: "long", year: "numeric", timeZone: "UTC" }).format(first);
    const weekdayFmt = new Intl.DateTimeFormat(intlLocale, { weekday: "short", timeZone: "UTC" });
    const weekdays = Array.from({ length: 7 }, (_, i) => weekdayFmt.format(new Date(Date.UTC(2024, 0, 1 + i))));
    return { cells, label: raw.charAt(0).toUpperCase() + raw.slice(1), weekdays };
  }, [month, intlLocale]);

  const fullDate = useMemo(
    () => new Intl.DateTimeFormat(intlLocale, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }),
    [intlLocale],
  );

  const canPrev = month > today.slice(0, 7);
  const canNext = month < lastDate.slice(0, 7);

  // Arrow-key navigation between available days.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    const delta = moves[event.key];
    if (!delta) return;
    const buttons = Array.from(grid.current?.querySelectorAll<HTMLButtonElement>("button[data-date]") ?? []);
    const index = buttons.findIndex((b) => b === document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const current = buttons[index].dataset.date!;
    const target = cells.indexOf(current) + delta;
    const next = buttons.find((b) => b.dataset.date === cells[target] && !b.disabled);
    next?.focus();
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-[1.45rem] font-semibold text-ink" aria-live="polite">
          {label}
        </p>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(month, -1))}
            disabled={!canPrev}
            className="grid size-10 place-items-center rounded-full border border-border bg-white text-ink transition-colors hover:border-gold disabled:opacity-35"
            aria-label={t("prevMonth")}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(shiftMonth(month, 1))}
            disabled={!canNext}
            className="grid size-10 place-items-center rounded-full border border-border bg-white text-ink transition-colors hover:border-gold disabled:opacity-35"
            aria-label={t("nextMonth")}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase">
        {weekdays.map((w) => (
          <span key={w} className="py-1.5">
            {w.replace(".", "")}
          </span>
        ))}
      </div>

      <div ref={grid} className="grid grid-cols-7 gap-1" role="group" aria-label={t("selectDate")} onKeyDown={onKeyDown}>
        {cells.map((date, i) => {
          if (!date) return <span key={`e${i}`} />;
          const slots = days[date];
          const available = Boolean(slots?.length);
          const isSelected = selected === date;
          const isToday = date === today;
          const holiday = holidays[date];
          const dayNumber = Number(date.slice(8));
          const [y, m, d] = date.split("-").map(Number);
          const label = fullDate.format(new Date(Date.UTC(y, m - 1, d)));

          return (
            <button
              key={date}
              type="button"
              data-date={date}
              disabled={!available}
              onClick={() => onSelect(date)}
              aria-pressed={isSelected}
              aria-label={
                available ? `${label}, ${t("slotsCount", { count: slots.length })}` : holiday ? `${label}, ${holiday}` : label
              }
              title={holiday}
              className={cn(
                "relative mx-auto grid size-10 place-items-center rounded-full text-[0.95rem] font-medium transition-all duration-300 min-[380px]:size-11 sm:size-12 sm:text-base",
                available
                  ? "bg-accent text-emerald hover:bg-emerald/15 active:scale-95"
                  : "cursor-default text-ink/25",
                isSelected && "bg-emerald text-white shadow-[0_8px_20px_-8px_rgb(30_90_69/0.8)] hover:bg-emerald",
                loading && !isSelected && "animate-pulse",
              )}
            >
              {dayNumber}
              {isToday && (
                <span
                  className={cn(
                    "absolute bottom-[14%] left-1/2 size-1 -translate-x-1/2 rounded-full",
                    isSelected ? "bg-gold-light" : "bg-gold",
                  )}
                />
              )}
              {holiday && !available && (
                <span className="absolute top-[12%] right-[18%] size-1 rounded-full bg-alert/60" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
