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
    contact: language === 'ID' ? 'KONTAK' : 'CONTACT',
    hours: language === 'ID' ? 'JAM LAYANAN' : 'SERVICE HOURS',
    schedule: {
      monThu: language === 'ID' ? 'Senin-Kamis : 07.30 – 16.00 WIB' : 'Monday-Thursday : 07.30 – 16.00 WIB',
      break1: language === 'ID' ? '(Istirahat: 12.00 – 13.00 WIB)' : '(Break: 12.00 – 13.00 WIB)',
      fri: language === 'ID' ? 'Jumat 07.30 – 16.30 WIB' : 'Friday 07.30 – 16.30 WIB',
      break2: language === 'ID' ? '(Istirahat: 11.30 – 13.00 WIB)' : '(Break: 11.30 – 13.00 WIB)',
    },
    copyright: language === 'ID' 
      ? 'Copyright © 2026 Universitas Diponegoro | Hak Cipta Dilindungi' 
      : 'Copyright © 2026 Diponegoro University | All Rights Reserved'
  };

  return (
    <footer className="pt-12 pb-6 bg-[#0a1128] text-[#94a3b8]"> 
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
          
          {/* Brand Info */}
          <div>
            <div className="mb-6">
              <div className="relative h-12 w-auto flex items-start">
                <Image 
                  src="/universitas-diponegoro-helpit1.png" 
                  alt="Logo HelpIT Undip" 
                  width={150} 
                  height={40} 
                  style={{ width: 'auto', height: 'auto' }}
                  className="h-full object-contain"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed pr-4">
              {t.desc}
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 tracking-wider">{t.contact}</h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="leading-relaxed">Gedung ICT Lantai 2, Jl. Prof. Sudarto, S.H., Tembalang, Semarang, 50275</span>
              </li>
              <li className="flex items-start gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <Link href="mailto:dsti@live.undip.ac.id" className="hover:text-white transition-colors">
                  dsti@live.undip.ac.id
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours Section */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 tracking-wider">{t.hours}</h4>
            <ul className="space-y-2 text-sm leading-relaxed">
              <li className="text-gray-300">{t.schedule.monThu}</li>
              <li className="text-gray-500 pb-2">{t.schedule.break1}</li>
              <li className="text-gray-300 pt-2">{t.schedule.fri}</li>
              <li className="text-gray-500">{t.schedule.break2}</li>
            </ul>
          </div>

        </div>

        {/* Copyright Section (1 Single Line) */}
        <div className="mt-12 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-sm text-gray-400 font-light">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}