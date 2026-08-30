import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function FAQs() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="faqs" className="section-pad relative" aria-label="Frequently Asked Growth Questions">
      <div className="container-max">
        <SectionHeading
          eyebrow="Growth FAQ &amp; Regional Insights"
          title={<>Frequently Asked <span className="gradient-text">Growth Questions</span></>}
          subtitle="Answers to common inquiries regarding digital marketing, paid ads scaling, timelines, local SEO in Karnataka, and ZoneX Academy."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq) => {
            const isOpen = open === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className={`bg-white/80 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10 shadow-md rounded-2xl overflow-hidden transition-all premium-card will-change-transform translate-z-0 ${isOpen ? 'border-purple-500/50 dark:border-violet-500/40' : ''}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="flex items-center justify-between w-full p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-white pr-4">{faq.question}</h3>
                  <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-purple-100 dark:bg-violet-500/20 text-purple-600 dark:text-purple-400' : 'bg-zinc-100 dark:bg-white/5 text-purple-600 dark:text-purple-400 border border-zinc-200 dark:border-white/10'}`}>
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
                      <p className="px-5 pb-5 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
