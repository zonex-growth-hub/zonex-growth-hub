import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
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
    
    if (honey.length > 0) return;

    setLoading(true);
    setPhoneError(false);

    const cleanName = sanitizeInput(brandName) || 'Valued Brand';
    const cleanPhone = sanitizeInput(phoneNumber) || 'Not Shared';

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

  return (
    <section id="contact" className="py-16 md:py-24 relative select-none bg-[#030305]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="Zero-Friction Client Intake"
          title={<>Apply For Strategy Audit &amp; <span className="gradient-text-accent">Growth Blueprint</span></>}
          subtitle="3-step intake designed to analyze your current CAC, ad spend leakage, and revenue scaling opportunity."
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Interactive 3-Step Intake Quiz Card */}
          <div className="lg:col-span-7 bg-[#0B0B10]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Step {quizStep} of 3</span>
                <span className="text-slate-500">•</span>
                <span className="text-xs text-slate-300 font-medium">
                  {quizStep === 1 && 'Select Industry Focus'}
                  {quizStep === 2 && 'Monthly Ad Budget'}
                  {quizStep === 3 && 'Brand & WhatsApp Contact'}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`h-2 rounded-full transition-all ${
                      quizStep >= step ? 'w-6 bg-purple-500' : 'w-2 bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Industry */}
              {quizStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold font-display text-white">What category best describes your business?</h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {['E-Commerce & D2C', 'Local Service / Retail', 'Hospitality & Resorts', 'SaaS & Enterprise'].map((ind) => (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => handleIndustrySelect(ind)}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer transition-all text-left"
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget */}
              {quizStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold font-display text-white">What is your current monthly ad budget?</h3>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {budgetOptions.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => handleBudgetSelect(bud)}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer transition-all text-center"
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { playClick(); setQuizStep(1); }}
                    className="text-xs font-bold text-purple-400 hover:underline cursor-pointer pt-2 block"
                  >
                    ← Back to Industry
                  </button>
                </motion.div>
              )}

              {/* Step 3: Contact Form */}
              {quizStep === 3 && !submitted && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold font-display text-white">Enter your brand &amp; WhatsApp details</h3>
                  <form onSubmit={handleQuizSubmit} className="space-y-4 pt-2">
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website_url_honeypot"
                        value={honey}
                        onChange={(e) => setHoney(e.target.value)}
                        tabIndex={-1}
                      />
                    </div>
                    <div>
                      <label htmlFor="brand-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Brand Name / Domain</label>
                      <input
                        id="brand-name"
                        type="text"
                        required
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. MyBrand.com or Karnataka Retail Co."
                        className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone-number" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">WhatsApp Phone Number</label>
                      <input
                        id="phone-number"
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. +91 7019371818"
                        className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/10 text-white placeholder:text-slate-600 text-xs focus:outline-none focus:border-purple-500"
                      />
                      {phoneError && (
                        <p className="text-[10px] text-red-400 font-bold mt-1.5">
                          ⚠️ Please enter a valid phone number.
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => { playClick(); setQuizStep(2); }}
                        className="px-5 py-3.5 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/5 cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#8A63F8] to-[#5C43FA] hover:from-[#9C7AFA] hover:to-[#6D56FB] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
                      >
                        {loading ? 'Dispatching...' : 'Dispatch Strategy Audit Request ↗'}
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
                  className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <div>
                    <h4 className="font-bold text-lg font-display text-white">Strategy Request Dispatched</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      We have opened WhatsApp to connect you directly with a growth strategist (+91 7019371818).
                    </p>
                  </div>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/5 cursor-pointer"
                    >
                      Reset Intake
                    </button>
                    <a
                      href={AGENCY.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      Open WhatsApp Chat
                    </a>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Column: Direct Quick Channel & Map Pins */}
          <div className="lg:col-span-5 bg-[#0B0B10]/90 backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4 text-center sm:text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 inline-block">
                Direct WhatsApp Channel
              </span>
              <h3 className="font-display font-bold text-xl text-white">Prefer Immediate Direct Chat?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Skip the questionnaire and connect directly with our senior media buyers on WhatsApp (+91 7019371818) for strategy inquiries.
              </p>
              
              <a
                href="https://wa.me/917019371818?text=Hi%20ZoneX%20Growth%20Agency!%20I%20want%20to%20inquire%20about%20paid%20ads%20scaling."
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-500/90 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 7019371818)</span>
              </a>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Headquarters: <strong className="text-white">Mysuru, Karnataka, India</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Support Line: <a href="tel:+917019371818" className="text-white hover:underline">+91 7019371818</a></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Email Support: <a href="mailto:zonexacdemy@gmail.com" className="text-white hover:underline">zonexacdemy@gmail.com</a></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;
