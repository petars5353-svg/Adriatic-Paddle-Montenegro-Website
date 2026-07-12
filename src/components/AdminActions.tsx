"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BookingActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"accept" | "decline" | null>(null);

  async function act(action: "accept" | "decline") {
    setBusy(action);
    const res = await fetch(`/api/bookings/${id}/${action}`, { method: "POST" });
    setBusy(null);
    if (res.ok) router.refresh();
    else alert("Action failed — please try again.");
  }

  if (status === "confirmed") return <span className="text-sm font-semibold text-[var(--color-status-good)]">✓ Confirmed</span>;
  if (status === "declined") return <span className="text-sm font-semibold text-[var(--color-status-danger)]">Declined</span>;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => act("accept")}
        disabled={busy !== null}
        className="rounded-full bg-[var(--color-status-good)] px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {busy === "accept" ? "…" : "Accept"}
      </button>
      <button
        onClick={() => act("decline")}
        disabled={busy !== null}
        className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--color-status-danger)] ring-1 ring-[var(--color-status-danger)]/30 hover:bg-[color-mix(in_srgb,var(--color-status-danger)_8%,white)] disabled:opacity-50"
      >
        {busy === "decline" ? "…" : "Decline"}
      </button>
    </div>
  );
}

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={logout} className="text-sm font-medium text-sea-700 underline hover:text-sea-600">
      Log out
    </button>
  );
}
