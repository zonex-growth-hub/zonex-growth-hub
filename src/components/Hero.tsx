import React from 'react';

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      {/* 1. Background Video Layer (z-0) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Dark Cinematic Overlay (z-10) - Ensures text is readable over video */}
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/70 via-black/30 to-black/80 z-10 pointer-events-none" />

      {/* 3. Foreground Content (z-20) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span>★ ★ ★ ★ ★</span>
          <span>ZONEX GROWTH HUB AGENCY</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          We Scale Brands into Market Leaders with <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">High-CTR Ads</span>, Viral Content & Web Architecture.
        </h1>

        {/* Subheadline Description */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105"
          >
            Explore Live Portfolios →
          </a>
          <a
            href="#roi"
            className="px-8 py-3.5 rounded-xl font-semibold text-cyan-300 border border-cyan-500/40 bg-black/40 backdrop-blur-md hover:bg-cyan-950/30 transition-all duration-300"
          >
            Calculate Your ROI
          </a>
        </div>

      </div>
    </section>
  );
}

export default Hero;
