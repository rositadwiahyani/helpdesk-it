import React, { useState, ChangeEvent } from "react";
import BotMessageSection from "./BotMessage";
import OperationalHour, { DaySchedule } from "./OperationalHour";
import EmailNotificationSection from "./EmailNotification";
import BotPreviewSection from "./BotPreview";
import BotStatsSection from "./BotStats";
import SettingsFormActions from "./SettingsFormActions";
import { SettingsData } from "./SettingsWorkspace";

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
  const [isBotActive, setIsBotActive] = useState<boolean>(settingsData?.isBotActive ?? true);
  const [botMessage, setBotMessage] = useState<string>(
    settingsData?.botMessage ?? 
    "🤖 *Halo! Pusat Bantuan IT Universitas Diponegoro.*\n\nSilakan balas dengan *angka*: 1. *📄 Buat Tiket* 2. *🔍 Cek Status* 3. *➕ Tambah Info* 4. *📖 FAQ & Panduan* 5. *📞 Hubungi Petugas* 0. *✖ Akhiri*\n\n⚠️ Jangan pernah mengirimkan Password / OTP!"
  );

  const [weekdaySchedule, setWeekdaySchedule] = useState<DaySchedule>({
    type: "dropdown",
    start: "08:00",
    end: "16:00",
    manualText: ""
  });

  const [weekendSchedule, setWeekendSchedule] = useState<DaySchedule>({
    type: "off",
    start: "08:00",
    end: "16:00",
    manualText: ""
  });

  const [email, setEmail] = useState<string>(settingsData?.email ?? "helpdesk@undip.ac.id");

  const isMessageValid = botMessage.trim().length > 0 && botMessage.length <= 4096;

  const handleSave = () => {
    if (!isMessageValid) {
      alert("Pesan tidak boleh kosong dan tidak boleh lebih dari 4096 karakter.");
      return;
    }

    setSettingsData({
      isBotActive,
      botMessage,
      weekdayStart: weekdaySchedule.start,
      weekdayEnd: weekdaySchedule.end,
      isWeekendOff: weekendSchedule.type === "off",
      email
    });

    if (onSave) onSave();
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
              <OperationalHour 
                weekday={weekdaySchedule}
                weekend={weekendSchedule}
                onChangeWeekday={setWeekdaySchedule}
                onChangeWeekend={setWeekendSchedule}
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
          <BotStatsSection />
        </div>
      </div>

      <SettingsFormActions onSave={handleSave} onCancel={onCancel} />
    </>
  );
}