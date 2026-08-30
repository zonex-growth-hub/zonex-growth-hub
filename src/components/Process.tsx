import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

export function Process() {
  const { playClick } = useApp();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showAllSteps, setShowAllSteps] = useState(false);

  const mobileSteps = showAllSteps ? PROCESS_STEPS : PROCESS_STEPS.slice(0, 2);

  const handleStepClick = (stepNum: number) => {
    playClick();
    // Reset and trigger laser flow sequentially up to the clicked step
    setActiveStep(1);
    for (let s = 1; s <= stepNum; s++) {
      setTimeout(() => {
        setActiveStep(s);
      }, (s - 1) * 250);
    }
  };

  return (
    <section id="process" className="relative pt-6 pb-4 md:pt-10 md:pb-8" aria-label="Growth Process &amp; Methodology">
      <div className="container-max">
        <SectionHeading
          eyebrow="Data-Backed Growth Methodology"
          title={<>Proven <span className="gradient-text">Execution Framework</span> for Karnataka Brands</>}
          subtitle="From initial brand audit to multi-channel scaling — a proven, battle-tested execution framework for businesses across Karnataka."
        />

        {/* Desktop layout: hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line with automated moving laser beam if active */}
          <div className={`hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-zinc-200 dark:bg-white/10 ${activeStep !== null ? 'animate-laser bg-purple-500/20' : ''}`} />

          {PROCESS_STEPS.map((step, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Sparkles;
            const isHighlighted = activeStep !== null && step.step <= activeStep;

            return (
              <motion.div
                key={step.step}
                onClick={() => handleStepClick(step.step)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className={`relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer premium-card will-change-transform translate-z-0 group ${
                  isHighlighted 
                    ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.25)] bg-gradient-to-br from-purple-500/5 to-transparent' 
                    : 'border-zinc-200 dark:border-white/10'
                }`}
              >
                <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                  isHighlighted ? 'bg-purple-500/30 scale-105' : 'bg-gradient-to-br from-violet-500/20 to-violet-deep/20'
                }`}>
                  <Icon className={`w-7 h-7 transition-colors ${isHighlighted ? 'text-purple-400' : 'text-purple-600 dark:text-violet-400'}`} />
                  <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center transition-all ${
                    isHighlighted ? 'bg-purple-600 scale-110 shadow-[0_0_10px_#a855f7]' : 'bg-gradient-to-br from-violet-500 to-violet-deep'
                  }`}>
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
              const isHighlighted = activeStep !== null && step.step <= activeStep;

              return (
                <div
                  key={step.step}
                  onClick={() => handleStepClick(step.step)}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all duration-300 premium-card will-change-transform translate-z-0 ${
                    isHighlighted 
                      ? 'border-purple-500 bg-gradient-to-r from-purple-500/5 to-transparent' 
                      : 'border-zinc-200/80 dark:border-white/10'
                  }`}
                >
                  <div>
                    <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isHighlighted ? 'bg-purple-500/25' : 'bg-gradient-to-br from-purple-500/20 to-violet-deep/20'
                    }`}>
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
            onClick={() => { playClick(); setShowAllSteps(!showAllSteps); }}
            className="mt-4 w-full py-2.5 px-4 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
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
