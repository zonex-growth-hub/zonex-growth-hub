import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVICES } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

const getCategoryTag = (title: string): string => {
  if (title.includes('Paid') || title.includes('Video') || title.includes('Marketing') || title.includes('Creative') || title.includes('Social')) {
    return 'Performance Ads';
  }
  if (title.includes('SEO') || title.includes('Website') || title.includes('Search')) {
    return 'Local SEO Engineering';
  }
  return 'AI Growth Systems';
};

const CATEGORIES = ['All', 'Ads & Media', 'SEO & Web', 'AI Growth'];

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const { playClick } = useApp();
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
  const categoryTag = getCategoryTag(service.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="group relative rounded-3xl p-6 bg-[#0B0B10]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-purple-500/40 hover:shadow-[0_0_35px_rgba(138,99,248,0.15)] transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-3xl font-black font-display text-white/10 group-hover:text-purple-400/30 transition-colors">
            {String(service.id).padStart(2, '0')}
          </span>
        </div>

        <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-3 inline-block">
          {categoryTag}
        </span>

        <h3 className="font-display font-bold text-xl text-white leading-tight mb-3 group-hover:text-purple-300 transition-colors">{service.title}</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">{service.description}</p>

        <ul className="space-y-2 border-t border-white/5 pt-4">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Icons.Check className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-6 mt-4 border-t border-white/5">
        <a
          href="#contact"
          onClick={playClick}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 hover:text-white transition-colors"
        >
          <span>Explore Architecture</span>
          <Icons.ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

export function Services() {
  const { playClick } = useApp();
  const [activeTab, setActiveTab] = useState('All');

  const filtered = SERVICES.filter((s) => {
    if (activeTab === 'All') return true;
    const tag = getCategoryTag(s.title);
    if (activeTab === 'Ads & Media' && tag === 'Performance Ads') return true;
    if (activeTab === 'SEO & Web' && tag === 'Local SEO Engineering') return true;
    if (activeTab === 'AI Growth' && tag === 'AI Growth Systems') return true;
    return false;
  });

  return (
    <section id="services" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="High-Ticket Growth Systems"
          title={<>Full-Funnel <span className="gradient-text-accent">Services &amp; Architecture</span></>}
          subtitle="Engineered for ambitious regional brands scaling to ₹10L–₹1Cr+ monthly revenue across Meta, Google &amp; Web."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { playClick(); setActiveTab(cat); }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] text-white shadow-lg shadow-purple-500/20'
                  : 'bg-[#0B0B10] text-slate-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
