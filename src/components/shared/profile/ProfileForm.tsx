'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfileForm() {
  const [profile, setProfile] = useState<{ id: string, name: string, email: string }>({
    id: '',
    name: '',
    email: '',
  });
  
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('staff_profiles')
          .select('id, name, email')
          .eq('id', user.id)
          .single();
          
        if (data && !error) {
          setProfile(data);
        } else if (!data) {
           // fallback to auth data if profile not yet seeded correctly
           setProfile({ id: user.id, name: user.user_metadata?.name || '', email: user.email || '' });
        }
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setAlertMsg(null);
    
    if (!profile.name.trim()) {
      setAlertMsg({ type: 'error', message: 'Full name is required.' });
      setSavingProfile(false);
      return;
    }

    const { error } = await supabase
      .from('staff_profiles')
      .update({ name: profile.name })
      .eq('id', profile.id);

    if (error) {
      setAlertMsg({ type: 'error', message: 'Failed to update profile: ' + error.message });
    } else {
      setAlertMsg({ type: 'success', message: 'Profile updated successfully.' });
    }
    setSavingProfile(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPassword(true);
    setAlertMsg(null);

    if (!newPassword || newPassword !== confirmPassword) {
      setAlertMsg({ type: 'error', message: 'Passwords do not match.' });
      setSavingPassword(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      setAlertMsg({ type: 'error', message: 'Failed to change password: ' + error.message });
    } else {
      setAlertMsg({ type: 'success', message: 'Password changed successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    }
    setSavingPassword(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-4 border-[var(--gold)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Profil Saya</h2>
        <p className="text-[var(--text-dim)] text-sm">Kelola profil dan otentikasi akun Anda.</p>
      </div>

      {alertMsg && (
        <div className={`p-4 rounded-xl border ${alertMsg.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'} mb-2`}>
          {alertMsg.message}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="p-5 md:p-6 border-b border-[var(--line-dark)]">
          <h3 className="font-bold text-[18px] text-[var(--ink)]">My Account Profile</h3>
        </div>

        <div className="p-5 md:p-8 flex flex-col bg-white">
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
                <div className="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-sm">
                  {getInitials(profile.name)}
                </div>
                <div className="text-[13px] font-bold text-[var(--text-dim)] cursor-not-allowed">Profile Photo</div>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[var(--ink)]">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[var(--ink)]">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email} 
                    readOnly
                    className="bg-[var(--paper-2)] text-[var(--text-dim)] border border-[var(--line)] rounded-xl px-4 py-2.5 text-[14px] cursor-not-allowed outline-none" 
                  />
                  <p className="text-xs text-[var(--text-dim)]">Email cannot be changed directly for security reasons.</p>
                </div>
                <div>
                  <button type="submit" disabled={savingProfile} className="bg-[var(--gold)] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-50">
                    {savingProfile ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <hr className="border-[var(--line-dark)] my-8" />

          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4">
            <h4 className="font-bold text-[15.5px] text-[var(--ink)] flex items-center gap-2">
              Authentication
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[var(--ink)]">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password" 
                  className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" 
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[13px] font-bold text-[var(--ink)]">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password" 
                  className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" 
                />
              </div>
            </div>
            <div className="mt-2">
              <button type="submit" disabled={savingPassword} className="bg-[var(--paper-2)] text-[var(--text-dim)] border border-[var(--line)] px-5 py-2.5 rounded-xl text-[13.5px] font-bold hover:bg-[var(--line)] hover:text-[var(--ink)] transition-colors flex items-center justify-center gap-2 w-max disabled:opacity-50">
                <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {savingPassword ? 'Changing Password...' : 'Change Password'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
