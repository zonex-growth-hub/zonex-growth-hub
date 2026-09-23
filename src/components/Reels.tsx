import { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, AlertCircle, Eye, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { REELS, type ReelItem } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { useApp } from '@/context/AppContext';

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex gap-0.5 items-end h-3 px-1.5 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 pointer-events-none">
      <style>{`
        @keyframes eq-bar {
          0% { height: 3px; }
          100% { height: 12px; }
        }
      `}</style>
      <span className="w-[2px] bg-purple-400 rounded-full" style={{ height: '100%', animation: playing ? 'eq-bar 0.8s ease infinite alternate 0.1s' : 'none' }} />
      <span className="w-[2px] bg-purple-400 rounded-full" style={{ height: '60%', animation: playing ? 'eq-bar 0.8s ease infinite alternate 0.3s' : 'none' }} />
      <span className="w-[2px] bg-purple-400 rounded-full" style={{ height: '80%', animation: playing ? 'eq-bar 0.8s ease infinite alternate 0.5s' : 'none' }} />
      <span className="w-[2px] bg-purple-400 rounded-full" style={{ height: '45%', animation: playing ? 'eq-bar 0.8s ease infinite alternate 0.2s' : 'none' }} />
    </div>
  );
}

function ReelCard({ reel, index }: { reel: ReelItem; index: number }) {
  const { playClick } = useApp();
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    playClick();
    if (!videoEl) return;
    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setPlaying(true);
    } else {
      videoEl.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    playClick();
    if (!videoEl) return;
    videoEl.muted = !videoEl.muted;
    setMuted(videoEl.muted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="flex flex-col items-center group"
    >
      <div
        className="relative w-full rounded-[2.5rem] bg-[#0B0B10] p-2 border border-white/[0.08] group-hover:border-purple-500/40 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(138,99,248,0.2)]"
        style={{ aspectRatio: '9 / 16', maxWidth: '280px' }}
      >
        <div className="absolute left-1/2 top-3 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-black border border-white/10" />

        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-[2rem] bg-[#07070B] p-6 text-center">
              <Film className="h-10 w-10 text-purple-400" />
              <p className="text-xs font-semibold text-white">{reel.title}</p>
              <p className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <AlertCircle className="h-3 w-3" />
                Video Stream Initializing
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
              className="h-full w-full rounded-[2rem] object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-300"
            />
          )}

          {!failed && !muted && <Equalizer playing={playing} />}

          {/* View Count Badge */}
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/70 border border-white/10 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
            <Eye className="h-3.5 w-3.5 text-cyan-400" />
            {reel.views}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      {!failed && (
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
            aria-label={playing ? 'Pause' : 'Play'}
            type="button"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors cursor-pointer"
            aria-label={muted ? 'Unmute' : 'Mute'}
            type="button"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </div>
      )}
    </motion.div>
  );
}

export function Reels() {
  return (
    <section id="reels" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Viral Short-Form Creatives"
          title={<>High-Retention <span className="gradient-text-accent">Reels &amp; Video Ads</span></>}
          subtitle="Engineered for high CTR, viral organic reach, and immediate ad recall on Instagram, Meta &amp; YouTube Shorts."
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 justify-items-center">
          {REELS.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reels;
