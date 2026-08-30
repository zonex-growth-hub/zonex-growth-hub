import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { AGENCY, KARNATAKA_CITIES } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';

export function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Sanitize user inputs
    const cleanName = (name.trim() || 'Valued Client').replace(/[<>]/g, '');
    const cleanPhone = (phone.trim() || 'Not Provided').replace(/[<>]/g, '');

    // Track conversion lead event
    analytics.trackLead('Frictionless Lead Form Submit', {
      name: cleanName,
      phone: cleanPhone,
    });

    // Construct WhatsApp direct message
    const msg = encodeURIComponent(
      `Hi ZoneX Growth Hub Team! 👋\n\nI want to claim a Free Growth Audit & Strategy.\n\n👤 Name: ${cleanName}\n📱 Phone: ${cleanPhone}\n\nPlease connect with me.`
    );
    const whatsappUrl = `https://wa.me/917019371818?text=${msg}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Seamlessly redirect to WhatsApp for instant connection
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const handleQuickWhatsApp = () => {
    analytics.trackContact('Quick WhatsApp Chat Button');
    const msg = encodeURIComponent('Hi ZoneX Growth Hub! I would like to inquire about scaling my business with digital marketing & paid ads.');
    window.open(`https://wa.me/917019371818?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section-pad relative" aria-label="Contact &amp; Free Audit">
      <div className="container-max">
        <SectionHeading
          eyebrow="Zero Friction Lead Capture"
          title={<>Claim Your <span className="gradient-text">Free Growth Audit</span></>}
          subtitle="Drop your name and phone number below. We analyze your brand and respond within 15 minutes."
        />

        {/* ── FRICTIONLESS 2-FIELD LEAD CAPTURE + QUICK WHATSAPP CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-14 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-violet-500/30 shadow-lg premium-card will-change-transform translate-z-0"
        >
          {/* Subtle ambient gradient highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Instant 2-Field Form */}
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Instant Strategy Slot Available
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                Request 1-on-1 Growth Audit
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-slate-300 mb-6 font-medium">
                Only 2 fields required. No lengthy questionnaires.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-500/40 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                  <h4 className="font-bold text-lg text-zinc-900 dark:text-white">Audit Request Received!</h4>
                  <p className="text-xs text-zinc-600 dark:text-slate-300 mt-1">
                    Opening WhatsApp to connect with our growth strategist immediately...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Name / Brand Name *
                    </label>
                    <input
                      id="lead-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma or Brand Co."
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-semibold text-zinc-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      id="lead-phone"
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 placeholder:text-zinc-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-sm transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.02]"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Submit &amp; Claim Free Audit</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-zinc-500 dark:text-slate-400 text-center font-medium">
                    🔒 Zero spam guarantee. We respect your privacy.
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: Direct Quick WhatsApp Chat CTA Card */}
            <div className="md:col-span-5 flex flex-col justify-center items-center text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-purple-50 via-purple-100/30 to-white dark:from-emerald-950/40 dark:via-purple-950/20 dark:to-black/60 border border-purple-200 dark:border-emerald-500/30">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <MessageCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 mb-2">
                Fastest Direct Channel
              </span>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                Prefer WhatsApp Directly?
              </h4>
              <p className="text-xs text-zinc-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                Skip the form and chat with our team on WhatsApp for an immediate response.
              </p>
              <button
                onClick={handleQuickWhatsApp}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transform hover:scale-[1.03]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp Chat →</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── ADDITIONAL DIRECT CHANNELS (Strategy Call, WhatsApp, Email) ── */}
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
            onClick={() => analytics.trackContact('Instant WhatsApp Chat Card')}
            className="group rounded-3xl p-7 text-center transition-all hover:border-violet-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-purple-600 dark:text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1 text-zinc-900 dark:text-white">Direct WhatsApp</h3>
            <p className="text-sm text-zinc-650 dark:text-slate-400 mb-3 font-medium">Instant messaging</p>
            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-violet-400 text-sm font-semibold">
              Chat now <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Strategy Call */}
          <a
            href={AGENCY.calendar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackLead('1-on-1 Strategy Call Card')}
            className="group rounded-3xl p-7 text-center transition-all hover:border-violet-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-purple-600 dark:text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1 text-zinc-900 dark:text-white">1-on-1 Video Call</h3>
            <p className="text-sm text-zinc-650 dark:text-slate-400 mb-3 font-medium">15-min free strategy</p>
            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-violet-400 text-sm font-semibold">
              Book a slot <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${AGENCY.email}`}
            onClick={() => analytics.trackContact('Email Inquiry Card')}
            className="group rounded-3xl p-7 text-center transition-all hover:border-cyan-500/50 premium-card will-change-transform translate-z-0"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1 text-zinc-900 dark:text-white">Email Our Team</h3>
            <p className="text-sm text-zinc-650 dark:text-slate-400 mb-3 font-medium">Detailed inquiries</p>
            <span className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 text-sm font-semibold">
              Send email <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </motion.div>

        {/* Karnataka Regional Growth Network Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl text-center max-w-4xl mx-auto shadow-md premium-card will-change-transform translate-z-0"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <p className="text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-bold">
              Karnataka Regional Growth Hubs • Statewide Domination
            </p>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto font-medium">
            Providing full-stack digital marketing partnerships for businesses across Karnataka:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-800 dark:text-slate-200">
            {KARNATAKA_CITIES.map((city) => (
              <span key={city} className="flex items-center gap-1.5 bg-white dark:bg-black/50 px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-purple-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                {city}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-zinc-600 dark:text-slate-400 font-medium"
        >
          <a href={`mailto:${AGENCY.email}`} onClick={() => analytics.trackContact('Footer Email')} className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-violet-400 transition-colors">
            <Mail className="w-4 h-4" /> {AGENCY.email}
          </a>
          <a href={`tel:${AGENCY.phone}`} onClick={() => analytics.trackContact('Direct Phone Call')} className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-violet-400 transition-colors">
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
