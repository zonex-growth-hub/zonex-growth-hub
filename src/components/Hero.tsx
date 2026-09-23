import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronRight, MessageCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Hero() {
  const { playClick } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#030305] text-white pt-24 pb-12 px-6 sm:px-12 lg:px-20 select-none">
      
      {/* 1. 3D VIDEO BACKGROUND & EXACT OVERLAY */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
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
            background: 'linear-gradient(90deg, rgba(3, 3, 5, 0.96) 0%, rgba(15, 15, 28, 0.25) 45%, rgba(3, 3, 5, 0.6) 100%)'
          }}
        />
      </div>

      {/* 2. HERO CONTENT (FOREGROUND) */}
      <div className="relative z-10 my-auto max-w-4xl flex flex-col items-start gap-6 pt-6">
        
        {/* High-Performance Architecture Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(138,99,248,0.2)]">
          <span>⚡ High-Performance Architecture: Engineered exclusively for businesses scaling to ₹10L–₹1Cr+ monthly revenue via hyper-profitable Meta &amp; Google PPC infrastructure.</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold font-display text-white tracking-tight leading-[1.08] mb-1">
          We Scale Ambitious <br />
          Brands Into <br />
          Category Giants.
        </h1>

        {/* Full-width aesthetic purple brand bar underneath */}
        <div className="w-full max-w-[580px] h-[3px] sm:h-[4px] bg-gradient-to-r from-[#8A63F8] via-[#5C43FA] to-transparent rounded-full mb-4 shadow-[0_0_15px_#8A63F8]" />

        {/* Subtitle */}
        <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#d5d5d5] max-w-2xl font-normal leading-relaxed mb-6 font-sans">
          We architect hyper-profitable paid ads, viral short-form creatives, and high-converting funnels engineered for <span className="text-white font-semibold border-b border-cyan-400">10x ROI</span> and predictable revenue scaling.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="#portfolio"
            onClick={playClick}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] text-white font-bold text-xs uppercase tracking-wider shadow-[0_8px_25px_rgba(138,99,248,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>View Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            onClick={playClick}
            className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Apply For Strategy Audit</span>
            <ChevronRight className="w-4 h-4 text-purple-400" />
          </a>
        </div>
      </div>

      {/* 3. HERO FOOTER BAR (BADGES & WHATSAPP) */}
      <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
        
        {/* Availability Badge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse shadow-[0_0_8px_#00FF88]" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Now Accepting New Clients — Limited Q3 Slots
          </span>
        </div>

        {/* WhatsApp Direct Action */}
        <a
          href="https://wa.me/917019371818?text=Hi%20ZoneX%20Growth%2C%20I%20want%20to%20scale%20my%20brand."
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/20"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Quick WhatsApp Chat (+91 7019371818)</span>
        </a>
      </div>

    </section>
  );
}

export default Hero;
