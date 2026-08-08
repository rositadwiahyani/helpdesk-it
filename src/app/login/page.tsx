'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AuthCard from '@/components/auth/AuthCard';
import { loginUser } from '@/lib/AuthService';

export default function LoginPage() {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');

  const fullTitle = 'Login Helpdesk Terpadu';

  useEffect(() => {
    let currentText = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullTitle.length) {
        currentText += fullTitle[i];
        setTypedTitle(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 70);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const authData = await loginUser(usernameOrEmail, password);
      
      if (authData?.user) {
        // Gabungkan data user dan profile
        const combinedUser = { ...authData.user, ...(authData.profile || {}) };
        
        // Simpan token ke localStorage dan cookie
        if (authData.session?.access_token) {
          localStorage.setItem('access_token', authData.session.access_token);
          document.cookie = `auth_token=${authData.session.access_token}; path=/; max-age=86400`;
        }
        
        // Simpan state login untuk middleware
        localStorage.setItem('user', JSON.stringify(combinedUser));
        localStorage.setItem('isLoggedIn', 'true');
        document.cookie = `isLoggedIn=true; path=/; max-age=86400`;
        
        if (combinedUser.role) {
          document.cookie = `userRole=${combinedUser.role}; path=/; max-age=86400`;
        }
        
        // Cek role untuk routing
        const role = combinedUser.role || combinedUser.user_metadata?.role || '';
        let targetPath = '/dashboard/operator'; // Default fallback
        if (role === 'teknisi' || role === 'agent') targetPath = '/dashboard/teknisi';
        else if (role === 'pimpinan') targetPath = '/dashboard/pimpinan';
        else if (role === 'admin') targetPath = '/dashboard/administrasi';
        
        // Set exit state for animation before redirect
        setIsExiting(true);
        setTimeout(() => {
          router.push(targetPath);
        }, 800); // Wait for exit animation to finish
      } else {
        throw new Error('Respons tidak valid dari server.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg(error.message || 'Gagal login. Periksa kembali email dan password Anda.');
      } else {
        setErrorMsg('Gagal login. Periksa kembali email dan password Anda.');
      }
      setLoading(false);
    }
  };

  const cardContent = (
    <AuthCard 
      title={
        <span className="flex items-center justify-center gap-1 h-8">
          {typedTitle}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1 h-6 bg-[var(--gold-dim)]"
          />
        </span>
      } 
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
        <div className="field relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)] pr-10 transition-shadow"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
            >
              {showPassword ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
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

  return (
    <>
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full min-h-screen"
          >
            {cardContent}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-white text-2xl font-bold flex flex-col items-center gap-4"
            >
              <svg className="w-12 h-12 text-[var(--gold)] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyiapkan Dashboard...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}