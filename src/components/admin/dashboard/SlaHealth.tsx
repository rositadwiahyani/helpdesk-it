export default function SlaHealth() {
  // Dummy data
  const total = 141;
  const withinSLA = 125;
  const nearDeadline = 12;
  const overdue = 4;

  const withinPct = (withinSLA / total) * 100;
  const nearPct = (nearDeadline / total) * 100;
  const overduePct = (overdue / total) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">SLA Health</h3>
      
      {/* Progress Bar Container */}
      <div className="w-full h-2.5 rounded-full bg-slate-100 flex overflow-hidden mb-6">
        <div style={{ width: `${withinPct}%` }} className="bg-blue-600 h-full"></div>
        <div style={{ width: `${nearPct}%` }} className="bg-amber-400 h-full"></div>
        <div style={{ width: `${overduePct}%` }} className="bg-red-500 h-full"></div>
      </div>

      {/* Legends */}
      <div className="flex flex-col gap-4 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <span>Within SLA ({withinSLA} Tickets)</span>
          </div>
          <span className="font-bold text-slate-900">{Math.round(withinPct)}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-700">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Near Deadline ({nearDeadline} Tickets)</span>
          </div>
          <span className="font-bold text-slate-900">{Math.round(nearPct)}%</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span>Overdue ({overdue} Tickets)</span>
          </div>
          <span className="font-bold text-red-600">{Math.round(overduePct)}%</span>
        </div>
      </div>
    </div>
  );
}
