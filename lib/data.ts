import { DemandForecast, Insight, PipelineProject, Property, ReportSection } from "@/lib/types";

export const properties: Property[] = [
  {
    id: "jw-001",
    name: "Maziwa Heights",
    developer: "RidgeLine Homes",
    zone: "Kilimani",
    neighborhood: "Kindaruma",
    coordinates: [36.7896, -1.2976],
    status: "leasing",
    units: 184,
    typology: "1BR, 2BR",
    medianRent: 78000,
    pricePerSqm: 148000,
    occupancy: 72,
    absorptionRate: 18,
    riskScore: 42,
    lastUpdated: "2026-07-12"
  },
  {
    id: "jw-002",
    name: "The Galleria Works",
    developer: "UrbanWeft Capital",
    zone: "Westlands",
    neighborhood: "Parklands",
    coordinates: [36.8151, -1.2621],
    status: "stabilized",
    units: 96,
    typology: "Studio, 1BR",
    medianRent: 69000,
    pricePerSqm: 165000,
    occupancy: 94,
    absorptionRate: 11,
    riskScore: 24,
    lastUpdated: "2026-07-15"
  },
  {
    id: "jw-003",
    name: "Amani Garden Courts",
    developer: "Safi Developments",
    zone: "Ruiru",
    neighborhood: "Membley",
    coordinates: [36.9637, -1.1578],
    status: "under_construction",
    units: 420,
    typology: "2BR, 3BR",
    medianRent: 42000,
    pricePerSqm: 82000,
    occupancy: 0,
    absorptionRate: 0,
    riskScore: 63,
    lastUpdated: "2026-07-08"
  },
  {
    id: "jw-004",
    name: "Thika Road Lofts",
    developer: "BluePeak Real Assets",
    zone: "Kasarani",
    neighborhood: "Mwiki",
    coordinates: [36.9058, -1.2204],
    status: "planned",
    units: 612,
    typology: "Studio, 1BR",
    medianRent: 28000,
    pricePerSqm: 72000,
    occupancy: 0,
    absorptionRate: 0,
    riskScore: 55,
    lastUpdated: "2026-07-10"
  },
  {
    id: "jw-005",
    name: "Riverbend Residency",
    developer: "Kijani Living",
    zone: "Rongai",
    neighborhood: "Maasai Lodge",
    coordinates: [36.7742, -1.3929],
    status: "leasing",
    units: 232,
    typology: "2BR",
    medianRent: 36000,
    pricePerSqm: 78000,
    occupancy: 61,
    absorptionRate: 22,
    riskScore: 37,
    lastUpdated: "2026-07-13"
  },
  {
    id: "jw-006",
    name: "Lavington Quarter",
    developer: "CivicStone Partners",
    zone: "Lavington",
    neighborhood: "Muthangari",
    coordinates: [36.7693, -1.2789],
    status: "stabilized",
    units: 58,
    typology: "3BR, 4BR",
    medianRent: 185000,
    pricePerSqm: 214000,
    occupancy: 88,
    absorptionRate: 8,
    riskScore: 31,
    lastUpdated: "2026-07-16"
  }
];

