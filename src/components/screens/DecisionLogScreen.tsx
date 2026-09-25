import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Decision, DecisionStatus, DecisionCategory } from '../../types';
import {
  FileCheck2,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Trash2,
  Share2,
  Download,
  Building2,
  User,
  Tag,
  ArrowRight,
} from 'lucide-react';

export const DecisionLogScreen: React.FC = () => {
  const {
    decisions,
    timeline,
    updateDecisionStatus,
    deleteDecision,
    setIsDecisionModalOpen,
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredDecisions = decisions.filter(d => {
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || d.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const getStatusStyle = (status: DecisionStatus) => {
    switch (status) {
      case 'Approved':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60';
      case 'In progress':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60';
      case 'Proposed':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'Complete':
        return 'text-slate-300 bg-slate-800/60 border-slate-700/60';
    }
  };

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-semibold px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
              AUDITED GOVERNANCE
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · DECISION MANAGEMENT ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Decision Log
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Turn simulated insights into concrete, owner-assigned operational commitments.
          </p>
        </div>

        <button
          onClick={() => setIsDecisionModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>CREATE DECISION</span>
        </button>
      </div>

      {/* Two Column Layout: Simulation Timeline + Formal Decision Records */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: SIMULATION AUDIT TIMELINE (4 Cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Simulation Activity Timeline
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Live Session</span>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-800 before:z-0">
            {timeline.slice(0, 10).map((entry, idx) => (
              <div key={entry.id || idx} className="relative z-10 flex items-start gap-3 text-xs">
                <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-cyan-400 font-bold shrink-0">
                  {entry.time.slice(0, 2)}
                </div>

                <div className="flex-1 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-cyan-300 font-semibold uppercase">{entry.action}</span>
                    <span>{entry.time}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {entry.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: FORMAL DECISIONS TABLE & CARDS (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-bold text-white font-mono uppercase tracking-wider">
                Formal Enterprise Decisions ({filteredDecisions.length})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Executive commitments signed off or pending risk committee review.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Statuses</option>
                <option value="Proposed">Proposed</option>
                <option value="Approved">Approved</option>
                <option value="In progress">In progress</option>
                <option value="Complete">Complete</option>
              </select>

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Categories</option>
                <option value="Logistics">Logistics</option>
                <option value="Sourcing">Sourcing</option>
                <option value="Inventory">Inventory</option>
                <option value="Operations">Operations</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          {/* Decision Cards List */}
          <div className="space-y-4">
            {filteredDecisions.map(decision => (
              <div
                key={decision.id}
                className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                {/* Title & Status row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                        {decision.category}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {decision.scenarioName}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white font-mono">
                      {decision.title}
                    </h3>
                  </div>

                  {/* Status switcher */}
                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={decision.status}
                      onChange={e => updateDecisionStatus(decision.id, e.target.value as DecisionStatus)}
                      className={`text-xs font-mono font-bold px-2 py-1 rounded border cursor-pointer focus:outline-none ${getStatusStyle(
                        decision.status
                      )}`}
                    >
                      <option value="Proposed" className="bg-slate-900 text-amber-300">Proposed</option>
                      <option value="Approved" className="bg-slate-900 text-emerald-300">Approved</option>
                      <option value="In progress" className="bg-slate-900 text-cyan-300">In progress</option>
                      <option value="Complete" className="bg-slate-900 text-slate-300">Complete</option>
                    </select>

                    <button
                      onClick={() => deleteDecision(decision.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete decision"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Reason & Rationale */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {decision.reason}
                </p>

                {/* Operational Impact Pill */}
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Expected Impact: {decision.expectedImpact}</span>
                  </div>
                  <span className="text-amber-300 shrink-0">
                    {decision.costEstimate}
                  </span>
                </div>

                {/* Meta details footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80 gap-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <User className="w-3 h-3 text-cyan-400" />
                    <span>Owner: {decision.owner}</span>
                  </div>
                  <div className="text-slate-400">
                    Logged {decision.createdAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
