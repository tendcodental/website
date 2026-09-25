import { cn } from "@/lib/utils";

/**
 * Placeholder with the same footprint as the booking widget, shown while its code loads.
 * Keeps the layout stable (no jump) and costs no JavaScript.
 */
export function BookingSkeleton({ variant = "section" }: { variant?: "section" | "dialog" }) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "overflow-hidden bg-white",
        variant === "section" && "rounded-[1.75rem] border border-border shadow-[0_40px_80px_-40px_rgb(15_51_40/0.35)] sm:rounded-[2rem]",
      )}
    >
      <div className="grid lg:grid-cols-[17.5rem_1fr]">
        <div className="border-b border-border bg-ivory/70 p-4 sm:p-6 lg:border-r lg:border-b-0">
          <div className="mb-3 h-3 w-16 rounded bg-sand" />
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[6.2rem] animate-pulse rounded-2xl bg-sand/70 lg:h-[4.4rem]" />
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="mb-5 h-6 w-48 rounded-full bg-sand/70" />
          <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_14rem] md:gap-10">
            <div className="md:max-w-[28rem]">
              <div className="mb-4 h-8 w-44 animate-pulse rounded-lg bg-sand" />
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 42 }, (_, i) => (
                  <div key={i} className="mx-auto size-10 animate-pulse rounded-full bg-sand/60 min-[380px]:size-11 sm:size-12" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 content-start gap-2 md:grid-cols-1">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-sand/60" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
