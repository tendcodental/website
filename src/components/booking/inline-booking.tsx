"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSite } from "@/components/providers/site-provider";
import { isDoctorId } from "@/content/doctors";
import type { DoctorChoice } from "@/lib/booking/types";
import { BookingSkeleton } from "./booking-skeleton";

// Loaded as its own chunk so it never delays the hero; the skeleton has the same footprint.
const BookingWidget = dynamic(() => import("./booking-widget").then((m) => m.BookingWidget), {
  ssr: false,
  loading: () => <BookingSkeleton />,
});

const noopSubscribe = () => () => {};
// Deep links such as /zapazi-chas?doctor=tairyumer preselect the doctor.
const readDoctorParam = () => {
  const doctor = new URLSearchParams(window.location.search).get("doctor");
  return isDoctorId(doctor) ? doctor : null;
};

/**
 * The booking widget embedded in a page (home page section, /zapazi-chas). While mounted, every
 * "Book" button on the page scrolls here (and preselects a doctor) instead of opening the modal.
 */
export function InlineBooking({ anchorId = "booking" }: { anchorId?: string }) {
  const { registerInlineBooking, setInlineVisible } = useSite();
  const anchor = useRef<HTMLDivElement>(null);
  const [request, setRequest] = useState<{ doctor?: DoctorChoice; nonce: number }>({ nonce: 0 });
  const urlDoctor = useSyncExternalStore(noopSubscribe, readDoctorParam, () => null);
  const effectiveRequest = request.nonce === 0 && urlDoctor ? { doctor: urlDoctor, nonce: -1 } : request;

  useEffect(() => {
    registerInlineBooking((doctor) => {
      setRequest((r) => ({ doctor, nonce: r.nonce + 1 }));
      // Let an open menu sheet close (and release its scroll lock) before scrolling.
      window.setTimeout(() => anchor.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    });
    return () => registerInlineBooking(null);
  }, [registerInlineBooking]);

  // While the widget fills a good part of the screen, the mobile action bar steps aside.
  useEffect(() => {
    const el = anchor.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInlineVisible(entry.isIntersecting), {
      rootMargin: "-35% 0px -35% 0px",
    });
    io.observe(el);
    return () => {
      io.disconnect();
      setInlineVisible(false);
    };
  }, [setInlineVisible]);

  return (
    <div ref={anchor} id={anchorId} className="scroll-mt-24 lg:scroll-mt-32">
      <BookingWidget variant="section" doctorRequest={effectiveRequest} />
    </div>
  );
}
