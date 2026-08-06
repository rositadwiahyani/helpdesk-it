'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import StatusBadge from '@/components/admin/tickets/StatusBadge';

export default function UserDetail({ userId }: { userId: string }) {
  const [user, setUser] = useState<any>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const decodedId = decodeURIComponent(userId);
        
        // Coba cari dari id atau phone
        const { data: userData, error: userError } = await supabase
          .from('reporters')
          .select('*')
          .or(`id.eq.${decodedId},phone.eq.${decodedId}`)
          .maybeSingle();

        if (userData) {
          setUser(userData);
          // Cari tiket milik user ini berdasarkan phone atau name
          const { data: ticketsData } = await supabase
            .from('tickets')
            .select('*, category:categories(name)')
            .or(`phone.eq.${userData.phone},reporter_name.ilike.%${userData.name}%`)
            .order('created_at', { ascending: false });
            
          if (ticketsData) setTickets(ticketsData);
        }
      } catch (err) {
        console.error('Error fetching user detail:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="p-8 animate-pulse flex flex-col gap-6">
        <div className="h-10 w-48 bg-gray-200 rounded"></div>
        <div className="h-48 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-16 text-center">
        <h2 className="text-xl font-bold">Pelapor tidak ditemukan</h2>
        <Link href="/dashboard/administrasi/users" className="text-[#0059BB] font-bold mt-2 inline-block hover:underline">
          Kembali ke Manajemen Pengguna
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300 p-6 md:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500 mb-1">
          <Link href="/dashboard/administrasi/users" className="hover:text-gray-900 transition-colors">
            Manajemen Pengguna
          </Link>
          <span>/</span>
          <span className="text-gray-900">Detail Pelapor</span>
        </div>
        <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight">Profil Pelapor</h1>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-4xl font-bold shrink-0">
          {user.name?.charAt(0)?.toUpperCase()}
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-500 font-medium mb-4">{user.nim_nip} • {user.unit || user.reporter_type}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">No. WhatsApp</span>
              <span className="text-sm font-semibold text-gray-800">{user.phone || '-'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status Akun</span>
              <span className="text-sm font-semibold text-gray-800">{user.status}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bergabung Sejak</span>
              <span className="text-sm font-semibold text-gray-800">{new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Tiket Dibuat</span>
              <span className="text-sm font-semibold text-gray-800">{tickets.length} Tiket</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Riwayat Tiket Pelapor</h3>
        </div>
        
        {tickets.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium">Belum ada tiket yang dibuat.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#EEEEF0] border-b border-[#C3C6D1]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">NO. TIKET</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">SUBJECT</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">KATEGORI</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#43474F] tracking-[0.05em]">TANGGAL</th>
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
