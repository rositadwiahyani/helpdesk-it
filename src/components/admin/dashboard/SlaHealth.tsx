'use client';

interface SlaHealthProps {
  data?: { name: string; value: number; fill: string }[];
}

export default function SlaHealth({ data = [] }: SlaHealthProps) {
  const withinSLA = data.find(d => d.name === 'Within SLA')?.value || 0;
  const nearDeadline = data.find(d => d.name === 'Near Deadline')?.value || 0;
  const overdue = data.find(d => d.name === 'Overdue')?.value || 0;
  
  const total = withinSLA + nearDeadline + overdue;

  const withinPct = total > 0 ? (withinSLA / total) * 100 : 0;
  const nearPct = total > 0 ? (nearDeadline / total) * 100 : 0;
  const overduePct = total > 0 ? (overdue / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">SLA Health</h3>
      
      {/* Progress Bar Stack */}
      <div className="w-full h-3 flex rounded-full overflow-hidden mb-6 bg-slate-100">
        <div style={{ width: `${withinPct}%` }} className="bg-emerald-400"></div>
        <div style={{ width: `${nearPct}%` }} className="bg-amber-400"></div>
        <div style={{ width: `${overduePct}%` }} className="bg-rose-500"></div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            Within SLA
          </div>
          <span className="font-semibold text-slate-900">{withinSLA}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            Near Deadline
          </div>
          <span className="font-semibold text-slate-900">{nearDeadline}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
            Overdue
          </div>
          <span className="font-semibold text-rose-600">{overdue}</span>
        </div>
      </div>
    </div>
  );
}
