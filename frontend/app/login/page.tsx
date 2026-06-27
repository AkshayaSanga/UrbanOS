"use client";

import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("admin@metrovision.dev");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.href = "/dashboard";
    } catch (err: any) {
      console.error("========== LOGIN ERROR ==========");
      console.error(err);
      console.error("API URL:", api.defaults.baseURL);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);

        setError(
          err.response.data?.detail ||
            `Server Error (${err.response.status})`
        );
      } else if (err.request) {
        console.error("No response received");
        setError("Network Error - Backend unreachable or CORS blocked");
      } else {
        console.error(err.message);
        setError(err.message);
      }
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
          Command Center Access
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white">
          MetroVision Login
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Smart City Operations Platform
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <label className="mt-6 block text-sm font-semibold text-slate-300">
          Email
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-sky-500"
        />

        <label className="mt-5 block text-sm font-semibold text-slate-300">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 outline-none focus:border-sky-500"
        />

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-sky-500 p-3 font-bold text-white hover:bg-sky-400 disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

        <Link
          href="/register"
          className="mt-5 block text-center text-sm text-slate-400 hover:text-sky-400"
        >
          Create citizen account
        </Link>
      </form>
    </main>
  );
}