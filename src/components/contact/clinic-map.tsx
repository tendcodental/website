"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/content/clinic";

const MapLibreMap = dynamic(() => import("./maplibre-map"), { ssr: false });

/**
 * Live map (MapLibre + OpenFreeMap tiles: free, no API key, no tracking cookies). The ~200 KB map
 * library is only downloaded when the map scrolls into view, so it never affects the initial load.
 */
export function ClinicMap({ className }: { className?: string }) {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} role="region" aria-label={t("mapTitle")}>
      <div className="relative size-full overflow-hidden rounded-[inherit] bg-[#eef1ec]">
        {/* Placeholder while the map loads (or if WebGL is unavailable) */}
        <div
          className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
          aria-hidden={ready}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(19 35 29 / 0.06) 1px, transparent 1px), linear-gradient(rgb(19 35 29 / 0.06) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-emerald text-gold-light shadow-lg">
              <MapPin className="size-6" aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-ink">{clinic.name}</p>
            <p className="text-xs text-muted-foreground">{visible ? t("mapLoad") : clinic.address.streetSchema}</p>
          </div>
        </div>
        {visible && (
          <MapLibreMap
            lat={clinic.geo.lat}
            lng={clinic.geo.lng}
            label={clinic.name}
            hint={t("mapHint")}
            onReady={() => setReady(true)}
          />
        )}
      </div>
    </div>
  );
}
