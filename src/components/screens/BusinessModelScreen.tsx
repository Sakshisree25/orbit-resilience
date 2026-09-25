import React, { useState } from 'react';
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  Building2,
  Users,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';

export const BusinessModelScreen: React.FC = () => {
  const [annualRevenueBillion, setAnnualRevenueBillion] = useState<number>(3.5);
  const [gulfExposurePct, setGulfExposurePct] = useState<number>(25);

  // ROI Calculator
  const estimatedAnnualFeedstock = annualRevenueBillion * 1000 * 0.45; // $M feedstock cost
  const atRiskCapital = (estimatedAnnualFeedstock * (gulfExposurePct / 100)).toFixed(0);
  const dailyShutdownLoss = (annualRevenueBillion * 1000 / 365 * 0.65).toFixed(1);
  const estimatedSavings = (Number(dailyShutdownLoss) * 14 * 0.85).toFixed(1); // 14 days of downtime prevented

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              STRATEGIC WORKSPACE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · ENTERPRISE VALUE ARCHITECTURE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Business Model
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Commercial packaging, enterprise revenue drivers, and quantifiable ROI for energy-intensive industrials.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          Internal Strategy & Unit Economics
        </div>
      </div>

      {/* CORE VALUE CHAIN: DATA -> INSIGHT -> DECISION -> ACTION -> MEASURABLE OUTCOME */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
            The ORBIT Core Value Chain
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Mechanism to Measurable Outcome
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-cyan-400 font-bold block mb-1">01. DATA</span>
            <div className="text-sm font-bold text-white mb-1">Unified Ingestion</div>
            <p className="text-[11px] text-slate-400 font-sans">
              AIS telemetry, port queues, ERP inventory & contracts.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-amber-400 font-bold block mb-1">02. INSIGHT</span>
            <div className="text-sm font-bold text-white mb-1">Exposure Audits</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Runway exhaustion day and vulnerability rankings.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-purple-400 font-bold block mb-1">03. DECISION</span>
            <div className="text-sm font-bold text-white mb-1">Scenario Lab</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Simulated interventions, trade-off comparisons.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-blue-400 font-bold block mb-1">04. ACTION</span>
            <div className="text-sm font-bold text-white mb-1">Audited Commitments</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Pipeline reservations, strategic stock injection.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-950 border border-emerald-800/60 bg-emerald-950/20">
            <span className="text-[10px] text-emerald-400 font-bold block mb-1">05. OUTCOME</span>
            <div className="text-sm font-bold text-emerald-300 mb-1">$42M+ Saved</div>
            <p className="text-[11px] text-slate-300 font-sans">
              Zero unplanned plant shutdowns and protected customer SLAs.
            </p>
          </div>
        </div>
      </div>

      {/* Target Customers & Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Target Customers */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Target Enterprise Customers
            </h2>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Petrochemical & Specialty Resins</span>
                <span className="font-mono text-[10px] text-cyan-400">$2B - $30B Revenue</span>
              </div>
              <p className="text-slate-400">
                Continuous-process steam crackers and polymer plants where 24 hours of feedstock starvation costs $1.5M - $6M in flaring and thermal restart damage.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Electric Utilities & LNG Off-Takers</span>
                <span className="font-mono text-[10px] text-cyan-400">National Grid Operators</span>
              </div>
              <p className="text-slate-400">
                Heavy reliance on Qatari LNG carriers; requires dynamic rerouting to Atlantic/US Gulf liquefaction terminals.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Energy-Intensive Metals (Aluminum & Steel)</span>
                <span className="font-mono text-[10px] text-cyan-400">Smelters & Foundries</span>
              </div>
              <p className="text-slate-400">
                Smelters that solidify and suffer catastrophic potline loss if fuel gas or coking inputs drop below minimum heat thresholds.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Commodity Trading & Chartering Desks</span>
                <span className="font-mono text-[10px] text-cyan-400">Trading Houses</span>
              </div>
              <p className="text-slate-400">
                Arbitrage desks exploiting regional price spreads between Brent, WTI, and Murban when chokepoints close.
              </p>
            </div>
          </div>
        </div>

        {/* Revenue Architecture */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Revenue Model & Tiers
            </h2>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Enterprise SaaS Platform Core</span>
                <span className="font-mono text-emerald-400 font-bold">$180,000 / year</span>
              </div>
              <p className="text-slate-400">
                Unlimited scenario runs, real-time chokepoint monitor, standard AIS telemetry, and decision governance log for up to 10 facilities.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Dedicated Monte Carlo Compute & Custom Solvers</span>
                <span className="font-mono text-emerald-400 font-bold">$60,000 / year</span>
              </div>
              <p className="text-slate-400">
                GPU-accelerated network flow optimization with bespoke refinery blending equations and proprietary tariff constraints.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Premium ERP & SCADA Connectors</span>
                <span className="font-mono text-emerald-400 font-bold">$45,000 / connector</span>
              </div>
              <p className="text-slate-400">
                Bidirectional SAP S/4HANA PO injection, OSIsoft PI real-time tank level telemetry, and automated carrier dispatch.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">Advisory & Board Simulation Sprints</span>
                <span className="font-mono text-emerald-400 font-bold">$50,000 / sprint</span>
              </div>
              <p className="text-slate-400">
                Facilitated war-room stress testing with executive committee and supply chain directors.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* INTERACTIVE ROI CALCULATOR */}
      <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Interactive Enterprise ROI Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Estimate annual downside mitigation value based on company revenue and Persian Gulf dependency.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            Value Demonstration
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Sliders */}
          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Enterprise Annual Revenue:</span>
                <span className="text-cyan-400 font-bold">${annualRevenueBillion} Billion</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="10.0"
                step="0.5"
                value={annualRevenueBillion}
                onChange={e => setAnnualRevenueBillion(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Persian Gulf Sourcing Exposure:</span>
                <span className="text-amber-400 font-bold">{gulfExposurePct}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={gulfExposurePct}
                onChange={e => setGulfExposurePct(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              Assumption: Proactive corridor reservation prevents 14 days of cracker flaring / thermal idling.
            </div>
          </div>

          {/* Results Card */}
          <div className="p-5 rounded-xl bg-slate-950 border border-emerald-900/50 bg-emerald-950/10 space-y-3 font-mono">
            <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">
              ESTIMATED OPERATIONAL PROTECTION
            </span>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block">EXPOSED CAPITAL</span>
                <span className="text-xl font-bold text-white">${atRiskCapital}M</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">DAILY SHUTDOWN LOSS</span>
                <span className="text-xl font-bold text-rose-400">${dailyShutdownLoss}M/day</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] text-slate-400 block">ESTIMATED DOWNTIME VALUE SAVED</span>
              <span className="text-3xl font-extrabold text-emerald-400 tabular-nums">
                ${estimatedSavings}M
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">
                Software ROI: &gt; 120x annual ORBIT enterprise contract
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
