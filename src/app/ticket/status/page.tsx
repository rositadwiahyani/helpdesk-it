'use client';
import { useState } from 'react';
import Link from 'next/link';

// Mock data tiket (Nanti bisa diganti ambil dari database)
const TICKETS = [
  { id: 'TKT-20260710-904', title: 'Gangguan WiFi Kampus / Eduroam', desc: 'Tidak bisa terhubung ke jaringan eduroam di lantai 2 Gedung Kuliah Bersama.', status: 'diproses' },
  { id: 'TKT-20260703-112', title: 'Masalah Akun SSO & Kata Sandi', desc: 'Permintaan reset password SSO mahasiswa karena email alternatif tidak aktif.', status: 'selesai' },
];

export default function StatusAduanPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ink)]">Status Aduan Saya</h1>
            <p className="text-[var(--text-dim)]">Daftar laporan aktif dan riwayat penyelesaian masalah IT Anda.</p>
          </div>
          <Link href="/ticket/new" className="inline-block bg-[var(--gold)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--gold-dim)] transition-colors shadow-md hover:shadow-lg">
            <span className="text-white">+ Buka Tiket Baru</span>
          </Link>
        </div>

        {/* Ticket List */}
        <div className="space-y-4">
          {TICKETS.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">{ticket.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'diproses' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ticket.status === 'diproses' ? 'Sedang Diproses' : 'Selesai'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-1">{ticket.title}</h3>
                  <p className="text-sm text-[var(--text-dim)]">{ticket.desc}</p>
                </div>
                
                {/* Tombol yang sudah berfungsi */}
                <Link 
                  href={`/ticket/${ticket.id}`} 
                  className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-center"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}