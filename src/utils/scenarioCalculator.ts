import { ScenarioParams, ScenarioKpis } from '../types';

export function calculateScenarioKpis(params: ScenarioParams): ScenarioKpis {
  // Baseline constants for Nova Industrials
  // Nova consumes ~45,000 bpd equivalent naphtha / condensates, 58% sourced via Gulf ports

  let baseSupplyAtRisk = 18; // default baseline %
  let baseRunway = params.inventory; // initial inventory days
  let baseCostImpact = 14.2; // default +14.2%
  let baseAtRiskDemand = 82.4; // $82.4M
  let baseCustomerService = 91; // 91%

  // 1. Duration effect
  if (params.duration === 30) {
    baseSupplyAtRisk -= 4;
    baseCostImpact -= 3.5;
    baseAtRiskDemand = 41.2;
    baseCustomerService = 95;
  } else if (params.duration === 60) {
    // baseline
    baseSupplyAtRisk = 18;
    baseCostImpact = 14.2;
    baseAtRiskDemand = 82.4;
    baseCustomerService = 91;
  } else if (params.duration === 90) {
    baseSupplyAtRisk += 9; // up to 27%
    baseCostImpact += 8.6; // up to +22.8%
    baseAtRiskDemand = 124.6;
    baseCustomerService = 79;
  } else if (params.duration === 120) {
    baseSupplyAtRisk += 16; // up to 34%
    baseCostImpact += 14.1; // up to +28.3%
    baseAtRiskDemand = 168.0;
    baseCustomerService = 68;
  }

  // 2. Demand modifier
  if (params.demand === '-10%') {
    baseSupplyAtRisk -= 3;
    baseRunway += 3;
    baseAtRiskDemand *= 0.9;
    baseCustomerService += 4;
  } else if (params.demand === '+10%') {
    baseSupplyAtRisk += 4;
    baseRunway -= 2;
    baseAtRiskDemand *= 1.1;
    baseCustomerService -= 5;
  } else if (params.demand === '+20%') {
    baseSupplyAtRisk += 8;
    baseRunway -= 5;
    baseAtRiskDemand *= 1.22;
    baseCustomerService -= 9;
  }

  // 3. Energy price modifier ($80, $100, $120, $150)
  const energyFactor = (params.energyPrice - 100) * 0.16; // e.g. at 120 -> +3.2%, at 150 -> +8%
  baseCostImpact += energyFactor;

  // 4. Freight rate modifier ('BASE', '+15%', '+30%', '+50%')
  if (params.freight === 'BASE') {
    baseCostImpact -= 2.0;
  } else if (params.freight === '+15%') {
    // baseline
  } else if (params.freight === '+30%') {
    baseCostImpact += 3.8;
  } else if (params.freight === '+50%') {
    baseCostImpact += 7.4;
  }

  // 5. Supplier availability modifier
  if (params.supplierAvailability === 'NORMAL') {
    baseSupplyAtRisk -= 6;
    baseCustomerService += 5;
  } else if (params.supplierAvailability === 'SEVERELY RESTRICTED') {
    baseSupplyAtRisk += 8;
    baseRunway -= 4;
    baseCostImpact += 4.5;
    baseCustomerService -= 8;
  }

  // 6. Interventions applied!
  if (params.interventions.alternativeSupplier) {
    // Secures ~14% volume from West Africa / Corpus Christi
    baseSupplyAtRisk -= 11;
    baseRunway += 6;
    baseCostImpact += 1.8; // premium on spot contracts
    baseAtRiskDemand *= 0.65;
    baseCustomerService += 8;
  }

  if (params.interventions.alternativeRoute) {
    // East-West pipeline to Yanbu + Cape bypass
    baseSupplyAtRisk -= 6;
    baseCostImpact += 3.2; // higher freight/bunker fuel
    baseCustomerService += 5;
  }

  if (params.interventions.inventoryBuffer) {
    // +15 days strategic buffer allocation
    baseRunway += 15;
    baseSupplyAtRisk -= 4;
    baseCostImpact += 1.1; // carrying cost of capital
    baseCustomerService += 4;
  }

  if (params.interventions.demandReduction) {
    // -8% demand curtailment on non-essential grades
    baseSupplyAtRisk -= 3;
    baseRunway += 4;
    baseAtRiskDemand *= 0.88;
    baseCostImpact -= 1.4;
  }

  if (params.interventions.productionShift) {
    // Shift Antwerp volume to US Gulf cracker
    baseSupplyAtRisk -= 5;
    baseCostImpact += 2.1; // inter-regional logistics
    baseCustomerService += 3;
  }

  // Clamping and bounds check
  const finalSupplyAtRisk = Math.max(3, Math.min(65, Math.round(baseSupplyAtRisk)));
  const finalRunway = Math.max(4, Math.min(60, Math.round(baseRunway)));
  const finalCostImpact = Number(Math.max(1.5, Math.min(48.0, baseCostImpact)).toFixed(1));
  const finalAtRiskDemand = Number(Math.max(8.0, Math.min(240.0, baseAtRiskDemand)).toFixed(1));
  const finalCustomerService = Math.max(45, Math.min(99, Math.round(baseCustomerService)));

  // Risk categorization
  let productionRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'MEDIUM';
  if (finalSupplyAtRisk >= 25 || finalRunway <= 14) {
    productionRisk = 'CRITICAL';
  } else if (finalSupplyAtRisk >= 16 || finalRunway <= 21) {
    productionRisk = 'HIGH';
  } else if (finalSupplyAtRisk >= 10 || finalRunway <= 30) {
    productionRisk = 'MEDIUM';
  } else {
    productionRisk = 'LOW';
  }

  // Exhaustion day estimation
  const exhaustionDay = Math.max(6, Math.min(params.duration, finalRunway));

  // Additional indicators
  const freightCostIndex = Math.round(100 + finalCostImpact * 1.8);
  const carbonImpactDelta = params.interventions.alternativeRoute ? 28 : (params.duration >= 90 ? 12 : 4);

  return {
    supplyAtRisk: finalSupplyAtRisk,
    inventoryRunway: finalRunway,
    costImpact: finalCostImpact,
    atRiskDemand: finalAtRiskDemand,
    customerServiceLevel: finalCustomerService,
    productionRisk,
    exhaustionDay,
    freightCostIndex,
    carbonImpactDelta,
  };
}

export function generateRunwayChartData(duration: number, initialRunway: number, interventionsCount: number) {
  const steps = 10;
  const interval = duration / steps;
  const points = [];

  const burnRate = 1.0 - (interventionsCount * 0.08);

  for (let i = 0; i <= steps; i++) {
    const day = Math.round(i * interval);
    // Inventory depletion formula
    const remainingDays = Math.max(0, initialRunway - (day * 0.42 * burnRate));
    const stockPercent = Math.max(0, Math.min(100, Math.round((remainingDays / initialRunway) * 100)));
    points.push({
      day,
      stockPercent,
      isExhausted: remainingDays <= 0,
    });
  }

  return points;
}
