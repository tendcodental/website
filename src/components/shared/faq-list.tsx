import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accessible FAQ built on native <details>, no JavaScript, and the answers are in the HTML for SEO. */
export function FaqList({ items, className }: { items: Array<{ q: string; a: string }>; className?: string }) {
  return (
    <div className={cn("divide-y divide-border rounded-3xl border border-border bg-white", className)}>
      {items.map((item, i) => (
        <details key={item.q} className="group px-5 sm:px-7" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[1.05rem] font-semibold text-ink sm:text-[1.1rem] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-gold-dark transition-all duration-300 group-open:rotate-45 group-open:border-emerald group-open:bg-emerald group-open:text-white">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="-mt-1 pb-5 text-[0.98rem] leading-relaxed text-muted-foreground">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
