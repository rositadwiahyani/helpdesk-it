'use client';
import { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';

export default function PimpinanProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        setCurrentUser(JSON.parse(userStr));
      }
    } catch(e) {}
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return <div className="p-12 text-center text-slate-500">Memuat profil...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-slate-900 font-extrabold text-2xl tracking-tight">Profil Pengguna</h1>
        <p className="text-slate-500 font-medium text-sm">Informasi akun Anda saat ini.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center text-xl font-bold text-white shadow-md">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{currentUser?.name || 'Pimpinan'}</h2>
            <p className="text-slate-500 font-medium">{currentUser?.email || 'pimpinan@helpdesk.undip.ac.id'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap</label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              {currentUser?.name || 'Pimpinan'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              {currentUser?.email || 'pimpinan@helpdesk.undip.ac.id'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Peran Akses (Role)</label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Pimpinan (Read-Only)
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">ID Pengguna</label>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 font-mono text-xs overflow-hidden text-ellipsis">
              {currentUser?.id || currentUser?.user_id || 'ID_TIDAK_DITEMUKAN'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
