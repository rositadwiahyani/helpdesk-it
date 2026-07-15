'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Beranda() {
  const router = useRouter();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);

  const handleProtectedAction = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push(path);
    } else {
      router.push('/login');
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <Header />
      <main id="main">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true"></div>
          <div className="hero-rays" aria-hidden="true"></div>
          <div className="container hero-inner">
            <h1>Selamat Datang di Pusat Bantuan IT Universitas Diponegoro</h1>
            <p className="lead">Cari jawabannya sendiri lebih dulu, atau laporkan langsung ke tim kami.</p>
            
            <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input type="text" placeholder="Ketik kata kunci, misalnya 'lupa kata sandi SSO'…" aria-label="Cari panduan atau pertanyaan" />
              <button type="submit">Cari</button>
            </form>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <div className="container quick-wrap">
          <div className="quick-grid">
            
            {/* KARTU 1 - Delay 0.1s */}
            <div 
              className="quick-card cursor-pointer animate-pop-card" 
              style={{ animationDelay: '0.1s' }}
              onClick={(e) => handleProtectedAction(e, '/ticket')}
            >
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 9h8M8 12h5"/></svg>
              </div>
              <h3>Laporkan kendala</h3>
              <p>Ceritakan masalahmu, lampirkan tangkapan layar bila perlu, tim kami akan menindaklanjutinya.</p>
              <a href="#" className="quick-link" onClick={(e) => handleProtectedAction(e, '/ticket')}>Buka tiket <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>
            
            {/* KARTU 2 - Delay 0.3s (Dikasih jeda lebih lama) */}
            <div 
              className="quick-card cursor-pointer animate-pop-card" 
              style={{ animationDelay: '0.3s' }}
              onClick={(e) => handleProtectedAction(e, '/ticket/status')}
            >
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>
              </div>
              <h3>Lacak tiket kamu</h3>
              <p>Lihat status serta balasan terbaru dari teknisi tanpa perlu mengingat nomor tiket.</p>
              <a href="#" className="quick-link" onClick={(e) => handleProtectedAction(e, '/ticket/status')}>Cek status <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>
            
            {/* KARTU 3 - Delay 0.5s (Paling terakhir) */}
            <div 
              className="quick-card cursor-pointer animate-pop-card" 
              style={{ animationDelay: '0.5s' }}
              onClick={(e) => handleProtectedAction(e, '/knowledgebase')}
            >
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h9l3 3v13H6V4Z"/><path d="M9 10h6M9 14h6"/></svg>
              </div>
              <h3>Cari jawaban sendiri</h3>
              <p>Ratusan panduan langkah-demi-langkah untuk masalah yang paling sering terjadi.</p>
              <a href="#" className="quick-link" onClick={(e) => handleProtectedAction(e, '/knowledgebase')}>Jelajahi basis pengetahuan <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>

          </div>
        </div>

        {/* CONTAINER GRID: FAQ & SIDEBAR (ITEMS-START PENTING BIAR STICKY ANTENG) */}
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 py-12 items-start overflow-visible">
          
          {/* KOLOM KIRI: FAQ */}
          {/* Tambahin 'mb-20' di sini biar punya jarak bawah */}
          <section className="lg:col-span-2 mt-20 mb-20" id="faq">
            <div className="section-head reveal is-visible">
              <div>
                <h2 style={{marginTop: '0'}}>Yang paling sering ditanyakan</h2>
                <p>Coba cek dulu di sini, kemungkinan besar jawabannya sudah tersedia.</p>
              </div>
            </div>

            <div className="faq-list reveal is-visible">
              {/* ... isi FAQ kamu tetap sama ... */}
              {[
                { q: "Lupa kata sandi akun SSO Undip, bagaimana cara mengatur ulang?", a: "Buka halaman reset kata sandi SSO, lalu ikuti verifikasi lewat email alternatif atau nomor terdaftar." },
                { q: "Tidak bisa masuk ke email mahasiswa atau dosen (Undip Mail), harus bagaimana?", a: "Periksa dulu apakah kata sandi SSO masih berlaku..." },
                { q: "Kuliah Online (SIAP) tidak bisa diakses, ini kenapa?", a: "Kendala biasanya berasal dari sesi login yang kedaluwarsa atau jaringan tidak stabil." },
                { q: "Berapa lama waktu respons setelah tiket dibuka?", a: "Rata-rata respons awal diberikan dalam 1×24 jam pada hari dan jam kerja." },
                { q: "Bagaimana cara menghubungkan perangkat ke WiFi kampus?", a: "Gunakan kredensial SSO yang sama untuk masuk ke jaringan kampus." }
              ].map((faq, index) => (
                <div key={index} className="faq-item" data-open={activeFaq === index}>
                  <button className="faq-q" onClick={() => toggleFaq(index)}>
                    {faq.q}
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <div className="faq-a">
                    <div className="faq-a-inner"><p>{faq.a}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* KOLOM KANAN: SIDEBAR BANTUAN (MOBILE-FIXED) */}
          <aside className="lg:col-span-1 mb-16 lg:mb-0">
            <div className="sticky top-32 mt-[232px]">
              <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl reveal is-visible text-white">
                
                {/* EFEK GLOW */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600 opacity-20 blur-3xl rounded-full pointer-events-none"></div>
                
                <h2 style={{marginTop: '0', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white', position: 'relative'}}>Butuh bantuan langsung?</h2>
                
                <div className="space-y-6 relative">
                  {/* WhatsApp QR */}
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl">
                      <Image 
                        src="/HelpDesk IT Undip - Contoh.png" 
                        alt="WhatsApp QR Code" 
                        width={150} 
                        height={150} 
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-700"></div>

                  {/* Jam Operasional */}
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-blue-400">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Jam Operasional</p>
                      <p className="text-sm text-slate-400">Senin – Jumat, 08.00 – 16.00 WIB.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          </div>
      </main>
      <Footer />
    </>
  );
}