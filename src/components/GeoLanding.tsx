import { useEffect, lazy, Suspense } from 'react';
import { useApp } from '@/context/AppContext';
import { SectionHeading } from './SectionHeading';
import { ArrowLeft, MapPin, ShieldCheck } from 'lucide-react';

const Contact = lazy(() => import('./Contact'));

interface GeoData {
  city: string;
  focus: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  title: string;
  h1: string;
  desc: string;
  marketScope: string;
}

const GEO_MAP: Record<string, GeoData> = {
  mysuru: {
    city: "Mysuru",
    focus: "Top Digital Marketing & PPC Ads Agency in Mysuru",
    lat: 12.2958,
    lng: 76.6394,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Top Digital Marketing & PPC Ads Agency in Mysuru | ZoneX Growth Agency",
    h1: "Top Digital Marketing & PPC Ads Agency in Mysuru",
    desc: "Officially registered MSME digital growth agency in Mysuru. We scale local retail, hospitality, and traditional brands with high-performance paid ads, local SEO, and web ordering engines.",
    marketScope: "Mysuru, Nanjangud, Mandya, Chamarajanagar regional corridors"
  },
  bengaluru: {
    city: "Bengaluru",
    focus: "Performance Marketing & E-commerce Scaling Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Performance Marketing & E-commerce Scaling Bengaluru | ZoneX Growth Agency",
    h1: "Performance Marketing & E-commerce Scaling Bengaluru",
    desc: "High-ROI digital marketing and conversion rate optimization (CRO) engines for Bengaluru startups & D2C brands. We scale Meta/Google ad accounts across Koramangala, HSR Layout, Indiranagar, and Whitefield.",
    marketScope: "Bengaluru Metro, Whitefield, Indiranagar, Koramangala, HSR Layout corridors"
  },
  chikkamagaluru: {
    city: "Chikkamagaluru",
    focus: "Local Business SEO & Growth Systems Chikkamagaluru",
    lat: 13.3161,
    lng: 75.7720,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Local Business SEO & Growth Systems Chikkamagaluru | ZoneX Growth Agency",
    h1: "Local Business SEO & Growth Systems Chikkamagaluru",
    desc: "Unlocking organic visibility for tourism, resorts, estate exports, and local businesses in Chikkamagaluru. Deconstruct competition and capture inbound leads with search dominance.",
    marketScope: "Chikkamagaluru, Mudigere, Kadur estate corridors"
  },
  mangaluru: {
    city: "Mangaluru",
    focus: "SEO Agency & Web Ordering Systems Mangaluru",
    lat: 12.9141,
    lng: 74.8560,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "SEO Agency & Web Ordering Systems Mangaluru | ZoneX Growth Agency",
    h1: "SEO Agency & Web Ordering Systems Mangaluru",
    desc: "Scale your coastal retail, education hub, or export brand with professional search engine optimization and high-CTR local advertising campaigns tailored for Mangaluru.",
    marketScope: "Mangaluru, Udupi, Dakshina Kannada coastal business corridors"
  },
  hubballi: {
    city: "Hubballi",
    focus: "PPC & Lead Generation Agency Hubballi",
    lat: 15.3647,
    lng: 75.1240,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "PPC & Lead Generation Agency Hubballi | ZoneX Growth Agency",
    h1: "PPC & Lead Generation Agency Hubballi-Dharwad",
    desc: "Empowering Hubballi-Dharwad commerce hubs with high-conversion landing pages, automated lead capture pipelines, and targeted B2B paid advertising systems.",
    marketScope: "Hubballi, Dharwad, Belagavi North Karnataka corridors"
  },
  belagavi: {
    city: "Belagavi",
    focus: "Local SEO & Performance Marketing Belagavi",
    lat: 15.8497,
    lng: 74.4977,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Local SEO & Performance Marketing Belagavi | ZoneX Growth Agency",
    h1: "Local SEO & Performance Marketing Belagavi",
    desc: "Establish absolute search engine dominance and route high-intent local customer queries directly to your sales pipeline with our custom citation networks in Belagavi.",
    marketScope: "Belagavi district, industrial & commercial zones"
  },
  shivamogga: {
    city: "Shivamogga",
    focus: "Digital Marketing & Brand Building Shivamogga",
    lat: 13.9299,
    lng: 75.5681,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Digital Marketing & Brand Building Shivamogga | ZoneX Growth Agency",
    h1: "Digital Marketing & Brand Building Shivamogga",
    desc: "From local search footprint optimization to high-hook Instagram reels and YouTube branding videos, we build market leaders in Shivamogga.",
    marketScope: "Shivamogga, Bhadravathi, Malnad regional zones"
  },
  udupi: {
    city: "Udupi",
    focus: "Local Search SEO & Google Maps Dominance Udupi",
    lat: 13.3409,
    lng: 74.7421,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "Local Search SEO & Google Maps Dominance Udupi | ZoneX Growth Agency",
    h1: "Local Search SEO & Google Maps Dominance Udupi",
    desc: "Dominate search engine result pages (SERPs) and capture regional tourists, hospitality clients, and retail checkouts with Udupi local citation frameworks.",
    marketScope: "Udupi, Manipal, coastal Karnataka corridors"
  },
  india: {
    city: "India",
    focus: "National Performance Marketing & E-commerce Scaling India",
    lat: 20.5937,
    lng: 78.9629,
    phone: "+91 7019371818",
    email: "zonexacdemy@gmail.com",
    title: "National Performance Marketing & E-commerce Scaling India | ZoneX Growth Agency",
    h1: "National Performance Marketing & E-commerce Scaling India",
    desc: "Scale your e-commerce storefront or pan-India enterprise with high-ROI Meta & Google PPC ads, server-side tracking solutions, and hyper-profitable sales funnels.",
    marketScope: "Pan-India e-commerce, D2C, and enterprise channels"
  }
};

