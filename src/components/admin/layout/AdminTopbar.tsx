'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface AdminTopbarProps {
  onMenuClick?: () => void;
  pageTitle?: string;
  breadcrumbParent?: string;
  userName?: string;
  userRole?: string;
  avatarSrc?: string;
  showMenuButtonOnDesktop?: boolean;
}

export default function AdminTopbar({
  onMenuClick,
  pageTitle,
  breadcrumbParent,
  userName,
  userRole,
  avatarSrc = '/avatar-admin.jpg',
  showMenuButtonOnDesktop = false,
}: AdminTopbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [currentUser, setCurrentUser] = useState<any>({});
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Tiket Baru Masuk', desc: 'Tiket #000143 (Jaringan) menunggu verifikasi Anda.', time: '5 menit lalu', isRead: false, type: 'new' },
    { id: 2, title: 'SLA Warning', desc: 'Peringatan: Tiket #000120 sisa waktu penanganan tinggal 1 jam!', time: '1 jam lalu', isRead: false, type: 'warning' },
    { id: 3, title: 'Tiket Dikembalikan', desc: 'Teknisi Jaringan mengembalikan Tiket #000085 ke Anda.', time: '2 jam lalu', isRead: true, type: 'rejected' },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
  }, []);

  let displayUserName = currentUser.name || currentUser.full_name || currentUser.user_metadata?.full_name || currentUser.user_metadata?.name;
  if (!displayUserName && currentUser.email) {
    displayUserName = currentUser.email.split('@')[0];
  }
  displayUserName = displayUserName || userName || (language === 'id' ? 'Pengguna' : 'User');

  let displayUserRole = currentUser.role || currentUser.user_metadata?.role || userRole;
  if (displayUserRole === 'authenticated') {
    if (currentUser.email?.includes('operator')) displayUserRole = t('topbar.operator');
    else if (currentUser.email?.includes('teknisi')) displayUserRole = t('topbar.teknisi');
    else if (currentUser.email?.includes('pimpinan')) displayUserRole = t('topbar.pimpinan');
    else displayUserRole = t('topbar.super_admin');
  } else if (displayUserRole === 'pimpinan') {
    displayUserRole = t('topbar.pimpinan');
  } else if (displayUserRole === 'admin') {
    displayUserRole = t('topbar.super_admin');
  } else if (displayUserRole === 'teknisi') {
    displayUserRole = t('topbar.teknisi');
  } else if (displayUserRole === 'operator') {
    displayUserRole = t('topbar.operator');
  }

  const initials = displayUserName.substring(0, 2).toUpperCase();

  const pathname = usePathname();

  const getDynamicPageTitle = () => {
    const path = pathname || '';
    if (path === '/dashboard' || path === '/dashboard/administrasi') return t('topbar.dashboard_admin');
    if (path.startsWith('/dashboard/administrasi/tickets')) return t('menu.tickets');
    if (path.startsWith('/dashboard/administrasi/users')) return t('menu.users');
    if (path.startsWith('/dashboard/administrasi/report-categories')) return t('menu.report_categories');
    if (path.startsWith('/dashboard/administrasi/reports')) return t('menu.reports');
    if (path.startsWith('/dashboard/administrasi/sla')) return t('menu.sla');
    if (path.startsWith('/dashboard/administrasi/staff')) return t('menu.staff');
    if (path.startsWith('/dashboard/administrasi/webhook')) return language === 'id' ? 'Log API & Webhook' : 'API Logs & Webhooks';
    if (path.startsWith('/dashboard/administrasi/bot-settings')) return t('menu.bot');
    if (path.startsWith('/dashboard/administrasi/settings')) return t('menu.settings');
    if (path.startsWith('/dashboard/administrasi/profile')) return t('profile.title');
    if (path.startsWith('/dashboard/pimpinan/tickets')) return t('menu.ticket_reports');
    if (path.startsWith('/dashboard/pimpinan/performance')) return t('menu.performance_reports');
    if (path.startsWith('/dashboard/pimpinan/sla')) return t('menu.sla_reports');
    if (path.startsWith('/dashboard/pimpinan/reports')) return t('menu.summary_reports');
    if (path.startsWith('/dashboard/pimpinan/profile')) return t('profile.pimpinan_title');
    if (path.startsWith('/dashboard/operator/tickets')) return t('menu.all_tickets');
    if (path.startsWith('/dashboard/operator/profile')) return t('profile.title');
    if (path === '/dashboard/pimpinan' || path.startsWith('/dashboard/pimpinan/')) return t('menu.executive_summary');
    if (path === '/dashboard/operator' || path.startsWith('/dashboard/operator/')) return t('topbar.dashboard_operator');
    return pageTitle || t('topbar.dashboard');
  };

  const activeTitle = getDynamicPageTitle();

  const translatedBreadcrumb = (breadcrumbParent || 'Menu') === 'Menu' 
    ? t('topbar.menu') 
    : (breadcrumbParent === 'Dashboard' ? t('topbar.dashboard') : breadcrumbParent);

  return (
    <div className="sticky top-0 z-40 h-20 w-full bg-white border-b border-[var(--line)]">
      {/* Padding menyesuaikan dengan p-4 lg:p-8 pada Layout utama */}
      <div className="flex h-full items-center justify-between px-4 lg:px-8">

        {/* Kiri: Hamburger & Breadcrumb */}
        <div className="flex items-center h-full">
          {/* Hamburger button */}
          <button
            onClick={onMenuClick}
            className={`${showMenuButtonOnDesktop ? 'block' : 'lg:opacity-0 lg:pointer-events-none'} -ml-2 p-2 rounded-xl text-[var(--text-dim)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] transition-colors`}
            aria-label={language === 'id' ? 'Buka menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[15px] ml-4 md:ml-2">
            <span className="text-[var(--text-dim)]">{translatedBreadcrumb}</span>
            <svg className="w-4 h-4 text-[var(--text-dim)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-[var(--ink)] truncate max-w-[200px] md:max-w-xs">
              {activeTitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          {/* Quick Language Toggle Pill */}
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            title={t('topbar.lang_switch')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-[var(--ink)] hover:text-[var(--gold-soft)] transition-colors focus:outline-none"
              aria-label={t('topbar.notifications')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                  <h3 className="font-bold text-slate-800 text-[14px]">{t('topbar.notifications')}</h3>
                  {unreadCount > 0 && (
                    <button 
                      onClick={() => setNotifications(prev => prev.map(n => ({...n, isRead: true})))}
                      className="text-[12px] font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {t('notifications.mark_read')}
                    </button>
                  )}
                </div>
                <div className="max-h-[350px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(notif => (
                      <div key={notif.id} className={`flex gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer ${!notif.isRead ? 'bg-blue-50/30' : ''}`}>
                        <div className="shrink-0 mt-0.5">
                          {notif.type === 'new' && <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg></div>}
                          {notif.type === 'warning' && <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></div>}
                          {notif.type === 'rejected' && <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-[13px] font-bold ${!notif.isRead ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notif.type === 'new' ? t('notifications.new_ticket') : (notif.type === 'warning' ? t('notifications.sla_warning') : t('notifications.returned'))}
                          </p>
                          <p className="text-[13px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                            {notif.type === 'new' ? `${language === 'id' ? 'Tiket' : 'Ticket'} #000143 ${t('notifications.new_ticket_desc')}` : (notif.type === 'warning' ? t('notifications.sla_warning_desc') : t('notifications.returned_desc'))}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-400 mt-1.5">{notif.time}</p>
                        </div>
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 self-center"></div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-sm">{t('topbar.no_notifications')}</div>
                  )}
                </div>
                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button className="text-[12px] font-bold text-slate-600 hover:text-slate-900 transition-colors w-full py-1">
                    {t('notifications.view_all')}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block w-px h-8 bg-[var(--line)]"></div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-[14px] font-bold text-[var(--ink)]">{displayUserName}</span>
              <span className="text-[11px] font-medium text-[var(--text-dim)] uppercase tracking-wide">
                {displayUserRole}
              </span>
            </div>
            {/* Avatar Inisial Dinamis */}
            <div className="relative w-11 h-11 rounded-full bg-[var(--gold)] flex items-center justify-center text-white font-bold ring-1 ring-[var(--line)] shrink-0">
              {initials}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}