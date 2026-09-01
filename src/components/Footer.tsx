import { useState, useEffect } from 'react';
import { AGENCY, NAV_ITEMS } from '@/data/content';
import { Instagram, Linkedin, Youtube, Twitter, ArrowUp, X, ShieldCheck, FileText, RotateCcw, Building2, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

type LegalTab = 'terms' | 'privacy' | 'refund' | 'contact' | null;

export function Footer() {
  const { playClick } = useApp();
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeLegalTab !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeLegalTab]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLegalTab(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openLegalModal = (tab: LegalTab) => {
    playClick();
    setActiveLegalTab(tab);
  };

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

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-slate-300">Legal &amp; Compliance</h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-slate-400 font-medium">
              <li>
                <button type="button" onClick={() => openLegalModal('terms')} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors text-left cursor-pointer">
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegalModal('privacy')} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors text-left cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegalModal('refund')} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors text-left cursor-pointer">
                  Refund &amp; Cancellation Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegalModal('contact')} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors text-left cursor-pointer">
                  Contact Us &amp; Business Identity
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium select-none">
          <p className="text-xs text-zinc-600 dark:text-slate-400 text-center sm:text-left">
            © 2026 ZoneX Growth Agency. All Rights Reserved. | Registered MSME Entity, Mysuru, Karnataka.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-600 dark:text-slate-400">
            <button type="button" onClick={() => openLegalModal('terms')} className="hover:underline">Terms</button>
            <span>•</span>
            <button type="button" onClick={() => openLegalModal('privacy')} className="hover:underline">Privacy</button>
            <span>•</span>
            <button type="button" onClick={() => openLegalModal('refund')} className="hover:underline">Refund Policy</button>
            <span>•</span>
            <button type="button" onClick={() => openLegalModal('contact')} className="hover:underline">Contact Us</button>
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

      {/* ── EXPANDED PHONEPE COMPLIANCE & LEGAL POLICY MODAL ── */}
      <AnimatePresence>
        {activeLegalTab !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLegalTab(null)}
            className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[88vh] bg-zinc-900 border border-white/10 rounded-2xl p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 select-none">
                <div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-white">
                    {activeLegalTab === 'terms' && 'Terms of Service & Engagement Agreement'}
                    {activeLegalTab === 'privacy' && 'Privacy & Data Protection Policy'}
                    {activeLegalTab === 'refund' && 'Refund, Cancellation & Dispute Policy'}
                    {activeLegalTab === 'contact' && 'Merchant Identity & Business Contact'}
                  </h3>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                    ZoneX Growth Agency • PhonePe Merchant KYC Compliant
                  </span>
                </div>
                <button
                  onClick={() => { playClick(); setActiveLegalTab(null); }}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="flex flex-wrap gap-2 pb-4 mb-4 border-b border-white/5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => openLegalModal('terms')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeLegalTab === 'terms' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Terms &amp; Conditions
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('privacy')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeLegalTab === 'privacy' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Privacy Policy
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('refund')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeLegalTab === 'refund' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Refund Policy
                </button>
                <button
                  type="button"
                  onClick={() => openLegalModal('contact')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${activeLegalTab === 'contact' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-zinc-400 hover:text-white'}`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  Contact Us
                </button>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-5 text-left text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">

                {/* TERMS & CONDITIONS */}
                {activeLegalTab === 'terms' && (
                  <>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">1. Scope of Agreement &amp; B2B Services</h4>
                      <p className="opacity-90">This agreement governs all digital performance marketing, Meta/Google PPC campaign management, viral video production, web engineering, and strategic consulting services provided by <strong>ZoneX Growth Agency</strong> to corporate and business clients.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">2. Onboarding &amp; Retainer Commencements</h4>
                      <p className="opacity-90">Service execution, audit sprints, creative asset production, and advertising account onboarding commence strictly after the receipt and verification of cleared advance payments.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">3. Direct Advertising Spend</h4>
                      <p className="opacity-90">All advertising billing costs (Meta Ads, Google PPC, YouTube Ads, etc.) are paid directly by the client to the respective ad platforms. Agency service fees cover media buying, creative production, and CRO funnel engineering.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">4. Payment Defaults &amp; Retainer Pause</h4>
                      <p className="opacity-90">Retainer deliverables and active campaign management pause automatically if invoicing remains unsettled beyond 7 calendar days from invoice issue.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">5. Client Conversion &amp; Revenue Ownership</h4>
                      <p className="opacity-90">ZoneX Growth Agency guarantees high-performance marketing execution and qualified traffic routing. Final sales conversion metrics depend on client product-market fit, sales closing pipelines, and pricing.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">6. Governing Law &amp; Jurisdiction</h4>
                      <p className="opacity-90">This agreement is governed by the laws of India. Any legal disputes or claims shall be subject to the exclusive jurisdiction of the competent courts in <strong>Mysuru, Karnataka, India</strong>.</p>
                    </div>
                  </>
                )}

                {/* PRIVACY POLICY */}
                {activeLegalTab === 'privacy' && (
                  <>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">1. Information Collection &amp; Purpose</h4>
                      <p className="opacity-90">ZoneX Growth Agency collects client information including business names, contact persons, email addresses, phone/WhatsApp numbers, and campaign objectives strictly for contract execution, onboarding, and service communication.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">2. Payment Gateway Security (PhonePe)</h4>
                      <p className="opacity-90">All online checkout transactions and payments are securely processed through <strong>PhonePe Payment Gateway</strong>. ZoneX Growth Agency does NOT store, log, or access sensitive financial credentials, credit/debit card numbers, UPI PINs, or net banking passwords on its servers. PhonePe uses 256-bit SSL encryption and PCI-DSS compliant standards.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">3. Analytics &amp; Cookies</h4>
                      <p className="opacity-90">We use standard web cookies, Google Analytics, and Meta Pixel technologies to measure traffic conversion attribution and optimize overall website experience.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">4. Third-Party Sharing Restrictions</h4>
                      <p className="opacity-90">We strictly do NOT sell, rent, trade, or disclose client personal data or business inquiries to third-party data brokers or external marketing lists.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">5. Client Data Rights</h4>
                      <p className="opacity-90">Clients may request data inspection or account removal at any time by contacting our support team at <strong>zonexacdemy@gmail.com</strong>.</p>
                    </div>
                  </>
                )}

                {/* REFUND & CANCELLATION POLICY */}
                {activeLegalTab === 'refund' && (
                  <>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">1. B2B Service Non-Refundable Nature</h4>
                      <p className="opacity-90">Due to the immediate allocation of media buyers, creative designers, web developers, and strategy engineers upon sprint kickoff, all retainer fees, strategy audit charges, and onboarding deposits paid to <strong>ZoneX Growth Agency</strong> are 100% non-refundable once work has commenced.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">2. Service Retainer Cancellation</h4>
                      <p className="opacity-90">Clients may cancel ongoing monthly service retainers by providing a 30-day prior written notice via email to <strong>zonexacdemy@gmail.com</strong>. Services and deliverables will continue through the end of the paid billing cycle.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">3. Failed &amp; Duplicate Transaction Resolution</h4>
                      <p className="opacity-90">If a client experiences a technical payment failure or duplicate deduction during checkout via PhonePe Payment Gateway, the excess amount will be automatically refunded by PhonePe to the customer's original payment source within <strong>5–7 business days</strong> as per standard banking protocol.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-1">4. Invoicing Dispute Timelines</h4>
                      <p className="opacity-90">Any invoice queries or billing discrepancies must be reported in writing within 7 calendar days of payment to <strong>zonexacdemy@gmail.com</strong> or call <strong>+91 7019371818</strong>.</p>
                    </div>
                  </>
                )}

                {/* CONTACT US & MERCHANT IDENTITY */}
                {activeLegalTab === 'contact' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-purple-400 shrink-0" />
                        <div>
                          <span className="text-xs text-zinc-400 uppercase font-bold block">Registered Entity Name</span>
                          <strong className="text-white text-base">ZoneX Growth Agency</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-purple-400 shrink-0" />
                        <div>
                          <span className="text-xs text-zinc-400 uppercase font-bold block">Registered Office Location</span>
                          <span className="text-white">Mysuru, Karnataka, India</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <span className="text-xs text-zinc-400 uppercase font-bold block">Official Support Phone / WhatsApp</span>
                          <a href="tel:+917019371818" className="text-emerald-400 font-bold hover:underline">+91 7019371818</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                        <div>
                          <span className="text-xs text-zinc-400 uppercase font-bold block">Official Support Email</span>
                          <a href="mailto:zonexacdemy@gmail.com" className="text-cyan-400 font-bold hover:underline">zonexacdemy@gmail.com</a>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 leading-relaxed">
                      <p>Government Registered MSME Entity • Operating across Mysuru, Bengaluru &amp; Pan-Karnataka.</p>
                      <p className="mt-1">For payment gateway verification, billing support, or client onboarding queries, please reach out via phone or email during business hours (Monday – Saturday, 09:00 AM – 09:00 PM IST).</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accept / Close Footer Button */}
              <div className="pt-6 border-t border-white/10 mt-6 select-none flex gap-3">
                <button
                  type="button"
                  onClick={() => { playClick(); setActiveLegalTab(null); }}
                  className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all uppercase tracking-wider text-xs cursor-pointer text-center"
                >
                  Close &amp; Return to Application
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
