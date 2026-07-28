import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function DecayCard({ children, className = '' }) {
  const cardRef = useRef(null);

  // Motion values for tracking cursor position on card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse positions to 3D rotation angles (-15 to 15 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  // Spring settings for smooth animation
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize coordinates to a range of -0.5 to 0.5
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative w-full rounded-2xl border bg-[var(--bg-card)] border-[var(--border-color)] transition-colors duration-300 hover:border-[var(--border-hover)] ${className}`}
      >
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
