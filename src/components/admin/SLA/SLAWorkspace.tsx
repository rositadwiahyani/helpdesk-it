"use client";

import React, { useState, useEffect } from "react";
import SLAHeader from "./SLAHeader";
import SLAToolbar from "./SLAToolbar";
import SLATableSection from "./SLATableSection";
import SLAInfoSection from "./SLAInfoSection";
import SLAHistorySection, { SLAHistoryItem } from "./SLAHistorySection";
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

const INITIAL_HISTORY_DATA: SLAHistoryItem[] = [];

export default function SLAWorkspace() {
  const [slaData, setSlaData] = useState<SLAItem[]>([]);
  const [historyData, setHistoryData] = useState<SLAHistoryItem[]>(INITIAL_HISTORY_DATA);

  useEffect(() => {
    fetchSlas();
  }, []);

  const fetchSlas = async () => {
    const { data } = await supabase.from('slas').select('*').order('response_time', { ascending: true });
    if (data && data.length > 0) {
      const formatted: SLAItem[] = data.map(d => ({
        id: String(d.id),
        priority: d.priority as any,
        badgeBg: d.badge_bg,
        badgeTextColor: d.badge_text_color,
        responseTime: d.response_time,
        resolutionTime: d.resolution_time,
      }));
      setSlaData(formatted);
    } else {
      // Fallback if table is empty (user didn't run the INSERT sql)
      setSlaData(INITIAL_SLA_DATA);
    }
  };

  const handleUpdateSLA = async (updatedItem: SLAItem) => {
    // 1. Update Supabase
    const { error } = await supabase.from('slas').update({
      response_time: updatedItem.responseTime,
      resolution_time: updatedItem.resolutionTime,
      updated_at: new Date().toISOString()
    }).eq('id', updatedItem.id);

    if (error) {
      alert("Gagal menyimpan SLA: " + error.message);
      return;
    }

    // 2. Update data SLA lokal
    setSlaData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );

    // 3. Update data riwayat secara realtime
    const newHistoryItem: SLAHistoryItem = {
      id: Date.now(),
      action: `SLA ${updatedItem.priority} diperbarui`,
      timestamp: "Baru saja",
    };
    setHistoryData((prevHistory) => [newHistoryItem, ...prevHistory]);

    // 4. Tampilkan alert bawaan browser
    setTimeout(() => {
      alert(`Target waktu pada SLA ${updatedItem.priority} berhasil disimpan!`);
    }, 100); 
  };

  return (
    <div className="flex p-8 flex-col items-start gap-8 w-full">
      <SLAHeader />

      <div className="flex flex-col items-start rounded-lg border border-[#C3C6D1] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
        <SLAToolbar />
        <SLATableSection slaData={slaData} onUpdateSLA={handleUpdateSLA} />
      </div>

      <div className="flex justify-center items-start gap-6 w-full">
        <SLAInfoSection />
        <SLAHistorySection historyData={historyData} />
      </div>
    </div>
  );
}