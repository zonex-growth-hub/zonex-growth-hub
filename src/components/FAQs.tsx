import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '@/data/content';
import { SectionHeading } from './SectionHeading';

export function FAQs() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section id="faqs" className="section-pad relative" aria-label="Frequently Asked Questions">
      <div className="container-max">
        <SectionHeading
          eyebrow="FAQs"
          title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
          subtitle="Everything you need to know about timelines, budgets, guarantees, and deliverables."
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
                className={`glass-strong rounded-2xl overflow-hidden transition-colors ${isOpen ? 'border-violet-500/40' : ''}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  className="flex items-center justify-between w-full p-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <h3 className="font-semibold text-base sm:text-lg text-white pr-4">{faq.question}</h3>
                  <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-violet-500/20 text-violet-400' : 'glass'}`}>
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
                      <p className="px-5 pb-5 text-sm sm:text-base text-slate-400 light:text-slate-600 leading-relaxed">
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
