"use client";

import { useEffect, useRef } from 'react';

export default function HeroBackground({ children }) {
  const glowRef = useRef(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const speed = 0.1;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const distX = mouse.current.x - glow.current.x;
      const distY = mouse.current.y - glow.current.y;
      
      glow.current.x = glow.current.x + (distX * speed);
      glow.current.y = glow.current.y + (distY * speed);

      if (glowRef.current) {
        glowRef.current.style.setProperty('--x', `${glow.current.x}px`);
        glowRef.current.style.setProperty('--y', `${glow.current.y}px`);
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="hero-container" style={{ backgroundImage: 'none' }}>
      <div 
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), var(--glow-color), transparent 40%)',
          zIndex: 0
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}