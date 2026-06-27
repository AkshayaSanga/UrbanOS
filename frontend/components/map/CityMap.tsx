"use client";

const zones = [
  ["Complaints", "128", "text-sky-400"],
  ["Assets", "1,284", "text-emerald-400"],
  ["Alerts", "5", "text-red-400"],
  ["Traffic Index", "72%", "text-amber-400"],
];

const incidents = [
  ["Road Damage", "Madhapur", "High"],
  ["Water Leakage", "Kukatpally", "Medium"],
  ["Streetlight Outage", "Gachibowli", "Low"],
  ["Accident Alert", "Hitech City", "Critical"],
];

export default function CityMap() {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sky-400">
            GIS Command Center
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Hyderabad City Operations Map
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Monitor complaints, public assets, alerts and active city zones.
          </p>
        </div>

        <button className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white hover:bg-sky-400">
          Refresh Map
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {zones.map(([label, value, color]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{label}</p>
            <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 lg:col-span-3">
          <iframe
            title="MetroVision GIS Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=78.3000%2C17.3000%2C78.6000%2C17.5500&layer=mapnik&marker=17.3850%2C78.4867"
            className="h-[650px] w-full"
          />
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-bold text-white">Live Incidents</h2>
          <p className="mt-1 text-sm text-slate-400">
            Active field events by zone
          </p>

          <div className="mt-5 space-y-4">
            {incidents.map(([title, area, priority]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
              >
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm text-slate-400">{area}</p>
                <p className="mt-3 text-xs font-bold text-sky-400">
                  {priority}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}