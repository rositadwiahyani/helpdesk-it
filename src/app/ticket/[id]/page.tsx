'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Simulasi data (nanti ini bisa diambil dari API/Database)
const MOCK_TICKETS: any = {
  'TKT-20260710-904': {
    title: 'Gangguan WiFi Kampus / Eduroam',
    status: 'diproses',
    desc: 'Tidak bisa terhubung ke jaringan eduroam di lantai 2 Gedung Kuliah Bersama. Sudah mencoba forget network tapi tetap tidak bisa.',
    logs: [
      { date: '10 Juli 2026, 09:12', msg: 'Tiket dibuat oleh user.', status: 'dibuat' },
      { date: '10 Juli 2026, 10:30', msg: 'Admin IT menerima tiket dan sedang mengecek AP di lantai 2.', status: 'diproses' }
    ]
  },
  'TKT-20260703-112': {
    title: 'Masalah Akun SSO & Kata Sandi',
    status: 'selesai',
    desc: 'Permintaan reset password SSO mahasiswa karena email alternatif tidak aktif.',
    logs: [
      { date: '03 Juli 2026, 14:45', msg: 'Tiket dibuat oleh user.', status: 'dibuat' },
      { date: '04 Juli 2026, 08:00', msg: 'Password berhasil direset oleh tim sistem.', status: 'selesai' }
    ]
  }
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id as string;
  const ticket = MOCK_TICKETS[ticketId];

  if (!ticket) return <div className="p-10 text-center">Tiket tidak ditemukan!</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Nav Kembali - SUDAH DIPERBAIKI JADI /status */}
       <Link href="/ticket/status" className="flex items-center text-gray-500 hover:text-[var(--gold)] mb-6 font-medium">
  &larr; Kembali ke Status Tiket
</Link>

        {/* Card Utama */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-mono bg-gray-100 px-3 py-1 rounded-full text-gray-500">{ticketId}</span>
              <h1 className="text-2xl font-bold text-[var(--ink)] mt-2">{ticket.title}</h1>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase ${
              ticket.status === 'diproses' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {ticket.status}
            </span>
          </div>
          
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl">{ticket.desc}</p>
        </div>

        {/* Timeline */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-lg mb-6">Riwayat Status</h2>
          <div className="space-y-6">
            {ticket.logs.map((log: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-[var(--gold)]"></div>
                  {idx !== ticket.logs.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold text-[var(--ink)]">{log.msg}</p>
                  <p className="text-xs text-gray-400 mt-1">{log.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}