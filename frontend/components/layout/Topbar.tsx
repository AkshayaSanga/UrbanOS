"use client";

import { Bell, CalendarDays, LogOut, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#334155] bg-[#111827]/95 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#D97706]">
            Integrated Operations Center
          </p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            Municipal Service Delivery Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-[#334155] bg-[#1F2937] px-3 py-2 lg:flex">
            <Search size={16} className="text-slate-500" />
            <input
              placeholder="Search incidents, assets..."
              className="w-56 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
          </div>

          <button className="rounded-md border border-[#334155] bg-[#1F2937] p-2.5 text-slate-300 hover:bg-[#273244]">
            <Bell size={18} />
          </button>

          <div className="hidden items-center gap-2 rounded-md border border-[#334155] bg-[#1F2937] px-3 py-2 md:flex">
            <CalendarDays size={16} className="text-[#D97706]" />
            <span className="text-sm text-slate-300">Live Shift</span>
          </div>

          <div className="hidden items-center gap-3 rounded-md border border-[#334155] bg-[#1F2937] px-3 py-2 md:flex">
            <UserCircle2 size={25} className="text-[#0F766E]" />
            <div>
              <p className="text-sm font-semibold text-white">Super Admin</p>
              <p className="text-xs text-slate-400">Hyderabad Command</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-md bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#115E59]"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}