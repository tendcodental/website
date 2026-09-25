"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import type { DoctorChoice } from "@/lib/booking/types";
import { BookingWidget } from "./booking-widget";

const DESKTOP = "(min-width: 768px)";
const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const isDesktop = () => window.matchMedia(DESKTOP).matches;

/** Booking modal used on every page except those with the booking widget inline. */
export default function BookingDialog({
  open,
  onOpenChange,
  request,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Doctor to preselect; the nonce changes on every "Book" click so the widget resets to step 1. */
  request: { doctor?: DoctorChoice; nonce: number };
}) {
  const t = useTranslations("booking");
  // Centered dialog on tablets/desktops, a bottom sheet on phones.
  const desktop = useSyncExternalStore(subscribe, isDesktop, () => null);
  if (desktop === null) return null;

  const widget = <BookingWidget variant="dialog" initialDoctor={request.doctor} doctorRequest={request} />;

  if (desktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[92dvh] w-[min(64rem,calc(100%-2rem))] max-w-none gap-0 overflow-hidden rounded-[1.75rem] p-0 sm:max-w-none"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <DialogTitle className="font-display text-2xl font-semibold">{t("dialogTitle")}</DialogTitle>
            <DialogDescription className="sr-only">{t("lead")}</DialogDescription>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="grid size-10 place-items-center rounded-full border border-border hover:border-gold"
              aria-label={t("close")}
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="max-h-[calc(92dvh-4.5rem)] overflow-y-auto" data-booking-scroll>
            {widget}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[94dvh] rounded-t-[1.75rem] bg-white data-[vaul-drawer-direction=bottom]:max-h-[94dvh]">
        <div className="flex items-center justify-between px-5 pt-2 pb-3">
          <DrawerTitle className="font-display text-2xl font-semibold">{t("dialogTitle")}</DrawerTitle>
          <DrawerDescription className="sr-only">{t("lead")}</DrawerDescription>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid size-10 place-items-center rounded-full border border-border"
            aria-label={t("close")}
          >
            <X className="size-4" />
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]"
          data-booking-scroll
          data-vaul-no-drag
        >
          {widget}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
