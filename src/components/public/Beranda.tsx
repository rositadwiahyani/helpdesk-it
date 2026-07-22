'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

const translations = {
  ID: {
    heroTitle: 'Selamat Datang di Pusat Bantuan IT Universitas Diponegoro',
    heroDesc: 'Cari jawabannya sendiri lebih dulu, atau laporkan langsung ke tim kami.',
    placeholder: "Ketik kata kunci, misalnya 'lupa kata sandi SSO'…",
    search: 'Cari',
    report: 'Laporkan kendala',
    reportDesc: 'Ceritakan masalahmu, lampirkan tangkapan layar bila perlu, tim kami akan menindaklanjutinya.',
    track: 'Lacak tiket kamu',
    trackDesc: 'Lihat status serta balasan terbaru dari teknisi tanpa perlu mengingat nomor tiket.',
    selfHelp: 'Cari jawaban sendiri',
    selfHelpDesc: 'Ratusan panduan langkah-demi-langkah untuk masalah yang paling sering terjadi.',
    faqTitle: 'Yang paling sering ditanyakan',
    faqDesc: 'Coba cek dulu di sini, kemungkinan besar jawabannya sudah tersedia.',
    help: 'Butuh bantuan langsung?',
    hours: 'Jam Operasional',
    hoursDesc: 'Senin – Jumat, 08.00 – 16.00 WIB.',
    faqs: [
      { q: "Lupa kata sandi akun SSO Undip, bagaimana cara mengatur ulang?", a: "Buka halaman reset kata sandi SSO, lalu ikuti verifikasi lewat email alternatif atau nomor terdaftar." },
      { q: "Tidak bisa masuk ke email mahasiswa atau dosen (Undip Mail), harus bagaimana?", a: "Periksa dulu apakah kata sandi SSO masih berlaku..." },
      { q: "Kuliah Online (SIAP) tidak bisa diakses, ini kenapa?", a: "Kendala biasanya berasal dari sesi login yang kedaluwarsa atau jaringan tidak stabil." },
      { q: "Berapa lama waktu respons setelah tiket dibuka?", a: "Rata-rata respons awal diberikan dalam 1×24 jam pada hari dan jam kerja." },
      { q: "Bagaimana cara menghubungkan perangkat ke WiFi kampus?", a: "Gunakan kredensial SSO yang sama untuk masuk ke jaringan kampus." }
    ]
  },
  EN: {
    heroTitle: 'Welcome to Diponegoro University IT Help Center',
    heroDesc: 'Find answers yourself first or report your issue directly to our team.',
    placeholder: "Type a keyword, e.g. 'forgot SSO password'...",
    search: 'Search',
    report: 'Report an Issue',
    reportDesc: 'Describe your issue and attach screenshots if necessary. Our IT team will assist you.',
    track: 'Track Your Ticket',
    trackDesc: 'View ticket status and technician responses without remembering your ticket number.',
    selfHelp: 'Find Answers Yourself',
    selfHelpDesc: 'Hundreds of step-by-step guides for the most common IT issues.',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Check here first. Your answer may already be available.',
    help: 'Need Direct Assistance?',
    hours: 'Working Hours',
    hoursDesc: 'Monday – Friday, 08:00 AM – 04:00 PM.',
    faqs: [
      { q: "Forgot Undip SSO account password, how to reset it?", a: "Open the SSO password reset page, then follow the verification via alternative email or registered number." },
      { q: "Cannot log in to student or lecturer email (Undip Mail), what should I do?", a: "First, check if your SSO password is still valid..." },
      { q: "Online Lectures (SIAP) cannot be accessed, why is this?", a: "Issues usually stem from an expired login session or unstable network." },
      { q: "How long is the response time after a ticket is opened?", a: "Average initial response is provided within 1x24 hours on working days and hours." },
      { q: "How do I connect a device to campus WiFi?", a: "Use the same SSO credentials to log in to the campus network." }
    ]
  }
};

export default function Beranda() {
  const router = useRouter();
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sinkronisasi Bahasa
  useEffect(() => {
    const updateLanguage = () => {
      const saved = (localStorage.getItem('language') as 'ID' | 'EN') || 'ID';
      setLanguage(saved);
    };
    updateLanguage();
    window.addEventListener('languageChange', updateLanguage);
    return () => window.removeEventListener('languageChange', updateLanguage);
  }, []);

  // Panggil kamus bahasa
  const t = translations[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      router.push(`/knowledgebase?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleFaq = (index: number) => setActiveFaq(activeFaq === index ? null : index);

  return (
    <>
      <Header />
      <main id="main">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-glow" aria-hidden="true"></div>
          <div className="hero-rays" aria-hidden="true"></div>
          <div className="container hero-inner">
            <h1>{t.heroTitle}</h1>
            <p className="lead">{t.heroDesc}</p>
            
            <form className="search-bar" onSubmit={handleSearch}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.placeholder}
                aria-label="Cari panduan atau pertanyaan" 
              />
              <button type="submit">{t.search}</button>
            </form>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <div className="container quick-wrap">
          <div className="quick-grid">
            
            {/* KARTU 1 */}
            <div className="quick-card animate-pop-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v12H8l-4 4V4Z"/><path d="M8 9h8M8 12h5"/></svg>
              </div>
              <h3>{t.report}</h3>
              <p>{t.reportDesc}</p>
            </div>
            
            {/* KARTU 2 */}
            <div className="quick-card animate-pop-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>
              </div>
              <h3>{t.track}</h3>
              <p>{t.trackDesc}</p>
            </div>
            
            {/* KARTU 3 */}
            <div className="quick-card animate-pop-card">
              <div className="quick-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h9l3 3v13H6V4Z"/><path d="M9 10h6M9 14h6"/></svg>
              </div>
              <h3>{t.selfHelp}</h3>
              <p>{t.selfHelpDesc}</p>
            </div>
          </div>
        </div>

        {/* FAQ & SIDEBAR */}
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 py-12 items-start overflow-visible">
          <section className="lg:col-span-2 mt-20 mb-20" id="faq">
            <div className="section-head reveal is-visible">
              <div>
                <h2 style={{marginTop: '0'}}>{t.faqTitle}</h2>
                <p>{t.faqDesc}</p>
              </div>
            </div>

            <div className="faq-list reveal is-visible">
              {t.faqs.map((faq, index) => (
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

          <aside className="lg:col-span-1 mb-16 lg:mb-0">
            <div className="sticky top-32 mt-50">
              <div className="relative overflow-hidden bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl reveal is-visible text-white">
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600 opacity-20 blur-3xl rounded-full pointer-events-none"></div>
                <h2 style={{marginTop: '0', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white', position: 'relative'}}>{t.help}</h2>
                
                <div className="space-y-6 relative">
                  <div className="flex justify-center">
                    <div className="bg-white p-4 rounded-xl">
                      <Image 
                        src="/HelpDesk IT Undip - Contoh.png" 
                        alt="WhatsApp QR Code" 
                        width={150} 
                        height={150} 
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  </div>
                  <div className="border-t border-slate-700"></div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-blue-400">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.hours}</p>
                      <p className="text-sm text-slate-400">{t.hoursDesc}</p>
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