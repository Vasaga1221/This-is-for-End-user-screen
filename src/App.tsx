/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId, DeviceMode, TabId, ServiceItem, Appointment } from './types';
import { SERVICES_CATALOG, UPCOMING_APPOINTMENT_DATA, STYLISTS, PRIMARY_SALON } from './data/mockData';
import { DeviceFrame } from './components/common/DeviceFrame';
import { TopShowcaseHeader } from './components/common/TopShowcaseHeader';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CatalogScreen } from './components/screens/CatalogScreen';
import { BookingScreen } from './components/screens/BookingScreen';
import { PassScreen } from './components/screens/PassScreen';
import { ReactNativeExportModal } from './components/modals/ReactNativeExportModal';

export default function App() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('artboard');
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([SERVICES_CATALOG[0]]);
  const [hasAddon, setHasAddon] = useState<boolean>(false);
  const [isReactNativeModalOpen, setIsReactNativeModalOpen] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<Appointment>(UPCOMING_APPOINTMENT_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showGlobalToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const handleToggleAddon = () => {
    setHasAddon((prev) => !prev);
  };

  const handleBookingComplete = () => {
    const service = selectedServices[0] || SERVICES_CATALOG[0];
    const subtotal = selectedServices.reduce((sum, s) => sum + s.price, 0) + (hasAddon ? 850 : 0);
    const tax = Math.round(subtotal * 0.18);
    const promo = 1000;
    const grand = Math.max(0, subtotal + tax - promo);

    setBookingData({
      id: `aur-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingRef: `#AUR-${Math.floor(10000 + Math.random() * 90000)}`,
      salon: PRIMARY_SALON,
      service,
      hasAddon,
      stylist: STYLISTS[0],
      dateStr: 'Friday, Oct 17, 2025',
      timeStr: '1:30 PM (IST)',
      countdown: 'In 22 hours',
      totalAmount: subtotal,
      taxAmount: tax,
      discountAmount: promo,
      grandTotal: grand,
      promoCode: 'AURALUXE',
      paymentMethod: 'upi',
      status: 'confirmed',
    });

    setActiveTab('bookings');
    showGlobalToast('Appointment Confirmed! Priority pass generated.');
  };

  return (
    <div className="min-h-screen bg-[#120c17] text-stone-100 p-4 md:p-8 flex flex-col font-sans">
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#C59B7D] text-[#1E1424] font-semibold text-xs py-2.5 px-4 rounded-xl shadow-2xl flex items-center gap-2 border border-amber-200 animate-in fade-in">
          <span className="material-symbols-outlined text-sm">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Showcase & Device Mode Switcher */}
      <TopShowcaseHeader
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
        onOpenReactNativeModal={() => setIsReactNativeModalOpen(true)}
      />

      {/* Main Display Area */}
      {deviceMode === 'artboard' ? (
        /* HORIZONTAL ARTBOARD MODE (All 5 screens simultaneously like designer artboard) */
        <main className="max-w-[100vw] overflow-x-auto pb-12 pt-2 custom-scrollbar">
          <div className="flex items-start gap-8 min-w-max px-2">
            {/* SCREEN 1: AUTHENTICATION */}
            <DeviceFrame
              deviceMode="artboard"
              screenNumber={1}
              titleBadge="Authentication"
              screenSubtitle="Auth & Onboarding"
            >
              <AuthScreen
                onSuccessAuth={() => {
                  showGlobalToast('Welcome back, Ananya! Logged in as VIP.');
                  setActiveScreen('home');
                }}
                onNavigateScreen={setActiveScreen}
              />
            </DeviceFrame>

            {/* SCREEN 2: DISCOVERY */}
            <DeviceFrame
              deviceMode="artboard"
              screenNumber={2}
              titleBadge="Discovery"
              screenSubtitle="Home & Curations"
            >
              <HomeScreen
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onNavigateScreen={setActiveScreen}
              />
            </DeviceFrame>

            {/* SCREEN 3: SERVICE CATALOG */}
            <DeviceFrame
              deviceMode="artboard"
              screenNumber={3}
              titleBadge="Service Catalog"
              screenSubtitle="Salon Profile & Menu"
            >
              <CatalogScreen
                onNavigateScreen={setActiveScreen}
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                hasAddon={hasAddon}
                onToggleAddon={handleToggleAddon}
              />
            </DeviceFrame>

            {/* SCREEN 4: GUIDED BOOKING */}
            <DeviceFrame
              deviceMode="artboard"
              screenNumber={4}
              titleBadge="Reservation"
              screenSubtitle="Slot & Payment"
            >
              <BookingScreen
                onNavigateScreen={setActiveScreen}
                selectedServices={selectedServices}
                hasAddon={hasAddon}
                onBookingComplete={handleBookingComplete}
              />
            </DeviceFrame>

            {/* SCREEN 5: DIGITAL ACCESS PASS */}
            <DeviceFrame
              deviceMode="artboard"
              screenNumber={5}
              titleBadge="Access Pass"
              screenSubtitle="Appointments & QR"
            >
              <PassScreen
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onNavigateScreen={setActiveScreen}
                bookingData={bookingData}
              />
            </DeviceFrame>
          </div>
        </main>
      ) : (
        /* SINGLE INTERACTIVE DEVICE SIMULATOR (iOS or Android) */
        <main className="flex-1 flex flex-col items-center justify-center py-4">
          <DeviceFrame deviceMode={deviceMode}>
            {activeScreen === 'auth' && (
              <AuthScreen
                onSuccessAuth={() => {
                  showGlobalToast('Welcome back, Ananya!');
                  setActiveScreen('home');
                }}
                onNavigateScreen={setActiveScreen}
              />
            )}

            {activeScreen === 'home' && (
              <HomeScreen
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onNavigateScreen={setActiveScreen}
              />
            )}

            {activeScreen === 'catalog' && (
              <CatalogScreen
                onNavigateScreen={setActiveScreen}
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                hasAddon={hasAddon}
                onToggleAddon={handleToggleAddon}
              />
            )}

            {activeScreen === 'booking' && (
              <BookingScreen
                onNavigateScreen={setActiveScreen}
                selectedServices={selectedServices}
                hasAddon={hasAddon}
                onBookingComplete={handleBookingComplete}
              />
            )}

            {activeScreen === 'pass' && (
              <PassScreen
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onNavigateScreen={setActiveScreen}
                bookingData={bookingData}
              />
            )}
          </DeviceFrame>
        </main>
      )}

      {/* Cross-Platform React Native Code Exporter Modal */}
      <ReactNativeExportModal
        isOpen={isReactNativeModalOpen}
        onClose={() => setIsReactNativeModalOpen(false)}
      />
    </div>
  );
}
