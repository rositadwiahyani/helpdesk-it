'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Data simulasi status tiket user
const SIMULASI_TIKET = [
  {
    code: 'TKT-20260710-904',
    topic: 'Gangguan WiFi Kampus / Eduroam',
    date: '10 Juli 2026, 09:12 WIB',
    status: 'In Progress',
    statusColor: 'bg-amber-50 text-amber-700 border-amber-200',
    statusText: 'Sedang Diproses',
    desc: 'Tidak bisa terhubung ke jaringan eduroam di lantai 2 Gedung Kuliah Bersama.'
  },
  {
    code: 'TKT-20260703-112',
    topic: 'Masalah Akun SSO & Kata Sandi',
    date: '03 Juli 2026, 14:45 WIB',
    status: 'Solved',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    statusText: 'Selesai',
    desc: 'Permintaan reset password SSO mahasiswa karena email alternatif tidak aktif.'
  }
];

export default function TicketStatusPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Dashboard */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Status Aduan Saya</h1>
              <p className="text-gray-500 mt-1">Daftar laporan aktif dan riwayat penyelesaian masalah IT Anda.</p>
            </div>
            <Link href="/ticket" className="inline-flex justify-center items-center py-2.5 px-5 bg-[var(--gold)] hover:bg-[var(--gold-dim)] text-white font-bold rounded-xl transition-all shadow-sm text-sm">
              + Buka Tiket Baru
            </Link>
          </div>

          {/* List Card Tiket */}
          <div className="space-y-4">
            {SIMULASI_TIKET.map((tiket) => (
              <div key={tiket.code} className="bg-white p-5 md:p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-gray-200 transition-all">
                
                {/* Informasi Konten */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-bold tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">{tiket.code}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tiket.statusColor}`}>
                      {tiket.statusText}
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{tiket.topic}</h2>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{tiket.desc}</p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>Dilaporkan pada: {tiket.date}</span>
                  </div>
                </div>

                {/* Tombol Detail */}
                <div className="border-t md:border-t-0 pt-4 md:pt-0 flex justify-end">
                  <button className="w-full md:w-auto py-2.5 px-5 text-sm font-bold text-[var(--gold-dim)] border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    Lihat Detail Riwayat
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}