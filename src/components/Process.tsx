import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function Process() {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const mobileSteps = showAllSteps ? PROCESS_STEPS : PROCESS_STEPS.slice(0, 2);

  return (
    <section id="process" className="section-pad relative" aria-label="Growth Process &amp; Methodology">
      <div className="container-max">
        <SectionHeading
          eyebrow="Data-Backed Growth Methodology"
          title={<>Proven <span className="gradient-text">Execution Framework</span> for Karnataka Brands</>}
          subtitle="From initial brand audit to multi-channel scaling — a proven, battle-tested execution framework for businesses across Karnataka."
        />

        {/* Desktop layout: hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/20 via-violet-royal/20 to-cyan-400/20" />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Sparkles;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative rounded-3xl p-6 border border-zinc-200 dark:border-white/10 premium-card will-change-transform translate-z-0 group"
              >
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-deep/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-purple-600 dark:text-violet-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-violet-deep text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="text-sm text-zinc-700 dark:text-slate-400 leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile layout: hidden on desktop */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-4">
            {mobileSteps.map((step) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Sparkles;
              return (
                <div
                  key={step.step}
                  className="p-3.5 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 shadow-md premium-card will-change-transform translate-z-0 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-deep/20 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-purple-600 dark:text-violet-400" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-violet-deep text-white text-[10px] font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold mt-2 mb-1 text-zinc-900 dark:text-white">{step.title}</h3>
                    <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive expander toggle */}
          <button
            type="button"
            onClick={() => setShowAllSteps(!showAllSteps)}
            className="mt-4 w-full py-2.5 px-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            {showAllSteps ? (
              <>Show Less ↑</>
            ) : (
              <>View All Steps (4) ↓</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Process;
