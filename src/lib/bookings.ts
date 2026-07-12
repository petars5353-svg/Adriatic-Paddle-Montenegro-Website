import { prisma } from "./db";
import { optionForType, tours } from "./tours";

export function typeLabel(type: string): string {
  return optionForType(type)?.label ?? type;
}

export function meetingPointFor(type: string): string | undefined {
  const tour = tours.find((t) => t.bookingType === type);
  const pin = tour?.location.pins.find((p) => p.type === "meeting");
  return pin?.label;
}

/** People already booked (pending + confirmed) for a given slot. */
export async function bookedCount(type: string, date: string, timeSlot: string): Promise<number> {
  const rows = await prisma.booking.findMany({
    where: { type, date, timeSlot, status: { in: ["pending", "confirmed"] } },
    select: { adults: true, children: true },
  });
  return rows.reduce((sum, r) => sum + r.adults + r.children, 0);
}

export function capacityFor(type: string): number {
  return optionForType(type)?.maxGroup ?? 10;
}
