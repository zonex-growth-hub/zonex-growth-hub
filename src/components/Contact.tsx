import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { AGENCY, KARNATAKA_CITIES } from '@/data/content';
import { SectionHeading } from './SectionHeading';
import { analytics } from '@/utils/analytics';

export function Contact() {
  return (
    <section id="contact" className="section-pad relative" aria-label="Contact & Free Audit">
      <div className="container-max">
        <SectionHeading
          eyebrow="Let's Talk"
          title={<>Ready to Scale Your Brand to <span className="gradient-text">7-Figures?</span></>}
          subtitle="Headquartered in Mysuru, partnering with ambitious brands across Bengaluru, Karnataka, and Pan-India."
        />

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
            onClick={() => analytics.trackContact('Instant WhatsApp Chat')}
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-crimson transition-all hover:border-violet-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Instant WhatsApp Chat</h3>
            <p className="text-sm text-slate-400 mb-3">Fastest response (&lt; 15 mins)</p>
            <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-semibold">
              Chat now <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Strategy Call */}
          <a
            href={AGENCY.calendar}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackLead('1-on-1 Strategy Call')}
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-crimson transition-all hover:border-violet-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">1-on-1 Strategy Call</h3>
            <p className="text-sm text-slate-400 mb-3">15-min free audit</p>
            <span className="inline-flex items-center gap-1 text-violet-400 text-sm font-semibold">
              Book a slot <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${AGENCY.email}`}
            onClick={() => analytics.trackContact('Email Inquiry')}
            className="group glass-strong rounded-3xl p-7 text-center card-glow-hover hover:glow-warm transition-all hover:border-cyan-500/50"
          >
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Email Our Team</h3>
            <p className="text-sm text-slate-400 mb-3">Detailed inquiries</p>
            <span className="inline-flex items-center gap-1 text-cyan-400 text-sm font-semibold">
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
          className="mt-12 p-6 sm:p-8 rounded-3xl glass-strong border border-violet-500/20 text-center max-w-4xl mx-auto shadow-[0_0_40px_rgba(139,92,246,0.1)]"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">
              Karnataka Regional Growth Hubs • Statewide Domination
            </p>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-4 max-w-2xl mx-auto">
            Providing on-ground & full-stack digital marketing partnerships for businesses across Karnataka:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-200">
            {KARNATAKA_CITIES.map((city) => (
              <span key={city} className="flex items-center gap-1.5 bg-black/50 px-3.5 py-1.5 rounded-full border border-purple-500/20 font-medium">
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
          className="mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400"
        >
          <a href={`mailto:${AGENCY.email}`} onClick={() => analytics.trackContact('Footer Email')} className="flex items-center gap-2 hover:text-violet-400 transition-colors">
            <Mail className="w-4 h-4" /> {AGENCY.email}
          </a>
          <a href={`tel:${AGENCY.phone}`} onClick={() => analytics.trackContact('Direct Phone Call')} className="flex items-center gap-2 hover:text-violet-400 transition-colors">
            <Phone className="w-4 h-4" /> {AGENCY.phone}
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-violet-400" /> {AGENCY.office}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
