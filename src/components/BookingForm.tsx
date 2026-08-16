"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { bookingOptions, optionForType, type BookingType } from "@/lib/tours";
import { site, whatsappLink } from "@/lib/site";
import { DatePicker } from "@/components/DatePicker";

const inputCls =
  "w-full rounded-xl border border-sea-600/20 bg-white px-4 py-3 text-ink outline-none transition focus:border-sea-500 focus:ring-2 focus:ring-sea-500/30";
const labelCls = "block text-sm font-semibold text-sea-800 mb-1.5";

type Availability = { remaining: number; capacity: number } | null;

export function BookingForm({ defaultType = "budva-caves" }: { defaultType?: BookingType }) {
  const [type, setType] = useState<BookingType>(defaultType);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const slots = useMemo(() => optionForType(type)?.slots ?? [], [type]);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<string>(slots[0] ?? "");
  const [availability, setAvailability] = useState<Availability>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  // Keep the selected time slot valid whenever the experience type changes.
  useEffect(() => {
    if (!(slots as readonly string[]).includes(timeSlot)) setTimeSlot(slots[0] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots]);

  // Check live availability whenever the type, date or time slot changes.
  useEffect(() => {
    if (!date || !timeSlot) {
      setAvailability(null);
      return;
    }
    let cancelled = false;
    setCheckingAvailability(true);
    const params = new URLSearchParams({ type, date, timeSlot });
    fetch(`/api/availability?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setAvailability({ remaining: data.remaining, capacity: data.capacity });
        else setAvailability(null);
      })
      .catch(() => {
        if (!cancelled) setAvailability(null);
      })
      .finally(() => {
        if (!cancelled) setCheckingAvailability(false);
      });
    return () => {
      cancelled = true;
    };
  }, [type, date, timeSlot]);

  const soldOut = availability !== null && availability.remaining <= 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setErrors({});

    if (!date) {
      setStatus("error");
      setErrors({ date: ["Please choose a date."] });
      return;
    }

    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = {
      type,
      date: fd.get("date"),
      timeSlot: fd.get("timeSlot"),
      adults: fd.get("adults"),
      children: fd.get("children"),
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      notes: fd.get("notes"),
      waiverAccepted: fd.get("waiverAccepted") === "on",
      company: fd.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        if (data.fieldErrors) setErrors(data.fieldErrors);
      }
    } catch {
      setStatus("error");
      setMessage("Network error — please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card-soft rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-status-good)_15%,white)] text-3xl">
          🎉
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-ink">Request received!</h3>
        <p className="mx-auto mt-3 max-w-md text-sea-800/80">
          Thanks — we&apos;ve emailed you a summary and will confirm your spot shortly. Payment is on the day,
          so there&apos;s nothing more to do right now.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-sea-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sea-700">
            Back to home
          </Link>
          <button
            onClick={() => setStatus("idle")}
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sea-800 ring-1 ring-sea-600/20 hover:bg-mist"
          >
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  const err = (f: string) => errors[f]?.[0];

  return (
    <form onSubmit={onSubmit} className="card-soft rounded-3xl p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="type">Experience</label>
          <select
            id="type"
            name="type"
            className={inputCls}
            value={type}
            onChange={(e) => setType(e.target.value as BookingType)}
          >
            {bookingOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="date">Date</label>
          <DatePicker name="date" value={date} onChange={setDate} />
          {err("date") && <p className="mt-1 text-xs text-coral-dark">{err("date")}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="timeSlot">Time slot</label>
          <select
            id="timeSlot"
            name="timeSlot"
            required
            className={inputCls}
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
          >
            {slots.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {date && timeSlot && (
          <div className="sm:col-span-2">
            {soldOut ? (
              <div className="flex items-center gap-3 rounded-xl bg-[color-mix(in_srgb,var(--color-status-danger)_12%,white)] px-4 py-3 text-sm font-semibold text-[var(--color-status-danger)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 8l8 8M16 8l-8 8" strokeLinecap="round" />
                </svg>
                <span>Sold out, please select another time</span>
              </div>
            ) : availability ? (
              <div className="flex items-center gap-3 rounded-xl bg-[color-mix(in_srgb,var(--color-status-good)_12%,white)] px-4 py-3 text-sm font-semibold text-sea-800">
                <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-[var(--color-status-good)]" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="10" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{availability.remaining} spot{availability.remaining === 1 ? "" : "s"} available</span>
              </div>
            ) : checkingAvailability ? (
              <div className="flex items-center gap-3 rounded-xl bg-mist px-4 py-3 text-sm font-medium text-sea-700/70">
                Checking availability…
              </div>
            ) : null}
          </div>
        )}

        <div>
          <label className={labelCls} htmlFor="adults">Adults</label>
          <input id="adults" name="adults" type="number" min={1} max={20} defaultValue={2} required className={inputCls} />
        </div>

        <div>
          <label className={labelCls} htmlFor="children">Children</label>
          <input id="children" name="children" type="number" min={0} max={20} defaultValue={0} className={inputCls} />
        </div>

        <div>
          <label className={labelCls} htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required className={inputCls} placeholder="Jane Doe" />
          {err("name") && <p className="mt-1 text-xs text-coral-dark">{err("name")}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" required className={inputCls} placeholder="+382 …" />
          {err("phone") && <p className="mt-1 text-xs text-coral-dark">{err("phone")}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@email.com" />
          {err("email") && <p className="mt-1 text-xs text-coral-dark">{err("email")}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="notes">Anything we should know? <span className="font-normal text-sea-700/60">(optional)</span></label>
          <textarea id="notes" name="notes" rows={3} className={inputCls} placeholder="Experience level, ages of children, special requests…" />
        </div>

        {/* Honeypot — hidden from users */}
        <div className="hidden" aria-hidden>
          <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 rounded-xl bg-mist p-4 text-sm text-sea-800">
            <input type="checkbox" name="waiverAccepted" required className="mt-0.5 h-5 w-5 flex-none accent-[var(--color-sea-600)]" />
            <span>
              I confirm all participants can swim, are in good health, and I understand payment is made in
              person on the day (cash or card).
            </span>
          </label>
          {err("waiverAccepted") && <p className="mt-1 text-xs text-coral-dark">{err("waiverAccepted")}</p>}
        </div>
      </div>

      {status === "error" && message && (
        <p className="mt-5 rounded-xl bg-[color-mix(in_srgb,var(--color-status-danger)_10%,white)] px-4 py-3 text-sm font-medium text-[var(--color-status-danger)]">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || soldOut}
        className="mt-6 w-full rounded-full bg-coral px-7 py-4 text-base font-semibold text-white shadow-lg shadow-coral/30 transition-all hover:bg-coral-dark hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "submitting" ? "Sending request…" : soldOut ? "Sold out — pick another time" : "Request booking"}
      </button>
      <p className="mt-3 text-center text-xs text-sea-700/60">
        No payment now · we&apos;ll confirm by email · pay on the day. Questions?{" "}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener"
          className="font-semibold text-sea-600 underline"
        >
          WhatsApp {site.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}
