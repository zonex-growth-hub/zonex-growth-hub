import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Eye, X, Play } from 'lucide-react';
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
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
            <Play className="w-5 h-5 text-white" fill="currentColor" />
          </div>
        </div>

        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-4 text-center">
            <Film className="h-6 w-6 text-violet-400" />
            <p className="text-[10px] text-slate-500">Video unavailable</p>
          </div>
        ) : (
          <video
            src={reel.video}
            muted
            loop
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center p-2"
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>

              {/* 9:16 Video Player */}
              <div className="relative w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden">
                <video
                  src={selectedReel.video}
                  autoPlay
                  loop
                  playsInline
                  controls
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metadata details */}
              <div className="w-full p-4 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">{selectedReel.type}</span>
                  <span className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                    <Eye className="w-3 h-3 text-cyan-400" /> {selectedReel.views}
                  </span>
                </div>
                <h3 className="font-display font-black text-base sm:text-lg text-white mb-1 uppercase tracking-tight leading-tight">{selectedReel.title}</h3>
                <p className="text-xs text-slate-400 leading-normal">{selectedReel.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Reels;
