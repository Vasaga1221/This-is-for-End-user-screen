import React, { useState } from 'react';
import { ScreenId, ServiceItem } from '../../types';
import { PRIMARY_SALON, SERVICES_CATALOG, ASSET_IMAGES } from '../../data/mockData';

interface CatalogScreenProps {
  onNavigateScreen: (screen: ScreenId) => void;
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  hasAddon: boolean;
  onToggleAddon: () => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  onNavigateScreen,
  selectedServices,
  onToggleService,
  hasAddon,
  onToggleAddon,
}) => {
  const [activeCategory, setActiveCategory] = useState<'hair' | 'spa' | 'facial'>('hair');
  const [isFavorited, setIsFavorited] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const salon = PRIMARY_SALON;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const calculateSubtotal = () => {
    const base = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const addonPrice = hasAddon ? 850 : 0;
    return base + addonPrice;
  };

  const filteredServices = SERVICES_CATALOG.filter((s) => {
    if (activeCategory === 'hair') return s.category === 'hair';
    if (activeCategory === 'spa') return s.category === 'spa';
    if (activeCategory === 'facial') return s.category === 'facial';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col justify-between relative">
      {/* Toast alert */}
      {toastMessage && (
        <div className="absolute top-16 left-6 right-6 z-50 bg-[#1E1424] text-white text-xs font-sans py-2 px-4 rounded-xl shadow-lg flex items-center justify-between animate-in fade-in">
          <span>{toastMessage}</span>
          <span className="material-symbols-outlined text-xs text-amber-300">check</span>
        </div>
      )}

      {/* Hero cover image */}
      <div className="h-44 bg-stone-400 relative overflow-hidden shrink-0">
        <img
          src={salon.heroImage || ASSET_IMAGES.heroCover}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Top Floating Controls */}
        <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-10">
          <button
            type="button"
            onClick={() => onNavigateScreen('home')}
            className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1424] hover:bg-white shadow-xs cursor-pointer"
            title="Back to home"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => showToast('Atelier link copied to clipboard')}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1E1424] hover:bg-white shadow-xs cursor-pointer"
              title="Share salon"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsFavorited(!isFavorited);
                showToast(isFavorited ? 'Removed from saved' : 'Saved to your luxury wishlist');
              }}
              className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-xs cursor-pointer"
              title="Favorite"
            >
              <span
                className={`material-symbols-outlined text-sm ${
                  isFavorited ? 'text-rose-600 fill' : 'text-[#1E1424]'
                }`}
              >
                {isFavorited ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
        </div>

        {/* Hero bottom overlay metadata */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white z-10">
          <button
            type="button"
            onClick={() => setPhotoIndex((prev) => (prev % salon.totalPhotos) + 1)}
            className="px-2 py-0.5 rounded-md bg-black/50 hover:bg-black/70 text-[10px] font-sans backdrop-blur-sm flex items-center gap-1 cursor-pointer"
          >
            <span>📷 {photoIndex}/{salon.totalPhotos} Photos</span>
          </button>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/90 text-stone-900 text-[10px] font-sans font-bold uppercase tracking-wider backdrop-blur-xs">
            Verified Luxury Partner
          </span>
        </div>
      </div>

      {/* Salon info */}
      <div className="px-5 pt-3 pb-2.5 border-b border-[#1E1424]/10 bg-[#fff9ef]">
        <h2 className="font-serif text-[22px] font-bold text-[#1E1424] leading-tight">
          {salon.name}
        </h2>
        <div className="flex items-center gap-2 mt-1 font-sans text-[12px] text-[#1E1424]/80">
          <span className="font-bold text-amber-900">★ {salon.rating} ({salon.reviewsCount} reviews)</span>
          <span>•</span>
          <span className="uppercase tracking-wider text-[11px] font-semibold text-[#1E1424]/70">
            {salon.tier}
          </span>
        </div>
        <p className="font-sans text-[12px] text-[#1E1424]/70 mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">location_on</span>
          {salon.location} • {salon.distance}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-sans font-medium flex items-center gap-1 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            {salon.openingHours}
          </span>
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="px-5 py-2.5 flex gap-2 overflow-x-auto custom-scrollbar border-b border-[#1E1424]/10 bg-white sticky top-0 z-20">
        <button
          type="button"
          onClick={() => setActiveCategory('hair')}
          className={`px-3 py-1 rounded-xl font-sans text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
            activeCategory === 'hair'
              ? 'bg-[#1E1424] text-white font-semibold'
              : 'bg-[#1E1424]/5 text-[#1E1424] font-medium hover:bg-[#1E1424]/10'
          }`}
        >
          Hair Care & Styling
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('spa')}
          className={`px-3 py-1 rounded-xl font-sans text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
            activeCategory === 'spa'
              ? 'bg-[#1E1424] text-white font-semibold'
              : 'bg-[#1E1424]/5 text-[#1E1424] font-medium hover:bg-[#1E1424]/10'
          }`}
        >
          Signature Spa
        </button>
        <button
          type="button"
          onClick={() => setActiveCategory('facial')}
          className={`px-3 py-1 rounded-xl font-sans text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
            activeCategory === 'facial'
              ? 'bg-[#1E1424] text-white font-semibold'
              : 'bg-[#1E1424]/5 text-[#1E1424] font-medium hover:bg-[#1E1424]/10'
          }`}
        >
          Facial Rituals
        </button>
      </div>

      {/* Services List */}
      <div className="px-5 py-3 space-y-3 flex-1 overflow-y-auto">
        {filteredServices.map((service) => {
          const isSelected = selectedServices.some((s) => s.id === service.id);

          return (
            <div
              key={service.id}
              className={`p-3.5 rounded-2xl bg-white transition-all ${
                isSelected
                  ? 'border-2 border-[#1E1424] shadow-xs relative ring-1 ring-[#1E1424]/10'
                  : 'border border-[#1E1424]/10 shadow-xs hover:border-[#1E1424]/30'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#1E1424] text-white font-sans text-[9px] uppercase tracking-wider font-bold shadow-xs">
                  Current Selection
                </span>
              )}

              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <h4 className="font-sans text-[16px] font-semibold text-[#1E1424]">
                    {service.name}
                  </h4>
                  <div className="flex items-center gap-2 font-sans text-[12px] text-[#1E1424]/60 mt-0.5">
                    <span>{service.duration}</span>
                    <span>•</span>
                    <span className="font-sans text-[16px] font-bold text-[#1E1424] tabular-nums">
                      ₹{service.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleService(service)}
                  className={`px-3 py-1 rounded-lg font-sans text-[12px] font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E1424] text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-[#1E1424] border border-[#1E1424]/15'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span className="material-symbols-outlined text-xs">check</span> Added
                    </>
                  ) : (
                    '+ Add'
                  )}
                </button>
              </div>

              <p className="font-sans text-[12px] text-[#1E1424]/75 mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* Add-on prompt if service has addon */}
              {service.addon && isSelected && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#f8f2e7] border border-[#1E1424]/10 flex items-center justify-between">
                  <span className="font-sans text-[11px] text-[#1E1424]/85 font-medium">
                    ✨ Add-on: {service.addon.name} (+₹{service.addon.price})
                  </span>
                  <button
                    type="button"
                    onClick={onToggleAddon}
                    className={`font-sans text-[11px] font-bold px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                      hasAddon
                        ? 'bg-amber-900 text-white'
                        : 'text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    {hasAddon ? '✓ INCLUDED' : '+ ADD'}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Flow CTA Bar */}
      <div className="p-4 bg-white border-t border-[#1E1424]/10 sticky bottom-0 z-30 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-[12px] text-[#1E1424]/70">
            {selectedServices.length} Service{selectedServices.length > 1 ? 's' : ''} Selected
            {hasAddon ? ' (+1 Add-on)' : ''}
          </span>
          <span className="font-sans text-[18px] font-bold text-[#1E1424] tabular-nums">
            ₹{calculateSubtotal().toLocaleString()}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (selectedServices.length === 0) {
              onToggleService(SERVICES_CATALOG[0]);
            }
            onNavigateScreen('booking');
          }}
          className="w-full py-3 bg-[#1E1424] hover:bg-[#2b1c34] active:scale-[0.99] text-white rounded-xl font-sans text-[15px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>Proceed to Stylist & Slot</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
