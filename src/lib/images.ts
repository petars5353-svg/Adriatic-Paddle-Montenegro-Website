/**
 * Site photography.
 * Real Montenegro / tour photos live in /public/photos (added by the owner).
 * The two tour hero backgrounds intentionally stay on the verified Unsplash
 * shots the owner is happy with — do not swap these without asking.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  // Home hero slideshow
  heroSlides: [
    "/photos/home-hero-budva-dusk.jpg", // Budva old town at dusk
    "/photos/home-hero-village.jpg", // Bay of Kotor waterfront village
  ],
  // Home "welcome / seen from the water" intro image
  homeIntro: "/photos/home-intro-golden.jpg", // golden-hour by the water

  budva: {
    // Hero background — kept as-is (owner is happy with it).
    hero: u("photo-1761403871992-578c8a9a7222"),
    // On-page photos (gallery / scene-setters)
    citadel: "/photos/budva-citadel-kayak.jpg", // kayakers at the Budva citadel
    town: "/photos/budva-town.jpg", // old town + Sveti Nikola from the water
    dusk: "/photos/budva-dusk.jpg", // old town at golden hour
    launch: "/photos/budva-launch.jpg", // launch pontoon & meeting point
    groupFortress: "/photos/budva-group-fortress.jpg", // group paddling the fortress
  },
  kotor: {
    // Hero background — kept as-is (owner is happy with it).
    hero: u("photo-1502824420498-012d4c4f0c42"),
    // On-page photos
    aerial: "/photos/kotor-aerial.jpg", // sweeping aerial of the bay
    flag: "/photos/kotor-flag-fjord.jpg", // Montenegro flag over the fjord
    supLaunch: "/photos/kotor-sup-launch.jpg", // SUP at a calm launch
  },

  rentals: "/photos/kotor-sup-launch.jpg", // SUP / calm launch

  // About page
  aboutMe: "/photos/about-me.jpg", // founder portrait above the Bay of Kotor
  aboutMe2: "/photos/about-me-cave.jpg", // guiding inside a sea cave

  // Gallery — "Moments from past tours" (owner-curated)
  gallery: [
    "/photos/gallery-cliff-villa.jpg", // Previous Tours
    "/photos/gallery-cove-arrival.jpg", // Previous Tours 2
    "/photos/budva-citadel-kayak.jpg", // Budva Tour 2 (shared)
    "/photos/budva-group-fortress.jpg", // Previous Tours 3 (shared)
    "/photos/gallery-cove-swim.jpg", // IMG_4515 — swim stop in a rocky cove
  ],
};
