'use client';
import { useState, useEffect } from 'react';
import { User, Lock, Phone, Mail, Shield, CheckCircle2, AlertCircle, Globe } from 'lucide-react';
import { API_BASE_URL } from '@/lib/apiClient';
import { useLanguage } from '@/context/LanguageContext';

export default function PimpinanProfilePage() {
  const { language, setLanguage, t } = useLanguage();
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

      {/* Preferensi Bahasa (Language Preference) Card */}
      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="p-6 border-b border-[var(--line)] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[var(--ink)] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[var(--gold)]" />
              {t('language.title')}
            </h3>
            <p className="text-[var(--text-dim)] text-xs mt-1">
              {t('language.desc')}
            </p>
          </div>
        </div>
        <div className="p-6 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`flex-1 flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
              language === 'id'
                ? 'border-[var(--gold)] bg-[var(--gold)]/5 shadow-xs'
                : 'border-[var(--line-dark)] hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇮🇩</span>
              <div className="text-left">
                <div className="font-bold text-[14px] text-[var(--ink)]">Bahasa Indonesia</div>
                <div className="text-xs text-[var(--text-dim)]">Indonesian language</div>
              </div>
            </div>
            {language === 'id' && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--gold)] text-white">
                {t('language.active')}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`flex-1 flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer ${
              language === 'en'
                ? 'border-[var(--gold)] bg-[var(--gold)]/5 shadow-xs'
                : 'border-[var(--line-dark)] hover:border-slate-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇬🇧</span>
              <div className="text-left">
                <div className="font-bold text-[14px] text-[var(--ink)]">English</div>
                <div className="text-xs text-[var(--text-dim)]">English language</div>
              </div>
            </div>
            {language === 'en' && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--gold)] text-white">
                {t('language.active')}
              </span>
            )}
          </button>
        </div>
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
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="••••••••" 
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
              {t('common.reset')}
            </button>
            <button 
              type="submit" 
              disabled={isSaving} 
              className="bg-[var(--ink)] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? t('common.saving') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
