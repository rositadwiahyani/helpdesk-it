'use client';
import { useState } from 'react';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import DashboardSubNav from '@/components/admin/layout/DashboardSubNav';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard</h2>
          <p className="text-[var(--text-dim)] text-sm">Kelola profil dan preferensi akun Anda.</p>
        </div>

        <DashboardSubNav />

        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 -mt-2">
          
          {/* Header Title */}
          <div className="p-5 md:p-6 border-b border-[var(--line-dark)]">
            <h3 className="font-bold text-[18px] text-[var(--ink)]">My Account Profile</h3>
          </div>

          {/* Inner Tabs (UI Only) */}
          <div className="flex items-center gap-1 border-b border-[var(--line)] px-5 md:px-6 pt-4 overflow-x-auto scrollbar-hide bg-[var(--paper-2)]/30">
            {['Account', 'Preferences', 'Signature'].map(tab => {
              const isTabActive = activeTab === tab.toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-5 py-2.5 text-[14px] font-bold whitespace-nowrap rounded-t-lg border border-b-0 transition-colors ${
                    isTabActive 
                      ? 'bg-white border-[var(--line)] text-[var(--ink)]' 
                      : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
                  }`}
                  style={isTabActive ? { marginBottom: '-1px' } : {}}
                >
                  {/* Ikon untuk Account */}
                  <div className="flex items-center gap-2">
                    {tab === 'Account' && (
                      <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    )}
                    {tab}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="p-5 md:p-8 flex flex-col bg-white min-h-[400px]">
            
            {/* =========================================================================
                TAB 1: ACCOUNT 
                ========================================================================= */}
            {activeTab === 'account' && (
              <div className="flex flex-col gap-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-1 flex flex-col items-center gap-3 pt-2">
                    <div className="w-24 h-24 rounded-full bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-sm">
                      AM
                    </div>
                    <button className="text-[13px] font-bold text-[var(--gold-soft)] hover:text-[var(--gold-dim)] transition-colors">Avatar</button>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[var(--ink)]">Name</label>
                      <input type="text" defaultValue="magang4" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-bold text-[var(--ink)]">Last Name</label>
                      <input type="text" defaultValue="reka" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
                    </div>
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label className="text-[13px] font-bold text-[var(--ink)]">Email Address</label>
                      <input type="email" defaultValue="mrekafakhrezi@gmail.com" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors" />
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
                        <input type="text" defaultValue="reka" className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] transition-colors w-full sm:max-w-[280px]" />
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
            )}

            {/* =========================================================================
                TAB 2: PREFERENCES 
                ========================================================================= */}
            {activeTab === 'preferences' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex flex-col gap-1 border-b border-[var(--line-dark)] pb-3">
                  <h4 className="font-bold text-[16px] text-[var(--ink)]">Preferences</h4>
                  <p className="text-[13px] text-[var(--text-dim)]">Profile preferences and settings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Maximum Page size:</label>
                    <div className="flex items-center gap-2">
                      <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] cursor-pointer">
                        <option>show 25 records</option>
                        <option>show 50 records</option>
                      </select>
                      <span className="text-[13px] text-[var(--ink)] font-medium">per page.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Auto Refresh Rate:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">Tickets page refresh rate in minutes.</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-max cursor-pointer">
                      <option>— Disabled —</option>
                      <option>Every 5 minutes</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Default From Name:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">From name to use when replying to a thread</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>Email Address Name</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Default Ticket Queue:</label>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer mt-5">
                      <option>— system default —</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Thread View Order:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">The order of thread entries</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>— System Default —</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Default Signature:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">This can be selected when replying to a thread</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>— None —</option>
                      <option>My Signature</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Default Paper Size:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">Paper size used when printing tickets to PDF</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>Letter</option>
                      <option>A4</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Reply Redirect:</label>
                    <p className="text-[12px] text-[var(--text-dim)] mb-1">Redirect URL used after replying to a ticket.</p>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>Ticket</option>
                      <option>Queue</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 border-b border-[var(--line-dark)] pb-3 mt-4">
                  <h4 className="font-bold text-[16px] text-[var(--ink)]">Localization</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Time Zone:</label>
                    <div className="flex gap-2 items-center">
                      <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer text-[var(--text-dim)]">
                        <option>System Default</option>
                      </select>
                      <button className="bg-[var(--paper-2)] border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-[13px] font-bold hover:bg-[var(--line)] transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        Auto Detect
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Time Format:</label>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>— System Default —</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-bold text-[var(--ink)]">Preferred Language:</label>
                    <select className="bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)] w-full max-w-sm cursor-pointer">
                      <option>— Use Browser Preference —</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 3: SIGNATURE 
                ========================================================================= */}
            {activeTab === 'signature' && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                <div className="flex flex-col gap-1 border-b border-[var(--line-dark)] pb-3">
                  <h4 className="font-bold text-[16px] text-[var(--ink)]">Signature</h4>
                  <p className="text-[13px] text-[var(--text-dim)]">Optional signature used on outgoing emails. Signature is made available as a choice, on ticket reply.</p>
                </div>
                
                {/* Dummy Rich Text Editor */}
                <div className="border border-[var(--line-dark)] rounded-xl overflow-hidden flex flex-col bg-white shadow-sm">
                  {/* Toolbar 1 */}
                  <div className="flex items-center gap-1 bg-[var(--paper)] border-b border-[var(--line-dark)] px-2 py-1 flex-wrap">
                    {['File', 'Edit', 'View', 'Insert', 'Format', 'Table', 'Help'].map(btn => (
                      <button key={btn} className="px-3 py-1.5 text-[13px] font-semibold text-[var(--text-dim)] hover:bg-[var(--line)] hover:text-[var(--ink)] rounded transition-colors flex items-center gap-1">
                        {btn} <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    ))}
                  </div>
                  {/* Toolbar 2 */}
                  <div className="flex items-center gap-2 bg-white border-b border-[var(--line-dark)] px-3 py-2 flex-wrap">
                    <button className="p-1.5 text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg></button>
                    <button className="p-1.5 text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg></button>
                    <div className="w-px h-5 bg-[var(--line)] mx-1" />
                    <button className="px-3 py-1 text-[13px] font-semibold text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)] rounded flex items-center gap-1 transition-colors">Formats <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></button>
                    <div className="w-px h-5 bg-[var(--line)] mx-1" />
                    <button className="p-1.5 text-[var(--ink)] font-bold font-serif hover:bg-[var(--paper-2)] rounded transition-colors">B</button>
                    <button className="p-1.5 text-[var(--ink)] italic font-serif hover:bg-[var(--paper-2)] rounded transition-colors">I</button>
                    <button className="p-1.5 text-[var(--ink)] underline font-serif hover:bg-[var(--paper-2)] rounded transition-colors">U</button>
                    <button className="p-1.5 text-[var(--ink)] line-through font-serif hover:bg-[var(--paper-2)] rounded transition-colors">S</button>
                    <div className="w-px h-5 bg-[var(--line)] mx-1" />
                    <button className="p-1.5 text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)] rounded transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg></button>
                  </div>
                  {/* Text Area */}
                  <textarea 
                    className="w-full h-72 p-4 text-[14px] text-[var(--ink)] bg-[var(--paper)]/30 focus:outline-none resize-y"
                    placeholder="Tulis signature Anda di sini..."
                  ></textarea>
                </div>
              </div>
            )}

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
    </AdminLayout>
  );
}
