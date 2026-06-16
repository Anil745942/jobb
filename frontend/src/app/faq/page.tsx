import React from 'react';
import Link from 'next/link';
import FAQ from '@/components/FAQ';
import ScrollReveal from '@/components/ScrollReveal';
import { HelpCircle, Mail } from 'lucide-react';

export const metadata = {
  title: 'FAQ - JobConnect Pro | Frequently Asked Questions',
  description: 'Find answers to common questions about JobConnect Pro job matching, applications, employer services, privacy, and account management.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/40 mb-4">
            <HelpCircle className="text-violet-600" size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 max-w-lg mx-auto leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Our support team is available 7 days a week.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <FAQ />
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-12 glass-card p-6 sm:p-8 rounded-2xl text-center">
          <Mail className="mx-auto text-violet-600 mb-3" size={28} />
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">Still have questions?</h2>
          <p className="text-sm text-gray-500 mt-2">Our team typically responds within 12 hours.</p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm rounded-xl transition-colors"
          >
            Contact Support
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
