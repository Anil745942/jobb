'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { User, Award, BrainCircuit, FileText, Calendar, CheckCircle2, ChevronRight, Bookmark, LogOut, ArrowUpRight, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const router = useRouter();
  const { user, token, applications, savedJobs, interviews, getCareerSuggestions, analyzeResume } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'saved' | 'interviews' | 'ai'>('profile');
  
  // AI Career Suggestions
  const [careerData, setCareerData] = useState<any>(null);
  
  // AI Resume Analyzer
  const [resumeText, setResumeText] = useState('');
  const [analyzerResult, setAnalyzerResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchCareerData();
    }
  }, [token]);

  const fetchCareerData = async () => {
    const data = await getCareerSuggestions();
    if (data) setCareerData(data);
  };

  const handleResumeAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText) return;
    setAnalyzing(true);
    try {
      const res = await analyzeResume(resumeText);
      setAnalyzerResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      
      {/* Side Menu Navigation */}
      <aside className="w-full md:w-1/4 shrink-0">
        <div className="glass-card p-6 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
          <div className="text-center pb-6 border-b border-gray-150 dark:border-zinc-850">
            <img 
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'} 
              alt="Avatar" 
              className="w-16 h-16 rounded-2xl mx-auto object-cover ring-4 ring-violet-500/10"
            />
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-white mt-4">{user.firstName} {user.lastName}</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">{user.email}</p>
          </div>

          <nav className="flex flex-col gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'profile' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <User size={15} /> My Profile
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'applications' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <Award size={15} /> Applied Positions ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'saved' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <Bookmark size={15} /> Bookmarked Jobs ({savedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'interviews' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <Calendar size={15} /> Interviews Scheduled ({interviews.length})
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-pointer text-left ${
                activeTab === 'ai' 
                  ? 'bg-violet-600 text-white' 
                  : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-850 hover:text-gray-700'
              }`}
            >
              <BrainCircuit size={15} /> AI Assistant Hub
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="w-full md:w-3/4">
        
        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Profile Overview</h2>
              <p className="text-xs text-gray-400 mt-0.5">Manage your candidate status and skillsets</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-zinc-850">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Position Role</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">Full Stack Developer</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Total Experience</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">3 Years</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Education</span>
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">B.S. in Computer Science</span>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Express', 'JavaScript', 'PostgreSQL', 'Tailwind CSS'].map((skill) => (
                  <span key={skill} className="text-xs font-semibold bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 px-3 py-1.5 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Active Applications</h2>
              <p className="text-xs text-gray-400 mt-0.5">Track your submitted job applications</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-850">
              {applications.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">No applications submitted yet.</div>
              ) : (
                applications.map((app) => (
                  <div key={app.id} className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white">{app.job?.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{app.job?.company?.name} • {new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                        app.status === 'SHORTLISTED' ? 'bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400' :
                        app.status === 'ACCEPTED' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' :
                        app.status === 'REJECTED' ? 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400' :
                        'bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED JOBS */}
        {activeTab === 'saved' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Saved Job Listings</h2>
              <p className="text-xs text-gray-400 mt-0.5">Quickly access jobs you have saved</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-850">
              {savedJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">No saved jobs yet.</div>
              ) : (
                savedJobs.map((item) => (
                  <div key={item.id} className="p-4 bg-gray-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-850 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white hover:text-violet-650 transition-colors">
                        <Link href={`/jobs/${item.job?.id}`}>{item.job?.title}</Link>
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.job?.company?.name} • {item.job?.location}</p>
                    </div>
                    <Link href={`/jobs/${item.job?.id}`} className="p-2 bg-white dark:bg-zinc-900 hover:bg-gray-100 border border-gray-150 dark:border-zinc-800 rounded-lg text-gray-500 transition-colors">
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: INTERVIEWS */}
        {activeTab === 'interviews' && (
          <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
            <div>
              <h2 className="text-base font-extrabold text-gray-900 dark:text-white">Interviews Scheduled</h2>
              <p className="text-xs text-gray-400 mt-0.5">Meet with recruiter teams and hiring panel partners</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-850">
              {interviews.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">No scheduled interviews yet.</div>
              ) : (
                interviews.map((meet) => (
                  <div key={meet.id} className="p-5 bg-gray-50 dark:bg-zinc-950 border border-gray-150 dark:border-zinc-850 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">{meet.application?.job?.title}</h4>
                        <p className="text-[10px] text-gray-400 mt-0.5">{meet.application?.job?.company?.name}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-[9px] font-bold rounded uppercase">
                        {meet.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1 pt-2 border-t border-gray-100 dark:border-zinc-900">
                      <p className="text-gray-500">Date/Time: <span className="font-bold text-gray-800 dark:text-gray-200">{new Date(meet.scheduledTime).toLocaleString()}</span></p>
                      <p className="text-gray-500">Duration: <span className="font-bold text-gray-800 dark:text-gray-200">{meet.duration} minutes</span></p>
                      {meet.meetUrl && (
                        <p className="text-gray-500">Meeting URL:{' '}
                          <a href={meet.meetUrl} target="_blank" rel="noreferrer" className="text-violet-650 font-bold hover:underline">
                            Join Meeting <ArrowUpRight className="inline" size={12} />
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: AI SERVICES */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            
            {/* AI Career Advice */}
            <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-4">
              <h2 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Cpu size={16} className="text-violet-600" /> Career Growth Suggestions
              </h2>
              {careerData ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {careerData.suggestions.map((s: string, idx: number) => (
                      <p key={idx} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">• {s}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-zinc-850 text-xs">
                    <div>
                      <span className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">AI Recommended Roles</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {careerData.targetRoles.map((role: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 rounded-md font-medium text-[10px]">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="font-bold text-gray-400 uppercase text-[9px] tracking-wider">Recommended Upskills</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {careerData.learningPaths.map((path: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 dark:text-cyan-400 rounded-md font-medium text-[10px]">
                            {path}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400">Loading AI insights...</p>
              )}
            </div>

            {/* AI Resume Analyzer */}
            <div className="glass-card p-8 rounded-3xl border border-gray-100 dark:border-zinc-800/80 space-y-6">
              <div>
                <h2 className="text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">AI Resume Optimizer</h2>
                <p className="text-xs text-gray-400 mt-0.5">Paste your resume draft below to get immediate ATS score analysis</p>
              </div>

              <form onSubmit={handleResumeAnalysis} className="space-y-4">
                <textarea
                  rows={6}
                  required
                  placeholder="Paste resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs p-4 rounded-2xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600 focus:bg-transparent"
                ></textarea>

                <button
                  type="submit"
                  disabled={analyzing}
                  className="w-full sm:w-auto px-6 py-3 bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50"
                >
                  {analyzing ? 'Analyzing Resume...' : 'Analyze ATS Compatibility'}
                </button>
              </form>

              {/* Display analysis feedback */}
              {analyzerResult && (
                <div className="p-6 bg-violet-50/30 dark:bg-violet-950/10 border border-violet-100/50 dark:border-violet-900/10 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-violet-200/20 pb-3">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">ATS Optimization Score</span>
                    <span className="text-lg font-black text-violet-600">{analyzerResult.score}%</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h4 className="font-bold text-gray-400 text-[10px] uppercase">Detected Tech Skills</h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {analyzerResult.detectedSkills.map((s: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-white dark:bg-zinc-850 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-zinc-800 rounded text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-400 text-[10px] uppercase">Critical Enhancements Required</h4>
                      <ul className="space-y-1.5 mt-2">
                        {analyzerResult.improvements.map((imp: string, idx: number) => (
                          <li key={idx} className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">• {imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
