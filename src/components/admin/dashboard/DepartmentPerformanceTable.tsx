const departmentsData = [
  { name: "IT Infrastructure", total: 142, open: 12, closed: 128, overdue: 2, avgSla: "2.4 hrs" },
  { name: "Academic Systems", total: 89, open: 4, closed: 85, overdue: 0, avgSla: "1.1 hrs" },
  { name: "Network Support", total: 215, open: 18, closed: 196, overdue: 1, avgSla: "3.8 hrs" },
];

export default function DepartmentPerformanceTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-800">Ringkasan Performa Departemen</h3>
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          View Full Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Dept Name</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4 text-center">Open</th>
              <th className="px-6 py-4 text-center">Closed</th>
              <th className="px-6 py-4 text-center">Overdue</th>
              <th className="px-6 py-4 text-center">Avg SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {departmentsData.map((dept, index) => (
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
                    <span className="text-slate-400">{dept.overdue}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center text-slate-600">{dept.avgSla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
