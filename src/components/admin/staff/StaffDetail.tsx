'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import StatusBadge from '@/components/admin/tickets/StatusBadge';
import { useSearchParams, useRouter } from 'next/navigation';

export default function StaffDetail({ staffId }: { staffId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [staff, setStaff] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(searchParams?.get('edit') === 'true');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'teknisi',
    dept_id: ''
  });

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const decodedId = decodeURIComponent(staffId);
        
        // Fetch departments for dropdown
        const { data: deptData } = await supabase.from('departments').select('*').order('name');
        if (deptData) setDepartments(deptData);

        const { data: staffData, error } = await supabase
          .from('staff_profiles')
          .select('*, dept:departments(name)')
          .eq('id', decodedId)
          .maybeSingle();

        if (error) {
           console.error("Error fetching staff:", error);
           setStaff({ error: error.message });
           return;
        }

        if (staffData) {
          setStaff(staffData);
          setFormData({
            name: staffData.name || '',
            email: staffData.email || '',
            phone: staffData.phone || '',
            role: staffData.role || 'teknisi',
            dept_id: staffData.dept_id ? String(staffData.dept_id) : ''
          });
          
          const { data: ticketsData } = await supabase
            .from('tickets')
            .select('*, category:categories(name)')
            .eq('tech_id', decodedId)
            .order('created_at', { ascending: false });
            
          if (ticketsData) setTickets(ticketsData);
        }
      } catch (err) {
        console.error('Error fetching staff detail:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [staffId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staff || staff.error) return;
    
    setIsSaving(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        dept_id: formData.dept_id ? parseInt(formData.dept_id) : null
      };

      const { fetchClient } = await import('@/lib/apiClient');
      await fetchClient(`/admin/staff/${staff.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      
      // Update local state smoothly
      const selectedDept = departments.find(d => d.id === payload.dept_id);
      setStaff({ 
        ...staff, 
        ...payload,
        dept: selectedDept ? { name: selectedDept.name } : null
      });
      
      setIsEditing(false);
      router.replace(`/dashboard/administrasi/staff/${staff.id}`);
    } catch (err: any) {
      alert("Gagal menyimpan data: " + (err.message || "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      name: staff.name || '',
      email: staff.email || '',
      phone: staff.phone || '',
      role: staff.role || 'teknisi',
      dept_id: staff.dept_id ? String(staff.dept_id) : ''
    });
    setIsEditing(false);
    router.replace(`/dashboard/administrasi/staff/${staff.id}`);
  };

  if (isLoading) {
    return (
      <div className="p-8 md:p-10 animate-pulse flex flex-col gap-8 max-w-[1200px]">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-xl font-bold">Staf tidak ditemukan</h2>
        <Link href="/dashboard/administrasi/staff" className="text-[#0059BB] font-bold mt-2 inline-block hover:underline">
          Kembali ke Manajemen Staf
        </Link>
      </div>
    );
  }

  if (staff.error) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-xl font-bold text-red-600">Error: {staff.error}</h2>
        <Link href="/dashboard/administrasi/staff" className="text-[#0059BB] font-bold mt-2 inline-block hover:underline">
          Kembali ke Manajemen Staf
        </Link>
      </div>
    );
  }

  // Hitung performa
  const resolvedTickets = tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED' || t.status === 'WAITING CONFIRMATION');
  const ticketsWithRating = tickets.filter(t => t.rating != null);
  const avgRating = ticketsWithRating.length > 0 
    ? (ticketsWithRating.reduce((acc, t) => acc + t.rating, 0) / ticketsWithRating.length).toFixed(1) 
    : '5.0';
  const completionRate = tickets.length > 0 ? ((resolvedTickets.length / tickets.length) * 100).toFixed(0) : '0';

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300 p-6 md:p-10 w-full max-w-[1200px]">
      
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-1 font-iBMPlexSans">
          <Link href="/dashboard/administrasi/staff" className="hover:text-gray-900 transition-colors">
            Manajemen Staf
          </Link>
          <span>/</span>
          <span className="text-gray-900">Detail Staf</span>
        </div>
        <div className="flex justify-between items-center w-full">
            <h1 className="text-[#001E40] font-iBMPlexSans text-[32px] font-semibold leading-10 tracking-[-0.02em]">
            Profil Staf
            </h1>
            {!isEditing && (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 border border-[#C3C6D1] rounded bg-white hover:bg-gray-50 text-sm text-[#43474F] font-iBMPlexSans font-medium transition-colors cursor-pointer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Edit Data
                </button>
            )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#C3C6D1] p-8 shadow-sm flex flex-col relative w-full">
        
        {isEditing ? (
            <form onSubmit={handleSave} className="flex flex-col gap-6 w-full">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    {/* Avatar placeholder during edit */}
                    <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold shrink-0 self-start mt-2">
                        {formData.name?.charAt(0)?.toUpperCase() || 'S'}
                    </div>

                    <div className="flex flex-col gap-4 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#43474F] font-iBMPlexSans tracking-wide">NAMA LENGKAP</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="px-4 py-2.5 text-sm border border-[#C3C6D1] rounded-md focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-shadow text-[#1A1C1E] font-iBMPlexSans"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#43474F] font-iBMPlexSans tracking-wide">EMAIL</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="px-4 py-2.5 text-sm border border-[#C3C6D1] rounded-md focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-shadow text-[#1A1C1E] font-iBMPlexSans"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#43474F] font-iBMPlexSans tracking-wide">NO. WHATSAPP</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.phone}
                                    onChange={e => setFormData({...formData, phone: e.target.value})}
                                    className="px-4 py-2.5 text-sm border border-[#C3C6D1] rounded-md focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-shadow text-[#1A1C1E] font-iBMPlexSans"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#43474F] font-iBMPlexSans tracking-wide">PERAN (ROLE)</label>
                                <select 
                                    value={formData.role}
                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                    className="px-4 py-2.5 text-sm border border-[#C3C6D1] rounded-md focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-shadow bg-white text-[#1A1C1E] font-iBMPlexSans cursor-pointer"
                                >
                                    <option value="admin">Administrator</option>
                                    <option value="operator">Operator (Agent)</option>
                                    <option value="teknisi">Teknisi</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-[#43474F] font-iBMPlexSans tracking-wide">DEPARTEMEN / LAYANAN</label>
                                <select 
                                    value={formData.dept_id}
                                    onChange={e => setFormData({...formData, dept_id: e.target.value})}
                                    className="px-4 py-2.5 text-sm border border-[#C3C6D1] rounded-md focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-shadow bg-white text-[#1A1C1E] font-iBMPlexSans cursor-pointer"
                                >
                                    <option value="">Pilih Departemen...</option>
                                    {departments.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                    <button 
                        type="button"
                        onClick={cancelEdit}
                        disabled={isSaving}
                        className="px-5 py-2 text-sm font-semibold text-[#43474F] border border-[#C3C6D1] bg-white hover:bg-gray-50 rounded-md transition-colors disabled:opacity-50 font-iBMPlexSans cursor-pointer"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit"
                        disabled={isSaving}
                        className="px-5 py-2 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-blue-900 rounded-md transition-colors disabled:opacity-70 flex items-center gap-2 font-iBMPlexSans shadow-sm cursor-pointer"
                    >
                        {isSaving ? (
                            <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Menyimpan...</>
                        ) : 'Simpan Perubahan'}
                    </button>
                </div>
            </form>
        ) : (
            <div className="flex flex-col md:flex-row gap-8 w-full">
                <div className="w-24 h-24 rounded-full bg-[#E5EDFF] text-[#1E3A8A] flex items-center justify-center text-[40px] font-bold shrink-0">
                    {staff.name?.charAt(0)?.toUpperCase()}
                </div>
                
                <div className="flex flex-col justify-center flex-1 w-full gap-5 pr-4 md:border-r border-gray-100">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold text-[#1A1C1E] font-iBMPlexSans">{staff.name}</h2>
                        <p className="text-[#43474F] font-medium text-sm font-iBMPlexSans">{staff.email} • {staff.dept?.name || '-'}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 w-full pt-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider font-iBMPlexSans">No. WhatsApp</span>
                            <span className="text-[15px] font-semibold text-[#1A1C1E] font-iBMPlexSans">{staff.phone || '-'}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider font-iBMPlexSans">Peran (Role)</span>
                            <span className="text-[15px] font-semibold text-[#1A1C1E] font-iBMPlexSans uppercase">{staff.role}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider font-iBMPlexSans">Bergabung Sejak</span>
                            <span className="text-[15px] font-semibold text-[#1A1C1E] font-iBMPlexSans">{new Date(staff.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Metric Performa */}
                <div className="flex flex-col justify-center gap-5 shrink-0 min-w-[280px]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-iBMPlexSans">Completion Rate</span>
                    <span className="text-2xl font-black text-[#1E3A8A] font-iBMPlexSans">{completionRate}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-iBMPlexSans">Tiket Selesai</span>
                    <span className="text-xl font-black text-[#1A1C1E] font-iBMPlexSans">{resolvedTickets.length} <span className="text-sm font-medium text-gray-400">/ {tickets.length}</span></span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider font-iBMPlexSans">Rating Rata-Rata</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black text-amber-500 font-iBMPlexSans">{avgRating}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    </div>
                  </div>
                </div>
            </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-[#C3C6D1] shadow-sm flex flex-col overflow-hidden w-full">
        <div className="px-6 py-5 border-b border-[#C3C6D1]">
          <h3 className="text-lg font-bold text-[#1A1C1E] font-iBMPlexSans">Riwayat Tiket ({tickets.length})</h3>
        </div>
        
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-[#43474F] font-medium font-iBMPlexSans">Belum ada tiket yang ditangani.</div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left">
              <thead className="bg-[#F3F3F6] border-b border-[#C3C6D1]">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-[#43474F] tracking-[0.05em] font-iBMPlexSans select-none">NO. TIKET</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#43474F] tracking-[0.05em] font-iBMPlexSans select-none">SUBJECT</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#43474F] tracking-[0.05em] font-iBMPlexSans select-none">KATEGORI</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#43474F] tracking-[0.05em] font-iBMPlexSans select-none">TANGGAL</th>
                  <th className="px-6 py-4 text-xs font-semibold text-[#43474F] tracking-[0.05em] font-iBMPlexSans select-none">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/administrasi/tickets/${t.id}`} className="text-sm font-bold text-[#1E3A8A] hover:underline font-iBMPlexSans">
                        {t.ticket_num || t.ticket_number || '–'}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1A1C1E] truncate max-w-[200px] font-iBMPlexSans">{t.subject}</td>
                    <td className="px-6 py-4 text-sm text-[#43474F] font-iBMPlexSans">{t.category?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-[#43474F] font-iBMPlexSans">{new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
