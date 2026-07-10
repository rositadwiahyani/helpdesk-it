'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';

const PasswordInput = ({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="field">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"} 
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--gold)] outline-none" 
          required 
        />
        <button 
          type="button" 
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-[var(--gold)]"
        >
          {show ? (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          ) : (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.7 9.7 0 012.33-3.666m3.935 3.935A3 3 0 0112 15a3 3 0 013-3"/></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    nimNip: '',
    unit: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('isLoggedIn', 'true'); 
    
    alert("Akun berhasil dibuat!");
    router.push('/'); 
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative">
      
      {/* Tombol Kembali ke Beranda */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[var(--gold)] transition-colors font-medium z-10"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </Link>

      <div className="w-full max-w-lg">
        <AuthCard 
          title="Buat Akun Baru" 
          description="Lengkapi data diri untuk mendaftar."
          footer={<>Sudah punya akun? <Link href="/login" className="text-[var(--gold)] font-bold">Masuk di sini</Link></>}
        >
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input type="text" onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="field">
                 <label className="block text-sm font-medium text-gray-700 mb-1">NIM / NIP</label>
                 <input type="text" onChange={(e) => setFormData({...formData, nimNip: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]" required />
               </div>
               <div className="field">
                 <label className="block text-sm font-medium text-gray-700 mb-1">Unit / Fakultas</label>
                 <select onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)] bg-white" required>
                   <option value="">Pilih Unit</option>
                   <option value="Teknik">Fakultas Teknik</option>
                   <option value="MIPA">Fakultas MIPA</option>
                   <option value="Ekonomika">Fakultas Ekonomika</option>
                   <option value="Lainnya">Lainnya</option>
                 </select>
               </div>
            </div>

            <div className="field">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Undip</label>
              <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="nama@students.undip.ac.id" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]" required />
            </div>

            <div className="field">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
              <input type="tel" onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} placeholder="081234567890" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[var(--gold)]" required />
            </div>

            <PasswordInput 
              label="Password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              placeholder="••••••••" 
            />
            <PasswordInput 
              label="Konfirmasi Password" 
              value={formData.confirmPassword} 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              placeholder="••••••••" 
            />

            <button type="submit" className="w-full py-3 bg-[var(--gold)] text-white font-bold rounded-xl hover:bg-[var(--gold-dim)] transition-colors mt-4 shadow-lg shadow-[var(--gold)]/20">
              Daftar
            </button>
          </form>
        </AuthCard>
      </div>
    </main>
  );
}