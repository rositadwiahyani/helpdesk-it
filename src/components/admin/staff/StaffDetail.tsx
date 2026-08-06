'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import StatusBadge from '@/components/admin/tickets/StatusBadge';

export default function StaffDetail({ staffId }: { staffId: string }) {
  const [staff, setStaff] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const decodedId = decodeURIComponent(staffId);
        const { data: staffData, error } = await supabase
          .from('staff_profiles')
          .select('*, dept:departments(name)')
          .eq('id', decodedId)
          .maybeSingle();

        if (error) {
           console.error("Error fetching staff:", error);
           setStaff({ error: error.message }); // trick to render error
           return;
        }

        if (staffData) {
          setStaff(staffData);
          
          const { data: ticketsData } = await supabase
            .from('tickets')
            .select('*, category:categories(name)')
            .eq('tech_id', staffId)
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

  if (isLoading) {
    return (
      <div className="p-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-48 bg-gray-200 rounded-xl"></div>
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
  
  // Simulasi rating karena kolom rating mungkin belum diisi/diimplementasi sepenuhnya di database
  const ticketsWithRating = tickets.filter(t => t.rating != null);
  const avgRating = ticketsWithRating.length > 0 
    ? (ticketsWithRating.reduce((acc, t) => acc + t.rating, 0) / ticketsWithRating.length).toFixed(1) 
    : '5.0'; // Default 5.0 jika belum ada rating masuk
    
  const completionRate = tickets.length > 0 ? ((resolvedTickets.length / tickets.length) * 100).toFixed(0) : '0';

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 p-6 md:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-1">
          <Link href="/dashboard/administrasi/staff" className="hover:text-gray-900 transition-colors">
            Manajemen Staf
          </Link>
          <span>/</span>
          <span className="text-gray-900">Detail Staf</span>
        </div>
        <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight">Profil Staf & Performa</h1>
      </div>

      {/* Identitas & Statistik Singkat */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="w-24 h-24 rounded-full bg-slate-800 text-white flex items-center justify-center text-4xl font-bold shrink-0">
          {staff.name?.charAt(0)?.toUpperCase()}
        </div>
        
        <div className="flex flex-col justify-center flex-1 pr-4 md:border-r border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{staff.name}</h2>
          <p className="text-gray-500 font-medium mb-4">{staff.email} • {staff.dept?.name || '-'}</p>
          
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Peran (Role)</span>
              <span className="text-sm font-semibold text-gray-800 uppercase">{staff.role}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bergabung Sejak</span>
              <span className="text-sm font-semibold text-gray-800">{new Date(staff.created_at).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        {/* Metric Performa */}
        <div className="flex flex-col justify-center flex-1 gap-4 shrink-0 min-w-[250px]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Completion Rate</span>
            <span className="text-xl font-black text-blue-600">{completionRate}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Tiket Diselesaikan</span>
            <span className="text-xl font-black text-gray-900">{resolvedTickets.length} <span className="text-sm font-medium text-gray-400">/ {tickets.length}</span></span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Rata-rata Rating</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-amber-500">{avgRating}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Riwayat Penanganan Tiket</h3>
        </div>
        
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">Belum ada tiket yang ditugaskan ke staf ini.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#EEEEF0] border-b border-[#C3C6D1]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">NO. TIKET</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">SUBJECT</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">KATEGORI</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">TANGGAL</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">RATING</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(t => (
                  <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/administrasi/tickets/${t.id}`} className="text-sm font-bold text-blue-600 hover:underline">
                        {t.ticket_num || t.ticket_number || '–'}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-[200px]">{t.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{t.category?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(t.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      {t.rating ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          {t.rating} <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium">-</span>
                      )}
                    </td>
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
