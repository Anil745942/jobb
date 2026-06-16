'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Users, Briefcase, FileSpreadsheet, Lock, Unlock, CheckCircle, RefreshCw, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token } = useApp();

  const [stats, setStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    // Double check user role is ADMIN
    if (user && user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    fetchAdminData();
  }, [token, user]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Stats
      const statsRes = await fetch('http://localhost:5000/api/admin/stats', { headers });
      if (statsRes.ok) setStats(await statsRes.json());

      // Users List
      const usersRes = await fetch('http://localhost:5000/api/admin/users', { headers });
      if (usersRes.ok) setUsersList(await usersRes.json());
      
    } catch (err) {
      setActionError('Failed to establish server connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (userId: string, currentBanStatus: boolean) => {
    setActionMessage('');
    setActionError('');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isBanned: !currentBanStatus })
      });

      if (!res.ok) throw new Error('Banning operation failed');

      setActionMessage('User status successfully adjusted.');
      fetchAdminData();
      setTimeout(() => setActionMessage(''), 2000);
    } catch (err) {
      setActionError('Failed to adjust user status.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-xs text-gray-500">
        <RefreshCw className="animate-spin text-violet-650 mx-auto mb-3" size={24} />
        Loading administrative controls panel...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center gap-2">
        <div className="bg-rose-500/10 p-2.5 rounded-xl text-rose-500">
          <ShieldAlert size={22} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">Admin Control Center</h1>
          <p className="text-xs text-gray-400 mt-0.5">Manage users, listings, and platform metrics</p>
        </div>
      </div>

      {actionMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-medium">
          {actionMessage}
        </div>
      )}

      {actionError && (
        <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-655 dark:text-red-400 text-xs rounded-xl font-medium">
          {actionError}
        </div>
      )}

      {/* 1. Metric Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Total Platform Users</span>
            <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{stats.totalUsers}</span>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Candidates Count</span>
            <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{stats.candidatesCount}</span>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Published Jobs</span>
            <span className="block text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{stats.totalJobs}</span>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-gray-150 dark:border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-gray-400">Platform Revenue</span>
            <span className="block text-2xl font-extrabold text-emerald-600 mt-1">${stats.revenueStats?.totalRevenue || 0}</span>
          </div>
        </div>
      )}

      {/* 2. User Administration table */}
      <div className="glass-card p-6 rounded-3xl border border-gray-150 dark:border-zinc-800 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">User Administration Directory</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-850 text-gray-400 font-bold">
                <th className="pb-3">User Details</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Account Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((usr) => (
                <tr key={usr.id} className="border-b border-gray-50 dark:border-zinc-900/50 hover:bg-gray-50/50 dark:hover:bg-zinc-850/10">
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-200">
                        {usr.firstName ? usr.firstName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{usr.firstName} {usr.lastName}</p>
                        <p className="text-[10px] text-gray-400">{usr.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-gray-600 dark:text-gray-400">{usr.role}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      usr.isBanned 
                        ? 'bg-rose-100 text-rose-600' 
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>
                      {usr.isBanned ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleBanToggle(usr.id, usr.isBanned)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-colors inline-flex items-center gap-1 ${
                        usr.isBanned 
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600' 
                          : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600'
                      }`}
                    >
                      {usr.isBanned ? <Unlock size={11} /> : <Lock size={11} />}
                      {usr.isBanned ? 'Reinstate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
