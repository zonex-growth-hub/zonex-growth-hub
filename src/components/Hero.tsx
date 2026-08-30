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
    analytics.trackLead('ALCHE TV Contact / Audit CTA');
    scrollToSection('contact');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const win = window as unknown as GlobalWindow;
    const gsap = win.gsap;
    const ScrollTrigger = win.ScrollTrigger;
    const Lenis = win.Lenis;

    // 1. Lenis Smooth Scroll Setup
    let lenisInstance: LenisInstance | null = null;
    let rafId: number | null = null;
    let isDisposed = false;

    if (Lenis) {
      try {
        lenisInstance = new Lenis({
          duration: 1.2,
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

    // 2. Three.js Scene, Camera, & WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030306, 0.025);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Custom Glass Refractive Chromatic Sphere (The Core 3D Centerpiece)
    const sphereGeometry = new THREE.SphereGeometry(2.3, 64, 64);
    const glassShaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec3 pos = position;
          pos += normal * (sin(pos.x * 3.0 + uTime * 2.0) * 0.08);
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
          
          // Chromatic dispersion simulation
          vec3 colorR = vec3(0.9, 0.2, 0.6) * (fresnel + 0.1);
          vec3 colorG = vec3(0.2, 0.8, 1.0) * (pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.0) + 0.05);
          vec3 colorB = vec3(0.6, 0.3, 0.95) * (fresnel + 0.2);
          
          vec3 finalColor = vec3(colorR.r, colorG.g, colorB.b) + fresnel * 0.4;
          gl_FragColor = vec4(finalColor, 0.85);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const glassOrb = new THREE.Mesh(sphereGeometry, glassShaderMaterial);
    scene.add(glassOrb);

    // Wireframe Cage around the sphere for high-tech aesthetic
    const wireGeometry = new THREE.IcosahedronGeometry(2.5, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireCage = new THREE.Mesh(wireGeometry, wireMaterial);
    scene.add(wireCage);

    // 4. Perspective Tunnel Grid Ground
    const gridBottom = new THREE.GridHelper(400, 100, 0x8b5cf6, 0x1e1b4b);
    gridBottom.position.y = -3.2;
    scene.add(gridBottom);

    const gridTop = new THREE.GridHelper(400, 100, 0x06b6d4, 0x1e1b4b);
    gridTop.position.y = 3.6;
    scene.add(gridTop);

    // 5. 3D Project Planes (Perspective Cards with Titles & Tags)
    const projectsData = [
      { title: 'FORTNITE CREATIVE // VIRAL MAPS', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80' },
      { title: 'WEAR GO LAND // 3D EXHIBITION', image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1000&q=80' },
      { title: 'DISCOAT 2026 // VIRTUAL SHOWROOM', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80' },
      { title: 'AI PERFORMANCE ENGINE // ZONEX', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80' },
    ];

    const textureLoader = new THREE.TextureLoader();
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 3.6 : 5.4;
    const cardHeight = isMobile ? 2.4 : 3.2;
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const cardSpacingZ = 16;

    projectsData.forEach((proj, idx) => {
      const tex = textureLoader.load(proj.image);
      const mat = new THREE.MeshBasicMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
      });

      const cardMesh = new THREE.Mesh(cardGeo, mat);
      const zPos = -(idx * cardSpacingZ + 12);
      const xPos = isMobile ? 0 : idx % 2 === 0 ? -2.0 : 2.0;
      cardMesh.position.set(xPos, 0, zPos);

      if (!isMobile) {
        cardMesh.rotation.y = idx % 2 === 0 ? 0.22 : -0.22;
        cardMesh.rotation.z = idx % 2 === 0 ? 0.04 : -0.04;
      }
      cardGroup.add(cardMesh);
    });

    // 6. GSAP ScrollTrigger Sequence
    let masterTimeline: GSAPTimeline | null = null;
    if (gsap && ScrollTrigger) {
      const totalZ = projectsData.length * cardSpacingZ + 10;

      masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#alche-viewport',
          start: 'top top',
          end: `+=${projectsData.length * 1100}`,
          scrub: 1.1,
          pin: true,
        },
      });

      // Camera Travel
      masterTimeline.to(
        camera.position,
        {
          z: -totalZ,
          ease: 'none',
        },
        0
      );

      // Initial Hero Text Fade out
      masterTimeline.to(
        '#alche-hero-ui',
        {
          opacity: 0,
          scale: 0.75,
          y: -60,
          ease: 'power2.inOut',
          duration: 0.25,
        },
        0
      );

      // Orb scale & tunnel entrance
      masterTimeline.to(glassOrb.scale, { x: 3.2, y: 3.2, z: 3.2, ease: 'power1.in' }, 0);
      masterTimeline.to(glassOrb.position, { z: -8, ease: 'none' }, 0);
      masterTimeline.to(wireCage.scale, { x: 3.4, y: 3.4, z: 3.4, ease: 'power1.in' }, 0);
      masterTimeline.to(wireCage.position, { z: -8, ease: 'none' }, 0);

      // Dynamic Grids movement
      masterTimeline.to(gridBottom.position, { z: -totalZ * 0.45, ease: 'none' }, 0);
      masterTimeline.to(gridTop.position, { z: -totalZ * 0.45, ease: 'none' }, 0);
    }

    // 7. Mouse Dynamic Tilt Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Continuous Render Loop
    const clock = new THREE.Clock();
    let animFrameId: number;
    let frameCount = 0;
    let lastTime = performance.now();
    const fpsElement = document.getElementById('alche-fps');

    const renderLoop = () => {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Update Shader uniforms
      glassShaderMaterial.uniforms.uTime.value = elapsedTime;

      // Smooth Orb & Cage auto-rotation
      glassOrb.rotation.y += 0.006;
      glassOrb.rotation.x += 0.003;
      wireCage.rotation.y -= 0.004;
      wireCage.rotation.x -= 0.002;

      // Smooth mouse inertia
      camera.rotation.y += (targetRotY - camera.rotation.y) * 0.06;
      camera.rotation.x += (-targetRotX - camera.rotation.x) * 0.06;

      renderer.render(scene, camera);

      // FPS tracking for HUD telemetry
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        if (fpsElement) {
          fpsElement.textContent = String(Math.round((frameCount * 1000) / (now - lastTime)));
        }
        frameCount = 0;
        lastTime = now;
      }
    };
    renderLoop();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (rafId) cancelAnimationFrame(rafId);
      if (masterTimeline?.scrollTrigger) masterTimeline.scrollTrigger.kill();
      if (masterTimeline) masterTimeline.kill();
      if (lenisInstance) {
        try {
          lenisInstance.destroy();
        } catch {
          // ignore
        }
      }
      renderer.dispose();
      sphereGeometry.dispose();
      glassShaderMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      cardGeo.dispose();
    };
  }, []);

  return (
    <section className="alche-root" id="alche-viewport" ref={sectionRef}>
      <canvas id="alche-webgl-canvas" ref={canvasRef}></canvas>

      <div className="alche-hud-frame">
        {/* Top Bar */}
        <header className="alche-header">
          <div 
            className="alche-logo cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="alche-logo-icon">▲</span>
            <span className="alche-logo-title">ZONEX</span>
          </div>

          <nav className="alche-nav">
            <a href="#news" onClick={(e) => { e.preventDefault(); scrollToSection('insights'); }}>News</a>
            <a href="#works" className="active" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Works</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>About</a>
            <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer">Studio</a>
          </nav>

          <div className="alche-header-right">
            <div 
              className="alche-sound-visualizer" 
              onClick={() => setSoundActive(!soundActive)}
              title="Toggle Sound"
            >
              <span className="s-bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="s-bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="s-bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
              <span className="s-bar" style={{ animationPlayState: soundActive ? 'running' : 'paused' }}></span>
            </div>
            <button onClick={handleClaimAudit} className="alche-btn-contact">
              Contact / Recruit
            </button>
          </div>
        </header>

        {/* Floating HUD Coordinates & Diagnostics */}
        <div className="alche-hud-coords">
          <div>SYS.LOC // 12.2958° N, 76.6394° E</div>
          <div>RENDER // WEBGL2 CHROMATIC PIPELINE</div>
          <div>FPS: <span id="alche-fps">60</span></div>
        </div>

        {/* Center Interactive Hero Titles */}
        <div className="alche-center-hero" id="alche-hero-ui">
          <div className="alche-category-tag">EXPERIMENTAL DIGITAL &amp; AI ENGINE</div>
          <h1 className="alche-giant-title">ZONEX</h1>
          <p className="alche-subheading">Bridging Artificial Intelligence with High-Performance Growth</p>
        </div>

        {/* Bottom Bar */}
        <footer className="alche-footer">
          <div 
            className="alche-footer-left cursor-pointer"
            onClick={() => scrollToSection('portfolio')}
          >
            <span>SCROLL TO EXPLORE ARCHIVE</span>
            <div className="alche-scroll-line"></div>
          </div>
          <div className="alche-footer-center">
            <span className="alche-status-dot"></span> ALL SYSTEMS ONLINE
          </div>
          <div className="alche-footer-right">
            <span>© 2026 ZONEX GROWTH HUB</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Hero;
