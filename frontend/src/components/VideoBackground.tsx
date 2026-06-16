'use client';

import React from 'react';

interface VideoBackgroundProps {
  opacity?: number;
  className?: string;
  overlay?: boolean;
  showOnMobile?: boolean;
}

export default function VideoBackground({
  opacity = 0.12,
  className = '',
  overlay = true,
  showOnMobile = false,
}: VideoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-cover ${showOnMobile ? '' : 'hidden sm:block'}`}
        style={{ opacity }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white dark:from-zinc-950/92 dark:via-zinc-950/80 dark:to-zinc-950" />
      )}
    </div>
  );
}
