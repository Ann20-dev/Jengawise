export type PropertyStatus = "stabilized" | "leasing" | "planned" | "under_construction";

export type Property = {
  id: string;
  name: string;
  developer: string;
  zone: string;
  neighborhood: string;
  coordinates: [number, number];
  status: PropertyStatus;
  units: number;
  typology: string;
  medianRent: number;
  pricePerSqm: number;
  occupancy: number;
  absorptionRate: number;
  riskScore: number;
  lastUpdated: string;
};

export type PipelineStage = "land_banked" | "permitted" | "financing" | "construction" | "handover";

export type PipelineProject = {
  id: string;
  name: string;
  developer: string;
  zone: string;
  stage: PipelineStage;
  units: number;
  completion: number;
  startDate: string;
  expectedDelivery: string;
  financier: string;
  risk: "low" | "medium" | "high";
  coordinates: [number, number];
};

export type DemandForecast = {
  zone: string;
  currentSupply: number;
  annualDemand: number;
  projectedShortfall: number;
  affordabilityIndex: number;
  confidence: number;
  segment: string;
};

export type Insight = {
  title: string;
  body: string;
  impact: "opportunity" | "risk" | "watch";
};

export type ReportSection = {
  id: string;
  label: string;
  description: string;
};
