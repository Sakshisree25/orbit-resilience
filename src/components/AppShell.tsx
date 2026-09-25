import React from 'react';
import { useApp } from '../context/AppContext';
import { Sidebar } from './navigation/Sidebar';
import { TopBar } from './navigation/TopBar';
import { DecisionModal } from './modals/DecisionModal';
import { CommandPaletteModal } from './modals/CommandPaletteModal';
import { NotificationDrawer } from './drawers/NotificationDrawer';
import { DeleteVideoModal } from './modals/DeleteVideoModal';

// Screens
import { CommandCenterScreen } from './screens/CommandCenterScreen';
import { ScenarioLabScreen } from './screens/ScenarioLabScreen';
import { SupplyNetworkScreen } from './screens/SupplyNetworkScreen';
import { RouteIntelligenceScreen } from './screens/RouteIntelligenceScreen';
import { RiskMonitorScreen } from './screens/RiskMonitorScreen';
import { AIBriefingScreen } from './screens/AIBriefingScreen';
import { DecisionLogScreen } from './screens/DecisionLogScreen';
import { ArchitectureScreen } from './screens/ArchitectureScreen';
import { BusinessModelScreen } from './screens/BusinessModelScreen';
import { VideoWalkthroughScreen } from './screens/VideoWalkthroughScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export const AppShell: React.FC = () => {
  const { activeScreen, isMobileNavOpen, setIsMobileNavOpen } = useApp();

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'command':
        return <CommandCenterScreen />;
      case 'scenario':
        return <ScenarioLabScreen />;
      case 'network':
        return <SupplyNetworkScreen />;
      case 'routes':
        return <RouteIntelligenceScreen />;
      case 'risk':
        return <RiskMonitorScreen />;
      case 'briefing':
        return <AIBriefingScreen />;
      case 'decisions':
        return <DecisionLogScreen />;
      case 'architecture':
        return <ArchitectureScreen />;
      case 'business':
        return <BusinessModelScreen />;
      case 'video':
        return <VideoWalkthroughScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <CommandCenterScreen />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:block shrink-0 h-full">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative z-10 animate-in slide-in-from-left duration-200">
            <Sidebar isMobile />
          </div>
        </div>
      )}

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-slate-950">
        {/* Top Bar */}
        <TopBar />

        {/* Scrollable Viewport Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {renderActiveScreen()}
        </main>
      </div>

      {/* App-level Modals & Drawers */}
      <DecisionModal />
      <CommandPaletteModal />
      <NotificationDrawer />
      <DeleteVideoModal />
    </div>
  );
};
