import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { analytics } from '@/utils/analytics';

interface LenisInstance {
  raf: (time: number) => void;
  on: (event: string, callback: () => void) => void;
  destroy: () => void;
}

interface LenisConstructor {
  new (options?: Record<string, unknown>): LenisInstance;
}

interface GSAPTimeline {
  to: (target: unknown, vars: Record<string, unknown>, position?: number | string) => GSAPTimeline;
  kill: () => void;
  scrollTrigger?: {
    kill: () => void;
  };
}

interface GSAPObject {
  registerPlugin: (...plugins: unknown[]) => void;
  timeline: (vars?: Record<string, unknown>) => GSAPTimeline;
  ticker: {
    add: (callback: (time: number) => void) => void;
    lagSmoothing: (threshold: number) => void;
  };
}

interface GlobalWindow extends Window {
  gsap?: GSAPObject;
  ScrollTrigger?: unknown;
  Lenis?: LenisConstructor;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('Book Free Growth Audit CTA');
    scrollToSection('contact');
  };

  const handleCalculateROI = () => {
    analytics.trackInitiateCheckout('Hero ROI Calculator CTA');
    scrollToSection('roi');
  };

  const handleAcademy = () => {
    analytics.trackViewContent('ZoneX Academy Hero CTA');
    window.open('https://zonex-academy.com', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const win = window as unknown as GlobalWindow;
    const gsap = win.gsap;
    const ScrollTrigger = win.ScrollTrigger;
    const Lenis = win.Lenis;

    const myProjects = [
      {
        title: 'OTHER AGENCIES VS ZONEX',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
      },
      {
        title: 'AI AUTOMATION & PERFORMANCE',
        image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&q=80',
      },
      {
        title: 'LOCAL SEO DOMINANCE',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80',
      },
      {
        title: 'VIRAL SCALE SYSTEMS',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80',
      },
    ];

    let lenisInstance: LenisInstance | null = null;
    let rafId: number | null = null;
    let isDisposed = false;

    if (Lenis) {
      try {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.5,
        });

        const raf = (time: number) => {
          if (isDisposed) return;
          lenisInstance?.raf(time);
          rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          lenisInstance.on('scroll', () => {
            const st = ScrollTrigger as { update: () => void };
            if (typeof st.update === 'function') st.update();
          });
          gsap.ticker.add((time: number) => lenisInstance?.raf(time * 1000));
          gsap.ticker.lagSmoothing(0);
        }
      } catch (err) {
        console.warn('Lenis smooth scroll initialization skipped:', err);
      }
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030307, 0.04);

    const isMobile = window.innerWidth <= 768;

    const camera = new THREE.PerspectiveCamera(
      isMobile ? 70 : 55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const gridBottom = new THREE.GridHelper(300, 120, 0x7c3aed, 0x1e1b4b);
    gridBottom.position.y = -2.2;
    scene.add(gridBottom);

    const gridTop = new THREE.GridHelper(300, 120, 0xec4899, 0x1e1b4b);
    gridTop.position.y = 2.8;
    scene.add(gridTop);

    const textureLoader = new THREE.TextureLoader();
    const cardMeshGroup = new THREE.Group();
    scene.add(cardMeshGroup);

    const cardWidth = isMobile ? 3.0 : 4.2;
    const cardHeight = isMobile ? 2.0 : 2.6;
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const spacingZ = 14;

    myProjects.forEach((item, index) => {
      const texture = textureLoader.load(item.image);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });

      const mesh = new THREE.Mesh(cardGeometry, material);
      const zPos = -(index * spacingZ + 8);
      const xPos = isMobile ? 0 : index % 2 === 0 ? -1.4 : 1.4;
      mesh.position.set(xPos, 0.1, zPos);

      if (!isMobile) {
        mesh.rotation.y = index % 2 === 0 ? 0.12 : -0.12;
      }

      cardMeshGroup.add(mesh);
    });

    const totalDistance = myProjects.length * spacingZ + 6;

    let timeline: GSAPTimeline | null = null;
    if (gsap && ScrollTrigger) {
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero-tunnel',
          start: 'top top',
          end: `+=${myProjects.length * 1000}`,
          scrub: 1.2,
          pin: true,
        },
      });

      timeline.to(
        camera.position,
        {
          z: -totalDistance,
          ease: 'none',
        },
        0
      );

      timeline.to(
        '#hero-content',
        {
          opacity: 0,
          scale: 0.85,
          y: -50,
          ease: 'power2.inOut',
          duration: 0.25,
        },
        0
      );

      timeline.to(
        gridBottom.position,
        {
          z: -totalDistance * 0.5,
          ease: 'none',
        },
        0
      );
      timeline.to(
        gridTop.position,
        {
          z: -totalDistance * 0.5,
          ease: 'none',
        },
        0
      );
    }

    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      camera.fov = mobile ? 70 : 55;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    let animFrameId: number;
    const animate = () => {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (rafId) cancelAnimationFrame(rafId);
      if (timeline?.scrollTrigger) timeline.scrollTrigger.kill();
      if (timeline) timeline.kill();
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch {
          // ignore
        }
      }
      renderer.dispose();
      cardGeometry.dispose();
    };
  }, []);

  return (
    <section className="hero-tunnel-section" id="hero-tunnel" ref={sectionRef}>
      <canvas id="webgl-canvas" ref={canvasRef}></canvas>
      <div className="ui-container">
        <header className="top-nav">
          <div 
            className="brand-logo cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ZONEX GROWTH HUB
          </div>
          <button onClick={handleClaimAudit} className="btn-nav-audit">
            BOOK FREE AUDIT
          </button>
        </header>

        <div className="center-hero" id="hero-content">
          <div className="badge-pill">★★★ #1 DIGITAL GROWTH &amp; AI AGENCY IN KARNATAKA ★★★</div>
          <h1 className="hero-title">
            <span className="title-gradient-pink">ENGINE</span> FOR<br />
            <span className="title-gradient-cyan">KARNATAKA</span> BUSINESSES
          </h1>
          <p className="hero-subtext">
            Scale 10x with ZoneX Growth Hub. Top-tier Meta &amp; Google Ads, Local SEO dominance, AI-powered web systems, and viral performance marketing.
          </p>
          <div className="cta-group">
            <button onClick={handleClaimAudit} className="btn-main btn-purple">
              BOOK FREE GROWTH AUDIT →
            </button>
            <button onClick={handleCalculateROI} className="btn-main btn-outline">
              CALCULATE YOUR ROI
            </button>
            <button onClick={handleAcademy} className="btn-main btn-dark">
              ZONEX ACADEMY 🎓
            </button>
          </div>
        </div>

        <div style={{ height: '10px' }}></div>
      </div>
    </section>
  );
}

export default Hero;
