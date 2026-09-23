import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type MotionStyle } from 'framer-motion';
import { X, TrendingUp, BarChart3, ExternalLink, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { PROJECTS, PORTFOLIO_FILTERS, type Project } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

const metricColors: Record<string, string> = {
  emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  gold: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
  royal: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
};

interface CaseStudyDetails {
  problem: string;
  solution: string;
  roas: string;
  revenue: string;
  videoUrl: string;
}

const CASE_STUDIES: Record<number, CaseStudyDetails> = {
  1: {
    problem: 'Saturated local listing competition in Mysuru & Bengaluru, high acquisition costs, and poor Google Maps rankings.',
    solution: 'Optimized local citations structure, automated Review campaigns, and geo-targeted landing page lead capture.',
    roas: '4.8x',
    revenue: '₹12,00,000',
    videoUrl: 'https://files.catbox.moe/0dtism.mp4',
  },
  2: {
    problem: 'High ad spend waste on unoptimized keywords, slow loading checkout pages causing 65% mobile drop-off.',
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

function BentoProjectCard({ 
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
  const rotateX = useTransform(y, [-50, 50], [6, -6]);
  const rotateY = useTransform(x, [-50, 50], [-6, 6]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set((cx / rect.width) * 50);
    y.set((cy / rect.height) * 50);
  };

  const handleLeave = () => { 
    x.set(0); 
    y.set(0); 
  };
  
  const style: MotionStyle = { rotateX, rotateY, transformStyle: 'preserve-3d' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="p-5 flex flex-col justify-between bg-[#0B0B10]/80 backdrop-blur-2xl border border-white/[0.08] hover:border-purple-500/40 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_40px_rgba(138,99,248,0.15)]"
    >
      {/* Image / Media Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden rounded-2xl mb-4" style={{ transform: 'translateZ(30px)' }}>
        <img
          src={project.image}
          alt={`ZoneX Growth Agency case study - ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-transparent to-transparent" />
        
        {/* Metric Tag */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${metricColors[project.metricColor]} z-10 flex items-center gap-1.5`}>
          <TrendingUp className="w-3.5 h-3.5" />
          {project.metric}
        </div>
      </div>

      {/* Info Content */}
      <div className="space-y-2 select-none" style={{ transform: 'translateZ(20px)' }}>
        <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 block">{project.category}</span>
        <h3 className="font-display font-bold text-lg text-white leading-snug group-hover:text-purple-300 transition-colors">{project.title}</h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-normal">{project.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 mt-2 flex items-center justify-between border-t border-white/5" style={{ transform: 'translateZ(25px)' }}>
        <button
          type="button"
          onClick={() => { playClick(); onCaseStudy(); }}
          className="text-xs font-bold text-purple-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View ROAS Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClick}
            className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const { playClick } = useApp();
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<{ project: Project; details: CaseStudyDetails } | null>(null);

  const filtered = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));

  const handleOpenCaseStudy = (p: Project) => {
    const details = CASE_STUDIES[p.id] ?? {
      problem: 'High customer acquisition cost and unoptimized funnel conversions.',
      solution: 'Deployed custom high-conversion React architecture with targeted paid ad creative testing.',
      roas: '4.2x',
      revenue: '₹15,00,000+',
      videoUrl: 'https://files.catbox.moe/0dtism.mp4',
    };
    setActiveCaseStudy({ project: p, details });
  };

  return (
    <section id="portfolio" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Proven ROAS Track Record"
          title={<>Case Studies &amp; <span className="gradient-text-accent">Verified Results</span></>}
          subtitle="Real client campaign breakdowns with verified revenue multi-folds across Mysuru, Bengaluru &amp; Pan-India."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { playClick(); setFilter(f); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === f
                  ? 'bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] text-white shadow-lg shadow-purple-500/20'
                  : 'bg-[#0B0B10] text-slate-400 hover:text-white border border-white/[0.08]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((project) => (
            <BentoProjectCard
              key={project.id}
              project={project}
              onPreview={() => setActiveProject(project)}
              onCaseStudy={() => handleOpenCaseStudy(project)}
            />
          ))}
        </div>

        {/* Government MSME Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] p-6 sm:p-8 bg-[#0B0B10]/80 backdrop-blur-2xl relative overflow-hidden select-none flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl"
        >
          <div className="text-left space-y-3">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              GOVERNMENT REGISTERED &amp; ACCREDITED
            </span>
            <h3 className="text-xl sm:text-2xl font-black font-display text-white leading-tight">
              Govt. Recognized Digital Growth Agency &amp; Academy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Officially registered under MSME &amp; Government of India guidelines, empowering Karnataka brands and marketing professionals with compliant, battle-tested digital infrastructure.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                MSME Reg. Verified // Karnataka, IN
              </span>
              <span className="inline-flex items-center text-[10px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/30 px-3 py-1 rounded-lg font-mono">
                UDYAM-KR-18-009231
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <a
              href="https://drive.google.com/file/d/1v5MguLXSTf1ALjttmKxj_ONFsrW1QFuB/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/40 text-purple-200 font-bold text-xs sm:text-sm hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-lg shadow-purple-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>📄 View Official Certificate &amp; Registration</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCaseStudy(null)}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] bg-[#07070B] border border-white/10 rounded-3xl p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 select-none">
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white">{activeCaseStudy.project.title}</h3>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">{activeCaseStudy.project.category} • Case Study Breakdown</span>
                </div>
                <button onClick={() => setActiveCaseStudy(null)} className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified ROAS Multiplier</span>
                    <strong className="text-xl font-bold text-emerald-400 font-display">{activeCaseStudy.details.roas}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Generated Campaign Revenue</span>
                    <strong className="text-xl font-bold text-cyan-400 font-display">{activeCaseStudy.details.revenue}</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">Challenge &amp; Bottlenecks</h4>
                  <p className="opacity-90 leading-relaxed font-normal">{activeCaseStudy.details.problem}</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">ZoneX Growth Execution</h4>
                  <p className="opacity-90 leading-relaxed font-normal">{activeCaseStudy.details.solution}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <button onClick={() => setActiveCaseStudy(null)} className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 uppercase tracking-wider text-xs text-center cursor-pointer">
                  Close Breakdown
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
