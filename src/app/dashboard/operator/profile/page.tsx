'use client';
import { useState, useEffect } from 'react';
import { fetchClient } from '@/lib/apiClient';
import DashboardSubNav from '@/components/admin/layout/DashboardSubNav';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchClient('/auth/me').then(res => {
      if (res.success && res.data) {
        const userData = res.data.user || {};
        const userMeta = userData.user_metadata || {};
        const profileData = res.data.profile || {};
        
        setProfile({
          name: profileData.name || userMeta.name || userMeta.full_name || userData.email?.split('@')[0] || 'User',
          role: profileData.role || userMeta.role || 'operator',
          email: profileData.email || userData.email || '',
          ...profileData
        });
      }
    }).catch(err => console.error(err));
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10">
      <div>
        <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Profil Saya</h2>
        <p className="text-[var(--text-dim)] text-sm">Kelola profil dan preferensi akun Anda.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 -mt-2">

        {/* Header Title */}
        <div className="p-5 md:p-6 border-b border-[var(--line-dark)]">
          <h3 className="font-bold text-[18px] text-[var(--ink)]">My Account Profile</h3>
        </div>


        {/* Form Content */}
        <div className="p-5 md:p-8 flex flex-col bg-white min-h-[400px]">

          {/* =========================================================================
                ACCOUNT SETTINGS 
                ========================================================================= */}
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
                  <div className="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-sm uppercase">
                    {profile?.name ? profile.name.substring(0, 2) : '..'}
                  </div>
                  <button className="text-[13px] font-bold text-[var(--gold-soft)] hover:text-[var(--gold-dim)] transition-colors">Avatar</button>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Name</label>
                    <input type="text" defaultValue={profile?.name || ''} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Role</label>
                    <input type="text" readOnly value={profile?.role || ''} className="bg-[var(--paper-2)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] outline-none cursor-not-allowed uppercase" />
                  </div>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Email Address</label>
                    <input type="email" defaultValue={profile?.email || ''} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Phone Number</label>
                    <div className="flex gap-2">
                      <input type="text" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full" />
                      <input type="text" placeholder="Ext" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-24" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Mobile Number</label>
                    <input type="text" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                  </div>
                </div>
              </div>

              <hr className="border-[var(--line-dark)]" />

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[15.5px] text-[var(--ink)] flex items-center gap-2">
                  Authentication
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-4">
                  <div className="flex flex-col gap-2 md:col-span-3 sm:col-span-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Username <span className="text-red-500">*</span></label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input type="text" defaultValue={profile?.name || ''} className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full sm:max-w-[280px]" />
                      <button className="bg-[var(--paper-2)] text-[var(--text-dim)] border border-[var(--line)] px-4 py-2.5 rounded-xl text-[13.5px] font-bold hover:bg-[var(--line)] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                        <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-[var(--line-dark)]" />

              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-[15.5px] text-[var(--ink)]">Status and Settings</h4>
                <label className="flex items-center gap-3 cursor-pointer group w-max">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-[1.5px] border-[var(--line-dark)] bg-white group-hover:border-[var(--gold-soft)] transition-colors">
                    <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                    <svg className="w-3.5 h-3.5 text-[var(--gold)] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-[14px] text-[var(--ink)] font-semibold select-none group-hover:text-[var(--gold-dim)] transition-colors">Vacation Mode</span>
                </label>
              </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-[var(--paper-2)]/50 border-t border-[var(--line)] p-5 md:p-6 flex flex-wrap items-center justify-center gap-3">
          <button className="bg-[var(--ink)] text-white px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] hover:shadow-md transition-all active:scale-95">
            Save Changes
          </button>
          <button className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] transition-colors active:scale-95">
            Reset
          </button>
          <button className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-7 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] transition-colors active:scale-95">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
