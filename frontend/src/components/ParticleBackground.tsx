'use client';

import React from 'react';

export default function ParticleBackground() {
  return (
    <div className="particles-container absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden>
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${4 + (i % 5)}s`,
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
          }}
        />
      ))}
    </div>
  );
}
