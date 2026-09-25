import React from 'react';

interface OrbitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-base font-bold tracking-tight',
    md: 'text-lg font-bold tracking-tight',
    lg: 'text-xl font-extrabold tracking-tight',
    xl: 'text-2xl font-black tracking-tight',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-cyan-500 drop-shadow-sm transition-transform duration-300 group-hover:rotate-12"
        >
          {/* Outer primary orbital ring */}
          <ellipse
            cx="24"
            cy="24"
            rx="21"
            ry="9"
            transform="rotate(-28 24 24)"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeOpacity="0.85"
            strokeDasharray="4 2"
          />
          {/* Inner counter-orbital corridor */}
          <ellipse
            cx="24"
            cy="24"
            rx="18"
            ry="7.5"
            transform="rotate(40 24 24)"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeOpacity="0.45"
          />
          {/* Core decision nexus */}
          <circle cx="24" cy="24" r="4.5" fill="currentColor" className="text-cyan-400" />
          <circle cx="24" cy="24" r="2" fill="white" />
          {/* Peripheral nodes */}
          <circle cx="10" cy="15" r="2.2" fill="#38BDF8" />
          <circle cx="37" cy="33" r="2.2" fill="#38BDF8" />
          <circle cx="34" cy="14" r="1.8" fill="#F59E0B" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`${textSizes[size]} text-slate-900 dark:text-white font-mono`}>
              ORBIT
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold px-1 py-0.5 rounded bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/60 dark:border-cyan-800/60">
              TERMINAL
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-0.5">
            Routing & Business Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
