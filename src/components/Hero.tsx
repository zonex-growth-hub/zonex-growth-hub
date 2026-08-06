import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ArrowRight, Calculator, TrendingUp, Star } from 'lucide-react';
import { AIRobot } from '@/components/AIRobot';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full-width edge-to-edge robot background visual */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AIRobot />
      </div>

      {/* Dark overlay on the left for text readability on desktop */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,8,20,0.9) 0%, rgba(10,8,20,0.66) 35%, rgba(10,8,20,0.15) 55%, transparent 75%)',
        }}
      />
      {/* Flat dark overlay for mobile readability behind text */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-black/60 lg:hidden" />
      {/* Top/bottom fade for mobile readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 22%, transparent 45%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Text content layered above the background */}
      <motion.div
        style={{ y, opacity }}
        className="container-max px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-28 pb-20"
      >
        <div className="max-w-3xl mx-auto lg:mx-0">
          {/* HUD Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-badge inline-flex items-center gap-3 px-5 py-3 rounded-full mb-8"
          >
            <Sparkles
              className="w-5 h-5 text-cyan-400 shrink-0"
              fill="currentColor"
              style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.8))' }}
            />
            <span
              className="text-base sm:text-lg font-bold tracking-wide bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent"
              style={{ textShadow: '0 0 18px rgba(139,92,246,0.45)' }}
            >
              ZONEX GROWTH HUB AGENCY
            </span>
            <span className="flex gap-0.5 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-cyan-400"
                  fill="currentColor"
                  style={{ filter: 'drop-shadow(0 0 5px rgba(34,211,238,0.8))' }}
                />
              ))}
            </span>
          </motion.div>

          {/* Headline with neon highlight words */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white"
            style={{ textShadow: '0 4px 28px rgba(0,0,0,0.6)' }}
          >
            We Scale Brands into{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Market Leaders</span> with{' '}
            <span className="neon-purple lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>High-CTR Ads</span>,{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Viral Content</span> & Web Architecture.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-slate-100 light:text-slate-700 max-w-2xl leading-relaxed"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
          >
            Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
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
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-slate-400"
      >
        <TrendingUp className="w-5 h-5" />
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
