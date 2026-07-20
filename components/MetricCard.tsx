import { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone: "moss" | "lake" | "clay" | "sun" | "berry";
  icon: LucideIcon;
};

const toneClasses = {
  moss: "bg-moss/10 text-moss border-moss/20",
  lake: "bg-lake/10 text-lake border-lake/20",
  clay: "bg-clay/10 text-clay border-clay/20",
  sun: "bg-sun/15 text-clay border-sun/30",
  berry: "bg-berry/10 text-berry border-berry/20"
};

export function MetricCard({ label, value, detail, tone, icon: Icon }: MetricCardProps) {
  return (
    <article className="rounded-lg border border-line bg-paper p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-normal text-ink/55">{label}</p>
          <p className="mt-2 text-2xl font-semibold leading-none text-ink">{value}</p>
        </div>
        <span className={`grid h-10 w-10 place-items-center rounded-md border ${toneClasses[tone]}`}>
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-sm leading-5 text-ink/65">{detail}</p>
    </article>
  );
}
