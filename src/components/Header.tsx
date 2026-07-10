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
    
    // Cek status login
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header id="site-header" className={isShrunk ? 'is-shrunk' : ''}>
      <div className="container header-inner">
        <Link href="/" className="brand">
          <Image src="/universitas-diponegoro-helpit1.png" alt="Logo" width={150} height={40} />
        </Link>

        <nav className="main-nav" aria-label="Navigasi utama">
  <Link href="/">Beranda</Link>
  <Link href="/knowledgebase">Knowledgebase</Link>
  <Link href="/ticket">Buka Tiket</Link>
</nav>

        <div className="header-actions">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="btn btn-sm btn-outline-dark">Profil</Link>
              <button onClick={handleLogout} className="btn btn-sm btn-gold">Keluar</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-outline-dark btn-sm">Masuk</Link>
          )}

          <button className="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {/* ... ikon hamburger ... */}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav */}
      <nav className={`mobile-nav ${isMobileOpen ? 'is-open' : ''}`}>
  <Link href="/">Beranda</Link>
  <Link href="/knowledgebase">Knowledgebase</Link>
  <Link href="/ticket">Buka Tiket</Link>
  {isLoggedIn && <Link href="/profile">Profil</Link>}
</nav>
    </header>
  );
}