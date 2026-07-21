'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname(); 

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
    <header id="site-header" className={`relative ${isShrunk ? 'is-shrunk' : ''}`}>
      <div className="container header-inner relative z-50">
        <Link href="/" className="brand">
          <Image src="/universitas-diponegoro-helpit1.png" alt="Logo" width={150} height={40} />
        </Link>

        {/* Navigasi Desktop */}
        <nav className="main-nav hidden md:flex" aria-label="Navigasi utama">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Beranda</Link>
          <Link href="/knowledgebase" className={pathname === '/knowledgebase' ? 'active' : ''}>Knowledgebase</Link>
        </nav>

        <div className="header-actions flex items-center gap-4">
          
          {/* =========================================
              TOMBOL DESKTOP (PURE ICON TANPA FRAME)
              ========================================= */}
          <div className="hidden md:flex items-center gap-4"></div>

          {/* Tombol Hamburger Mobile */}
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
          <Link href="/" onClick={() => setIsMobileOpen(false)} className={`px-5 py-4 font-semibold rounded-2xl transition-colors ${pathname === '/' ? 'text-[var(--gold)] bg-[var(--gold)]/10' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100'}`}>
            Beranda
          </Link>
          <Link href="/knowledgebase" onClick={() => setIsMobileOpen(false)} className={`px-5 py-4 font-semibold rounded-2xl transition-colors ${pathname === '/knowledgebase' ? 'text-[var(--gold)] bg-[var(--gold)]/10' : 'text-gray-700 hover:bg-gray-50 hover:text-[var(--gold)] active:bg-gray-100'}`}>
            Knowledgebase
          </Link>
        </div>
      </nav>
    </header>
  );
}