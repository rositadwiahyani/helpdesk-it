'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <div className="quick-grid reveal is-visible">
            <div className="quick-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 9h8M8 12h5"/></svg>
              </div>
              <h3>Laporkan kendala</h3>
              <p>Ceritakan masalahmu, lampirkan tangkapan layar bila perlu, tim kami akan menindaklanjutinya.</p>
              <a href="#" className="quick-link">Buka tiket <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>
            <div className="quick-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>
              </div>
              <h3>Lacak tiket kamu</h3>
              <p>Masukkan nomor tiket dan email untuk melihat status serta balasan terbaru.</p>
              <a href="#" className="quick-link" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Cek status <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>
            <div className="quick-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h9l3 3v13H6V4Z"/><path d="M9 10h6M9 14h6"/></svg>
              </div>
              <h3>Cari jawaban sendiri</h3>
              <p>Ratusan panduan langkah-demi-langkah untuk masalah yang paling sering terjadi.</p>
              <a href="#kb" className="quick-link">Jelajahi basis pengetahuan <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <section className="section" id="faq">
          <div className="container">
            <div className="section-head reveal is-visible">
              <div>
                <span className="eyebrow" style={{color: 'var(--gold-dim)'}}>Sebelum membuka tiket</span>
                <h2 style={{marginTop: '12px'}}>Yang paling sering ditanyakan</h2>
                <p>Coba cek dulu di sini, kemungkinan besar jawabannya sudah tersedia.</p>
              </div>
            </div>

            <div className="faq-list reveal is-visible">
              {[
                { q: "Lupa kata sandi akun SSO Undip, bagaimana cara mengatur ulang?", a: "Buka halaman reset kata sandi SSO, lalu ikuti verifikasi lewat email alternatif atau nomor terdaftar. Jika verifikasi gagal, ajukan tiket pada kategori “Akun & Kata Sandi” agar diverifikasi manual oleh tim kami." },
                { q: "Tidak bisa masuk ke email mahasiswa atau dosen (Undip Mail), harus bagaimana?", a: "Periksa dulu apakah kata sandi SSO masih berlaku, karena Undip Mail memakai kredensial yang sama. Bila status akun aktif namun tetap gagal masuk, laporkan lewat tiket kategori “Email” disertai tangkapan layar pesan kesalahan." },
                { q: "Kuliah Online (SIAP) tidak bisa diakses, ini kenapa?", a: "Kendala biasanya berasal dari sesi login yang kedaluwarsa atau jaringan yang tidak stabil. Coba akses lewat mode penyamaran (incognito) terlebih dahulu; jika masih gagal, laporkan lewat kategori “Sistem Akademik” dengan menyertakan waktu kejadian." },
                { q: "Berapa lama waktu respons setelah tiket dibuka?", a: "Rata-rata respons awal diberikan dalam 1×24 jam pada hari dan jam kerja. Tiket dengan prioritas mendesak, seperti gangguan yang berdampak pada ujian, ditangani lebih dahulu." },
                { q: "Bagaimana cara menghubungkan perangkat ke WiFi kampus?", a: "Gunakan kredensial SSO yang sama untuk masuk ke jaringan kampus, lalu pilih profil eduroam bila tersedia di lokasi kamu. Panduan konfigurasi per perangkat tersedia lengkap di kategori “Jaringan & WiFi”." }
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
          </div>
        </section>

        {/* KNOWLEDGE BASE */}
        <section className="section section-alt" id="kb">
          <div className="container">
            <div className="section-head reveal is-visible">
              <div>
                <span className="eyebrow" style={{color: 'var(--gold-dim)'}}>Basis pengetahuan</span>
                <h2 style={{marginTop: '12px'}}>Jelajahi panduan berdasarkan topik</h2>
                <p>Semua artikel ditulis singkat dan langsung ke langkah penyelesaiannya.</p>
              </div>
            </div>

            <div className="kb-searchrow reveal is-visible">
              <div className="kb-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
                <input type="text" id="kb-search" placeholder="Cari kategori atau topik…" aria-label="Cari kategori basis pengetahuan" />
              </div>
            </div>

            <div className="kb-grid reveal is-visible" id="kb-grid">
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div><span className="kb-count">24 artikel</span></div>
                <h3>Akun &amp; Kata Sandi (SSO)</h3>
                <p>Aktivasi akun, atur ulang kata sandi, dan verifikasi identitas.</p>
              </div>
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div><span className="kb-count">18 artikel</span></div>
                <h3>Email Undip</h3>
                <p>Konfigurasi email, kuota penyimpanan, dan pemulihan akses.</p>
              </div>
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg></div><span className="kb-count">31 artikel</span></div>
                <h3>Sistem Akademik (SIAP/SIA)</h3>
                <p>Kendala KRS, transkrip nilai, dan input rencana studi.</p>
              </div>
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19V6a2 2 0 0 1 2-2h9l5 5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"/><path d="M9 14l2 2 4-4"/></svg></div><span className="kb-count">27 artikel</span></div>
                <h3>E-Learning (Kuliah Online)</h3>
                <p>Unggah tugas, akses materi, dan kendala ujian daring.</p>
              </div>
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8.5a17 17 0 0 1 20 0M5.5 12a12 12 0 0 1 13 0M9 15.5a7 7 0 0 1 6 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/></svg></div><span className="kb-count">15 artikel</span></div>
                <h3>Jaringan &amp; WiFi Kampus</h3>
                <p>Koneksi eduroam, VPN, dan pemetaan area jangkauan.</p>
              </div>
              <div className="kb-card">
                <div className="kb-top"><div className="kb-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></div><span className="kb-count">12 artikel</span></div>
                <h3>Perangkat &amp; Perangkat Lunak</h3>
                <p>Instalasi aplikasi kampus dan pengaturan perangkat kerja.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className="section-head reveal is-visible">
              <div>
                <span className="eyebrow" style={{color: 'var(--gold-dim)'}}>Kanal langsung</span>
                <h2 style={{marginTop: '12px'}}>Butuh bantuan langsung?</h2>
                <p>Kalau basis pengetahuan belum menjawab, tim kami siap dihubungi lewat kanal berikut.</p>
              </div>
            </div>
            <div className="contact-grid reveal is-visible">
              <div className="contact-card">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3 20l1.02-5.4A8.5 8.5 0 1 1 21 11.5Z"/></svg></div>
                <h3>WhatsApp Helpdesk</h3>
                <p>Untuk respons tercepat pada jam kerja.</p>
                <a href="#" className="value">+62 812-xxxx-xxxx</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>
                <h3>Email Resmi</h3>
                <p>Cocok untuk kendala yang perlu lampiran berkas.</p>
                <a href="mailto:helpdesk@undip.ac.id" className="value">helpdesk@undip.ac.id</a>
              </div>
              <div className="contact-card">
                <div className="contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
                <h3>Jam Operasional</h3>
                <p>Senin – Jumat, 08.00 – 16.00 WIB.</p>
                <a href="#" className="value">Di luar jam ini → tiket tertulis</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* MODAL STATUS TIKET */}
      <div className={`modal-overlay ${isModalOpen ? 'is-open' : ''}`} onClick={(e) => { if((e.target as HTMLElement).className.includes('modal-overlay')) setIsModalOpen(false) }}>
        <div className="modal">
          <div className="modal-head">
            <h3>Cek status tiket</h3>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
            </button>
          </div>
          <form className="mt-4">
            <div className="field">
              <label>Nomor tiket</label>
              <input type="text" placeholder="mis. 480219" required />
            </div>
            <button type="submit" className="btn btn-gold mt-4" style={{width: '100%'}}>Lihat status</button>
          </form>
        </div>
      </div>
    </>
  );
}