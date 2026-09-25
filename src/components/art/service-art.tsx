import { type ReactNode, useId } from "react";
import type { ArtKey } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Generated, on-brand service illustrations: gold line-art (like the logo's tooth) on deep emerald.
 * Pure SVG, crisp at any size, a few hundred bytes each, no image requests, no licensing concerns.
 * To use a real photo for a service later, render <Image> instead of <ServiceArt> on that page.
 */

// Molar in a 200×200 box (x 40-160, y 44-166).
const TOOTH =
  "M100 58C88 50 70 44 60 46C44 49 38 64 40 80C42 96 48 106 52 122C56 140 58 160 66 164C74 168 78 150 84 136C88 128 92 124 100 124C108 124 112 128 116 136C122 150 126 168 134 164C142 160 144 140 148 122C152 106 158 96 160 80C162 64 156 49 140 46C130 44 112 50 100 58Z";
const CROWN = "M100 58C88 50 70 44 60 46C44 49 38 64 40 80C41 90 44 98 47 106H153C156 98 159 90 160 80C162 64 156 49 140 46C130 44 112 50 100 58Z";
const CANALS = "M88 84C88 74 96 72 100 78C104 72 112 74 112 84C112 96 108 104 106 114L112 150M94 114C92 104 88 96 88 84M94 114L88 150";
const GUM = "M18 132C40 116 62 116 80 126C92 132 108 132 120 126C138 116 160 116 182 132";

const star = (x: number, y: number, r: number) =>
  `M${x} ${y - r}C${x + r * 0.18} ${y - r * 0.18} ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y}C${x + r * 0.18} ${y + r * 0.18} ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r}C${x - r * 0.18} ${y + r * 0.18} ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y}C${x - r * 0.18} ${y - r * 0.18} ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r}Z`;

type Paint = { accent: string; ink: string };

function Clock({ cx, cy, r, p }: { cx: number; cy: number; r: number; p: Paint }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={p.accent} stroke="none" />
      <path d={`M${cx} ${cy - r * 0.55}V${cy}L${cx + r * 0.42} ${cy + r * 0.3}`} stroke={p.ink} strokeWidth={r * 0.2} />
    </g>
  );
}

