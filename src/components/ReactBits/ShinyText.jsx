import React from 'react';

export default function ShinyText({ text, disabled = false, speed = 5, className = '' }) {
  const animationStyle = disabled
    ? {}
    : {
        animation: `shine ${speed}s linear infinite`,
        backgroundImage: 'linear-gradient(120deg, var(--text-secondary) 30%, var(--text-primary) 50%, var(--text-secondary) 70%)',
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      };

  return (
    <span
      style={animationStyle}
      className={`inline-block select-none font-semibold ${className}`}
    >
      {text}
    </span>
  );
}
