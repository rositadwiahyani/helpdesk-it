interface MostBusyDepartmentsProps {
  data?: { name: string; total: number; open: number; closed: number; overdue: number }[];
}

export default function MostBusyDepartments({ data = [] }: MostBusyDepartmentsProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Most Busy Departments</h3>
      <div className="flex flex-col gap-3">
        {data.map((dept, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-900">{dept.name}</span>
            <span className="text-blue-600 font-semibold">{dept.total} Tickets</span>
          </div>
        ))}
      </div>
    </div>
  );
}
