'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [language, setLanguage] = useState<'ID' | 'EN'>('ID');

  useEffect(() => {
    const updateLanguage = () => {
      const saved = (localStorage.getItem('language') as 'ID' | 'EN') || 'ID';
      setLanguage(saved);
    };

    updateLanguage();

    window.addEventListener('languageChange', updateLanguage);

    return () => {
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  const t = {
    desc:
      language === 'ID'
        ? 'Layanan Teknologi Informasi Universitas Diponegoro — membantu urusan akun, sistem akademik, dan perangkat digital kampus.'
        : 'Diponegoro University Information Technology Services — assisting with accounts, academic systems, and campus digital devices.',
    services:
      language === 'ID'
        ? 'Layanan'
        : 'Services',
    openTicket:
      language === 'ID'
        ? 'Buka tiket baru'
        : 'Open new ticket',
    checkStatus:
      language === 'ID'
        ? 'Cek status tiket'
        : 'Check ticket status',
    kb:
      language === 'ID'
        ? 'Basis pengetahuan'
        : 'Knowledge Base',
    contact:
      language === 'ID'
        ? 'Kontak'
        : 'Contact'
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <div className="relative h-12 w-auto flex items-center">
                <Image 
                  src="/universitas-diponegoro-helpit1.png" 
                  alt="Logo HelpIT Undip" 
                  width={200} 
                  height={40}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>
            <p>{t.desc}</p>
          </div>
          <div className="footer-col">
            <h4>{t.services}</h4>
            <ul>
              <li><Link href="/ticket">{t.openTicket}</Link></li>
              <li><Link href="/ticket/status">{t.checkStatus}</Link></li>
              <li><Link href="/knowledgebase">{t.kb}</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t.contact}</h4>
            <ul>
              <li><Link href="#">Jl. Prof. Soedarto, SH, Tembalang</Link></li>
              <li><Link href="mailto:helpdesk@undip.ac.id">helpdesk@undip.ac.id</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

<Image 
  src="/universitas-diponegoro-helpit1.png" 
  alt="Logo HelpIT Undip" 
  width={150} 
  height={40} 
  style={{ width: 'auto', height: 'auto' }} /* <-- INI YANG BIKIN ERRORNYA HILANG */
  className="h-full object-contain"
/>