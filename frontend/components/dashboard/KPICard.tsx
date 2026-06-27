"use client";

import { ArrowUpRight } from "lucide-react";
import CountUp from "react-countup";

interface Props {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ReactNode;
  trend: string;
}

export default function KPICard({
  title,
  value,
  suffix = "",
  icon,
  trend,
}: Props) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            <CountUp end={value} duration={1.8} />
            {suffix}
          </h2>

          <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
            <ArrowUpRight size={16} />
            {trend}
          </div>
        </div>

        <div className="rounded-xl bg-teal-50 p-4 text-teal-700">
          {icon}
        </div>

      </div>

      <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-4/5 rounded-full bg-teal-600 transition-all duration-1000 group-hover:w-full"></div>
      </div>

    </div>
  );
}