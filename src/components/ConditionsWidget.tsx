"use client";
import { useEffect, useState } from "react";
import type { Conditions } from "@/lib/conditions";

const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string; ring: string }> = {
  good: { dot: "bg-[var(--color-status-good)]", bg: "bg-[color-mix(in_srgb,var(--color-status-good)_12%,white)]", text: "text-[var(--color-status-good)]", ring: "ring-[var(--color-status-good)]/30" },
  caution: { dot: "bg-[var(--color-status-caution)]", bg: "bg-[color-mix(in_srgb,var(--color-status-caution)_14%,white)]", text: "text-[var(--color-status-caution)]", ring: "ring-[var(--color-status-caution)]/30" },
  danger: { dot: "bg-[var(--color-status-danger)]", bg: "bg-[color-mix(in_srgb,var(--color-status-danger)_12%,white)]", text: "text-[var(--color-status-danger)]", ring: "ring-[var(--color-status-danger)]/30" },
};

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/70 px-3 py-2.5 text-center ring-1 ring-sea-600/10">
      <div className="text-lg font-semibold text-ink tabular-nums">{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-sea-700/70">{label}</div>
    </div>
  );
}

export function ConditionsWidget({ location, className = "" }: { location: "budva" | "kotor"; className?: string }) {
  const [data, setData] = useState<Conditions | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setError(false);
    fetch(`/api/conditions?location=${location}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Conditions) => active && setData(d))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [location]);

  const s = data ? STATUS_STYLES[data.status] : STATUS_STYLES.good;

  return (
    <div className={`card-soft rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-sea-700">Live conditions</h3>
        <span className="text-xs text-sea-700/60">{data?.location ?? ""}</span>
      </div>

      {error || (data && !data.available) ? (
        <p className="mt-4 text-sm text-sea-800/70">
          Live conditions are unavailable right now. Message us on WhatsApp and we&apos;ll give you the latest
          on-water report.
        </p>
      ) : !data ? (
        <div className="mt-4 animate-pulse space-y-3">
          <div className="h-10 rounded-xl bg-sea-100" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-sea-100" />
            <div className="h-14 rounded-xl bg-sea-100" />
            <div className="h-14 rounded-xl bg-sea-100" />
          </div>
        </div>
      ) : (
        <>
          <div className={`mt-4 flex items-center gap-3 rounded-xl px-4 py-3 ring-1 ${s.bg} ${s.ring}`}>
            <span className={`relative flex h-3 w-3`}>
              <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${s.dot}`} />
              <span className={`relative inline-flex h-3 w-3 rounded-full ${s.dot}`} />
            </span>
            <span className={`text-sm font-semibold ${s.text}`}>{data.statusLabel}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Metric label="Water" value={data.waterTemp !== null ? `${data.waterTemp}°C` : "—"} />
            <Metric label="Wind" value={data.windSpeed !== null ? `${data.windSpeed} km/h` : "—"} />
            <Metric label="Waves" value={data.waveHeight !== null ? `${data.waveHeight} m` : "calm"} />
          </div>
          <p className="mt-3 text-[11px] text-sea-700/50">
            Source: Open-Meteo marine &amp; weather · updates every 15 min
          </p>
        </>
      )}
    </div>
  );
}
