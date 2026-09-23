import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronDown, Sparkles, MapPin, Search } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

interface ArticleItem {
  id: string;
  tag: string;
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
    tag: 'Performance Media Buying',
    title: 'Deconstructing 4.2x ROAS Meta & Google PPC Campaign Infrastructure',
    excerpt: 'Step-by-step breakdown of how our media buyers construct high-ROAS ad sets, perform creative testing sprints, and prevent customer acquisition cost (CAC) inflation.',
    readTime: '5 min read',
    hub: 'Pan-Karnataka & D2C India',
    points: [
      'First-party CAPI server tracking setup for 100% conversion attribution',
      'Dynamic creative testing (DCT) matrix targeting high-intent cohorts',
      'Conversion Rate Optimization (CRO) funnels with < 1.2s page load speed',
    ],
  },
  {
    id: 'viral-short-form-video-reels',
    tag: 'Creative Production & Reels',
    title: 'High-Retention Video Editing Systems that Drive Organic Reach & Direct Sales',
    excerpt: 'Why traditional promo videos fail on Instagram & YouTube Shorts, and how high-hook 15-second creative reels turn passive viewers into active buyers.',
    readTime: '3 min read',
    hub: 'Content Studio Mysuru',
    points: [
      '3-Second Visual Pattern Interrupts that stop infinite scrolling',
      'Native CapCut & Premiere Pro color grading for high-end brand perception',
      'Direct WhatsApp conversion triggers embedded in video descriptions',
    ],
  },
];

export function GrowthInsights() {
  const { playClick } = useApp();
  const [openId, setOpenId] = useState<string | null>(ARTICLES[0].id);

  const toggleAccordion = (id: string) => {
    playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="insights" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Regional Authority & Playbooks"
          title={<>Karnataka Growth <span className="gradient-text-accent">Playbooks &amp; Insights</span></>}
          subtitle="Battle-tested digital marketing blueprints engineered for Mysuru, Bengaluru, and pan-India commercial scaling."
        />

        {/* Playbook Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {ARTICLES.map((article) => {
            const isOpen = openId === article.id;
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-[#0B0B10]/80 backdrop-blur-2xl border border-white/[0.08] overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(article.id)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {article.tag}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {article.hub}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-snug">{article.title}</h3>
                  </div>

                  <div className={`w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-600 text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-xs sm:text-sm text-slate-300 border-t border-white/5 space-y-4 font-normal">
                        <p className="leading-relaxed opacity-90">{article.excerpt}</p>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 block mb-1">Key Growth Action Pillars:</span>
                          {article.points.map((pt) => (
                            <div key={pt} className="flex items-center gap-2 text-xs font-medium text-slate-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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

export default GrowthInsights;
