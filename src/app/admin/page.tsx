import { prisma } from "@/lib/db";
import { typeLabel } from "@/lib/bookings";
import { Container } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { BookingActions, LogoutButton } from "@/components/AdminActions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin dashboard", robots: { index: false } };

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-[color-mix(in_srgb,var(--color-status-caution)_16%,white)] text-[var(--color-status-caution)]",
  confirmed: "bg-[color-mix(in_srgb,var(--color-status-good)_16%,white)] text-[var(--color-status-good)]",
  declined: "bg-[color-mix(in_srgb,var(--color-status-danger)_14%,white)] text-[var(--color-status-danger)]",
};

export default async function AdminPage() {
  const bookings = await prisma.booking.findMany({ orderBy: [{ date: "asc" }, { createdAt: "desc" }] });
  const pending = bookings.filter((b) => b.status === "pending");
  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const upcomingGuests = confirmed.reduce((n, b) => n + b.adults + b.children, 0);

  const stats = [
    { label: "Pending requests", value: pending.length },
    { label: "Confirmed", value: confirmed.length },
    { label: "Confirmed guests", value: upcomingGuests },
    { label: "Total bookings", value: bookings.length },
  ];

  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-9 w-9 text-sea-600" />
          <div>
            <h1 className="text-2xl font-semibold">Bookings dashboard</h1>
            <p className="text-sm text-sea-700/70">Review requests and confirm to email the customer.</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-soft rounded-2xl p-5">
            <div className="text-3xl font-semibold text-ink">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-sea-700/70">{s.label}</div>
          </div>
        ))}
      </div>

      {pending.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Needs your attention</h2>
          <div className="mt-4 space-y-3">
            {pending.map((b) => (
              <div key={b.id} className="card-soft flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
                <div>
                  <div className="font-semibold text-ink">{b.name} · {typeLabel(b.type)}</div>
                  <div className="mt-1 text-sm text-sea-700/80">
                    {b.date} at {b.timeSlot} · {b.adults} adult(s), {b.children} child(ren)
                  </div>
                  <div className="mt-1 text-sm text-sea-700/70">
                    {b.email} · {b.phone}{b.notes ? ` · “${b.notes}”` : ""}
                  </div>
                </div>
                <BookingActions id={b.id} status={b.status} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">All bookings</h2>
        {bookings.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-mist p-8 text-center text-sea-700/70">
            No bookings yet. They&apos;ll appear here the moment a customer submits the booking form.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-sea-600/15 text-left text-xs uppercase tracking-wide text-sea-700/70">
                  <th className="py-3 pr-4 font-semibold">Date / time</th>
                  <th className="py-3 pr-4 font-semibold">Tour</th>
                  <th className="py-3 pr-4 font-semibold">Guest</th>
                  <th className="py-3 pr-4 font-semibold">Party</th>
                  <th className="py-3 pr-4 font-semibold">Status</th>
                  <th className="py-3 pr-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-sea-600/10 align-top">
                    <td className="py-3 pr-4 whitespace-nowrap">{b.date}<div className="text-xs text-sea-700/60">{b.timeSlot}</div></td>
                    <td className="py-3 pr-4">{typeLabel(b.type)}</td>
                    <td className="py-3 pr-4">
                      <div className="font-medium text-ink">{b.name}</div>
                      <div className="text-xs text-sea-700/60">{b.email}</div>
                      <div className="text-xs text-sea-700/60">{b.phone}</div>
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">{b.adults}+{b.children}</td>
                    <td className="py-3 pr-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_BADGE[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="py-3 pr-4"><BookingActions id={b.id} status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Container>
  );
}
