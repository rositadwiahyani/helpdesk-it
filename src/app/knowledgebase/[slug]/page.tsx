'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

// 1. DATABASE DUMMY (Nanti ini diganti pakai Supabase)
const ARTIKEL_DB: Record<string, any> = {
  'reset-sso': {
    title: 'Cara Mengatur Ulang Kata Sandi SSO',
    category: 'Akun & SSO',
    date: '10 Juli 2026',
    content: (
      <>
        <p>Jika Anda lupa kata sandi Single Sign-On (SSO) Undip, jangan panik. Anda bisa meresetnya sendiri melalui portal resmi tanpa perlu datang ke gedung IT.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Langkah-langkah:</h3>
        <ol className="list-decimal list-inside space-y-3">
          <li>Buka halaman <a href="#" className="text-[var(--gold-dim)] hover:underline">sso.undip.ac.id/lupa-password</a>.</li>
          <li>Masukkan NIM atau NIP Anda yang terdaftar.</li>
          <li>Sistem akan mengirimkan tautan (link) reset ke <strong>Email Alternatif</strong> yang Anda daftarkan saat mahasiswa baru.</li>
          <li>Buka kotak masuk email alternatif Anda, klik tautan tersebut.</li>
          <li>Buat kata sandi baru (minimal 8 karakter, kombinasi huruf dan angka).</li>
        </ol>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6 rounded-r-lg">
          <p className="text-sm text-yellow-800"><strong>Penting:</strong> Jika email alternatif Anda sudah tidak aktif, Anda wajib membuka Tiket Bantuan kategori "Akun & SSO" agar diverifikasi manual oleh admin.</p>
        </div>
      </>
    )
  },
  'wifi-eduroam': {
    title: 'Panduan Login WiFi Eduroam di Windows & Mac',
    category: 'Jaringan & WiFi',
    date: '08 Juli 2026',
    content: (
      <>
        <p>Eduroam adalah jaringan nirkabel internasional yang tersedia di seluruh area kampus Undip. Berikut cara menghubungkan perangkat Anda.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Untuk Pengguna Windows/Mac:</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>Nyalakan WiFi dan cari SSID bernama <strong>eduroam</strong>.</li>
          <li>Klik Connect. Sebuah jendela login akan muncul.</li>
          <li>Pada kolom <em>Username</em>, masukkan email Undip Anda (contoh: <code>budi@students.undip.ac.id</code>).</li>
          <li>Pada kolom <em>Password</em>, masukkan kata sandi SSO Anda.</li>
          <li>Jika muncul peringatan sertifikat keamanan (Certificate Warning), klik <strong>Accept / Continue / Trust</strong>.</li>
        </ul>
      </>
    )
  },
  'error-krs': {
    title: 'Solusi Tombol Pengisian KRS Tidak Muncul di SIAP',
    category: 'Sistem Akademik',
    date: '05 Juli 2026',
    content: (
      <>
        <p>Seringkali mahasiswa mengalami kendala tombol "Isi KRS" tidak bisa diklik atau hilang dari menu SIAP. Ini penyebab dan solusinya.</p>
        <h3 className="text-xl font-bold mt-6 mb-3">Penyebab Umum:</h3>
        <ul className="list-disc list-inside space-y-3">
          <li>Status pembayaran UKT Anda belum terverifikasi oleh sistem keuangan.</li>
          <li>Belum masuk masa pengisian KRS sesuai kalender akademik.</li>
          <li>Gagal sinkronisasi data (*cache* browser menumpuk).</li>
        </ul>
        <h3 className="text-xl font-bold mt-6 mb-3">Cara Mengatasi:</h3>
        <p>Pertama, cobalah akses web SIAP menggunakan mode <strong>Incognito/Private Browser</strong>. Jika tombol tetap tidak ada padahal Anda sudah membayar UKT, segera buat Tiket Bantuan dengan melampirkan bukti bayar agar disinkronisasi ulang oleh tim kami.</p>
      </>
    )
  }
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  
  // Ambil data artikel berdasarkan slug dari URL
  const article = ARTIKEL_DB[params.slug];

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      router.push('/login');
    }
  }, [router]);

  // Kalau slug ngawur / gak ada di database, tampilin error
  if (!article) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Artikel Tidak Ditemukan</h1>
            <Link href="/knowledgebase" className="text-[var(--gold)] hover:underline">&larr; Kembali ke Pusat Pengetahuan</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Desain Halaman Artikel
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/60 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          
          {/* Header Artikel */}
          <div className="px-8 pt-10 pb-6 border-b border-gray-100">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-6 uppercase tracking-wider">
              <Link href="/knowledgebase" className="hover:text-[var(--gold)]">Knowledgebase</Link>
              <span>/</span>
              <span className="text-gray-600">{article.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">{article.title}</h1>
            
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Diperbarui: {article.date}
            </div>
          </div>

          {/* Isi Artikel */}
          <div className="p-8 md:p-10 text-gray-700 leading-relaxed text-lg">
            {article.content}
          </div>

          {/* Fitur Rating Artikel */}
          <div className="bg-gray-50 p-8 text-center border-t border-gray-100">
            <p className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wider">Apakah artikel ini membantu?</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl hover:border-green-500 hover:text-green-600 font-medium transition-all shadow-sm">
                👍 Ya, sangat membantu
              </button>
              <button className="px-6 py-2 bg-white border border-gray-200 rounded-xl hover:border-red-500 hover:text-red-600 font-medium transition-all shadow-sm">
                👎 Tidak membantu
              </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}