import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SERVICES } from '@/data/content';
import { SectionHeading } from './SectionHeading';

const getCategoryTag = (title: string): string => {
  if (title.includes('Paid') || title.includes('Video') || title.includes('Marketing') || title.includes('Creative') || title.includes('Social')) {
    return 'Performance Ads';
  }
  if (title.includes('SEO') || title.includes('Website') || title.includes('Search')) {
    return 'Local SEO Engineering';
  }
  return 'AI Growth Systems';
};

const matchCategory = (tab: string, serviceTitle: string): boolean => {
  if (tab === 'All') return true;
  const cat = getCategoryTag(serviceTitle);
  if (tab === 'AI Growth' && cat === 'AI Growth Systems') return true;
  if (tab === 'Ads & Media' && cat === 'Performance Ads') return true;
  if (tab === 'SEO & Web' && cat === 'Local SEO Engineering') return true;
  return false;
};

// Desktop Card
function DesktopServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
  const categoryTag = getCategoryTag(service.title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
      className="hidden sm:block group relative rounded-2xl overflow-hidden transition-all duration-300 premium-card will-change-transform translate-z-0 border border-zinc-200 dark:border-white/10"
    >
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 z-0">
        <img
          src={service.image}
          alt={`ZoneX Growth Agency digital marketing and AI growth service - ${service.title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-obsidian dark:via-obsidian/80 dark:to-transparent z-0" />

      {/* Content */}
      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-all duration-300">
            <Icon className="w-6 h-6 text-purple-600 dark:text-violet-400" />
          </div>
          <span className="text-3xl font-bold text-zinc-900/5 dark:text-white/5 group-hover:text-purple-600/20 dark:group-hover:text-violet-500/20 transition-colors">
            {String(service.id).padStart(2, '0')}
          </span>
        </div>

        {/* Contextual AEO Tag */}
        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/50 mb-2.5 inline-block">
          {categoryTag}
        </span>

        <h3 className="font-display font-bold text-lg leading-tight mb-2 text-zinc-900 dark:text-white">{service.title}</h3>
        <p className="text-sm text-zinc-700 dark:text-slate-400 leading-relaxed mb-4 font-medium">{service.description}</p>

        <ul className="space-y-1.5">
          {service.deliverables.map((d) => (
            <li key={d} className="flex items-center gap-2 text-xs text-zinc-650 dark:text-slate-300 font-medium">
              <Icons.Check className="w-3.5 h-3.5 text-purple-600 dark:text-violet-400 shrink-0" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Mobile Card (Optimized 2x2 grid card)
function MobileServiceCard({ service }: { service: typeof SERVICES[number] }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
  return (
    <div className="p-3 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 flex flex-col justify-between shadow-sm premium-card will-change-transform translate-z-0">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="w-6 h-6 p-1 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-600 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <span className="text-[10px] font-bold text-zinc-400 dark:text-white/20">
            {String(service.id).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-xs font-bold leading-snug line-clamp-2 mt-1 mb-1 text-zinc-900 dark:text-white">{service.title}</h3>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2 leading-tight font-medium">{service.description}</p>
      </div>
    </div>
  );
}

export function Services() {
  const [activeTab, setActiveTab] = useState<'All' | 'AI Growth' | 'Ads & Media' | 'SEO & Web'>('All');
  const [showAllMobile, setShowAllMobile] = useState(false);

  const mobileFiltered = SERVICES.filter((s) => matchCategory(activeTab, s.title));
  const mobileDisplayed = showAllMobile ? mobileFiltered : mobileFiltered.slice(0, 4);

  return (
    <section id="services" className="section-pad relative" aria-label="Performance Solutions &amp; Digital Services">
      <div className="container-max">
        <SectionHeading
          eyebrow="Regional &amp; Multi-City Growth Solutions"
          title={<>Hyper-Targeted <span className="gradient-text">Performance Solutions</span> in Bengaluru, Mysuru &amp; Chikkamagaluru</>}
          subtitle="Data-backed growth stack: High-ROI Meta &amp; Google PPC ads, local SEO dominance, high-conversion web engineering, and AI marketing workflows."
        />

        {/* Dedicated Semantic Regional Anchor Highlight */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-violet-500/30 text-center max-w-4xl mx-auto shadow-md premium-card will-change-transform translate-z-0">
          <p className="text-xs sm:text-sm md:text-base font-semibold text-zinc-700 dark:text-slate-200 leading-relaxed">
            📍 <span className="text-purple-600 dark:text-cyan-400 font-bold">Headquartered in Mysuru</span> — Empowering brands across <strong className="text-zinc-900 dark:text-white">Mysuru, Bengaluru, Chikkamagaluru, and Karnataka</strong> with high-conversion marketing engines.
          </p>
        </div>

        {/* Desktop grid layout: hidden on mobile */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <DesktopServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Mobile layout: hidden on desktop */}
        <div className="block sm:hidden">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 px-3 pb-3 mb-4">
            {([ 'All', 'AI Growth', 'Ads & Media', 'SEO & Web' ] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAllMobile(false);
                }}
                className={
                  activeTab === tab
                    ? 'bg-purple-600 text-white font-semibold text-xs px-3 py-1.5 rounded-full shrink-0 shadow-sm'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-3 py-1.5 rounded-full shrink-0 font-medium'
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mobile Grid */}
          <div className="grid grid-cols-2 gap-2.5 px-3">
            {mobileDisplayed.map((service) => (
              <MobileServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* View More button */}
          {!showAllMobile && mobileFiltered.length > 4 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllMobile(true)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                View All Services ({mobileFiltered.length}) ↓
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Services;
