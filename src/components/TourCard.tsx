import Image from "next/image";
import Link from "next/link";
import type { Tour } from "@/lib/tours";
import { site } from "@/lib/site";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group card-soft flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sea-900/15"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={tour.heroImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-sea-700 backdrop-blur">
          {tour.place}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-coral px-3 py-1 text-sm font-bold text-white">
          {site.currency}{tour.price} pp
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink">{tour.title}</h3>
        <p className="mt-1 text-sm text-sea-800/70">{tour.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sea-700">
          <span>⏱ {tour.durationHours} hrs</span>
          <span>🌊 {tour.difficulty}</span>
          <span>👥 max {tour.maxGroup}</span>
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-coral">
          View tour &amp; book
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
