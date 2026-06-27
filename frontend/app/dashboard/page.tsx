"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";



import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Radio,
  ShieldCheck,
  Users,
} from "lucide-react";
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

const operations = [
  {
    label: "Open Incidents",
    value: "326",
    meta: "47 assigned today",
    Icon: FileText,
  },
  {
    label: "Critical Events",
    value: "28",
    meta: "6 escalated",
    Icon: AlertTriangle,
  },
  {
    label: "Assets Monitored",
    value: "1,284",
    meta: "96% operational",
    Icon: Building2,
  },
  {
    label: "SLA Compliance",
    value: "96.2%",
    meta: "+3.4% this week",
    Icon: ShieldCheck,
  },
];

const trend = [
  { day: "Mon", incidents: 42 },
  { day: "Tue", incidents: 56 },
  { day: "Wed", incidents: 51 },
  { day: "Thu", incidents: 69 },
  { day: "Fri", incidents: 61 },
  { day: "Sat", incidents: 74 },
  { day: "Sun", incidents: 58 },
];

const departments = [
  { name: "Roads", score: 82 },
  { name: "Water", score: 76 },
  { name: "Sanitation", score: 88 },
  { name: "Traffic", score: 71 },
];

const incidents = [
  {
    title: "Road surface damage",
    zone: "Madhapur",
    level: "High",
  },
  {
    title: "Water leakage",
    zone: "Kukatpally",
    level: "Medium",
  },
  {
    title: "Signal outage",
    zone: "Hitech City",
    level: "Critical",
  },
];

const activity = [
  "Incident MV-1024 assigned to Roads Department",
  "Water team acknowledged leak report at Kukatpally",
  "Traffic signal asset TS-221 marked for inspection",
  "GIS layer refreshed for West Zone operations",
  "Daily SLA report generated for department heads",
];

const readiness = [
  {
    name: "API Gateway",
    status: "Operational",
    Icon: CheckCircle2,
  },
  {
    name: "Database",
    status: "Online",
    Icon: CheckCircle2,
  },
  {
    name: "GIS Layer",
    status: "Synced",
    Icon: Radio,
  },
  {
    name: "Officer Network",
    status: "36 Online",
    Icon: Users,
  },
  {
    name: "SLA Monitor",
    status: "Active",
    Icon: Clock,
  },
];

export default function DashboardPage() {
 return (
  <main className="p-6">

    <DashboardHeader />

      <section className="mb-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
  <KPICard
    title="Open Incidents"
    value={326}
    trend="+14% Today"
    icon={<AlertTriangle size={24} />}
  />

  <KPICard
    title="Assets Online"
    value={1284}
    trend="98% Operational"
    icon={<Building2 size={24} />}
  />

  <KPICard
    title="Officers Online"
    value={36}
    trend="Morning Shift"
    icon={<Users size={24} />}
  />

  <KPICard
    title="Critical Alerts"
    value={12}
    trend="3 Escalated"
    icon={<ShieldCheck size={24} />}
  />
</section>
      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">
                Incident Intake Trend
              </h2>

              <p className="text-sm text-[#64748B]">
                Weekly service requests across municipal zones
              </p>
            </div>

            <span className="rounded-full bg-[#0F766E]/10 px-3 py-1 text-xs font-semibold text-[#0F766E]">
              Live
            </span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="day" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#0F766E"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>        <div className="rounded-xl border border-[#CBD5E1] bg-[#111827] p-5 text-white shadow-sm">
          <h2 className="text-base font-semibold">
            Active Field Incidents
          </h2>

          <p className="text-sm text-slate-400">
            Priority incidents requiring immediate attention
          </p>

          <div className="mt-5 space-y-4">
            {incidents.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-[#334155] bg-[#1F2937] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{item.title}</p>

                  <span className="rounded-full bg-[#B45309]/20 px-3 py-1 text-xs font-semibold text-[#F59E0B]">
                    {item.level}
                  </span>
                </div>

                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={14} />
                  {item.zone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827]">
            Department Performance
          </h2>

          <p className="mb-4 text-sm text-[#64748B]">
            Weekly SLA achievement
          </p>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departments}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                />

                <XAxis
                  dataKey="name"
                  stroke="#64748B"
                />

                <YAxis
                  stroke="#64748B"
                />

                <Tooltip />

                <Bar
                  dataKey="score"
                  fill="#0F766E"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827]">
            Operations Timeline
          </h2>

          <p className="text-sm text-[#64748B]">
            Latest activities across departments
          </p>

          <div className="mt-5 space-y-5">
            {activity.map((item) => (
              <div
                key={item}
                className="flex gap-3"
              >
                <div className="mt-2 h-2 w-2 rounded-full bg-[#0F766E]" />

                <p className="text-sm text-[#334155]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827]">
            Platform Readiness
          </h2>

          <p className="text-sm text-[#64748B]">
            Core municipal services
          </p>

          <div className="mt-5 space-y-3">
            {readiness.map(({ name, status, Icon }) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="text-[#0F766E]"
                  />

                  <p className="text-sm font-medium text-[#111827]">
                    {name}
                  </p>
                </div>

                <span className="text-xs font-semibold text-[#0F766E]">
                  {status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2
                className="text-green-600"
                size={20}
              />

              <div>
                <p className="text-sm font-semibold text-[#111827]">
                  Overall Status
                </p>

                <p className="text-xs text-[#64748B]">
                  All operational services are healthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}