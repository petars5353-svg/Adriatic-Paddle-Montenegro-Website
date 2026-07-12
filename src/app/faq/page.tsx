import type { Metadata } from "next";
import Link from "next/link";
import { Container, Button, Eyebrow } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faq, type FaqItem } from "@/lib/faq";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ & knowledge base",
  description: "Everything you need to know before your kayak tour: what to bring, safety, weather and cancellation policy.",
};

const GROUPS: FaqItem["group"][] = ["Before you book", "On the day", "Safety & weather", "Policies"];

export default function FaqPage() {
  return (
    <Container className="py-16 sm:py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <Eyebrow>Knowledge base</Eyebrow>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 text-lg text-sea-800/80">
          Everything you need to know before you paddle. Still stuck? We&apos;re a message away.
        </p>
      </Reveal>

      <div className="mx-auto mt-12 max-w-3xl space-y-10">
        {GROUPS.map((group) => {
          const items = faq.filter((f) => f.group === group);
          if (!items.length) return null;
          return (
            <Reveal key={group}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-sea-600">{group}</h2>
              <FAQAccordion items={items} />
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mx-auto mt-14 max-w-3xl rounded-3xl bg-mist p-8 text-center">
        <h2 className="text-2xl font-semibold">Didn&apos;t find your answer?</h2>
        <p className="mt-3 text-sea-800/80">Message us on WhatsApp or drop us an email — we usually reply within a few hours.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={whatsappLink("Hi! I have a question about your kayak tours.")}>WhatsApp us</Button>
          <Link href={`mailto:${site.email}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-sea-800 ring-1 ring-sea-600/20 hover:bg-white/70">
            Email {site.email}
          </Link>
        </div>
      </Reveal>
    </Container>
  );
}
