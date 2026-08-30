import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type MotionStyle } from 'framer-motion';
import { X, TrendingUp, BarChart3, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { PROJECTS, PORTFOLIO_FILTERS, type Project } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

const metricColors: Record<string, string> = {
  emerald: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/10',
  cyan: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  gold: 'text-yellow-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  royal: 'text-purple-600 dark:text-violet-300 border-violet-400/30 bg-violet-400/10',
};

// Case Study details interface
interface CaseStudyDetails {
  problem: string;
  solution: string;
  roas: string;
  revenue: string;
  videoUrl: string;
}

const CASE_STUDIES: Record<number, CaseStudyDetails> = {
  1: {
    problem: 'Saturated local listing competition in Bengaluru, high customer acquisition costs, and poor mapping rankings.',
    solution: 'Optimized local citations structure, automated Review campaigns, and geo-targeted landing page capture.',
    roas: '4.8x',
    revenue: '₹12,00,000',
    videoUrl: 'https://files.catbox.moe/0dtism.mp4',
  },
  2: {
    problem: 'High ad spend waste on broad keywords, slow loading checkout pages causing 65% mobile drop-off.',
    solution: 'Engineered clean React storefront, implemented custom pixel server tracking, and deployed interactive quiz funnels.',
    roas: '4.2x',
    revenue: '₹28,00,000',
    videoUrl: 'https://files.catbox.moe/bl5ukt.mp4',
  },
  3: {
    problem: 'Washed-out brand perception, stagnant click-through-rates (CTR) under 1.2% across traditional channels.',
    solution: 'High-hook dynamic reels production, interactive story ads testing, and premium glassmorphic visual layouts.',
    roas: '5.1x',
    revenue: '₹18,50,000',
    videoUrl: 'https://files.catbox.moe/7fyys1.mp4',
  },
  4: {
    problem: 'Stagnant query rankings, poor indexing speed on fresh service pages, zero local keyword citations.',
    solution: 'Implemented automated AEO Schema tags, deployed hyper-local content maps, and built fast custom static pages.',
    roas: '3.6x',
    revenue: '₹8,40,000',
    videoUrl: 'https://files.catbox.moe/xasar8.mp4',
  },
};

function TiltCard({ 
  project, 
  onPreview, 
  onCaseStudy
}: { 
  project: Project; 
  onPreview: () => void; 
  onCaseStudy: () => void;
}) {
  const { playClick } = useApp();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set((cx / rect.width) * 50);
    y.set((cy / rect.height) * 50);

    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setGlareStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
    });
  };

  const handleLeave = () => { 
    x.set(0); 
    y.set(0); 
    setGlareStyle({ opacity: 0 });
  };
  
  const style: MotionStyle = { rotateX, rotateY, transformStyle: 'preserve-3d' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="p-3 sm:p-5 flex flex-col justify-between border border-zinc-200 dark:border-white/10 premium-card will-change-transform translate-z-0 group relative overflow-hidden"
    >
      {/* Interactive Shine Layer */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10" style={glareStyle} />

      {/* Image Container */}
      <div className="relative h-24 sm:h-48 overflow-hidden rounded-lg mb-2" style={{ transform: 'translateZ(40px)' }}>
        <img
          src={project.image}
          alt={`ZoneX Growth Agency strategy - ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-obsidian dark:via-obsidian/40 dark:to-transparent" />
        <div className={`absolute top-2 left-2 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-bold border ${metricColors[project.metricColor]} z-10`}>
          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-1" />
          {project.metric}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between z-10" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <span className="text-[9px] sm:text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 block uppercase tracking-wider">
            {project.category.toUpperCase()}
          </span>
          <h3 className="text-xs sm:text-lg font-bold leading-tight line-clamp-1 mb-1 text-zinc-900 dark:text-white">{project.title}</h3>
          <p className="text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-2 leading-relaxed font-medium">{project.description}</p>
        </div>

        {/* Tech badges */}
        <div className="hidden sm:flex flex-wrap gap-1.5 mt-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 text-[10px] font-bold text-zinc-650 dark:text-slate-350 border border-zinc-200 dark:border-white/10">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-1.5">
          <button
            onClick={() => { playClick(); onCaseStudy(); }}
            className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 rounded-lg text-[10px] sm:text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 shadow-md cursor-pointer transition-all active:scale-[0.98]"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Case Breakdown
          </button>
          
          <div className="grid grid-cols-2 gap-1.5">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-1 w-full py-1 px-1.5 rounded-lg text-[9px] sm:text-xs font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-slate-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-250 dark:hover:bg-white/10 transition-all text-center"
            >
              Explore Live
            </a>
            <button
              onClick={() => { playClick(); onPreview(); }}
              className="inline-flex items-center justify-center gap-1 w-full py-1 px-1.5 rounded-lg text-[9px] sm:text-xs font-semibold bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-slate-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-250 dark:hover:bg-white/10 transition-all"
            >
              Interactive
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const { playClick, formatPrice } = useApp();
  const [filter, setFilter] = useState<(typeof PORTFOLIO_FILTERS)[number]>('All Work');
  const [preview, setPreview] = useState<Project | null>(null);
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [csMuted, setCsMuted] = useState(true);

  const filtered = filter === 'All Work' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  // Dynamic campaign data inside Ads Manager mockup based on active currency
  const campaignBudget1 = formatPrice(40000, true);
  const campaignBudget2 = formatPrice(160000, true);

  return (
    <section id="portfolio" className="relative pt-8 pb-4 md:pt-14 md:pb-8">
      <div className="container-max">
        <SectionHeading
          eyebrow="Proven Scalability"
          title={<>Interactive <span className="gradient-text">Case Studies</span> &amp; Web Previews</>}
          subtitle="Real projects, real metrics. Click any card to launch an interactive live preview or net growth breakdown."
        />

        {/* ── META & GOOGLE ADS MANAGER LIVE MOCKUP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-10 rounded-2xl border border-zinc-200 dark:border-violet-500/20 shadow-md p-4 sm:p-5 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md relative overflow-hidden select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                Live Meta &amp; Google Campaign Performance Dashboard
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Strategy Metrics
            </div>
          </div>

          {/* Table list */}
          <div className="space-y-2.5">
            {/* Camp 1 */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Campaign: Lead Capture (Mysuru &amp; Bengaluru)</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">Local SEO &amp; Ads Routing</span>
              </div>
              <div className="flex gap-4 sm:gap-8 text-center">
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Budget</p>
                  <p className="text-xs font-black text-zinc-800 dark:text-slate-100">{campaignBudget1}/mo</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Conversions</p>
                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">340 Leads</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Verified ROAS</p>
                  <p className="text-xs font-black text-purple-600 dark:text-purple-400">4.8x</p>
                </div>
              </div>
            </div>

            {/* Camp 2 */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5">
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">Campaign: E-commerce Scale (Karnataka)</span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider">Performance Video Ads</span>
              </div>
              <div className="flex gap-4 sm:gap-8 text-center">
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Budget</p>
                  <p className="text-xs font-black text-zinc-800 dark:text-slate-100">{campaignBudget2}/mo</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Conversions</p>
                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">1,120 Purchases</p>
                </div>
                <div>
                  <p className="text-[9px] text-zinc-500 dark:text-slate-400 font-bold uppercase">Verified ROAS</p>
                  <p className="text-xs font-black text-purple-600 dark:text-purple-400">4.2x</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { playClick(); setFilter(f); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <motion.div 
          layout 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 px-3 sm:px-0"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <TiltCard
                key={project.id}
                project={project}
                onPreview={() => setPreview(project)}
                onOpen={project.id === 3 ? () => window.open(project.url, '_blank', 'noopener,noreferrer') : undefined}
                onCaseStudy={() => setCaseStudy(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[80vh] bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{preview.title}</h3>
                  <span className="text-xs text-purple-400">{preview.url}</span>
                </div>
                <button onClick={() => { playClick(); setPreview(null); }} className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe src={preview.url} title={preview.title} className="flex-1 w-full bg-white" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 30-Second Video Case Study Modal */}
      <AnimatePresence>
        {caseStudy && (() => {
          const details = CASE_STUDIES[caseStudy.id];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCaseStudy(null)}
              className="fixed inset-0 z-[85] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-zinc-950 border border-white/20 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl p-6 gap-6"
              >
                <button 
                  onClick={() => { playClick(); setCaseStudy(null); }} 
                  className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left side: Video */}
                <div className="w-full md:w-1/2 aspect-[9/16] bg-black rounded-xl overflow-hidden relative group max-h-[480px]">
                  {details ? (
                    <video
                      src={details.videoUrl}
                      autoPlay
                      loop
                      muted={csMuted}
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-zinc-900 text-zinc-500 text-xs">Video Unavailable</div>
                  )}

                  {/* Inline Audio Toggle overlay */}
                  <button
                    onClick={() => setCsMuted(!csMuted)}
                    className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    {csMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>

                {/* Right side: Case Metrics & Breakdown */}
                <div className="flex-1 flex flex-col justify-between text-left pt-6 md:pt-0">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-purple-400">Case Breakdown</span>
                    <h3 className="text-xl font-bold text-white mb-4 mt-0.5 leading-snug">{caseStudy.title}</h3>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">The Problem</h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-medium">{details?.problem}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Our Scaling Strategy</h4>
                        <p className="text-xs text-slate-350 leading-relaxed font-medium">{details?.solution}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Verified ROAS</p>
                      <p className="text-xl font-black text-purple-400 mt-1">{details?.roas}</p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">Revenue Generated</p>
                      <p className="text-xl font-black text-cyan-400 mt-1">{details ? (caseStudy.id === 2 ? formatPrice(2800000, true) : formatPrice(1200000, true)) : ''}</p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </section>
  );
}

export default Portfolio;
