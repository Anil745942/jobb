'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { Briefcase, Users, FileSpreadsheet, PlusCircle, CheckCircle, Clock, Calendar, RefreshCw, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

export default function EmployerDashboard() {
  const router = useRouter();
  const { user, token, jobs, fetchJobs, applications, scheduleInterview, updateApplicationStatus } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'post-job' | 'manage-jobs' | 'applicants'>('analytics');
  
  // Job Form fields
  const [jobTitle, setJobTitle] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobCategory, setJobCategory] = useState('Software Engineering');
  const [jobLocation, setJobLocation] = useState('San Francisco, CA');
  const [jobType, setJobType] = useState('Full-time');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [experience, setExperience] = useState('Mid');
  const [requirementsText, setRequirementsText] = useState('');
  const [skillsText, setSkillsText] = useState('');

  // Interview scheduler state
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [scheduledTime, setScheduledTime] = useState('');
  const [meetUrl, setMeetUrl] = useState('');
  const [notes, setNotes] = useState('');

  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');
  const [submittingJob, setSubmittingJob] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  if (!user) return null;

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingJob(true);
    setActionMessage('');
    setActionError('');

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: jobTitle,
          description: jobDesc,
          category: jobCategory,
          location: jobLocation,
          type: jobType,
          salaryMin,
          salaryMax,
          experience,
          requirements: requirementsText.split('\n').filter(r => r.trim() !== ''),
          skills: skillsText.split(',').map(s => s.trim()).filter(s => s !== '')
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to publish job posting');

      setActionMessage('Job published successfully!');
      // Clear form
      setJobTitle('');
      setJobDesc('');
      setRequirementsText('');
      setSkillsText('');
      // Sync list
      fetchJobs();
      
      setTimeout(() => setActionMessage(''), 2000);
    } catch (err: any) {
      setActionError(err.message || 'Server error publishing job');
    } finally {
      setSubmittingJob(false);
    }
  };

  const handleStatusChange = async (appId: string, status: string) => {
    try {
      await updateApplicationStatus(appId, status);
      setActionMessage('Applicant pipeline updated successfully!');
      setTimeout(() => setActionMessage(''), 2000);
    } catch (err) {
      setActionError('Failed to change status.');
    }
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;

    try {
      await scheduleInterview({
        applicationId: selectedAppId,
        scheduledTime,
        duration: 45,
        meetUrl,
        notes
      });
      setActionMessage('Interview scheduled successfully!');
      setSelectedAppId(null);
      setScheduledTime('');
      setMeetUrl('');
      setNotes('');
      setTimeout(() => setActionMessage(''), 2000);
    } catch (err: any) {
      setActionError(err.message || 'Failed to schedule');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-1/4 shrink-0">
        <div className="glass-card p-6 rounded-3xl border border-gray-150 dark:border-zinc-800/80 space-y-6">
          <div className="text-center pb-6 border-b border-gray-100 dark:border-zinc-850">
            <img 
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'} 
              alt="Avatar" 
              className="w-16 h-16 rounded-2xl mx-auto object-cover ring-4 ring-violet-500/10"
            />
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mt-4">{user.firstName} {user.lastName}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold rounded uppercase tracking-wider">
              Recruiter / Employer
            </span>
          </div>

          <nav className="flex flex-col gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'analytics' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <FileSpreadsheet size={15} /> Dashboard Overview
            </button>
            <button
              onClick={() => setActiveTab('post-job')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'post-job' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <PlusCircle size={15} /> Post New Job
            </button>
            <button
              onClick={() => setActiveTab('manage-jobs')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'manage-jobs' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <Briefcase size={15} /> Manage Jobs
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'applicants' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <Users size={15} /> Candidates Pipeline ({applications.length})
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="w-full md:w-3/4 space-y-6">
        
        {actionMessage && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-medium">
            {actionMessage}
          </div>
        )}

        {actionError && (
          <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 text-xs rounded-xl font-medium">
            {actionError}
          </div>
        )}

        {/* TAB 1: ANALYTICS OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Applicants</span>
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{applications.length}</span>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Published Jobs</span>
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{jobs.length}</span>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-gray-400">Average Salary Match</span>
                <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">84%</span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl border border-gray-150 dark:border-zinc-800">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Latest Candidate Submissions</h2>
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex justify-between items-center text-xs p-3 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 rounded-lg">
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200">{app.job?.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Status: {app.status}</p>
                    </div>
                    <button onClick={() => setActiveTab('applicants')} className="text-violet-650 hover:underline">Manage</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: POST JOB */}
        {activeTab === 'post-job' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-150 dark:border-zinc-800 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Publish a Career Opportunity</h2>
              <p className="text-xs text-gray-400 mt-0.5">Reach thousands of qualified tech professionals instantly</p>
            </div>

            <form onSubmit={handlePostJob} className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-850">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Job Title</label>
                  <input 
                    type="text" required placeholder="e.g. Senior Frontend Engineer" 
                    value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
                  <select 
                    value={jobCategory} onChange={(e) => setJobCategory(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                  >
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Design & Creative">Design & Creative</option>
                    <option value="Data & AI">Data & AI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Description</label>
                <textarea 
                  rows={4} required placeholder="Detail the day-to-day operations and goals for this position..."
                  value={jobDesc} onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs p-3 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Job Location</label>
                  <input 
                    type="text" required placeholder="San Francisco, CA or Remote" 
                    value={jobLocation} onChange={(e) => setJobLocation(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Job Type</label>
                  <select 
                    value={jobType} onChange={(e) => setJobType(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Experience level</label>
                  <select 
                    value={experience} onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                  >
                    <option value="Entry">Entry Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                    <option value="Lead">Lead Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Salary Min (USD/year)</label>
                  <input 
                    type="number" required placeholder="80000" 
                    value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Salary Max (USD/year)</label>
                  <input 
                    type="number" required placeholder="120000" 
                    value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Key Requirements (one per line)</label>
                  <textarea 
                    rows={3} placeholder="5+ years UI experience&#10;Next.js App router expertise"
                    value={requirementsText} onChange={(e) => setRequirementsText(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs p-3 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Technical Skills (comma separated)</label>
                  <textarea 
                    rows={3} placeholder="React, Next.js, Tailwind, JavaScript"
                    value={skillsText} onChange={(e) => setSkillsText(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs p-3 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-650"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingJob}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-650 hover:from-violet-750 hover:to-indigo-750 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-all disabled:opacity-50"
              >
                {submittingJob ? 'Publishing...' : 'Publish Job Posting'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MANAGE JOBS */}
        {activeTab === 'manage-jobs' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-150 dark:border-zinc-800 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Active Postings</h2>
              <p className="text-xs text-gray-400 mt-0.5">Close or modify your active listings</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-850">
              {jobs.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">No active postings yet.</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 rounded-2xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white">{job.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{job.location} • {job.type}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold rounded">
                      {job.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CANDIDATE PIPELINE */}
        {activeTab === 'applicants' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-150 dark:border-zinc-800 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Candidate Pipeline</h2>
              <p className="text-xs text-gray-400 mt-0.5">Manage job applications and schedule panel sessions</p>
            </div>

            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-zinc-850">
              {applications.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">No candidate applications submitted.</div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-6 bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 rounded-2xl space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">{app.job?.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-[11px] font-semibold text-gray-700 dark:text-gray-200 px-2 py-1 rounded"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWING">Reviewing</option>
                          <option value="SHORTLISTED">Shortlisted</option>
                          <option value="ACCEPTED">Accepted</option>
                          <option value="REJECTED">Rejected</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-4 rounded-xl space-y-2">
                      <p className="font-bold text-[10px] text-gray-400 uppercase">Cover Letter</p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs italic leading-relaxed">"{app.coverLetter}"</p>
                      {app.resumeUrl && (
                        <p className="text-[11px] text-gray-400 mt-2">
                          Resume URL:{' '}
                          <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-violet-650 hover:underline inline-flex items-center gap-0.5">
                            View PDF
                          </a>
                        </p>
                      )}
                    </div>

                    {/* Schedule Button */}
                    <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-zinc-900">
                      <button
                        onClick={() => setSelectedAppId(selectedAppId === app.id ? null : app.id)}
                        className="px-4 py-2 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-[11px] font-bold rounded-xl hover:bg-violet-200 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Calendar size={13} /> {selectedAppId === app.id ? 'Close Scheduler' : 'Schedule Interview'}
                      </button>
                    </div>

                    {/* Collapsible Schedule Form */}
                    {selectedAppId === app.id && (
                      <form onSubmit={handleScheduleSubmit} className="space-y-3 p-4 bg-violet-50/20 dark:bg-violet-950/10 border border-violet-100/20 rounded-xl">
                        <h5 className="font-extrabold text-xs text-gray-800 dark:text-gray-200">Schedule Recruiter Interview</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] text-gray-400 uppercase mb-1">Time/Date</label>
                            <input 
                              type="datetime-local" required
                              value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)}
                              className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs px-2.5 py-2 rounded-lg outline-none text-gray-700 dark:text-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-400 uppercase mb-1">Video Meet Link</label>
                            <input 
                              type="url" required placeholder="https://meet.google.com/abc-xyz"
                              value={meetUrl} onChange={(e) => setMeetUrl(e.target.value)}
                              className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs px-2.5 py-2 rounded-lg outline-none text-gray-700 dark:text-gray-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] text-gray-400 uppercase mb-1">Recruiter Notes</label>
                          <input 
                            type="text" placeholder="e.g. Technical Round 1 - React architecture"
                            value={notes} onChange={(e) => setNotes(e.target.value)}
                            className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs px-2.5 py-2 rounded-lg outline-none text-gray-700 dark:text-gray-300"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs py-2 rounded-lg cursor-pointer"
                        >
                          Confirm & Send Invites
                        </button>
                      </form>
                    )}

                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
