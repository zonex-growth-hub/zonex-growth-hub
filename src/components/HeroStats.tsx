import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { HERO_STATS, type HeroStat } from '@/data/content';
import { useApp } from '@/context/AppContext';

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
  const { currency } = useApp();
  
  // Dynamically calculate and format stats based on selected currency
  const isBudgetStat = index === 0;
  const target = isBudgetStat ? (currency === 'INR' ? 1.2 : 150) : stat.target;
  const decimals = isBudgetStat ? (currency === 'INR' ? 1 : 0) : stat.decimals;
  const prefix = isBudgetStat ? (currency === 'INR' ? '₹' : '$') : stat.prefix;
  const suffix = isBudgetStat ? (currency === 'INR' ? 'Cr+' : 'K+') : stat.suffix;

  const display = useCountUp(target, decimals, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative rounded-xl sm:rounded-2xl p-2 sm:p-6 text-center overflow-hidden group border border-zinc-200 dark:border-purple-500/20 shadow-md premium-card will-change-transform translate-z-0"
    >
      <div className="relative text-sm sm:text-3xl lg:text-4xl font-bold gradient-text flex items-center justify-center gap-0.5 sm:gap-1.5">
        {stat.star && <Star className="w-3 h-3 sm:w-6 sm:h-6 text-purple-600 dark:text-cyan-400 animate-pulse" fill="currentColor" />}
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="relative mt-1 sm:mt-2 text-[9px] sm:text-[13px] lg:text-[15px] text-zinc-700 dark:text-slate-350 font-medium tracking-normal sm:tracking-wide leading-tight text-center">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative pt-2 pb-6 md:pt-4 md:pb-10 px-2 sm:px-6 lg:px-8">
      <div ref={ref} className="container-max">
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-5 lg:gap-6 px-1 sm:px-0">
          {HERO_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroStats;
