import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_ROUTE_CORRIDORS } from '../../data/initialData';
import { RouteCorridor } from '../../types';
import {
  Compass,
  Clock,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Leaf,
  Layers,
  Fuel,
  Ship,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const RouteIntelligenceScreen: React.FC = () => {
  const {
    params,
    kpis,
    selectedRouteId,
    setSelectedRouteId,
    jumpToScenarioLabWithIntervention,
  } = useApp();

  const corridors = INITIAL_ROUTE_CORRIDORS;
  const activeRoute = corridors.find(c => c.id === selectedRouteId) || corridors[1];

  const getRiskBadge = (risk: RouteCorridor['riskLevel']) => {
    switch (risk) {
      case 'BLOCKED':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'HIGH':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'LOW':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  return (
    <div className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              MARITIME & PIPELINE LOGISTICS
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · ALTERNATIVE CORRIDORS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Route Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Evaluate alternative transportation corridors under varying freight rates and fuel price regimes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            Active Fuel: ${params.energyPrice}/bbl · Freight: {params.freight}
          </span>
        </div>
      </div>

      {/* Tradeoff comparison header cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Fastest */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider block">
              SPEED CHAMPION
            </span>
            <h3 className="text-sm font-bold text-white font-mono mt-1">
              East-West Petroline (Yanbu)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              16 days (+4d delta) to European & Asian terminals.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/60 shrink-0">
            Fastest
          </span>
        </div>

        {/* Lowest Cost */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider block">
              COST CHAMPION
            </span>
            <h3 className="text-sm font-bold text-white font-mono mt-1">
              Habshan-Fujairah Pipeline
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              +12.4% cost delta; bypasses Hormuz into Gulf of Oman.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/60 shrink-0">
            Lowest Cost
          </span>
        </div>

        {/* Highest Resilience */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-wider block">
              RESILIENCE CHAMPION
            </span>
            <h3 className="text-sm font-bold text-white font-mono mt-1">
              Cape of Good Hope Deepsea
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Zero Middle East chokepoint exposure. Unlimited high seas draft.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/60 shrink-0">
            High Resilience
          </span>
        </div>
      </div>

      {/* Main Grid: Corridor Cards & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Corridors List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>AVAILABLE CORRIDORS ({corridors.length})</span>
            <span>Click to inspect tradeoffs</span>
          </div>

          <div className="space-y-3">
            {corridors.map(corridor => {
              const isSelected = activeRoute.id === corridor.id;
              const isBlocked = corridor.currentStatus === 'BLOCKED';

              return (
                <div
                  key={corridor.id}
                  onClick={() => setSelectedRouteId(corridor.id)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                      : isBlocked
                      ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-700/60'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {corridor.code}
                      </span>
                      <span className="text-slate-600">·</span>
                      <h3 className="text-sm font-bold text-white font-mono">
                        {corridor.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                        {corridor.badgeLabel}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getRiskBadge(corridor.riskLevel)}`}>
                        {corridor.riskLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">
                    {corridor.description}
                  </p>

                  {/* 4 Tradeoff Pillars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block">TRANSIT TIME</span>
                      <span className="text-slate-200 font-bold tabular-nums">
                        {corridor.transitTimeDays} days ({corridor.transitDeltaDays >= 0 ? `+${corridor.transitDeltaDays}d` : `${corridor.transitDeltaDays}d`})
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">COST IMPACT</span>
                      <span className="text-amber-300 font-bold tabular-nums">
                        +{corridor.relativeCostDeltaPct}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">RELIABILITY</span>
                      <span className="text-emerald-400 font-bold tabular-nums">
                        {corridor.reliabilityPct}%
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 block">CO₂ DELTA</span>
                      <span className="text-slate-400 font-medium tabular-nums">
                        +{corridor.co2ImpactPct}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Route Evaluation & Simulator (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold block">
                CORRIDOR AUDIT
              </span>
              <h2 className="text-base font-bold text-white font-mono mt-0.5">
                {activeRoute.name}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              STATUS: {activeRoute.currentStatus}
            </span>
          </div>

          {/* Tradeoff Visual Bars */}
          <div className="space-y-3 font-mono">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">SPEED RATING (INVERSE TRANSIT)</span>
                <span className="text-white font-bold">{Math.round(100 - activeRoute.transitDeltaDays * 5)}/100</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${Math.max(10, Math.min(100, 100 - activeRoute.transitDeltaDays * 5))}%` }}
                  className="h-full bg-cyan-500 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">COST EFFICIENCY</span>
                <span className="text-amber-300 font-bold">{Math.round(100 - activeRoute.relativeCostDeltaPct * 2)}/100</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${Math.max(10, Math.min(100, 100 - activeRoute.relativeCostDeltaPct * 2))}%` }}
                  className="h-full bg-amber-400 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">OPERATIONAL RELIABILITY</span>
                <span className="text-emerald-400 font-bold">{activeRoute.reliabilityPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${activeRoute.reliabilityPct}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">EMISSIONS IMPACT (CO₂)</span>
                <span className="text-slate-300 font-bold">+{activeRoute.co2ImpactPct}% vs baseline</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${Math.min(100, activeRoute.co2ImpactPct * 2.2)}%` }}
                  className="h-full bg-slate-600 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Operational specs */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5 font-sans">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Daily Throughput Capacity:
              </span>
              <span className="text-xs font-semibold text-slate-200">
                {activeRoute.dailyCapacity}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Chokepoints & Marine Vulnerabilities:
              </span>
              <div className="flex flex-wrap gap-1 mt-1 font-mono text-[11px]">
                {activeRoute.chokePoints.map((cp, idx) => (
                  <span key={idx} className="bg-slate-900 text-rose-300 px-2 py-0.5 rounded border border-rose-900/60">
                    {cp}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Active Vessel Carriers:
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeRoute.primaryCarriers.join(', ')}
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              onClick={() => jumpToScenarioLabWithIntervention('alternativeRoute')}
              className="w-full py-3 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>APPLY THIS ROUTE HEDGE IN SCENARIO LAB</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-[10px] text-slate-400 text-center block mt-1.5 font-mono">
              Recalculates supply gap & voyage charter surcharges
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
