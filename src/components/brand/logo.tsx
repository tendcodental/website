import Image from "next/image";
import markImg from "@/assets/brand/mark.png";
import wordmarkLightImg from "@/assets/brand/wordmark-light.png";
import wordmarkImg from "@/assets/brand/wordmark.png";
import { cn } from "@/lib/utils";

/**
 * The T&Co Dental logo, from the original artwork (transparent PNGs, trimmed). The stacked logo is
 * split into the tooth mark and the "T&Co / DENTAL" wordmark so it can sit horizontally in a header.
 * `tone="light"` swaps in a wordmark whose "DENTAL" is recoloured for dark backgrounds.
 */
type Tone = "brand" | "light";

export function LogoMark({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <Image
      src={markImg}
      alt=""
      sizes="128px"
      loading={eager ? "eager" : undefined}
      className={cn("h-auto w-10", className)}
    />
  );
}

const SIZES = {
  sm: { mark: "h-8", word: "h-[1.9rem]" },
  header: { mark: "h-8 lg:h-10", word: "h-[1.85rem] lg:h-[2.25rem]" },
  md: { mark: "h-10", word: "h-[2.3rem]" },
  lg: { mark: "h-14", word: "h-[3.1rem]" },
} as const;

export function Logo({
  className,
  tone = "brand",
  size = "md",
  eager = false,
}: {
  className?: string;
  tone?: Tone;
  size?: keyof typeof SIZES;
  eager?: boolean;
}) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src={markImg}
        alt=""
        sizes="160px"
        loading={eager ? "eager" : undefined}
        className={cn("w-auto shrink-0", s.mark)}
      />
      <Image
        src={tone === "light" ? wordmarkLightImg : wordmarkImg}
        alt="T&Co Dental"
        sizes="160px"
        loading={eager ? "eager" : undefined}
        className={cn("w-auto shrink-0", s.word)}
      />
    </span>
  );
}
