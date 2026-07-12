"use client";
import dynamic from "next/dynamic";
import type { MapPin } from "@/lib/tours";

// Leaflet touches `window`, so load the map client-side only.
const LaunchMap = dynamic(() => import("./LaunchMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-sea-100 text-sm text-sea-700">
      Loading map…
    </div>
  ),
});

const LEGEND: { emoji: string; label: string }[] = [
  { emoji: "📍", label: "Meeting point" },
  { emoji: "🅿️", label: "Parking" },
  { emoji: "🚻", label: "Restrooms" },
  { emoji: "🛶", label: "Launch dock" },
];

export function MapSection({
  center,
  zoom,
  pins,
}: {
  center: [number, number];
  zoom: number;
  pins: MapPin[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl card-soft">
      <div className="h-[360px] w-full sm:h-[420px]">
        <LaunchMap center={center} zoom={zoom} pins={pins} />
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-sea-600/10 bg-white px-4 py-3">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-xs font-medium text-sea-800/80">
            <span>{l.emoji}</span>
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
