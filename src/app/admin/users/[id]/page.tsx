'use client';
import { useState, use } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import RoleBadge from '@/components/admin/common/RoleBadge';
import StatusBadge from '@/components/admin/common/StatusBadge';

// Mock data (for now we hardcode one user detail)
const DUMMY_USER_DETAIL = {
  id: '1',
  name: 'AHMAD DIKA STYANSAH',
  email: 'ahmaddikastyansah15@gmail.com',
  status: 'Guest',
  organization: 'Sistem Informasi',
  created: '07/14/2026 08:46:30 AM',
  updated: '07/14/2026 08:46:30 AM',
};

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const userId = unwrappedParams.id;
  const [activeTab, setActiveTab] = useState<'tickets' | 'notes'>('tickets');
  const user = DUMMY_USER_DETAIL; // Replace with actual fetch based on userId later

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* Header with Breadcrumb */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Link href="/admin/users" className="text-[var(--text-dim)] hover:text-[var(--ink)] transition-colors">Users</Link>
            <span className="text-[var(--line-dark)]">/</span>
            <span className="text-[var(--ink)]">User Directory</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-[var(--ink)] flex items-center gap-3 uppercase">
              <svg className="w-6 h-6 text-[var(--gold-soft)]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              {user.name}
            </h2>
            <div className="flex items-center gap-2">
              <button className="bg-white border border-[var(--line)] text-[var(--text-dim)] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Register
              </button>
              <button className="bg-white border border-[var(--line)] text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete User
              </button>
            </div>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col md:flex-row p-6 gap-8">
          
          <div className="flex flex-col items-center gap-3 shrink-0">
             <div className="w-24 h-24 rounded-xl bg-[var(--gold)] flex items-center justify-center text-white text-3xl font-bold shadow-sm">
                {user.name.substring(0, 2).toUpperCase()}
             </div>
             <span className="text-xs font-bold text-[var(--text-dim)] uppercase">Avatar</span>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Name</span>
              <div className="text-[14px] font-bold text-[var(--ink)] flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--gold-soft)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                {user.name}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Status</span>
              <div className="mt-1">
                <StatusBadge status={user.status} />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Email</span>
              <div className="text-[14px] font-bold text-[var(--ink)]">{user.email}</div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Created</span>
              <div className="text-[14px] font-medium text-[var(--ink)]">{user.created}</div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Organization</span>
              <div className="text-[14px] font-bold text-[var(--gold-soft)] cursor-pointer hover:underline">{user.organization || 'Add Organization'}</div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-[var(--text-dim)]">Updated</span>
              <div className="text-[14px] font-medium text-[var(--ink)]">{user.updated}</div>
            </div>

          </div>
        </div>

        {/* TABS (TICKETS & NOTES) */}
        <div className="bg-white rounded-2xl border border-[var(--line)] shadow-sm overflow-hidden flex flex-col min-h-[400px]">
          
          <div className="flex items-center gap-1 border-b border-[var(--line)] px-4 pt-4 bg-[var(--paper-2)]/30">
            <button
              onClick={() => setActiveTab('tickets')}
              className={`px-6 py-2.5 text-[14px] font-bold whitespace-nowrap rounded-t-lg border border-b-0 transition-colors flex items-center gap-2 ${
                activeTab === 'tickets' 
                  ? 'bg-white border-[var(--line)] text-[var(--ink)]' 
                  : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
              }`}
              style={activeTab === 'tickets' ? { marginBottom: '-1px' } : {}}
            >
              <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
              Tickets
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-6 py-2.5 text-[14px] font-bold whitespace-nowrap rounded-t-lg border border-b-0 transition-colors flex items-center gap-2 ${
                activeTab === 'notes' 
                  ? 'bg-white border-[var(--line)] text-[var(--ink)]' 
                  : 'bg-transparent border-transparent text-[var(--text-dim)] hover:text-[var(--ink)] hover:bg-[var(--line-dark)]'
              }`}
              style={activeTab === 'notes' ? { marginBottom: '-1px' } : {}}
            >
              <svg className="w-4 h-4 opacity-75" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
              Notes
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'tickets' && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[var(--ink)]">Showing 1 - 1 of 1</span>
                  <button className="bg-[var(--ink)] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--text)] transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    Create New Ticket
                  </button>
                </div>
                
                {/* Dummy Table Placeholder for Tickets */}
                <div className="border border-[var(--line-dark)] rounded-xl overflow-hidden overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-[var(--paper-2)] border-b border-[var(--line-dark)]">
                      <tr>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Ticket</th>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Last Updated</th>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Status</th>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Subject</th>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Department</th>
                        <th className="py-3 px-4 text-[13px] font-bold text-[var(--ink)]">Assignee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[var(--line-dark)] hover:bg-[var(--paper)]/50 transition-colors cursor-pointer">
                        <td className="py-3 px-4 text-[14px] font-bold text-[var(--gold-soft)] flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                          027705
                        </td>
                        <td className="py-3 px-4 text-[13.5px] font-medium text-[var(--ink)]">07/14/2026 08:51:29 AM</td>
                        <td className="py-3 px-4 text-[13.5px] font-bold text-[var(--ink)]">Open</td>
                        <td className="py-3 px-4 text-[13.5px] font-bold text-[var(--gold-soft)] hover:underline truncate max-w-[200px]">MFA error saat login di aplikasi ...</td>
                        <td className="py-3 px-4 text-[13.5px] font-medium text-[var(--ink)]">Sistem Informasi</td>
                        <td className="py-3 px-4 text-[13.5px] font-medium text-[var(--ink)]">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="flex items-center justify-center h-48 text-[var(--text-dim)] text-sm font-bold border-2 border-dashed border-[var(--line-dark)] rounded-xl">
                Tidak ada catatan.
              </div>
            )}
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
