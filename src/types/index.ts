export type ScreenId =
  | 'command'
  | 'scenario'
  | 'network'
  | 'routes'
  | 'risk'
  | 'briefing'
  | 'decisions'
  | 'architecture'
  | 'business'
  | 'video'
  | 'settings';

export type DisruptionDuration = 30 | 60 | 90 | 120;
export type DemandLevel = '-10%' | 'BASE' | '+10%' | '+20%';
export type EnergyPrice = 80 | 100 | 120 | 150;
export type FreightRate = 'BASE' | '+15%' | '+30%' | '+50%';
export type InventoryLevel = 15 | 24 | 35 | 45;
export type SupplierAvailability = 'NORMAL' | 'RESTRICTED' | 'SEVERELY RESTRICTED';

export interface Interventions {
  alternativeSupplier: boolean;
  alternativeRoute: boolean;
  inventoryBuffer: boolean;
  demandReduction: boolean;
  productionShift: boolean;
}

export interface ScenarioParams {
  duration: DisruptionDuration;
  demand: DemandLevel;
  energyPrice: EnergyPrice;
  freight: FreightRate;
  inventory: InventoryLevel;
  supplierAvailability: SupplierAvailability;
  interventions: Interventions;
}

export interface ScenarioKpis {
  supplyAtRisk: number; // percentage
  inventoryRunway: number; // days
  costImpact: number; // percentage (+14.2%)
  atRiskDemand: number; // in $M (e.g. 82.4)
  customerServiceLevel: number; // percentage (e.g. 91%)
  productionRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  exhaustionDay: number; // day number
  freightCostIndex: number; // index base 100
  carbonImpactDelta: number; // percentage change in emissions
}

export interface SavedScenario {
  id: string;
  name: string;
  description: string;
  params: ScenarioParams;
  kpis: ScenarioKpis;
  createdAt: string;
  isCustom?: boolean;
}

export type DecisionStatus = 'Proposed' | 'Approved' | 'In progress' | 'Complete';
export type DecisionCategory = 'Sourcing' | 'Logistics' | 'Inventory' | 'Commercial' | 'Operations';

export interface Decision {
  id: string;
  title: string;
  reason: string;
  scenarioName: string;
  expectedImpact: string;
  owner: string;
  status: DecisionStatus;
  category: DecisionCategory;
  costEstimate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineEntry {
  id: string;
  time: string;
  type: 'scenario_change' | 'intervention_tested' | 'scenario_compared' | 'decision_created' | 'system_alert';
  action: string;
  detail: string;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'supplier' | 'port' | 'route' | 'factory' | 'customer';
  location: string;
  state: 'HEALTHY' | 'AT RISK' | 'BLOCKED' | 'ALTERNATIVE';
  allocationPct: number;
  replacementCapacityPct: number;
  contractFlexibility: 'LOW' | 'MEDIUM' | 'HIGH';
  alternativeAvailable: boolean;
  alternativeName?: string;
  primaryRisk: string;
  x: number;
  y: number;
  details: {
    capacityDescription: string;
    dependentFacilities: string[];
    criticalFeedstock: string;
    leadTimeDelta: string;
    transitCorridor: string;
  };
}

export interface RouteCorridor {
  id: string;
  name: string;
  code: string;
  transitTimeDays: number;
  transitDeltaDays: number;
  relativeCostDeltaPct: number;
  dailyCapacity: string;
  reliabilityPct: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKED';
  co2ImpactPct: number;
  badgeLabel: string;
  description: string;
  chokePoints: string[];
  primaryCarriers: string[];
  currentStatus: 'BLOCKED' | 'ACTIVE' | 'CONGESTED' | 'STANDBY';
}

export interface RiskItem {
  id: string;
  category: 'Geopolitical' | 'Supply' | 'Logistics' | 'Inventory' | 'Financial' | 'Customer';
  title: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  impactArea: string;
  confidencePct: number;
  affectedArea: string;
  trend: 'improving' | 'stable' | 'deteriorating';
  description: string;
  suggestedMitigation: string;
  interventionTrigger?: keyof Interventions;
}

export type UserRole = 'owner' | 'viewer';

export interface SharedVideo {
  id: string;
  fileName: string;
  fileSizeFormatted: string;
  sizeBytes: number;
  durationSeconds: number;
  uploadedAt: string;
  uploadedBy: string;
  streamUrl: string;
  fallbackUrl?: string;
  mimeType: string;
  sourceType: 'file' | 'url';
}

export interface VideoUploadState {
  status: 'empty' | 'uploading' | 'available' | 'error';
  progress: number;
  error?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  time: string;
  read: boolean;
}
