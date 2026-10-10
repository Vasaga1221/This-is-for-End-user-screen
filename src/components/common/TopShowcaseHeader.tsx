import React from 'react';
import { DeviceMode, ScreenId } from '../../types';

interface TopShowcaseHeaderProps {
  deviceMode: DeviceMode;
  onDeviceModeChange: (mode: DeviceMode) => void;
  activeScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  onOpenReactNativeModal: () => void;
}

export const TopShowcaseHeader: React.FC<TopShowcaseHeaderProps> = ({
  deviceMode,
  onDeviceModeChange,
  activeScreen,
  onScreenChange,
  onOpenReactNativeModal,
}) => {
  const screens: { id: ScreenId; num: number; label: string }[] = [
    { id: 'auth', num: 1, label: 'Authentication' },
    { id: 'home', num: 2, label: 'Discovery' },
    { id: 'catalog', num: 3, label: 'Service Catalog' },
    { id: 'booking', num: 4, label: 'Reservation' },
    { id: 'pass', num: 5, label: 'Access Pass' },
  ];

  return (
    <header className="max-w-7xl mx-auto mb-6 border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-medium tracking-wide uppercase mb-3 border border-amber-500/20">
          <span className="material-symbols-outlined text-sm">spa</span>
          <span>End-User Experience Flow • 5 Screens</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
          Aura Salon — Customer Application
        </h1>
        <p className="text-stone-400 text-sm mt-1 max-w-2xl font-sans leading-relaxed">
          Complete end-to-end client journey: Authentication, Salon Discovery &amp; Curations, Interactive Service Catalog, Multi-Step Reservation with UPI Checkout, and Digital Concierge Access Pass.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {/* Device Switcher Pills */}
        <div className="bg-stone-900/90 p-1 rounded-xl border border-white/10 flex items-center gap-1 shadow-sm">
          <button
            type="button"
            onClick={() => onDeviceModeChange('artboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'artboard'
                ? 'bg-[#C59B7D] text-[#1E1424] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
            title="View all 5 screens side by side"
          >
            <span className="material-symbols-outlined text-sm">view_carousel</span>
            <span>Artboard (5 Screens)</span>
          </button>

          <button
            type="button"
            onClick={() => onDeviceModeChange('ios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'ios'
                ? 'bg-[#C59B7D] text-[#1E1424] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
            title="Interactive iPhone simulator"
          >
            <span className="material-symbols-outlined text-sm">phone_iphone</span>
            <span>iOS Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => onDeviceModeChange('android')}
            className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              deviceMode === 'android'
                ? 'bg-[#C59B7D] text-[#1E1424] font-bold shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
            title="Interactive Android simulator"
          >
            <span className="material-symbols-outlined text-sm">phone_android</span>
            <span>Android Simulator</span>
          </button>
        </div>

        {/* Screen Jumpers for Simulator Mode */}
        {deviceMode !== 'artboard' && (
          <div className="bg-stone-900/90 p-1 rounded-xl border border-white/10 flex items-center gap-1">
            {screens.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onScreenChange(s.id)}
                className={`w-7 h-7 rounded-lg text-xs font-bold font-sans flex items-center justify-center transition-all cursor-pointer ${
                  activeScreen === s.id
                    ? 'bg-white text-[#1E1424] shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
                title={`Jump to Screen ${s.num}: ${s.label}`}
              >
                {s.num}
              </button>
            ))}
          </div>
        )}

        {/* React Native Code Export Trigger */}
        <button
          type="button"
          onClick={onOpenReactNativeModal}
          className="bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">code</span>
          <span>React Native (iOS & Android)</span>
        </button>
      </div>
    </header>
  );
};
