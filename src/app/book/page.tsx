import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";
import { bookingOptions, type BookingType } from "@/lib/tours";

export const metadata: Metadata = {
  title: "Book a tour",
  description: "Request a kayak tour or rental in Budva or the Bay of Kotor. No payment needed to book.",
};

const validTypes = bookingOptions.map((o) => o.value);

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ tour?: string }>;
}) {
  const { tour } = await searchParams;
  const defaultType = (validTypes.includes(tour as BookingType) ? tour : "budva-caves") as BookingType;

  return (
    <div className="bg-mist">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Book your paddle</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Request a booking</h1>
          <p className="mt-4 text-lg text-sea-800/80">
            Pick your experience, date and time. We&apos;ll email you a summary, then confirm your spot with your
            guide. No payment now — you pay in person on the day.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <BookingForm defaultType={defaultType} />
        </div>
      </Container>
    </div>
  );
}
