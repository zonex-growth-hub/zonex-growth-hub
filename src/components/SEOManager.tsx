import { useEffect } from 'react';

interface SEOMetadata {
  title: string;
  description: string;
}

const SEO_MAP: Record<string, SEOMetadata> = {
  hero: {
    title: "ZoneX Growth Agency | Digital Marketing & Performance Solutions",
    description: "Scale your business with ZoneX Growth Agency. We provide high-impact digital marketing, Google/Meta Ads, web design, and growth strategy solutions in Mysuru, Bengaluru, & Chikkamagaluru."
  },
  portfolio: {
    title: "Proven Case Studies & Campaigns | ZoneX Growth Agency Karnataka",
    description: "Explore our verified growth metrics, campaign outcomes, and 30-Second video case study breakdowns showing real 4x+ ROAS scaling across Bengaluru & Mysuru."
  },
  roi: {
    title: "Interactive ROI Calculator & Growth Estimator | ZoneX Hub",
    description: "Drag the budget slider to calculate projected website traffic, qualified leads, conversion rates, and net revenue compounding for Indian startups & local brands."
  },
  services: {
    title: "Performance Marketing & Web Development Services | ZoneX",
    description: "From high-hook reels production and local SEO citation networks to conversion-optimized React websites and ZoneX Academy training courses."
  },
  process: {
    title: "4-Step Sequential Growth Framework | ZoneX Growth Stack",
    description: "Our battle-tested digital infrastructure methodology: Audit & Hook Development, Funnel Optimization, Campaign Scaling, and AI Automation."
  },
  faq: {
    title: "Frequently Asked Growth Questions (FAQ) | ZoneX Mysuru",
    description: "Get transparent answers about marketing budgets, Local SEO, campaign timelines, and how ZoneX drives predictable brand scaling in Karnataka."
  },
  contact: {
    title: "Apply for Digital Strategy Audit & Proposal | ZoneX Agency",
    description: "Complete our frictionless 3-step interactive marketing quiz to request your custom growth roadmap and strategy proposal today."
  }
};

export function SEOManager() {
  useEffect(() => {
    const isGeo = ['/mysuru', '/bengaluru', '/chikkamagaluru', '/mangaluru', '/hubballi', '/belagavi', '/shivamogga', '/udupi', '/india'].includes(window.location.pathname.toLowerCase());
    if (isGeo) return;

    let lastSection = 'hero';

    const updateSEO = () => {
      const sections = Object.keys(SEO_MAP);
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is in the upper half of viewport, consider it active
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection !== lastSection) {
        lastSection = currentSection;
        const meta = SEO_MAP[currentSection];
        if (meta) {
          document.title = meta.title;
          
          // Dynamic Meta Description update
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', meta.description);

          // Dynamic OG Title update
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) ogTitle.setAttribute('content', meta.title);

          // Dynamic OG Description update
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc) ogDesc.setAttribute('content', meta.description);
        }
      }
    };

    window.addEventListener('scroll', updateSEO, { passive: true });
    // Run once initially to map page load state
    updateSEO();

    return () => {
      window.removeEventListener('scroll', updateSEO);
    };
  }, []);

  return null; // Side-effect only component
}

export default SEOManager;
