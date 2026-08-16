import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Container, Button, SectionHeading, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { TourCard } from "@/components/TourCard";
import { ConditionsWidget } from "@/components/ConditionsWidget";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { tours } from "@/lib/tours";
import { faq } from "@/lib/faq";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

const FEATURES = [
  { icon: "🧭", title: "Local expert guides", text: "Attentive guides with local knowledge of the landscapes, history and waves." },
  { icon: "👣", title: "Small groups", text: "Max 10 per tour so it stays personal, relaxed and safe." },
  { icon: "🦺", title: "Safety first", text: "Quality kayaks, new equipment, and constant monitoring of conditions." },
  { icon: "🌿", title: "Leave-no-trace", text: "We paddle lightly, protecting the coastline we love to share." },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="-mt-1">
        <WaveDivider className="text-foam" />
      </div>

      {/* Intro / about teaser */}
      <Container className="py-8 sm:py-12">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <Eyebrow>Welcome</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl text-balance">
              Montenegro&apos;s coastline, seen the way it should be, from the water.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sea-800/80">
              {site.name}{" "}runs small-group sea kayak and paddleboard tours in two of the Adriatic&apos;s most
              stunning settings: the caves and coves of <strong>Budva</strong> and the mountain-ringed{" "}
              <strong>Bay of Kotor</strong>. Whether it&apos;s your first time in a kayak or you&apos;re chasing
              cliff jumps, we&apos;ll get you there safely — and grinning.
            </p>
            <div className="mt-6 flex gap-3">
              <Button href="/about" variant="ghost">Our story</Button>
              <Button href="/book" variant="secondary">Book a tour</Button>
            </div>
          </Reveal>
          <div className="overflow-hidden rounded-3xl card-soft">
            <Image
              src={images.homeIntro}
              alt="Golden hour on the Bay of Kotor"
              width={1350}
              height={1800}
              sizes="(max-width:768px) 100vw, 50vw"
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>
      </Container>

      {/* Tours */}
      <Container className="py-14">
        <Reveal><SectionHeading eyebrow="Our tours" title="Choose your adventure" center intro="Two signature half-day tours, both beginner-friendly and led by local guides." /></Reveal>
        <div className="mt-10 grid gap-7 md:grid-cols-2">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 120}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Live conditions band */}
      <div className="bg-mist py-16">
        <Container>
          <Reveal><SectionHeading eyebrow="Plan smart" title="Live water conditions" intro="Real-time marine data for both locations — so you always know what to expect before you paddle." /></Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Reveal><ConditionsWidget location="budva" /></Reveal>
            <Reveal delay={120}><ConditionsWidget location="kotor" /></Reveal>
          </div>
        </Container>
      </div>

      {/* Why us */}
      <Container className="py-16">
        <Reveal><SectionHeading eyebrow="Why paddle with us" title="Small groups, big adventures" center /></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="card-soft h-full rounded-2xl p-6">
                <div className="text-3xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sea-800/75">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Reviews */}
      <div className="bg-sand-100 py-20">
        <Container>
          <Reveal className="text-center"><Eyebrow>Loved by paddlers</Eyebrow></Reveal>
          <div className="mt-8"><ReviewCarousel /></div>
        </Container>
      </div>

      {/* Gallery teaser */}
      <Container className="py-16">
        <Reveal><SectionHeading eyebrow="From past tours" title="A few moments on the water" /></Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.gallery.slice(0, 4).map((src, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="relative aspect-square overflow-hidden rounded-2xl">
                <Image src={src} alt="Past kayak tour" fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center"><Button href="/gallery" variant="secondary">View full gallery</Button></div>
      </Container>

      {/* FAQ teaser */}
      <Container className="pb-20">
        <Reveal><SectionHeading eyebrow="Good to know" title="Frequently asked questions" center /></Reveal>
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQAccordion items={faq.slice(0, 5)} />
          <p className="mt-6 text-center text-sm text-sea-800/70">
            More questions? <Link href="/faq" className="font-semibold text-sea-600 underline">See the full FAQ</Link> or message us on WhatsApp.
          </p>
        </div>
      </Container>

      {/* Final CTA */}
      <div className="relative overflow-hidden bg-sea-600">
        <WaveDivider className="text-foam" />
        <Container className="py-16 text-center text-white">
          <Reveal>
            <h2 className="text-3xl font-semibold text-foam sm:text-4xl">Ready to hit the water?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Reserve your spot using the link below. No payment needed to book, email confirmation will be sent
              out shortly.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Button href="/book" variant="ghost" size="lg">Book a tour</Button>
            </div>
          </Reveal>
        </Container>
      </div>
    </>
  );
}
