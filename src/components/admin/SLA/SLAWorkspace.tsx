"use client";

import React, { useState, useEffect } from "react";
import SLAHeader from "./SLAHeader";
import SLAToolbar from "./SLAToolbar";
import SLATableSection from "./SLATableSection";
import { supabase } from "@/lib/supabase";

export interface SLAItem {
  id: string;
  priority: "KRITIS" | "TINGGI" | "SEDANG" | "RENDAH";
  badgeBg: string;
  badgeTextColor: string;
  responseTime: number; // dalam menit
  resolutionTime: number; // dalam menit
}

const INITIAL_SLA_DATA: SLAItem[] = [
  {
    id: "kritis",
    priority: "KRITIS",
    badgeBg: "bg-[#FFDAD6]",
    badgeTextColor: "text-[#93000A]",
    responseTime: 30,
    resolutionTime: 240,
  },
  {
    id: "tinggi",
    priority: "TINGGI",
    badgeBg: "bg-[#FFEDD5]",
    badgeTextColor: "text-[#9A3412]",
    responseTime: 60,
    resolutionTime: 480,
  },
  {
    id: "sedang",
    priority: "SEDANG",
    badgeBg: "bg-[#DBEAFE]",
    badgeTextColor: "text-[#1E40AF]",
    responseTime: 120,
    resolutionTime: 1440,
  },
  {
    id: "rendah",
    priority: "RENDAH",
    badgeBg: "bg-[#DCFCE7]",
    badgeTextColor: "text-[#166534]",
    responseTime: 240,
    resolutionTime: 2880,
  },
];

export default function SLAWorkspace() {
  const [slaData, setSlaData] = useState<SLAItem[]>([]);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
  };

  useEffect(() => {
    fetchSlas();
  }, []);

  const fetchSlas = async () => {
    const { data } = await supabase.from('sla_configs').select('*').order('response_target_hours', { ascending: true });
    if (data && data.length > 0) {
      const formatted: SLAItem[] = data.map(d => {
        // Find matching priority from INITIAL_SLA_DATA for badges
        const initial = INITIAL_SLA_DATA.find(i => i.priority === d.priority);
        return {
          id: String(d.id),
          priority: d.priority as any,
          badgeBg: initial?.badgeBg || 'bg-[#F3F3F6]',
          badgeTextColor: initial?.badgeTextColor || 'text-[#43474F]',
          responseTime: (d.response_target_hours || 0) * 60,
          resolutionTime: (d.resolution_target_hours || 0) * 60,
        };
      });
      setSlaData(formatted);
    } else {
      // Fallback if table is empty (user didn't run the INSERT sql)
      setSlaData(INITIAL_SLA_DATA);
    }
  };

  const handleUpdateSLA = async (updatedItem: SLAItem) => {
    // We update by priority instead of string id
    try {
      // Round to nearest hour
      const responseHours = Math.max(1, Math.round(updatedItem.responseTime / 60));
      const resolutionHours = Math.max(1, Math.round(updatedItem.resolutionTime / 60));

      const { fetchClient } = await import('@/lib/apiClient');
      const res = await fetchClient('/admin/sla', {
        method: 'PUT',
        body: JSON.stringify({
          priority: updatedItem.priority,
          response_target_hours: responseHours,
          resolution_target_hours: resolutionHours,
        })
      });
      if (!res.id && res.error) throw new Error(res.error);
      
      // 2. Update state lokal
      setSlaData((prev) => prev.map((item) => (item.priority === updatedItem.priority ? updatedItem : item)));
      showToast(`SLA untuk prioritas ${updatedItem.priority} berhasil disimpan!`, 'success');
      fetchSlas();
    } catch (err: any) {
      console.error(err);
      showToast(`Gagal menyimpan SLA: ${err.message}`, 'error');
    }
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full relative">
      <SLAHeader />

      <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full overflow-hidden relative">
        <SLATableSection slaData={slaData} onUpdateSLA={handleUpdateSLA} />
      </div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3 z-[100] animate-in slide-in-from-top-5 duration-300 ${
            toastType === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
            {toastType === 'success' ? (
                <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ) : (
                <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            )}
            <span className="text-[14px] font-bold tracking-tight">{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75 transition-opacity">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
      )}
    </div>
  );
}