'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TopbarProps {
  onMenuClick: () => void;
  pageTitle?: string;
}

export default function Topbar({ onMenuClick, pageTitle = 'Dashboard' }: TopbarProps) {
  const [profile, setProfile] = useState<{name: string, role: string}>({ name: 'Admin Magang', role: 'Administrator' });
  
  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('staff_profiles').select('name, role').eq('id', user.id).maybeSingle();
        if (data) {
          setProfile({ name: data.name || 'User', role: data.role || 'Staff' });
        }
      }
    }
    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="sticky top-0 z-40 h-16 w-full bg-white/80 backdrop-blur-md border-b border-[var(--line)]">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        
        {/* Kiri: Hamburger Menu (Mobile) & Judul Halaman */}
        <div className="flex items-center gap-4">
          {/* Tombol Hamburger (Desktop & Mobile) */}
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Judul Halaman */}
          <h1 className="text-[16px] font-semibold text-[var(--ink)] truncate max-w-[200px] md:max-w-xs">
            {pageTitle}
          </h1>
        </div>

        {/* Kanan: Notification & Profile */}
        <div className="flex items-center gap-3 lg:gap-5">
          
          {/* Notification Icon */}
          <button 
            className="relative p-2 rounded-full text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--gold-soft)] transition-colors"
            aria-label="Notifications"
          >
            <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--red)] border-2 border-white rounded-full"></span>
          </button>

          {/* Garis Pemisah */}
          <div className="hidden sm:block w-px h-6 bg-[var(--line)]"></div>

          {/* Profile (Dinamis, Tanpa Dropdown) */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[13.5px] font-bold text-[var(--ink)]">{profile.name}</span>
              <span className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wide">{profile.role}</span>
            </div>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--gold-dim)] to-[var(--gold-soft)] flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {getInitials(profile.name)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
