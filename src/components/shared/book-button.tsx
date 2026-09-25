"use client";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { useSite } from "@/components/providers/site-provider";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { DoctorChoice } from "@/lib/booking/types";

/**
 * Every "Book" call-to-action on the site. A real link to the booking page (works without JS, can be
 * opened in a new tab); with JS it scrolls to the on-page booking section or opens the booking modal.
 */
export function BookButton({
  doctor,
  children,
  variant = "gold",
  size = "xl",
  className,
  onNavigate,
}: {
  doctor?: DoctorChoice;
  children: ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
  onNavigate?: () => void;
}) {
  const { openBooking } = useSite();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
    event.preventDefault();
    onNavigate?.();
    openBooking(doctor);
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href="/book" onClick={handleClick}>
        {children}
      </Link>
    </Button>
  );
}
