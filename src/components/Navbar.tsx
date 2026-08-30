import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { analytics } from '@/utils/analytics';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('Navbar Book Free Audit CTA');
    scrollToSection('contact');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 py-5 md:py-8 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#030307]/95 border-b border-white/[0.08] shadow-[0_10px_30px_rgba(3,3,7,0.8)]' 
          : 'bg-gradient-to-b from-[#030307]/90 via-[#030307]/50 to-transparent border-b border-white/[0.06]'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-12 items-center w-full">
          
          {/* Left: Cols 1-3 - Geometric glowing clover/spark icon + Brand Name */}
          <div className="col-span-6 md:col-span-3 flex items-center gap-2.5">
            <svg 
              className="w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] fill-[#a855f7] shrink-0" 
              viewBox="0 0 24 24"
            >
              {/* Clover/Spark geometric shape */}
              <path d="M12 2a3.5 3.5 0 013.5 3.5v3A3.5 3.5 0 0112 12a3.5 3.5 0 01-3.5-3.5v-3A3.5 3.5 0 0112 2zm0 20a3.5 3.5 0 01-3.5-3.5v-3A3.5 3.5 0 0112 12a3.5 3.5 0 013.5 3.5v3A3.5 3.5 0 0112 22zm10-10a3.5 3.5 0 01-3.5 3.5h-3A3.5 3.5 0 0112 12a3.5 3.5 0 013.5-3.5h3A3.5 3.5 0 0122 12zM2 12a3.5 3.5 0 013.5-3.5h3A3.5 3.5 0 0112 12a3.5 3.5 0 01-3.5 3.5h-3A3.5 3.5 0 012 12z" />
            </svg>
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display font-black text-base sm:text-lg tracking-wider text-white select-none cursor-pointer uppercase"
            >
              ZONEX GROWTH
            </span>
          </div>

          {/* Center: Cols 4-9 - Desktop Navigation */}
          <div className="hidden md:flex col-span-6 justify-center items-center gap-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#a855f7] transition-colors duration-250 font-semibold"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#a855f7] transition-colors duration-250 font-semibold"
            >
              Case Studies
            </button>
            <button 
              onClick={() => scrollToSection('insights')}
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#a855f7] transition-colors duration-250 font-semibold"
            >
              AI Systems
            </button>
            <a 
              href="https://zonex-academy.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-widest text-slate-300 hover:text-[#a855f7] transition-colors duration-250 font-semibold flex items-center gap-1"
            >
              <span>Academy</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
            </a>
          </div>

          {/* Right: Cols 10-12 - CTA & Mobile Toggle */}
          <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-5">
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden lg:inline-block text-xs uppercase tracking-widest text-slate-300 hover:text-[#a855f7] transition-colors duration-250 font-semibold cursor-pointer"
            >
              Quick Chat
            </button>
            
            <button 
              onClick={handleClaimAudit}
              className="hidden sm:inline-block bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              Book Free Audit →
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white hover:text-[#a855f7] transition-colors focus:outline-none p-1 cursor-pointer"
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
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-sm bg-[#030307]/95 border-l border-white/[0.08] backdrop-blur-2xl p-8 md:hidden flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                  <span className="font-display font-black text-lg tracking-wider text-white uppercase">
                    ZONEX
                  </span>
                  <button 
                    onClick={() => setMobileOpen(false)}
                    className="text-white hover:text-[#a855f7] transition-colors focus:outline-none"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Vertical links */}
                <nav className="flex flex-col gap-5 text-sm uppercase tracking-widest font-semibold text-slate-300">
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-left py-2 hover:text-[#a855f7] transition-colors"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => scrollToSection('portfolio')}
                    className="text-left py-2 hover:text-[#a855f7] transition-colors"
                  >
                    Case Studies
                  </button>
                  <button 
                    onClick={() => scrollToSection('insights')}
                    className="text-left py-2 hover:text-[#a855f7] transition-colors"
                  >
                    AI Systems
                  </button>
                  <a 
                    href="https://zonex-academy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 hover:text-[#a855f7] transition-colors flex items-center gap-1.5"
                  >
                    <span>Academy</span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">PRO</span>
                  </a>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left py-2 hover:text-[#a855f7] transition-colors"
                  >
                    Quick Chat
                  </button>
                </nav>
              </div>

              {/* Bottom CTA in drawer */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col gap-4">
                <button 
                  onClick={handleClaimAudit}
                  className="w-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform cursor-pointer text-center"
                >
                  Book Free Audit →
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
