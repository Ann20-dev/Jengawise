import { demandForecasts } from "@/lib/data";

export function DemandChart() {
  const maxDemand = Math.max(...demandForecasts.map((forecast) => forecast.annualDemand));

  return (
    <section className="rounded-lg border border-line bg-paper p-5 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-ink">Demand Prediction</h2>
          <p className="text-sm text-ink/62">12-month household demand and expected supply gap.</p>
        </div>
        <span className="rounded-md bg-lake/10 px-2.5 py-1 text-xs font-semibold text-lake">
          Nairobi metro
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {demandForecasts.map((forecast) => {
          const demandWidth = Math.round((forecast.annualDemand / maxDemand) * 100);
          const gapTone = forecast.projectedShortfall >= 0 ? "bg-moss" : "bg-berry";

          return (
            <div key={forecast.zone} className="grid gap-2 md:grid-cols-[140px_1fr_96px] md:items-center">
              <div>
                <p className="text-sm font-semibold text-ink">{forecast.zone}</p>
                <p className="text-xs text-ink/55">{forecast.segment}</p>
              </div>
              <div className="h-8 rounded-md bg-field">
                <div
                  className="flex h-8 items-center rounded-md bg-lake px-3 text-xs font-semibold text-white"
                  style={{ width: `${demandWidth}%`, minWidth: "72px" }}
                >
                  {forecast.annualDemand.toLocaleString()} units
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 md:justify-end">
                <span className={`h-2.5 w-2.5 rounded-sm ${gapTone}`} />
                <span className="text-sm font-semibold text-ink">
                  {forecast.projectedShortfall > 0 ? "+" : ""}
                  {forecast.projectedShortfall.toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
