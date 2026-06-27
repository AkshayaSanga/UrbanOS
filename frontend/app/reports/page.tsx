"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import { BarChart3, Download, FileText, TrendingUp } from "lucide-react";

const cards = [
  { title: "Monthly Requests", value: "1,248", meta: "+12%", Icon: FileText },
  { title: "Resolved Cases", value: "942", meta: "+18%", Icon: TrendingUp },
  { title: "SLA Compliance", value: "96.2%", meta: "+3.4%", Icon: BarChart3 },
  { title: "Departments", value: "8", meta: "Active", Icon: FileText },
];

const departmentSummary = [
  { name: "Roads Department", value: "82% SLA", width: "w-[82%]" },
  { name: "Water Department", value: "76% SLA", width: "w-[76%]" },
  { name: "Sanitation", value: "88% SLA", width: "w-[88%]" },
  { name: "Traffic", value: "71% SLA", width: "w-[71%]" },
];

export default function ReportsPage() {
  async function downloadCsv(type: "complaints" | "assets") {
    const res = await api.get(`/reports/${type}.csv`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <DashboardLayout>
      <main className="p-6">
        <div className="mb-6 rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
            Operational Analytics
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#111827]">
            Reports & Exports
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Download municipal reports and review monthly service performance.
          </p>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {cards.map(({ title, value, meta, Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B]">{title}</p>

                  <p className="mt-2 text-3xl font-semibold text-[#111827]">
                    {value}
                  </p>

                  <p className="mt-2 text-xs text-[#0F766E]">{meta}</p>
                </div>

                <div className="rounded-md bg-[#F8FAFC] p-2 text-[#0F766E]">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#111827]">
              Export Reports
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Generate CSV reports from backend APIs.
            </p>

            <div className="mt-6 grid gap-4">
              <button
                onClick={() => downloadCsv("complaints")}
                className="flex items-center justify-between rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-left hover:bg-white"
              >
                <div>
                  <p className="font-semibold text-[#111827]">
                    Complaints Report
                  </p>

                  <p className="text-sm text-[#64748B]">
                    Complaint lifecycle, status and priority data
                  </p>
                </div>

                <Download className="text-[#0F766E]" size={20} />
              </button>

              <button
                onClick={() => downloadCsv("assets")}
                className="flex items-center justify-between rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-left hover:bg-white"
              >
                <div>
                  <p className="font-semibold text-[#111827]">Assets Report</p>

                  <p className="text-sm text-[#64748B]">
                    Infrastructure assets and maintenance status
                  </p>
                </div>

                <Download className="text-[#0F766E]" size={20} />
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#111827]">
              Monthly Summary
            </h2>

            <div className="mt-6 space-y-4">
              {departmentSummary.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#111827]">
                      {item.name}
                    </span>

                    <span className="text-[#0F766E]">{item.value}</span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className={`h-2 rounded-full bg-[#0F766E] ${item.width}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}