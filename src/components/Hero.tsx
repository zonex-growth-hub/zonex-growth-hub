import React from 'react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="w-full bg-black text-white flex flex-col items-center justify-start overflow-x-hidden p-0 m-0">
      
      {/* 1. TOP HEADER / BRANDING BAR */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between bg-black/90 backdrop-blur-md z-30 border-b border-white/10">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-black text-xl sm:text-2xl tracking-widest text-white hover:text-cyan-400 transition-colors uppercase"
        >
          ZONEX GROWTH HUB
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.2em] uppercase font-semibold text-slate-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolios</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
        </nav>

        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 rounded-full border border-purple-500/50 bg-purple-950/30 text-xs font-bold tracking-widest uppercase hover:bg-purple-600 hover:text-white transition-all duration-300"
          >
            Claim Free Audit
          </button>
        </div>
      </header>

      {/* 2. THE ONLY SINGLE EDGE-TO-EDGE FULL-WIDTH VIDEO */}
      <div className="w-full relative overflow-hidden bg-black p-0 m-0 leading-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-auto max-h-[85vh] object-cover block m-0 p-0"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 3. ALL HEADLINES & CTA BUTTONS (Strictly BELOW the video) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col items-center text-center">
        
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="text-yellow-400">★ ★ ★ ★ ★</span>
          <span>ZONEX GROWTH HUB AGENCY</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase max-w-4xl drop-shadow-md">
          We Scale Brands into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Market Leaders
          </span>{' '}
          with High-CTR Ads, Viral Content & Web Architecture.
        </h1>

        {/* Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-xs sm:text-sm"
          >
            Explore Live Portfolios →
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-cyan-300 border border-cyan-500/40 bg-black/60 backdrop-blur-md hover:bg-cyan-950/40 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm"
          >
            Calculate Your ROI
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;
