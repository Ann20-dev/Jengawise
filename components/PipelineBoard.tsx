"use client";

import { useMemo, useState } from "react";
import { CalendarDays, CircleDollarSign, HardHat, ShieldAlert } from "lucide-react";
import { pipelineProjects } from "@/lib/data";
import { PipelineStage } from "@/lib/types";

const stages: Array<{ id: PipelineStage | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "land_banked", label: "Land" },
  { id: "permitted", label: "Permits" },
  { id: "financing", label: "Financing" },
  { id: "construction", label: "Build" },
  { id: "handover", label: "Handover" }
];

const riskClasses = {
  low: "bg-moss/10 text-moss border-moss/20",
  medium: "bg-sun/12 text-clay border-sun/35",
  high: "bg-berry/10 text-berry border-berry/20"
};

export function PipelineBoard() {
  const [stage, setStage] = useState<PipelineStage | "all">("all");

  const filtered = useMemo(
    () => (stage === "all" ? pipelineProjects : pipelineProjects.filter((project) => project.stage === stage)),
    [stage]
  );

  return (
    <section className="rounded-lg border border-line bg-paper shadow-sm">
      <div className="border-b border-line p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-ink">Construction Pipeline</h1>
            <p className="text-sm text-ink/62">Track future supply from land bank through handover.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setStage(item.id)}
                className={`h-10 rounded-md px-3 text-sm font-semibold transition ${
                  stage === item.id ? "bg-ink text-white" : "border border-line bg-field text-ink/68 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-2">
        {filtered.map((project) => (
          <article key={project.id} className="rounded-lg border border-line bg-field p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-ink">{project.name}</h2>
                <p className="text-sm text-ink/58">
                  {project.developer} · {project.zone}
                </p>
              </div>
              <span className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize ${riskClasses[project.risk]}`}>
                {project.risk} risk
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-paper p-3">
                <HardHat size={17} className="text-moss" aria-hidden="true" />
                <p className="mt-2 text-xs text-ink/55">Units</p>
                <p className="text-base font-semibold">{project.units.toLocaleString()}</p>
              </div>
              <div className="rounded-md bg-paper p-3">
                <CircleDollarSign size={17} className="text-lake" aria-hidden="true" />
                <p className="mt-2 text-xs text-ink/55">Financier</p>
                <p className="text-base font-semibold">{project.financier}</p>
              </div>
              <div className="rounded-md bg-paper p-3">
                <CalendarDays size={17} className="text-clay" aria-hidden="true" />
                <p className="mt-2 text-xs text-ink/55">Delivery</p>
                <p className="text-base font-semibold">{project.expectedDelivery}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-ink/62">
                <span className="capitalize">{project.stage.replace("_", " ")}</span>
                <span>{project.completion}%</span>
              </div>
              <div className="h-2 rounded bg-paper">
                <div className="h-2 rounded bg-moss" style={{ width: `${project.completion}%` }} />
              </div>
            </div>

            {project.risk === "high" ? (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-berry/20 bg-berry/8 px-3 py-2 text-sm text-berry">
                <ShieldAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                Product concentration and delivery timing need lender review.
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
