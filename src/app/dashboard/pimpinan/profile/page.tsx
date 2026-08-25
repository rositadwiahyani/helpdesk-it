'use client';
import { useState, useEffect } from 'react';
import { User, Lock, Phone, Mail, Shield, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PimpinanProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ext: '',
    mobile: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
        
        let displayUserName = user.name || user.full_name || user.user_metadata?.full_name || user.user_metadata?.name;
        if (!displayUserName && user.email) {
          displayUserName = user.email.split('@')[0];
        }
        
        setFormData({
          name: displayUserName || '',
          phone: user.phone || '',
          ext: user.ext || '',
          mobile: user.mobile || '',
          username: user.username || '',
          password: '',
        });
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    setIsLoaded(true);
  }, []);

  const initials = formData.name ? formData.name.substring(0, 2).toUpperCase() : 'PM';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('Akses token tidak ditemukan, silakan login ulang.');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: currentUser.id,
          name: formData.name,
          phone: formData.phone,
          ext: formData.ext,
          mobile: formData.mobile,
          username: formData.username,
          password: formData.password || undefined,
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Gagal menyimpan profil');

      setMessage({ type: 'success', text: 'Profil Pimpinan berhasil diperbarui!' });
      
      const updatedUser = { ...currentUser, ...formData };
      delete updatedUser.password;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      setFormData(prev => ({ ...prev, password: '' }));

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">Profil Pengguna</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">Kelola informasi akun dan pengaturan autentikasi Pimpinan.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--line)] flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--ink)]">Informasi Akun Pimpinan</h3>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
            Executive Access
          </span>
        </div>

        {message && (
          <div className={`mx-6 mt-6 p-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="p-6 md:p-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Avatar Section */}
              <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
                <div className="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-md uppercase ring-4 ring-slate-50">
                  {initials}
                </div>
                <span className="text-xs font-bold text-[var(--text-dim)]">Avatar Akun</span>
              </div>

              {/* Fields */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Nama Lengkap</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Peran Sistem (Role)</label>
                  <input 
                    type="text" 
                    value="Pimpinan (Executive / Read-Only)" 
                    disabled 
                    className="bg-slate-100 opacity-80 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[var(--ink)]">Alamat Email Resmi</label>
                  <input 
                    type="email" 
                    value={currentUser.email || ""} 
                    disabled 
                    className="bg-slate-100 opacity-80 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm text-slate-700" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Nomor Telepon</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="0812345..." 
                      className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors w-full" 
                    />
                    <input 
                      type="text" 
                      name="ext" 
                      placeholder="Ext" 
                      value={formData.ext} 
                      onChange={handleChange} 
                      className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors w-20 text-center" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Nomor WhatsApp / Mobile</label>
                  <input 
                    type="text" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    placeholder="0812345..." 
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors" 
                  />
                </div>
              </div>
            </div>

            <hr className="border-[var(--line)]" />

            {/* Authentication Section */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm text-[var(--ink)] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[var(--text-dim)]" />
                Pengaturan Autentikasi & Login
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Username Login</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Username untuk login" 
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">Ganti Password (Kosongkan jika tidak diubah)</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password baru..." 
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-[var(--line)] p-6 flex flex-wrap items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={() => window.location.reload()} 
              className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] transition-colors active:scale-95 shadow-sm"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isSaving} 
              className="bg-[var(--ink)] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
