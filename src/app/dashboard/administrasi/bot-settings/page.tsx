import BotSettingsWorkspace from '@/components/admin/bot-settings/BotSettingsWorkspace';

export const metadata = {
  title: 'Manajemen Template Bot - Admin Helpdesk IT',
};

export default function BotSettingsPage() {
  return (
    <div className="w-full h-full text-slate-800 font-sans p-6 md:p-10">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both w-full h-full">
        <BotSettingsWorkspace />
      </div>
    </div>
  );
}
