import React from 'react';
import { OrbitLogo } from './common/OrbitLogo';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Shield,
  Activity,
  Layers,
  CheckCircle2,
  FileCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

export const LaunchScreen: React.FC = () => {
  const { enterWorkspace, theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background ambient grid & faint orbital lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top utility bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-slate-800/60">
        <OrbitLogo size="md" />

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulation environment</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-500">Modelled data</span>
          </div>

          <button
            onClick={toggleTheme}
            className="px-2.5 py-1 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 rounded transition-colors text-xs"
            title="Toggle Theme"
          >
            {theme === 'dark' ? 'Theme: Dark' : 'Theme: Light'}
          </button>
        </div>
      </header>

      {/* Main Terminal Launch Card */}
      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-6 py-12 flex flex-col justify-center items-center text-center">
        <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm text-left">
          
          {/* Header & Tagline */}
          <div className="border-b border-slate-800/80 pb-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
                  Enterprise Decision-Support System
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                v2.6.4-STABLE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 font-mono">
              ORBIT
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal">
              Operational Routing & Business Intelligence Terminal
            </p>
            <p className="text-xs sm:text-sm text-cyan-400 font-medium italic mt-1">
              "Turn disruption into decisions."
            </p>
          </div>

          {/* Target Workspace & Active Scenario Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>WORKSPACE</span>
              </div>
              <div className="text-base font-bold text-white font-mono">
                NOVA INDUSTRIALS
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Global Petrochem & Materials · 4 Plants
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>ACTIVE STRESS SCENARIO</span>
              </div>
              <div className="text-base font-bold text-amber-300 font-mono">
                Hormuz disruption — 60 days
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Supply at Risk: 18% · Runway: 24 Days
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={enterWorkspace}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm rounded-lg transition-all shadow-lg shadow-cyan-900/30 group cursor-pointer"
            >
              <span>ENTER WORKSPACE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Decision Engine Loop Indicator */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
              ORBIT Decision Loop
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 overflow-x-auto gap-2 pb-1">
              <span className="text-cyan-400 font-medium">UNDERSTAND</span>
              <span className="text-slate-600">→</span>
              <span className="hover:text-slate-200">SIMULATE</span>
              <span className="text-slate-600">→</span>
              <span className="hover:text-slate-200">COMPARE</span>
              <span className="text-slate-600">→</span>
              <span className="hover:text-slate-200">DECIDE</span>
              <span className="text-slate-600">→</span>
              <span className="hover:text-slate-200">RECORD</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400 font-medium">ACT</span>
            </div>
          </div>

          {/* Authenticated Persona Info */}
          <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Role: Head of Global Operations & Supply Chain</span>
            </div>
            <span className="text-slate-400">Elena Vance</span>
          </div>

        </div>

        {/* Disclaimer below */}
        <p className="text-xs text-slate-400 mt-6 max-w-lg font-mono">
          MODELLED SCENARIO · This enterprise terminal evaluates operational resilience under hypothetical maritime chokepoint interdictions. Numbers reflect calculated scenario parameters.
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 border-t border-slate-900 font-mono">
        <div>
          Strait of Hormuz Alternative Design · Product Design Challenge
        </div>
        <div className="mt-2 sm:mt-0 text-slate-400">
          "Don't predict the disruption. Prepare for the possibilities."
        </div>
      </footer>
    </div>
  );
};
