"use client";

export default function CityMap() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">GIS Map</h1>
        <p className="text-slate-400">
          Hyderabad complaints, assets and emergency alerts.
        </p>
      </div>

      <div className="h-[650px] w-full overflow-hidden rounded-xl border">
        <iframe
          title="MetroVision GIS Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=78.3000%2C17.3000%2C78.6000%2C17.5500&layer=mapnik&marker=17.3850%2C78.4867"
          className="h-full w-full"
        />
      </div>
    </div>
  );
}