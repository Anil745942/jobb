'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, MapPin, DollarSign, Calendar, ChevronLeft, ArrowRight, ShieldCheck, CheckCircle2, Bookmark, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JobDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user, applyToJob, saveJob, unsaveJob, savedJobs } = useApp();
  
  const [jobId, setJobId] = useState<string>('');
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
  // Application form fields
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Unwrap params using React.use() or standard useEffect
  useEffect(() => {
    params.then(p => {
      setJobId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      } else {
        setError('Job not found or deleted.');
      }
    } catch (err) {
      setError('Connection to server failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500">
        Loading career opportunities details...
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 font-semibold">{error || 'Job not found'}</p>
        <Link href="/jobs" className="mt-4 inline-block text-xs font-bold text-violet-600">
          Return to Job Listings
        </Link>
      </div>
    );
  }

  const isSaved = savedJobs.some(s => s.jobId === job.id);

  const handleSaveToggle = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (isSaved) {
      await unsaveJob(job.id);
    } else {
      await saveJob(job.id);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    setIsSubmitting(true);
    setError('');
    setMessage('');

    try {
      await applyToJob(job.id, coverLetter, resumeUrl);
      setMessage('Application submitted successfully!');
      setTimeout(() => {
        setShowApplyModal(false);
        setCoverLetter('');
        setResumeUrl('');
        setMessage('');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <Link href="/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-violet-600 mb-8 transition-colors">
        <ChevronLeft size={16} /> Back to Search Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Job Body */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-600/10 text-violet-600 font-extrabold text-2xl flex items-center justify-center shrink-0">
                  {job.company?.name ? job.company.name.charAt(0) : 'J'}
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white leading-tight">{job.title}</h1>
                  <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
                    <span className="font-semibold text-violet-600">{job.company?.name || 'Partner Company'}</span> • {job.location}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSaveToggle}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex-grow sm:flex-grow-0 flex justify-center ${
                    isSaved 
                      ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 border-rose-200/50 dark:border-rose-800/20' 
                      : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-400 hover:text-gray-600'
                  }`}
                  title={isSaved ? 'Unsave Job' : 'Save Job'}
                >
                  <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                </button>

                <button
                  onClick={() => {
                    if (!user) router.push('/login');
                    else setShowApplyModal(true);
                  }}
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors flex-grow cursor-pointer text-center"
                >
                  Apply for Job
                </button>
              </div>
            </div>

            {/* Quick specifications grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-zinc-850">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Job Type</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">{job.type}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Salary Range</span>
                <span className="block text-xs font-bold text-emerald-600 mt-1">
                  ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Experience</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">{job.experience} Level</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Date Posted</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Job Description</h2>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Requirements</h2>
                <ul className="space-y-2.5">
                  {job.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      <CheckCircle2 size={16} className="text-violet-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.skills && job.skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Required Technical Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill: string, idx: number) => (
                    <span key={idx} className="text-xs font-semibold bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 px-3 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Sidebar details */}
        <aside className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">About the Company</h2>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center shrink-0">
                {job.company?.name ? job.company.name.charAt(0) : 'C'}
              </div>
              <div>
                <h3 className="font-bold text-xs text-gray-900 dark:text-white">{job.company?.name || 'Verified Company'}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{job.company?.industry || 'Technology'}</p>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
              {job.company?.description || 'This company is a registered enterprise partner recruiting premium tech talent on JobConnect Pro.'}
            </p>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-850 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Headquarters</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{job.company?.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Company Size</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{job.company?.size || '100-250 Employees'}</span>
              </div>
            </div>

            {job.company?.website && (
              <a 
                href={job.company.website} 
                target="_blank" 
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-1.5 w-full bg-gray-100 dark:bg-zinc-850 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                Visit Website <ExternalLink size={14} />
              </a>
            )}
          </div>
        </aside>

      </div>

      {/* 4. APPLY MODAL DRAW */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 rounded-3xl w-full max-w-lg shadow-2xl p-6 sm:p-8 animate-fadeIn">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-extrabold text-base text-gray-900 dark:text-white">Apply for {job.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{job.company?.name}</p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Cover Letter</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain why you are the perfect fit for this job position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs p-3 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600 focus:bg-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Resume / Portfolio Link</label>
                <input
                  type="url"
                  placeholder="e.g. https://myresumes.com/alex-dev.pdf"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600 focus:bg-transparent"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs rounded-lg font-medium">
                  {error}
                </div>
              )}

              {message && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-lg font-medium">
                  {message}
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-805 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-5 py-2.5 bg-gray-100 dark:bg-zinc-850 text-gray-600 dark:text-gray-300 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