const glyphs: Record<ArtKey, (p: Paint) => ReactNode> = {
  emergency: (p) => (
    <>
      <path d={TOOTH} />
      <Clock cx={152} cy={58} r={26} p={p} />
    </>
  ),
  pulp: (p) => (
    <>
      <path d={TOOTH} />
      <path d={CANALS} strokeWidth="0.6em" />
      <circle cx="100" cy="90" r="9" fill={p.accent} stroke="none" />
      <path d="M100 66V60M118 76l5-4M82 76l-5-4M122 94h6M78 94h-6" stroke={p.accent} />
    </>
  ),
  abscess: (p) => (
    <>
      <path d={TOOTH} />
      <circle cx="64" cy="174" r="13" fill={p.accent} stroke="none" />
      <circle cx="44" cy="160" r="6" fill={p.accent} stroke="none" opacity="0.7" />
      <circle cx="86" cy="182" r="4" fill={p.accent} stroke="none" opacity="0.6" />
    </>
  ),
  broken: (p) => (
    <>
      <path d={TOOTH} />
      <path d="M106 56L94 76L110 90L98 108" />
      <path d="M150 20L170 28L162 46L144 40Z" fill={p.accent} stroke="none" />
      <path d="M140 58l-8 6M176 52l8 2" stroke={p.accent} />
    </>
  ),
  "extraction-urgent": (p) => (
    <>
      <g transform="translate(0 -18)">
        <path d={TOOTH} />
      </g>
      <path d={GUM} stroke={p.accent} strokeWidth="0.55em" transform="translate(0 30)" />
      <path d="M172 118V64M160 78l12-14 12 14" />
      <path d="M36 52h12l-7 16h13l-20 26 6-18H28Z" fill={p.accent} stroke="none" />
    </>
  ),
  gums: (p) => (
    <>
      <path d={CROWN} transform="translate(0 10)" />
      <path d="M18 128C48 108 72 110 100 122C128 110 152 108 182 128V160C140 148 60 148 18 160Z" fill={p.accent} fillOpacity="0.28" stroke={p.accent} />
      <path d="M118 134L140 108" stroke={p.ink === "#0a241c" ? "#fbf9f5" : p.ink} />
      <path d="M152 50L132 98M166 58L140 102M152 50l14 8" />
    </>
  ),
  surgery: (p) => (
    <>
      <g transform="translate(-22 6) scale(0.88)">
        <path d={TOOTH} />
      </g>
      <path d="M154 150L184 110C194 122 190 142 170 160Z" fill={p.accent} fillOpacity="0.3" stroke={p.accent} />
      <path d="M154 150L118 186" strokeWidth="0.85em" />
    </>
  ),
  extraction: (p) => (
    <>
      <g transform="translate(-10 -24)">
        <path d={TOOTH} />
      </g>
      <path d="M14 150C40 132 66 134 100 146C134 134 160 132 186 150V178H14Z" fill={p.accent} fillOpacity="0.3" stroke={p.accent} />
      <path d="M178 104V46M165 60l13-14 13 14" />
    </>
  ),
  jaw: (p) => (
    <>
      {/* Dental arch (jaw seen from above) with the teeth along it */}
      <path d="M26 20C26 120 60 186 100 186C140 186 174 120 174 20" strokeOpacity="0.4" />
      {Array.from({ length: 10 }, (_, i) => {
        const t = (Math.PI * (i + 0.5)) / 10;
        const x = 100 - 64 * Math.cos(t);
        const y = 24 + 138 * Math.sin(t);
        const angle = (Math.atan2(138 * Math.cos(t), 64 * Math.sin(t)) * 180) / Math.PI;
        const front = i >= 3 && i <= 6;
        return (
          <rect
            key={i}
            x={x - (front ? 10 : 13)}
            y={y - 11}
            width={front ? 20 : 26}
            height={22}
            rx={front ? 7 : 9}
            transform={`rotate(${angle} ${x} ${y})`}
            fill={front ? p.accent : "none"}
            fillOpacity={front ? 0.35 : undefined}
          />
        );
      })}
    </>
  ),
  wisdom: (p) => (
    <>
      <g transform="translate(6 28) scale(0.62)">
        <path d={TOOTH} />
      </g>
      <g transform="rotate(38 140 120) translate(78 58) scale(0.62)">
        <path d={TOOTH} />
      </g>
      <path d="M12 116C60 104 140 104 190 116" stroke={p.accent} strokeDasharray="2 12" />
    </>
  ),
  "baby-tooth": (p) => (
    <>
      <g transform="translate(18 22) scale(0.82)">
        <path d={TOOTH} />
      </g>
      <circle cx="88" cy="92" r="4.5" fill="currentColor" stroke="none" className="text-gold-light" />
      <circle cx="112" cy="92" r="4.5" fill="currentColor" stroke="none" className="text-gold-light" />
      <path d="M88 106C94 114 106 114 112 106" />
      <path d={star(160, 44, 16)} fill={p.accent} stroke="none" />
      <path d={star(38, 150, 9)} fill={p.accent} stroke="none" opacity="0.7" />
    </>
  ),
  "surgery-urgent": (p) => (
    <>
      <g transform="translate(-10 8) scale(0.9)">
        <path d={TOOTH} />
      </g>
      <path d="M52 176C80 186 112 186 140 176" stroke={p.accent} strokeDasharray="4 10" />
      <path d="M62 170l6 12M88 176l2 12M114 176l-2 12M138 170l-6 12" stroke={p.accent} />
      <Clock cx={156} cy={52} r={24} p={p} />
    </>
  ),
  endo: (p) => (
    <>
      <path d={TOOTH} />
      <path d={CANALS} />
      <path d={star(164, 40, 14)} fill={p.accent} stroke="none" />
    </>
  ),
  toothache: (p) => (
    <>
      <path d={TOOTH} />
      <path d="M20 62l12 10-12 10 12 10-12 10M180 62l-12 10 12 10-12 10 12 10" stroke={p.accent} />
    </>
  ),
  filling: (p) => (
    <>
      <path d={TOOTH} />
      <path d="M72 68C82 60 92 64 100 72C108 64 118 60 128 68C126 84 114 92 100 92C86 92 74 84 72 68Z" fill={p.accent} stroke="none" />
    </>
  ),
  "root-canal": (p) => (
    <>
      <path d={TOOTH} />
      <path d={CANALS} strokeWidth="0.55em" />
      <rect x="92" y="4" width="16" height="24" rx="5" fill={p.accent} stroke="none" />
      <path d="M100 28V112" stroke={p.accent} strokeWidth="0.45em" />
    </>
  ),
  preventive: (p) => (
    <>
      <path d="M100 18L160 40V94C160 134 134 162 100 180C66 162 40 134 40 94V40Z" />
      <g transform="translate(55 50) scale(0.45)">
        <path d={TOOTH} strokeWidth="2.2em" stroke={p.accent} />
      </g>
    </>
  ),
  kids: (p) => (
    <>
      <g transform="translate(-6 24) scale(0.74)">
        <path d={TOOTH} />
      </g>
      <circle cx="58" cy="90" r="4" fill="currentColor" stroke="none" className="text-gold-light" />
      <circle cx="78" cy="90" r="4" fill="currentColor" stroke="none" className="text-gold-light" />
      <path d="M58 102C63 109 73 109 78 102" />
      <path d="M142 182L178 56" strokeWidth="0.75em" />
      <path d="M170 50l22 6-8 30-22-6Z" fill={p.accent} fillOpacity="0.4" stroke={p.accent} />
    </>
  ),
  fluoride: (p) => (
    <>
      <g transform="translate(0 22)">
        <path d={TOOTH} />
      </g>
      <path d="M100 6C100 6 84 28 84 38C84 48 91 54 100 54C109 54 116 48 116 38C116 28 100 6 100 6Z" fill={p.accent} stroke="none" />
      <path d={star(146, 30, 10)} fill={p.accent} stroke="none" opacity="0.8" />
      <path d={star(54, 34, 7)} fill={p.accent} stroke="none" opacity="0.7" />
    </>
  ),
  sealant: (p) => (
    <>
      <g transform="translate(0 18)">
        <path d={TOOTH} />
        <path d="M70 72l10 10 10-10 10 10 10-10 10 10 10-10" strokeWidth="0.55em" />
      </g>
      <path d="M44 56C74 30 126 30 156 56" stroke={p.accent} strokeWidth="1.1em" />
    </>
  ),
  diagnostics: (p) => (
    <>
      <g transform="translate(-14 -8) scale(0.86)">
        <path d={TOOTH} />
      </g>
      <circle cx="130" cy="122" r="32" fill={p.accent} fillOpacity="0.18" stroke={p.accent} />
      <path d="M154 146L182 174" strokeWidth="0.8em" stroke={p.accent} />
    </>
  ),
  images: (p) => (
    <>
      <path d="M30 58V38H50M150 38h20v20M170 142v20h-20M50 162H30v-20" stroke={p.accent} />
      <rect x="44" y="52" width="112" height="96" rx="14" />
      <g transform="translate(63 52) scale(0.37)">
        <path d={TOOTH} strokeWidth="2.3em" />
      </g>
    </>
  ),
  periapical: (p) => (
    <>
      <rect x="50" y="24" width="100" height="152" rx="10" />
      <circle cx="64" cy="38" r="4" fill="currentColor" stroke="none" className="text-gold-light" />
      <g transform="translate(46 42) scale(0.54) scale(1 1.2)">
        <path d={TOOTH} strokeWidth="1.7em" />
      </g>
      <circle cx="82" cy="152" r="9" fill={p.accent} fillOpacity="0.5" stroke="none" />
    </>
  ),
  xray: (p) => (
    <>
      <rect x="18" y="30" width="66" height="46" rx="12" />
      <path d="M84 44L116 38V70L84 64Z" />
      <path d="M128 42C136 48 136 64 128 70M140 34C152 44 152 68 140 78" stroke={p.accent} />
      <g transform="translate(92 86) scale(0.52)">
        <path d={TOOTH} strokeWidth="1.8em" />
      </g>
    </>
  ),
  exam: (p) => (
    <>
      <circle cx="70" cy="62" r="28" fill={p.accent} fillOpacity="0.22" />
      <path d="M90 82L142 176" strokeWidth="0.75em" />
      <path d="M150 24C160 18 170 28 162 36L118 168" />
    </>
  ),
  cleaning: (p) => (
    <>
      <path d={TOOTH} />
      <path d={star(36, 44, 14)} fill={p.accent} stroke="none" />
      <path d={star(166, 36, 10)} fill={p.accent} stroke="none" />
      <path d={star(172, 128, 12)} fill={p.accent} stroke="none" opacity="0.85" />
      <path d="M78 74C86 66 96 66 104 72" stroke={p.accent} />
    </>
  ),
  crown: (p) => (
    <>
      <path d="M58 70C58 44 78 34 100 44C122 34 142 44 142 70C142 80 138 86 132 88H68C62 86 58 80 58 70Z" fill={p.accent} fillOpacity="0.3" stroke={p.accent} />
      <path d="M100 96v10M92 100l8 8 8-8" stroke={p.accent} strokeWidth="0.5em" />
      <path d="M72 120C72 112 80 108 100 108C120 108 128 112 128 120L130 138C132 152 126 176 116 176C108 176 106 154 100 154C94 154 92 176 84 176C74 176 68 152 70 138Z" />
    </>
  ),
};

