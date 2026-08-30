import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#030307]">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 mesh-gradient opacity-80" />

      {/* Cursor Spotlight: Smooth Mouse following ambient glow */}
      <div
        className="pointer-events-none fixed z-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.08)_0%,transparent_70%)] hidden md:block"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transform: 'translateZ(0)',
          willChange: 'left, top',
        }}
      />

      {/* Cyber Grid SVG Overlay with animated flowing beams */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cyber-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(6,182,212,0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cyber-grid)" />

        {/* Laser flow lines along grid rows */}
        <line x1="0" y1="160" x2="100%" y2="160" stroke="rgba(168,85,247,0.3)" strokeWidth="1">
          <animate attributeName="x1" from="-100%" to="100%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="x2" from="0%" to="200%" dur="12s" repeatCount="indefinite" />
        </line>
        <line x1="0" y1="480" x2="100%" y2="480" stroke="rgba(6,182,212,0.3)" strokeWidth="1">
          <animate attributeName="x1" from="100%" to="-100%" dur="16s" repeatCount="indefinite" />
          <animate attributeName="x2" from="200%" to="0%" dur="16s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Primary moving violet orb */}
      <motion.div
        className="absolute top-[-15%] left-[0%] w-[550px] h-[550px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)' }}
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Deep royal purple orb */}
      <motion.div
        className="absolute top-[25%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        animate={{ x: [0, -80, 0], y: [0, 70, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default AmbientBackground;
