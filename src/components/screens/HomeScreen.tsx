import React, { useState } from 'react';
import { ScreenId, TabId } from '../../types';
import { FEATURED_SALONS, ASSET_IMAGES } from '../../data/mockData';
import { BottomNav } from '../common/BottomNav';

interface HomeScreenProps {
  onNavigateScreen: (screen: ScreenId) => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateScreen,
  activeTab,
  onTabChange,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('Bandra West, Mumbai');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [savedSalons, setSavedSalons] = useState<string[]>(['maison-de-beaute']);

  const locations = [
    'Bandra West, Mumbai',
    'Juhu & Vile Parle, Mumbai',
    'Colaba & Fort, Mumbai',
    'BKC & Kurla, Mumbai',
    'Worli & Lower Parel, Mumbai',
  ];

  const categories = [
    { id: 'hair', label: 'Hair Styling', icon: 'content_cut', bg: 'bg-amber-50', text: 'text-amber-900' },
    { id: 'balayage', label: 'Balayage', icon: 'palette', bg: 'bg-purple-50', text: 'text-purple-900' },
    { id: 'ayurveda', label: 'Ayurveda', icon: 'spa', bg: 'bg-emerald-50', text: 'text-emerald-900' },
    { id: 'nails', label: 'Nails & Pedi', icon: 'dry_cleaning', bg: 'bg-rose-50', text: 'text-rose-900' },
  ];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedSalons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredSalons = FEATURED_SALONS.filter((s) => {
    if (!searchQuery) return true;
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-[#1E1424]/10 bg-[#fff9ef]/95 backdrop-blur-md sticky top-0 z-30">
        <button
          type="button"
          onClick={() => setShowLocationPicker(true)}
          className="flex items-center gap-1.5 text-[#1E1424] hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-base text-amber-800">near_me</span>
          <span className="font-sans text-[13px] font-semibold">{selectedLocation}</span>
          <span className="material-symbols-outlined text-sm text-[#1E1424]/60">expand_more</span>
        </button>

        <h3 className="font-serif text-[18px] font-bold text-[#1E1424]">Aura Salon</h3>

        <button
          type="button"
          onClick={() => setShowNotifications(true)}
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E1424] shadow-xs relative hover:bg-stone-50"
          title="Notifications"
        >
          <span className="material-symbols-outlined text-base">notifications</span>
          <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
        </button>
      </div>

      {/* Main Content Feed */}
      <div className="px-5 py-4 space-y-5 flex-1">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#1E1424]/40 text-base">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search salons, services, or stylists..."
            className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-[#1E1424]/10 text-[#1E1424] font-sans text-[13px] shadow-xs focus:outline-none focus:ring-1 focus:ring-[#C59B7D]"
          />
          <button
            type="button"
            onClick={() => onNavigateScreen('catalog')}
            className="material-symbols-outlined absolute right-3.5 top-3 text-[#1E1424]/50 text-base hover:text-[#1E1424]"
          >
            tune
          </button>
        </div>

        {/* Concierge Welcome */}
        <div>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-amber-800">
            Personal Concierge
          </span>
          <h2 className="font-serif text-[30px] font-bold text-[#1E1424] leading-tight">
            Good afternoon,<br />Ananya
          </h2>
        </div>

        {/* Upcoming reservation banner card */}
        <div
          onClick={() => onNavigateScreen('pass')}
          className="p-3.5 bg-gradient-to-r from-[#f7ebd9] to-[#faedd8] rounded-2xl border border-amber-900/10 flex items-center justify-between cursor-pointer hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center text-amber-900 shadow-xs shrink-0">
              <span className="material-symbols-outlined text-lg">calendar_month</span>
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-900">
                Upcoming Reservation
              </span>
              <h4 className="font-sans text-[13px] font-bold text-[#1E1424]">
                Tomorrow, 3:30 PM • Maison de Beauté
              </h4>
              <p className="font-sans text-[11px] text-[#1E1424]/70">Signature Balayage & Blowout</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-base text-[#1E1424]/40">chevron_right</span>
        </div>

        {/* Hero editorial promo */}
        <div className="relative rounded-3xl overflow-hidden p-5 text-white bg-[#221629] shadow-lg">
          <div
            className="absolute inset-0 opacity-35 bg-cover bg-center pointer-events-none mix-blend-luminosity"
            style={{ backgroundImage: `url(${ASSET_IMAGES.seasonalBanner})` }}
          />
          <div className="relative z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-sans uppercase tracking-widest backdrop-blur-sm mb-2 text-stone-200">
              Seasonal Curation
            </span>
            <h3 className="font-serif text-[24px] font-bold leading-tight max-w-[220px]">
              The Summer Radiance Ritual
            </h3>
            <p className="font-sans text-[12px] text-stone-300 mt-1 max-w-[240px] leading-relaxed">
              Enjoy 20% off bespoke luxury hair revitalisation & scalp therapies.
            </p>
            <button
              type="button"
              onClick={() => onNavigateScreen('catalog')}
              className="mt-4 px-4 py-2 bg-white text-[#1E1424] rounded-xl font-sans text-[13px] font-semibold flex items-center gap-1.5 shadow-md hover:bg-stone-100 transition-colors cursor-pointer"
            >
              Explore Rituals
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Bespoke Categories */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="font-sans text-[18px] font-bold text-[#1E1424]">Bespoke Categories</h3>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="text-[12px] font-sans font-semibold text-amber-900 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat.id)}
                  className={`p-2.5 rounded-2xl border transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100 border-[#1E1424] shadow-xs scale-105'
                      : 'bg-white border-[#1E1424]/10 shadow-xs hover:border-[#1E1424]/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 mx-auto rounded-xl ${cat.bg} flex items-center justify-center ${cat.text} mb-1`}
                  >
                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  </div>
                  <span className="font-sans text-[11px] font-medium text-[#1E1424] block truncate">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Salons */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="font-sans text-[18px] font-bold text-[#1E1424]">Featured Salons</h3>
            <span className="text-[12px] font-sans text-[#1E1424]/60">Bandra & Vicinity</span>
          </div>

          <div className="space-y-3">
            {filteredSalons.map((salon) => {
              const isSaved = savedSalons.includes(salon.id);
              return (
                <div
                  key={salon.id}
                  onClick={() => onNavigateScreen('catalog')}
                  className="bg-white rounded-2xl border border-[#1E1424]/10 overflow-hidden shadow-xs cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="h-32 bg-stone-300 relative overflow-hidden">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#1E1424]/85 text-white font-sans text-[10px] uppercase font-bold tracking-wider backdrop-blur-xs">
                      Top Rated
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(salon.id, e)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1E1424] hover:bg-white transition-colors"
                      title="Save salon"
                    >
                      <span
                        className={`material-symbols-outlined text-sm ${
                          isSaved ? 'text-amber-800 font-bold' : ''
                        }`}
                      >
                        {isSaved ? 'bookmark_added' : 'bookmark'}
                      </span>
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-white/95 font-sans text-[10px] text-[#1E1424] font-medium shadow-xs">
                      {salon.distance} • Pali Hill
                    </span>
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div>
                      <h4 className="font-sans text-[16px] font-semibold text-[#1E1424]">
                        {salon.name}
                      </h4>
                      <p className="font-sans text-[12px] text-[#1E1424]/70 flex items-center gap-1">
                        ★ {salon.rating}{' '}
                        <span className="text-[#1E1424]/40">({salon.reviewsCount} reviews)</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#1E1424]/50 block">
                        Starts at
                      </span>
                      <span className="font-sans text-[18px] font-bold text-[#1E1424] tabular-nums">
                        ₹{salon.startingPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location Picker Sheet Modal */}
      {showLocationPicker && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/60 backdrop-blur-xs flex items-end justify-center p-3">
          <div className="bg-[#fff9ef] rounded-t-3xl rounded-b-2xl p-5 max-w-[370px] w-full border border-stone-300 shadow-2xl text-[#1E1424] animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-sans text-[16px] font-bold">Select Atelier Region</h3>
              <button
                type="button"
                onClick={() => setShowLocationPicker(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-1.5 my-3">
              {locations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationPicker(false);
                  }}
                  className={`w-full p-3 rounded-xl text-left font-sans text-[13px] flex items-center justify-between transition-colors ${
                    selectedLocation === loc
                      ? 'bg-[#1E1424] text-white font-semibold'
                      : 'bg-white hover:bg-stone-100 text-[#1E1424]'
                  }`}
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && (
                    <span className="material-symbols-outlined text-sm text-amber-200">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Concierge Notifications Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full border border-stone-300 shadow-2xl text-[#1E1424]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif text-[18px] font-bold">Concierge Alerts</h3>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white border border-[#1E1424]/10 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-[11px] mb-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>Tomorrow at 3:30 PM</span>
                </div>
                <h5 className="font-sans text-[13px] font-bold">Appointment Confirmation</h5>
                <p className="font-sans text-[11px] text-[#1E1424]/70">
                  Master Art Director Aarav Mehta has prepared your custom tone formulas for Maison de Beauté Luxe.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#1E1424]/10 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-[11px] mb-1">
                  <span className="material-symbols-outlined text-sm">redeem</span>
                  <span>Privilege Reward</span>
                </div>
                <h5 className="font-sans text-[13px] font-bold">Complimentary Caviar Treatment</h5>
                <p className="font-sans text-[11px] text-[#1E1424]/70">
                  Your summer balance has unlocked a complimentary 15-min scalp revitalisation ritual.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowNotifications(false)}
              className="mt-4 w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-[13px] font-semibold"
            >
              Dismiss Alerts
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={onTabChange}
        onNavigateScreen={onNavigateScreen}
      />
    </div>
  );
};
