import React from 'react';
import { analytics } from '@/utils/analytics';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('Claim Free Audit Header CTA');
    scrollToSection('contact');
  };

  const handleExplorePortfolio = () => {
    analytics.trackViewContent('Hero Portfolio CTA');
    scrollToSection('portfolio');
  };

  const handleCalculateROI = () => {
    analytics.trackInitiateCheckout('Hero ROI Calculator CTA');
    scrollToSection('roi');
  };

  return (
    <section id="hero" className="w-full bg-black text-white flex flex-col items-center justify-start overflow-x-hidden p-0 m-0">
      
      {/* 1. TOP HEADER / BRANDING BAR */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between bg-black/90 backdrop-blur-md z-30 border-b border-white/10 sticky top-0">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-black text-xl sm:text-2xl tracking-widest text-white hover:text-cyan-400 transition-colors uppercase select-none flex items-center gap-1.5"
        >
          <span>ZONEX GROWTH HUB</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-semibold text-slate-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Home</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors cursor-pointer">Services</button>
          <button onClick={handleExplorePortfolio} className="hover:text-white transition-colors cursor-pointer">Portfolios</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">Contact</button>
        </nav>

        <div>
          <button
            onClick={handleClaimAudit}
            className="px-6 py-2.5 rounded-full border border-purple-500/60 bg-gradient-to-r from-purple-950/60 to-purple-900/60 hover:from-purple-600 hover:to-indigo-600 text-purple-200 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] cursor-pointer transform hover:scale-105"
          >
            Claim Free Audit
          </button>
        </div>
      </header>

      {/* 2. OPTIMIZED ZERO-LAG 16:9 HERO SHOWCASE VIDEO */}
      <div className="w-full max-w-5xl mx-auto my-6 sm:my-8 px-4 sm:px-6">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-purple-500/30 bg-black shadow-[0_0_50px_rgba(168,85,247,0.25)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controls={false}
            className="w-full h-full object-contain md:object-cover bg-black"
          >
            <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 3. HIGH-CTR HEADLINES & CONVERSION CTA BUTTONS */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center text-center">
        
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="text-yellow-400">★ ★ ★ ★ ★</span>
          <span>4.9/5 RATED PERFORMANCE & CREATIVE GROWTH AGENCY</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase max-w-5xl drop-shadow-md">
          We Scale Brands into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Market Leaders
          </span>{' '}
          with High-CTR Ads, Viral Content & Web Architecture.
        </h1>

        {/* High-Converting Agency Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Turn ad spend into predictable revenue. Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* Conversion Action Buttons with Event Tracking */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={handleExplorePortfolio}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_30px_rgba(147,51,234,0.45)] hover:shadow-[0_0_45px_rgba(147,51,234,0.7)] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
          >
            Explore Live Portfolios →
          </button>
          <button
            onClick={handleCalculateROI}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-cyan-300 border border-cyan-500/50 bg-black/60 backdrop-blur-md hover:bg-cyan-950/40 hover:border-cyan-400 hover:text-white shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer"
          >
            Calculate Your ROI
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;
