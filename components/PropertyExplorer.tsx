"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, Building2, Search } from "lucide-react";
import { formatCurrency, properties } from "@/lib/data";
import { PropertyStatus } from "@/lib/types";

const statuses: Array<PropertyStatus | "all"> = ["all", "stabilized", "leasing", "under_construction", "planned"];

const statusLabels: Record<PropertyStatus | "all", string> = {
  all: "All",
  stabilized: "Stabilized",
  leasing: "Leasing",
  under_construction: "Construction",
  planned: "Planned"
};

export function PropertyExplorer() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<PropertyStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"units" | "rent" | "risk">("units");

  const filtered = useMemo(() => {
    return properties
      .filter((property) => {
        const matchesQuery = [property.name, property.developer, property.zone, property.neighborhood]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesStatus = status === "all" || property.status === status;
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "rent") return b.medianRent - a.medianRent;
        if (sortBy === "risk") return b.riskScore - a.riskScore;
        return b.units - a.units;
      });
  }, [query, status, sortBy]);

  return (
    <section className="rounded-lg border border-line bg-paper shadow-sm">
      <div className="border-b border-line p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-ink">Property Database</h1>
            <p className="text-sm text-ink/62">Comparable supply, pricing, occupancy, and risk metadata.</p>
          </div>
          <span className="rounded-md border border-line bg-field px-3 py-2 text-sm font-semibold text-ink">
            {filtered.length} assets
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <label className="flex h-11 items-center gap-2 rounded-md border border-line bg-field px-3">
            <Search size={17} className="text-ink/50" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search project, zone, developer"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink/45"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`h-11 rounded-md px-3 text-sm font-semibold transition ${
                  status === item ? "bg-moss text-white" : "border border-line bg-field text-ink/68 hover:text-ink"
                }`}
              >
                {statusLabels[item]}
              </button>
            ))}
          </div>

          <label className="flex h-11 items-center gap-2 rounded-md border border-line bg-field px-3">
            <ArrowUpDown size={16} className="text-ink/50" aria-hidden="true" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as "units" | "rent" | "risk")}
              className="bg-transparent text-sm font-semibold outline-none"
            >
              <option value="units">Units</option>
              <option value="rent">Median rent</option>
              <option value="risk">Risk score</option>
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-left text-sm">
          <thead className="bg-field text-xs uppercase tracking-normal text-ink/55">
            <tr>
              <th className="px-5 py-3 font-semibold">Asset</th>
              <th className="px-5 py-3 font-semibold">Zone</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Units</th>
              <th className="px-5 py-3 font-semibold">Median Rent</th>
              <th className="px-5 py-3 font-semibold">Occupancy</th>
              <th className="px-5 py-3 font-semibold">Risk</th>
              <th className="px-5 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((property) => (
              <tr key={property.id} className="hover:bg-field/70">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-moss/10 text-moss">
                      <Building2 size={17} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{property.name}</p>
                      <p className="text-xs text-ink/55">{property.developer}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="font-medium text-ink">{property.zone}</p>
                  <p className="text-xs text-ink/55">{property.neighborhood}</p>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-md bg-field px-2 py-1 text-xs font-semibold capitalize text-ink/70">
                    {property.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4 font-semibold">{property.units.toLocaleString()}</td>
                <td className="px-5 py-4">{formatCurrency(property.medianRent)}</td>
                <td className="px-5 py-4">{property.occupancy}%</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded bg-field">
                      <div className="h-2 rounded bg-clay" style={{ width: `${property.riskScore}%` }} />
                    </div>
                    <span className="text-xs font-semibold">{property.riskScore}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-ink/60">{property.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
