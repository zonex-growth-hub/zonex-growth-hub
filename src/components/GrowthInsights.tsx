import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Target } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';

interface ArticleItem {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  hub: string;
  points: string[];
}

const ARTICLES: ArticleItem[] = [
  {
    id: 'mysuru-digital-marketing-framework',
    tag: 'Regional SEO & Local Domination',
    tagColor: 'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/50',
    title: 'How Mysuru & Bengaluru Businesses Scale 10x with Hyper-Local SEO & Google Maps Domination',
    excerpt: 'A deep-dive into how ZoneX Growth Agency captures high-intent local search queries across Karnataka commercial hubs, generating 4x higher inbound customer inquiries.',
    readTime: '4 min read',
    hub: 'Mysuru (HQ) & Bengaluru',
    points: [
      'Google Business Profile (GBP) Local 3-Pack Optimization',
      'Hyper-targeted geo-keyword clusters (Mysuru, Bengaluru, Chikkamagaluru)',
      'Schema structured data injection for instant AI search citations',
    ],
  },
  {
    id: 'meta-google-ads-roas-scaling',
    tag: 'Performance Advertising',
    tagColor: 'bg-cyan-100 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/50',
    title: 'The 4.2x ROAS Meta & Google PPC Playbook for D2C & Regional Enterprises',
    excerpt: 'Discover the exact creative testing frameworks, dynamic budget allocation methods, and full-funnel tracking architectures we use to scale paid media spend profitably.',
    readTime: '5 min read',
    hub: 'Statewide Karnataka & India',
    points: [
      'High-CTR video hook formulas engineered for short-form attention',
      'Custom audience segmentation & predictive lifetime value modeling',
      'Server-side CAPI tracking & zero-leak attribution dashboards',
    ],
  },
  {
    id: 'ai-business-automation-growth',
    tag: 'AI Workflows & Web Systems',
    tagColor: 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/50',
    title: 'Next-Gen AI Business Automations & Frictionless Lead Funnels for High Conversion',
    excerpt: 'Why traditional slow-loading websites lose 60% of paid ad traffic and how lightning-fast React architecture combined with WhatsApp lead triggers compounds conversion rates.',
    readTime: '3 min read',
    hub: 'Karnataka Tech Ecosystem',
    points: [
      'Sub-second Core Web Vitals performance for maximum Google quality scores',
      'Automated 2-step WhatsApp inquiry routing (< 5 min response time)',
      'Programmatic landing page generation for multi-city search capture',
    ],
  },
];

export function GrowthInsights() {
  const [selected, setSelected] = useState<string | null>(null);

  // Dynamically inject Article Schema markup for index crawl on playbook expansion
  useEffect(() => {
    const scriptId = 'insights-article-schema';
    const oldScript = document.getElementById(scriptId);
    if (oldScript) oldScript.remove();

    if (selected) {
      const art = ARTICLES.find(a => a.id === selected);
      if (art) {
        const schema = {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": art.title,
          "description": art.excerpt,
          "inLanguage": "en",
          "author": {
            "@type": "Organization",
            "name": "ZoneX Growth Agency",
            "url": "https://www.zonexgrowth-agency.in"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ZoneX Growth Agency",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.zonexgrowth-agency.in/logo-zonex.jpg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.zonexgrowth-agency.in/#insights"
          },
          "datePublished": "2026-08-30",
          "dateModified": "2026-08-30"
        };
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(schema);
        document.head.appendChild(script);
      }
    }

    return () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
    };
  }, [selected]);

  const handleRead = (article: ArticleItem) => {
    analytics.trackViewContent(`Growth Insight: ${article.title}`, { hub: article.hub });
    setSelected(selected === article.id ? null : article.id);
  };

  const handleConsultation = () => {
    analytics.trackLead('Growth Insight CTA Click');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="insights" className="section-pad relative" aria-label="Growth Insights &amp; Digital Marketing Playbooks">
      <div className="container-max">
        <SectionHeading
          eyebrow="Continuous Knowledge Engine"
          title={<>Authoritative <span className="gradient-text">Growth Insights</span> &amp; Playbooks</>}
          subtitle="Programmatically curated strategies on performance advertising, local SEO engineering, and AI automation for regional leaders."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {ARTICLES.map((art, i) => {
            const isOpen = selected === art.id;

            return (
              <motion.article
                key={art.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 sm:p-7 flex flex-col justify-between premium-card will-change-transform translate-z-0 group border border-zinc-200 dark:border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${art.tagColor}`}>
                      {art.tag}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-slate-555 font-medium">{art.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-slate-400 leading-relaxed mb-4 font-medium">
                    {art.excerpt}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-violet-400 font-semibold mb-4">
                    <Target className="w-3.5 h-3.5" />
                    <span>Focus: {art.hub}</span>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden pt-3 pb-2 border-t border-zinc-200 dark:border-white/10"
                      >
                        <h4 className="text-xs font-bold uppercase text-purple-600 dark:text-cyan-300 mb-2">Key Execution Highlights:</h4>
                        <ul className="space-y-2 mb-4">
                          {art.points.map((pt) => (
                            <li key={pt} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-slate-300 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-violet-400 mt-1.5 shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleRead(art)}
                    className="text-xs font-bold text-purple-600 dark:text-violet-400 hover:text-purple-800 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isOpen ? 'Show Less' : 'Read Framework'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleConsultation}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-violet-950/60 hover:bg-purple-600 dark:hover:bg-violet-700 text-purple-750 dark:text-purple-200 hover:text-white border border-purple-200 dark:border-violet-500/30 transition-all cursor-pointer"
                  >
                    Apply to My Brand
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GrowthInsights;
