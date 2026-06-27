"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  Car,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  ShieldAlert,
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

const kpis = [
  { title: "Active Complaints", value: "128", change: "+12%", icon: FileText },
  { title: "Resolved Today", value: "42", change: "+8%", icon: CheckCircle2 },
  { title: "Critical Alerts", value: "5", change: "-2", icon: ShieldAlert },
  { title: "Active Assets", value: "1,284", change: "96% online", icon: Building2 },
  { title: "Traffic Index", value: "72%", change: "High", icon: Car },
  { title: "AQI", value: "118", change: "Moderate", icon: Activity },
  { title: "SLA Compliance", value: "87%", change: "+4%", icon: Clock },
  { title: "Officers Online", value: "36", change: "Live", icon: Users },
];

const complaintTrend = [
  { day: "Mon", complaints: 34 },
  { day: "Tue", complaints: 48 },
  { day: "Wed", complaints: 41 },
  { day: "Thu", complaints: 62 },
  { day: "Fri", complaints: 55 },
  { day: "Sat", complaints: 72 },
  { day: "Sun", complaints: 58 },
];

const categoryData = [
  { category: "Roads", count: 42 },
  { category: "Water", count: 36 },
  { category: "Sanitation", count: 31 },
  { category: "Traffic", count: 28 },
  { category: "Electricity", count: 24 },
];

const deptPerformance = [
  { department: "Roads", score: 82 },
  { department: "Water", score: 76 },
  { department: "Traffic", score: 71 },
  { department: "Sanitation", score: 88 },
];

const activities = [
  "Complaint #MV-1024 assigned to Roads Department",
  "Critical traffic alert reported near Hitech City",
  "Streetlight asset SL-882 marked as repaired",
  "New pollution sensor data synced successfully",
  "Monthly operational report generated",
];

const alerts = [
  { title: "Road Accident", area: "Madhapur", level: "Critical" },
  { title: "Water Leakage", area: "Kukatpally", level: "High" },
  { title: "AQI Warning", area: "Gachibowli", level: "Medium" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-sky-400">
            MetroVision Command Center
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Smart City Operations Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Real-time overview of complaints, assets, alerts, traffic, pollution and field operations.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400">
            + New Complaint
          </button>
          <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-900">
            Generate Report
          </button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-sky-500/10 p-3 text-sky-400">
                  <Icon size={22} />
                </div>
                <span className="text-xs text-slate-400">{item.change}</span>
              </div>
              <h3 className="mt-5 text-sm text-slate-400">{item.title}</h3>
              <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
            </div>
          );
        })}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Complaint Trend</h2>
          <p className="mb-4 text-sm text-slate-400">Weekly complaint inflow across city zones</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={complaintTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="complaints"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Latest Alerts</h2>
          <div className="mt-4 space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-xl border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{alert.title}</p>
                  <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                    {alert.level}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={14} /> {alert.area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Complaints by Category</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Department Performance</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="score" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <div className="mt-4 space-y-4">
            {activities.map((activity, index) => (
              <div key={activity} className="flex gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                <p className="text-sm text-slate-300">{activity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-400" size={20} />
              <div>
                <p className="text-sm font-semibold text-white">System Health</p>
                <p className="text-xs text-slate-400">All core services operational</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}