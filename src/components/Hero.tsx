import React from 'react';

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      
      {/* 1. Top Section: Badge & Main Headline */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold mb-4 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <span className="text-yellow-400">★ ★ ★ ★ ★</span>
          <span>ZONEX GROWTH HUB AGENCY</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
          We Scale Brands into Market Leaders with{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            High-CTR Ads
          </span>
          , Viral Content & Web Architecture.
        </h1>
      </div>

      {/* 2. Middle Section: 16:9 3D Comparison Video (Crystal clear, vibrant, no dark overlay) */}
      <div className="w-full max-w-4xl mx-auto my-6 sm:my-8 px-2 sm:px-0">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.3)] bg-slate-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover object-center"
          >
            <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 3. Bottom Section: Description & Action Buttons */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-6">
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 text-center"
          >
            Explore Live Portfolios →
          </a>
          <a
            href="#roi"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-cyan-300 border border-cyan-500/40 bg-black/40 backdrop-blur-md hover:bg-cyan-950/30 transition-all duration-300 text-center"
          >
            Calculate Your ROI
          </a>
        </div>
      </div>

    </section>
  );
}

export default Hero;
