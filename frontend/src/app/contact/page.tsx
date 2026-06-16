'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Contact details */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">Get in Touch</h1>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Have questions about candidate sourcing or corporate premium memberships? Our team responds within 12 hours.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="bg-violet-600/10 p-2.5 rounded-xl text-violet-600">
              <Mail size={16} />
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Email Support</span>
              <span className="font-bold text-gray-800 dark:text-gray-250">support@jobconnect.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-cyan-500/10 p-2.5 rounded-xl text-cyan-600">
              <Phone size={16} />
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Call Us</span>
              <span className="font-bold text-gray-800 dark:text-gray-250">+1 (555) 019-2834</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-rose-500/10 p-2.5 rounded-xl text-rose-500">
              <MapPin size={16} />
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Headquarters</span>
              <span className="font-bold text-gray-800 dark:text-gray-250">100 Pine St, San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="glass-card p-8 rounded-3xl border border-gray-150 dark:border-zinc-800 shadow-xl space-y-6">
        <h3 className="font-extrabold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Send a Message</h3>
        
        {success && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl font-medium">
            Inquiry dispatched successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Your Name</label>
            <input 
              type="text" required placeholder="Alex Dev"
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-805 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
            <input 
              type="email" required placeholder="alex@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-805 text-xs px-3 py-2.5 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Message / Inquiry</label>
            <textarea 
              rows={4} required placeholder="Write message..."
              value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-805 text-xs p-3 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-violet-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-750 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5 hover:scale-[1.01]"
          >
            Send Inquiry <Send size={14} />
          </button>
        </form>
      </div>

    </div>
  );
}
