'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

interface AppContextProps {
  user: any;
  token: string | null;
  theme: 'light' | 'dark';
  jobs: any[];
  applications: any[];
  savedJobs: any[];
  notifications: any[];
  interviews: any[];
  loading: boolean;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<any>;
  register: (data: any) => Promise<any>;
  logout: () => void;
  fetchJobs: (filters?: any) => Promise<void>;
  applyToJob: (jobId: string, coverLetter: string, resumeUrl?: string) => Promise<any>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  scheduleInterview: (data: any) => Promise<any>;
  updateApplicationStatus: (appId: string, status: string) => Promise<any>;
  analyzeResume: (resumeText: string) => Promise<any>;
  getAiRecommendations: () => Promise<any[]>;
  getCareerSuggestions: () => Promise<any>;
  sendMessage: (receiverId: string, content: string) => Promise<any>;
  getChatHistory: (partnerId: string) => Promise<any[]>;
  fetchNotifications: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync token & theme from localStorage on load
  useEffect(() => {
    const savedToken = localStorage.getItem('jc_token');
    const savedTheme = localStorage.getItem('jc_theme') as 'light' | 'dark';
    const savedUser = localStorage.getItem('jc_user');

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system theme preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  // Fetch initial non-auth data
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch private user data when authenticated
  useEffect(() => {
    if (token) {
      fetchPrivateData();
    } else {
      setApplications([]);
      setSavedJobs([]);
      setNotifications([]);
      setInterviews([]);
    }
  }, [token]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('jc_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const fetchJobs = async (filters: any = {}) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (filters.search) query.append('search', filters.search);
      if (filters.location) query.append('location', filters.location);
      if (filters.category) query.append('category', filters.category);
      if (filters.experience) query.append('experience', filters.experience);
      if (filters.type) query.append('type', filters.type);
      if (filters.salaryMin) query.append('salaryMin', filters.salaryMin);

      const res = await fetch(`${API_BASE_URL}/jobs?${query.toString()}`);
      const data = await res.json();
      if (res.ok) setJobs(data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPrivateData = async () => {
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Applications
      const appRes = await fetch(`${API_BASE_URL}/applications`, { headers });
      if (appRes.ok) setApplications(await appRes.json());

      // Saved Jobs
      const savedRes = await fetch(`${API_BASE_URL}/jobs/saved/all`, { headers });
      if (savedRes.ok) setSavedJobs(await savedRes.json());

      // Interviews
      const intRes = await fetch(`${API_BASE_URL}/interviews`, { headers });
      if (intRes.ok) setInterviews(await intRes.json());

      // Notifications
      const notRes = await fetch(`${API_BASE_URL}/notifications`, { headers });
      if (notRes.ok) setNotifications(await notRes.json());
    } catch (err) {
      console.error('Failed to fetch private data:', err);
    }
  };

  const fetchNotifications = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setNotifications(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Login failed');
      
      localStorage.setItem('jc_token', data.token);
      localStorage.setItem('jc_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (regData: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      localStorage.setItem('jc_token', data.token);
      localStorage.setItem('jc_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('jc_token');
    localStorage.removeItem('jc_user');
    setToken(null);
    setUser(null);
  };

  const applyToJob = async (jobId: string, coverLetter: string, resumeUrl?: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/applications/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ jobId, coverLetter, resumeUrl })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit application');
    
    // Refresh applications & notifications
    fetchPrivateData();
    return data;
  };

  const saveJob = async (jobId: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/jobs/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ jobId })
    });
    if (res.ok) fetchPrivateData();
  };

  const unsaveJob = async (jobId: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/jobs/save/${jobId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchPrivateData();
  };

  const scheduleInterview = async (interviewData: any) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/applications/schedule-interview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(interviewData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to schedule interview');
    fetchPrivateData();
    return data;
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/applications/${appId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update status');
    fetchPrivateData();
    return data;
  };

  const analyzeResume = async (resumeText: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/ai/analyze-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ resumeText })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to parse resume');
    return data;
  };

  const getAiRecommendations = async () => {
    if (!token) return [];
    const res = await fetch(`${API_BASE_URL}/ai/job-recommendations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) return await res.json();
    return [];
  };

  const getCareerSuggestions = async () => {
    if (!token) return null;
    const res = await fetch(`${API_BASE_URL}/ai/career-suggestions`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) return await res.json();
    return null;
  };

  const sendMessage = async (receiverId: string, content: string) => {
    if (!token) return;
    const res = await fetch(`${API_BASE_URL}/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ receiverId, content })
    });
    return await res.json();
  };

  const getChatHistory = async (partnerId: string) => {
    if (!token) return [];
    const res = await fetch(`${API_BASE_URL}/messages/history/${partnerId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) return await res.json();
    return [];
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        theme,
        jobs,
        applications,
        savedJobs,
        notifications,
        interviews,
        loading,
        toggleTheme,
        login,
        register,
        logout,
        fetchJobs,
        applyToJob,
        saveJob,
        unsaveJob,
        scheduleInterview,
        updateApplicationStatus,
        analyzeResume,
        getAiRecommendations,
        getCareerSuggestions,
        sendMessage,
        getChatHistory,
        fetchNotifications
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
