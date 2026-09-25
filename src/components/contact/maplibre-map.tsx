"use client";

import { Map as MapLibre, Marker, NavigationControl, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useEffectEvent, useRef } from "react";

// Served from /public (see scripts/copy-map-worker.mjs) because bundlers rewrite MapLibre's own worker URL.
setWorkerUrl("/vendor/maplibre/maplibre-gl-worker.mjs");

const MARKER = `
<div style="position:relative;display:grid;place-items:center">
  <span style="position:absolute;width:64px;height:64px;border-radius:999px;background:rgb(46 138 94 / .25);animation:tco-ping 2.2s cubic-bezier(.2,.6,.4,1) infinite"></span>
  <svg width="54" height="66" viewBox="0 0 54 66" style="position:relative;filter:drop-shadow(0 10px 14px rgb(15 51 40 / .35))">
    <path d="M27 65C27 65 52 40 52 25A25 25 0 0 0 2 25C2 40 27 65 27 65Z" fill="#0f3328"/>
    <circle cx="27" cy="25" r="18" fill="#fbf9f5"/>
  </svg>
  <img src="/brand/mark.png" alt="" width="26" height="18" style="position:absolute;top:16px;left:50%;transform:translateX(-50%)"/>
</div>
<style>@keyframes tco-ping{0%{transform:scale(.5);opacity:.8}80%,100%{transform:scale(1.6);opacity:0}}</style>`;

export default function MapLibreMap({
  lat,
  lng,
  label,
  hint,
  onReady,
}: {
  lat: number;
  lng: number;
  label: string;
  hint: string;
  onReady: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const handleReady = useEffectEvent(onReady);

  useEffect(() => {
    if (!container.current) return;
    let map: MapLibre | undefined;
    try {
      map = new MapLibre({
        container: container.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [lng, lat],
        zoom: 15.4,
        cooperativeGestures: true,
        attributionControl: { compact: true },
        locale: {
          "CooperativeGesturesHandler.WindowsHelpText": hint,
          "CooperativeGesturesHandler.MacHelpText": hint,
          "CooperativeGesturesHandler.MobileHelpText": hint,
        },
      });
    } catch {
      return; // No WebGL, the placeholder with address and buttons stays visible.
    }

    map.addControl(new NavigationControl({ showCompass: false }), "top-right");

    const el = document.createElement("div");
    el.innerHTML = MARKER;
    el.setAttribute("aria-label", label);
    new Marker({ element: el, anchor: "bottom" }).setLngLat([lng, lat]).addTo(map);

    map.on("load", () => {
      // Gently tint the neutral basemap towards the brand palette.
      for (const layer of map!.getStyle().layers ?? []) {
        try {
          if (layer.type === "background") map!.setPaintProperty(layer.id, "background-color", "#f6f4ef");
          else if (layer.type === "fill" && /water/.test(layer.id)) map!.setPaintProperty(layer.id, "fill-color", "#d3e4dc");
          else if (layer.type === "fill" && /park|wood|grass|forest/.test(layer.id))
            map!.setPaintProperty(layer.id, "fill-color", "#e1ece3");
        } catch {
          /* layer without that paint property */
        }
      }
      handleReady();
    });

    return () => map?.remove();
  }, [lat, lng, label, hint]);

  // MapLibre's CSS makes its container position:relative, so it sits inside an absolutely positioned box.
  return (
    <div className="absolute inset-0">
      <div ref={container} className="h-full w-full" />
    </div>
  );
}
