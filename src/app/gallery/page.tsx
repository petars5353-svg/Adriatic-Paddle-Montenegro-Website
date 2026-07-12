import Image from "next/image";
import type { Metadata } from "next";
import { Container, Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from past kayak tours in Budva and the Bay of Kotor, Montenegro.",
};

// Alt text for past-tour photos — swap with your own. ‹CONFIRM›
const CAPTIONS = [
  "Morning paddle out of Budva",
  "Exploring the coastal caves",
  "Inside a sea cave",
  "A quiet swimming cove",
  "Crossing the Bay of Kotor",
  "Cliff-jumping spot near Kotor",
  "Sunset SUP session",
  "Guides & guests, post-paddle",
  "Golden hour on the Adriatic",
];

export default function GalleryPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>From past tours</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Moments on the water</h1>
        <p className="mt-4 text-lg text-sea-800/80">
          A look back at real tours with real guests along Montenegro&apos;s coast. Your photo could be next.
        </p>
      </Reveal>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.gallery.map((src, i) => (
          <Reveal key={i} delay={(i % 3) * 80}>
            <figure className="group relative overflow-hidden rounded-2xl card-soft">
              <div className="relative aspect-[4/3]">
                <Image src={src} alt={CAPTIONS[i] ?? "Past kayak tour"} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 text-center">
        <h2 className="text-2xl font-semibold">Want to make your own memories?</h2>
        <div className="mt-5"><Button href="/book" size="lg">Book a tour</Button></div>
      </div>

      <Reveal className="mx-auto mt-12 max-w-2xl">
        <div className="card-soft rounded-3xl bg-gradient-to-br from-sea-600 to-sea-800 p-8 text-center text-white sm:p-10">
          <svg viewBox="0 0 24 24" className="mx-auto h-10 w-10" fill="currentColor" aria-hidden>
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-.9.04-1.38.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.33-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.38.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.33.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.33.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.38-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.33-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.3 5.3 0 1 1 0 10.6 5.3 5.3 0 0 1 0-10.6Zm0 1.62a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm5.48-.16a1.24 1.24 0 1 1-2.48 0 1.24 1.24 0 0 1 2.48 0Z" />
          </svg>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Want to see more?</h2>
          <p className="mx-auto mt-2 max-w-md text-white/85">
            Follow us on Instagram for the latest photos and videos from the water.
          </p>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-sea-700 shadow-lg shadow-sea-900/25 transition-all hover:-translate-y-0.5 hover:bg-foam"
          >
            Follow us on Instagram
          </a>
        </div>
      </Reveal>
    </Container>
  );
}
