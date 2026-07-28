import React, { useRef, useState } from 'react';

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(99, 102, 241, 0.15)' }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border bg-[var(--bg-card)] border-[var(--border-color)] transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-xl ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
