export default function SystemAuditLog() {
  const logs = [
    { message: "Role Admin diubah oleh Budi", time: "10 mins ago", initial: "B", bg: "bg-slate-900", iconColor: "text-white" },
    { message: "Webhook #WH-102 gagal terkirim", time: "45 mins ago", initial: "!", bg: "bg-red-100", iconColor: "text-red-600" },
    { message: "User Baru: Siti Aminah ditambahkan", time: "2 hours ago", initial: "S", bg: "bg-blue-100", iconColor: "text-blue-600" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Audit Log</h3>
        <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          View All
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className={`w-8 h-8 rounded-full ${log.bg} ${log.iconColor} flex items-center justify-center text-xs font-bold shrink-0 mt-0.5`}>
              {log.initial}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 leading-snug">{log.message}</p>
              <p className="text-xs text-slate-500 mt-0.5">{log.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
