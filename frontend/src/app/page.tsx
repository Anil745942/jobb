'use client';

import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import {
  Search, MapPin, TrendingUp, ChevronRight, Zap, Globe,
  Award, Clock, Star, ArrowRight, Play, Shield, Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VideoBackground from '@/components/VideoBackground';
import ScrollReveal from '@/components/ScrollReveal';
import AnimatedCounter from '@/components/AnimatedCounter';
import AdSlot from '@/components/AdSlot';
import FAQ from '@/components/FAQ';
import ParticleBackground from '@/components/ParticleBackground';

export default function Home() {
  const { jobs } = useApp();
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/jobs?search=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  const categories = [
    { name: 'Software Engineering', count: '1,240 open roles', icon: '💻', color: 'from-blue-500/10 to-indigo-500/10' },
    { name: 'Product Management', count: '480 open roles', icon: '📊', color: 'from-purple-500/10 to-pink-500/10' },
    { name: 'Design & Creative', count: '720 open roles', icon: '🎨', color: 'from-amber-500/10 to-orange-500/10' },
    { name: 'Data & AI', count: '310 open roles', icon: '🧠', color: 'from-teal-500/10 to-emerald-500/10' },
    { name: 'Marketing & Sales', count: '590 open roles', icon: '📣', color: 'from-rose-500/10 to-red-500/10' },
    { name: 'Finance & Legal', count: '150 open roles', icon: '⚖️', color: 'from-cyan-500/10 to-sky-500/10' },
  ];

  const companies = [
    { name: 'Stripe', logo: '💳', rating: '4.8', jobsCount: '12 open jobs', industry: 'Fintech' },
    { name: 'Vercel', logo: '▲', rating: '4.9', jobsCount: '6 open jobs', industry: 'Cloud Infrastructure' },
    { name: 'Figma', logo: '❖', rating: '4.7', jobsCount: '9 open jobs', industry: 'Design Tools' },
    { name: 'Supabase', logo: '⚡', rating: '4.8', jobsCount: '4 open jobs', industry: 'Database / SaaS' },
  ];

  const howItWorks = [
    { step: '01', title: 'Create Your Profile', desc: 'Build a stunning profile with skills, experience, and career goals in under 5 minutes.', icon: Users },
    { step: '02', title: 'AI Matches You', desc: 'Our engine scans 12,500+ listings and scores each match based on your unique profile.', icon: Zap },
    { step: '03', title: 'Apply & Get Hired', desc: 'One-click applications, real-time status tracking, and direct recruiter messaging.', icon: Award },
  ];

  const tickerItems = [
    'Google hiring 200+ engineers', 'Remote React roles up 34%', 'Stripe opens Bangalore office',
    'AI/ML salaries hit $180k avg', 'Figma seeks senior designers', 'Vercel remote-first expansion',
    'Product Manager demand +28%', 'Data Science roles surge 41%', 'Next.js developers in high demand',
  ];

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="relative overflow-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-32 px-4 max-w-7xl mx-auto">
        <VideoBackground opacity={0.18} showOnMobile />
        <ParticleBackground />

        <div className="hero-video-ring w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none" />
        <div className="hero-video-ring w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute pointer-events-none" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/40 border border-violet-200/50 dark:border-violet-800/30 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
            <TrendingUp size={12} /> India&apos;s #1 AI Job Platform
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white max-w-5xl leading-[1.1] animate-fade-in-up">
            Find Your Dream Career with{' '}
            <span className="text-shimmer font-black">AI-Powered Precision</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            JobConnect Pro maps elite tech talent into verified startups and global enterprises.
            Security guard se software engineer tak — sab jobs ek platform par.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 w-full max-w-4xl glow-border glass-card dark:bg-zinc-900/80 border border-gray-100 dark:border-zinc-800/70 p-2 rounded-2xl md:rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 items-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-3 px-4 py-3 w-full md:w-5/12 border-b md:border-b-0 md:border-r border-gray-100 dark:border-zinc-800">
              <Search className="text-violet-500 shrink-0" size={18} />
              <input
                type="text"
                placeholder="Job title, keywords, or skills..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="bg-transparent border-0 outline-none text-sm w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-3 px-4 py-3 w-full md:w-5/12">
              <MapPin className="text-cyan-500 shrink-0" size={18} />
              <input
                type="text"
                placeholder="City, state, or Remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent border-0 outline-none text-sm w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl md:rounded-2xl shadow-lg cursor-pointer transition-all shrink-0 hover:scale-[1.02] active:scale-95"
            >
              Search Jobs
            </button>
          </form>

          {/* Trending chips */}
          <div className="flex flex-wrap gap-2 justify-center mt-4 max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {['React Developer', 'Remote', 'Chandigarh', 'Data Analyst', 'UI Designer'].map((chip) => (
              <button
                key={chip}
                onClick={() => { setKeyword(chip); router.push(`/jobs?search=${encodeURIComponent(chip)}`); }}
                className="px-3 py-1.5 text-[11px] font-semibold rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-14 w-full max-w-5xl stagger-children">
            {[
              { val: 12500, suffix: '+', label: 'Active Job Postings' },
              { val: 820, suffix: '+', label: 'Verified Companies' },
              { val: 45000, suffix: '+', label: 'Placed Candidates' },
              { val: 98.2, suffix: '%', label: 'Skill Match Score', decimals: 1 },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                  <AnimatedCounter end={s.val} suffix={s.suffix} decimals={s.decimals} />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="bg-violet-600/5 dark:bg-violet-950/20 border-y border-violet-100 dark:border-violet-900/30 py-3 overflow-hidden">
        <div className="marquee-track gap-8">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-[11px] font-semibold text-violet-600 dark:text-violet-400 whitespace-nowrap px-4">
              <Zap size={12} /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ AD SLOT 1 ═══ */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AdSlot slot="1234567890" format="horizontal" />
      </div>

      {/* ═══ VIDEO SHOWCASE ═══ */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600">Platform Demo</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 leading-tight">
                See How JobConnect Pro Works
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 leading-relaxed">
                Watch our platform in action — from AI-powered job matching to one-click applications.
                Built for speed, designed for success.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                {[
                  { icon: Shield, text: 'Verified Employers' },
                  { icon: Globe, text: 'Global Reach' },
                  { icon: Clock, text: '48hr Response' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                    <f.icon size={16} className="text-violet-600" />
                    {f.text}
                  </div>
                ))}
              </div>
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg hover:scale-[1.02] transition-all"
              >
                Explore Jobs <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl glow-border aspect-video group cursor-pointer" onClick={() => setVideoPlaying(!videoPlaying)}>
              <video
                autoPlay={videoPlaying}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/hero-video.mp4"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              {!videoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play size={28} className="text-violet-600 ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-gray-50/50 dark:bg-zinc-950/30 py-12 sm:py-20 px-4 border-y border-gray-100 dark:border-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">How It Works</h2>
            <p className="text-sm text-gray-500 mt-2">Three simple steps to your next career milestone.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {howItWorks.map((step, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="glass-card video-hover-card p-6 sm:p-8 rounded-2xl text-center relative group">
                  <div className="text-5xl font-black text-violet-600/10 dark:text-violet-400/10 absolute top-4 right-6">{step.step}</div>
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <step.icon size={24} />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white mt-5">{step.title}</h3>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-12 sm:py-20 px-4 relative">
        <VideoBackground opacity={0.06} />
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Explore Careers by Industry</h2>
            <p className="text-sm text-gray-500 mt-2">Curated roles in the fastest-growing ecosystems.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((c, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <Link
                  href={`/jobs?category=${encodeURIComponent(c.name)}`}
                  className="glass-card video-hover-card hover-lift p-5 sm:p-6 rounded-2xl flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${c.color} group-hover:scale-110 transition-transform`}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors">{c.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">{c.count}</p>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-violet-600 group-hover:translate-x-1 transition-all" size={18} />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED JOBS ═══ */}
      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Featured Job Listings</h2>
            <p className="text-sm text-gray-500 mt-1">Hand-picked positions with premium benefits.</p>
          </div>
          <Link href="/jobs" className="mt-4 sm:mt-0 flex items-center gap-1 text-sm font-bold text-violet-600 hover:text-violet-700">
            Browse All <ChevronRight size={16} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-400 text-sm">Loading featured jobs...</div>
          ) : (
            featuredJobs.map((job, index) => (
              <ScrollReveal key={job.id} delay={index * 100}>
                <div className="glass-card video-hover-card hover-lift p-6 rounded-2xl flex flex-col justify-between h-full min-h-[260px] group">
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">{job.type}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-md">
                        ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white mt-4">{job.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{job.company.name} • {job.location}</p>
                    <p className="text-[11px] text-gray-400 mt-3 line-clamp-3 leading-relaxed">{job.description}</p>
                  </div>
                  <div className="border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-between items-center mt-4">
                    <div className="flex gap-1">
                      {job.skills.slice(0, 2).map((s: string, idx: number) => (
                        <span key={idx} className="text-[9px] font-medium bg-violet-50 dark:bg-violet-950/30 text-violet-600 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                    <Link href={`/jobs/${job.id}`} className="text-xs font-extrabold text-violet-600 hover:text-violet-700 flex items-center gap-0.5">
                      Apply <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </section>

      {/* ═══ AD SLOT 2 ═══ */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <AdSlot slot="0987654321" format="rectangle" className="max-w-3xl mx-auto" />
      </div>

      {/* ═══ TOP COMPANIES ═══ */}
      <section className="bg-gray-50/30 dark:bg-zinc-950/20 py-12 sm:py-20 px-4 border-t border-gray-100 dark:border-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Partnered Top Companies</h2>
            <p className="text-sm text-gray-500 mt-2">Verified for culture, inclusion, and tech excellence.</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {companies.map((c, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="glass-card video-hover-card hover-lift p-5 sm:p-6 rounded-2xl flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-violet-600/10 text-violet-600 flex items-center justify-center text-2xl font-bold group-hover:scale-110 group-hover:rotate-3 transition-all">
                    {c.logo}
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white mt-4">{c.name}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{c.industry} • <Star size={10} className="inline text-amber-400" fill="currentColor" /> {c.rating}</p>
                  <span className="mt-3 text-xs font-semibold text-violet-600 bg-violet-50 dark:bg-violet-950/20 px-3 py-1 rounded-full">{c.jobsCount}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-12 sm:py-20 px-4 max-w-7xl mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Success Stories</h2>
          <p className="text-sm text-gray-500 mt-2">Real people, real career transformations.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { quote: 'AI skill recommendations helped me land 3 interviews in a week. Now I\'m a Software Engineer at Stripe!', name: 'Emma Watson', role: 'Software Engineer at Stripe', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' },
            { quote: 'We listed a Senior UI role and matched with skilled candidates immediately. The interview calendar saved hours.', name: 'Marcus Aurelius', role: 'Head of Talent at Vercel', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80' },
            { quote: 'Simple, clean, and secure. Direct chat with recruiters made the whole process feel respectful.', name: 'David Miller', role: 'Full Stack Dev at Figma', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80' },
          ].map((t, i) => (
            <ScrollReveal key={i} delay={i * 120}>
              <div className="glass-card p-6 rounded-2xl h-full flex flex-col justify-between group">
                <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-600/20" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{t.name}</h4>
                    <p className="text-[10px] text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-12 sm:py-20 px-4 bg-gray-50/50 dark:bg-zinc-950/30 border-t border-gray-100 dark:border-zinc-900/50">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500 mt-2">Everything you need to know about JobConnect Pro.</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQ />
          </ScrollReveal>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-sm font-bold text-violet-600 hover:text-violet-700">
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ NEWSLETTER CTA ═══ */}
      <section className="mx-4 sm:mx-auto max-w-7xl my-8 sm:my-12">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 py-12 sm:py-16 px-6 sm:px-8 text-white text-center rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden">
          <VideoBackground opacity={0.15} overlay={false} />
          <div className="absolute top-0 left-0 w-44 h-44 bg-cyan-400/20 rounded-full blur-3xl -translate-x-12 -translate-y-12 animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-400/30 rounded-full blur-3xl translate-x-12 translate-y-12 animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold">Never Miss a Career Opportunity</h2>
            <p className="text-sm text-violet-100 mt-3 leading-relaxed">
              Get curated job alerts, interview tips, and salary trends in your inbox.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email..."
                className="bg-white/10 border border-white/20 text-white placeholder-violet-200 outline-none px-4 py-3 text-sm rounded-xl w-full focus:ring-2 focus:ring-cyan-300"
                required
              />
              <button type="submit" className="bg-white text-violet-600 font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg hover:bg-violet-50 transition-all hover:scale-105 shrink-0">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
