import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { analytics } from '@/utils/analytics';

interface ProjectItem {
  index: string;
  tag: string;
  title: string;
  jpDesc: string;
  year: string;
  image: string;
  url: string;
}

const PROJECTS: ProjectItem[] = [
  {
    index: '01 / 04',
    tag: '[ UEFN / WEBGL2 ]',
    title: 'FORTNITE CREATIVE // VIRAL ARCHITECTURE',
    jpDesc: '次世代インタラクティブ・メタバース空間設計',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=85',
    url: '#portfolio',
  },
  {
    index: '02 / 04',
    tag: '[ THREE.JS / GLSL ]',
    title: 'WEAR GO LAND // 3D VIRTUAL SHOWROOM',
    jpDesc: 'リアルタイム屈折シェーダーによる仮想体験',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=85',
    url: '#portfolio',
  },
  {
    index: '03 / 04',
    tag: '[ AUTOMATION / ADS ]',
    title: 'AI PERFORMANCE ENGINE // ZONEX',
    jpDesc: 'AIによる事業成長と広告ROI最大化システム',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85',
    url: '#services',
  },
  {
    index: '04 / 04',
    tag: '[ 3D FASHION / BRAND ]',
    title: 'DISCOAT 2026 // METAVERSE POPUP',
    jpDesc: 'ブランドアイデンティティと3Dコマース基盤',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=85',
    url: '#portfolio',
  },
];

