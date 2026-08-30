import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Eye, Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { REELS, type ReelItem } from '@/data/content';
import { SectionHeading } from './SectionHeading';

// Original Desktop Reel Card with Inline Controls
function DesktopReelCard({ reel, index }: { reel: ReelItem; index: number }) {
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play();
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    setMuted(videoEl.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="hidden sm:flex flex-col items-center"
    >
      <div
        className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 p-[8px] transition-transform duration-300 hover:scale-[1.03]"
        style={{ aspectRatio: '9 / 16', maxWidth: '260px', boxShadow: '0 0 30px rgba(139,92,246,0.12), 0 18px 50px rgba(0,0,0,0.55)' }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2rem] bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-6 text-center">
              <Film className="h-10 w-10 text-violet-400" />
              <p className="text-sm font-medium text-violet-300">{reel.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <AlertCircle className="h-3.5 w-3.5" />
                Video unavailable
              </p>
            </div>
          ) : (
            <video
              ref={setVideoEl}
              src={reel.videoUrl || reel.video || reel.src}
              autoPlay
              muted={muted}
              loop
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onVolumeChange={() => { if (videoEl) setMuted(videoEl.muted); }}
              className="h-full w-full rounded-[2rem] object-cover"
            />
          )}

          {/* View count badge */}
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            <Eye className="h-3 w-3" />
            {reel.views}
          </div>
        </div>
      </div>

      {/* Custom control buttons */}
      {!failed && (
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex h-8 w-8 items-center justify-center rounded-full glass text-violet-300 transition-colors hover:bg-violet-500/20 cursor-pointer"
            aria-label={playing ? 'Pause' : 'Play'}
            type="button"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-8 w-8 items-center justify-center rounded-full glass text-violet-300 transition-colors hover:bg-violet-500/20 cursor-pointer"
            aria-label={muted ? 'Unmute' : 'Mute'}
            type="button"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}

      <div className="mt-3 text-center">
        <h3 className="font-display text-base font-bold text-white">{reel.title}</h3>
        <p className="mt-0.5 text-sm text-violet-400">{reel.type}</p>
        <p className="mt-1.5 text-xs text-slate-500">{reel.caption}</p>
      </div>
    </motion.div>
  );
}

// Compact Mobile Reel Card (Taps to open centered popup modal)
function MobileReelCard({ reel, index, onSelect }: { reel: ReelItem; index: number; onSelect: (reel: ReelItem) => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
      className="flex sm:hidden flex-col items-center w-full"
      onClick={() => onSelect(reel)}
    >
      <div
        className="cursor-pointer rounded-2xl border-[2px] border-black/40 dark:border-white/20 p-1 bg-black aspect-[9/16] w-full max-h-[220px] overflow-hidden relative group hover:scale-[1.02] transition-transform shadow-lg shadow-black/40"
      >
        <div className="absolute inset-0 bg-black/10 z-10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Play className="w-4 h-4 text-white" fill="currentColor" />
          </div>
        </div>

        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black p-4 text-center">
            <Film className="h-5 w-5 text-violet-400" />
            <p className="text-[9px] text-slate-500">Unavailable</p>
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

      <div className="mt-1.5 text-center w-full px-1">
        <h3 className="text-[11px] font-bold leading-tight line-clamp-1 mt-1 text-zinc-900 dark:text-white">
          {reel.title}
        </h3>
        <p className="text-[9px] font-semibold text-purple-500 line-clamp-1">
          {reel.type}
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

  // Lock body scroll on mobile when modal is active
  useEffect(() => {
    if (selectedReel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedReel]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="reels" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Reels Showcase"
          title={<>Short-Form <span className="gradient-text">Video Reels</span> &amp; Ad Creatives</>}
          subtitle="Real video work — play with sound on desktop or tap on mobile to open full-screen player."
        />

        {/* Main showcase reels */}
        <div className="mb-16">
          <h3 className="mb-6 text-center font-display text-lg font-bold text-zinc-700 dark:text-slate-200">Featured Ad Creatives</h3>
          {/* Desktop Showcase */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 sm:px-0">
            {mainReels.map((reel, i) => (
              <DesktopReelCard key={reel.id} reel={reel} index={i} />
            ))}
          </div>
          {/* Mobile Showcase */}
          <div className="grid sm:hidden grid-cols-2 gap-2.5 px-3">
            {mainReels.map((reel, i) => (
              <MobileReelCard key={reel.id} reel={reel} index={i} onSelect={setSelectedReel} />
            ))}
          </div>
        </div>

        {/* Gym / Fitness reels */}
        <div>
          <h3 className="mb-6 text-center font-display text-lg font-bold text-zinc-700 dark:text-slate-200">Gym &amp; Fitness Reels</h3>
          {/* Desktop Showcase */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 sm:px-0">
            {gymReels.map((reel, i) => (
              <DesktopReelCard key={reel.id} reel={reel} index={i} />
            ))}
          </div>
          {/* Mobile Showcase */}
          <div className="grid sm:hidden grid-cols-2 gap-2.5 px-3">
            {gymReels.map((reel, i) => (
              <MobileReelCard key={reel.id} reel={reel} index={i} onSelect={setSelectedReel} />
            ))}
          </div>
        </div>
      </div>

      {/* Tap-To-Expand Video Popup Modal (Mobile only viewport center fixed) */}
      <AnimatePresence>
        {selectedReel && (
          <div 
            className="fixed top-0 left-0 w-screen h-[100dvh] z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div 
              className="relative z-[10000] w-full max-w-[320px] max-h-[85dvh] aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-[10010] w-8 h-8 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-white hover:text-black transition-colors"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Video Container (Strict Visible Sizing) */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  key={selectedReel.videoUrl || selectedReel.video || selectedReel.src}
                  src={selectedReel.videoUrl || selectedReel.video || selectedReel.src}
                  autoPlay
                  playsInline
                  controls
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Bottom Details Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent z-[10005] pointer-events-none">
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
