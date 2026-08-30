import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`mb-5 md:mb-8 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}
    >
      {eyebrow && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase glass mb-2 mt-0 text-purple-600 dark:text-violet-400">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-2 md:mb-3 text-zinc-900 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-0 text-xs md:text-sm text-zinc-750 dark:text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
