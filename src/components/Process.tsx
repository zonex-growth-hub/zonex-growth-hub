import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { PROCESS_STEPS } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

export function Process() {
  const { playClick } = useApp();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleStepClick = (stepNum: number) => {
    playClick();
    setActiveStep(stepNum);
  };

  return (
    <section id="process" className="py-16 md:py-24 relative select-none bg-[#030305]" aria-label="Growth Process &amp; Methodology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Data-Backed Growth Methodology"
          title={<>4-Step <span className="gradient-text-accent">Execution Framework</span></>}
          subtitle="From initial brand audit to multi-channel scaling — a proven, battle-tested execution framework for businesses across Karnataka."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[step.icon] ?? Icons.Sparkles;
            const isHighlighted = activeStep !== null && step.step <= activeStep;

            return (
              <motion.div
                key={step.step}
                onClick={() => handleStepClick(step.step)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className={`relative rounded-3xl p-6 bg-[#0B0B10]/80 backdrop-blur-2xl border transition-all duration-300 cursor-pointer group hover:shadow-[0_0_35px_rgba(138,99,248,0.2)] ${
                  isHighlighted
                    ? 'border-purple-500 shadow-[0_0_30px_rgba(138,99,248,0.3)] bg-purple-950/20'
                    : 'border-white/[0.08] hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black font-display text-purple-400/40 group-hover:text-purple-300 transition-colors">
                    0{step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg mb-2 text-white group-hover:text-purple-300 transition-colors">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Process;
