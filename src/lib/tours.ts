import { images } from "./images";

export type PinType = "parking" | "meeting" | "restroom" | "dock";

export interface MapPin {
  type: PinType;
  label: string;
  lat: number;
  lng: number;
}

export interface TourLocation {
  center: [number, number];
  zoom: number;
  pins: MapPin[];
  /** Open-Meteo lookup point for the live conditions widget. */
  conditions: { lat: number; lng: number; key: "budva" | "kotor" };
}

export interface Tour {
  slug: string;
  bookingType: "budva-caves" | "kotor-cliff";
  title: string;
  place: string;
  tagline: string;
  durationHours: number;
  price: number; // per person, EUR — ‹CONFIRM›
  difficulty: string;
  minAge: number; // ‹CONFIRM›
  maxGroup: number; // per slot capacity — ‹CONFIRM›
  intro: string;
  highlights: string[];
  includes: string[];
  bring: string[];
  itinerary: { time: string; title: string; text: string }[];
  timeSlots: string[]; // ‹CONFIRM›
  heroImage: string;
  gallery: string[];
  location: TourLocation;
}

// NOTE: pin coordinates are plausible placeholders — replace with your exact
// parking / meeting / restroom / launch-dock GPS points. (PLAN.md ‹CONFIRM›)
export const tours: Tour[] = [
  {
    slug: "budva-coastal-caves",
    bookingType: "budva-caves",
    title: "Budva Coastal Caves Paddle",
    place: "Budva",
    tagline: "Sea caves, hidden coves & the island of Sveti Nikola",
    durationHours: 3,
    price: 45,
    difficulty: "Easy · beginner friendly",
    minAge: 8,
    maxGroup: 8,
    intro:
      "Paddle out of Budva along a dramatic limestone coastline to sea caves and secluded swimming coves, with a stop at the island locals call 'Hawaii'. A relaxed, scenic tour suitable for first-timers, led by a local guide.",
    highlights: [
      "Explore genuine sea caves you can paddle inside",
      "Swim & snorkel stop in a crystal-clear cove",
      "Circle Sveti Nikola ('Hawaii') island",
      "Small groups and a local guide",
    ],
    includes: [
      "Kayak or stand-up paddleboard",
      "Life jacket & dry bag",
      "Local certified guide",
      "Drinking water",
      "Basic snorkel gear", // ‹CONFIRM›
    ],
    bring: ["Swimwear", "Towel", "Reef-safe sunscreen", "Water shoes", "A change of clothes"],
    itinerary: [
      { time: "0:00", title: "Meet & brief", text: "Meet your guide at the beach, gear up and run through a short paddle & safety briefing." },
      { time: "0:20", title: "Paddle the coast", text: "Set off along the cliffs toward the first hidden coves, keeping close to shore." },
      { time: "1:00", title: "Sea caves", text: "Paddle into the coastal caves and learn the stories of this stretch of coast." },
      { time: "1:40", title: "Swim & snorkel", text: "Pull into a sheltered cove for a swim, snorkel and a breather." },
      { time: "2:20", title: "Sveti Nikola", text: "Skirt the island of Sveti Nikola before turning back toward Budva." },
      { time: "3:00", title: "Return", text: "Land back at the beach — showers and cafés nearby." },
    ],
    timeSlots: ["08:00 (morning paddle)", "17:00 (sunset paddle)"],
    heroImage: images.budva.hero,
    gallery: [images.budva.citadel, images.budva.town, images.budva.dusk, images.budva.launch, images.budva.groupFortress],
    location: {
      center: [42.2786, 18.8386],
      zoom: 14,
      conditions: { lat: 42.2786, lng: 18.84, key: "budva" },
      pins: [
        { type: "parking", label: "Parking (Slovenska plaža area)", lat: 42.2831, lng: 18.8452 },
        { type: "meeting", label: "Meeting point — beach kiosk", lat: 42.2799, lng: 18.8408 },
        { type: "restroom", label: "Public restrooms & showers", lat: 42.2805, lng: 18.8416 },
        { type: "dock", label: "Launch point — south end of beach", lat: 42.2788, lng: 18.8399 },
      ],
    },
  },
  {
    slug: "kotor-bay-cliff-jumping",
    bookingType: "kotor-cliff",
    title: "Kotor Bay Kayak Tour",
    place: "Bay of Kotor",
    tagline: "Fjord-like bay, old-town views & optional cliff jumps",
    durationHours: 3.5,
    price: 50,
    difficulty: "Easy–moderate",
    minAge: 12,
    maxGroup: 8,
    intro:
      "Glide across the mirror-calm Bay of Kotor beneath towering mountains, past waterfront villages and with sweeping views of Kotor's UNESCO old town. Finish at a favourite cliff-jumping spot with graded heights — jumping is always optional.",
    highlights: [
      "Paddle Europe's southernmost fjord-like bay",
      "Views of Kotor old town and Mount Lovćen",
      "Optional cliff jumping (graded heights)",
      "Swim & snorkel in deep clear water",
    ],
    includes: [
      "Sea kayak",
      "Life jacket",
      "Local certified guide",
      "Drinking water",
      "Snorkel gear", // ‹CONFIRM›
    ],
    bring: ["Swimwear", "Towel", "Reef-safe sunscreen", "Water shoes", "Sense of adventure"],
    itinerary: [
      { time: "0:00", title: "Meet & brief", text: "Meet at the Muo waterfront for gear fitting and a paddle & safety briefing." },
      { time: "0:25", title: "Into the bay", text: "Paddle along the shoreline past Muo and Prčanj with the mountains rising around you." },
      { time: "1:10", title: "Old-town views", text: "Take in the classic view back toward Kotor's fortified old town." },
      { time: "1:50", title: "Cliff-jump spot", text: "Reach the jumping rocks — try a jump (optional) or just swim and snorkel." },
      { time: "2:40", title: "Return paddle", text: "Cruise back across the bay as the light softens." },
      { time: "3:30", title: "Return", text: "Land back at Muo — cafés and parking close by." },
    ],
    timeSlots: ["08:00 (morning paddle)", "17:00 (sunset paddle)"],
    heroImage: images.kotor.hero,
    gallery: [images.kotor.aerial, images.kotor.flag, images.kotor.supLaunch],
    location: {
      center: [42.4247, 18.7591],
      zoom: 13,
      conditions: { lat: 42.43, lng: 18.75, key: "kotor" },
      pins: [
        { type: "parking", label: "Parking — Muo waterfront", lat: 42.4238, lng: 18.7574 },
        { type: "meeting", label: "Meeting point — Muo promenade", lat: 42.4245, lng: 18.7566 },
        { type: "restroom", label: "Café restrooms (guests)", lat: 42.4249, lng: 18.7562 },
        { type: "dock", label: "Launch point — pebble slipway", lat: 42.4252, lng: 18.7558 },
      ],
    },
  },
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

// ---- Rentals ----
export interface RentalItem {
  name: string;
  hourly: number; // ‹CONFIRM›
  daily: number; // ‹CONFIRM›
  blurb: string;
}
export const rentals: RentalItem[] = [
  { name: "Single sit-on-top kayak", hourly: 12, daily: 40, blurb: "Stable, easy to paddle — perfect for exploring the shoreline solo." },
  { name: "Double sit-on-top kayak", hourly: 18, daily: 55, blurb: "Share the effort — great for couples, parents & kids." },
  { name: "Stand-up paddleboard (SUP)", hourly: 12, daily: 40, blurb: "Cruise, balance and swim off a board on calm water." },
];

/** Everything bookable, for the booking form dropdown. */
export const bookingOptions = [
  { value: "budva-caves", label: "Budva Coastal Caves Paddle", slots: tours[0].timeSlots, maxGroup: tours[0].maxGroup },
  { value: "kotor-cliff", label: "Kotor Bay Kayak Tour", slots: tours[1].timeSlots, maxGroup: tours[1].maxGroup },
  { value: "rental", label: "Kayak / SUP Rental", slots: ["08:00 (morning paddle)", "17:00 (sunset paddle)"], maxGroup: 8 },
] as const;

export type BookingType = (typeof bookingOptions)[number]["value"];

export function optionForType(type: string) {
  return bookingOptions.find((o) => o.value === type);
}
