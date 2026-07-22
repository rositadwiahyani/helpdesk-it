'use client';
import Image from 'next/image';

interface AdminTopbarProps {
  onMenuClick: () => void;
  pageTitle?: string;      // Judul halaman aktif, mis. "Dashboard Administrator"
  breadcrumbParent?: string; // Induk breadcrumb, default "Menu"
  userName?: string;
  userRole?: string;
  avatarSrc?: string;
}

export default function AdminTopbar({
  onMenuClick,
  pageTitle = 'Dashboard Administrator',
  breadcrumbParent = 'Menu',
  userName = 'Admin User',
  userRole = 'Super Administrator',
  avatarSrc = '/avatar-admin.jpg',
}: AdminTopbarProps) {
  return (
    <div className="sticky top-0 z-40 h-20 w-full bg-white border-b border-[var(--line)]">
      <div className="flex h-full items-center justify-between px-6 lg:px-10">

        {/* Kiri: Hamburger (khusus mobile) + Breadcrumb */}
        <div className="flex items-center gap-4">
          {/* Hamburger hanya tampil di layar kecil, karena di gambar (desktop) sidebar selalu terbuka */}
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 rounded-xl text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb: Menu > Dashboard Administrator */}
          <div className="flex items-center gap-2 text-[15px]">
            <span className="text-[var(--text-dim)]">{breadcrumbParent}</span>
            <svg className="w-4 h-4 text-[var(--text-dim)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-[var(--ink)] truncate max-w-[200px] md:max-w-xs">
              {pageTitle}
            </span>
          </div>
        </div>

        {/* Kanan: Notification & Profile */}
        <div className="flex items-center gap-4 lg:gap-5">

          {/* Notification Icon */}
          <button
            className="relative p-2 text-[var(--ink)] hover:text-[var(--gold-soft)] transition-colors"
            aria-label="Notifikasi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 left-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Garis pemisah tipis */}
          <div className="hidden sm:block w-px h-8 bg-[var(--line)]"></div>

          {/* Profile: nama + role + foto asli */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-[14px] font-bold text-[var(--ink)]">{userName}</span>
              <span className="text-[11px] font-medium text-[var(--text-dim)] uppercase tracking-wide">
                {userRole}
              </span>
            </div>
            {/* Avatar foto asli, bukan lagi inisial */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden ring-1 ring-[var(--line)] shrink-0">
              <Image
                src={avatarSrc}
                alt={userName}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}