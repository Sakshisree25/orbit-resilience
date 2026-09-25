import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DecisionCategory, DecisionStatus } from '../../types';
import { X, CheckCircle, ShieldAlert, Sparkles, Building2 } from 'lucide-react';

export const DecisionModal: React.FC = () => {
  const {
    isDecisionModalOpen,
    setIsDecisionModalOpen,
    createDecision,
    activeScenarioName,
    kpis,
    params,
  } = useApp();

  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState<DecisionCategory>('Logistics');
  const [expectedImpact, setExpectedImpact] = useState('');
  const [owner, setOwner] = useState('Elena Vance (Head of Global Operations)');
  const [costEstimate, setCostEstimate] = useState('$3.5M allocation');
  const [status, setStatus] = useState<DecisionStatus>('Proposed');

  if (!isDecisionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createDecision({
      title: title.trim(),
      reason: reason.trim() || `Mitigation decision triggered during ${activeScenarioName} assessment.`,
      scenarioName: activeScenarioName,
      expectedImpact: expectedImpact.trim() || `Safeguards production continuity and recovers up to 8% supply deficit.`,
      owner,
      status,
      category,
      costEstimate: costEstimate.trim() || 'To be reconciled in operational OPEX',
    });

    // Reset and close
    setTitle('');
    setReason('');
    setExpectedImpact('');
    setIsDecisionModalOpen(false);
  };

  const autofillTemplate = (type: 'route' | 'supplier' | 'inventory') => {
    if (type === 'route') {
      setTitle('Reserve 20,000 bpd Capacity on East-West Petroline');
      setReason(`Hormuz closure interdicts marine tankers. East-West pipeline bypass to Yanbu Red Sea reduces transit disruption.`);
      setCategory('Logistics');
      setExpectedImpact(`Mitigates European cracker feed gap; holds transit delta to +4 days instead of indefinite delay.`);
      setCostEstimate('$4.8M monthly nomination fee');
      setStatus('Approved');
    } else if (type === 'supplier') {
      setTitle('Activate Sweet Distillate Supply Option with Bonny Island');
      setReason(`Ras Laffan supply interdicted. Bonny Island (Nigeria) provides unencumbered Atlantic shipping corridor.`);
      setCategory('Sourcing');
      setExpectedImpact(`Secures 14,000 bpd substitute feedstock for Plant 01 Antwerp with 0% Persian Gulf exposure.`);
      setCostEstimate('$7.2M purchase agreement');
      setStatus('Proposed');
    } else if (type === 'inventory') {
      setTitle('Mandate +15-Day Strategic Inventory Buffer in Jurong Bonded Tanks');
      setReason(`Plant 02 (Singapore) reaches zero inventory at Day 24 under baseline 60-day disruption.`);
      setCategory('Inventory');
      setExpectedImpact(`Pushes exhaustion date from Day 24 to Day 39, protecting $82.4M semiconductor customer contracts.`);
      setCostEstimate('$3.2M carrying & tank leasing cost');
      setStatus('In progress');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
              ORBIT Decision Governance
            </div>
            <h2 className="text-lg font-bold text-white font-mono">
              Log Operational Decision
            </h2>
          </div>
          <button
            onClick={() => setIsDecisionModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick autofill helper chips */}
        <div className="px-6 py-2.5 bg-slate-950/50 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-mono text-[11px] shrink-0">
            Quick templates:
          </span>
          <button
            type="button"
            onClick={() => autofillTemplate('route')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs shrink-0 transition-colors"
          >
            + Petroline Reroute
          </button>
          <button
            type="button"
            onClick={() => autofillTemplate('supplier')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs shrink-0 transition-colors"
          >
            + Atlantic Supplier
          </button>
          <button
            type="button"
            onClick={() => autofillTemplate('inventory')}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs shrink-0 transition-colors"
          >
            + Strategic Buffer
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Active Context Preview */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-slate-400 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 block">TIED TO ACTIVE SCENARIO</span>
              <span className="text-amber-300 text-xs font-semibold">{activeScenarioName}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">CURRENT RISK POSTURE</span>
              <span className="text-rose-400 text-xs font-semibold">
                {kpis.productionRisk} · Supply Gap: {kpis.supplyAtRisk}%
              </span>
            </div>
          </div>

          {/* Decision Title */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Decision Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Reserve alternate route capacity on East-West pipeline"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as DecisionCategory)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs"
              >
                <option value="Logistics">Logistics & Corridors</option>
                <option value="Sourcing">Sourcing & Supplier</option>
                <option value="Inventory">Inventory & Storage</option>
                <option value="Operations">Operations & Plant Load</option>
                <option value="Commercial">Commercial & SLAs</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as DecisionStatus)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs"
              >
                <option value="Proposed">Proposed</option>
                <option value="Approved">Approved</option>
                <option value="In progress">In progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          </div>

          {/* Rationale / Reason */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Operational Rationale & Problem Context
            </label>
            <textarea
              rows={2}
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="Why this decision is required given current disruption assumptions..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Expected Impact */}
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Expected Operational Impact
            </label>
            <input
              type="text"
              value={expectedImpact}
              onChange={e => setExpectedImpact(e.target.value)}
              placeholder="e.g. Recovers 14% supply deficit; extends Plant 02 runway by 15 days"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          {/* Owner & Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Decision Owner
              </label>
              <select
                value={owner}
                onChange={e => setOwner(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs"
              >
                <option value="Elena Vance (Head of Global Operations)">Elena Vance (Head of Global Operations)</option>
                <option value="Marcus Brody (Supply Chain Director)">Marcus Brody (Supply Chain Director)</option>
                <option value="Sarah Chen (Chief Procurement Officer)">Sarah Chen (Chief Procurement Officer)</option>
                <option value="David Miller (Logistics Operations Lead)">David Miller (Logistics Operations Lead)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Cost Estimate / Commitment
              </label>
              <input
                type="text"
                value={costEstimate}
                onChange={e => setCostEstimate(e.target.value)}
                placeholder="e.g. $4.2M commitment"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
              />
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsDecisionModalOpen(false)}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Record Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
