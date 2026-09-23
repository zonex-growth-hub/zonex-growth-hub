import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { FAQS } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

export function FAQs() {
  const { playClick } = useApp();
  const [open, setOpen] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    playClick();
    setOpen(open === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 relative select-none bg-[#030305]" aria-label="Frequently Asked Growth Questions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Growth &amp; Regional Insights"
          title={<>Frequently Asked <span className="gradient-text-accent">Growth Questions</span></>}
          subtitle="Answers to common inquiries regarding digital marketing, paid ads scaling, timelines, local SEO in Karnataka, and ZoneX Academy."
        />

        <div className="max-w-4xl mx-auto space-y-4">
          {FAQS.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-[#0B0B10]/80 backdrop-blur-2xl border border-white/[0.08] rounded-3xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-purple-500/50 shadow-[0_0_30px_rgba(138,99,248,0.15)] bg-purple-950/20' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="flex items-center justify-between w-full p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-display font-bold text-base sm:text-lg text-white pr-4">{faq.question}</h3>
                  <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isOpen ? 'bg-purple-600 text-white' : 'bg-white/5 text-purple-400 border border-white/10'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQs;
