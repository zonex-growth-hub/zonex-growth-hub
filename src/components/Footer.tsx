import { useState, useEffect } from 'react';
import { AGENCY, NAV_ITEMS } from '@/data/content';
import { Instagram, Linkedin, Youtube, Twitter, ArrowUp, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Footer() {
  const { playClick } = useApp();
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isTermsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTermsOpen]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTermsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <footer className="relative border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400 pt-10 pb-6 transition-colors duration-300 animate-fade-up" aria-label="ZoneX Growth Agency Footer">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black/80 border border-purple-500/40 p-1 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <img
                  src="/logo-zonex.jpg"
                  alt="ZoneX Growth Agency"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  loading="eager"
                  style={{
                    imageRendering: 'crisp-edges',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    transform: 'translateZ(0)',
                  }}
                />
              </div>
              <div className="flex flex-col text-left select-none">
                <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-white leading-none">ZoneX</span>
                <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400 tracking-wider uppercase leading-tight mt-0.5">Growth Agency</span>
              </div>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-md mb-3 font-medium">
              Headquartered in Mysuru — Empowering brands across Mysuru, Bengaluru, Chikkamagaluru, and Karnataka with high-conversion marketing engines.
            </p>
            <p className="text-xs text-zinc-650 dark:text-slate-400 leading-relaxed max-w-md font-medium">
              We scale brands into market leaders with high-CTR ads, viral video reels, local SEO engineering, and conversion-first web architecture.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, href: AGENCY.socials.instagram, label: 'Instagram' },
                { icon: Linkedin, href: AGENCY.socials.linkedin, label: 'LinkedIn' },
                { icon: Youtube, href: AGENCY.socials.youtube, label: 'YouTube' },
                { icon: Twitter, href: AGENCY.socials.twitter, label: 'Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={playClick}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-violet-500/10 hover:text-violet-400 transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-zinc-700 dark:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-slate-300">Quick Links</h4>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={playClick} className="text-sm text-zinc-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" onClick={playClick} className="text-sm text-cyan-650 dark:text-cyan-450 hover:underline font-bold">
                  ZoneX Academy 🎓
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-slate-300">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-slate-400">
              <li><a href={`mailto:${AGENCY.email}`} onClick={playClick} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">{AGENCY.email}</a></li>
              <li><a href={`tel:${AGENCY.phone}`} onClick={playClick} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">{AGENCY.phone}</a></li>
              <li className="text-zinc-850 dark:text-slate-300 font-bold">{AGENCY.office}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium select-none">
          <p className="text-xs text-zinc-600 dark:text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} ZoneX Growth Agency. All Rights Reserved. | Government Registered MSME Entity
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => { playClick(); setIsTermsOpen(true); }}
              className="text-[11px] sm:text-xs text-zinc-550 hover:text-purple-600 dark:text-zinc-500 dark:hover:text-zinc-300 underline underline-offset-4 decoration-zinc-700 transition-colors cursor-pointer"
            >
              Terms &amp; Service Agreement
            </button>
            <p className="text-xs text-zinc-600 dark:text-slate-400">
              Built with precision · Designed to convert · AI &amp; AEO Optimized
            </p>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        onClick={playClick}
        className="fixed bottom-24 right-4 sm:right-6 z-40 w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-violet-500/10 hover:text-violet-400 transition-all hover:scale-110 shadow-md"
      >
        <ArrowUp className="w-5 h-5 text-zinc-750 dark:text-white" />
      </a>

      {/* ── EXPANDED TERMS & CONDITIONS MODAL ── */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsTermsOpen(false)}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 select-none">
                <div>
                  <h3 className="font-display font-black text-base sm:text-lg text-white">Terms of Service &amp; Engagement Agreement</h3>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Updated: 2026 // ZoneX Growth Agency</span>
                </div>
                <button 
                  onClick={() => { playClick(); setIsTermsOpen(false); }} 
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Clauses Body */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-5 text-left text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 1: Advance Retainers &amp; Commencements</h4>
                  <p className="opacity-90">Project workflows, ad setups, and asset production begin strictly following the verification of cleared advance payments.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 2: Non-Refundable Fee Structure</h4>
                  <p className="opacity-90">All strategy, creative design, media planning, and retainer service fees are 100% non-refundable once sprint onboarding initiates.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 3: Direct Ad-Spend Disclaimers</h4>
                  <p className="opacity-90">All advertising billing costs (Meta Ads, Google PPC, etc.) are paid directly by the client to respective ad platforms.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 4: Payment Defaults &amp; Suspension</h4>
                  <p className="opacity-90">Retainer deliverables and active campaigns pause automatically if invoicing remains unsettled beyond 7 calendar days.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 5: Client Operations &amp; Conversion Ownership</h4>
                  <p className="opacity-90">ZoneX Growth Agency guarantees high-performance marketing execution and qualified traffic routing. Final sales conversion metrics depend entirely on client product-market fit, sales closing pipelines, and pricing.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 6: Platform Restrictions &amp; Suspensions</h4>
                  <p className="opacity-90">The agency is not liable for third-party platform account restrictions, algorithmic policy flags, or ad disapprovals enforced by Meta/Google.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 7: Termination &amp; 30-Day Notice</h4>
                  <p className="opacity-90">Service agreements require a 30-day prior written notice for cancellation.</p>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-1">Clause 8: Portfolio &amp; IP Attribution</h4>
                  <p className="opacity-90">ZoneX Growth Agency reserves the rights to showcase anonymized growth metrics, case studies, and creative campaign assets in agency portfolios.</p>
                </div>
              </div>

              {/* Accept Footer Button */}
              <div className="pt-6 border-t border-white/10 mt-6 select-none">
                <button
                  onClick={() => { playClick(); setIsTermsOpen(false); }}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                >
                  I Understand &amp; Accept
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </footer>
  );
}

export default Footer;
