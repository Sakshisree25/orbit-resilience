import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_RISK_ITEMS } from '../../data/initialData';
import { RiskItem } from '../../types';
import {
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Minus,
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckCircle,
  FileCheck2,
} from 'lucide-react';

export const RiskMonitorScreen: React.FC = () => {
  const {
    kpis,
    params,
    jumpToScenarioLabWithIntervention,
    setIsDecisionModalOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const risks = INITIAL_RISK_ITEMS;

  const categories = ['All', 'Supply', 'Inventory', 'Logistics', 'Financial', 'Customer', 'Geopolitical'];

  const filteredRisks = activeCategory === 'All'
    ? risks
    : risks.filter(r => r.category === activeCategory);

  const getRiskLevelBadge = (level: RiskItem['riskLevel']) => {
    switch (level) {
      case 'CRITICAL':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'HIGH':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'MEDIUM':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'LOW':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  const getTrendIcon = (trend: RiskItem['trend']) => {
    switch (trend) {
      case 'deteriorating':
        return (
          <div className="flex items-center gap-1 text-rose-400 text-[11px] font-mono">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Deteriorating</span>
          </div>
        );
      case 'stable':
        return (
          <div className="flex items-center gap-1 text-amber-400 text-[11px] font-mono">
            <Minus className="w-3.5 h-3.5" />
            <span>Stable</span>
          </div>
        );
      case 'improving':
        return (
          <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Improving</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-semibold px-1.5 py-0.5 rounded bg-rose-950/60 border border-rose-800/60">
              OPERATIONAL RISK RADAR
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · ACTIVE EXPOSURE HEATMAP
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Risk Monitor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Identify operational single points of failure across suppliers, inventory, transit, and customer contracts.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate Risk Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
            AGGREGATE THREAT INDEX
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-400">
              {kpis.productionRisk}
            </span>
            <span className="text-xs text-slate-400">
              ({kpis.supplyAtRisk}% gap)
            </span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Monte Carlo confidence: 84%
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
            MOST CRITICAL BOTTLENECK
          </span>
          <div className="text-sm font-bold text-white truncate">
            Plant 02 Feedstock Run-Dry
          </div>
          <div className="mt-2 text-[10px] text-rose-400">
            Exhaustion on Day {kpis.exhaustionDay}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
            ESTIMATED VALUE AT RISK
          </span>
          <div className="text-2xl font-bold text-amber-300">
            ${kpis.atRiskDemand}M
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            High-margin semiconductor resin SLAs
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
            ACTIONABLE MITIGATIONS
          </span>
          <div className="text-2xl font-bold text-emerald-400">
            3 Ready
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Alt Supplier, Petroline, Buffer
          </div>
        </div>
      </div>

      {/* Risk Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRisks.map(risk => (
          <div
            key={risk.id}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card top */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {risk.category} RISK
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {risk.affectedArea}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-mono mt-0.5">
                    {risk.title}
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getRiskLevelBadge(risk.riskLevel)}`}>
                    {risk.riskLevel}
                  </span>
                  {getTrendIcon(risk.trend)}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                {risk.description}
              </p>

              {/* Impact & Confidence */}
              <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-400 block">IMPACT AREA</span>
                  <span className="text-slate-200 font-semibold truncate block">
                    {risk.impactArea}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">CONFIDENCE SCORE</span>
                  <span className="text-cyan-400 font-semibold">
                    {risk.confidencePct}% verified
                  </span>
                </div>
              </div>

              {/* Suggested Mitigation */}
              <div className="mt-3 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                  SUGGESTED MITIGATION:
                </span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {risk.suggestedMitigation}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <button
                onClick={() => setIsDecisionModalOpen(true)}
                className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Log Decision</span>
              </button>

              {risk.interventionTrigger && (
                <button
                  onClick={() => jumpToScenarioLabWithIntervention(risk.interventionTrigger!)}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Test in Scenario Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
