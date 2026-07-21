'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // State untuk Bahasa saja
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    setMounted(true);
    
    // Efek Scroll Header
    const handleScroll = () => setIsShrunk(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mengambil preferensi bahasa dari localStorage
    const savedLang = localStorage.getItem('language') as 'ID' | 'EN';
    if (savedLang) {
      setLanguage(savedLang);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNGSI GANTI BAHASA YANG SUDAH DIPERBAIKI (Tidak memicu bentrok render)
  const toggleLanguage = () => {
    const newLang = language === 'ID' ? 'EN' : 'ID';
    setLanguage(newLang); // Update state Header
    localStorage.setItem('language', newLang); // Simpan ke local storage
    window.dispatchEvent(new Event('languageChange')); // Beritahu komponen lain (Beranda & Footer)
  };

  // Teks Dinamis Berdasarkan Bahasa
  const t = {
    home: language === 'ID' ? 'Beranda' : 'Home',
    kb: language === 'ID' ? 'Basis Pengetahuan' : 'Knowledgebase',
    settings: language === 'ID' ? 'Pengaturan' : 'Settings'
  };

  return (
    <header id="site-header" className={`relative ${isShrunk ? 'is-shrunk' : ''} transition-colors duration-300`}>
      <div className="container header-inner relative z-50 flex justify-between items-center">
        
        {/* BAGIAN KIRI: Logo */}
        <Link href="/" className="brand">
          <Image 
            src="/universitas-diponegoro-helpit1.png" 
            alt="Logo" 
            width={150} 
            height={40} 
            style={{ width: 'auto', height: 'auto' }} /* <-- Perbaikan Warning Image */
          />
        </Link>

        {/* BAGIAN KANAN: Navigasi Desktop & Actions */}
        <div className="flex items-center gap-6 ml-auto">
          
          {/* Navigasi Desktop */}
          <nav className="main-nav hidden md:flex items-center gap-6" aria-label="Navigasi utama">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>{t.home}</Link>
            <Link href="/knowledgebase" className={pathname === '/knowledgebase' ? 'active' : ''}>{t.kb}</Link>
          </nav>

          {/* Action Tombol Bahasa & Hamburger */}
          <div className="header-actions flex items-center gap-2">
            
            {/* Tombol Bahasa (Desktop) */}
            <div className="hidden md:flex items-center gap-2 border-l border-white/20 pl-4 ml-2">
              {mounted && (
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center justify-center px-3 py-1.5 rounded-full hover:bg-white/10 text-white font-bold text-sm transition-colors"
                  aria-label="Ubah Bahasa"
                >
                  {language}
                </button>
              )}
            </div>

            {/* Tombol Hamburger Mobile */}
            <button 
              className="hamburger block md:hidden text-white focus:outline-none p-2 ml-2" 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-8 h-8 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </div>
      
      {/* Overlay Gelap Mobile */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Menu Card Mobile */}
      <nav 
        className={`md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden transition-all duration-300 origin-top transform ${
          isMobileOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-3">
          <Link href="/" onClick={() => setIsMobileOpen(false)} className={`px-5 py-4 font-semibold rounded-2xl transition-colors ${pathname === '/' ? 'text-[var(--gold)] bg-[var(--gold)]/10' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--gold)]'}`}>
            {t.home}
          </Link>
          <Link href="/knowledgebase" onClick={() => setIsMobileOpen(false)} className={`px-5 py-4 font-semibold rounded-2xl transition-colors ${pathname === '/knowledgebase' ? 'text-[var(--gold)] bg-[var(--gold)]/10' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--gold)]'}`}>
            {t.kb}
          </Link>
          
          {/* PENGATURAN BAHASA MOBILE */}
          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between px-5 py-3">
            <span className="text-sm font-semibold text-gray-500">{t.settings}</span>
            <div className="flex items-center gap-3">
              {mounted && (
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 bg-gray-100 rounded-xl text-gray-700 font-bold text-sm active:bg-gray-200 transition-colors"
                >
                  {language}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}