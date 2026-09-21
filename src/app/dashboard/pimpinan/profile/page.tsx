'use client';
import { useState, useEffect } from 'react';
import { User, Lock, Phone, Mail, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '@/lib/apiClient';
import { useLanguage } from '@/context/LanguageContext';

export default function PimpinanProfilePage() {
  const { t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
      if (!token) throw new Error(t('profile.token_error'));

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
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
      if (!response.ok) throw new Error(result.error || t('profile.save_error'));

      setMessage({ type: 'success', text: t('profile.save_success') });
      
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
        <h1 className="text-2xl font-bold text-[var(--ink)] tracking-tight">{t('profile.pimpinan_title')}</h1>
        <p className="text-[var(--text-dim)] text-sm font-medium">{t('profile.pimpinan_desc')}</p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--line)] flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--ink)]">{t('profile.card_title')}</h3>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold">
            {t('profile.executive_badge')}
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
                <span className="text-xs font-bold text-[var(--text-dim)]">{t('profile.avatar_title')}</span>
              </div>

              {/* Fields */}
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.full_name')}</label>
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
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.role')}</label>
                  <input 
                    type="text" 
                    value={t('topbar.pimpinan') + " (Executive)"} 
                    disabled 
                    className="bg-slate-100 opacity-80 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.email')}</label>
                  <input 
                    type="email" 
                    value={currentUser.email || ""} 
                    disabled 
                    className="bg-slate-100 opacity-80 cursor-not-allowed border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm text-slate-700" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.phone')}</label>
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
                      placeholder={t('profile.ext')} 
                      value={formData.ext} 
                      onChange={handleChange} 
                      className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors w-20 text-center" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.mobile')}</label>
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
                Authentication
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.username')}</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleChange} 
                    placeholder="Username" 
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-[var(--ink)]">{t('profile.password')}</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      placeholder="••••••••" 
                      className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--gold)] focus:bg-white transition-colors w-full pr-10" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-t border-[var(--line)] p-6 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 w-full">
            <button 
              type="button" 
              onClick={() => window.location.reload()} 
              className="w-full sm:w-auto bg-white border border-[var(--line)] text-[var(--text-dim)] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] transition-colors active:scale-95 shadow-sm"
            >
              {t('common.reset')}
            </button>
            <button 
              type="submit" 
              disabled={isSaving} 
              className="w-full sm:w-auto bg-[var(--ink)] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
