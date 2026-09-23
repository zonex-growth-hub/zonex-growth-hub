import { useState, useRef } from 'react';
import { X, Check, ArrowLeftRight, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';
import { useApp } from '@/context/AppContext';

export function BeforeAfter() {
  const { playClick } = useApp();
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
    playClick();
    analytics.trackLead('BeforeAfter Transformation CTA');
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 relative select-none bg-[#030305]" aria-label="Transformation Comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Growth Transformation"
          title={<>Traditional vs. <span className="gradient-text-accent">ZoneX Agency Model</span></>}
          subtitle="See what changes when you transition from scattered freelancers or slow in-house teams to our performance ads engine."
        />

        <div
          ref={ref}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-[#0B0B10] border border-white/[0.08] shadow-2xl select-none"
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
        >
          <div className="grid grid-cols-2">
            {/* Before (Competitor / Traditional) */}
            <div className="p-6 sm:p-8 bg-red-950/20 border-r border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">Traditional In-House</h3>
                  <p className="text-xs text-red-400 font-semibold">Legacy Competitors</p>
                </div>
              </div>
              <div className="space-y-4">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="font-bold text-red-400">{item.before}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After (ZoneX Growth Agency) */}
            <div className="p-6 sm:p-8 bg-purple-950/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Check className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">ZoneX Growth Agency</h3>
                  <p className="text-xs text-purple-400 font-semibold">High-Ticket Growth Partner</p>
                </div>
              </div>
              <div className="space-y-4">
                {BEFORE_AFTER.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-300 font-medium">{item.label}</span>
                    <span className="font-bold text-cyan-300">{item.after}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-purple-500 pointer-events-none" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#07070B] border border-purple-500 flex items-center justify-center cursor-ew-resize shadow-xl text-purple-300">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleAuditClick}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
          >
            <span>Upgrade Your Growth Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

export default BeforeAfter;
