import React, { useState } from 'react';
import {
  Cpu,
  Database,
  Layers,
  Sparkles,
  GitFork,
  CheckCircle,
  FileCheck2,
  Workflow,
  Radio,
  Server,
  Code,
  Shield,
  Zap,
} from 'lucide-react';

interface ArchComponent {
  id: string;
  name: string;
  tier: 'sources' | 'data' | 'engine' | 'apps' | 'human' | 'execution';
  description: string;
  specs: string[];
  latency: string;
}

export const ArchitectureScreen: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('engine-scenario');

  const components: ArchComponent[] = [
    // Tier 1: Sources
    { id: 'src-ais', name: 'AIS Live Vessel Telemetry', tier: 'sources', description: 'Satellite & terrestrial AIS vessel positions, drafts, speeds, and voyage destination declarations.', specs: ['Orbcomm & Spire API integration', 'Update cadence: 5 minutes', 'Vessel draft & deadweight tonnage tracking'], latency: '< 300ms' },
    { id: 'src-ports', name: 'Port & Anchorage Queues', tier: 'sources', description: 'Berth waiting times, single point mooring utilization, and demurrage rate feeds.', specs: ['Yanbu, Fujairah, Rotterdam, Singapore feeds', 'Congestion indexing algorithms'], latency: '< 15min' },
    { id: 'src-erp', name: 'SAP ERP & SCM Feedstocks', tier: 'sources', description: 'Internal production plant inventory levels, bill of materials, and open purchase orders.', specs: ['Real-time SAP S/4HANA OData connector', 'Chemical tank telemetry from SCADA/PI system'], latency: '< 60s' },
    { id: 'src-contracts', name: 'Supplier Take-or-Pay Contracts', tier: 'sources', description: 'Digitized commercial contracts with force majeure thresholds, nomination windows, and minimum off-take clauses.', specs: ['Contractual penalty models', 'Take-or-pay volume commitments'], latency: 'Static/Batch' },
    
    // Tier 2: Data Layer
    { id: 'data-norm', name: 'Multi-Modal Normalization Layer', tier: 'data', description: 'Unifies disparate geospatial shipping streams, ERP material balances, and commodity pricing into canonical supply-graph representations.', specs: ['Graph database (Neo4j / NetworkX representation)', 'Automated unit conversion (bpd, metric tons, m³)', 'Temporal trajectory reconciliation'], latency: '< 50ms' },
    
    // Tier 3: ORBIT Engine
    { id: 'engine-scenario', name: 'Monte Carlo Scenario Engine', tier: 'engine', description: 'Simulates forward disruption trajectories across 30 to 120-day horizons, testing inventory exhaustion and bottleneck migration.', specs: ['1,000 stochastic simulation runs/sec', 'Dynamic stock burn-rate curves', 'Intervention sensitivity matrix'], latency: '< 120ms' },
    { id: 'engine-risk', name: 'Multi-Commodity Risk Engine', tier: 'engine', description: 'Quantifies single-supplier dependency, geographic chokepoints, and liquidated damages across downstream customer agreements.', specs: ['Concentration Herfindahl Index', 'Value-at-Risk calculation ($M)', 'SLA penalty exposure models'], latency: '< 80ms' },
    { id: 'engine-opt', name: 'Network Flow Routing Optimizer', tier: 'engine', description: 'Linear programming solver optimizing freight costs, transit times, and pipeline capacities under physical constraints.', specs: ['Simplex & branch-and-bound solver', 'Pipeline capacity constraints (Petroline 5.0M bpd)', 'CO₂ emissions penalty functions'], latency: '< 250ms' },
    { id: 'engine-ai', name: 'Executive AI Decision Layer', tier: 'engine', description: 'Contextual synthesis generating structured executive briefs ("What Changed", "What Breaks First", "Options").', specs: ['Deterministic scenario grounding', 'Hallucination-free state citations', 'Actionable recommendation generation'], latency: '< 400ms' },

    // Tier 4: Application
    { id: 'app-command', name: 'Interactive Command Center', tier: 'apps', description: 'Executive operational cockpit with resilience pulse, KPI scorecards, and vulnerability indicators.', specs: ['Zero-latency responsive canvas', 'Real-time KPI recalculation'], latency: 'Instant' },
    { id: 'app-lab', name: 'Hero Scenario Lab', tier: 'apps', description: 'Scenario testing sandbox with multi-lever assumptions, intervention toggles, and scenario comparison matrices.', specs: ['Instant client-side reactive state', 'Persistent comparison sets'], latency: 'Instant' },

    // Tier 5: Human Decision
    { id: 'human-exco', name: 'Cross-Functional Operations ExCo', tier: 'human', description: 'Head of Operations, Chief Procurement Officer, and Supply Chain Director review options and approve capital commitments.', specs: ['Role-based governance sign-off', 'Immutable decision rationale audit trail'], latency: 'Human Cadence' },

    // Tier 6: Execution
    { id: 'exec-sap', name: 'Automated ERP & Logistics Execution', tier: 'execution', description: 'Translates logged decisions into ERP purchase orders, pipeline slot nominations, and charter party rerouting notices.', specs: ['SAP PO generation API', 'Carrier EDI 304 shipping instructions', 'Automated customer SLA notifications'], latency: '< 2s' },
  ];

  const selectedComp = components.find(c => c.id === selectedCompId) || components[4];

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              SYSTEM ARCHITECTURE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · HOW ORBIT WORKS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            How ORBIT Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            End-to-end data pipeline from physical maritime telemetry to human governance and ERP execution.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          Click any architecture component to inspect specifications
        </div>
      </div>

      {/* Main Interactive Diagram & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Architecture Flow Chart (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-6">
          
          {/* TIER 1: DATA SOURCES */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold uppercase">1. PHYSICAL & ENTERPRISE DATA SOURCES</span>
              <span>8 Real-time Telemetry Ingestion Feeds</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {components.filter(c => c.tier === 'sources').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCompId === comp.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono truncate">{comp.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{comp.latency}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex justify-center text-slate-600 font-mono text-sm">↓</div>

          {/* TIER 2: DATA LAYER */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold uppercase">2. NORMALIZATION & GRAPH TOPOLOGY LAYER</span>
              <span>Canonical Graph Schema</span>
            </div>
            {components.filter(c => c.tier === 'data').map(comp => (
              <button
                key={comp.id}
                onClick={() => setSelectedCompId(comp.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  selectedCompId === comp.id
                    ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold font-mono">{comp.name}</div>
                <div className="text-xs text-slate-400 mt-1">{comp.description}</div>
              </button>
            ))}
          </div>

          {/* Connector arrow */}
          <div className="flex justify-center text-slate-600 font-mono text-sm">↓</div>

          {/* TIER 3: ORBIT ENGINE */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold uppercase">3. ORBIT SIMULATION & SYNTHESIS ENGINE</span>
              <span>Core Computation Tier</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {components.filter(c => c.tier === 'engine').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCompId === comp.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono text-cyan-300">{comp.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{comp.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex justify-center text-slate-600 font-mono text-sm">↓</div>

          {/* TIER 4: APPLICATION */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-cyan-400 font-bold uppercase">4. INTERACTIVE APPLICATION INTERFACES</span>
              <span>Client-Side Workspace</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {components.filter(c => c.tier === 'apps').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCompId === comp.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{comp.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{comp.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Connector arrow */}
          <div className="flex justify-center text-slate-600 font-mono text-sm">↓</div>

          {/* TIER 5 & 6: HUMAN DECISION & EXECUTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                5. HUMAN-IN-THE-LOOP DECISION
              </div>
              {components.filter(c => c.tier === 'human').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCompId === comp.id
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{comp.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{comp.description}</div>
                </button>
              ))}
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-1">
                6. ENTERPRISE EXECUTION
              </div>
              {components.filter(c => c.tier === 'execution').map(comp => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedCompId === comp.id
                      ? 'bg-emerald-950/60 border-emerald-500 text-white ring-1 ring-emerald-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">{comp.name}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{comp.description}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Component Inspector Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 text-xs font-mono">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold block">
              COMPONENT SPECIFICATIONS
            </span>
            <h2 className="text-base font-bold text-white font-mono mt-0.5">
              {selectedComp.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400">
                Tier: {selectedComp.tier.toUpperCase()}
              </span>
              <span className="text-[10px] text-emerald-400">
                Latency: {selectedComp.latency}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              Operational Role:
            </span>
            <p className="text-xs text-slate-200 font-sans leading-relaxed">
              {selectedComp.description}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
              Technical Specifications:
            </span>
            <ul className="space-y-1.5 font-sans text-xs text-slate-300">
              {selectedComp.specs.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            <span className="text-cyan-400 font-bold block mb-1 font-mono">
              SYSTEM PHILOSOPHY:
            </span>
            <span>
              "Turn disruption into decisions." Models serve human executive judgment with auditable reasoning rather than black-box automation.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
