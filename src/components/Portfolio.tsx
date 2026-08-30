import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type MotionStyle } from 'framer-motion';
import { ExternalLink, X, Eye, TrendingUp } from 'lucide-react';
import { PROJECTS, PORTFOLIO_FILTERS, type Project } from '@/data/content';
import { SectionHeading } from './SectionHeading';

const metricColors: Record<string, string> = {
  emerald: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
  cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  gold: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
  royal: 'text-violet-300 border-violet-400/30 bg-violet-400/10',
};

function TiltCard({ project, onPreview, onOpen }: { project: Project; onPreview: () => void; onOpen?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x.set((cx / rect.width) * 50);
    y.set((cy / rect.height) * 50);
  };

  const handleLeave = () => { x.set(0); y.set(0); };
  const style: MotionStyle = { rotateX, rotateY, transformStyle: 'preserve-3d' };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (onOpen && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpen();
        }
      }}
      role={onOpen ? 'link' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="p-2 sm:p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col justify-between overflow-hidden card-glow-hover group hover:border-violet-500/50"
    >
      {/* Image Container */}
      <div className="relative h-24 sm:h-48 overflow-hidden rounded-lg mb-2" style={{ transform: 'translateZ(40px)' }}>
        <img
          src={project.image}
          alt={`ZoneX Growth Hub digital marketing strategy and web engineering - ${project.title}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        <div className={`absolute top-2 left-2 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-bold border ${metricColors[project.metricColor]}`}>
          <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-1" />
          {project.metric}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
        <div>
          <span className="text-[9px] sm:text-xs font-semibold text-purple-400 mb-1 block uppercase tracking-wider">
            {project.category === 'Restaurant & Food Chain Web App' ? project.category : project.category === 'Brand Identity' ? 'BRAND IDENTITY / WEB DEV' : project.category === 'Web Development' ? 'WEB DEVELOPMENT' : project.category.toUpperCase()}
          </span>
          <h3 className="text-xs sm:text-lg font-bold leading-tight line-clamp-1 mb-1 text-white">{project.title}</h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-2 mb-2 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech badges (hidden on mobile to keep layout compact) */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium glass text-slate-300 light:text-slate-600">
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-3 flex flex-col gap-1.5 sm:gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 sm:py-2.5 sm:px-4 rounded-md sm:rounded-xl text-[10px] sm:text-sm font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/40 hover:bg-violet-500/25 hover:border-violet-400 transition-all text-center"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            Explore Live
          </a>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview();
            }}
            className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 sm:py-2.5 sm:px-4 rounded-md sm:rounded-xl text-[10px] sm:text-sm font-semibold glass text-slate-300 hover:bg-violet-500/10 transition-all"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            Live Preview
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof PORTFOLIO_FILTERS)[number]>('All Work');
  const [preview, setPreview] = useState<Project | null>(null);
  const filtered = filter === 'All Work' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Live Portfolio"
          title={<>Interactive <span className="gradient-text">Case Studies</span> &amp; Web Previews</>}
          subtitle="Real projects, real metrics. Click any card to launch a full-screen interactive preview."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white glow-crimson'
                  : 'glass text-slate-300 light:text-slate-600 hover:text-violet-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid Container configured for 2x2 layout on mobile screens */}
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
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-violet-500/20">
                <div>
                  <h3 className="font-display font-bold text-lg">{preview.title}</h3>
                  <span className="text-xs text-violet-400">{preview.url}</span>
                </div>
                <button onClick={() => setPreview(null)} className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-violet-500/10">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <iframe src={preview.url} title={preview.title} className="flex-1 w-full bg-white" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;