const vertexShader = `
  uniform float uSpeed;
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Wave distortion & plane curvature on scroll momentum
    float bend = sin(uv.x * 3.14159265) * uSpeed * 0.0035;
    pos.z += bend;
    pos.y += sin(pos.x * 2.0 + uTime * 1.5) * 0.03 * (abs(uSpeed * 0.01) + 0.2);

    vPosition = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uSpeed;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec2 uv = vUv;
    
    // Refractive lens distortion from mouse position
    vec2 mouseDist = uv - uMouse;
    float dist = length(mouseDist);
    float lens = smoothstep(0.4, 0.0, dist) * 0.03;
    uv += mouseDist * lens;

    // RGB Split / Chromatic Aberration based on scroll speed momentum
    float rgbOffset = clamp(abs(uSpeed) * 0.0022, 0.0, 0.05);
    
    float r = texture2D(uTexture, uv + vec2(rgbOffset, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(rgbOffset, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.45;
    color *= vignette;
    
    // Scanlines
    float scanline = sin(vUv.y * 320.0) * 0.02;
    color += scanline;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const bgTitleRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [soundActive, setSoundActive] = useState(true);

  // Expose methods for Arrow controls
  const nextSlideRef = useRef<() => void>(() => {});
  const prevSlideRef = useRef<() => void>(() => {});

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClaimAudit = () => {
    analytics.trackLead('ALCHE Studio Header Contact CTA');
    scrollToSection('contact');
  };

  const handleViewActiveProject = () => {
    const current = PROJECTS[activeIdx];
    analytics.trackViewContent(`ALCHE Studio Project: ${current.title}`);
    scrollToSection('portfolio');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDisposed = false;

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030306, 0.02);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    // 2. 3D Curved Project Planes Setup
    const textureLoader = new THREE.TextureLoader();
    const planeGroup = new THREE.Group();
    scene.add(planeGroup);

    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 3.4 : 5.2;
    const cardHeight = isMobile ? 2.3 : 3.4;
    const cardSpacing = isMobile ? 4.2 : 6.4;
    const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight, 32, 32);

    const materials: THREE.ShaderMaterial[] = [];
    const meshes: THREE.Mesh[] = [];

    PROJECTS.forEach((proj, i) => {
      const texture = textureLoader.load(proj.image);
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uSpeed: { value: 0 },
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        },
        side: THREE.DoubleSide,
        transparent: true,
      });
      materials.push(mat);

      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.x = i * cardSpacing;
      meshes.push(mesh);
      planeGroup.add(mesh);
    });

    // 3. Smooth Momentum Drag & Wheel Lerp Controller
    let scrollX = 0;
    let targetScrollX = 0;
    const maxScrollX = (PROJECTS.length - 1) * cardSpacing;
    let isDragging = false;
    let startX = 0;
    let startScrollX = 0;
    let currentSpeed = 0;

    nextSlideRef.current = () => {
      targetScrollX = Math.min(targetScrollX + cardSpacing, maxScrollX);
    };

    prevSlideRef.current = () => {
      targetScrollX = Math.max(targetScrollX - cardSpacing, 0);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      startX = e.clientX;
      startScrollX = targetScrollX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Update mouse coordinate for shader lens effect
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = 1.0 - e.clientY / window.innerHeight;
      materials.forEach((mat) => {
        mat.uniforms.uMouse.value.set(mouseX, mouseY);
      });

      if (!isDragging) return;
      const diff = (e.clientX - startX) * 0.012;
      targetScrollX = Math.max(0, Math.min(startScrollX - diff * cardSpacing, maxScrollX));
    };

    const handlePointerUp = () => {
      isDragging = false;
      // Snap to closest card
      const snapIndex = Math.round(targetScrollX / cardSpacing);
      targetScrollX = Math.max(0, Math.min(snapIndex * cardSpacing, maxScrollX));
    };

    const handleWheel = (e: WheelEvent) => {
      // Only capture wheel within hero if not scrolling page
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) > 5) {
        targetScrollX = Math.max(0, Math.min(targetScrollX + e.deltaY * 0.005 * cardSpacing, maxScrollX));
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: true });

    // 4. Render & Animation Loop
    const clock = new THREE.Clock();
    let animFrameId: number;
    let frameCount = 0;
    let lastFpsTime = performance.now();
    const fpsElement = document.getElementById('alche-fps');

    const render = () => {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(render);

      const elapsedTime = clock.getElapsedTime();

      // Lerp scroll position with smooth inertia damping
      const prevScrollX = scrollX;
      scrollX += (targetScrollX - scrollX) * 0.085;
      currentSpeed = (scrollX - prevScrollX) * 45.0;

      // Update plane group position
      planeGroup.position.x = -scrollX;

      // Update active index
      const curIdx = Math.max(0, Math.min(Math.round(scrollX / cardSpacing), PROJECTS.length - 1));
      setActiveIdx(curIdx);

      // Parallax Background Title translation
      if (bgTitleRef.current) {
        const parallaxOffset = (scrollX / maxScrollX - 0.5) * -120;
        bgTitleRef.current.style.transform = `translate(calc(-50% + ${parallaxOffset}px), -50%)`;
      }

      // Update card uniforms & individual perspective tilts
      materials.forEach((mat, idx) => {
        mat.uniforms.uTime.value = elapsedTime;
        mat.uniforms.uSpeed.value = currentSpeed;

        const mesh = meshes[idx];
        const distFromCenter = Math.abs(mesh.position.x - scrollX);
        const scaleFactor = Math.max(0.85, 1.0 - distFromCenter * 0.04);
        mesh.scale.set(scaleFactor, scaleFactor, 1.0);
        mesh.rotation.y = (mesh.position.x - scrollX) * 0.035;
      });

      renderer.render(scene, camera);

      // FPS tracking for HUD telemetry
      frameCount++;
      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        if (fpsElement) {
          fpsElement.textContent = String(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        }
        frameCount = 0;
        lastFpsTime = now;
      }
    };
    render();

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
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      renderer.dispose();
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    };
  }, []);

  const activeProject = PROJECTS[activeIdx] || PROJECTS[0];

  return (
    <section className="alche-slider-root" id="alche-viewport" ref={containerRef}>
      <canvas id="alche-slider-canvas" ref={canvasRef}></canvas>

      {/* Large Parallax Hollow Typography in Background Space */}
      <div className="alche-parallax-bg-title" ref={bgTitleRef}>
        ZONEX // ARCHIVE 2026
      </div>

      <div className="alche-hud-frame">
        {/* Top Minimalist Header */}
        <header className="alche-header">
          <div 
            className="alche-logo cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="alche-logo-icon">▲</span>
            <span className="alche-logo-title">ZONEX</span>
          </div>

          <nav className="alche-nav">
            <a href="#works" className="active" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>Works</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
            <a href="#insights" onClick={(e) => { e.preventDefault(); scrollToSection('insights'); }}>Insights</a>
            <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer">Academy</a>
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

        {/* Floating Telemetry Coordinates */}
        <div className="alche-hud-coords">
          <div>SYS.LOC // 12.2958° N, 76.6394° E</div>
          <div>SHADER // GLSL CURVED LENS PIPELINE</div>
          <div>FPS: <span id="alche-fps">60</span></div>
        </div>

        {/* Active Project Glassmorphism HUD Card (Bottom Left) */}
        <div className="flex items-end justify-between w-full">
          <div className="alche-active-card-info">
            <div className="alche-card-meta-row">
              <span className="alche-card-index">{activeProject.index}</span>
              <span className="alche-card-tag">{activeProject.tag}</span>
            </div>
            <h2 className="alche-card-title">{activeProject.title}</h2>
            <p className="alche-card-jp-desc">{activeProject.jpDesc}</p>
            <button onClick={handleViewActiveProject} className="alche-card-cta-btn">
              <span>EXPLORE CASE ARCHIVE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Arrow Controls */}
          <div className="alche-slider-controls hidden sm:flex">
            <button 
              onClick={() => prevSlideRef.current()}
              className="alche-ctrl-arrow"
              aria-label="Previous Project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => nextSlideRef.current()}
              className="alche-ctrl-arrow"
              aria-label="Next Project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Minimalist Footer */}
        <footer className="alche-footer">
          <div 
            className="alche-footer-left cursor-pointer"
            onClick={() => scrollToSection('portfolio')}
          >
            <span>DRAG / SCROLL TO EXPLORE ARCHIVE</span>
            <div className="alche-scroll-line"></div>
          </div>
          <div className="alche-footer-center hidden sm:block">
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
