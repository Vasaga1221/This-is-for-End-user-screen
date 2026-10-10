import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface AuthScreenProps {
  onSuccessAuth: () => void;
  onNavigateScreen?: (screen: ScreenId) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onSuccessAuth,
  onNavigateScreen,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [useOtp, setUseOtp] = useState<boolean>(false);
  const [identifier, setIdentifier] = useState<string>('+91 98765 43210');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string[]>(['8', '9', '2', '4', '', '']);
  const [showPrivilegeModal, setShowPrivilegeModal] = useState<boolean>(false);
  const [showOwnerModal, setShowOwnerModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccessAuth();
      if (onNavigateScreen) {
        onNavigateScreen('home');
      }
    }, 400);
  };

  return (
    <div className="px-6 pt-3 pb-8 flex-1 flex flex-col justify-between">
      <div>
        {/* Header bar */}
        <div className="flex items-center justify-between mt-1 mb-4">
          <button
            type="button"
            onClick={() => onNavigateScreen && onNavigateScreen('home')}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1E1424] shadow-xs hover:bg-stone-50 transition-colors"
            title="Back to sanctuary"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>

          <div className="px-3 py-1 rounded-full border border-[#1E1424]/15 text-[#1E1424] text-[11px] font-sans font-medium flex items-center gap-1 bg-white/60">
            <span className="material-symbols-outlined text-xs text-amber-700">spa</span>
            <span>HAUTE BEAUTÉ CONCIERGE</span>
          </div>

          <button
            type="button"
            onClick={() => setShowPrivilegeModal(true)}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1E1424] shadow-xs hover:bg-stone-50 transition-colors"
            title="Concierge Assistance"
          >
            <span className="material-symbols-outlined text-sm">help</span>
          </button>
        </div>

        {/* Masthead */}
        <div className="text-center my-4">
          <h2 className="font-serif text-[34px] font-bold text-[#1E1424] leading-tight tracking-tight">
            Aura Salon
          </h2>
          <p className="font-sans text-[13px] text-[#1E1424]/70 mt-1 max-w-[260px] mx-auto leading-relaxed">
            Immerse in bespoke hair couture, restorative rituals, and mindful artisan sanctuary.
          </p>
        </div>

        {/* Toggle */}
        <div className="bg-[#1E1424]/5 p-1 rounded-2xl flex items-center mb-5 border border-[#1E1424]/10">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2.5 rounded-xl font-sans text-[14px] transition-all ${
              authMode === 'signin'
                ? 'bg-white font-semibold text-[#1E1424] shadow-xs'
                : 'font-medium text-[#1E1424]/60 hover:text-[#1E1424]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2.5 rounded-xl font-sans text-[14px] transition-all ${
              authMode === 'signup'
                ? 'bg-white font-semibold text-[#1E1424] shadow-xs'
                : 'font-medium text-[#1E1424]/60 hover:text-[#1E1424]'
            }`}
          >
            Register / Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-[12px] font-medium uppercase tracking-wider text-[#1E1424]/70 mb-1.5">
              Mobile Number or Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#1E1424]/50 text-base">
                call
              </span>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#1E1424]/15 text-[#1E1424] font-sans text-[14px] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C59B7D]/40"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          {!useOtp ? (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-sans text-[12px] font-medium uppercase tracking-wider text-[#1E1424]/70">
                  Master Password
                </label>
                <button
                  type="button"
                  onClick={() => setUseOtp(true)}
                  className="font-sans text-[12px] text-amber-800 font-semibold cursor-pointer hover:underline"
                >
                  Use OTP instead
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-3 text-[#1E1424]/50 text-base">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-[#1E1424]/15 text-[#1E1424] font-sans text-[14px] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C59B7D]/40"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="material-symbols-outlined absolute right-3.5 top-3 text-[#1E1424]/50 text-base hover:text-[#1E1424]"
                >
                  {showPassword ? 'visibility_off' : 'visibility'}
                </button>
              </div>
              <div className="text-right mt-1.5">
                <span className="font-sans text-[12px] text-[#1E1424]/60 underline cursor-pointer hover:text-[#1E1424]">
                  Forgot Password?
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="font-sans text-[12px] font-medium uppercase tracking-wider text-[#1E1424]/70">
                  One-Time Passcode
                </label>
                <button
                  type="button"
                  onClick={() => setUseOtp(false)}
                  className="font-sans text-[12px] text-amber-800 font-semibold cursor-pointer hover:underline"
                >
                  Use Password
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otpCode[index] || ''}
                    onChange={(e) => {
                      const newOtp = [...otpCode];
                      newOtp[index] = e.target.value;
                      setOtpCode(newOtp);
                    }}
                    className="w-full h-11 text-center bg-white rounded-xl border border-[#1E1424]/20 text-[#1E1424] font-mono text-base font-bold shadow-xs focus:border-[#C59B7D] focus:ring-1 focus:ring-[#C59B7D]"
                  />
                ))}
              </div>
              <div className="text-right mt-1.5">
                <span className="font-sans text-[11px] text-amber-800 font-semibold cursor-pointer">
                  Resend OTP in 38s
                </span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#1E1424] hover:bg-[#2e1f38] active:scale-[0.99] text-white rounded-xl font-sans text-[15px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            {isLoading ? (
              <span>Entering Sanctuary...</span>
            ) : (
              <>
                <span>Sign In to Sanctuary</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#1E1424]/10"></div>
          </div>
          <span className="relative px-3 bg-[#fff9ef] text-[11px] font-sans uppercase tracking-widest text-[#1E1424]/50">
            Or continue with
          </span>
        </div>

        {/* 3P Quick Auth */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-4 bg-white hover:bg-stone-50 rounded-xl border border-[#1E1424]/10 flex items-center justify-center gap-2 font-sans text-[13px] font-medium text-[#1E1424] shadow-xs transition-colors"
          >
            <span className="font-bold text-red-500">G</span> Google
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-4 bg-white hover:bg-stone-50 rounded-xl border border-[#1E1424]/10 flex items-center justify-center gap-2 font-sans text-[13px] font-medium text-[#1E1424] shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">apple</span> Apple
          </button>
        </div>

        {/* Privilege Tier card */}
        <div
          onClick={() => setShowPrivilegeModal(true)}
          className="mt-4 p-3 rounded-2xl bg-[#f5ede0] border border-[#1E1424]/10 flex items-center gap-3 cursor-pointer hover:bg-[#ebdcc7] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-800 shadow-xs">
            <span className="material-symbols-outlined text-base">workspace_premium</span>
          </div>
          <div className="flex-1">
            <h4 className="font-sans text-[13px] font-semibold text-[#1E1424]">Aura Privilege Tier</h4>
            <p className="font-sans text-[11px] text-[#1E1424]/70">Priority slots with top master stylists</p>
          </div>
          <span className="material-symbols-outlined text-sm text-[#1E1424]/40">lock</span>
        </div>
      </div>

      {/* Footer switch to Stylist / Owner portal */}
      <div
        onClick={() => setShowOwnerModal(true)}
        className="mt-5 p-3 rounded-xl bg-white border border-[#1E1424]/10 flex items-center justify-between cursor-pointer hover:bg-stone-50 transition-colors shadow-xs"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-base text-[#1E1424]/70">storefront</span>
          <span className="font-sans text-[12px] font-medium text-[#1E1424]">Salon Owner or Stylist?</span>
        </div>
        <span className="font-sans text-[12px] font-semibold text-amber-900 flex items-center gap-0.5">
          Switch <span className="material-symbols-outlined text-xs">open_in_new</span>
        </span>
      </div>

      {/* Privilege Tier Modal */}
      {showPrivilegeModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full border border-stone-300 shadow-2xl text-[#1E1424]">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-900">
                <span className="material-symbols-outlined text-xl">workspace_premium</span>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivilegeModal(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1E1424]/70 hover:text-[#1E1424]"
              >
                ✕
              </button>
            </div>
            <h3 className="font-serif text-[20px] font-bold">Aura Privilege Membership</h3>
            <p className="font-sans text-[12px] text-[#1E1424]/70 mt-1 leading-relaxed">
              Unlock dedicated beauty concierges, complimentary deep hydration ampoules, and zero-waiting priority styling chairs across Mumbai, London, and Dubai.
            </p>
            <div className="my-3 space-y-2 bg-white/80 p-3 rounded-xl border border-stone-200 text-[11px] font-sans">
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Immediate access to Master Art Directors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>15% courtesy savings on bespoke curations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Exclusive invitation to Parisian trend previews</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setShowPrivilegeModal(false);
                handleSubmit();
              }}
              className="w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-[13px] font-semibold"
            >
              Continue with Privilege Pass
            </button>
          </div>
        </div>
      )}

      {/* Salon Owner Portal Modal */}
      {showOwnerModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1424]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fff9ef] rounded-3xl p-5 max-w-[340px] w-full border border-stone-300 shadow-2xl text-[#1E1424]">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#1E1424] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">storefront</span>
              </div>
              <button
                type="button"
                onClick={() => setShowOwnerModal(false)}
                className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1E1424]/70 hover:text-[#1E1424]"
              >
                ✕
              </button>
            </div>
            <h3 className="font-serif text-[20px] font-bold">Aura Artisan Portal</h3>
            <p className="font-sans text-[12px] text-[#1E1424]/70 mt-1 leading-relaxed">
              For atelier owners, color masters, and guest artists to manage chair schedules, inventory, and VIP client appointments.
            </p>
            <button
              type="button"
              onClick={() => setShowOwnerModal(false)}
              className="mt-4 w-full py-2.5 bg-[#1E1424] text-white rounded-xl font-sans text-[13px] font-semibold"
            >
              Back to Client Experience
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
