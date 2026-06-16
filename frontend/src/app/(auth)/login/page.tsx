'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import { Briefcase, ArrowRight, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  const { login } = useApp();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      // Role based redirects
      if (data.user.role === 'CANDIDATE') {
        router.push('/dashboard/candidate');
      } else if (data.user.role === 'EMPLOYER') {
        router.push('/dashboard/employer');
      } else if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Incorrect credentials. Please try again.');
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
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mt-4">Welcome Back</h2>
          <p className="text-xs text-gray-400 mt-1">Access your JobConnect Pro account dashboard</p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs rounded-xl font-medium">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent border-0 outline-none text-xs w-full text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
              <input type="checkbox" className="accent-violet-600 rounded" />
              <span>Remember me</span>
            </label>
            <Link href="/" className="font-semibold text-violet-600 hover:text-violet-750">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 border-t border-gray-100 dark:border-zinc-850 pt-4">
          Don't have an account?{' '}
          <Link href="/register" className="font-bold text-violet-600 hover:text-violet-750">
            Create account
          </Link>
        </div>

        {/* Test logins help box */}
        <div className="bg-violet-50/50 dark:bg-violet-950/20 border border-violet-200/20 p-3 rounded-xl text-[11px] text-violet-700 dark:text-violet-400 space-y-1">
          <p className="font-bold">Test Credentials:</p>
          <p>• Candidate: <span className="font-mono">candidate@jobconnect.com</span> / password: <span className="font-mono">candidate123</span></p>
          <p>• Employer: <span className="font-mono">employer@jobconnect.com</span> / password: <span className="font-mono">employer123</span></p>
          <p>• Admin: <span className="font-mono">admin@jobconnect.com</span> / password: <span className="font-mono">admin123</span></p>
        </div>

      </div>
    </div>
  );
}
