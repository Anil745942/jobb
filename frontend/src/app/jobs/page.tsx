'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, DollarSign, Filter, Briefcase, RefreshCw, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function JobListingsContent() {
  const { jobs, fetchJobs, loading } = useApp();
  const searchParams = useSearchParams();

  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [type, setType] = useState('');
  const [experience, setExperience] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Trigger search on mount and when filters change
  useEffect(() => {
    handleSearch();
  }, [category, type, experience, salaryMin, sortBy]);

  const handleSearch = () => {
    fetchJobs({
      search,
      location,
      category,
      type,
      experience,
      salaryMin
    });
  };

  const clearFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('');
    setType('');
    setExperience('');
    setSalaryMin('');
    fetchJobs({});
  };

  // Sort and filter in-memory if needed
  let displayedJobs = [...jobs];
  if (sortBy === 'newest') {
    displayedJobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sortBy === 'salary-high') {
    displayedJobs.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Header with search fields */}
      <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-xl px-4 py-3">
            <Search className="text-gray-400 shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="Search by keywords, skills..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-gray-150 dark:border-zinc-800 rounded-xl px-4 py-3">
            <MapPin className="text-gray-400 shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="City, state, or remote..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2">
            <button 
              onClick={handleSearch}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              Apply Search
            </button>
            <button 
              onClick={clearFilters}
              className="p-3 bg-gray-100 dark:bg-zinc-850 hover:bg-gray-200 text-gray-500 dark:text-gray-300 rounded-xl transition-colors cursor-pointer"
              title="Clear all filters"
            >
              <X size={16} />
            </button>
          </div>

        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 2. Sidebar Filters */}
        <aside className="w-full lg:w-1/4 shrink-0 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80">
            <div className="flex items-center justify-between pb-4 border-b border-gray-150 dark:border-zinc-850">
              <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Filter size={16} className="text-violet-600" /> Filters
              </span>
              <button onClick={clearFilters} className="text-[11px] text-gray-400 hover:text-violet-600 font-medium transition-colors">
                Reset All
              </button>
            </div>

            {/* Category selection */}
            <div className="py-4 border-b border-gray-150 dark:border-zinc-850">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-lg outline-none text-gray-700 dark:text-gray-300"
              >
                <option value="">All Categories</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Marketing & Sales">Marketing & Sales</option>
              </select>
            </div>

            {/* Job Type selector */}
            <div className="py-4 border-b border-gray-150 dark:border-zinc-850">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Job Type</label>
              <div className="space-y-2.5">
                {['Full-time', 'Part-time', 'Contract', 'Remote'].map((t) => (
                  <label key={t} className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="jobType" 
                      checked={type === t}
                      onChange={() => setType(t)}
                      className="accent-violet-600 w-4 h-4" 
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Experience Levels */}
            <div className="py-4 border-b border-gray-150 dark:border-zinc-850">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Experience Level</label>
              <div className="space-y-2.5">
                {['Entry', 'Mid', 'Senior', 'Lead'].map((exp) => (
                  <label key={exp} className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="experience"
                      checked={experience === exp}
                      onChange={() => setExperience(exp)}
                      className="accent-violet-600 w-4 h-4" 
                    />
                    <span>{exp} Level</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Minimum Salary Range */}
            <div className="py-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Minimum Salary (USD)</label>
              <div className="flex items-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-3 py-2">
                <DollarSign size={14} className="text-gray-400" />
                <input 
                  type="number" 
                  placeholder="e.g. 80000" 
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:ring-0"
                />
              </div>
            </div>

          </div>
        </aside>

        {/* 3. Job Results Content */}
        <main className="w-full lg:w-3/4 space-y-6">
          
          {/* Sorting and result metrics bar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-gray-50/50 dark:bg-zinc-900/30 p-4 rounded-xl">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Showing <span className="text-violet-600 font-bold">{displayedJobs.length}</span> positions match your criteria
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs font-semibold text-violet-600 cursor-pointer"
              >
                <option value="newest">Newest Added</option>
                <option value="salary-high">Highest Salary</option>
              </select>
            </div>
          </div>

          {/* Job Lists Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3 text-xs">
              <RefreshCw className="animate-spin text-violet-600" size={24} />
              <span>Fetching matching careers...</span>
            </div>
          ) : displayedJobs.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-2xl border border-gray-100 dark:border-zinc-800">
              <Briefcase className="mx-auto text-gray-300 dark:text-zinc-700 mb-4" size={42} />
              <h3 className="font-bold text-gray-800 dark:text-gray-200">No Job Listings Found</h3>
              <p className="text-xs text-gray-500 mt-2 max-w-sm mx-auto">Try broadening your search term, resetting filter settings, or looking for remote roles.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedJobs.map((job) => (
                <div key={job.id} className="glass-card hover-lift p-6 rounded-2xl border border-gray-100 dark:border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-600/10 text-violet-600 flex items-center justify-center font-bold text-lg shrink-0">
                      {job.company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 dark:text-white hover:text-violet-600 transition-colors">
                        <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{job.company.name} • {job.location}</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-[10px] font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                          {job.type}
                        </span>
                        <span className="text-[10px] font-medium bg-violet-50 dark:bg-violet-950/20 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded">
                          {job.experience} Level
                        </span>
                        {job.salaryMin && (
                          <span className="text-[10px] font-medium bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                            ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t md:border-t-0 md:border-l border-gray-100 dark:border-zinc-800/80 pt-4 md:pt-0 md:pl-6 flex items-center justify-between md:justify-start gap-4 shrink-0">
                    <Link 
                      href={`/jobs/${job.id}`} 
                      className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      View Details <ChevronRight size={14} />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default function JobListings() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500">
        <RefreshCw className="animate-spin text-violet-600 mx-auto mb-3" size={24} />
        Loading listings search panel...
      </div>
    }>
      <JobListingsContent />
    </Suspense>
  );
}
