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
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="w-full text-center flex flex-col items-center z-10"
      >
        {/* Top: Glowing badge + Main Headline */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Glowing Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6 mx-auto"
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

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
            style={{ textShadow: '0 4px 28px rgba(0,0,0,0.6)' }}
          >
            We Scale Brands into{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Market Leaders</span> with{' '}
            <span className="neon-purple lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>High-CTR Ads</span>,{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Viral Content</span> & Web Architecture.
          </motion.h1>
        </div>

        {/* Center: The uncropped 16:9 Comparison Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.25)] bg-slate-950 my-6"
        >
          <video
            src="/assets/videos/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-contain md:object-cover"
          />
        </motion.div>

        {/* Bottom: Description text + CTA action buttons */}
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
          >
            Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
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
        className="mt-8 flex flex-col items-center gap-1.5 text-slate-400 z-10"
      >
        <TrendingUp className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

