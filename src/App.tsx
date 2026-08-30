import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppProvider, useApp } from '@/context/AppContext';
import { AmbientBackground } from '@/components/AmbientBackground';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { HeroStats } from '@/components/HeroStats';
import { Portfolio } from '@/components/Portfolio';
import { Reels } from '@/components/Reels';
import { Services } from '@/components/Services';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { X, Sparkles, Download, Bell } from 'lucide-react';
import { sanitizeInput } from '@/utils/security';
import { SEOManager } from '@/components/SEOManager';
import { GeoLanding } from '@/components/GeoLanding';

// Lazy-loaded components for optimal bundle tree-shaking and chunk split sizes
const ROICalculator = lazy(() => import('@/components/ROICalculator'));
const BeforeAfter = lazy(() => import('@/components/BeforeAfter'));
const TechMarquee = lazy(() => import('@/components/TechMarquee'));
const Process = lazy(() => import('@/components/Process'));
const GrowthInsights = lazy(() => import('@/components/GrowthInsights'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const FAQs = lazy(() => import('@/components/FAQs'));
const Contact = lazy(() => import('@/components/Contact'));

function SectionLoader() {
  return (
    <div className="py-14 flex items-center justify-center text-zinc-500 dark:text-zinc-400 select-none">
      <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-2" />
      <span className="text-[10px] uppercase font-bold tracking-widest">Loading Segment...</span>
    </div>
  );
}

function AppContent() {
  const { playClick } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitEmail, setExitEmail] = useState('');

  // Client-Side Programmatic SEO Router State
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocation = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocation, { passive: true });
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo(0, 0);
  };

  // 1. Lenis Smooth Scroll Tuning with Memory Safety event cleanups
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.0,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Track scroll progress with passive listener to prevent touch blockages
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Exit Intent Modal Trigger (Desktop boundaries)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 5) {
        if (!sessionStorage.getItem('exit-intent-shown')) {
          setShowExitModal(true);
          sessionStorage.setItem('exit-intent-shown', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // 2. Social Proof Live Notification Toasts Loop with useEffect memory safety cleanups
  useEffect(() => {
    const messages = [
      "🔥 E-Commerce Brand scaled to 4.2x ROAS in Mysuru!",
      "⚡ Local Retail Chain captured 320 GBP leads this week!",
      "🚀 D2C Brand generated ₹12L revenue with Meta ads!",
      "⚡ SaaS brand automated WhatsApp inquiry flow with ZoneX!",
      "🔥 Fitness chain booked 45 strategy slots automatically!"
    ];
    let index = 0;
    let autoDismissTimeout: NodeJS.Timeout;
    
    const initialTimeout = setTimeout(() => {
      setToast(messages[index]);
      index = (index + 1) % messages.length;
      autoDismissTimeout = setTimeout(() => setToast(null), 5000);
    }, 10000);

    const interval = setInterval(() => {
      setToast(messages[index]);
      index = (index + 1) % messages.length;
      autoDismissTimeout = setTimeout(() => setToast(null), 5000);
    }, 25000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(autoDismissTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleExitModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    // Sanitization: use the custom XSS/HTML sanitizer
    const cleanEmail = sanitizeInput(exitEmail);

    const msg = encodeURIComponent(`Hi ZoneX Growth Agency! 👋\n\nI want to download the 2026 E-commerce & Brand Scaling Playbook (Free PDF).\n\nMy email: ${cleanEmail}`);
    window.open(`https://wa.me/917019371818?text=${msg}`, '_blank', 'noopener,noreferrer');
    setShowExitModal(false);
  };

  const isGeoRoute = ['/mysuru', '/bengaluru', '/chikkamagaluru', '/mangaluru', '/hubballi', '/belagavi', '/shivamogga', '/udupi', '/india'].includes(currentRoute.toLowerCase());

  return (
    <div className="min-h-screen bg-[#EDEEF5] text-zinc-900 dark:bg-[#030307] dark:text-white selection:bg-[#7c3aed] selection:text-white overflow-x-hidden transition-colors duration-300">
      
      {/* Neon Scroll Progress Glow Line */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_10px_#a855f7] z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <SEOManager />
      <Navbar />
      <AmbientBackground />

      {isGeoRoute ? (
        <GeoLanding citySlug={currentRoute.replace('/', '')} onBack={() => navigateTo('/')} />
      ) : (
        <main>
          <Hero />
          <HeroStats />
          <Portfolio />
          <Reels />
          <Suspense fallback={<SectionLoader />}><ROICalculator /></Suspense>
          <Services />
          <Suspense fallback={<SectionLoader />}><BeforeAfter /></Suspense>
          <Suspense fallback={<SectionLoader />}><TechMarquee /></Suspense>
          <Suspense fallback={<SectionLoader />}><Process /></Suspense>
          <Suspense fallback={<SectionLoader />}><GrowthInsights /></Suspense>
          <Suspense fallback={<SectionLoader />}><Testimonials /></Suspense>
          <Suspense fallback={<SectionLoader />}><FAQs /></Suspense>
          <Suspense fallback={<SectionLoader />}><Contact /></Suspense>
        </main>
      )}

      <Footer />
      <FloatingWhatsApp />

      {/* Social Proof Live Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-[80] animate-fade-up max-w-sm rounded-2xl bg-white/80 dark:bg-zinc-950/75 backdrop-blur-xl border border-zinc-200/80 dark:border-purple-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-900 dark:text-white leading-tight">Live Proof</p>
            <p className="text-[11px] text-zinc-700 dark:text-zinc-300 font-medium mt-0.5">{toast}</p>
          </div>
        </div>
      )}

      {/* Exit-Intent Playbook Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white/90 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-purple-500/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col">
            <button 
              onClick={() => { playClick(); setShowExitModal(false); }} 
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-purple-600 dark:text-purple-400">Exclusive Free Gift</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-3">
              Wait! Grab Our Brand Scaling Playbook
            </h3>
            <p className="text-xs sm:text-sm text-zinc-650 dark:text-slate-350 leading-relaxed font-medium mb-6">
              Enter your email to instantly receive the **2026 E-commerce &amp; Brand Scaling Playbook** containing our exact ads strategy for scaling regional brands in India.
            </p>
            <form onSubmit={handleExitModalSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={exitEmail}
                onChange={(e) => setExitEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-purple-500 shadow-sm"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Playbook (PDF)
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
