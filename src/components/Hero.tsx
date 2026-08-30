import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { analytics } from '@/utils/analytics';

interface SlideItem {
  title: string;
  tag: string;
  desc: string;
  img: string;
}

const SLIDES: SlideItem[] = [
  {
    title: 'AI PERFORMANCE ENGINE',
    tag: 'PROJECT // 01',
    desc: 'High-speed programmatic scaling and full-funnel systems.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
  },
  {
    title: 'FORTNITE CREATIVE // VIRAL',
    tag: 'PROJECT // 02',
    desc: 'Interactive brand engagement and immersive 3D maps.',
    img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&q=80',
  },
  {
    title: 'DISCOAT 2026 POPUP',
    tag: 'PROJECT // 03',
    desc: 'Real-time generative showcases and virtual showrooms.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
];

const vertexShader = `
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.z += sin(pos.x * 1.5 + uSpeed * 2.0) * 0.25;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uSpeed;
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    float shift = uSpeed * 0.04;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    analytics.trackLead('WebGL Header Contact CTA');
    scrollToSection('contact');
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Texture loading & material building
    const loader = new THREE.TextureLoader();
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);

    const meshes: THREE.Mesh[] = [];
    const geometry = new THREE.PlaneGeometry(3.6, 2.3, 32, 32);

    SLIDES.forEach((item, i) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: loader.load(item.img) },
          uSpeed: { value: 0.0 },
        },
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, mat);
      mesh.position.x = i * 4.4;
      meshGroup.add(mesh);
      meshes.push(mesh);
    });

    // 3. Wheel & Drag scrolling controls
    let targetX = 0;
    let currentX = 0;
    let speed = 0;
    let isDragging = false;
    let startX = 0;

    const handleWheel = (e: WheelEvent) => {
      targetX -= e.deltaY * 0.004;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetX += (e.clientX - startX) * 0.008;
      startX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      targetX += (e.touches[0].clientX - startX) * 0.012;
      startX = e.touches[0].clientX;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);

    // 4. Render loop
    let animFrameId: number;
    const animate = () => {
      if (isDisposed) return;
      animFrameId = requestAnimationFrame(animate);

      const prevX = currentX;
      currentX += (targetX - currentX) * 0.08;
      speed = currentX - prevX;

      meshGroup.position.x = currentX;
      meshes.forEach((m) => {
        const mat = m.material as THREE.ShaderMaterial;
        mat.uniforms.uSpeed.value = speed * 4.0;
      });

      const activeIndex = Math.max(0, Math.min(SLIDES.length - 1, Math.round(-currentX / 4.4)));
      setActiveIdx(activeIndex);

      renderer.render(scene, camera);
    };
    animate();

    // 5. Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      meshes.forEach((m) => {
        const mat = m.material as THREE.ShaderMaterial;
        mat.dispose();
      });
    };
  }, []);

  const activeSlide = SLIDES[activeIdx] || SLIDES[0];

  return (
    <section className="relative w-screen h-screen bg-black overflow-hidden" id="alche-viewport">
      <div id="canvas-container" ref={containerRef}></div>
      
      <div className="hud">
        {/* Top Bar */}
        <div className="hud-top">
          <div 
            className="brand cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ▲ ZONEX
          </div>
          <div className="nav-links">
            <span onClick={() => scrollToSection('portfolio')}>WORKS</span>
            <span onClick={() => scrollToSection('services')}>SERVICES</span>
            <span onClick={() => scrollToSection('insights')}>INSIGHTS</span>
            <a href="https://zonex-academy.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">ACADEMY</a>
          </div>
          <a href="#contact" onClick={handleContact} className="btn-contact">
            Contact [ + ]
          </a>
        </div>

        {/* Center Kinetic Typography */}
        <div className="hud-center">
          <h1 className="bg-title" id="bg-title">WORKS</h1>
        </div>

        {/* Bottom Left Card Info */}
        <div className="card-info" id="card-info">
          <div className="card-tag" id="card-tag">{activeSlide.tag}</div>
          <div className="card-title" id="card-title">{activeSlide.title}</div>
          <div className="card-desc" id="card-desc">{activeSlide.desc}</div>
        </div>

        {/* Bottom HUD Bar */}
        <div className="hud-bottom">
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>SYS.2026 // LIVE</span>
          <span style={{ fontSize: '0.7rem', color: '#64748b' }}>DRAG / SCROLL TO NAVIGATE</span>
          <span style={{ fontSize: '0.7rem', color: '#22c55e' }}>● ALL SYSTEMS ONLINE</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
