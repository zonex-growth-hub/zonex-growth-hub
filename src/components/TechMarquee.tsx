import { useApp } from '@/context/AppContext';

const TECH_ITEMS = [
  { name: 'Meta Ads', icon: '🎯', label: 'Ad Budget Scaled', outcomeINR: '₹2.5Cr+', outcomeUSD: '$300K+' },
  { name: 'Google Ads', icon: '📈', label: 'Performance ROAS', outcomeINR: '4.2x Avg', outcomeUSD: '4.2x Avg' },
  { name: 'CapCut', icon: '🎬', label: 'Viral Views', outcomeINR: '10M+ Views', outcomeUSD: '10M+ Views' },
  { name: 'Premiere Pro', icon: '✂️', label: 'Ad Creatives', outcomeINR: '3.8% CTR', outcomeUSD: '3.8% CTR' },
  { name: 'Shopify', icon: '🛍️', label: 'High Conversion', outcomeINR: '3.8% CRO', outcomeUSD: '3.8% CRO' },
  { name: 'Webflow', icon: '🕸️', label: 'Custom Storefront', outcomeINR: '99+ Speed', outcomeUSD: '99+ Speed' },
  { name: 'GA4 Analytics', icon: '📊', label: 'Attribution Setup', outcomeINR: '100% Tracking', outcomeUSD: '100% Tracking' },
];

export function TechMarquee() {
  const { currency, playClick } = useApp();
  const isINR = currency === 'INR';

  // Duplicate items for infinite scrolling marquee
  const items = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <section className="py-8 relative overflow-hidden select-none">
      <div className="container-max px-4 mb-4">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-500 dark:text-slate-500 font-bold">
          Our Tech Stack &amp; Tools (Hover/Tap to Reveal Metrics)
        </p>
      </div>
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#EDEEF5] dark:from-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#EDEEF5] dark:from-obsidian to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 w-max will-change-transform translate-z-0">
          {items.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              onClick={playClick}
              className="group/flip w-[185px] h-[68px] perspective-1000 cursor-pointer shrink-0"
            >
              <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover/flip:rotate-y-180">
                
                {/* Front Side */}
                <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-purple-500/20 dark:border-purple-500/30 shadow-[0_4px_20px_rgba(168,85,247,0.08)] rounded-2xl flex items-center gap-3 px-5 backface-hidden">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8A63F8] shadow-[0_0_8px_#8A63F8] animate-pulse" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{tech.icon}</span>
                    <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200">
                      {tech.name}
                    </span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex flex-col items-center justify-center text-white rotate-y-180 backface-hidden px-3 shadow-lg">
                  <p className="text-[9px] uppercase font-bold tracking-widest text-purple-200">{tech.label}</p>
                  <p className="text-xs font-black mt-0.5">{isINR ? tech.outcomeINR : tech.outcomeUSD}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechMarquee;
