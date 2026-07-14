'use client';
import AdminLayout from '@/components/admin/layout/AdminLayout';

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Pengaturan Sistem</h2>
          <p className="text-[var(--text-dim)] text-sm">Konfigurasi umum aplikasi HelpIT.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm max-w-3xl">
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--ink)]">Nama Sistem</label>
              <input type="text" defaultValue="Pusat Bantuan IT Universitas Diponegoro" className="w-full bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--ink)]">URL Sistem</label>
              <input type="text" defaultValue="https://helpdesk.undip.ac.id" className="w-full bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--ink)]">Email Pengirim Bawaan (No-Reply)</label>
              <input type="email" defaultValue="noreply@undip.ac.id" className="w-full bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--ink)]">Mode Pemeliharaan (Maintenance)</label>
              <select className="w-full bg-[var(--paper)] border border-[var(--line-dark)] rounded-xl px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--gold-soft)]">
                <option value="off">Matikan (Website Aktif)</option>
                <option value="on">Aktifkan (Website Sedang Perbaikan)</option>
              </select>
            </div>
            <div className="pt-4 border-t border-[var(--line)]">
              <button type="button" className="bg-[var(--gold)] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[var(--gold-dim)] transition-colors">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
