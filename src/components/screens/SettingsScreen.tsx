import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building2,
  Sliders,
  Shield,
  RotateCcw,
  Check,
  Sun,
  Moon,
  Database,
  Layers,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    theme,
    toggleTheme,
    resetToBaseline,
    exitToLaunchScreen,
    params,
    activeScenarioName,
  } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [modelTolerance, setModelTolerance] = useState('Standard (95% Confidence)');
  const [currencyUnit, setCurrencyUnit] = useState('USD ($)');

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 pb-14 animate-in fade-in duration-200 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60">
              SYSTEM CONFIGURATION
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              · WORKSPACE PREFERENCES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
            Terminal Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Configure simulation baseline thresholds, enterprise entity parameters, and interface aesthetics.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold font-mono transition-all shadow cursor-pointer shrink-0"
        >
          {savedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300" />
              <span>SAVED!</span>
            </>
          ) : (
            <span>SAVE PREFERENCES</span>
          )}
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Section 1: Active Enterprise Profile */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Enterprise Workspace Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">COMPANY ENTITY</span>
              <div className="text-white font-bold text-sm">NOVA INDUSTRIALS CORP.</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">Continuous-Process Chemical & Materials Division</div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block mb-1">AUTHENTICATED PERSONA</span>
              <div className="text-white font-bold text-sm">Elena Vance</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">Head of Global Operations & Supply Chain</div>
            </div>
          </div>
        </div>

        {/* Section 2: Model & Simulation Parameters */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Simulation Baseline & Engine Tolerances
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono">
                Monte Carlo Confidence Interval
              </label>
              <select
                value={modelTolerance}
                onChange={e => setModelTolerance(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="Conservative (99% Confidence)">Conservative (99% Confidence)</option>
                <option value="Standard (95% Confidence)">Standard (95% Confidence)</option>
                <option value="Aggressive (90% Confidence)">Aggressive (90% Confidence)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1 font-mono">
                Reporting Currency Unit
              </label>
              <select
                value={currencyUnit}
                onChange={e => setCurrencyUnit(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Active Scenario State: {activeScenarioName}</span>
            <button
              onClick={resetToBaseline}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to 60-Day Factory Baseline</span>
            </button>
          </div>
        </div>

        {/* Section 3: Interface Theme & Navigation */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4 text-xs font-mono">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Interface & Appearance
            </h2>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-950 border border-slate-800">
            <div>
              <div className="text-white font-bold">Theme Mode</div>
              <div className="text-[11px] text-slate-400 font-sans mt-0.5">
                Switch between high-contrast dark command center and clean light enterprise workspace.
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Switch to Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span>Switch to Dark</span>
                </>
              )}
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Session management:</span>
            <button
              onClick={exitToLaunchScreen}
              className="text-rose-400 hover:text-rose-300 font-semibold"
            >
              Exit Workspace to App Launch Screen →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
