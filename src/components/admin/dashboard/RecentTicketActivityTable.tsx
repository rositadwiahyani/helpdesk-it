const activities = [
  { id: "TKT-4422", status: "Open", message: "Ticket baru dibuat: Gagal login ke SSO", time: "5 mins ago", iconColor: "bg-blue-100 text-blue-600" },
  { id: "TKT-4418", status: "Resolved", message: "Status diubah menjadi Resolved oleh Budi Santoso", time: "15 mins ago", iconColor: "bg-emerald-100 text-emerald-600" },
  { id: "TKT-4420", status: "Message", message: "Balasan baru dari user: 'Terima kasih, sudah bisa.'", time: "22 mins ago", iconColor: "bg-slate-100 text-slate-600" },
  { id: "TKT-4421", status: "Assigned", message: "Ditetapkan kepada Network Team", time: "45 mins ago", iconColor: "bg-indigo-100 text-indigo-600" },
  { id: "TKT-4390", status: "Overdue", message: "SLA terlampaui untuk penanganan pertama", time: "1 hour ago", iconColor: "bg-red-100 text-red-600" },
];

export default function RecentTicketActivityTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Recent Ticket Activity</h3>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          View All Activity
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Ticket ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 w-1/2">Activity</th>
              <th className="px-6 py-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map((act, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{act.id}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-semibold ${act.iconColor}`}>
                    {act.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm leading-relaxed">{act.message}</td>
                <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium whitespace-nowrap">{act.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
