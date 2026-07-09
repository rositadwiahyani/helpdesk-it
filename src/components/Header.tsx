'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
          <svg className="brand-mark" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="#e7c866" strokeWidth="1.2" opacity="0.5"/>
            <path d="M20 6 C22 12 22 12 28 14 C22 16 22 16 20 22 C18 16 18 16 12 14 C18 12 18 12 20 6Z" fill="#e7c866"/>
            <path d="M20 18 C21.5 21.5 21.5 21.5 25 23 C21.5 24.5 21.5 24.5 20 28 C18.5 24.5 18.5 24.5 15 23 C18.5 21.5 18.5 21.5 20 18Z" fill="#c9a227"/>
          </svg>
          <span className="brand-text"><b>Helpdesk Undip</b><span>Layanan TI Terpadu</span></span>
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