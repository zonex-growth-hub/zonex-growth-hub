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
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#030307] text-white selection:bg-[#7c3aed] selection:text-white">
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
