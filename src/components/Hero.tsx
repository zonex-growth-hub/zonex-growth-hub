import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

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

    // 2. Direct Video Autoplay Control (No Loop)
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
        // Zoom into video smoothly on scroll
        const scale = 1 + progress * 0.35;
        videoRef.current.style.transform = `scale(${scale}) translateZ(0)`;
      }

      if (contentRef.current) {
        // Fade & float hero content upward as user scrolls into the video
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
        {/* Custom Video Overlay Gradient for Crisp Text Readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5, 5, 8, 0.95) 0%, rgba(29, 29, 53, 0.182) 40%, rgba(5, 5, 8, 0.4) 100%)'
          }}
        />
      </div>

      {/* Top Navbar */}
      <nav className="navbar flex justify-between items-center w-full pb-8 z-20">
        <div className="logo flex items-center gap-2 text-xl font-bold tracking-wider font-['Outfit']">
          <i className="ph ph-cube-transparent text-2xl text-[#8A63F8]" />
          <span>ZONEX</span>
        </div>

        <div className="nav-links hidden md:flex items-center gap-10 font-['Inter'] text-[0.85rem] font-medium tracking-widest uppercase text-[#d5d5d5]">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#works" className="hover:text-white transition-colors">Works</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#academy" className="hover:text-white transition-colors">Academy</a>
        </div>

        <div className="nav-actions hidden md:block">
          <a
            href="https://wa.me/"
            className="btn-outline inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-white/10 bg-[rgba(20,20,25,0.4)] backdrop-blur-md text-[0.85rem] font-semibold tracking-wider uppercase font-['Inter'] hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            LET'S WORK TOGETHER
          </a>
        </div>

        <button className="mobile-menu-toggle md:hidden text-2xl p-2 text-white">
          <i className="ph ph-list" />
        </button>
      </nav>

      {/* Hero Center Content */}
      <div 
        ref={contentRef}
        className="hero-content flex-1 flex flex-col justify-center max-w-[800px] py-8 z-20 will-change-transform"
      >
        <span className="greeting text-[#8A63F8] text-[1.1rem] font-medium tracking-[2px] mb-4 font-['Outfit'] animate-fade-up">
          HELLO, WE ARE
        </span>

        <h1 className="main-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-4 font-['Outfit'] animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Creative Designer <br />&amp; Developer
        </h1>

        <h2 
          className="sub-title text-xl sm:text-3xl font-medium mb-8 font-['Outfit'] animate-fade-up"
          style={{
            animationDelay: '0.2s',
            background: 'linear-gradient(90deg, #9C7AFA 0%, #5A8CFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          We build immersive digital growth engines
        </h2>

        <div className="cta-group flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="#works"
            className="btn-primary inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-['Inter'] text-[0.85rem] font-semibold tracking-wider uppercase text-white shadow-[0_8px_24px_rgba(138,99,248,0.25)] hover:shadow-[0_12px_28px_rgba(138,99,248,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #8A63F8 0%, #5C43FA 100%)' }}
          >
            VIEW OUR WORK
          </a>
          <a
            href="https://wa.me/"
            className="btn-outline inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-['Inter'] text-[0.85rem] font-semibold tracking-wider uppercase text-white border border-white/10 bg-[rgba(20,20,25,0.4)] backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            FREE AUDIT →
          </a>
        </div>
      </div>

      {/* Hero Footer & Status Card */}
      <footer className="hero-footer flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 z-20 font-['Inter'] text-sm text-[#d5d5d5]">
        {/* Availability Glass Card */}
        <div className="glass-panel flex items-center gap-3 bg-[rgba(20,20,25,0.4)] backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 max-w-[320px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="pulse-dot w-2.5 h-2.5 bg-[#00FF88] rounded-full" />
            <span className="absolute w-full h-full bg-[#00FF88] rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-xs tracking-wider uppercase font-medium">AVAILABLE FOR NEW PROJECTS</span>
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
