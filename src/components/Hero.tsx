import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { analytics } from '@/utils/analytics';

export function Hero() {
  const [lang, setLang] = useState<'KA' | 'EN'>('EN');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputEl = (e.currentTarget as HTMLFormElement).querySelector('input');
    const query = inputEl?.value || '';
    if (query) {
      analytics.trackSearch(query);
      scrollToSection('contact');
    }
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-start overflow-hidden bg-[#030307]"
    >
      
      {/* Background Video Container */}
      <div className="absolute top-[12vh] sm:top-[16vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none select-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          style={{ transform: 'translate3d(0,0,0)' }}
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Smooth Gradient Mask to blend seamlessly into the #030307 dark background */}
        <div className="absolute top-0 left-0 w-full h-32 sm:h-44 bg-gradient-to-b from-[#030307] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 sm:h-44 bg-gradient-to-t from-[#030307] to-transparent"></div>
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-16 relative z-10 grid grid-cols-12 gap-x-4 pt-32 sm:pt-40 flex-grow">
        <div className="col-span-12 md:col-span-10 md:col-start-2 text-center md:text-left flex flex-col justify-center">
          
          {/* Animated H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-2xl sm:text-5xl lg:text-7xl font-display font-bold tracking-tight text-white leading-[1.15] mb-8 select-none"
          >
            <span className="text-white">ZoneX Engine: </span>
            <span className="text-[#94a3b8]">Empowering</span><br />
            <span className="text-[#94a3b8]">businesses with AI &amp; performance systems to scale</span><br />
            <span className="text-[#94a3b8]">your </span>
            <span className="w-[30px] sm:w-[54px] lg:w-[72px] h-[20px] sm:h-[34px] lg:h-[42px] border-[2px] border-[#a855f7] rounded-full inline-flex items-center justify-center align-middle mx-1 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#a855f7] rounded-full animate-pulse"></span>
            </span>
            <span className="text-[#94a3b8]"> digital revenue.</span>
          </motion.h1>

          {/* Search / Action Pill Component */}
          <motion.form 
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-xl w-full mx-auto md:mx-0 bg-white/[0.07] border border-white/[0.12] backdrop-blur-md rounded-full p-1.5 pl-5 flex items-center shadow-2xl shadow-purple-950/40"
          >
            <input 
              type="text" 
              placeholder="Ask how we scale your brand..." 
              className="w-full bg-transparent text-white placeholder:text-zinc-400 text-sm sm:text-base outline-none pr-3"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>
        </div>
      </div>

      {/* Middle Right: Language Switcher Anchor */}
      <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={() => {
            const nextLang = lang === 'EN' ? 'KA' : 'EN';
            setLang(nextLang);
            analytics.trackShare(`Language changed to ${nextLang}`);
          }}
          className="bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl text-xs font-bold tracking-widest text-slate-300 hover:text-white px-3.5 py-2.5 rounded-full flex items-center gap-1.5 transition-all duration-200 shadow-lg cursor-pointer"
        >
          <span className={lang === 'KA' ? 'text-[#a855f7]' : ''}>KA</span>
          <span className="text-white/20">|</span>
          <span className={lang === 'EN' ? 'text-[#a855f7]' : ''}>EN</span>
        </button>
      </div>

      {/* Bottom Telemetry HUD Elements */}
      <div className="w-full px-6 sm:px-12 py-6 relative z-10 flex items-center justify-between text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-slate-500 font-mono">
        <div className="flex items-center gap-2 select-none">
          <span>SYS // 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        <div className="uppercase select-none">
          AI &amp; GROWTH SYSTEMS
        </div>
      </div>

    </section>
  );
}

export default Hero;
