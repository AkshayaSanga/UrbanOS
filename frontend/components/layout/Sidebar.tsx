"use client";

import {
  AlertTriangle,
  BarChart3,
  Building2,
  FileText,
  LayoutDashboard,
  Map,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { label: "Complaints", href: "/complaints", Icon: FileText },
  { label: "Assets", href: "/assets", Icon: Building2 },
  { label: "Alerts", href: "/alerts", Icon: AlertTriangle },
  { label: "GIS Map", href: "/map", Icon: Map },
  { label: "Reports", href: "/reports", Icon: BarChart3 },
  { label: "Admin", href: "/admin", Icon: Shield },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-slate-800 bg-slate-950 p-5 text-slate-100 shadow-2xl">
      <div className="mb-8 rounded-2xl border border-sky-500/20 bg-gradient-to-br from-slate-900 to-slate-800 p-5 shadow-lg">
        <p className="text-xs uppercase tracking-[0.28em] text-sky-400">
          Command Center
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">MetroVision</h1>
        <p className="mt-1 text-sm text-slate-400">
          Smart City Operations Platform
        </p>
      </div>

      <nav className="space-y-2">
        {items.map(({ label, href, Icon }) => {
          const active = path === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm font-bold text-white">Hyderabad Console</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Live civic operations, assets, alerts and department monitoring.
        </p>
      </div>
    </aside>
  );
}