import {
  ArrowRight,
  Building2,
  FileText,
  Map,
  ShieldCheck,
  Siren,
} from "lucide-react";
import Link from "next/link";

const metrics = [
  { value: "326", title: "Open Complaints", Icon: FileText },
  { value: "1,284", title: "Monitored Assets", Icon: Building2 },
  { value: "28", title: "Active Incidents", Icon: Siren },
  { value: "96.2%", title: "SLA Compliance", Icon: ShieldCheck },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111827] text-[#F9FAFB]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D97706]">
            Municipal Operations Suite
          </p>
          <h1 className="mt-2 text-3xl font-semibold">MetroVision</h1>
          <p className="text-sm text-slate-400">
            Integrated Command Platform for Urban Infrastructure
          </p>
        </div>

        <Link
          href="/login"
          className="rounded-md bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#115E59]"
        >
          Sign In
        </Link>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-16 lg:grid-cols-2">
        <div>
          <span className="rounded-full border border-[#334155] bg-[#1F2937] px-4 py-2 text-sm text-slate-300">
            Government • Municipal • Field Operations
          </span>

          <h2 className="mt-8 max-w-3xl text-5xl font-semibold leading-tight tracking-tight">
            Operational intelligence for city services and public infrastructure.
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
            MetroVision helps city teams manage complaints, infrastructure
            assets, emergency events, GIS monitoring, reports and field
            coordination from one operational command center.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-md bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#115E59]"
            >
              Open Command Center
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/login"
              className="rounded-md border border-[#334155] px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-[#1F2937]"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#334155] bg-[#1F2937] p-6 shadow-2xl">
          <div className="mb-5 flex items-center justify-between border-b border-[#334155] pb-4">
            <div>
              <h3 className="text-base font-semibold text-white">
                Hyderabad Operations Snapshot
              </h3>
              <p className="text-sm text-slate-400">Live municipal overview</p>
            </div>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              LIVE
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map(({ value, title, Icon }) => (
              <div
                key={title}
                className="rounded-xl border border-[#334155] bg-[#111827] p-5"
              >
                <Icon size={24} className="mb-4 text-[#D97706]" />
                <p className="text-sm text-slate-400">{title}</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-8 pb-16 md:grid-cols-4">
        {[
          ["Complaint Operations", "Track service issues from intake to closure."],
          ["GIS Monitoring", "View incidents, assets and zones spatially."],
          ["Infrastructure Control", "Monitor assets, health and maintenance."],
          ["Command Analytics", "Review SLA, departments and trends."],
        ].map(([title, desc]) => (
          <div
            key={title}
            className="rounded-xl border border-[#334155] bg-[#1F2937] p-5"
          >
            <Map className="mb-4 text-[#0F766E]" />
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}