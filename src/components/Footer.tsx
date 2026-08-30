import { AGENCY, NAV_ITEMS } from '@/data/content';
import { Instagram, Linkedin, Youtube, Twitter, ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400 pt-10 pb-6 transition-colors duration-300 animate-fade-up" aria-label="ZoneX Growth Hub Footer">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-black/60 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                <img
                  src="/logo-zonex.jpg"
                  alt="ZoneX Growth Agency"
                  className="w-full h-full object-contain p-1 transform-gpu"
                  loading="eager"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                    filter: 'none',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </div>
              <div className="flex items-baseline gap-0 leading-none">
                <span className="font-extrabold tracking-tight text-zinc-900 dark:text-white text-sm uppercase">ZoneX</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400 ml-1.5 text-sm uppercase tracking-tight">Growth Agency</span>
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
                  <a href={item.href} className="text-sm text-zinc-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-600 dark:text-cyan-400 hover:underline font-semibold">
                  ZoneX Academy 🎓
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-zinc-900 dark:text-slate-300">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-zinc-600 dark:text-slate-400">
              <li><a href={`mailto:${AGENCY.email}`} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">{AGENCY.email}</a></li>
              <li><a href={`tel:${AGENCY.phone}`} className="hover:text-purple-600 dark:hover:text-violet-400 transition-colors font-medium">{AGENCY.phone}</a></li>
              <li className="text-zinc-800 dark:text-slate-300 font-semibold">{AGENCY.office}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium">
          <p className="text-xs text-zinc-600 dark:text-slate-400">
            © {new Date().getFullYear()} {AGENCY.name}. All rights reserved. Headquartered in Mysuru, Karnataka.
          </p>
          <p className="text-xs text-zinc-600 dark:text-slate-400">
            Built with precision · Designed to convert · AI &amp; AEO Optimized
          </p>
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#hero"
        aria-label="Back to top"
        className="fixed bottom-24 right-4 sm:right-6 z-40 w-11 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-violet-500/10 hover:text-violet-400 transition-all hover:scale-110 shadow-md"
      >
        <ArrowUp className="w-5 h-5 text-zinc-700 dark:text-white" />
      </a>
    </footer>
  );
}

export default Footer;