export const pipelineProjects: PipelineProject[] = [
  {
    id: "pipe-001",
    name: "Orbit Junction Apartments",
    developer: "NorthArc Builders",
    zone: "Kasarani",
    stage: "construction",
    units: 840,
    completion: 54,
    startDate: "2025-10-04",
    expectedDelivery: "2027-02-15",
    financier: "Cooperative Bank",
    risk: "medium",
    coordinates: [36.8924, -1.2265]
  },
  {
    id: "pipe-002",
    name: "Riverside Micro Suites",
    developer: "UrbanWeft Capital",
    zone: "Westlands",
    stage: "financing",
    units: 214,
    completion: 18,
    startDate: "2026-03-01",
    expectedDelivery: "2027-08-30",
    financier: "NCBA",
    risk: "low",
    coordinates: [36.8002, -1.2649]
  },
  {
    id: "pipe-003",
    name: "Eastern Gate Estate",
    developer: "Safi Developments",
    zone: "Ruiru",
    stage: "permitted",
    units: 1200,
    completion: 8,
    startDate: "2026-09-01",
    expectedDelivery: "2028-01-15",
    financier: "Equity Bank",
    risk: "high",
    coordinates: [36.9872, -1.1488]
  },
  {
    id: "pipe-004",
    name: "Ngong View Terraces",
    developer: "Kijani Living",
    zone: "Rongai",
    stage: "handover",
    units: 164,
    completion: 91,
    startDate: "2024-11-10",
    expectedDelivery: "2026-09-20",
    financier: "I&M Bank",
    risk: "low",
    coordinates: [36.7691, -1.3952]
  },
  {
    id: "pipe-005",
    name: "Kilimani Annex",
    developer: "RidgeLine Homes",
    zone: "Kilimani",
    stage: "land_banked",
    units: 320,
    completion: 3,
    startDate: "2027-01-15",
    expectedDelivery: "2028-06-01",
    financier: "Term sheet pending",
    risk: "medium",
    coordinates: [36.7849, -1.2923]
  }
];

export const demandForecasts: DemandForecast[] = [
  {
    zone: "Kilimani",
    currentSupply: 7420,
    annualDemand: 1020,
    projectedShortfall: -820,
    affordabilityIndex: 61,
    confidence: 84,
    segment: "Upper-mid rental"
  },
  {
    zone: "Westlands",
    currentSupply: 4180,
    annualDemand: 760,
    projectedShortfall: 240,
    affordabilityIndex: 69,
    confidence: 81,
    segment: "Serviced and micro-units"
  },
  {
    zone: "Ruiru",
    currentSupply: 9800,
    annualDemand: 1840,
    projectedShortfall: 1260,
    affordabilityIndex: 88,
    confidence: 79,
    segment: "Mass-market ownership"
  },
  {
    zone: "Kasarani",
    currentSupply: 11260,
    annualDemand: 2100,
    projectedShortfall: 430,
    affordabilityIndex: 92,
    confidence: 76,
    segment: "Student and starter rentals"
  },
  {
    zone: "Rongai",
    currentSupply: 6750,
    annualDemand: 1180,
    projectedShortfall: 690,
    affordabilityIndex: 85,
    confidence: 74,
    segment: "Family rental"
  }
];

export const insights: Insight[] = [
  {
    title: "Ruiru is absorbing family units faster than the active pipeline can replenish.",
    body: "Demand signals from household formation, road access, and school proximity point to a 1,260-unit shortfall over the next 12 months.",
    impact: "opportunity"
  },
  {
    title: "Kilimani upper-mid rentals are at oversupply risk.",
    body: "Permitted and under-construction stock is concentrated in similar 1BR and 2BR products, while rent growth is flattening.",
    impact: "risk"
  },
  {
    title: "Westlands micro-units remain financeable if delivery stays below 220 units per scheme.",
    body: "Occupancy remains above 90 percent, but lender exposure should be stress-tested against new serviced apartment supply.",
    impact: "watch"
  }
];

export const reportSections: ReportSection[] = [
  {
    id: "market",
    label: "Market Snapshot",
    description: "Supply, rent, sale price, occupancy, and absorption by zone."
  },
  {
    id: "pipeline",
    label: "Construction Pipeline",
    description: "Permits, financing, delivery dates, risk, and duplicated product exposure."
  },
  {
    id: "demand",
    label: "Demand Forecast",
    description: "Segment demand, affordability, commute access, and shortfall estimates."
  },
  {
    id: "bankability",
    label: "Bankability View",
    description: "Loan sizing, comparable stock, exit risk, and scenario stress points."
  }
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0
  }).format(value);

export const totalUnits = properties.reduce((sum, property) => sum + property.units, 0);
export const pipelineUnits = pipelineProjects.reduce((sum, project) => sum + project.units, 0);
export const weightedOccupancy = Math.round(
  properties.reduce((sum, property) => sum + property.occupancy * property.units, 0) /
    properties.reduce((sum, property) => sum + property.units, 0)
);
