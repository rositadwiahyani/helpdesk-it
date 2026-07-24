import React, { useState, ChangeEvent } from "react";
import BotMessageSection from "./BotMessage";
import OperationalHoursSection from "./OperationalHour";
import EmailNotificationSection from "./EmailNotification";
import BotPreviewSection from "./BotPreview";
import BotStatsSection from "./BotStats";
import SettingsFormActions from "./SettingsFormActions";
import { SettingsData } from "./SettingsWorkspace"; // Pastikan Anda juga export ini dari file workspace

interface SettingsFormSectionsProps {
  settingsData: SettingsData;
  setSettingsData: React.Dispatch<React.SetStateAction<SettingsData>>;
  onSave: () => void;
  onCancel: () => void;
}

export default function SettingsFormSection({ 
  settingsData, 
  setSettingsData, 
  onSave, 
  onCancel 
}: SettingsFormSectionsProps) {
  // 1. Perubahan State & Controlled Inputs
  const [isBotActive, setIsBotActive] = useState<boolean>(settingsData?.isBotActive ?? true);
  const [botMessage, setBotMessage] = useState<string>(
    settingsData?.botMessage ?? 
    "🤖 *Halo! Pusat Bantuan IT Universitas Diponegoro.*\n\nSilakan balas dengan *angka*: 1. *📄 Buat Tiket* 2. *🔍 Cek Status* 3. *➕ Tambah Info* 4. *📖 FAQ & Panduan* 5. *📞 Hubungi Petugas* 0. *✖ Akhiri*\n\n⚠️ Jangan pernah mengirimkan Password / OTP!"
  );
  
  const [weekdayStart, setWeekdayStart] = useState<string>(settingsData?.weekdayStart ?? "08:00");
  const [weekdayEnd, setWeekdayEnd] = useState<string>(settingsData?.weekdayEnd ?? "16:00");
  const [isWeekendOff, setIsWeekendOff] = useState<boolean>(settingsData?.isWeekendOff ?? true);
  const [email, setEmail] = useState<string>(settingsData?.email ?? "helpdesk@undip.ac.id");

  // 2. Validasi Sederhana
  const isMessageValid = botMessage.trim().length > 0 && botMessage.length <= 4096;

  // 3. Callback ke Parent (Workspace)
  const handleSave = () => {
    if (!isMessageValid) {
      alert("Pesan tidak boleh kosong dan tidak boleh lebih dari 4096 karakter.");
      return;
    }
    
    // Update master state lalu panggil onSave di parent
    setSettingsData({
      isBotActive,
      botMessage,
      weekdayStart,
      weekdayEnd,
      isWeekendOff,
      email
    });
    
    if (onSave) {
      onSave();
    }
  };

  return (
    <>
      <div className="flex flex-col xl:flex-row items-start gap-6 w-full">
        <div className="flex flex-col items-start gap-6 w-full xl:flex-1 xl:min-w-0">
          <BotMessageSection 
            isActive={isBotActive}
            onToggleActive={() => setIsBotActive(!isBotActive)}
            message={botMessage}
            onMessageChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBotMessage(e.target.value)}
            isError={!isMessageValid}
          />
          <div className="flex flex-col sm:flex-row items-stretch gap-6 w-full">
            <div className="w-full sm:flex-1 sm:min-w-0">
              <OperationalHoursSection 
                weekdayStart={weekdayStart}
                weekdayEnd={weekdayEnd}
                isWeekendOff={isWeekendOff}
                onWeekdayStartChange={(e: ChangeEvent<HTMLSelectElement>) => setWeekdayStart(e.target.value)}
                onWeekdayEndChange={(e: ChangeEvent<HTMLSelectElement>) => setWeekdayEnd(e.target.value)}
                onWeekendOffToggle={(e: ChangeEvent<HTMLInputElement>) => setIsWeekendOff(e.target.checked)}
              />
            </div>
            <div className="w-full sm:flex-1 sm:min-w-0">
              <EmailNotificationSection 
                initialEmail={email}
                onSaveEmail={(newEmail: string) => setEmail(newEmail)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 w-full xl:w-[368px] xl:shrink-0">
          <BotPreviewSection message={botMessage} />
          <BotStatsSection onViewAnalytics={() => console.log('Buka Detail Analytics')} />
        </div>
      </div>
      <SettingsFormActions onSave={handleSave} onCancel={onCancel} />
    </>
  );
}