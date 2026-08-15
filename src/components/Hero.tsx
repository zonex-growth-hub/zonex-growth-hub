import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ArrowRight, Calculator, TrendingUp, Star } from 'lucide-react';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Video & Dark Overlay (Behind everything) */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <video
          src="/assets/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for crystal clear text readability */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* Floating Foreground Content (Positioned directly ON TOP of the video) */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-5 pt-20 pb-10"
      >
        {/* Glowing Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hud-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full mx-auto"
        >
          <Sparkles
            className="w-4 h-4 text-cyan-400 shrink-0"
            fill="currentColor"
            style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.8))' }}
          />
          <span
            className="text-xs sm:text-sm font-bold tracking-wide bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent"
            style={{ textShadow: '0 0 18px rgba(139,92,246,0.45)' }}
          >
            ZONEX GROWTH HUB AGENCY
          </span>
          <span className="flex gap-0.5 shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-cyan-400"
                fill="currentColor"
                style={{ filter: 'drop-shadow(0 0 5px rgba(34,211,238,0.8))' }}
              />
            ))}
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] drop-shadow-xl"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}
        >
          We Scale Brands into{' '}
          <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Market Leaders</span> with{' '}
          <span className="neon-purple lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>High-CTR Ads</span>,{' '}
          <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Viral Content</span> & Web Architecture.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
        >
          Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
        </motion.p>

        {/* Action Buttons / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a href="#portfolio" className="btn-glass-neon w-full sm:w-auto">
            Explore Live Portfolios
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#roi" className="btn-glass-cyber w-full sm:w-auto">
            <Calculator className="w-5 h-5" />
            Calculate Your ROI
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-slate-400"
      >
        <TrendingUp className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

