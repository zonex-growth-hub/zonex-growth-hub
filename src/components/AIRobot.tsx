import { useEffect, useRef, useState } from 'react';

const ROBOT_IMG = '/assets/images/lv_0_20260806183658.png';

// Eye positions as % of image dimensions
const EYES = [
  { left: '37%', top: '30%' },  // left eye
  { left: '66%', top: '30%' },  // right eye
];

export function AIRobot() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isTouchDevice = useRef(typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouchDevice.current) return;

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth: W, innerHeight: H } = window;
      const nx = (e.clientX / W) * 2 - 1;
      const ny = (e.clientY / H) * 2 - 1;
      targetRef.current.x = -ny * 12;
      targetRef.current.y = nx * 12;
    };

    const animate = () => {
      const lerp = 0.06;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      setTilt({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const transform = isTouchDevice.current
    ? undefined
    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  return (
    <div
      ref={wrapperRef}
      className="robot-scene-wrapper"
      style={{ perspective: '1000px' }}
    >
      <div className="robot-outer-glow" />

      <div
        className="robot-tilt-card"
        style={{
          transform,
          transition: isTouchDevice.current ? undefined : 'none',
          willChange: 'transform',
        }}
      >
        <img
          src={ROBOT_IMG}
          alt="ZoneX AI Robot Mascot"
          draggable={false}
          className="robot-img"
        />

        {EYES.map((eye, i) => (
          <span
            key={i}
            className={`eye-glow eye-glow-${i % 2 === 0 ? 'left' : 'right'}`}
            style={{ left: eye.left, top: eye.top }}
          />
        ))}

        <div className="robot-face-sheen" />
      </div>
    </div>
  );
}
