import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Eye } from 'lucide-react';
import { REELS, type ReelItem } from '@/data/content';
import { SectionHeading } from './SectionHeading';

function ReelCard({ reel, index, onSelect }: { reel: ReelItem; index: number; onSelect: (reel: ReelItem) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="flex flex-col items-center w-full"
      onClick={() => onSelect(reel)}
    >
      <div
        className="cursor-pointer rounded-2xl border-[2px] border-black/40 dark:border-white/20 p-1 bg-black aspect-[9/16] w-full max-h-[220px] sm:max-h-none overflow-hidden relative group hover:scale-[1.02] transition-transform shadow-lg shadow-black/40"
      >
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-4 text-center">
            <Film className="h-6 w-6 text-violet-400" />
            <p className="text-[10px] text-slate-500">Video unavailable</p>
          </div>
        ) : (
          <video
            src={reel.videoUrl || reel.video || reel.src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover rounded-xl pointer-events-none"
          />
        )}

        {/* View count badge */}
        <div className="text-[9px] px-1.5 py-0.5 bg-black/60 backdrop-blur-sm bottom-2 left-2 rounded-full flex items-center gap-1 absolute z-10 text-white font-semibold">
          <Eye className="h-2.5 w-2.5 text-white" />
          {reel.views}
        </div>
      </div>

      <div className="mt-1.5 text-center sm:text-left w-full px-1">
        <h3 className="text-[11px] sm:text-base font-bold leading-tight line-clamp-1 mt-1.5 text-zinc-900 dark:text-white">
          {reel.title}
        </h3>
        <p className="text-[9px] sm:text-xs font-semibold text-purple-500 line-clamp-1">
          {reel.type}
        </p>
        <p className="hidden sm:block mt-1 text-xs text-slate-500 leading-normal">
          {reel.caption}
        </p>
      </div>
    </motion.div>
  );
}

export function Reels() {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);

  const mainReels = REELS.filter((r) => r.id <= 3);
  const gymReels = REELS.filter((r) => r.id >= 4);

  const closeModal = () => setSelectedReel(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReel]);

  return (
    <section id="reels" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Reels Showcase"
          title={<>Short-Form <span className="gradient-text">Video Reels</span> &amp; Ad Creatives</>}
          subtitle="Real video work — tap any card to watch in full-screen interactive preview mode."
        />

        {/* Main showcase reels */}
        <div className="mb-16">
          <h3 className="mb-6 text-center font-display text-lg font-bold text-zinc-700 dark:text-slate-200">Featured Ad Creatives</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6 px-3 sm:px-0">
            {mainReels.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} onSelect={setSelectedReel} />
            ))}
          </div>
        </div>

        {/* Gym / Fitness reels */}
        <div>
          <h3 className="mb-6 text-center font-display text-lg font-bold text-zinc-700 dark:text-slate-200">Gym &amp; Fitness Reels</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6 px-3 sm:px-0">
            {gymReels.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} onSelect={setSelectedReel} />
            ))}
          </div>
        </div>
      </div>

      {/* Tap-To-Expand Video Popup Modal */}
      <AnimatePresence>
        {selectedReel && (
          <div 
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative z-[1000] w-full max-w-[340px] sm:max-w-[380px] h-[75vh] sm:h-[80vh] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Close Button */}
              <div className="absolute top-3 right-3 z-[1010] flex items-center gap-2">
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer text-sm font-bold shadow-lg"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Video Container (Strict Visible Sizing) */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  key={selectedReel.videoUrl || selectedReel.video || selectedReel.src || selectedReel.id}
                  src={selectedReel.videoUrl || selectedReel.video || selectedReel.src}
                  autoPlay
                  playsInline
                  controls
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent z-[1005] pointer-events-none">
                <span className="text-xs font-semibold text-purple-400 block mb-1">
                  {selectedReel.type || selectedReel.category || selectedReel.tag || 'Instagram Reel'}
                </span>
                <h3 className="text-base font-bold text-white leading-tight">
                  {selectedReel.title || 'Video Showcase'}
                </h3>
                {selectedReel.views && (
                  <span className="text-xs text-zinc-300 mt-1 block">
                    👁 {selectedReel.views} views
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Reels;
