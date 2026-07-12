import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How we handle your personal data when you book a kayak tour.",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-sea-700/70">Placeholder wording — review for GDPR compliance before launch. ‹CONFIRM›</p>

      <div className="mt-8 space-y-6 text-sea-800/85 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-ink">What we collect</h2>
          <p className="mt-2">When you request a booking we collect your name, email, phone number and booking details. That&apos;s it — we don&apos;t take payment details online.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">How we use it</h2>
          <p className="mt-2">Only to manage your booking and contact you about your tour. We do not sell your data or share it beyond what&apos;s needed to run the tour (e.g. your guide).</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">Retention &amp; your rights</h2>
          <p className="mt-2">We keep booking records only as long as needed for our records. You can ask us to access or delete your data at any time by emailing {site.email}.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-2">Questions about your data? Email {site.email}.</p>
        </section>
      </div>
    </Container>
  );
}
