import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_NETWORK_NODES } from '../../data/initialData';
import { NetworkNode } from '../../types';
import {
  Network,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  FlaskConical,
  X,
  ExternalLink,
  Building,
  Anchor,
  Factory,
  Users,
  Compass,
} from 'lucide-react';

export const SupplyNetworkScreen: React.FC = () => {
  const {
    selectedNodeId,
    setSelectedNodeId,
    jumpToScenarioLabWithIntervention,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const nodes = INITIAL_NETWORK_NODES;

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const filteredNodes = filterType === 'all'
    ? nodes
    : nodes.filter(n => n.type === filterType);

  const getNodeIcon = (type: NetworkNode['type']) => {
    switch (type) {
      case 'supplier': return Building;
      case 'port': return Anchor;
      case 'route': return Compass;
      case 'factory': return Factory;
      case 'customer': return Users;
    }
  };

  const getStateBadgeStyle = (state: NetworkNode['state']) => {
    switch (state) {
      case 'BLOCKED':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      case 'AT RISK':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'ALTERNATIVE':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
      case 'HEALTHY':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
    }
  };

  const handleTestAlternative = () => {
    if (selectedNode.type === 'supplier') {
      jumpToScenarioLabWithIntervention('alternativeSupplier');
    } else if (selectedNode.type === 'route' || selectedNode.type === 'port') {
      jumpToScenarioLabWithIntervention('alternativeRoute');
    } else {
      jumpToScenarioLabWithIntervention('productionShift');
    }
  };

  return (
    <div className="space-y-6 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              GRAPH TOPOLOGY
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · MULTI-TIER DEPENDENCIES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Supply Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Interactive topology mapping choke points, transshipment hubs, and manufacturing facilities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
          {['all', 'supplier', 'port', 'factory', 'customer'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1.5 rounded uppercase transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-cyan-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Network Graph + Right Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive SVG Network Graph (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Click any node to inspect operational vulnerability & test alternatives</span>
            </div>
            <span className="text-[11px] text-slate-400">Modelled Tier 1 & 2 Graph</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-[460px] bg-slate-950 rounded-lg border border-slate-800/80 relative overflow-hidden flex items-center justify-center p-2">
            <svg
              viewBox="0 0 880 440"
              className="w-full h-full select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Background */}
              <pattern id="netGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#1e293b" fillOpacity="0.4" />
              </pattern>
              <rect width="880" height="440" fill="url(#netGrid)" />

              {/* Tier Column Headers */}
              <text x="120" y="30" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">TIER 1 SUPPLIERS</text>
              <text x="320" y="30" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">PORTS & CHOKEPOINTS</text>
              <text x="530" y="30" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">MANUFACTURING PLANTS</text>
              <text x="750" y="30" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">KEY CUSTOMER SECTORS</text>

              {/* Edge Connections */}
              {/* Ras Laffan -> Hormuz (Blocked Edge) */}
              <path d="M 180 110 L 320 150" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
              
              {/* Jubail -> Yanbu (Petroline) */}
              <path d="M 140 190 L 270 280" stroke="#06b6d4" strokeWidth="2.2" className="animate-dash-flow" />

              {/* Jubail -> Hormuz */}
              <path d="M 140 190 L 320 150" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Bonny Island (Alt) -> Antwerp */}
              <path d="M 90 330 Q 300 370 520 110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />

              {/* Corpus Christi (Alt) -> Antwerp & Houston */}
              <path d="M 70 240 Q 300 210 520 110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
              <path d="M 70 240 L 500 350" stroke="#10b981" strokeWidth="2.5" />

              {/* Hormuz -> Antwerp & Singapore (Blocked paths) */}
              <path d="M 320 150 L 520 110" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.4" />
              <path d="M 320 150 L 540 250" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" strokeOpacity="0.5" />

              {/* Yanbu -> Antwerp */}
              <path d="M 270 280 Q 390 190 520 110" stroke="#06b6d4" strokeWidth="2" />

              {/* Fujairah -> Singapore */}
              <path d="M 340 230 L 540 250" stroke="#f59e0b" strokeWidth="2" />

              {/* Plants -> Customers */}
              <path d="M 520 110 L 740 110" stroke="#38bdf8" strokeWidth="2.5" />
              <path d="M 540 250 L 760 250" stroke="#f43f5e" strokeWidth="2.5" />
              <path d="M 500 350 Q 640 330 740 110" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 4" />

              {/* Interactive Nodes Rendering */}
              {nodes.map(node => {
                const isSelected = selectedNode.id === node.id;
                const nodeColors = {
                  BLOCKED: { bg: '#4c0519', border: '#e11d48', text: '#fda4af' },
                  'AT RISK': { bg: '#451a03', border: '#f59e0b', text: '#fde68a' },
                  ALTERNATIVE: { bg: '#083344', border: '#06b6d4', text: '#a5f3fc' },
                  HEALTHY: { bg: '#064e3b', border: '#10b981', text: '#a7f3d0' },
                }[node.state];

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNodeId(node.id)}
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <circle
                        cx="0"
                        cy="0"
                        r="24"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="animate-spin"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "18" : "15"}
                      fill={nodeColors.bg}
                      stroke={nodeColors.border}
                      strokeWidth={isSelected ? "3" : "2"}
                      className="transition-all duration-200 group-hover:scale-110"
                    />

                    {/* Node status dot */}
                    <circle
                      cx="8"
                      cy="-8"
                      r="4"
                      fill={nodeColors.border}
                    />

                    {/* Node Label */}
                    <text
                      x="0"
                      y="30"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {node.name.length > 20 ? node.name.slice(0, 18) + '...' : node.name}
                    </text>

                    <text
                      x="0"
                      y="42"
                      textAnchor="middle"
                      fill={nodeColors.text}
                      fontSize="8"
                      fontFamily="JetBrains Mono"
                      fontWeight="bold"
                    >
                      {node.state}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node count overview pill bar */}
          <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>2 Blocked</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>5 At Risk</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>2 Alternative</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>3 Healthy</span>
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Total: 12 Nodes mapped</span>
          </div>
        </div>

        {/* RIGHT INSPECTOR PANEL (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold block">
                NODE INSPECTOR
              </span>
              <h2 className="text-base font-bold text-white font-mono mt-0.5 truncate">
                {selectedNode.name}
              </h2>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStateBadgeStyle(selectedNode.state)}`}>
              {selectedNode.state}
            </span>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">ALLOCATION</span>
              <span className="text-lg font-bold text-white tabular-nums">
                {selectedNode.allocationPct}%
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">REPLACEMENT CAP</span>
              <span className="text-lg font-bold text-cyan-400 tabular-nums">
                {selectedNode.replacementCapacityPct}%
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">CONTRACT FLEX</span>
              <span className="text-sm font-bold text-slate-200">
                {selectedNode.contractFlexibility}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">ALT AVAILABLE</span>
              <span className={`text-sm font-bold ${selectedNode.alternativeAvailable ? 'text-emerald-400' : 'text-rose-400'}`}>
                {selectedNode.alternativeAvailable ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          {/* Detailed attributes */}
          <div className="space-y-3 font-sans">
            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Primary Risk Description:
              </span>
              <p className="text-xs text-rose-300 bg-rose-950/40 p-2.5 rounded border border-rose-900/50 mt-1 leading-relaxed">
                {selectedNode.primaryRisk}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Critical Feedstock / Commodity:
              </span>
              <p className="text-xs text-slate-200 mt-0.5">
                {selectedNode.details.criticalFeedstock}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Dependent Facilities:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedNode.details.dependentFacilities.map((f, i) => (
                  <span key={i} className="text-[11px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block">
                Transit Corridor / Impact:
              </span>
              <p className="text-xs text-amber-300 mt-0.5">
                {selectedNode.details.transitCorridor} ({selectedNode.details.leadTimeDelta})
              </p>
            </div>
          </div>

          {/* Connected Action Button: TEST ALTERNATIVE */}
          {selectedNode.alternativeAvailable && (
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={handleTestAlternative}
                className="w-full py-3 px-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>TEST ALTERNATIVE IN SCENARIO LAB</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-400 text-center block mt-1.5 font-mono">
                Applies {selectedNode.alternativeName || 'alternate sourcing'} to active model
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
