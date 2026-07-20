import { MarketMap } from "@/components/MarketMap";
import { DemandChart } from "@/components/DemandChart";

export default function MapsPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-normal text-moss">Spatial intelligence</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink">Interactive Maps</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_420px]">
        <MarketMap />
        <DemandChart />
      </div>
    </div>
  );
}
