import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { ADMIN_COOKIE, isValidSession } from "@/lib/auth";
import { meetingPointFor, typeLabel } from "@/lib/bookings";
import { sendEmail, customerConfirmedEmail } from "@/lib/email";
import { site } from "@/lib/site";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const jar = await cookies();
  if (!(await isValidSession(jar.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  const updated = await prisma.booking.update({ where: { id }, data: { status: "confirmed" } });

  await sendEmail({
    to: updated.email,
    subject: `Your booking is confirmed — ${site.name}`,
    html: customerConfirmedEmail({
      id: updated.id,
      typeLabel: typeLabel(updated.type),
      date: updated.date,
      timeSlot: updated.timeSlot,
      adults: updated.adults,
      children: updated.children,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      meetingPoint: meetingPointFor(updated.type),
    }),
  });

  return NextResponse.json({ ok: true });
}
