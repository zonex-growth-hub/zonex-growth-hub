import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { analytics } from '@/utils/analytics';

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('Meta & Google Ads Scaling');

  const handleSend = () => {
    analytics.trackContact('Floating WhatsApp Direct Send', { selectedService: service });
    const msg = encodeURIComponent(
      `Hi ZoneX Growth Hub Team! 👋\n\nI want to scale my business revenue.\n🎯 Focus Area: ${service}\n\nPlease share your free growth roadmap and availability.`
    );
    window.open(`https://wa.me/917019371818?text=${msg}`, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl glass-strong border border-emerald-500/40 p-5 shadow-[0_0_50px_rgba(16,185,129,0.3)] bg-neutral-950/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    ZoneX Growth Hub
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-medium">● Online • &lt; 5 min response</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close WhatsApp popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick message preview */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-200 mb-4 leading-relaxed">
              👋 Hey! Looking to scale your brand with high-ROAS ads, viral reels, or custom web architecture? Let's chat on WhatsApp!
            </div>

            {/* Service selector */}
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Select Your Growth Goal:
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/15 text-white text-xs mb-4 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="Meta & Google Ads Scaling (4x+ ROAS)">Meta & Google Ads Scaling (4x+ ROAS)</option>
              <option value="Viral Short-Form Reels & Video Production">Viral Reels & Video Production</option>
              <option value="Custom High-Converting Web Architecture">Custom High-Converting Web Architecture</option>
              <option value="Local SEO Dominance (Mysuru, Bengaluru, Karnataka)">Local SEO Dominance (Mysuru, Bengaluru, Karnataka)</option>
              <option value="ZoneX Academy Training Program">ZoneX Academy Training Program</option>
            </select>

            {/* Direct Send button */}
            <button
              onClick={handleSend}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]"
            >
              <span>Start Instant WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          setOpen(!open);
          if (!open) analytics.trackContact('Floating WhatsApp Hub Opened');
        }}
        className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(16,185,129,0.8)] border border-emerald-400/40 transition-all duration-300 cursor-pointer"
        aria-label="Open Instant WhatsApp Consultation"
      >
        <span className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-300 animate-ping" />
        </span>
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          Quick WhatsApp Chat
        </span>
      </motion.button>
    </div>
  );
}

export default FloatingWhatsApp;
