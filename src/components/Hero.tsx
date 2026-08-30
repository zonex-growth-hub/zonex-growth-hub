import React from 'react';
import { analytics } from '@/utils/analytics';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('Clean Hero Book Free Audit CTA');
    scrollToSection('contact');
  };

  const handleCalculateROI = () => {
    analytics.trackInitiateCheckout('Clean Hero Calculate ROI CTA');
    scrollToSection('roi');
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden"
      aria-label="ZoneX Growth Hub Hero"
    >
      {/* 1. STICKY TOP HEADER / BRANDING BAR */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between bg-black/95 backdrop-blur-md z-30 border-b border-white/10 sticky top-0">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-black text-xl sm:text-2xl tracking-widest text-white hover:text-cyan-400 transition-colors uppercase select-none flex items-center gap-2"
        >
          <span>ZONEX GROWTH HUB</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-semibold text-slate-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Home</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors cursor-pointer">Works</button>
          <button onClick={() => scrollToSection('insights')} className="hover:text-white transition-colors cursor-pointer">Insights</button>
          <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1">
            <span>Academy</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">PRO</span>
          </a>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
        </nav>

        <div>
          <button
            onClick={handleClaimAudit}
            className="px-6 py-2.5 rounded-full border border-purple-500/60 bg-gradient-to-r from-purple-950/60 to-purple-900/60 hover:from-purple-600 hover:to-indigo-600 text-purple-200 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-pointer transform hover:scale-105"
          >
            Book Free Audit
          </button>
        </div>
      </header>

      {/* 2. LIGHTWEIGHT SEMANTIC HERO MAIN AREA */}
      <div className="flex-grow flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <span className="text-yellow-400">★ ★ ★ ★ ★</span>
            <span>#1 DIGITAL GROWTH &amp; AI PERFORMANCE AGENCY IN KARNATAKA</span>
          </div>

          {/* Primary Semantic H1 */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight uppercase max-w-5xl drop-shadow-md">
            Next-Gen AI &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Digital Growth Engine
            </span>{' '}
            for Karnataka Businesses
          </h1>

          {/* Strategic Agency Description */}
          <p className="mt-8 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Scale 10x with ZoneX Growth Hub. Top-tier Meta &amp; Google Ads, Local SEO dominance, AI-powered web systems, and viral performance marketing across <strong>Bengaluru, Mysuru, Chikkamagaluru</strong>, and statewide Karnataka.
          </p>

          {/* Regional City Coverage Trust Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-violet-400 font-semibold">Active Regional Hubs:</span>
            <span>Digital Marketing Agency Mysuru (HQ)</span>
            <span>•</span>
            <span>Performance Marketing Bengaluru</span>
            <span>•</span>
            <span>Local SEO Chikkamagaluru</span>
            <span>•</span>
            <span>AI Business Automation Karnataka</span>
          </div>

          {/* Conversion Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full">
            <button
              onClick={handleClaimAudit}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(147,51,234,0.45)] hover:shadow-[0_0_45px_rgba(147,51,234,0.7)] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
            >
              Book Free Growth Audit →
            </button>
            <button
              onClick={handleCalculateROI}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-cyan-300 border border-cyan-500/50 bg-black/60 backdrop-blur-md hover:bg-cyan-950/40 hover:border-cyan-400 hover:text-white shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
            >
              Calculate Your ROI
            </button>
            <a
              href="https://zonex-academy.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.trackViewContent('ZoneX Academy Link Click')}
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-purple-300 border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 hover:text-white transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>ZoneX Academy 🎓</span>
            </a>
          </div>

        </div>
      </div>

      {/* 3. FOOTER telemetry spacer */}
      <div className="w-full py-4 text-center text-slate-500 text-[10px] sm:text-xs tracking-[0.1em] border-t border-white/5 bg-black">
        <span>© {new Date().getFullYear()} ZONEX GROWTH HUB • DESIGNED TO SCALE</span>
      </div>
    </section>
  );
}

export default Hero;
