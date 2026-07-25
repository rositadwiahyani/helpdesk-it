export default function MostBusyDepartments() {
  const departments = [
    { name: "Network Support", tickets: 215 },
    { name: "IT Infrastructure", tickets: 142 },
    { name: "Academic Systems", tickets: 89 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Most Busy Departments</h3>
      <div className="flex flex-col gap-3">
        {departments.map((dept, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span className="font-medium text-slate-900">{dept.name}</span>
            <span className="text-blue-600 font-semibold">{dept.tickets} Tickets</span>
          </div>
        ))}
      </div>
    </div>
  );
}
