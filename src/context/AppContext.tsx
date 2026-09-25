import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  ScreenId,
  DisruptionDuration,
  DemandLevel,
  EnergyPrice,
  FreightRate,
  InventoryLevel,
  SupplierAvailability,
  Interventions,
  ScenarioParams,
  ScenarioKpis,
  SavedScenario,
  Decision,
  DecisionStatus,
  DecisionCategory,
  TimelineEntry,
  SharedVideo,
  UserRole,
  NotificationItem,
} from '../types';
import { calculateScenarioKpis } from '../utils/scenarioCalculator';
import {
  INITIAL_SAVED_SCENARIOS,
  INITIAL_DECISIONS,
  INITIAL_TIMELINE_ENTRIES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeScreen: ScreenId;
  setActiveScreen: (screen: ScreenId) => void;
  isWorkspaceEntered: boolean;
  enterWorkspace: () => void;
  exitToLaunchScreen: () => void;
  
  // User role (Owner vs Viewer)
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleUserRole: () => void;

  // Scenario state
  params: ScenarioParams;
  kpis: ScenarioKpis;
  setDuration: (duration: DisruptionDuration) => void;
  setDemand: (demand: DemandLevel) => void;
  setEnergyPrice: (price: EnergyPrice) => void;
  setFreight: (freight: FreightRate) => void;
  setInventory: (inventory: InventoryLevel) => void;
  setSupplierAvailability: (avail: SupplierAvailability) => void;
  toggleIntervention: (key: keyof Interventions) => void;
  setIntervention: (key: keyof Interventions, value: boolean) => void;
  resetToBaseline: () => void;

  // Saved scenarios & comparison
  savedScenarios: SavedScenario[];
  activeScenarioName: string;
  applySavedScenario: (scenario: SavedScenario) => void;
  saveCurrentScenario: (name: string, description: string) => void;
  deleteSavedScenario: (id: string) => void;

  // Selected items
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;

  // Decisions
  decisions: Decision[];
  createDecision: (data: Omit<Decision, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDecisionStatus: (id: string, status: DecisionStatus) => void;
  deleteDecision: (id: string) => void;

  // Timeline
  timeline: TimelineEntry[];
  addTimelineEntry: (entry: Omit<TimelineEntry, 'id' | 'time'>) => void;

  // Shared Persistent Video Walkthrough
  sharedVideo: SharedVideo | null;
  isSharedVideoLoading: boolean;
  videoUploadProgress: number;
  isVideoUploading: boolean;
  uploadErrorMessage: string | null;
  uploadSharedVideo: (file: File) => Promise<boolean>;
  uploadSharedVideoFromUrl: (url: string, title?: string) => Promise<boolean>;
  deleteSharedVideoForEveryone: () => Promise<boolean>;
  refreshSharedVideo: () => Promise<void>;
  isDeleteVideoModalOpen: boolean;
  setIsDeleteVideoModalOpen: (open: boolean) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // UI state
  isDecisionModalOpen: boolean;
  setIsDecisionModalOpen: (open: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;

  // Deep link helpers
  jumpToScenarioLabWithIntervention: (interventionKey: keyof Interventions) => void;
  jumpToRoute: (routeId: string) => void;
  jumpToNode: (nodeId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_PARAMS: ScenarioParams = {
  duration: 60,
  demand: 'BASE',
  energyPrice: 100,
  freight: '+15%',
  inventory: 24,
  supplierAvailability: 'RESTRICTED',
  interventions: {
    alternativeSupplier: false,
    alternativeRoute: false,
    inventoryBuffer: false,
    demandReduction: false,
    productionShift: false,
  },
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('orbit_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('orbit_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // User Role (Owner vs Viewer)
  const [userRole, setUserRole] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('orbit_user_role');
    return (savedRole === 'viewer' ? 'viewer' : 'owner') as UserRole;
  });

  const toggleUserRole = () => {
    setUserRole(prev => {
      const nextRole = prev === 'owner' ? 'viewer' : 'owner';
      localStorage.setItem('orbit_user_role', nextRole);
      return nextRole;
    });
  };

  // Launch screen transition
  const [isWorkspaceEntered, setIsWorkspaceEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('orbit_workspace_entered') === 'true';
  });

  const enterWorkspace = () => {
    setIsWorkspaceEntered(true);
    sessionStorage.setItem('orbit_workspace_entered', 'true');
  };

  const exitToLaunchScreen = () => {
    setIsWorkspaceEntered(false);
    sessionStorage.removeItem('orbit_workspace_entered');
  };

  // Navigation state
  const [activeScreen, setActiveScreen] = useState<ScreenId>('command');
  const [activeScenarioName, setActiveScenarioName] = useState<string>('Hormuz disruption — 60 days');

  // Scenario state
  const [params, setParams] = useState<ScenarioParams>(DEFAULT_PARAMS);
  const [kpis, setKpis] = useState<ScenarioKpis>(() => calculateScenarioKpis(DEFAULT_PARAMS));

  // Saved scenarios
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>(INITIAL_SAVED_SCENARIOS);

  // Inspector & selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node-sup-qatar');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('route-petroline');

  // Decisions & Timeline
  const [decisions, setDecisions] = useState<Decision[]>(INITIAL_DECISIONS);
  const [timeline, setTimeline] = useState<TimelineEntry[]>(INITIAL_TIMELINE_ENTRIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // UI modals
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDeleteVideoModalOpen, setIsDeleteVideoModalOpen] = useState(false);

  // Shared Video Storage state
  const [sharedVideo, setSharedVideo] = useState<SharedVideo | null>(null);
  const [isSharedVideoLoading, setIsSharedVideoLoading] = useState(true);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [isVideoUploading, setIsVideoUploading] = useState(false);
  const [uploadErrorMessage, setUploadErrorMessage] = useState<string | null>(null);

  // Re-calculate KPIs on param changes
  useEffect(() => {
    const updated = calculateScenarioKpis(params);
    setKpis(updated);
  }, [params]);

  const getCurrentTimeString = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const addTimelineEntry = (entry: Omit<TimelineEntry, 'id' | 'time'>) => {
    const newEntry: TimelineEntry = {
      id: `tl-${Date.now()}`,
      time: getCurrentTimeString(),
      ...entry,
    };
    setTimeline(prev => [newEntry, ...prev.slice(0, 25)]);
  };

  // Fetch shared persistent video from backend
  const refreshSharedVideo = useCallback(async () => {
    try {
      setIsSharedVideoLoading(true);
      const res = await fetch('/api/video', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.hasVideo && data.video) {
          setSharedVideo(data.video);
        } else {
          setSharedVideo(null);
        }
      }
    } catch (err) {
      console.warn('Could not connect to /api/video backend:', err);
    } finally {
      setIsSharedVideoLoading(false);
    }
  }, []);

  // Poll or load shared video on startup
  useEffect(() => {
    refreshSharedVideo();
  }, [refreshSharedVideo]);

  // Upload video via XMLHttpRequest for real upload progress
  const uploadSharedVideo = async (file: File): Promise<boolean> => {
    setIsVideoUploading(true);
    setVideoUploadProgress(0);
    setUploadErrorMessage(null);

    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.append('video', file);

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setVideoUploadProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        setIsVideoUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            if (data.success && data.video) {
              setSharedVideo(data.video);
              setVideoUploadProgress(100);
              addTimelineEntry({
                type: 'decision_created',
                action: 'Walkthrough video stored in persistent storage',
                detail: `Uploaded ${data.video.fileName} (${data.video.fileSizeFormatted}). Available to all workspace viewers.`,
              });
              resolve(true);
              return;
            }
          } catch (e) {
            console.error('Failed to parse upload response', e);
          }
        }
        setUploadErrorMessage('Upload failed. Please check file format and size.');
        resolve(false);
      });

      xhr.addEventListener('error', () => {
        setIsVideoUploading(false);
        setUploadErrorMessage('Network error during video upload.');
        resolve(false);
      });

      xhr.open('POST', '/api/video/upload');
      xhr.send(formData);
    });
  };

  // Upload via external URL
  const uploadSharedVideoFromUrl = async (url: string, title?: string): Promise<boolean> => {
    setIsVideoUploading(true);
    setUploadErrorMessage(null);
    try {
      const res = await fetch('/api/video/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.video) {
          setSharedVideo(data.video);
          addTimelineEntry({
            type: 'decision_created',
            action: 'Walkthrough cloud stream registered',
            detail: `External video stream connected for all workspace viewers.`,
          });
          return true;
        }
      }
      setUploadErrorMessage('Failed to connect video stream URL.');
      return false;
    } catch (err) {
      setUploadErrorMessage('Error communicating with backend video API.');
      return false;
    } finally {
      setIsVideoUploading(false);
    }
  };

  // Delete video for everyone
  const deleteSharedVideoForEveryone = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/video', { method: 'DELETE' });
      if (res.ok) {
        setSharedVideo(null);
        addTimelineEntry({
          type: 'decision_created',
          action: 'Walkthrough video deleted for everyone',
          detail: 'Video removed from shared persistent storage by owner.',
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to delete video:', err);
      return false;
    }
  };

  // Param update methods
  const setDuration = (duration: DisruptionDuration) => {
    const old = params.duration;
    setParams(prev => ({ ...prev, duration }));
    setActiveScenarioName(`Hormuz disruption — ${duration} days`);
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Disruption duration adjusted',
      detail: `Adjusted assumption: ${old} → ${duration} days. System model updated.`,
    });
  };

  const setDemand = (demand: DemandLevel) => {
    setParams(prev => ({ ...prev, demand }));
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Demand assumption shifted',
      detail: `Demand baseline adjusted to ${demand}.`,
    });
  };

  const setEnergyPrice = (energyPrice: EnergyPrice) => {
    setParams(prev => ({ ...prev, energyPrice }));
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Crude price benchmark updated',
      detail: `Energy feedstock set to $${energyPrice}/bbl.`,
    });
  };

  const setFreight = (freight: FreightRate) => {
    setParams(prev => ({ ...prev, freight }));
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Freight rate modifier changed',
      detail: `Maritime tanker charter rates set to ${freight}.`,
    });
  };

  const setInventory = (inventory: InventoryLevel) => {
    setParams(prev => ({ ...prev, inventory }));
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Inventory safety days altered',
      detail: `Operational working inventory adjusted to ${inventory} days.`,
    });
  };

  const setSupplierAvailability = (supplierAvailability: SupplierAvailability) => {
    setParams(prev => ({ ...prev, supplierAvailability }));
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Supplier availability constraint updated',
      detail: `Upstream Gulf availability: ${supplierAvailability}.`,
    });
  };

  const toggleIntervention = (key: keyof Interventions) => {
    setParams(prev => {
      const currentVal = prev.interventions[key];
      const nextVal = !currentVal;
      const interventionLabels: Record<keyof Interventions, string> = {
        alternativeSupplier: 'Alternative Supplier (Bonny/Corpus)',
        alternativeRoute: 'Alternative Route (Petroline / Cape)',
        inventoryBuffer: 'Strategic Inventory Buffer (+15d)',
        demandReduction: 'Demand Reduction (-8% Peak Shaving)',
        productionShift: 'Production Shift (Antwerp → Houston)',
      };

      addTimelineEntry({
        type: 'intervention_tested',
        action: nextVal ? 'Intervention activated' : 'Intervention deactivated',
        detail: `${interventionLabels[key]} is now ${nextVal ? 'ACTIVE' : 'INACTIVE'} in scenario model.`,
      });

      return {
        ...prev,
        interventions: {
          ...prev.interventions,
          [key]: nextVal,
        },
      };
    });
  };

  const setIntervention = (key: keyof Interventions, value: boolean) => {
    setParams(prev => ({
      ...prev,
      interventions: {
        ...prev.interventions,
        [key]: value,
      },
    }));
  };

  const resetToBaseline = () => {
    setParams(DEFAULT_PARAMS);
    setActiveScenarioName('Hormuz disruption — 60 days');
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Reset to baseline posture',
      detail: 'Restored 60-day baseline disruption without interventions.',
    });
  };

  const applySavedScenario = (saved: SavedScenario) => {
    setParams(saved.params);
    setActiveScenarioName(saved.name);
    addTimelineEntry({
      type: 'scenario_compared',
      action: 'Loaded scenario preset',
      detail: `Applied "${saved.name}" to workspace.`,
    });
  };

  const saveCurrentScenario = (name: string, description: string) => {
    const newScenario: SavedScenario = {
      id: `custom-${Date.now()}`,
      name,
      description: description || 'Custom user-configured disruption scenario.',
      params: { ...params },
      kpis: { ...kpis },
      createdAt: 'Just now',
      isCustom: true,
    };
    setSavedScenarios(prev => [newScenario, ...prev]);
    setActiveScenarioName(name);
    addTimelineEntry({
      type: 'scenario_change',
      action: 'Custom scenario saved',
      detail: `Saved "${name}" into scenario comparison library.`,
    });
  };

  const deleteSavedScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  // Decisions
  const createDecision = (data: Omit<Decision, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const timeFormatted = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newDecision: Decision = {
      id: `dec-${Date.now().toString().slice(-4)}`,
      createdAt: timeFormatted,
      updatedAt: timeFormatted,
      ...data,
    };
    setDecisions(prev => [newDecision, ...prev]);
    addTimelineEntry({
      type: 'decision_created',
      action: 'Decision logged',
      detail: `Decision created: "${newDecision.title}" assigned to ${newDecision.owner}.`,
    });
  };

  const updateDecisionStatus = (id: string, status: DecisionStatus) => {
    setDecisions(prev =>
      prev.map(d => (d.id === id ? { ...d, status, updatedAt: 'Just now' } : d))
    );
    addTimelineEntry({
      type: 'decision_created',
      action: 'Decision status updated',
      detail: `Decision status changed to "${status}".`,
    });
  };

  const deleteDecision = (id: string) => {
    setDecisions(prev => prev.filter(d => d.id !== id));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Deep linking jumps
  const jumpToScenarioLabWithIntervention = (interventionKey: keyof Interventions) => {
    setIntervention(interventionKey, true);
    setActiveScreen('scenario');
  };

  const jumpToRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
    setActiveScreen('routes');
  };

  const jumpToNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setActiveScreen('network');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeScreen,
        setActiveScreen,
        isWorkspaceEntered,
        enterWorkspace,
        exitToLaunchScreen,
        userRole,
        setUserRole,
        toggleUserRole,
        params,
        kpis,
        setDuration,
        setDemand,
        setEnergyPrice,
        setFreight,
        setInventory,
        setSupplierAvailability,
        toggleIntervention,
        setIntervention,
        resetToBaseline,
        savedScenarios,
        activeScenarioName,
        applySavedScenario,
        saveCurrentScenario,
        deleteSavedScenario,
        selectedNodeId,
        setSelectedNodeId,
        selectedRouteId,
        setSelectedRouteId,
        decisions,
        createDecision,
        updateDecisionStatus,
        deleteDecision,
        timeline,
        addTimelineEntry,
        sharedVideo,
        isSharedVideoLoading,
        videoUploadProgress,
        isVideoUploading,
        uploadErrorMessage,
        uploadSharedVideo,
        uploadSharedVideoFromUrl,
        deleteSharedVideoForEveryone,
        refreshSharedVideo,
        isDeleteVideoModalOpen,
        setIsDeleteVideoModalOpen,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        isDecisionModalOpen,
        setIsDecisionModalOpen,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileNavOpen,
        setIsMobileNavOpen,
        jumpToScenarioLabWithIntervention,
        jumpToRoute,
        jumpToNode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
