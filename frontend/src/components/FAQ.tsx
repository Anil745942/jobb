'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does JobConnect Pro match candidates with jobs?',
    a: 'Our AI-powered engine analyzes your skills, experience, and preferences against thousands of active listings. It scores each match based on skill alignment, salary fit, location preference, and company culture indicators — delivering only the most relevant opportunities.',
  },
  {
    q: 'Is JobConnect Pro free for job seekers?',
    a: 'Yes! Creating a candidate profile, browsing jobs, and applying to positions is completely free. Premium features like resume optimization and priority visibility are available as optional upgrades.',
  },
  {
    q: 'How do employers post jobs on the platform?',
    a: 'Employers can register for a free account, verify their company, and post their first job listing within minutes. Our employer dashboard includes applicant tracking, interview scheduling, and analytics.',
  },
  {
    q: 'What types of jobs are available?',
    a: 'We feature roles across software engineering, product management, design, data science, marketing, finance, and more — from entry-level to C-suite positions at startups and Fortune 500 companies worldwide.',
  },
  {
    q: 'How is my personal data protected?',
    a: 'We use SSL encryption, secure password hashing, and strict access controls. Your data is never sold to third parties. Read our full Privacy Policy for complete details on data handling.',
  },
  {
    q: 'Can I apply for remote jobs only?',
    a: 'Absolutely. Use the location filter and set it to "Remote" to see only work-from-home positions. You can also save this preference in your profile for personalized job alerts.',
  },
  {
    q: 'How long does the hiring process typically take?',
    a: 'Most employers on our platform respond within 48 hours. The average time from application to offer is 2-3 weeks, though this varies by role and company.',
  },
  {
    q: 'Do you support international job seekers?',
    a: 'Yes, JobConnect Pro serves candidates and employers globally. We support visa sponsorship listings and have dedicated filters for relocation-friendly positions.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="glass-card rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100/80 dark:border-zinc-800/60"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer hover:bg-violet-50/50 dark:hover:bg-violet-950/10 transition-colors"
          >
            <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white pr-4">
              {faq.q}
            </span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-violet-600 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
