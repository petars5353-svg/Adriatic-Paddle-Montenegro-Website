"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Button } from "./ui";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-foam/85 backdrop-blur-md shadow-sm shadow-sea-900/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo className="h-9 w-9 text-sea-600" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => {
            const isTour = item.href.startsWith("/tours/");
            return isTour ? (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-sea-600/10 px-4 py-2 text-sm font-semibold text-sea-700 ring-1 ring-inset ring-sea-600/30 transition-all hover:bg-sea-600 hover:text-white hover:ring-sea-600"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 text-sm font-medium text-sea-800/80 transition-colors hover:text-sea-600"
              >
                {item.label}
              </Link>
            );
          })}
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
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="mx-5 mb-4 rounded-2xl bg-white p-4 shadow-xl shadow-sea-900/10 ring-1 ring-sea-600/10">
          {nav.map((item) => {
            const isTour = item.href.startsWith("/tours/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  isTour
                    ? "mb-1 block rounded-xl bg-sea-600/10 px-4 py-3 text-base font-semibold text-sea-700 ring-1 ring-inset ring-sea-600/25"
                    : "block rounded-xl px-4 py-3 text-base font-medium text-sea-800 hover:bg-mist"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/book" className="mt-2 w-full" size="lg">
            Book now
          </Button>
        </nav>
      </div>
    </header>
  );
}
