import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTour, tours } from "@/lib/tours";
import { site } from "@/lib/site";
import { Container, Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { MapSection } from "@/components/MapSection";
import { ConditionsWidget } from "@/components/ConditionsWidget";
import { BookingForm } from "@/components/BookingForm";

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) return {};
  return {
    title: tour.title,
    description: tour.intro,
    openGraph: { title: `${tour.title} · ${site.name}`, description: tour.intro, images: [tour.heroImage] },
  };
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/95 px-4 py-3 text-center shadow-xl shadow-sea-900/30 ring-1 ring-white/60 backdrop-blur">
      <div className="text-lg font-bold text-ink">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-sea-600">{label}</div>
    </div>
  );
}

export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tour = getTour(slug);
  if (!tour) notFound();

  const locationKey = tour.location.conditions.key;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <Image src={tour.heroImage} alt={tour.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sea-900/50 via-sea-900/30 to-sea-900/75" />
        <Container className="relative z-10 flex min-h-[70vh] flex-col justify-end pb-14 pt-32 text-white">
          <Reveal>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
              {tour.place}, Montenegro
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">{tour.title}</h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">{tour.tagline}</p>
            <div className="mt-8 grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
              <Fact label="Duration" value={`${tour.durationHours} hrs`} />
              <Fact label="Price" value={`${site.currency}${tour.price} pp`} />
              <Fact label="Level" value={tour.difficulty.split(" ")[0]} />
              <Fact label="Min age" value={`${tour.minAge}+`} />
            </div>
            <div className="mt-8"><Button href={`/book?tour=${tour.bookingType}`} size="lg">Book this tour</Button></div>
          </Reveal>
        </Container>
      </section>
      <WaveDivider className="text-foam" />

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2">
            <Reveal>
              <Eyebrow>The experience</Eyebrow>
              <p className="mt-3 text-lg leading-relaxed text-sea-800/85">{tour.intro}</p>
            </Reveal>

            {/* Highlights */}
            <Reveal className="mt-8">
              <h2 className="text-2xl font-semibold">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {tour.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 rounded-xl bg-mist px-4 py-3 text-sea-800">
                    <span className="text-sea-500">◆</span>
                    <span className="text-sm">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Itinerary timeline */}
            <Reveal className="mt-10">
              <h2 className="text-2xl font-semibold">Your itinerary</h2>
              <ol className="mt-6 space-y-6 border-l-2 border-sea-200 pl-6">
                {tour.itinerary.map((step) => (
                  <li key={step.time} className="relative">
                    <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-coral ring-4 ring-foam" />
                    <div className="text-xs font-bold uppercase tracking-wide text-coral">{step.time}</div>
                    <h3 className="mt-1 font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm text-sea-800/75">{step.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Includes / bring */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal>
                <div className="card-soft h-full rounded-2xl p-6">
                  <h3 className="font-semibold text-ink">What&apos;s included</h3>
                  <ul className="mt-3 space-y-2 text-sm text-sea-800/80">
                    {tour.includes.map((x) => (
                      <li key={x} className="flex gap-2"><span className="text-sea-500">✓</span>{x}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div className="card-soft h-full rounded-2xl p-6">
                  <h3 className="font-semibold text-ink">What to bring</h3>
                  <ul className="mt-3 space-y-2 text-sm text-sea-800/80">
                    {tour.bring.map((x) => (
                      <li key={x} className="flex gap-2"><span className="text-coral">•</span>{x}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Gallery */}
            <Reveal className="mt-10">
              <h2 className="text-2xl font-semibold">Gallery</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {tour.gallery.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={src} alt={`${tour.title} photo ${i + 1}`} fill sizes="33vw" className="object-cover transition-transform duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Reveal><ConditionsWidget location={locationKey} /></Reveal>
              <Reveal delay={80}>
                <div className="card-soft rounded-2xl p-6 text-center">
                  <div className="text-sm text-sea-700">From</div>
                  <div className="text-4xl font-semibold text-sea-600">{site.currency}{tour.price}<span className="text-base font-normal text-sea-700"> / person</span></div>
                  <p className="mt-2 text-xs text-sea-700/70">Slots at {tour.timeSlots.join(" & ")} · {site.season}</p>
                  <Button href={`/book?tour=${tour.bookingType}`} className="mt-4 w-full" size="lg">Request booking</Button>
                  <p className="mt-3 text-xs text-sea-700/60">No payment now — pay on the day.</p>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>

        {/* Launch map */}
        <Reveal className="mt-14">
          <div className="max-w-2xl">
            <Eyebrow>Getting there</Eyebrow>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Launch map &amp; meeting point</h2>
            <p className="mt-3 text-sea-800/80">
              Everything you need to find us in {tour.place}: parking, the meeting point, restrooms and the exact
              launch dock. Tap a pin for directions.
            </p>
          </div>
          <div className="mt-6">
            <MapSection center={tour.location.center} zoom={tour.location.zoom} pins={tour.location.pins} />
          </div>
        </Reveal>
      </Container>

      {/* Booking */}
      <div className="bg-mist py-16" id="book">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Book</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold">Reserve the {tour.place} tour</h2>
            <p className="mt-3 text-sea-800/80">Request your spot below — we&apos;ll confirm availability by email.</p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <BookingForm defaultType={tour.bookingType} />
          </div>
        </Container>
      </div>
    </>
  );
}
