'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';
import Link from 'next/link';

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  // Dummy detail
  const ticketId = params.id || 'TKT-001';

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header Breadcrumb & Title */}
        <div>
          <div className="text-[13px] text-[var(--text-dim)] mb-2 font-medium">
            <Link href="/admin/tickets" className="hover:text-[var(--gold)]">Tickets</Link> / 
            <span className="text-[var(--ink)] font-bold ml-1">{ticketId}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-[var(--ink)]">Gangguan eduroam Gedung A</h2>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              BARU
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Discussion Thread */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 border-b border-[var(--line-dark)] pb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--paper-2)] flex items-center justify-center font-bold text-gray-500">BS</div>
                <div>
                  <h4 className="font-semibold text-[14.5px]">Budi Santoso</h4>
                  <p className="text-[12px] text-[var(--text-dim)]">14 Jul 2026, 09:12 WIB</p>
                </div>
              </div>
              <p className="text-[14px] text-[var(--text-dim)] leading-relaxed">
                Halo tim IT, sejak pagi saya tidak bisa terhubung ke eduroam di sekitar lobi Gedung A. Koneksi sering terputus sendiri padahal password sudah benar. Mohon bantuannya, terima kasih.
              </p>
            </div>
            
            {/* Reply Box (Placeholder) */}
            <div className="bg-[var(--paper)] rounded-2xl border border-[var(--line)] p-6">
              <h3 className="font-semibold text-[15px] mb-3">Beri Tanggapan</h3>
              <textarea 
                rows={4} 
                className="w-full bg-white border border-[var(--line-dark)] rounded-xl p-3 text-[14px] focus:outline-none focus:border-[var(--gold)] mb-3"
                placeholder="Tulis balasan atau catatan internal..."
              ></textarea>
              <div className="flex justify-end gap-2">
                <button className="bg-white text-[var(--ink)] border border-[var(--line)] px-4 py-2 rounded-xl text-sm font-bold hover:bg-[var(--paper-2)]">Kirim sebagai Catatan</button>
                <button className="bg-[var(--gold)] text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-[var(--gold-dim)]">Balas Pelapor</button>
              </div>
            </div>
          </div>

          {/* Sidebar Meta Info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-[var(--line)] p-5 shadow-sm">
              <h3 className="font-bold text-[14px] text-[var(--ink)] border-b border-[var(--line-dark)] pb-3 mb-3">Informasi Tiket</h3>
              <ul className="text-[13px] flex flex-col gap-3">
                <li className="flex flex-col"><span className="text-[var(--text-dim)] text-[11px] uppercase tracking-wide">ID Tiket</span> <span className="font-bold">{ticketId}</span></li>
                <li className="flex flex-col"><span className="text-[var(--text-dim)] text-[11px] uppercase tracking-wide">Departemen</span> <span className="font-semibold">Infrastruktur Jaringan</span></li>
                <li className="flex flex-col"><span className="text-[var(--text-dim)] text-[11px] uppercase tracking-wide">Topik Bantuan</span> <span className="font-semibold">Jaringan & WiFi</span></li>
                <li className="flex flex-col"><span className="text-[var(--text-dim)] text-[11px] uppercase tracking-wide">SLA Due</span> <span className="font-semibold text-red-500">16 Jul 2026</span></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </AdminLayout>
  );
}
