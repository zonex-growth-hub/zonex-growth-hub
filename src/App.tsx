import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from '@/context/ThemeContext';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HeroStats } from '@/components/HeroStats';
import { Portfolio } from '@/components/Portfolio';
import { Reels } from '@/components/Reels';
import { ROICalculator } from '@/components/ROICalculator';
import { Services } from '@/components/Services';
import { BeforeAfter } from '@/components/BeforeAfter';
import { TechMarquee } from '@/components/TechMarquee';
import { Process } from '@/components/Process';
import { GrowthInsights } from '@/components/GrowthInsights';
import { Testimonials } from '@/components/Testimonials';
import { FAQs } from '@/components/FAQs';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9, // Lower duration for snappier response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2, // Increases scroll velocity per tick
      touchMultiplier: 2.0, // Responsive touch scrolling on mobile
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 dark:bg-[#030307] dark:text-white selection:bg-[#7c3aed] selection:text-white overflow-x-hidden transition-colors duration-300">
        <Navbar />
        <AmbientBackground />
        <main>
          <Hero />
          <HeroStats />
          <Portfolio />
          <Reels />
          <ROICalculator />
          <Services />
          <BeforeAfter />
          <TechMarquee />
          <Process />
          <GrowthInsights />
          <Testimonials />
          <FAQs />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
