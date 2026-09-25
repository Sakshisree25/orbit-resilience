import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  DisruptionDuration,
  DemandLevel,
  EnergyPrice,
  FreightRate,
  InventoryLevel,
  SupplierAvailability,
  SavedScenario,
} from '../../types';
import { generateRunwayChartData } from '../../utils/scenarioCalculator';
import { SaveScenarioModal } from '../modals/SaveScenarioModal';
import {
  FlaskConical,
  RotateCcw,
  BookmarkPlus,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  ArrowRight,
  Layers,
  Sparkles,
  Zap,
  Check,
  Plus,
} from 'lucide-react';

export const ScenarioLabScreen: React.FC = () => {
  const {
    params,
    kpis,
    setDuration,
    setDemand,
    setEnergyPrice,
    setFreight,
    setInventory,
    setSupplierAvailability,
    toggleIntervention,
    resetToBaseline,
    savedScenarios,
    applySavedScenario,
    setIsDecisionModalOpen,
  } = useApp();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Intervention count
  const activeInterventionsCount = Object.values(params.interventions).filter(Boolean).length;

  // Runway depletion curve points
  const runwayPoints = generateRunwayChartData(
    params.duration,
    kpis.inventoryRunway,
    activeInterventionsCount
  );

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              HERO SIMULATION ENGINE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · DYNAMIC STRESS TESTER
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Scenario Lab
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Change the assumptions. See the consequences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetToBaseline}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            title="Reset parameters to 60-day baseline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>

          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Save Scenario</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Scenario Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SCENARIO CONTROLS (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Simulation Controls & Assumptions
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Real-time recalculation
            </span>
          </div>

          {/* Control 1: Disruption Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">1. DISRUPTION DURATION</span>
              <span className="text-cyan-400 font-bold">{params.duration} Days</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {([30, 60, 90, 120] as DisruptionDuration[]).map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    params.duration === d
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>
          </div>

          {/* Control 2: Demand Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">2. PRODUCT DEMAND LEVEL</span>
              <span className="text-cyan-400 font-bold">{params.demand}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['-10%', 'BASE', '+10%', '+20%'] as DemandLevel[]).map(dem => (
                <button
                  key={dem}
                  onClick={() => setDemand(dem)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    params.demand === dem
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {dem}
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Energy Price ($80, $100, $120, $150) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">3. ENERGY PRICE (CRUDE BENCHMARK)</span>
              <span className="text-amber-400 font-bold">${params.energyPrice} / bbl</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {([80, 100, 120, 150] as EnergyPrice[]).map(price => (
                <button
                  key={price}
                  onClick={() => setEnergyPrice(price)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    params.energyPrice === price
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  ${price}
                </button>
              ))}
            </div>
          </div>

          {/* Control 4: Freight Rate (BASE, +15%, +30%, +50%) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">4. TANKER FREIGHT SURCHARGES</span>
              <span className="text-amber-400 font-bold">{params.freight}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {(['BASE', '+15%', '+30%', '+50%'] as FreightRate[]).map(fr => (
                <button
                  key={fr}
                  onClick={() => setFreight(fr)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    params.freight === fr
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {fr}
                </button>
              ))}
            </div>
          </div>

          {/* Control 5: Operational Inventory Days */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">5. OPERATIONAL INVENTORY LEVEL</span>
              <span className="text-emerald-400 font-bold">{params.inventory} Days</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {([15, 24, 35, 45] as InventoryLevel[]).map(inv => (
                <button
                  key={inv}
                  onClick={() => setInventory(inv)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-all text-center cursor-pointer ${
                    params.inventory === inv
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {inv} days
                </button>
              ))}
            </div>
          </div>

          {/* Control 6: Supplier Availability */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold">6. GULF SUPPLIER AVAILABILITY</span>
              <span className="text-cyan-400 font-bold">{params.supplierAvailability}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['NORMAL', 'RESTRICTED', 'SEVERELY RESTRICTED'] as SupplierAvailability[]).map(avail => (
                <button
                  key={avail}
                  onClick={() => setSupplierAvailability(avail)}
                  className={`py-2 px-2 rounded-lg text-[11px] font-mono font-medium transition-all text-center truncate cursor-pointer ${
                    params.supplierAvailability === avail
                      ? 'bg-cyan-600 text-white shadow-sm ring-1 ring-cyan-400'
                      : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {avail}
                </button>
              ))}
            </div>
          </div>

          {/* INTERVENTIONS SECTION */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                  ACTIVE MITIGATION INTERVENTIONS
                </span>
                <span className="text-[11px] text-slate-400">
                  Toggle levers to evaluate resilience impact
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/60">
                {activeInterventionsCount} Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Intervention 1 */}
              <button
                onClick={() => toggleIntervention('alternativeSupplier')}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  params.interventions.alternativeSupplier
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {params.interventions.alternativeSupplier ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Alternative Supplier</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Bonny Island & Corpus Christi (+14k bpd)
                  </div>
                </div>
              </button>

              {/* Intervention 2 */}
              <button
                onClick={() => toggleIntervention('alternativeRoute')}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  params.interventions.alternativeRoute
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {params.interventions.alternativeRoute ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Alternative Route</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    East-West Petroline & Cape Bypass
                  </div>
                </div>
              </button>

              {/* Intervention 3 */}
              <button
                onClick={() => toggleIntervention('inventoryBuffer')}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  params.interventions.inventoryBuffer
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {params.interventions.inventoryBuffer ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Strategic Inventory Buffer</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    +15 days buffer via Jurong storage
                  </div>
                </div>
              </button>

              {/* Intervention 4 */}
              <button
                onClick={() => toggleIntervention('demandReduction')}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  params.interventions.demandReduction
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {params.interventions.demandReduction ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Demand Reduction</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    -8% peak load shaving on spot volume
                  </div>
                </div>
              </button>

              {/* Intervention 5 */}
              <button
                onClick={() => toggleIntervention('productionShift')}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer sm:col-span-2 ${
                  params.interventions.productionShift
                    ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {params.interventions.productionShift ? (
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>Production Shift (Antwerp → Houston)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Rebalances cracker load to Permian Basin feed at Plant 04
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE SCENARIO OUTCOME (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Live Scenario Outcome
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              SIMULATED DATA
            </span>
          </div>

          {/* Outcome cards list */}
          <div className="space-y-3 font-mono">
            {/* Supply Gap */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  SUPPLY GAP
                </span>
                <span className="text-2xl font-bold text-white tabular-nums">
                  {kpis.supplyAtRisk}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-rose-400 font-medium">
                  {kpis.supplyAtRisk >= 20 ? 'Substantial Deficit' : 'Manageable Deficit'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {(45000 * (kpis.supplyAtRisk / 100)).toFixed(0)} bpd shortfall
                </span>
              </div>
            </div>

            {/* Inventory Exhaustion */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  INVENTORY EXHAUSTION
                </span>
                <span className="text-2xl font-bold text-amber-300 tabular-nums">
                  Day {kpis.exhaustionDay}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-300 font-medium">
                  {kpis.inventoryRunway} Days Runway
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Plant 02 earliest dry-run
                </span>
              </div>
            </div>

            {/* Cost Impact */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  COST IMPACT
                </span>
                <span className="text-2xl font-bold text-amber-400 tabular-nums">
                  +{kpis.costImpact}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-300 font-medium">
                  Feedstock & Charter Premium
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Est. +${(kpis.costImpact * 0.95).toFixed(1)}M/mo
                </span>
              </div>
            </div>

            {/* Customer Service */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  CUSTOMER SERVICE SLA
                </span>
                <span className="text-2xl font-bold text-white tabular-nums">
                  {kpis.customerServiceLevel}%
                </span>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold ${kpis.customerServiceLevel >= 90 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {kpis.customerServiceLevel >= 90 ? 'Contract Compliant' : 'Liquidated Damages'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ${kpis.atRiskDemand}M at-risk order book
                </span>
              </div>
            </div>

            {/* Production Interruption Risk */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  PRODUCTION INTERRUPTION RISK
                </span>
                <span className={`text-xl font-bold uppercase ${
                  kpis.productionRisk === 'CRITICAL' ? 'text-rose-400' :
                  kpis.productionRisk === 'HIGH' ? 'text-amber-400' :
                  kpis.productionRisk === 'MEDIUM' ? 'text-yellow-300' : 'text-emerald-400'
                }`}>
                  {kpis.productionRisk}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 block">
                  Confidence Score: 84%
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Based on 1,000 Monte Carlo runs
                </span>
              </div>
            </div>
          </div>

          {/* Stock Runway Depletion Curve Mini-Chart */}
          <div className="pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span>STOCK RUNWAY DEPLETION CURVE</span>
              <span className="text-cyan-400">Day 0 → Day {params.duration}</span>
            </div>

            <div className="h-28 bg-slate-950 rounded-lg p-2 border border-slate-800 flex items-end gap-1.5 justify-between">
              {runwayPoints.map((pt, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div
                    style={{ height: `${Math.max(4, pt.stockPercent)}%` }}
                    className={`w-full rounded-t transition-all ${
                      pt.stockPercent === 0
                        ? 'bg-rose-500/40 border-t-2 border-rose-500'
                        : pt.stockPercent < 30
                        ? 'bg-amber-500/70 hover:bg-amber-400'
                        : 'bg-cyan-500/70 hover:bg-cyan-400'
                    }`}
                  />
                  <span className="text-[9px] font-mono text-slate-400">
                    d{pt.day}
                  </span>

                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 bg-slate-800 text-[10px] font-mono text-white px-1.5 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                    Day {pt.day}: {pt.stockPercent}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action from Outcome */}
          <button
            onClick={() => setIsDecisionModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer shadow"
          >
            <span>Formalize Decision for this Scenario</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* SCENARIO COMPARISON TABLE & MATRIX */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Scenario Comparison Matrix
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare baseline vs alternate sourcing vs strategic buffer hedges.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            MODELLED TRADE-OFFS
          </span>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">SCENARIO NAME</th>
                <th className="py-2.5 px-3">DURATION</th>
                <th className="py-2.5 px-3">SUPPLY GAP</th>
                <th className="py-2.5 px-3">COST IMPACT</th>
                <th className="py-2.5 px-3">RUNWAY</th>
                <th className="py-2.5 px-3">DELIVERY SLA</th>
                <th className="py-2.5 px-3">RISK</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {savedScenarios.map(sc => {
                const isCurrent =
                  params.duration === sc.params.duration &&
                  params.demand === sc.params.demand &&
                  params.energyPrice === sc.params.energyPrice &&
                  params.freight === sc.params.freight &&
                  params.inventory === sc.params.inventory &&
                  params.interventions.alternativeSupplier === sc.params.interventions.alternativeSupplier &&
                  params.interventions.alternativeRoute === sc.params.interventions.alternativeRoute;

                return (
                  <tr
                    key={sc.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isCurrent ? 'bg-cyan-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-semibold text-slate-200">
                      <div className="flex items-center gap-2">
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                        )}
                        <span>{sc.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5 line-clamp-1">
                        {sc.description}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {sc.params.duration}d
                    </td>
                    <td className="py-3 px-3">
                      <span className={sc.kpis.supplyAtRisk > 20 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                        {sc.kpis.supplyAtRisk}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-amber-300 font-bold">
                      +{sc.kpis.costImpact}%
                    </td>
                    <td className="py-3 px-3 text-emerald-400 font-semibold">
                      {sc.kpis.inventoryRunway} days
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      {sc.kpis.customerServiceLevel}%
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        sc.kpis.productionRisk === 'CRITICAL' ? 'text-rose-400 bg-rose-950/50 border-rose-800/60' :
                        sc.kpis.productionRisk === 'HIGH' ? 'text-amber-400 bg-amber-950/50 border-amber-800/60' :
                        'text-emerald-400 bg-emerald-950/50 border-emerald-800/60'
                      }`}>
                        {sc.kpis.productionRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isCurrent ? (
                        <span className="text-[11px] text-cyan-400 font-bold">
                          Active State
                        </span>
                      ) : (
                        <button
                          onClick={() => applySavedScenario(sc)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-600 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
                        >
                          Load Scenario
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Scenario Modal */}
      <SaveScenarioModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
      />
    </div>
  );
};
