/**
 * Placeholder photography (Unsplash). Replace with your own past-tour photos:
 * drop files in /public and point these at e.g. "/photos/budva-cave.jpg".
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const images = {
  heroSlides: [
    u("photo-1502680390469-be75c86b636f"), // sea kayak turquoise
    u("photo-1544551763-46a013bb70d5"), // ocean kayak aerial
    u("photo-1530866495561-507c9faab2ed"), // coastal cliffs adriatic
  ],
  budva: {
    // Budva old town, view from the sea (verified working).
    hero: u("photo-1761403871992-578c8a9a7222"),
    cave: u("photo-1559827260-dc66d52bef19"),
    cove: u("photo-1468413253725-0d5181091126"),
  },
  kotor: {
    // Bay of Kotor with the old town of Kotor in view (verified working).
    hero: u("photo-1502824420498-012d4c4f0c42"),
    bay: u("photo-1601581875039-e899893d520c"),
    cliff: u("photo-1530866495561-507c9faab2ed"),
  },
  rentals: u("photo-1623874514711-0f321325f318"),
  about: u("photo-1517176118179-65244903d13c"),
  gallery: [
    u("photo-1502680390469-be75c86b636f", 1000),
    u("photo-1544551763-46a013bb70d5", 1000),
    u("photo-1559827260-dc66d52bef19", 1000),
    u("photo-1468413253725-0d5181091126", 1000),
    u("photo-1601581875039-e899893d520c", 1000),
    u("photo-1530866495561-507c9faab2ed", 1000),
    u("photo-1623874514711-0f321325f318", 1000),
    u("photo-1517176118179-65244903d13c", 1000),
    u("photo-1505459668311-8dfac7952bf0", 1000),
  ],
};
