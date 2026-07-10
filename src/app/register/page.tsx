'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthCard from '@/components/AuthCard';

// Komponen PasswordInput dengan IKON MATA ORIGINAL LU
const PasswordInput = ({ label, value, onChange, placeholder, error }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; error?: string }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="field flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input 
          type={show ? "text" : "password"} 
          value={value}
          onChange={onChange}
          placeholder={placeholder} 
          className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
            error ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-[var(--gold)]'
          }`} 
          required 
        />
        <button 
          type="button" 
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-[var(--gold)] transition-colors"
        >
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs font-semibold mt-1 animate-pulse">{error}</p>}
    </div>
  );
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '', email: '', phoneNumber: '', nimNip: '', unit: '', password: '', confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({ nimNip: '', password: '', confirmPassword: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ nimNip: '', password: '', confirmPassword: '' }); 

    if (!/^\d+$/.test(formData.nimNip)) {
      setErrors(prev => ({ ...prev, nimNip: "NIM/NIP harus berupa angka saja!" }));
      return;
    }

    if (formData.password.length !== 8) {
      setErrors(prev => ({ ...prev, password: "Password harus tepat 8 karakter!" }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Password tidak cocok!" }));
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('isLoggedIn', 'true'); 
    
    alert("Akun berhasil dibuat!");
    router.push('/'); 
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-[var(--gold)] transition-colors font-medium z-10">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
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
               <div className="field flex flex-col">
                 <label className="block text-sm font-medium text-gray-700 mb-1">NIM / NIP</label>
                 <input 
                   type="text" 
                   onChange={(e) => setFormData({...formData, nimNip: e.target.value})} 
                   className={`w-full p-3 border rounded-xl outline-none focus:ring-2 transition-all ${
                     errors.nimNip ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-[var(--gold)]'
                   }`} 
                   required 
                 />
                 {errors.nimNip && <p className="text-red-500 text-xs font-semibold mt-1 animate-pulse">{errors.nimNip}</p>}
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
              error={errors.password} 
            />

            <PasswordInput 
              label="Konfirmasi Password" 
              value={formData.confirmPassword} 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              placeholder="••••••••" 
              error={errors.confirmPassword} 
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