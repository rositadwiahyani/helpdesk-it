'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Mock data tiket
const TICKETS = [
  { id: 'TKT-20260710-904', title: 'Gangguan WiFi Kampus / Eduroam', desc: 'Tidak bisa terhubung ke jaringan eduroam di lantai 2 Gedung Kuliah Bersama.', status: 'diproses' },
  { id: 'TKT-20260703-112', title: 'Masalah Akun SSO & Kata Sandi', desc: 'Permintaan reset password SSO mahasiswa karena email alternatif tidak aktif.', status: 'selesai' },
];

export default function StatusAduanPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Status Aduan Saya</h1>
              <p className="text-gray-500 mt-2">Daftar laporan aktif dan riwayat masalah IT Anda.</p>
            </div>
            <Link href="/ticket/new" className="inline-block bg-[var(--gold)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--gold-dim)] transition-colors shadow-md hover:shadow-lg">
              <span className="text-white">+ Buka Tiket Baru</span>
            </Link>
          </div>

          {/* Ticket List - Mobile Optimized */}
          <div className="space-y-4">
            {TICKETS.map((ticket) => (
              <div key={ticket.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col gap-3">
                  
                  {/* ID & Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-md tracking-tight">
                      {ticket.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      ticket.status === 'diproses' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>

                  {/* Judul & Deskripsi */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight mb-1">{ticket.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{ticket.desc}</p>
                  </div>

                  {/* Tombol Lihat Detail (Full Width) */}
                  <Link 
                    href={`/ticket/${ticket.id}`} 
                    className="w-full flex items-center justify-center py-3 bg-gray-50 text-gray-800 font-bold text-sm rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all border border-gray-200"
                  >
                    Lihat Detail
                  </Link>
                  
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