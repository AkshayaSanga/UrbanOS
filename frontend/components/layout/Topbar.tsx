"use client";

export default function Topbar() {
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">
            City Operations Console
          </h1>
          <p className="text-sm text-slate-400">
            Hyderabad municipal operations overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            System Online
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-900"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}