import React from 'react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-start pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* 1. TOP BRANDING & HEADLINE */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-6">
        
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="text-yellow-400">★ ★ ★ ★ ★</span>
          <span>ZONEX GROWTH HUB AGENCY</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          We Scale Brands into{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Market Leaders
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl font-light">
          High-CTR Ads, Viral Content & High-Converting Web Architecture.
        </p>
      </div>

      {/* 2. DEDICATED 16:9 YOUTUBE-STYLE VIDEO SHOWCASE (Zero Crop, Full 100% Visibility, Crystal Clear) */}
      <div className="w-full max-w-4xl mx-auto my-4 px-0 sm:px-4">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-purple-500/40 bg-black shadow-[0_0_50px_rgba(168,85,247,0.3)]">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-contain bg-black"
          >
            <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 3. BOTTOM DESCRIPTION & CTA BUTTONS */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center mt-4">
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-6">
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-xs sm:text-sm"
          >
            Explore Live Portfolios →
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-cyan-300 border border-cyan-500/40 bg-black/60 backdrop-blur-md hover:bg-cyan-950/40 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm"
          >
            Calculate Your ROI
          </button>
        </div>
      </div>

    </section>
  );
}

export default Hero;
