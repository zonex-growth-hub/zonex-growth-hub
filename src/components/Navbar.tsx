import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX, Sparkles, ChevronRight } from "lucide-react";
import { analytics } from "@/utils/analytics";
import { useApp } from "@/context/AppContext";

export function Navbar() {
  const { currency, setCurrency, isMuted, setIsMuted, playClick } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    playClick();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleClaimAudit = () => {
    playClick();
    analytics.trackLead("Navbar Book Audit CTA");
    scrollToSection("contact");
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (!nextMute) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
      } catch { /* noop */ }
    }
  };

  return (
    <>
      {/* ── MOBILE STICKY TOP BAR — pure dark luxury, mobile only ── */}
      <div className="md:hidden sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-[#030305]/95 border-b border-white/[0.08] backdrop-blur-2xl shadow-lg">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-black/80 border border-purple-500/40 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(138,99,248,0.3)]">
            <img src="/logo-zonex.jpg" alt="ZoneX Growth Agency" className="w-full h-full object-contain" loading="eager" />
          </div>
          <div className="flex flex-col text-left select-none">
            <span className="text-sm font-black tracking-tight text-white leading-none font-display">ZoneX</span>
            <span className="text-[8px] font-semibold text-purple-400 tracking-wider uppercase leading-tight mt-0.5">Growth Agency</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => { playClick(); setCurrency(currency === "INR" ? "USD" : "INR"); }} className="px-2 py-1 rounded-lg border border-white/10 bg-white/[0.05] text-[10px] font-bold text-slate-300">
            {currency === "INR" ? "🇮🇳 ₹" : "🇺🇸 $"}
          </button>
          <button onClick={() => { playClick(); setMobileOpen(!mobileOpen); }} className="w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white cursor-pointer" aria-label="Toggle Navigation Menu">
            {mobileOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── DESKTOP SCROLL-REVEAL NAV — hidden on mobile ── */}
      <nav className={`hidden md:block fixed top-0 left-0 w-full z-50 py-4 transition-all duration-500 ${
        scrolled
          ? "bg-[#030305]/95 border-b border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.8)] translate-y-0 opacity-100 backdrop-blur-2xl"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between w-full gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 group cursor-pointer shrink-0" onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-black/80 border border-purple-500/40 p-1 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(138,99,248,0.35)] group-hover:border-purple-500/80 transition-all duration-300">
              <img src="/logo-zonex.jpg" alt="ZoneX Growth Agency" className="w-full h-full object-contain" loading="eager" />
            </div>
            <div className="flex flex-col text-left select-none">
              <span className="text-base font-black tracking-tight text-white leading-none font-display">ZoneX</span>
              <span className="text-[9px] font-bold text-purple-400 tracking-widest uppercase leading-tight mt-0.5">Growth Agency</span>
            </div>
          </div>

          {/* Active Sprint Badge */}
          <div className="hidden xl:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 shrink-0 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ⚡ Q3 High-Performance Sprint Live
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-sans">
            <button onClick={() => scrollToSection("services")} className="text-xs uppercase tracking-widest text-slate-300 hover:text-purple-400 transition-colors font-semibold cursor-pointer">Services</button>
            <button onClick={() => scrollToSection("portfolio")} className="text-xs uppercase tracking-widest text-slate-300 hover:text-purple-400 transition-colors font-semibold cursor-pointer">Case Studies</button>
            <button onClick={() => scrollToSection("roi")} className="text-xs uppercase tracking-widest text-slate-300 hover:text-purple-400 transition-colors font-semibold cursor-pointer">ROI Estimator</button>
            <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" onClick={playClick} className="text-xs uppercase tracking-widest text-slate-300 hover:text-purple-400 transition-colors font-semibold flex items-center gap-1.5">
              <span>Academy</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">PRO</span>
            </a>
          </div>

          {/* Actions Group */}
          <div className="flex items-center gap-3">
            <button onClick={() => { playClick(); setCurrency(currency === "INR" ? "USD" : "INR"); }} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold tracking-wider text-slate-300 transition-all cursor-pointer select-none">
              {currency === "INR" ? "🇮🇳 ₹ INR" : "🇺🇸 $ USD"}
            </button>
            <button onClick={toggleMute} aria-label="Toggle haptic audio" className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-purple-400 transition-all cursor-pointer">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
            </button>
            <button onClick={handleClaimAudit} className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(138,99,248,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer">
              <span>Apply for Audit</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* ── MOBILE DRAWER OVERLAY — pure dark luxury ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { playClick(); setMobileOpen(false); }} className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md md:hidden" />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-[#07070B] border-l border-white/10 backdrop-blur-2xl p-8 md:hidden flex flex-col justify-between overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-black text-xl tracking-wider text-white uppercase">ZONEX</span>
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <button onClick={() => { playClick(); setMobileOpen(false); }} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <nav className="flex flex-col gap-4 text-xs uppercase tracking-widest font-semibold text-slate-300">
                  <button onClick={() => scrollToSection("services")} className="text-left py-2 hover:text-purple-400 transition-colors cursor-pointer">Services &amp; Solutions</button>
                  <button onClick={() => scrollToSection("portfolio")} className="text-left py-2 hover:text-purple-400 transition-colors cursor-pointer">Case Studies &amp; ROAS</button>
                  <button onClick={() => scrollToSection("roi")} className="text-left py-2 hover:text-purple-400 transition-colors cursor-pointer">ROI Simulator</button>
                  <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" onClick={playClick} className="py-2 hover:text-purple-400 transition-colors flex items-center gap-2 font-bold">
                    <span>ZoneX Academy</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">PRO</span>
                  </a>
                  <button onClick={() => scrollToSection("contact")} className="text-left py-2 hover:text-purple-400 transition-colors cursor-pointer">Contact &amp; Support</button>
                </nav>
              </div>

              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-400">CURRENCY</span>
                  <button onClick={() => { playClick(); setCurrency(currency === "INR" ? "USD" : "INR"); }} className="px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-white">
                    {currency === "INR" ? "🇮🇳 ₹ INR" : "🇺🇸 $ USD"}
                  </button>
                </div>
                <button onClick={handleClaimAudit} className="w-full bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] text-white py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/20 text-center cursor-pointer">
                  Apply for Strategy Audit →
                </button>
                <div className="text-slate-500 text-[10px] text-center uppercase tracking-widest">ZoneX Growth Agency • 2026</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
