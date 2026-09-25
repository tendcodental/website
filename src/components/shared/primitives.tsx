import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
  tone = "dark",
  id,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={cn("reveal max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-3", align === "center" && "justify-center", tone === "light" && "text-gold-light")}>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn("display-lg", tone === "light" ? "text-ivory" : "text-ink")}>
        {title}
      </Tag>
      {lead && (
        <p
          className={cn(
            "mt-4 text-[1rem] leading-relaxed sm:text-[1.06rem]",
            tone === "light" ? "text-emerald-50/80" : "text-muted-foreground",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Live "on duty" indicator. */
export function PulseDot({ className, tone = "alert" }: { className?: string; tone?: "alert" | "green" }) {
  const color = tone === "alert" ? "bg-alert" : "bg-emerald-bright";
  return (
    <span className={cn("relative inline-flex size-2.5 shrink-0", className)} aria-hidden="true">
      <span className={cn("absolute inset-0 rounded-full animate-pulse-ring", color)} />
      <span className={cn("relative inline-flex size-2.5 rounded-full", color)} />
    </span>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <svg key={i} viewBox="0 0 20 20" className="size-[1em]">
            <defs>
              <linearGradient id={`star-${i}-${Math.round(fill * 100)}`}>
                <stop offset={fill} stopColor="#d9a93f" />
                <stop offset={fill} stopColor="#d9d2c3" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${Math.round(fill * 100)})`}
              d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z"
            />
          </svg>
        );
      })}
    </span>
  );
}
