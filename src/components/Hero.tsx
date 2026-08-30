import React, { useEffect, useRef } from 'react';

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#030305] text-white pt-24 pb-12 px-6 sm:px-12 lg:px-20">
      
      {/* 1. 3D VIDEO BACKGROUND & EXACT OVERLAY */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onEnded={(e) => {
            e.currentTarget.currentTime = 0;
            e.currentTarget.play().catch(() => {});
          }}
        >
          <source
            src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/portfolio_hero_bg_zuhahj.webm"
            type="video/webm"
          />
        </video>

        {/* Cinematic Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 5, 8, 0.95) 0%, rgba(29, 29, 53, 0.182) 40%, rgba(5, 5, 8, 0.4) 100%)'
          }}
        />
      </div>

      {/* 2. HERO CONTENT (FOREGROUND) */}
      <div className="relative z-10 my-auto max-w-4xl flex flex-col items-start gap-6">
        
        {/* High-Performance Architecture Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]">
          <span>⚡ High-Performance Architecture: Engineered exclusively for businesses scaling to ₹10L–₹1Cr+ monthly revenue via hyper-profitable Meta &amp; Google PPC infrastructure.</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
          We Scale Ambitious <br />
          <span className="text-white underline decoration-purple-500/60 underline-offset-8">Brands Into Category Giants.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed">
          We architect hyper-profitable paid ads, viral short-form creatives, and high-converting funnels engineered for <strong className="text-white border-b border-cyan-400">10x ROI</strong> and predictable revenue scaling.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#work"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] text-white font-semibold text-sm tracking-wide uppercase shadow-[0_8px_24px_rgba(138,99,248,0.25)] hover:-translate-y-0.5 transition-all duration-300"
          >
            View Our Work →
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-sm tracking-wide uppercase backdrop-blur-md transition-all duration-300"
          >
            Apply For Strategy Audit ✦
          </a>
        </div>
      </div>

      {/* 3. HERO FOOTER BAR (BADGES & WHATSAPP) */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/5">
        
        {/* Availability Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
          <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Now Accepting New Clients — Limited Q3 Slots
          </span>
        </div>

        {/* WhatsApp Direct Action */}
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20"
        >
          <span>💬 Quick WhatsApp Chat</span>
        </a>
      </div>

    </section>
  );
};
