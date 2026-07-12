import { Resend } from "resend";
import { site } from "./site";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM || `${site.name} <onboarding@resend.dev>`;
const resend = apiKey ? new Resend(apiKey) : null;

interface Mail {
  to: string;
  subject: string;
  html: string;
}

/**
 * Sends an email via Resend when RESEND_API_KEY is set; otherwise logs it to the
 * server console so the whole flow works locally without an account. Never throws
 * — a booking should still succeed even if email delivery fails.
 */
export async function sendEmail({ to, subject, html }: Mail): Promise<{ ok: boolean; simulated: boolean }> {
  if (!resend) {
    console.log("\n========== 📧 EMAIL (simulated — no RESEND_API_KEY) ==========");
    console.log(`From:    ${from}`);
    console.log(`To:      ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("-------------------------------------------------------------");
    console.log(html.replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim());
    console.log("=============================================================\n");
    return { ok: true, simulated: true };
  }
  try {
    await resend.emails.send({ from, to, subject, html });
    return { ok: true, simulated: false };
  } catch (err) {
    console.error("Resend send failed:", err);
    return { ok: false, simulated: false };
  }
}

// ---- Templates ----
const brandWrap = (inner: string) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0b2e3a">
    <div style="background:#0f7c8a;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
      <h1 style="margin:0;font-size:20px">${site.name}</h1>
      <p style="margin:4px 0 0;opacity:.9;font-size:13px">${site.tagline}</p>
    </div>
    <div style="border:1px solid #e4d3b4;border-top:none;padding:24px;border-radius:0 0 12px 12px;background:#fff">
      ${inner}
    </div>
  </div>`;

interface BookingLike {
  id: string;
  typeLabel: string;
  date: string;
  timeSlot: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  phone: string;
  notes?: string | null;
  meetingPoint?: string;
}

export function ownerNotificationEmail(b: BookingLike, adminUrl: string) {
  return brandWrap(`
    <h2 style="margin-top:0">New booking request 🛶</h2>
    <p><strong>${b.name}</strong> has requested a booking. Review and confirm it in your dashboard.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#0f5c6b">Tour</td><td style="text-align:right"><strong>${b.typeLabel}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Date & time</td><td style="text-align:right">${b.date} · ${b.timeSlot}</td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Guests</td><td style="text-align:right">${b.adults} adult(s), ${b.children} child(ren)</td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Email</td><td style="text-align:right">${b.email}</td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Phone</td><td style="text-align:right">${b.phone}</td></tr>
      ${b.notes ? `<tr><td style="padding:6px 0;color:#0f5c6b">Notes</td><td style="text-align:right">${b.notes}</td></tr>` : ""}
    </table>
    <p style="margin-top:24px">
      <a href="${adminUrl}" style="background:#f0795c;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block">Open dashboard →</a>
    </p>
  `);
}

export function customerReceivedEmail(b: BookingLike) {
  return brandWrap(`
    <h2 style="margin-top:0">We've got your request 🌊</h2>
    <p>Hi ${b.name}, thanks for choosing ${site.name}! Your request is <strong>pending confirmation</strong> — we'll email you as soon as we've checked availability with your guide.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#0f5c6b">Tour</td><td style="text-align:right"><strong>${b.typeLabel}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Date & time</td><td style="text-align:right">${b.date} · ${b.timeSlot}</td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Guests</td><td style="text-align:right">${b.adults} adult(s), ${b.children} child(ren)</td></tr>
    </table>
    <p style="margin-top:16px;font-size:13px;color:#0f5c6b">No payment is needed now — you'll pay in person on the day once confirmed.</p>
  `);
}

export function customerConfirmedEmail(b: BookingLike) {
  return brandWrap(`
    <h2 style="margin-top:0">You're confirmed! 🎉</h2>
    <p>Great news ${b.name} — your booking with ${site.name} is <strong>confirmed</strong>. We can't wait to get you on the water.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr><td style="padding:6px 0;color:#0f5c6b">Tour</td><td style="text-align:right"><strong>${b.typeLabel}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Date & time</td><td style="text-align:right">${b.date} · ${b.timeSlot}</td></tr>
      <tr><td style="padding:6px 0;color:#0f5c6b">Guests</td><td style="text-align:right">${b.adults} adult(s), ${b.children} child(ren)</td></tr>
      ${b.meetingPoint ? `<tr><td style="padding:6px 0;color:#0f5c6b">Meeting point</td><td style="text-align:right">${b.meetingPoint}</td></tr>` : ""}
    </table>
    <p style="margin-top:16px"><strong>Please bring:</strong> swimwear, a towel, sunscreen, water shoes and a change of clothes. Payment is on the day.</p>
    <p style="font-size:13px;color:#0f5c6b">Questions? Just reply to this email or message us on WhatsApp.</p>
  `);
}

export function customerDeclinedEmail(b: BookingLike) {
  return brandWrap(`
    <h2 style="margin-top:0">About your booking request</h2>
    <p>Hi ${b.name}, thank you for your interest in ${site.name}. Unfortunately we're unable to confirm your requested slot (${b.typeLabel}, ${b.date} · ${b.timeSlot}) — it may be full or affected by conditions.</p>
    <p>Please reply and we'll gladly help you find another time. We'd love to get you on the water.</p>
  `);
}
