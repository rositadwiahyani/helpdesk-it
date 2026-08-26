import Link from 'next/link';

interface RecentTicketActivityTableProps {
  data?: { id: string; ticketNum: string; status?: string; message: string; time: string; iconColor?: string }[];
}

export default function RecentTicketActivityTable({ data = [] }: RecentTicketActivityTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Recent Ticket Activity</h3>
        <Link href="/dashboard/administrasi/tickets" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          View All Tickets
        </Link>
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500 text-sm">Belum ada aktivitas.</td>
              </tr>
            ) : (
              data.map((activity, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-600">{activity.ticketNum}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-semibold ${activity.iconColor}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm leading-relaxed">{activity.message}</td>
                  <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium whitespace-nowrap">{activity.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
