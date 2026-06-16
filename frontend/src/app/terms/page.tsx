import React from 'react';
import { FileText, Users, AlertCircle, CheckCircle, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-100 dark:bg-violet-950/40 mb-4">
            <FileText className="text-violet-600 dark:text-violet-400" size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-violet-600" size={20} />
              Acceptance of Terms
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                By accessing or using JobConnect Pro, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and JobConnect Pro. 
                We reserve the right to modify these terms at any time. Continued use of the service 
                after changes constitutes acceptance of the modified terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Users className="text-violet-600" size={20} />
              Account Responsibilities
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>To use JobConnect Pro, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Be at least 18 years of age</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of unauthorized access</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p>
                You are responsible for maintaining the confidentiality of your account and password 
                and for restricting access to your account. You agree to accept responsibility for 
                all activities that occur under your account.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-violet-600" size={20} />
              User Conduct
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Post false, misleading, or inaccurate information</li>
                <li>Upload resumes or profiles containing false information</li>
                <li>Apply for jobs you are not qualified for</li>
                <li>Harass, abuse, or discriminate against other users</li>
                <li>Use automated tools to scrape or harvest data</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with or disrupt the service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Scale className="text-violet-600" size={20} />
              Job Postings and Applications
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                <strong>For Employers:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Job postings must be accurate and not misleading</li>
                <li>You must have authority to post on behalf of your company</li>
                <li>Job postings must comply with all applicable laws</li>
                <li>We reserve the right to remove any posting at our discretion</li>
              </ul>
              <p>
                <strong>For Job Seekers:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit only accurate and truthful information</li>
                <li>Apply only for positions you are genuinely interested in</li>
                <li>Respond promptly to employer communications</li>
                <li>Respect employer hiring processes and timelines</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                JobConnect Pro and its original content, features, and functionality are owned by 
                JobConnect Pro and are protected by international copyright, trademark, and other 
                intellectual property laws.
              </p>
              <p>
                You retain ownership of your resume, profile information, and other content you submit. 
                By submitting content, you grant us a license to use, display, and distribute it for 
                the purpose of providing our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                Your use of JobConnect Pro is also governed by our Privacy Policy. Please review our 
                Privacy Policy, which also governs our service and describes how we collect, use, and 
                protect your personal data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Disclaimer of Warranties
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                JobConnect Pro is provided on an "as is" and "as available" basis. We make no 
                representations or warranties of any kind, express or implied, regarding the operation 
                of the service or the information, content, materials, or products included on the service.
              </p>
              <p>
                We do not warrant that the service will be uninterrupted, secure, or error-free. 
                We are not responsible for the quality, accuracy, or reliability of job postings or 
                employer information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                To the fullest extent permitted by law, JobConnect Pro shall not be liable for any 
                indirect, incidental, special, consequential, or punitive damages, including without 
                limitation, loss of profits, data, use, or other intangible losses, resulting from your 
                use of the service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Termination
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                We reserve the right to terminate or suspend your account at any time, without prior 
                notice, for conduct that we believe violates these Terms of Service or is harmful to 
                other users, us, or third parties.
              </p>
              <p>
                You may also terminate your account at any time by following the account deletion 
                process in your account settings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws 
                of the jurisdiction in which JobConnect Pro operates, without regard to its conflict 
                of law provisions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="font-semibold text-violet-600 dark:text-violet-400">
                legal@jobconnectpro.com
              </p>
            </div>
          </section>

          <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By using JobConnect Pro, you acknowledge that you have read, understood, and agree to 
              be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
