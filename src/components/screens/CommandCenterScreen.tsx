import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Clock,
  DollarSign,
  ArrowRight,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  Info,
} from 'lucide-react';

export const CommandCenterScreen: React.FC = () => {
  const {
    kpis,
    params,
    setActiveScreen,
    jumpToScenarioLabWithIntervention,
    setIsDecisionModalOpen,
  } = useApp();

  const [activeCorridorHover, setActiveCorridorHover] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              EXECUTIVE POSTURE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · MODELLED SCENARIO ({params.duration} DAYS)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Understand your exposure before making a move.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveScreen('scenario')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
          >
            <span>Tune in Scenario Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top metrics row - clearly labelled MODELLED SCENARIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Supply at risk */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>SUPPLY AT RISK</span>
            <span className="text-[10px] text-slate-400">MODELLED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
              {kpis.supplyAtRisk}%
            </span>
            <span className="text-xs text-rose-400 font-medium font-mono">
              of total volume
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Baseline: 18%</span>
            <span className={kpis.supplyAtRisk > 18 ? 'text-rose-400' : 'text-emerald-400'}>
              {kpis.supplyAtRisk > 18 ? `+${kpis.supplyAtRisk - 18}% delta` : `${kpis.supplyAtRisk - 18}% delta`}
            </span>
          </div>
        </div>

        {/* Metric 2: Inventory Runway */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>INVENTORY RUNWAY</span>
            <span className="text-[10px] text-slate-400">MODELLED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
              {kpis.inventoryRunway} <span className="text-base font-normal text-slate-400">days</span>
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Exhaustion: Day {kpis.exhaustionDay}</span>
            <span className={kpis.inventoryRunway <= 21 ? 'text-rose-400 font-medium' : 'text-emerald-400'}>
              {kpis.inventoryRunway <= 21 ? 'Critical gap' : 'Buffered'}
            </span>
          </div>
        </div>

        {/* Metric 3: Projected Cost Impact */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>PROJECTED COST IMPACT</span>
            <span className="text-[10px] text-slate-400">MODELLED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-amber-300 tracking-tight tabular-nums">
              +{kpis.costImpact}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              OPEX surge
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Freight + Fuel Index</span>
            <span className="text-amber-400 font-mono">{kpis.freightCostIndex} pts</span>
          </div>
        </div>

        {/* Metric 4: At-Risk Demand */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden group hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
            <span>AT-RISK DEMAND</span>
            <span className="text-[10px] text-slate-400">MODELLED</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white tracking-tight tabular-nums">
              ${kpis.atRiskDemand}M
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Q3 commitment
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
            <span>SLA fulfillment level</span>
            <span className={kpis.customerServiceLevel >= 90 ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>
              {kpis.customerServiceLevel}%
            </span>
          </div>
        </div>
      </div>

      {/* Central Visualization: "Resilience Pulse" */}
      <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                Network Visualization
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Resilience Pulse</span>
            </div>
            <h2 className="text-lg font-bold text-white font-mono mt-0.5">
              Corridor Flow & Chokepoint Rerouting
            </h2>
          </div>

          {/* Interactive Legend */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-0.5 bg-rose-500 inline-block" />
              <span>Hormuz (Blocked)</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
              <span>Petroline Bypass</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-0.5 bg-amber-400 inline-block stroke-dasharray" />
              <span>Cape Deepsea</span>
            </div>
          </div>
        </div>

        {/* Abstract Geographic Corridor SVG Visualization */}
        <div className="relative w-full h-72 sm:h-80 bg-slate-950/90 rounded-lg border border-slate-800/90 flex items-center justify-center p-2 overflow-hidden select-none">
          <svg
            viewBox="0 0 900 380"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background grid dots */}
            <pattern id="gridDots" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#1e293b" fillOpacity="0.4" />
            </pattern>
            <rect width="900" height="380" fill="url(#gridDots)" />

            {/* Region Label Backdrops */}
            {/* Europe */}
            <rect x="60" y="40" width="130" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="125" y="66" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">EUROPE</text>
            <text x="125" y="86" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Antwerp Plant 01</text>
            <circle cx="125" cy="98" r="4" fill="#38bdf8" />

            {/* Red Sea / Yanbu */}
            <rect x="250" y="170" width="130" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="315" y="196" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">RED SEA / YANBU</text>
            <text x="315" y="214" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="JetBrains Mono">Petroline Header</text>
            <circle cx="315" cy="226" r="4" fill="#38bdf8" />

            {/* The Gulf (Persian Gulf) */}
            <rect x="420" y="70" width="140" height="85" rx="8" fill="#1e1b2e" stroke="#3730a3" strokeWidth="1" />
            <text x="490" y="96" textAnchor="middle" fill="#c084fc" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">PERSIAN GULF</text>
            <text x="490" y="114" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontFamily="JetBrains Mono">Ras Laffan / Jubail</text>
            <text x="490" y="130" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">CHOKEPOINT INTERDICTED</text>

            {/* Strait of Hormuz Chokepoint symbol */}
            <g transform="translate(560, 160)">
              <circle cx="0" cy="0" r="16" fill="#4c0519" stroke="#e11d48" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="22" stroke="#e11d48" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" />
              <path d="M-6 -6L6 6M6 -6L-6 6" stroke="#fb7185" strokeWidth="2.2" strokeLinecap="round" />
              <text x="28" y="4" fill="#fb7185" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">STRAIT OF HORMUZ</text>
              <text x="28" y="16" fill="#fda4af" fontSize="8" fontFamily="JetBrains Mono">0% Throughput</text>
            </g>

            {/* Arabian Sea / Gulf of Oman */}
            <rect x="520" y="240" width="130" height="65" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="585" y="266" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">ARABIAN SEA</text>
            <text x="585" y="284" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Fujairah Offshore</text>
            <circle cx="585" cy="294" r="4" fill="#f59e0b" />

            {/* Indian Ocean */}
            <rect x="680" y="160" width="120" height="60" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="740" y="186" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">INDIAN OCEAN</text>
            <text x="740" y="204" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="JetBrains Mono">Deepsea Corridor</text>

            {/* Asia / Singapore */}
            <rect x="740" y="40" width="130" height="70" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x="805" y="66" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="JetBrains Mono" fontWeight="600">ASIA-PACIFIC</text>
            <text x="805" y="86" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="JetBrains Mono">Singapore Plant 02</text>
            <circle cx="805" cy="98" r="4" fill="#f43f5e" />

            {/* ROUTE 1: Interdicted Gulf Route (Red / Cross) */}
            <path
              d="M 490 145 Q 520 160 560 160"
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* ROUTE 2: East-West Petroline (Bypass to Yanbu) - Active Cyan */}
            <path
              d="M 430 135 Q 370 170 315 220"
              stroke="#06b6d4"
              strokeWidth="3"
              className="animate-dash-flow"
            />
            <path
              d="M 315 220 Q 230 180 140 105"
              stroke="#06b6d4"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />

            {/* ROUTE 3: Yanbu / Arabian Sea to Asia */}
            <path
              d="M 315 230 Q 520 320 740 215 Q 770 160 805 105"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeOpacity="0.8"
            />

            {/* ROUTE 4: Cape of Good Hope Southern Arc (Dashed Amber Reroute) */}
            <path
              d="M 125 110 Q 80 340 400 350 Q 720 350 805 110"
              stroke="#f59e0b"
              strokeWidth="2.2"
              strokeDasharray="6 6"
              strokeOpacity="0.85"
            />
            <text x="440" y="365" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="JetBrains Mono">
              CAPE OF GOOD HOPE DEEPSEA BYPASS (+14 DAYS)
            </text>

            {/* Pipeline Bypass label */}
            <rect x="290" y="140" width="135" height="20" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="0.8" />
            <text x="357" y="154" textAnchor="middle" fill="#67e8f9" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">
              EAST-WEST PETROLINE
            </text>

            {/* Feedstock flow markers */}
            <circle cx="210" cy="155" r="3.5" fill="#22d3ee" className="animate-ping" />
            <circle cx="580" cy="348" r="3.5" fill="#f59e0b" className="animate-ping" />
          </svg>
        </div>

        {/* Dynamic breakdown callout below map */}
        <div className="mt-4 p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Active Reroute: 15,000 bpd shifted to Yanbu Red Sea Terminal. Cape transit delta: +14 days.</span>
          </div>
          <button
            onClick={() => setActiveScreen('routes')}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>Inspect All Corridors</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Two-column layout: "WHAT BREAKS FIRST?" and "NEXT DECISIONS" */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Section: WHAT BREAKS FIRST? */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-semibold">
                SYSTEM VULNERABILITY AUDIT
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-0.5">
                What Breaks First?
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
              Ranked by Urgency
            </span>
          </div>

          <div className="space-y-3">
            {/* Card 1: Supplier Concentration */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Supplier Concentration
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                  HIGH RISK
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                38% of specialized feedstock sourced via single terminal in Qatar. No immediate maritime egress under Hormuz interdiction.
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                <span>Affected: Plant 01 & Plant 02</span>
                <button
                  onClick={() => jumpToScenarioLabWithIntervention('alternativeSupplier')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Test Alternative Supplier →
                </button>
              </div>
            </div>

            {/* Card 2: Inventory Exposure */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Inventory Exposure (Singapore Plant 02)
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                  kpis.inventoryRunway <= 21
                    ? 'text-rose-400 bg-rose-950/60 border-rose-800/60'
                    : 'text-amber-400 bg-amber-950/60 border-amber-800/60'
                }`}>
                  {kpis.inventoryRunway <= 21 ? 'CRITICAL (DAY ' + kpis.exhaustionDay + ')' : 'MEDIUM'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialty catalyst and condensate reserves depleted by Day {kpis.exhaustionDay}. Rerouted shipments require 34 days via Cape of Good Hope.
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                <span>Runway: {kpis.inventoryRunway} operating days</span>
                <button
                  onClick={() => jumpToScenarioLabWithIntervention('inventoryBuffer')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Inject Strategic Buffer →
                </button>
              </div>
            </div>

            {/* Card 3: Route Capacity */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Route Capacity & Bottlenecks
                </span>
                <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                  HIGH RISK
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                East-West Petroline pipeline nominates 94% of operational capacity. Berth waiting times at Yanbu port have expanded from 18 to 72 hours.
              </p>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                <span>Yanbu Utilization: 94%</span>
                <button
                  onClick={() => jumpToScenarioLabWithIntervention('alternativeRoute')}
                  className="text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Reroute Corridors →
                </button>
              </div>
            </div>

            {/* Card 4: Contract Flexibility */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">
                  Contract Flexibility
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  LOW FLEXIBILITY
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Long-term take-or-pay clauses limit immediate cancellation without invoking maritime force majeure declarations.
              </p>
            </div>
          </div>
        </div>

        {/* Section: NEXT DECISIONS */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold">
                RECOMMENDED OPERATIONAL ACTIONS
              </span>
              <h3 className="text-base font-bold text-white font-mono mt-0.5">
                Next Decisions
              </h3>
            </div>
            <button
              onClick={() => setIsDecisionModalOpen(true)}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
            >
              + Custom Decision
            </button>
          </div>

          <div className="space-y-3">
            {/* Decision Option 1 */}
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Reserve Alternate Route Capacity
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Book forward nomination slots on East-West Petroline pipeline to Yanbu before commercial off-takers exhaust berth access.
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">IMPACT</span>
                  <span className="text-emerald-400 font-semibold">+18% flow recovery</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">COST</span>
                  <span className="text-slate-200 font-semibold">$4.2M commitment</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                  <span className="text-cyan-400 font-semibold">88%</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsDecisionModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Create Decision
                </button>
              </div>
            </div>

            {/* Decision Option 2 */}
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Increase Strategic Inventory Buffer
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Lease secondary bonded storage in Jurong (Singapore) and inject 15 days of critical solvent reserves.
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">IMPACT</span>
                  <span className="text-emerald-400 font-semibold">+15 days runway</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">COST</span>
                  <span className="text-slate-200 font-semibold">$2.8M carrying cost</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                  <span className="text-cyan-400 font-semibold">92%</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsDecisionModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Create Decision
                </button>
              </div>
            </div>

            {/* Decision Option 3 */}
            <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Secure Additional Supplier Allocation
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Execute standby supply contracts with Bonny Island (Nigeria) and Corpus Christi (US Gulf).
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">IMPACT</span>
                  <span className="text-emerald-400 font-semibold">14,000 bpd replaced</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">COST</span>
                  <span className="text-slate-200 font-semibold">$6.5M term delta</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">CONFIDENCE</span>
                  <span className="text-cyan-400 font-semibold">81%</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2">
                <button
                  onClick={() => setIsDecisionModalOpen(true)}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Create Decision
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
