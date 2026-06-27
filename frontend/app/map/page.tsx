"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import dynamic from "next/dynamic";

const CityMap = dynamic(() => import("../../components/map/CityMap"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <CityMap />
      </div>
    </DashboardLayout>
  );
}