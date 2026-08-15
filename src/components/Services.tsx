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

export function Services() {
  return (
    <section id="services" className="section-pad relative" aria-label="Performance Solutions & Digital Services">
      <div className="container-max">
        <SectionHeading
          eyebrow="Regional & Multi-City Growth Solutions"
          title={<>Hyper-Targeted <span className="gradient-text">Performance Solutions</span> in Bengaluru, Mysuru &amp; Chikkamagaluru</>}
          subtitle="Data-backed growth stack: High-ROI Meta & Google PPC ads, local SEO dominance, high-conversion web engineering, and AI marketing workflows."
        />

        {/* Dedicated Semantic Regional Anchor Highlight */}
        <div className="mb-12 p-5 sm:p-6 rounded-2xl glass-strong border border-violet-500/30 text-center max-w-4xl mx-auto shadow-[0_0_30px_rgba(139,92,246,0.15)]">
          <p className="text-xs sm:text-sm md:text-base font-medium text-slate-200 leading-relaxed">
            📍 <span className="text-cyan-400 font-bold">Headquartered in Mysuru</span> — Empowering brands across <strong className="text-white">Mysuru, Bengaluru, Chikkamagaluru, and Karnataka</strong> with high-conversion marketing engines.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[service.icon] ?? Icons.Sparkles;
            const categoryTag = getCategoryTag(service.title);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="group relative glass-strong rounded-3xl overflow-hidden card-glow-hover hover:border-violet-500/50"
              >
                {/* Background image with geo-infused alt tag */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <img
                    src={service.image}
                    alt={`ZoneX Growth Hub digital marketing and AI growth service - ${service.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />

                {/* Content */}
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center group-hover:glow-crimson transition-all duration-300">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <span className="text-3xl font-bold text-white/5 group-hover:text-violet-500/20 transition-colors">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Contextual AEO Tag */}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-violet-500/10 text-cyan-300 border border-violet-500/20 mb-2.5 inline-block">
                    {categoryTag}
                  </span>

                  <h3 className="font-display font-bold text-lg leading-tight mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-400 light:text-slate-600 leading-relaxed mb-4">{service.description}</p>

                  <ul className="space-y-1.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-slate-300 light:text-slate-600">
                        <Icons.Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl border border-violet-500/0 group-hover:border-violet-500/30 transition-colors duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
