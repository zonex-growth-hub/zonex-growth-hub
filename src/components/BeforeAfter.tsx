import { useState, useRef } from 'react';
import { X, Check, ArrowLeftRight, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const handleAuditClick = () => {
    analytics.trackLead('BeforeAfter Transformation CTA');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-pad relative" aria-label="Transformation Comparison">
      <div className="container-max">
        <SectionHeading
          eyebrow="The Difference"
          title={<>Before vs. <span className="gradient-text">After Transformation</span></>}
          subtitle="See what changes when you switch from traditional in-house marketing to our growth agency model."
        />

        <div
          ref={ref}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-white/40 dark:bg-zinc-900/40 select-none border border-zinc-200 dark:border-violet-500/20 shadow-lg dark:shadow-[0_0_40px_rgba(139,92,246,0.15)] premium-card will-change-transform translate-z-0"
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
        >
          <div className="grid grid-cols-2">
            {/* Before */}
            <div className="p-6 sm:p-8 bg-red-100/50 dark:bg-red-950/20 border-r border-zinc-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-500 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-zinc-900 dark:text-red-200">Traditional In-House</h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-medium">Competitors</p>
                </div>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-700 dark:text-red-300/80 font-medium">{item.label}</span>
                    <span className="font-semibold text-red-700 dark:text-red-400">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After */}
            <div className="p-6 sm:p-8 bg-purple-50/60 dark:bg-violet-950/20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-purple-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-purple-900 dark:text-violet-200">With ZoneX Growth Agency</h3>
                  <p className="text-xs text-purple-600 dark:text-violet-400 font-semibold">Growth Partner</p>
                </div>
              </div>
              <div className="space-y-3">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-zinc-700 dark:text-slate-300 font-medium">{item.label}</span>
                    <span className="font-semibold text-purple-700 dark:text-cyan-400">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-violet-500 glow-crimson pointer-events-none" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center glow-crimson cursor-ew-resize shadow-md">
              <ArrowLeftRight className="w-5 h-5 text-purple-600 dark:text-violet-400" />
            </div>
          </div>

          {/* Reveal overlay */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent" />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-slate-500 font-medium">
            ← Drag the slider horizontally to compare outcomes →
          </p>
          <button
            onClick={handleAuditClick}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 uppercase tracking-wider cursor-pointer"
          >
            Claim Your Transformation Audit <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
