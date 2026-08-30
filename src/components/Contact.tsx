import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Calendar, Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Sparkles, MapPin as MapPinIcon } from 'lucide-react';
import { AGENCY } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';
import { useApp } from '@/context/AppContext';
import { sanitizeInput } from '@/utils/security';

export function Contact() {
  const { currency, playClick } = useApp();
  const isINR = currency === 'INR';

  // 1. Interactive 3-Step Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [brandName, setBrandName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Security Honeypot and input validations
  const [honey, setHoney] = useState('');
  const [phoneError, setPhoneError] = useState(false);

  // 2. Interactive Map Node Selection State
  const [activeMapPin, setActiveMapPin] = useState<'mysuru' | 'bengaluru' | 'chikkamagaluru'>('mysuru');

  const budgetOptions = isINR
    ? ['₹50K - ₹1.5L', '₹1.5L - ₹5L', '₹5L+']
    : ['$600 - $2K', '$2K - $6K', '$6K+'];

  const handleIndustrySelect = (ind: string) => {
    playClick();
    setIndustry(ind);
    setQuizStep(2);
  };

  const handleBudgetSelect = (bud: string) => {
    playClick();
    setBudgetRange(bud);
    setQuizStep(3);
  };

  const handleQuizSubmit = (e: FormEvent) => {
    e.preventDefault();
    playClick();
    
    // Honeypot validation
    if (honey.length > 0) {
      console.warn('Bot submission blocked');
      return;
    }

    setLoading(true);
    setPhoneError(false);

    // Sanitization: use the custom XSS/HTML sanitizer
    const cleanName = sanitizeInput(brandName) || 'Valued Brand';
    const cleanPhone = sanitizeInput(phoneNumber) || 'Not Shared';

    // Phone format regex validation
    const phoneRegex = /^\+?[0-9\s\-()]{7,25}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError(true);
      setLoading(false);
      return;
    }

    analytics.trackLead('Interactive Quiz Lead Submit', {
      industry,
      budgetRange,
      brandName: cleanName,
      phone: cleanPhone,
    });

    const msg = encodeURIComponent(
      `Hi ZoneX Growth Agency! 👋\n\nI just completed the Growth Quiz for a Direct Strategy Audit:\n\n🏢 Industry: ${industry}\n💰 Budget: ${budgetRange}\n👤 Brand Name: ${cleanName}\n📱 WhatsApp: ${cleanPhone}\n\nPlease share my growth proposal.`
    );
    const whatsappUrl = `https://wa.me/917019371818?text=${msg}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  const resetQuiz = () => {
    playClick();
    setQuizStep(1);
    setIndustry('');
    setBudgetRange('');
    setBrandName('');
    setPhoneNumber('');
    setHoney('');
    setPhoneError(false);
    setSubmitted(false);
  };

  // Calendly Modal Widget Trigger
  const handleOpenCalendly = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    analytics.trackLead('Calendly Embed Triggered');
    window.open(AGENCY.calendar, '_blank', 'noopener,noreferrer');
  };

  const mapPinInfo = {
    mysuru: {
      title: 'ZoneX HQ Hub (Mysuru)',
      desc: 'Our primary design & strategy operations center. Verifying 4.8x Avg ROAS models daily.',
      metrics: '4.8x Avg ROAS / HQ Operations',
    },
    bengaluru: {
      title: 'Bengaluru Performance Ads Hub',
      desc: 'Paid media infrastructure, custom analytics server operations, and 120+ client scaling sprints.',
      metrics: '120+ Launches / Paid Media Hub',
    },
    chikkamagaluru: {
      title: 'Chikkamagaluru Citation Network',
      desc: 'Statewide local business citation engineering and organic SEO dominance networks.',
      metrics: '85% Local Domination Index',
    },
  };

  return (
    <section id="contact" className="relative pt-6 pb-6 md:pt-10 md:pb-12" aria-label="Contact &amp; Pipeline Audit">
      <div className="container-max">
        <SectionHeading
          eyebrow="Zero Friction Lead Capture"
          title={<>Apply for <span className="gradient-text">Direct Growth Consultation &amp; Pipeline Audit</span></>}
          subtitle="Fast-track your acquisition funnel with custom media architecture."
        />

        {/* ── FRICTIONLESS 3-STEP QUIZ CONTAINER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-10 rounded-3xl p-4 md:p-8 border border-zinc-200 dark:border-violet-500/30 shadow-lg premium-card will-change-transform translate-z-0"
        >
          {/* Urgency Counter & Slot Indicator */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 mb-6 border-b border-zinc-200 dark:border-white/10 select-none">
            <div className="flex items-center gap-2">
              <span className="relative flex items-center justify-center w-2.5 h-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="absolute w-full h-full bg-amber-500 rounded-full animate-ping opacity-75" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                ⚡ Q3 Client Onboarding Slots Available in Karnataka
              </span>
            </div>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
              Step {quizStep} of 3
            </span>
          </div>

          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center min-h-[300px]">
            {/* Left Column: Quiz Forms */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Industry Select */}
                {quizStep === 1 && !submitted && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">What industry does your brand operate in?</h3>
                    <p className="text-xs text-zinc-650 dark:text-slate-400 font-medium">Select your primary vertical to view customized ROI frameworks.</p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {['E-Commerce', 'B2B & SaaS', 'Real Estate & Local', 'Education'].map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => handleIndustrySelect(ind)}
                          className="p-3.5 rounded-xl border border-zinc-250 dark:border-white/10 text-xs font-bold text-zinc-800 dark:text-slate-200 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer transition-all text-center"
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget Select */}
                {quizStep === 2 && !submitted && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">What is your current monthly ad spend?</h3>
                    <p className="text-xs text-zinc-650 dark:text-slate-400 font-medium">Budget values are formatted based on your global currency switcher settings.</p>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {budgetOptions.map((bud) => (
                        <button
                          key={bud}
                          type="button"
                          onClick={() => handleBudgetSelect(bud)}
                          className="p-3.5 rounded-xl border border-zinc-250 dark:border-white/10 text-xs font-bold text-zinc-800 dark:text-slate-200 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer transition-all text-center"
                        >
                          {bud}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => { playClick(); setQuizStep(1); }}
                      className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                    >
                      ← Back to industry selection
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Details & Submit */}
                {quizStep === 3 && !submitted && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">Enter your brand &amp; phone details</h3>
                    <p className="text-xs text-zinc-650 dark:text-slate-400 font-medium mb-4">We will formulate your digital strategy mapping based on your inputs.</p>
                    <form onSubmit={handleQuizSubmit} className="space-y-4">
                      {/* Hidden Honeypot Field for Spam Bot Protection */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="website_url_honeypot"
                          value={honey}
                          onChange={(e) => setHoney(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <label htmlFor="brand-name" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-300 mb-1">Brand Name / Website</label>
                        <input
                          id="brand-name"
                          type="text"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Rahul Sharma or Brand Co."
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-xs focus:outline-none focus:border-purple-500 shadow-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone-number" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-slate-300 mb-1">WhatsApp Phone Number</label>
                        <input
                          id="phone-number"
                          type="text"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-xs focus:outline-none focus:border-purple-500 shadow-sm"
                        />
                        {phoneError && (
                          <p className="text-[10px] text-red-500 font-bold mt-1.5 animate-pulse">
                            ⚠️ Invalid phone number format. Please check and try again.
                          </p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => { playClick(); setQuizStep(2); }}
                          className="px-4 py-3.5 rounded-xl border border-zinc-250 dark:border-white/10 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer text-zinc-800 dark:text-slate-200"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {loading ? 'Dispatching...' : 'Submit for Consultation & WhatsApp Dispatch ↗'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Submitted Success */}
                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                    <div>
                      <h4 className="font-bold text-lg text-zinc-900 dark:text-white">Frictionless Routing Initiated</h4>
                      <p className="text-xs text-zinc-650 dark:text-slate-400 mt-1 max-w-md mx-auto">
                        We have opened WhatsApp to connect you directly with a growth strategist. If you were blocked, click the button below:
                      </p>
                    </div>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={resetQuiz}
                        className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-xs font-bold hover:bg-zinc-100 dark:hover:bg-white/5 cursor-pointer"
                      >
                        Reset Quiz
                      </button>
                      <a
                        href={AGENCY.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        Re-open WhatsApp
                      </a>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Right Column: Direct Quick Channel with active stats indicators */}
            <div className="md:col-span-5 flex flex-col justify-center items-center text-center p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-purple-50 via-purple-100/30 to-white dark:from-emerald-950/20 dark:via-purple-950/10 dark:to-black/40 border border-purple-200/50 dark:border-purple-500/10 select-none">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500">
                <MessageCircle className="w-7 h-7" />
              </div>
              <span className="text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 mb-2">
                Fastest Direct Channel
              </span>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                Prefer WhatsApp Directly?
              </h4>
              <p className="text-xs text-zinc-650 dark:text-slate-350 mb-6 leading-relaxed font-medium">
                Skip the questionnaire steps and chat with our team on WhatsApp for an immediate response.
              </p>
              <button
                onClick={() => {
                  playClick();
                  analytics.trackContact('Quick WhatsApp Chat Button');
                  window.open(`https://wa.me/917019371818?text=Hi%20ZoneX%20Growth%20Agency!%20I%20want%20to%20inquire%20about%20paid%20ads%20scaling.`, '_blank', 'noopener,noreferrer');
                }}
                className="w-full py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-md transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp Chat</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── ADDITIONAL DIRECT CHANNELS WITH CALENDLY POPUP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto"
        >
          {/* WhatsApp */}
          <a
            href={AGENCY.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { playClick(); analytics.trackContact('Instant WhatsApp Chat Card'); }}
            className="group rounded-3xl p-6 text-center transition-all hover:border-violet-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-purple-600 dark:text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-base mb-0.5 text-zinc-900 dark:text-white">Direct WhatsApp</h3>
            <p className="text-xs text-zinc-650 dark:text-slate-400 mb-2 font-medium">Instant messaging</p>
            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-violet-400 text-xs font-bold">
              Chat now <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Strategy Call (Modal picker link trigger) */}
          <a
            href={AGENCY.calendar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenCalendly}
            className="group rounded-3xl p-6 text-center transition-all hover:border-violet-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-base mb-0.5 text-zinc-900 dark:text-white">1-on-1 Video Call</h3>
            <p className="text-xs text-zinc-650 dark:text-slate-400 mb-2 font-medium">15-min strategy discovery</p>
            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-violet-400 text-xs font-bold">
              Schedule Call <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${AGENCY.email}`}
            onClick={() => { playClick(); analytics.trackContact('Email Inquiry Card'); }}
            className="group rounded-3xl p-6 text-center transition-all hover:border-cyan-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-display font-bold text-base mb-0.5 text-zinc-900 dark:text-white">Email Our Team</h3>
            <p className="text-xs text-zinc-650 dark:text-slate-400 mb-2 font-medium">Detailed inquiries</p>
            <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 text-xs font-bold">
              Send email <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </motion.div>

        {/* ── INTERACTIVE KARNATAKA MAP NODE SYSTEM ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-12 p-6 rounded-3xl text-center max-w-4xl mx-auto shadow-md premium-card will-change-transform translate-z-0 grid md:grid-cols-2 gap-6 items-center"
        >
          {/* Map Node Pin Description */}
          <div className="text-left space-y-4 select-none">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <p className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
                Karnataka regional hubs authority map
              </p>
            </div>
            
            {/* Active Pin Info Panel */}
            <div className="p-4 rounded-2xl bg-white/5 border border-zinc-200 dark:border-white/10">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4 text-purple-500" />
                {mapPinInfo[activeMapPin].title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-slate-400 mt-2 font-semibold">
                {mapPinInfo[activeMapPin].desc}
              </p>
              <div className="mt-3 inline-block bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border border-purple-500/20">
                {mapPinInfo[activeMapPin].metrics}
              </div>
            </div>

            <div className="flex gap-2">
              {(['mysuru', 'bengaluru', 'chikkamagaluru'] as const).map((pin) => (
                <button
                  key={pin}
                  onClick={() => { playClick(); setActiveMapPin(pin); }}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                    activeMapPin === pin 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-zinc-200 dark:bg-white/5 text-zinc-700 dark:text-slate-300 hover:text-purple-500 border border-zinc-200 dark:border-white/5'
                  }`}
                >
                  {pin}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Contour Map Node Grid */}
          <div className="w-full flex justify-center py-4 bg-zinc-50 dark:bg-black/20 rounded-2xl border border-zinc-200 dark:border-white/5">
            <svg viewBox="0 0 300 220" className="w-full max-w-[280px] h-auto overflow-visible select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Karnataka State Border representation contours */}
              <path d="M 50 20 Q 80 10 110 30 T 180 20 T 220 50 T 260 90 T 230 150 T 180 180 T 120 200 T 50 160 T 30 110 Z" fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="2.5" />
              
              {/* Grid paths */}
              <line x1="20" y1="110" x2="280" y2="110" stroke="rgba(139,92,246,0.05)" strokeDasharray="3 3" />
              <line x1="150" y1="10" x2="150" y2="210" stroke="rgba(139,92,246,0.05)" strokeDasharray="3 3" />

              {/* Bengaluru Pin Node */}
              <g 
                onClick={() => { playClick(); setActiveMapPin('bengaluru'); }} 
                className="cursor-pointer group/pin"
                transform="translate(180, 140)"
              >
                <circle r={activeMapPin === 'bengaluru' ? 14 : 7} fill="rgba(139,92,246,0.2)" className="transition-all duration-300" />
                <circle r="4.5" fill="#8B5CF6" />
                <text y="-14" textAnchor="middle" className="text-[9px] font-black fill-zinc-700 dark:fill-slate-300 group-hover/pin:fill-purple-500 font-sans">Bengaluru</text>
              </g>

              {/* Mysuru Pin Node */}
              <g 
                onClick={() => { playClick(); setActiveMapPin('mysuru'); }} 
                className="cursor-pointer group/pin"
                transform="translate(140, 180)"
              >
                <circle r={activeMapPin === 'mysuru' ? 14 : 7} fill="rgba(6,182,212,0.2)" className="transition-all duration-300" />
                <circle r="4.5" fill="#06B6D4" />
                <text y="-14" textAnchor="middle" className="text-[9px] font-black fill-zinc-700 dark:fill-slate-300 group-hover/pin:fill-cyan-400 font-sans">Mysuru (HQ)</text>
              </g>

              {/* Chikkamagaluru Pin Node */}
              <g 
                onClick={() => { playClick(); setActiveMapPin('chikkamagaluru'); }} 
                className="cursor-pointer group/pin"
                transform="translate(85, 110)"
              >
                <circle r={activeMapPin === 'chikkamagaluru' ? 14 : 7} fill="rgba(16,185,129,0.2)" className="transition-all duration-300" />
                <circle r="4.5" fill="#10B981" />
                <text y="-14" textAnchor="middle" className="text-[9px] font-black fill-zinc-700 dark:fill-slate-300 group-hover/pin:fill-emerald-400 font-sans">Chikkamagaluru</text>
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-650 dark:text-slate-400 font-semibold"
        >
          <a href={`mailto:${AGENCY.email}`} onClick={playClick} className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-violet-400 transition-colors">
            <Mail className="w-4 h-4" /> {AGENCY.email}
          </a>
          <a href={`tel:${AGENCY.phone}`} onClick={playClick} className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-violet-400 transition-colors">
            <Phone className="w-4 h-4" /> {AGENCY.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600 dark:text-violet-400" /> {AGENCY.office}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
