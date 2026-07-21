'use client';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// Data kategori
const CATEGORIES = [
  { slug: 'sso', title: 'Akun & SSO', desc: 'Reset password, aktivasi akun, dan autentikasi.', count: 24, color: 'blue' },
  { slug: 'wifi', title: 'Jaringan & WiFi', desc: 'Koneksi Eduroam, VPN, dan troubleshooting.', count: 18, color: 'green' },
  { slug: 'siap', title: 'Sistem Akademik', desc: 'Kendala SIAP, KRS, dan data nilai.', count: 31, color: 'purple' },
  { slug: 'email', title: 'Email Undip', desc: 'Setup Outlook, webmail, dan penyimpanan.', count: 12, color: 'rose' },
  { slug: 'hardware', title: 'Hardware & Lab', desc: 'Peminjaman alat dan perbaikan perangkat.', count: 19, color: 'amber' },
  { slug: 'software', title: 'Software & Lisensi', desc: 'Microsoft 365, instalasi aplikasi kampus.', count: 28, color: 'teal' },
];

// Komponen inti yang menangani logika pencarian
function KnowledgebaseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Menangkap parameter 'q' dari URL jika diarahkan dari Beranda
  const initialQuery = searchParams.get('q') || '';
  
  // State untuk form input dan state untuk query yang sudah di-submit
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  // Jika URL berubah (misal back/forward di browser), sinkronkan state
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
    setActiveQuery(q);
  }, [searchParams]);

  // Fungsi saat form disubmit atau tombol enter ditekan
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
    // Update URL agar pencarian bisa di-share atau direfresh tanpa hilang
    router.push(`/knowledgebase?q=${encodeURIComponent(searchQuery)}`, { scroll: false });
  };

  // Filter kategori berdasarkan judul atau deskripsi
  const filteredCategories = CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
    cat.desc.toLowerCase().includes(activeQuery.toLowerCase())
  );

  return (
    <div className="w-full pb-12">
      {/* HERO SECTION */}
      <section className="relative text-center mb-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 text-center">Pusat Bantuan IT</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto text-center">
          Temukan solusi teknis langsung tanpa menunggu antrean tiket.
        </p>
      </section>

      {/* SEARCH BAR */}
      <section className="relative mb-20 flex justify-center">
        <div className="relative max-w-xl w-full px-4">
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari artikel atau kategori..." 
              className="w-full p-4 pl-6 pr-16 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-[var(--gold)] outline-none"
            />
            <button 
              type="submit"
              className="absolute right-6 top-2.5 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </form>
        </div>
      </section>

      {/* GRID KATEGORI / HASIL PENCARIAN */}
      <section className="max-w-6xl mx-auto px-4">
        {/* Tampilkan indikator hasil pencarian jika sedang mencari */}
        {activeQuery && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Hasil pencarian untuk: <span className="text-[var(--gold)]">"{activeQuery}"</span>
            </h2>
          </div>
        )}

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat, idx) => (
              <Link href={`/knowledgebase/${cat.slug}`} key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[var(--gold)] transition-all group">
                <div className={`w-12 h-12 bg-${cat.color}-50 text-${cat.color}-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400">
                  <span>{cat.count} Artikel</span>
                  <span className="text-[var(--gold)]">Lihat &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE: Muncul ketika pencarian tidak menemukan hasil */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kategori tidak ditemukan</h3>
            
            <p className="text-gray-500 max-w-sm mb-8">
              Coba gunakan kata kunci lain atau periksa kembali ejaan pencarian kamu.
            </p>
            
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveQuery('');
                router.push('/knowledgebase', { scroll: false });
              }}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Hapus Pencarian
            </button>
            
          </div>
        )}
      </section>
    </div>
  );
}

// Ekspor komponen yang dibungkus Suspense agar aman saat di-build Next.js
export default function Knowledgebase() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[var(--gold)] rounded-full animate-spin"></div>
      </div>
    }>
      <KnowledgebaseContent />
    </Suspense>
  );
}