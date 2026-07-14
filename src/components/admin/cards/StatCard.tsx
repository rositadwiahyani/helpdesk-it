import React from 'react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, icon, description, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-[var(--line)] shadow-sm flex flex-col gap-3 group hover:border-[var(--gold-soft)] transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[13.5px] font-bold text-[var(--text-dim)] uppercase tracking-wide">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-[var(--paper-2)] text-[var(--gold-soft)] flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div>
        <div className="flex items-end gap-3 mb-1">
          <span className="text-3xl font-['Fraunces'] font-bold text-[var(--ink)] leading-none">{value}</span>
          {trend && (
            <span className={`text-[12px] font-bold pb-0.5 ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
              {trend}
            </span>
          )}
        </div>
        {description && (
          <p className="text-[12.5px] text-[var(--text-dim)]">{description}</p>
        )}
      </div>
    </div>
  );
}
