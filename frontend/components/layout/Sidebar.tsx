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
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-800 bg-slate-950 p-5">
      <div className="mb-8">
        <div className="text-2xl font-bold text-sky-400">MetroVision</div>
        <div className="text-sm text-slate-400">Smart City Command Center</div>
      </div>

      <nav className="space-y-2">
        {items.map(([label, href]) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-sky-400 text-slate-950"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm font-semibold">Hyderabad Operations</p>
        <p className="mt-1 text-xs text-slate-400">
          Live municipal monitoring console
        </p>
      </div>
    </aside>
  );
}