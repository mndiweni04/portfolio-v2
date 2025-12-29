"use client";

import { useEffect, useRef } from 'react';

export default function HeroBackground({ children }) {
  const containerRef = useRef(null);
  
  // We use refs for mutable variables that don't trigger re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const glow = useRef({ x: 0, y: 0 });
  const speed = 0.1;

  useEffect(() => {
    // 1. Update mouse coordinates
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // 2. Animation loop
    const animate = () => {
      const distX = mouse.current.x - glow.current.x;
      const distY = mouse.current.y - glow.current.y;
      
      glow.current.x = glow.current.x + (distX * speed);
      glow.current.y = glow.current.y + (distY * speed);

      if (containerRef.current) {
        containerRef.current.style.setProperty('--x', `${glow.current.x}px`);
        containerRef.current.style.setProperty('--y', `${glow.current.y}px`);
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
    <div ref={containerRef} className="hero-container">
      {children}
    </div>
  );
}