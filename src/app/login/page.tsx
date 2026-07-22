'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/AuthCard';
import { loginUser } from '@/lib/AuthService';

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
      const authData = await loginUser(email, password);
      
      if (authData?.user) {
        localStorage.setItem('isLoggedIn', 'true');
        // Arahkan sementara ke dashboard operator
        router.push('/dashboard/operator');
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Gagal login. Periksa kembali email dan password Anda.');
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