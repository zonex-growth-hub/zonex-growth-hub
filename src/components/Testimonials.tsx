import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, BadgeCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

export function Testimonials() {
  const { playClick } = useApp();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Social Proof &amp; Reviews"
          title={<>Client Growth <span className="gradient-text-accent">Testimonials</span></>}
          subtitle="Real founders, real scaling. Here's what ambitious brand leaders say about our performance ads infrastructure."
        />

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-[#0B0B10]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-cyan-400 fill-cyan-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-xl font-display font-medium leading-relaxed text-white mb-6">"{active.text}"</p>

              {/* Author */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <img src={active.avatar} alt={active.name} loading="lazy" className="w-12 h-12 rounded-2xl object-cover border border-purple-500/40" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">{active.name}</span>
                      <BadgeCheck className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-xs text-slate-400">{active.role}, {active.company}</span>
                  </div>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {active.growth}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => { playClick(); setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-purple-600 transition-all cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { playClick(); setIndex(i); }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? 'w-8 bg-purple-500' : 'w-2 bg-white/20'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => { playClick(); setIndex((i) => (i + 1) % TESTIMONIALS.length); }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-purple-600 transition-all cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
