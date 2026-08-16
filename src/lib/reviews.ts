/** Placeholder testimonials — replace with real reviews (Google/TripAdvisor/GetYourGuide). */
export interface Review {
  quote: string;
  name: string;
  origin: string;
  rating: number;
  source: string;
}

export const reviews: Review[] = [
  {
    quote:
      "The sea caves near Budva were unreal and our guide made everyone feel safe. Easily the highlight of our trip to Montenegro.",
    name: "Hannah M.",
    origin: "United Kingdom",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Paddling across the Bay of Kotor with the mountains all around was magical. Highly recommend!",
    name: "Lukas B.",
    origin: "Germany",
    rating: 5,
    source: "TripAdvisor",
  },
  {
    quote:
      "Perfect for our family, with calm water, a patient guide and our kids loved the snorkelling stop. Booking was quick and easy.",
    name: "Elena & Marco",
    origin: "Italy",
    rating: 5,
    source: "GetYourGuide",
  },
  {
    quote:
      "Small group, gorgeous coves and a genuinely lovely guide. Faultless.",
    name: "Sophie R.",
    origin: "France",
    rating: 5,
    source: "Google",
  },
];
