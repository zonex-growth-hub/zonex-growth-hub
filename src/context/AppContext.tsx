/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';

type Currency = 'INR' | 'USD';

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amtInINR: number, isShort?: boolean) => string;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
  playClick: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
  }, []);

  const formatPrice = useCallback((amtInINR: number, isShort = false) => {
    const rate = 80; // 1 USD = 80 INR
    if (currency === 'USD') {
      const usdVal = amtInINR / rate;
      if (isShort) {
        if (usdVal >= 1000000) return `$${(usdVal / 1000000).toFixed(1)}M`;
        if (usdVal >= 1000) return `$${(usdVal / 1000).toFixed(1)}K`;
        return `$${Math.round(usdVal)}`;
      }
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(usdVal);
    } else {
      if (isShort) {
        if (amtInINR >= 10000000) return `₹${(amtInINR / 10000000).toFixed(1)}Cr`;
        if (amtInINR >= 100000) return `₹${(amtInINR / 100000).toFixed(1)}L`;
        if (amtInINR >= 1000) return `₹${(amtInINR / 1000).toFixed(0)}K`;
        return `₹${amtInINR}`;
      }
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amtInINR);
    }
  }, [currency]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch {
      // AudioContext blocker fallback
    }
  }, [isMuted]);

  return (
    <AppContext.Provider value={{ currency, setCurrency, formatPrice, isMuted, setIsMuted, playClick }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
