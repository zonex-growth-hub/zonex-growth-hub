import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { HERO_STATS, type HeroStat } from '@/data/content';

function useCountUp(target: number, decimals: number, active: boolean, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, decimals, active, duration]);
  return value.toFixed(decimals);
}

function StatCard({ stat, active, index }: { stat: HeroStat; active: boolean; index: number }) {
  const display = useCountUp(stat.target, stat.decimals, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-2xl p-6 sm:p-8 text-center overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, rgba(20,16,38,0.7), rgba(12,10,24,0.55))',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(139,92,246,0.28)',
        boxShadow: '0 0 24px -8px rgba(139,92,246,0.3), inset 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Hover glow border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: '0 0 32px -4px rgba(139,92,246,0.5), inset 0 0 0 1px rgba(139,92,246,0.5)' }}
      />
      <div className="relative text-3xl lg:text-4xl font-bold gradient-text flex items-center justify-center gap-1.5">
        {stat.star && <Star className="w-6 h-6 text-cyan-400" fill="currentColor" style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }} />}
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="relative mt-2 text-sm sm:text-base text-slate-300 light:text-slate-500 font-medium tracking-wide">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {HERO_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
