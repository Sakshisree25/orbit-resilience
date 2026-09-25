import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, AlertTriangle, AlertCircle, Info, CheckCheck } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    setActiveScreen,
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col h-full shadow-2xl">
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white font-mono">
              Operational Notifications
            </h3>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {notifications.filter(n => !n.read).length} unread
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNotifications}
              className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={() => setIsNotificationDrawerOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map(item => {
            const isUnread = !item.read;
            const Icon =
              item.severity === 'critical'
                ? AlertCircle
                : item.severity === 'warning'
                ? AlertTriangle
                : Info;

            const iconColors =
              item.severity === 'critical'
                ? 'text-rose-400 bg-rose-950/50 border-rose-800/60'
                : item.severity === 'warning'
                ? 'text-amber-400 bg-amber-950/50 border-amber-800/60'
                : 'text-cyan-400 bg-cyan-950/50 border-cyan-800/60';

            return (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isUnread
                    ? 'bg-slate-950/90 border-slate-700/80 shadow-sm'
                    : 'bg-slate-900/50 border-slate-800/50 opacity-75'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-1.5 rounded border shrink-0 mt-0.5 ${iconColors}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-semibold text-slate-200 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.message}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/60">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsNotificationDrawerOpen(false);
                          setActiveScreen('scenario');
                        }}
                        className="text-cyan-400 hover:text-cyan-300 font-medium"
                      >
                        Inspect in Scenario Lab →
                      </button>

                      {isUnread && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/70 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Simulation telemetry feed</span>
          <span>ORBIT Real-time Node</span>
        </div>
      </div>
    </div>
  );
};
