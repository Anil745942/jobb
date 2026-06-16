'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms: Record<string, string> = {
    up: 'translateY(32px)',
    down: 'translateY(-32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
    scale: 'scale(0.92)',
  };

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? 'none' : transforms[direction],
        opacity: visible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
