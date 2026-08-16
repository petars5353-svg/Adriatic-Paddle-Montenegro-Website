import Image from "next/image";
import type { Metadata } from "next";
import { Container, Button, Eyebrow, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `The story behind ${site.name} — local guides sharing Montenegro's coast by kayak.`,
};

const VALUES = [
  { icon: "🌊", title: "Local & authentic", text: "We grew up on this coast. Every tour is shaped by a lifetime of knowing these waters." },
  { icon: "🦺", title: "Safety obsessed", text: "Certified guides, quality equipment and honest conditions calls — always." },
  { icon: "🐬", title: "Respect for nature", text: "Small groups and leave-no-trace paddling to keep the Adriatic pristine." },
];

const STATS = [
  { n: "3+", l: "Years on the water" },
  { n: "6", l: "Kayaks and 1 SUP" },
  { n: "4.9★", l: "Average rating" },
  { n: "2", l: "Stunning locations" },
];

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal>
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl text-balance">Hi, I&apos;m Petar</h1>
          <p className="mt-5 text-lg leading-relaxed text-sea-800/80">
            {site.name}{" "}started with a simple belief: the best way to experience Montenegro&apos;s coast isn&apos;t
            from a crowded beach or a tour bus. It is from the water itself. Whether exploring a cave, or learning
            about the picturesque old towns of Budva or Kotor, our tours provide a combination of dynamic
            adventure, vibrant history, and the refreshing freedom of the Adriatic sea.
          </p>
          <p className="mt-4 leading-relaxed text-sea-800/80">
            Over the last 25 years in Montenegro I have cultivated a deep knowledge and interest in our
            region&apos;s rich heritage and landscapes. One day I decided to combine this with my keen interest in
            water sports and love of nature and constant exploration. Just like that, Adriatic Paddle was born.
          </p>
          <p className="mt-4 leading-relaxed text-sea-800/80">
            So whether you&apos;ve never picked a paddle or you&apos;re chasing your next big adventure, I
            can&apos;t wait to share with you a slice of the Montenegro I&apos;ve grown to love.
          </p>
          <div className="mt-7"><Button href="/book">Paddle with us</Button></div>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl card-soft">
            <Image src={images.aboutMe} alt="Your guide above the Bay of Kotor" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" />
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16">
        <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl card-soft sm:max-w-lg">
          <Image src={images.aboutMe2} alt="Guiding a group through a sea cave" fill sizes="(max-width:640px) 100vw, 512px" className="object-cover" />
        </div>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl bg-sea-700 p-8 text-center text-white sm:grid-cols-4">
        {STATS.map((s) => (
          <Reveal key={s.l}>
            <div className="text-3xl font-semibold sm:text-4xl">{s.n}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-white/70">{s.l}</div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16">
        <Reveal><SectionHeading eyebrow="What we stand for" title="Our values" center /></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card-soft h-full rounded-2xl p-7 text-center">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sea-800/75">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
}
