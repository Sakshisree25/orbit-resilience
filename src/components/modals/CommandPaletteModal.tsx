import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import {
  Search,
  LayoutDashboard,
  FlaskConical,
  Network,
  Compass,
  ShieldAlert,
  BrainCircuit,
  FileCheck2,
  Cpu,
  Briefcase,
  Video,
  Settings,
  X,
  ArrowRight,
  Sliders,
  PlusCircle,
} from 'lucide-react';

export const CommandPaletteModal: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setActiveScreen,
    setDuration,
    toggleIntervention,
    setIsDecisionModalOpen,
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const items = [
    { label: 'Go to Command Center', category: 'Navigation', icon: LayoutDashboard, action: () => setActiveScreen('command') },
    { label: 'Go to Scenario Lab', category: 'Navigation', icon: FlaskConical, action: () => setActiveScreen('scenario') },
    { label: 'Go to Supply Network', category: 'Navigation', icon: Network, action: () => setActiveScreen('network') },
    { label: 'Go to Route Intelligence', category: 'Navigation', icon: Compass, action: () => setActiveScreen('routes') },
    { label: 'Go to Risk Monitor', category: 'Navigation', icon: ShieldAlert, action: () => setActiveScreen('risk') },
    { label: 'Go to AI Briefing', category: 'Navigation', icon: BrainCircuit, action: () => setActiveScreen('briefing') },
    { label: 'Go to Decision Log', category: 'Navigation', icon: FileCheck2, action: () => setActiveScreen('decisions') },
    { label: 'Go to Architecture', category: 'Navigation', icon: Cpu, action: () => setActiveScreen('architecture') },
    { label: 'Go to Business Model', category: 'Navigation', icon: Briefcase, action: () => setActiveScreen('business') },
    { label: 'Go to Video Walkthrough', category: 'Navigation', icon: Video, action: () => setActiveScreen('video') },
    { label: 'Log New Operational Decision', category: 'Actions', icon: PlusCircle, action: () => setIsDecisionModalOpen(true) },
    { label: 'Simulate 60-Day Disruption', category: 'Scenarios', icon: Sliders, action: () => { setDuration(60); setActiveScreen('scenario'); } },
    { label: 'Simulate 90-Day Disruption', category: 'Scenarios', icon: Sliders, action: () => { setDuration(90); setActiveScreen('scenario'); } },
    { label: 'Simulate 120-Day Disruption', category: 'Scenarios', icon: Sliders, action: () => { setDuration(120); setActiveScreen('scenario'); } },
    { label: 'Toggle Alternative Supplier', category: 'Interventions', icon: Sliders, action: () => { toggleIntervention('alternativeSupplier'); setActiveScreen('scenario'); } },
    { label: 'Toggle Alternative Route', category: 'Interventions', icon: Sliders, action: () => { toggleIntervention('alternativeRoute'); setActiveScreen('scenario'); } },
  ];

  const filtered = items.filter(i =>
    i.label.toLowerCase().includes(query.toLowerCase()) ||
    i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden text-slate-100 flex flex-col">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-slate-800 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a screen, scenario, or action..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-slate-500 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-slate-800/80 transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-slate-200 group-hover:text-white font-medium">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      {item.category}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-slate-950/70 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Navigate with</span>
            <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">↑</kbd>
            <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-400">↓</kbd>
            <span>or click</span>
          </div>
          <span>[ESC] to close</span>
        </div>
      </div>
    </div>
  );
};
