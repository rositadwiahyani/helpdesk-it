'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TicketForm() {
  const router = useRouter();
  // State user sekarang mencakup nimNip dan unit
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    nimNip: '', 
    unit: '' 
  });

  useEffect(() => {
    // Ambil data dari localStorage
    const savedUser = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Mapping data dari RegisterPage ke state TicketForm
    setUser({
      name: savedUser.fullName || '-',
      email: savedUser.email || '-',
      phone: savedUser.phoneNumber || '-',
      nimNip: savedUser.nimNip || '-',
      unit: savedUser.unit || '-'
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Tiket aduan Anda berhasil dibuat!");
    router.push('/ticket/status');
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION: DATA PELAPOR */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Data Pelapor (Otomatis)</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Baris 1 */}
            <div className="field">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Nama Lengkap</label>
              <input type="text" value={user.name} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed outline-none" />
            </div>
            <div className="field">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">NIM / NIP</label>
              <input type="text" value={user.nimNip} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed outline-none" />
            </div>

            {/* Baris 2 */}
            <div className="field">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Email Civitas</label>
              <input type="email" value={user.email} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed outline-none" />
            </div>
            <div className="field">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Unit / Fakultas</label>
              <input type="text" value={user.unit} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed outline-none" />
            </div>

            {/* Baris 3 (Full Width) */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Nomor Kontak / WA</label>
              <input type="tel" value={user.phone} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-400 font-medium cursor-not-allowed outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION: DETAIL MASALAH */}
        <div>
          <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
            <div className="w-1 h-5 bg-[var(--gold)] rounded-full"></div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Detail Aduan</h3>
          </div>
          
          <div className="space-y-5">
            <div className="field">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Topik Bantuan (Help Topic) <span className="text-red-500">*</span></label>
              <select required className="w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-[var(--gold)]/20 focus:border-[var(--gold)] outline-none transition-all shadow-sm">
                <option value="">-- Pilih Kategori Kendala --</option>
                <option value="sso">Masalah Akun SSO & Kata Sandi</option>
                <option value="wifi">Gangguan WiFi Kampus / Eduroam</option>
                <option value="siap">Aplikasi SIAP / Registrasi KRS</option>
                <option value="email">Layanan Email Undip Mail</option>
                <option value="hardware">Kerusakan Perangkat Keras / Laboratorium</option>
              </select>
            </div>

            <div className="field">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Penjelasan Detail Kendala <span className="text-red-500">*</span></label>
              <textarea rows={5} placeholder="Tuliskan kronologi masalah Anda secara rinci..." required className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--gold)]/20 focus:border-[var(--gold)] outline-none transition-all resize-none shadow-sm"></textarea>
            </div>
          </div>
        </div>

        {/* TOMBOL AKSI */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button type="submit" className="flex-1 py-3.5 bg-[var(--ink)] hover:bg-[var(--ink)]/90 text-white font-bold rounded-xl transition-all shadow-md">
            Kirim Laporan
          </button>
          <button type="button" onClick={() => router.push('/ticket/status')} className="sm:w-1/3 py-3.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all text-center">
            Cek Status Tiket
          </button>
        </div>

      </form>
    </div>
  );
}