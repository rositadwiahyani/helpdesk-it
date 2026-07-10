'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setIsMobileOpen(false); 
    router.push('/login');
  };

  return (
    // Tambahin class "relative" di header biar menu dropdown-nya ngikut posisinya
    <header id="site-header" className={`relative ${isShrunk ? 'is-shrunk' : ''}`}>
      <div className="container header-inner relative z-50">
        <Link href="/" className="brand">
          <Image src="/universitas-diponegoro-helpit1.png" alt="Logo" width={150} height={40} />
        </Link>

        {/* Navigasi Desktop */}
        <nav className="main-nav hidden md:flex" aria-label="Navigasi utama">
          <Link href="/">Beranda</Link>
          <Link href="/knowledgebase">Knowledgebase</Link>
          <Link href="/ticket">Buka Tiket</Link>
        </nav>

        <div className="header-actions flex items-center gap-4">
          {/* Tombol Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/profile" className="btn btn-sm btn-outline-dark text-white">Profil</Link>
                <button onClick={handleLogout} className="btn btn-sm btn-gold">Keluar</button>
              </>
            ) : (
              <Link href="/login" className="btn btn-outline-dark btn-sm text-white">Masuk</Link>
            )}
          </div>

          {/* Tombol Hamburger */}
          <button 
            className="hamburger block md:hidden text-white focus:outline-none p-2" 
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
      
      {/* =========================================
          DESAIN MOBILE MENU BARU (FLOATING CARD)
          ========================================= */}
      
      {/* 1. Overlay Gelap (Biar fokus ke menu & bisa diklik buat nutup) */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* 2. Menu Card */}
      <nav 
        className={`md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 z-50 overflow-hidden transition-all duration-300 origin-top transform ${
          isMobileOpen ? 'scale-y-100 opacity-100 translate-y-0' : 'scale-y-95 opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-3">
          <Link href="/" onClick={() => setIsMobileOpen(false)} className="px-5 py-4 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100 transition-colors">
            Beranda
          </Link>
          <Link href="/knowledgebase" onClick={() => setIsMobileOpen(false)} className="px-5 py-4 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100 transition-colors">
            Knowledgebase
          </Link>
          <Link href="/ticket" onClick={() => setIsMobileOpen(false)} className="px-5 py-4 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100 transition-colors">
            Buka Tiket
          </Link>
          
          {isLoggedIn ? (
            <>
              <Link href="/profile" onClick={() => setIsMobileOpen(false)} className="px-5 py-4 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100 transition-colors">
                Profil Saya
              </Link>
              
              {/* Tombol Logout Estetik */}
              <div className="mt-2 pt-2 border-t border-gray-100">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Keluar Akun
                </button>
              </div>
            </>
          ) : (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setIsMobileOpen(false)} className="flex items-center justify-center py-3.5 bg-[var(--gold)] text-white font-bold rounded-xl shadow-md hover:bg-[var(--gold-dim)] transition-colors">
                Masuk Akun
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}