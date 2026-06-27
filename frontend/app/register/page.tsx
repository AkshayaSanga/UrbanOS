"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "Citizen@123",
    role: "citizen",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      window.location.href = "/login";
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-6 text-white">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
          Citizen Access
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Register as a citizen to submit and track civic complaints.
        </p>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <label className="mt-6 block text-sm font-semibold text-slate-300">
          Full Name
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <label className="mt-4 block text-sm font-semibold text-slate-300">
          Email
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <label className="mt-4 block text-sm font-semibold text-slate-300">
          Password
        </label>
        <input
          type="password"
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-sky-500 p-3 font-bold text-white hover:bg-sky-400 disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <Link
          href="/login"
          className="mt-5 block text-center text-sm text-slate-400 hover:text-sky-400"
        >
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}