import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & liability waiver",
  description: "Booking terms and liability waiver for kayak tours and rentals.",
};

export default function TermsPage() {
  return (
    <Container className="prose-kayak max-w-3xl py-16 sm:py-20">
      <h1 className="text-4xl font-semibold">Terms &amp; Liability Waiver</h1>
      <p className="mt-2 text-sm text-sea-700/70">Placeholder wording — have a local lawyer review before launch. ‹CONFIRM›</p>

      <div className="mt-8 space-y-6 text-sea-800/85 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-ink">1. Booking &amp; payment</h2>
          <p className="mt-2">Bookings are requests until confirmed by {site.name} via email. No payment is taken online; payment is made in person on the day of your tour or rental.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">2. Cancellations &amp; weather</h2>
          <p className="mt-2">You may cancel free of charge up to 24 hours before your session. We may reschedule or cancel any session for safety reasons, including adverse weather or sea conditions; in that case you may choose an alternative time or a full refund of any amount paid.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">3. Health, ability &amp; conduct</h2>
          <p className="mt-2">By booking you confirm that all participants can swim, are in good general health, are not under the influence of alcohol or drugs, and will follow the guide&apos;s instructions at all times. Minimum ages apply per tour. Guides may refuse participation where safety is a concern.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">4. Assumption of risk &amp; liability waiver</h2>
          <p className="mt-2">Kayaking, paddleboarding, swimming and cliff jumping are activities carried out in a natural water environment and carry inherent risks. Participants take part voluntarily and at their own risk. To the fullest extent permitted by law, participants release {site.name}, its guides and staff from liability for injury, loss or damage arising from participation, except where caused by our gross negligence. Cliff jumping is always optional.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">5. Equipment</h2>
          <p className="mt-2">Participants are responsible for equipment issued to them and agree to use provided safety equipment, including life jackets, at all times on the water.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">6. Photography</h2>
          <p className="mt-2">We may take photos during tours for promotional use. Let your guide know if you&apos;d prefer not to appear.</p>
        </section>
      </div>
    </Container>
  );
}
