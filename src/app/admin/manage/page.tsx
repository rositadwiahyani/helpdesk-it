'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function ManagePage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Kelola Lanjutan (Manage)</h2>
          <p className="text-[var(--text-dim)] text-sm">Alat administratif tambahan dan pengelolaan data masif.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder Cards for Manage Actions */}
          <div className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm flex flex-col gap-3 hover:border-[var(--gold-soft)] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            </div>
            <h3 className="font-bold text-[16px] text-[var(--ink)]">Ekspor Laporan</h3>
            <p className="text-[13px] text-[var(--text-dim)]">Unduh data tiket, SLA, dan kinerja bulanan ke dalam format Excel atau PDF.</p>
          </div>
          
          <div className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm flex flex-col gap-3 hover:border-[var(--gold-soft)] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="font-bold text-[16px] text-[var(--ink)]">Arsip Tiket Lama</h3>
            <p className="text-[13px] text-[var(--text-dim)]">Pindahkan tiket yang berumur lebih dari 1 tahun ke database arsip untuk optimalisasi performa.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm flex flex-col gap-3 hover:border-[var(--gold-soft)] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <h3 className="font-bold text-[16px] text-[var(--ink)]">Log Sistem (API)</h3>
            <p className="text-[13px] text-[var(--text-dim)]">Lihat catatan interaksi antara server dengan layanan pihak ketiga (SSO, SMTP, dll).</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
