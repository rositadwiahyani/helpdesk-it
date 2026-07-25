'use client';
import { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

  let displayUserRole = currentUser.role || currentUser.user_metadata?.role || 'Super Administrator';
  if (displayUserRole === 'authenticated') {
    if (currentUser.email?.includes('operator')) displayUserRole = 'Operator Helpdesk';
    else if (currentUser.email?.includes('teknisi')) displayUserRole = 'Teknisi Helpdesk';
    else displayUserRole = 'Administrator';
  }

  const initials = formData.name ? formData.name.substring(0, 2).toUpperCase() : 'OP';

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

      setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
      
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--gold)]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Profil Saya</h2>
        <p className="text-[var(--text-dim)] text-sm">Kelola profil dan autentikasi akun Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 -mt-2">
        <div className="p-5 md:p-6 border-b border-[var(--line-dark)]">
          <h3 className="font-bold text-[18px] text-[var(--ink)]">My Account Profile</h3>
        </div>

        {message && (
          <div className={`mx-5 mt-5 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="p-5 md:p-8 flex flex-col bg-white">
            <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
                  <div className="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-sm uppercase">
                    {initials}
                  </div>
                  <button type="button" className="text-[13px] font-bold text-[var(--gold-soft)] hover:text-[var(--gold-dim)] transition-colors">Avatar</button>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Role</label>
                    <input type="text" value={displayUserRole} disabled className="bg-[var(--paper-2)] opacity-70 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Email Address</label>
                    <input type="email" value={currentUser.email || ""} disabled className="bg-[var(--paper-2)] opacity-70 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Phone Number</label>
                    <div className="flex gap-2">
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" />
                      <input type="text" name="ext" placeholder="Ext" value={formData.ext} onChange={handleChange} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-24" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Mobile Number</label>
                    <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                </div>
              </div>

              <hr className="border-[var(--line-dark)]" />

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[15.5px] text-[var(--ink)] flex items-center gap-2">
                  Authentication
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
                  <div className="flex flex-col gap-2 md:col-span-2 sm:col-span-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username untuk login" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2 sm:col-span-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Change Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--paper-2)]/50 border-t border-[var(--line)] p-5 md:p-6 flex flex-wrap items-center justify-center gap-3">
            <button type="submit" disabled={isSaving} className="bg-[var(--ink)] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSaving ? 'Menyimpan...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => window.location.reload()} className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] transition-colors active:scale-95">
              Reset
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
