import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Disclaimer - JobConnect Pro',
  description: 'Important disclaimers regarding job listings, salary information, and third-party content on JobConnect Pro.',
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 mb-4">
            <AlertTriangle className="text-amber-600" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-gray-500">Last Updated: June 15, 2026</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12 space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">General Information</h2>
            <p>
              The information provided on JobConnect Pro (jobconnectpro.com) is for general informational purposes only.
              While we strive to keep job listings accurate and up-to-date, we make no representations or warranties
              of any kind, express or implied, about the completeness, accuracy, reliability, or availability of
              any job posting, salary range, or company information on the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Listings</h2>
            <p>
              Job listings on JobConnect Pro are posted by third-party employers. We verify employer accounts but
              cannot guarantee the accuracy of every job description, salary figure, or benefit claim. Candidates
              should independently verify all details before applying or accepting any offer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Salary & Compensation Data</h2>
            <p>
              Salary ranges displayed on job listings are estimates provided by employers and may not reflect
              actual compensation offered. Market salary data and career guides on our blog are based on industry
              research and should be used as reference points only, not as guarantees of earnings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Third-Party Links & Advertisements</h2>
            <p>
              Our website may contain links to third-party websites and display advertisements served by Google
              AdSense and other ad networks. We have no control over the content, privacy policies, or practices
              of these third-party sites and are not responsible for them. Clicking on external links is at your
              own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Career Advice & Blog Content</h2>
            <p>
              Articles, guides, and career advice published on our blog represent the opinions of the authors and
              do not constitute professional career counseling, legal, or financial advice. Always consult qualified
              professionals for specific guidance related to your career decisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p>
              JobConnect Pro shall not be liable for any loss or damage arising from the use of our platform,
              including but not limited to: unsuccessful job applications, inaccurate job listings, data breaches
              at third-party employers, or decisions made based on information found on our site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
            <p>
              For questions about this disclaimer, contact us at{' '}
              <Link href="/contact" className="text-violet-600 hover:underline">our contact page</Link> or
              email legal@jobconnectpro.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
