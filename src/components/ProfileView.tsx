'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileView() {
  const router = useRouter();
  const [user, setUser] = useState({ 
    fullName: '', email: '', phoneNumber: '', nimNip: '', unit: '' 
  });

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
    const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    setUser(savedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    alert("Berhasil keluar!");
    router.push('/login');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-[var(--gold)]">
          {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{user.fullName || 'User'}</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase">NIM / NIP</label>
          <p className="text-gray-800 font-medium">{user.nimNip || '-'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase">Unit / Fakultas</label>
          <p className="text-gray-800 font-medium">{user.unit || '-'}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <label className="text-xs font-bold text-gray-400 uppercase">Nomor Telepon</label>
          <p className="text-gray-800 font-medium">{user.phoneNumber || '-'}</p>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-3 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
      >
        Keluar dari Akun
      </button>
    </div>
  );
}