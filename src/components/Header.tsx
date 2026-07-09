'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsShrunk(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="site-header" className={isShrunk ? 'is-shrunk' : ''}>
      <div className="container header-inner">
<Link href="/" className="brand" aria-label="Helpdesk Undip, beranda">
  <div className="relative h-12 w-auto overflow-hidden">
    <Image 
      src="/universitas-diponegoro-helpit1.png" 
      alt="Logo HelpIT Undip" 
      width={400} 
      height={100}
      priority
      className="h-full w-auto object-contain"
    />
  </div>
</Link>

        <nav className="main-nav" aria-label="Navigasi utama">
          <Link href="#" className="active">Beranda</Link>
          <Link href="#kb">Knowledgebase</Link>
          <Link href="#">Buka Tiket</Link>
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group">
            <button className="active" type="button">ID</button>
            <button type="button">EN</button>
          </div>
          <Link href="#" className="btn btn-outline-dark btn-sm">
            Masuk
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6"/></svg>
          </Link>
          <button className="hamburger" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMobileOpen ? <path d="M6 6l12 12M18 6L6 18"/> : <path d="M4 7h16M4 12h16M4 17h16"/>}
            </svg>
          </button>
        </div>
      </div>
      
      <nav className={`mobile-nav ${isMobileOpen ? 'is-open' : ''}`}>
        <Link href="#">Beranda</Link>
        <Link href="#kb">Knowledgebase</Link>
        <Link href="#">Buka Tiket</Link>
      </nav>
    </header>
  );
}