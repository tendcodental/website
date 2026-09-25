"use client";

import dynamic from "next/dynamic";
import { createContext, type ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { DoctorChoice } from "@/lib/booking/types";

const BookingDialog = dynamic(() => import("@/components/booking/booking-dialog"), { ssr: false });

type InlineHandler = (doctor?: DoctorChoice) => void;

interface SiteContextValue {
  /** Active emergency numbers (E.164) from the Google Sheet. */
  phones: string[];
  /** Opens booking: scrolls to the on-page booking section if there is one, otherwise opens the modal. */
  openBooking: (doctor?: DoctorChoice) => void;
  /** The home-page booking section registers itself here. */
  registerInlineBooking: (handler: InlineHandler | null) => void;
  /** True while the booking modal is open or an inline booking widget is on screen. */
  bookingOpen: boolean;
  setInlineVisible: (visible: boolean) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ phones, children }: { phones: string[]; children: ReactNode }) {
  const inline = useRef<InlineHandler | null>(null);
  const [dialog, setDialog] = useState<{ open: boolean; doctor?: DoctorChoice; mounted: boolean; nonce: number }>({
    open: false,
    mounted: false,
    nonce: 0,
  });
  const [inlineVisible, setInlineVisible] = useState(false);

  const openBooking = useCallback((doctor?: DoctorChoice) => {
    if (inline.current) {
      inline.current(doctor);
      return;
    }
    setDialog((d) => ({ open: true, doctor, mounted: true, nonce: d.nonce + 1 }));
  }, []);

  const registerInlineBooking = useCallback((handler: InlineHandler | null) => {
    inline.current = handler;
  }, []);

  const value = useMemo(
    () => ({
      phones,
      openBooking,
      registerInlineBooking,
      bookingOpen: dialog.open || inlineVisible,
      setInlineVisible,
    }),
    [phones, openBooking, registerInlineBooking, dialog.open, inlineVisible],
  );

  return (
    <SiteContext.Provider value={value}>
      {children}
      {dialog.mounted && (
        <BookingDialog
          open={dialog.open}
          request={{ doctor: dialog.doctor, nonce: dialog.nonce }}
          onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
        />
      )}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
