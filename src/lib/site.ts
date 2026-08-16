/**
 * Central brand / business configuration.
 * Everything here is a PLACEHOLDER — swap for real values (see PLAN.md ‹CONFIRM› list).
 */
export const site = {
  name: "Adriatic Paddle",
  tagline: "Sea kayak tours on the Montenegrin coast",
  description:
    "Guided sea kayak and paddle board tours in Budva and the Bay of Kotor. Small groups, local guides, exploring Montenegro from the sea.",
  email: "adriaticpaddlemonte@gmail.com",
  // Owner inbox for booking notifications is read from OWNER_EMAIL on the server.
  phoneDisplay: "+44 7845 592410",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447845592410",
  address: "Budva & Kotor, Montenegro",
  currency: "€",
  season: "May – October", // ‹CONFIRM›
  social: {
    instagram: "https://instagram.com/", // ‹CONFIRM›
    facebook: "https://facebook.com/", // ‹CONFIRM›
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

// "Rentals" is intentionally omitted from this list — the /rentals page still
// exists, but the service isn't offered yet, so it's hidden from the header
// and footer nav until it's ready to launch.
export const nav = [
  { href: "/tours/budva-coastal-caves", label: "Budva Tour" },
  { href: "/tours/kotor-bay-cliff-jumping", label: "Kotor Tour" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
