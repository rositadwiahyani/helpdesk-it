'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface RecentTicketActivityTableProps {
  data?: { id: string; ticketNum: string; status?: string; message: string; time: string; iconColor?: string }[];
}

type RecentActivity = NonNullable<RecentTicketActivityTableProps['data']>[number];

export default function RecentTicketActivityTable({ data = [] }: RecentTicketActivityTableProps) {
  const { t, language } = useLanguage();

  const localizeActivity = (activity: RecentActivity) => {
    if (language === 'en') return activity;

    const status = activity.status?.toLowerCase();
    const message = activity.message.toLowerCase();

    if (status === 'new ticket') {
      return { ...activity, status: 'Tiket Baru', message: 'Tiket baru dibuat' };
    }
    if (status === 'status change') {
      return { ...activity, status: 'Perubahan Status' };
    }
    if (status === 'closed') {
      return { ...activity, status: 'Ditutup' };
    }
    if (message === 'ticket auto-resolved by system') {
      return { ...activity, message: 'Tiket diselesaikan otomatis oleh sistem' };
    }

    return activity;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">{t('charts.recent_activity')}</h3>
        <Link href="/dashboard/administrasi/tickets" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          {t('charts.view_all')}
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4">{t('charts.ticket_id')}</th>
              <th className="px-6 py-4">{t('charts.type')}</th>
              <th className="px-6 py-4 w-1/2">{t('charts.activity')}</th>
              <th className="px-6 py-4 text-right">{t('charts.time')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500 text-sm">{t('charts.no_activity')}</td>
              </tr>
            ) : (
              data.map((rawActivity, index) => {
                const activity = localizeActivity(rawActivity);

                return (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{activity.ticketNum}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-semibold ${activity.iconColor}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm leading-relaxed">{activity.message}</td>
                  <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium whitespace-nowrap">{activity.time}</td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
