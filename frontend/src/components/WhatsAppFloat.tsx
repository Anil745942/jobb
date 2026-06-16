'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const phone = '919876543210';
  const message = encodeURIComponent('Hi JobConnect Pro! I need help finding a job.');

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110 active:scale-95 animate-bounce-slow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" />
    </a>
  );
}
