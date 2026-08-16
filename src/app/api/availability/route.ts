import { NextResponse } from "next/server";
import { capacityFor, confirmedCount } from "@/lib/bookings";
import { optionForType } from "@/lib/tours";

/**
 * Public read-only endpoint the booking form polls to show "N spots available".
 * Counts only CONFIRMED bookings — a slot only fills up once the owner accepts
 * requests on the admin dashboard, not while requests are still pending.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "";
  const date = searchParams.get("date") || "";
  const timeSlot = searchParams.get("timeSlot") || "";

  const option = optionForType(type);
  if (!option || !date || !timeSlot || !(option.slots as readonly string[]).includes(timeSlot)) {
    return NextResponse.json({ ok: false, error: "Invalid slot" }, { status: 400 });
  }

  const capacity = capacityFor(type);
  const booked = await confirmedCount(type, date, timeSlot);
  const remaining = Math.max(0, capacity - booked);

  return NextResponse.json({ ok: true, capacity, booked, remaining });
}
