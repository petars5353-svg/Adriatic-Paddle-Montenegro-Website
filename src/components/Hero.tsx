"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui";
import { images } from "@/lib/images";

const HEADLINES = ["coastal caves", "hidden coves", "the Bay of Kotor", "turquoise water"];

export function Hero() {
  const [slide, setSlide] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const a = setInterval(() => setSlide((s) => (s + 1) % images.heroSlides.length), 6000);
    const b = setInterval(() => setWord((w) => (w + 1) % HEADLINES.length), 3000);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* Slides */}
      {images.heroSlides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className={`h-full w-full bg-cover bg-center ${i === slide ? "kenburns" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}

      {/* Wash for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-sea-900/55 via-sea-900/30 to-sea-900/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-6xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
          Budva · Bay of Kotor · Montenegro
        </span>
        <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
          Sea kayak tours to{" "}
          <span className="relative inline-block">
            <span key={word} className="text-sea-300" style={{ animation: "fade-up .6s var(--ease-out-soft)" }}>
              {HEADLINES[word]}
            </span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
          Small-group guided paddles along Montenegro&apos;s most beautiful coastline. Caves, cliffs, swimming
          and calm turquoise bays — no experience needed.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/book" size="lg">
            Book a tour
          </Button>
          <Button href="/tours/budva-coastal-caves" variant="ghost" size="lg">
            Explore tours
          </Button>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:left-8 sm:translate-x-0">
        {images.heroSlides.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setSlide(i)}
            className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-white" : "w-3 bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
