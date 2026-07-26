'use client';

interface DepartmentPerformanceTableProps {
  data?: { name: string; total: number; open: number; closed: number; overdue: number; avgSla?: string }[];
}

export default function DepartmentPerformanceTable({ data = [] }: DepartmentPerformanceTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Department Performance</h3>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">View All</button>
      </div>
      
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 font-semibold">Department</th>
              <th className="px-6 py-3 font-semibold text-center">Total Tickets</th>
              <th className="px-6 py-3 font-semibold text-center text-blue-600">Open</th>
              <th className="px-6 py-3 font-semibold text-center">Closed</th>
              <th className="px-6 py-3 font-semibold text-center text-red-500">Overdue</th>
              <th className="px-6 py-3 font-semibold text-right">Avg SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-slate-500 text-sm">Tidak ada data departemen.</td>
              </tr>
            ) : (
              data.map((dept, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{dept.name}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{dept.total}</td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-900">{dept.open}</td>
                  <td className="px-6 py-4 text-center text-slate-600">{dept.closed}</td>
                  <td className="px-6 py-4 text-center">
                    {dept.overdue > 0 ? (
                      <span className="inline-flex items-center justify-center bg-red-50 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                        {dept.overdue}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 font-medium">{dept.avgSla || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
