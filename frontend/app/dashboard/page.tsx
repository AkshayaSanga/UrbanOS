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

function Stat({
  title,
  value,
  sub,
  tone,
}: {
  title: string;
  value: string | number;
  sub: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-500">{title}</p>
        <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
      </div>
      <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{sub}</p>
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
      <div className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 p-8 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-100">
              UrbanOS Civic Command Centre
            </p>
            <h1 className="mt-3 text-4xl font-bold">
              Hyderabad Municipal Operations
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-50">
              Unified dashboard for complaint lifecycle, field officer workload,
              public infrastructure assets, emergency alerts, SLA governance and
              department performance.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ["Live", "System"],
              ["24/7", "Monitoring"],
              ["GovTech", "Workflow"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl bg-white/15 px-5 py-4">
                <p className="text-2xl font-bold">{a}</p>
                <p className="text-xs text-blue-100">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        <Stat title="Total Complaints" value={summary.total_complaints ?? "-"} sub="Citizen reports" tone="bg-blue-500" />
        <Stat title="Pending" value={summary.pending_complaints ?? "-"} sub="Need action" tone="bg-orange-500" />
        <Stat title="Resolved" value={summary.resolved_complaints ?? "-"} sub="Closed cases" tone="bg-emerald-500" />
        <Stat title="Active Assets" value={summary.active_assets ?? "-"} sub="Infrastructure" tone="bg-slate-500" />
        <Stat title="Critical Alerts" value={summary.critical_alerts ?? "-"} sub="Emergency items" tone="bg-red-500" />
        <Stat title="SLA Score" value={`${summary.sla_compliance ?? "-"}%`} sub="Compliance" tone="bg-emerald-500" />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Complaint Categories
              </h2>
              <p className="text-sm text-slate-500">
                Distribution by civic service category
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              API Connected
            </span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-5">
          <h2 className="text-lg font-bold text-slate-950">
            GIS Operations Preview
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Hyderabad zone monitoring snapshot
          </p>

          <div className="relative h-80 overflow-hidden rounded-2xl border border-slate-200 bg-blue-50">
            <iframe
              title="Hyderabad Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.3000%2C17.3000%2C78.6000%2C17.5500&layer=mapnik&marker=17.3850%2C78.4867"
              className="h-full w-full"
            />
            <div className="absolute left-4 top-4 rounded-xl bg-white/95 p-3 shadow">
              <p className="text-xs font-bold text-slate-900">Live City Layer</p>
              <p className="text-xs text-slate-500">Complaints • Assets • Alerts</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
          <h2 className="text-lg font-bold text-slate-950">Officer Workload</h2>
          <p className="mb-5 text-sm text-slate-500">
            Field assignment capacity
          </p>

          <div className="space-y-4">
            {[
              ["Road Team A", "12 active cases", "82%"],
              ["Water Ops", "8 active cases", "64%"],
              ["Traffic Unit", "5 active cases", "41%"],
              ["Sanitation Crew", "14 active cases", "91%"],
            ].map(([team, cases, width]) => (
              <div key={team}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold text-slate-800">{team}</span>
                  <span className="text-slate-500">{cases}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
          <h2 className="text-lg font-bold text-slate-950">SLA Risk Board</h2>
          <p className="mb-5 text-sm text-slate-500">
            Cases nearing resolution deadline
          </p>

          <div className="space-y-3">
            {[
              ["Pothole repair", "2h left", "Roads"],
              ["Water leakage", "4h left", "Water"],
              ["Garbage pickup", "6h left", "Sanitation"],
              ["Signal outage", "8h left", "Traffic"],
            ].map(([issue, time, dept]) => (
              <div key={issue} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-900">{issue}</p>
                  <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                    {time}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{dept} Department</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-4">
          <h2 className="text-lg font-bold text-slate-950">Emergency Feed</h2>
          <p className="mb-5 text-sm text-slate-500">
            Current incident monitoring
          </p>

          <div className="space-y-3">
            {[
              ["Flood alert near Musi River", "Critical", "bg-red-50 text-red-700"],
              ["Road closure near Gachibowli", "High", "bg-orange-50 text-orange-700"],
              ["Water disruption in Kukatpally", "Medium", "bg-yellow-50 text-yellow-700"],
              ["Public event traffic advisory", "Low", "bg-blue-50 text-blue-700"],
            ].map(([title, level, style]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{title}</p>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
                    {level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-7">
          <h2 className="text-lg font-bold text-slate-950">
            Monthly Complaint Intake
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Incoming service requests over six months
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-5">
          <h2 className="text-lg font-bold text-slate-950">Recent Complaints</h2>
          <p className="mb-5 text-sm text-slate-500">
            Latest citizen reports
          </p>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Issue</th>
                  <th className="px-4 py-3">Dept</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  ["Streetlight not working", "Electricity", "Open"],
                  ["Drainage overflow", "Sanitation", "Assigned"],
                  ["Pothole on main road", "Roads", "In Progress"],
                  ["Water leakage", "Water", "Open"],
                ].map(([issue, dept, status]) => (
                  <tr key={issue} className="bg-white">
                    <td className="px-4 py-3 font-medium text-slate-900">{issue}</td>
                    <td className="px-4 py-3 text-slate-500">{dept}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}