import Image from "next/image";
import type { Metadata } from "next";
import { Container, Button, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { rentals } from "@/lib/tours";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kayak & SUP rentals",
  description: "Rent single or double kayaks and stand-up paddleboards by the hour or day in Montenegro.",
};

const INCLUDED = ["Life jacket for each paddler", "Dry bag", "Quick safety briefing", "Route & conditions tips"];

export default function RentalsPage() {
  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Image src={images.rentals} alt="Kayak and paddleboard rentals" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-sea-900/40 to-sea-900/75" />
        <Container className="relative z-10 pb-14 pt-32 text-white">
          <Reveal>
            <Eyebrow>Rentals</Eyebrow>
            <h1 className="mt-3 text-4xl font-semibold sm:text-6xl">Explore at your own pace</h1>
            <p className="mt-4 max-w-xl text-lg text-white/85">
              Grab a kayak or paddleboard by the hour or for the whole day and discover the coast on your own
              schedule.
            </p>
          </Reveal>
        </Container>
      </section>
      <WaveDivider className="text-foam" />

      <Container className="py-14">
        <Reveal><SectionHeading eyebrow="Rates" title="Pick your gear" center intro="Prices per item. Availability is weather-dependent — request a rental and we'll confirm." /></Reveal>
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {rentals.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <div className="card-soft flex h-full flex-col rounded-3xl p-7">
                <h3 className="text-xl font-semibold text-ink">{r.name}</h3>
                <p className="mt-2 flex-1 text-sm text-sea-800/75">{r.blurb}</p>
                <div className="mt-5 flex items-end gap-4">
                  <div>
                    <div className="text-3xl font-semibold text-ink">{site.currency}{r.hourly}</div>
                    <div className="text-xs uppercase tracking-wide text-sea-700/70">per hour</div>
                  </div>
                  <div className="text-sea-300">|</div>
                  <div>
                    <div className="text-3xl font-semibold text-ink">{site.currency}{r.daily}</div>
                    <div className="text-xs uppercase tracking-wide text-sea-700/70">per day</div>
                  </div>
                </div>
                <Button href="/book?tour=rental" className="mt-6 w-full">Rent this</Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-3xl bg-sea-700 px-8 py-10 text-white sm:px-12">
            <h2 className="text-2xl font-semibold">Every rental includes</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((x) => (
                <li key={x} className="flex items-center gap-2 text-white/90"><span className="text-sea-300">✓</span>{x}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/70">
              Minimum age and swimming ability apply. A refundable deposit or ID may be required at pickup. ‹CONFIRM›
            </p>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
