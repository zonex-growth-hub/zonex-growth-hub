import React, { useEffect, useRef, useState } from 'react';
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
  const [soundActive, setSoundActive] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('Book Growth Audit HUD CTA');
    scrollToSection('contact');
  };

  const handleExplore = () => {
    analytics.trackViewContent('Explore Ecosystem HUD CTA');
    scrollToSection('portfolio');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const win = window as unknown as GlobalWindow;
    const gsap = win.gsap;
    const ScrollTrigger = win.ScrollTrigger;
    const Lenis = win.Lenis;

    // 1. Lenis Smooth Scroll
    let lenisInstance: LenisInstance | null = null;
    let rafId: number | null = null;
    let isDisposed = false;

    if (Lenis) {
      try {
        lenisInstance = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
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

    // 2. Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020204, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Central Iridescent 3D Chrome Sphere (ALCHE Style Opening)
    const sphereGeo = new THREE.SphereGeometry(2.2, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x111122,
      emissive: 0x221144,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
    });
    const portalSphere = new THREE.Mesh(sphereGeo, sphereMat);
    portalSphere.position.set(0, 0, 0);
    scene.add(portalSphere);

    // Ambient Lighting & Neon Beams
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLightPurple = new THREE.PointLight(0xa855f7, 4, 50);
    pointLightPurple.position.set(0, 5, 2);
    scene.add(pointLightPurple);

    const pointLightCyan = new THREE.PointLight(0x06b6d4, 4, 50);
    pointLightCyan.position.set(0, -5, 2);
    scene.add(pointLightCyan);

    // 4. Perspective Infinite Grid Runners (Top & Bottom)
    const gridBottom = new THREE.GridHelper(500, 150, 0xa855f7, 0x1e1b4b);
    gridBottom.position.y = -3.2;
    scene.add(gridBottom);

    const gridTop = new THREE.GridHelper(500, 150, 0x06b6d4, 0x1e1b4b);
    gridTop.position.y = 3.8;
    scene.add(gridTop);

    // 5. 3D Project Planes (Dynamic Showcase Cards in 3D Runway)
    const showcaseProjects = [
      { title: 'AI PERFORMANCE ENGINE', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80' },
      { title: 'LOCAL SEO DOMINANCE', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80' },
      { title: 'VIRAL SCALE SYSTEMS', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80' },
      { title: 'GROWTH AUTOMATION HUB', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80' },
    ];

    const textureLoader = new THREE.TextureLoader();
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 3.4 : 5.0;
    const cardHeight = isMobile ? 2.2 : 3.0;
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 16, 16);
    const spacingZ = 16;

    showcaseProjects.forEach((proj, idx) => {
      const tex = textureLoader.load(proj.image);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.92,
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      const zPos = -(idx * spacingZ + 12);
      const xPos = isMobile ? 0 : idx % 2 === 0 ? -1.8 : 1.8;
      mesh.position.set(xPos, 0, zPos);

      if (!isMobile) {
        mesh.rotation.y = idx % 2 === 0 ? 0.18 : -0.18;
        mesh.rotation.z = idx % 2 === 0 ? 0.04 : -0.04;
      }

      cardGroup.add(mesh);
    });

    // 6. GSAP ScrollTrigger Cinematic Travel (Full Dive Animation)
    const totalTravel = showcaseProjects.length * spacingZ + 10;

    let tl: GSAPTimeline | null = null;
    if (gsap && ScrollTrigger) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#webgl-experience',
          start: 'top top',
          end: `+=${showcaseProjects.length * 1200}`,
          scrub: 1.2,
          pin: true,
        },
      });

      // Camera pushes forward through the tunnel
      tl.to(
        camera.position,
        {
          z: -totalTravel,
          ease: 'none',
        },
        0
      );

      // Fade and shrink initial HUD title
      tl.to(
        '#hud-hero-text',
        {
          opacity: 0,
          scale: 0.7,
          y: -80,
          ease: 'power2.inOut',
          duration: 0.2,
        },
        0
      );

      // Expand sphere on entry and dissolve
      tl.to(
        portalSphere.scale,
        {
          x: 3.5,
          y: 3.5,
          z: 3.5,
          ease: 'power1.in',
        },
        0
      );
      tl.to(
        portalSphere.position,
        {
          z: -8,
          ease: 'none',
        },
        0
      );

      // Infinite Grid Glide
      tl.to(gridBottom.position, { z: -totalTravel * 0.45, ease: 'none' }, 0);
      tl.to(gridTop.position, { z: -totalTravel * 0.45, ease: 'none' }, 0);
    }

    // Interactive Mouse Tilt on Hover
    let targetMouseX = 0;
    let targetMouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop
    let animFrameId: number;
    const animate = () => {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(animate);

      // Rotate 3D Sphere smoothly
      portalSphere.rotation.x += 0.005;
      portalSphere.rotation.y += 0.008;

      // Smooth camera inertia on mouse move
      camera.rotation.y += (targetMouseX - camera.rotation.y) * 0.05;
      camera.rotation.x += (-targetMouseY - camera.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      isDisposed = true;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (rafId) cancelAnimationFrame(rafId);
      if (tl?.scrollTrigger) tl.scrollTrigger.kill();
      if (tl) tl.kill();
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch {
          // ignore
        }
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      cardGeo.dispose();
    };
  }, []);

  return (
    <section className="alche-experience-container" id="webgl-experience" ref={sectionRef}>
      <canvas id="experience-canvas" ref={canvasRef}></canvas>

      <div className="hud-overlay">
        <div className="hud-header">
          <div 
            className="hud-brand cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="hud-dot"></span>
            <span className="hud-logo-text">ZONEX // TECH HUB</span>
          </div>

          <div className="hud-nav-links">
            <span onClick={() => scrollToSection('insights')} className="hover:text-white cursor-pointer transition-colors">NEWS</span>
            <span onClick={() => scrollToSection('portfolio')} className="hover:text-white cursor-pointer transition-colors">WORKS</span>
            <span onClick={() => scrollToSection('services')} className="hover:text-white cursor-pointer transition-colors">ABOUT</span>
            <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">STUDIO</a>
          </div>

          <div className="hud-actions">
            <div 
              className="sound-toggle"
              onClick={() => setSoundActive(!soundActive)}
              title="Toggle Audio Feedback"
            >
              <span className="bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
            </div>
            <button onClick={handleClaimAudit} className="hud-contact-btn">
              CONTACT [ + ]
            </button>
          </div>
        </div>

        <div className="hud-center-stage" id="hud-hero-text">
          <div className="hud-pill-tag">[ EXPERIMENTAL AI GROWTH ENGINE ]</div>
          <h1 className="hud-glitch-title">ZONEX</h1>
          <p className="hud-sub-desc">SCALE 10X WITH NEXT-GEN PERFORMANCE &amp; AI ARCHITECTURE</p>
          <div className="hud-cta-row">
            <button onClick={handleExplore} className="hud-primary-btn">
              EXPLORE ECOSYSTEM ↗
            </button>
            <button onClick={handleClaimAudit} className="hud-secondary-btn">
              BOOK GROWTH AUDIT
            </button>
          </div>
        </div>

        <div className="hud-footer">
          <div className="hud-coords">
            SYS.VER // 2.6.4 <br />
            LAT: 12.9716° N / LON: 77.5946° E
          </div>
          <div 
            className="hud-scroll-prompt cursor-pointer"
            onClick={() => scrollToSection('portfolio')}
          >
            <div className="scroll-arrow">↓</div>
            <span>SCROLL TO DIVE INTO THE ARCHIVE</span>
          </div>
          <div className="hud-status">
            STATUS // ONLINE <span className="status-pulse"></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
