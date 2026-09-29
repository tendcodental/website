"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The home page's service cards. On phones only the first few show (the cards after them hide via
 * `max-md:group-data-[collapsed=true]/svc:hidden`, set by the server component) until the visitor
 * expands the list; from tablet width up everything is always visible.
 */
export function ServicesGrid({ children, seeAll, seeLess }: { children: ReactNode; seeAll: string; seeLess: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div data-collapsed={!expanded} className="group/svc mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
        {children}
      </div>
      <div className="mt-6 flex justify-center md:hidden">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-white px-6 text-sm font-semibold text-ink transition-colors hover:border-gold"
        >
          {expanded ? seeLess : seeAll}
          <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
