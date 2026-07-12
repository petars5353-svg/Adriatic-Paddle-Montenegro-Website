"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Incorrect password");
      setLoading(false);
    }
  }

  return (
    <Container className="flex min-h-[80vh] items-center justify-center py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm card-soft rounded-3xl p-8">
        <div className="flex flex-col items-center text-center">
          <Logo className="h-12 w-12 text-sea-600" />
          <h1 className="mt-4 text-2xl font-semibold">Owner login</h1>
          <p className="mt-1 text-sm text-sea-700/70">{site.name} booking dashboard</p>
        </div>
        <label className="mt-6 block text-sm font-semibold text-sea-800" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-sea-600/20 bg-white px-4 py-3 outline-none focus:border-sea-500 focus:ring-2 focus:ring-sea-500/30"
          placeholder="••••••••"
        />
        {error && <p className="mt-2 text-sm text-coral-dark">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-sea-600 px-5 py-3 font-semibold text-white hover:bg-sea-700 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </Container>
  );
}
