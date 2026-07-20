import { Activity, Database, KeyRound, ShieldCheck, UsersRound } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

const adminRows = [
  ["Data ingestion", "Property imports, permit feeds, and valuation comparables", "Healthy"],
  ["AI insight jobs", "Demand models, market summaries, and bankability scoring", "Scheduled"],
  ["Map layers", "Zones, transit buffers, schools, roads, and utility access", "Ready"],
  ["Report templates", "Investor, bank, developer, and planner outputs", "Draft"]
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-moss">Operations</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Admin Panel</h1>
        </div>
        <span className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-semibold text-ink">
          {isSupabaseConfigured ? "Supabase connected" : "Supabase pending"}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {[
          ["Users", "24", UsersRound],
          ["Datasets", "8", Database],
          ["Roles", "4", ShieldCheck],
          ["API Keys", "3", KeyRound]
        ].map(([label, value, Icon]) => (
          <article key={label.toString()} className="rounded-lg border border-line bg-paper p-4 shadow-sm">
            <Icon size={19} className="text-lake" aria-hidden="true" />
            <p className="mt-3 text-sm text-ink/55">{label.toString()}</p>
            <p className="text-2xl font-semibold text-ink">{value.toString()}</p>
          </article>
        ))}
      </div>

      <section className="mt-5 rounded-lg border border-line bg-paper shadow-sm">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-ink">System Modules</h2>
            <p className="text-sm text-ink/62">Platform setup and data service status.</p>
          </div>
          <Activity size={19} className="text-moss" aria-hidden="true" />
        </div>

        <div className="divide-y divide-line">
          {adminRows.map(([module, description, status]) => (
            <div key={module} className="grid gap-3 px-5 py-4 md:grid-cols-[220px_1fr_120px] md:items-center">
              <p className="font-semibold text-ink">{module}</p>
              <p className="text-sm text-ink/62">{description}</p>
              <span className="rounded-md bg-field px-2.5 py-1 text-center text-xs font-semibold text-ink/65">
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
