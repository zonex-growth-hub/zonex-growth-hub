import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';

export const Hero: React.FC = () => {
  const { playClick } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    playClick();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToAudit = () => {
    playClick();
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = target.querySelector<HTMLInputElement>('input');
        if (input) input.focus({ preventScroll: true });
      }, 800);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));
    }

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const progress = Math.min(Math.max(scrollY / heroHeight, 0), 1);

      if (videoRef.current) {
        const scale = 1 + progress * 0.35;
        videoRef.current.style.transform = `scale(${scale}) translateZ(0)`;
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = `${1 - progress * 1.5}`;
        contentRef.current.style.transform = `translateY(-${progress * 80}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#030305] text-white px-6 md:px-16 py-8"
      style={{ isolation: 'isolate' }}
    >
      {/* Background Video & Gradient Overlay */}
      <div className="video-container absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/cloudinary/portfolio_hero_bg_zuhahj.webm"
          muted
          playsInline
          autoPlay
          loop
          className="w-full h-full object-cover will-change-transform transition-transform duration-75 ease-out"
          style={{ transform: 'scale(1) translateZ(0)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 5, 8, 0.95) 0%, rgba(29, 29, 53, 0.182) 40%, rgba(5, 5, 8, 0.4) 100%)',
          }}
        />
      </div>

      {/* Top Navbar Placeholder spacing/offset */}
      <div className="w-full h-16 md:h-20 shrink-0" />

      {/* Hero Center Content */}
      <div
        ref={contentRef}
        className="hero-content flex-1 flex flex-col justify-center max-w-[820px] py-8 z-20 will-change-transform"
      >
        {/* Performance-backed Authority Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs sm:text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] mb-6 select-none animate-fade-up">
          <span>⚡ High-Performance Architecture: Engineered exclusively for businesses scaling to ₹10L–₹1Cr+ monthly revenue via hyper-profitable Meta &amp; Google PPC infrastructure.</span>
        </div>

        {/* H1 Headline */}
        <h1
          className="main-title text-4xl sm:text-6xl lg:text-7.5xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-['Outfit'] animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          We Scale Ambitious<br />
          Brands Into{' '}
          <span className="relative inline-block">
            Category Giants.
            {/* Animated Underline */}
            <svg className="absolute left-0 -bottom-2.5 w-full h-3 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
              <motion.path
                d="M 2 8 Q 50 2 98 8"
                stroke="#8A63F8"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
              />
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="sub-title text-base sm:text-xl text-[#c8c8d8] font-medium mb-10 max-w-2xl leading-relaxed font-['Inter'] animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          We architect hyper-profitable paid ads, viral short-form creatives, and high-converting funnels engineered for{' '}
          <span className="relative inline-block font-semibold text-white">
            10x ROI
            {/* Animated Underline */}
            <svg className="absolute left-0 -bottom-1 w-full h-2 overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
              <motion.path
                d="M 2 8 Q 50 4 98 8"
                stroke="#22d3ee"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: 1.2, ease: 'easeOut' }}
              />
            </svg>
          </span>{' '}
          and predictable revenue scaling.
        </p>

        {/* CTA Buttons */}
        <div className="cta-group flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={() => scrollTo('portfolio')}
            className="btn-primary inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-['Inter'] text-[0.85rem] font-semibold tracking-wider uppercase text-white shadow-[0_8px_24px_rgba(138,99,248,0.25)] hover:shadow-[0_12px_28px_rgba(138,99,248,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #8A63F8 0%, #5C43FA 100%)' }}
          >
            View Our Work →
          </button>
          <button
            onClick={scrollToAudit}
            className="btn-outline inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-['Inter'] text-[0.85rem] font-semibold tracking-wider uppercase text-white border border-white/10 bg-[rgba(20,20,25,0.4)] backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            Apply for Strategy Audit ✦
          </button>
        </div>
      </div>

      {/* Hero Footer & Status Card */}
      <footer className="hero-footer flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 z-20 font-['Inter'] text-sm text-[#d5d5d5] select-none">
        {/* Availability Glass Card */}
        <div className="glass-panel flex items-center gap-3 bg-[rgba(20,20,25,0.4)] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 max-w-[345px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="pulse-dot w-2.5 h-2.5 bg-[#00FF88] rounded-full" />
            <span className="absolute w-full h-full bg-[#00FF88] rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-[10px] sm:text-xs tracking-wider uppercase font-medium">NOW ACCEPTING NEW CLIENTS — LIMITED SLOTS</span>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator hidden lg:flex flex-col items-center gap-2">
          <div className="w-5 h-9 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-[#8A63F8] rounded-full animate-bounce" />
          </div>
          <span className="text-[0.65rem] tracking-widest uppercase opacity-60">SCROLL</span>
        </div>

        <div className="telemetry-info text-xs tracking-wider opacity-60">
          SYS // 2026 • KARNATAKA, IN
        </div>
      </footer>
    </section>
  );
};

export default Hero;
