'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import { fetchClient } from '@/lib/apiClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const authData = await fetchClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      
      if (authData?.success && authData?.data?.session?.access_token) {
        // Set cookie so Server Components can read it
        document.cookie = `auth_token=${authData.data.session.access_token}; path=/; max-age=86400`;
        localStorage.setItem('isLoggedIn', 'true');
        
        // Cek role untuk routing
        const role = authData.data.profile?.role || authData.data.user?.user_metadata?.role || '';
        let targetPath = '/dashboard/operator'; // Default fallback
        if (role === 'teknisi' || role === 'agent') targetPath = '/dashboard/teknisi';
        else if (role === 'pimpinan') targetPath = '/dashboard/pimpinan';
        else if (role === 'admin') targetPath = '/dashboard/administrasi';
        
        router.push(targetPath);
      } else {
        throw new Error('Respons tidak valid dari server.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message || 'Gagal login. Periksa kembali email dan password Anda.');
      } else {
        setErrorMsg('Gagal login. Periksa kembali email dan password Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard 
      title="Login Helpdesk Terpadu" 
      description="Silakan masuk menggunakan akun resmi Anda."
      footer={<p className="text-xs text-gray-500">Hanya untuk pengguna terdaftar.</p>}
    >
      <form onSubmit={handleLogin} className="space-y-4">
        {errorMsg && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {errorMsg}
          </div>
        )}
        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            placeholder="Masukkan Email..." 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]"
          />
        </div>
        <div className="field">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]"
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3 bg-[var(--ink)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Memproses...' : 'Masuk ke Sistem'}
        </button>
      </form>
    </AuthCard>
  );
}