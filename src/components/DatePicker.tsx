"use client";
import { useEffect, useRef, useState } from "react";

// Only Friday, Saturday and Sunday are bookable.
const ALLOWED_WEEKDAYS = new Set([5, 6, 0]); // Fri, Sat, Sun (JS getDay(): 0 = Sun)

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function isAllowedDay(date: Date) {
  return ALLOWED_WEEKDAYS.has(date.getDay());
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

const inputCls =
  "w-full rounded-xl border border-sea-600/20 bg-white px-4 py-3 text-left text-ink outline-none transition focus:border-sea-500 focus:ring-2 focus:ring-sea-500/30";

export function DatePicker({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const today = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  // Monday-first grid: shift so Monday = 0 ... Sunday = 6
  const leadBlank = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (Date | null)[] = [
    ...Array.from({ length: leadBlank }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];

  const canGoPrevMonth = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  function goPrevMonth() {
    if (!canGoPrevMonth) return;
    const m = viewMonth === 0 ? 11 : viewMonth - 1;
    const y = viewMonth === 0 ? viewYear - 1 : viewYear;
    setViewMonth(m);
    setViewYear(y);
  }
  function goNextMonth() {
    const m = viewMonth === 11 ? 0 : viewMonth + 1;
    const y = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewMonth(m);
    setViewYear(y);
  }

  function selectDay(d: Date) {
    onChange(toDateStr(d.getFullYear(), d.getMonth(), d.getDate()));
    setOpen(false);
  }

  const displayValue = value
    ? new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="relative" ref={wrapRef}>
      {/* Hidden field so the surrounding <form>'s FormData keeps working unchanged. */}
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={`${inputCls} flex items-center justify-between gap-2`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={displayValue ? "" : "text-sea-700/50"}>
          {displayValue || "Choose a date"}
        </span>
        <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-sea-600" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-80 max-w-[90vw] rounded-2xl border border-sea-600/15 bg-white p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={!canGoPrevMonth}
              className="rounded-full p-1.5 text-sea-700 hover:bg-mist disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Previous month"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="text-sm font-semibold text-ink">
              {MONTH_LABELS[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={goNextMonth}
              className="rounded-full p-1.5 text-sea-700 hover:bg-mist"
              aria-label="Next month"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-sea-700/60">
            {WEEKDAY_LABELS.map((w) => (
              <div key={w} className="py-1">{w}</div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={`blank-${i}`} />;
              const dateStr = toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
              const isPast = startOfDay(d) < today;
              const weekdayBlocked = !isAllowedDay(d);
              const disabled = isPast || weekdayBlocked;
              const isSelected = value === dateStr;

              return (
                <button
                  key={dateStr}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(d)}
                  title={weekdayBlocked ? "We only run tours Friday–Sunday" : undefined}
                  className={[
                    "rounded-lg py-2 text-sm transition",
                    isSelected
                      ? "bg-sea-600 font-semibold text-white"
                      : disabled
                      ? weekdayBlocked
                        ? "text-sea-700/30 line-through cursor-not-allowed"
                        : "text-sea-700/25 cursor-not-allowed"
                      : "text-ink hover:bg-mist",
                  ].join(" ")}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-sea-700/60">
            We run tours Friday, Saturday &amp; Sunday only.
          </p>
        </div>
      )}
    </div>
  );
}
