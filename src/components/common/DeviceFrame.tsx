import React from 'react';
import { DeviceMode } from '../../types';

interface DeviceFrameProps {
  deviceMode: DeviceMode;
  children: React.ReactNode;
  titleBadge?: string;
  screenNumber?: number;
  screenSubtitle?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  deviceMode,
  children,
  titleBadge,
  screenNumber,
  screenSubtitle,
}) => {
  const isIOS = deviceMode === 'ios' || deviceMode === 'artboard';
  const isAndroid = deviceMode === 'android';

  return (
    <div className="flex flex-col items-center">
      {/* Artboard Header Badge if present */}
      {(titleBadge || screenNumber) && (
        <div className="flex items-center justify-between w-[390px] mb-3 px-2">
          <div className="flex items-center gap-2">
            {screenNumber && (
              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold font-sans">
                {screenNumber}
              </span>
            )}
            {titleBadge && (
              <span className="text-xs uppercase tracking-wider font-semibold text-stone-300 font-sans">
                {titleBadge}
              </span>
            )}
          </div>
          {screenSubtitle && (
            <span className="text-[11px] text-stone-400 font-sans">
              {screenSubtitle}
            </span>
          )}
        </div>
      )}

      {/* Frame Container */}
      <div
        className={`w-[390px] min-w-[390px] h-[844px] max-h-[844px] overflow-hidden rounded-[44px] bg-[#fff9ef] text-[#1E1424] relative flex flex-col transition-all duration-300 ${
          isIOS
            ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),0_0_0_10px_#1e1424,0_0_0_12px_rgba(255,255,255,0.12)]'
            : isAndroid
            ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),0_0_0_9px_#151518,0_0_0_11px_rgba(217,119,6,0.15)] rounded-[38px]'
            : 'shadow-2xl border border-white/10'
        }`}
      >
        {/* Top Status Bar & Camera Island */}
        {isIOS ? (
          <div className="sticky top-0 z-50 pt-2 px-6 flex flex-col items-center select-none bg-[#fff9ef]/95 backdrop-blur-md">
            <div className="w-full flex items-center justify-between text-[12px] font-sans font-semibold text-[#1E1424] px-1">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-xs text-[#1E1424]">
                <span className="material-symbols-outlined text-xs">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-xs">wifi</span>
                <span className="material-symbols-outlined text-xs">battery_full</span>
              </div>
            </div>
            {/* Dynamic Island */}
            <div className="w-[122px] h-[28px] bg-[#1E1424] rounded-full flex items-center justify-between px-3 mt-0.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800"></div>
              <div className="flex items-center gap-1 text-[10px] text-amber-200/80 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>AURA</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800"></div>
            </div>
          </div>
        ) : isAndroid ? (
          <div className="sticky top-0 z-50 pt-2 px-5 pb-1 flex items-center justify-between select-none bg-[#fff9ef]/95 backdrop-blur-md">
            <div className="text-[12px] font-sans font-semibold text-[#1E1424]">12:30</div>
            {/* Android Punch Hole */}
            <div className="w-3.5 h-3.5 rounded-full bg-[#1E1424] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#352540]"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#1E1424]">
              <span className="text-[10px] font-bold font-sans">5G</span>
              <span className="material-symbols-outlined text-xs">wifi</span>
              <span className="material-symbols-outlined text-xs">battery_6_bar</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-4 bg-[#1E1424]/5"></div>
        )}

        {/* Scrollable Screen Canvas */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar flex flex-col relative">
          {children}
        </div>

        {/* Bottom OS Bar */}
        {isIOS ? (
          <div className="w-full py-1.5 flex justify-center bg-white/95 backdrop-blur-sm sticky bottom-0 z-50 pointer-events-none">
            <div className="w-32 h-1 bg-[#1E1424]/40 rounded-full"></div>
          </div>
        ) : isAndroid ? (
          <div className="w-full py-1 flex justify-around items-center bg-white/95 backdrop-blur-sm sticky bottom-0 z-50 text-[#1E1424]/60 text-xs">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="w-3.5 h-3.5 border-2 border-[#1E1424]/60 rounded-sm"></span>
            <span className="material-symbols-outlined text-sm">menu</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
