"use client";

import dynamic from "next/dynamic";

const CityMap = dynamic(
  () => import("../../components/map/CityMap"),
  {
    ssr: false,
  }
);

export default function MapPage() {
  return (
    <div className="p-6">
      <CityMap />
    </div>
  );
}