export function GeoLanding({ citySlug, onBack }: { citySlug: string; onBack: () => void }) {
  const { playClick } = useApp();
  const data = GEO_MAP[citySlug.toLowerCase()];

  useEffect(() => {
    if (!data) return;

    // 1. Dynamic Meta Injection
    document.title = data.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', data.desc);

    // 2. LocalBusiness JSON-LD Schema Injection
    const schemaId = 'geo-local-business-schema';
    const oldSchema = document.getElementById(schemaId);
    if (oldSchema) oldSchema.remove();

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["LocalBusiness", "MarketingAgency"],
          "@id": `https://www.zonexgrowth-agency.in/${citySlug.toLowerCase()}#agency`,
          "name": `ZoneX Growth Agency - ${data.city} Hub`,
          "url": `https://www.zonexgrowth-agency.in/${citySlug.toLowerCase()}`,
          "telephone": data.phone,
          "email": data.email,
          "priceRange": "₹₹",
          "image": "https://www.zonexgrowth-agency.in/logo-zonex.jpg",
          "description": data.desc,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": data.city,
            "addressRegion": "Karnataka",
            "addressCountry": "IN"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": data.lat,
            "longitude": data.lng
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": data.marketScope
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": `https://www.zonexgrowth-agency.in/${citySlug.toLowerCase()}#breadcrumbs`,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.zonexgrowth-agency.in"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": `${data.city} Digital Marketing Hub`,
              "item": `https://www.zonexgrowth-agency.in/${citySlug.toLowerCase()}`
            }
          ]
        }
      ]
    };

    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      const scriptNode = document.getElementById(schemaId);
      if (scriptNode) scriptNode.remove();
    };
  }, [citySlug, data]);

  if (!data) {
    return (
      <div className="py-24 text-center select-none min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
        <h2 className="text-xl font-bold">City Hub Not Found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-purple-600 rounded-xl font-semibold text-xs">
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDEEF5] dark:bg-[#030307] text-zinc-900 dark:text-white transition-colors duration-300 pt-24 pb-12">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb back button */}
        <div className="mb-6 select-none">
          <button
            onClick={() => { playClick(); onBack(); }}
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to main hub
          </button>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12 rounded-3xl border border-zinc-200 dark:border-purple-500/20 shadow-md p-6 sm:p-10 bg-white/70 dark:bg-zinc-950/40 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300">
              Active Regional Sprint
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-zinc-500 uppercase">
              <MapPin className="w-3.5 h-3.5 text-purple-500" />
              <span>Karnataka Digital Growth Nodes</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white leading-tight">
              {data.h1}
            </h1>
            
            <p className="text-sm sm:text-base text-zinc-700 dark:text-slate-350 leading-relaxed font-medium">
              {data.desc}
            </p>

            <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-650 dark:text-slate-400 bg-zinc-150 dark:bg-white/5 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-white/10 shrink-0">
                <ShieldCheck className="w-4 h-4 text-purple-500" /> MSME UDYAM-KR-18-009231 Registered
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-black">Market Service Scope</p>
                <p className="text-xs font-bold text-purple-600 dark:text-purple-400">{data.marketScope}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Contact Lead Capture Module */}
        <div id="contact" className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="Frictionless Lead Pipeline"
            title={<>Apply for a <span className="gradient-text">Direct Growth Strategy</span> proposal</>}
            subtitle={`Let our optimization agents analyze your digital footprint in ${data.city}. Complete the 3-step quiz to get custom projections.`}
          />
          <Suspense fallback={
            <div className="py-8 text-center text-xs text-zinc-500 font-bold select-none animate-pulse">
              Loading Interactive Strategy Quiz...
            </div>
          }>
            <Contact />
          </Suspense>
        </div>

      </div>
    </div>
  );
}

export default GeoLanding;
