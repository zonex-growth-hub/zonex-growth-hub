import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Star, ShieldCheck, Award, TrendingUp, CheckCircle2 } from 'lucide-react';
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
      className="relative rounded-2xl p-5 text-center overflow-hidden group bg-[#0B0B10]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(138,99,248,0.2)] transition-all duration-300"
    >
      <div className="relative text-2xl sm:text-3xl lg:text-4xl font-bold font-display gradient-text-accent flex items-center justify-center gap-1">
        {stat.star && <Star className="w-5 h-5 text-cyan-400 animate-pulse fill-cyan-400" />}
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="relative mt-2 text-xs sm:text-sm text-slate-300 font-medium tracking-wide">
        {stat.label}
      </div>
    </motion.div>
  );
}

export function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative pt-4 pb-12 px-4 sm:px-6 lg:px-8 select-none">
      <div ref={ref} className="max-w-7xl mx-auto space-y-6">
        
        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {HERO_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} active={inView} index={i} />
          ))}
        </div>

        {/* Elite Credibility & Government Registration Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#08080D]/90 backdrop-blur-2xl border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Government Registered MSME Entity: <strong className="text-white font-mono">UDYAM-KR-18-009231</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400 shrink-0" />
            <span>Google Partner &amp; Meta Ads Certified Architecture</span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Pan-Karnataka Operations: <span className="text-white">Mysuru HQ • Bengaluru • Statewide</span></span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroStats;
