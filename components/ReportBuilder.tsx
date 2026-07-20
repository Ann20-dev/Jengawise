"use client";

import { useMemo, useState } from "react";
import { Download, FileText, Printer, WandSparkles } from "lucide-react";
import { demandForecasts, formatCurrency, properties, reportSections } from "@/lib/data";

export function ReportBuilder() {
  const [selected, setSelected] = useState<string[]>(["market", "pipeline", "demand"]);
  const [audience, setAudience] = useState("Investor IC");

  const includedSections = useMemo(
    () => reportSections.filter((section) => selected.includes(section.id)),
    [selected]
  );

  const averageRent = Math.round(
    properties.reduce((sum, property) => sum + property.medianRent, 0) / properties.length
  );
  const largestShortfall = [...demandForecasts].sort((a, b) => b.projectedShortfall - a.projectedShortfall)[0];

  function toggleSection(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((sectionId) => sectionId !== id) : [...current, id]
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <section className="rounded-lg border border-line bg-paper p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-ink">Report Generation</h1>
        <p className="mt-1 text-sm text-ink/62">Assemble diligence-ready market reports from live intelligence.</p>

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-ink">Audience</span>
          <select
            value={audience}
            onChange={(event) => setAudience(event.target.value)}
            className="mt-2 h-11 w-full rounded-md border border-line bg-field px-3 text-sm font-semibold outline-none focus:border-moss"
          >
            <option>Investor IC</option>
            <option>Bank credit team</option>
            <option>Developer strategy</option>
            <option>Urban planning board</option>
          </select>
        </label>

        <div className="mt-5 space-y-3">
          {reportSections.map((section) => {
            const checked = selected.includes(section.id);
            return (
              <label
                key={section.id}
                className={`block cursor-pointer rounded-lg border p-4 transition ${
                  checked ? "border-moss bg-moss/8" : "border-line bg-field"
                }`}
              >
                <span className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSection(section.id)}
                    className="mt-1 h-4 w-4 accent-moss"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-ink">{section.label}</span>
                    <span className="mt-1 block text-sm leading-5 text-ink/62">{section.description}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-line bg-paper shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-ink">JengaWise Market Brief</h2>
            <p className="text-sm text-ink/62">{audience} · Nairobi metro · July 2026</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-line bg-field text-ink hover:border-moss"
              aria-label="Generate narrative"
              title="Generate narrative"
            >
              <WandSparkles size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="grid h-10 w-10 place-items-center rounded-md border border-line bg-field text-ink hover:border-moss"
              aria-label="Print report"
              title="Print report"
            >
              <Printer size={17} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white hover:bg-moss"
              aria-label="Download report"
              title="Download report"
            >
              <Download size={17} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-line bg-field p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-lake/12 text-lake">
                <FileText size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">Executive summary</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-ink/68">
                  Nairobi metro demand remains strongest in affordable commuter zones, while upper-mid rental stock
                  needs sharper product differentiation. Average tracked median rent is {formatCurrency(averageRent)},
                  and {largestShortfall.zone} shows the largest positive demand gap at{" "}
                  {largestShortfall.projectedShortfall.toLocaleString()} units.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {includedSections.map((section) => (
              <article key={section.id} className="rounded-lg border border-line p-4">
                <h4 className="text-sm font-semibold text-ink">{section.label}</h4>
                <p className="mt-2 text-sm leading-6 text-ink/65">{section.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
