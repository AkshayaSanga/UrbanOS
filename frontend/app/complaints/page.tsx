"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import type { Complaint } from "@/types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const statuses = ["Submitted", "Assigned", "In Progress", "Resolved", "Rejected"];

function badgeColor(value: string) {
  if (value === "Resolved") return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  if (value === "Rejected") return "border-red-500/30 bg-red-500/10 text-red-400";
  if (value === "In Progress") return "border-sky-500/30 bg-sky-500/10 text-sky-400";
  if (value === "Assigned") return "border-amber-500/30 bg-amber-500/10 text-amber-400";
  return "border-slate-700 bg-slate-900 text-slate-300";
}

export default function Complaints() {
  const [items, setItems] = useState<Complaint[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/complaints", { params: { status: status || undefined } })
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, [status]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const text = `${item.title} ${item.category} ${item.status} ${item.priority} ${item.address}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [items, search]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
              Complaint Operations
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Citizen Complaints
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Track civic issues, status workflow, priorities and department response.
            </p>
          </div>

          <Link
            href="/complaints/new"
            className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white hover:bg-sky-400"
          >
            + New Complaint
          </Link>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            ["Total", items.length],
            ["Open", items.filter((i) => i.status !== "Resolved").length],
            ["Resolved", items.filter((i) => i.status === "Resolved").length],
            ["Critical", items.filter((i) => i.priority === "Critical").length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 md:flex-row">
          <input
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-sky-500"
          >
            <option value="">All Status</option>
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <table className="w-full text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Address</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 text-slate-300 hover:bg-slate-800/50"
                >
                  <td className="p-4 font-mono text-sky-400">#{item.id}</td>
                  <td className="p-4 font-medium text-white">{item.title}</td>
                  <td className="p-4">{item.category}</td>
                  <td className="p-4">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">{item.priority}</td>
                  <td className="p-4 text-slate-400">{item.address}</td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}