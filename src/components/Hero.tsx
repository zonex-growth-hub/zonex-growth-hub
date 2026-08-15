import React from 'react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      
      {/* 1. Full-Screen Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
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
        {/* Subtle cinematic gradient overlay to ensure text and navigation pop */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/80 via-black/20 to-black/90" />
      </div>

      {/* 2. Transparent Top Navigation Bar */}
      <header className="relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-black text-xl sm:text-2xl tracking-wider text-white hover:text-cyan-400 transition-colors"
        >
          ZONEX<span className="text-purple-400">.</span>
        </div>

        {/* Navigation Links with Smooth Scroll */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase text-slate-300">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="hover:text-white transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="hover:text-white transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="hover:text-white transition-colors"
          >
            Portfolios
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="hover:text-white transition-colors"
          >
            Contact Us
          </button>
        </nav>

        {/* Right Action Button */}
        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 rounded-full border border-white/40 text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
          >
            Get In Touch
          </button>
        </div>
      </header>

      {/* 3. Center Luxury Hero Content (Mantra Milestones Style) */}
      <main className="relative z-10 w-full min-h-[calc(100vh-100px)] flex flex-col items-center justify-center text-center px-4 sm:px-6">
        
        {/* Minimal Sub-tag */}
        <p className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.3em] uppercase text-cyan-300 mb-4 drop-shadow-md">
          Performance Marketing & Web Architecture
        </p>

        {/* Massive Luxury Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] max-w-5xl">
          ZONEX GROWTH HUB
        </h1>

        {/* Clean One-Line Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          Scaling modern brands into market leaders through viral content, high-CTR ads, and elite digital systems.
        </p>

        {/* Explore Button */}
        <div className="mt-10">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Explore Portfolio ↓
          </button>
        </div>

      </main>

    </div>
  );
}

export default Hero;
