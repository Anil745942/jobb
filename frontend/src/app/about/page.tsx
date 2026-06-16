import React from 'react';
import { ShieldCheck, Target, Heart, Users, Globe, Award, Zap, Mail, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
            We Map elite tech talents into <span className="gradient-text font-black">Modern Industries</span>
          </h1>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Founded in 2026, JobConnect Pro was built by engineers for engineers. We believe candidate recruitment should be transparent, precise, and fast.
          </p>
        </div>

        {/* Our Story */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
            <p>
              JobConnect Pro was born from a simple frustration: traditional job boards were inefficient, 
              and recruitment agencies often lacked technical understanding. Our founders, having experienced 
              this firsthand as both candidates and hiring managers, set out to build something better.
            </p>
            <p>
              Today, we've grown into a premier platform connecting top-tier tech talent with innovative 
              companies worldwide. Our AI-powered matching system ensures that every connection made on 
              our platform has the highest potential for success.
            </p>
            <p>
              We're not just a job board – we're a career accelerator. Our mission is to help professionals 
              find roles where they can thrive, and help companies build teams that drive innovation.
            </p>
          </div>
        </section>

        {/* Core Values grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80">
              <div className="bg-violet-600/10 p-3 rounded-xl text-violet-600 w-fit">
                <Target size={20} />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mt-4">Precision Matching</h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Our proprietary resume-matching algorithm parses code skill descriptions to score direct matches with absolute alignment.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80">
              <div className="bg-cyan-550/10 p-3 rounded-xl text-cyan-600 w-fit">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mt-4">Verified Companies Only</h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                We vet corporate financials and workspace reviews. Candidates can apply with absolute peace of mind.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80">
              <div className="bg-rose-500/10 p-3 rounded-xl text-rose-500 w-fit">
                <Heart size={20} />
              </div>
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mt-4">Candidate Respect</h3>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Automatic status tracking and fast feedback loops ensure candidates are never left hanging in recruitment pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">12,500+</div>
              <div className="text-xs text-violet-100 mt-2">Active Job Postings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">820+</div>
              <div className="text-xs text-violet-100 mt-2">Verified Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">45,000+</div>
              <div className="text-xs text-violet-100 mt-2">Placed Candidates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">98.2%</div>
              <div className="text-xs text-violet-100 mt-2">Match Accuracy</div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Team</h2>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-4 leading-relaxed">
            <p>
              Our team consists of experienced engineers, data scientists, and recruitment specialists 
              who understand the tech industry from the inside out. We've worked at companies ranging 
              from early-stage startups to Fortune 500 enterprises.
            </p>
            <p>
              We're passionate about using technology to solve real-world problems. Every feature we 
              build is designed with one goal: making the hiring process better for everyone involved.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-violet-100 dark:bg-violet-950/40 p-3 rounded-xl text-violet-600">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Email</h3>
                <p className="text-xs text-gray-500 mt-1">contact@jobconnectpro.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-cyan-100 dark:bg-cyan-950/40 p-3 rounded-xl text-cyan-600">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Location</h3>
                <p className="text-xs text-gray-500 mt-1">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
