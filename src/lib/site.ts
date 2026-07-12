/**
 * Central brand / business configuration.
 * Everything here is a PLACEHOLDER — swap for real values (see PLAN.md ‹CONFIRM› list).
 */
export const site = {
  name: "Adriatic Paddle Co.",
  shortName: "Adriatic Paddle",
  tagline: "Sea kayak tours on the Montenegrin coast",
  description:
    "Guided sea kayak and paddleboard tours in Budva and the Bay of Kotor, Montenegro — coastal caves, hidden coves, cliff jumping and calm turquoise water. Small groups, local guides.",
  email: "hello@adriaticpaddle.me", // ‹CONFIRM›
  // Owner inbox for booking notifications is read from OWNER_EMAIL on the server.
  phoneDisplay: "+382 67 000 000", // ‹CONFIRM›
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "38267000000", // ‹CONFIRM›
  address: "Budva & Kotor, Montenegro",
  currency: "€",
  season: "May – October", // ‹CONFIRM›
  social: {
    instagram: "https://instagram.com/", // ‹CONFIRM›
    facebook: "https://facebook.com/", // ‹CONFIRM›
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const nav = [
  { href: "/tours/budva-coastal-caves", label: "Budva Tour" },
  { href: "/tours/kotor-bay-cliff-jumping", label: "Kotor Tour" },
  { href: "/rentals", label: "Rentals" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
