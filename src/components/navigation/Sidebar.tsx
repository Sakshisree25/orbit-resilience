import React from 'react';
import { OrbitLogo } from '../common/OrbitLogo';
import { useApp } from '../../context/AppContext';
import { ScreenId } from '../../types';
import {
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
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building2,
  X,
} from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false }) => {
  const {
    activeScreen,
    setActiveScreen,
    theme,
    toggleTheme,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsMobileNavOpen,
    exitToLaunchScreen,
    decisions,
    sharedVideo,
  } = useApp();

  const navItems: {
    group: string;
    items: {
      id: ScreenId;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: string | number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      group: 'COMMAND',
      items: [
        { id: 'command', label: 'Command Center', icon: LayoutDashboard },
        { id: 'scenario', label: 'Scenario Lab', icon: FlaskConical, badge: 'HERO', badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' },
        { id: 'network', label: 'Supply Network', icon: Network },
        { id: 'routes', label: 'Route Intelligence', icon: Compass },
        { id: 'risk', label: 'Risk Monitor', icon: ShieldAlert },
      ],
    },
    {
      group: 'INTELLIGENCE',
      items: [
        { id: 'briefing', label: 'AI Briefing', icon: BrainCircuit, badge: 'SYNTHESIS' },
        {
          id: 'decisions',
          label: 'Decision Log',
          icon: FileCheck2,
          badge: decisions.length,
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { id: 'architecture', label: 'Architecture', icon: Cpu },
        { id: 'business', label: 'Business Model', icon: Briefcase },
        {
          id: 'video',
          label: 'Video Walkthrough',
          icon: Video,
          badge: sharedVideo ? 'READY' : 'UPLOAD',
          badgeColor: sharedVideo ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400',
        },
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  const handleSelectScreen = (id: ScreenId) => {
    setActiveScreen(id);
    if (isMobile) {
      setIsMobileNavOpen(false);
    }
  };

  return (
    <aside
      className={`h-full flex flex-col justify-between bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-200 select-none ${
        isMobile
          ? 'w-72 p-4'
          : isSidebarCollapsed
          ? 'w-18 p-3'
          : 'w-64 p-4'
      }`}
    >
      {/* Top brand header */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
          <div className="cursor-pointer" onClick={() => handleSelectScreen('command')}>
            <OrbitLogo size="sm" showText={!isSidebarCollapsed || isMobile} />
          </div>

          {isMobile ? (
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden lg:flex p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {/* Workspace Selector */}
        {(!isSidebarCollapsed || isMobile) && (
          <div className="mb-5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              <span>ACTIVE WORKSPACE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold text-white font-mono truncate">
                  NOVA INDUSTRIALS
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  Chemicals & Materials Division
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation list */}
        <nav className="space-y-5 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
          {navItems.map(group => (
            <div key={group.group} className="space-y-1">
              {(!isSidebarCollapsed || isMobile) && (
                <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                  {group.group}
                </div>
              )}

              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectScreen(item.id)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
                    } ${isSidebarCollapsed && !isMobile ? 'justify-center px-2' : ''}`}
                    title={isSidebarCollapsed && !isMobile ? item.label : undefined}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />

                    {(!isSidebarCollapsed || isMobile) && (
                      <span className="truncate flex-1 text-left">{item.label}</span>
                    )}

                    {(!isSidebarCollapsed || isMobile) && item.badge && (
                      <span
                        className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded leading-none ${
                          item.badgeColor || 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom user profile & controls */}
      <div className="pt-3 border-t border-slate-800/80 space-y-2">
        {/* Theme and Exit buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={toggleTheme}
            className={`flex-1 flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/70 border border-slate-800 transition-colors ${
              isSidebarCollapsed && !isMobile ? 'justify-center' : ''
            }`}
            title="Toggle theme (Light / Dark)"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                {(!isSidebarCollapsed || isMobile) && <span>Light</span>}
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                {(!isSidebarCollapsed || isMobile) && <span>Dark</span>}
              </>
            )}
          </button>

          <button
            onClick={exitToLaunchScreen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/70 border border-slate-800 transition-colors"
            title="Return to App Launch Screen"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Card */}
        {(!isSidebarCollapsed || isMobile) ? (
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-950/40 border border-slate-800/60">
            <div className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-xs font-bold font-mono shrink-0">
              EV
            </div>
            <div className="truncate text-left">
              <div className="text-xs font-semibold text-white leading-tight truncate">
                Elena Vance
              </div>
              <div className="text-[10px] text-slate-400 leading-tight truncate">
                Head of Global Ops
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-xs font-bold font-mono">
              EV
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
