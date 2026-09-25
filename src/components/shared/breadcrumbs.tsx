import { ChevronRight } from "lucide-react";
import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";

type Href = ComponentProps<typeof Link>["href"];

export function Breadcrumbs({ items, label }: { items: Array<{ name: string; href?: Href }>; label: string }) {
  return (
    <nav aria-label={label} className="text-[0.82rem] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 opacity-50" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-emerald">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
