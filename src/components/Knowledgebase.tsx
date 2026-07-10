'use client';
import Link from 'next/link';

// Data kategori (Ini cara modern & rapi biar kode gak kepanjangan)
const CATEGORIES = [
  { slug: 'sso', title: 'Akun & SSO', desc: 'Reset password, aktivasi akun, dan autentikasi.', count: 24, color: 'blue' },
  { slug: 'wifi', title: 'Jaringan & WiFi', desc: 'Koneksi Eduroam, VPN, dan troubleshooting.', count: 18, color: 'green' },
  { slug: 'siap', title: 'Sistem Akademik', desc: 'Kendala SIAP, KRS, dan data nilai.', count: 31, color: 'purple' },
  { slug: 'email', title: 'Email Undip', desc: 'Setup Outlook, webmail, dan penyimpanan.', count: 12, color: 'rose' },
  { slug: 'hardware', title: 'Hardware & Lab', desc: 'Peminjaman alat dan perbaikan perangkat.', count: 19, color: 'amber' },
  { slug: 'software', title: 'Software & Lisensi', desc: 'Microsoft 365, instalasi aplikasi kampus.', count: 28, color: 'teal' },
];

export default function Knowledgebase() {
  return (
    <div className="w-full pb-12">
      {/* HERO SECTION - Tetap kita pertahankan tapi dipercantik */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl p-8 md:p-16 mb-12 border border-gray-100 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Pusat Bantuan IT</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Temukan solusi teknis langsung tanpa menunggu antrean tiket.
        </p>

        {/* Search Bar yang lebih clean */}
        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            placeholder="Cari artikel..." 
            className="w-full p-4 pl-6 pr-16 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--gold)] outline-none"
          />
          <button className="absolute right-2 top-2 p-2 bg-[var(--ink)] text-white rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </div>
      </section>

      {/* GRID KATEGORI (Data Driven) */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link href={`/knowledgebase/${cat.slug}`} key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all group">
              <div className={`w-12 h-12 bg-${cat.color}-50 text-${cat.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {/* Ikon statis untuk contoh, bisa diganti dynamic icon nanti */}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
              <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                <span>{cat.count} Artikel</span>
                <span className="text-[var(--gold-dim)]">Lihat &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mt-16 text-center">
        <p className="text-gray-600 mb-4">Masih tidak menemukan jawaban yang dicari?</p>
        <Link href="/ticket" className="inline-block px-8 py-3 bg-[var(--gold)] text-white font-bold rounded-xl hover:bg-[var(--gold-dim)] transition-colors">
          Buka Tiket Aduan Sekarang
        </Link>
      </section>
    </div>
  );
}