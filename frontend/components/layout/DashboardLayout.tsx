"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <Sidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}