export function ServiceArt({
  art,
  variant = "card",
  className,
  label,
  fit = "cover",
}: {
  art: ArtKey;
  variant?: "card" | "icon";
  className?: string;
  label?: string;
  /** cover = fill the box (may crop the edges); contain = always show the whole illustration. */
  fit?: "cover" | "contain";
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const paint: Paint = { accent: "#5cc592", ink: "#0a241c" };

  if (variant === "icon") {
    return (
      <svg viewBox="0 0 200 200" className={cn("size-6", className)} aria-hidden="true" focusable="false">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ fontSize: 12 }}
        >
          {glyphs[art]({ accent: "currentColor", ink: "#0a241c" })}
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("h-auto w-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      preserveAspectRatio={fit === "cover" ? "xMidYMid slice" : "xMidYMid meet"}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#154535" />
          <stop offset="0.6" stopColor="#0f3328" />
          <stop offset="1" stopColor="#0a241c" />
        </linearGradient>
        <radialGradient id={`glow${uid}`} cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor="#2e8a5e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e8a5e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#b88a36" />
          <stop offset="0.45" stopColor="#d8b262" />
          <stop offset="0.8" stopColor="#f0d48f" />
          <stop offset="1" stopColor="#d2aa58" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#bg${uid})`} />
      <circle cx="200" cy="140" r="150" fill={`url(#glow${uid})`} />
      <g fill="none" stroke="#c29b4a" strokeOpacity="0.16" strokeWidth="1.2">
        <circle cx="200" cy="148" r="108" />
        <circle cx="200" cy="148" r="136" />
        <circle cx="200" cy="148" r="170" strokeDasharray="2 7" />
      </g>
      <path d="M0 262C90 236 170 250 250 238C320 228 360 206 400 196" stroke="#2e8a5e" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
      <g
        transform="translate(110 55) scale(0.9)"
        fill="none"
        stroke={`url(#gold${uid})`}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ fontSize: 6.5 }}
      >
        {glyphs[art](paint)}
      </g>
    </svg>
  );
}
