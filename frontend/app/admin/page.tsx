"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";
import {
    Building2,
    ClipboardList,
    ShieldCheck,
    UserCog,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type Department = {
  id: number;
  name: string;
  description?: string;
};

const users = [
  { name: "UrbanOS Admin", role: "Super Admin", status: "Active" },
  { name: "Roads Manager", role: "Department Manager", status: "Active" },
  { name: "Field Officer", role: "Officer", status: "On Duty" },
];

const auditLogs = [
  "Admin signed in successfully",
  "Complaint MV-1024 assigned to Roads Department",
  "Asset SL-882 updated by field officer",
  "Emergency alert acknowledged by Traffic Department",
];

export default function AdminPage() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    api
      .get("/departments")
      .then((res) => setDepartments(res.data))
      .catch(() => setDepartments([]));
  }, []);

  return (
    <DashboardLayout>
      <main className="p-6">
        <div className="mb-6 rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B45309]">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-semibold text-[#111827]">
            Governance Console
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Manage departments, users, roles, permissions and operational audit
            history.
          </p>
        </div>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Users", value: "24", Icon: Users },
            { label: "Departments", value: departments.length || 8, Icon: Building2 },
            { label: "Roles", value: "5", Icon: ShieldCheck },
            { label: "Audit Events", value: "128", Icon: ClipboardList },
          ].map(({ label, value, Icon }) => (
            <div
              key={label}
              className="rounded-xl border border-[#CBD5E1] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B]">{label}</p>
                  <p className="mt-2 text-3xl font-semibold text-[#111827]">
                    {value}
                  </p>
                </div>

                <div className="rounded-md bg-[#F8FAFC] p-2 text-[#0F766E]">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Building2 className="text-[#0F766E]" size={22} />
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">
                  Departments
                </h2>
                <p className="text-sm text-[#64748B]">
                  Municipal service units and operational ownership.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <p className="font-semibold text-[#111827]">{dept.name}</p>
                  <p className="mt-1 text-sm text-[#64748B]">
                    {dept.description || "Department operational unit"}
                  </p>
                </div>
              ))}

              {!departments.length && (
                <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#64748B]">
                  No departments loaded from backend.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <UserCog className="text-[#0F766E]" size={22} />
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">
                  Users & Roles
                </h2>
                <p className="text-sm text-[#64748B]">
                  Role-based access overview.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div>
                    <p className="font-semibold text-[#111827]">{user.name}</p>
                    <p className="text-sm text-[#64748B]">{user.role}</p>
                  </div>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <ClipboardList className="text-[#0F766E]" size={22} />
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">
                Audit Logs
              </h2>
              <p className="text-sm text-[#64748B]">
                Recent governance and operational actions.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div
                key={log}
                className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm text-[#334155]"
              >
                {log}
              </div>
            ))}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}