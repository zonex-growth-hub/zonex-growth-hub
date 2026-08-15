import React from 'react';

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-black">
      
      {/* 1. Top: Rating Badge + Primary Headline */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span>★ ★ ★ ★ ★</span>
          <span>ZONEX GROWTH HUB AGENCY</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          We Scale Brands into Market Leaders with <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">High-CTR Ads</span>, Viral Content & Web Architecture.
        </h1>
      </div>

      {/* 2. Middle: Pure 16:9 3D Comparison Video (Vibrant, 100% Brightness, ZERO dark overlay) */}
      <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-slate-950 my-6">
        <video
          src="/assets/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 3. Bottom: Subheadline Description + CTA Action Buttons */}
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Subheadline Description */}
        <p className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl text-center mb-6 leading-relaxed">
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
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
