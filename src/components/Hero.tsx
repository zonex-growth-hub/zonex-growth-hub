import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ArrowRight, Calculator, TrendingUp, Star } from 'lucide-react';

function VideoShowcase() {
  return (
    <div className="relative w-full group">
      {/* Decorative Cyber Accents: glowing ambient radial gradients */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-600/30 blur-xl -z-10 rounded-2xl" />

      {/* Responsive showcase frame with exact aspect ratio */}
      <div className="relative w-full aspect-video lg:aspect-[16/10] rounded-2xl overflow-hidden border border-purple-500/30 bg-black/60 shadow-[0_0_50px_-10px_rgba(168,85,247,0.3)] backdrop-blur-sm">
        <video
          src="/assets/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-contain md:object-cover"
        />
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full z-10"
      >
        {/* Left Column - Copy & CTA (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Glowing Tag Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hud-badge inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-6"
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

          {/* Headline with neon highlight words */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white"
            style={{ textShadow: '0 4px 28px rgba(0,0,0,0.6)' }}
          >
            We Scale Brands into{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Market Leaders</span> with{' '}
            <span className="neon-purple lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>High-CTR Ads</span>,{' '}
            <span className="neon-cyan lg:!text-transparent lg:!bg-clip-text lg:![-webkit-text-fill-color:transparent]" style={{ color: '#00FFFF', textShadow: '0 0 4px #FFFFFF' }}>Viral Content</span> & Web Architecture.
          </motion.h1>

          {/* Mobile-only Video Showcase (placed between Headline and Description for intuitive mobile flow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="block lg:hidden w-full my-6"
          >
            <VideoShowcase />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base max-w-xl mt-4 mb-6 leading-relaxed"
            style={{ textShadow: '0 2px 14px rgba(0,0,0,0.55)' }}
          >
            Full-service growth agency specializing in Brand Identity, Meta/Google PPC Scaling, Short-Form Reel Creation, and Custom High-Converting Websites.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
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

        {/* Right Column - Desktop 3D Video Showcase (lg:col-span-5) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block lg:col-span-5 w-full"
        >
          <VideoShowcase />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-slate-400"
      >
        <TrendingUp className="w-4 h-4" />
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

