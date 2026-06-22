"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function MetricCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string | number;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg">
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-3 text-3xl font-bold text-white">{value}</div>
      <p className="mt-2 text-xs text-slate-500">{caption}</p>
    </div>
  );
}

export default function Dashboard() {
  const [summary, setSummary] = useState<any>({});
  const [trends, setTrends] = useState<any[]>([]);

  useEffect(() => {
    api.get("/dashboard/summary").then((r) => setSummary(r.data));
    api.get("/dashboard/complaint-trends").then((r) => setTrends(r.data));
  }, []);

  const monthly = [
    { name: "Jan", value: 18 },
    { name: "Feb", value: 24 },
    { name: "Mar", value: 21 },
    { name: "Apr", value: 30 },
    { name: "May", value: 28 },
    { name: "Jun", value: 35 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
            Command Center
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Operations Dashboard
          </h1>
          <p className="mt-2 text-slate-400">
            Live municipal overview of complaints, assets, alerts, and SLA
            performance.
          </p>
        </div>

        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          Live Sync Active
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard
          label="Total Complaints"
          value={summary.total_complaints ?? "-"}
          caption="All citizen reports"
        />
        <MetricCard
          label="Pending"
          value={summary.pending_complaints ?? "-"}
          caption="Awaiting closure"
        />
        <MetricCard
          label="Resolved"
          value={summary.resolved_complaints ?? "-"}
          caption="Completed cases"
        />
        <MetricCard
          label="Active Assets"
          value={summary.active_assets ?? "-"}
          caption="Operational assets"
        />
        <MetricCard
          label="Critical Alerts"
          value={summary.critical_alerts ?? "-"}
          caption="High priority alerts"
        />
        <MetricCard
          label="SLA Compliance"
          value={`${summary.sla_compliance ?? "-"}%`}
          caption="Resolution target"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Complaints by Category
              </h2>
              <p className="text-sm text-slate-400">
                Category-wise operational load
              </p>
            </div>
            <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs text-sky-400">
              Live Data
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    color: "#e5e7eb",
                  }}
                />
                <Bar dataKey="value" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-lg font-semibold text-white">
            Department Health
          </h2>
          <p className="mb-5 text-sm text-slate-400">
            Field response performance
          </p>

          <div className="space-y-4">
            {[
              ["Roads", "82%", "text-emerald-400"],
              ["Water", "74%", "text-sky-400"],
              ["Sanitation", "69%", "text-orange-400"],
              ["Traffic", "91%", "text-emerald-400"],
            ].map(([name, value, color]) => (
              <div key={name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-300">{name}</span>
                  <span className={color}>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-sky-400"
                    style={{ width: value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold text-white">
            Monthly Complaint Trend
          </h2>
          <p className="mb-5 text-sm text-slate-400">
            Incoming cases over the last six months
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    color: "#e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-lg font-semibold text-white">Priority Queue</h2>
          <p className="mb-5 text-sm text-slate-400">
            Items requiring immediate action
          </p>

          <div className="space-y-3">
            {[
              ["Critical flood alert", "Emergency", "text-red-400"],
              ["Water leakage cluster", "Water", "text-orange-400"],
              ["Signal outage", "Traffic", "text-sky-400"],
              ["SLA breach risk", "Roads", "text-yellow-400"],
            ].map(([title, dept, color]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex justify-between gap-3">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <span className={`text-xs ${color}`}>{dept}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}