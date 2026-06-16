'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-2xl animate-slide-in">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-violet-100 dark:bg-violet-950/40 p-2 rounded-lg text-violet-600 dark:text-violet-400 shrink-0">
            <Cookie size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              Cookie Consent
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              We use cookies to enhance your experience, analyze site traffic, and serve personalized ads through Google AdSense.
              By clicking &quot;Accept&quot;, you consent to our use of cookies and advertising partners.
              <Link href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline ml-1">
                Learn more
              </Link>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg shadow-md transition-all hover:scale-105"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
