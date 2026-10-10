import React from 'react';
import { TabId, ScreenId } from '../../types';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onNavigateScreen?: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  onNavigateScreen,
}) => {
  const tabs = [
    { id: 'home' as TabId, label: 'Home', icon: 'spa', targetScreen: 'home' as ScreenId },
    { id: 'explore' as TabId, label: 'Explore', icon: 'search', targetScreen: 'catalog' as ScreenId },
    { id: 'bookings' as TabId, label: 'Bookings', icon: 'calendar_today', targetScreen: 'pass' as ScreenId },
    { id: 'saved' as TabId, label: 'Saved', icon: 'bookmark', targetScreen: 'catalog' as ScreenId },
    { id: 'profile' as TabId, label: 'Profile', icon: 'person', targetScreen: 'auth' as ScreenId },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="mt-auto border-t border-[#1E1424]/10 bg-white/95 backdrop-blur-md px-4 py-2 flex items-center justify-between sticky bottom-0 z-30 shadow-xs"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              onTabChange(tab.id);
              if (onNavigateScreen) {
                onNavigateScreen(tab.targetScreen);
              }
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-all ${
              isActive ? 'text-[#1E1424]' : 'text-[#1E1424]/45 hover:text-[#1E1424]/80'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[20px] transition-transform ${
                isActive ? 'scale-110' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span
              className={`font-sans text-[10px] mt-0.5 tracking-tight ${
                isActive ? 'font-bold' : 'font-normal'
              }`}
            >
              {tab.label}
            </span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-[#C59B7D] mt-0.5 animate-pulse"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
