import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, BookmarkPlus } from 'lucide-react';

interface SaveScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveScenarioModal: React.FC<SaveScenarioModalProps> = ({ isOpen, onClose }) => {
  const { saveCurrentScenario, params, kpis } = useApp();
  const [name, setName] = useState(`SCENARIO — ${params.duration}d + Interventions`);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveCurrentScenario(name.trim(), description.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkPlus className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono">
              Save Simulation Scenario
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Scenario Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Assumptions & Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Key assumptions tested in this configuration..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>

          <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
            <div className="flex justify-between">
              <span>Duration:</span>
              <span className="text-white">{params.duration} days</span>
            </div>
            <div className="flex justify-between">
              <span>Supply Gap:</span>
              <span className="text-cyan-400">{kpis.supplyAtRisk}%</span>
            </div>
            <div className="flex justify-between">
              <span>Cost Impact:</span>
              <span className="text-amber-400">+{kpis.costImpact}%</span>
            </div>
            <div className="flex justify-between">
              <span>Inventory Runway:</span>
              <span className="text-emerald-400">{kpis.inventoryRunway} days</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg"
            >
              Save to Comparison Set
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
