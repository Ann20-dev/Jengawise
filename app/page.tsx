import {
  Activity,
  Banknote,
  Building2,
  ChartNoAxesCombined,
  Clock3,
  TrendingUp
} from "lucide-react";
import { DemandChart } from "@/components/DemandChart";
import { InsightPanel } from "@/components/InsightPanel";
import { MarketMap } from "@/components/MarketMap";
import { MetricCard } from "@/components/MetricCard";
import { demandForecasts, formatCurrency, pipelineUnits, properties, totalUnits, weightedOccupancy } from "@/lib/data";

export default function DashboardPage() {
  const averageRent = Math.round(
    properties.reduce((sum, property) => sum + property.medianRent, 0) / properties.length
  );
  const demandGap = demandForecasts.reduce((sum, forecast) => sum + forecast.projectedShortfall, 0);

  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-moss">Nairobi metro intelligence</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink sm:text-3xl">Real estate supply and demand command center</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-line bg-paper px-3 py-2 text-sm font-medium text-ink/70">
            Updated July 20, 2026
          </span>
          <span className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white">AI scoring active</span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Tracked Supply"
          value={totalUnits.toLocaleString()}
          detail="Units across stabilized, leasing, planned, and active construction assets."
          tone="moss"
          icon={Building2}
        />
        <MetricCard
          label="Pipeline Units"
          value={pipelineUnits.toLocaleString()}
          detail="Future deliveries with stage, financier, and delivery-risk tracking."
          tone="clay"
          icon={Clock3}
        />
        <MetricCard
          label="Demand Gap"
          value={`${demandGap > 0 ? "+" : ""}${demandGap.toLocaleString()}`}
          detail="Positive gap signals under-supply; negative gap flags potential absorption pressure."
          tone="lake"
          icon={TrendingUp}
        />
        <MetricCard
          label="Median Rent"
          value={formatCurrency(averageRent)}
          detail="Average median asking rent across the comparable property universe."
          tone="sun"
          icon={Banknote}
        />
        <MetricCard
          label="Occupancy"
          value={`${weightedOccupancy}%`}
          detail="Weighted occupancy across tracked completed or leasing assets."
          tone="berry"
          icon={Activity}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <MarketMap compact />
        <InsightPanel />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
        <DemandChart />
        <section className="rounded-lg border border-line bg-paper p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-ink">Portfolio Mix</h2>
              <p className="text-sm text-ink/62">Tracked stock by live status.</p>
            </div>
            <ChartNoAxesCombined size={20} className="text-lake" aria-hidden="true" />
          </div>

          <div className="mt-5 space-y-4">
            {[
              ["Stabilized", 154],
              ["Leasing", 416],
              ["Construction", 420],
              ["Planned", 612]
            ].map(([label, value]) => (
              <div key={label.toString()}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-ink">{label}</span>
                  <span className="text-ink/58">{value.toLocaleString()} units</span>
                </div>
                <div className="h-2 rounded bg-field">
                  <div className="h-2 rounded bg-lake" style={{ width: `${(Number(value) / 612) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
