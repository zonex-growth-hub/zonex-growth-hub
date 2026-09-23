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
      className={`mb-8 md:mb-12 ${align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-2xl'}`}
    >
      {eyebrow && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-3 text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs md:text-sm text-slate-300 font-normal max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
