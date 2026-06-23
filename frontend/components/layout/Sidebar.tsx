"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["Dashboard", "/dashboard"],
  ["Complaints", "/complaints"],
  ["Assets", "/assets"],
  ["Alerts", "/alerts"],
  ["GIS Map", "/map"],
  ["Reports", "/reports"],
  ["Admin", "/admin"],
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-8 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-5 text-white shadow">
        <h1 className="text-2xl font-bold">UrbanOS</h1>
        <p className="mt-1 text-sm text-blue-100">
          Smart City Operations Platform
        </p>
      </div>

      <nav className="space-y-2">
        {items.map(([label, href]) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900">Hyderabad Console</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Complaint, asset, alert and department monitoring system.
        </p>
      </div>
    </aside>
  );
}