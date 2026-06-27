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

const sections = [
  {
    title: "Operations",
    items: [
      { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
      { label: "Complaints", href: "/complaints", Icon: FileText },
      { label: "Assets", href: "/assets", Icon: Building2 },
      { label: "Alerts", href: "/alerts", Icon: AlertTriangle },
    ],
  },
  {
    title: "Spatial Intelligence",
    items: [{ label: "GIS Map", href: "/map", Icon: Map }],
  },
  {
    title: "Governance",
    items: [
      { label: "Reports", href: "/reports", Icon: BarChart3 },
      { label: "Admin", href: "/admin", Icon: Shield },
    ],
  },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-72 border-r border-[#334155] bg-[#111827] p-5 text-slate-100">
      <div className="mb-8 border-b border-[#334155] pb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[#D97706]">
          MetroVision
        </p>
        <h1 className="mt-2 text-xl font-semibold text-white">
          City Command
        </h1>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Municipal operations and infrastructure monitoring.
        </p>
      </div>

      <nav className="space-y-7">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(({ label, href, Icon }) => {
                const active = path === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-[#0F766E] text-white"
                        : "text-slate-400 hover:bg-[#1F2937] hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-[#334155] bg-[#1F2937] p-4">
        <p className="text-sm font-semibold text-white">System Health</p>
        <div className="mt-3 space-y-2 text-xs text-slate-400">
          <p>API ● Healthy</p>
          <p>Database ● Online</p>
          <p>GIS Layer ● Active</p>
        </div>
      </div>
    </aside>
  );
}