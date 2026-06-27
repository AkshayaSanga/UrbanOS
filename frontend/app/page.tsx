import {
  ArrowRight,
  Building2,
  FileText,
  Map,
  ShieldCheck,
  Siren,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
            Enterprise Platform
          </p>
          <h1 className="mt-2 text-3xl font-bold">MetroVision</h1>
          <p className="text-slate-400">Smart City Operations Platform</p>
        </div>

        <Link
          href="/login"
          className="rounded-xl bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-400"
        >
          Sign In
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 lg:grid-cols-2">
        <div>
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-300">
            Government • Municipal • Enterprise
          </span>

          <h2 className="mt-8 text-6xl font-bold leading-tight">
            Modern Smart City
            <br />
            Command Center
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
            MetroVision helps municipal corporations manage complaints,
            infrastructure, emergency response, GIS monitoring, analytics and
            field operations through a single platform.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-4 font-semibold hover:bg-sky-400"
            >
              Open Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-700 px-6 py-4 hover:bg-slate-900"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Operations Snapshot</h3>
              <p className="text-sm text-slate-400">Hyderabad city overview</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
              Live
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["128", "Active Complaints", FileText],
              ["1,284", "City Assets", Building2],
              ["5", "Critical Alerts", Siren],
              ["89%", "SLA Compliance", ShieldCheck],
            ].map(([value, title, Icon]) => {
              const Component = Icon as React.ElementType;

              return (
                <div
                  key={title as string}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-6"
                >
                  <Component className="mb-4 text-sky-400" />
                  <p className="text-sm text-slate-400">{title}</p>
                  <p className="mt-2 text-4xl font-bold">{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-8 pb-20 md:grid-cols-4">
        {[
          ["Complaint Management", "Complete citizen issue lifecycle."],
          ["GIS Mapping", "Interactive infrastructure visualization."],
          ["Asset Monitoring", "Roads, CCTV, streetlights and utilities."],
          ["Analytics", "Operational dashboards and KPIs."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <Map className="mb-5 text-sky-400" />
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}