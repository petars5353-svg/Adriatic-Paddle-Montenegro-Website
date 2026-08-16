"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Button } from "./ui";

const tourLinks = nav.filter((item) => item.href.startsWith("/tours/"));
const mainLinks = nav.filter((item) => !item.href.startsWith("/tours/"));

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);
  const toursRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the tours dropdown on outside click or Escape.
  useEffect(() => {
    if (!toursOpen) return;
    const onDown = (e: MouseEvent) => {
      if (toursRef.current && !toursRef.current.contains(e.target as Node)) setToursOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToursOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [toursOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-foam/85 backdrop-blur-md shadow-sm shadow-sea-900/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-md ring-2 ring-white/80">
            <Image src="/logo-badge.png" alt={`${site.name} logo`} fill sizes="40px" className="object-cover" priority />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {/* Tours dropdown — replaces the individual Budva / Kotor tabs */}
          <div
            ref={toursRef}
            className="relative"
            onMouseEnter={() => setToursOpen(true)}
            onMouseLeave={() => setToursOpen(false)}
          >
            <button
              type="button"
              onClick={() => setToursOpen(true)}
              onFocus={() => setToursOpen(true)}
              aria-haspopup="menu"
              aria-expanded={toursOpen}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ring-1 ring-inset transition-all ${
                toursOpen
                  ? "bg-sea-600 text-white ring-sea-600"
                  : "bg-sea-600/10 text-sea-700 ring-sea-600/30 hover:bg-sea-600 hover:text-white hover:ring-sea-600"
              }`}
            >
              View our Tours
              <Chevron open={toursOpen} />
            </button>

            <div
              role="menu"
              className={`absolute left-0 top-full z-50 min-w-[13rem] pt-2 transition-all duration-150 ${
                toursOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
              }`}
            >
              <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl shadow-sea-900/10 ring-1 ring-sea-600/10">
                {tourLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setToursOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mist hover:text-sea-600"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2 text-sm font-medium text-ink/80 transition-colors hover:text-sea-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/book" size="md">
            Book now
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-sea-800 ring-1 ring-sea-600/15 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-[30rem]" : "max-h-0"}`}
      >
        <nav className="mx-5 mb-4 rounded-2xl bg-white p-4 shadow-xl shadow-sea-900/10 ring-1 ring-sea-600/10">
          {/* Tours group */}
          <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wider text-sea-600">View our Tours</p>
          {tourLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="mb-1 block rounded-xl bg-sea-600/10 px-4 py-3 text-base font-semibold text-sea-700 ring-1 ring-inset ring-sea-600/25"
            >
              {item.label}
            </Link>
          ))}

          <div className="my-2 h-px bg-sea-600/10" />

          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-ink hover:bg-mist"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/book" className="mt-2 w-full" size="lg">
            Book now
          </Button>
        </nav>
      </div>
    </header>
  );
}
