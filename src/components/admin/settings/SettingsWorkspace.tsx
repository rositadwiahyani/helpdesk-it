"use client";

import { useState, useEffect } from "react";
import SettingsHeader from "./SettingsHeader";
import SettingsFormSections from "./SettingsFormSections";
import { supabase } from "@/lib/supabase";

// Mendefinisikan tipe data state agar sesuai dengan keseluruhan komponen anak
export interface SettingsData {
  isBotActive: boolean;
  botMessage: string;
  weekdayStart: string;
  weekdayEnd: string;
  isWeekendOff: boolean;
  email: string;
}

export default function SettingsWorkspace() {
  // Menggunakan state lokal dan dummy data yang merepresentasikan form aktual
  const initialSettings: SettingsData = {
    isBotActive: true,
    botMessage: "🤖 *Halo! Pusat Bantuan IT Universitas Diponegoro.*\n\nSilakan balas dengan *angka*: 1. *📄 Buat Tiket* 2. *🔍 Cek Status* 3. *➕ Tambah Info* 4. *📖 FAQ & Panduan* 5. *📞 Hubungi Petugas* 0. *✖ Akhiri*\n\n⚠️ Jangan pernah mengirimkan Password / OTP!",
    weekdayStart: "08:00",
    weekdayEnd: "16:00",
    isWeekendOff: true,
    email: "helpdesk@undip.ac.id",
  };

  const [settingsData, setSettingsData] = useState<SettingsData>(initialSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bot_templates').select('*').eq('template_key', 'greeting_menu').single();
    if (data) {
      setSettingsData(prev => ({
        ...prev,
        botMessage: data.message_text
      }));
    }
    setLoading(false);
  };

  const handleSave = async () => {
    // Save to supabase
    const { error } = await supabase.from('bot_templates').update({
      message_text: settingsData.botMessage,
      updated_at: new Date().toISOString()
    }).eq('template_key', 'greeting_menu');

    if (error) {
      alert("Gagal menyimpan: " + error.message);
    } else {
      alert("Perubahan berhasil disimpan!");
    }
  };

  const handleCancel = () => {
    fetchSettings();
  };

  return (
    <div className="flex max-w-[1440px] pt-8 pr-8 pb-32 pl-8 flex-col items-start gap-8 w-full relative">
      <SettingsHeader />
      <SettingsFormSections 
        settingsData={settingsData}
        setSettingsData={setSettingsData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}