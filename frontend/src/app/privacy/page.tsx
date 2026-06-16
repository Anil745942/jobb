import React from 'react';
import { Shield, Eye, Lock, Database, Globe, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/40 mb-4">
            <Shield className="text-violet-600 dark:text-violet-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="text-violet-600" size={20} />
              Information We Collect
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                JobConnect Pro collects information you provide directly, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information (name, email address, phone number)</li>
                <li>Professional information (resume, CV, work history, skills)</li>
                <li>Account credentials (username, password)</li>
                <li>Job search preferences and application history</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Database className="text-violet-600" size={20} />
              How We Use Your Information
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our job matching services</li>
                <li>Connect you with potential employers</li>
                <li>Send you job alerts and relevant opportunities</li>
                <li>Process and manage your job applications</li>
                <li>Communicate with you about our services</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="text-violet-600" size={20} />
              Data Security
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for all data transmissions</li>
                <li>Secure password hashing and storage</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication systems</li>
                <li>Secure data centers with 24/7 monitoring</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="text-violet-600" size={20} />
              Third-Party Services
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Employers when you apply for jobs</li>
                <li>Service providers who assist our operations</li>
                <li>Analytics providers (in anonymized form)</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p>
                We never sell your personal information to third parties for marketing purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="text-violet-600" size={20} />
              Cookies, Tracking & Advertising
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and login status</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Personalize content and job recommendations</li>
                <li>Improve our services and user experience</li>
                <li>Serve relevant advertisements through Google AdSense</li>
              </ul>
              <p>
                <strong className="text-gray-800 dark:text-gray-200">Google AdSense:</strong> We use Google AdSense to
                display advertisements on our website. Google and its partners may use cookies to serve ads based on
                your prior visits to our website or other websites. You may opt out of personalized advertising by
                visiting{' '}
                <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                  Google Ads Settings
                </a>.
                For more information, see Google&apos;s{' '}
                <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                  Advertising Policy
                </a>.
              </p>
              <p>
                You can manage cookie preferences through your browser settings or our cookie consent banner.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
                <li>Object to processing of your data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="font-semibold text-violet-600 dark:text-violet-400">
                privacy@jobconnectpro.com
              </p>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This Privacy Policy is part of our commitment to transparency and user privacy. 
              We may update this policy from time to time. Continued use of our services constitutes 
              acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
