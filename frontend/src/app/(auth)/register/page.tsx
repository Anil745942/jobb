'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { Briefcase, ArrowRight, User, Users, Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Register() {
  const { register } = useApp();
  const router = useRouter();

  const [role, setRole] = useState<'CANDIDATE' | 'EMPLOYER'>('CANDIDATE');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await register({
        email,
        password,
        role,
        firstName,
        lastName,
        companyName: role === 'EMPLOYER' ? companyName : undefined
      });
      // Direct user to role dashboard
      if (data.user.role === 'CANDIDATE') {
        router.push('/dashboard/candidate');
      } else {
        router.push('/dashboard/employer');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-gray-150 dark:border-zinc-800/80 shadow-xl space-y-6">
        
        <div className="text-center">
          <div className="mx-auto bg-gradient-to-tr from-violet-600 to-cyan-500 w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-lg">
            <Briefcase size={22} className="stroke-[2.5]" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mt-4">Create Account</h2>
          <p className="text-xs text-gray-400 mt-1">Get started with JobConnect Pro today</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs rounded-xl font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Role Select Buttons */}
        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 dark:bg-zinc-950 rounded-xl">
          <button
            type="button"
            onClick={() => setRole('CANDIDATE')}
            className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              role === 'CANDIDATE' 
                ? 'bg-white dark:bg-zinc-900 text-violet-600 dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <User size={14} /> Candidate
          </button>
          <button
            type="button"
            onClick={() => setRole('EMPLOYER')}
            className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
              role === 'EMPLOYER' 
                ? 'bg-white dark:bg-zinc-900 text-violet-600 dark:text-white shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users size={14} /> Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">First Name</label>
              <input 
                type="text" 
                required
                placeholder="Alex"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Developer"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
              />
            </div>
          </div>

          {role === 'EMPLOYER' && (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Company Name</label>
              <input 
                type="text" 
                required
                placeholder="TechCorp Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
            <div className="flex items-center bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-violet-600">
              <Mail className="text-gray-400 mr-2 shrink-0" size={16} />
              <input 
                type="email" 
                required
                placeholder="alex@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
            <div className="flex items-center bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-violet-600">
              <Lock className="text-gray-400 mr-2 shrink-0" size={16} />
              <input 
                type="password" 
                required
                placeholder="Min 6 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 border-t border-gray-100 dark:border-zinc-850 pt-4">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-violet-600 hover:text-violet-750">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
