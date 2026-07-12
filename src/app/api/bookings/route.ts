import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bookingSchema } from "@/lib/validation";
import { bookedCount, capacityFor, meetingPointFor, typeLabel } from "@/lib/bookings";
import { optionForType } from "@/lib/tours";
import { site } from "@/lib/site";
import {
  sendEmail,
  ownerNotificationEmail,
  customerReceivedEmail,
} from "@/lib/email";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, error: "Please check the form", fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  // Honeypot: silently accept but do nothing if the hidden field is filled.
  if (data.company) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  // Validate slot belongs to the chosen type.
  const option = optionForType(data.type);
  if (!option || !(option.slots as readonly string[]).includes(data.timeSlot)) {
    return NextResponse.json({ ok: false, error: "That time slot isn't available." }, { status: 422 });
  }

  // Don't allow booking in the past.
  if (data.date < new Date().toISOString().slice(0, 10)) {
    return NextResponse.json({ ok: false, error: "Please choose a future date." }, { status: 422 });
  }

  // Capacity check.
  const party = data.adults + data.children;
  const already = await bookedCount(data.type, data.date, data.timeSlot);
  if (already + party > capacityFor(data.type)) {
    const left = Math.max(0, capacityFor(data.type) - already);
    return NextResponse.json(
      { ok: false, error: left === 0 ? "That slot is fully booked." : `Only ${left} space(s) left in that slot.` },
      { status: 409 },
    );
  }

  const booking = await prisma.booking.create({
    data: {
      type: data.type,
      date: data.date,
      timeSlot: data.timeSlot,
      adults: data.adults,
      children: data.children,
      name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.notes || null,
      waiverAccepted: data.waiverAccepted,
      status: "pending",
    },
  });

  const view = {
    id: booking.id,
    typeLabel: typeLabel(booking.type),
    date: booking.date,
    timeSlot: booking.timeSlot,
    adults: booking.adults,
    children: booking.children,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    notes: booking.notes,
    meetingPoint: meetingPointFor(booking.type),
  };

  const ownerEmail = process.env.OWNER_EMAIL || site.email;
  const adminUrl = `${site.siteUrl}/admin`;

  // Fire both emails; failures are logged inside sendEmail and never block the booking.
  await Promise.all([
    sendEmail({
      to: ownerEmail,
      subject: `New booking request — ${view.typeLabel} (${view.date})`,
      html: ownerNotificationEmail(view, adminUrl),
    }),
    sendEmail({
      to: view.email,
      subject: `We've received your request — ${site.name}`,
      html: customerReceivedEmail(view),
    }),
  ]);

  return NextResponse.json({ ok: true, id: booking.id });
}
