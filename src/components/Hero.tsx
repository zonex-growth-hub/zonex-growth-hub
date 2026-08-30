import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

const scrollTo = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToAudit = () => {
  const target = document.getElementById('contact');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
    // Focus first input in the audit form after scroll settles
    setTimeout(() => {
      const input = target.querySelector<HTMLInputElement>('input');
      if (input) input.focus({ preventScroll: true });
    }, 800);
  }
};

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lenis Smooth Scroll Initialization
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

    // 2. Direct Video Autoplay Control
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => console.log('Autoplay prevented:', err));
    }

    // 3. Scroll-Bound Video Zoom & Content Dissolve
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
        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 5, 8, 0.95) 0%, rgba(29, 29, 53, 0.182) 40%, rgba(5, 5, 8, 0.4) 100%)',
          }}
        />
      </div>

      {/* Top Navbar (hero-internal — kept for standalone page scroll) */}
      <nav className="navbar flex justify-between items-center w-full pb-8 z-20">
        <div className="logo flex items-center gap-2 text-xl font-bold tracking-wider font-['Outfit']">
          <i className="ph ph-cube-transparent text-2xl text-[#8A63F8]" />
          <span>ZONEX</span>
        </div>

        <div className="nav-links hidden md:flex items-center gap-10 font-['Inter'] text-[0.85rem] font-medium tracking-widest uppercase text-[#d5d5d5]">
          <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollTo('portfolio')} className="hover:text-white transition-colors cursor-pointer">Our Work</button>
          <button onClick={() => scrollTo('insights')} className="hover:text-white transition-colors cursor-pointer">Insights</button>
          <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Academy</a>
        </div>

        <div className="nav-actions hidden md:block">
          <button
            onClick={scrollToAudit}
            className="btn-outline inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white/10 bg-[rgba(20,20,25,0.4)] backdrop-blur-md text-[0.85rem] font-semibold tracking-wider uppercase font-['Inter'] hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
          >
            LET'S WORK TOGETHER
          </button>
        </div>

        <button className="mobile-menu-toggle md:hidden text-2xl p-2 text-white">
          <i className="ph ph-list" />
        </button>
      </nav>

      {/* Hero Center Content */}
      <div
        ref={contentRef}
        className="hero-content flex-1 flex flex-col justify-center max-w-[820px] py-8 z-20 will-change-transform"
      >
        {/* Badge */}
        <span className="greeting inline-flex items-center gap-2 text-[#8A63F8] text-[0.75rem] sm:text-[0.85rem] font-bold tracking-[2px] mb-5 uppercase font-['Outfit'] animate-fade-up">
          <span>✨</span>
          <span>High-Performance Digital Marketing &amp; Growth Agency</span>
        </span>

        {/* H1 Headline */}
        <h1
          className="main-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-4 font-['Outfit'] animate-fade-up"
          style={{ animationDelay: '0.1s' }}
        >
          We Scale Ambitious<br />
          Brands Into{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #9C7AFA 0%, #5A8CFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Category Giants.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="sub-title text-base sm:text-xl text-[#c8c8d8] font-medium mb-10 max-w-2xl leading-relaxed font-['Inter'] animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          We architect hyper-profitable paid ads, viral short-form creatives, and high-converting funnels engineered for{' '}
          <span className="text-white font-semibold">10x ROI</span> and predictable brand growth.
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
            Claim Free Audit ✦
          </button>
        </div>
      </div>

      {/* Hero Footer & Status Card */}
      <footer className="hero-footer flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 z-20 font-['Inter'] text-sm text-[#d5d5d5]">
        {/* Availability Glass Card */}
        <div className="glass-panel flex items-center gap-3 bg-[rgba(20,20,25,0.4)] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 max-w-[340px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="pulse-dot w-2.5 h-2.5 bg-[#00FF88] rounded-full" />
            <span className="absolute w-full h-full bg-[#00FF88] rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-xs tracking-wider uppercase font-medium">NOW ACCEPTING NEW CLIENTS — LIMITED SLOTS</span>
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
