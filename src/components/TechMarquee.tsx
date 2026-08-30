import { TECH_STACK } from '@/data/content';

export function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container-max px-4 mb-4">
        <p className="text-center text-xs uppercase tracking-widest text-zinc-500 dark:text-slate-500 font-bold">
          Our Tech Stack &amp; Tools
        </p>
      </div>
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#EDEEF5] dark:from-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#EDEEF5] dark:from-obsidian to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-6 w-max will-change-transform translate-z-0">
          {items.map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="group bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-purple-500/20 dark:border-purple-500/30 shadow-[0_4px_20px_rgba(168,85,247,0.08)] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-500/10 hover:via-purple-600/15 hover:to-indigo-500/10 px-5 py-3 rounded-2xl flex items-center gap-3 whitespace-nowrap transition-all duration-300 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-[#8A63F8] shadow-[0_0_8px_#8A63F8] group-hover:shadow-[0_0_12px_#a855f7] animate-pulse transition-all duration-300" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-800 dark:text-zinc-200 group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechMarquee;
