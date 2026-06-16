'use client';

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sun, Moon, Briefcase, User, LogOut, LayoutDashboard, Settings, Bell, Menu, X } from 'lucide-react';
import Link from 'next/link';
import './globals.css';
import CookieConsent from '@/components/CookieConsent';
import WhatsAppFloat from '@/components/WhatsAppFloat';

function MainHeader() {
  const { user, logout, theme, toggleTheme, notifications, fetchNotifications } = useApp();
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [showNotifMenu, setShowNotifMenu] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  return (
    <header className="glass-nav sticky top-0 z-50 w-full hover:shadow-sm transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-violet-600 to-cyan-500 p-2 rounded-xl text-white shadow-md hover:scale-105 transition-transform duration-200">
            <Briefcase size={22} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            JobConnect<span className="text-violet-600 font-extrabold">Pro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link href="/" className="hover:text-violet-600 transition-colors duration-150">Home</Link>
          <Link href="/jobs" className="hover:text-violet-600 transition-colors duration-150">Find Jobs</Link>
          <Link href="/about" className="hover:text-violet-600 transition-colors duration-150">About</Link>
          <Link href="/blog" className="hover:text-violet-600 transition-colors duration-150">Blog</Link>
          <Link href="/faq" className="hover:text-violet-600 transition-colors duration-150">FAQ</Link>
          <Link href="/contact" className="hover:text-violet-600 transition-colors duration-150">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150"
          aria-label="Toggle menu"
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Quick actions (Theme toggler, Notification center, Profile dropdown) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <>
              {/* Notifications */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => {
                    setShowNotifMenu(!showNotifMenu);
                    setShowProfileMenu(false);
                    fetchNotifications();
                  }}
                  className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 relative"
                >
                  <Bell size={18} />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifMenu && (
                  <div className="absolute right-0 mt-3 w-80 glass-card dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden py-2 animate-fadeIn z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">Notifications</span>
                      <span className="text-xs text-violet-600 cursor-pointer">Mark read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-center text-xs text-gray-400">No new notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <div key={n.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 border-b border-gray-50 dark:border-zinc-800/30 transition-colors">
                            <p className="font-medium text-xs text-gray-900 dark:text-white">{n.title}</p>
                            <p className="text-[11px] text-gray-500 mt-0.5">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifMenu(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-150 focus:outline-none"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                    alt="Profile Avatar"
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-violet-600/20"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {user.firstName || 'User'}
                  </span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-56 glass-card dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden py-2 animate-fadeIn z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
                        {user.role}
                      </span>
                    </div>

                    <div className="py-1">
                      {user.role === 'CANDIDATE' && (
                        <Link href="/dashboard/candidate" className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-zinc-800 hover:text-violet-600" onClick={() => setShowProfileMenu(false)}>
                          <LayoutDashboard size={14} /> Candidate Dashboard
                        </Link>
                      )}
                      {user.role === 'EMPLOYER' && (
                        <Link href="/dashboard/employer" className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-zinc-800 hover:text-violet-600" onClick={() => setShowProfileMenu(false)}>
                          <LayoutDashboard size={14} /> Employer Dashboard
                        </Link>
                      )}
                      {user.role === 'ADMIN' && (
                        <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-zinc-800 hover:text-violet-600" onClick={() => setShowProfileMenu(false)}>
                          <Settings size={14} /> Admin Portal
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-gray-100 dark:border-zinc-800 pt-1">
                      <button 
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/login" className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 rounded-xl shadow-md hover:shadow-violet-500/20 hover:scale-[1.02] transition-all duration-150">
                Register
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-fadeIn">
          <div className="px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>Home</Link>
              <Link href="/jobs" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>Find Jobs</Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>About</Link>
              <Link href="/blog" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>Blog</Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>FAQ</Link>
              <Link href="/contact" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-violet-600 transition-colors" onClick={() => setShowMobileMenu(false)}>Contact</Link>
            </nav>
            
            {user ? (
              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                    alt="Profile Avatar"
                    className="w-10 h-10 rounded-lg object-cover ring-2 ring-violet-600/20"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {user.role === 'CANDIDATE' && (
                    <Link href="/dashboard/candidate" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-violet-600" onClick={() => setShowMobileMenu(false)}>
                      Candidate Dashboard
                    </Link>
                  )}
                  {user.role === 'EMPLOYER' && (
                    <Link href="/dashboard/employer" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-violet-600" onClick={() => setShowMobileMenu(false)}>
                      Employer Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left text-sm text-rose-600 hover:text-rose-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 space-y-3">
                <Link href="/login" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-violet-600" onClick={() => setShowMobileMenu(false)}>
                  Sign In
                </Link>
                <Link href="/register" className="block text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 rounded-xl text-center" onClick={() => setShowMobileMenu(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function MainFooter() {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div>
          <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            JobConnect<span className="text-violet-600 font-extrabold">Pro</span>
          </span>
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 leading-relaxed">
            World-class job discovery platform matching elite tech candidates with fast-growing startups and enterprises.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">For Candidates</h4>
          <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            <li><Link href="/jobs" className="hover:text-violet-600 transition-colors py-1 inline-block">Explore Jobs</Link></li>
            <li><Link href="/dashboard/candidate" className="hover:text-violet-600 transition-colors py-1 inline-block">Candidate Profile</Link></li>
            <li><Link href="/blog" className="hover:text-violet-600 transition-colors py-1 inline-block">Career Blog</Link></li>
            <li><Link href="/faq" className="hover:text-violet-600 transition-colors py-1 inline-block">FAQ</Link></li>
            <li><Link href="/jobs" className="hover:text-violet-600 transition-colors py-1 inline-block">AI Skill Matching</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">For Employers</h4>
          <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            <li><Link href="/dashboard/employer" className="hover:text-violet-600 transition-colors py-1 inline-block">Post a Job</Link></li>
            <li><Link href="/dashboard/employer" className="hover:text-violet-600 transition-colors py-1 inline-block">Employer Portal</Link></li>
            <li><Link href="/contact" className="hover:text-violet-600 transition-colors py-1 inline-block">Pricing Plans</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Legal & Resources</h4>
          <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
            <li><Link href="/about" className="hover:text-violet-600 transition-colors py-1 inline-block">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-violet-600 transition-colors py-1 inline-block">Contact Support</Link></li>
            <li><Link href="/terms" className="hover:text-violet-600 transition-colors py-1 inline-block">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-violet-600 transition-colors py-1 inline-block">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-violet-600 transition-colors py-1 inline-block">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-zinc-900 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-xs text-gray-400">
        <p>© 2026 JobConnect Pro. Made with premium coding standards.</p>
        <div className="flex gap-3 sm:gap-4 mt-3 sm:mt-0 flex-wrap justify-center">
          <Link href="/privacy" className="hover:text-violet-600 py-1">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-violet-600 py-1">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-violet-600 py-1">Disclaimer</Link>
          <Link href="/sitemap.xml" className="hover:text-violet-600 py-1">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="JobConnect Pro - AI-powered job matching platform connecting elite tech talent with top companies. Find your dream career with precision matching." />
        <meta name="keywords" content="jobs, career, tech jobs, software engineering, job search, AI matching, recruitment, hiring" />
        <meta name="author" content="JobConnect Pro" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jobconnectpro.com/" />
        <meta property="og:title" content="JobConnect Pro - AI-Powered Job Matching" />
        <meta property="og:description" content="Find your dream career with AI-powered precision matching. Connect with top tech companies worldwide." />
        <meta property="og:image" content="https://jobconnectpro.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://jobconnectpro.com/" />
        <meta property="twitter:title" content="JobConnect Pro - AI-Powered Job Matching" />
        <meta property="twitter:description" content="Find your dream career with AI-powered precision matching. Connect with top tech companies worldwide." />
        <meta property="twitter:image" content="https://jobconnectpro.com/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://jobconnectpro.com/" />
        
        {/* Google AdSense - Replace ca-pub-XXXXXXXXXXXXXXXX with your Publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JobConnect Pro",
              "url": "https://jobconnectpro.com/",
              "description": "AI-powered job matching platform connecting elite tech talent with top companies",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jobconnectpro.com/jobs?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col gradient-bg">
        <AppProvider>
          <MainHeader />
          <main className="flex-grow">
            {children}
          </main>
          <MainFooter />
          <CookieConsent />
          <WhatsAppFloat />
        </AppProvider>
      </body>
    </html>
  );
}
