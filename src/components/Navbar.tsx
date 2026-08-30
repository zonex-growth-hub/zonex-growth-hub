import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { analytics } from '@/utils/analytics';
import { useTheme } from '@/context/ThemeContext';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, isMuted, setIsMuted, playClick } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    playClick();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    playClick();
    analytics.trackLead('Navbar Book Audit CTA');
    scrollToSection('contact');
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (!nextMute) {
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
        // Fallback
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 py-4 md:py-6 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#EDEEF5]/95 border-b border-slate-200 shadow-md dark:bg-[#030307]/95 dark:border-white/[0.08] dark:shadow-[0_10px_30px_rgba(3,3,7,0.8)] translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full gap-4">
          
          {/* Left: Logo + Brand Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
            onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            {/* Logo Emblem Container */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black/80 border border-purple-500/40 p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:border-purple-500/70 transition-all duration-300">
              <img
                src="/logo-zonex.jpg"
                alt="ZoneX Growth Agency"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                loading="eager"
                style={{
                  imageRendering: 'crisp-edges',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              />
            </div>

            {/* Brand Typography — stacked layout */}
            <div className="flex flex-col text-left select-none">
              <span className="text-sm sm:text-base font-black tracking-tight text-zinc-900 dark:text-white leading-none">
                ZoneX
              </span>
              <span className="text-[9px] sm:text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-wider uppercase leading-tight mt-0.5">
                Growth Agency
              </span>
            </div>
          </div>

          {/* Active Sprints Status Badge */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ⚡ Sprints: 2 Active Client Runs (Q3 2026)
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#7c3aed] dark:text-slate-300 dark:hover:text-[#a855f7] transition-colors duration-250 font-semibold cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#7c3aed] dark:text-slate-300 dark:hover:text-[#a855f7] transition-colors duration-250 font-semibold cursor-pointer"
            >
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection('insights')}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#7c3aed] dark:text-slate-300 dark:hover:text-[#a855f7] transition-colors duration-250 font-semibold cursor-pointer"
            >
              AI Systems
            </button>
            <a 
              href="https://zonex-academy.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={playClick}
              className="text-xs uppercase tracking-widest text-zinc-700 hover:text-[#7c3aed] dark:text-slate-300 dark:hover:text-[#a855f7] transition-colors duration-250 font-semibold flex items-center gap-1"
            >
              <span>Academy</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
            </a>
          </div>

          {/* Right: CTA & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Switcher */}
            <button
              onClick={() => { playClick(); setCurrency(currency === 'INR' ? 'USD' : 'INR'); }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-350 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-[10px] font-bold tracking-wider text-zinc-750 dark:text-slate-300 transition-all cursor-pointer select-none"
            >
              {currency === 'INR' ? '🇮🇳 ₹ INR' : '🇺🇸 $ USD'}
            </button>

            {/* Micro-Haptic Mute Switcher */}
            <button
              onClick={toggleMute}
              aria-label="Toggle haptic sounds"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-300 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-zinc-750 dark:text-slate-300 transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-purple-500" />}
            </button>

            <button 
              onClick={handleClaimAudit}
              className="hidden lg:inline-block bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              Apply for Audit →
            </button>

            {/* Sun/Moon Toggle Button */}
            <button 
              onClick={() => { playClick(); toggleTheme(); }}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-slate-300 dark:border-white/10 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-800 dark:text-yellow-400 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4 h-4 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4 h-4 text-slate-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => { playClick(); setMobileOpen(!mobileOpen); }}
              className="md:hidden text-zinc-900 dark:text-white hover:text-[#a855f7] transition-colors focus:outline-none p-1 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Glassmorphic Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { playClick(); setMobileOpen(false); }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-[#EDEEF5] border-l border-slate-200 dark:bg-[#030307]/95 dark:border-white/[0.08] backdrop-blur-2xl p-8 md:hidden flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/[0.08]">
                  <span className="font-display font-black text-lg tracking-wider text-zinc-900 dark:text-white uppercase">
                    ZONEX
                  </span>
                  <button 
                    onClick={() => { playClick(); setMobileOpen(false); }}
                    className="text-zinc-900 dark:text-white hover:text-[#a855f7] transition-colors focus:outline-none"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Vertical links */}
                <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest font-semibold text-zinc-700 dark:text-slate-300">
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-left py-2 hover:text-[#7c3aed] dark:hover:text-[#a855f7] transition-colors cursor-pointer"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => scrollToSection('portfolio')}
                    className="text-left py-2 hover:text-[#7c3aed] dark:hover:text-[#a855f7] transition-colors cursor-pointer"
                  >
                    Case Studies
                  </button>
                  <button 
                    onClick={() => scrollToSection('insights')}
                    className="text-left py-2 hover:text-[#7c3aed] dark:hover:text-[#a855f7] transition-colors cursor-pointer"
                  >
                    AI Systems
                  </button>
                  <a 
                    href="https://zonex-academy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="py-2 hover:text-[#7c3aed] dark:hover:text-[#a855f7] transition-colors flex items-center gap-1.5 font-bold"
                  >
                    <span>Academy</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left py-2 hover:text-[#7c3aed] dark:hover:text-[#a855f7] transition-colors cursor-pointer"
                  >
                    Quick Chat
                  </button>
                </nav>
              </div>

              {/* Bottom CTA in drawer */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/[0.08] flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-700 dark:text-slate-300">CURRENCY</span>
                  <button
                    onClick={() => { playClick(); setCurrency(currency === 'INR' ? 'USD' : 'INR'); }}
                    className="px-3 py-1 rounded bg-zinc-200 dark:bg-white/10 text-xs font-bold"
                  >
                    {currency === 'INR' ? '🇮🇳 ₹ INR' : '🇺🇸 $ USD'}
                  </button>
                </div>
                <button 
                  onClick={handleClaimAudit}
                  className="w-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform cursor-pointer text-center"
                >
                  Apply for Strategy Audit →
                </button>
                <div className="text-slate-500 text-[10px] text-center uppercase tracking-[0.15em]">
                  SYS // 2026
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
