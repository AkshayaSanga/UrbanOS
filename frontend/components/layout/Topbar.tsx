"use client";

import {
  Bell,
  CalendarDays,
  LogOut,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Topbar() {
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 px-8 py-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
            MetroVision
          </p>

          <h1 className="mt-1 text-2xl font-bold text-white">
            Smart City Operations Center
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Real-time monitoring of complaints, assets, alerts and city services
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 lg:flex">
            <Search size={16} className="text-slate-500" />
            <input
              placeholder="Search complaints, assets..."
              className="w-56 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-300 hover:bg-slate-800">
            <Bell size={18} />
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 md:flex">
            <CalendarDays size={16} className="text-sky-400" />
            <span className="text-sm text-slate-300">
              Live Monitoring
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
            <UserCircle2 size={28} className="text-sky-400" />

            <div>
              <p className="text-sm font-semibold text-white">
                Super Admin
              </p>
              <p className="text-xs text-slate-400">
                Hyderabad Command Center
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}