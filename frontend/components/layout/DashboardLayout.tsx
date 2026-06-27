"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="ml-72 min-h-screen">
        <Topbar />
        <div className="p-0">{children}</div>
      </main>
    </div>
  );
}