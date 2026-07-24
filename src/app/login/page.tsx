'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import { loginUser } from '@/lib/AuthService';

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const authData = await loginUser(usernameOrEmail, password);
      
      if (authData?.user) {
        localStorage.setItem('isLoggedIn', 'true');
        const combinedUser = { ...authData.user, ...(authData.profile || {}) };
        localStorage.setItem('user', JSON.stringify(combinedUser));
        if (authData.session?.access_token) {
          localStorage.setItem('access_token', authData.session.access_token);
        }
        document.cookie = `isLoggedIn=true; path=/; max-age=86400`;
        if (combinedUser.role) {
          document.cookie = `userRole=${combinedUser.role}; path=/; max-age=86400`;
        }
        
        // Arahkan ke dashboard sesuai role
        if (combinedUser.role === 'teknisi') {
          router.push('/dashboard/teknisi');
        } else {
          router.push('/dashboard/operator');
        }
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Email atau Username</label>
          <input 
            type="text" 
            placeholder="Masukkan Email atau Username..." 
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
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