"use client";
import { useEffect, useState } from "react";
import { reviews } from "@/lib/reviews";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-coral" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} aria-hidden>{i < n ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export function ReviewCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[i];

  return (
    <div
      className="relative mx-auto max-w-2xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={i} style={{ animation: "fade-up .5s var(--ease-out-soft)" }}>
        <div className="flex justify-center"><Stars n={r.rating} /></div>
        <blockquote className="mt-5 font-display text-2xl leading-snug text-ink sm:text-3xl text-balance">
          “{r.quote}”
        </blockquote>
        <div className="mt-5 text-sm text-sea-800/70">
          <span className="font-semibold text-sea-800">{r.name}</span> · {r.origin}
          <span className="mx-2 text-sea-400">•</span>
          <span className="text-sea-700/60">via {r.source}</span>
        </div>
      </div>

      <div className="mt-7 flex justify-center gap-2">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Show review ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-7 bg-coral" : "w-2 bg-sea-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
