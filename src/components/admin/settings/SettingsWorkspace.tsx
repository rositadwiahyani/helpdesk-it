"use client";

import { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import SettingsFormSections from "./SettingsFormSections";

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

  const handleSave = () => {
    // Simulasi logic backend
    console.log("Menyimpan data:", settingsData);
    alert("Perubahan berhasil disimpan!");
  };

  const handleCancel = () => {
    // Simulasi logic batal: Mengembalikan form ke state awal
    console.log("Membatalkan perubahan.");
    setSettingsData(initialSettings);
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