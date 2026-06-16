'use client';

import React from 'react';

interface AdSlotProps {
  slot: string;
  format?: 'horizontal' | 'vertical' | 'rectangle' | 'in-article';
  className?: string;
}

export default function AdSlot({ slot, format = 'horizontal', className = '' }: AdSlotProps) {
  const sizes: Record<string, string> = {
    horizontal: 'min-h-[90px] sm:min-h-[120px]',
    vertical: 'min-h-[250px] sm:min-h-[600px]',
    rectangle: 'min-h-[250px]',
    'in-article': 'min-h-[280px]',
  };

  return (
    <div
      className={`ad-slot ${sizes[format]} ${className}`}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      {/* Replace data-ad-client with your AdSense Publisher ID after approval */}
      <ins
        className="adsbygoogle block w-full h-full"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5564677867865390"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="ad-placeholder flex items-center justify-center w-full h-full rounded-xl border border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50/50 dark:bg-zinc-900/30">
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
          Advertisement
        </span>
      </div>
    </div>
  );
}
