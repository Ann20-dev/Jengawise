"use client";

import { useState } from "react";
import { RefreshCcw, Sparkles } from "lucide-react";
import { insights as fallbackInsights } from "@/lib/data";
import { Insight } from "@/lib/types";

const impactStyles = {
  opportunity: "border-moss/25 bg-moss/8 text-moss",
  risk: "border-berry/25 bg-berry/8 text-berry",
  watch: "border-sun/35 bg-sun/10 text-clay"
};

export function InsightPanel() {
  const [insights, setInsights] = useState<Insight[]>(fallbackInsights);
  const [loading, setLoading] = useState(false);

  async function refreshInsights() {
    setLoading(true);
    try {
      const response = await fetch("/api/insights", { method: "POST" });
      if (!response.ok) throw new Error("Insight request failed");
      const payload = (await response.json()) as { insights?: Insight[] };
      if (payload.insights?.length) {
        setInsights(payload.insights);
      }
    } catch {
      setInsights(fallbackInsights);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-lg border border-line bg-paper p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">AI Market Insights</h2>
          <p className="text-sm text-ink/62">Prioritized signals from supply, pipeline, and demand data.</p>
        </div>
        <button
          type="button"
          onClick={refreshInsights}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-ink px-3 text-sm font-semibold text-white transition hover:bg-moss disabled:cursor-wait disabled:bg-ink/65"
          disabled={loading}
        >
          {loading ? <RefreshCcw size={16} className="animate-spin" aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}
          Refresh
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {insights.map((insight) => (
          <article key={insight.title} className="rounded-lg border border-line bg-field p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="max-w-xl text-sm font-semibold leading-5 text-ink">{insight.title}</h3>
              <span className={`rounded-md border px-2 py-1 text-xs font-semibold capitalize ${impactStyles[insight.impact]}`}>
                {insight.impact}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/68">{insight.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
