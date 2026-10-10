import React, { useState } from 'react';
import { ScreenId, ServiceItem, Stylist } from '../../types';
import {
  PRIMARY_SALON,
  STYLISTS,
  AVAILABLE_DATES,
  TIME_SLOTS,
} from '../../data/mockData';

interface BookingScreenProps {
  onNavigateScreen: (screen: ScreenId) => void;
  selectedServices: ServiceItem[];
  hasAddon: boolean;
  onBookingComplete: () => void;
}

export const BookingScreen: React.FC<BookingScreenProps> = ({
  onNavigateScreen,
  selectedServices,
  hasAddon,
  onBookingComplete,
}) => {
  const [selectedStylist, setSelectedStylist] = useState<Stylist>(STYLISTS[0]); // Aarav Mehta
  const [selectedDate, setSelectedDate] = useState('17');
  const [selectedTime, setSelectedTime] = useState('01:30 PM');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'counter'>('upi');
  const [appliedPromo, setAppliedPromo] = useState<string>('AURALUXE');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showCalendarModal, setShowCalendarModal] = useState<boolean>(false);

  const primaryService = selectedServices[0] || {
    id: 'balayage-gloss',
    name: 'Sun-Kissed Balayage & Gloss',
    duration: '150m (2.5 hrs)',
    price: 7500,
  };

  const serviceTotal = selectedServices.reduce((sum, s) => sum + s.price, 0) + (hasAddon ? 850 : 0);
  const taxAmount = Math.round(serviceTotal * 0.18);
  const promoDiscount = appliedPromo === 'AURALUXE' ? 1000 : 0;
  const grandTotal = Math.max(0, serviceTotal + taxAmount - promoDiscount);

  const handleConfirmAndBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onBookingComplete();
      onNavigateScreen('pass');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#1E1424]/10 bg-[#fff9ef] flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateScreen('catalog')}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E1424] shadow-xs hover:bg-stone-50 cursor-pointer"
            title="Back to catalog"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <h2 className="font-sans text-[20px] font-bold text-[#1E1424]">
            Schedule Appointment
          </h2>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-sans text-[11px] font-semibold">
          Step 2/3
        </span>
      </div>

      <div className="px-5 py-3 space-y-4 flex-1">
        {/* Selected service summary */}
        <div className="p-3 rounded-xl bg-white border border-[#1E1424]/10 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] font-sans uppercase font-bold text-[#1E1424]/50">
              {PRIMARY_SALON.name}
            </span>
            <h4 className="font-sans text-[14px] font-bold text-[#1E1424]">
              {primaryService.name}
            </h4>
            <span className="font-sans text-[12px] text-[#1E1424]/70">
              {primaryService.duration}
              {hasAddon ? ' • Includes Scalp Exfoliation' : ''}
            </span>
          </div>
          <span className="font-sans text-[16px] font-bold text-[#1E1424] tabular-nums">
            ₹{serviceTotal.toLocaleString()}
          </span>
        </div>

        {/* Stylist selection */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-sans text-[15px] font-bold text-[#1E1424]">
              Select Master Stylist
            </h3>
            <span className="font-sans text-[11px] text-[#1E1424]/60">
              {STYLISTS.length} Available
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {/* Any Specialist */}
            <div
              onClick={() => setSelectedStylist(STYLISTS[1])}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-2 ${
                selectedStylist.id === STYLISTS[1].id
                  ? 'border-2 border-[#1E1424] bg-stone-50 shadow-xs'
                  : 'border-[#1E1424]/15 bg-white hover:border-[#1E1424]/40'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-[#1E1424] text-xs font-bold shrink-0">
                ✨
              </div>
              <div className="overflow-hidden">
                <h5 className="font-sans text-[12px] font-bold text-[#1E1424] truncate">
                  Any Specialist
                </h5>
                <span className="text-[10px] text-[#1E1424]/60 block truncate">
                  Fastest booking
                </span>
              </div>
            </div>

            {/* Aarav Mehta */}
            <div
              onClick={() => setSelectedStylist(STYLISTS[0])}
              className={`p-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 relative ${
                selectedStylist.id === STYLISTS[0].id
                  ? 'border-[#1E1424] bg-stone-50 shadow-xs'
                  : 'border-[#1E1424]/15 bg-white hover:border-[#1E1424]/40'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 absolute top-2 right-2"></span>
              <div className="w-8 h-8 rounded-full bg-amber-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                AM
              </div>
              <div className="overflow-hidden">
                <h5 className="font-sans text-[12px] font-bold text-[#1E1424] truncate">
                  Aarav Mehta
                </h5>
                <span className="text-[10px] text-amber-900 font-medium block truncate">
                  Master Art Director
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Date strip */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-sans text-[15px] font-bold text-[#1E1424]">October 2025</h3>
            <button
              type="button"
              onClick={() => setShowCalendarModal(true)}
              className="text-[12px] text-amber-900 font-sans font-semibold hover:underline cursor-pointer"
            >
              Full Calendar ›
            </button>
          </div>
          <div className="flex gap-2">
            {AVAILABLE_DATES.slice(0, 4).map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex-1 py-2 rounded-xl transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#1E1424] text-white shadow-xs'
                      : 'bg-white border border-[#1E1424]/10 text-[#1E1424] hover:border-[#1E1424]/30'
                  }`}
                >
                  <span
                    className={`text-[10px] font-sans uppercase block ${
                      isSelected ? 'text-amber-200' : 'text-[#1E1424]/60'
                    }`}
                  >
                    {d.day}
                  </span>
                  <span className="text-[15px] font-bold font-sans tabular-nums">
                    {d.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-sans text-[15px] font-bold text-[#1E1424] mb-2">
            Available Time Slots
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.slice(0, 4).map((slot) => {
              const isSelected = selectedTime === slot.time;
              const isBooked = slot.status === 'booked';

              if (isBooked) {
                return (
                  <div
                    key={slot.time}
                    className="py-2 px-3 rounded-xl bg-stone-100 text-[#1E1424]/40 font-sans text-[13px] line-through text-left cursor-not-allowed select-none"
                  >
                    {slot.time}
                  </div>
                );
              }

              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedTime(slot.time)}
                  className={`py-2 px-3 rounded-xl font-sans text-[13px] text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1E1424] text-white font-semibold shadow-xs'
                      : 'bg-white border border-[#1E1424]/15 font-medium text-[#1E1424] hover:border-[#1E1424]/40'
                  }`}
                >
                  <span>{slot.time}</span>
                  {isSelected ? (
                    <span className="material-symbols-outlined text-xs">check</span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 font-bold ml-1">● Open</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Invoice breakdown */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#1E1424]/10 space-y-2 font-sans text-[13px] shadow-xs">
          <div className="flex justify-between text-[#1E1424]/70">
            <span>Service Total</span>
            <span className="tabular-nums font-semibold text-[#1E1424]">
              ₹{serviceTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-[#1E1424]/70">
            <span>Taxes & GST (18%)</span>
            <span className="tabular-nums font-semibold text-[#1E1424]">
              ₹{taxAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-emerald-700 font-medium bg-emerald-50 p-1.5 rounded-lg border border-emerald-200/50">
            <span className="flex items-center gap-1">
              <span>Privilege Promo (AURALUXE)</span>
            </span>
            <span className="tabular-nums font-bold">-₹{promoDiscount.toLocaleString()}</span>
          </div>
          <div className="border-t border-[#1E1424]/10 pt-2 flex justify-between items-center text-[15px] font-bold text-[#1E1424]">
            <span>Grand Total</span>
            <span className="text-[20px] tabular-nums font-bold">
              ₹{grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment selection */}
        <div>
          <span className="font-sans text-[12px] font-medium uppercase tracking-wider text-[#1E1424]/70 mb-1.5 block">
            Payment Mode
          </span>
          <div
            onClick={() => setPaymentMode('upi')}
            className={`p-3 rounded-xl border-2 transition-all cursor-pointer bg-white flex items-center justify-between shadow-xs ${
              paymentMode === 'upi'
                ? 'border-[#1E1424]'
                : 'border-[#1E1424]/15 hover:border-[#1E1424]/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-lg text-emerald-700">
                qr_code_scanner
              </span>
              <div>
                <h5 className="font-sans text-[13px] font-bold text-[#1E1424]">Instant UPI</h5>
                <span className="text-[11px] text-[#1E1424]/60">
                  Google Pay / PhonePe / Paytm
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-base text-[#1E1424]">
              {paymentMode === 'upi' ? 'radio_button_checked' : 'radio_button_unchecked'}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="p-4 bg-white border-t border-[#1E1424]/10 sticky bottom-0 z-20 shadow-md">
        <button
          type="button"
          onClick={handleConfirmAndBook}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#1E1424] hover:bg-[#2b1c34] active:scale-[0.99] text-white rounded-xl font-sans text-[15px] font-semibold flex items-center justify-between px-4 shadow-md transition-all cursor-pointer"
        >
          <span>{isProcessing ? 'Confirming with Concierge...' : 'Confirm & Book'}</span>
          <span className="font-bold text-[16px] tabular-nums">
            ₹{grandTotal.toLocaleString()} ›
          </span>
        </button>
      </div>

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full border border-stone-300 shadow-2xl text-[#1E1424]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-serif text-[18px] font-bold">Select Date — October</h3>
              <button
                type="button"
                onClick={() => setShowCalendarModal(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 my-4">
              {AVAILABLE_DATES.map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => {
                    setSelectedDate(d.date);
                    setShowCalendarModal(false);
                  }}
                  className={`p-2 rounded-xl text-center border font-sans text-xs ${
                    selectedDate === d.date
                      ? 'bg-[#1E1424] text-white font-bold'
                      : 'bg-white hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="text-[10px] text-stone-500">{d.day}</div>
                  <div className="text-sm font-bold">{d.date}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
