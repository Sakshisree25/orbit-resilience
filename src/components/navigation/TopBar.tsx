import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Activity,
  PlusCircle,
  HelpCircle,
  SlidersHorizontal,
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    activeScenarioName,
    params,
    theme,
    toggleTheme,
    setIsCommandPaletteOpen,
    setIsNotificationDrawerOpen,
    notifications,
    setIsMobileNavOpen,
    setIsDecisionModalOpen,
    setActiveScreen,
    userRole,
    toggleUserRole,
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-14 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 backdrop-blur-sm z-20 shrink-0 select-none">
      {/* Left zone: Mobile toggle + Breadcrumb / Scenario Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          title="Open Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 truncate">
          <span className="text-xs font-bold text-white font-mono shrink-0 hidden sm:inline">
            NOVA INDUSTRIALS
          </span>
          <span className="text-slate-600 hidden sm:inline">/</span>

          <div
            onClick={() => setActiveScreen('scenario')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-colors"
            title="Click to tune scenario in Scenario Lab"
          >
            <Activity className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="text-xs font-medium text-slate-200 truncate font-mono">
              {activeScenarioName}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono hidden md:inline ml-1">
              ({params.duration}d · {params.supplierAvailability.slice(0, 4)})
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Simulation Mode · Modelled Data</span>
          </div>
        </div>
      </div>

      {/* Right zone: Action buttons, Search, Notifications, Theme, User */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Quick action: Create Decision */}
        <button
          onClick={() => setIsDecisionModalOpen(true)}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-800/60 rounded-lg transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Log Decision</span>
        </button>

        {/* Search / Command palette trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
          title="Search or trigger commands (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden lg:inline text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Notifications trigger */}
        <button
          onClick={() => setIsNotificationDrawerOpen(true)}
          className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Operational Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full ring-2 ring-slate-900" />
          )}
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-cyan-400" />
          )}
        </button>

        {/* Role Switcher Pill */}
        <button
          onClick={toggleUserRole}
          className={`hidden sm:flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
            userRole === 'owner'
              ? 'bg-cyan-950/60 border-cyan-800 text-cyan-300 hover:border-cyan-500'
              : 'bg-amber-950/60 border-amber-800 text-amber-300 hover:border-amber-500'
          }`}
          title="Switch role between Workspace Owner and Viewer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          <span>{userRole === 'owner' ? 'Owner / Admin' : 'Viewer'}</span>
        </button>

        {/* Profile Pill */}
        <div
          onClick={() => setActiveScreen('settings')}
          className="flex items-center gap-2 pl-2 border-l border-slate-800 cursor-pointer"
          title="Operations Lead Settings"
        >
          <div className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-xs font-bold font-mono">
            EV
          </div>
        </div>
      </div>
    </header>
  );
};
