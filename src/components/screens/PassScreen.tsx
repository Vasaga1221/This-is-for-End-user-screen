import React, { useState } from 'react';
import { ScreenId, TabId, Appointment } from '../../types';
import { UPCOMING_APPOINTMENT_DATA, PREVIOUS_VISITS } from '../../data/mockData';
import { BottomNav } from '../common/BottomNav';

interface PassScreenProps {
  onNavigateScreen: (screen: ScreenId) => void;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  bookingData?: Appointment;
}

export const PassScreen: React.FC<PassScreenProps> = ({
  onNavigateScreen,
  activeTab,
  onTabChange,
  bookingData = UPCOMING_APPOINTMENT_DATA,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const copyBookingRef = () => {
    navigator.clipboard?.writeText(bookingData.bookingRef);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top bar */}
      <div className="px-5 py-3 border-b border-[#1E1424]/10 bg-[#fff9ef] flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-1.5 text-[#1E1424]">
          <span className="font-serif text-[18px] font-bold">Aura Salon</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-sans text-[11px] font-semibold">
          1 Active Pass
        </span>
      </div>

      <div className="px-5 py-4 space-y-4 flex-1">
        <h2 className="font-sans text-[24px] font-bold text-[#1E1424]">
          My Appointments
        </h2>

        {/* Digital Pass Card */}
        <div className="bg-white rounded-3xl border border-[#1E1424]/15 shadow-sm overflow-hidden">
          {/* Obsidian Card Header */}
          <div className="p-4 bg-[#1E1424] text-white flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold tracking-widest uppercase text-amber-200">
              DIGITAL ACCESS PASS
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Confirmed
            </span>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-sans text-[18px] font-bold text-[#1E1424]">
                  {bookingData.salon.name}
                </h3>
                <p className="font-sans text-[12px] text-[#1E1424]/70">
                  {bookingData.salon.location}
                </p>
              </div>
              <button
                type="button"
                onClick={copyBookingRef}
                className="text-[11px] font-sans font-mono bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-md text-[#1E1424]/80 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Click to copy booking reference"
              >
                <span>{bookingData.bookingRef}</span>
                <span className="material-symbols-outlined text-[12px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>

            {/* Schedule highlight */}
            <div className="p-3 rounded-2xl bg-[#f7eedf] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-xl text-amber-900">
                  schedule
                </span>
                <div>
                  <h5 className="font-sans text-[13px] font-bold text-[#1E1424]">
                    {bookingData.dateStr}
                  </h5>
                  <span className="font-sans text-[12px] text-[#1E1424]/70">
                    {bookingData.timeStr}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white text-amber-900 font-sans text-[11px] font-bold shadow-xs">
                {bookingData.countdown}
              </span>
            </div>

            {/* Stylist Info */}
            <div className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1E1424]/10 bg-white">
              <div className="w-10 h-10 rounded-full bg-amber-950 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {bookingData.stylist.initials}
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-[10px] font-sans uppercase font-bold text-amber-900 block truncate">
                  Assigned Master Stylist
                </span>
                <h4 className="font-sans text-[14px] font-bold text-[#1E1424] truncate">
                  {bookingData.stylist.name}
                </h4>
                <p className="font-sans text-[11px] text-[#1E1424]/60 truncate">
                  {bookingData.stylist.title}
                </p>
              </div>
            </div>

            {/* Checkin QR */}
            <div className="border-t-2 border-dashed border-[#1E1424]/20 pt-3 text-center">
              <div
                onClick={() => setShowQrModal(true)}
                className="w-28 h-28 mx-auto bg-stone-100 rounded-xl p-2 border border-[#1E1424]/15 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                title="Tap to enlarge QR Pass"
              >
                {/* Visual SVG QR representation */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#1E1424]">
                  {/* Outer corner squares */}
                  <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                  <rect x="13" y="13" width="12" height="12" fill="currentColor" rx="2" />

                  <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                  <rect x="75" y="13" width="12" height="12" fill="currentColor" rx="2" />

                  <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                  <rect x="13" y="75" width="12" height="12" fill="currentColor" rx="2" />

                  {/* Inner data matrix dots */}
                  <rect x="42" y="8" width="8" height="8" fill="currentColor" rx="1" />
                  <rect x="54" y="16" width="8" height="8" fill="currentColor" rx="1" />
                  <rect x="42" y="28" width="12" height="8" fill="currentColor" rx="1" />

                  <rect x="8" y="44" width="8" height="12" fill="currentColor" rx="1" />
                  <rect x="24" y="48" width="12" height="8" fill="currentColor" rx="1" />

                  <rect x="44" y="44" width="16" height="16" fill="currentColor" rx="2" />
                  <rect x="68" y="44" width="8" height="8" fill="currentColor" rx="1" />
                  <rect x="84" y="48" width="8" height="12" fill="currentColor" rx="1" />

                  <rect x="42" y="68" width="12" height="8" fill="currentColor" rx="1" />
                  <rect x="60" y="76" width="8" height="12" fill="currentColor" rx="1" />
                  <rect x="76" y="68" width="16" height="8" fill="currentColor" rx="1" />
                  <rect x="76" y="84" width="16" height="8" fill="currentColor" rx="1" />
                </svg>
              </div>
              <span className="font-sans text-[11px] font-semibold text-[#1E1424]/70 mt-1 block">
                Scan at Front-Desk for Priority Check-In
              </span>
            </div>
          </div>

          {/* Quick action links */}
          <div className="grid grid-cols-3 border-t border-[#1E1424]/10 bg-stone-50 text-center font-sans text-[11px] font-semibold text-[#1E1424]">
            <button
              type="button"
              onClick={() => setShowDirectionsModal(true)}
              className="py-2.5 border-r border-[#1E1424]/10 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base mb-0.5">directions</span>
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCalendarModal(true)}
              className="py-2.5 border-r border-[#1E1424]/10 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base mb-0.5">event</span>
              <span>Add to Cal</span>
            </button>
            <button
              type="button"
              onClick={() => setShowContactModal(true)}
              className="py-2.5 flex flex-col items-center justify-center hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-base mb-0.5">call</span>
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Previous visits */}
        <div>
          <h3 className="font-sans text-[16px] font-bold text-[#1E1424] mb-2">
            Previous Visits
          </h3>
          <div className="space-y-2">
            {PREVIOUS_VISITS.map((visit) => (
              <div
                key={visit.id}
                className="p-3 rounded-xl bg-white border border-[#1E1424]/10 flex items-center justify-between shadow-xs"
              >
                <div>
                  <h4 className="font-sans text-[13px] font-bold text-[#1E1424]">
                    {visit.salon}
                  </h4>
                  <span className="font-sans text-[11px] text-[#1E1424]/60">
                    {visit.service} • {visit.date}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateScreen('catalog')}
                  className="px-2.5 py-1 rounded-lg bg-[#1E1424]/5 hover:bg-[#1E1424]/10 text-[#1E1424] font-sans text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  Re-book
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Zoom Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-6 max-w-[340px] w-full text-center border border-stone-300 shadow-2xl">
            <h3 className="font-serif text-[20px] font-bold text-[#1E1424]">
              Priority Reception Pass
            </h3>
            <p className="font-sans text-xs text-stone-600 mt-1">
              Present this pass upon arrival at Maison de Beauté Luxe.
            </p>
            <div className="w-48 h-48 mx-auto my-4 bg-white p-4 rounded-2xl border-2 border-[#1E1424] shadow-md flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1E1424]">
                <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                <rect x="13" y="13" width="12" height="12" fill="currentColor" rx="2" />
                <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                <rect x="75" y="13" width="12" height="12" fill="currentColor" rx="2" />
                <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
                <rect x="13" y="75" width="12" height="12" fill="currentColor" rx="2" />
                <rect x="44" y="44" width="16" height="16" fill="currentColor" rx="2" />
                <rect x="42" y="8" width="8" height="8" fill="currentColor" rx="1" />
                <rect x="54" y="16" width="8" height="8" fill="currentColor" rx="1" />
                <rect x="42" y="28" width="12" height="8" fill="currentColor" rx="1" />
                <rect x="60" y="76" width="8" height="12" fill="currentColor" rx="1" />
                <rect x="76" y="68" width="16" height="8" fill="currentColor" rx="1" />
              </svg>
            </div>
            <div className="font-mono text-xs font-bold text-[#1E1424] bg-stone-200/70 py-1 px-3 rounded-lg inline-block">
              {bookingData.bookingRef}
            </div>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Directions Modal */}
      {showDirectionsModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full text-[#1E1424] border border-stone-300 shadow-2xl">
            <h3 className="font-serif text-[18px] font-bold">Directions to Atelier</h3>
            <p className="font-sans text-xs text-stone-600 mt-1">
              Villa 14, Nargis Dutt Road, Pali Hill, Bandra West, Mumbai.
            </p>
            <div className="my-3 h-36 bg-stone-200 rounded-xl overflow-hidden border border-stone-300 relative flex items-center justify-center">
              <div className="text-center p-2">
                <span className="material-symbols-outlined text-3xl text-[#1E1424]">map</span>
                <span className="block text-xs font-semibold mt-1">1.2 km • 6 min drive</span>
                <span className="block text-[10px] text-stone-500">Valet parking provided complimentary</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDirectionsModal(false)}
              className="w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full text-center text-[#1E1424] border border-stone-300 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-2">
              <span className="material-symbols-outlined">event_available</span>
            </div>
            <h3 className="font-serif text-[18px] font-bold">Added to Calendar</h3>
            <p className="font-sans text-xs text-stone-600 mt-1">
              {bookingData.service.name} at Maison de Beauté Luxe has been scheduled for tomorrow at 1:30 PM.
            </p>
            <button
              type="button"
              onClick={() => setShowCalendarModal(false)}
              className="mt-4 w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full text-[#1E1424] border border-stone-300 shadow-2xl">
            <h3 className="font-serif text-[18px] font-bold">Concierge Direct Desk</h3>
            <p className="font-sans text-xs text-stone-600 mt-1">
              Reach the private host desk for custom dietary beverages or styling notes.
            </p>
            <div className="space-y-2 my-3 text-xs font-sans">
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex justify-between items-center">
                <span>Direct Hotline</span>
                <span className="font-bold font-mono">+91 (022) 2640-AURA</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex justify-between items-center">
                <span>WhatsApp VIP Desk</span>
                <span className="text-emerald-700 font-bold">Connected ●</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-xs font-semibold cursor-pointer"
            >
              Done
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
