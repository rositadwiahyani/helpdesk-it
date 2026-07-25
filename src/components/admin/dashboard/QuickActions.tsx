import { UserPlus, FolderPlus, Clock, Settings } from "lucide-react";

export default function QuickActions() {
  const actions = [
    { label: "Tambah User", icon: <UserPlus className="w-5 h-5 mb-2" /> },
    { label: "Tambah Dept", icon: <FolderPlus className="w-5 h-5 mb-2" /> },
    { label: "Kelola SLA", icon: <Clock className="w-5 h-5 mb-2" /> },
    { label: "Kelola Webhook", icon: <Settings className="w-5 h-5 mb-2" /> },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-slate-700"
          >
            {action.icon}
            <span className="text-[11px] font-bold tracking-wide">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
