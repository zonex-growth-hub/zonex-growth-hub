import React from 'react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-screen h-screen min-h-[600px] max-w-full overflow-hidden bg-black text-white flex flex-col justify-between items-center m-0 p-0">
      
      {/* FULL-BLEED ZERO-CROP BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover object-center scale-105"
        >
          <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Gradient Mask (Ensures copy readability while maintaining vibrant video canvas) */}
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />
      </div>

      {/* TOP FLOATING BRAND & NAVIGATION BAR */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer font-black text-xl md:text-2xl tracking-widest text-white hover:text-cyan-400 transition-colors uppercase select-none"
        >
          ZONEX<span className="text-purple-400">.</span>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase font-semibold text-slate-300">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button>
          <button onClick={() => scrollToSection('portfolio')} className="hover:text-white transition-colors">Portfolios</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
        </nav>

        <div>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2.5 rounded-full border border-white/40 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            Get In Touch
          </button>
        </div>
      </header>

      {/* CENTER LUXURY HERO CANVAS */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center my-auto">
        <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-cyan-300 font-semibold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Performance Marketing & Web Architecture
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-5xl leading-none">
          ZONEX GROWTH HUB
        </h1>

        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Scaling modern brands into market leaders through viral content, high-CTR ads, and elite digital systems.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            Explore Portfolio ↓
          </button>
        </div>
      </div>

      {/* BOTTOM BALANCING SPACER */}
      <div className="relative z-10 h-12 w-full pointer-events-none" />

    </section>
  );
}

export default Hero;
